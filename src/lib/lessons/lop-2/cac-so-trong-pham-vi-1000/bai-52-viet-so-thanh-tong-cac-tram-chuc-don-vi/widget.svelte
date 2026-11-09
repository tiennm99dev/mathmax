<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import BlockPile from '#lib/core/kid/block-pile.svelte';
  import { PLACES, placesOf } from '#lib/core/kid/place-value.js';
  import { NUMBERS, allOpen, sumSoFar, tapNote } from './engine.js';

  /** @typedef {import('#lib/core/kid/place-value.js').PlaceKey} PlaceKey */

  /** Drawn sizes in a column, chosen so nine blocks of a place fit at 390 px. */
  const CELLS = { hundreds: 2.5, tens: 5, ones: 12 };

  let round = $state(0);
  /** @type {PlaceKey[]} */
  let opened = $state([]);
  /** @type {PlaceKey | null} */
  let last = $state(null);

  const number = $derived(NUMBERS[round % NUMBERS.length]);
  const digits = $derived(placesOf(number));
  const done = $derived(allOpen(number, opened));
  const note = $derived(tapNote(number, opened, last));

  /** @param {PlaceKey} key */
  function tap(key) {
    last = key;
    if (!opened.includes(key)) opened = [...opened, key];
  }

  function next() {
    round += 1;
    opened = [];
    last = null;
  }
</script>

<div class="space-y-4">
  <div class="grid grid-cols-3 gap-2">
    {#each PLACES as p (p.key)}
      {@const digit = digits[p.key]}
      {@const open = opened.includes(p.key)}
      <div class="flex min-w-0 flex-col items-center gap-2">
        <span class="font-semibold text-slate-600">{p.title}</span>
        <button
          type="button"
          class="min-h-20 w-full rounded-2xl border-4 text-5xl font-bold tabular-nums {open
            ? digit === 0
              ? 'border-slate-300 bg-slate-100 text-slate-500'
              : 'border-emerald-400 bg-emerald-50 text-emerald-800'
            : 'border-indigo-300 bg-white text-indigo-800 hover:bg-indigo-50'} {focusRing}"
          aria-label="Chữ số {digit} ở hàng {p.unit}"
          aria-pressed={open}
          onclick={() => tap(p.key)}>{digit}</button
        >
        <p class="min-h-8 text-2xl font-bold text-emerald-800 tabular-nums">
          {#if open && digit > 0}{digit * p.value}{/if}
        </p>
        <div class="flex min-h-28 w-full items-center justify-center">
          {#if open}
            <BlockPile {...{ [p.key]: digit }} cells={CELLS} />
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <p class="text-center text-3xl font-bold text-slate-800 tabular-nums">
    {sumSoFar(number, opened)}
  </p>

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {done ? button.primary : button.secondary}"
      onclick={next}>Số khác</button
    >
  </div>
</div>
