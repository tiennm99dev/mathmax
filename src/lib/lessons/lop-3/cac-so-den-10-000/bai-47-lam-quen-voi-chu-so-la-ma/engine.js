/**
 * The matchstick Roman numerals of "Làm quen với chữ số La Mã": the child
 * lays I, V and X made of matchsticks to write the hour a Roman clock shows,
 * or a number up to XX, and hears why a row of letters is or is not written
 * the right way. Pure and DOM-free.
 */
import { fromRoman, romanSum, sticksOf, toRoman } from '../_shared/numbers-to-10000.js';

/** The numbers to lay, in order: hours on the clock first, then up to 20. */
export const TARGETS = /** @type {const} */ ([3, 4, 6, 9, 12, 8, 11, 13, 14, 17, 19, 20]);

/** Most letters a row may hold; XVIII, the longest numeral to 20, has five. */
export const MAX_LETTERS = 6;

/** The hours of the clock face, I to XII. */
export const HOURS = Array.from({ length: 12 }, (_, i) => ({ hour: i + 1, roman: toRoman(i + 1) }));

/**
 * Adds a letter to the row, unless it is full.
 * @param {string} row
 * @param {'I' | 'V' | 'X'} letter
 */
export function addLetter(row, letter) {
  return row.length >= MAX_LETTERS ? row : row + letter;
}

/**
 * Why a row of letters is not a numeral written the right way, or '' when it
 * is one.
 * @param {string} row
 */
export function wrongWay(row) {
  if (row === '' || fromRoman(row) !== null) return '';
  if (/(.)\1\1\1/.test(row)) return 'Không viết một chữ bốn lần liền nhau.';
  if (/V.*V/.test(row)) return 'Chữ V chỉ viết một lần.';
  if (/VX/.test(row)) return 'Không đặt V bên trái X.';
  if (/II[VX]/.test(row)) return 'Bên trái V hoặc X chỉ đặt một chữ I.';
  return 'Cách xếp này chưa đúng cách viết số La Mã.';
}

/**
 * The live line for a row the child laid for `target`.
 * @param {string} row
 * @param {number} target
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function rowNote(row, target) {
  if (row === '') {
    return { tone: 'info', text: 'Em bấm I, V hoặc X để xếp que diêm.' };
  }
  const sticks = `Em đã dùng ${sticksOf(row)} que diêm.`;
  const reason = wrongWay(row);
  if (reason) return { tone: 'warn', text: `${row}: ${reason}` };
  const value = fromRoman(row);
  if (value === target) {
    return { tone: 'ok', text: `Đúng rồi! ${row} là số ${target}. ${sticks}` };
  }
  const more = (value ?? 0) < target;
  return {
    tone: 'info',
    text: `${row} là số ${value}, ${more ? 'còn bé hơn' : 'lớn hơn'} số cần xếp. ${sticks}`,
  };
}

/**
 * How a numeral is worked out, the book's way: "XIV = 10 + 4", "IX = 10 − 1".
 * @param {number} n 1 to 20
 */
export function romanWhy(n) {
  const roman = toRoman(n);
  if (roman.length === 1) return `${roman} là ${n}.`;
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  if (tens === 0 && (ones === 4 || ones === 9)) {
    const big = ones === 4 ? 5 : 10;
    return `${roman}: I đứng bên trái ${toRoman(big)} nên ${roman} = ${big} − 1 = ${n}.`;
  }
  if (tens === 0) return `${roman} = ${[...roman].map((c) => romanSum(c)).join(' + ')} = ${n}.`;
  if (ones === 0) return `${roman} = ${Array(tens).fill(10).join(' + ')} = ${n}.`;
  return `${roman} = ${Array(tens).fill(10).join(' + ')} + ${toRoman(ones)} = ${Array(tens).fill(10).join(' + ')} + ${ones} = ${n}.`;
}
