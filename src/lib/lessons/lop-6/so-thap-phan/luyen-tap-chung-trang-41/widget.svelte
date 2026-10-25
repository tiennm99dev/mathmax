<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readDecimal, valueText } from '../_shared/decimal.js';
  import { PAGE_41_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_41_SKILLS}
  perSkill={4}
  read={readDecimal}
  format={valueText}
  invalidText="Hãy nhập một số, dùng dấu phẩy cho phần thập phân (ví dụ −3,25 hoặc 0,4; gõ dấu - trước số âm)."
/>
