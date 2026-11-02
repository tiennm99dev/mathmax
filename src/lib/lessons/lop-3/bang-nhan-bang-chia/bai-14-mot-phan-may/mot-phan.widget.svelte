<script>
  import Frac from '#lib/core/frac.svelte';
  import PartFigure from '../_shared/part-figure.svelte';
  import { equalFigure, partWords } from '../_shared/parts.js';

  /** One shape for each part the lesson reads, as the book lays them out. */
  const CARDS = /** @type {const} */ ([
    ['circle', 2],
    ['bar', 3],
    ['grid', 4],
    ['circle', 5],
    ['grid', 6],
    ['circle', 7],
    ['grid', 8],
    ['grid', 9],
  ]);
</script>

<ul class="grid grid-cols-2 gap-3">
  {#each CARDS as [shape, n] (n)}
    <li class="flex flex-col items-center gap-1 rounded-2xl bg-sky-50 p-2 text-center">
      <PartFigure figure={equalFigure(shape, n)} size={110} />
      <Frac n={1} d={n} size="lg" />
      <span class="text-base font-semibold text-slate-700">{partWords(n)}</span>
    </li>
  {/each}
</ul>
