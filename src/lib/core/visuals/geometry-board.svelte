<script>
  /**
   * The SVG surface every geometry visual draws on: a white, bordered board
   * that scales to its container and keeps its aspect ratio. Interactive
   * boards turn off touch panning so pointer drags reach `use:draggable`, and
   * expose their children as a group instead of a single image.
   *
   * - `width`, `height`: viewBox size in SVG units (400 × 300).
   * - `label`: accessible name of the drawing.
   * - `interactive`: true when the children hold drag handles.
   * - `maxWidth`: Tailwind max-width class such as 'max-w-md'.
   * - `svgEl` (bindable): the element, to hand to `draggable` as `svg`.
   *
   * @type {{
   *   width?: number;
   *   height?: number;
   *   label: string;
   *   interactive?: boolean;
   *   maxWidth?: string;
   *   svgEl?: SVGSVGElement;
   *   children: import('svelte').Snippet;
   * }}
   */
  let {
    width = 400,
    height = 300,
    label,
    interactive = false,
    maxWidth = '',
    svgEl = $bindable(),
    children,
  } = $props();
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {width} {height}"
  preserveAspectRatio="xMidYMid meet"
  class="mx-auto block w-full select-none rounded-lg border border-slate-200 bg-white {maxWidth}"
  style:aspect-ratio="{width} / {height}"
  style:touch-action={interactive ? 'none' : null}
  role={interactive ? 'group' : 'img'}
  aria-label={label}
>
  {@render children()}
</svg>
