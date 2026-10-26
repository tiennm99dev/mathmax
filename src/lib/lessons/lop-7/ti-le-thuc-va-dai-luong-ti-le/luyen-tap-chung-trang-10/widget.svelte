<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { intText, readInteger } from '../_shared/numbers.js';
  import { PAGE_10_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_10_SKILLS}
  perSkill={5}
  read={readInteger}
  format={intText}
  invalidText="Hãy nhập một số nguyên, ví dụ 12 hoặc −7."
/>
