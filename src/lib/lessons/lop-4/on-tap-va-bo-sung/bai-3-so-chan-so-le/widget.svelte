<script>
  import Picture from '#lib/core/kid/picture.svelte';
  import { button } from '#lib/core/ui.js';
  import { ROUNDS, pairingText, pairsOf, verdict } from './engine.js';

  /** @typedef {import('./engine.js').Parity} Parity */

  const MIN = 1;
  const MAX = 16;
  const CHOICES = /** @type {Parity[]} */ (['chẵn', 'lẻ']);

  let round = $state(0);
  let count = $state(ROUNDS[0].count);
  let paired = $state(false);
  let said = $state(/** @type {Parity | null} */ (null));

  const kind = $derived(ROUNDS[round % ROUNDS.length]);
  const split = $derived(pairsOf(count));
  const answer = $derived(said === null ? null : verdict(count, said, paired));
  const solved = $derived(answer?.tone === 'ok');
  const pairList = $derived(Array.from({ length: split.pairs }, (_, i) => i));
  const loose = $derived(Array.from({ length: count }, (_, i) => i));

  function reset() {
    paired = false;
    said = null;
  }

  function nextRound() {
    round += 1;
    count = ROUNDS[round % ROUNDS.length].count;
    reset();
  }

  /** @param {number} delta */
  function change(delta) {
    const next = Math.min(MAX, Math.max(MIN, count + delta));
    if (next === count) return;
    count = next;
    reset();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Có <strong class="text-indigo-700">{count}</strong>
    {kind.name}. {count} là số chẵn hay số lẻ?
  </p>

  <div
    class="flex min-h-32 flex-wrap items-center justify-center gap-2 rounded-2xl bg-sky-50 p-3"
    role="img"
    aria-label={paired
      ? pairingText(count, kind.name)
      : `${count} ${kind.name} chưa xếp thành cặp.`}
  >
    {#if paired}
      {#each pairList as p (p)}
        <div class="flex flex-col gap-1 rounded-xl border-2 border-emerald-400 bg-white p-1">
          <Picture name={kind.picture} size={36} decorative />
          <Picture name={kind.picture} size={36} decorative />
        </div>
      {/each}
      {#if split.left === 1}
        <div
          class="flex flex-col gap-1 rounded-xl border-2 border-dashed border-amber-500 bg-amber-50 p-1"
        >
          <Picture name={kind.picture} size={36} decorative />
          <span class="flex h-9 w-9 items-center justify-center text-2xl text-amber-600">?</span>
        </div>
      {/if}
    {:else}
      {#each loose as i (i)}
        <Picture name={kind.picture} size={40} decorative />
      {/each}
    {/if}
  </div>

  <div aria-live="polite">
    {#if paired}
      <p class="text-center text-lg text-slate-700">
        {pairingText(count, kind.name)}
      </p>
    {/if}
  </div>

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={count <= MIN}
      onclick={() => change(-1)}>Bớt 1</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {paired ? button.secondary : button.primary}"
      aria-pressed={paired}
      onclick={() => (paired = !paired)}>{paired ? 'Trộn lại' : 'Xếp thành từng cặp'}</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={count >= MAX}
      onclick={() => change(1)}>Thêm 1</button
    >
  </div>

  <div class="grid grid-cols-2 gap-3" role="group" aria-label="Em chọn câu trả lời">
    {#each CHOICES as p (p)}
      <button
        type="button"
        class="min-h-14 text-xl font-bold {said === p ? button.primary : button.quiet}"
        aria-pressed={said === p}
        onclick={() => (said = p)}>Số {p}</button
      >
    {/each}
  </div>

  <div aria-live="polite">
    {#if answer}
      <p
        class="rounded-2xl px-4 py-3 text-xl font-semibold {answer.tone === 'ok'
          ? 'bg-emerald-100 text-emerald-900'
          : 'bg-amber-100 text-amber-900'}"
      >
        {#if solved}<span aria-hidden="true">⭐ </span>{/if}{answer.text}
      </p>
    {/if}
  </div>

  {#if solved}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextRound}>
        Đồ vật khác
      </button>
    </div>
  {/if}
</div>
