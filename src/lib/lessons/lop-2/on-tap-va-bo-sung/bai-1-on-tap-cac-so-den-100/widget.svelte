<script>
  import { tick } from 'svelte';
  import { rng } from '#lib/core/drill.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    BOARD,
    LEVELS,
    mistakeHint,
    moveFocus,
    pickBlanks,
    placeNote,
    typeDigit,
  } from './engine.js';

  let level = $state(/** @type {string} */ (LEVELS[0].id));
  // The first board uses a fixed seed so the prerendered page and the browser agree.
  let seed = $state(1);
  const size = $derived(LEVELS.find((l) => l.id === level)?.blanks ?? 6);
  const blanks = $derived(pickBlanks(rng(seed), size));

  /** @type {number[]} */
  let filled = $state([]);
  /** @type {number | null} */
  let current = $state(null);
  let entry = $state('');
  /** @type {string | null} */
  let hint = $state(null);
  /** @type {number | null} */
  let lastRight = $state(null);

  let focusN = $state(1);
  /** @type {HTMLDivElement | undefined} */
  let grid = $state();

  const hidden = $derived(blanks.filter((n) => !filled.includes(n)));
  const active = $derived(
    current !== null && hidden.includes(current) ? current : (hidden[0] ?? null),
  );
  const done = $derived(hidden.length === 0);

  /** @type {HTMLDivElement | undefined} */
  let scroller = $state();

  // On a narrow phone the board scrolls sideways: bring the chosen blank into
  // view inside the board, without moving the page.
  $effect(() => {
    const cell = /** @type {HTMLElement | null | undefined} */ (
      grid?.querySelector(`button[data-n="${active}"]`)
    );
    if (!cell || !scroller) return;
    const left = cell.offsetLeft;
    const right = left + cell.offsetWidth;
    if (left < scroller.scrollLeft) scroller.scrollLeft = left - 8;
    else if (right > scroller.scrollLeft + scroller.clientWidth) {
      scroller.scrollLeft = right - scroller.clientWidth + 8;
    }
  });

  const message = $derived.by(() => {
    if (done) return 'Giỏi quá! Em đã điền đủ các số còn thiếu.';
    if (hint) return hint;
    const before = lastRight !== null ? `Đúng rồi! ${placeNote(lastRight)} ` : '';
    return `${before}Ô vàng đậm đang chọn. Em viết số vào ô đó. Còn ${hidden.length} ô trống.`;
  });

  function reset() {
    filled = [];
    current = null;
    entry = '';
    hint = null;
    lastRight = null;
  }

  function newBoard() {
    seed += 1;
    reset();
  }

  /** @param {number} n */
  function tap(n) {
    focusN = n;
    if (hidden.includes(n) && n !== active) {
      current = n;
      entry = '';
      hint = null;
    }
  }

  /** @param {number} d */
  function press(d) {
    entry = typeDigit(entry, d);
    hint = null;
  }

  function erase() {
    entry = entry.slice(0, -1);
    hint = null;
  }

  function check() {
    // Read the blank once: `active` moves on to the next blank as soon as this one is filled.
    const n = active;
    if (n === null) return;
    const why = mistakeHint(entry, n);
    if (why === null) {
      filled = [...filled, n];
      lastRight = n;
      current = null;
      entry = '';
      hint = null;
    } else {
      hint = why;
      lastRight = null;
    }
  }

  /** @param {KeyboardEvent} e @param {number} n */
  async function onKey(e, n) {
    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      if (hidden.includes(n)) tap(n);
      press(Number(e.key));
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      erase();
      return;
    }
    if (e.key === 'Enter' && hidden.includes(n)) {
      e.preventDefault();
      if (n !== active) tap(n);
      else check();
      return;
    }
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
    const base = `flex aspect-square min-h-12 min-w-12 items-center justify-center rounded-md text-base font-bold tabular-nums transition ${focusRing}`;
    if (hidden.includes(n)) {
      return n === active
        ? `${base} bg-amber-300 text-amber-950 ring-4 ring-amber-500`
        : `${base} bg-amber-100 text-amber-800`;
    }
    if (filled.includes(n)) return `${base} bg-emerald-500 text-white`;
    return `${base} bg-white text-slate-700`;
  }

  /** @param {number} n */
  function cellText(n) {
    if (!hidden.includes(n)) return String(n);
    return n === active && entry !== '' ? entry : '?';
  }

  /** @param {number} n */
  function cellLabel(n) {
    if (!hidden.includes(n)) return filled.includes(n) ? `${n}, em đã điền` : String(n);
    return n === active ? `Ô trống đang chọn${entry ? `, em viết ${entry}` : ''}` : 'Ô trống';
  }

  const key = `h-14 min-w-14 rounded-2xl border-4 border-slate-300 bg-white text-3xl font-bold tabular-nums text-slate-800 transition hover:border-indigo-400 ${focusRing}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Số ô trống"
    hideLabel
    bind:value={level}
    options={LEVELS.map((l) => ({ value: l.id, label: l.label }))}
    onchange={reset}
  />

  <!-- Every cell is at least 48 px, so on a narrow phone the board scrolls sideways. -->
  <div bind:this={scroller} class="relative overflow-x-auto pb-1">
    <div
      bind:this={grid}
      class="grid w-max min-w-full grid-cols-[repeat(10,minmax(3rem,1fr))] gap-1 rounded-xl bg-slate-200 p-1"
      role="group"
      aria-label="Bảng các số từ 1 đến 100 có ô trống. Dùng phím mũi tên để đi giữa các ô, gõ số vào ô trống rồi nhấn Enter."
    >
      {#each BOARD as n (n)}
        <button
          type="button"
          data-n={n}
          class={cellClass(n)}
          tabindex={n === focusN ? 0 : -1}
          aria-label={cellLabel(n)}
          onclick={() => tap(n)}
          onkeydown={(e) => onKey(e, n)}>{cellText(n)}</button
        >
      {/each}
    </div>
  </div>

  {#if !done}
    <div class="flex flex-wrap items-center gap-3">
      <span class="text-lg font-semibold text-slate-700">Em viết:</span>
      <span
        class="inline-flex h-16 min-w-24 items-center justify-center rounded-2xl border-4 border-amber-400 bg-amber-50 px-3 text-4xl font-bold tabular-nums text-amber-950"
        aria-label={entry ? `Em đã viết ${entry}` : 'Chưa viết số nào'}>{entry || '?'}</span
      >
    </div>
    <div role="group" aria-label="Bàn phím số" class="flex max-w-md flex-wrap gap-2">
      {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as d (d)}
        <button type="button" class={key} onclick={() => press(d)}>{d}</button>
      {/each}
      <button
        type="button"
        class="h-14 rounded-2xl border-4 border-slate-300 bg-white px-4 text-xl font-bold text-slate-700 {focusRing}"
        onclick={erase}>Xoá</button
      >
      <button
        type="button"
        class="h-14 rounded-2xl bg-indigo-600 px-5 text-xl font-bold text-white hover:bg-indigo-700 {focusRing}"
        onclick={check}>Kiểm tra</button
      >
    </div>
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {done || (lastRight !== null && !hint)
      ? 'bg-emerald-100 text-emerald-900'
      : hint
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if done}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newBoard}>
    Bảng khác
  </button>
</div>
