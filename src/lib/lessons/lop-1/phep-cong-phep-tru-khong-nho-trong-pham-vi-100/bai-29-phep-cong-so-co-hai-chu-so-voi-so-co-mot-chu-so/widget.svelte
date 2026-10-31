<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import ColumnQuiz from '../_shared/column-quiz.svelte';
  import StickPile from '../_shared/stick-pile.svelte';
  import { freshProblem } from '../_shared/column.js';
  import { FIRST, moveMessage } from './engine.js';

  let a = $state(FIRST.a);
  let b = $state(FIRST.b);
  /** How many of the b new sticks are already in the ones column. */
  let moved = $state(0);
  /** @type {HTMLDivElement | undefined} */
  let tray = $state();
  /** @type {HTMLHeadingElement | undefined} */
  let columnHeading = $state();

  const allIn = $derived(moved >= b);
  const message = $derived(moveMessage(a, b, moved));

  async function moveOne() {
    if (allIn) return;
    moved += 1;
    await tick();
    const next = /** @type {HTMLButtonElement | null | undefined} */ (
      tray?.querySelector('button')
    );
    if (next) next.focus();
    else columnHeading?.focus();
  }

  function another() {
    const p = freshProblem(Math.random, 'add-one', { a, b });
    a = p.a;
    b = p.b;
    moved = 0;
  }

  function again() {
    moved = 0;
  }
</script>

<div class="space-y-5">
  <div class="flex items-center gap-3">
    <span
      class="rounded-2xl border-4 border-indigo-500 bg-white px-4 py-2 text-4xl font-bold text-indigo-700 tabular-nums"
      >{a} + {b} = ?</span
    >
  </div>

  <div class="grid gap-3 rounded-3xl border-4 border-amber-200 bg-amber-50 p-3">
    <div class="flex flex-wrap items-end gap-x-6 gap-y-3">
      <div>
        <p class="text-lg font-bold text-slate-700">Chục</p>
        <StickPile tens={Math.floor(a / 10)} ones={0} />
      </div>
      <div>
        <p class="text-lg font-bold text-slate-700">Đơn vị</p>
        {#if (a % 10) + moved > 0}
          <StickPile tens={0} ones={a % 10} extraOnes={moved} highlight={allIn ? null : 'ones'} />
        {:else}
          <p class="min-h-16 text-lg text-slate-500">Chưa có que rời</p>
        {/if}
      </div>
    </div>
    <div
      bind:this={tray}
      class="flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-sky-300 bg-white p-2"
      role="group"
      aria-label="Que tính cần thêm"
    >
      {#each { length: b - moved } as _, i (i)}
        <button
          type="button"
          class="flex h-16 w-12 items-center justify-center rounded-xl bg-sky-50 hover:bg-sky-100 {focusRing}"
          aria-label="Thêm 1 que vào hàng đơn vị, còn {b - moved} que"
          onclick={moveOne}
        >
          <svg width="10" height="56" viewBox="0 0 8 64" aria-hidden="true">
            <rect x="1.5" y="2" width="5" height="60" rx="2" fill="#38bdf8" stroke="#0369a1" />
          </svg>
        </button>
      {/each}
      {#if allIn}
        <span class="text-lg text-slate-500">Đã thêm hết {b} que.</span>
      {/if}
    </div>
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {allIn
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {message}
  </p>

  {#if allIn}
    <h3
      bind:this={columnHeading}
      tabindex="-1"
      class="text-2xl font-bold text-slate-900 outline-none"
    >
      Đặt tính rồi tính
    </h3>
    {#key `${a}+${b}`}
      <ColumnQuiz {a} {b} op="+" />
    {/key}
  {/if}

  <div class="flex flex-wrap gap-3">
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={another}>
      Phép tính khác
    </button>
    {#if moved > 0}
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={again}>
        Làm lại
      </button>
    {/if}
  </div>
</div>
