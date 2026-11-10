<script>
  import { DATA_CHANCE_SKILLS } from '../_shared/data-chance-skills.js';
  import ReviewQuiz from '../_shared/review-quiz.svelte';
</script>

<ReviewQuiz
  skills={DATA_CHANCE_SKILLS}
  allGood="Tuyệt vời! Em đã đọc bảng số liệu và nói đúng khả năng xảy ra."
/>
