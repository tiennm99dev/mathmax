<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { intText, readInteger } from '../_shared/integers.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương III"
  read={readInteger}
  format={intText}
  invalidText="Hãy nhập một số nguyên, ví dụ 12 hoặc −12 (gõ dấu - trước số âm)."
/>
