<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { OPS, TASKS, askFor, equation, nudge, resultOf, sheetRows, stepsOf } from './engine.js';

  /** @typedef {import('./engine.js').Op} Op */

  const DIGIT_KEYS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const cell = 'flex h-10 w-7 items-center justify-center';
  const box =
    'inline-flex rounded-2xl border-4 border-slate-300 bg-white p-3 text-3xl font-bold tabular-nums';

  let op = $state(/** @type {Op} */ ('+'));
  let index = $state(0);
  let done = $state(0);
  let tries = $state(0);
  /** @type {HTMLDivElement | undefined} */
  let pad = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const task = $derived(TASKS[op][index % TASKS[op].length]);
  const steps = $derived(stepsOf(op, task.a, task.b));
  const step = $derived(steps[done] ?? null);
  const word = $derived(OPS.find((o) => o.value === op)?.word ?? '');
  const finished = $derived(step === null);
  const result = $derived(resultOf(op, task.a, task.b));
  const size = $derived(Math.max(String(task.a).length, String(task.b).length));
  /** The result digits written so far, right-aligned in `size` cells. */
  const written = $derived(
    String(result)
      .padStart(size, ' ')
      .split('')
      .map((d, i) => (size - 1 - i < done ? d : '')),
  );
  const quotient = $derived(
    steps
      .slice(0, done)
      .map((s) => s.digit)
      .join(''),
  );
  const rows = $derived(op === ':' ? sheetRows(task.a, task.b, done) : []);
  const note = $derived(
    finished
      ? { tone: 'ok', text: `Đúng rồi! ${equation(op, task.a, task.b)}.` }
      : tries > 0
        ? { tone: 'warn', text: nudge(op, /** @type {import('./engine.js').Step} */ (step), tries) }
        : { tone: 'info', text: askFor(op, /** @type {import('./engine.js').Step} */ (step)) },
  );

  /**
   * @param {string} text
   * @param {number} n
   */
  const cells = (text, n) => text.padStart(n, ' ').split('');

  function restart() {
    done = 0;
    tries = 0;
  }

  /** @param {string | number} value */
  function chooseOp(value) {
    op = /** @type {Op} */ (value);
    index = 0;
    restart();
  }

  async function nextTask() {
    index += 1;
    restart();
    await tick();
    pad?.querySelector('button')?.focus();
  }

  /** @param {number} digit */
  async function write(digit) {
    if (!step) return;
    if (digit !== step.digit) {
      tries += 1;
      return;
    }
    done += 1;
    tries = 0;
    if (done === steps.length) {
      await tick();
      nextButton?.focus();
    }
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn phép tính"
    hideLabel
    value={op}
    options={OPS.map(({ value, label }) => ({ value, label }))}
    onchange={chooseOp}
  />

  <div class="flex flex-wrap items-start justify-center gap-4">
    <div class="flex justify-center overflow-x-auto">
      {#if op !== ':'}
        <div
          class={box}
          role="img"
          aria-label="Đặt tính: {fmt(task.a)} {word} {fmt(
            task.b,
          )}. Đã viết {done} chữ số của kết quả."
        >
          <span class="flex h-20 w-7 items-center justify-center text-slate-600">{op}</span>
          <div>
            <div class="flex">
              {#each cells(String(task.a), size) as d, i (i)}<span class={cell}>{d}</span>{/each}
            </div>
            <div class="flex border-b-4 border-slate-700">
              {#each cells(String(task.b), size) as d, i (i)}<span class={cell}>{d}</span>{/each}
            </div>
            <div class="flex text-indigo-700">
              {#each written as d, i (i)}
                <span
                  class="{cell} {step && size - 1 - i === step.col
                    ? 'rounded-lg bg-amber-100'
                    : ''}">{d || (step && size - 1 - i === step.col ? '?' : '')}</span
                >
              {/each}
            </div>
          </div>
        </div>
      {:else}
        <div
          class={box}
          role="img"
          aria-label="Đặt tính: {fmt(task.a)} chia {task.b}. Thương đã viết: {quotient ||
            'chưa có'}."
        >
          <div class="border-r-4 border-slate-700 pr-2">
            {#each rows as row, r (r)}
              <div class="flex {row.line ? 'border-b-4 border-slate-400' : ''}">
                {#each row.cells as digit, c (c)}<span class={cell}>{digit}</span>{/each}
              </div>
            {/each}
          </div>
          <div class="min-w-16">
            <div class="flex h-10 items-center justify-center border-b-4 border-slate-700 px-2">
              {task.b}
            </div>
            <div class="flex h-10 items-center justify-center px-2 text-indigo-700">
              {quotient}{#if !finished}<span class="rounded-lg bg-amber-100 px-1">?</span>{/if}
            </div>
          </div>
        </div>
      {/if}
    </div>

    {#if done > 0}
      <ol class="min-w-0 flex-1 basis-56 space-y-2 text-lg font-semibold">
        {#each steps.slice(0, done) as s (s.col)}
          <li class="rounded-xl bg-indigo-50 px-3 py-2 text-indigo-950">{s.say}.</li>
        {/each}
      </ol>
    {/if}
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {note.tone === 'ok'
      ? 'bg-emerald-100 text-emerald-900'
      : note.tone === 'warn'
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if note.tone === 'ok'}<span aria-hidden="true">⭐ </span>{/if}{note.text}
  </p>

  {#if !finished}
    <div
      class="grid grid-cols-5 gap-2"
      role="group"
      aria-label="Chọn chữ số để viết"
      bind:this={pad}
    >
      {#each DIGIT_KEYS as digit (digit)}
        <button
          type="button"
          class="min-h-14 px-0 text-2xl tabular-nums {button.quiet}"
          onclick={() => write(digit)}>{digit}</button
        >
      {/each}
    </div>
  {/if}

  <button
    type="button"
    class="min-h-12 text-lg {finished ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={nextTask}>Phép tính khác</button
  >
</div>
