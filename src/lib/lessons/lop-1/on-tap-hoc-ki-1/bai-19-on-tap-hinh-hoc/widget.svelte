<script>
  import ReviewQuiz from '../_shared/review-quiz.svelte';
  import { SHAPE_SKILLS } from '../_shared/shape-skills.js';
</script>

<ReviewQuiz
  skills={SHAPE_SKILLS}
  length={10}
  allGood="Tuyệt vời! Em đã nắm chắc các hình, các khối và vị trí."
/>
