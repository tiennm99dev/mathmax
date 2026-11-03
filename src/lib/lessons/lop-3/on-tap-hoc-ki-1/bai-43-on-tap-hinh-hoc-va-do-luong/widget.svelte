<script>
  import { GEOMETRY_SKILLS } from '../_shared/geometry-skills.js';
  import { MEASURE_SKILLS } from '../_shared/measure-skills.js';
  import ReviewQuiz from '../_shared/review-quiz.svelte';
</script>

<ReviewQuiz
  skills={[...GEOMETRY_SKILLS, ...MEASURE_SKILLS]}
  allGood="Tuyệt vời! Em đã nắm chắc hình học và đo lường."
/>
