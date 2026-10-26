<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={4}
  invalidText="Hãy nhập một số tự nhiên: số dãy dữ liệu, số học sinh, tỉ lệ phần trăm (ví dụ 25), số đo góc (ví dụ 90) hoặc số của tháng."
/>
