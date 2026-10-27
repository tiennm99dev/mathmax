<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương 7"
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số (số thập phân dùng dấu phẩy, ví dụ 22,5)."
/>
