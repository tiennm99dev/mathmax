/**
 * Adding and subtracting numbers within 100 000 in columns, the way the grade
 * 3 book reads them:
 *
 * - 45 637 + 28 485: "7 cộng 5 bằng 12, viết 2, nhớ 1. 3 cộng 8 bằng 11, thêm
 *   1 bằng 12, viết 2, nhớ 1. …"
 * - 23 285 − 12 967: "5 không trừ được 7, lấy 15 trừ 7 bằng 8, viết 8, nhớ 1.
 *   6 thêm 1 bằng 7, 8 trừ 7 bằng 1, viết 1. …"
 *
 * Also what a learner does column by column on the board, what the board shows
 * after each action, random tasks of each case and answer options built from
 * the slips children make. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {'+' | '-'} Op */
/** @typedef {{ a: number, b: number }} Task */

/** The name of each column, from the ones. */
export const PLACE_NAMES = /** @type {const} */ (['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn']);

/** How many columns the board has: the results stay within 99 999. */
export const COLUMNS = 5;

/** The largest result a drawn task may have. */
export const LIMIT = 99999;

/** The sign the book prints for each operation. */
export const SIGNS = /** @type {const} */ ({ '+': '+', '-': '−' });

/** The sign read aloud. */
export const SIGN_WORDS = /** @type {const} */ ({ '+': 'cộng', '-': 'trừ' });

/**
 * The digits of a number, ones first.
 * @param {number} n
 */
export const digitsOf = (n) => String(n).split('').reverse().map(Number);

/**
 * The result of a calculation.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export const resultOf = (a, b, op) => (op === '+' ? a + b : a - b);

/**
 * The calculation without its result: "45 637 + 28 485".
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export const opText = (a, b, op) => `${fmt(a)} ${SIGNS[op]} ${fmt(b)}`;

/**
 * The calculation with its result: "45 637 + 28 485 = 74 122".
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export const equation = (a, b, op) => `${opText(a, b, op)} = ${fmt(resultOf(a, b, op))}`;

/**
 * One column of a calculation, ones first.
 * @typedef {object} Step
 * @property {number} col 0 for the ones, 1 for the tens, …
 * @property {number | null} top the digit of the first number, null when it is too short
 * @property {number | null} bottom the digit of the second number
 * @property {number} carryIn what the column before carried over
 * @property {number} carryOut what this column carries over
 * @property {number} need what is taken away in a subtraction: `bottom` plus the carry
 * @property {number} plain what the column gives with the carry forgotten
 * @property {number} digit what is written (all of it in the last column)
 * @property {boolean} blank a leading 0 of a difference, not written
 * @property {boolean} borrow a subtraction column whose top digit is too small
 * @property {string} say how the book says it, without the final full stop
 */

/**
 * The tail of a column reading.
 * @param {number} digit
 * @param {number} carryOut
 */
const writeText = (digit, carryOut) => `, viết ${digit}${carryOut > 0 ? `, nhớ ${carryOut}` : ''}`;

/**
 * The columns of an addition, ones first. The last column writes its whole sum.
 * @param {number} a
 * @param {number} b
 * @returns {Step[]}
 */
export function addSteps(a, b) {
  const [da, db] = [digitsOf(a), digitsOf(b)];
  const n = Math.max(da.length, db.length);
  /** @type {Step[]} */
  const steps = [];
  let carryIn = 0;
  for (let col = 0; col < n; col++) {
    const top = da[col] ?? null;
    const bottom = db[col] ?? null;
    const plain = (top ?? 0) + (bottom ?? 0);
    const total = plain + carryIn;
    const last = col === n - 1;
    const digit = last ? total : total % 10;
    const carryOut = last ? 0 : Math.floor(total / 10);
    let say;
    if (top === null || bottom === null) {
      const one = /** @type {number} */ (top ?? bottom);
      say =
        carryIn > 0
          ? `${one} thêm ${carryIn} bằng ${total}${writeText(digit, carryOut)}`
          : `Hạ ${one}, viết ${one}`;
    } else {
      const added = carryIn > 0 ? `, thêm ${carryIn} bằng ${total}` : '';
      say = `${top} cộng ${bottom} bằng ${plain}${added}${writeText(digit, carryOut)}`;
    }
    steps.push({
      col,
      top,
      bottom,
      carryIn,
      carryOut,
      need: 0,
      plain: last ? plain : plain % 10,
      digit,
      blank: false,
      borrow: false,
      say,
    });
    carryIn = carryOut;
  }
  return steps;
}

/**
 * The columns of a subtraction `a − b` with `a ≥ b`, ones first. A leading 0
 * of the difference is not written.
 * @param {number} a
 * @param {number} b
 * @returns {Step[]}
 */
