<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import StickBundles from '../_shared/stick-bundles.svelte';
  import { readNumber } from '../_shared/numbers.js';
  import { apply, can, describe, guide, nextTarget, valueOf } from './engine.js';

  /** @typedef {'bundle+' | 'bundle-' | 'stick+' | 'stick-' | 'tie'} Action */

  /** `free`: build any number. `goal`: build the number shown. */
  let mode = $state(/** @type {'free' | 'goal'} */ ('free'));
  let sticks = $state({ tens: 2, ones: 5 });
  // The first target is fixed so the prerendered page and the browser agree.
  let target = $state(34);

  const value = $derived(valueOf(sticks));
  const step = $derived(guide(sticks, target));
  const message = $derived(mode === 'free' ? describe(sticks) : step.text);
  const solved = $derived(mode === 'goal' && step.done);

  /** @param {Action} action */
  function act(action) {
    sticks = apply(sticks, action);
  }

  /** @param {'free' | 'goal'} next */
  function switchMode(next) {
    mode = next;
    if (next === 'goal') sticks = { tens: 0, ones: 0 };
  }

  function newTarget() {
    target = nextTarget(target);
    sticks = { tens: 0, ones: 0 };
  }

  const big = `inline-flex h-14 min-w-14 items-center justify-center rounded-2xl border-4 px-3 text-3xl font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`;
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn trò chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'free', label: 'Ghép số' },
      { value: 'goal', label: 'Ghép theo số' },
    ]}
    onchange={(v) => switchMode(/** @type {'free' | 'goal'} */ (v))}
  />

  {#if mode === 'goal'}
    <div class="flex items-center gap-4">
      <div
        class="flex h-20 min-w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-indigo-500 bg-white px-2 text-5xl font-bold text-indigo-700 tabular-nums"
        aria-hidden="true"
      >
        {target}
      </div>
      <p class="text-xl font-semibold text-slate-800">
        Em lấy que tính để có số {target} ("{readNumber(target)}").
      </p>
    </div>
  {/if}

  <div
    class="grid gap-3 rounded-3xl border-4 p-3 transition-colors sm:grid-cols-[3fr_2fr] {solved
      ? 'border-emerald-400 bg-emerald-50'
      : 'border-amber-200 bg-amber-50'}"
  >
    <div class="space-y-2">
      <p class="text-lg font-bold text-slate-700">
        Chục <span class="font-normal text-slate-500">(bó 10 que)</span>
      </p>
      <div class="min-h-20">
        {#if sticks.tens > 0}
          <StickBundles tens={sticks.tens} ones={0} />
        {:else}
          <span class="text-lg text-slate-500">Chưa có bó nào</span>
        {/if}
      </div>
      <div class="flex gap-3">
        <button
          type="button"
          class="{big} border-slate-300 bg-white text-slate-800"
          aria-label="Bớt một bó chục"
          disabled={!can(sticks, 'bundle-')}
          onclick={() => act('bundle-')}>−</button
        >
        <button
          type="button"
          class="{big} border-indigo-400 bg-white text-indigo-700"
          aria-label="Thêm một bó chục"
          disabled={!can(sticks, 'bundle+')}
          onclick={() => act('bundle+')}>+</button
        >
      </div>
    </div>
    <div class="space-y-2">
      <p class="text-lg font-bold text-slate-700">
        Đơn vị <span class="font-normal text-slate-500">(que rời)</span>
      </p>
      <div class="min-h-20">
        {#if sticks.ones > 0}
          <StickBundles tens={0} ones={sticks.ones} />
        {:else}
          <span class="text-lg text-slate-500">Chưa có que rời</span>
        {/if}
      </div>
      <div class="flex flex-wrap gap-3">
        <button
          type="button"
          class="{big} border-slate-300 bg-white text-slate-800"
          aria-label="Bớt một que rời"
          disabled={!can(sticks, 'stick-')}
          onclick={() => act('stick-')}>−</button
        >
        <button
          type="button"
          class="{big} border-indigo-400 bg-white text-indigo-700"
          aria-label="Thêm một que rời"
          disabled={!can(sticks, 'stick+')}
          onclick={() => act('stick+')}>+</button
        >
        {#if sticks.ones === 10}
          <button
            type="button"
            class="min-h-14 text-lg {button.primary}"
            onclick={() => act('tie')}
          >
            Bó thành 1 chục
          </button>
        {/if}
      </div>
    </div>
  </div>

  <div class="flex items-center gap-3" aria-hidden="true">
    <div class="rounded-2xl border-4 border-slate-300 bg-white text-center">
      <div class="flex">
        <span
          class="w-16 border-r-2 border-slate-200 px-2 pt-1 text-sm font-semibold text-slate-500"
          >Chục</span
        >
        <span class="w-16 px-2 pt-1 text-sm font-semibold text-slate-500">Đơn vị</span>
      </div>
      <div class="flex text-4xl font-bold tabular-nums">
        <span class="w-16 border-r-2 border-slate-200 py-1 text-rose-600"
          >{sticks.ones === 10 ? sticks.tens + 1 : sticks.tens}</span
        >
        <span class="w-16 py-1 text-amber-600">{sticks.ones === 10 ? 0 : sticks.ones}</span>
      </div>
    </div>
    <span class="text-3xl font-bold text-slate-400">→</span>
    <span class="text-5xl font-bold text-indigo-700 tabular-nums">{value}</span>
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  {#if mode === 'goal'}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newTarget}>
      Số khác
    </button>
  {/if}
</div>
