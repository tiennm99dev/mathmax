<svelte:options namespace="svg" />

<script>
  import { tickPositions } from '#lib/geom-engine/ticks.js';

  /**
   * Equal-length marks on the segment from `from` to `to`: one, two or three
   * short strokes across its midpoint, the textbook sign for equal sides.
   *
   * `length` is the half-length of each stroke and `spacing` the gap between
   * strokes, both in SVG units.
   *
   * @type {{
   *   from: import('#lib/geom-engine/vec.js').Vec2;
   *   to: import('#lib/geom-engine/vec.js').Vec2;
   *   count: 1 | 2 | 3;
   *   color?: string;
   *   length?: number;
   *   spacing?: number;
   * }}
   */
  let { from, to, count, color = '#D7263D', length, spacing } = $props();

  const ticks = $derived(tickPositions(from, to, count, { length, spacing }));
</script>

{#each ticks as t, i (i)}
  <line
    x1={t.x1}
    y1={t.y1}
    x2={t.x2}
    y2={t.y2}
    stroke={color}
    stroke-width="2.5"
    stroke-linecap="round"
  />
{/each}
