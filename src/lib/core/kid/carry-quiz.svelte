<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import ColumnBoard from './column-board.svelte';
  import CountingSticks from './counting-sticks.svelte';
  import { equationText } from './column.js';
  import { carrySteps } from './carry.js';

  /**
   * The child works a carrying calculation in columns, step by step: the
   * ones column first (the small carried 1 appears once it is written), then
   * the tens column. A wrong digit gives a hint; a second wrong digit in the
   * same column shows the step.
   *
   * With `sticks`, counting sticks follow the steps. For an addition all the
   * sticks of both numbers lie together, and once the ones are done ten loose
   * sticks are tied into one more bundle. For a subtraction the child first
   * unties one bundle into ten loose sticks ("Tháo 1 bó"), then the loose
   * sticks and the bundles taken away are crossed out column by column.
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
  /** For a subtraction with sticks: whether one bundle is untied yet. */
  let untied = $state(false);
  /** @type {HTMLDivElement | undefined} */
  let pad = $state();
  /** @type {HTMLParagraphElement | undefined} */
  let feedback = $state();

  async function untie() {
    untied = true;
    await tick();
    pad?.querySelector('button')?.focus();
  }

  const steps = $derived(carrySteps(a, b, op));
  const active = $derived(step === 0 ? 'ones' : step === 1 ? 'tens' : null);
  const written = $derived({
    tens: step > 1 ? steps[1].digit : null,
    ones: step > 0 ? steps[0].digit : null,
  });
  const done = $derived(step > 1);
  const mustUntie = $derived(sticks && op === '-' && !untied);
  const [ta, ua, tb, ub] = $derived([Math.floor(a / 10), a % 10, Math.floor(b / 10), b % 10]);

  const message = $derived.by(() => {
    if (done) {
      return `Đúng rồi! ${steps[0].text} ${steps[1].text} Vậy ${equationText(a, b, op)}.`;
    }
    if (mustUntie) {
      return `Có ${ua} que rời, cần bớt ${ub} que. Không đủ! Em tháo 1 bó chục thành 10 que rời nhé.`;
    }
    const s = steps[step];
    const before = step === 1 && wrong.length === 0 ? `Đúng rồi: ${steps[0].text} ` : '';
    if (wrong.length === 0) return `${before}${s.ask}`;
    if (wrong.length === 1) return `Chưa đúng. ${s.hint} Em thử lại nhé.`;
    return `Em xem nhé: ${s.text} Em chạm số ${s.digit}.`;
  });

  /** @param {number} d */
  async function pick(d) {
    if (done || mustUntie || wrong.includes(d)) return;
    if (d === steps[step].digit) {
      step += 1;
      wrong = [];
      // The digit pad goes away once the result is written: keep the focus on
      // the result instead of losing it to the page.
      if (step > 1) {
        await tick();
        feedback?.focus();
      }
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
        {#if step === 0}
          <CountingSticks tens={ta + tb} ones={ua} extraOnes={ub} highlight="ones" />
          <p class="text-lg font-semibold text-slate-700">
            {ua} que rời và {ub} que rời là {ua + ub} que rời.
          </p>
        {:else}
          <CountingSticks tens={ta + tb + 1} ones={(ua + ub) % 10} highlight={active} />
          <p class="text-lg font-semibold text-slate-700">
            Bó 10 que rời thành 1 chục. Có {ta + tb + 1} chục và {(ua + ub) % 10} que rời.
          </p>
        {/if}
      {:else if !untied}
        <CountingSticks tens={ta} ones={ua} highlight="tens" />
      {:else if step === 0}
        <CountingSticks tens={ta - 1} ones={ua} extraOnes={10} highlight="ones" />
        <p class="text-lg font-semibold text-slate-700">
          Tháo 1 bó: còn {ta - 1} chục và {10 + ua} que rời.
        </p>
      {:else}
        <CountingSticks
          tens={ta - 1}
          ones={10 + ua}
          crossOnes={ub}
          crossTens={step > 1 ? tb : 0}
          highlight={active}
        />
        <p class="text-lg font-semibold text-slate-700">
          {step > 1
            ? `Bớt ${tb} bó: còn ${ta - 1 - tb} chục và ${10 + ua - ub} que rời.`
            : `Bớt ${ub} que rời: còn ${10 + ua - ub} que rời.`}
        </p>
      {/if}
    </div>
  {/if}

  <div class="flex flex-wrap items-start gap-4">
    <ColumnBoard {a} {b} {op} {written} carried={step > 0} {active} />
    <p
      bind:this={feedback}
      tabindex="-1"
      class="min-w-0 flex-1 basis-56 rounded-2xl px-4 py-3 text-xl font-semibold outline-none {done
        ? 'bg-emerald-100 text-emerald-900'
        : wrong.length > 0
          ? 'bg-amber-100 text-amber-900'
          : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if done}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>
  </div>

  {#if mustUntie}
    <button type="button" class="min-h-12 text-lg {button.primary}" onclick={untie}
      >Tháo 1 bó chục</button
    >
  {:else if !done}
    <div
      bind:this={pad}
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
