<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import TenFrame from '../_shared/ten-frame.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  /** @typedef {'empty' | 'red' | 'blue' | 'gone'} Cell */

  /**
   * The two frames of `a + b`, the larger number first; once the question
   * ends, the blue dots that make ten have moved into the first frame.
   * @param {number} a
   * @param {number} b
   * @param {boolean} settled
   */
  function cells(a, b, settled) {
    const big = Math.max(a, b);
    const small = Math.min(a, b);
    const moved = settled ? 10 - big : 0;
    return {
      first: Array.from(
        { length: 10 },
        (_, i) => /** @type {Cell} */ (i < big ? 'red' : i < big + moved ? 'blue' : 'empty'),
      ),
      second: Array.from(
        { length: 10 },
        (_, i) => /** @type {Cell} */ (i < small - moved ? 'blue' : 'empty'),
      ),
    };
  }
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em cộng qua 10 rất giỏi và giải được bài toán thêm, bớt."
>
  {#snippet visual(q, settled)}
    {#if q.visual?.type === 'frames'}
      {@const c = cells(q.visual.a, q.visual.b, settled)}
      <div class="flex flex-wrap justify-center gap-3">
        <TenFrame cells={c.first} label="Khung thứ nhất" full={settled} />
        <TenFrame cells={c.second} label="Khung thứ hai" />
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
