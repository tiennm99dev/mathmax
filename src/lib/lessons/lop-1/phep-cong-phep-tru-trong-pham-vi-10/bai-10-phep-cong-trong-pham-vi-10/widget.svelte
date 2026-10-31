<script>
  import Picture from '#lib/core/kid/picture.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { reducedMotion } from '#lib/core/motion.js';
  import { button } from '#lib/core/ui.js';
  import { addWords } from '../_shared/arith.js';
  import { fitGroup, storyAfter, storyBefore, swapNote, tokens } from './engine.js';

  const MODES = [
    { value: 'gop', label: 'Gộp lại' },
    { value: 'them', label: 'Thêm vào' },
  ];

  let mode = $state(/** @type {import('./engine.js').Mode} */ ('gop'));
  let a = $state(3);
  let b = $state(2);
  let joined = $state(false);
  /** How many tokens of the addition are visible. */
  let shown = $state(0);
  let swapped = $state(false);
  /** @type {ReturnType<typeof setTimeout>[]} */
  let timers = [];

  const parts = $derived(tokens(a, b));
  const done = $derived(joined && shown >= parts.length);
  const message = $derived(
    !joined
      ? `${storyBefore(mode, a, b)} Em bấm "${mode === 'gop' ? 'Gộp lại' : 'Thêm vào'}".`
      : !done
        ? 'Em xem phép tính hiện ra nhé.'
        : swapped
          ? swapNote(a, b)
          : `${storyAfter(mode, a, b)} Đọc là: ${addWords(a, b)}.`,
  );

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  $effect(() => clearTimers);

  function reset() {
    clearTimers();
    joined = false;
    shown = 0;
    swapped = false;
  }

  function join() {
    clearTimers();
    joined = true;
    swapped = false;
    if (reducedMotion()) {
      shown = parts.length;
      return;
    }
    shown = 0;
    for (let i = 1; i <= parts.length; i++) {
      timers.push(setTimeout(() => (shown = i), 500 + 550 * i));
    }
  }

  function swap() {
    clearTimers();
    [a, b] = [b, a];
    shown = parts.length;
    swapped = true;
  }

  /** @param {number} n */
  const range = (n) => Array.from({ length: n }, (_, i) => i);
</script>

{#snippet group(/** @type {number} */ n, /** @type {string} */ name, /** @type {boolean} */ flying)}
  <div
    class="flex min-h-28 min-w-24 flex-wrap content-center items-center justify-center gap-1 rounded-3xl p-3 transition-all duration-700 motion-reduce:transition-none {flying &&
    !joined
      ? '-translate-y-3 border-4 border-dashed border-sky-300 bg-sky-50'
      : 'border-4 border-transparent bg-amber-50'} {joined ? 'max-w-56' : 'max-w-44'}"
    role="img"
    aria-label="{name}: {n} quả bóng"
  >
    {#each range(n) as i (i)}
      <Picture name="balloon" size={38} decorative />
    {/each}
    {#if n === 0}<span class="text-lg text-slate-500">Không có quả nào</span>{/if}
  </div>
{/snippet}

<div class="space-y-5">
  <SegmentedControl label="Ý nghĩa phép cộng" options={MODES} bind:value={mode} onchange={reset} />

  <div class="flex flex-wrap gap-4">
    <Stepper
      label={mode === 'gop' ? 'Nhóm trái' : 'Bạn nhỏ cầm'}
      bind:value={a}
      min={0}
      max={fitGroup(9, b)}
      onchange={reset}
    />
    <Stepper
      label={mode === 'gop' ? 'Nhóm phải' : 'Bay đến thêm'}
      bind:value={b}
      min={0}
      max={fitGroup(9, a)}
      onchange={reset}
    />
  </div>

  <div
    class="flex flex-wrap items-center justify-center rounded-3xl p-2 transition-all duration-700 motion-reduce:transition-none {joined
      ? 'gap-0 bg-indigo-50 ring-4 ring-indigo-300'
      : 'gap-10'}"
  >
    {@render group(a, mode === 'gop' ? 'Nhóm trái' : 'Bạn nhỏ cầm', false)}
    {@render group(b, mode === 'gop' ? 'Nhóm phải' : 'Bay đến thêm', mode === 'them')}
  </div>

  <div class="flex min-h-20 items-center justify-center gap-3" aria-hidden="true">
    {#each parts as t, i (i)}
      <span
        class="flex h-16 w-14 items-center justify-center rounded-2xl text-4xl font-bold tabular-nums transition duration-300 motion-reduce:transition-none {i <
        shown
          ? i % 2 === 1
            ? 'bg-white text-rose-600 shadow'
            : 'bg-white text-slate-900 shadow'
          : 'bg-slate-100 text-transparent'}">{t}</span
      >
    {/each}
  </div>

  <div class="flex flex-wrap gap-3">
    {#if !joined}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={join}>
        {mode === 'gop' ? 'Gộp lại' : 'Thêm vào'}
      </button>
    {:else}
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={reset}>
        Tách ra làm lại
      </button>
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={swap} disabled={!done}>
        Đổi chỗ hai nhóm
      </button>
    {/if}
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {done
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {message}
  </p>
</div>
