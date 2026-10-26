<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { PAGE_92_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_92_SKILLS}
  perSkill={4}
  invalidText="Hãy nhập một số tự nhiên, có thể kèm đơn vị (ví dụ 120 hoặc 120 cm³)."
/>
