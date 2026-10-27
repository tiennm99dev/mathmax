<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { SKILLS_TRANG_28 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_28}
  perSkill={6}
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số nguyên hoặc số thập phân (dùng dấu phẩy, ví dụ −2,5)."
/>
