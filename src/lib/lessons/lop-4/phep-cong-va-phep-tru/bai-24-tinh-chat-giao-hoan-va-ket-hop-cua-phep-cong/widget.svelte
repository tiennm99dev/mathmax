<script>
  import { fmt } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import { PUZZLES, feedback, pairsOf, solved, swap } from './engine.js';

  let index = $state(0);
  let terms = $state(/** @type {number[]} */ ([...PUZZLES[0]]));
  /** The place of the card picked first, waiting for a second tap. */
  let picked = $state(/** @type {number | null} */ (null));
  let moves = $state(0);

  const pairs = $derived(pairsOf(terms));
  const done = $derived(solved(terms));
  const total = $derived(pairs[0].sum + pairs[1].sum);
  const message = $derived(
    picked !== null
      ? `Em đã chọn số ${fmt(terms[picked])}. Chạm một số khác để đổi chỗ.`
      : feedback(terms),
  );

  /** @param {number} i */
  function tap(i) {
    if (done) return;
    if (picked === null) {
      picked = i;
      return;
    }
    if (picked !== i) {
      terms = swap(terms, picked, i);
      moves += 1;
    }
    picked = null;
  }

  function next() {
    index = (index + 1) % PUZZLES.length;
    terms = [...PUZZLES[index]];
    picked = null;
    moves = 0;
  }
</script>

<div class="space-y-4">
  <p class="text-lg font-semibold text-slate-800">
    Chạm hai số để đổi chỗ. Em làm cho mỗi cặp trong ngoặc có tổng tròn chục, tròn trăm.
  </p>

  <div
    class="flex flex-wrap items-center justify-center gap-x-1 gap-y-3 text-3xl font-bold tabular-nums"
    role="group"
    aria-label="Các số hạng của tổng"
  >
    {#each pairs as pair, p (p)}
      {#if p > 0}<span class="px-1 text-slate-500" aria-hidden="true">+</span>{/if}
      <span
        class="flex items-center gap-1 rounded-2xl border-4 px-1 py-1 {pair.word
          ? 'border-emerald-400 bg-emerald-50'
          : 'border-slate-200 bg-white'}"
      >
        <span class="text-slate-400" aria-hidden="true">(</span>
        {#each [2 * p, 2 * p + 1] as i, k (i)}
          {#if k > 0}<span class="text-slate-500" aria-hidden="true">+</span>{/if}
          <button
            type="button"
            class="min-h-14 min-w-16 rounded-xl border-2 px-2 transition {picked === i
              ? 'border-indigo-600 bg-indigo-100 text-indigo-900'
              : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-100'} {focusRing}"
            aria-pressed={picked === i}
            aria-label="Số hạng {fmt(terms[i])}, vị trí {i + 1}"
            onclick={() => tap(i)}>{fmt(terms[i])}</button
          >
        {/each}
        <span class="text-slate-400" aria-hidden="true">)</span>
      </span>
    {/each}
    <span class="px-1 text-slate-700">= {fmt(total)}</span>
  </div>

  <div class="grid grid-cols-2 gap-3 text-center text-lg font-semibold">
    {#each pairs as pair, p (p)}
      <div
        class="rounded-xl px-2 py-2 {pair.word
          ? 'bg-emerald-100 text-emerald-900'
          : 'bg-slate-100 text-slate-700'}"
      >
        {fmt(pair.a)} + {fmt(pair.b)} = {fmt(pair.sum)}
        <span class="block text-base">{pair.word ? `${pair.word} ✓` : 'chưa tròn'}</span>
      </div>
    {/each}
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {done
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if done}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  <div class="flex flex-wrap items-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {done ? button.primary : button.secondary}"
      onclick={next}>Tổng khác</button
    >
    {#if moves > 0}
      <span class="text-base text-slate-600">Em đã đổi chỗ {moves} lần. Tổng không thay đổi.</span>
    {/if}
  </div>
</div>
