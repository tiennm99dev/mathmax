<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { answerText, readNumber } from '#lib/core/decimal.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương 10"
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số, ví dụ 240 hoặc 7,5. Có thể gõ thêm đơn vị như 240 cm², 108 lít hoặc 600000 đồng."
/>
