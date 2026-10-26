<script>
  import { button } from '#lib/core/ui.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import {
    along,
    arcPath,
    bisectorDir,
    degText,
    directionTo,
    sectorPath,
  } from '#lib/core/visuals/angle-math.js';
  import { MAX, MIN, fourAngles, lineDirection, rayInside, split } from './engine.js';

  const W = 400;
  const H = 280;
  const O = { x: 200, y: 140 };
  const LEN = 185;
  const Y_HANDLE = 96;
  const T_HANDLE = 100;

  /** @type {'doi-dinh' | 'ke-bu' | 'phan-giac'} */
  let mode = $state('doi-dinh');
  let theta = $state(62);
  let t = $state(20);
  let Y = $state(along(O, Y_HANDLE, 62));
  let T = $state(along(O, T_HANDLE, 20));
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const angles = $derived(fourAngles(theta));
  const parts = $derived(split(t, theta));

  /** @param {number} next */
  function setTheta(next) {
    theta = Math.max(MIN, Math.min(MAX, next));
    Y = along(O, Y_HANDLE, theta);
    setT(t);
  }
  /** @param {number} next */
  function setT(next) {
    t = Math.max(0.5, Math.min(theta - 0.5, next));
    T = along(O, T_HANDLE, t);
  }

  const dragY = $derived({
    point: Y,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => along(O, Y_HANDLE, lineDirection(directionTo(O, p))),
    onChange: () => {
      theta = lineDirection(directionTo(O, Y));
      setT(t);
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setTheta(theta + (dx < 0 || dy < 0 ? 1 : -1) * (big ? 10 : 1)),
  });

  const dragT = $derived({
    point: T,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => along(O, T_HANDLE, rayInside(directionTo(O, p), theta)),
    onChange: () => {
      t = rayInside(directionTo(O, T), theta);
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setT(t + (dx < 0 || dy < 0 ? 1 : -1) * (big ? 5 : 0.5)),
  });

  /** The four angles: rays, name, measure. */
  const sectors = $derived([
    { id: 'xOy', from: 0, to: theta, name: 'xÔy', m: angles.xOy },
    { id: 'yOx2', from: theta, to: 180, name: "yÔx'", m: angles.yOx2 },
    { id: 'x2Oy2', from: 180, to: theta + 180, name: "x'Ôy'", m: angles.x2Oy2 },
    { id: 'y2Ox', from: theta + 180, to: 360, name: "y'Ôx", m: angles.y2Ox },
  ]);

  const INDIGO = '#4F46E5';
  const AMBER = '#D97706';

  /** @param {string} id */
  function colorOf(id) {
    if (mode === 'doi-dinh') return id === 'xOy' || id === 'x2Oy2' ? INDIGO : AMBER;
    if (mode === 'ke-bu') return id === 'xOy' ? INDIGO : id === 'yOx2' ? AMBER : null;
    return null;
  }

  const ends = $derived({
    x: along(O, LEN, 0),
    x2: along(O, LEN, 180),
    y: along(O, LEN - 40, theta),
    y2: along(O, LEN - 40, theta + 180),
    t: along(O, LEN - 20, t),
  });

  const feedback = $derived.by(() => {
    const a = angles;
    if (mode === 'doi-dinh')
      return `xÔy và x'Ôy' là hai góc đối đỉnh: xÔy = x'Ôy' = ${degText(a.xOy)}. yÔx' và y'Ôx cũng đối đỉnh: yÔx' = y'Ôx = ${degText(a.yOx2)}. Xoay yy' thế nào, hai góc đối đỉnh vẫn bằng nhau.`;
    if (mode === 'ke-bu')
      return `xÔy và yÔx' có chung cạnh Oy, còn Ox và Ox' là hai tia đối nhau: chúng kề bù. ${degText(a.xOy)} + ${degText(a.yOx2)} = 180°.`;
    if (parts.isBisector)
      return `xÔt = tÔy = ${degText(parts.xOt)} = ${degText(theta)} : 2. Ot nằm giữa Ox, Oy và chia xÔy thành hai góc bằng nhau: Ot là tia phân giác của xÔy.`;
    return `xÔt = ${degText(parts.xOt)}, tÔy = ${degText(parts.tOy)}: hai góc chưa bằng nhau, Ot chưa là tia phân giác của xÔy. Xoay Ot đến khi mỗi góc bằng ${degText(theta / 2)}.`;
  });

  /** @param {string | number} v */
  function changeMode(v) {
    mode = v === 'ke-bu' ? 'ke-bu' : v === 'phan-giac' ? 'phan-giac' : 'doi-dinh';
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Quan sát"
    value={mode}
    onchange={changeMode}
    options={[
      { value: 'doi-dinh', label: 'Đối đỉnh' },
      { value: 'ke-bu', label: 'Kề bù' },
      { value: 'phan-giac', label: 'Tia phân giác' },
    ]}
  />

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Hai đường thẳng xx' và yy' cắt nhau tại O; đường thẳng yy' xoay được quanh O"
  >
    {#if mode !== 'phan-giac'}
      {#each sectors as s (s.id)}
        {@const c = colorOf(s.id)}
        {#if c}
          <path d={sectorPath(O, s.from, s.to, 44)} fill={c} fill-opacity="0.18" stroke="none" />
          <path d={arcPath(O, s.from, s.to, 44)} fill="none" stroke={c} stroke-width="2" />
        {/if}
        {@const p = along(O, 66, bisectorDir(s.from, s.to))}
        <text
          x={p.x}
          y={p.y + 5}
          font-size="13"
          font-weight="700"
          text-anchor="middle"
          fill={c ?? '#64748B'}>{degText(s.m)}</text
        >
      {/each}
    {:else}
      <path d={sectorPath(O, 0, t, 52)} fill={INDIGO} fill-opacity="0.18" />
      <path d={sectorPath(O, t, theta, 40)} fill={AMBER} fill-opacity="0.22" />
      {@const p1 = along(O, 74, t / 2)}
      {@const p2 = along(O, 62, (t + theta) / 2)}
      <text
        x={p1.x}
        y={p1.y + 5}
        font-size="12"
        font-weight="700"
        text-anchor="middle"
        fill={INDIGO}>{degText(parts.xOt)}</text
      >
      <text x={p2.x} y={p2.y + 5} font-size="12" font-weight="700" text-anchor="middle" fill={AMBER}
        >{degText(parts.tOy)}</text
      >
    {/if}

    <line
      x1={ends.x2.x}
      y1={ends.x2.y}
      x2={ends.x.x}
      y2={ends.x.y}
      stroke="#1F2937"
      stroke-width="2.5"
      stroke-opacity={mode === 'phan-giac' ? 0.35 : 1}
    />
    <line
      x1={ends.y2.x}
      y1={ends.y2.y}
      x2={ends.y.x}
      y2={ends.y.y}
      stroke="#0F766E"
      stroke-width="2.5"
      stroke-opacity={mode === 'phan-giac' ? 0.35 : 1}
    />
    {#if mode === 'phan-giac'}
      <line x1={O.x} y1={O.y} x2={ends.x.x} y2={ends.x.y} stroke="#1F2937" stroke-width="2.5" />
      <line x1={O.x} y1={O.y} x2={ends.y.x} y2={ends.y.y} stroke="#0F766E" stroke-width="2.5" />
      <line
        x1={O.x}
        y1={O.y}
        x2={ends.t.x}
        y2={ends.t.y}
        stroke={parts.isBisector ? '#059669' : '#B91C1C'}
        stroke-width="2.5"
        stroke-dasharray={parts.isBisector ? '' : '6 4'}
      />
    {/if}

    <text x={ends.x.x - 14} y={ends.x.y + 18} font-size="15" font-style="italic" font-weight="700"
      >x</text
    >
    <text x={ends.x2.x + 4} y={ends.x2.y + 18} font-size="15" font-style="italic" font-weight="700"
      >x'</text
    >
    {@const yl = along(O, 128, theta)}
    {@const yl2 = along(O, 128, theta + 180)}
    <text
      x={yl.x + 9}
      y={yl.y + 5}
      font-size="15"
      font-style="italic"
      font-weight="700"
      fill="#0F766E">y</text
    >
    <text
      x={yl2.x + 9}
      y={yl2.y + 5}
      font-size="15"
      font-style="italic"
      font-weight="700"
      fill="#0F766E">y'</text
    >
    <circle cx={O.x} cy={O.y} r="3.5" fill="#1F2937" />
    <text x={O.x - 6} y={O.y + 20} font-size="14" font-weight="700">O</text>

    <DragPoint
      drag={dragY}
      r={10}
      color="#0F766E"
      label="Điểm trên tia Oy: kéo hoặc dùng phím mũi tên để xoay đường thẳng yy', mỗi bước 1 độ, giữ Shift để bước 10 độ"
    />
    {#if mode === 'phan-giac'}
      <DragPoint
        drag={dragT}
        r={9}
        color={parts.isBisector ? '#059669' : '#B91C1C'}
        name="t"
        label="Điểm trên tia Ot: kéo hoặc dùng phím mũi tên để xoay tia Ot trong góc xOy, mỗi bước nửa độ"
      />
    {/if}
  </GeometryBoard>

  <p
    class="rounded-lg border p-3 text-sm {mode === 'phan-giac' && parts.isBisector
      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
      : 'border-slate-200 bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    {feedback}
  </p>

  {#if mode === 'phan-giac'}
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.secondary} onclick={() => setT(theta / 2)}
        >Vẽ tia phân giác</button
      >
      <button type="button" class={button.quiet} onclick={() => setT(Math.round(theta / 4))}
        >Đặt lại Ot</button
      >
    </div>
  {/if}
</div>
