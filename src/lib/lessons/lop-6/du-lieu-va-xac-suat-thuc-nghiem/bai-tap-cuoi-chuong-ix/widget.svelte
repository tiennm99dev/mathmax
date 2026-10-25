<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { CHAPTER_SKILLS, readPercentOrNatural } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương IX"
  read={readPercentOrNatural}
  invalidText="Hãy nhập một số tự nhiên; với câu hỏi phần trăm, nhập số phần trăm (có thể kèm dấu %)."
/>
