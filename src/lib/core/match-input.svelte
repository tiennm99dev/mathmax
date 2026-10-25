<script>
  import RichText from './rich-text.svelte';
  import { practice as copy } from './copy.vi.js';
  import { focusRing } from './ui.js';

  /**
   * Tap-to-pair matching. Pick an item on either side, then its partner on the
   * other side; picking a pair's partner again unpairs it. `value` holds
   * `[leftIndex, rightIndex]` pairs.
   * @type {{
   *   left: string[];
   *   right: string[];
   *   value: Array<[number, number]>;
   *   labelledby: string;
   *   disabled?: boolean;
   *   onchange?: () => void;
   * }}
   */
  let { left, right, value = $bindable(), labelledby, disabled = false, onchange } = $props();

  /** @typedef {'left' | 'right'} Side */

  /** @type {{ side: Side, index: number } | null} */
  let active = $state(null);

  const colors = [
    'border-rose-400 bg-rose-50',
    'border-sky-400 bg-sky-50',
    'border-emerald-400 bg-emerald-50',
    'border-amber-400 bg-amber-50',
    'border-violet-400 bg-violet-50',
    'border-lime-500 bg-lime-50',
  ];

  /**
   * 1-based pair number for an item, or 0 when unpaired.
   * @param {Side} side
   * @param {number} index
   */
  function pairNo(side, index) {
    const k = side === 'left' ? 0 : 1;
    return value.findIndex((p) => p[k] === index) + 1;
  }

  /**
   * @param {Side} side
   * @param {number} index
   */
  function pick(side, index) {
    if (disabled) return;
    if (!active || active.side === side) {
      const same = active?.side === side && active.index === index;
      active = same ? null : { side, index };
      return;
    }
    const l = side === 'left' ? index : active.index;
    const r = side === 'right' ? index : active.index;
    const exists = value.some(([a, b]) => a === l && b === r);
    const rest = value.filter(([a, b]) => a !== l && b !== r);
    value = exists ? rest : [...rest, [l, r]];
    active = null;
    onchange?.();
  }
</script>

{#snippet column(/** @type {Side} */ side, /** @type {string[]} */ list)}
  <ul class="space-y-2">
    {#each list as html, i (i)}
      {@const no = pairNo(side, i)}
      {@const isActive = active?.side === side && active.index === i}
      <li>
        <button
          type="button"
          class="flex min-h-11 w-full items-center gap-2 rounded-lg border-2 px-3 py-2 text-left in-[.kid]:min-h-12 {focusRing} {isActive
            ? 'border-indigo-600 bg-indigo-50'
            : no
              ? colors[(no - 1) % colors.length]
              : 'border-slate-200 bg-white hover:border-indigo-300'}"
          aria-pressed={isActive}
          {disabled}
          onclick={() => pick(side, i)}
        >
          <RichText {html} class="flex-1 leading-relaxed" />
          {#if no}
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-700 ring-1 ring-slate-300"
              ><span class="sr-only">{copy.pairLabel(no)}</span><span aria-hidden="true">{no}</span
              ></span
            >
          {/if}
        </button>
      </li>
    {/each}
  </ul>
{/snippet}

<div role="group" aria-labelledby={labelledby}>
  <p class="mb-2 text-sm text-slate-500">{copy.matchLeft}</p>
  <div class="grid grid-cols-2 gap-3">
    {@render column('left', left)}
    {@render column('right', right)}
  </div>
</div>
