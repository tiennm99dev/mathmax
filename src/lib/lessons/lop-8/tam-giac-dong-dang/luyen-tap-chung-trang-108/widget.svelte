<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import { PRACTICE_108, answerText } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PRACTICE_108}
  perSkill={4}
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số, ví dụ 12 hoặc 4,25. Có thể gõ thêm đơn vị như 4,25 m hoặc 7 km."
/>
