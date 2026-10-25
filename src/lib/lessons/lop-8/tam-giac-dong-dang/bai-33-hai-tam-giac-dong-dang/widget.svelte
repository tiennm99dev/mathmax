<script>
  import { formatFixed } from '#lib/core/number-format.js';
  import { triangle, sides } from '#lib/geom-engine/triangle.js';
  import { add, scale, sub, vec } from '#lib/geom-engine/vec.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';

  const VIEW_W = 400;
  const VIEW_H = 300;
  const PAIR1 = '#D7263D';
  const PAIR2 = '#1B998B';
  const PAIR3 = '#F46036';

  // △ABC fixed; centroid near (101.67, 146.67).
  const A = vec(70, 110);
  const B = vec(140, 130);
  const C = vec(95, 200);
  const CENTROID_ABC = vec((A.x + B.x + C.x) / 3, (A.y + B.y + C.y) / 3);
  const CENTROID_TARGET = vec(300, 145);

  let k = $state(1);

  const t2 = $derived.by(() => {
    /** @param {{x: number, y: number}} p */
    const make = (p) => add(CENTROID_TARGET, scale(sub(p, CENTROID_ABC), k));
    return triangle(make(A), make(B), make(C));
  });
  const s1 = sides(triangle(A, B, C));
  const s2 = $derived(sides(t2));

  /** Side i joins vertex i to vertex i + 1 and carries i + 1 ticks in colour PAIRS[i]. */
  const PAIRS = [PAIR1, PAIR2, PAIR3];
  const SIDE_TICKS = /** @type {const} */ ([1, 2, 3]);
  const NAME_OFFSETS = [
    { dx: -14, dy: -6 },
    { dx: 6, dy: -6 },
    { dx: -4, dy: 18 },
  ];
  const shapes = $derived([
    { pts: [A, B, C], names: ['A', 'B', 'C'] },
    { pts: [t2.a, t2.b, t2.c], names: ['A′', 'B′', 'C′'] },
  ]);
</script>

<div class="space-y-4">
  <div>
    <GeometryBoard width={VIEW_W} height={VIEW_H} label="Tam giác ABC và tam giác A′B′C′ đồng dạng">
      {#each shapes as shape, si (si)}
        {#each shape.pts as p, i (i)}
          {@const q = shape.pts[(i + 1) % 3]}
          <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#444" stroke-width="2" />
          <TickMarks from={p} to={q} count={SIDE_TICKS[i]} color={PAIRS[i]} />
        {/each}
        {#each shape.pts as p, i (i)}
          <text
            x={p.x + NAME_OFFSETS[i].dx}
            y={p.y + NAME_OFFSETS[i].dy}
            font-size="14"
            font-weight="700"
            fill="#1F2937">{shape.names[i]}</text
          >
        {/each}
      {/each}
    </GeometryBoard>
  </div>

  <div>
    <label class="block">
      <span class="text-sm font-semibold text-slate-700"
        >Hệ số phóng k: <span class="tabular-nums">{formatFixed(k, 2)}</span></span
      >
      <input
        type="range"
        min="0.4"
        max="2"
        step="0.05"
        bind:value={k}
        class="mt-2 w-full accent-indigo-600"
        aria-label="Hệ số phóng k"
      />
    </label>
    <p class="mt-2 text-sm text-slate-500">Kéo thanh trượt để phóng to hoặc thu nhỏ △A′B′C′</p>
  </div>

  <div>
    <h3 class="mb-3 font-bold text-slate-900">Cạnh tương ứng</h3>
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
    <p
      class="mt-3 rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-sm text-indigo-900 tabular-nums"
    >
      Tỉ số A′B′/AB = B′C′/BC = C′A′/CA = <strong>{formatFixed(k, 2)}</strong>
    </p>
  </div>
</div>
