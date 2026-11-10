<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import DataSymbol from '../_shared/data-symbol.svelte';
  import NumberTable from '../_shared/number-table.svelte';
  import TallyMarks from '../_shared/tally-marks.svelte';
  import { MAX_COUNT, SURVEYS, setCount, surveySummary } from './engine.js';

  let surveyId = $state(SURVEYS[0].id);
  /** The counts of each survey, kept when the child switches to another one. */
  /** @type {Record<string, number[]>} */
  let countsBy = $state(Object.fromEntries(SURVEYS.map((s) => [s.id, s.choices.map(() => 0)])));

  const survey = $derived(SURVEYS.find((s) => s.id === surveyId) ?? SURVEYS[0]);
  const counts = $derived(countsBy[surveyId]);
  const rows = $derived(survey.choices.map((c, i) => ({ ...c, count: counts[i] })));
  const summary = $derived(surveySummary(rows));

  /** @param {number[]} next */
  function save(next) {
    countsBy = { ...countsBy, [surveyId]: next };
  }

  /** @param {number} i @param {number | string} value */
  function change(i, value) {
    save(setCount(counts, i, value));
  }

  const stepButton = `flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-slate-300 bg-white text-2xl font-bold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`;
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn câu hỏi khảo sát"
    hideLabel
    bind:value={surveyId}
    options={SURVEYS.map((s) => ({ value: s.id, label: s.tab }))}
  />

  <div class="rounded-2xl bg-amber-50 p-4">
    <p class="text-xl font-bold text-slate-800">Phiếu khảo sát: {survey.title}</p>
    <p class="mb-3 text-base text-slate-600">
      Mỗi bạn trả lời, em bấm + ở lựa chọn của bạn đó. Đếm trên giấy rồi thì em gõ số vào ô.
    </p>
    <ul class="space-y-3">
      {#each rows as row, i (row.label)}
        <li class="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
          <span class="flex min-w-36 flex-1 items-center gap-2 text-lg font-bold text-slate-800">
            <DataSymbol symbol={row.symbol} size={32} />
            {row.label}
          </span>
          <span class="flex items-center gap-2">
            <button
              type="button"
              class={stepButton}
              aria-label="Bớt một bạn chọn {row.label}"
              disabled={row.count <= 0}
              onclick={() => change(i, row.count - 1)}>−</button
            >
            <input
              type="number"
              inputmode="numeric"
              min="0"
              max={MAX_COUNT}
              class="h-12 w-16 rounded-xl border-2 border-slate-300 text-center text-2xl font-bold tabular-nums {focusRing}"
              aria-label="Số bạn chọn {row.label}"
              value={row.count}
              onchange={(e) => {
                change(i, e.currentTarget.value);
                e.currentTarget.value = String(countsBy[surveyId][i]);
              }}
            />
            <button
              type="button"
              class={stepButton}
              aria-label="Thêm một bạn chọn {row.label}"
              disabled={row.count >= MAX_COUNT}
              onclick={() => change(i, row.count + 1)}>+</button
            >
          </span>
          <span class="w-full"><TallyMarks count={row.count} /></span>
        </li>
      {/each}
    </ul>
  </div>

  <NumberTable
    caption="Bảng số liệu: {survey.title}"
    nameHead={survey.head}
    countHead="Số bạn"
    columns={rows.map((r) => ({ label: r.label, symbol: r.symbol, count: r.count }))}
  />

  <p
    class="rounded-2xl bg-slate-100 px-4 py-3 text-xl font-semibold text-slate-800"
    aria-live="polite"
  >
    {summary}
  </p>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={counts.every((c) => c === 0)}
      onclick={() => save(counts.map(() => 0))}>Xoá hết</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      onclick={() => save([...survey.sample])}>Xem lớp mẫu</button
    >
  </div>
</div>
