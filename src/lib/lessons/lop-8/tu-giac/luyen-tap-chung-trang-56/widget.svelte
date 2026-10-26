<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import { SKILLS_TRANG_56, answerText } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_56}
  perSkill={5}
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số, ví dụ 75 hoặc 7,5. Có thể gõ thêm đơn vị như 75° hoặc 7,5 cm."
/>
