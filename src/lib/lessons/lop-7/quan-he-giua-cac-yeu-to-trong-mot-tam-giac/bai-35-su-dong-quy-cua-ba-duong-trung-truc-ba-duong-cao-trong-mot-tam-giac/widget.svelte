<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { degText, directionTo, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import { dist } from '#lib/geom-engine/plane.js';
  import {
    frame,
    labelOutside,
    measureTri,
    placeVertex,
    toGrid,
  } from '#lib/geom-engine/grid-triangle.js';
  import { altitudes, bisectorsOfSides, report } from './engine.js';

  const W = 400;
  const H = 300;
  const U = 25;
  const BOX = { minX: -5, maxX: 5, minY: -3.5, maxY: 3.5 };
  const { toSvg, fromSvg } = frame(U, 200, 150);
  const PER = '#4F46E5';
  const ALT = '#D97706';
  /** @type {('A' | 'B' | 'C')[]} */
  const VS = ['A', 'B', 'C'];
  /** Half-length, in grid units, of the full lines drawn through the board. */
  const FAR = 40;

  let mode = $state(/** @type {'trung-truc' | 'duong-cao'} */ ('trung-truc'));
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let pts = $state({
    A: toSvg({ x: -1, y: 3 }),
    B: toSvg({ x: -4, y: -2.5 }),
    C: toSvg({ x: 4, y: -2 }),
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

  const per = $derived(bisectorsOfSides(tri));
  const alt = $derived(altitudes(tri));
  const info = $derived(report(tri));
  const angles = $derived(measureTri(tri).angle);
  /** @param {{ x: number, y: number }} p */
  const S = (p) => toSvg(p);

  /**
   * Ends of a long line through `p` with direction `d` (grid units).
   * @param {{ x: number, y: number }} p @param {{ x: number, y: number }} d
   */
  function longLine(p, d) {
    const n = Math.hypot(d.x, d.y) || 1;
    const a = S({ x: p.x - (d.x / n) * FAR, y: p.y - (d.y / n) * FAR });
    const b = S({ x: p.x + (d.x / n) * FAR, y: p.y + (d.y / n) * FAR });
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  }

  /** Lines through the sides, so feet on extensions stay visible. */
  const sideLines = $derived(
    [
      [tri.B, tri.C],
      [tri.C, tri.A],
      [tri.A, tri.B],
    ].map(([p, q]) => longLine(p, { x: q.x - p.x, y: q.y - p.y })),
  );

  /** Board centroid in SVG units, to push labels of special points inward. */
  const gSvg = $derived(
    S({
      x: (tri.A.x + tri.B.x + tri.C.x) / 3,
      y: (tri.A.y + tri.B.y + tri.C.y) / 3,
    }),
  );

  /**
   * Label spot for O or H: up and to the right, or towards the centroid
   * when the point sits on a side or a vertex, where other labels are.
   * @param {{ x: number, y: number }} p grid point
   * @param {boolean} onEdge
   */
  function specialTag(p, onEdge) {
    const s = S(p);
    if (!onEdge) return { x: s.x + 9, y: s.y - 9 };
    const d = Math.hypot(gSvg.x - s.x, gSvg.y - s.y) || 1;
    return { x: s.x + ((gSvg.x - s.x) / d) * 20, y: s.y + ((gSvg.y - s.y) / d) * 20 + 5 };
  }

  /**
   * A point label pushed from `p` away from `from`.
   * @param {{ x: number, y: number }} p @param {{ x: number, y: number }} from
   */
  function tag(p, from, gap = 14) {
    const a = S(p);
    const b = S(from);
    const d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    return { x: a.x + ((a.x - b.x) / d) * gap, y: a.y + ((a.y - b.y) / d) * gap + 5 };
  }

  /** @param {{ x: number, y: number }} p */
  const onBoard = (p) => {
    const s = S(p);
    return s.x >= 0 && s.x <= W && s.y >= 0 && s.y <= H;
  };

  /** @param {number} v */
  const len = (v) => formatNumber(v, 2);
  const oVisible = $derived(onBoard(per.O));
  const hVisible = $derived(onBoard(alt.H));
  const hAtVertex = $derived(info.kind === 'vuong');
  /** O sits on a side or next to a midpoint label: put its label inward. */
  const oCrowded = $derived(per.place === 'canh' || per.sides.some((s) => dist(s.at, per.O) < 1));
  /** H sits on a vertex or next to a foot or vertex label: put its label inward. */
  const hCrowded = $derived(
    hAtVertex ||
      alt.rows.some((r) => dist(r.foot, alt.H) < 1) ||
      VS.some((v) => dist(tri[v], alt.H) < 1),
  );

  const feedback = $derived(
    mode === 'trung-truc'
      ? `${info.kindText}. Ba đường trung trực cùng đi qua O, và OA = ${len(per.OA)}, OB = ${len(per.OB)}, OC = ${len(per.OC)} luôn bằng nhau: đường tròn tâm O bán kính OA đi qua ba đỉnh. ${info.oText}${oVisible ? '' : ' Lúc này O ở ngoài khung hình.'}`
      : `${info.kindText}. Ba đường cao (hoặc các đường thẳng chứa chúng) cùng đi qua trực tâm H. ${info.hText}${info.kind === 'tu' ? ' Hai chân đường cao rơi trên phần kéo dài của hai cạnh kề góc tù.' : ''}${hVisible ? '' : ' Lúc này H ở ngoài khung hình.'}`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hiện các đường"
    value={mode}
    onchange={(v) => (mode = v === 'duong-cao' ? 'duong-cao' : 'trung-truc')}
    options={[
      { value: 'trung-truc', label: 'Trung trực' },
      { value: 'duong-cao', label: 'Đường cao' },
    ]}
  />

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    label={mode === 'trung-truc'
      ? 'Tam giác ABC kéo được với ba đường trung trực, điểm O và đường tròn đi qua ba đỉnh'
      : 'Tam giác ABC kéo được với ba đường cao và trực tâm H'}
  >
    {#each Array.from({ length: 17 }, (_, i) => i - 8) as gx (gx)}
      <line x1={200 + gx * U} y1="0" x2={200 + gx * U} y2={H} stroke="#F1F5F9" />
    {/each}
    {#each Array.from({ length: 13 }, (_, i) => i - 6) as gy (gy)}
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

    {#if mode === 'trung-truc'}
      {@const O = S(per.O)}
      <circle
        cx={O.x}
        cy={O.y}
        r={per.OA * U}
        fill="none"
        stroke="#0EA5E9"
        stroke-width="1.5"
        stroke-dasharray="6 4"
      />
      {#each per.sides as s (s.name)}
        {@const m = S(s.at)}
        {@const t = tag(s.at, s.opposite)}
        <line
          {...longLine(s.at, { x: s.from.y - s.to.y, y: s.to.x - s.from.x })}
          stroke={PER}
          stroke-width="2"
        />
        <path
          d={rightMarkPath(
            m,
            directionTo(m, S(s.to)),
            directionTo(m, S({ x: s.at.x + s.from.y - s.to.y, y: s.at.y + s.to.x - s.from.x })),
            7,
          )}
          fill="none"
          stroke={PER}
          stroke-width="1.5"
        />
        <circle cx={m.x} cy={m.y} r="3.5" fill={PER} />
        <text x={t.x} y={t.y} text-anchor="middle" font-size="13" font-weight="700" fill={PER}
          >{s.name}</text
        >
      {/each}
      <TickMarks from={S(tri.B)} to={S(per.sides[0].at)} count={1} color="#1F2937" />
      <TickMarks from={S(per.sides[0].at)} to={S(tri.C)} count={1} color="#1F2937" />
      <TickMarks from={S(tri.C)} to={S(per.sides[1].at)} count={2} color="#1F2937" />
      <TickMarks from={S(per.sides[1].at)} to={S(tri.A)} count={2} color="#1F2937" />
      <TickMarks from={S(tri.A)} to={S(per.sides[2].at)} count={3} color="#1F2937" />
      <TickMarks from={S(per.sides[2].at)} to={S(tri.B)} count={3} color="#1F2937" />
      {#if oVisible}
        {@const t = specialTag(per.O, oCrowded)}
        {#each VS as v (v)}
          {@const p = S(tri[v])}
          <line
            x1={O.x}
            y1={O.y}
            x2={p.x}
            y2={p.y}
            stroke="#0EA5E9"
            stroke-width="1.5"
            stroke-dasharray="3 3"
          />
        {/each}
        <circle cx={O.x} cy={O.y} r="5" fill="#DC2626" />
        <text x={t.x} y={t.y} text-anchor="middle" font-size="14" font-weight="700" fill="#B91C1C"
          >O</text
        >
      {/if}
    {:else}
      {@const Hp = S(alt.H)}
      {#each sideLines as l, i (i)}
        <line {...l} stroke="#94A3B8" stroke-width="1" stroke-dasharray="4 4" />
      {/each}
      {#each alt.rows as r (r.name)}
        {@const v = S(r.vertex)}
        {@const f = S(r.foot)}
        {@const t = tag(r.foot, r.vertex, 13)}
        <line
          {...longLine(r.vertex, { x: r.foot.x - r.vertex.x, y: r.foot.y - r.vertex.y })}
          stroke={ALT}
          stroke-width="1"
          stroke-opacity="0.5"
        />
        {#if r.len > 1e-9}
          <line x1={v.x} y1={v.y} x2={f.x} y2={f.y} stroke={ALT} stroke-width="2.5" />
          <path
            d={rightMarkPath(
              f,
              directionTo(f, v),
              directionTo(f, S(dist(r.foot, r.p) > dist(r.foot, r.q) ? r.p : r.q)),
              8,
            )}
            fill="none"
            stroke={ALT}
            stroke-width="1.5"
          />
          <circle cx={f.x} cy={f.y} r="3.5" fill={ALT} />
          {#if !hAtVertex || dist(r.foot, alt.H) > 0.3}
            <text
              x={t.x}
              y={t.y}
              text-anchor="middle"
              font-size="13"
              font-weight="700"
              fill="#B45309">{r.name}</text
            >
          {/if}
        {/if}
      {/each}
      {#if hVisible}
        {@const t = specialTag(alt.H, hCrowded)}
        <circle cx={Hp.x} cy={Hp.y} r="5" fill="#DC2626" />
        <text x={t.x} y={t.y} text-anchor="middle" font-size="14" font-weight="700" fill="#B91C1C"
          >H</text
        >
      {/if}
    {/if}

    {#each VS as v (v)}
      {@const s = labelOutside(pts[v], pts, 20)}
      <text x={s.x} y={s.y + 5} text-anchor="middle" font-size="15" font-weight="700" fill="#111827"
        >{v}</text
      >
    {/each}
    <DragPoint drag={dA} r={8} color="#1F2937" label="Đỉnh A, kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dB} r={8} color="#1F2937" label="Đỉnh B, kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dC} r={8} color="#1F2937" label="Đỉnh C, kéo hoặc dùng phím mũi tên" />
  </GeometryBoard>

  <p class="text-sm text-slate-600">
    Mỗi ô lưới dài 1 đơn vị; đỉnh đi theo từng nửa ô. Độ dài làm tròn đến hai chữ số thập phân. Thử
    kéo để được một tam giác vuông, rồi một tam giác tù.
  </p>

  <dl class="grid grid-cols-3 gap-2 text-sm tabular-nums">
    {#if mode === 'trung-truc'}
      <div class="rounded-lg bg-indigo-50 p-2">
        <dt class="text-indigo-800">OA</dt>
        <dd class="font-semibold">{len(per.OA)}</dd>
      </div>
      <div class="rounded-lg bg-indigo-50 p-2">
        <dt class="text-indigo-800">OB</dt>
        <dd class="font-semibold">{len(per.OB)}</dd>
      </div>
      <div class="rounded-lg bg-indigo-50 p-2">
        <dt class="text-indigo-800">OC</dt>
        <dd class="font-semibold">{len(per.OC)}</dd>
      </div>
    {:else}
      {#each VS as v (v)}
        <div class="rounded-lg bg-amber-50 p-2">
          <dt class="text-amber-800">Góc {v}</dt>
          <dd class="font-semibold">{degText(angles[v])}</dd>
        </div>
      {/each}
    {/if}
  </dl>

  <p class="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-950" aria-live="polite">{feedback}</p>
</div>
