/**
 * Pure logic of the "bảng dữ kiện" widget: a word problem is analysed in a
 * table whose two rows become the two equations of a system. The learner
 * places expression tiles into the cells; each row reads
 * `cell 1 + cell 2 = total`.
 */

import { solveSystem } from '#lib/algebra-engine/system.js';
import { formatNumber } from '#lib/core/number-format.js';

/**
 * @typedef {{ tile: string, why: string }} Cell
 * @typedef {{ label: string, cells: [Cell, Cell, Cell], eq: { a: number, b: number, c: number } }} Row
 * @typedef {object} Problem
 * @property {string} id
 * @property {string} label short name for the problem picker
 * @property {string} story the problem as the book states it
 * @property {string} unknowns how the two unknowns are chosen
 * @property {string} condition the conditions on the unknowns
 * @property {[string, string, string]} cols column heads
 * @property {[Row, Row]} rows
 * @property {string[]} extra distractor tiles
 * @property {(x: number, y: number) => boolean} valid whether a solution meets the conditions
 * @property {(x: number, y: number) => string} answer the final answer sentence
 */

/** @type {Problem[]} */
export const PROBLEMS = [
  {
    id: 'ga-cho',
    label: 'Gà và chó',
    story:
      'Vừa gà vừa chó, bó lại cho tròn, ba mươi sáu con, một trăm chân chẵn. Hỏi có bao nhiêu con gà, bao nhiêu con chó?',
    unknowns: 'Gọi x là số gà, y là số chó.',
    condition: 'x, y là số tự nhiên khác 0 và nhỏ hơn 36.',
    cols: ['Gà', 'Chó', 'Cả hai'],
    rows: [
      {
        label: 'Số con',
        cells: [
          { tile: 'x', why: 'Ô này là số con gà, chính là ẩn đã gọi.' },
          { tile: 'y', why: 'Ô này là số con chó, chính là ẩn đã gọi.' },
          { tile: '36', why: 'Ô này là tổng số con gà và chó mà đề bài cho.' },
        ],
        eq: { a: 1, b: 1, c: 36 },
      },
      {
        label: 'Số chân',
        cells: [
          { tile: '2x', why: 'Mỗi con gà có 2 chân, x con gà có bao nhiêu chân?' },
          { tile: '4y', why: 'Mỗi con chó có 4 chân, y con chó có bao nhiêu chân?' },
          { tile: '100', why: 'Ô này là tổng số chân mà đề bài cho.' },
        ],
        eq: { a: 2, b: 4, c: 100 },
      },
    ],
    extra: ['4x', '2y', '136'],
    valid: (x, y) => Number.isInteger(x) && Number.isInteger(y) && x > 0 && y > 0,
    answer: (x, y) => `Có ${formatNumber(x)} con gà và ${formatNumber(y)} con chó.`,
  },
  {
    id: 've',
    label: 'Bán vé',
    story:
      'Một rạp chiếu phim bán vé người lớn giá 60 nghìn đồng và vé trẻ em giá 40 nghìn đồng. Một buổi chiếu bán được 250 vé, thu được 13\u202f000 nghìn đồng. Hỏi bán được bao nhiêu vé mỗi loại?',
    unknowns: 'Gọi x là số vé người lớn, y là số vé trẻ em.',
    condition: 'x, y là số tự nhiên nhỏ hơn 250.',
    cols: ['Người lớn', 'Trẻ em', 'Cả hai'],
    rows: [
      {
        label: 'Số vé',
        cells: [
          { tile: 'x', why: 'Ô này là số vé người lớn, chính là ẩn đã gọi.' },
          { tile: 'y', why: 'Ô này là số vé trẻ em, chính là ẩn đã gọi.' },
          { tile: '250', why: 'Ô này là tổng số vé bán được.' },
        ],
        eq: { a: 1, b: 1, c: 250 },
      },
      {
        label: 'Số tiền (nghìn đồng)',
        cells: [
          { tile: '60x', why: 'Số tiền vé người lớn bằng giá một vé nhân số vé.' },
          { tile: '40y', why: 'Số tiền vé trẻ em bằng giá một vé nhân số vé.' },
          { tile: '13\u202f000', why: 'Ô này là tổng số tiền thu được, tính bằng nghìn đồng.' },
        ],
        eq: { a: 60, b: 40, c: 13000 },
      },
    ],
    extra: ['40x', '60y', '100'],
    valid: (x, y) => Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0,
    answer: (x, y) => `Bán được ${formatNumber(x)} vé người lớn và ${formatNumber(y)} vé trẻ em.`,
  },
  {
    id: 'trai-cay',
    label: 'Mua trái cây',
    story:
      'Lần thứ nhất, Mai mua 3 kg táo và 2 kg cam hết 190 nghìn đồng. Lần thứ hai, Mai mua 2 kg táo và 3 kg cam hết 185 nghìn đồng. Tính giá 1 kg táo và giá 1 kg cam.',
    unknowns: 'Gọi x (nghìn đồng) là giá 1 kg táo, y (nghìn đồng) là giá 1 kg cam.',
    condition: 'x > 0, y > 0.',
    cols: ['Tiền táo', 'Tiền cam', 'Tổng tiền'],
    rows: [
      {
        label: 'Lần thứ nhất',
        cells: [
          { tile: '3x', why: 'Tiền mua 3 kg táo bằng 3 nhân giá 1 kg táo.' },
          { tile: '2y', why: 'Tiền mua 2 kg cam bằng 2 nhân giá 1 kg cam.' },
          { tile: '190', why: 'Ô này là số tiền lần thứ nhất.' },
        ],
        eq: { a: 3, b: 2, c: 190 },
      },
      {
        label: 'Lần thứ hai',
        cells: [
          { tile: '2x', why: 'Tiền mua 2 kg táo bằng 2 nhân giá 1 kg táo.' },
          { tile: '3y', why: 'Tiền mua 3 kg cam bằng 3 nhân giá 1 kg cam.' },
          { tile: '185', why: 'Ô này là số tiền lần thứ hai.' },
        ],
        eq: { a: 2, b: 3, c: 185 },
      },
    ],
    extra: ['5x', '5y', '375'],
    valid: (x, y) => x > 0 && y > 0,
    answer: (x, y) =>
      `Giá 1 kg táo là ${formatNumber(x)} nghìn đồng, giá 1 kg cam là ${formatNumber(y)} nghìn đồng.`,
  },
  {
    id: 'nang-suat',
    label: 'Vượt mức',
    story:
      'Năm ngoái, hai đơn vị sản xuất thu hoạch được 720 tấn thóc. Năm nay, đơn vị thứ nhất làm vượt mức 15%, đơn vị thứ hai làm vượt mức 12% so với năm ngoái, nên cả hai thu hoạch được 819 tấn thóc. Hỏi năm ngoái mỗi đơn vị thu hoạch được bao nhiêu tấn thóc?',
    unknowns: 'Gọi x, y (tấn) lần lượt là số thóc năm ngoái của đơn vị thứ nhất và đơn vị thứ hai.',
    condition: '0 < x < 720, 0 < y < 720.',
    cols: ['Đơn vị 1', 'Đơn vị 2', 'Cả hai'],
    rows: [
      {
        label: 'Năm ngoái (tấn)',
        cells: [
          { tile: 'x', why: 'Ô này là số thóc năm ngoái của đơn vị thứ nhất, chính là ẩn đã gọi.' },
          { tile: 'y', why: 'Ô này là số thóc năm ngoái của đơn vị thứ hai, chính là ẩn đã gọi.' },
          { tile: '720', why: 'Ô này là tổng số thóc năm ngoái.' },
        ],
        eq: { a: 1, b: 1, c: 720 },
      },
      {
        label: 'Năm nay (tấn)',
        cells: [
          {
            tile: '1,15x',
            why: 'Vượt mức 15% nghĩa là bằng 100% + 15% = 115% của năm ngoái.',
          },
          {
            tile: '1,12y',
            why: 'Vượt mức 12% nghĩa là bằng 100% + 12% = 112% của năm ngoái.',
          },
          { tile: '819', why: 'Ô này là tổng số thóc năm nay.' },
        ],
        eq: { a: 1.15, b: 1.12, c: 819 },
      },
    ],
    extra: ['0,15x', '0,12y', '99'],
    valid: (x, y) => x > 0 && y > 0 && x < 720 && y < 720,
    answer: (x, y) =>
      `Năm ngoái đơn vị thứ nhất thu hoạch được ${formatNumber(x)} tấn, đơn vị thứ hai ${formatNumber(y)} tấn thóc.`,
  },
];

