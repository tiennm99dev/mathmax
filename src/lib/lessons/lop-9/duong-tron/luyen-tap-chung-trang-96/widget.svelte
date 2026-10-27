<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { SKILLS_TRANG_96 } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={SKILLS_TRANG_96}
  perSkill={2}
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số tự nhiên hoặc số thập phân (dùng dấu phẩy, ví dụ 6,28); có thể gõ đơn vị như cm, cm² hay ° sau số."
/>
