<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { PAGE_82_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_82_SKILLS}
  perSkill={6}
  invalidText="Hãy nhập một số tự nhiên: số đo góc tính bằng độ (ví dụ 125) hoặc độ dài tính bằng xăng-ti-mét (ví dụ 8)."
/>
