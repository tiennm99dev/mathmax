<script>
  import ReviewQuiz from '../_shared/review-quiz.svelte';
  import { ARITH_SKILLS } from '../_shared/arith-skills.js';
</script>

<ReviewQuiz
  skills={ARITH_SKILLS}
  length={10}
  allGood="Tuyệt vời! Em đã nắm chắc phép cộng, phép trừ trong phạm vi 10."
/>
