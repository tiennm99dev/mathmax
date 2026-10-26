<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import { lerp, triangleFromSides } from '../_shared/tri.js';
  import { STEPS, TRIANGLES, measures, nearestStep, stepOf } from './engine.js';

  const W = 420;
  const H = 320;
  const PAD = 36;

  let mode = $state('thuan');
  let triIndex = $state(0);
  let i = $state(4);
  let jFree = $state(6);

  const tri = $derived(TRIANGLES[triIndex]);
  const j = $derived(mode === 'thuan' ? i : jFree);
  const m = $derived(measures(tri, i, j));

  // Fit the triangle into the board, keeping its shape.
  const shape = $derived.by(() => {
    const t = triangleFromSides(tri.ab, tri.ac, tri.bc);
    if (!t) throw new Error('invalid triangle');
    const xs = [t.A.x, t.B.x, t.C.x];
    const ys = [t.A.y, t.B.y, t.C.y];
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const w = Math.max(...xs) - minX;
    const h = Math.max(...ys) - minY;
    const k = Math.min((W - 2 * PAD) / w, (H - 2 * PAD) / h);
    const ox = (W - k * w) / 2 - k * minX;
    const oy = (H - k * h) / 2 - k * minY;
    /** @param {{x:number,y:number}} p */
    const map = (p) => ({ x: ox + k * p.x, y: oy + k * p.y });
    return { A: map(t.A), B: map(t.B), C: map(t.C) };
  });

  const Bp = $derived(lerp(shape.A, shape.B, i / STEPS));
  const Cp = $derived(lerp(shape.A, shape.C, j / STEPS));
  // The parallel line through B' drawn across the whole triangle width.
  const guide = $derived({
    p: { x: Bp.x - (shape.C.x - shape.B.x) * 0.25, y: Bp.y - (shape.C.y - shape.B.y) * 0.25 },
    q: { x: Bp.x + (shape.C.x - shape.B.x) * 1.25, y: Bp.y + (shape.C.y - shape.B.y) * 1.25 },
  });
  const ticks = $derived(
    Array.from({ length: STEPS - 1 }, (_, k) => ({
      b: lerp(shape.A, shape.B, (k + 1) / STEPS),
      c: lerp(shape.A, shape.C, (k + 1) / STEPS),
    })),
  );

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  /** @param {number} next */
  const setI = (next) => (i = stepOf(next));
  /** @param {number} next */
  const setJ = (next) => (jFree = stepOf(next));

  const dragB = $derived({
    point: { x: Bp.x, y: Bp.y },
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{x:number,y:number}} raw */
    projector: (raw) => {
      setI(nearestStep(shape.A, shape.B, raw));
      return lerp(shape.A, shape.B, i / STEPS);
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setI(i + (dx + dy) * (big ? 3 : 1)),
  });
  const dragC = $derived({
    point: { x: Cp.x, y: Cp.y },
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{x:number,y:number}} raw */
    projector: (raw) => {
      setJ(nearestStep(shape.A, shape.C, raw));
      return lerp(shape.A, shape.C, jFree / STEPS);
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setJ(jFree + (dx + dy) * (big ? 3 : 1)),
  });

  /** @param {number} v */
  const num = (v) => formatNumber(v, 2);
  /** @param {number} v */
  const tn = (v) => texNumber(num(v));
  /** @param {[number, number]} f */
  const tf = (f) => (f[1] === 1 ? `${f[0]}` : `\\dfrac{${f[0]}}{${f[1]}}`);
  /** @param {[number, number]} a @param {[number, number]} b */
  const same = (a, b) => a[0] === b[0] && a[1] === b[1];

  /** @param {[number, number]} f */
  const said = (f) => (f[1] === 1 ? `${f[0]}` : `${f[0]} phần ${f[1]}`);

  // Each row compares one ratio on AB with the matching ratio on AC.
  const rows = $derived([
    {
      id: 'whole',
      left: `\\dfrac{AB'}{AB} = \\dfrac{${tn(m.abP)}}{${tn(tri.ab)}} = ${tf(m.ratioB)}`,
      right: `\\dfrac{AC'}{AC} = \\dfrac{${tn(m.acP)}}{${tn(tri.ac)}} = ${tf(m.ratioC)}`,
      leftText: `AB' trên AB bằng ${num(m.abP)} trên ${num(tri.ab)}, bằng ${said(m.ratioB)}`,
      rightText: `AC' trên AC bằng ${num(m.acP)} trên ${num(tri.ac)}, bằng ${said(m.ratioC)}`,
      equal: same(m.ratioB, m.ratioC),
    },
    {
      id: 'parts',
      left: `\\dfrac{AB'}{B'B} = \\dfrac{${tn(m.abP)}}{${tn(m.bPb)}} = ${tf(m.ratioB2)}`,
      right: `\\dfrac{AC'}{C'C} = \\dfrac{${tn(m.acP)}}{${tn(m.cPc)}} = ${tf(m.ratioC2)}`,
      leftText: `AB' trên B'B bằng ${num(m.abP)} trên ${num(m.bPb)}, bằng ${said(m.ratioB2)}`,
      rightText: `AC' trên C'C bằng ${num(m.acP)} trên ${num(m.cPc)}, bằng ${said(m.ratioC2)}`,
      equal: same(m.ratioB2, m.ratioC2),
    },
  ]);

  const feedback = $derived.by(() => {
    if (mode === 'thuan')
      return {
        tone: /** @type {const} */ ('ok'),
        text: `B'C' ∥ BC: dù B' ở đâu, AB'/AB = AC'/AC = ${said(m.ratioB)}. Hai cạnh bị chia thành những đoạn tương ứng tỉ lệ.`,
      };
    if (m.parallel)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Hai tỉ số bằng nhau (${said(m.ratioB)}), và đúng là B'C' ∥ BC. Đó là định lí Thalès đảo.`,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `AB'/AB = ${said(m.ratioB)} nhưng AC'/AC = ${said(m.ratioC)}: hai tỉ số khác nhau nên B'C' không song song với BC. Hãy kéo C' cho tới khi hai tỉ số bằng nhau.`,
    };
  });

  const modes = [
    { value: 'thuan', label: 'Định lí thuận' },
    { value: 'dao', label: 'Định lí đảo' },
  ];
  const triOptions = TRIANGLES.map((t, k) => ({
    value: k,
    label: `AB = ${t.ab}, AC = ${t.ac}`,
  }));
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl label="Chế độ" options={modes} bind:value={mode} />
    <SegmentedControl label="Tam giác (cm)" options={triOptions} bind:value={triIndex} />
  </div>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Tam giác ABC, điểm B' trên cạnh AB và điểm C' trên cạnh AC"
  >
    <polygon
      points="{shape.A.x},{shape.A.y} {shape.B.x},{shape.B.y} {shape.C.x},{shape.C.y}"
      fill="#EEF2FF"
      stroke="#334155"
      stroke-width="2"
      stroke-linejoin="round"
    />
    {#each ticks as t, k (k)}
      <circle cx={t.b.x} cy={t.b.y} r="2.5" fill="#94A3B8" />
      <circle cx={t.c.x} cy={t.c.y} r="2.5" fill="#94A3B8" />
    {/each}
    {#if mode === 'thuan'}
      <line
        x1={guide.p.x}
        y1={guide.p.y}
        x2={guide.q.x}
        y2={guide.q.y}
        stroke="#A5B4FC"
        stroke-width="1.5"
        stroke-dasharray="6 5"
      />
    {/if}
    <!-- Highlight the segments the ratios compare. -->
    <line x1={shape.A.x} y1={shape.A.y} x2={Bp.x} y2={Bp.y} stroke="#D7263D" stroke-width="5" />
    <line x1={Bp.x} y1={Bp.y} x2={shape.B.x} y2={shape.B.y} stroke="#F59E0B" stroke-width="5" />
    <line x1={shape.A.x} y1={shape.A.y} x2={Cp.x} y2={Cp.y} stroke="#D7263D" stroke-width="5" />
    <line x1={Cp.x} y1={Cp.y} x2={shape.C.x} y2={shape.C.y} stroke="#F59E0B" stroke-width="5" />
    <line
      x1={Bp.x}
      y1={Bp.y}
      x2={Cp.x}
      y2={Cp.y}
      stroke={m.parallel ? '#059669' : '#4F46E5'}
      stroke-width="3"
    />

    <text x={shape.A.x - 6} y={shape.A.y - 12} font-size="18" font-weight="700" fill="#1F2937"
      >A</text
    >
    <text x={shape.B.x - 22} y={shape.B.y + 6} font-size="18" font-weight="700" fill="#1F2937"
      >B</text
    >
    <text x={shape.C.x + 10} y={shape.C.y + 6} font-size="18" font-weight="700" fill="#1F2937"
      >C</text
    >

    <DragPoint
      drag={dragB}
      r={11}
      color="#D7263D"
      label="Điểm B′ trên cạnh AB, AB′ = {num(
        m.abP,
      )} cm. Kéo hoặc dùng phím mũi tên để dời B′ từng bước."
    />
    {#if mode === 'dao'}
      <DragPoint
        drag={dragC}
        r={11}
        color="#4F46E5"
        label="Điểm C′ trên cạnh AC, AC′ = {num(
          m.acP,
        )} cm. Kéo hoặc dùng phím mũi tên để dời C′ từng bước."
      />
    {:else}
      <circle cx={Cp.x} cy={Cp.y} r="7" fill="#4F46E5" stroke="#fff" stroke-width="2" />
    {/if}
    <text
      x={Bp.x - 36}
      y={Bp.y - 8}
      font-size="18"
      font-weight="700"
      fill="#1F2937"
      pointer-events="none">B′</text
    >
    <text
      x={Cp.x + 14}
      y={Cp.y - 8}
      font-size="18"
      font-weight="700"
      fill="#1F2937"
      pointer-events="none">C′</text
    >
  </GeometryBoard>

  <p class="text-center text-sm text-slate-600">
    {#if mode === 'thuan'}
      Kéo B′ dọc cạnh AB: đường thẳng qua B′ song song với BC cắt AC tại C′.
    {:else}
      Kéo B′ và C′ độc lập. Khi nào B′C′ song song với BC?
    {/if}
  </p>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-3">
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-3 text-sm">
      <div class="text-center font-semibold text-slate-600">Trên cạnh AB</div>
      <div></div>
      <div class="text-center font-semibold text-slate-600">Trên cạnh AC</div>
      {#each rows as row (row.id)}
        <div class="text-center"><Tex math={row.left} ariaLabel={row.leftText} /></div>
        <div class="text-lg font-bold {row.equal ? 'text-emerald-700' : 'text-rose-700'}">
          <span aria-hidden="true">{row.equal ? '=' : '≠'}</span>
          <span class="sr-only">{row.equal ? 'bằng' : 'khác'}</span>
        </div>
        <div class="text-center"><Tex math={row.right} ariaLabel={row.rightText} /></div>
      {/each}
    </div>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
