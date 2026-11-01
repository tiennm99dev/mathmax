<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import { ARITH_SKILLS } from '../_shared/arith-skills.js';
</script>

<AdaptiveQuiz
  skills={ARITH_SKILLS}
  length={10}
  allGood="Tuyệt vời! Em đã nắm chắc phép cộng, phép trừ trong phạm vi 10."
>
  {#snippet visual(q)}
    {#if q.visual}<QuizVisual visual={q.visual} />{/if}
  {/snippet}
</AdaptiveQuiz>
