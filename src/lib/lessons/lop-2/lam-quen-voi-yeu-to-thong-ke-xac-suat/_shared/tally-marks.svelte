<script>
  import { countLabel } from '#lib/core/kid/quiz.js';
  import { tallyBundles } from './survey.js';

  /**
   * Tally marks (vạch kiểm đếm): bundles of four strokes with a slash across
   * as the fifth. Screen readers hear one word per stroke until `settled`, so
   * the label never gives away a count the child is asked for.
   * @type {{ count: number, settled?: boolean }}
   */
  let { count, settled = false } = $props();

  const label = $derived(count === 0 ? 'chưa có vạch nào' : countLabel('vạch', count, settled));
</script>

<span class="inline-flex min-h-8 flex-wrap items-center gap-2" role="img" aria-label={label}>
  {#each tallyBundles(count) as size, b (b)}
    <svg width="36" height="30" viewBox="0 0 36 30" aria-hidden="true" class="shrink-0">
      {#each { length: Math.min(4, size) } as _, k (k)}
        <line
          x1={6 + k * 8}
          y1="4"
          x2={6 + k * 8}
          y2="26"
          stroke="#334155"
          stroke-width="3"
          stroke-linecap="round"
        />
      {/each}
      {#if size === 5}
        <line
          x1="1"
          y1="22"
          x2="35"
          y2="8"
          stroke="#dc2626"
          stroke-width="3"
          stroke-linecap="round"
        />
      {/if}
    </svg>
  {/each}
</span>