export function subSteps(a, b) {
  const [da, db] = [digitsOf(a), digitsOf(b)];
  const length = String(a - b).length;
  /** @type {Step[]} */
  const steps = [];
  let carryIn = 0;
  da.forEach((top, col) => {
    const bottom = db[col] ?? null;
    const need = (bottom ?? 0) + carryIn;
    const borrow = top < need;
    const digit = top + (borrow ? 10 : 0) - need;
    const blank = col > 0 && col >= length && digit === 0;
    const added = carryIn > 0 && bottom !== null ? `${bottom} thêm ${carryIn} bằng ${need}, ` : '';
    let say;
    if (bottom === null && carryIn === 0) say = `Hạ ${top}, viết ${top}`;
    else if (borrow) {
      say = `${added}${top} không trừ được ${need}, lấy ${top + 10} trừ ${need} bằng ${digit}${writeText(digit, 1)}`;
    } else {
      const tail = blank ? ', không cần viết' : writeText(digit, 0);
      say = `${added}${top} trừ ${need} bằng ${digit}${tail}`;
    }
    const plain = (top - (bottom ?? 0) + 10) % 10;
    steps.push({
      col,
      top,
      bottom,
      carryIn,
      carryOut: borrow ? 1 : 0,
      need,
      plain,
      digit,
      blank,
      borrow,
      say,
    });
    carryIn = borrow ? 1 : 0;
  });
  return steps;
}

/**
 * The columns of a calculation, ones first.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export const stepsOf = (a, b, op) => (op === '+' ? addSteps(a, b) : subSteps(a, b));

/**
 * The whole calculation in words, then the equation.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function columnWords(a, b, op) {
  const says = stepsOf(a, b, op).map((s) => `${s.say}.`);
  return `${says.join(' ')} Vậy ${equation(a, b, op)}.`;
}

/**
 * How many columns carry over.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export const carriesOf = (a, b, op) => stepsOf(a, b, op).filter((s) => s.carryOut > 0).length;

/**
 * The result with every carry forgotten, the slip children make most.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function noCarry(a, b, op) {
  return stepsOf(a, b, op).reduce((sum, s) => sum + s.plain * 10 ** s.col, 0);
}

/**
 * One thing a learner does on the board: `borrow` takes 1 from the next column
 * of a subtraction, `digit` writes a result digit.
 * @typedef {{ type: 'borrow' | 'digit', step: Step }} Action
 */

/**
 * The actions of a calculation, in order.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @returns {Action[]}
 */
export function planOf(a, b, op) {
  return stepsOf(a, b, op).flatMap((step) => {
    /** @type {Action[]} */
    const actions = [];
    if (step.borrow) actions.push({ type: 'borrow', step });
    if (!step.blank) actions.push({ type: 'digit', step });
    return actions;
  });
}

/**
 * What the board shows after the first `done` actions, every array ones first:
 * the digits written, the small carries (above the column for +, beside the
 * second number's digit for −), the top digits that borrowed 10, and the
 * column being worked on.
 * @typedef {{
 *   written: string[];
 *   carries: number[];
 *   borrowed: boolean[];
 *   active: number | null;
 *   finished: number;
 * }} Sheet
 */

/**
 * The board after `done` actions. `finished` counts the columns done, from
 * the ones.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @param {number} done
 * @returns {Sheet}
 */
export function sheetAt(a, b, op, done) {
  const plan = planOf(a, b, op);
  const size = Math.max(COLUMNS, stepsOf(a, b, op).length + 1);
  const written = Array.from({ length: size }, () => '');
  const carries = Array.from({ length: size }, () => 0);
  const borrowed = Array.from({ length: size }, () => false);
  for (const { type, step } of plan.slice(0, done)) {
    if (type === 'borrow') {
      borrowed[step.col] = true;
      carries[step.col + 1] = 1;
    } else {
      written[step.col] = String(step.digit);
      if (op === '+' && step.carryOut > 0) carries[step.col + 1] = step.carryOut;
    }
  }
  const active = plan[done]?.step.col ?? null;
  const finished = active ?? stepsOf(a, b, op).length;
  return { written, carries, borrowed, active, finished };
}

/**
 * What the board asks for next.
 * @param {Action} action
 * @param {Op} op
 */
export function askFor({ type, step }, op) {
  const row = `Hàng ${PLACE_NAMES[step.col]}`;
  const { top, bottom, carryIn } = step;
  const ask = 'Em viết chữ số nào?';
  if (op === '+') {
    if (top === null || bottom === null) {
      const one = top ?? bottom;
      return carryIn > 0
        ? `${row}: ${one} thêm ${carryIn} đã nhớ. ${ask}`
        : `${row}: chỉ có chữ số ${one}. Em hạ xuống, viết chữ số nào?`;
    }
    const added = carryIn > 0 ? `, thêm ${carryIn} đã nhớ` : '';
    return `${row}: ${top} cộng ${bottom}${added}. ${ask}`;
  }
  const added = carryIn > 0 && bottom !== null ? `${bottom} thêm 1 bằng ${step.need}. ` : '';
  if (type === 'borrow') {
    return `${row}: ${added}${top} không trừ được ${step.need}. Em mượn 1 ${PLACE_NAMES[step.col + 1]} nhé.`;
  }
  if (step.borrow) {
    return `${row}: lấy ${/** @type {number} */ (top) + 10} trừ ${step.need}. ${ask}`;
  }
  if (bottom === null && carryIn === 0) {
    return `${row}: chỉ có chữ số ${top}. Em hạ xuống, viết chữ số nào?`;
  }
  return `${row}: ${added}${top} trừ ${step.need}. ${ask}`;
}

