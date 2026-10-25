<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { PAGE_97_SKILLS, readPercentOrNatural } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_97_SKILLS}
  perSkill={5}
  read={readPercentOrNatural}
  invalidText="Hãy nhập một số tự nhiên; với câu hỏi phần trăm, nhập số phần trăm (có thể kèm dấu %)."
/>
