<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { LESSON_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard skills={LESSON_SKILLS} perSkill={5} />
