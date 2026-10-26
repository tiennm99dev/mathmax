<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương 6"
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số nguyên, một phân số như −7/3 hoặc một số thập phân như 1,25 (gõ dấu - trước số âm)."
/>
