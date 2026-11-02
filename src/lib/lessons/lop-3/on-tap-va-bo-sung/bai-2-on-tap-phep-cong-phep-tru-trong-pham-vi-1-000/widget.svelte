<script>
  import { tick } from 'svelte';
  import { equationText, exprText } from '#lib/core/kid/column.js';
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import { optionText } from '#lib/core/kid/quiz.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { columnSteps, columnWords, PLACE_NAMES } from '../_shared/columns.js';
  import ColumnBoard from '../_shared/column-board.svelte';
  import { BOOK_CALCS, SKILLS, boardWidth, calcAt, workerView } from './engine.js';

  let mode = $state(/** @type {'work' | 'quiz'} */ ('work'));
  let turn = $state(0);
  /** @type {import('./engine.js').Calc} */
  let calc = $state({ ...BOOK_CALCS[0] });
  let done = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);
  /** @type {HTMLDivElement | undefined} */
  let pad = $state();
  /** @type {HTMLParagraphElement | undefined} */
  let feedback = $state();

  const view = $derived(workerView(calc, done));
  const width = $derived(boardWidth(calc));
  const steps = $derived(columnSteps(calc.a, calc.b, calc.op).filter((s) => !s.blank));
  const message = $derived.by(() => {
    if (!view.step) return `Đúng rồi! ${columnWords(calc.a, calc.b, calc.op)}`;
    if (wrong.length === 1) return `Chưa đúng. ${view.step.hint}`;
    if (wrong.length > 1) return `Em xem nhé: ${view.step.text} Em chạm số ${view.step.digit}.`;
    const before = done > 0 ? `${steps[done - 1].text} ` : '';
    return `${before}${view.step.ask}`;
  });

  /** @param {number} d */
  async function pick(d) {
    if (!view.step || wrong.includes(d)) return;
    if (d !== view.step.digit) {
      wrong = [...wrong, d];
      return;
    }
    done += 1;
    wrong = [];
    await tick();
    if (!view.step) feedback?.focus();
    else pad?.querySelector('button')?.focus();
  }

  function next() {
    turn += 1;
    calc = calcAt(turn % (BOOK_CALCS.length * 2), Math.random);
    done = 0;
    wrong = [];
  }

  /** @param {number} d */
  function digitClass(d) {
    const base = `h-14 w-14 rounded-2xl border-4 text-3xl font-bold tabular-nums transition motion-reduce:transition-none ${focusRing}`;
    if (wrong.includes(d)) return `${base} border-rose-300 bg-rose-50 text-rose-500 line-through`;
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'work', label: 'Đặt tính' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'work'}
    <p class="text-center text-xl font-semibold text-slate-800">
      {view.step
        ? `Tính: ${exprText(calc.a, calc.b, calc.op)}`
        : equationText(calc.a, calc.b, calc.op)}
    </p>

    <div class="flex justify-center">
      <ColumnBoard
        a={calc.a}
        b={calc.b}
        op={calc.op}
        {width}
        written={view.written}
        carried={view.carried}
        active={view.active}
      />
    </div>

    <p
      bind:this={feedback}
      tabindex="-1"
      class="rounded-2xl px-4 py-3 text-lg font-semibold outline-none {view.step === null
        ? 'bg-emerald-100 text-emerald-900'
        : wrong.length > 0
          ? 'bg-amber-100 text-amber-900'
          : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if !view.step}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>

    {#if view.step}
      <div
        bind:this={pad}
        role="group"
        aria-label="Chọn chữ số viết ở hàng {PLACE_NAMES[view.step.index]}"
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
    {/if}

    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {view.step ? button.secondary : button.primary}"
        onclick={next}>Phép tính khác</button
      >
    </div>
  {:else}
    <AdaptiveQuiz
      skills={SKILLS}
      length={12}
      allGood="Tuyệt vời! Em đã nắm chắc phép cộng, phép trừ trong phạm vi 1 000."
      listOptions={(q) => q.options.some((o) => optionText(o).length > 16)}
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          {@const w = boardWidth(q.visual)}
          {@const all = columnSteps(q.visual.a, q.visual.b, q.visual.op)}
          <div class="flex justify-center">
            <ColumnBoard
              a={q.visual.a}
              b={q.visual.b}
              op={q.visual.op}
              width={w}
              written={[0, 1, 2].map((i) => {
                const s = all.find((step) => step.index === i);
                return settled && s && !s.blank ? s.digit : null;
              })}
            />
          </div>
        {/if}
      {/snippet}
    </AdaptiveQuiz>
  {/if}
</div>
