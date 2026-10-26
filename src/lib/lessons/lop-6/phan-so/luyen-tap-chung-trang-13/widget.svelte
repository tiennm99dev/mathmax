<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readFraction, valueText } from '#lib/core/fractions.js';
  import { PAGE_13_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_13_SKILLS}
  perSkill={5}
  read={readFraction}
  format={valueText}
  invalidText="Hãy nhập một số nguyên (ví dụ −7) hoặc một phân số dạng a/b (ví dụ −3/4, gõ dấu - trước số âm)."
/>
