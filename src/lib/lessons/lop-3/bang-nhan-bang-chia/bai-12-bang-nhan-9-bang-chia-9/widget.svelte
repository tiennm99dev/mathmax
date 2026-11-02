<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { countLabel } from '#lib/core/kid/quiz.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import DotGrid from '../_shared/dot-grid.svelte';
  import { passFocus } from '../_shared/pass-focus.js';
  import TableGrid from '../_shared/table-grid.svelte';
  import { divLine } from '../_shared/times.js';
  import DigitTable from './digit-table.svelte';
  import { BASE, KIND_LABELS, MAX_ROWS, buildRound, divMessage, patternMessage } from './engine.js';

  let mode = $state(/** @type {'nhan' | 'chia' | 'quiz'} */ ('nhan'));
  /** Rows of the coloured table shown so far. */
  let rows = $state(3);
  /** The row being read. */
  let active = $state(3);
  /** The row of the division table being worked. */
  let row = $state(5);
  /** Rows of nine ringed so far on that row. */
  let ringed = $state(0);
  /** Rows of the division table worked to the end. */
  /** @type {number[]} */
  let done = $state([]);

  const arrived = $derived(ringed >= row);

  let moreRows = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
  let fewerRows = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
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
      { value: 'nhan', label: 'Bảng nhân 9' },
      { value: 'chia', label: 'Bảng chia 9' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'nhan'}
    <div class="flex flex-wrap justify-center gap-x-4 text-lg font-semibold">
      <span class="text-sky-800">Xanh: chữ số hàng chục</span>
      <span class="text-orange-800">Cam: chữ số hàng đơn vị</span>
    </div>

    <DigitTable {rows} {active} onpick={(n) => (active = n)} />

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="{big} {button.primary}"
        disabled={rows >= MAX_ROWS}
        bind:this={moreRows}
        onclick={() => {
          rows += 1;
          active = rows;
          passFocus(moreRows, fewerRows);
        }}>Thêm 1 dòng</button
      >
      <button
        type="button"
        class="{big} {button.quiet}"
        disabled={rows <= 1}
        bind:this={fewerRows}
        onclick={() => {
          rows -= 1;
          active = rows;
          passFocus(fewerRows, moreRows);
        }}>Bớt 1 dòng</button
      >
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {rows === MAX_ROWS
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {patternMessage(active)}
    </p>
  {:else if mode === 'chia'}
    <p class="text-center text-3xl font-bold tabular-nums text-slate-800">
      {arrived ? divLine(BASE, row) : `${BASE * row} : 9 = ?`}
    </p>

    <DotGrid
      base={BASE}
      rows={row}
      {ringed}
      size={18}
      label="Có {BASE * row} chấm, đã khoanh {ringed} hàng, mỗi hàng 9 chấm."
    />

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="{big} {button.primary}"
        disabled={arrived}
        bind:this={ringButton}
        onclick={ring}>Khoanh 9 chấm</button
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
      allGood="Em đã thuộc bảng nhân 9, bảng chia 9 rồi!"
    >
      {#snippet visual(
        /** @type {{ visual?: { n: number, open: boolean } }} */ q,
        /** @type {boolean} */ settled,
      )}
        {#if q.visual && (q.visual.open || settled)}
          <DotGrid
            base={BASE}
            rows={q.visual.n}
            ringed={settled ? q.visual.n : 0}
            size={16}
            label="{countLabel('hàng chấm', q.visual.n, settled)}. Mỗi hàng 9 chấm."
          />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
