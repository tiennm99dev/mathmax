<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { countLabel } from '#lib/core/kid/quiz.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { passFocus } from '../_shared/pass-focus.js';
  import TableGrid from '../_shared/table-grid.svelte';
  import { divLine, mulLine } from '../_shared/times.js';
  import { BASE, KIND_LABELS, MAX_WEEKS, buildRound, divMessage, mulMessage } from './engine.js';
  import WeekCalendar from './week-calendar.svelte';

  let mode = $state(/** @type {'nhan' | 'chia' | 'quiz'} */ ('nhan'));
  /** Weeks on the multiplication calendar. */
  let weeks = $state(1);
  /** The row of the division table being worked. */
  let row = $state(3);
  /** Weeks ringed so far on that row. */
  let ringed = $state(0);
  /** Rows of the division table worked to the end. */
  /** @type {number[]} */
  let done = $state([]);

  const arrived = $derived(ringed >= row);

  let moreWeeks = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
  let fewerWeeks = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
  let ringButton = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
  let resetButton = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));

  /** @param {number} n */
  function pickRow(n) {
    row = n;
    ringed = 0;
  }

  function ring() {
    if (arrived) return;
    ringed += 1;
    if (ringed === row && !done.includes(row)) done = [...done, row];
    passFocus(ringButton, resetButton);
  }

  const big = 'min-h-12 text-lg disabled:cursor-not-allowed disabled:opacity-50';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'nhan', label: 'Bảng nhân 7' },
      { value: 'chia', label: 'Bảng chia 7' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'nhan'}
    <p class="text-center text-3xl font-bold tabular-nums text-slate-800">{mulLine(BASE, weeks)}</p>

    <WeekCalendar
      {weeks}
      ringed={weeks}
      label="Tờ lịch {weeks} tuần, tất cả {BASE *
        weeks} ngày. Ngày Chủ nhật cuối cùng là ngày {BASE * weeks}."
    />

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="{big} {button.primary}"
        disabled={weeks >= MAX_WEEKS}
        bind:this={moreWeeks}
        onclick={() => {
          weeks += 1;
          passFocus(moreWeeks, fewerWeeks);
        }}>Thêm 1 tuần</button
      >
      <button
        type="button"
        class="{big} {button.quiet}"
        disabled={weeks <= 1}
        bind:this={fewerWeeks}
        onclick={() => {
          weeks -= 1;
          passFocus(fewerWeeks, moreWeeks);
        }}>Bớt 1 tuần</button
      >
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {weeks === MAX_WEEKS
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {mulMessage(weeks)}
    </p>

    <TableGrid base={BASE} found={(n) => n <= weeks} active={weeks} />
  {:else if mode === 'chia'}
    <p class="text-center text-3xl font-bold tabular-nums text-slate-800">
      {arrived ? divLine(BASE, row) : `${BASE * row} : 7 = ?`}
    </p>

    <WeekCalendar
      weeks={row}
      {ringed}
      label="Tờ lịch có {BASE * row} ngày, đã khoanh {ringed} tuần, mỗi tuần 7 ngày."
    />

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="{big} {button.primary}"
        disabled={arrived}
        bind:this={ringButton}
        onclick={ring}>Khoanh 1 tuần</button
      >
      <button
        type="button"
        class="{big} {button.quiet}"
        disabled={ringed === 0}
        bind:this={resetButton}
        onclick={() => {
          ringed = 0;
          passFocus(resetButton, ringButton);
        }}>Làm lại</button
      >
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {arrived
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {divMessage(row, ringed)}
    </p>

    <p class="text-lg font-semibold text-slate-600">Em chạm một dòng để tìm kết quả của dòng đó.</p>
    <TableGrid
      base={BASE}
      op="chia"
      found={(n) => done.includes(n)}
      active={row}
      onpick={pickRow}
    />
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Em đã thuộc bảng nhân 7, bảng chia 7 rồi!"
    >
      {#snippet visual(
        /** @type {{ visual?: { n: number, open: boolean } }} */ q,
        /** @type {boolean} */ settled,
      )}
        {#if q.visual && (q.visual.open || settled)}
          <WeekCalendar
            weeks={q.visual.n}
            ringed={settled ? q.visual.n : 0}
            numbers={false}
            label="{countLabel('tuần', q.visual.n, settled)}. Mỗi tuần 7 ngày."
          />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
