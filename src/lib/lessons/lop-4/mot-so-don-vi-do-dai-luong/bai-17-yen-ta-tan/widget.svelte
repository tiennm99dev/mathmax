<script>
  import { tick } from 'svelte';
  import CountStepper from '#lib/core/kid/count-stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { MASS_UNITS, massTotal } from '../_shared/measures.js';
  import {
    EMPTY,
    MAX_BLOCKS,
    TARGETS,
    biggerUnit,
    breakBlock,
    canBreak,
    canJoin,
    joinBlocks,
    scaleMessage,
    smallerUnit,
    swapText,
  } from './engine.js';

  /** Look of the block of each unit: size in px and colours. */
  const LOOK = {
    tan: { size: 'h-10 w-10', color: 'bg-indigo-600 text-white' },
    ta: { size: 'h-8 w-8', color: 'bg-emerald-600 text-white' },
    yen: { size: 'h-7 w-7', color: 'bg-amber-400 text-slate-900' },
    kg: { size: 'h-6 w-6', color: 'bg-rose-300 text-slate-900' },
  };

  let index = $state(0);
  let parts = $state({ ...EMPTY });
  /** The last break or join, said once. */
  let swap = $state('');

  const target = $derived(TARGETS[index % TARGETS.length]);
  const total = $derived(massTotal(parts));
  const status = $derived(scaleMessage(target, parts));

  let nextButton = $state(/** @type {HTMLButtonElement | null} */ (null));
  let board = $state(/** @type {HTMLElement | null} */ (null));

  /**
   * @param {import('../_shared/measures.js').MassUnit['id']} id
   * @param {number} value
   */
  async function setCount(id, value) {
    parts = { ...parts, [id]: value };
    swap = '';
    if (scaleMessage(target, parts).done) {
      await tick();
      nextButton?.focus();
    }
  }

  /** @param {import('../_shared/measures.js').MassUnit['id']} id */
  function breakOne(id) {
    parts = breakBlock(parts, id);
    swap = `Em đổi: ${swapText(id)}. Cân vẫn chỉ ${fmt(massTotal(parts))} kg.`;
  }

  /** @param {import('../_shared/measures.js').MassUnit['id']} id */
  function joinTen(id) {
    const big = biggerUnit(id);
    parts = joinBlocks(parts, id);
    swap = big ? `Em gộp: ${swapText(big.id)}. Cân vẫn chỉ ${fmt(massTotal(parts))} kg.` : '';
  }

  async function next() {
    index += 1;
    parts = { ...EMPTY };
    swap = '';
    await tick();
    /** @type {HTMLElement | null | undefined} */ (
      board?.querySelector('button:not(:disabled)')
    )?.focus();
  }
</script>

<div class="space-y-4">
  <div class="flex items-center justify-center gap-3 rounded-2xl bg-sky-50 p-3">
    <span class="text-5xl" aria-hidden="true">{target.icon}</span>
    <p class="text-xl font-bold text-slate-800">
      {target.name} nặng {fmt(target.kg)} kg
    </p>
  </div>
  <p class="text-center text-lg text-slate-700">
    Em đặt các khối tấn, tạ, yến, kg lên cân cho bằng {target.name.toLowerCase()}.
  </p>

  <div class="grid grid-cols-2 gap-3 sm:grid-cols-4" bind:this={board}>
    {#each MASS_UNITS as unit (unit.id)}
      {@const n = parts[unit.id]}
      {@const small = smallerUnit(unit.id)}
      {@const big = biggerUnit(unit.id)}
      <div class="space-y-2 rounded-2xl border-2 border-slate-200 bg-white p-2">
        <p class="text-center text-lg font-bold text-slate-800">
          {n}
          {unit.name}
        </p>
        <div
          class="flex min-h-24 flex-wrap content-end items-end justify-center gap-1"
          role="img"
          aria-label="{n} khối {unit.name}"
        >
          {#each Array.from({ length: n }, (_, i) => i) as i (i)}
            <span
              class="flex items-center justify-center rounded-md text-[10px] font-bold {LOOK[
                unit.id
              ].size} {LOOK[unit.id].color}">{unit.name}</span
            >
          {/each}
        </div>
        <CountStepper
          name={unit.name}
          value={n}
          max={MAX_BLOCKS[unit.id]}
          onchange={(v) => setCount(unit.id, v)}
        />
        {#if small}
          <button
            type="button"
            class="min-h-12 w-full text-sm {button.quiet}"
            disabled={!canBreak(parts, unit.id)}
            onclick={() => breakOne(unit.id)}>Đổi 1 {unit.name} → 10 {small.name}</button
          >
        {/if}
        {#if big}
          <button
            type="button"
            class="min-h-12 w-full text-sm {button.quiet}"
            disabled={!canJoin(parts, unit.id)}
            onclick={() => joinTen(unit.id)}>Gộp 10 {unit.name} → 1 {big.name}</button
          >
        {/if}
      </div>
    {/each}
  </div>

  <p class="text-center text-2xl font-bold text-slate-800 tabular-nums" aria-hidden="true">
    Cân chỉ: {fmt(total)} kg
  </p>

  {#if swap}
    <FeedbackNote tone="info" text={swap} />
  {/if}
  <FeedbackNote tone={status.done ? 'ok' : total === 0 ? 'info' : 'warn'} text={status.text} />

  {#if status.done}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={nextButton}
        onclick={next}>Cân vật khác</button
      >
    </div>
  {/if}
</div>
