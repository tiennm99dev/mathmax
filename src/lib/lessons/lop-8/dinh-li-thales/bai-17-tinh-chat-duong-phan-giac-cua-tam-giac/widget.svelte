<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import { B, C, COLS, ROWS, bisector, snapA } from './engine.js';

  /** @typedef {import('./engine.js').Pt} Pt */

  const U = 40;
  const PAD = 24;
  const W = COLS * U + 2 * PAD;
  const H = ROWS * U + 2 * PAD;

  let A = $state({ x: 3, y: 1 });
  let showMid = $state(false);

  /** @param {Pt} p */
  const toSvg = (p) => ({ x: PAD + p.x * U, y: PAD + p.y * U });

  const m = $derived(bisector(A));
  const sA = $derived(toSvg(A));
  const sB = toSvg(B);
  const sC = toSvg(C);
  const sD = $derived(toSvg(m.D));
  const sM = $derived(toSvg(m.M));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const dragA = $derived({
    point: toSvg(A),
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {Pt} raw */
    projector: (raw) => {
      A = snapA({ x: (raw.x - PAD) / U, y: (raw.y - PAD) / U });
      return toSvg(A);
    },
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => (A = snapA({ x: A.x + dx, y: A.y + dy })),
  });

  /** @param {number} v */
  const two = (v) => formatNumber(v, 2);
  /** @param {number} v */
  const tTwo = (v) => texNumber(two(v));

  const texSeg = $derived(
    `\\dfrac{DB}{DC} \\approx \\dfrac{${tTwo(m.db)}}{${tTwo(m.dc)}} \\approx ${tTwo(m.segRatio)}`,
  );
  const texSide = $derived(
    `\\dfrac{AB}{AC} \\approx \\dfrac{${tTwo(m.ab)}}{${tTwo(m.ac)}} \\approx ${tTwo(m.sideRatio)}`,
  );
  const segLabel = $derived(
    `DB trên DC xấp xỉ ${two(m.db)} trên ${two(m.dc)}, bằng ${two(m.segRatio)}`,
  );
  const sideLabel = $derived(
    `AB trên AC xấp xỉ ${two(m.ab)} trên ${two(m.ac)}, bằng ${two(m.sideRatio)}`,
  );

  const equalSides = $derived(Math.abs(m.ab - m.ac) < 1e-9);
  const nearer = $derived(m.ab < m.ac ? 'B' : 'C');
  const feedback = $derived(
    equalSides
      ? `AB = AC nên DB/DC = 1: chân đường phân giác D trùng trung điểm M của BC.`
      : `DB/DC = AB/AC ≈ ${two(m.sideRatio)}. Cạnh ${nearer === 'B' ? 'AB' : 'AC'} ngắn hơn nên D lệch về phía ${nearer}, gần ${nearer} hơn trung điểm M.`,
  );

  /**
   * A small arc marking the angle at V from ray VP to ray VQ.
   * @param {Pt} V @param {Pt} P @param {Pt} Q @param {number} r
   */
  function arc(V, P, Q, r) {
    const a1 = Math.atan2(P.y - V.y, P.x - V.x);
    const a2 = Math.atan2(Q.y - V.y, Q.x - V.x);
    let d = a2 - a1;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    const s = { x: V.x + r * Math.cos(a1), y: V.y + r * Math.sin(a1) };
    const e = { x: V.x + r * Math.cos(a1 + d), y: V.y + r * Math.sin(a1 + d) };
    return `M ${V.x} ${V.y} L ${s.x} ${s.y} A ${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${e.x} ${e.y} Z`;
  }
</script>

