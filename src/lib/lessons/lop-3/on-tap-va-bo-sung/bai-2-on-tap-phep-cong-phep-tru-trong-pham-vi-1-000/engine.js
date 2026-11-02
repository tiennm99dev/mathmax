/**
 * The column worker of this lesson and its review questions: mental sums of
 * whole tens and hundreds, column calculations with one carry, the names of the
 * numbers, comparing results and word problems. Pure and DOM-free; each skill
 * is a `KidSkill` for `adaptive-quiz.svelte`.
 */
import { exprText, resultOf } from '#lib/core/kid/column.js';
import { int, pick } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { carryCount, columnSteps, columnWords, forgotCarry } from '../_shared/columns.js';
import { nearOptions, unitOptions } from '../_shared/options.js';

/** @typedef {import('#lib/core/kid/column.js').Op} Op */
/** @typedef {{ a: number, b: number, op: Op }} Calc */
/** @typedef {{ type: 'column', a: number, b: number, op: Op }} Visual */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

/** The calculations the worker opens with, from the book. */
export const BOOK_CALCS = /** @type {readonly Calc[]} */ ([
  { a: 146, b: 29, op: '+' },
  { a: 394, b: 158, op: '-' },
  { a: 35, b: 48, op: '+' },
  { a: 77, b: 59, op: '-' },
  { a: 563, b: 137, op: '-' },
  { a: 216, b: 132, op: '-' },
]);

/**
 * A calculation within 1 000 with at most one carry, from the book's shapes:
 * 146 + 29, 35 + 48, 394 − 158, 77 − 59, 216 − 132.
 * @param {() => number} rand
 * @param {Op} [op]
 * @param {boolean} [carry] whether it carries; left out, it does three times in four
 * @returns {Calc}
 */
export function drawCalc(rand, op, carry = rand() < 0.75) {
  const sign = op ?? (rand() < 0.5 ? '+' : '-');
  for (;;) {
    const a = rand() < 0.2 ? int(rand, 11, 99) : int(rand, 100, 999);
    const b = rand() < 0.4 ? int(rand, 11, 99) : int(rand, 100, 999);
    const r = resultOf(a, b, sign);
    if (r < 10 || r > 999) continue;
    const carries = carryCount(a, b, sign);
    if (carries > 1 || carries > 0 !== carry) continue;
    return { a, b, op: sign };
  }
}

/**
 * The columns a board draws for a calculation.
 * @param {Calc} calc
 */
export function boardWidth({ a, b, op }) {
  return Math.max(String(a).length, String(b).length, String(resultOf(a, b, op)).length);
}

/**
 * What the board shows after `done` digits of the worker: the digits written,
 * the column holding a carried 1 and the column to work on next.
 * @param {Calc} calc
 * @param {number} done
 * @returns {{ written: Array<number | null>, carried: number | null, active: number | null, step: import('../_shared/columns.js').ColumnStep | null }}
 */
export function workerView({ a, b, op }, done) {
  const steps = columnSteps(a, b, op).filter((s) => !s.blank);
  const written = [null, null, null].map((_, i) => {
    const at = steps.findIndex((s) => s.index === i);
    return at >= 0 && at < done ? steps[at].digit : null;
  });
  const last = steps[done - 1];
  const step = steps[done] ?? null;
  return {
    written,
    carried: last?.carryOut ? last.index + 1 : null,
    active: step ? step.index : null,
    step,
  };
}

/**
 * The next calculation of the worker: the book's first, then random ones.
 * @param {number} turn
 * @param {() => number} rand
 * @returns {Calc}
 */
export function calcAt(turn, rand) {
  return BOOK_CALCS[turn] ?? drawCalc(rand);
}

/**
 * Number options for a column result, with the slip of a forgotten carry.
 * @param {() => number} rand
 * @param {Calc} calc
 */
function resultOptions(rand, { a, b, op }) {
  const r = resultOf(a, b, op);
  const slip = forgotCarry(a, b, op);
  return nearOptions(rand, r, slip === null ? [r + 10, r - 10] : [slip], 1000, 1);
}

/**
 * A mental sum of whole tens or whole hundreds, with its scale: 50 + 40, 90 −
 * 50, 500 + 400, 1 000 − 700.
 * @param {() => number} rand
 * @returns {{ a: number, b: number, op: Op, scale: 10 | 100 }}
 */
export function drawMental(rand) {
  const scale = rand() < 0.4 ? 10 : 100;
  const whole = pick(rand, [9, 10]);
  const x = int(rand, 1, whole - 1);
  const parts = [x, whole - x];
  if (rand() < 0.5) return { a: parts[0] * scale, b: parts[1] * scale, op: '+', scale };
  return { a: whole * scale, b: parts[0] * scale, op: '-', scale };
}

/** @type {ReviewSkill} */
const mentalSkill = {
  id: 'tinh-nham',
  label: 'Tính nhẩm số tròn chục, tròn trăm',
  make(rand) {
    const { a, b, op, scale } = drawMental(rand);
    const r = resultOf(a, b, op);
    const word = scale === 100 ? 'trăm' : 'chục';
    const count = (/** @type {number} */ v) => `${v / scale} ${word}`;
    return {
      prompt: `${exprText(a, b, op).replace(String(a), fmt(a))} = ?`,
      ...nearOptions(rand, r, [r + scale, r - scale, a + b, Math.abs(a - b)], 1000, 10),
      hint: `Em tính theo số ${word}.`,
      solution: `${count(a)} ${op === '+' ? 'cộng' : 'trừ'} ${count(b)} bằng ${count(r)}. Vậy kết quả là ${fmt(r)}.`,
    };
  },
};

