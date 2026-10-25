/**
 * Rounding a decimal to a chosen place, as the book teaches it. Values are
 * integers in thousandths, so every mark is exact.
 *
 * Rule for a positive number: look at the digit just right of the rounding
 * place. Below 5, keep the rounding digit; 5 or more, add 1 to it. Then drop
 * the digits on the right in the decimal part and turn those in the integer
 * part into 0. A negative number is rounded through its opposite: round the
 * opposite, then put the minus sign back.
 */

import { decStr } from '../_shared/decimal.js';

/** @typedef {{ name: string, u: number, d: number }} Place */

/**
 * Rounding places from left to right: their unit in thousandths and how many
 * decimals the rounded number keeps.
 * @type {Place[]}
 */
export const PLACES = [
  { name: 'hàng trăm', u: 100000, d: 0 },
  { name: 'hàng chục', u: 10000, d: 0 },
  { name: 'hàng đơn vị', u: 1000, d: 0 },
  { name: 'hàng phần mười', u: 100, d: 1 },
  { name: 'hàng phần trăm', u: 10, d: 2 },
];

/**
 * v rounded to the unit u (both in thousandths).
 * @param {number} v @param {number} u
 */
export function roundAt(v, u) {
  const a = Math.abs(v);
  const lo = Math.floor(a / u) * u;
  const r = (a - lo) * 2 >= u ? lo + u : lo;
  return v < 0 ? -r : r;
}

/**
 * The two marks of the place that hold v, left one first.
 * @param {number} v @param {number} u
 * @returns {[number, number]}
 */
export function neighbours(v, u) {
  const a = Math.abs(v);
  const lo = Math.floor(a / u) * u;
  return v < 0 ? [-(lo + u), -lo] : [lo, lo + u];
}

/**
 * A rounded value written with the decimals its place keeps: 24,0 stays 24,0.
 * @param {number} r value in thousandths, a multiple of the place unit
 * @param {Place} place
 */
export function placeText(r, place) {
  return decStr(r / 10 ** (3 - place.d), place.d, true);
}

/**
 * The digit of |v| at the power of ten `pow` (2 for hundreds, −1 for tenths).
 * @param {number} v @param {number} pow
 */
export function digitAt(v, pow) {
  return Math.floor(Math.abs(v) / 10 ** (pow + 3)) % 10;
}

/** @param {number} u */
const powOf = (u) => Math.round(Math.log10(u)) - 3;

/**
 * The characters of v for display, each digit tagged with its power of ten.
 * At least `minDecimals` decimals are written (zeros kept), at most 3.
 * @param {number} v @param {number} minDecimals
 * @returns {Array<{ ch: string, pow: number | null }>}
 */
export function digitCells(v, minDecimals) {
  let d = 3;
  while (d > minDecimals && Math.abs(v) % 10 ** (4 - d) === 0) d--;
  const textValue = decStr(Math.round(v / 10 ** (3 - d)), d, true);
  const intDigits = String(Math.floor(Math.abs(v) / 1000)).length;
  let pow = intDigits - 1;
  return [...textValue].map((ch) => {
    if (!/\d/.test(ch)) return { ch, pow: null };
    return { ch, pow: pow-- };
  });
}

/**
 * The rounding worked out in words.
 * @param {number} v value in thousandths
 * @param {Place} place
 */
export function explain(v, place) {
  const a = Math.abs(v);
  const p = powOf(place.u);
  const digit = digitAt(a, p);
  const next = digitAt(a, p - 1);
  const r = roundAt(v, place.u);
  const up = next >= 5;
  /** @type {string[]} */
  const steps = [];
  if (v < 0) {
    steps.push(`Số âm: làm tròn số đối của nó là ${decStr(a, 3)}, rồi đặt dấu "−" trước kết quả.`);
  }
  steps.push(
    `Chữ số ${place.name} là ${digit}; chữ số ngay bên phải nó là ${next} ${up ? '≥' : '<'} 5.`,
  );
  steps.push(
    up
      ? `Vì ${next} ≥ 5 nên cộng thêm 1 vào chữ số ${place.name}${digit === 9 ? ' (9 thêm 1 thành 10, nhớ 1 sang hàng bên trái)' : ''}.`
      : `Vì ${next} < 5 nên giữ nguyên chữ số ${place.name}.`,
  );
  steps.push(
    place.u > 1000
      ? 'Bỏ phần thập phân; các chữ số ở phần nguyên bên phải hàng làm tròn được thay bằng chữ số 0.'
      : place.d === 0
        ? 'Bỏ toàn bộ phần thập phân.'
        : 'Bỏ đi các chữ số bên phải hàng làm tròn.',
  );
  const result = placeText(r, place);
  steps.push(`Kết quả: ${decStr(v, 3)} ≈ ${result}.`);
  return { digit, next, up, rounded: r, result, steps };
}

/**
 * Reads a number typed in the widget into thousandths, or explains why not.
 * @param {number | null} value the parsed number
 * @returns {{ v: number } | { error: string }}
 */
export function toThousandths(value) {
  if (value === null || !Number.isFinite(value)) {
    return { error: 'Hãy nhập một số thập phân, ví dụ 24,037 hoặc −3,5.' };
  }
  const v = Math.round(value * 1000);
  if (Math.abs(value * 1000 - v) > 1e-6) {
    return { error: 'Hãy nhập số có nhiều nhất ba chữ số ở phần thập phân.' };
  }
  if (Math.abs(v) >= 1e9) return { error: 'Hãy nhập số nhỏ hơn 1 000 000.' };
  return { v };
}

/** Numbers to try, in thousandths. */
export const PRESETS = [24037, -23567, 479633000, 2718, 99960, -1250];
