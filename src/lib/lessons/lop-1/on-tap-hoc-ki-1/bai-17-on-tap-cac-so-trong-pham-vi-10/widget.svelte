<script>
  import ReviewQuiz from '../_shared/review-quiz.svelte';
  import { NUMBER_SKILLS } from '../_shared/number-skills.js';
</script>

<ReviewQuiz
  skills={NUMBER_SKILLS}
  length={10}
  allGood="Tuyệt vời! Em đã nắm chắc các số trong phạm vi 10."
/>
