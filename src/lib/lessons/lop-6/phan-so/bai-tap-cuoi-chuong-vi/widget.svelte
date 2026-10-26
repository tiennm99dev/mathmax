<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readFraction, valueText } from '#lib/core/fractions.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương VI"
  read={readFraction}
  format={valueText}
  invalidText="Hãy nhập một số nguyên (ví dụ −7) hoặc một phân số dạng a/b (ví dụ −3/4, gõ dấu - trước số âm)."
/>
