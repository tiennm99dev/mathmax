<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readValue, valueText } from '../_shared/rational.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương I"
  read={readValue}
  format={valueText}
  invalidText="Hãy nhập một số nguyên (ví dụ −7), một phân số dạng a/b (ví dụ −3/4) hoặc một số thập phân có dấu phẩy (ví dụ −0,75)."
/>
