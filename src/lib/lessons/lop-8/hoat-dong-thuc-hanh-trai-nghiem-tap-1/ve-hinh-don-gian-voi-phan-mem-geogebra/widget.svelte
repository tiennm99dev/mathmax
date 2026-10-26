<script>
  import { button } from '#lib/core/ui.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { DEFAULTS, FIGURES, bounds, construction, ratioOnSide } from './engine.js';

  /** @typedef {import('./engine.js').Figure} Figure */
  /** @typedef {import('./engine.js').Pt} Pt */
  /** @typedef {import('./engine.js').Drawn} Drawn */

  const W = 440;
  const H = 330;
  const PAD = 30;
  const FAR = 2000;
  /** Thalès uses a fixed view so the board does not move while dragging. */
  const THALES_VIEW = { s: 36, ox: 80, oy: 290 };

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let figure = $state(/** @type {Figure} */ ('chu-nhat'));
  let shown = $state(1);
  let showHelpers = $state(false);
  let ab = $state(DEFAULTS.ab);
  let bc = $state(DEFAULTS.bc);
  let angle = $state(DEFAULTS.angle);
  let big = $state(DEFAULTS.big);
  let small = $state(DEFAULTS.small);
  let legAC = $state(DEFAULTS.legAC);
  let legDE = $state(DEFAULTS.legDE);
  let apex = $state({ ...DEFAULTS.apex });
  let t = $state(DEFAULTS.t);

  const built = $derived(
    construction(figure, { ab, bc, angle, big, small, legAC, legDE, apex, t }),
  );
  const steps = $derived(built.steps);
  const at = $derived(Math.min(shown, steps.length));
  const done = $derived(at >= steps.length);
  const current = $derived(steps[at - 1]);

  const view = $derived.by(() => {
    if (figure === 'thales') return THALES_VIEW;
    const b = bounds(steps);
    const s = Math.min(
      40,
      (W - 2 * PAD) / Math.max(b.maxX - b.minX, 1),
      (H - 2 * PAD) / Math.max(b.maxY - b.minY, 1),
    );
    return {
      s,
      ox: W / 2 - ((b.minX + b.maxX) / 2) * s,
      oy: H / 2 + ((b.minY + b.maxY) / 2) * s,
    };
  });

  /** @param {Pt} p @returns {Pt} */
  const toScreen = (p) => ({ x: view.ox + p.x * view.s, y: view.oy - p.y * view.s });
  /** @param {Pt} p @returns {Pt} */
  const toMath = (p) => ({ x: (p.x - view.ox) / view.s, y: (view.oy - p.y) / view.s });

  /** Objects on the board, helpers dimmed or hidden. */
  const drawn = $derived(
    steps
      .slice(0, at)
      .flatMap((s) =>
        s.draw
          .filter(
            (d) =>
              (d.kind === 'point' || !s.helper || showHelpers || !done) &&
              !(done && d.kind === 'point' && built.hideAtEnd?.includes(d.name)),
          )
          .map((d) => ({ d, helper: !!s.helper })),
      ),
  );

  /** Points drawn as drag handles in the Thalès figure. */
  const handles = $derived(figure === 'thales' ? ['A', ...(at >= 2 ? ['M'] : [])] : []);

  /** @param {Pt} p @param {Pt} d */
  function longLine(p, d) {
    const q = toScreen(p);
    const len = Math.hypot(d.x, d.y);
    const k = FAR / len;
    return { x1: q.x - d.x * k, y1: q.y + d.y * k, x2: q.x + d.x * k, y2: q.y - d.y * k };
  }

  /** @param {Pt} p @param {Pt} through */
  function ray(p, through) {
    const a = toScreen(p);
    const b = toScreen(through);
    const k = FAR / Math.hypot(b.x - a.x, b.y - a.y);
    return { x1: a.x, y1: a.y, x2: a.x + (b.x - a.x) * k, y2: a.y + (b.y - a.y) * k };
  }

  /** @param {Pt} at @param {Pt} from @param {Pt} to */
  function arc(at, from, to) {
    const o = toScreen(at);
    const p0 = toScreen(from);
    const q0 = toScreen(to);
    const r = 20;
    const u = { x: p0.x - o.x, y: p0.y - o.y };
    const v = { x: q0.x - o.x, y: q0.y - o.y };
    const lu = Math.hypot(u.x, u.y);
    const lv = Math.hypot(v.x, v.y);
    const p = { x: o.x + (u.x / lu) * r, y: o.y + (u.y / lu) * r };
    const q = { x: o.x + (v.x / lv) * r, y: o.y + (v.y / lv) * r };
    const sweep = u.x * v.y - u.y * v.x > 0 ? 1 : 0;
    return `M ${o.x} ${o.y} L ${p.x} ${p.y} A ${r} ${r} 0 0 ${sweep} ${q.x} ${q.y} Z`;
  }

  /** @param {Pt[]} pts */
  const polygonPoints = (pts) =>
    pts
      .map(toScreen)
      .map((p) => `${p.x},${p.y}`)
      .join(' ');

  /** Label position: away from the figure's centre. @param {Pt} p */
  function labelAt(p) {
    const b = bounds(steps);
    const c = { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 };
    const d = { x: p.x - c.x, y: p.y - c.y };
    const len = Math.hypot(d.x, d.y) || 1;
    const q = toScreen(p);
    return { x: q.x + (d.x / len) * 14 - 4, y: q.y - (d.y / len) * 14 + 5 };
  }

  /** @param {Extract<Drawn, { kind: 'point' }>} o */
  const pointLabelFor = (o) =>
    o.name.includes('≡') ? { x: toScreen(o.p).x + 8, y: toScreen(o.p).y - 8 } : labelAt(o.p);

  /** @param {string | number} value */
  function choose(value) {
    figure = /** @type {Figure} */ (value);
    shown = 1;
  }

  /** Drag params for the Thalès apex A. */
  const dragApex = $derived({
    point: toScreen(apex),
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {Pt} p */
    projector: (p) => {
      moveApex(toMath(p));
      return toScreen(apex);
    },
    /** @param {number} dx @param {number} dy @param {boolean} bigStep */
    onKeyMove: (dx, dy, bigStep) => {
      const k = bigStep ? 1 : 0.25;
      moveApex({ x: apex.x + dx * k, y: apex.y - dy * k });
    },
  });

  /** @param {Pt} p */
  function moveApex(p) {
    apex = {
      x: Math.round(Math.max(-1.5, Math.min(7.5, p.x)) * 4) / 4,
      y: Math.round(Math.max(1.5, Math.min(7, p.y)) * 4) / 4,
    };
  }

  const mPoint = $derived({
    x: apex.x + (0 - apex.x) * t,
    y: apex.y + (0 - apex.y) * t,
  });

  /** Drag params for M on side AB. */
  const dragM = $derived({
    point: toScreen(mPoint),
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {Pt} p */
    projector: (p) => {
      t = Math.round(ratioOnSide(toMath(p), apex) * 100) / 100;
      return toScreen(mPoint);
    },
    /** @param {number} dx @param {number} dy @param {boolean} bigStep */
    onKeyMove: (dx, dy, bigStep) => {
      const step = (bigStep ? 0.1 : 0.05) * (dx + dy >= 0 ? 1 : -1);
      if (dx === 0 && dy === 0) return;
      t = Math.round(Math.max(0.1, Math.min(0.9, t + step)) * 100) / 100;
    },
  });

  /** @param {import('./engine.js').Measure} m */
  const showMeasure = (m) =>
    m.unit === 'deg'
      ? `${formatFixed(m.value, 2)}°`
      : m.unit === 'cm'
        ? `${formatFixed(m.value, 2)} cm`
        : formatFixed(m.value, 2);

  const status = $derived(
    done
      ? `${built.ok ? 'Xong.' : 'Không dựng được.'} ${built.verdict}`
      : `Bước ${at}/${steps.length} – công cụ "${current.tool}": ${current.text}`,
  );

  /** @param {number} v */
  const cm = (v) => formatFixed(v, 1);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hình cần dựng"
    options={[...FIGURES]}
    value={figure}
    onchange={choose}
  />

  {#if figure === 'chu-nhat'}
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField label="AB" bind:value={ab} min={2} max={8} step={0.5} unit="cm" format={cm} />
      <SliderField label="BC" bind:value={bc} min={1} max={6} step={0.5} unit="cm" format={cm} />
    </div>
  {:else if figure === 'binh-hanh'}
    <div class="grid gap-3 sm:grid-cols-3">
      <SliderField label="AB" bind:value={ab} min={2} max={8} step={0.5} unit="cm" format={cm} />
      <SliderField label="BC" bind:value={bc} min={1} max={6} step={0.5} unit="cm" format={cm} />
      <SliderField
        label="Góc ABC"
        bind:value={angle}
        min={30}
        max={150}
        step={5}
        format={(v) => `${v}°`}
      />
    </div>
  {:else if figure === 'hinh-thang'}
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField
        label="Đáy lớn AD"
        bind:value={big}
        min={2}
        max={9}
        step={0.5}
        unit="cm"
        format={cm}
      />
      <SliderField
        label="Đáy nhỏ EC"
        bind:value={small}
        min={1}
        max={8}
        step={0.5}
        unit="cm"
        format={cm}
      />
      <SliderField
        label="Cạnh bên AC"
        bind:value={legAC}
        min={1}
        max={6}
        step={0.5}
        unit="cm"
        format={cm}
      />
      <SliderField
        label="Cạnh bên DE"
        bind:value={legDE}
        min={1}
        max={6}
        step={0.5}
        unit="cm"
        format={cm}
      />
    </div>
  {/if}

  <ol class="space-y-1 text-sm">
    {#each steps as s, i (i)}
      <li
        class="rounded-lg px-3 py-2 {i === at - 1
          ? 'bg-indigo-50 font-semibold text-indigo-900'
          : i < at
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

  <div class="flex flex-wrap items-center gap-2">
    <button
      type="button"
      class={button.quiet}
      onclick={() => (shown = Math.max(1, at - 1))}
      disabled={at <= 1}
    >
      Bước trước
    </button>
    <button
      type="button"
      class={button.primary}
      onclick={() => (shown = Math.min(steps.length, at + 1))}
      disabled={done}
    >
      Bước tiếp
    </button>
    <button type="button" class={button.quiet} onclick={() => (shown = 1)}>Làm lại</button>
    <label class="flex min-h-11 items-center gap-2 text-sm text-slate-700">
      <input type="checkbox" class="h-5 w-5 accent-indigo-600" bind:checked={showHelpers} />
      Hiện đối tượng phụ khi xong
    </label>
  </div>

  <div class="grid gap-3 md:grid-cols-[1fr_13rem]">
    <GeometryBoard
      bind:svgEl
      width={W}
      height={H}
      interactive={figure === 'thales'}
      maxWidth="max-w-xl"
      label="Vùng làm việc mô phỏng GeoGebra: {FIGURES.find((f) => f.value === figure)
        ?.label}{figure === 'thales' ? ', kéo được điểm A và điểm M' : ''}"
    >
      {#each { length: Math.ceil(W / view.s) + 2 } as _, i (i)}
        {@const x = (view.ox % view.s) + (i - 1) * view.s}
        <line x1={x} y1="0" x2={x} y2={H} stroke="#E2E8F0" stroke-width="1" />
      {/each}
      {#each { length: Math.ceil(H / view.s) + 2 } as _, i (i)}
        {@const y = (view.oy % view.s) + (i - 1) * view.s}
        <line x1="0" y1={y} x2={W} y2={y} stroke="#E2E8F0" stroke-width="1" />
      {/each}
      {#each drawn as { d, helper }, i (i)}
        {#if d.kind === 'circle'}
          {@const c = toScreen(d.c)}
          <circle
            cx={c.x}
            cy={c.y}
            r={d.r * view.s}
            fill="none"
            stroke="#94A3B8"
            stroke-width="1.5"
            stroke-dasharray="4 4"
          />
        {:else if d.kind === 'line'}
          <line
            {...longLine(d.p, d.d)}
            stroke={helper ? '#94A3B8' : '#7C3AED'}
            stroke-width="1.5"
            stroke-dasharray={helper ? '6 5' : null}
          />
        {:else if d.kind === 'ray'}
          <line
            {...ray(d.p, d.through)}
            stroke="#94A3B8"
            stroke-width="1.5"
            stroke-dasharray="6 5"
          />
        {:else if d.kind === 'segment'}
          {@const a = toScreen(d.a)}
          {@const b = toScreen(d.b)}
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#334155" stroke-width="2.5" />
        {:else if d.kind === 'polygon'}
          <polygon
            points={polygonPoints(d.pts)}
            fill="#6366F1"
            fill-opacity="0.12"
            stroke="#4338CA"
            stroke-width="2.5"
          />
        {:else if d.kind === 'angle'}
          <path d={arc(d.at, d.from, d.to)} fill="#16A34A" fill-opacity="0.25" stroke="#16A34A" />
        {/if}
      {/each}
      {#each drawn as { d }, i (i)}
        {#if d.kind === 'point' && !handles.includes(d.name)}
          {@const p = toScreen(d.p)}
          {@const lab = pointLabelFor(d)}
          <circle cx={p.x} cy={p.y} r="4.5" fill="#475569" />
          <text x={lab.x} y={lab.y} font-size="14" fill="#1F2937">{d.name}</text>
        {/if}
      {/each}
      {#if handles.includes('A')}
        <DragPoint
          drag={dragApex}
          r={8}
          color="#1565C0"
          name="A"
          nameDx={10}
          nameDy={-10}
          label="Điểm A: kéo hoặc dùng phím mũi tên để đổi hình dạng tam giác"
        />
      {/if}
      {#if handles.includes('M')}
        <DragPoint
          drag={dragM}
          r={8}
          color="#7C3AED"
          name="M"
          nameDx={-22}
          nameDy={-6}
          label="Điểm M trên cạnh AB: kéo hoặc dùng phím mũi tên để dời M dọc AB"
        />
      {/if}
    </GeometryBoard>

    <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
      <p class="mb-2 font-semibold text-slate-700">Đo trên hình</p>
      {#if done && built.measures.length}
        <ul class="space-y-1 tabular-nums text-slate-800">
          {#each built.measures as m (m.label)}
            <li>{m.label} = {showMeasure(m)}</li>
          {/each}
        </ul>
      {:else if done}
        <p class="text-rose-700">Không có hình để đo.</p>
      {:else}
        <p class="text-slate-600">Làm hết các bước để đo độ dài và số đo góc.</p>
      {/if}
      <p class="mt-2 text-xs text-slate-500">
        {figure === 'thales'
          ? 'Mỗi ô lưới dài 1 cm. Kéo A hoặc M (hoặc chọn điểm rồi dùng phím mũi tên).'
          : 'Mỗi ô lưới dài 1 cm. Kéo thanh trượt để đổi số liệu: hình dựng lại ngay.'}
      </p>
    </div>
  </div>

  <p
    class="rounded-lg p-3 text-sm {done
      ? built.ok
        ? 'bg-emerald-50 font-semibold text-emerald-900'
        : 'bg-rose-50 font-semibold text-rose-900'
      : 'bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    {status}
  </p>
</div>
