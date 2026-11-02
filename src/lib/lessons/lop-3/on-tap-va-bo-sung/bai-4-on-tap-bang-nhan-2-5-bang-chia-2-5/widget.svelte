<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import { countLabel, optionText } from '#lib/core/kid/quiz.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { mulLine } from '../_shared/times.js';
  import TableGrid from '../_shared/table-grid.svelte';
  import DotGrid from './dot-grid.svelte';
  import { MAX_ROWS, SKILLS, divMessage, mulMessage, relatedDivisions } from './engine.js';

  let mode = $state(/** @type {'grid' | 'quiz'} */ ('grid'));
  let way = $state(/** @type {'nhan' | 'chia'} */ ('nhan'));
  let base = $state(5);
  let rows = $state(3);
  /** Rows ringed while dividing. */
  let ringed = $state(0);

  const total = $derived(base * rows);
  const allRinged = $derived(ringed >= rows);
  const message = $derived(
    way === 'nhan' ? mulMessage(base, rows) : divMessage(base, rows, ringed),
  );
  const gridLabel = $derived(
    way === 'nhan' || allRinged
      ? `${rows} hàng chấm, mỗi hàng ${base} chấm.`
      : `Có ${total} chấm, đã khoanh ${ringed} hàng.`,
  );

  /** @param {string | number} next */
  function chooseWay(next) {
    way = /** @type {'nhan' | 'chia'} */ (next);
    ringed = 0;
  }

  /** @param {string | number} next */
  function chooseBase(next) {
    base = Number(next);
    ringed = 0;
  }

  /** @param {number} delta */
  function changeRows(delta) {
    rows = Math.max(1, Math.min(MAX_ROWS, rows + delta));
    ringed = 0;
  }

  /** @param {number} n */
  function pickRows(n) {
    rows = n;
    ringed = 0;
  }

  const big = 'min-h-12 text-lg disabled:cursor-not-allowed disabled:opacity-50';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'grid', label: 'Lưới chấm' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'grid'}
    <div class="flex flex-wrap items-center justify-center gap-2">
      <SegmentedControl
        label="Chọn bảng"
        hideLabel
        bind:value={base}
        options={[
          { value: 2, label: 'Bảng 2' },
          { value: 5, label: 'Bảng 5' },
        ]}
        onchange={chooseBase}
      />
      <SegmentedControl
        label="Chọn phép tính"
        hideLabel
        bind:value={way}
        options={[
          { value: 'nhan', label: 'Phép nhân' },
          { value: 'chia', label: 'Phép chia' },
        ]}
        onchange={chooseWay}
      />
    </div>

    <p class="text-center text-3xl font-bold tabular-nums text-slate-800">
      {#if way === 'nhan'}
        {mulLine(base, rows)}
      {:else if allRinged}
        {relatedDivisions(base, rows)[0]}
      {:else}
        {total} : {base} = ?
      {/if}
    </p>

    <DotGrid {base} {rows} ringed={way === 'nhan' ? rows : ringed} label={gridLabel} />

    {#if way === 'nhan'}
      <div class="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          class="{big} {button.primary}"
          disabled={rows >= MAX_ROWS}
          onclick={() => changeRows(1)}>Thêm 1 hàng</button
        >
        <button
          type="button"
          class="{big} {button.quiet}"
          disabled={rows <= 1}
          onclick={() => changeRows(-1)}>Bớt 1 hàng</button
        >
      </div>
    {:else}
      <div class="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          class="{big} {button.primary}"
          disabled={allRinged}
          onclick={() => (ringed += 1)}>Khoanh 1 hàng {base} chấm</button
        >
        <button
          type="button"
          class="{big} {button.quiet}"
          disabled={ringed === 0}
          onclick={() => (ringed = 0)}>Làm lại</button
        >
      </div>
    {/if}

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {way === 'chia' && allRinged
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {message}
    </p>

    <p class="text-lg font-semibold text-slate-600">Em chạm một dòng để đổi số hàng.</p>
    <TableGrid
      {base}
      op={way}
      active={rows}
      found={(n) => way === 'nhan' || n !== rows || allRinged}
      onpick={pickRows}
    />
  {:else}
    <AdaptiveQuiz
      skills={SKILLS}
      length={12}
      allGood="Tuyệt vời! Em đã thuộc bảng nhân, bảng chia 2 và 5."
      listOptions={(q) => q.options.some((o) => optionText(o).length > 12)}
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <DotGrid
            base={q.visual.base}
            rows={q.visual.rows}
            ringed={0}
            size={18}
            label="{countLabel('hàng chấm', q.visual.rows, settled)}. Mỗi hàng {q.visual
              .base} chấm."
          />
        {/if}
      {/snippet}
    </AdaptiveQuiz>
  {/if}
</div>
