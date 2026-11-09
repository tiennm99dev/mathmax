/**
 * Adding, subtracting, multiplying and dividing numbers within 10 000 in
 * columns, the way the grade 3 book reads them:
 *
 * - 3 628 + 4 845: "8 cộng 5 bằng 13, viết 3, nhớ 1. 2 cộng 4 bằng 6, thêm 1
 *   bằng 7, viết 7. …"
 * - 6 378 − 2 549: "8 không trừ được 9, lấy 18 trừ 9 bằng 9, viết 9, nhớ 1. 4
 *   thêm 1 bằng 5, 7 trừ 5 bằng 2, viết 2. …"
 * - 1 427 × 3: "3 nhân 7 bằng 21, viết 1, nhớ 2. 3 nhân 2 bằng 6, thêm 2
 *   bằng 8, viết 8. …"
 * - 1 276 : 4: "12 chia 4 được 3, viết 3; 3 nhân 4 bằng 12; 12 trừ 12 bằng 0.
 *   Hạ 7, được 7. …"
 *
 * Also what a learner does column by column on the board, what the board shows
 * after each action, random tasks of each case and answer options built from
 * the slips children make. Pure and DOM-free.
 */
import { numberDivide } from '#lib/algebra-engine/long-division.js';
import { int } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {'+' | '-' | '×'} Op */
/** @typedef {{ a: number, b: number }} Task */

/** The name of each column, from the ones. */
export const PLACE_NAMES = /** @type {const} */ (['đơn vị', 'chục', 'trăm', 'nghìn']);

/** How many columns the board has: the results stay within 9 999. */
export const COLUMNS = 4;

/** The sign the book prints for each operation. */
export const SIGNS = /** @type {const} */ ({ '+': '+', '-': '−', '×': '×' });

/** The sign read aloud. */
export const SIGN_WORDS = /** @type {const} */ ({ '+': 'cộng', '-': 'trừ', '×': 'nhân' });

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
export function resultOf(a, b, op) {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  return a * b;
}

/**
 * The calculation without its result: "3 628 + 4 845".
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export const opText = (a, b, op) => `${fmt(a)} ${SIGNS[op]} ${fmt(b)}`;

/**
 * The calculation with its result: "3 628 + 4 845 = 8 473".
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
 * @property {number | null} bottom the digit of the second number (the multiplier for ×)
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
 * The columns of a multiplication `a × b`, `b` a digit, ones first. The last
 * column writes its whole result.
 * @param {number} a
 * @param {number} b
 * @returns {Step[]}
 */
export function mulSteps(a, b) {
  const da = digitsOf(a);
  let carryIn = 0;
  return da.map((top, col) => {
    const product = b * top;
    const total = product + carryIn;
    const last = col === da.length - 1;
    const digit = last ? total : total % 10;
    const carryOut = last ? 0 : Math.floor(total / 10);
    const added = carryIn > 0 ? `, thêm ${carryIn} bằng ${total}` : '';
    const say = `${b} nhân ${top} bằng ${product}${added}${writeText(digit, carryOut)}`;
    /** @type {Step} */
    const step = {
      col,
      top,
      bottom: b,
      carryIn,
      carryOut,
      need: 0,
      plain: last ? product : product % 10,
      digit,
      blank: false,
      borrow: false,
      say,
    };
    carryIn = carryOut;
    return step;
  });
}

/**
 * The columns of any calculation, ones first.
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function stepsOf(a, b, op) {
  if (op === '+') return addSteps(a, b);
  if (op === '-') return subSteps(a, b);
  return mulSteps(a, b);
}

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
 * the digits written, the small carries (above the column for + and ×, beside
 * the second number's digit for −), the top digits that borrowed 10, and the
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
      if (op !== '-' && step.carryOut > 0) carries[step.col + 1] = step.carryOut;
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
  if (op === '×') {
    const added = carryIn > 0 ? `, rồi thêm ${carryIn} đã nhớ` : '';
    return `${row}: ${bottom} nhân ${top}${added}. ${ask}`;
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
  if (op !== '-') {
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
const CARRIES = { plain: [0, 0], one: [1, 1], many: [2, 3] };

/** @type {Record<Op, Record<CarryKind, Task>>} */
const FALLBACK = {
  '+': { plain: { a: 3524, b: 2361 }, one: { a: 2435, b: 1248 }, many: { a: 3628, b: 4845 } },
  '-': { plain: { a: 5876, b: 2453 }, one: { a: 5482, b: 2357 }, many: { a: 6378, b: 2549 } },
  '×': { plain: { a: 1213, b: 3 }, one: { a: 2018, b: 4 }, many: { a: 1427, b: 3 } },
};

