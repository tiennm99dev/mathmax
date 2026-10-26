<script>
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import LineChart from '#lib/core/visuals/line-chart.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import {
    CRITERIA,
    POPULATION,
    STRUCTURE,
    YEARS,
    centralAngle,
    forecastFeedback,
    growth,
    pieMatch,
    share,
  } from './engine.js';

  /** @typedef {import('./engine.js').Criterion} Criterion */
  /** @typedef {keyof typeof STRUCTURE} StructureYear */

  let tab = $state('quat');

  // Pie chart: the learner splits the circle to match the table.
  /** @type {StructureYear} */
  let year = $state('2020');
  /** @type {Criterion} */
  let criterion = $state('residence');
  let pie = $state(fresh('residence'));

  /** @param {Criterion} c */
  function fresh(c) {
    const [p, q] = CRITERIA[c].parts;
    return [
      { label: p, value: 50 },
      { label: q, value: 50 },
    ];
  }

  const row = $derived(STRUCTURE[year]);
  const target = $derived(row[criterion]);
  const parts = $derived(CRITERIA[criterion].parts);
  const drawn = $derived((pie[0].value / (pie[0].value + pie[1].value)) * 100);
  const match = $derived(pieMatch(drawn, target[0]));

  /** @param {string | number} v */
  function pickYear(v) {
    year = /** @type {StructureYear} */ (String(v));
    pie = fresh(criterion);
  }
  /** @param {string | number} v */
  function pickCriterion(v) {
    criterion = /** @type {Criterion} */ (v);
    pie = fresh(criterion);
  }

  // Line chart: read the trend, compare two years, forecast 2021.
  let from = $state(2011);
  let to = $state(2020);
  let guess = $state(97.6);
  let checked = $state(false);
  const g = $derived(growth(Math.min(from, to), Math.max(from, to)));
  const feedback = $derived(forecastFeedback(guess));
  const labels = [...YEARS.map(String), '2021'];
  const series = $derived([
    {
      name: checked ? 'Dân số (2021: số liệu thật)' : 'Dân số (2021: dự đoán của em)',
      values: [...POPULATION, checked ? 98.51 : guess],
    },
  ]);

  /** @param {number} v */
  const mil = (v) => formatNumber(v, 2);
  const selectClass = `rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm min-h-11 ${focusRing}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Loại biểu đồ"
    options={[
      { value: 'quat', label: 'Biểu đồ quạt tròn' },
      { value: 'doan', label: 'Biểu đồ đoạn thẳng' },
    ]}
    bind:value={tab}
  />

  {#if tab === 'quat'}
    <div class="flex flex-wrap gap-4">
      <SegmentedControl
        label="Năm"
        options={Object.keys(STRUCTURE).map((y) => ({ value: y, label: y }))}
        value={year}
        onchange={pickYear}
      />
      <SegmentedControl
        label="Cơ cấu theo"
        options={Object.entries(CRITERIA).map(([value, c]) => ({ value, label: c.label }))}
        value={criterion}
        onchange={pickCriterion}
      />
    </div>

    <div class="overflow-x-auto">
      <table class="w-full min-w-72 border-collapse text-sm">
        <caption class="mb-1 text-left text-slate-600">
          Cơ cấu dân số Việt Nam theo {CRITERIA[criterion].label.toLowerCase()}, {row.source}
          ({mil(row.total)} triệu người)
        </caption>
        <thead>
          <tr class="bg-slate-100">
            <th class="border border-slate-200 px-2 py-1 text-left">Nhóm</th>
            <th class="border border-slate-200 px-2 py-1">Tỉ lệ</th>
            <th class="border border-slate-200 px-2 py-1">Góc ở tâm</th>
            <th class="border border-slate-200 px-2 py-1">Số người (triệu)</th>
          </tr>
        </thead>
        <tbody class="tabular-nums">
          {#each parts as name, i (name)}
            <tr>
              <td class="border border-slate-200 px-2 py-1">{name}</td>
              <td class="border border-slate-200 px-2 py-1 text-center"
                >{formatNumber(target[i], 1)}%</td
              >
              <td class="border border-slate-200 px-2 py-1 text-center"
                >{match.ok ? `${formatNumber(centralAngle(target[i]), 2)}°` : '?'}</td
              >
              <td class="border border-slate-200 px-2 py-1 text-center"
                >{match.ok ? `≈ ${formatFixed(share(target[i], row.total), 2)}` : '?'}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <p class="text-sm text-slate-700">
      Kéo chấm ranh giới trên vòng tròn (hoặc chọn nó rồi dùng phím mũi tên, mỗi lần 0,1%, giữ Shift
      để đi 0,5%) cho đến khi biểu đồ đúng với bảng số liệu.
    </p>
    <div class="mx-auto max-w-sm">
      <PieChart
        bind:data={pie}
        interactive
        decimals={1}
        snapPercent={0.1}
        title="Cơ cấu dân số theo {CRITERIA[criterion].label.toLowerCase()} năm {year}"
      />
    </div>

    <div
      aria-live="polite"
      class="rounded-lg p-3 text-sm {match.ok
        ? 'bg-emerald-50 font-semibold text-emerald-900'
        : 'bg-slate-50 text-slate-800'}"
    >
      {#if match.ok}
        Đúng rồi! {parts[0]}
        {formatNumber(target[0], 1)}% ứng với góc ở tâm {formatNumber(target[0], 1)} · 3,6° = {formatNumber(
          centralAngle(target[0]),
          2,
        )}°; {parts[1]} chiếm {formatNumber(centralAngle(target[1]), 2)}°. {criterion === 'sex'
          ? 'Hai phần gần bằng nhau: cơ cấu theo giới tính khá cân bằng.'
          : 'Phần nông thôn lớn hơn hẳn: phần lớn người dân vẫn sống ở nông thôn.'}
      {:else}
        Biểu đồ đang có {parts[0]}
        {formatNumber(drawn, 1)}% (góc {formatNumber(centralAngle(drawn), 1)}°). Cần {formatNumber(
          target[0],
          1,
        )}%:
        {match.gap > 0
          ? `bớt ${formatNumber(match.gap, 1)}%`
          : `thêm ${formatNumber(-match.gap, 1)}%`} cho phần {parts[0]}.
      {/if}
    </div>
  {:else}
    <p class="text-center text-sm font-semibold text-slate-800">
      Dân số trung bình của Việt Nam từ năm 2011 đến năm 2021 (triệu người)
    </p>
    <LineChart
      {labels}
      {series}
      min={85}
      max={100}
      unit="Triệu người"
      title="Dân số trung bình của Việt Nam từ năm 2011 đến năm 2021"
      width={560}
    />
    <p class="text-xs text-slate-500">Trục dọc bắt đầu từ 85 triệu để thấy rõ mức tăng mỗi năm.</p>

    <div class="flex flex-wrap items-end gap-3 text-sm">
      <label class="flex flex-col gap-1 font-semibold text-slate-700">
        Từ năm
        <select class={selectClass} bind:value={from}>
          {#each YEARS as y (y)}<option value={y}>{y}</option>{/each}
        </select>
      </label>
      <label class="flex flex-col gap-1 font-semibold text-slate-700">
        Đến năm
        <select class={selectClass} bind:value={to}>
          {#each YEARS as y (y)}<option value={y}>{y}</option>{/each}
        </select>
      </label>
    </div>
    <p class="rounded-lg bg-slate-50 p-3 text-sm text-slate-800" aria-live="polite">
      {#if g.years === 0}
        Chọn hai năm khác nhau để so sánh.
      {:else}
        Từ năm {Math.min(from, to)} đến năm {Math.max(from, to)}, dân số tăng {mil(g.total)} triệu người,
        trung bình mỗi năm tăng khoảng {formatFixed(g.perYear, 2)} triệu người.
      {/if}
    </p>

    <div class="space-y-2 rounded-lg border border-indigo-200 bg-indigo-50 p-3">
      <p class="text-sm text-indigo-950">
        Dự đoán: dựa vào xu hướng của biểu đồ, dân số năm 2021 khoảng bao nhiêu triệu người? Kéo
        thanh trượt, điểm năm 2021 trên biểu đồ di chuyển theo.
      </p>
      <SliderField
        label="Dự đoán dân số năm 2021"
        bind:value={guess}
        min={96}
        max={101}
        step={0.05}
        unit="triệu người"
        format={(v) => formatFixed(v, 2)}
        oninput={() => (checked = false)}
      />
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.primary} onclick={() => (checked = true)}>
          Kiểm tra
        </button>
        <button type="button" class={button.quiet} onclick={() => (checked = false)}>
          Dự đoán lại
        </button>
      </div>
      <p
        aria-live="polite"
        class="text-sm {checked
          ? feedback.near
            ? 'font-semibold text-emerald-900'
            : 'font-semibold text-amber-900'
          : 'text-slate-700'}"
      >
        {checked ? feedback.text : 'Bấm "Kiểm tra" để so với số liệu thật năm 2021.'}
      </p>
    </div>
  {/if}
</div>
