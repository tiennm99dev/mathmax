<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import Block from '#lib/core/kid/block.svelte';
  import { PLACES4, readTo10000 } from '../_shared/numbers-to-10000.js';
  import {
    CHALLENGES,
    EMPTY,
    add,
    canMerge,
    challengeNote,
    merge,
    mergeText,
    reading,
    remove,
  } from './engine.js';

  /** @typedef {import('../_shared/numbers-to-10000.js').Place4} Place4 */

  /** Drawn cell size per place, chosen so ten blocks of a place fit a column at 390 px. */
  const CELLS = { thousands: 1.6, hundreds: 2, tens: 3.5, ones: 9 };

  let table = $state(EMPTY);
  let round = $state(0);
  let refused = $state('');

  const target = $derived(CHALLENGES[round % CHALLENGES.length]);
  const note = $derived(challengeNote(table, target));
  const found = $derived(note.tone === 'ok');

  /** @param {Place4} key */
  function plus(key) {
    const result = add(table, key);
    table = result.table;
    refused = result.refused;
  }

  /** @param {Place4} key */
  function minus(key) {
    table = remove(table, key);
    refused = '';
  }

  /** @param {Place4} key */
  function join(key) {
    table = merge(table, key);
    refused = '';
  }

  function next() {
    round += 1;
    table = EMPTY;
    refused = '';
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Em hãy xếp số: <strong class="text-indigo-700">{readTo10000(target)}</strong>
  </p>

  <div class="grid grid-cols-4 gap-1.5">
    {#each PLACES4 as p (p.key)}
      <section
        class="flex min-w-0 flex-col items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-1.5"
        aria-label="Cột {p.title}: {table[p.key]} {p.blockName}"
      >
        <h3 class="text-base font-bold text-slate-700">{p.title}</h3>
        <div
          class="flex min-h-32 w-full flex-wrap content-end items-end justify-center gap-0.5"
          aria-hidden="true"
        >
          {#each { length: table[p.key] } as _, i (i)}
            <Block kind={p.block} cell={CELLS[p.key]} />
          {/each}
        </div>
        <p
          class="text-3xl font-bold tabular-nums {table[p.key] === 10
            ? 'text-amber-600'
            : 'text-slate-800'}"
        >
          {table[p.key]}
        </p>
        <div class="flex flex-col gap-1">
          <button
            type="button"
            class="min-h-12 min-w-12 text-2xl {button.quiet} px-0"
            aria-label="Thêm 1 {p.blockName}"
            onclick={() => plus(p.key)}>+</button
          >
          <button
            type="button"
            class="min-h-12 min-w-12 text-2xl {button.quiet} px-0"
            aria-label="Bớt 1 {p.blockName}"
            disabled={table[p.key] === 0}
            onclick={() => minus(p.key)}>−</button
          >
        </div>
      </section>
    {/each}
  </div>

  {#each PLACES4 as p (p.key)}
    {#if canMerge(table, p.key)}
      <div class="flex justify-center">
        <button
          type="button"
          class="min-h-12 text-base {button.secondary}"
          onclick={() => join(p.key)}
        >
          {mergeText(p.key)}
        </button>
      </div>
    {/if}
  {/each}

  <p class="text-center text-xl font-bold text-slate-800" aria-live="polite">{reading(table)}</p>

  {#if refused}
    <FeedbackNote tone="warn" text={refused} />
  {:else}
    <FeedbackNote tone={note.tone} text={note.text} />
  {/if}

  {#if found}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Xếp số khác
      </button>
    </div>
  {/if}
</div>