<div class="space-y-4">
  <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
    <input type="checkbox" class="h-5 w-5 {focusRing}" bind:checked={showMid} />
    So sánh với trung điểm M của BC
  </label>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Tam giác ABC với đường phân giác AD của góc A"
  >
    <polygon
      points="{sA.x},{sA.y} {sB.x},{sB.y} {sC.x},{sC.y}"
      fill="#EEF2FF"
      stroke="#334155"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path d={arc(sA, sB, sD, 30)} fill="#FCA5A5" opacity="0.8" />
    <path d={arc(sA, sD, sC, 36)} fill="#FDBA74" opacity="0.8" />

    <!-- DB and DC on BC; AB and AC drawn in matching colours. -->
    <line x1={sB.x} y1={sB.y} x2={sD.x} y2={sD.y} stroke="#D7263D" stroke-width="6" />
    <line x1={sD.x} y1={sD.y} x2={sC.x} y2={sC.y} stroke="#4F46E5" stroke-width="6" />
    <line x1={sA.x} y1={sA.y} x2={sB.x} y2={sB.y} stroke="#D7263D" stroke-width="3" />
    <line x1={sA.x} y1={sA.y} x2={sC.x} y2={sC.y} stroke="#4F46E5" stroke-width="3" />
    <line x1={sA.x} y1={sA.y} x2={sD.x} y2={sD.y} stroke="#0F766E" stroke-width="2.5" />

    {#if showMid}
      <line
        x1={sA.x}
        y1={sA.y}
        x2={sM.x}
        y2={sM.y}
        stroke="#64748B"
        stroke-width="2"
        stroke-dasharray="6 5"
      />
      <circle cx={sM.x} cy={sM.y} r="5" fill="#64748B" />
      <text x={sM.x - 5} y={sM.y + 36} font-size="20" font-weight="700" fill="#64748B">M</text>
    {/if}

    <circle cx={sD.x} cy={sD.y} r="6" fill="#0F766E" stroke="#fff" stroke-width="2" />
    <text x={sD.x - 5} y={sD.y + 22} font-size="20" font-weight="700" fill="#0F766E">D</text>
    <text x={sB.x - 26} y={sB.y + 6} font-size="20" font-weight="700" fill="#1F2937">B</text>
    <text x={sC.x + 10} y={sC.y + 6} font-size="20" font-weight="700" fill="#1F2937">C</text>

    <text x={sA.x + 12} y={sA.y - 12} font-size="20" font-weight="700" fill="#1F2937">A</text>
    <DragPoint
      drag={dragA}
      r={11}
      color="#0F766E"
      label="Đỉnh A, AB ≈ {two(m.ab)} cm, AC ≈ {two(
        m.ac,
      )} cm. Kéo hoặc dùng phím mũi tên để dời từng ô."
    />
  </GeometryBoard>

  <p class="text-center text-sm text-slate-600">
    Kéo đỉnh A (mỗi ô vuông cạnh 1 cm, BC = 10 cm). AD là tia phân giác của góc A, chia góc A thành
    hai góc ≈ {formatNumber(m.angleBAD, 1)}°.
  </p>

  <dl class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
    <div class="rounded-lg bg-rose-50 p-3">
      <dt class="text-rose-800">AB</dt>
      <dd class="font-semibold tabular-nums">{two(m.ab)} cm</dd>
    </div>
    <div class="rounded-lg bg-indigo-50 p-3">
      <dt class="text-indigo-800">AC</dt>
      <dd class="font-semibold tabular-nums">{two(m.ac)} cm</dd>
    </div>
    <div class="rounded-lg bg-rose-50 p-3">
      <dt class="text-rose-800">DB</dt>
      <dd class="font-semibold tabular-nums">{two(m.db)} cm</dd>
    </div>
    <div class="rounded-lg bg-indigo-50 p-3">
      <dt class="text-indigo-800">DC</dt>
      <dd class="font-semibold tabular-nums">{two(m.dc)} cm</dd>
    </div>
  </dl>

  <div
    class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
  >
    <Tex math={texSeg} ariaLabel={segLabel} />
    <Tex math={texSide} ariaLabel={sideLabel} />
  </div>

  <FeedbackNote tone={equalSides ? 'info' : 'ok'} text={feedback} />
</div>
