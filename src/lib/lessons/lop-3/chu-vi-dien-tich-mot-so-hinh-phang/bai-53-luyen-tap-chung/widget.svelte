<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import CellFigure from '../_shared/cell-figure.svelte';
  import SideFigure from '../_shared/side-figure.svelte';
  import { cellCount, rowsText } from '../_shared/figures.js';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc chu vi và diện tích các hình."
  listOptions={(q) => q.kind === 'bai-toan' && q.options.length === 2}
>
  {#snippet visual(q, settled)}
    {#if q.visual?.type === 'poly'}
      <SideFigure points={q.visual.points} labels={q.visual.labels} label={q.visual.label} />
    {:else if q.visual?.type === 'cells'}
      <CellFigure
        rows={q.visual.rows}
        label="Hình gồm các ô vuông 1 cm². {rowsText(q.visual.rows)}{settled
          ? `. Tất cả ${cellCount(q.visual.rows)} ô`
          : ''}."
      />
    {/if}
  {/snippet}
</ChoiceRound>
