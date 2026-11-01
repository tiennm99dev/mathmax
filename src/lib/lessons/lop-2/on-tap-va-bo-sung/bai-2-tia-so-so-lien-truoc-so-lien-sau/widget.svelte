<script>
  import { tick } from 'svelte';
  import { rng } from '#lib/core/drill.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    HI,
    LO,
    SPAN,
    clampRay,
    judge,
    makeTask,
    neighbours,
    shown,
    slideWindow,
    taskText,
  } from './engine.js';

  /** `free`: move the frog and read its neighbours. `game`: hop to answer a question. */
  let mode = $state(/** @type {'free' | 'game'} */ ('free'));

  // The first task uses a fixed seed so the prerendered page and the browser agree.
  const rand = rng(7);
  let task = $state(makeTask(rand));

  let pos = $state(23);
  /** @type {number | null} */
  let from = $state(null);
  let start = $state(slideWindow(21, 23));

  const nums = $derived(shown(start));
  const near = $derived(neighbours(pos));
  const result = $derived(mode === 'game' ? judge(task, pos) : null);

  /** @type {HTMLDivElement | undefined} */
  let row = $state();

  /** SVG geometry: one column is 100 units wide. */
  const COL = 100;
  const LINE_Y = 118;
  /** @param {number} n */
  const xOf = (n) => (n - start) * COL + COL / 2;

  /** @param {number} n */
  function moveTo(n) {
    const next = clampRay(n);
    if (mode === 'game' && result?.state === 'right') return;
    if (next === pos) return;
    from = pos;
    pos = next;
    start = slideWindow(start, next);
  }

  function newTask() {
    task = makeTask(rand, task);
    from = null;
    pos = task.n;
    start = slideWindow(start, task.n);
  }

  /** @param {string | number} m */
  function onMode(m) {
    from = null;
    if (m === 'game') {
      pos = task.n;
      start = slideWindow(start, task.n);
    }
  }

  /** @param {KeyboardEvent} e */
  async function onKey(e) {
    const step = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    moveTo(pos + step);
    await tick();
    /** @type {HTMLButtonElement | null | undefined} */ (
      row?.querySelector(`button[data-n="${pos}"]`)
    )?.focus();
  }

  const freeText = $derived(
    near.before === null
      ? `Ếch ở số 0. Trên tia số không có số nào đứng trước 0. Số liền sau của 0 là 1.`
      : `Ếch ở số ${pos}. Số liền trước của ${pos} là ${near.before}. Số liền sau của ${pos} là ${near.after}.`,
  );

  /** @param {number} n */
  function numClass(n) {
    const base = `flex h-12 min-w-0 items-center justify-center rounded-xl text-2xl font-bold tabular-nums transition ${focusRing}`;
    if (n === pos) return `${base} bg-emerald-600 text-white`;
    if (mode === 'free' && n === near.before)
      return `${base} bg-sky-100 text-sky-900 ring-2 ring-sky-400`;
    if (mode === 'free' && n === near.after)
      return `${base} bg-orange-100 text-orange-900 ring-2 ring-orange-400`;
    return `${base} bg-white text-slate-700 hover:bg-indigo-50`;
  }

  const hopBtn = `min-h-14 flex-1 rounded-2xl px-3 text-lg font-bold transition disabled:opacity-40 ${focusRing}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn cách chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'free', label: 'Ếch nhảy tự do' },
      { value: 'game', label: 'Đố em' },
    ]}
    onchange={onMode}
  />

  {#if mode === 'game'}
    <p class="rounded-2xl bg-indigo-50 px-4 py-3 text-xl font-semibold text-indigo-900">
      {taskText(task)}
    </p>
  {/if}

  <div class="overflow-x-auto pb-1">
    <div class="min-w-[16rem] rounded-2xl bg-sky-50 p-2">
      <svg
        viewBox="0 0 {SPAN * COL} 150"
        class="block w-full select-none"
        role="img"
        aria-label="Tia số từ {nums[0]} đến {nums[SPAN - 1]}. Ếch đứng ở số {pos}."
      >
        {#if from !== null && from >= start && from < start + SPAN}
          {@const x1 = xOf(from)}
          {@const x2 = xOf(pos)}
          <path
            d="M {x1} {LINE_Y - 6} Q {(x1 + x2) / 2} {LINE_Y - 90} {x2} {LINE_Y - 6}"
            fill="none"
            stroke="#f59e0b"
            stroke-width="4"
            stroke-dasharray="8 6"
          />
        {/if}
        <line
          x1="10"
          y1={LINE_Y}
          x2={SPAN * COL - 14}
          y2={LINE_Y}
          stroke="#334155"
          stroke-width="4"
        />
        <path d="M {SPAN * COL - 2} {LINE_Y} l -16 -9 v 18 z" fill="#334155" aria-hidden="true" />
        {#each nums as n (n)}
          <line
            x1={xOf(n)}
            y1={LINE_Y - 10}
            x2={xOf(n)}
            y2={LINE_Y + 10}
            stroke="#334155"
            stroke-width="4"
          />
        {/each}
        <g
          class="motion-safe:transition-transform motion-safe:duration-300"
          style:transform="translate({xOf(pos)}px, {LINE_Y - 34}px)"
        >
          <ellipse cx="0" cy="0" rx="30" ry="22" fill="#16a34a" />
          <ellipse cx="-20" cy="18" rx="12" ry="6" fill="#15803d" />
          <ellipse cx="20" cy="18" rx="12" ry="6" fill="#15803d" />
          <circle cx="-13" cy="-20" r="9" fill="#fff" stroke="#15803d" stroke-width="3" />
          <circle cx="13" cy="-20" r="9" fill="#fff" stroke="#15803d" stroke-width="3" />
          <circle cx="-12" cy="-20" r="4" fill="#0f172a" />
          <circle cx="14" cy="-20" r="4" fill="#0f172a" />
          <path d="M -12 4 Q 0 13 12 4" fill="none" stroke="#0f172a" stroke-width="3" />
        </g>
      </svg>
      <div
        bind:this={row}
        class="grid grid-cols-5 gap-1"
        role="group"
        aria-label="Các số trên tia số. Chạm một số để ếch nhảy đến đó, hoặc dùng phím mũi tên trái phải."
      >
        {#each nums as n (n)}
          <button
            type="button"
            data-n={n}
            class={numClass(n)}
            tabindex={n === pos ? 0 : -1}
            aria-label={n === pos ? `${n}, ếch đang ở đây` : String(n)}
            aria-current={n === pos ? 'true' : undefined}
            onclick={() => moveTo(n)}
            onkeydown={onKey}>{n}</button
          >
        {/each}
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
      type="button"
      class="{hopBtn} bg-sky-600 text-white hover:bg-sky-700"
      disabled={pos <= LO}
      onclick={() => moveTo(pos - 1)}>← Nhảy lùi 1</button
    >
    <button
      type="button"
      class="{hopBtn} bg-orange-500 text-white hover:bg-orange-600"
      disabled={pos >= HI}
      onclick={() => moveTo(pos + 1)}>Nhảy tiến 1 →</button
    >
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {result?.state === 'right'
      ? 'bg-emerald-100 text-emerald-900'
      : result?.state === 'wrong'
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if result?.state === 'right'}<span aria-hidden="true">⭐ </span>{/if}{result
      ? result.text
      : freeText}
  </p>

  {#if mode === 'free'}
    <div class="grid grid-cols-2 gap-3 text-center text-lg font-semibold">
      <div class="rounded-2xl bg-sky-100 p-3 text-sky-900">
        Số liền trước<br /><span class="text-4xl tabular-nums">{near.before ?? '—'}</span>
      </div>
      <div class="rounded-2xl bg-orange-100 p-3 text-orange-900">
        Số liền sau<br /><span class="text-4xl tabular-nums">{near.after}</span>
      </div>
    </div>
  {:else}
    <div class="flex flex-wrap gap-3">
      {#if result?.state === 'wrong'}
        <button
          type="button"
          class="min-h-12 text-lg {button.quiet}"
          onclick={() => {
            from = null;
            pos = task.n;
            start = slideWindow(start, task.n);
          }}>Về chỗ cũ</button
        >
      {/if}
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newTask}>
        Câu khác
      </button>
    </div>
  {/if}
</div>
