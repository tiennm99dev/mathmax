<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em chọn đơn vị và ước lượng số đo rất giỏi.';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  {allGood}
  listOptions={(q) => q.options.some((o) => String(o).length > 12)}
/>
