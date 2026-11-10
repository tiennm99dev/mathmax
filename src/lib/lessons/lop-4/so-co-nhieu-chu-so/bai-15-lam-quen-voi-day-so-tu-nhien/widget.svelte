<script>
  import { tick } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    JUMPS,
    LIMIT,
    TASKS,
    checkTask,
    describe,
    neighbours,
    onRay,
    spoken,
    taskText,
    windowAround,
  } from './engine.js';

  let mode = $state(/** @type {string | number} */ ('kham-pha'));

  /* Explore: the chosen number and the ray around it. */
  let chosen = $state(5);
  let edgeNote = $state('');
  const ticks = $derived(windowAround(chosen));
  const near = $derived(neighbours(chosen));
  const atStart = $derived(ticks[0] === 0);

  /** @param {number} n */
  function choose(n) {
    edgeNote =
      n > LIMIT
        ? `Tia số ở đây chỉ vẽ đến ${fmt(LIMIT)}, nhưng dãy số tự nhiên không dừng lại: số nào cũng có số liền sau.`
        : '';
    chosen = onRay(n);
  }

  function left() {
    if (chosen === 0) {
      edgeNote = 'Bên trái số 0 không còn số tự nhiên nào. Số 0 là số tự nhiên bé nhất.';
      return;
    }
    choose(chosen - 1);
  }

  /* Challenge: one task at a time. */
  let taskIndex = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));
  let picked = $state(/** @type {number | null | undefined} */ (undefined));
  const task = $derived(TASKS[taskIndex % TASKS.length]);
  const taskTicks = $derived(windowAround(task.given));
  const solved = $derived(result?.ok === true);
  let nextButton = $state(/** @type {HTMLButtonElement | null} */ (null));
  let rayBox = $state(/** @type {HTMLElement | null} */ (null));

  /** @param {number | null} n */
  async function answer(n) {
    if (solved) return;
    picked = n;
    result = checkTask(task, n);
    if (!result.ok) return;
    await tick();
    nextButton?.focus();
  }

  async function nextTask() {
    taskIndex += 1;
    result = null;
    picked = undefined;
    await tick();
    rayBox?.querySelector('button')?.focus();
  }

  /**
   * Text size for a tick label, so long numbers still fit.
   * @param {number} n
   */
  const labelSize = (n) =>
    n < 100000
      ? 'text-lg'
      : n < 100000000
        ? 'text-sm'
        : n < 10000000000
          ? 'text-xs'
          : 'text-[10px]';

  /**
   * The explore colours of a tick.
   * @param {number} n
   */
  function exploreTone(n) {
    if (n === chosen) return 'bg-indigo-600 text-white';
    if (n === near.before) return 'bg-amber-100 text-amber-900';
    if (n === near.after) return 'bg-emerald-100 text-emerald-900';
    return 'bg-white text-slate-800';
  }

  /**
   * The challenge colours of a tick.
   * @param {number} n
   */
  function taskTone(n) {
    if (n === task.given) return 'bg-indigo-600 text-white';
    if (picked === n) return result?.ok ? 'bg-emerald-500 text-white' : 'bg-rose-100 text-rose-900';
    return 'bg-white text-slate-800';
  }

  /**
   * The screen-reader name of a tick.
   * @param {number} n
   * @param {string} role
   */
  const tickName = (n, role) => `Số ${spoken(n)}${role ? `, ${role}` : ''}`;
</script>

{#snippet ray(
  /** @type {number[]} */ values,
  /** @type {(n: number) => string} */ tone,
  /** @type {(n: number) => string} */ role,
  /** @type {(n: number) => void} */ onpick,
)}
  <div class="flex items-stretch px-2">
    <span
      class="flex w-5 shrink-0 items-center justify-center text-lg font-bold text-slate-500"
      aria-hidden="true">{values[0] === 0 ? '' : '…'}</span
    >
    <div class="relative grid min-w-0 flex-1 grid-cols-5">
      <div
        class="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded bg-slate-400"
        aria-hidden="true"
      ></div>
      {#each values as n, i (n)}
        {@const up = i % 2 === 0}
        <div class="relative flex min-w-0 flex-col items-center">
          <div class="flex h-24 flex-col items-center justify-end gap-1 pb-1">
            {#if up}
              <span
                class="text-xs font-semibold whitespace-nowrap text-slate-600"
                aria-hidden="true">{role(n)}</span
              >
              {@render label(n, tone, role, onpick)}
            {/if}
          </div>
          <span class="h-5 w-1 rounded bg-slate-600" aria-hidden="true"></span>
          <div class="flex h-24 flex-col items-center justify-start gap-1 pt-1">
            {#if !up}
              {@render label(n, tone, role, onpick)}
              <span
                class="text-xs font-semibold whitespace-nowrap text-slate-600"
                aria-hidden="true">{role(n)}</span
              >
            {/if}
          </div>
        </div>
      {/each}
    </div>
    <span class="flex w-6 shrink-0 items-center text-slate-500" aria-hidden="true">
      <span class="border-y-8 border-l-12 border-y-transparent border-l-slate-500"></span>
    </span>
  </div>
{/snippet}

{#snippet label(
  /** @type {number} */ n,
  /** @type {(n: number) => string} */ tone,
  /** @type {(n: number) => string} */ role,
  /** @type {(n: number) => void} */ onpick,
)}
  <button
    type="button"
    class="flex min-h-12 w-max min-w-12 shrink-0 items-center justify-center rounded-xl border-2 border-slate-300 px-2 font-bold whitespace-nowrap tabular-nums {focusRing} {labelSize(
      n,
    )} {tone(n)}"
    aria-label={tickName(n, role(n))}
    onclick={() => onpick(n)}>{fmt(n)}</button
  >
{/snippet}

