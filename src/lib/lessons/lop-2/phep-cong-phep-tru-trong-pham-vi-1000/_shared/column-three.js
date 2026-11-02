/**
 * Addition and subtraction of three-digit numbers set out in columns, the way
 * the grade 2 book reads them, with at most one carry:
 *
 * - 427 + 246: "7 cộng 6 bằng 13, viết 3, nhớ 1. 2 cộng 4 bằng 6, thêm 1 bằng
 *   7, viết 7. 4 cộng 2 bằng 6, viết 6."
 * - 485 − 128: "5 không trừ được 8, lấy 15 trừ 8 bằng 7, viết 7, nhớ 1. 2 thêm
 *   1 bằng 3, 8 trừ 3 bằng 5, viết 5. 4 trừ 1 bằng 3, viết 3."
 *
 * It also turns a calculation into the actions a child does with place-value
 * blocks, column by column, and tells what the blocks look like after each
 * action. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { equationText, resultOf } from '#lib/core/kid/column.js';

/** @typedef {import('#lib/core/kid/column.js').Op} Op */
/** @typedef {'ones' | 'tens' | 'hundreds'} Place */

/** The places from right to left, the order a column calculation works in. */
export const PLACES = /** @type {const} */ (['ones', 'tens', 'hundreds']);

/** Words for each place: the place name and the block that stands for it. */
export const PLACE_WORDS = /** @type {const} */ ({
  ones: { title: 'Đơn vị', unit: 'đơn vị', block: 'khối đơn vị' },
  tens: { title: 'Chục', unit: 'chục', block: 'thanh chục' },
  hundreds: { title: 'Trăm', unit: 'trăm', block: 'tấm trăm' },
});

const VALUE = { ones: 1, tens: 10, hundreds: 100 };

/**
 * The digit of `n` at a place, or null when `n` is too short to have one (the
 * tens of 7).
 * @param {number} n
 * @param {Place} place
 */
export function digitAt(n, place) {
  if (place !== 'ones' && n < VALUE[place]) return null;
  return Math.floor(n / VALUE[place]) % 10;
}

/**
 * One column of a calculation.
 * @typedef {{
 *   place: Place;
 *   top: number;
 *   bottom: number | null;
 *   carryIn: boolean;
 *   carryOut: boolean;
 *   digit: number;
 *   blank: boolean;
 *   text: string;
 * }} ColumnStep
 */

/**
 * The tail of a column reading: which digit to write and whether to carry.
 * @param {number} digit
 * @param {boolean} blank
 * @param {boolean} carryOut
 */
function writing(digit, blank, carryOut) {
  if (blank) return ', không cần viết.';
  return `, viết ${digit}${carryOut ? ', nhớ 1' : ''}.`;
}

/**
 * One column of an addition, in the book's words.
 * @param {Place} place
 * @param {number} top
 * @param {number | null} bottom
 * @param {boolean} carryIn
 * @returns {ColumnStep}
 */
function addStep(place, top, bottom, carryIn) {
  const sum = top + (bottom ?? 0) + (carryIn ? 1 : 0);
  const digit = sum % 10;
  const carryOut = sum >= 10;
  let text;
  if (bottom === null && !carryIn) text = `Hạ ${top}, viết ${top}.`;
  else if (bottom === null) text = `${top} thêm 1 bằng ${sum}${writing(digit, false, carryOut)}`;
  else if (carryIn) {
    text = `${top} cộng ${bottom} bằng ${top + bottom}, thêm 1 bằng ${sum}${writing(digit, false, carryOut)}`;
  } else text = `${top} cộng ${bottom} bằng ${sum}${writing(digit, false, carryOut)}`;
  return { place, top, bottom, carryIn, carryOut, digit, blank: false, text };
}

/**
 * One column of a subtraction, in the book's words. `leading` says a zero
 * here would be the first digit of the result, so it is not written.
 * @param {Place} place
 * @param {number} top
 * @param {number | null} bottom
 * @param {boolean} carryIn
 * @param {boolean} leading
 * @returns {ColumnStep}
 */
function subStep(place, top, bottom, carryIn, leading) {
  const need = (bottom ?? 0) + (carryIn ? 1 : 0);
  const carryOut = top < need;
  const digit = top + (carryOut ? 10 : 0) - need;
  const blank = leading && digit === 0 && !carryOut;
  const added = carryIn && bottom !== null ? `${bottom} thêm 1 bằng ${need}, ` : '';
  let text;
  if (bottom === null && !carryIn) text = `Hạ ${top}, viết ${top}.`;
  else if (carryOut) {
    text = `${added}${top} không trừ được ${need}, lấy ${10 + top} trừ ${need} bằng ${digit}${writing(digit, false, true)}`;
  } else text = `${added}${top} trừ ${need} bằng ${digit}${writing(digit, blank, false)}`;
  return { place, top, bottom, carryIn, carryOut, digit, blank, text };
}

