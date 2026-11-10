<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã nắm chắc các kiến thức của chủ đề Ôn tập và bổ sung.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood} />
