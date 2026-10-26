<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { PAGE_70_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_70_SKILLS}
  perSkill={4}
  invalidText="Hãy nhập một số tự nhiên: số đo góc tính bằng độ (ví dụ 75), độ dài tính bằng xăng-ti-mét (ví dụ 12) hoặc một số lượng."
/>
