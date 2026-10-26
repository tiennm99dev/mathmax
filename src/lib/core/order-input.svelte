<script>
  import { tick } from 'svelte';
  import RichText from './rich-text.svelte';
  import { practice as copy } from './copy.vi.js';
  import { htmlText } from './tex-text.js';
  import { focusRing } from './ui.js';

  /**
   * Reorders items with up and down buttons, which work for pointer, touch and
   * keyboard alike. `value` holds item indices in their current order.
   * @type {{
   *   items: string[];
   *   value: number[];
   *   labelledby: string;
   *   disabled?: boolean;
   *   onchange?: () => void;
   * }}
   */
  let { items, value = $bindable(), labelledby, disabled = false, onchange } = $props();

  const id = $props.id();
  // Plain names of the items, so each arrow says which item it moves.
  const names = $derived(items.map(htmlText));
  /** @type {HTMLOListElement | undefined} */
  let list = $state();

  /**
   * Moves the item at `pos` one place and keeps focus on it, so repeated
   * presses keep moving the same item.
   * @param {number} pos
   * @param {-1 | 1} dir
   */
  async function move(pos, dir) {
    const to = pos + dir;
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    [next[pos], next[to]] = [next[to], next[pos]];
    value = next;
    onchange?.();
    const item = next[to];
    await tick();
    const row = list?.querySelector(`[data-item="${item}"]`);
    const target =
      row?.querySelector(`[data-dir="${dir}"]:not(:disabled)`) ??
      row?.querySelector('button:not(:disabled)');
    /** @type {HTMLElement | null | undefined} */ (target)?.focus();
  }

  const arrow = `flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 in-[.kid]:h-12 in-[.kid]:w-12 ${focusRing}`;
</script>

<ol bind:this={list} aria-labelledby={labelledby} class="space-y-2">
  {#each value as item, pos (item)}
    <li
      data-item={item}
      class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2"
    >
      <span
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600"
        ><span class="sr-only">{copy.position(pos + 1)}:</span><span aria-hidden="true"
          >{pos + 1}</span
        ></span
      >
      <RichText id="{id}-{item}" html={items[item]} class="flex-1 leading-relaxed" />
      <button
        type="button"
        data-dir="-1"
        class={arrow}
        aria-label={copy.moveUp(names[item])}
        disabled={disabled || pos === 0}
        onclick={() => move(pos, -1)}><span aria-hidden="true">↑</span></button
      >
      <button
        type="button"
        data-dir="1"
        class={arrow}
        aria-label={copy.moveDown(names[item])}
        disabled={disabled || pos === value.length - 1}
        onclick={() => move(pos, 1)}><span aria-hidden="true">↓</span></button
      >
    </li>
  {/each}
</ol>
