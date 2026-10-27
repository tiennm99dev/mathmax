/**
 * The arithmetic behind the cut-axis widget: where the value axis starts
 * decides how tall a bar or how steep a line looks, while the numbers stay
 * the same. Comparing what the picture shows with what the data says is how
 * a misleading chart is caught.
 */

/**
 * @typedef {object} AxisData
 * @property {string} title
 * @property {string} unit
 * @property {string[]} labels
 * @property {number[]} values
 * @property {number} maxBase the highest start the slider allows
 * @property {number} step slider step
 */

/** @type {AxisData} */
export const BAR_DATA = {
  title: 'Số sản phẩm bán được trong tháng của bốn nhân viên',
  unit: 'Sản phẩm',
  labels: ['An', 'Bình', 'Cường', 'Dũng'],
  values: [96, 100, 104, 108],
  maxBase: 94,
  step: 2,
};

/** @type {AxisData} */
export const LINE_DATA = {
  title: 'Số học sinh của một trường qua các năm',
  unit: 'Học sinh',
  labels: ['2020', '2021', '2022', '2023', '2024'],
  values: [1200, 1210, 1225, 1230, 1250],
  maxBase: 1190,
  step: 10,
};

/**
 * The share of the plot height a value reaches when the axis runs from
 * `base` to `top`; a value below the base gets no height at all.
 * @param {number} value @param {number} base @param {number} top
 */
export function heightShare(value, base, top) {
  return Math.max(0, (value - base) / (top - base));
}

/**
 * How many times taller the bar of `b` looks than the bar of `a` when the
 * axis starts at `base` (both values above the base).
 * @param {number} a @param {number} b @param {number} base
 */
export function looksTimes(a, b, base) {
  return (b - base) / (a - base);
}

/**
 * Percentage change from `from` to `to`.
 * @param {number} from @param {number} to
 */
export function percentChange(from, to) {
  return ((to - from) / from) * 100;
}
