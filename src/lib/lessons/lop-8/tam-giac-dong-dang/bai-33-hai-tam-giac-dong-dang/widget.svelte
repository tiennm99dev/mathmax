<script>
  import { triangle, sides } from '#lib/geom-engine/triangle.js';
  import { add, scale, sub, vec } from '#lib/geom-engine/vec.js';
  import { tickPositions } from '#lib/geom-engine/ticks.js';

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

  const ticks1AB = tickPositions(A, B, 1);
  const ticks1BC = tickPositions(B, C, 2);
  const ticks1CA = tickPositions(C, A, 3);
  const ticks2AB = $derived(tickPositions(t2.a, t2.b, 1));
  const ticks2BC = $derived(tickPositions(t2.b, t2.c, 2));
  const ticks2CA = $derived(tickPositions(t2.c, t2.a, 3));
</script>

<div class="space-y-4">
  <div>
    <svg
      viewBox="0 0 {VIEW_W} {VIEW_H}"
      preserveAspectRatio="xMidYMid meet"
      class="block w-full bg-white rounded-lg border border-slate-200"
      role="img"
      aria-label="Tam giác ABC và tam giác A′B′C′ đồng dạng"
    >
      <!-- △ABC fixed -->
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#444" stroke-width="2" />
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#444" stroke-width="2" />
      <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} stroke="#444" stroke-width="2" />
      {#each ticks1AB as t, i (i)}<line
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={PAIR1}
          stroke-width="2.5"
          stroke-linecap="round"
        />{/each}
      {#each ticks1BC as t, i (i)}<line
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={PAIR2}
          stroke-width="2.5"
          stroke-linecap="round"
        />{/each}
      {#each ticks1CA as t, i (i)}<line
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={PAIR3}
          stroke-width="2.5"
          stroke-linecap="round"
        />{/each}

      <text x={A.x - 14} y={A.y - 6} font-size="14" font-weight="700" fill="#1F2937">A</text>
      <text x={B.x + 6} y={B.y - 6} font-size="14" font-weight="700" fill="#1F2937">B</text>
      <text x={C.x - 4} y={C.y + 18} font-size="14" font-weight="700" fill="#1F2937">C</text>

      <!-- △A'B'C' scaled -->
      <line x1={t2.a.x} y1={t2.a.y} x2={t2.b.x} y2={t2.b.y} stroke="#444" stroke-width="2" />
      <line x1={t2.b.x} y1={t2.b.y} x2={t2.c.x} y2={t2.c.y} stroke="#444" stroke-width="2" />
      <line x1={t2.c.x} y1={t2.c.y} x2={t2.a.x} y2={t2.a.y} stroke="#444" stroke-width="2" />
      {#each ticks2AB as t (t.x1 + ',' + t.y1)}<line
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={PAIR1}
          stroke-width="2.5"
          stroke-linecap="round"
        />{/each}
      {#each ticks2BC as t (t.x1 + ',' + t.y1)}<line
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={PAIR2}
          stroke-width="2.5"
          stroke-linecap="round"
        />{/each}
      {#each ticks2CA as t (t.x1 + ',' + t.y1)}<line
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={PAIR3}
          stroke-width="2.5"
          stroke-linecap="round"
        />{/each}

      <text x={t2.a.x - 14} y={t2.a.y - 6} font-size="14" font-weight="700" fill="#1F2937">A′</text>
      <text x={t2.b.x + 6} y={t2.b.y - 6} font-size="14" font-weight="700" fill="#1F2937">B′</text>
      <text x={t2.c.x - 4} y={t2.c.y + 18} font-size="14" font-weight="700" fill="#1F2937">C′</text>
    </svg>
  </div>

  <div>
    <label class="block">
      <span class="text-sm font-semibold text-slate-700"
        >Hệ số phóng k: <span class="tabular-nums">{k.toFixed(2)}</span></span
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
      <div><span style="color:{PAIR1}" class="font-semibold">AB:</span> {s1.ab.toFixed(1)}</div>
      <div><span style="color:{PAIR1}" class="font-semibold">A′B′:</span> {s2.ab.toFixed(1)}</div>
      <div><span style="color:{PAIR2}" class="font-semibold">BC:</span> {s1.bc.toFixed(1)}</div>
      <div><span style="color:{PAIR2}" class="font-semibold">B′C′:</span> {s2.bc.toFixed(1)}</div>
      <div><span style="color:{PAIR3}" class="font-semibold">CA:</span> {s1.ca.toFixed(1)}</div>
      <div><span style="color:{PAIR3}" class="font-semibold">C′A′:</span> {s2.ca.toFixed(1)}</div>
    </div>
    <p
      class="mt-3 rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-sm text-indigo-900 tabular-nums"
    >
      Tỉ số A′B′/AB = B′C′/BC = C′A′/CA = <strong>{k.toFixed(2)}</strong>
    </p>
  </div>
</div>
