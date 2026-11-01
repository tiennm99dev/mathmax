<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import { NUMBER_SKILLS } from '../_shared/number-skills.js';
</script>

<AdaptiveQuiz
  skills={NUMBER_SKILLS}
  length={10}
  allGood="Tuyệt vời! Em đã nắm chắc các số trong phạm vi 10."
>
  {#snippet visual(q)}
    {#if q.visual}<QuizVisual visual={q.visual} />{/if}
  {/snippet}
</AdaptiveQuiz>
