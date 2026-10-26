<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { intText, readInteger } from '#lib/core/number-format.js';
  import { PAGE_44_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_44_SKILLS}
  perSkill={5}
  read={readInteger}
  format={(n) => intText(n)}
  invalidText="Hãy nhập một số nguyên, ví dụ 12 hoặc −7."
/>
