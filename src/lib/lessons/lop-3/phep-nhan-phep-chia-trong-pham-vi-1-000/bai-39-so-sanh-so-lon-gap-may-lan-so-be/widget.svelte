<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import KidNote from '../_shared/kid-note.svelte';
  import {
    FIRST_TASK,
    doneLines,
    layMessage,
    makeTask,
    timesOf,
    timesOptions,
    wrongTimes,
  } from './engine.js';

  let task = $state(FIRST_TASK);
  let laid = $state(0);
  let solved = $state(false);
  let tries = $state(0);
  let slip = $state('');
  /** @type {HTMLDivElement | undefined} */
  let controls = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const times = $derived(timesOf(task));
  const filled = $derived(laid === times);
  const share = $derived((task.small / task.big) * 100);
  const options = $derived(timesOptions(task));
  const lines = $derived(doneLines(task));
  const message = $derived(solved ? lines[0] : slip || layMessage(task, laid));
  const tone = $derived(solved ? 'ok' : slip ? 'warn' : 'info');

  function next() {
    task = makeTask(Math.random, task);
    laid = 0;
    solved = false;
    tries = 0;
    slip = '';
  }

  /** The button just pressed may be gone, so focus moves to what replaced it. */
  async function lay() {
    laid += 1;
    if (filled) {
      await tick();
      controls?.querySelector('button')?.focus();
    }
  }

  /** @param {number} value */
  async function answer(value) {
    if (value !== times) {
      tries += 1;
      slip = wrongTimes(task, value, tries);
      return;
    }
    solved = true;
    slip = '';
    await tick();
    nextButton?.focus();
  }

  const stripClass =
    'flex h-12 items-center justify-center border-2 text-lg font-bold tabular-nums text-slate-900';
</script>

<div class="space-y-4">
  <div class="space-y-2 rounded-2xl bg-sky-50 p-3">
    <p class="text-lg font-semibold text-slate-700">Thanh dài</p>
    <div
      class="{stripClass} w-full border-indigo-700 bg-indigo-200"
      role="img"
      aria-label="Thanh dài {task.big} xăng-ti-mét"
    >
      {task.big} cm
    </div>

    <p class="text-lg font-semibold text-slate-700">Thanh ngắn</p>
    <div
      class="{stripClass} border-amber-700 bg-amber-200"
      style="width: {share}%"
      role="img"
      aria-label="Thanh ngắn {task.small} xăng-ti-mét"
    >
      {task.small}
    </div>

    <p class="text-lg font-semibold text-slate-700">Đặt thanh ngắn dọc theo thanh dài</p>
    <div
      class="flex w-full rounded border-2 border-dashed border-slate-400"
      role="img"
      aria-label="Đã đặt {laid} lần thanh ngắn"
    >
      <span class="block h-12 w-0"></span>
      {#each { length: laid } as _, i (i)}
        <span class="{stripClass} border-amber-700 bg-amber-200" style="width: {share}%"
          >{i + 1}</span
        >
      {/each}
    </div>
  </div>

  <KidNote {tone} text={message} />

  <div bind:this={controls}>
    {#if !filled}
      <button type="button" class="min-h-14 w-full text-xl {button.primary}" onclick={lay}
        >Đặt thêm thanh ngắn</button
      >
    {:else if !solved}
      <div class="flex flex-wrap justify-center gap-3" role="group" aria-label="Chọn số lần">
        {#each options as value (value)}
          <button
            type="button"
            class="min-h-16 min-w-16 rounded-2xl border-4 border-slate-300 bg-white px-3 text-3xl font-bold tabular-nums text-slate-800 hover:border-indigo-400 {focusRing}"
            aria-label="{value} lần"
            onclick={() => answer(value)}>{value}</button
          >
        {/each}
      </div>
    {:else}
      <p class="rounded-2xl bg-indigo-50 px-4 py-3 text-xl font-semibold text-indigo-950">
        {lines[1]}
      </p>
    {/if}
  </div>

  <button
    type="button"
    class="min-h-12 text-lg {solved ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={next}>Hai thanh khác</button
  >
</div>
