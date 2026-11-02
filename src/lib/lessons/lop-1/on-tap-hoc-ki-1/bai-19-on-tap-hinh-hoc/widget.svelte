<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import { SHAPE_SKILLS } from '../_shared/shape-skills.js';
</script>

<AdaptiveQuiz
  skills={SHAPE_SKILLS}
  length={10}
  allGood="Tuyệt vời! Em đã nắm chắc các hình, các khối và vị trí."
>
  {#snippet visual(q, settled)}
    {#if q.visual}<QuizVisual visual={q.visual} {settled} />{/if}
  {/snippet}
</AdaptiveQuiz>
