<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import { CHAPTER_SKILLS, answerText } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương 4"
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số, ví dụ 6 hoặc 7,5. Có thể gõ thêm đơn vị như 7,5 cm, 40 m hoặc 65°."
/>
