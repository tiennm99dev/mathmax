<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { boiChung, uocChung } from '../_shared/skills.js';

  const SKILLS = [uocChung, boiChung];
</script>

<DrillBoard skills={SKILLS} perSkill={5} />
