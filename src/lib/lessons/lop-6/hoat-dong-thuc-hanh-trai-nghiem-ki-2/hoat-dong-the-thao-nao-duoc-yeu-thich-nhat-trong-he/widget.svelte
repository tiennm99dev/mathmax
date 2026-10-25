<script>
  import { button, focusRing } from '#lib/core/ui.js';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { rng } from '#lib/core/drill.js';
  import SurveyChart from './survey-chart.svelte';
  import {
    SPORTS,
    bookTables,
    favouriteText,
    randomSheet,
    tally,
    topIndices,
    total,
  } from './engine.js';

  const BOY = '#2563EB';
  const GIRL = '#DB2777';
  const LOWER = '#16A34A';
  const UPPER = '#9333EA';
  const ONE = '#0EA5E9';

  let source = $state(/** @type {'phieu' | 'sach'} */ ('phieu'));
  let view = $state(/** @type {'all' | 'gender' | 'grades'} */ ('all'));

  /** @type {import('./engine.js').Sheet[]} */
  let sheets = $state([]);
  /** @type {import('./engine.js').Gender} */
  let gender = $state('nam');
  /** @type {import('./engine.js').Grades} */
  let grades = $state('6-7');
  /** @type {number | null} */
  let sport = $state(null);
  let seed = $state(2024);
  let note = $state('');

  const tables = $derived(source === 'sach' ? bookTables() : tally(sheets));
  const count = $derived(total(tables.all));
  const pct = (/** @type {number} */ v) => formatNumber(v, 2);

  const chart = $derived(
    view === 'all'
      ? {
          title: 'Số học sinh chọn mỗi môn thể thao',
          series: [{ name: 'Số học sinh', color: ONE, values: tables.all }],
        }
      : view === 'gender'
        ? {
            title: 'Số học sinh nam, nữ chọn mỗi môn',
            series: [
              { name: 'Nam', color: BOY, values: tables.boys },
              { name: 'Nữ', color: GIRL, values: tables.girls },
            ],
          }
        : {
            title: 'Số học sinh khối 6–7, khối 8–9 chọn mỗi môn',
            series: [
              { name: 'Khối 6–7', color: LOWER, values: tables.lower },
              { name: 'Khối 8–9', color: UPPER, values: tables.upper },
            ],
          },
  );

  const findings = $derived(
    view === 'all'
      ? [favouriteText(tables.all, 'cả trường', pct)]
      : view === 'gender'
        ? [
            favouriteText(tables.boys, 'học sinh nam', pct),
            favouriteText(tables.girls, 'học sinh nữ', pct),
          ]
        : [
            favouriteText(tables.lower, 'khối 6–7', pct),
            favouriteText(tables.upper, 'khối 8–9', pct),
          ],
  );
  /** The sport chosen most by the whole school, outlined in the chart and table. */
  const top = $derived(topIndices(tables.all));
  const qid = $props.id();

  function record() {
    if (sport === null) {
      note = 'Hãy chọn môn thể thao trên phiếu trước khi ghi.';
      return;
    }
    sheets.push({ gender, grades, sport });
    note = `Đã ghi phiếu số ${sheets.length}: ${gender === 'nam' ? 'nam' : 'nữ'}, khối ${grades === '6-7' ? '6–7' : '8–9'}, ${SPORTS[sport]}.`;
    sport = null;
  }

  /** @param {number} n */
  function addRandom(n) {
    const rand = rng(seed);
    for (let k = 0; k < n; k++) sheets.push(randomSheet(rand));
    seed += 1;
    note = `Đã thêm ${n} phiếu của các bạn khác. Có ${sheets.length} phiếu.`;
  }

  function clearAll() {
    sheets = [];
    note = 'Đã xoá hết phiếu.';
  }

  const cell = 'border border-slate-200 px-2 py-1.5';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Dữ liệu"
    options={[
      { value: 'phieu', label: 'Phiếu em thu thập' },
      { value: 'sach', label: 'Trường THCS Nguyễn Du (SGK)' },
    ]}
    value={source}
    onchange={(v) => (source = /** @type {'phieu' | 'sach'} */ (v))}
  />

  {#if source === 'phieu'}
    <fieldset class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
      <legend class="px-1 text-sm font-semibold text-slate-700">Phiếu hỏi</legend>
      <div class="flex flex-wrap gap-3">
        <SegmentedControl
          label="Giới tính"
          options={[
            { value: 'nam', label: 'Nam' },
            { value: 'nu', label: 'Nữ' },
          ]}
          value={gender}
          onchange={(v) => (gender = /** @type {'nam' | 'nu'} */ (v))}
        />
        <SegmentedControl
          label="Khối lớp"
          options={[
            { value: '6-7', label: 'Khối 6–7' },
            { value: '8-9', label: 'Khối 8–9' },
          ]}
          value={grades}
          onchange={(v) => (grades = /** @type {'6-7' | '8-9'} */ (v))}
        />
      </div>
      <div>
        <p class="mb-1 text-sm font-semibold text-slate-700" id={qid}>
          Hè này, môn thể thao em thích chơi nhất là gì?
        </p>
        <div class="flex flex-wrap gap-2" role="group" aria-labelledby={qid}>
          {#each SPORTS as name, i (name)}
            <button
              type="button"
              aria-pressed={sport === i}
              class="min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold {focusRing} {sport ===
              i
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'}"
              onclick={() => (sport = i)}>{name}</button
            >
          {/each}
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.primary} onclick={record}>Ghi phiếu</button>
        <button type="button" class={button.quiet} onclick={() => addRandom(20)}
          >Thêm 20 phiếu của bạn khác</button
        >
        <button type="button" class={button.quiet} onclick={clearAll} disabled={!sheets.length}
          >Xoá hết</button
        >
      </div>
      <p class="text-sm text-slate-700" aria-live="polite">
        {note || 'Điền phiếu cho từng bạn được hỏi rồi bấm "Ghi phiếu".'}
      </p>
    </fieldset>
  {/if}

  <SegmentedControl
    label="Bảng và biểu đồ"
    options={[
      { value: 'all', label: 'Cả trường' },
      { value: 'gender', label: 'Nam – Nữ' },
      { value: 'grades', label: 'Theo khối' },
    ]}
    value={view}
    onchange={(v) => (view = /** @type {'all' | 'gender' | 'grades'} */ (v))}
  />

  <div class="grid gap-4 lg:grid-cols-[16rem_1fr]">
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-sm tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-700">Bảng thống kê</caption>
        <thead>
          <tr class="bg-slate-100 text-left">
            <th class={cell}>Môn thể thao</th>
            {#each chart.series as s (s.name)}
              <th class="{cell} text-right">{s.name}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each SPORTS as name, i (name)}
            <tr class={top.includes(i) ? 'bg-amber-50 font-semibold' : ''}>
              <td class={cell}>{name}</td>
              {#each chart.series as s (s.name)}
                <td class="{cell} text-right">{fmt(s.values[i])}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr class="bg-slate-50 font-semibold">
            <td class={cell}>Tổng</td>
            {#each chart.series as s (s.name)}
              <td class="{cell} text-right">{fmt(total(s.values))}</td>
            {/each}
          </tr>
        </tfoot>
      </table>
    </div>
    <SurveyChart
      categories={SPORTS}
      series={chart.series}
      highlight={top}
      unit="Số học sinh"
      title={chart.title}
    />
  </div>

  <div
    class="space-y-1 rounded-lg p-3 text-sm {count
      ? 'bg-emerald-50 text-emerald-900'
      : 'bg-slate-50 text-slate-700'}"
    aria-live="polite"
  >
    <p class="font-semibold">Số phiếu: {fmt(count)}.</p>
    {#each findings as f (f)}
      <p>{f}</p>
    {/each}
  </div>
</div>
