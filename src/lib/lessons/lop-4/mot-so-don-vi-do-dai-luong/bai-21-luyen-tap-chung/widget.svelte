<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã nắm chắc các đơn vị đo của chủ đề này.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood} />
