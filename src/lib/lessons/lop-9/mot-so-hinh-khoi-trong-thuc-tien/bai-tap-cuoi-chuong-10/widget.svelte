<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { answerText, readNumber } from '#lib/core/decimal.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương 10"
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số nguyên, phân số (ví dụ 32/3) hoặc số thập phân (dùng dấu phẩy, ví dụ 188,5); có thể gõ đơn vị như cm hay cm² sau số."
/>
