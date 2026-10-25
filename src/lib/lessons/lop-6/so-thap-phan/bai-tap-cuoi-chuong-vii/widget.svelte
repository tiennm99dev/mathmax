<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readAnswer, valueText } from '../_shared/decimal.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương VII"
  read={readAnswer}
  format={valueText}
  invalidText="Hãy nhập một số, dùng dấu phẩy cho phần thập phân (ví dụ −3,25 hoặc 0,4; gõ dấu - trước số âm). Có thể kèm dấu % hoặc chữ đồng."
/>
