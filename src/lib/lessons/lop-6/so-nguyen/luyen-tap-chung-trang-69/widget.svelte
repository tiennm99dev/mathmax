<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { intText, readInteger } from '../_shared/integers.js';
  import { congTruSoNguyen, quyTacDauNgoac, tapHopSoNguyen } from '../_shared/skills.js';

  const SKILLS = [tapHopSoNguyen, congTruSoNguyen, quyTacDauNgoac];
</script>

<DrillBoard
  skills={SKILLS}
  perSkill={4}
  read={readInteger}
  format={intText}
  invalidText="Hãy nhập một số nguyên, ví dụ 12 hoặc −12 (gõ dấu - trước số âm)."
/>
