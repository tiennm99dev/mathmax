<script>
  import { tick } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { SETS, directionText, left, rowReasons, take } from './engine.js';

  let round = $state(0);
  /** @type {number[]} */
  let row = $state([]);
  /** @type {{ ok: boolean, text: string } | null} */
  let verdict = $state(null);
  /** @type {number[]} */
  let missed = $state([]);
  /** @type {HTMLElement | undefined} */
  let widget = $state();

  const set = $derived(SETS[round % SETS.length]);
  const onTable = $derived(left(set.numbers, row));
  const done = $derived(row.length === set.numbers.length);
  const reasons = $derived(done ? rowReasons(row) : []);

  /** @param {number} card */
  function choose(card) {
    if (done) return;
    const result = take(set.numbers, row, set.direction, card);
    row = result.row;
    verdict = { ok: result.ok, text: result.text };
    missed = result.ok ? [] : [...missed, card];
    if (result.ok) keepFocus();
  }

  /** A taken card leaves the table, so focus moves to the next button. */
  async function keepFocus() {
    await tick();
    widget?.querySelector('button')?.focus();
  }

  function undo() {
    row = row.slice(0, -1);
    verdict = null;
    missed = [];
  }

  function next() {
    round += 1;
    row = [];
    verdict = null;
    missed = [];
    keepFocus();
  }
</script>

<div class="space-y-4" bind:this={widget}>
  <p class="text-center text-xl font-semibold text-slate-800">
    Em lấy thẻ xếp vào hàng theo thứ tự
    <strong class="text-indigo-700">{directionText(set.direction)}</strong>.
  </p>

  <ol class="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Hàng thẻ đã xếp">
    {#each set.numbers as _, i (i)}
      <li
        class="flex min-h-14 items-center justify-center rounded-xl border-2 text-2xl font-bold tabular-nums {row[
          i
        ] === undefined
          ? 'border-dashed border-slate-300 text-slate-400'
          : 'border-emerald-500 bg-emerald-50 text-emerald-800'}"
      >
        {#if row[i] === undefined}
          <span aria-hidden="true">{i + 1}</span><span class="sr-only">Chỗ {i + 1} còn trống</span>
        {:else}
          <span class="sr-only">Chỗ {i + 1}:</span> {fmt(row[i])}
        {/if}
      </li>
    {/each}
  </ol>

  {#if !done}
    <div class="grid grid-cols-2 gap-2" role="group" aria-label="Thẻ trên bàn">
      {#each onTable as card (card)}
        <button
          type="button"
          class="min-h-16 text-2xl font-bold tabular-nums {missed.includes(card)
            ? button.quiet + ' opacity-60'
            : button.secondary}"
          aria-label="Thẻ số {fmt(card)}"
          onclick={() => choose(card)}>{fmt(card)}</button
        >
      {/each}
    </div>
  {/if}

  <div aria-live="polite">
    {#if verdict}
      <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdict.text} />
    {/if}
  </div>

  {#if done}
    <ul class="space-y-1 text-base text-slate-700">
      {#each reasons as reason, i (i)}
        <li>{reason}</li>
      {/each}
    </ul>
  {/if}

  <div class="flex flex-wrap justify-center gap-2">
    {#if row.length > 0 && !done}
      <button type="button" class="min-h-12 text-base {button.quiet}" onclick={undo}>
        Lấy lại thẻ cuối
      </button>
    {/if}
    {#if done}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Bộ thẻ khác
      </button>
    {/if}
  </div>
</div>
