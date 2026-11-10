<script>
  import BallBox from './ball-box.svelte';
  import ClockFace from './clock-face.svelte';
  import ColumnSheet from './column-sheet.svelte';
  import DataTable from './data-table.svelte';
  import ShapeFigure from './shape-figure.svelte';

  /**
   * The picture of a review question (`Visual` in `visual.js`).
   * @type {{ visual: import('./visual.js').Visual, settled: boolean }}
   */
  let { visual, settled } = $props();
</script>

{#if visual.type === 'column' || visual.type === 'div'}
  <ColumnSheet {visual} {settled} />
{:else if visual.type === 'clock'}
  <ClockFace minutes={visual.minutes} />
{:else if visual.type === 'shape'}
  <ShapeFigure kind={visual.kind} labels={visual.labels} />
{:else if visual.type === 'table'}
  <DataTable table={visual.table} />
{:else}
  <BallBox balls={visual.balls} />
{/if}
