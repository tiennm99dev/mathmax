<script>
  import { tick } from 'svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { scale } from 'svelte/transition';
  import { reducedMotion } from '#lib/core/motion.js';
  import { askFor, equation, nudge, rowsOf, stepsOf } from './column.js';

  /**
   * A column addition or subtraction worked by the child one digit at a time,
   * from the ones. After each column the sheet shows what goes on to the
   * next one: the carried 1 over the next column for addition; for
   * subtraction the 10 taken into this column and the 1 added to the next
   * digit of the number below.
   * @type {{
   *   op: import('./column.js').Op;
   *   tasks: ReadonlyArray<{ a: number, b: number }>;
   * }}
   */
  let { op, tasks } = $props();

  const DIGIT_KEYS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const cell = 'flex w-8 items-center justify-center';
  const pop = { duration: reducedMotion() ? 0 : 400, start: 0.2 };
  const word = $derived(op === '+' ? 'cộng' : 'trừ');

  let index = $state(0);
  let done = $state(0);
  let tries = $state(0);
  /** @type {HTMLDivElement | undefined} */
  let pad = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const task = $derived(tasks[index % tasks.length]);
  const steps = $derived(stepsOf(op, task.a, task.b));
  const step = $derived(steps[done] ?? null);
  const finished = $derived(step === null);
  const size = $derived(steps.length);
  /** Column numbers from the left cell to the right one. */
  const cols = $derived(Array.from({ length: size }, (_, i) => size - 1 - i));
  const rows = $derived(rowsOf(op, task.a, task.b));
  const top = $derived(rows[0]);
  const bottom = $derived(rows[1]);
  const marks = $derived(steps.slice(0, done).filter((s) => s.out > 0).length);
  const note = $derived(
    finished
      ? { tone: 'ok', text: `Đúng rồi! ${equation(op, task.a, task.b)}.` }
      : tries > 0
        ? { tone: 'warn', text: nudge(op, /** @type {import('./column.js').Step} */ (step), tries) }
        : { tone: 'info', text: askFor(/** @type {import('./column.js').Step} */ (step)) },
  );

  /**
   * Whether column `c` has been worked out.
   * @param {number} c
   */
  const isDone = (c) => c < done;

  /**
   * Whether the column before `c` sent a 1 on to it, and that column is done.
   * @param {number} c
   */
  const gotOne = (c) => c > 0 && isDone(c - 1) && steps[c - 1].out > 0;

  /**
   * The digit of `n` in column `c`, or a blank.
   * @param {number} n
   * @param {number} c
   */
  const digitOf = (n, c) => {
    const text = String(n);
    return c < text.length ? text[text.length - 1 - c] : '';
  };

  /** The result digit written in column `c`, or a blank. */
  const resultDigit = (/** @type {number} */ c) => (isDone(c) ? String(steps[c].digit) : '');

  async function nextTask() {
    index += 1;
    done = 0;
    tries = 0;
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
  <div class="flex flex-wrap items-start justify-center gap-4">
    <div
      class="inline-flex rounded-2xl border-4 border-slate-300 bg-white p-3 text-3xl font-bold tabular-nums"
      role="img"
      aria-label="Đặt tính: {fmt(top)} {word} {fmt(
        bottom,
      )}. Đã viết {done} chữ số của kết quả{marks > 0 ? `, có ${marks} lần nhớ 1` : ''}."
    >
      <span class="flex w-8 items-center justify-center self-center text-slate-600">{op}</span>
      <div>
        <div class="flex h-7 text-base text-rose-600" aria-hidden="true">
          {#each cols as c (c)}
            <span class={cell}>
              {#if op === '+' && gotOne(c)}
                <span in:scale={pop}>1</span>
              {:else if op === '−' && isDone(c) && steps[c].out > 0}
                <span class="rounded bg-rose-100 px-1" in:scale={pop}>+10</span>
              {/if}
            </span>
          {/each}
        </div>
        <div class="flex">
          {#each cols as c (c)}
            <span class="{cell} h-11 rounded-t-lg {step && step.col === c ? 'bg-amber-100' : ''}"
              >{digitOf(top, c)}</span
            >
          {/each}
        </div>
        <div class="flex border-b-4 border-slate-700">
          {#each cols as c (c)}
            <span class="{cell} relative h-11 {step && step.col === c ? 'bg-amber-100' : ''}">
              {digitOf(bottom, c)}
              {#if op === '−' && gotOne(c)}
                <span
                  class="absolute -top-1 right-0 rounded bg-rose-100 px-0.5 text-sm text-rose-600"
                  aria-hidden="true"
                  in:scale={pop}>+1</span
                >
              {/if}
            </span>
          {/each}
        </div>
        <div class="flex text-indigo-700">
          {#each cols as c (c)}
            <span class="{cell} h-11 rounded-b-lg {step && step.col === c ? 'bg-amber-100' : ''}"
              >{resultDigit(c) || (step && step.col === c ? '?' : '')}</span
            >
          {/each}
        </div>
      </div>
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
