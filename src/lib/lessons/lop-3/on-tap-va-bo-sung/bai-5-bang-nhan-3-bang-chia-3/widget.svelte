<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import TableGrid from '../_shared/table-grid.svelte';
  import {
    BASE,
    KIND_LABELS,
    buildRound,
    downMessage,
    hopsDown,
    hopsUp,
    upMessage,
  } from './engine.js';

  let mode = $state(/** @type {'nhan' | 'chia' | 'quiz'} */ ('nhan'));
  /** Hops so far on the multiplication line. */
  let step = $state(0);
  /** The row of the division table being worked. */
  let row = $state(4);
  /** Hops back so far on that row. */
  let back = $state(0);
  /** Rows of the division table worked to the end. */
  /** @type {number[]} */
  let done = $state([]);

  const start = $derived(BASE * row);
  const arrived = $derived(back >= row);

  /** @param {number} n */
  function pickRow(n) {
    row = n;
    back = 0;
  }

  function hopBack() {
    if (back >= row) return;
    back += 1;
    if (back === row && !done.includes(row)) done = [...done, row];
  }

  const big = 'min-h-12 text-lg disabled:cursor-not-allowed disabled:opacity-50';
</script>

{#snippet line(
  /** @type {number} */ value,
  /** @type {Array<{ from: number, to: number, label: string }>} */ hops,
  /** @type {string} */ label,
)}
  <NumberLine
    min={0}
    max={30}
    step={BASE}
    {value}
    interactive={false}
    width={340}
    {hops}
    {label}
    markerLabel="Vị trí đang đứng"
  />
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'nhan', label: 'Bảng nhân 3' },
      { value: 'chia', label: 'Bảng chia 3' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'nhan'}
    {@render line(BASE * step, hopsUp(step), `Tia số từ 0 đến 30, đã nhảy ${step} bước 3`)}

    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        class="{big} {button.primary}"
        disabled={step >= 10}
        onclick={() => (step += 1)}>Nhảy thêm 3</button
      >
      <button
        type="button"
        class="{big} {button.quiet}"
        disabled={step <= 0}
        onclick={() => (step -= 1)}>Lùi lại</button
      >
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {step === 10
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {upMessage(step)}
    </p>

    <TableGrid base={BASE} found={(n) => n <= step} active={step} />
  {:else if mode === 'chia'}
    <p class="text-center text-3xl font-bold tabular-nums text-slate-800">
      {start} : 3 = {arrived ? row : '?'}
    </p>

    {@render line(
      start - BASE * back,
      hopsDown(start, back),
      `Tia số từ 0 đến 30, đứng ở số ${start - BASE * back}, đã lùi ${back} bước 3`,
    )}

    <div class="flex flex-wrap gap-3">
      <button type="button" class="{big} {button.primary}" disabled={arrived} onclick={hopBack}
        >Lùi 3</button
      >
      <button
        type="button"
        class="{big} {button.quiet}"
        disabled={back === 0}
        onclick={() => (back = 0)}>Làm lại</button
      >
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {arrived
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {downMessage(row, back)}
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
      allGood="Em đã thuộc bảng nhân 3, bảng chia 3 rồi!"
    >
      {#snippet visual(/** @type {{ visual?: { n: number } }} */ q, /** @type {boolean} */ settled)}
        {@const n = settled ? (q.visual?.n ?? 0) : 0}
        {@render line(BASE * n, hopsUp(n), `Tia số từ 0 đến 30, đã nhảy ${n} bước 3`)}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
