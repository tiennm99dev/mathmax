<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { intText, readInteger } from '#lib/core/number-format.js';
  import { SKILLS_TRANG_17 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_17}
  perSkill={4}
  read={readInteger}
  format={intText}
  invalidText="Hãy nhập một số nguyên, ví dụ 12 hoặc −12 (gõ dấu - trước số âm)."
/>
