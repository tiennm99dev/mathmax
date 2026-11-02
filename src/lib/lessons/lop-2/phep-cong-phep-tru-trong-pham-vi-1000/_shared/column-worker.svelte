<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { equationText } from '#lib/core/kid/column.js';
  import ColumnBoard from './column-board.svelte';
  import PlaceChart from './place-chart.svelte';
  import {
    actionAsk,
    actionLabel,
    columnSteps,
    digitHint,
    PLACE_WORDS,
    planOf,
    viewAt,
  } from './column-three.js';

  /**
   * The child works one calculation with blocks and in columns, right to left:
   * joins or takes away the blocks of a column, trades ten for one of the next
   * place or opens one into ten when the calculation needs it, then writes the
   * digit. A wrong digit gives a hint; a second wrong digit shows the step.
   *
   * Remount it (`{#key}`) for a new calculation.
   * @type {{ a: number, b: number, op: import('#lib/core/kid/column.js').Op }}
   */
  let { a, b, op } = $props();

  let done = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);
  /** @type {HTMLDivElement | undefined} */
  let controls = $state();
  /** @type {HTMLParagraphElement | undefined} */
  let feedback = $state();

  const plan = $derived(planOf(a, b, op));
  const action = $derived(plan[done] ?? null);
  const view = $derived(viewAt(a, b, op, done));
  const steps = $derived(columnSteps(a, b, op));

  const message = $derived.by(() => {
    if (!action) {
      return `Đúng rồi! ${steps.map((s) => s.text).join(' ')} Vậy ${equationText(a, b, op)}.`;
    }
    if (wrong.length === 0) return actionAsk(action, op);
    if (wrong.length === 1) return `Chưa đúng. ${digitHint(action.step)}`;
    return `Em xem nhé: ${action.step.text} Em chạm số ${action.step.digit}.`;
  });

  /** Moves on, keeping the focus on the next control or on the result. */
  async function advance() {
    done += 1;
    wrong = [];
    await tick();
    if (done >= plan.length) feedback?.focus();
    else controls?.querySelector('button')?.focus();
  }

  /** @param {number} d */
  function pick(d) {
    if (!action || action.type !== 'digit' || wrong.includes(d)) return;
    if (d === action.step.digit) advance();
    else wrong = [...wrong, d];
  }

  /** @param {number} d */
  function digitClass(d) {
    const base = `h-14 w-14 rounded-2xl border-4 text-3xl font-bold tabular-nums transition motion-reduce:transition-none ${focusRing}`;
    if (wrong.includes(d)) return `${base} border-rose-300 bg-rose-50 text-rose-500 line-through`;
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<div class="space-y-4">
  <PlaceChart columns={view.columns} active={view.active} {op} />

  <div class="flex flex-wrap items-start justify-center gap-3">
    <ColumnBoard {a} {b} {op} written={view.written} carried={view.carried} active={view.active} />
    <p
      bind:this={feedback}
      tabindex="-1"
      class="min-w-0 flex-1 basis-56 rounded-2xl px-4 py-3 text-lg font-semibold outline-none {action ===
      null
        ? 'bg-emerald-100 text-emerald-900'
        : wrong.length > 0
          ? 'bg-amber-100 text-amber-900'
          : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if !action}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>
  </div>

  <div bind:this={controls}>
    {#if action?.type === 'digit'}
      <div
        role="group"
        aria-label="Chọn chữ số viết ở hàng {PLACE_WORDS[action.step.place].unit}"
        class="mx-auto grid max-w-sm grid-cols-5 justify-items-center gap-2"
      >
        {#each { length: 10 } as _, d (d)}
          <button
            type="button"
            class={digitClass(d)}
            aria-label="Viết {d}"
            aria-disabled={wrong.includes(d)}
            onclick={() => pick(d)}>{d}</button
          >
        {/each}
      </div>
    {:else if action}
      <div class="flex justify-center">
        <button type="button" class="min-h-12 text-lg {button.primary}" onclick={advance}
          >{actionLabel(action)}</button
        >
      </div>
    {/if}
  </div>
</div>
