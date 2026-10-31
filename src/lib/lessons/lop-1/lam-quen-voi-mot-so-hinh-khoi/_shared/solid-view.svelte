<script>
  import { focusRing } from '#lib/core/ui.js';
  import { clampPitch, turnByKey, wrapYaw } from '#lib/geom-engine/solid.js';
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

  /** @type {{ x: number, y: number } | null} */
  let last = null;
  /** @param {PointerEvent} e */
  function down(e) {
    last = { x: e.clientX, y: e.clientY };
    /** @type {HTMLElement} */ (e.currentTarget).setPointerCapture(e.pointerId);
  }
  /** @param {PointerEvent} e */
  function move(e) {
    if (!last) return;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    last = { x: e.clientX, y: e.clientY };
    view = {
      yaw: wrapYaw(view.yaw - dx * 0.7),
      pitch: clampPitch(view.pitch + dy * 0.5, MIN_PITCH),
    };
  }
  function up() {
    last = null;
  }
  /** @param {KeyboardEvent} e */
  function key(e) {
    const next = turnByKey(view, e.key, e.shiftKey, MIN_PITCH);
    if (!next) return;
    e.preventDefault();
    view = next;
  }
</script>

<div
  role="slider"
  tabindex="0"
  aria-label="{label}. Kéo hoặc dùng phím mũi tên để xoay khối"
  aria-valuemin={-180}
  aria-valuemax={180}
  aria-valuenow={Math.round(view.yaw)}
  aria-valuetext="Xoay {Math.round(view.yaw)} độ, nhìn từ trên xuống {Math.round(view.pitch)} độ"
  class="cursor-grab touch-none rounded-2xl border-2 border-slate-200 bg-white active:cursor-grabbing {focusRing}"
  onpointerdown={down}
  onpointermove={move}
  onpointerup={up}
  onpointercancel={up}
  onkeydown={key}
>
  <BoxDrawing {boxes} {view} {tone} {width} {height} decorative />
</div>
