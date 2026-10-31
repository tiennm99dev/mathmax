<script>
  import { tick } from 'svelte';
  import { rng } from '#lib/core/drill.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    BOARD,
    PATTERNS,
    hintFor,
    moveFocus,
    optionsFor,
    pickBlanks,
    targetCount,
  } from './engine.js';

  /** `color`: colour the numbers that follow a rule. `missing`: fill in hidden numbers. */
  let mode = $state(/** @type {'color' | 'missing'} */ ('color'));

  let patternId = $state(PATTERNS[0].id);
  /** @type {number[]} */
  let found = $state([]);
  /** @type {number | null} */
  let wrongTap = $state(null);

  // The first board uses a fixed seed so the prerendered page and the browser agree.
  let seed = $state(1);
  const blanks = $derived(pickBlanks(rng(seed)));
  /** @type {number[]} */
  let filled = $state([]);
  /** @type {number | null} */
  let current = $state(null);
  /** @type {number[]} */
  let tried = $state([]);

  /** Cell that takes Tab focus; arrow keys move it. */
  let focusN = $state(1);
  /** @type {HTMLDivElement | undefined} */
  let grid = $state();

  const pattern = $derived(PATTERNS.find((p) => p.id === patternId) ?? PATTERNS[0]);
  const total = $derived(targetCount(pattern));
  const colorDone = $derived(found.length === total);

  const hidden = $derived(blanks.filter((n) => !filled.includes(n)));
  const active = $derived(
    current !== null && hidden.includes(current) ? current : (hidden[0] ?? null),
  );
  const missingDone = $derived(hidden.length === 0);

  const solved = $derived(mode === 'color' ? colorDone : missingDone);
  const message = $derived.by(() => {
    if (mode === 'color') {
      if (colorDone) return `Giỏi quá! ${pattern.done}`;
      if (wrongTap !== null) return `Chưa đúng: ${pattern.why(wrongTap)} Em tìm số khác nhé.`;
      return `${pattern.task} Em đã tô ${found.length} / ${total} số.`;
    }
    if (missingDone) return 'Giỏi quá! Em đã điền đủ các số còn thiếu.';
    if (active === null) return '';
    if (tried.length > 0) return `Chưa đúng. Gợi ý: ${hintFor(active, hidden)}`;
    return `Ô có dấu ? đang chọn. Số nào còn thiếu? Còn ${hidden.length} ô trống.`;
  });

  /** @param {number} n */
  function tap(n) {
    focusN = n;
    if (mode === 'color') {
      if (colorDone || found.includes(n)) return;
      if (pattern.test(n)) {
        found = [...found, n];
        wrongTap = null;
      } else {
        wrongTap = n;
      }
      return;
    }
    if (hidden.includes(n)) {
      current = n;
      tried = [];
    }
  }

  /** @param {number} option */
  function choose(option) {
    if (active === null || tried.includes(option)) return;
    if (option === active) {
      filled = [...filled, active];
      tried = [];
      current = null;
    } else {
      tried = [...tried, option];
    }
  }

  /** @param {string} id */
  function pickPattern(id) {
    patternId = id;
    found = [];
    wrongTap = null;
  }

  function newBoard() {
    seed += 1;
    filled = [];
    tried = [];
    current = null;
  }

  /** @param {KeyboardEvent} e @param {number} n */
  async function onKey(e, n) {
    const next = moveFocus(n, e.key);
    if (next === null) return;
    e.preventDefault();
    focusN = next;
    await tick();
    /** @type {HTMLButtonElement | null | undefined} */ (
      grid?.querySelector(`button[data-n="${next}"]`)
    )?.focus();
  }

  /** @param {number} n */
  function cellClass(n) {
    const base = `flex aspect-square items-center justify-center rounded-md text-xs font-bold tabular-nums transition sm:text-base ${focusRing}`;
    if (mode === 'color') {
      if (found.includes(n)) return `${base} bg-emerald-500 text-white`;
      if (wrongTap === n) return `${base} bg-rose-100 text-rose-700 ring-2 ring-rose-400`;
      return `${base} bg-white text-slate-700 hover:bg-indigo-50`;
    }
    if (hidden.includes(n)) {
      return n === active
        ? `${base} bg-amber-300 text-amber-950 ring-4 ring-amber-500`
        : `${base} bg-amber-100 text-amber-800`;
    }
    if (filled.includes(n)) return `${base} bg-emerald-500 text-white`;
    return `${base} bg-white text-slate-700`;
  }

  /** @param {number} n */
  function cellLabel(n) {
    if (mode === 'missing' && hidden.includes(n)) return 'Ô trống';
    if (mode === 'color' && found.includes(n)) return `${n}, đã tô`;
    return String(n);
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn trò chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'color', label: 'Tô theo quy luật' },
      { value: 'missing', label: 'Tìm số còn thiếu' },
    ]}
    onchange={() => (wrongTap = null)}
  />

  {#if mode === 'color'}
    <div role="group" aria-label="Chọn quy luật" class="flex flex-wrap gap-2">
      {#each PATTERNS as p (p.id)}
        <button
          type="button"
          class="min-h-12 rounded-xl border-2 px-3 text-base font-semibold transition {focusRing} {p.id ===
          patternId
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400'}"
          aria-pressed={p.id === patternId}
          onclick={() => pickPattern(p.id)}>{p.label}</button
        >
      {/each}
    </div>
  {/if}

  <div
    bind:this={grid}
    class="grid grid-cols-10 gap-0.5 rounded-xl bg-slate-200 p-0.5 sm:gap-1 sm:p-1"
    role="group"
    aria-label="Bảng các số từ 1 đến 100. Dùng phím mũi tên để đi giữa các ô."
  >
    {#each BOARD as n (n)}
      <button
        type="button"
        data-n={n}
        class={cellClass(n)}
        tabindex={n === focusN ? 0 : -1}
        aria-label={cellLabel(n)}
        onclick={() => tap(n)}
        onkeydown={(e) => onKey(e, n)}>{mode === 'missing' && hidden.includes(n) ? '?' : n}</button
      >
    {/each}
  </div>

  {#if mode === 'missing' && active !== null}
    <div role="group" aria-label="Chọn số cho ô trống" class="flex flex-wrap gap-3">
      {#each optionsFor(active) as option (option)}
        <button
          type="button"
          class="h-16 min-w-16 rounded-2xl border-4 px-3 text-3xl font-bold tabular-nums transition {focusRing} {tried.includes(
            option,
          )
            ? 'border-rose-400 bg-rose-50 text-rose-700 line-through'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-disabled={tried.includes(option)}
          onclick={() => choose(option)}>{option}</button
        >
      {/each}
    </div>
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  {#if mode === 'color'}
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      onclick={() => pickPattern(patternId)}
    >
      Xoá màu, tô lại
    </button>
  {:else}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newBoard}>
      Bảng khác
    </button>
  {/if}
</div>
