<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { answerText, readNumber } from '#lib/core/decimal.js';
  import { SKILLS_TRANG_62 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_62}
  perSkill={5}
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số, ví dụ 75 hoặc 7,5. Có thể gõ thêm đơn vị như 75° hoặc 7,5 cm."
/>
