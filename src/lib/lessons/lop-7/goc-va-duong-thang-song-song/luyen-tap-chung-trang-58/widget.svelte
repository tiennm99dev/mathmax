<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { PAGE_58_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_58_SKILLS}
  perSkill={4}
  invalidText="Hãy nhập một số tự nhiên: số đo góc tính bằng độ (ví dụ 135) hoặc số cặp đường thẳng (ví dụ 6)."
/>
