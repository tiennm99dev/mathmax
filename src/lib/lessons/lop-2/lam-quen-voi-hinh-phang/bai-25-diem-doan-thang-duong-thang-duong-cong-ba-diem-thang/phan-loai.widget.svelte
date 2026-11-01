<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import Figure from '../_shared/figure.svelte';
  import { LINE_BINS, LINE_CARDS, LINE_FIGURES } from './engine.js';
</script>

<CardSorter
  cards={LINE_CARDS}
  bins={[...LINE_BINS]}
  label="Xếp mỗi hình vào đoạn thẳng, đường thẳng hoặc đường cong"
  hintOnWrong
>
  {#snippet face(card)}
    <span class="block w-24"><Figure figure={LINE_FIGURES[card.id]} /></span>
  {/snippet}
</CardSorter>
