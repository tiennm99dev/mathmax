<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SceneFigure from '../_shared/scene-figure.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc các hình phẳng và hình khối của chủ đề này."
>
  {#snippet visual(q, settled)}
    {#if q.visual}
      <SceneFigure scene={q.visual} {settled} />
    {/if}
  {/snippet}
</ChoiceRound>
