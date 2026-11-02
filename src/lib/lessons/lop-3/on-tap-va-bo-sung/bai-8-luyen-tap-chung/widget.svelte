<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import { optionText } from '#lib/core/kid/quiz.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import BrokenLine from '../_shared/broken-line.svelte';
  import ColumnBoard from '../_shared/column-board.svelte';
  import { columnSteps } from '../_shared/columns.js';
  import { passFocus } from '../_shared/pass-focus.js';
  import { resultOf } from '#lib/core/kid/column.js';
  import { KIND_LABELS, MAX_N, MIN_N, RULES, buildRound, platesFor } from './engine.js';

  let mode = $state(/** @type {'plates' | 'quiz'} */ ('plates'));
  let rule = $state(/** @type {import('./engine.js').Rule} */ ('nhan-1'));
  let n = $state(3);

  const view = $derived(platesFor(rule, n));

  let moreButton = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
  let fewerButton = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));

  const big = 'min-h-12 text-lg disabled:cursor-not-allowed disabled:opacity-50';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'plates', label: 'Xếp đĩa' },
      { value: 'quiz', label: 'Luyện tập' },
    ]}
  />

  {#if mode === 'plates'}
    <SegmentedControl label="Chọn quy tắc" hideLabel bind:value={rule} options={[...RULES]} />

    <p class="text-center text-3xl font-bold tabular-nums text-slate-800">{view.line}</p>

    <div
      class="flex flex-wrap justify-center gap-2 rounded-2xl bg-sky-50 p-2"
      role="img"
      aria-label={view.words}
    >
      {#each view.plates as count, i (i)}
        <div
          class="flex min-h-[68px] min-w-[68px] max-w-[220px] flex-wrap items-center justify-center gap-1 rounded-full border-4 border-slate-300 bg-white p-2"
        >
          {#each { length: count } as _, k (k)}
            <Picture name="apple" size={32} decorative />
          {/each}
        </div>
      {/each}
    </div>

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="{big} {button.primary}"
        disabled={n >= MAX_N}
        bind:this={moreButton}
        onclick={() => {
          n += 1;
          passFocus(moreButton, fewerButton);
        }}>Thêm 1 {rule === 'chia-1' ? 'quả' : 'đĩa'}</button
      >
      <button
        type="button"
        class="{big} {button.quiet}"
        disabled={n <= MIN_N}
        bind:this={fewerButton}
        onclick={() => {
          n -= 1;
          passFocus(fewerButton, moreButton);
        }}>Bớt 1 {rule === 'chia-1' ? 'quả' : 'đĩa'}</button
      >
    </div>

    <p
      class="rounded-2xl bg-slate-100 px-4 py-3 text-xl font-semibold text-slate-800"
      aria-live="polite"
    >
      {view.words}
    </p>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đã nắm chắc các kiến thức của chủ đề này."
      listOptions={(q) => q.options.some((o) => optionText(o).length > 12)}
    >
      {#snippet visual(q, settled)}
        {#if q.visual?.type === 'broken'}
          <BrokenLine lengths={q.visual.lengths} />
        {:else if q.visual?.type === 'column'}
          {@const { a, b, op } = q.visual}
          {@const all = columnSteps(a, b, op)}
          <div class="flex justify-center">
            <ColumnBoard
              {a}
              {b}
              {op}
              width={Math.max(
                String(a).length,
                String(b).length,
                String(resultOf(a, b, op)).length,
              )}
              written={[0, 1, 2].map((i) => {
                const s = all.find((step) => step.index === i);
                return settled && s && !s.blank ? s.digit : null;
              })}
            />
          </div>
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
