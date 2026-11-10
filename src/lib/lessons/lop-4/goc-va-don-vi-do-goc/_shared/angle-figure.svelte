<script>
  import { arcPath, measure, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import Protractor from './protractor.svelte';
  import { PROTRACTOR_R, layoutFigure } from './figure.js';

  /**
   * A still angle picture for a question: the vertex, the named rays, an arc
   * on each marked angle and, when the figure asks for it, a protractor laid
   * on the angle. A measure marked `late` (and the right-angle mark of a 90°
   * angle) shows only once the question has ended.
   *
   * - `figure`: what to draw (`Figure` in `figure.js`).
   * - `settled`: whether the question has ended.
   * - `size`: CSS max-width class of the picture.
   * @type {{
   *   figure: import('./figure.js').Figure;
   *   settled?: boolean;
   *   size?: string;
   * }}
   */
  let { figure, settled = true, size = 'max-w-sm' } = $props();

  const lay = $derived(layoutFigure(figure));
</script>

<svg
  viewBox="0 0 {lay.w} {lay.h}"
  class="mx-auto block w-full select-none rounded-xl border border-slate-200 bg-white {size}"
  role="img"
  aria-label={figure.label}
>
  {#if figure.protractor}
    <Protractor o={lay.o} r={PROTRACTOR_R} side={figure.protractor} font={10} />
  {/if}
  {#each lay.arcs as arc, i (i)}
    {@const shown = settled || !arc.late}
    {#if shown && measure(arc.a, arc.b) === 90}
      <path
        d={rightMarkPath(lay.o, arc.a, arc.b, 16)}
        fill="none"
        stroke="#059669"
        stroke-width="2.5"
      />
    {:else}
      <path
        d={arcPath(lay.o, arc.a, arc.b, arc.r)}
        fill="none"
        stroke="#B45309"
        stroke-width="2.5"
      />
    {/if}
    {#if shown && arc.text}
      <text
        x={arc.at.x}
        y={arc.at.y}
        font-size="15"
        font-weight="700"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#B45309">{arc.text}</text
      >
    {/if}
  {/each}
  {#each lay.rays as ray (ray.name)}
    <line
      x1={lay.o.x}
      y1={lay.o.y}
      x2={ray.tip.x}
      y2={ray.tip.y}
      stroke="#1E293B"
      stroke-width="3.5"
      stroke-linecap="round"
    />
    <circle cx={ray.tip.x} cy={ray.tip.y} r="3" fill="#1E293B" />
    <text
      x={ray.at.x}
      y={ray.at.y}
      font-size="18"
      font-weight="700"
      text-anchor="middle"
      dominant-baseline="middle"
      fill="#1E293B">{ray.name}</text
    >
  {/each}
  <circle cx={lay.o.x} cy={lay.o.y} r="4.5" fill="#1E293B" />
  <text
    x={lay.vertexName.x}
    y={lay.vertexName.y}
    font-size="18"
    font-weight="700"
    text-anchor="middle"
    dominant-baseline="middle"
    fill="#1E293B">{figure.vertex}</text
  >
</svg>