/**
 * The three columns of a calculation whose first number has three digits and
 * whose result stays below 1000, ones first.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @returns {ColumnStep[]}
 */
export function columnSteps(a, b, op) {
  const r = resultOf(a, b, op);
  /** @type {ColumnStep[]} */
  const steps = [];
  let carryIn = false;
  for (const place of PLACES) {
    const top = /** @type {number} */ (digitAt(a, place));
    const bottom = digitAt(b, place);
    /** @type {ColumnStep} */
    const step =
      op === '+'
        ? addStep(place, top, bottom, carryIn)
        : subStep(place, top, bottom, carryIn, r < VALUE[place]);
    steps.push(step);
    carryIn = step.carryOut;
  }
  return steps;
}

/**
 * The whole column reading, then the equation.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function columnText(a, b, op) {
  const parts = columnSteps(a, b, op).map((s) => s.text);
  return `${parts.join(' ')} Vậy ${equationText(a, b, op)}.`;
}

/**
 * How many columns of a calculation carry.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function carryCount(a, b, op) {
  return columnSteps(a, b, op).filter((s) => s.carryOut).length;
}

/**
 * The place that carries, or null when no column does. With more than one
 * carry it is the lowest.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @returns {Place | null}
 */
export function carryPlace(a, b, op) {
  return columnSteps(a, b, op).find((s) => s.carryOut)?.place ?? null;
}

/**
 * Whether the blocks and columns can show this calculation: a three-digit
 * first number, a result from 10 to 999 and at most one carry, as in the book.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function isShowable(a, b, op) {
  const r = resultOf(a, b, op);
  if (![a, b].every(Number.isInteger) || a < 100 || a > 999 || b < 1 || b > 999) return false;
  return r >= 10 && r <= 999 && carryCount(a, b, op) <= 1;
}

/**
 * One thing a child does: `join` puts a column's blocks together, `swap` trades
 * ten of them for one of the next place, `untie` opens one block of the next
 * place into ten, `take` removes the blocks being subtracted, and `digit` writes
 * the result digit.
 * @typedef {{ type: 'join' | 'swap' | 'untie' | 'take' | 'digit', step: ColumnStep }} Action
 */

/**
 * The actions of a calculation, in order.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @returns {Action[]}
 */
export function planOf(a, b, op) {
  /** @type {Action[]} */
  const actions = [];
  for (const step of columnSteps(a, b, op)) {
    const hasBottom = (step.bottom ?? 0) > 0;
    if (op === '+') {
      if (hasBottom || step.carryIn) actions.push({ type: 'join', step });
      if (step.carryOut) actions.push({ type: 'swap', step });
    } else {
      if (step.carryOut) actions.push({ type: 'untie', step });
      if (hasBottom) actions.push({ type: 'take', step });
    }
    if (!step.blank) actions.push({ type: 'digit', step });
  }
  return actions;
}

/**
 * The blocks of one column at some moment. In an addition `top` and `bottom`
 * are the two numbers' blocks until `joined`, then `top` is the whole pile. In
 * a subtraction `top` is the pile and the last `gone` of it are taken away.
 * `extra` is a block just traded in from the column to the right.
 * @typedef {{
 *   top: number;
 *   bottom: number;
 *   extra: number;
 *   gone: number;
 *   joined: boolean;
 *   written: boolean;
 * }} ColumnView
 */

/**
 * What the board looks like once the first `done` actions are finished.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 * @param {number} done
 * @returns {{
 *   columns: Record<Place, ColumnView>;
 *   written: Record<Place, number | null>;
 *   carried: Place | null;
 *   active: Place | null;
 * }}
 */
export function viewAt(a, b, op, done) {
  const plan = planOf(a, b, op);
  /** @type {Record<Place, ColumnView>} */
  const columns = {
    ones: blankColumn(a, b, 'ones'),
    tens: blankColumn(a, b, 'tens'),
    hundreds: blankColumn(a, b, 'hundreds'),
  };
  /** @type {Record<Place, number | null>} */
  const written = { ones: null, tens: null, hundreds: null };
  /** @type {Place | null} */
  let carried = null;
  for (const { type, step } of plan.slice(0, done)) {
    const column = columns[step.place];
    const upper = PLACES[PLACES.indexOf(step.place) + 1];
    if (type === 'join') {
      column.top += column.bottom + column.extra;
      column.bottom = 0;
      column.extra = 0;
      column.joined = true;
    } else if (type === 'swap') {
      column.top -= 10;
      columns[upper].extra += 1;
      carried = upper;
    } else if (type === 'untie') {
      column.top += 10;
      columns[upper].top -= 1;
      carried = upper;
    } else if (type === 'take') {
      column.gone = column.bottom;
      column.bottom = 0;
    } else {
      written[step.place] = step.digit;
      column.written = true;
    }
  }
  return { columns, written, carried, active: plan[done]?.step.place ?? null };
}

