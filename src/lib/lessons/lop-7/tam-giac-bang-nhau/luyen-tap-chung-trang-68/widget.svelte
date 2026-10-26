<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { PAGE_68_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_68_SKILLS}
  perSkill={3}
  invalidText="Hãy nhập một số tự nhiên: số đo góc tính bằng độ (ví dụ 65) hoặc độ dài tính bằng xăng-ti-mét (ví dụ 12)."
/>
