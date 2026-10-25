<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { luyThua, thuTuPhepTinh } from '../_shared/skills.js';

  const SKILLS = [luyThua, thuTuPhepTinh];
</script>

<DrillBoard skills={SKILLS} perSkill={5} />
