<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { countOrProbabilityText, readProbability } from '#lib/core/fractions.js';
  import { PRACTICE_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PRACTICE_SKILLS}
  perSkill={2}
  read={readProbability}
  format={countOrProbabilityText}
  invalidText="Hãy nhập một số tự nhiên (số phần tử, số kết quả) hoặc một xác suất dạng phân số a/b (ví dụ 5/12)."
/>
