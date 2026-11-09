<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { PLACES, placesOf } from '#lib/core/kid/place-value.js';
  import { ROUNDS, decidingPlace, tapCard } from './engine.js';

  let round = $state(0);
  /** @type {number[]} */
  let placed = $state([]);
  let compared = $state(/** @type {import('./engine.js').Compared | null} */ (null));
  /** @type {number | null} */
  let missed = $state(null);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let note = $state({ tone: 'info', text: 'Em chạm thẻ có số bé nhất trước nhé.' });

  const cards = $derived(ROUNDS[round]);
  const finished = $derived(placed.length === cards.length);
  const deciding = $derived(compared ? decidingPlace(compared.a, compared.b) : null);

  /** @param {number} n */
  function tap(n) {
    const step = tapCard(cards, placed, n);
    if (!step) return;
    placed = step.placed;
    compared = step.compared;
    missed = step.tone === 'warn' ? n : null;
    note = { tone: step.tone, text: step.text };
  }

  function nextRound() {
    round = (round + 1) % ROUNDS.length;
    placed = [];
    compared = null;
    missed = null;
    note = { tone: 'info', text: 'Em chạm thẻ có số bé nhất trước nhé.' };
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">Xếp các thẻ từ bé đến lớn</p>

  <ol
    class="flex items-center justify-center gap-1 rounded-2xl bg-sky-50 p-2"
    aria-label="Các thẻ đã xếp"
  >
    {#each cards as card, i (card)}
      <li class="flex items-center gap-1">
        {#if i > 0}
          <span class="text-lg font-bold text-slate-500" aria-hidden="true">&lt;</span>
        {/if}
        <span
          class="flex h-12 w-14 items-center justify-center rounded-lg border-2 text-lg font-bold tabular-nums {placed[
            i
          ] === undefined
            ? 'border-dashed border-slate-300 bg-white text-slate-500'
            : 'border-emerald-400 bg-emerald-50 text-emerald-800'}"
        >
          {#if placed[i] === undefined}
            <span class="sr-only">Ô trống</span>
          {:else}
            {placed[i]}
          {/if}
        </span>
      </li>
    {/each}
  </ol>

  <div class="grid grid-cols-2 gap-2" role="group" aria-label="Các thẻ số">
    {#each cards as card (card)}
      {@const done = placed.includes(card)}
      <button
        type="button"
        class="min-h-16 rounded-2xl border-2 text-3xl font-bold tabular-nums {done
          ? 'border-slate-200 bg-slate-100 text-slate-500'
          : missed === card
            ? 'border-amber-500 bg-amber-50 text-amber-900'
            : 'border-indigo-300 bg-white text-slate-800 hover:bg-indigo-50'} {focusRing}"
        aria-label={done ? `${card}, đã xếp` : String(card)}
        aria-disabled={done}
        onclick={() => tap(card)}>{card}</button
      >
    {/each}
  </div>

  {#if compared}
    <div
      class="mx-auto grid max-w-72 grid-cols-3 gap-1 text-center tabular-nums"
      aria-hidden="true"
    >
      {#each PLACES as place (place.key)}
        <div
          class="rounded-lg p-1 {deciding === place.key
            ? 'bg-amber-100 ring-2 ring-amber-400'
            : 'bg-slate-100'}"
        >
          <p class="text-sm font-semibold text-slate-600">{place.title}</p>
          <p class="text-2xl font-bold text-slate-800">{placesOf(compared.a)[place.key]}</p>
          <p class="text-2xl font-bold text-slate-800">{placesOf(compared.b)[place.key]}</p>
        </div>
      {/each}
    </div>
  {/if}

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {finished ? button.primary : button.secondary}"
      onclick={nextRound}>Bộ thẻ khác</button
    >
  </div>
</div>
