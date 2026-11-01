<script>
  import { tick } from 'svelte';
  import { rng } from '#lib/core/drill.js';
  import { MINUS } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    COLUMNS,
    additionOf,
    family,
    keyOf,
    nextClosed,
    openFact,
    partner,
    question,
  } from './engine.js';

  // A fixed seed so the prerendered page and the browser agree.
  const rand = rng(12);

  /** @type {import('./engine.js').SubFact} */
  let fact = $state({ c: 12, b: 3 });
  let q = $state(question({ c: 12, b: 3 }, rng(12)));
  /** Facts already found, with their partners. */
  let open = $state(/** @type {Set<string>} */ (new Set()));
  /** Options tapped wrong on the current fact. */
  let wrong = $state(/** @type {number[]} */ ([]));
  let found = $state(false);
  let showAll = $state(false);
  /** @type {HTMLElement | undefined} */
  let panelEl = $state();

  const d = $derived(fact.c - fact.b);
  const twin = $derived(partner(fact));
  const allOpen = $derived(open.size === 36);

  const message = $derived(
    found
      ? `Đúng rồi! ${q.reason}`
      : wrong.length > 0
        ? `Chưa đúng. ${q.hint}`
        : `${fact.c} ${MINUS} ${fact.b} bằng bao nhiêu? Em nghĩ đến phép cộng nhé.`,
  );

  /** @param {import('./engine.js').SubFact} f */
  async function choose(f) {
    fact = f;
    q = question(f, rand);
    wrong = [];
    found = open.has(keyOf(f));
    await tick();
    panelEl?.focus();
  }

  /** @param {number} i */
  function pick(i) {
    if (found || wrong.includes(i)) return;
    if (i === q.answer) {
      found = true;
      open = openFact(open, fact);
    } else {
      wrong = [...wrong, i];
    }
  }

  async function nextFact() {
    const f = nextClosed(open, fact);
    if (f) await choose(f);
  }

  /** @param {import('./engine.js').SubFact} f */
  function cellState(f) {
    if (keyOf(f) === keyOf(fact)) return 'current';
    if (found && keyOf(f) === keyOf(twin)) return 'twin';
    return open.has(keyOf(f)) ? 'open' : 'closed';
  }

  /** @param {import('./engine.js').SubFact} f */
  function cellLabel(f) {
    const shown = open.has(keyOf(f)) || showAll;
    return `${f.c} trừ ${f.b}${shown ? ` bằng ${f.c - f.b}` : ', chưa mở'}`;
  }
</script>

<div class="space-y-4">
  <div
    bind:this={panelEl}
    tabindex="-1"
    class="space-y-3 rounded-2xl bg-indigo-50 p-4 {focusRing}"
    role="group"
    aria-label="Phép trừ {fact.c} trừ {fact.b}"
  >
    <p class="text-center text-5xl font-bold tabular-nums text-slate-800">
      {fact.c}
      {MINUS}
      {fact.b} = {found ? d : '?'}
    </p>

    <div role="group" aria-label="Chọn kết quả" class="flex flex-wrap justify-center gap-3">
      {#each q.options as v, i (v)}
        <button
          type="button"
          class="h-16 min-w-16 rounded-2xl border-4 px-3 text-3xl font-bold tabular-nums transition motion-reduce:transition-none {focusRing} {found &&
          i === q.answer
            ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
            : wrong.includes(i)
              ? 'border-rose-400 bg-rose-50 text-rose-700 line-through'
              : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-disabled={found || wrong.includes(i)}
          onclick={() => pick(i)}>{v}</button
        >
      {/each}
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {found
        ? 'bg-emerald-100 text-emerald-900'
        : wrong.length > 0
          ? 'bg-amber-100 text-amber-900'
          : 'bg-white text-slate-800'}"
      aria-live="polite"
    >
      {message}
    </p>

    {#if found}
      <div class="rounded-2xl bg-white p-3">
        <p class="text-lg font-semibold text-slate-700">
          Cùng từ phép cộng {additionOf(fact)} trong bảng cộng:
        </p>
        <ul class="mt-2 flex flex-wrap gap-2">
          {#each family(fact) as f (f)}
            <li
              class="rounded-xl px-3 py-2 text-2xl font-bold tabular-nums {f.includes('+')
                ? 'bg-sky-100 text-sky-900'
                : 'bg-emerald-100 text-emerald-900'}"
            >
              {f}
            </li>
          {/each}
        </ul>
      </div>
      {#if !allOpen}
        <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextFact}>
          Phép trừ tiếp theo
        </button>
      {/if}
    {/if}
  </div>

  <div class="flex flex-wrap items-center justify-between gap-2">
    <p class="text-lg font-semibold text-slate-700" aria-live="polite">
      {allOpen
        ? 'Tuyệt vời! Em đã mở cả bảng trừ.'
        : `Em đã mở ${open.size} / 36 phép trừ. Chạm vào một phép trừ để tính.`}
    </p>
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      aria-pressed={showAll}
      onclick={() => (showAll = !showAll)}
    >
      {showAll ? 'Che kết quả' : 'Xem cả bảng'}
    </button>
  </div>

  <div class="flex flex-wrap gap-2">
    {#each COLUMNS as col (col.c)}
      <ul class="w-[6.5rem] space-y-1" aria-label="{col.c} trừ đi một số">
        {#each col.facts as f (keyOf(f))}
          {@const st = cellState(f)}
          {@const shown = open.has(keyOf(f)) || showAll}
          <li>
            <button
              type="button"
              class="min-h-12 w-full rounded-lg px-1.5 text-lg tabular-nums {focusRing} {st ===
              'current'
                ? 'bg-indigo-600 font-bold text-white'
                : st === 'twin'
                  ? 'bg-amber-200 font-bold text-amber-950 ring-2 ring-amber-500'
                  : st === 'open'
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-slate-100 text-slate-700 hover:bg-indigo-100'}"
              aria-label={cellLabel(f)}
              aria-current={st === 'current' ? 'true' : undefined}
              onclick={() => choose(f)}
            >
              {f.c}
              {MINUS}
              {f.b} = {shown ? f.c - f.b : '?'}
            </button>
          </li>
        {/each}
      </ul>
    {/each}
  </div>
</div>
