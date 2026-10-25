/**
 * Pure layout math shared by the SVG visuals. Angles are degrees clockwise
 * from 12 o'clock, which matches clocks, spinners and pie charts.
 */

/** Series colors, distinct for the common forms of colour blindness. */
export const PALETTE = /** @type {const} */ ([
  '#4F46E5',
  '#1B998B',
  '#F46036',
  '#D7263D',
  '#E9B10A',
  '#5E60CE',
  '#2E86AB',
  '#8D6A9F',
]);

/** @param {number} i */
export function colorAt(i) {
  return PALETTE[((i % PALETTE.length) + PALETTE.length) % PALETTE.length];
}

/**
 * @param {number} v @param {number} lo @param {number} hi
 */
export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

/**
 * Round `v` to the nearest multiple of `step` from `origin`, without float
 * tails: snap(0.30000000000000004, 0.1) is 0.3.
 * @param {number} v @param {number} step @param {number} [origin]
 */
export function snap(v, step, origin = 0) {
  if (!(step > 0)) return v;
  const k = Math.round((v - origin) / step);
  return Number((origin + k * step).toPrecision(12)) + 0;
}

/**
 * A linear map from a value domain onto pixels, with its inverse.
 * @param {number} d0 @param {number} d1 domain ends
 * @param {number} r0 @param {number} r1 range ends (r1 < r0 flips the axis)
 * @returns {{ map: (v: number) => number, invert: (px: number) => number }}
 */
export function linear(d0, d1, r0, r1) {
  const k = d1 === d0 ? 0 : (r1 - r0) / (d1 - d0);
  return {
    map: (v) => r0 + (v - d0) * k,
    invert: (px) => (k === 0 ? d0 : d0 + (px - r0) / k),
  };
}

/**
 * @typedef {{
 *   xMin: number, xMax: number, yMin: number, yMax: number,
 *   width: number, height: number, pad: number, unit: number,
 *   mx: (x: number) => number, my: (y: number) => number,
 *   toX: (px: number) => number, toY: (py: number) => number,
 *   gridX: number[], gridY: number[],
 * }} PlaneScale
 */

/**
 * Pixel layout of a coordinate plane with square units. The width is fixed;
 * the height follows from the y range so a unit is as tall as it is wide.
 * @param {{ xMin?: number, xMax?: number, yMin?: number, yMax?: number, width?: number, pad?: number }} [opts]
 * @returns {PlaneScale}
 */
export function planeScale(opts = {}) {
  const { xMin = -10, xMax = 10, yMin = -10, yMax = 10, width = 420, pad = 30 } = opts;
  const unit = (width - pad * 2) / (xMax - xMin);
  const height = pad * 2 + unit * (yMax - yMin);
  /** @param {number} lo @param {number} hi */
  const ints = (lo, hi) => {
    const out = [];
    for (let v = Math.ceil(lo); v <= hi; v++) out.push(v);
    return out;
  };
  return {
    xMin,
    xMax,
    yMin,
    yMax,
    width,
    height,
    pad,
    unit,
    mx: (x) => pad + (x - xMin) * unit,
    my: (y) => pad + (yMax - y) * unit,
    toX: (px) => (px - pad) / unit + xMin,
    toY: (py) => yMax - (py - pad) / unit,
    gridX: ints(xMin, xMax),
    gridY: ints(yMin, yMax),
  };
}

/**
 * Point at `angle` on a circle.
 * @param {number} cx @param {number} cy @param {number} r @param {number} angle
 * @returns {{ x: number, y: number }}
 */
export function polar(cx, cy, r, angle) {
  const t = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) };
}

/**
 * Angle of point `p` seen from the centre, in [0, 360).
 * @param {number} cx @param {number} cy @param {{ x: number, y: number }} p
 */
export function angleOf(cx, cy, p) {
  const a = (Math.atan2(p.y - cy, p.x - cx) * 180) / Math.PI + 90;
  return ((a % 360) + 360) % 360;
}

/**
 * SVG path of a pie sector from `start` to `end`. A sweep of 360° or more is
 * drawn as two half arcs, because a single arc with equal ends draws nothing.
 * @param {number} cx @param {number} cy @param {number} r
 * @param {number} start @param {number} end
 */
export function sectorPath(cx, cy, r, start, end) {
  const sweep = end - start;
  if (sweep <= 0) return '';
  if (sweep >= 359.999) {
    const top = polar(cx, cy, r, 0);
    const bottom = polar(cx, cy, r, 180);
    return `M ${top.x} ${top.y} A ${r} ${r} 0 1 1 ${bottom.x} ${bottom.y} A ${r} ${r} 0 1 1 ${top.x} ${top.y} Z`;
  }
  const a = polar(cx, cy, r, start);
  const b = polar(cx, cy, r, end);
  const large = sweep > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y} Z`;
}

/**
 * SVG path of an open arc, for jump arrows over a number line.
 * @param {number} x0 @param {number} x1 ends on the baseline
 * @param {number} y baseline
 * @param {number} height how far the arc rises
 */
export function hopPath(x0, x1, y, height) {
  const mid = (x0 + x1) / 2;
  return `M ${x0} ${y} Q ${mid} ${y - height * 2} ${x1} ${y}`;
}
