<script>
  import { tick } from 'svelte';
  import { focusRing } from '#lib/core/ui.js';

  /**
   * One ten-frame (khung mười ô): two rows of five cells, each empty, holding
   * a red or a blue dot, or a dot crossed out ('gone'). With `onpick`, the
   * cells that `canPick` allows are 48 px buttons, so a dot can be moved or
   * crossed out by tap, Enter or Space.
   *
   * - `cells`: ten cell states, left to right, top row first.
   * - `label`: what the frame is called for screen readers ("Khung thứ nhất").
   * - `onpick(i)`, `canPick(i)`, `pickLabel(i)`: a tappable cell, its rule and
   *   its accessible name.
   * - `full`: rings the frame green, when it holds ten dots.
   *
   * A tapped cell that stops being tappable turns back into a plain cell, so
   * focus then moves to the next tappable cell of the frame, or to the frame
   * itself, and a keyboard user can keep going.
   * @type {{
   *   cells: ReadonlyArray<'empty' | 'red' | 'blue' | 'gone'>;
   *   label: string;
   *   onpick?: (i: number) => void;
   *   canPick?: (i: number) => boolean;
   *   pickLabel?: (i: number) => string;
   *   full?: boolean;
   * }}
   */
  let {
    cells,
    label,
    onpick,
    canPick = () => false,
    pickLabel = () => '',
    full = false,
  } = $props();

  const dots = $derived(cells.filter((c) => c === 'red' || c === 'blue').length);

  /** @type {HTMLElement | undefined} */
  let frameEl = $state();

  /** @param {number} i */
  async function pick(i) {
    onpick?.(i);
    await tick();
    if (!frameEl || frameEl.contains(document.activeElement)) return;
    const next = frameEl.querySelector('button');
    (next ?? frameEl).focus();
  }
</script>

{#snippet dot(/** @type {'empty' | 'red' | 'blue' | 'gone'} */ c)}
  {#if c === 'red'}
    <span class="h-9 w-9 rounded-full border-2 border-rose-700 bg-rose-500"></span>
  {:else if c === 'blue'}
    <span class="h-9 w-9 rounded-full border-2 border-sky-700 bg-sky-400"></span>
  {:else if c === 'gone'}
    <span
      class="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-400 bg-slate-200 text-2xl font-bold leading-none text-rose-700"
      >✕</span
    >
  {/if}
{/snippet}

<div
  bind:this={frameEl}
  tabindex="-1"
  class="inline-grid grid-cols-5 gap-1 rounded-2xl border-4 p-1.5 transition-colors motion-reduce:transition-none {focusRing} {full
    ? 'border-emerald-500 bg-emerald-50'
    : 'border-slate-400 bg-white'}"
  role="group"
  aria-label="{label}: {dots} chấm"
>
  {#each cells as c, i (i)}
    {#if onpick && canPick(i)}
      <button
        type="button"
        class="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 ring-2 ring-amber-300 hover:bg-amber-100 {focusRing}"
        aria-label={pickLabel(i)}
        onclick={() => pick(i)}>{@render dot(c)}</button
      >
    {:else}
      <span
        class="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50"
        aria-hidden="true">{@render dot(c)}</span
      >
    {/if}
  {/each}
</div>
