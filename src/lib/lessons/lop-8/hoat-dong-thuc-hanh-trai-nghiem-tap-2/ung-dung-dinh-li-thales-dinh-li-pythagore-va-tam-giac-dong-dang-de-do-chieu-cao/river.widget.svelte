<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { readNumber } from '#lib/core/decimal.js';
  import { button, textInput } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { riverLengths, toCm, widthByPythagoras, widthBySimilar } from './engine.js';

  const W = 440;
  const H = 290;
  const K = 5; // pixels per metre
  const AB = 36; // the river width the learner has to find
  const A = { x: 50, y: 250 };
  const B = { x: A.x, y: A.y - AB * K };
  const AC_MIN = 10;
  const AC_MAX = 74;

  let ac = $state(27);
  let typed = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let result = $state(null);
  let solved = $state(false);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const C = $derived({ x: A.x + ac * K, y: A.y });
  const r = $derived(riverLengths(AB, ac));
  // D lies on CB at distance CD from C.
  const D = $derived({
    x: C.x + ((B.x - C.x) * r.cd) / r.bc,
    y: C.y + ((B.y - C.y) * r.cd) / r.bc,
  });
  const adR = $derived(toCm(r.ad));
  const cdR = $derived(toCm(r.cd));
  const byPyth = $derived(widthByPythagoras(adR, cdR));
  const bySim = $derived(widthBySimilar(adR, ac, cdR));

  const handle = $state({ x: A.x + 27 * K, y: A.y });
  $effect(() => {
    handle.x = C.x;
    handle.y = A.y;
  });

  const drag = {
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      ac = Math.round(clamp((p.x - A.x) / K, AC_MIN, AC_MAX));
      result = null;
      return { x: A.x + ac * K, y: A.y };
    },
    /** @param {number} dx @param {number} _dy @param {boolean} big */
    onKeyMove: (dx, _dy, big) => {
      ac = clamp(ac + dx * (big ? 5 : 1), AC_MIN, AC_MAX);
      result = null;
    },
  };

  /** Small square marking the right angle at `at` between unit directions u and v. */
  function rightMark(
    /** @type {{x:number,y:number}} */ at,
    /** @type {{x:number,y:number}} */ to1,
    /** @type {{x:number,y:number}} */ to2,
  ) {
    const s = 9;
    const n1 = Math.hypot(to1.x - at.x, to1.y - at.y);
    const n2 = Math.hypot(to2.x - at.x, to2.y - at.y);
    const u = { x: ((to1.x - at.x) / n1) * s, y: ((to1.y - at.y) / n1) * s };
    const v = { x: ((to2.x - at.x) / n2) * s, y: ((to2.y - at.y) / n2) * s };
    return `M${at.x + u.x} ${at.y + u.y} L${at.x + u.x + v.x} ${at.y + u.y + v.y} L${at.x + v.x} ${at.y + v.y}`;
  }

  /** @param {number} v */
  const m2 = (v) => `${formatFixed(v, 2)} m`;

  function check() {
    const v = readNumber(typed);
    if (v === null) {
      result = { tone: 'warn', text: 'Hãy nhập một số, ví dụ 25,5.' };
      return;
    }
    if (Math.abs(v - bySim) <= 0.05 || Math.abs(v - AB) <= 0.1) {
      solved = true;
      result = {
        tone: 'ok',
        text: `Đúng! Từ số đo, AB ≈ ${formatNumber(bySim, 2)} m. Khoảng cách thật là ${AB} m. Kéo C đến chỗ khác: số đo đổi nhưng kết quả vẫn như vậy.`,
      };
    } else {
      result = {
        tone: 'warn',
        text: 'Chưa đúng. Gợi ý: tam giác ABC vuông tại A đồng dạng với tam giác DAC vuông tại D (chung góc C), nên AB : AD = AC : CD.',
      };
    }
  }
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Nhìn từ trên xuống: điểm B bên kia sông, điểm A bên này sông, AB vuông góc với bờ. Điểm C kéo được dọc bờ, AC = {ac} mét; D là chân đường vuông góc hạ từ A xuống CB. AD = {formatNumber(
      adR,
      2,
    )} mét, CD = {formatNumber(cdR, 2)} mét."
  >
    <rect x="0" y="0" width={W} height={B.y + 12} fill="#DCFCE7" />
    <rect x="0" y={B.y + 12} width={W} height={A.y - B.y - 30} fill="#BFDBFE" />
    <rect x="0" y={A.y - 18} width={W} height={H - A.y + 18} fill="#DCFCE7" />
    <text x={W - 10} y={(A.y + B.y) / 2} font-size="12" text-anchor="end" fill="#1E3A8A">Sông</text>

    <line
      x1={A.x}
      y1={A.y}
      x2={B.x}
      y2={B.y}
      stroke="#64748B"
      stroke-width="2"
      stroke-dasharray="6 5"
    />
    <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#B45309" stroke-width="2.5" />
    <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} stroke="#475569" stroke-width="1.5" />
    <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="#7C3AED" stroke-width="2.5" />
    <path d={rightMark(A, B, C)} fill="none" stroke="#334155" />
    <path d={rightMark(D, A, C)} fill="none" stroke="#334155" />

    <circle cx={B.x} cy={B.y} r="6" fill="#166534" />
    <text x={B.x + 10} y={B.y - 4} font-size="13" font-weight="700" fill="#166534"
      >B (cây bên kia sông)</text
    >
    <circle cx={A.x} cy={A.y} r="5" fill="#1E293B" />
    <text x={A.x - 8} y={A.y + 18} font-size="13" font-weight="700" fill="#1E293B">A</text>
    <circle cx={D.x} cy={D.y} r="4" fill="#7C3AED" />
    <text x={D.x + 8} y={D.y - 6} font-size="13" font-weight="700" fill="#6D28D9">D</text>
    <text x={(A.x + C.x) / 2} y={A.y + 18} font-size="11" text-anchor="middle" fill="#92400E"
      >{m2(ac)}</text
    >
    <text x={A.x - 6} y={(A.y + B.y) / 2} font-size="13" text-anchor="end" fill="#334155">?</text>
    <DragPoint
      {drag}
      r={7}
      color="#B45309"
      name="C"
      nameDx={-4}
      nameDy={22}
      label="Điểm C trên bờ, AC = {ac} mét: kéo hoặc dùng phím mũi tên trái phải để dời C dọc bờ, giữ Shift để dời 5 mét"
    />
  </GeometryBoard>

  <div class="grid gap-2 rounded-lg bg-slate-50 p-3 text-sm tabular-nums sm:grid-cols-3">
    <p>AC = {m2(ac)}</p>
    <p>AD = {m2(adR)}</p>
    <p>CD = {m2(cdR)}</p>
  </div>

  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    <label class="min-w-0 flex-1">
      <span class="mb-1 block text-sm font-semibold text-slate-700"
        >Khoảng cách AB em tính được (m)</span
      >
      <input class={textInput} inputmode="decimal" autocomplete="off" bind:value={typed} />
    </label>
    <button type="submit" class={button.primary}>Kiểm tra</button>
  </form>
  {#if result}
    <FeedbackNote tone={result.tone} text={result.text} />
  {/if}
  {#if solved}
    <div class="space-y-1 rounded-lg border border-slate-200 p-3 text-sm tabular-nums">
      <p>
        Cách 1: BD = AD² : CD = {formatNumber(adR, 2)}² : {formatNumber(cdR, 2)} ≈ {formatNumber(
          (adR * adR) / cdR,
          2,
        )} m; AB = √(AD² + BD²) ≈ {formatNumber(byPyth, 2)} m.
      </p>
      <p>
        Cách 2: AB = AD · AC : CD = {formatNumber(adR, 2)} · {ac} : {formatNumber(cdR, 2)} ≈ {formatNumber(
          bySim,
          2,
        )} m.
      </p>
    </div>
  {/if}
</div>
