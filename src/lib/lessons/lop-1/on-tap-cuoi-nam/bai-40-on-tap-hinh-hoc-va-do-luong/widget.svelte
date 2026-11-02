<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import { MEASURE_SKILLS } from '../_shared/measure-skills.js';
</script>

<AdaptiveQuiz
  skills={MEASURE_SKILLS}
  length={14}
  allGood="Tuyệt vời! Em đã nắm chắc hình học và đo lường."
>
  {#snippet visual(q, settled)}
    {#if q.visual}<QuizVisual visual={q.visual} {settled} />{/if}
  {/snippet}
</AdaptiveQuiz>
