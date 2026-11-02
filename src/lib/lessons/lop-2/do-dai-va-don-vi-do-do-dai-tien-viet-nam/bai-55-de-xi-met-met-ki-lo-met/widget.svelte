<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import {
    BAR_MAX,
    BAR_TASKS,
    ROAD_MAX,
    ROAD_STEP,
    ROAD_TASKS,
    STOPS,
    barFeedback,
    barParts,
    roadFeedback,
  } from './engine.js';

  let mode = $state(/** @type {'bar' | 'road'} */ ('bar'));

  let barTask = $state(0);
  let dm = $state(0);
  let roadTask = $state(0);
  let m = $state(0);

  const parts = $derived(barParts(dm));
  const task = $derived(BAR_TASKS[barTask]);
  const stop = $derived(ROAD_TASKS[roadTask]);
  const feedback = $derived(mode === 'bar' ? barFeedback(task, dm) : roadFeedback(stop, m));

  function next() {
    if (mode === 'bar') {
      barTask = (barTask + 1) % BAR_TASKS.length;
      dm = 0;
    } else {
      roadTask = (roadTask + 1) % ROAD_TASKS.length;
      m = 0;
    }
  }

  // The bar: 1 dm is 11 units, drawn so a metre is a long stretch at 390 px.
  const BAR_X = 12;
  const BAR_U = 11;
  const BAR_W = BAR_X * 2 + BAR_MAX * BAR_U;
  // The road.
  const ROAD_X = 30;
  const ROAD_W = 300;
  const roadX = (/** @type {number} */ v) => ROAD_X + (v / ROAD_MAX) * ROAD_W;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Trò chơi"
    hideLabel
    options={[
      { value: 'bar', label: 'Thanh đo: dm, cm, m' },
      { value: 'road', label: 'Quãng đường: m, km' },
    ]}
    bind:value={mode}
  />

  {#if mode === 'bar'}
    <p class="text-xl font-semibold text-slate-800">
      Kéo thanh đo dài đúng <strong class="text-indigo-700">{task.text}</strong>.
    </p>
    <div class="rounded-2xl bg-sky-50 p-2">
      <svg
        viewBox="0 0 {BAR_W} 74"
        class="w-full"
        role="img"
        aria-label="Thanh đo dài {dm} đề-xi-mét, chia thành từng đề-xi-mét; mỗi 10 đề-xi-mét là 1 mét."
      >
        <rect
          x={BAR_X}
          y="14"
          width={BAR_MAX * BAR_U}
          height="26"
          rx="3"
          fill="#fff"
          stroke="#94a3b8"
        />
        <rect x={BAR_X} y="14" width={dm * BAR_U} height="26" rx="3" fill="#818cf8" />
        {#each { length: BAR_MAX + 1 } as _, k (k)}
          <line
            x1={BAR_X + k * BAR_U}
            y1={k % 10 === 0 ? 8 : 14}
            x2={BAR_X + k * BAR_U}
            y2={k % 10 === 0 ? 46 : 40}
            stroke="#334155"
            stroke-width={k % 10 === 0 ? 2.5 : 1}
          />
        {/each}
        {#each [0, 1, 2, 3] as metre (metre)}
          <text
            x={BAR_X + metre * 10 * BAR_U}
            y="64"
            text-anchor={metre === 0 ? 'start' : metre === 3 ? 'end' : 'middle'}
            font-size="17"
            font-weight="700"
            fill="#334155">{metre} m</text
          >
        {/each}
      </svg>
    </div>

    <SliderField label="Độ dài thanh đo" bind:value={dm} min={0} max={BAR_MAX} unit="dm" />

    <dl class="grid grid-cols-3 gap-2 text-center">
      <div class="rounded-2xl bg-indigo-100 p-2">
        <dt class="text-sm text-indigo-800">Đề-xi-mét</dt>
        <dd class="text-xl font-bold whitespace-nowrap text-indigo-950 tabular-nums">
          {parts.dm} dm
        </dd>
      </div>
      <div class="rounded-2xl bg-emerald-100 p-2">
        <dt class="text-sm text-emerald-800">Xăng-ti-mét</dt>
        <dd class="text-xl font-bold whitespace-nowrap text-emerald-950 tabular-nums">
          {parts.cm} cm
        </dd>
      </div>
      <div class="rounded-2xl bg-amber-100 p-2">
        <dt class="text-sm text-amber-800">Mét</dt>
        <dd class="text-xl font-bold whitespace-nowrap text-amber-950 tabular-nums">
          {parts.m === null ? '…' : `${parts.m} m`}
        </dd>
      </div>
    </dl>
  {:else}
    <p class="text-xl font-semibold text-slate-800">
      Đưa bạn nhỏ đi từ nhà đến <strong class="text-indigo-700">{stop.name}</strong>.
    </p>
    <div class="rounded-2xl bg-emerald-50 p-2">
      <svg
        viewBox="0 0 360 152"
        class="w-full"
        role="img"
        aria-label="Con đường dài 1 ki-lô-mét từ nhà đến chợ, đi qua cửa hàng, trường học và công viên. Bạn nhỏ đã đi {m} mét."
      >
        <line
          x1={ROAD_X}
          y1="48"
          x2={ROAD_X + ROAD_W}
          y2="48"
          stroke="#64748b"
          stroke-width="16"
          stroke-linecap="round"
        />
        <line
          x1={ROAD_X}
          y1="48"
          x2={ROAD_X + ROAD_W}
          y2="48"
          stroke="#f8fafc"
          stroke-width="2"
          stroke-dasharray="8 8"
        />
        {#each { length: ROAD_MAX / ROAD_STEP + 1 } as _, k (k)}
          <line
            x1={roadX(k * ROAD_STEP)}
            y1="58"
            x2={roadX(k * ROAD_STEP)}
            y2="64"
            stroke="#475569"
            stroke-width="1.5"
          />
        {/each}
        {#each STOPS as s, i (s.m)}
          <line
            x1={roadX(s.m)}
            y1="40"
            x2={roadX(s.m)}
            y2="16"
            stroke={s.m === stop.m ? '#4f46e5' : '#94a3b8'}
            stroke-width="2.5"
          />
          <path
            d="M {roadX(s.m)} 16 l 14 5 l -14 5 z"
            fill={s.m === stop.m ? '#4f46e5' : '#94a3b8'}
          />
          <text
            x={roadX(s.m)}
            y={i % 2 === 0 ? 84 : 120}
            text-anchor="middle"
            font-size="16"
            font-weight={s.m === stop.m ? 700 : 500}
            fill="#1e293b">{s.short}</text
          >
          <text
            x={roadX(s.m)}
            y={i % 2 === 0 ? 102 : 138}
            text-anchor="middle"
            font-size="15"
            fill="#475569">{s.m} m</text
          >
        {/each}
        <g transform="translate({roadX(m)} 30)">
          <circle cy="-8" r="7" fill="#fbbf24" stroke="#92400e" />
          <rect x="-6" y="-2" width="12" height="16" rx="4" fill="#ef4444" />
        </g>
      </svg>
    </div>

    <SliderField
      label="Quãng đường đã đi"
      bind:value={m}
      min={0}
      max={ROAD_MAX}
      step={ROAD_STEP}
      format={(v) => String(v)}
      unit="m"
    />
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {feedback.done
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if feedback.done}<span aria-hidden="true">⭐ </span>{/if}{feedback.text}
  </p>

  <button
    type="button"
    class="min-h-12 text-lg {feedback.done ? button.primary : button.secondary}"
    onclick={next}>Việc khác</button
  >
</div>
