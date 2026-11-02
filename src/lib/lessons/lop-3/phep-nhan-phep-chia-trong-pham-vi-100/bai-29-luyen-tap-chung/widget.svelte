<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import TwoStepDiagram from '../_shared/two-step-diagram.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc phép nhân, phép chia trong phạm vi 100 và biết giải bài toán."
>
  {#snippet visual(q, settled)}
    {#if q.visual}
      <TwoStepDiagram story={q.visual} known={settled} done={settled} />
    {/if}
  {/snippet}
</ChoiceRound>
