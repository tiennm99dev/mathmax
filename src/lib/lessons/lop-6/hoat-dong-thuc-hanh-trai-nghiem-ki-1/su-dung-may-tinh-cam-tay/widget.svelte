<script>
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { KEYS, TASKS, displayTokens, initialState, keyById, press } from './engine.js';

  const MODES = [
    { value: 'huong-dan', label: 'Làm theo hướng dẫn' },
    { value: 'tu-do', label: 'Bấm tự do' },
  ];
  const selectId = $props.id();

  let mode = $state('huong-dan');
  let taskId = $state(TASKS[0].id);
  let calc = $state(initialState());
  /** How many keys of the guided task have been pressed correctly. */
  let progress = $state(0);
  let feedback = $state('');

  const task = $derived(TASKS.find((t) => t.id === taskId) ?? TASKS[0]);
  const guided = $derived(mode === 'huong-dan');
  const nextKey = $derived(guided && progress < task.keys.length ? task.keys[progress] : null);
  const finished = $derived(guided && progress >= task.keys.length);

  /** Name of a key as the learner sees it in the key list. */
  /** @param {string} id @param {number} at position in the task */
  function keyName(id, at) {
    const k = keyById(id);
    const prev = at > 0 ? task.keys[at - 1] : '';
    if (prev === 'shift' && k.shift) return k.shift;
    if (prev === 'alpha' && k.alpha) return k.alpha;
    return k.label;
  }

  function reset() {
    calc = initialState();
    progress = 0;
    feedback = '';
  }

  /** @param {string} id */
  function tap(id) {
    // Once a guided task is done, the keypad works freely until "Làm lại".
    const following = guided && !finished;
    if (following) {
      if (id !== nextKey) {
        feedback = `Chưa đúng phím. Phím cần bấm tiếp theo là ${keyName(task.keys[progress], progress)}.`;
        return;
      }
      progress += 1;
    }
    calc = press(calc, id);
    feedback = following
      ? progress >= task.keys.length
        ? `Màn hình hiện ${calc.screen}. ${task.explain}`
        : `Đúng. Phím tiếp theo: ${keyName(task.keys[progress], progress)}.`
      : calc.note;
  }

  /** @param {string} value */
  function chooseTask(value) {
    taskId = value;
    reset();
  }
</script>

<div class="space-y-4">
  <SegmentedControl label="Cách dùng" options={MODES} bind:value={mode} onchange={reset} />

  {#if guided}
    <div>
      <label for={selectId} class="mb-1 block text-sm font-semibold text-slate-700"
        >Phép tính cần làm</label
      >
      <select
        id={selectId}
        class={textInput}
        value={taskId}
        onchange={(e) => chooseTask(/** @type {HTMLSelectElement} */ (e.currentTarget).value)}
      >
        {#each TASKS as t (t.id)}
          <option value={t.id}>{t.title}</option>
        {/each}
      </select>
    </div>
    <ol class="flex flex-wrap gap-1" aria-label="Dãy phím cần bấm">
      {#each task.keys as k, i (i)}
        <li
          class="rounded border px-2 py-1 font-mono text-sm {i < progress
            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
            : i === progress
              ? 'border-indigo-500 bg-indigo-50 font-bold text-indigo-900'
              : 'border-slate-300 bg-white text-slate-600'}"
        >
          {keyName(k, i)}
        </li>
      {/each}
    </ol>
  {/if}

  <div class="mx-auto max-w-sm rounded-3xl bg-slate-800 p-4 shadow-lg">
    <div
      class="mb-4 rounded-lg bg-lime-100 p-3 font-mono text-slate-900"
      role="group"
      aria-label="Màn hình máy tính"
    >
      <div class="flex h-4 gap-2 text-xs font-bold">
        {#if calc.shift}<span class="text-amber-700">S</span>{/if}
        {#if calc.alpha}<span class="text-rose-700">A</span>{/if}
      </div>
      <div class="min-h-7 break-all text-lg">{displayTokens(calc.tokens) || ' '}</div>
      <div class="min-h-8 text-right text-2xl font-bold tabular-nums">{calc.screen}</div>
    </div>

    <div class="grid grid-cols-5 gap-2">
      {#each KEYS as k (k.id)}
        <div class="flex flex-col items-center">
          <span class="h-4 text-[10px] font-bold leading-4">
            {#if k.shift}<span class="text-amber-400">{k.shift}</span>{/if}
            {#if k.alpha}<span class="text-rose-400">{k.alpha}</span>{/if}
          </span>
          <button
            type="button"
            class="min-h-11 w-full rounded-lg text-sm font-semibold transition {focusRing} {k.id ===
            'shift'
              ? calc.shift
                ? 'bg-amber-400 text-slate-900'
                : 'bg-amber-600 text-white'
              : k.id === 'alpha'
                ? calc.alpha
                  ? 'bg-rose-400 text-slate-900'
                  : 'bg-rose-700 text-white'
                : /^\d$/.test(k.id)
                  ? 'bg-slate-100 text-slate-900 hover:bg-white'
                  : k.id === 'ac' || k.id === 'del'
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-600 text-white hover:bg-slate-500'} {nextKey === k.id
              ? 'ring-4 ring-sky-400'
              : ''}"
            aria-label="Phím {k.label}{k.shift ? `, SHIFT: ${k.shift}` : ''}{k.alpha
              ? `, ALPHA: ${k.alpha}`
              : ''}"
            aria-pressed={k.id === 'shift' ? calc.shift : k.id === 'alpha' ? calc.alpha : undefined}
            onclick={() => tap(k.id)}
          >
            {k.label}
          </button>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <p
    class="min-h-11 rounded-lg p-3 text-sm {finished
      ? 'bg-emerald-50 font-semibold text-emerald-900'
      : 'bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    {feedback ||
      (finished
        ? 'Đã làm xong phép tính này; máy vẫn bấm tự do được. Bấm "Làm lại" để làm lại từ đầu hoặc chọn phép tính khác.'
        : guided
          ? `Bấm lần lượt các phím trong dãy trên. Phím sáng viền xanh là phím cần bấm: ${keyName(task.keys[0], 0)}.`
          : 'Bấm phím để nhập biểu thức rồi bấm =. SHIFT và ALPHA mở chức năng in phía trên phím.')}
  </p>
</div>
