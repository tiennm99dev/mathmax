<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { answerText, readNumber } from '#lib/core/decimal.js';
  import { PRACTICE_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PRACTICE_SKILLS}
  perSkill={4}
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số, ví dụ 6 hoặc 7,5. Có thể gõ thêm đơn vị như 7,5 cm hoặc 65°."
/>