/** @typedef {Record<string, string>} Placements cell key → tile */

/**
 * @param {number} row
 * @param {number} col
 */
export function cellKey(row, col) {
  return `${row}-${col}`;
}

/**
 * Every tile of a problem: the right ones and the distractors, in a fixed
 * mixed order so the bank never lists them cell by cell.
 * @param {Problem} problem
 */
export function tiles(problem) {
  const right = problem.rows.flatMap((r) => r.cells.map((c) => c.tile));
  const all = [...right, ...problem.extra];
  // Interleave: a stride coprime with the length visits every tile once.
  const stride = all.length % 4 === 0 ? 3 : 4;
  return all.map((_, i) => all[(i * stride) % all.length]);
}

/**
 * Tries to put `tile` into a cell. A wrong tile is not placed; the result
 * explains what the cell should hold.
 * @param {Problem} problem
 * @param {Placements} placements
 * @param {number} row
 * @param {number} col
 * @param {string} tile
 * @returns {{ placements: Placements, ok: boolean, message: string }}
 */
export function placeTile(problem, placements, row, col, tile) {
  const cell = problem.rows[row].cells[col];
  if (cell.tile !== tile) {
    return {
      placements,
      ok: false,
      message: `"${tile}" chưa đúng ở ô ${problem.rows[row].label.toLowerCase()} – ${problem.cols[col].toLowerCase()}. ${cell.why}`,
    };
  }
  return {
    placements: { ...placements, [cellKey(row, col)]: tile },
    ok: true,
    message: `Đúng: ${cell.why}`,
  };
}

