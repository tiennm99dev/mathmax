<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import { PRACTICE_121, answerText } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PRACTICE_121}
  perSkill={4}
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số, ví dụ 96 hoặc 7,5. Có thể gõ thêm đơn vị như 96 cm² hoặc 120 cm³."
/>
