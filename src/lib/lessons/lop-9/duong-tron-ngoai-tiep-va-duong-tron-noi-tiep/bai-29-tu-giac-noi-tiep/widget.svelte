<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatFixed, texNumber } from '#lib/core/number-format.js';
  import { labelSpot } from '#lib/geom-engine/plane.js';
  import { analyseQuad, snapToCircle } from './engine.js';

  const W = 400;
  const H = 380;

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  let A = $state({ x: 110, y: 100 });
  let B = $state({ x: 80, y: 260 });
  let C = $state({ x: 270, y: 320 });
  let D = $state({ x: 300, y: 140 });

  const q = $derived(analyseQuad(A, B, C, D));
  const G = $derived({ x: (A.x + B.x + C.x + D.x) / 4, y: (A.y + B.y + C.y + D.y) / 4 });
  const deg = (/** @type {number} */ v) => formatFixed(v, 0);
  const tdeg = (/** @type {number} */ v) => `${texNumber(deg(v))}^\\circ`;

  const note = $derived.by(() => {
    if (!q.circle) {
      return { tone: /** @type {const} */ ('warn'), text: 'Ba điểm $A$, $B$, $C$ gần thẳng hàng.' };
    }
    if (!q.convex) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Tứ giác $ABCD$ không lồi. Kéo các đỉnh để được một tứ giác lồi.',
      };
    }
    const sums = `$\\widehat{A} + \\widehat{C} = ${tdeg(q.sumAC)}$, $\\widehat{B} + \\widehat{D} = ${tdeg(q.sumBD)}$`;
    if (q.cyclic) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${sums}. Tổng hai góc đối bằng $180^\\circ$: tứ giác $ABCD$ nội tiếp, bốn đỉnh cùng nằm trên một đường tròn.`,
      };
    }
    const where = q.offset < 0 ? 'bên trong' : 'bên ngoài';
    const move = q.offset < 0 ? 'ra xa tâm' : 'lại gần tâm';
    return {
      tone: /** @type {const} */ ('info'),
      text: `${sums}. $D$ nằm ${where} đường tròn qua $A$, $B$, $C$ nên tứ giác chưa nội tiếp. Kéo $D$ ${move}.`,
    };
  });

  let message = $state('');

  function snap() {
    const P = snapToCircle(A, B, C, D);
    if (P) {
      Object.assign(D, P);
      message = 'Đã đưa D lên đường tròn qua A, B, C.';
    } else {
      message = 'Không đưa được: hãy kéo D về phía cung AC không chứa B trước.';
    }
  }

  /** While D is dragged, pull it onto the circle (ABC) once the sum is within 1,5° of 180°. */
  function magnet() {
    message = '';
    const now = analyseQuad(A, B, C, D);
    if (now.convex && Math.abs(now.sumAC - 180) < 1.5) {
      const P = snapToCircle(A, B, C, D);
      if (P) Object.assign(D, P);
    }
  }

  /** @param {{x:number,y:number}} point */
  const dragOf = (point) => ({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 14,
    onChange: point === D ? magnet : () => (message = ''),
  });
  const names = /** @type {const} */ (['A', 'B', 'C', 'D']);
  const verts = $derived([A, B, C, D]);
  const colors = ['#2563EB', '#DC2626', '#2563EB', '#DC2626'];
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-md"
    label="Tứ giác ABCD và đường tròn đi qua A, B, C; kéo bốn đỉnh"
  >
    {#if q.circle}
      <circle
        cx={q.circle.center.x}
        cy={q.circle.center.y}
        r={q.circle.radius}
        fill="none"
        stroke={q.cyclic ? '#059669' : '#94A3B8'}
        stroke-width={q.cyclic ? 3 : 1.5}
        stroke-dasharray={q.cyclic ? null : '6 5'}
      />
      {#if q.cyclic}
        <circle cx={q.circle.center.x} cy={q.circle.center.y} r="4" fill="#059669" />
        <text
          x={q.circle.center.x + 7}
          y={q.circle.center.y - 7}
          font-size="14"
          font-weight="700"
          fill="#059669">O</text
        >
      {/if}
    {/if}

    <polygon
      points="{A.x},{A.y} {B.x},{B.y} {C.x},{C.y} {D.x},{D.y}"
      fill={q.cyclic ? '#ECFDF5' : '#F8FAFC'}
      fill-opacity="0.7"
      stroke="#334155"
      stroke-width="2"
    />

    {#each verts as P, i (i)}
      {@const spot = labelSpot(P, G, 24, W, H)}
      <DragPoint
        drag={dragOf(P)}
        r={11}
        color={colors[i]}
        label="Đỉnh {names[i]} — kéo hoặc dùng phím mũi tên"
      />
      <text
        x={spot.x}
        y={spot.y}
        font-size="16"
        font-weight="700"
        fill={colors[i]}
        text-anchor="middle"
        dominant-baseline="middle">{names[i]}</text
      >
    {/each}
  </GeometryBoard>

  <div class="grid grid-cols-2 gap-2 text-sm tabular-nums sm:grid-cols-4">
    <p class="rounded-lg bg-blue-50 p-2 text-center">∠A = {deg(q.angles.A)}°</p>
    <p class="rounded-lg bg-red-50 p-2 text-center">∠B = {deg(q.angles.B)}°</p>
    <p class="rounded-lg bg-blue-50 p-2 text-center">∠C = {deg(q.angles.C)}°</p>
    <p class="rounded-lg bg-red-50 p-2 text-center">∠D = {deg(q.angles.D)}°</p>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.quiet} onclick={snap}
      >Đưa D lên đường tròn qua A, B, C</button
    >
    <p class="text-sm text-slate-600" aria-live="polite">{message}</p>
  </div>
  <p class="text-sm text-slate-500">
    Đường tròn nét đứt là đường tròn đi qua ba đỉnh A, B, C. Hai cặp góc đối được tô cùng màu: A với
    C (xanh), B với D (đỏ).
  </p>
</div>
