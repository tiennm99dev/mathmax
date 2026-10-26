<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương IX"
  invalidText="Hãy nhập một số tự nhiên: số đo góc tính bằng độ (ví dụ 75), độ dài tính bằng xăng-ti-mét (ví dụ 12) hoặc một số lượng."
/>
