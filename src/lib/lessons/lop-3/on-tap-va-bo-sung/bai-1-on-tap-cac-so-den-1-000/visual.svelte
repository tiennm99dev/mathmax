<script>
  import { countLabel } from '#lib/core/kid/quiz.js';
  import PlaceBlock from '../_shared/place-block.svelte';

  /**
   * The picture above a review question. The number the child has to work out
   * stays hidden until the question ends; screen readers hear the same facts
   * the picture shows.
   * @type {{ visual: import('./engine.js').Visual, settled: boolean }}
   */
  let { visual, settled } = $props();

  /**
   * The blocks of a number as lists a screen reader can count.
   * @param {{ hundreds: number, tens: number, ones: number }} b
   */
  const blocksLabel = (b) =>
    /** @type {Array<[string, number]>} */ ([
      ['tấm trăm', b.hundreds],
      ['thanh chục', b.tens],
      ['khối đơn vị', b.ones],
    ])
      .filter(([, n]) => n > 0)
      .map(([noun, n]) => countLabel(noun, n, settled))
      .join('. ');
</script>

{#if visual.type === 'blocks'}
  <div
    class="flex flex-wrap items-end justify-center gap-2 rounded-2xl bg-sky-50 p-3"
    role="img"
    aria-label={blocksLabel(visual)}
  >
    {#each { length: visual.hundreds } as _, i (i)}
      <PlaceBlock kind="hundreds" cell={4} />
    {/each}
    {#if visual.tens > 0}
      <div class="flex gap-1">
        {#each { length: visual.tens } as _, i (i)}
          <PlaceBlock kind="tens" cell={4} />
        {/each}
      </div>
    {/if}
    {#if visual.ones > 0}
      <div class="grid grid-cols-3 gap-1">
        {#each { length: visual.ones } as _, i (i)}
          <PlaceBlock kind="ones" cell={8} />
        {/each}
      </div>
    {/if}
  </div>
{:else}
  <div
    class="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-amber-50 p-3 text-2xl font-bold tabular-nums"
    role="img"
    aria-label="Dãy số: {visual.items
      .map((n, i) => (i === visual.blank && !settled ? 'dấu hỏi' : n))
      .join(', ')}."
  >
    {#each visual.items as n, i (i)}
      <span
        class="inline-flex h-12 min-w-16 items-center justify-center rounded-xl border-2 bg-white px-2 {i ===
        visual.blank
          ? 'border-4 border-dashed border-indigo-400 text-indigo-600'
          : 'border-slate-300'}">{i === visual.blank && !settled ? '?' : n}</span
      >
    {/each}
  </div>
{/if}
