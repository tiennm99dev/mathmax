<script>
  import DrillBoard from '../_shared/drill-board.svelte';
  import { cachGhiSo, congTru, nhanChia, tapHop, thuTu } from '../_shared/skills.js';

  const SKILLS = [tapHop, cachGhiSo, thuTu, congTru, nhanChia];
</script>

<DrillBoard skills={SKILLS} perSkill={2} />
