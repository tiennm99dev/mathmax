<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { intText, readInteger } from '../_shared/poly.js';
  import { PAGE_34_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_34_SKILLS}
  perSkill={4}
  read={readInteger}
  format={(n) => intText(n)}
  invalidText="Hãy nhập một số nguyên, ví dụ 12 hoặc −7."
/>
