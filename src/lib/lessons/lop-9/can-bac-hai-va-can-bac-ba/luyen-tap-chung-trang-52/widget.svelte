<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { SKILLS_TRANG_52 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_52}
  perSkill={4}
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số nguyên, số thập phân (dùng dấu phẩy, ví dụ 0,7) hoặc phân số (ví dụ 5/7)."
/>
