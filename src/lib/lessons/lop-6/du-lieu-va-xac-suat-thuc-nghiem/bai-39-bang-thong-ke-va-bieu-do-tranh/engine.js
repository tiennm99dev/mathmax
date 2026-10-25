/**
 * Pictograph (biểu đồ tranh) logic: each symbol stands for `scale` objects
 * and a row may end with half a symbol. Counts of symbols move in halves.
 */

/** Most symbols a row of the widget can hold. */
export const MAX_ICONS = 8;

/** The statistics table the learner turns into a pictograph. */
export const TREES = [
  { label: '6A', count: 20 },
  { label: '6B', count: 25 },
  { label: '6C', count: 15 },
  { label: '6D', count: 30 },
];

/** Objects per symbol the learner can choose. */
export const SCALES = [5, 10];

/**
 * The smallest part of a symbol worth drawing: half a symbol only when it
 * stands for a whole number of objects (a scale of 5 trees has no half).
 * @param {number} scale
 */
export function stepFor(scale) {
  return scale % 2 === 0 ? 0.5 : 1;
}

/**
 * A symbol count rounded down to a whole step and kept within the row.
 * @param {number} icons
 * @param {number} [step] 0.5 or 1
 */
export function clampIcons(icons, step = 0.5) {
  // The small slack keeps 2.9999 from dropping a whole step.
  const snapped = Math.floor(icons / step + 1e-9) * step;
  return Math.min(MAX_ICONS, Math.max(0, snapped));
}

/**
 * The symbols to draw: 1 for a whole symbol, 0.5 for the final half.
 * @param {number} icons
 * @returns {number[]}
 */
export function iconParts(icons) {
  const whole = Math.floor(icons);
  const parts = Array.from({ length: whole }, () => 1);
  if (icons - whole >= 0.5) parts.push(0.5);
  return parts;
}

/**
 * A symbol count in words, such as "2 biểu tượng và nửa biểu tượng".
 * @param {number} icons
 */
export function iconText(icons) {
  const whole = Math.floor(icons);
  const half = icons - whole >= 0.5;
  if (whole === 0) return half ? 'nửa biểu tượng' : 'không có biểu tượng nào';
  return half ? `${whole} biểu tượng và nửa biểu tượng` : `${whole} biểu tượng`;
}

/**
 * Compares a row of the pictograph with its table value.
 * @param {number} icons symbols drawn
 * @param {number} scale objects per symbol
 * @param {number} target value in the table
 * @returns {{ value: number, ok: boolean, text: string }}
 */
export function rowStatus(icons, scale, target) {
  const value = icons * scale;
  if (value === target) return { value, ok: true, text: 'Đúng' };
  const gap = Math.abs(target - value);
  const word = iconText(gap / scale);
  return {
    value,
    ok: false,
    text: value < target ? `Thiếu ${gap} cây (${word})` : `Thừa ${gap} cây (${word})`,
  };
}

/**
 * The symbols a value needs, or null when it is not a whole or half count.
 * @param {number} value @param {number} scale
 */
export function iconsFor(value, scale) {
  const icons = value / scale;
  return Number.isInteger(icons * 2) ? icons : null;
}
