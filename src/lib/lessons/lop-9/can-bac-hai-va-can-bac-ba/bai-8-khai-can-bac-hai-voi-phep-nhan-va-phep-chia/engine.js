/**
 * Logic of the tiled-square widget. With a = m² and b = n²:
 * - product: a square of area ab is tiled by n × n blocks of area a, so its
 *   side is n·m, that is √(ab) = √a · √b;
 * - quotient: a square of area a is cut into n × n equal pieces of area a/b,
 *   whose side is m/n, that is √(a/b) = √a / √b.
 * The free-number panel compares √a·√b with √(ab) and √a + √b with √(a + b).
 */

import { fracText } from '#lib/core/fractions.js';
import { fmt } from '#lib/core/number-format.js';
import { rootValue } from '../_shared/root-text.js';

/** The perfect squares the widget offers for a and for b. */
export const SQUARES = [1, 4, 9, 16, 25];

/**
 * Side of a perfect square.
 * @param {number} sq
 */
export function side(sq) {
  return Math.round(Math.sqrt(sq));
}

/**
 * The fraction p/q in lowest terms as text ('2/3', '4').
 * @param {number} p
 * @param {number} q
 */
export function ratioText(p, q) {
  const g = gcd(p, q);
  return fracText(p / g, q / g);
}

/**
 * Greatest common divisor of two natural numbers.
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function gcd(x, y) {
  return y === 0 ? x : gcd(y, x % y);
}

/**
 * What the product picture shows.
 * @param {number} a
 * @param {number} b
 */
export function productSentence(a, b) {
  const m = side(a);
  const n = side(b);
  return `Hình vuông lớn ghép từ ${b} hình vuông nhỏ, mỗi hình có diện tích ${a}, nên diện tích là ${a}·${b} = ${a * b}. Mỗi cạnh của nó gồm ${n} cạnh nhỏ dài ${m}, nên cạnh dài ${n}·${m} = ${m * n}. Vậy √${a * b} = √${a}·√${b} = ${m}·${n} = ${m * n}.`;
}

/**
 * What the quotient picture shows.
 * @param {number} a
 * @param {number} b
 */
export function quotientSentence(a, b) {
  const m = side(a);
  const n = side(b);
  const area = ratioText(a, b);
  const edge = ratioText(m, n);
  return `Hình vuông diện tích ${a} (cạnh ${m}) được chia thành ${b} mảnh vuông bằng nhau, mỗi mảnh có diện tích ${a}/${b}${area === `${a}/${b}` ? '' : ` = ${area}`}. Mỗi cạnh lớn gồm ${n} cạnh mảnh, nên cạnh mảnh dài ${m}/${n}${edge === `${m}/${n}` ? '' : ` = ${edge}`}. Vậy √(${a}/${b}) = √${a}/√${b} = ${m}/${n}${edge === `${m}/${n}` ? '' : ` = ${edge}`}.`;
}

/**
 * The learner's guess for the side of the big square, checked.
 * @param {number | null} guess
 * @param {number} a
 * @param {number} b
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function checkSide(guess, a, b) {
  const want = side(a) * side(b);
  if (guess === null) return { tone: 'info', text: 'Nhập một số tự nhiên rồi bấm "Kiểm tra".' };
  if (guess === want) {
    return { tone: 'ok', text: `Đúng: cạnh dài ${want}, và ${want}² = ${a * b}.` };
  }
  if (guess === a * b) {
    return {
      tone: 'warn',
      text: `${a * b} là diện tích, không phải cạnh. Đếm số ô dọc theo một cạnh.`,
    };
  }
  return {
    tone: 'warn',
    text: `Chưa đúng: ${guess}² = ${guess * guess}, khác ${a * b}. Mỗi cạnh có ${side(b)} khối, mỗi khối rộng ${side(a)} ô.`,
  };
}

/**
 * Both sides of the product rule and of the tempting but wrong sum rule.
 * @param {number} a
 * @param {number} b
 */
export function compare(a, b) {
  const product = Math.sqrt(a) * Math.sqrt(b);
  const ofProduct = Math.sqrt(a * b);
  const sum = Math.sqrt(a) + Math.sqrt(b);
  const ofSum = Math.sqrt(a + b);
  return {
    product: rootValue(product),
    ofProduct: rootValue(ofProduct),
    sum: rootValue(sum),
    ofSum: rootValue(ofSum),
    sumEqual: Math.abs(sum - ofSum) < 1e-9,
  };
}

/**
 * The sentence under the free-number panel.
 * @param {number} a
 * @param {number} b
 */
export function compareSentence(a, b) {
  const c = compare(a, b);
  const first = `√${fmt(a)}·√${fmt(b)} ${c.product.sign} ${c.product.text} và √${fmt(a * b)} ${c.ofProduct.sign} ${c.ofProduct.text}: hai số bằng nhau.`;
  const second = c.sumEqual
    ? `Ở đây √${a} + √${b} = √${a + b} chỉ vì một trong hai số bằng 0; nói chung căn của tổng khác tổng các căn.`
    : `Nhưng √${a} + √${b} ${c.sum.sign} ${c.sum.text}, còn √${a + b} ${c.ofSum.sign} ${c.ofSum.text}: căn của tổng khác tổng các căn.`;
  return `${first} ${second}`;
}
