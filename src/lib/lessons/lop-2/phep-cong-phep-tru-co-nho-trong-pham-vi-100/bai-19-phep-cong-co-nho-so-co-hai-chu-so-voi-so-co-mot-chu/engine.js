/**
 * "Phép cộng (có nhớ) số có hai chữ số với số có một chữ số" on counting
 * sticks: the first number lies as bundles of ten and loose sticks, and the
 * child adds the sticks of the second number one at a time. As soon as there
 * are ten loose sticks they are tied into one more bundle, so 35 + 7 reads as
 * 4 bundles and 2 loose sticks, 42. Pure and DOM-free.
 */
import { numberOptions } from '#lib/core/kid/quiz.js';

/**
 * Sticks on the table after `added` of the `b` new sticks went in.
 * @typedef {{ tens: number, ones: number, left: number, tied: boolean }} Table
 */

/**
 * The table after adding `added` sticks of `b` to the number `a`: ten loose
 * sticks are always tied into a bundle at once.
 * @param {number} a
 * @param {number} b
 * @param {number} added
 * @returns {Table}
 */
export function table(a, b, added) {
  const loose = (a % 10) + added;
  return {
    tens: Math.floor(a / 10) + Math.floor(loose / 10),
    ones: loose % 10,
    left: b - added,
    tied: loose >= 10,
  };
}

/**
 * What the table says now, read aloud.
 * @param {number} a
 * @param {number} b
 * @param {number} added
 */
export function tableMessage(a, b, added) {
  const t = table(a, b, added);
  const ua = a % 10;
  if (added === 0) {
    return `Có ${a} que tính: ${Math.floor(a / 10)} bó chục và ${ua} que rời. Em thêm ${b} que nữa, từng que một.`;
  }
  if (!t.tied) {
    return `Có ${ua + added} que rời. Còn thiếu ${10 - ua - added} que nữa là đủ 1 chục.`;
  }
  if (ua + added === 10) {
    return `Đủ 10 que rời, em bó thành 1 chục! Có ${t.tens} chục.${t.left > 0 ? ` Còn ${t.left} que nữa.` : ''}`;
  }
  if (t.left > 0) return `Có ${t.tens} chục và ${t.ones} que rời. Còn ${t.left} que nữa.`;
  return `Xong! Có ${t.tens} chục và ${t.ones} que rời, tức là ${t.tens * 10 + t.ones} que tính.`;
}

/**
 * Answer options for the sum: two numbers near it and the slip of
 * forgetting the carry (35 + 7 written 32), in increasing order.
 * @param {() => number} rand
 * @param {number} a
 * @param {number} b
 */
export function sumOptions(rand, a, b) {
  const right = a + b;
  const near = numberOptions(rand, right, right - 3, Math.min(99, right + 3))
    .options.map(Number)
    .filter((v) => v !== right)
    .slice(0, 2);
  const values = [...near, right - 10, right].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}
