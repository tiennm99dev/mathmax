/**
 * The spreadsheet behind the Excel simulation: each experiment says what one
 * RANDBETWEEN cell holds and how it shows in Excel, each event says which
 * COUNTIF formula counts it, and `simulate` fills the sheet from a seeded
 * random source so a run can be repeated and tested.
 */

import { rng } from '#lib/core/drill.js';

/**
 * @typedef {object} SheetEvent
 * @property {string} id
 * @property {string} label the event, as the book names it
 * @property {(v: number) => boolean} test whether one outcome belongs to it
 * @property {(range: string) => string} countFormula the Excel formula counting it
 * @property {[number, number]} chance its probability as a fraction p/q
 */

/**
 * @typedef {object} Experiment
 * @property {string} id
 * @property {string} label
 * @property {string} trial what one trial is
 * @property {number} low smallest RANDBETWEEN value
 * @property {number} high largest RANDBETWEEN value
 * @property {string} cellFormula formula in B2 (copied down the column)
 * @property {string} column header of column B
 * @property {(v: number) => string} show what the cell displays
 * @property {{ column: string, formula: (row: number) => string, show: (v: number) => string }} [second]
 *   an optional column C computed from column B
 * @property {SheetEvent[]} events
 */

/** @param {number} v */
const ballColour = (v) => (v === 1 ? 'Xanh' : v <= 3 ? 'Vàng' : v <= 5 ? 'Đỏ' : 'Đen');

/** @type {Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'dong-xu',
    label: 'Tung đồng xu',
    trial: 'tung một đồng xu',
    low: 0,
    high: 1,
    cellFormula: '=IF(RANDBETWEEN(0;1)=1;"S";"N")',
    column: 'Mặt',
    show: (v) => (v === 1 ? 'S' : 'N'),
    events: [
      {
        id: 'sap',
        label: 'Đồng xu xuất hiện mặt sấp',
        test: (v) => v === 1,
        countFormula: (r) => `=COUNTIF(${r};"S")`,
        chance: [1, 2],
      },
      {
        id: 'ngua',
        label: 'Đồng xu xuất hiện mặt ngửa',
        test: (v) => v === 0,
        countFormula: (r) => `=COUNTIF(${r};"N")`,
        chance: [1, 2],
      },
    ],
  },
  {
    id: 'xuc-xac',
    label: 'Gieo xúc xắc',
    trial: 'gieo một con xúc xắc',
    low: 1,
    high: 6,
    cellFormula: '=RANDBETWEEN(1;6)',
    column: 'Số chấm',
    show: (v) => String(v),
    events: [
      {
        id: 'mat-6',
        label: 'Gieo được mặt 6 chấm',
        test: (v) => v === 6,
        countFormula: (r) => `=COUNTIF(${r};6)`,
        chance: [1, 6],
      },
      {
        id: 'chan',
        label: 'Gieo được mặt có số chấm chẵn',
        test: (v) => v % 2 === 0,
        countFormula: (r) => `=COUNTIF(${r};2)+COUNTIF(${r};4)+COUNTIF(${r};6)`,
        chance: [1, 2],
      },
      {
        id: 'lon-hon-4',
        label: 'Gieo được mặt có số chấm lớn hơn 4',
        test: (v) => v > 4,
        countFormula: (r) => `=COUNTIF(${r};">4")`,
        chance: [1, 3],
      },
    ],
  },
  {
    id: 'bong',
    label: 'Lấy bóng trong túi',
    trial: 'lấy một quả bóng rồi trả lại túi',
    low: 1,
    high: 8,
    cellFormula: '=RANDBETWEEN(1;8)',
    column: 'Số bóng',
    show: (v) => String(v),
    second: {
      column: 'Màu',
      formula: (row) => `=IF(B${row}>=6;"Đen";IF(B${row}>=4;"Đỏ";IF(B${row}>=2;"Vàng";"Xanh")))`,
      show: (v) => ballColour(v),
    },
    events: [
      {
        id: 'den',
        label: 'Lấy được quả bóng màu đen',
        test: (v) => v >= 6,
        countFormula: (r) => `=COUNTIF(${r};">=6")`,
        chance: [3, 8],
      },
      {
        id: 'khong-den',
        label: 'Lấy được quả bóng không phải màu đen',
        test: (v) => v < 6,
        countFormula: (r) => `=COUNTIF(${r};"<6")`,
        chance: [5, 8],
      },
      {
        id: 'do',
        label: 'Lấy được quả bóng màu đỏ',
        test: (v) => v === 4 || v === 5,
        countFormula: (r) => `=COUNTIF(${r};4)+COUNTIF(${r};5)`,
        chance: [1, 4],
      },
    ],
  },
];

export { ballColour };

/**
 * One RANDBETWEEN(low; high) value per trial.
 * @param {Experiment} exp @param {number} trials @param {number} seed
 * @returns {number[]}
 */
export function simulate(exp, trials, seed) {
  const rand = rng(seed);
  const span = exp.high - exp.low + 1;
  return Array.from({ length: trials }, () => exp.low + Math.floor(rand() * span));
}

/**
 * How many outcomes belong to the event.
 * @param {number[]} values @param {SheetEvent} event
 */
export function countEvent(values, event) {
  return values.reduce((n, v) => n + (event.test(v) ? 1 : 0), 0);
}

/**
 * Experimental probability after each trial: the running value of
 * (times the event occurred) / (trials so far).
 * @param {number[]} values @param {SheetEvent} event
 * @returns {number[]}
 */
export function runningShare(values, event) {
  let hits = 0;
  return values.map((v, i) => {
    if (event.test(v)) hits++;
    return hits / (i + 1);
  });
}

/**
 * The cell range of the results column for a number of trials, results
 * starting in row 2 under the header.
 * @param {number} trials
 */
export function rangeOf(trials) {
  return `B2:B${trials + 1}`;
}
