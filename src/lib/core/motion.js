/**
 * Small helpers for animated widgets: a frame loop that
 * reports elapsed seconds, the reduced-motion preference, and wrapping a
 * moving position back into its field.
 */

/**
 * Whether the visitor asked the system for less motion. False outside a
 * browser.
 * @returns {boolean}
 */
export function reducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Calls `onTick(dt)` once per animation frame with the seconds since the
 * previous frame (at most 0.1 s, so a hidden tab does not jump). Returns a
 * function that stops the loop; it works from inside `onTick` too, so a tick
 * that reaches the end can stop the loop without a next frame being booked.
 * @param {(dt: number) => void} onTick
 * @returns {() => void}
 */
export function frameLoop(onTick) {
  if (typeof requestAnimationFrame !== 'function') return () => {};
  /** @type {number | null} */
  let last = null;
  let id = 0;
  let stopped = false;
  /** @param {number} now */
  const step = (now) => {
    if (stopped) return;
    if (last !== null) onTick(Math.min(0.1, (now - last) / 1000));
    last = now;
    if (!stopped) id = requestAnimationFrame(step);
  };
  id = requestAnimationFrame(step);
  return () => {
    stopped = true;
    cancelAnimationFrame(id);
  };
}

/**
 * Wraps `v` into [lo, hi), so something leaving one side comes back on the
 * other.
 * @param {number} v @param {number} lo @param {number} hi
 */
export function wrap(v, lo, hi) {
  const span = hi - lo;
  return ((((v - lo) % span) + span) % span) + lo;
}
