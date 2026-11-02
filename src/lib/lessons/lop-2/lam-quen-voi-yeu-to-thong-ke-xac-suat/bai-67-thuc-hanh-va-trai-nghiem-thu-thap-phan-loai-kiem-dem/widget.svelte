<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import ChartSymbol from '../_shared/chart-symbol.svelte';
  import PictureChart from '../_shared/picture-chart.svelte';
  import TallyMarks from '../_shared/tally-marks.svelte';
  import { MAX_VOTES, SURVEYS, countVotes, sampleVotes, surveySummary } from './engine.js';

  let surveyId = $state(SURVEYS[0].id);
  /** The votes of each survey, kept when the child switches to another one. */
  /** @type {Record<string, number[]>} */
  let votesBy = $state(Object.fromEntries(SURVEYS.map((s) => [s.id, []])));

  const survey = $derived(SURVEYS.find((s) => s.id === surveyId) ?? SURVEYS[0]);
  const votes = $derived(votesBy[surveyId]);
  const counts = $derived(countVotes(votes, survey.choices.length));
  const rows = $derived(survey.choices.map((c, i) => ({ ...c, count: counts[i] })));
  const full = $derived(votes.length >= MAX_VOTES);
  const summary = $derived(surveySummary(rows));

  /** @param {number[]} next */
  function setVotes(next) {
    votesBy = { ...votesBy, [surveyId]: next };
  }

  /** @param {number} choice */
  function vote(choice) {
    if (!full) setVotes([...votes, choice]);
  }
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn câu hỏi khảo sát"
    hideLabel
    bind:value={surveyId}
    options={SURVEYS.map((s) => ({ value: s.id, label: s.tab }))}
  />

  <div>
    <p class="mb-2 text-xl font-bold text-slate-800">{survey.title}</p>
    <p class="mb-3 text-base text-slate-600">Mỗi bạn trả lời, em chạm một lần vào ô bạn chọn.</p>
    <div class="grid gap-3 sm:grid-cols-3" role="group" aria-label="Ghi phiếu">
      {#each survey.choices as choice, i (choice.label)}
        <button
          type="button"
          class="flex min-h-16 items-center gap-3 rounded-2xl border-4 border-slate-300 bg-white px-4 py-2 text-left text-lg font-bold text-slate-800 transition hover:border-indigo-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 {focusRing}"
          aria-label="Ghi một phiếu cho {choice.label}"
          aria-disabled={full}
          onclick={() => vote(i)}
        >
          <ChartSymbol symbol={choice.symbol} size={36} />
          {choice.label}
        </button>
      {/each}
    </div>
  </div>

  <table class="w-full border-collapse bg-white text-lg text-slate-800">
    <caption class="pb-2 text-left text-base font-semibold text-slate-600"> Bảng kiểm đếm </caption>
    <thead class="bg-slate-50 text-base font-semibold text-slate-600">
      <tr>
        <th scope="col" class="border border-slate-200 p-2 text-left">Loại</th>
        <th scope="col" class="border border-slate-200 p-2 text-left">Vạch</th>
        <th scope="col" class="border border-slate-200 p-2">Số</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row.label)}
        <tr>
          <th scope="row" class="border border-slate-200 p-2 text-left font-medium">{row.label}</th>
          <td class="border border-slate-200 p-2"><TallyMarks count={row.count} settled /></td>
          <td class="w-14 border border-slate-200 p-2 text-center text-2xl font-bold tabular-nums">
            {row.count}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <PictureChart {rows} title="Biểu đồ tranh: {survey.title}" settled />

  <p
    class="rounded-2xl bg-slate-100 px-4 py-3 text-xl font-semibold text-slate-800"
    aria-live="polite"
  >
    {full ? `Bảng đã đủ ${MAX_VOTES} phiếu. ` : ''}{summary}
  </p>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={votes.length === 0}
      onclick={() => setVotes(votes.slice(0, -1))}>Bỏ phiếu vừa ghi</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={votes.length === 0}
      onclick={() => setVotes([])}>Xóa hết</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      onclick={() => setVotes(sampleVotes(survey))}>Xem tổ mẫu</button
    >
  </div>
</div>
