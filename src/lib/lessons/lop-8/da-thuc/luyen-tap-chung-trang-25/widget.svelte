<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { intText, readInteger } from '#lib/core/number-format.js';
  import { SKILLS_TRANG_25 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_25}
  perSkill={6}
  read={readInteger}
  format={intText}
  invalidText="Hãy nhập một số nguyên, ví dụ 12 hoặc −12 (gõ dấu - trước số âm)."
/>