/**
 * Two numbers for a calculation of a kind, with every result within 9 999.
 * @param {() => number} rand
 * @param {Op} op
 */
function drawPair(rand, op) {
  if (op === '×') {
    const b = int(rand, 2, 9);
    return { a: int(rand, 1000, Math.floor(9999 / b)), b };
  }
  if (op === '+') {
    const a = int(rand, 1000, 8899);
    return { a, b: rand() < 0.3 ? int(rand, 101, 999) : int(rand, 1000, 9999 - a) };
  }
  const a = int(rand, 2000, 9999);
  return { a, b: rand() < 0.3 ? int(rand, 101, 999) : int(rand, 1000, a - 100) };
}

/**
 * A random calculation of a kind: no carry, one carry or two and more. The
 * first number has four digits, the second four or three digits (one for ×),
 * and the result stays within 9 999.
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
    if (resultOf(a, b, op) <= 9999 && carries >= lo && carries <= hi && !same) return { a, b };
  }
  return FALLBACK[op][kind];
}

/**
 * The division sentence: "2 487 : 2 = 1 243 (dư 1)".
 * @param {number} n
 * @param {number} d
 */
export function divText(n, d) {
  return `${fmt(n)} : ${d} = ${withRest(Math.floor(n / d), n % d)}`;
}

/**
 * A quotient and its remainder, the book's way.
 * @param {number} q
 * @param {number} rest
 */
export const withRest = (q, rest) => (rest > 0 ? `${fmt(q)} (dư ${rest})` : fmt(q));

/**
 * The whole division in words, from the left.
 * @param {number} n
 * @param {number} d
 */
export function divWords(n, d) {
  const digits = String(n);
  const rounds = numberDivide(n, d).rounds.map(({ digit, partial, product, rest, end }, i) => {
    const down = i > 0 ? `Hạ ${digits[end]}, được ${partial}. ` : '';
    return `${down}${partial} chia ${d} được ${digit}, viết ${digit}; ${digit} nhân ${d} bằng ${product}; ${partial} trừ ${product} bằng ${rest}.`;
  });
  return `${rounds.join(' ')} Vậy ${divText(n, d)}.`;
}

/**
 * Checking a division by multiplying back.
 * @param {number} n
 * @param {number} d
 */
export function checkText(n, d) {
  const q = Math.floor(n / d);
  const rest = n % d;
  return rest === 0
    ? `Thử lại: ${fmt(q)} × ${d} = ${fmt(n)}.`
    : `Thử lại: ${fmt(q)} × ${d} = ${fmt(q * d)}, ${fmt(q * d)} + ${rest} = ${fmt(n)}.`;
}

/** @typedef {'exact' | 'rest' | 'zero' | 'two'} DivKind */

/**
 * Whether `n : d` is the given case: dividing evenly, with a remainder, with a
 * 0 in the quotient, or with the thousands too small to divide, so that the
 * quotient has three digits. The first three have a four-digit quotient, and
 * the first two keep every quotient digit above 0.
 * @param {number} n
 * @param {number} d
 * @param {DivKind} kind
 */
export function isDivKind(n, d, kind) {
  const q = Math.floor(n / d);
  if (kind === 'two') return q >= 100 && q < 1000;
  if (q < 1000) return false;
  const zero = String(q).includes('0');
  if (kind === 'zero') return zero;
  return !zero && (kind === 'exact' ? n % d === 0 : n % d > 0);
}

/**
 * A four-digit division by a digit from 2 to 9, of the given case.
 * @param {() => number} rand
 * @param {DivKind} kind
 * @param {{ n: number, d: number }} [not] a task not to repeat
 * @returns {{ n: number, d: number }}
 */
export function drawDivision(rand, kind, not) {
  for (;;) {
    const d = int(rand, 2, 9);
    const n = int(rand, 1000, 9999);
    const same = not && not.n === n && not.d === d;
    if (isDivKind(n, d, kind) && !same) return { n, d };
  }
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
