/**
 * Everyday situations in which one quantity y depends on another x. The
 * learner types values of x, the situation gives y, and the table of values
 * shows whether y is directly proportional to x (y : x constant), inversely
 * proportional (x · y constant) or neither.
 */

import { fmt } from '#lib/core/number-format.js';

/** @typedef {'thuan' | 'nghich' | 'khac'} Relation */

/**
 * @typedef {object} Situation
 * @property {string} id
 * @property {string} label short name for the picker
 * @property {string} story the situation, one sentence of plain text
 * @property {string} xName name of x, with its unit
 * @property {string} yName name of y, with its unit
 * @property {string} xUnit
 * @property {string} yUnit
 * @property {number} xMax largest x the learner may type
 * @property {(x: number) => number} f
 * @property {Relation} relation
 * @property {number} k the constant: y = kx, y = k / x, or the slope of y = kx + b
 * @property {number} b fixed part of y = kx + b (0 unless the relation is 'khac')
 * @property {number[]} start the x values filled in at first
 */

/** @type {Situation[]} */
export const SITUATIONS = [
  {
    id: 'inch',
    label: 'Đổi inch ra cm',
    story: 'Đổi độ dài từ inch (in) sang xăng-ti-mét, biết 1 in = 2,54 cm.',
    xName: 'Độ dài theo inch',
    yName: 'Độ dài theo cm',
    xUnit: 'in',
    yUnit: 'cm',
    xMax: 2000,
    f: (x) => 2.54 * x,
    relation: 'thuan',
    k: 2.54,
    b: 0,
    start: [12],
  },
  {
    id: 'giam-gia',
    label: 'Giảm giá 15%',
    story: 'Một cửa hàng giảm giá 15% tất cả các mặt hàng.',
    xName: 'Giá cũ (nghìn đồng)',
    yName: 'Giá mới (nghìn đồng)',
    xUnit: 'nghìn đồng',
    yUnit: 'nghìn đồng',
    xMax: 10000,
    f: (x) => 0.85 * x,
    relation: 'thuan',
    k: 0.85,
    b: 0,
    start: [300],
  },
  {
    id: 'lai',
    label: 'Tiền lãi tiết kiệm',
    story: 'Gửi tiết kiệm kì hạn 12 tháng với lãi suất 5,6% một năm.',
    xName: 'Tiền gửi (triệu đồng)',
    yName: 'Tiền lãi sau 1 năm (triệu đồng)',
    xUnit: 'triệu đồng',
    yUnit: 'triệu đồng',
    xMax: 1000,
    f: (x) => 0.056 * x,
    relation: 'thuan',
    k: 0.056,
    b: 0,
    start: [120],
  },
  {
    id: 'quy-tac-72',
    label: 'Quy tắc 72',
    story:
      'Quy tắc 72: với lãi suất kép r% một năm, số năm để số tiền tăng gấp đôi xấp xỉ t = 72 : r.',
    xName: 'Lãi suất r (% một năm)',
    yName: 'Số năm t để tiền gấp đôi',
    xUnit: '%',
    yUnit: 'năm',
    xMax: 36,
    f: (x) => 72 / x,
    relation: 'nghich',
    k: 72,
    b: 0,
    start: [6],
  },
  {
    id: 'van-toc',
    label: 'Đi quãng đường 120 km',
    story: 'Một ô tô đi quãng đường 120 km với vận tốc không đổi.',
    xName: 'Vận tốc (km/h)',
    yName: 'Thời gian (h)',
    xUnit: 'km/h',
    yUnit: 'h',
    xMax: 150,
    f: (x) => 120 / x,
    relation: 'nghich',
    k: 120,
    b: 0,
    start: [40],
  },
  {
    id: 'taxi',
    label: 'Cước taxi',
    story: 'Một hãng taxi tính 12 nghìn đồng tiền mở cửa, cộng 15 nghìn đồng cho mỗi ki-lô-mét.',
    xName: 'Quãng đường (km)',
    yName: 'Tiền cước (nghìn đồng)',
    xUnit: 'km',
    yUnit: 'nghìn đồng',
    xMax: 100,
    f: (x) => 12 + 15 * x,
    relation: 'khac',
    k: 15,
    b: 12,
    start: [2],
  },
];

