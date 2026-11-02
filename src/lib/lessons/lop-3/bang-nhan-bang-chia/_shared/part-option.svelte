<script>
  import Frac from '#lib/core/frac.svelte';
  import PartFigure from './part-figure.svelte';

  /**
   * The face of an option of a "một phần mấy" question: a cut shape, a written
   * 1/n, or plain text.
   * @type {{ option: import('#lib/core/kid/quiz.js').KidOption }}
   */
  let { option } = $props();
</script>

{#if typeof option === 'string'}
  {option}
{:else if option.figure}
  <PartFigure figure={option.figure} size={80} decorative />
{:else if option.n}
  <Frac n={1} d={option.n} size="lg" />
{:else}
  {option.label}
{/if}
