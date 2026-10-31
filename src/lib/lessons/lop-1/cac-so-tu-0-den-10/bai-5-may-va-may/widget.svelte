<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import {
    MAX_TOTAL,
    MIN_TOTAL,
    clampLeft,
    joinText,
    progressText,
    remember,
    splitText,
  } from './engine.js';

  let total = $state(5);
  let left = $state(2);
  /** @type {number[]} */
  let found = $state([2]);

  const right = $derived(total - left);
  const complete = $derived(found.length >= total - 1);

  /** @param {number} n */
  function changeTotal(n) {
    left = clampLeft(n, Math.floor(n / 2));
    found = [left];
  }

  /** @param {number} v */
  function slide(v) {
    found = remember(found, v);
  }

  /** @param {number} n */
  const beads = (n) => Array.from({ length: n }, (_, i) => i);
</script>

{#snippet plate(/** @type {number} */ n, /** @type {string} */ name, /** @type {string} */ colour)}
  <div class="flex flex-col items-center gap-2">
    <div
      class="flex min-h-32 w-36 flex-wrap content-center items-center justify-center gap-1.5 rounded-full border-4 border-slate-300 bg-white p-4 sm:w-44"
      role="img"
      aria-label="{name} có {n} hạt"
    >
      {#each beads(n) as i (i)}
        <span class="h-6 w-6 rounded-full shadow-inner {colour}"></span>
      {/each}
    </div>
    <span class="text-4xl font-bold text-slate-800 tabular-nums" aria-hidden="true">{n}</span>
  </div>
{/snippet}

<div class="space-y-5">
  <Stepper
    label="Tổng số hạt"
    bind:value={total}
    min={MIN_TOTAL}
    max={MAX_TOTAL}
    onchange={changeTotal}
  />

  <div class="flex flex-wrap items-start justify-center gap-4">
    {@render plate(left, 'Đĩa trái', 'bg-rose-500')}
    {@render plate(right, 'Đĩa phải', 'bg-sky-500')}
  </div>

  {#if total > MIN_TOTAL}
    <SliderField
      label="Số hạt ở đĩa trái"
      bind:value={left}
      min={1}
      max={total - 1}
      oninput={slide}
    />
  {:else}
    <p class="text-lg text-slate-600">Số 2 chỉ có một cách tách: 1 và 1.</p>
  {/if}

  <div
    class="rounded-2xl px-4 py-3 text-xl font-semibold {complete
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    <p>{splitText(total, left)}.</p>
    <p class="text-lg font-normal">{joinText(total, left)}.</p>
    <p class="mt-1 text-lg">
      {#if complete}<span aria-hidden="true">⭐ </span>{/if}{progressText(total, found.length)}
    </p>
  </div>

  <div>
    <p class="mb-2 text-base font-semibold text-slate-600">Các cách em đã tìm</p>
    <ul class="flex flex-wrap gap-2">
      {#each found as l (l)}
        <li
          class="rounded-xl border-2 border-indigo-200 bg-indigo-50 px-3 py-1.5 text-lg font-semibold text-indigo-900"
        >
          {splitText(total, l)}
        </li>
      {/each}
    </ul>
  </div>
</div>
