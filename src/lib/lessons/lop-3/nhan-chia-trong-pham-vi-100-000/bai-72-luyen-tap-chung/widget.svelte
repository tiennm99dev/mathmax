<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = `Tuyệt vời! Em đã nắm chắc phép nhân, phép chia trong phạm vi ${fmt(100000)}.`;
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood} />
