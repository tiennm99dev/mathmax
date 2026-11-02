<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import { TEN_SKILLS } from '../_shared/ten-skills.js';
</script>

<AdaptiveQuiz
  skills={TEN_SKILLS}
  length={12}
  allGood="Tuyệt vời! Em đã nắm chắc các số và phép tính trong phạm vi 10."
>
  {#snippet visual(q, settled)}
    {#if q.visual}<QuizVisual visual={q.visual} {settled} />{/if}
  {/snippet}
</AdaptiveQuiz>
