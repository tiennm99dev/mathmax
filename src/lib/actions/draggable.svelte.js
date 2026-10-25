import { clientToSvg, clampToViewBox } from '#lib/utils/svg.js';

/**
 * @typedef {{x: number, y: number}} MutablePoint
 * @typedef {{
 *   point: MutablePoint;
 *   svg: SVGSVGElement | (() => SVGSVGElement | null);
 *   viewBox: { w: number; h: number };
 *   projector?: (p: import('#lib/geom-engine/vec.js').Vec2) => import('#lib/geom-engine/vec.js').Vec2;
 *   pad?: number;
 *   keyStep?: number;
 *   keyShiftStep?: number;
 *   onChange?: () => void;
 *   onEnd?: () => void;
 *   onKeyMove?: (dx: -1 | 0 | 1, dy: -1 | 0 | 1, big: boolean) => void;
 * }} DraggableParams
 */

/** Smallest touch target, in CSS pixels, that every drag handle answers to. */
export const MIN_HIT = 44;

/**
 * Whether a pointer at client (`x`, `y`) lands in a handle's invisible hit
 * area: the handle's on-screen box grown, around its centre, to at least `min`
 * CSS pixels each way. Returns the distance to the centre (for picking the
 * nearest of overlapping handles), or -1 for a miss.
 * @param {{ left: number, top: number, width: number, height: number }} box
 * @param {number} x
 * @param {number} y
 * @param {number} [min]
 */
export function hitDistance(box, x, y, min = MIN_HIT) {
  const cx = box.left + box.width / 2;
  const cy = box.top + box.height / 2;
  const dx = Math.abs(x - cx);
  const dy = Math.abs(y - cy);
  if (dx > Math.max(box.width, min) / 2 || dy > Math.max(box.height, min) / 2) return -1;
  return Math.hypot(dx, dy);
}

/** @type {WeakMap<SVGSVGElement, SVGGraphicsElement[]>} */
const handlesBySvg = new WeakMap();

/**
 * One listener per SVG: a press that misses every control but lands within a
 * handle's MIN_HIT box is replayed on the nearest such handle, so handles
 * drawn small (a 24 px dot on a 390 px phone) are still 44 px touch targets.
 * @param {PointerEvent} e
 */
function onSvgPointerDown(e) {
  const svg = /** @type {SVGSVGElement} */ (e.currentTarget);
  const target = /** @type {Element} */ (e.target);
  const control = target.closest('[tabindex], a, button');
  if (control && control !== svg && svg.contains(control)) return;
  let best = null;
  let bestDistance = Infinity;
  for (const handle of handlesBySvg.get(svg) ?? []) {
    const d = hitDistance(handle.getBoundingClientRect(), e.clientX, e.clientY);
    if (d >= 0 && d < bestDistance) {
      best = handle;
      bestDistance = d;
    }
  }
  if (!best) return;
  e.preventDefault();
  best.dispatchEvent(
    new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      pointerId: e.pointerId,
      pointerType: e.pointerType,
      isPrimary: e.isPrimary,
      clientX: e.clientX,
      clientY: e.clientY,
      button: e.button,
      buttons: e.buttons,
    }),
  );
}

/**
 * @param {SVGGraphicsElement} node
 * @returns {() => void} unregisters the handle
 */
function registerHitArea(node) {
  const svg = node.ownerSVGElement;
  if (!svg) return () => {};
  let handles = handlesBySvg.get(svg);
  if (!handles) {
    handles = [];
    handlesBySvg.set(svg, handles);
    svg.addEventListener('pointerdown', onSvgPointerDown);
  }
  handles.push(node);
  return () => {
    const at = handles.indexOf(node);
    if (at !== -1) handles.splice(at, 1);
    if (handles.length === 0) {
      svg.removeEventListener('pointerdown', onSvgPointerDown);
      handlesBySvg.delete(svg);
    }
  };
}

/**
 * Svelte action: makes the host element draggable inside an SVG viewBox.
 * Mutates `params.point.x/y` so reactivity propagates through `$state`.
 * Also wires arrow-key movement for accessibility.
 *
 * - `onEnd` runs when a pointer drag finishes, for snapping or drop logic.
 * - `onKeyMove` replaces the default arrow-key nudge. It receives the arrow's
 *   direction and whether Shift was held, for controls whose value moves in
 *   steps rather than pixels (an angle, a snapped count).
 *
 * Every handle also gets an invisible hit area of at least MIN_HIT (44) CSS
 * pixels around its on-screen box, whatever the SVG's scale, so a small knob
 * needs no extra transparent shape to be a comfortable touch target.
 *
 * @param {SVGGraphicsElement} node
 * @param {DraggableParams} params
 */
export function draggable(node, params) {
  let active = -1; // pointerId, -1 = idle
  let current = params;

  const getSvg = () => (typeof current.svg === 'function' ? current.svg() : current.svg);

  const apply = (/** @type {{x:number,y:number}} */ raw) => {
    const projected = current.projector ? current.projector(raw) : raw;
    const clamped =
      current.pad === 0
        ? projected
        : clampToViewBox(projected, current.viewBox.w, current.viewBox.h, current.pad);
    current.point.x = clamped.x;
    current.point.y = clamped.y;
    current.onChange?.();
  };

  const onPointerDown = (/** @type {PointerEvent} */ e) => {
    active = e.pointerId;
    node.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const onPointerMove = (/** @type {PointerEvent} */ e) => {
    if (active !== e.pointerId) return;
    const svg = getSvg();
    if (!svg) return;
    apply(clientToSvg(svg, e.clientX, e.clientY, current.viewBox.w, current.viewBox.h));
  };

  const onPointerEnd = (/** @type {PointerEvent} */ e) => {
    if (active !== e.pointerId) return;
    if (node.hasPointerCapture(e.pointerId)) node.releasePointerCapture(e.pointerId);
    active = -1;
    current.onEnd?.();
  };

  const onKeyDown = (/** @type {KeyboardEvent} */ e) => {
    /** @type {-1 | 0 | 1} */
    let dx = 0;
    /** @type {-1 | 0 | 1} */
    let dy = 0;
    switch (e.key) {
      case 'ArrowLeft':
        dx = -1;
        break;
      case 'ArrowRight':
        dx = 1;
        break;
      case 'ArrowUp':
        dy = -1;
        break;
      case 'ArrowDown':
        dy = 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    if (current.onKeyMove) {
      current.onKeyMove(dx, dy, e.shiftKey);
      return;
    }
    const step = e.shiftKey ? (current.keyShiftStep ?? 10) : (current.keyStep ?? 2);
    apply({ x: current.point.x + dx * step, y: current.point.y + dy * step });
  };

  node.addEventListener('pointerdown', onPointerDown);
  node.addEventListener('pointermove', onPointerMove);
  node.addEventListener('pointerup', onPointerEnd);
  node.addEventListener('pointercancel', onPointerEnd);
  node.addEventListener('keydown', onKeyDown);
  const unregister = registerHitArea(node);

  return {
    /** @param {DraggableParams} next */
    update(next) {
      current = next;
    },
    destroy() {
      node.removeEventListener('pointerdown', onPointerDown);
      node.removeEventListener('pointermove', onPointerMove);
      node.removeEventListener('pointerup', onPointerEnd);
      node.removeEventListener('pointercancel', onPointerEnd);
      node.removeEventListener('keydown', onKeyDown);
      unregister();
    },
  };
}
