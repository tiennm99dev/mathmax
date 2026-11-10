/**
 * Measures for the year-end review of grade 3: time on a clock, months,
 * units of length, mass and capacity, and the words that describe a drawn
 * shape. Pure and DOM-free.
 */

/**
 * "4 giờ 40 phút", "10 giờ", from minutes since 0:00 (hours 1 to 12).
 * @param {number} minutes
 */
export function timeText(minutes) {
  const h = Math.floor(minutes / 60) % 12 || 12;
  const m = minutes % 60;
  return m === 0 ? `${h} giờ` : `${h} giờ ${m} phút`;
}

/**
 * The number a clock hand points at or has just passed, 1 to 12.
 * @param {number} k
 */
const dial = (k) => ((k + 11) % 12) + 1;

/**
 * Where the two hands of a clock point, without the time: "Kim ngắn ở giữa
 * số 4 và số 5, kim dài chỉ số 8."
 * @param {number} minutes since 0:00
 */
export function clockLabel(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hour =
    m === 0 ? `kim ngắn chỉ số ${dial(h)}` : `kim ngắn ở giữa số ${dial(h)} và số ${dial(h + 1)}`;
  const past = m % 5;
  const mark = Math.floor(m / 5);
  const minute =
    past === 0
      ? `kim dài chỉ số ${dial(mark)}`
      : `kim dài chỉ vạch thứ ${past} sau số ${dial(mark)}`;
  return `Đồng hồ: ${hour}, ${minute}.`;
}

/** Days of each month of a year that is not a leap year. */
export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Units of length, mass and capacity the grade 3 book uses, each as its size
 * in the smallest unit of its kind.
 * @type {Readonly<Record<string, { kind: 'length' | 'mass' | 'capacity', size: number }>>}
 */
export const UNITS = {
  mm: { kind: 'length', size: 1 },
  cm: { kind: 'length', size: 10 },
  dm: { kind: 'length', size: 100 },
  m: { kind: 'length', size: 1000 },
  km: { kind: 'length', size: 1000000 },
  g: { kind: 'mass', size: 1 },
  kg: { kind: 'mass', size: 1000 },
  ml: { kind: 'capacity', size: 1 },
  l: { kind: 'capacity', size: 1000 },
};

/**
 * How many `small` make `count` of `big`: convert(4, 'm', 'cm') is 400.
 * @param {number} count
 * @param {string} big
 * @param {string} small
 */
export function convert(count, big, small) {
  return (count * UNITS[big].size) / UNITS[small].size;
}

/** @type {Record<import('./visual.js').ShapeKind, string>} */
const SHAPE_NAMES = {
  triangle: 'Hình tam giác',
  quad: 'Hình tứ giác',
  rect: 'Hình chữ nhật',
  square: 'Hình vuông',
  circle: 'Hình tròn tâm O',
};

/**
 * What a screen reader hears for a drawn shape: its name and the measures
 * written on it.
 * @param {import('./visual.js').ShapeKind} kind
 * @param {string[]} labels
 */
export function shapeLabel(kind, labels) {
  const name = SHAPE_NAMES[kind];
  if (kind === 'circle') {
    return `${name}, ${labels[1] === 'd' ? 'đường kính' : 'bán kính'} ghi ${labels[0]}.`;
  }
  if (kind === 'rect') return `${name}, chiều dài ${labels[0]}, chiều rộng ${labels[1]}.`;
  if (kind === 'square') return `${name}, cạnh ${labels[0]}.`;
  return `${name}, các cạnh ghi ${labels.join(', ')}.`;
}
