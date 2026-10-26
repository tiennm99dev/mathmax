<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { CITIES, QUANTITIES, RAINY_MM, cityOf, summary, valueText } from './engine.js';

  /** @typedef {import('./engine.js').CityId} CityId */
  /** @typedef {import('./engine.js').Quantity} Quantity */

  const W = 460;
  const H = 280;
  const L = 44;
  const R = 44;
  const T = 28;
  const B = 30;
  const PW = W - L - R;
  const PH = H - T - B;
  const SLOT = PW / 12;
  const T_MIN = 10;
  const T_MAX = 35;

  let mode = $state('mot');
  /** @type {CityId} */
  let cityId = $state('ha-noi');
  let month = $state(1);
  /** @type {Quantity} */
  let quantity = $state('temp');
  /** @type {Record<CityId, boolean>} */
  let shownCities = $state({ 'ha-noi': true, hue: false, 'tp-hcm': true });

  const city = $derived(cityOf(cityId));
  const stats = $derived(summary(city));
  const rainTop = $derived(Math.max(400, Math.ceil(Math.max(...city.rain) / 100) * 100));
  const rainTicks = $derived(
    Array.from({ length: rainTop / 100 + 1 }, (_, i) => i * 100).filter(
      (v) => rainTop <= 400 || v % 200 === 0,
    ),
  );

  /** @param {number} i month index 0-11 */
  const cx = (i) => L + SLOT * (i + 0.5);
  /** @param {number} mm */
  const yRain = (mm) => T + PH - (mm / rainTop) * PH;
  /** @param {number} c */
  const yTemp = (c) => T + PH - ((c - T_MIN) / (T_MAX - T_MIN)) * PH;

  const tempPath = $derived(
    city.temp.map((c, i) => `${i ? 'L' : 'M'}${cx(i)} ${yTemp(c)}`).join(' '),
  );

  // Compare mode
  const q = $derived(QUANTITIES[quantity]);
  const compared = $derived(CITIES.filter((c) => shownCities[c.id]));
  const scale = $derived(
    quantity === 'temp'
      ? { lo: T_MIN, hi: T_MAX, ticks: [10, 15, 20, 25, 30, 35] }
      : quantity === 'rain'
        ? { lo: 0, hi: 800, ticks: [0, 200, 400, 600, 800] }
        : { lo: 60, hi: 95, ticks: [60, 65, 70, 75, 80, 85, 90, 95] },
  );
  /** @param {number} v */
  const yQ = (v) => T + PH - ((v - scale.lo) / (scale.hi - scale.lo)) * PH;
  /** @param {number[]} values */
  const pathOf = (values) => values.map((v, i) => `${i ? 'L' : 'M'}${cx(i)} ${yQ(v)}`).join(' ');

  const monthLine = $derived(
    mode === 'mot'
      ? `Tháng ${month} ở ${city.name}: nhiệt độ ${valueText(city.temp[month - 1], 'temp')}, lượng mưa ${valueText(city.rain[month - 1], 'rain')}, độ ẩm ${valueText(city.humid[month - 1], 'humid')}${city.rain[month - 1] >= RAINY_MM ? ' – tháng mùa mưa.' : ' – tháng mùa khô.'}`
      : compared.length
        ? `Tháng ${month}, ${q.label.toLowerCase()}: ${compared.map((c) => `${c.name} ${valueText(c[quantity][month - 1], quantity)}`).join('; ')}.`
        : 'Hãy chọn ít nhất một địa điểm để vẽ.',
  );

  const comparison = $derived.by(() => {
    if (compared.length < 2) return 'Chọn hai hoặc ba địa điểm để so sánh.';
    const parts = compared.map((c) => {
      const s = summary(c);
      if (quantity === 'temp') return `${c.name}: biên độ nhiệt ${valueText(s.tempRange, 'temp')}`;
      if (quantity === 'rain')
        return `${c.name}: tổng ${valueText(s.totalRain, 'rain')}, mùa mưa ${s.season}`;
      return `${c.name}: độ ẩm trung bình ${formatNumber(Math.round(c.humid.reduce((a, b) => a + b, 0) / 12))}%`;
    });
    return `${parts.join('; ')}.`;
  });

  /** @param {CityId} id */
  function toggle(id) {
    shownCities = { ...shownCities, [id]: !shownCities[id] };
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Kiểu biểu đồ"
    options={[
      { value: 'mot', label: 'Một địa điểm: cột và đường' },
      { value: 'so-sanh', label: 'So sánh các địa điểm' },
    ]}
    bind:value={mode}
  />

  {#if mode === 'mot'}
    <SegmentedControl
      label="Địa điểm"
      options={CITIES.map((c) => ({ value: c.id, label: c.name }))}
      bind:value={cityId}
    />
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-2xl rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label="Biểu đồ khí hậu {city.name}: cột là lượng mưa từng tháng, đường là nhiệt độ. Nhiệt độ trung bình năm {valueText(
        stats.meanTemp,
        'temp',
      )}, tổng lượng mưa {valueText(stats.totalRain, 'rain')}, mùa mưa {stats.season}."
    >
      {#each rainTicks as v (v)}
        <line x1={L} x2={W - R} y1={yRain(v)} y2={yRain(v)} stroke="#E2E8F0" />
        <text x={L - 5} y={yRain(v) + 4} font-size="10" text-anchor="end" fill="#1D4ED8">{v}</text>
      {/each}
      {#each [10, 15, 20, 25, 30, 35] as c (c)}
        <text x={W - R + 5} y={yTemp(c) + 4} font-size="10" fill="#B91C1C">{c}</text>
      {/each}
      <text x={4} y={11} font-size="10" fill="#1D4ED8">mm</text>
      <text x={W - 4} y={11} font-size="10" text-anchor="end" fill="#B91C1C">°C</text>
      <line
        x1={L}
        x2={W - R}
        y1={yRain(RAINY_MM)}
        y2={yRain(RAINY_MM)}
        stroke="#1D4ED8"
        stroke-dasharray="5 4"
      />
      {#each city.rain as mm, i (i)}
        <rect
          x={cx(i) - SLOT * 0.32}
          y={yRain(mm)}
          width={SLOT * 0.64}
          height={T + PH - yRain(mm)}
          fill={mm >= RAINY_MM ? '#2563EB' : '#93C5FD'}
          stroke={i === month - 1 ? '#0F172A' : 'none'}
          stroke-width="2"
        />
        <text x={cx(i)} y={H - B + 14} font-size="10" text-anchor="middle" fill="#475569"
          >{i + 1}</text
        >
      {/each}
      <path d={tempPath} fill="none" stroke="#DC2626" stroke-width="2.5" />
      {#each city.temp as c, i (i)}
        <circle cx={cx(i)} cy={yTemp(c)} r={i === month - 1 ? 5 : 3} fill="#DC2626" />
      {/each}
      <text x={W / 2} y={H - 3} font-size="10" text-anchor="middle" fill="#475569">tháng</text>
    </svg>
    <div class="flex flex-wrap gap-4 text-xs text-slate-700">
      <span class="flex items-center gap-1"
        ><span class="inline-block h-3 w-3 bg-blue-600"></span>tháng mưa ≥ 100 mm</span
      >
      <span class="flex items-center gap-1"
        ><span class="inline-block h-3 w-3 bg-blue-300"></span>tháng mưa &lt; 100 mm</span
      >
      <span class="flex items-center gap-1"
        ><span class="inline-block h-1 w-5 bg-red-600"></span>nhiệt độ</span
      >
    </div>
    <div class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
      <div class="rounded-lg bg-red-50 p-2">
        <p class="text-slate-600">Nhiệt độ TB năm</p>
        <p class="font-semibold tabular-nums">{valueText(stats.meanTemp, 'temp')}</p>
      </div>
      <div class="rounded-lg bg-red-50 p-2">
        <p class="text-slate-600">Biên độ nhiệt năm</p>
        <p class="font-semibold tabular-nums">{valueText(stats.tempRange, 'temp')}</p>
      </div>
      <div class="rounded-lg bg-blue-50 p-2">
        <p class="text-slate-600">Tổng lượng mưa</p>
        <p class="font-semibold tabular-nums">{valueText(stats.totalRain, 'rain')}</p>
      </div>
      <div class="rounded-lg bg-blue-50 p-2">
        <p class="text-slate-600">Mùa mưa</p>
        <p class="font-semibold">{stats.season}</p>
      </div>
    </div>
  {:else}
    <SegmentedControl
      label="Đại lượng"
      options={[
        { value: 'temp', label: 'Nhiệt độ' },
        { value: 'rain', label: 'Lượng mưa' },
        { value: 'humid', label: 'Độ ẩm' },
      ]}
      bind:value={quantity}
    />
    <fieldset class="flex flex-wrap gap-3 text-sm">
      <legend class="mb-1 font-semibold text-slate-700">Địa điểm vẽ trên biểu đồ</legend>
      {#each CITIES as c (c.id)}
        <label class="flex min-h-11 items-center gap-2">
          <input
            type="checkbox"
            class="h-5 w-5"
            style:accent-color={c.color}
            checked={shownCities[c.id]}
            onchange={() => toggle(c.id)}
          />
          <span style:color={c.color} class="font-semibold">{c.name}</span>
        </label>
      {/each}
    </fieldset>
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-2xl rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label="Biểu đồ đoạn thẳng {q.label.toLowerCase()} theo tháng của {compared
        .map((c) => c.name)
        .join(', ') || 'không địa điểm nào'}."
    >
      {#each scale.ticks as v (v)}
        <line x1={L} x2={W - R} y1={yQ(v)} y2={yQ(v)} stroke="#E2E8F0" />
        <text x={L - 5} y={yQ(v) + 4} font-size="10" text-anchor="end" fill="#475569">{v}</text>
      {/each}
      <text x={4} y={11} font-size="10" fill="#475569">{q.unit}</text>
      <line
        x1={cx(month - 1)}
        x2={cx(month - 1)}
        y1={T}
        y2={T + PH}
        stroke="#94A3B8"
        stroke-dasharray="4 4"
      />
      {#each Array.from({ length: 12 }, (_, i) => i) as i (i)}
        <text x={cx(i)} y={H - B + 14} font-size="10" text-anchor="middle" fill="#475569"
          >{i + 1}</text
        >
      {/each}
      {#each compared as c (c.id)}
        <path d={pathOf(c[quantity])} fill="none" stroke={c.color} stroke-width="2.5" />
        {#each c[quantity] as v, i (i)}
          <circle cx={cx(i)} cy={yQ(v)} r={i === month - 1 ? 5 : 3} fill={c.color} />
        {/each}
      {/each}
      <text x={W / 2} y={H - 3} font-size="10" text-anchor="middle" fill="#475569">tháng</text>
    </svg>
    <p class="text-sm text-slate-700">{comparison}</p>
  {/if}

  <SliderField label="Xem tháng" bind:value={month} min={1} max={12} format={(v) => `tháng ${v}`} />
  <FeedbackNote tone="info" text={monthLine} />
</div>
