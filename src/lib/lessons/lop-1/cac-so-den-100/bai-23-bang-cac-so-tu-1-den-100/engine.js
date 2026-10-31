/**
 * The hundred board of "Bảng các số từ 1 đến 100": ten rows of ten, where a
 * step right adds 1 and a step down adds 10. Two games: colour the numbers
 * that follow a rule, and fill in hidden numbers. Pure and DOM-free.
 */
import { shuffle } from '#lib/core/drill.js';

/** Numbers 1 to 100 in reading order. */
export const BOARD = Array.from({ length: 100 }, (_, i) => i + 1);

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
 * @typedef {{
 *   id: string;
 *   label: string;
 *   task: string;
 *   test: (n: number) => boolean;
 *   why: (n: number) => string;
 *   done: string;
 * }} Pattern
 */

/** @type {Pattern[]} */
export const PATTERNS = [
  {
    id: 'tron-chuc',
    label: 'Số tròn chục',
    task: 'Tô các số tròn chục có hai chữ số: 10, 20, ..., 90.',
    test: (n) => n % 10 === 0 && n < 100,
    why: (n) =>
      n === 100
        ? '100 có ba chữ số. Lần này em chỉ tô các số tròn chục có hai chữ số.'
        : `${n} không có chữ số 0 ở hàng đơn vị.`,
    done: 'Các số tròn chục 10, 20, ..., 90 nằm ở cột cuối. Mỗi số hơn số ngay trên nó 10.',
  },
  {
    id: 'giong-nhau',
    label: 'Hai chữ số giống nhau',
    task: 'Tô các số có hai chữ số giống nhau, như 11.',
    test: (n) => n > 10 && n < 100 && Math.floor(n / 10) === n % 10,
    why: (n) => {
      if (n < 10) return `${n} chỉ có một chữ số.`;
      return n === 100 ? '100 có ba chữ số.' : `${n} có hai chữ số khác nhau.`;
    },
    done: 'Các số 11, 22, 33, ..., 99 nằm trên một đường chéo của bảng.',
  },
  {
    id: 'don-vi-5',
    label: 'Hàng đơn vị là 5',
    task: 'Tô các số có chữ số 5 ở hàng đơn vị: 5, 15, ...',
    test: (n) => n % 10 === 5,
    why: (n) => `${n} có chữ số ${n % 10} ở hàng đơn vị.`,
    done: 'Các số 5, 15, 25, ..., 95 nằm cùng một cột. Đi xuống một ô là thêm 10.',
  },
  {
    id: 'chuc-6',
    label: 'Từ 61 đến 70',
    task: 'Tô cả hàng có số 61: các số từ 61 đến 70.',
    test: (n) => n >= 61 && n <= 70,
    why: (n) => `${n} không nằm trong hàng từ 61 đến 70.`,
    done: 'Hàng này có 61, 62, ..., 70. Sang phải một ô là thêm 1.',
  },
];

/**
 * How many numbers on the board follow a pattern.
 * @param {Pattern} p
 */
export function targetCount(p) {
  return BOARD.filter(p.test).length;
}

/**
 * Hidden cells for the "find the missing number" game: `k` numbers from 2
 * to 99, none touching another left, right, above or below, so every blank
 * has a shown neighbour to reason from.
 * @param {() => number} rand
 * @param {number} [k]
 * @returns {number[]} in board order
 */
export function pickBlanks(rand, k = 6) {
  /** @type {number[]} */
  const chosen = [];
  for (const n of shuffle(rand, BOARD.slice(1, 99))) {
    if (chosen.length === k) break;
    const touches = chosen.some(
      (m) => Math.abs(m - n) === 10 || (Math.abs(m - n) === 1 && cellOf(m).row === cellOf(n).row),
    );
    if (!touches) chosen.push(n);
  }
  return chosen.sort((a, b) => a - b);
}

/**
 * Three options for a hidden number: the answer, a near miss by 1 and a
 * near miss by 10, in increasing order.
 * @param {number} n
 * @returns {number[]}
 */
export function optionsFor(n) {
  const one = n + 1 <= 100 ? n + 1 : n - 1;
  const ten = n + 10 <= 100 ? n + 10 : n - 10;
  return [n, one, ten].sort((a, b) => a - b);
}

/**
 * A hint from a shown neighbour: left first, then above, right, below.
 * @param {number} n
 * @param {readonly number[]} hidden numbers still hidden
 * @returns {string}
 */
export function hintFor(n, hidden) {
  /** @type {Array<['left' | 'up' | 'right' | 'down', string]>} */
  const order = [
    ['left', 'Ô bên trái là {m}. Sang phải một ô là thêm 1.'],
    ['up', 'Ô ngay trên là {m}. Xuống một ô là thêm 10.'],
    ['right', 'Ô bên phải là {m}. Số cần tìm bé hơn {m} một đơn vị.'],
    ['down', 'Ô ngay dưới là {m}. Số cần tìm bé hơn {m} 10 đơn vị.'],
  ];
  for (const [dir, text] of order) {
    const m = neighbour(n, dir);
    if (m !== null && !hidden.includes(m)) return text.replaceAll('{m}', String(m));
  }
  return 'Em đếm từ đầu hàng.';
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
