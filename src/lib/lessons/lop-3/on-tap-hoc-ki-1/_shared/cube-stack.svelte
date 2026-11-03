<script>
  import { pointsAttr } from '#lib/utils/svg.js';
  import { cubeFaces } from './stack.js';

  /**
   * A box built from small cubes in a corner view. Once the question has ended
   * the cubes with `mark` painted faces turn amber.
   *
   * - `dims`: the size of the box, in small cubes.
   * - `mark`: which cubes to tint at the end, by their painted faces.
   * - `settled`: the question has ended.
   * @type {{ dims: import('./stack.js').Dims, mark?: number, settled: boolean }}
   */
  let { dims, mark, settled } = $props();

  const view = $derived(cubeFaces(dims));
  const label = $derived(
    `Khối hộp xếp từ các khối lập phương nhỏ. Mỗi lớp có ${dims.a} hàng, mỗi hàng ${dims.b} khối. Khối hộp cao ${dims.c} lớp.`,
  );
  const WHITE = ['#ffffff', '#e2e8f0', '#cbd5e1'];
  const AMBER = ['#fde68a', '#fbbf24', '#f59e0b'];
</script>

<svg
  viewBox="0 0 {view.w} {view.h}"
  class="mx-auto block w-full max-w-64 rounded-2xl bg-sky-50"
  role="img"
  aria-label={label}
>
  {#each view.cubes as cube (cube.id)}
    {@const tint = settled && cube.painted === mark ? AMBER : WHITE}
    <g stroke="#334155" stroke-width="1.5" stroke-linejoin="round">
      <polygon points={pointsAttr(cube.top)} fill={tint[0]} />
      <polygon points={pointsAttr(cube.side)} fill={tint[1]} />
      <polygon points={pointsAttr(cube.front)} fill={tint[2]} />
    </g>
  {/each}
</svg>