/**
 * Tiles not yet placed.
 * @param {Problem} problem
 * @param {Placements} placements
 */
export function bank(problem, placements) {
  const used = new Set(Object.values(placements));
  return tiles(problem).filter((t) => !used.has(t));
}

/**
 * The equation a row gives once its three cells are filled, else null.
 * @param {Problem} problem
 * @param {Placements} placements
 * @param {number} row
 */
export function rowEquation(problem, placements, row) {
  const [a, b, c] = [0, 1, 2].map((col) => placements[cellKey(row, col)]);
  if (a === undefined || b === undefined || c === undefined) return null;
  return `${a} + ${b} = ${c}`;
}

/**
 * Whether every cell is filled.
 * @param {Problem} problem
 * @param {Placements} placements
 */
export function isComplete(problem, placements) {
  return problem.rows.every((_, r) => rowEquation(problem, placements, r) !== null);
}

/**
 * The solution of the problem's system, rounded to clear float noise from
 * decimal coefficients.
 * @param {Problem} problem
 * @returns {{ x: number, y: number }}
 */
export function solve(problem) {
  const s = solveSystem(problem.rows[0].eq, problem.rows[1].eq);
  if (s.kind !== 'unique') throw new Error(`${problem.id}: system has no unique solution`);
  const round = (/** @type {number} */ v) => Math.round(v * 1e6) / 1e6;
  return { x: round(s.point.x), y: round(s.point.y) };
}

/**
 * TeX for a row's equation, with the decimal comma braced: '1{,}15x + 1{,}12y = 819'.
 * @param {Problem} problem
 * @param {number} row
 */
export function rowTex(problem, row) {
  const [a, b, c] = problem.rows[row].cells.map((cell) =>
    cell.tile.replace(/,/g, '{,}').replace(/\s/g, '\\,'),
  );
  return `${a} + ${b} = ${c}`;
}
