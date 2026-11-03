<script>
  import { fmt } from '#lib/core/number-format.js';
  import { CYLINDER_MAX } from './measure.js';

  /**
   * A measuring cylinder (ống đong) from 0 to 1 000 ml: a number at every
   * 100 ml and a small mark at every 50 ml. The water rises smoothly unless
   * reduced motion is asked for. A drawing only: the widget holds the controls.
   *
   * - `ml`: the water in it, in millilitres.
   * - `label`: what a screen reader hears.
   * @type {{ ml: number, label: string }}
   */
  let { ml, label } = $props();

  const BOTTOM = 318;
  const SPAN = 280;
  const MARKS = Array.from({ length: CYLINDER_MAX / 50 }, (_, i) => (i + 1) * 50);

  /** @param {number} v */
  const yOf = (v) => BOTTOM - (v / CYLINDER_MAX) * SPAN;
</script>

<svg viewBox="0 0 180 340" class="mx-auto block h-80 w-auto" role="img" aria-label={label}>
  <text x="124" y="24" font-size="16" font-weight="700" fill="#334155">ml</text>
  <rect x="40" y={yOf(CYLINDER_MAX)} width="70" height={SPAN} fill="#f8fafc" />
  <rect
    x="40"
    y={yOf(CYLINDER_MAX)}
    width="70"
    height={SPAN}
    fill="#38bdf8"
    class="motion-safe:transition-transform motion-safe:duration-300"
    style="transform-box: fill-box; transform-origin: bottom; transform: scaleY({ml /
      CYLINDER_MAX})"
  />
  {#each MARKS as mark (mark)}
    {@const big = mark % 100 === 0}
    <line
      x1={big ? 84 : 94}
      y1={yOf(mark)}
      x2="110"
      y2={yOf(mark)}
      stroke="#0f172a"
      stroke-width={big ? 2 : 1}
    />
    {#if big}
      <text x="116" y={yOf(mark) + 5} font-size="15" font-weight="600" fill="#1e293b"
        >{fmt(mark)}</text
      >
    {/if}
  {/each}
  <path
    d="M40 {yOf(CYLINDER_MAX) - 14} V{BOTTOM} H110 V{yOf(CYLINDER_MAX) - 14}"
    fill="none"
    stroke="#475569"
    stroke-width="3"
  />
</svg>
