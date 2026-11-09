import { arrowView, dragView } from '#lib/geom-engine/solid.js';

/**
 * @typedef {{
 *   view: () => import('#lib/geom-engine/solid.js').View;
 *   onturn: (view: import('#lib/geom-engine/solid.js').View) => void;
 *   options?: import('#lib/geom-engine/solid.js').TurnOptions;
 * }} TurnSolidParams
 */

/**
 * `use:turnSolid` turns a solid drawn with `#lib/geom-engine/solid.js` by
 * pointer drag and arrow keys, the one way every solid view turns: the near
 * side follows the pointer and the arrows (`dragView`, `arrowView`). Put it on
 * the focusable element that wraps the drawing (a `role="slider"` with
 * `touch-none`); it reads the view with `view()` and hands each new one to
 * `onturn`.
 * @param {HTMLElement} node
 * @param {TurnSolidParams} params
 */
export function turnSolid(node, params) {
  let p = params;
  /** @type {{ x: number, y: number } | null} */
  let last = null;

  /** @param {PointerEvent} e */
  function down(e) {
    last = { x: e.clientX, y: e.clientY };
    node.setPointerCapture?.(e.pointerId);
  }
  /** @param {PointerEvent} e */
  function move(e) {
    if (!last) return;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    last = { x: e.clientX, y: e.clientY };
    p.onturn(dragView(p.view(), dx, dy, p.options));
  }
  function up() {
    last = null;
  }
  /** @param {KeyboardEvent} e */
  function key(e) {
    const next = arrowView(p.view(), e.key, e.shiftKey, p.options);
    if (!next) return;
    e.preventDefault();
    p.onturn(next);
  }

  node.addEventListener('pointerdown', down);
  node.addEventListener('pointermove', move);
  node.addEventListener('pointerup', up);
  node.addEventListener('pointercancel', up);
  node.addEventListener('keydown', key);
  return {
    /** @param {TurnSolidParams} next */
    update(next) {
      p = next;
    },
    destroy() {
      node.removeEventListener('pointerdown', down);
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerup', up);
      node.removeEventListener('pointercancel', up);
      node.removeEventListener('keydown', key);
    },
  };
}
