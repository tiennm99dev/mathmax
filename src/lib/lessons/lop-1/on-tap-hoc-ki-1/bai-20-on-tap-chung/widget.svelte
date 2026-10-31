<script>
  import ReviewQuiz from '../_shared/review-quiz.svelte';
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

<ReviewQuiz {skills} length={12} allGood="Tuyệt vời! Em đã nắm chắc kiến thức học kì 1." />
