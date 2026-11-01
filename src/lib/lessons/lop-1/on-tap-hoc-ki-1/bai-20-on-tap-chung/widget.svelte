<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import { countSkill, compareSkill, rowSkill } from '../_shared/number-skills.js';
  import { addSkill, missingSkill, storySkill, subtractSkill } from '../_shared/arith-skills.js';
  import { rowPositionSkill, shapeNameSkill, solidSkill } from '../_shared/shape-skills.js';

  // One part from each idea of the term: numbers, calculations, shapes and positions.
  const skills = [
    countSkill,
    compareSkill,
    rowSkill,
    addSkill,
    subtractSkill,
    missingSkill,
    storySkill,
    shapeNameSkill,
    solidSkill,
    rowPositionSkill,
  ];
</script>

<AdaptiveQuiz {skills} length={12} allGood="Tuyệt vời! Em đã nắm chắc kiến thức học kì 1.">
  {#snippet visual(q)}
    {#if q.visual}<QuizVisual visual={q.visual} />{/if}
  {/snippet}
</AdaptiveQuiz>
