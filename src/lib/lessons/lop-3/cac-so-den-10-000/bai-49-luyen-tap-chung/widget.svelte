<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã vững các số đến 10 000."
  listOptions={(q) => q.kind === 'doc' || q.kind === 'tong' || q.kind === 'bai-toan'}
/>
