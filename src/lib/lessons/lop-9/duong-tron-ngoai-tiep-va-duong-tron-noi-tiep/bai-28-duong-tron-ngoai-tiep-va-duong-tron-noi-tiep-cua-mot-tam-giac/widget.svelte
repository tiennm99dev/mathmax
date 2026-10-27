<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatFixed, texNumber } from '#lib/core/number-format.js';
  import { bisectorFoot, labelSpot, midpoint } from '#lib/geom-engine/plane.js';
  import { analyse, equilateral, oppositeSide } from './engine.js';
  import { touchPoints } from '../_shared/centers.js';

  const W = 400;
  const H = 360;
  /** Pixels per length unit (one grid square). */
  const UNIT = 40;

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  let A = $state({ x: 150, y: 70 });
  let B = $state({ x: 70, y: 290 });
  let C = $state({ x: 330, y: 270 });
  let mode = $state('ca-hai');

  const info = $derived(analyse(A, B, C));
  const showOuter = $derived(mode !== 'noi');
  const showInner = $derived(mode !== 'ngoai');
  const G = $derived({ x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 });
  const touches = $derived(info.inner ? touchPoints(A, B, C, info.inner.center) : null);

  const len = (/** @type {number} */ px) => texNumber(formatFixed(px / UNIT, 1));

  /**
   * The perpendicular bisector of PQ, long enough to cross the board.
   * @param {{x:number,y:number}} P @param {{x:number,y:number}} Q
   */
  function bisectorLine(P, Q) {
    const m = midpoint(P, Q);
    const dx = Q.x - P.x;
    const dy = Q.y - P.y;
    const d = Math.hypot(dx, dy) || 1;
    const ux = -dy / d;
    const uy = dx / d;
    return { x1: m.x - ux * 800, y1: m.y - uy * 800, x2: m.x + ux * 800, y2: m.y + uy * 800 };
  }

  const perps = $derived([bisectorLine(B, C), bisectorLine(C, A), bisectorLine(A, B)]);
  const angleBis = $derived([
    { from: A, to: bisectorFoot(A, B, C) },
    { from: B, to: bisectorFoot(B, C, A) },
    { from: C, to: bisectorFoot(C, A, B) },
  ]);

  const note = $derived.by(() => {
    if (!info.outer || !info.inner) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Ba đỉnh gần thẳng hàng: chưa tạo thành tam giác.',
      };
    }
    const R = len(info.outer.radius);
    const r = len(info.inner.radius);
    if (info.equilateral) {
      const tenths = (/** @type {number} */ px) => Math.round((px / UNIT) * 10);
      const shown = tenths(info.outer.radius) === 2 * tenths(info.inner.radius);
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Tam giác đều: tâm $O$ và tâm $I$ trùng nhau (là trọng tâm). $R = ${R}$, $r = ${r}$, ${shown ? 'nên $R = 2r$' : 'nên $R \\approx 2r$ (các số đã làm tròn)'}.`,
      };
    }
    if (info.kind === 'vuong') {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Tam giác vuông tại $${info.largest}$: tâm $O$ là trung điểm cạnh huyền $${oppositeSide(info.largest)}$, $R = ${R}$ (nửa cạnh huyền).`,
      };
    }
    if (info.kind === 'tu') {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Tam giác tù tại $${info.largest}$: tâm $O$ nằm ngoài tam giác. Tâm $I$ vẫn nằm trong. $R = ${R}$ và $r = ${r}$.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Tam giác nhọn: cả $O$ và $I$ nằm trong tam giác. $R = ${R}$ và $r = ${r}$.`,
    };
  });

  /** @param {Array<{x:number,y:number}>} pts */
  function place(pts) {
    Object.assign(A, pts[0]);
    Object.assign(B, pts[1]);
    Object.assign(C, pts[2]);
  }

  const presets = [
    { label: 'Tam giác đều', pts: () => equilateral({ x: 200, y: 200 }, 160) },
    {
      label: 'Tam giác vuông',
      pts: () => [
        { x: 100, y: 80 },
        { x: 100, y: 280 },
        { x: 340, y: 280 },
      ],
    },
    {
      label: 'Tam giác tù',
      pts: () => [
        { x: 140, y: 60 },
        { x: 40, y: 110 },
        { x: 360, y: 110 },
      ],
    },
  ];

  /** @param {{x:number,y:number}} point */
  const dragOf = (point) => ({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 14,
  });
  const names = /** @type {const} */ (['A', 'B', 'C']);
  const verts = $derived([A, B, C]);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hiện đường tròn"
    bind:value={mode}
    options={[
      { value: 'ngoai', label: 'Ngoại tiếp' },
      { value: 'noi', label: 'Nội tiếp' },
      { value: 'ca-hai', label: 'Cả hai' },
    ]}
  />

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-md"
    label="Tam giác ABC với đường tròn ngoại tiếp và nội tiếp; kéo các đỉnh A, B, C"
  >
    {#each Array.from({ length: W / UNIT - 1 }, (_, i) => (i + 1) * UNIT) as x (x)}
      <line x1={x} y1="0" x2={x} y2={H} stroke="#F1F5F9" />
    {/each}
    {#each Array.from({ length: H / UNIT - 1 }, (_, i) => (i + 1) * UNIT) as y (y)}
      <line x1="0" y1={y} x2={W} y2={y} stroke="#F1F5F9" />
    {/each}

    {#if showOuter && info.outer}
      {#each perps as l, i (i)}
        <line {...l} stroke="#93C5FD" stroke-width="1" stroke-dasharray="5 4" />
      {/each}
      <circle
        cx={info.outer.center.x}
        cy={info.outer.center.y}
        r={info.outer.radius}
        fill="none"
        stroke="#2563EB"
        stroke-width="2.5"
      />
    {/if}
    {#if showInner && info.inner}
      {#each angleBis as s, i (i)}
        <line
          x1={s.from.x}
          y1={s.from.y}
          x2={s.to.x}
          y2={s.to.y}
          stroke="#FDBA74"
          stroke-width="1"
          stroke-dasharray="5 4"
        />
      {/each}
      <circle
        cx={info.inner.center.x}
        cy={info.inner.center.y}
        r={info.inner.radius}
        fill="#FFF7ED"
        fill-opacity="0.6"
        stroke="#EA580C"
        stroke-width="2.5"
      />
      {#each touches ?? [] as T, i (i)}
        <circle cx={T.x} cy={T.y} r="3.5" fill="#EA580C" />
      {/each}
    {/if}

    <polygon
      points="{A.x},{A.y} {B.x},{B.y} {C.x},{C.y}"
      fill="none"
      stroke="#334155"
      stroke-width="2"
    />

    {#if showOuter && info.outer}
      {@const O = info.outer.center}
      <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} stroke="#2563EB" stroke-width="1.5" />
      <circle cx={O.x} cy={O.y} r="4.5" fill="#2563EB" />
      <text x={O.x + 7} y={O.y - 7} font-size="15" font-weight="700" fill="#2563EB">O</text>
    {/if}
    {#if showInner && info.inner}
      {@const I = info.inner.center}
      <circle cx={I.x} cy={I.y} r="4.5" fill="#EA580C" />
      <text x={I.x + 7} y={I.y + 16} font-size="15" font-weight="700" fill="#EA580C">I</text>
    {/if}

    {#each verts as P, i (i)}
      {@const spot = labelSpot(P, G, 22, W, H)}
      <DragPoint
        drag={dragOf(P)}
        r={11}
        color="#7C3AED"
        label="Đỉnh {names[i]} — kéo hoặc dùng phím mũi tên"
      />
      <text
        x={spot.x}
        y={spot.y}
        font-size="16"
        font-weight="700"
        fill="#5B21B6"
        text-anchor="middle"
        dominant-baseline="middle">{names[i]}</text
      >
    {/each}
  </GeometryBoard>

  <div class="grid grid-cols-3 gap-2 text-center text-sm tabular-nums">
    <p class="rounded-lg bg-slate-50 p-2">∠A = {formatFixed(info.angles.A, 1)}°</p>
    <p class="rounded-lg bg-slate-50 p-2">∠B = {formatFixed(info.angles.B, 1)}°</p>
    <p class="rounded-lg bg-slate-50 p-2">∠C = {formatFixed(info.angles.C, 1)}°</p>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap gap-2">
    {#each presets as p (p.label)}
      <button type="button" class={button.quiet} onclick={() => place(p.pts())}>{p.label}</button>
    {/each}
  </div>
  <p class="text-sm text-slate-500">
    Đường nét đứt xanh là ba đường trung trực (cắt nhau tại tâm O của đường tròn ngoại tiếp); nét
    đứt cam là ba đường phân giác (cắt nhau tại tâm I của đường tròn nội tiếp). Mỗi ô vuông dài 1
    đơn vị.
  </p>
</div>
