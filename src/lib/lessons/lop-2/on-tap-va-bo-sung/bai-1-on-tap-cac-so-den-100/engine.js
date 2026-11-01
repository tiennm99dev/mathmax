/**
 * The hundred board of "Ôn tập các số đến 100" with hidden cells: the child
 * picks a blank, types the number on a keypad and checks it. A wrong entry
 * gets a hint drawn from the mistake (digits swapped, one off along the row,
 * ten off along the column); a right one tells what the number is made of.
 * Pure and DOM-free.
 */
import { shuffle } from '#lib/core/drill.js';
import { placeText, readNumber, tensOnes } from '#lib/core/kid/numbers.js';

/** Numbers 1 to 100 in reading order. */
export const BOARD = Array.from({ length: 100 }, (_, i) => i + 1);

/** How many cells a board hides at each level. */
export const LEVELS = /** @type {const} */ ([
  { id: 'de', label: 'Dễ: 6 ô', blanks: 6 },
  { id: 'kho', label: 'Khó: 12 ô', blanks: 12 },
]);

/** Row (0-9) and column (0-9) of a number on the board. */
export function cellOf(/** @type {number} */ n) {
  return { row: Math.floor((n - 1) / 10), col: (n - 1) % 10 };
}

/**
 * The number one step away on the board, or null past an edge.
 * @param {number} n
 * @param {'left' | 'right' | 'up' | 'down'} dir
 * @returns {number | null}
 */
export function neighbour(n, dir) {
  const { row, col } = cellOf(n);
  if (dir === 'left') return col > 0 ? n - 1 : null;
  if (dir === 'right') return col < 9 ? n + 1 : null;
  if (dir === 'up') return row > 0 ? n - 10 : null;
  return row < 9 ? n + 10 : null;
}

/**
 * `k` hidden numbers from 11 to 99, none next to another (left, right,
 * above or below), so every blank has a shown neighbour to reason from.
 * @param {() => number} rand
 * @param {number} [k]
 * @returns {number[]} in board order
 */
export function pickBlanks(rand, k = 6) {
  /** @type {number[]} */
  const chosen = [];
  for (const n of shuffle(rand, BOARD.slice(10, 99))) {
    if (chosen.length === k) break;
    const touches = chosen.some(
      (m) => Math.abs(m - n) === 10 || (Math.abs(m - n) === 1 && cellOf(m).row === cellOf(n).row),
    );
    if (!touches) chosen.push(n);
  }
  return chosen.sort((a, b) => a - b);
}

/**
 * The entry after a digit key: at most two digits, never starting with 0.
 * @param {string} entry
 * @param {number} digit
 */
export function typeDigit(entry, digit) {
  if (entry.length >= 2) return entry;
  if (entry === '' && digit === 0) return entry;
  return `${entry}${digit}`;
}

/**
 * Why an entry is wrong, or null when it is right. The hint names the
 * mistake but never the number.
 * @param {string} entry what the child typed
 * @param {number} n the hidden number
 * @returns {string | null}
 */
export function mistakeHint(entry, n) {
  const v = Number(entry);
  if (entry === '' || !Number.isInteger(v)) return 'Em chạm các chữ số để viết số vào ô.';
  if (v === n) return null;
  const { tens, ones } = tensOnes(n);
  if (entry.length === 2 && ones !== 0 && v === ones * 10 + tens) {
    return 'Em viết ngược hai chữ số rồi. Chữ số hàng chục viết trước.';
  }
  if (Math.abs(v - n) < 10 && Math.floor(v / 10) === tens) {
    return 'Hàng chục đúng rồi. Em xem lại hàng đơn vị: sang phải một ô là thêm 1.';
  }
  if (v % 10 === ones) {
    return 'Hàng đơn vị đúng rồi. Em xem lại hàng chục: xuống dưới một ô là thêm 10.';
  }
  return `Chưa đúng. Ô này nằm ở hàng thứ ${cellOf(n).row + 1}. Em nhìn ô bên trái và ô ngay trên nhé.`;
}

/**
 * What a number is made of, told when the child fills it in: its reading,
 * tens and ones, and the sum of tens and ones.
 * @param {number} n from 10 to 99
 */
export function placeNote(n) {
  const { tens, ones } = tensOnes(n);
  const parts = `${n} gồm ${placeText(tens, ones)}`;
  const sum = ones === 0 ? `${n} là số tròn chục` : `${n} = ${tens * 10} + ${ones}`;
  return `Số ${n} đọc là "${readNumber(n)}". ${parts}. ${sum}.`;
}

/**
 * The cell a key press moves focus to.
 * @param {number} n
 * @param {string} key
 * @returns {number | null}
 */
export function moveFocus(n, key) {
  if (key === 'ArrowLeft') return neighbour(n, 'left');
  if (key === 'ArrowRight') return neighbour(n, 'right');
  if (key === 'ArrowUp') return neighbour(n, 'up');
  if (key === 'ArrowDown') return neighbour(n, 'down');
  if (key === 'Home') return n - cellOf(n).col;
  if (key === 'End') return n - cellOf(n).col + 9;
  return null;
}
