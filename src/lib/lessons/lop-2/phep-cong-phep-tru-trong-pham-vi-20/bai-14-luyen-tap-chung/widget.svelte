<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import TenFrame from '../_shared/ten-frame.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  /** @typedef {'empty' | 'red' | 'blue' | 'gone'} Cell */

  /**
   * The two frames of `c − b`: a full first frame and `c − 10` dots in the
   * second. Once the question ends, the `b` dots taken away are crossed out,
   * the second frame first, then the rest from the end of the first frame.
   * @param {number} c
   * @param {number} b
   * @param {boolean} settled
   */
  function cells(c, b, settled) {
    const ones = c - 10;
    const rest = settled ? b - ones : 0;
    return {
      first: Array.from(
        { length: 10 },
        (_, i) => /** @type {Cell} */ (i >= 10 - rest ? 'gone' : 'red'),
      ),
      second: Array.from(
        { length: 10 },
        (_, i) => /** @type {Cell} */ (i >= ones ? 'empty' : settled ? 'gone' : 'blue'),
      ),
    };
  }
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em trừ qua 10 rất giỏi và giải được bài toán nhiều hơn, ít hơn."
>
  {#snippet visual(q, settled)}
    {#if q.visual?.type === 'frames'}
      {@const f = cells(q.visual.c, q.visual.b, settled)}
      <div class="flex flex-wrap justify-center gap-3">
        <TenFrame cells={f.first} label="Khung thứ nhất" />
        <TenFrame cells={f.second} label="Khung thứ hai" />
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
