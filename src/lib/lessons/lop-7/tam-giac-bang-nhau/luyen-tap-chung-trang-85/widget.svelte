<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { PAGE_85_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_85_SKILLS}
  perSkill={4}
  invalidText="Hãy nhập một số tự nhiên: số đo góc tính bằng độ (ví dụ 55) hoặc độ dài tính bằng xăng-ti-mét (ví dụ 12)."
/>
