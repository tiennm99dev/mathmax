<script>
  import BalanceScale from '#lib/core/kid/balance-scale.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { KINDS, balanceMessage, filledSentence, firstTask, judge, makeTask } from './engine.js';

  const STEPS = [-10, -1, 1, 10];
  const KIND_OPTIONS = /** @type {import('./engine.js').TaskKind[]} */ ([
    'so-hang',
    'so-bi-tru',
    'so-tru',
  ]).map((value) => ({ value, label: KINDS[value].label }));

  let kind = $state(/** @type {import('./engine.js').TaskKind} */ ('so-hang'));
  let task = $state(firstTask('so-hang'));
  let guess = $state(0);

  const solved = $derived(judge(task, guess) === 'right');
  const message = $derived(balanceMessage(task, guess));

  /**
   * The loads of a pan: the number boxes, and the "?" box with its guess.
   * @param {Array<number | null>} values
   * @returns {import('#lib/core/kid/mass.js').Load[]}
   */
  const loads = (values) =>
    values.map((v) =>
      v === null
        ? { kind: 'thing', name: solved ? String(guess) : '?', kg: guess }
        : { kind: 'thing', name: String(v), kg: v },
    );

  const left = $derived(loads(task.pans.left));
  const right = $derived(loads(task.pans.right));

  /** @param {Array<number | null>} values */
  const panWords = (values) =>
    values.map((v) => (v === null ? `dấu hỏi là ${guess}` : `số ${v}`)).join(' và ');
  const scaleLabel = $derived(
    `Cân đĩa. Đĩa trái: ${panWords(task.pans.left)}. Đĩa phải: ${panWords(task.pans.right)}.`,
  );

  /** @param {string | number} next */
  function chooseKind(next) {
    kind = /** @type {import('./engine.js').TaskKind} */ (next);
    task = firstTask(kind);
    guess = 0;
  }

  function newTask() {
    task = makeTask(Math.random, kind);
    guess = 0;
  }

  /** @param {number} delta */
  function move(delta) {
    guess = Math.max(0, Math.min(200, guess + delta));
  }

  const stepClass = `min-h-14 min-w-14 flex-1 px-1 text-xl tabular-nums ${button.quiet}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn cách tìm"
    hideLabel
    bind:value={kind}
    options={KIND_OPTIONS}
    onchange={chooseKind}
  />

  <p class="text-center text-4xl font-bold tabular-nums text-slate-800">
    {solved ? filledSentence(task, guess) : task.sentence}
  </p>

  <div class="rounded-2xl bg-sky-50 p-2">
    <BalanceScale {left} {right} label={scaleLabel} />
  </div>
  <p class="text-center text-lg font-semibold text-slate-600">{task.caption}</p>

  <div class="rounded-2xl border-2 border-slate-200 p-3">
    <p class="mb-2 text-center text-xl font-semibold text-slate-800">
      Em thử dấu "?" là: <span class="text-3xl font-bold tabular-nums text-indigo-700">{guess}</span
      >
    </p>
    <div class="flex gap-2" role="group" aria-label="Đổi số thử">
      {#each STEPS as d (d)}
        <button
          type="button"
          class={stepClass}
          aria-label="{d > 0 ? 'Thêm' : 'Bớt'} {Math.abs(d)}"
          disabled={guess + d < 0 || guess + d > 200}
          onclick={() => move(d)}>{d > 0 ? `+${d}` : `−${-d}`}</button
        >
      {/each}
    </div>
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  <button
    type="button"
    class="min-h-12 text-lg {solved ? button.primary : button.secondary}"
    onclick={newTask}>Bài khác</button
  >
</div>
