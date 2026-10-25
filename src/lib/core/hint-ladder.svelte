<script>
  import RichText from './rich-text.svelte';
  import { hints as copy } from './copy.vi.js';
  import { button } from './ui.js';

  /**
   * Hints revealed one rung at a time, then the full solution. `revealSolution`
   * opens the solution from outside, for example once the answer is right.
   * @type {{ hints: string[], solution: string, revealSolution?: boolean }}
   */
  let { hints, solution, revealSolution = false } = $props();

  let shown = $state(0);
  let solutionOpen = $state(false);
  const showSolution = $derived(solutionOpen || revealSolution);
</script>

<div class="space-y-2">
  {#if shown > 0}
    <ol class="space-y-2" aria-label={copy.title} aria-live="polite">
      {#each hints.slice(0, shown) as hint, i (i)}
        <li class="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950">
          <span class="font-semibold">{copy.title} {i + 1}:</span>
          <RichText html={hint} />
        </li>
      {/each}
    </ol>
  {/if}

  {#if showSolution}
    <div
      class="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sky-950"
      aria-live="polite"
    >
      <span class="font-semibold">{copy.solutionTitle}:</span>
      <RichText html={solution} />
    </div>
  {:else if shown < hints.length}
    <button type="button" class={button.quiet} onclick={() => (shown += 1)}
      >{copy.show(shown + 1, hints.length)}</button
    >
  {:else}
    <button type="button" class={button.quiet} onclick={() => (solutionOpen = true)}
      >{copy.solution}</button
    >
  {/if}
</div>