/**
 * The untouched blocks of a column.
 * @param {number} a
 * @param {number} b
 * @param {Place} place
 * @returns {ColumnView}
 */
function blankColumn(a, b, place) {
  return {
    top: digitAt(a, place) ?? 0,
    bottom: digitAt(b, place) ?? 0,
    extra: 0,
    gone: 0,
    joined: false,
    written: false,
  };
}

/**
 * What the child counts in a column: its blocks not taken away.
 * @param {ColumnView} column
 */
export function blocksLeft(column) {
  return column.top + column.extra - column.gone;
}

/**
 * The next place up.
 * @param {Place} place
 */
function upperWords(place) {
  return PLACE_WORDS[PLACES[PLACES.indexOf(place) + 1]];
}

/**
 * The words on the button of an action; a digit has number buttons instead.
 * @param {Action} action
 */
export function actionLabel(action) {
  const { type, step } = action;
  const words = PLACE_WORDS[step.place];
  if (type === 'join') return `Gộp hàng ${words.unit}`;
  if (type === 'swap') return `Đổi 10 ${words.block} thành 1 ${upperWords(step.place).block}`;
  if (type === 'untie') return `Tháo 1 ${upperWords(step.place).block} thành 10 ${words.block}`;
  return `Bớt ${step.bottom} ${words.block}`;
}

/**
 * What the board asks for next.
 * @param {Action} action
 * @param {Op} op
 */
export function actionAsk(action, op) {
  const { type, step } = action;
  const words = PLACE_WORDS[step.place];
  const row = `Hàng ${words.unit}`;
  if (type === 'join') {
    return step.carryIn
      ? `${row}: em gộp các ${words.block}, cả ${words.block} vừa đổi được.`
      : `${row}: em gộp các ${words.block} lại với nhau.`;
  }
  if (type === 'swap') {
    return `${row}: đủ 10 ${words.block} rồi! Em đổi chúng thành 1 ${upperWords(step.place).block}.`;
  }
  if (type === 'untie') {
    return `${row}: có ${step.top} ${words.block}, phải bớt ${step.bottom}. Không đủ! Em tháo 1 ${upperWords(step.place).block} nhé.`;
  }
  if (type === 'take') return `${row}: em bớt đi ${step.bottom} ${words.block}.`;
  if (step.bottom === null && !step.carryIn) {
    return `${row}: chỉ có một chữ số. Em hạ chữ số nào xuống?`;
  }
  return `${row}: em đếm các ${words.block} ${op === '+' ? 'đang có' : 'còn lại'}. Em viết chữ số nào?`;
}

/**
 * The nudge after a wrong digit; never the digit itself.
 * @param {ColumnStep} step
 */
export function digitHint(step) {
  const words = PLACE_WORDS[step.place];
  return `Em đếm lại các ${words.block} ở cột ${words.title}. Nếu không còn khối nào thì em viết 0.`;
}

/**
 * The digits of the finished result; a leading zero stays empty.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function resultDigits(a, b, op) {
  return viewAt(a, b, op, planOf(a, b, op).length).written;
}

/**
 * The result a child gets by forgetting the carry: 427 + 246 written 663, 485 −
 * 128 written 367. Equal to the true result when nothing carries.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function forgetCarry(a, b, op) {
  const place = carryPlace(a, b, op);
  if (place === null) return resultOf(a, b, op);
  const carried = VALUE[place] * 10;
  return op === '+' ? resultOf(a, b, op) - carried : resultOf(a, b, op) + carried;
}

/**
 * A random showable calculation that carries at `place` only, or not at all.
 * @param {() => number} rand
 * @param {Op} op
 * @param {Place | null} place
 */
export function drawProblem(rand, op, place) {
  for (let tries = 0; tries < 500; tries++) {
    const a = int(rand, op === '+' ? 101 : 150, op === '+' ? 899 : 999);
    const b = op === '+' ? int(rand, 11, 999 - a) : int(rand, 11, a - 10);
    if (isShowable(a, b, op) && carryPlace(a, b, op) === place) return { a, b, op };
  }
  return op === '+' ? { a: 427, b: 246, op } : { a: 485, b: 128, op };
}
