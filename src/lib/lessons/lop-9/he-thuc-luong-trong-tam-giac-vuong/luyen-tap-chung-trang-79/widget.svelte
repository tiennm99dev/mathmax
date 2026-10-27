<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { SKILLS_TRANG_79 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_79}
  perSkill={2}
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số nguyên, số thập phân (dùng dấu phẩy, ví dụ 0,643) hoặc phân số (ví dụ 3/5); gõ dấu - trước số âm."
/>
