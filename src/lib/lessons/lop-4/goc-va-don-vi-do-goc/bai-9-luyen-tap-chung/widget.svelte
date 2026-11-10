<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import QuestionVisual from '../_shared/question-visual.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc cách đo góc và gọi tên các góc."
>
  {#snippet visual(q, settled)}
    <QuestionVisual visual={q.visual} {settled} />
  {/snippet}
</ChoiceRound>
