<script>
  import { formatFixed } from '#lib/core/number-format.js';
  import { triangle, sides, congruentSSS } from '#lib/geom-engine/triangle.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';

  const VIEW_W = 400;
  const VIEW_H = 300;
  const PAIR1 = '#D7263D';
  const PAIR2 = '#1B998B';
  const PAIR3 = '#F46036';

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  let a = $state({ x: 60, y: 80 });
  let b = $state({ x: 180, y: 80 });
  let c = $state({ x: 120, y: 220 });
  let ap = $state({ x: 220, y: 80 });
  let bp = $state({ x: 340, y: 80 });
  let cp = $state({ x: 280, y: 220 });

  const t1 = $derived(triangle(a, b, c));
  const t2 = $derived(triangle(ap, bp, cp));
  const s1 = $derived(sides(t1));
  const s2 = $derived(sides(t2));
  const isCongruent = $derived(congruentSSS(t1, t2));

  /** Both triangles: vertices, visible names and how each name sits off its vertex. */
  const shapes = $derived([
    { pts: [a, b, c], names: ['A', 'B', 'C'] },
    { pts: [ap, bp, cp], names: ['A′', 'B′', 'C′'] },
  ]);
  const NAME_OFFSETS = [
    { dx: -16, dy: -14 },
    { dx: 12, dy: -14 },
    { dx: -4, dy: 24 },
  ];
  /** Side i joins vertex i to vertex i + 1 and carries i + 1 ticks in colour PAIRS[i]. */
  const PAIRS = [PAIR1, PAIR2, PAIR3];
  const SIDE_TICKS = /** @type {const} */ ([1, 2, 3]);

  const getSvg = () => svgEl ?? null;
  /** @param {{x: number, y: number}} point */
  const dragOpts = (point) => ({ point, svg: getSvg, viewBox: { w: VIEW_W, h: VIEW_H } });
</script>

<div class="space-y-4">
  <div>
    <div class="flex items-center justify-end mb-2 min-h-[28px]">
      {#if isCongruent}
        <span
          class="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200"
        >
          ✓ Hai tam giác bằng nhau (c.c.c)
        </span>
      {/if}
    </div>

    <GeometryBoard
      bind:svgEl
      width={VIEW_W}
      height={VIEW_H}
      interactive
      label="Kéo bất kỳ đỉnh nào của hai tam giác hoặc dùng phím mũi tên"
    >
      {#each shapes as shape, si (si)}
        {#each shape.pts as p, i (i)}
          {@const q = shape.pts[(i + 1) % 3]}
          <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#444" stroke-width="2" />
          <TickMarks from={p} to={q} count={SIDE_TICKS[i]} color={PAIRS[i]} />
        {/each}
      {/each}

      {#each shapes as shape, si (si)}
        {#each shape.pts as p, i (i)}
          <DragPoint
            drag={dragOpts(p)}
            name={shape.names[i]}
            nameDx={NAME_OFFSETS[i].dx}
            nameDy={NAME_OFFSETS[i].dy}
            label="Đỉnh {shape.names[i].replace('′', "'")} — kéo hoặc dùng phím mũi tên"
          />
        {/each}
      {/each}
    </GeometryBoard>
    <p class="mt-2 text-center text-sm text-slate-500">
      Kéo bất kỳ đỉnh nào của hai tam giác hoặc dùng phím mũi tên
    </p>
  </div>

  <div>
    <h3 class="mb-3 font-bold text-slate-900">Độ dài cạnh</h3>
    <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm tabular-nums" aria-live="polite">
      <div>
        <span style="color:{PAIR1}" class="font-semibold">AB:</span>
        {formatFixed(s1.ab, 1)}
      </div>
      <div>
        <span style="color:{PAIR1}" class="font-semibold">A′B′:</span>
        {formatFixed(s2.ab, 1)}
      </div>
      <div>
        <span style="color:{PAIR2}" class="font-semibold">BC:</span>
        {formatFixed(s1.bc, 1)}
      </div>
      <div>
        <span style="color:{PAIR2}" class="font-semibold">B′C′:</span>
        {formatFixed(s2.bc, 1)}
      </div>
      <div>
        <span style="color:{PAIR3}" class="font-semibold">CA:</span>
        {formatFixed(s1.ca, 1)}
      </div>
      <div>
        <span style="color:{PAIR3}" class="font-semibold">C′A′:</span>
        {formatFixed(s2.ca, 1)}
      </div>
    </div>
  </div>
</div>
