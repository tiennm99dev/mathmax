<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương X"
  invalidText="Hãy nhập một số tự nhiên, có thể kèm đơn vị (ví dụ 120 hoặc 120 cm³)."
/>
