/**
 * Comparing two numbers of many digits written one above the other, lined
 * up by place. A number with more digits is greater; with as many digits,
 * the places are checked from the left and the first digit that differs
 * decides. The child steps through the places and picks the sign.
 * Pure and DOM-free.
 */
import { compareSign } from '#lib/core/kid/numbers.js';
import { PLACE_NAMES, compareWhy, digitAt, digitCount } from '../_shared/big-numbers.js';

/** The pairs to compare, in order. */
export const PAIRS = /** @type {const} */ ([
  [693251, 693500],
  [99999, 100000],
  [4520000, 4519999],
  [870354, 870345],
  [125300000, 98999999],
  [2135000, 2153000],
  [7000000, 7000000],
  [700000, 699999],
]);

/**
 * The places of both numbers lined up from the left, as wide as the longer
 * number; a place a number lacks holds null.
 * @param {number} a
 * @param {number} b
 * @returns {{ exp: number, top: number | null, bottom: number | null }[]}
 */
export function columns(a, b) {
  const width = Math.max(digitCount(a), digitCount(b));
  const cell = (/** @type {number} */ n, /** @type {number} */ exp) =>
    exp < digitCount(n) ? digitAt(n, exp) : null;
  return Array.from({ length: width }, (_, i) => {
    const exp = width - 1 - i;
    return { exp, top: cell(a, exp), bottom: cell(b, exp) };
  });
}

/**
 * The checks made one at a time: first the count of digits, then each place
 * from the left until one differs. Each step names the place it looks at
 * (null for the count of digits) and says what it finds.
 * @param {number} a
 * @param {number} b
 * @returns {{ exp: number | null, differs: boolean, text: string }[]}
 */
export function scanSteps(a, b) {
  const ca = digitCount(a);
  const cb = digitCount(b);
  if (ca !== cb) {
    return [
      {
        exp: null,
        differs: true,
        text: `Số trên có ${ca} chữ số, số dưới có ${cb} chữ số. Số nào nhiều chữ số hơn thì lớn hơn.`,
      },
    ];
  }
  /** @type {{ exp: number | null, differs: boolean, text: string }[]} */
  const steps = [
    {
      exp: null,
      differs: false,
      text: `Hai số cùng có ${ca} chữ số. Em so sánh từng hàng, từ trái sang phải.`,
    },
  ];
  for (let exp = ca - 1; exp >= 0; exp--) {
    const p = digitAt(a, exp);
    const q = digitAt(b, exp);
    if (p !== q) {
      steps.push({
        exp,
        differs: true,
        text: `Hàng ${PLACE_NAMES[exp]}: ${p} ${compareSign(p, q)} ${q}. Chữ số này quyết định!`,
      });
      return steps;
    }
    steps.push({ exp, differs: false, text: `Hàng ${PLACE_NAMES[exp]}: cả hai đều là ${p}.` });
  }
  steps.push({ exp: null, differs: false, text: 'Mọi hàng đều giống nhau: hai số bằng nhau.' });
  return steps;
}

/**
 * Checks the sign the child picked.
 * @param {number} a
 * @param {number} b
 * @param {'>' | '<' | '='} sign
 * @returns {{ ok: boolean, text: string }}
 */
export function checkSign(a, b, sign) {
  if (sign === compareSign(a, b)) return { ok: true, text: `Đúng rồi! ${compareWhy(a, b)}` };
  return {
    ok: false,
    text:
      digitCount(a) !== digitCount(b)
        ? 'Chưa đúng. Em đếm số chữ số của hai số nhé.'
        : 'Chưa đúng. Em tìm hàng đầu tiên, từ trái sang, có hai chữ số khác nhau.',
  };
}
