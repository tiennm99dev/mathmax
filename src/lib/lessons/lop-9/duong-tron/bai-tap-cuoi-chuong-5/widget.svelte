<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương 5"
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số tự nhiên hoặc số thập phân (dùng dấu phẩy, ví dụ 6,28); có thể gõ đơn vị như cm, cm² hay ° sau số."
/>
