<script>
  import { countLabel, takeawayLabel } from '#lib/core/kid/quiz.js';
  import Block from './block.svelte';
  import { PLACES, PLACE_WORDS, blocksLeft } from './column-three.js';

  /**
   * The place-value chart of a calculation: one column of blocks per place,
   * hundreds on the left. The column being worked on is ringed. While the
   * child still has to count a column, its label names the blocks one by one
   * and never says how many.
   * @type {{
   *   columns: Record<import('./column-three.js').Place, import('./column-three.js').ColumnView>;
   *   active: import('./column-three.js').Place | null;
   *   op: import('#lib/core/kid/column.js').Op;
   * }}
   */
  let { columns, active, op } = $props();

  const ORDER = [...PLACES].reverse();

  /**
   * @param {import('./column-three.js').Place} place
   * @param {import('./column-three.js').ColumnView} c
   */
  function label(place, c) {
    const { block, unit } = PLACE_WORDS[place];
    const row = `Hàng ${unit}`;
    if (blocksLeft(c) === 0 && c.bottom === 0) return `${row}: không có ${block} nào.`;
    if (op === '-') {
      if (c.gone > 0) return `${row}: ${takeawayLabel(block, c.top, c.gone, c.written)}.`;
      return `${row}: ${c.top} ${block}${c.bottom > 0 ? `, phải bớt ${c.bottom}` : ''}.`;
    }
    if (c.joined) return `${row}: ${countLabel(block, c.top, c.written)}.`;
    const parts = c.top > 0 ? [`${c.top} ${block}`] : [];
    if (c.bottom > 0) parts.push(`${c.bottom} ${block}`);
    if (c.extra > 0) parts.push(`${c.extra} ${block} vừa đổi được`);
    return `${row}: ${parts.join(' và ')}.`;
  }
</script>

<div class="grid grid-cols-3 gap-1">
  {#each ORDER as place (place)}
    {@const c = columns[place]}
    <div
      class="flex min-h-40 flex-col gap-2 rounded-2xl p-1.5 {active === place
        ? 'bg-indigo-50 ring-4 ring-indigo-400'
        : 'bg-slate-50'}"
      role="img"
      aria-label={label(place, c)}
    >
      <p class="text-center text-base font-semibold text-slate-600">{PLACE_WORDS[place].title}</p>
      <div class="flex flex-wrap content-start justify-center gap-1">
        {#each { length: c.top } as _, i (i)}
          <Block {place} gone={i >= c.top - c.gone} />
        {/each}
      </div>
      {#if op === '+' && !c.joined && (c.bottom > 0 || c.extra > 0)}
        <p class="text-center text-xl font-bold leading-none text-slate-500" aria-hidden="true">
          +
        </p>
        <div class="flex flex-wrap content-start justify-center gap-1">
          {#each { length: c.bottom } as _, i (i)}
            <Block {place} />
          {/each}
          {#each { length: c.extra } as _, i (i)}
            <Block {place} fresh />
          {/each}
        </div>
      {/if}
      {#if op === '-' && c.bottom > 0}
        <p class="text-center text-base font-semibold text-rose-700">Bớt {c.bottom}</p>
      {/if}
    </div>
  {/each}
</div>
