<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readProbability } from '#lib/core/fractions.js';
  import { CHAPTER_SKILLS, answerText } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương 8"
  read={readProbability}
  format={answerText}
  invalidText="Hãy nhập một số tự nhiên (số kết quả, số bi, số người) hoặc một xác suất dạng phân số a/b (ví dụ 3/10) hay số thập phân (ví dụ 0,3)."
/>
