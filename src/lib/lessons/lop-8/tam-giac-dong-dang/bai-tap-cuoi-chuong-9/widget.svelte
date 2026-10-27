<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { answerText, readNumber } from '#lib/core/decimal.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương 9"
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số, ví dụ 12 hoặc 7,5. Có thể gõ thêm đơn vị như 7,5 cm, 36 m hoặc 65°."
/>
