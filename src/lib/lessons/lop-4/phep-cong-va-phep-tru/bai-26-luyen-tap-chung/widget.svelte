<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã nắm chắc phép cộng và phép trừ các số có nhiều chữ số.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood} />