/**
 * A column question of one sign.
 * @param {Op} op
 * @param {string} id
 * @param {string} label
 * @returns {ReviewSkill}
 */
function columnSkill(op, id, label) {
  return {
    id,
    label,
    make(rand) {
      const calc = drawCalc(rand, op);
      return {
        prompt: `Đặt tính rồi tính: ${exprText(calc.a, calc.b, op)}`,
        visual: { type: 'column', ...calc },
        ...resultOptions(rand, calc),
        hint:
          op === '+'
            ? 'Em tính từ phải sang trái. Được số có hai chữ số thì nhớ 1 sang hàng bên trái.'
            : 'Em tính từ phải sang trái. Trừ không được thì lấy thêm 10, rồi nhớ 1 sang hàng bên trái.',
        solution: columnWords(calc.a, calc.b, op),
      };
    },
  };
}

/** @type {ReviewSkill} */
const namesSkill = {
  id: 'tong-hieu',
  label: 'Tổng và hiệu',
  make(rand) {
    const { a, b, op } = drawCalc(rand);
    const r = resultOf(a, b, op);
    const prompt =
      op === '+'
        ? `Hai số hạng là ${a} và ${b}. Tổng là bao nhiêu?`
        : `Số bị trừ là ${a}, số trừ là ${b}. Hiệu là bao nhiêu?`;
    return {
      prompt,
      ...resultOptions(rand, { a, b, op }),
      hint: op === '+' ? 'Tổng: em cộng hai số hạng.' : 'Hiệu: em lấy số bị trừ trừ đi số trừ.',
      solution: `${exprText(a, b, op)} = ${r}. ${op === '+' ? 'Tổng' : 'Hiệu'} là ${r}.`,
    };
  },
};

/** @type {ReviewSkill} */
const largestSkill = {
  id: 'lon-nhat',
  label: 'So sánh kết quả',
  make(rand) {
    for (;;) {
      const calcs = [drawCalc(rand), drawCalc(rand), drawCalc(rand)];
      const values = calcs.map((c) => resultOf(c.a, c.b, c.op));
      if (new Set(values).size < 3) continue;
      const biggest = rand() < 0.5;
      const right = biggest ? Math.max(...values) : Math.min(...values);
      const at = values.indexOf(right);
      const texts = calcs.map((c) => exprText(c.a, c.b, c.op));
      return {
        prompt: `Phép tính nào có kết quả ${biggest ? 'lớn nhất' : 'bé nhất'}?`,
        ...mixOptions(
          rand,
          texts[at],
          texts.filter((_, i) => i !== at),
        ),
        hint: 'Em tính kết quả của từng phép tính, rồi so sánh.',
        solution: `${calcs.map((c, i) => `${texts[i]} = ${values[i]}`).join('; ')}. Kết quả ${biggest ? 'lớn nhất' : 'bé nhất'} là ${right}.`,
      };
    }
  },
};

/** @typedef {(a: number, b: number, more: boolean) => { prompt: string, unit: string }} Story */

/** Word problems "more than" or "less than". @type {readonly Story[]} */
const STORIES = [
  (a, b, more) => ({
    prompt: `Xe thứ nhất chở ${a} kg gạo. Xe thứ hai chở ${more ? 'nhiều hơn' : 'ít hơn'} xe thứ nhất ${b} kg. Xe thứ hai chở bao nhiêu ki-lô-gam gạo?`,
    unit: 'kg',
  }),
  (a, b, more) => ({
    prompt: `Khối lớp Hai có ${a} học sinh. Khối lớp Ba có ${more ? 'nhiều hơn' : 'ít hơn'} khối lớp Hai ${b} học sinh. Khối lớp Ba có bao nhiêu học sinh?`,
    unit: 'học sinh',
  }),
  (a, b, more) => ({
    prompt: `Vườn thứ nhất có ${a} cây cam. Vườn thứ hai có ${more ? 'nhiều hơn' : 'ít hơn'} vườn thứ nhất ${b} cây. Vườn thứ hai có bao nhiêu cây cam?`,
    unit: 'cây',
  }),
];

/** @type {ReviewSkill} */
const storySkill = {
  id: 'bai-toan',
  label: 'Giải bài toán',
  make(rand) {
    const more = rand() < 0.5;
    const op = more ? '+' : '-';
    /** @type {Calc} */
    let calc = drawCalc(rand, op);
    while (calc.b >= calc.a || calc.a < 100) calc = drawCalc(rand, op);
    const { a, b } = calc;
    const r = resultOf(a, b, op);
    const { prompt, unit } = pick(rand, STORIES)(a, b, more);
    const slip = more ? a - b : a + b;
    return {
      prompt,
      ...unitOptions(rand, r, unit, [slip, forgotCarry(a, b, op) ?? r + 10], 1000, 1),
      hint: more ? 'Nhiều hơn: em làm phép cộng.' : 'Ít hơn: em làm phép trừ.',
      solution: `${exprText(a, b, op)} = ${r} (${unit}).`,
    };
  },
};

/** The parts of this review. */
export const SKILLS = [
  mentalSkill,
  columnSkill('+', 'dat-tinh-cong', 'Đặt tính cộng có nhớ'),
  columnSkill('-', 'dat-tinh-tru', 'Đặt tính trừ có nhớ'),
  namesSkill,
  largestSkill,
  storySkill,
];
