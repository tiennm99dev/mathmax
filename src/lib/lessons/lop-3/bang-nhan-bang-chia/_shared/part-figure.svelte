<script>
  import { BOX, figureLabel, partPaths } from './parts.js';

  /**
   * A shape cut into parts, with its coloured part. `decorative` leaves it to
   * the button or card around it to say what it shows.
   * @type {{ figure: import('./parts.js').Figure, size?: number, decorative?: boolean }}
   */
  let { figure, size = 150, decorative = false } = $props();

  const paths = $derived(partPaths(figure));
</script>

<svg
  viewBox="0 0 {BOX} {BOX}"
  width={size}
  height={size}
  class="block max-w-full"
  role={decorative ? undefined : 'img'}
  aria-hidden={decorative ? 'true' : undefined}
  aria-label={decorative ? undefined : figureLabel(figure)}
>
  {#each paths as d, i (i)}
    <path
      {d}
      class="stroke-slate-700 {i === figure.shaded ? 'fill-amber-400' : 'fill-white'}"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  {/each}
</svg>
