<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { countOrProbabilityText, readProbability } from '#lib/core/fractions.js';
  import { PRACTICE_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PRACTICE_SKILLS}
  perSkill={4}
  read={readProbability}
  format={countOrProbabilityText}
  invalidText="Hãy nhập một số tự nhiên (số kết quả, số sản phẩm, số con cá) hoặc một xác suất dạng phân số a/b (ví dụ 3/10) hay số thập phân (ví dụ 0,3)."
/>
