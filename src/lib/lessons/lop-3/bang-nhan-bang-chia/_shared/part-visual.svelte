<script>
  import Frac from '#lib/core/frac.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import { countLabel } from '#lib/core/kid/quiz.js';
  import PartFigure from './part-figure.svelte';

  /**
   * What a "một phần mấy" question draws. A set of things stays in one heap
   * while the question is open, and splits into its equal parts once it ends,
   * with the first part ringed.
   * @type {{ visual: import('./part-questions.js').PartVisual, settled: boolean }}
   */
  let { visual, settled } = $props();
</script>

{#if visual.type === 'figure'}
  <div class="flex justify-center rounded-2xl bg-sky-50 p-3">
    <PartFigure figure={visual.figure} size={170} />
  </div>
{:else if visual.type === 'written'}
  <div class="flex justify-center rounded-2xl bg-sky-50 p-3">
    <Frac n={1} d={visual.n} size="lg" />
  </div>
{:else if settled}
  {@const each = visual.total / visual.parts}
  <div
    class="flex flex-wrap justify-center gap-2 rounded-2xl bg-sky-50 p-2"
    role="img"
    aria-label="{visual.parts} phần bằng nhau, mỗi phần {each} {visual.noun}."
  >
    {#each { length: visual.parts } as _, p (p)}
      <div
        class="flex max-w-[136px] flex-wrap justify-center gap-1 rounded-2xl border-4 bg-white p-1 {p ===
        0
          ? 'border-amber-500'
          : 'border-slate-200'}"
      >
        {#each { length: each } as _, i (i)}
          <Picture name={visual.picture} size={26} decorative />
        {/each}
      </div>
    {/each}
  </div>
{:else}
  <div
    class="flex flex-wrap justify-center gap-1 rounded-2xl bg-sky-50 p-2"
    role="img"
    aria-label={countLabel(visual.noun, visual.total)}
  >
    {#each { length: visual.total } as _, i (i)}
      <Picture name={visual.picture} size={32} decorative />
    {/each}
  </div>
{/if}
