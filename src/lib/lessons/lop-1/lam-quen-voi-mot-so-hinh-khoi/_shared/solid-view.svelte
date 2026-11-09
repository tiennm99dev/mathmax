<script>
  import { turnSolid } from '#lib/actions/turn-solid.js';
  import { focusRing } from '#lib/core/ui.js';

  import BoxDrawing from './box-drawing.svelte';

  /**
   * A box drawing the child turns by dragging or with the arrow keys.
   *
   * - `boxes`, `tone`, `width`, `height`: as in `box-drawing.svelte`;
   * - `view`: `{ yaw, pitch }` in degrees (bindable, so two views can turn
   *   together);
   * - `label`: what the drawing shows, for screen readers.
   * @type {{
   *   boxes: import('./solids.js').Box[];
   *   view?: { yaw: number, pitch: number };
   *   tone?: boolean;
   *   width?: number;
   *   height?: number;
   *   label: string;
   * }}
   */
  let {
    boxes,
    view = $bindable({ yaw: -30, pitch: 22 }),
    tone = false,
    width = 240,
    height = 200,
    label,
  } = $props();

  /** Lowest tilt: a little below the ground, so the bottom face can be seen. */
  const MIN_PITCH = -30;
</script>

<div
  role="slider"
  tabindex="0"
  aria-label="{label}. Kéo hoặc dùng phím mũi tên để xoay khối"
  aria-valuemin={-180}
  aria-valuemax={180}
  aria-valuenow={Math.round(view.yaw)}
  aria-valuetext="Xoay {Math.round(view.yaw)} độ, nhìn từ trên xuống {Math.round(view.pitch)} độ"
  class="cursor-grab touch-none rounded-2xl select-none border-2 border-slate-200 bg-white active:cursor-grabbing {focusRing}"
  use:turnSolid={{ view: () => view, onturn: (v) => (view = v), options: { minPitch: MIN_PITCH } }}
>
  <BoxDrawing {boxes} {view} {tone} {width} {height} decorative />
</div>