/**
 * The words on the borrow button: "Mượn 1 chục: 2 thành 12".
 * @param {Step} step
 */
export const borrowLabel = (step) =>
  `Mượn 1 ${PLACE_NAMES[step.col + 1]}: ${step.top} thành ${(step.top ?? 0) + 10}`;

/**
 * What a wrong digit gets: a nudge on the first try, the working after.
 * @param {Step} step
 * @param {Op} op
 * @param {number} digit
 * @param {number} tries wrong tries on this column, this one included
 */
export function wrongFor(step, op, digit, tries) {
  if (tries >= 2) return `Em xem nhé: ${step.say}.`;
  const { top, bottom, carryIn, carryOut } = step;
  if (op === '+') {
    if (carryIn > 0 && digit === step.plain % 10) return `Em quên thêm ${carryIn} đã nhớ rồi.`;
    if (carryOut > 0 && digit === carryOut) {
      return `Số ${carryOut} là số em nhớ sang hàng ${PLACE_NAMES[step.col + 1]}. Ở hàng này em viết chữ số khác.`;
    }
  } else if (carryIn > 0) {
    const forgot = (top ?? 0) + (step.borrow ? 10 : 0) - (bottom ?? 0);
    if (digit === forgot) {
      return bottom === null
        ? 'Em quên trừ 1 đã nhớ rồi.'
        : `Em quên thêm 1 đã nhớ vào ${bottom} rồi.`;
    }
  }
  return `Chưa đúng. Em tính lại hàng ${PLACE_NAMES[step.col]} nhé.`;
}

/** @typedef {'plain' | 'one' | 'many'} CarryKind */

/** How many carries each kind has. */
const CARRIES = { plain: [0, 0], one: [1, 1], many: [2, 4] };

/** @type {Record<Op, Record<CarryKind, Task>>} */
const FALLBACK = {
  '+': {
    plain: { a: 23415, b: 51362 },
    one: { a: 34528, b: 21345 },
    many: { a: 45637, b: 28485 },
  },
  '-': {
    plain: { a: 68795, b: 25432 },
    one: { a: 57482, b: 23157 },
    many: { a: 23285, b: 12967 },
  },
};

/**
 * Two numbers for a calculation: the first has five digits, the second five
 * or (sometimes) four.
 * @param {() => number} rand
 * @param {Op} op
 */
function drawPair(rand, op) {
  if (op === '+') {
    const a = int(rand, 10000, 88999);
    return { a, b: rand() < 0.3 ? int(rand, 1001, 9999) : int(rand, 10000, LIMIT - a) };
  }
  const a = int(rand, 20000, LIMIT);
  return { a, b: rand() < 0.3 ? int(rand, 1001, 9999) : int(rand, 10000, a - 1000) };
}

/**
 * A random calculation of a kind: no carry, one carry or two and more. The
 * first number has five digits, the second five or four, and the result
 * stays within 99 999.
 * @param {() => number} rand
 * @param {Op} op
 * @param {CarryKind} kind
 * @param {Task} [not] a task not to repeat
 * @returns {Task}
 */
export function drawColumn(rand, op, kind, not) {
  const [lo, hi] = CARRIES[kind];
  for (let i = 0; i < 5000; i++) {
    const { a, b } = drawPair(rand, op);
    const carries = carriesOf(a, b, op);
    const same = not && not.a === a && not.b === b;
    const r = resultOf(a, b, op);
    if (r <= LIMIT && r > 0 && carries >= lo && carries <= hi && !same) return { a, b };
  }
  return FALLBACK[op][kind];
}

/**
 * Up to four number options in increasing order: the right one and the slips
 * that are whole numbers and not the right value, then its neighbours, so a
 * question always has four different choices. Written the way the book
 * groups digits.
 * @param {number} right
 * @param {number[]} slips
 * @returns {{ options: string[], answer: number }}
 */
export function slipOptions(right, slips) {
  const near = [right + 1, right + 10, right + 2];
  const others = [...new Set([...slips, ...near])].filter(
    (v) => v !== right && v >= 0 && Number.isInteger(v),
  );
  const values = [right, ...others.slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(fmt), answer: values.indexOf(right) };
}
