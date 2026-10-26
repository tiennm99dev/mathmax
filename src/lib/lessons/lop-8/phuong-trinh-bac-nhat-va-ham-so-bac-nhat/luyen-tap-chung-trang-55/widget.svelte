<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { SKILLS_TRANG_55 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_55}
  perSkill={4}
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số nguyên, một phân số như −5/2 hoặc một số thập phân như 1,5 (gõ dấu - trước số âm)."
/>
