<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { SKILLS_TRANG_18 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_18}
  perSkill={4}
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số nguyên hoặc số thập phân (dùng dấu phẩy, ví dụ −1,5)."
/>