/** Rows the table keeps at most. */
export const MAX_ROWS = 6;

/**
 * Situation by id.
 * @param {string} id
 */
export function situation(id) {
  return SITUATIONS.find((s) => s.id === id) ?? SITUATIONS[0];
}

/** @param {number} a @param {number} b */
const same = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

/**
 * What the table of values shows: 'thuan' when every y : x is the same,
 * 'nghich' when every x · y is the same, 'khac' when neither, null when
 * there are fewer than two different values of x to compare.
 * @param {{ x: number, y: number }[]} rows
 * @returns {Relation | null}
 */
export function classify(rows) {
  const xs = new Set(rows.map((r) => r.x));
  if (xs.size < 2) return null;
  const ratio = rows[0].y / rows[0].x;
  const product = rows[0].x * rows[0].y;
  if (rows.every((r) => same(r.y / r.x, ratio))) return 'thuan';
  if (rows.every((r) => same(r.x * r.y, product))) return 'nghich';
  return 'khac';
}

/**
 * Checks a value of x the learner typed for a situation.
 * @param {Situation} s
 * @param {number | null} x
 * @param {number[]} taken the x values already in the table
 * @returns {string} '' when the value can be added, else why not
 */
export function rejectX(s, x, taken) {
  if (x === null || !Number.isFinite(x)) return 'Hãy nhập một số, ví dụ 25 hoặc 2,5.';
  if (x <= 0) return 'Giá trị của x phải lớn hơn 0.';
  if (x > s.xMax) return `Hãy nhập một số không quá ${fmt(s.xMax)}.`;
  if (taken.includes(x)) return 'Giá trị này đã có trong bảng, hãy chọn giá trị khác.';
  return '';
}

/** The relation's name in the book's words. */
export const RELATION_NAME = {
  thuan: 'tỉ lệ thuận',
  nghich: 'tỉ lệ nghịch',
  khac: 'không tỉ lệ thuận, cũng không tỉ lệ nghịch',
};

/**
 * Feedback on the learner's choice for a situation.
 * @param {Situation} s
 * @param {Relation} choice
 * @param {(n: number) => string} num how numbers are written
 * @returns {{ ok: boolean, text: string }}
 */
export function verdict(s, choice, num) {
  if (choice === s.relation) {
    if (s.relation === 'thuan')
      return {
        ok: true,
        text: `Đúng! Thương y : x luôn bằng ${num(s.k)}, nên y tỉ lệ thuận với x theo hệ số tỉ lệ ${num(s.k)}: y = ${num(s.k)} · x. Đồ thị là các điểm nằm trên một đường thẳng đi qua gốc O.`,
      };
    if (s.relation === 'nghich')
      return {
        ok: true,
        text: `Đúng! Tích x · y luôn bằng ${num(s.k)}, nên y tỉ lệ nghịch với x theo hệ số tỉ lệ ${num(s.k)}: y = ${num(s.k)} : x. Khi x tăng gấp đôi thì y giảm đi một nửa.`,
      };
    return {
      ok: true,
      text: `Đúng! Thương y : x và tích x · y đều thay đổi, vì có phần cố định ${num(s.b)} cộng thêm: y = ${num(s.k)} · x + ${num(s.b)}. Hai đại lượng cùng tăng nhưng không tỉ lệ thuận.`,
    };
  }
  /** @type {Record<Relation, string>} */
  const why = {
    thuan: 'Xem cột y : x. Hai đại lượng tỉ lệ thuận khi thương này luôn không đổi.',
    nghich: 'Xem cột x · y. Hai đại lượng tỉ lệ nghịch khi tích này luôn không đổi.',
    khac: 'Kiểm tra lại: cột y : x hoặc cột x · y có giữ nguyên một giá trị không?',
  };
  return { ok: false, text: `Chưa đúng. ${why[choice]}` };
}

/**
 * A round axis maximum at least `v`: 1, 2 or 5 times a power of ten.
 * @param {number} v
 */
export function niceMax(v) {
  if (!(v > 0)) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  for (const m of [1, 2, 5, 10]) if (m * p >= v - 1e-9) return m * p;
  return 10 * p;
}
