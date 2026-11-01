<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import { HUNDRED_SKILLS } from '../_shared/hundred-skills.js';
</script>

<AdaptiveQuiz
  skills={HUNDRED_SKILLS}
  length={12}
  allGood="Tuyệt vời! Em đã nắm chắc các số và phép tính trong phạm vi 100."
>
  {#snippet visual(q)}
    {#if q.visual}<QuizVisual visual={q.visual} />{/if}
  {/snippet}
</AdaptiveQuiz>
