<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import Block from '#lib/core/kid/block.svelte';
  import {
    LEVELS,
    START,
    add,
    canAdd,
    canJoin,
    canRemove,
    canSplit,
    join,
    pileNote,
    remove,
    ruleText,
    split,
    worthText,
  } from './engine.js';

  let pile = $state(START);
  /** How many joins the child has made so far; the rules they found stay shown. */
  let found = $state(0);

  const level = $derived(LEVELS[pile.level]);
  const finished = $derived(pile.level === LEVELS.length - 1);

  function onJoin() {
    pile = join(pile);
    found = Math.max(found, pile.level);
  }

  function restart() {
    pile = START;
    found = 0;
  }
</script>

<div class="space-y-4">
  <div
    class="flex min-h-40 flex-wrap items-end justify-center gap-1 rounded-2xl bg-sky-50 p-3"
    aria-hidden="true"
  >
    {#each { length: pile.count } as _, i (i)}
      <Block kind={level.kind} cell={level.cell} />
    {/each}
  </div>

  <p class="text-center text-xl font-bold text-slate-800">
    {pile.count === 0 ? '0 khối' : worthText(pile)}
  </p>

  <FeedbackNote tone={canJoin(pile) || finished ? 'ok' : 'info'} text={pileNote(pile)} />

  <div class="flex flex-wrap justify-center gap-2">
    {#if finished}
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={restart}>
        Làm lại từ đầu
      </button>
    {:else}
      <button
        type="button"
        class="min-h-12 text-lg {button.secondary}"
        disabled={!canAdd(pile)}
        onclick={() => (pile = add(pile))}>Thêm 1 {level.name}</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        disabled={!canRemove(pile)}
        onclick={() => (pile = remove(pile))}>Bớt 1 {level.name}</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        disabled={!canJoin(pile)}
        onclick={onJoin}>Ghép thành 1 {LEVELS[pile.level + 1].name}</button
      >
    {/if}
    {#if canSplit(pile)}
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        onclick={() => (pile = split(pile))}>Tách thành 10 {LEVELS[pile.level - 1].name}</button
      >
    {/if}
  </div>

  {#if found > 0}
    <div class="rounded-2xl bg-emerald-50 p-3">
      <p class="font-semibold text-emerald-900">Em đã tìm ra:</p>
      <ul class="mt-1 space-y-1 text-lg font-bold text-emerald-800">
        {#each { length: found } as _, i (i)}
          <li>{ruleText(i)}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
