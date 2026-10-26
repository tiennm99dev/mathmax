<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương 5"
  invalidText="Hãy nhập một số tự nhiên: số dãy dữ liệu, vị trí của giá trị, số học sinh, tỉ lệ phần trăm (ví dụ 25), số lần hoặc số tiền."
/>
