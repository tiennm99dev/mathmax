/**
 * @typedef {Readonly<{ min: number, max: number, step: number, ticks: number[] }>} Axis
 */

/**
 * A "nice" step (1, 2 or 5 times a power of ten) that splits `span` into
 * about `count` parts.
 * @param {number} span positive
 * @param {number} [count]
 */
export function niceStep(span, count = 5) {
  if (!(span > 0)) return 1;
  const raw = span / Math.max(1, count);
  const power = 10 ** Math.floor(Math.log10(raw));
  // The small slack keeps float noise (1.0000000002) from bumping a step up.
  const ratio = raw / power - 1e-9;
  const nice = ratio <= 1 ? 1 : ratio <= 2 ? 2 : ratio <= 5 ? 5 : 10;
  return nice * power;
}

/**
 * Axis bounds widened to whole steps, and the tick values between them. A
 * chart of counts uses `niceAxis(0, max)`.
 * @param {number} min
 * @param {number} max
 * @param {number} [count] about how many intervals
 * @returns {Axis}
 */
export function niceAxis(min, max, count = 5) {
  if (max < min) [min, max] = [max, min];
  if (max === min) max = min + 1;
  const step = niceStep(max - min, count);
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  // Rounding keeps ticks such as 0.30000000000000004 out of labels.
  for (let i = 0; lo + i * step <= hi + step / 2; i++) ticks.push(roundTo(lo + i * step, step));
  return { min: roundTo(lo, step), max: roundTo(hi, step), step, ticks };
}

/**
 * The value axis a spreadsheet would draw from `base` (a cut axis when
 * `base` is above 0): a round step that
 * splits the range into about six parts, a top one step at or above the
 * largest value, and the gridlines from `base` up to the top.
 * @param {number} base @param {number} maxValue
 * @returns {{ top: number, ticks: number[] }}
 */
export function axisFrom(base, maxValue) {
  const step = niceStep(maxValue - base, 6);
  const top = Math.ceil((maxValue + step / 10) / step) * step;
  const ticks = [base];
  for (let v = Math.ceil(base / step) * step; v <= top + 1e-9; v += step) {
    if (v - base > step / 3) ticks.push(Math.round(v * 1e6) / 1e6);
  }
  return { top, ticks };
}

/**
 * Round to the precision of `step`.
 * @param {number} v @param {number} step
 */
function roundTo(v, step) {
  const places = Math.max(0, -Math.floor(Math.log10(step)) + 1);
  return Number(v.toFixed(places)) + 0;
}
