<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { intText, readInteger } from '#lib/core/number-format.js';
  import { SKILLS_TRANG_19 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_19}
  perSkill={3}
  read={readInteger}
  format={intText}
  invalidText="Hãy nhập một số nguyên, ví dụ 4 hoặc −3 (gõ dấu - trước số âm)."
/>
