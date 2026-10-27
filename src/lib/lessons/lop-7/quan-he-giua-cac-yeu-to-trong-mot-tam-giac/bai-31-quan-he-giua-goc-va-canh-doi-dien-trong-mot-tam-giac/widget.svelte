<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { degText, directionTo, sectorPath } from '#lib/core/visuals/angle-math.js';
  import {
    frame,
    labelOutside,
    measureTri,
    OPPOSITE,
    placeVertex,
    toGrid,
  } from '#lib/geom-engine/grid-triangle.js';
  import { angleChain, hat, rankGroups, sideChain, sideKind } from './engine.js';

  const W = 400;
  const H = 300;
  const U = 30;
  const BOX = { minX: -6, maxX: 6, minY: -4.5, maxY: 4.5 };
  const { toSvg, fromSvg } = frame(U, 200, 150);
  /** @type {Record<'A' | 'B' | 'C', string>} */
  const COLOR = { A: '#4338CA', B: '#B45309', C: '#047857' };
  /** @param {{ x: number, y: number }} p SVG point to grid point */
  function grid(p) {
    const g = fromSvg(p);
    return { x: toGrid(g.x), y: toGrid(g.y) };
  }
  /** @type {('A' | 'B' | 'C')[]} */
  const VS = ['A', 'B', 'C'];

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  /** SVG positions the drag handles move. */
  let pts = $state({
    A: toSvg({ x: -1, y: 3.5 }),
    B: toSvg({ x: -4.5, y: -2.5 }),
    C: toSvg({ x: 4, y: -2.5 }),
  });
  /** The same triangle in grid units, y up. */
  const tri = $derived({ A: grid(pts.A), B: grid(pts.B), C: grid(pts.C) });

  /** @param {'A' | 'B' | 'C'} v */
  function dragFor(v) {
    return {
      point: pts[v],
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      keyStep: U / 2,
      keyShiftStep: U * 2,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => toSvg(placeVertex(tri, v, fromSvg(p), BOX)),
    };
  }
  const dA = $derived(dragFor('A'));
  const dB = $derived(dragFor('B'));
  const dC = $derived(dragFor('C'));

  const m = $derived(measureTri(tri));
  const groups = $derived(rankGroups(tri));
  const kind = $derived(sideKind(groups));

  /** @param {'A' | 'B' | 'C'} v */
  function wedgeOf(v) {
    const [p, q] = VS.filter((w) => w !== v);
    return sectorPath(pts[v], directionTo(pts[v], pts[p]), directionTo(pts[v], pts[q]), 24);
  }
  /** @param {'A' | 'B' | 'C'} v */
  const ends = (v) => VS.filter((w) => w !== v);
  /** @param {number} v */
  const len = (v) => formatNumber(v, 2);

  const feedback = $derived.by(() => {
    if (kind === 'deu') return 'Ba cạnh bằng nhau nên ba góc bằng nhau: tam giác đều, mỗi góc 60°.';
    const top = groups[0];
    const bottom = /** @type {('A' | 'B' | 'C')[]} */ (groups.at(-1));
    const big =
      top.length === 1
        ? `Cạnh lớn nhất là ${OPPOSITE[top[0]]}, đối diện góc lớn nhất ${hat(top[0])} = ${degText(m.angle[top[0]])}.`
        : `Hai cạnh lớn nhất ${top.map((v) => OPPOSITE[v]).join(' và ')} bằng nhau, nên hai góc đối diện ${top.map(hat).join(' và ')} bằng nhau.`;
    const small =
      bottom.length === 1
        ? ` Cạnh nhỏ nhất là ${OPPOSITE[bottom[0]]}, đối diện góc nhỏ nhất ${hat(bottom[0])} = ${degText(m.angle[bottom[0]])}.`
        : ` Hai cạnh nhỏ nhất ${bottom.map((v) => OPPOSITE[v]).join(' và ')} bằng nhau, nên hai góc đối diện ${bottom.map(hat).join(' và ')} bằng nhau.`;
    const obtuse = VS.find((v) => m.angle[v] > 90 + 1e-6);
    const extra = obtuse ? ` Góc ${hat(obtuse)} tù nên ${OPPOSITE[obtuse]} là cạnh lớn nhất.` : '';
    return big + small + extra;
  });
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    label="Tam giác ABC với ba đỉnh kéo được; mỗi góc và cạnh đối diện của nó được tô cùng một màu"
  >
    {#each Array.from({ length: 13 }, (_, i) => i - 6) as gx (gx)}
      <line x1={200 + gx * U} y1="0" x2={200 + gx * U} y2={H} stroke="#F1F5F9" />
    {/each}
    {#each Array.from({ length: 11 }, (_, i) => i - 5) as gy (gy)}
      <line x1="0" y1={150 - gy * U} x2={W} y2={150 - gy * U} stroke="#F1F5F9" />
    {/each}

    <polygon
      points="{pts.A.x},{pts.A.y} {pts.B.x},{pts.B.y} {pts.C.x},{pts.C.y}"
      fill="#64748B"
      fill-opacity="0.05"
    />
    {#each VS as v (v)}
      {@const [p, q] = ends(v)}
      <path d={wedgeOf(v)} fill={COLOR[v]} fill-opacity="0.3" />
      <line
        x1={pts[p].x}
        y1={pts[p].y}
        x2={pts[q].x}
        y2={pts[q].y}
        stroke={COLOR[v]}
        stroke-width={groups[0].includes(v) ? 5 : 3}
        stroke-linecap="round"
      />
    {/each}
    {#each VS as v (v)}
      {@const s = labelOutside(pts[v], pts, 20)}
      <text
        x={s.x}
        y={s.y + 5}
        text-anchor="middle"
        font-size="15"
        font-weight="700"
        fill={COLOR[v]}>{v}</text
      >
    {/each}

    <DragPoint drag={dA} r={8} color={COLOR.A} label="Đỉnh A, kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dB} r={8} color={COLOR.B} label="Đỉnh B, kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dC} r={8} color={COLOR.C} label="Đỉnh C, kéo hoặc dùng phím mũi tên" />
  </GeometryBoard>

  <p class="text-sm text-slate-600">
    Mỗi ô lưới dài 1 đơn vị; đỉnh đi theo từng nửa ô và không thể kéo cho ba đỉnh thẳng hàng. Góc và
    cạnh đối diện của nó có cùng màu. Độ dài làm tròn đến hai chữ số thập phân, số đo góc đến một
    chữ số thập phân.
  </p>

  <ol class="space-y-2 text-sm tabular-nums" aria-label="Xếp hạng các cạnh từ lớn đến nhỏ">
    {#each groups as g, i (g.join())}
      <li class="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 p-2">
        <span class="w-6 font-bold text-slate-500">{i + 1}.</span>
        {#each g as v (v)}
          <span class="rounded-md px-2 py-1 font-semibold text-white" style:background={COLOR[v]}>
            {OPPOSITE[v]} = {len(m.side[v])} ↔ {hat(v)} = {degText(m.angle[v])}
          </span>
        {/each}
      </li>
    {/each}
  </ol>

  <div class="space-y-1 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-950" aria-live="polite">
    <p class="font-semibold">Cạnh: {sideChain(groups)} &nbsp;⟹&nbsp; Góc: {angleChain(groups)}</p>
    <p>{feedback}</p>
  </div>
</div>
