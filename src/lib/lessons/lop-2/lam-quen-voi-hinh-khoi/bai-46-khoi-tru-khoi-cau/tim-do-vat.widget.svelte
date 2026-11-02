<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import ThingFigure from '../_shared/thing-figure.svelte';
  import { FIND_BINS, FIND_CARDS } from './engine.js';

  const cards = shuffled(FIND_CARDS, 46);
</script>

<CardSorter
  {cards}
  bins={FIND_BINS}
  label="Xếp mỗi đồ vật vào ô khối trụ, khối cầu hoặc khối khác"
  hintOnWrong
>
  {#snippet face(card)}
    <span class="flex w-20 flex-col items-center gap-1 text-center text-sm font-semibold">
      <ThingFigure id={card.id} size={56} decorative />
      {card.label}
    </span>
  {/snippet}
</CardSorter>
