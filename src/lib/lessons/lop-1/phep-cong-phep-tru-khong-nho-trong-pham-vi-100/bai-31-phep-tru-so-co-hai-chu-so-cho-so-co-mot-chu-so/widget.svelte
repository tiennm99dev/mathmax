<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import ColumnQuiz from '../_shared/column-quiz.svelte';
  import StickPile from '../_shared/stick-pile.svelte';
  import { freshProblem } from '../_shared/column.js';
  import { FIRST, crossedCount, freshRow, takeMessage, toggle } from './engine.js';

  let a = $state(FIRST.a);
  let b = $state(FIRST.b);
  let row = $state(freshRow(FIRST.a));
  /** @type {HTMLHeadingElement | undefined} */
  let columnHeading = $state();

  const crossed = $derived(crossedCount(row));
  const status = $derived(takeMessage(a, b, crossed));

  /** @param {number} i */
  async function tap(i) {
    const wasDone = status.done;
    row = toggle(row, i);
    await tick();
    if (!wasDone && status.done) columnHeading?.focus();
  }

  function another() {
    const p = freshProblem(Math.random, 'sub-one', { a, b });
    a = p.a;
    b = p.b;
    row = freshRow(p.a);
  }
</script>

<div class="space-y-5">
  <p
    class="inline-block rounded-2xl border-4 border-indigo-500 bg-white px-4 py-2 text-4xl font-bold text-indigo-700 tabular-nums"
  >
    {a} − {b} = ?
  </p>

  <div
    class="flex flex-wrap items-end gap-x-6 gap-y-3 rounded-3xl border-4 border-amber-200 bg-amber-50 p-3"
  >
    <div>
      <p class="text-lg font-bold text-slate-700">Chục</p>
      <StickPile tens={Math.floor(a / 10)} ones={0} />
    </div>
    <div>
      <p class="text-lg font-bold text-slate-700">Đơn vị</p>
      <ul class="flex flex-wrap gap-1" aria-label="Que rời">
        {#each row as gone, i (i)}
          <li>
            <button
              type="button"
              class="flex h-16 w-11 items-center justify-center rounded-xl hover:bg-amber-100 {focusRing}"
              aria-pressed={gone}
              aria-label="Que rời thứ {i + 1}{gone ? ', đã bớt. Chạm để lấy lại' : '. Chạm để bớt'}"
              onclick={() => tap(i)}
            >
              <svg
                width="12"
                height="58"
                viewBox="0 0 8 64"
                aria-hidden="true"
                class="overflow-visible transition-opacity duration-300 motion-reduce:transition-none {gone
                  ? 'opacity-40'
                  : 'opacity-100'}"
              >
                <rect x="1.5" y="2" width="5" height="60" rx="2" fill="#f59e0b" stroke="#b45309" />
                {#if gone}
                  <line x1="-4" y1="52" x2="12" y2="12" stroke="#be123c" stroke-width="3" />
                {/if}
              </svg>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {status.done
      ? 'bg-emerald-100 text-emerald-900'
      : crossed > b
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {status.text}
  </p>

  {#if status.done}
    <h3
      bind:this={columnHeading}
      tabindex="-1"
      class="text-2xl font-bold text-slate-900 outline-none"
    >
      Đặt tính rồi tính
    </h3>
    {#key `${a}-${b}`}
      <ColumnQuiz {a} {b} op="-" />
    {/key}
  {/if}

  <div class="flex flex-wrap gap-3">
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={another}>
      Phép tính khác
    </button>
    {#if crossed > 0}
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        onclick={() => (row = freshRow(a))}
      >
        Làm lại
      </button>
    {/if}
  </div>
</div>
