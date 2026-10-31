<script>
  import Picture from '#lib/core/kid/picture.svelte';
  import { pictures } from '#lib/core/kid/pictures/index.js';
  import Figure from './figure.svelte';
  import { FIGURE_NAMES } from './shape-skills.js';

  /**
   * The picture above a review question: groups of pictures to count, a
   * group with some pictures crossed out, a row of shapes (with a "?" box
   * for a pattern), animals standing in a row, or a table with one thing on
   * it and one under it. Each picture has one text label for screen readers.
   * @type {{ visual: import('./quiz.js').Visual }}
   */
  let { visual } = $props();

  const label = $derived.by(() => {
    if (visual.type === 'groups') {
      return visual.groups.map((g) => `${g.n} ${pictures[g.picture]}`).join(' và ');
    }
    if (visual.type === 'takeaway') {
      const noun = pictures[visual.picture];
      return `${visual.total} ${noun}, ${visual.gone} ${noun} bị gạch đi`;
    }
    if (visual.type === 'figures') {
      const names = visual.figures.map((k) => FIGURE_NAMES[k]).join(', ');
      return visual.blank ? `${names}, dấu hỏi` : names;
    }
    if (visual.type === 'row') {
      return `Từ trái sang phải: ${visual.pictures.map((p) => pictures[p]).join(', ')}`;
    }
    return `${pictures[visual.top]} ở trên cái bàn, ${pictures[visual.under]} ở dưới cái bàn`;
  });
</script>

<div
  class="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-amber-50 p-3"
  role="img"
  aria-label={label}
>
  {#if visual.type === 'groups'}
    {#each visual.groups as g, i (i)}
      <div class="flex max-w-56 flex-wrap justify-center gap-1 rounded-xl bg-white p-2">
        {#each { length: g.n } as _, j (j)}
          <Picture name={g.picture} size={40} decorative />
        {/each}
      </div>
    {/each}
  {:else if visual.type === 'takeaway'}
    <div class="flex max-w-72 flex-wrap justify-center gap-1 rounded-xl bg-white p-2">
      {#each { length: visual.total } as _, j (j)}
        {@const gone = j >= visual.total - visual.gone}
        <span class="relative inline-flex {gone ? 'opacity-50' : ''}">
          <Picture name={visual.picture} size={40} decorative />
          {#if gone}
            <svg
              class="absolute inset-0"
              viewBox="0 0 40 40"
              width="40"
              height="40"
              aria-hidden="true"
            >
              <line
                x1="4"
                y1="36"
                x2="36"
                y2="4"
                stroke="#e11d48"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
          {/if}
        </span>
      {/each}
    </div>
  {:else if visual.type === 'figures'}
    {#each visual.figures as kind, i (i)}
      <Figure {kind} size={visual.figures.length > 1 ? 48 : 120} decorative />
    {/each}
    {#if visual.blank}
      <span
        class="inline-flex h-12 w-12 items-center justify-center rounded-lg border-4 border-dashed border-indigo-400 bg-white text-3xl font-bold text-indigo-600"
        aria-hidden="true">?</span
      >
    {/if}
  {:else if visual.type === 'row'}
    <div class="flex items-end gap-4 border-b-4 border-emerald-700 px-2 pb-1">
      {#each visual.pictures as p, i (i)}
        <Picture name={p} size={64} decorative />
      {/each}
    </div>
  {:else}
    <svg viewBox="0 0 200 150" width="220" height="165" aria-hidden="true">
      <line x1="0" y1="146" x2="200" y2="146" stroke="#94a3b8" stroke-width="4" />
      <rect x="30" y="66" width="140" height="12" rx="3" fill="#b45309" />
      <rect x="40" y="78" width="10" height="66" fill="#92400e" />
      <rect x="150" y="78" width="10" height="66" fill="#92400e" />
      <Picture name={visual.top} size={52} x={74} y={14} decorative />
      <Picture name={visual.under} size={52} x={74} y={92} decorative />
    </svg>
  {/if}
</div>
