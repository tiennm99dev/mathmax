<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { SKILLS_TRANG_13 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_13}
  perSkill={5}
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số nguyên, một phân số như −7/3 hoặc một số thập phân như 1,25 (gõ dấu - trước số âm)."
/>
