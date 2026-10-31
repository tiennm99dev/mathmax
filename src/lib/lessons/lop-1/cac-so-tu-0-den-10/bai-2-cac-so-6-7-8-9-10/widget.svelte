<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { freshInt, wordOf, TOP } from '../_shared/number-words.js';
  import {
    CELLS,
    countDots,
    emptyFrame,
    freeMessage,
    targetMessage,
    toggleCell,
  } from './engine.js';

  /** `free`: tap to add dots and see the number. `target`: make a given number. */
  let mode = $state(/** @type {'free' | 'target'} */ ('free'));
  let frame = $state(emptyFrame());
  let target = $state(7);

  const count = $derived(countDots(frame));
  const solved = $derived(mode === 'target' && count === target);
  const message = $derived(mode === 'free' ? freeMessage(count) : targetMessage(count, target));
  const track = Array.from({ length: TOP + 1 }, (_, i) => i);

  /** @param {number} cell */
  function tap(cell) {
    frame = toggleCell(frame, cell);
  }

  /** @param {'free' | 'target'} next */
  function switchMode(next) {
    mode = next;
    frame = emptyFrame();
  }

  function newRound() {
    target = freshInt(6, 10, target);
    frame = emptyFrame();
  }
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn trò chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'free', label: 'Chạm và đếm' },
      { value: 'target', label: 'Tạo số' },
    ]}
    onchange={(v) => switchMode(/** @type {'free' | 'target'} */ (v))}
  />

  <div class="flex items-center gap-4">
    <div
      class="flex h-20 w-24 shrink-0 items-center justify-center rounded-2xl border-4 bg-white text-5xl font-bold tabular-nums {solved
        ? 'border-emerald-500 text-emerald-700'
        : 'border-indigo-500 text-indigo-700'}"
      aria-hidden="true"
    >
      {mode === 'free' ? count : target}
    </div>
    <p class="text-xl font-semibold text-slate-800">
      {#if mode === 'free'}
        Số {count}, đọc là "{wordOf(count)}".
      {:else}
        Em tạo số {target} ("{wordOf(target)}") trong khung.
      {/if}
    </p>
  </div>

  <div
    class="grid max-w-md grid-cols-5 gap-2 rounded-2xl border-4 p-2 {solved
      ? 'border-emerald-400 bg-emerald-50'
      : 'border-sky-300 bg-sky-50'}"
    role="group"
    aria-label="Khung mười ô, có {count} chấm"
  >
    {#each { length: CELLS } as _, i (i)}
      <button
        type="button"
        class="flex aspect-square min-h-14 items-center justify-center rounded-xl border-2 border-slate-300 bg-white transition active:scale-95 {focusRing}"
        aria-pressed={frame[i]}
        aria-label={frame[i]
          ? `Ô ${i + 1} có chấm, chạm để bỏ`
          : `Ô ${i + 1} trống, chạm để thêm chấm`}
        onclick={() => tap(i)}
      >
        {#if frame[i]}
          <span class="block h-3/5 w-3/5 rounded-full bg-rose-500" aria-hidden="true"></span>
        {/if}
      </button>
    {/each}
  </div>

  <div>
    <p class="mb-2 text-base font-semibold text-slate-600">Thứ tự các số từ 0 đến 10</p>
    <ol class="flex flex-wrap gap-1.5" aria-label="Dãy số từ 0 đến 10">
      {#each track as n (n)}
        <li
          class="flex h-11 w-11 items-center justify-center rounded-xl border-2 text-xl font-bold tabular-nums {n ===
          count
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : n >= 6
              ? 'border-amber-300 bg-amber-50 text-amber-900'
              : 'border-slate-200 bg-white text-slate-700'}"
          aria-current={n === count ? 'true' : undefined}
        >
          {n}
        </li>
      {/each}
    </ol>
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  <div class="flex flex-wrap gap-3">
    {#if mode === 'target'}
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newRound}>
        Bài khác
      </button>
    {/if}
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      onclick={() => (frame = emptyFrame())}
    >
      Xoá hết chấm
    </button>
  </div>
</div>
