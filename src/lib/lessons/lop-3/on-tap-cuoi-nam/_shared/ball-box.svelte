<script>
  import { boxText } from './chance.js';

  /**
   * A box of coloured balls for a "chắc chắn, có thể, không thể" question.
   * @type {{ balls: import('./visual.js').Ball[] }}
   */
  let { balls } = $props();

  /** @type {Record<import('./visual.js').BallColor, string>} */
  const FILL = {
    đỏ: '#ef4444',
    xanh: '#3b82f6',
    vàng: '#facc15',
    trắng: '#ffffff',
    nâu: '#92400e',
    tím: '#a855f7',
  };
  const all = $derived(balls.flatMap((b) => Array.from({ length: b.count }, () => b.color)));
</script>

<div
  class="mx-auto flex max-w-xs flex-wrap justify-center gap-2 rounded-b-3xl border-4 border-t-0 border-amber-700 bg-amber-50 px-4 pt-6 pb-4"
  role="img"
  aria-label={boxText(balls)}
>
  {#each all as color, i (i)}
    <span
      class="block h-10 w-10 rounded-full border-2 border-slate-500"
      style:background-color={FILL[color]}
    ></span>
  {/each}
</div>
