<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { PRACTICE_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PRACTICE_SKILLS}
  perSkill={4}
  invalidText="Hãy nhập một số tự nhiên: số dãy dữ liệu, vị trí của giá trị, số học sinh, tỉ lệ phần trăm (ví dụ 25) hoặc số lần."
/>
