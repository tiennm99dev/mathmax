<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '../_shared/decimal.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương II"
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số nguyên (ví dụ −4), một phân số dạng a/b (ví dụ 3/8) hoặc một số thập phân có dấu phẩy (ví dụ 2,45)."
/>
