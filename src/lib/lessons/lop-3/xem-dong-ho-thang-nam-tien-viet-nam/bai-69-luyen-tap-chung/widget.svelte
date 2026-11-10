<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc cách xem đồng hồ, xem lịch và tính tiền."
>
  {#snippet visual(q)}
    <QuizVisual visual={q.visual} />
  {/snippet}
</ChoiceRound>
