<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { PAGE_37_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_37_SKILLS}
  perSkill={3}
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số nguyên (ví dụ −4), một phân số dạng a/b (ví dụ 3/8) hoặc một số thập phân có dấu phẩy (ví dụ 2,45)."
/>
