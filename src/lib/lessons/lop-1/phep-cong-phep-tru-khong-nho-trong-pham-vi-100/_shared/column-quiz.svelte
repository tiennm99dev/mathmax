<script>
  import { focusRing } from '#lib/core/ui.js';
  import ColumnBoard from './column-board.svelte';
  import StickPile from './stick-pile.svelte';
  import { columnSteps, equationText } from './column.js';

  /**
   * The child works a column calculation step by step: the ones column is
   * tinted first, the child taps the digit to write there, then the tens
   * column. A wrong digit gives a hint; a second wrong digit in the same
   * column shows the step. With `sticks`, counting sticks follow the steps:
   * for an addition the two numbers' sticks with the current column ringed,
   * for a subtraction the sticks of the first number with the loose sticks,
   * then the bundles, crossed out as each column is worked.
   *
   * Remount it (`{#key}`) for a new calculation.
   * @type {{
   *   a: number;
   *   b: number;
   *   op: import('./column.js').Op;
   *   sticks?: boolean;
   * }}
   */
  let { a, b, op, sticks = false } = $props();

  /** 0: ones column, 1: tens column, 2: done. */
  let step = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);

  const steps = $derived(columnSteps(a, b, op));
  const active = $derived(step === 0 ? 'ones' : step === 1 ? 'tens' : null);
  const written = $derived({
    tens: step > 1 ? steps[1].digit : null,
    ones: step > 0 ? steps[0].digit : null,
  });
  const done = $derived(step > 1);

  const message = $derived.by(() => {
    if (done) {
      return `Đúng rồi! ${steps[0].text} ${steps[1].text} Vậy ${equationText(a, b, op)}.`;
    }
    const s = steps[step];
    const before = step === 1 && wrong.length === 0 ? `Đúng rồi: ${steps[0].text} ` : '';
    if (wrong.length === 0) return `${before}${s.ask}`;
    if (wrong.length === 1) return `Chưa đúng. ${s.hint} Em thử lại nhé.`;
    return `Em xem nhé: ${s.text} Em chạm số ${s.digit}.`;
  });

  /** @param {number} d */
  function pick(d) {
    if (done || wrong.includes(d)) return;
    if (d === steps[step].digit) {
      step += 1;
      wrong = [];
    } else {
      wrong = [...wrong, d];
    }
  }

  /** @param {number} d */
  function digitClass(d) {
    const base = `h-14 w-14 rounded-2xl border-4 text-3xl font-bold tabular-nums transition ${focusRing}`;
    if (wrong.includes(d)) return `${base} border-rose-300 bg-rose-50 text-rose-400 line-through`;
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<div class="space-y-4">
  {#if sticks}
    <div class="space-y-2 rounded-3xl bg-amber-50 p-3">
      {#if op === '+'}
        <StickPile tens={Math.floor(a / 10)} ones={a % 10} highlight={active} />
        <p class="text-2xl font-bold text-slate-500" aria-hidden="true">+</p>
        <StickPile tens={Math.floor(b / 10)} ones={b % 10} tone="sky" highlight={active} />
      {:else}
        <StickPile
          tens={Math.floor(a / 10)}
          ones={a % 10}
          crossOnes={step > 0 ? b % 10 : 0}
          crossTens={step > 1 ? Math.floor(b / 10) : 0}
          highlight={active}
        />
      {/if}
    </div>
  {/if}

  <div class="flex flex-wrap items-start gap-4">
    <ColumnBoard {a} {b} {op} {written} {active} />
    <p
      class="min-w-0 flex-1 basis-56 rounded-2xl px-4 py-3 text-xl font-semibold {done
        ? 'bg-emerald-100 text-emerald-900'
        : wrong.length > 0
          ? 'bg-amber-100 text-amber-900'
          : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if done}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>
  </div>

  {#if !done}
    <div
      role="group"
      aria-label="Chọn chữ số viết ở hàng {active === 'ones' ? 'đơn vị' : 'chục'}"
      class="grid max-w-sm grid-cols-5 gap-2"
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
  {/if}
</div>
