<script>
  import BalanceScale from '#lib/core/kid/balance-scale.svelte';
  import BrokenLine from './broken-line.svelte';
  import ColumnSheet from './column-sheet.svelte';
  import CubeStack from './cube-stack.svelte';
  import SceneFigure from './scene-figure.svelte';
  import WorkLines from './work-lines.svelte';

  /**
   * The picture of a review question (`Visual` in `visual.js`).
   * @type {{ visual: import('./visual.js').Visual, settled: boolean }}
   */
  let { visual, settled } = $props();
</script>

{#if visual.type === 'mul' || visual.type === 'div'}
  <ColumnSheet {visual} {settled} />
{:else if visual.type === 'work'}
  <WorkLines text={visual.text} {settled} />
{:else if visual.type === 'scene'}
  <SceneFigure scene={visual.scene} {settled} />
{:else if visual.type === 'cubes'}
  <CubeStack dims={visual.dims} mark={visual.mark} {settled} />
{:else if visual.type === 'broken'}
  <BrokenLine lengths={visual.lengths} />
{:else}
  <BalanceScale left={visual.left} right={visual.right} />
{/if}
