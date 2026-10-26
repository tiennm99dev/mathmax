<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { PAGE_50_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_50_SKILLS}
  perSkill={3}
  invalidText="Hãy nhập số đo góc là một số tự nhiên, tính bằng độ (ví dụ 135)."
/>
