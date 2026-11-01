<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import { addSkill, compareSkill, storySkill } from '../_shared/ten-skills.js';
  import {
    addSkill as add100Skill,
    compareSkill as compare100Skill,
    placeSkill,
    subtractSkill as subtract100Skill,
  } from '../_shared/hundred-skills.js';
  import {
    clockSkill,
    measureSkill,
    shapeNameSkill,
    solidSkill,
    weekdaySkill,
  } from '../_shared/measure-skills.js';

  // One part from each idea of the year: numbers and calculations within 10
  // and 100, shapes and solids, length, clock and the days of the week.
  const skills = [
    compareSkill,
    addSkill,
    storySkill,
    placeSkill,
    compare100Skill,
    add100Skill,
    subtract100Skill,
    shapeNameSkill,
    solidSkill,
    measureSkill,
    clockSkill,
    weekdaySkill,
  ];
</script>

<AdaptiveQuiz {skills} length={12} allGood="Tuyệt vời! Em đã nắm chắc kiến thức Toán lớp 1.">
  {#snippet visual(q)}
    {#if q.visual}<QuizVisual visual={q.visual} />{/if}
  {/snippet}
</AdaptiveQuiz>
