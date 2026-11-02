<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import TableGrid from '../_shared/table-grid.svelte';
  import { KIND_LABELS, jumpMessage } from '../_shared/times.js';
  import { BASE, round } from './engine.js';
  import Hand from './hand.svelte';

  let mode = $state(/** @type {'build' | 'quiz'} */ ('build'));
  let hands = $state(0);

  const message = $derived(
    jumpMessage(BASE, hands, 'Chưa có bàn tay nào. Em chạm "Thêm 1 bàn tay" để bắt đầu.'),
  );

  function add() {
    if (hands < 10) hands += 1;
  }

  function remove() {
    if (hands > 0) hands -= 1;
  }

  const big = 'min-h-12 text-lg aria-disabled:cursor-not-allowed aria-disabled:opacity-50';
</script>

{#snippet handRow(/** @type {number} */ shown)}
  <ul
    class="mx-auto grid w-full max-w-md grid-cols-5 gap-1 rounded-2xl bg-amber-50 p-2"
    aria-label="{shown} bàn tay, tất cả {BASE * shown} ngón"
  >
    {#each { length: 10 } as _, i (i)}
      <li class="text-center">
        <Hand faded={i >= shown} />
        <span
          class="block text-lg font-bold tabular-nums {i < shown
            ? 'text-amber-900'
            : 'text-transparent'}"
          aria-hidden="true">{BASE * (i + 1)}</span
        >
      </li>
    {/each}
  </ul>
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'build', label: 'Lập bảng' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'build'}
    {@render handRow(hands)}

    <div class="flex flex-wrap gap-3">
      <button type="button" class="{big} {button.primary}" aria-disabled={hands >= 10} onclick={add}
        >Thêm 1 bàn tay</button
      >
      <button type="button" class="{big} {button.quiet}" aria-disabled={hands <= 0} onclick={remove}
        >Bớt 1 bàn tay</button
      >
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {hands === 10
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {message}
    </p>

    <TableGrid base={BASE} shown={hands} />
  {:else}
    <ChoiceRound build={round} labels={KIND_LABELS} allGood="Em đã thuộc bảng nhân 5 rồi!">
      {#snippet visual(/** @type {{ visual?: { n: number } }} */ q, /** @type {boolean} */ settled)}
        {@render handRow(settled ? (q.visual?.n ?? 0) : 0)}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
