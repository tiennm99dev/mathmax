<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { probabilityText, readProbability } from '#lib/core/fractions.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={4}
  read={readProbability}
  format={probabilityText}
  invalidText="Hãy nhập một số tự nhiên (số kết quả, số biến cố) hoặc một xác suất dạng phân số a/b (ví dụ 1/3), số 0, số 1 hay số thập phân (ví dụ 0,5)."
/>
