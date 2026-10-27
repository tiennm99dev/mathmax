/**
 * Two circles (O; R) and (O'; r) with R > r, for the widget of this lesson.
 * Lengths are whole tenths of a centimetre, so d = R + r and d = R − r are
 * exact comparisons. Pure logic, no DOM.
 */

import { formatFixed, formatNumber } from '#lib/core/number-format.js';

/** @typedef {'cat' | 'tiep-xuc-ngoai' | 'tiep-xuc-trong' | 'ngoai-nhau' | 'dung-nhau' | 'dong-tam'} Relation */

/**
 * How two circles meet, from the distance d = OO' between their centres.
 * @param {number} d tenths of a cm
 * @param {number} big the larger radius R, tenths of a cm
 * @param {number} small the smaller radius r, tenths of a cm, 0 < r < R
 * @returns {Relation}
 */
export function relation(d, big, small) {
  if (d === 0) return 'dong-tam';
  if (d > big + small) return 'ngoai-nhau';
  if (d === big + small) return 'tiep-xuc-ngoai';
  if (d > big - small) return 'cat';
  if (d === big - small) return 'tiep-xuc-trong';
  return 'dung-nhau';
}

/** Number of common points of each relation. */
export const COMMON = /** @type {const} */ ({
  cat: 2,
  'tiep-xuc-ngoai': 1,
  'tiep-xuc-trong': 1,
  'ngoai-nhau': 0,
  'dung-nhau': 0,
  'dong-tam': 0,
});

/** The name of each relation, the way the book says it. */
export const WORDS = /** @type {const} */ ({
  cat: 'Cắt nhau',
  'tiep-xuc-ngoai': 'Tiếp xúc ngoài',
  'tiep-xuc-trong': 'Tiếp xúc trong',
  'ngoai-nhau': 'Ở ngoài nhau',
  'dung-nhau': '(O) đựng (O′)',
  'dong-tam': 'Đồng tâm',
});

/** A length in tenths of a cm as text: 21 → '2,1'. */
export const len = (/** @type {number} */ t) => formatNumber(t / 10, 1);

/**
 * Where the common points lie along the line of centres: the foot H of the
 * common chord at distance `a` from O, and half the chord `h`, both in cm.
 * Null when the circles do not meet; h = 0 when they touch.
 * @param {number} d cm, > 0
 * @param {number} big cm
 * @param {number} small cm
 */
export function chordFoot(d, big, small) {
  if (d <= 0 || d > big + small + 1e-9 || d < big - small - 1e-9) return null;
  const a = (d * d + big * big - small * small) / (2 * d);
  return { a, h: Math.sqrt(Math.max(0, big * big - a * a)) };
}

/**
 * The live sentence comparing d with R + r and R − r (all in tenths).
 * @param {number} d
 * @param {number} big
 * @param {number} small
 */
export function sentence(d, big, small) {
  const sum = len(big + small);
  const diff = len(big - small);
  const dd = len(d);
  switch (relation(d, big, small)) {
    case 'cat': {
      const f = /** @type {{ a: number, h: number }} */ (chordFoot(d / 10, big / 10, small / 10));
      return `R − r = ${diff} < d = ${dd} < R + r = ${sum}: hai đường tròn cắt nhau tại hai điểm A, B. Đường nối tâm OO′ là đường trung trực của dây chung AB, AB ≈ ${formatFixed(2 * f.h, 2)} cm.`;
    }
    case 'tiep-xuc-ngoai':
      return `d = R + r = ${sum}: hai đường tròn tiếp xúc ngoài tại A; tiếp điểm A nằm trên đoạn nối tâm OO′.`;
    case 'tiep-xuc-trong':
      return `d = R − r = ${diff}: hai đường tròn tiếp xúc trong tại A; tiếp điểm A nằm trên đường nối tâm, O′ nằm giữa O và A.`;
    case 'ngoai-nhau':
      return `d = ${dd} > R + r = ${sum}: hai đường tròn ở ngoài nhau, không có điểm chung.`;
    case 'dung-nhau':
      return `d = ${dd} < R − r = ${diff}: đường tròn (O) đựng đường tròn (O′), không có điểm chung.`;
    default:
      return `d = 0: O′ trùng O, hai đường tròn đồng tâm (bán kính khác nhau), không có điểm chung.`;
  }
}