<div class="space-y-4">
  <div class="flex justify-center">
    <SegmentedControl
      label="Chế độ"
      hideLabel
      options={[
        { value: 'kham-pha', label: 'Khám phá tia số' },
        { value: 'thu-thach', label: 'Thử thách' },
      ]}
      bind:value={mode}
    />
  </div>

  {#if mode === 'kham-pha'}
    <p class="text-center text-lg font-semibold text-slate-700">
      Em chạm vào một số trên tia số, hoặc cuộn sang trái, sang phải.
    </p>

    <div role="group" aria-label="Tia số">
      {@render ray(
        ticks,
        exploreTone,
        (n) =>
          n === chosen
            ? 'số đang chọn'
            : n === near.before
              ? 'liền trước'
              : n === near.after
                ? 'liền sau'
                : '',
        choose,
      )}
    </div>
    {#if atStart}
      <p class="text-center text-sm text-slate-600">Điểm đầu tiên của tia số là số 0 (điểm gốc).</p>
    {/if}

    <div class="grid grid-cols-2 gap-2">
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={left}>◀ Bớt 1</button>
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        onclick={() => choose(chosen + 1)}>Thêm 1 ▶</button
      >
    </div>
    <div class="flex flex-wrap justify-center gap-2">
      {#each JUMPS as jump (jump)}
        <button
          type="button"
          class="min-h-12 {button.secondary}"
          onclick={() => choose(chosen + jump)}>+ {fmt(jump)}</button
        >
      {/each}
      <button type="button" class="min-h-12 {button.quiet}" onclick={() => choose(0)}
        >Về số 0</button
      >
    </div>

    <dl class="space-y-2 text-lg">
      <div class="flex items-center justify-between gap-2 rounded-xl bg-amber-50 px-3 py-2">
        <dt class="font-semibold text-amber-900">Số liền trước</dt>
        <dd class="font-bold tabular-nums">
          {near.before === null ? 'Không có' : fmt(near.before)}
        </dd>
      </div>
      <div class="flex items-center justify-between gap-2 rounded-xl bg-indigo-50 px-3 py-2">
        <dt class="font-semibold text-indigo-900">Số đang chọn</dt>
        <dd class="font-bold tabular-nums">{fmt(chosen)}</dd>
      </div>
      <div class="flex items-center justify-between gap-2 rounded-xl bg-emerald-50 px-3 py-2">
        <dt class="font-semibold text-emerald-900">Số liền sau</dt>
        <dd class="font-bold tabular-nums">{fmt(near.after)}</dd>
      </div>
    </dl>

    <FeedbackNote
      tone={edgeNote ? 'warn' : 'info'}
      text={edgeNote ||
        `${describe(chosen)} Thêm 1 mãi thì dãy số còn kéo dài mãi: không có số tự nhiên lớn nhất.`}
    />
  {:else}
    <p class="text-center text-xl font-semibold text-slate-800">{taskText(task)}</p>
    <p class="text-center text-sm text-slate-600">
      Câu {(taskIndex % TASKS.length) + 1} / {TASKS.length}
    </p>

    <div role="group" aria-label="Tia số, chạm để trả lời" bind:this={rayBox}>
      {@render ray(taskTicks, taskTone, (n) => (n === task.given ? 'số đã cho' : ''), answer)}
    </div>

    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        disabled={solved}
        onclick={() => answer(null)}>Không có số nào</button
      >
    </div>

    <FeedbackNote
      tone={result === null ? 'info' : result.ok ? 'ok' : 'warn'}
      text={result?.text ?? 'Số liền sau: thêm 1. Số liền trước: bớt 1.'}
    />

    {#if solved}
      <div class="flex justify-center">
        <button
          type="button"
          class="min-h-12 text-lg {button.primary}"
          bind:this={nextButton}
          onclick={nextTask}>Câu tiếp</button
        >
      </div>
    {/if}
  {/if}
</div>
