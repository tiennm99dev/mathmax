<script>
  import { button } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { TASKS, angleAt, clipLine, construction, dist, geogebraAngle, rotate } from './engine.js';

  const W = 400;
  const H = 300;
  /** SVG units per GeoGebra unit: the grid square. */
  const UNIT = 40;
  const EDGE = 12;
  const MIN_GAP = 40;
  const TARGETS = [30, 45, 60, 90, 120, 150];

  /** @type {Record<import('./engine.js').Task, Array<{ x: number, y: number }>>} */
  const START = {
    'duong-thang': [
      { x: 80, y: 200 },
      { x: 200, y: 200 },
      { x: 260, y: 90 },
    ],
    'trung-diem': [
      { x: 80, y: 180 },
      { x: 320, y: 140 },
    ],
    'do-goc': [
      { x: 160, y: 220 },
      { x: 330, y: 220 },
      { x: 250, y: 80 },
    ],
    'goc-cho-truoc': [
      { x: 200, y: 200 },
      { x: 330, y: 200 },
    ],
  };

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let task = $state(/** @type {import('./engine.js').Task} */ ('duong-thang'));
  let shown = $state(1);
  let pts = $state(START['duong-thang'].map((p) => ({ ...p })));
  let deg = $state(60);
  let target = $state(90);

  /** @type {readonly string[]} */
  const names = $derived(TASKS.find((t) => t.value === task)?.points ?? []);
  const built = $derived(construction(task, pts, deg));
  const steps = $derived(built.steps);
  const done = $derived(shown >= steps.length);
  const drawn = $derived(steps.slice(0, shown).flatMap((s) => s.draw));
  const current = $derived(steps[Math.min(shown, steps.length) - 1]);

  /**
   * Whether the free points `q` keep the whole task on the board.
   * @param {Array<{ x: number, y: number }>} q
   */
  function fits(q) {
    const inside = (/** @type {{ x: number, y: number }} */ p) =>
      p.x >= EDGE && p.x <= W - EDGE && p.y >= EDGE && p.y <= H - EDGE;
    if (!q.every(inside)) return false;
    for (let i = 0; i < q.length; i++)
      for (let j = i + 1; j < q.length; j++) if (dist(q[i], q[j]) < MIN_GAP) return false;
    if (task === 'goc-cho-truoc' && !inside(rotate(q[1], q[0], deg))) return false;
    return true;
  }

  /** @param {number} i */
  function dragFor(i) {
    const point = pts[i];
    /** @param {{ x: number, y: number }} p */
    const allowed = (p) => fits(pts.map((o, k) => (k === i ? p : o)));
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => {
        const q = { x: Math.round(p.x), y: Math.round(p.y) };
        return allowed(q) ? q : { x: point.x, y: point.y };
      },
      /** @param {number} dx @param {number} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => {
        const s = big ? 10 : 2;
        const q = { x: point.x + dx * s, y: point.y + dy * s };
        if (allowed(q)) {
          point.x = q.x;
          point.y = q.y;
        }
      },
    };
  }

  /** @param {string | number} value */
  function choose(value) {
    task = /** @type {import('./engine.js').Task} */ (value);
    shown = 1;
    pts = START[task].map((p) => ({ ...p }));
  }

  /** @param {number} v */
  function setDeg(v) {
    const ok =
      fits(pts) &&
      (() => {
        const p = rotate(pts[1], pts[0], v);
        return p.x >= EDGE && p.x <= W - EDGE && p.y >= EDGE && p.y <= H - EDGE;
      })();
    if (!ok) {
      // Bring A back to the right of O, where every angle up to 180° fits.
      pts[0].x = 200;
      pts[0].y = 200;
      pts[1].x = 330;
      pts[1].y = 200;
    }
    deg = v;
  }

  /** @param {number} v */
  const len = (v) => formatFixed(v / UNIT, 2);

  /**
   * SVG arc for the angle at `at` between rays towards `from` and `to`,
   * always the part not bigger than 180°.
   * @param {{ x: number, y: number }} at
   * @param {{ x: number, y: number }} from
   * @param {{ x: number, y: number }} to
   */
  function arc(at, from, to) {
    const r = 24;
    /** @param {{ x: number, y: number }} q */
    const onRay = (q) => {
      const d = dist(at, q);
      return { x: at.x + ((q.x - at.x) / d) * r, y: at.y + ((q.y - at.y) / d) * r };
    };
    const p = onRay(from);
    const q = onRay(to);
    const sweep = geogebraAngle(from, at, to) <= 180 ? 0 : 1;
    return `M ${at.x} ${at.y} L ${p.x} ${p.y} A ${r} ${r} 0 0 ${sweep} ${q.x} ${q.y} Z`;
  }

  /**
   * Where to put the size label of an angle: along its bisector.
   * @param {{ x: number, y: number }} at
   * @param {{ x: number, y: number }} from
   * @param {{ x: number, y: number }} to
   */
  function arcLabel(at, from, to) {
    const u = { x: (from.x - at.x) / dist(at, from), y: (from.y - at.y) / dist(at, from) };
    const v = { x: (to.x - at.x) / dist(at, to), y: (to.y - at.y) / dist(at, to) };
    let bx = u.x + v.x;
    let by = u.y + v.y;
    const n = Math.hypot(bx, by);
    if (n < 1e-6) {
      bx = -u.y;
      by = u.x;
    } else {
      bx /= n;
      by /= n;
    }
    return { x: at.x + bx * 44, y: at.y + by * 44 + 4 };
  }

  const angleNow = $derived(task === 'do-goc' ? angleAt(pts[1], pts[0], pts[2]) : 0);
  const hit = $derived(Math.abs(angleNow - target) <= 1);

  const status = $derived(
    !done
      ? `Bước ${shown}/${steps.length} – công cụ "${current.tool}": ${current.text}`
      : task === 'do-goc'
        ? hit
          ? `Đạt yêu cầu: góc AOB bằng khoảng ${formatNumber(angleNow, 0)}°. ${built.verdict}`
          : `Góc AOB đang là ${formatNumber(angleNow, 1)}°. Kéo A hoặc B để góc AOB bằng ${target}°. ${built.verdict}`
        : `Xong. ${built.verdict}`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn nhiệm vụ"
    options={TASKS.map((t) => ({ value: t.value, label: t.label }))}
    value={task}
    onchange={choose}
  />

  {#if task === 'goc-cho-truoc'}
    <div class="max-w-sm">
      <SliderField
        label="Số đo góc gõ vào GeoGebra"
        value={deg}
        min={10}
        max={180}
        step={5}
        unit="°"
        oninput={setDeg}
      />
    </div>
  {/if}
  {#if task === 'do-goc'}
    <SegmentedControl
      label="Thử thách: kéo điểm để góc AOB bằng"
      options={TARGETS.map((t) => ({ value: t, label: `${t}°` }))}
      value={target}
      onchange={(v) => (target = Number(v))}
    />
  {/if}

  <ol class="space-y-1 text-sm">
    {#each steps as s, i (i)}
      <li
        class="rounded-lg px-3 py-2 {i === shown - 1
          ? 'bg-indigo-50 font-semibold text-indigo-900'
          : i < shown
            ? 'text-slate-500'
            : 'text-slate-400'}"
      >
        <span class="mr-1 inline-block rounded bg-white px-1.5 text-xs ring-1 ring-slate-300"
          >{s.tool}</span
        >
        {i + 1}. {s.text}
      </li>
    {/each}
  </ol>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.quiet}
      onclick={() => (shown = Math.max(1, shown - 1))}
      disabled={shown <= 1}
    >
      Bước trước
    </button>
    <button
      type="button"
      class={button.primary}
      onclick={() => (shown = Math.min(steps.length, shown + 1))}
      disabled={done}
    >
      Bước tiếp
    </button>
    <button type="button" class={button.quiet} onclick={() => (shown = 1)}>Làm lại</button>
  </div>

  <div class="grid gap-3 md:grid-cols-[1fr_13rem]">
    <GeometryBoard
      bind:svgEl
      width={W}
      height={H}
      interactive
      maxWidth="max-w-lg"
      label="Vùng làm việc mô phỏng GeoGebra, nhiệm vụ {TASKS.find(
        (t) => t.value === task,
      )?.label.toLowerCase()}, với các điểm {names.join(', ')} kéo được"
    >
      {#each { length: W / UNIT - 1 } as _, i (i)}
        <line x1={(i + 1) * UNIT} y1="0" x2={(i + 1) * UNIT} y2={H} stroke="#E2E8F0" />
      {/each}
      {#each { length: H / UNIT } as _, i (i)}
        <line x1="0" y1={(i + 1) * UNIT} x2={W} y2={(i + 1) * UNIT} stroke="#E2E8F0" />
      {/each}
      {#each drawn as o, i (i)}
        {#if o.kind === 'line' || o.kind === 'ray'}
          {@const ends = clipLine(o.a, o.b, W, H, o.kind === 'ray')}
          {#if ends}
            <line
              x1={ends[0].x}
              y1={ends[0].y}
              x2={ends[1].x}
              y2={ends[1].y}
              stroke={o.kind === 'line' ? '#334155' : '#7C3AED'}
              stroke-width="2.5"
            />
          {/if}
        {:else if o.kind === 'segment'}
          <line x1={o.a.x} y1={o.a.y} x2={o.b.x} y2={o.b.y} stroke="#C2410C" stroke-width="3.5" />
        {:else if o.kind === 'angle'}
          {@const at = arcLabel(o.at, o.from, o.to)}
          <path d={arc(o.at, o.from, o.to)} fill="#16A34A" fill-opacity="0.3" stroke="#16A34A" />
          <text
            x={at.x}
            y={at.y}
            text-anchor="middle"
            font-size="13"
            font-weight="700"
            fill="#166534">{formatNumber(angleAt(o.from, o.at, o.to), 1)}°</text
          >
        {/if}
      {/each}
      {#each drawn as o, i (i)}
        {#if o.kind === 'point' && !names.includes(o.name)}
          <circle cx={o.p.x} cy={o.p.y} r="5" fill="#475569" />
          <text x={o.p.x + 8} y={o.p.y - 8} font-size="14" fill="#1F2937">{o.name}</text>
        {/if}
      {/each}
      {#each names as name, i (task + name)}
        <DragPoint
          drag={dragFor(i)}
          r={8}
          color="#1565C0"
          {name}
          nameDx={10}
          nameDy={20}
          label="Điểm {name}: kéo hoặc dùng phím mũi tên để dời; hình vẽ thay đổi theo"
        />
      {/each}
    </GeometryBoard>

    <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
      <p class="mb-2 font-semibold text-slate-700">Đo trên hình</p>
      {#if done}
        <ul class="space-y-1 tabular-nums text-slate-800">
          {#each built.measures as m (m.label)}
            <li>
              {m.label} = {m.unit === 'deg' ? `${formatNumber(m.value, 1)}°` : len(m.value)}
            </li>
          {/each}
          {#if task === 'do-goc'}
            <li class="pt-1 text-xs text-slate-600">
              GeoGebra đo ngược chiều kim đồng hồ: nháy A, O, B thì hiện {formatNumber(
                geogebraAngle(pts[1], pts[0], pts[2]),
                1,
              )}°; nháy B, O, A thì hiện {formatNumber(geogebraAngle(pts[2], pts[0], pts[1]), 1)}°.
              Số đo góc AOB là số không lớn hơn 180°.
            </li>
          {/if}
        </ul>
      {:else}
        <p class="text-slate-600">Làm hết các bước để xem số đo.</p>
      {/if}
      <p class="mt-2 text-xs text-slate-500">Mỗi ô lưới dài 1 đơn vị.</p>
    </div>
  </div>

  <p
    class="rounded-lg p-3 text-sm {done && (task !== 'do-goc' || hit)
      ? 'bg-emerald-50 font-semibold text-emerald-900'
      : 'bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    {status}
  </p>
</div>
