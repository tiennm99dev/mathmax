<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { dauHieuChiaHet, quanHeChiaHet, soNguyenTo } from '../_shared/skills.js';

  const SKILLS = [quanHeChiaHet, dauHieuChiaHet, soNguyenTo];
</script>

<DrillBoard skills={SKILLS} perSkill={4} />
