<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { directionTo, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import { frame, labelSpot, placeVertex, toGrid } from '../_shared/triangle-board.js';
  import { bisectors, medians } from './engine.js';

  const W = 400;
  const H = 300;
  const U = 30;
  const BOX = { minX: -6, maxX: 6, minY: -4.5, maxY: 4.5 };
  const { toSvg, fromSvg } = frame(U, 200, 150);
  const MED = '#4F46E5';
  const BIS = '#D97706';
  /** @type {('A' | 'B' | 'C')[]} */
  const VS = ['A', 'B', 'C'];

  let mode = $state(/** @type {'trung-tuyen' | 'phan-giac'} */ ('trung-tuyen'));
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let pts = $state({
    A: toSvg({ x: -1.5, y: 3.5 }),
    B: toSvg({ x: -4.5, y: -3 }),
    C: toSvg({ x: 4.5, y: -2 }),
  });

  /** @param {{ x: number, y: number }} p SVG point to grid point */
  function grid(p) {
    const g = fromSvg(p);
    return { x: toGrid(g.x), y: toGrid(g.y) };
  }
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

  const med = $derived(medians(tri));
  const bis = $derived(bisectors(tri));
  /** @param {{ x: number, y: number }} p */
  const S = (p) => toSvg(p);

  const bisLines = $derived([
    { name: 'D', from: tri.A, to: bis.D },
    { name: 'E', from: tri.B, to: bis.E },
    { name: 'F', from: tri.C, to: bis.F },
  ]);
  /** Feet of the perpendiculars from I, each with an end of its side. */
  const feet = $derived([
    { name: 'H', at: bis.H, side: tri.C, end: bis.D },
    { name: 'K', at: bis.K, side: tri.A, end: bis.E },
    { name: 'L', at: bis.L, side: tri.B, end: bis.F },
  ]);

  /** @param {number} v */
  const len = (v) => formatNumber(v, 2);

  /**
   * A point label offset from `p` away from the point `from`.
   * @param {{ x: number, y: number }} p @param {{ x: number, y: number }} from
   */
  function tag(p, from, gap = 14) {
    const a = S(p);
    const b = S(from);
    const d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    return { x: a.x + ((a.x - b.x) / d) * gap, y: a.y + ((a.y - b.y) / d) * gap + 5 };
  }

  /**
   * Shifts the labels of a foot and of the bisector end on the same side
   * apart along that side, so the two never sit on top of each other.
   * Returns the shift for the foot's label; the end's label takes the
   * opposite one.
   * @param {{ at: { x: number, y: number }, side: { x: number, y: number }, end: { x: number, y: number } }} ft
   */
  function spread(ft) {
    const f = S(ft.at);
    const e = S(ft.end);
    let dx = f.x - e.x;
    let dy = f.y - e.y;
    if (Math.hypot(dx, dy) < 1) {
      const s = S(ft.side);
      dx = s.x - f.x;
      dy = s.y - f.y;
    }
    const d = Math.hypot(dx, dy) || 1;
    return { x: (dx / d) * 8, y: (dy / d) * 8 };
  }
  const shifts = $derived(feet.map(spread));

  const feedback = $derived(
    mode === 'trung-tuyen'
      ? `Ba đường trung tuyến AM, BN, CP cùng đi qua trọng tâm G. Trên mỗi đường: AG : AM = ${len(med.rows[0].ratio)}, BG : BN = ${len(med.rows[1].ratio)}, CG : CP = ${len(med.rows[2].ratio)}, đều bằng 2/3; và AG = ${len(med.rows[0].toG)} gấp đôi GM = ${len(med.rows[0].rest)}.`
      : `Ba đường phân giác AD, BE, CF cùng đi qua điểm I. Khoảng cách từ I đến ba cạnh: IH = ${len(bis.IH)}, IK = ${len(bis.IK)}, IL = ${len(bis.IL)}, luôn bằng nhau.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hiện các đường"
    value={mode}
    onchange={(v) => (mode = v === 'phan-giac' ? 'phan-giac' : 'trung-tuyen')}
    options={[
      { value: 'trung-tuyen', label: 'Trung tuyến' },
      { value: 'phan-giac', label: 'Phân giác' },
    ]}
  />

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    label={mode === 'trung-tuyen'
      ? 'Tam giác ABC kéo được với ba đường trung tuyến và trọng tâm G'
      : 'Tam giác ABC kéo được với ba đường phân giác, điểm I và khoảng cách từ I đến ba cạnh'}
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
      fill-opacity="0.06"
      stroke="#1F2937"
      stroke-width="2.5"
      stroke-linejoin="round"
    />

    {#if mode === 'trung-tuyen'}
      {@const G = S(med.G)}
      {#each med.rows as r (r.from)}
        {@const v = S(r.vertex)}
        {@const e = S(r.end)}
        {@const t = tag(r.end, med.G)}
        <line x1={v.x} y1={v.y} x2={G.x} y2={G.y} stroke={MED} stroke-width="2.5" />
        <line x1={G.x} y1={G.y} x2={e.x} y2={e.y} stroke="#0EA5E9" stroke-width="2.5" />
        <circle cx={e.x} cy={e.y} r="3.5" fill={MED} />
        <text x={t.x} y={t.y} text-anchor="middle" font-size="13" font-weight="700" fill={MED}
          >{r.to}</text
        >
      {/each}
      <TickMarks from={S(tri.B)} to={S(med.M)} count={1} color="#1F2937" />
      <TickMarks from={S(med.M)} to={S(tri.C)} count={1} color="#1F2937" />
      <TickMarks from={S(tri.C)} to={S(med.N)} count={2} color="#1F2937" />
      <TickMarks from={S(med.N)} to={S(tri.A)} count={2} color="#1F2937" />
      <TickMarks from={S(tri.A)} to={S(med.P)} count={3} color="#1F2937" />
      <TickMarks from={S(med.P)} to={S(tri.B)} count={3} color="#1F2937" />
      <circle cx={G.x} cy={G.y} r="5" fill="#DC2626" />
      <text x={G.x + 8} y={G.y - 8} font-size="14" font-weight="700" fill="#B91C1C">G</text>
    {:else}
      {@const I = S(bis.I)}
      {#each bisLines as b, i (b.name)}
        {@const v = S(b.from)}
        {@const e = S(b.to)}
        {@const t0 = tag(b.to, bis.I)}
        {@const t = { x: t0.x - shifts[i].x, y: t0.y - shifts[i].y }}
        <line x1={v.x} y1={v.y} x2={e.x} y2={e.y} stroke={BIS} stroke-width="2.5" />
        <circle cx={e.x} cy={e.y} r="3.5" fill={BIS} />
        <text x={t.x} y={t.y} text-anchor="middle" font-size="13" font-weight="700" fill="#B45309"
          >{b.name}</text
        >
      {/each}
      {#each feet as ft, i (ft.name)}
        {@const f = S(ft.at)}
        {@const sd = S(ft.side)}
        {@const t0 = tag(ft.at, bis.I, 12)}
        {@const t = { x: t0.x + shifts[i].x, y: t0.y + shifts[i].y }}
        <line
          x1={I.x}
          y1={I.y}
          x2={f.x}
          y2={f.y}
          stroke="#059669"
          stroke-width="2"
          stroke-dasharray="5 4"
        />
        <path
          d={rightMarkPath(f, directionTo(f, I), directionTo(f, sd), 8)}
          fill="none"
          stroke="#059669"
          stroke-width="1.5"
        />
        <TickMarks from={I} to={f} count={1} color="#059669" />
        <text x={t.x} y={t.y} text-anchor="middle" font-size="12" font-weight="700" fill="#047857"
          >{ft.name}</text
        >
      {/each}
      <circle cx={I.x} cy={I.y} r="5" fill="#DC2626" />
      <text x={I.x + 8} y={I.y - 8} font-size="14" font-weight="700" fill="#B91C1C">I</text>
    {/if}

    {#each VS as v (v)}
      {@const s = labelSpot(pts[v], pts, 20)}
      <text x={s.x} y={s.y + 5} text-anchor="middle" font-size="15" font-weight="700" fill="#111827"
        >{v}</text
      >
    {/each}
    <DragPoint drag={dA} r={8} color="#1F2937" label="Đỉnh A, kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dB} r={8} color="#1F2937" label="Đỉnh B, kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dC} r={8} color="#1F2937" label="Đỉnh C, kéo hoặc dùng phím mũi tên" />
  </GeometryBoard>

  <p class="text-sm text-slate-600">
    Mỗi ô lưới dài 1 đơn vị; đỉnh đi theo từng nửa ô. Độ dài và tỉ số làm tròn đến hai chữ số thập
    phân.
  </p>

  {#if mode === 'trung-tuyen'}
    <table class="w-full text-sm tabular-nums">
      <caption class="sr-only">Độ dài các đường trung tuyến và tỉ số với trọng tâm G</caption>
      <thead>
        <tr class="text-left text-slate-500">
          <th class="py-1 font-medium">Trung tuyến</th>
          <th class="py-1 font-medium">Đỉnh đến G</th>
          <th class="py-1 font-medium">G đến trung điểm</th>
          <th class="py-1 font-medium">Tỉ số</th>
        </tr>
      </thead>
      <tbody>
        {#each med.rows as r (r.from)}
          <tr class="border-t border-slate-100">
            <td class="py-1 font-semibold">{r.from}{r.to} = {len(r.whole)}</td>
            <td class="py-1">{r.from}G = {len(r.toG)}</td>
            <td class="py-1">G{r.to} = {len(r.rest)}</td>
            <td class="py-1 font-semibold text-indigo-700">{len(r.ratio)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <dl class="grid grid-cols-3 gap-2 text-sm tabular-nums">
      <div class="rounded-lg bg-emerald-50 p-2">
        <dt class="text-emerald-800">IH (đến BC)</dt>
        <dd class="font-semibold">{len(bis.IH)}</dd>
      </div>
      <div class="rounded-lg bg-emerald-50 p-2">
        <dt class="text-emerald-800">IK (đến CA)</dt>
        <dd class="font-semibold">{len(bis.IK)}</dd>
      </div>
      <div class="rounded-lg bg-emerald-50 p-2">
        <dt class="text-emerald-800">IL (đến AB)</dt>
        <dd class="font-semibold">{len(bis.IL)}</dd>
      </div>
    </dl>
  {/if}

  <p class="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-950" aria-live="polite">{feedback}</p>
</div>
