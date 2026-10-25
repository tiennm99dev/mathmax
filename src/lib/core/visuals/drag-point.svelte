<svelte:options namespace="svg" />

<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';

  /**
   * A round drag handle for a point, with an optional visible name such as
   * 'A'. Pointer drags and arrow keys both go through `use:draggable`, so the
   * params decide snapping (`projector`), steps and what happens on change.
   * Place it inside a `geometry-board` or any SVG.
   *
   * - `drag`: the draggable params; the handle is drawn at `drag.point`.
   * - `label`: accessible name; say how to move it.
   * - `r`: radius in SVG units (12, a comfortable touch target).
   * - `name`: visible text next to the point, offset by `nameDx`, `nameDy`.
   *
   * @type {{
   *   drag: import('#lib/actions/draggable.svelte.js').DraggableParams;
   *   label: string;
   *   r?: number;
   *   color?: string;
   *   name?: string;
   *   nameDx?: number;
   *   nameDy?: number;
   *   nameColor?: string;
   * }}
   */
  let {
    drag,
    label,
    r = 12,
    color = '#4F46E5',
    name = '',
    nameDx = 12,
    nameDy = -14,
    nameColor = '#1F2937',
  } = $props();
</script>

<circle
  class="drag-handle"
  cx={drag.point.x}
  cy={drag.point.y}
  {r}
  fill={color}
  stroke="#fff"
  stroke-width="2"
  role="button"
  tabindex="0"
  aria-label={label}
  style="cursor:grab; outline:none"
  use:draggable={drag}
/>
{#if name}
  <text
    x={drag.point.x + nameDx}
    y={drag.point.y + nameDy}
    font-size="14"
    font-weight="700"
    fill={nameColor}
    style="pointer-events:none">{name}</text
  >
{/if}
