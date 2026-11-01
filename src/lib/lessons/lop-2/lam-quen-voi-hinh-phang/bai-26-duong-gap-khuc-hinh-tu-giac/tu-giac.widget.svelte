<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import Figure from '../_shared/figure.svelte';
  import { FIGURE_BINS, FIGURE_CARDS, QUAD_CARDS } from './engine.js';
</script>

<CardSorter
  cards={QUAD_CARDS}
  bins={[...FIGURE_BINS]}
  label="Xếp mỗi hình vào ô hình tứ giác hoặc không phải hình tứ giác"
  hintOnWrong
>
  {#snippet face(card)}
    <span class="block w-16"><Figure figure={FIGURE_CARDS[card.id]} /></span>
  {/snippet}
</CardSorter>
