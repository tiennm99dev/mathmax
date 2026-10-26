/**
 * Question generators for the chapter "Đa thức", one skill per lesson.
 * Answers are integers, possibly negative, so the drill board reads them with
 * `readInteger` and writes them with `intText`. Prompts and steps are plain
 * text with the book's minus sign and superscript exponents.
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import { intText, operand, sup } from '#lib/core/number-format.js';
import {
  collect,
  evalMono,
  evalPoly,
  mono,
  monoDegree,
  monoOperand,
  monoText,
  mulMono,
  neg,
  polyDegree,
  polyText,
  varKey,
  varText,
} from './poly.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {import('./poly.js').Mono} Mono */

/**
 * A non-zero integer from lo to hi.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 */
function nonZero(rand, lo, hi) {
  for (;;) {
    const n = int(rand, lo, hi);
    if (n !== 0) return n;
  }
}

/**
 * A monomial in x and y with exponents up to `max`, at least one variable.
 * @param {() => number} rand
 * @param {number} coef
 * @param {number} [max]
 */
function randomMono(rand, coef, max = 3) {
  for (;;) {
    const m = mono(coef, { x: int(rand, 0, max), y: int(rand, 0, max) });
    if (varKey(m) !== '') return m;
  }
}

/**
 * `count` monomials with pairwise different variable parts; with `constant`
 * the last of them is a number.
 * @param {() => number} rand
 * @param {number} count
 * @param {boolean} [constant]
 * @returns {Mono[]}
 */
function distinctTerms(rand, count, constant = false) {
  /** @type {Mono[]} */
  const out = [];
  while (out.length < count - (constant ? 1 : 0)) {
    const m = randomMono(rand, nonZero(rand, -6, 6));
    if (!out.some((t) => varKey(t) === varKey(m))) out.push(m);
  }
  // The book writes the constant term last.
  if (constant) out.push(mono(nonZero(rand, -9, 9)));
  return out;
}

/**
 * The values of x and y written for a prompt: 'x = 2, y = −1'.
 * @param {Record<string, number>} v
 */
const at = (v) => `x = ${intText(v.x)}, y = ${intText(v.y)}`;

/**
 * Small values for x and y, never both zero.
 * @param {() => number} rand
 */
function point(rand) {
  return { x: nonZero(rand, -2, 2), y: nonZero(rand, -2, 2) };
}

/**
 * How a monomial is evaluated, as a line of the worked solution:
 * '−3 · 2² · (−1)³ = 12'.
 * @param {Mono} m
 * @param {Record<string, number>} v
 */
function evalLine(m, v) {
  // A coefficient of 1 is not written, as in the monomial itself.
  const parts = m.coef === 1 ? [] : [intText(m.coef)];
  for (const [name, e] of Object.entries(m.vars)) {
    parts.push(`${operand(v[name])}${e === 1 ? '' : sup(e)}`);
  }
  return `${parts.join(' · ')} = ${intText(evalMono(m, v))}`;
}

/**
 * A sum of integers written the book's way: '4 − 6 + 1'.
 * @param {number[]} values
 */
function sumLine(values) {
  return values
    .map((n, i) => (i === 0 ? intText(n) : n < 0 ? `− ${intText(-n)}` : `+ ${intText(n)}`))
    .join(' ');
}

/** @type {Skill} */
export const donThuc = {
  id: 'don-thuc',
  label: 'Bài 1. Đơn thức',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v <= 1) {
      const a = randomMono(rand, nonZero(rand, -5, 5));
      const b = randomMono(rand, nonZero(rand, -5, 5));
      const p = mulMono(a, b);
      const shown = `${monoOperand(a)} · ${monoOperand(b)}`;
      const reduce = `${shown} = ${operand(a.coef)} · ${operand(b.coef)} · ${varText(mono(1, a.vars))} · ${varText(mono(1, b.vars))} = ${monoText(p)}.`;
      if (v === 0) {
        const d = /** @type {number} */ (monoDegree(p));
        return {
          prompt: `Thu gọn đơn thức ${shown} rồi cho biết bậc của nó.`,
          answer: d,
          hints: [
            'Nhân các hệ số với nhau và nhân các lũy thừa cùng cơ số (cộng số mũ).',
            'Bậc là tổng số mũ của các biến trong đơn thức thu gọn.',
          ],
          steps: [reduce, `Bậc của ${monoText(p)} là tổng các số mũ: ${d}.`],
        };
      }
      return {
        prompt: `Thu gọn đơn thức ${shown}. Hệ số của đơn thức thu gọn là bao nhiêu?`,
        answer: p.coef,
        hints: [
          'Hệ số của tích bằng tích hai hệ số.',
          `Tính ${operand(a.coef)} · ${operand(b.coef)}.`,
        ],
        steps: [reduce, `Hệ số là ${intText(p.coef)}.`],
      };
    }
    if (v === 2) {
      const base = randomMono(rand, 1);
      let coefs = [nonZero(rand, -9, 9), nonZero(rand, -9, 9), nonZero(rand, -9, 9)];
      while (coefs.reduce((s, c) => s + c, 0) === 0)
        coefs = [coefs[0], coefs[1], nonZero(rand, -9, 9)];
      const terms = coefs.map((c) => mono(c, base.vars));
      const sum = coefs.reduce((s, c) => s + c, 0);
      const part = varText(base);
      return {
        prompt: `Tính ${polyText(terms)}. Hệ số của kết quả là bao nhiêu?`,
        answer: sum,
        hints: [
          `Ba đơn thức có cùng phần biến ${part} nên đồng dạng.`,
          'Cộng các hệ số, giữ nguyên phần biến.',
        ],
        steps: [
          `${polyText(terms)} = (${sumLine(coefs)})${part}.`,
          `= ${monoText(mono(sum, base.vars))}, hệ số là ${intText(sum)}.`,
        ],
      };
    }
    // Both variables occur, so each given value is used.
    const m = mono(nonZero(rand, -4, 4), { x: int(rand, 1, 2), y: int(rand, 1, 2) });
    const val = point(rand);
    return {
      prompt: `Tính giá trị của đơn thức ${monoText(m)} tại ${at(val)}.`,
      answer: evalMono(m, val),
      hints: [
        'Thay giá trị của từng biến vào đơn thức.',
        'Lũy thừa bậc chẵn của số âm là số dương, bậc lẻ là số âm.',
      ],
      steps: [`Thay ${at(val)}: ${evalLine(m, val)}.`],
    };
  },
};

/** @type {Skill} */
export const daThuc = {
  id: 'da-thuc',
  label: 'Bài 2. Đa thức',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      // A collected part, plus a pair of opposite terms of higher degree that cancel.
      const kept = distinctTerms(rand, 2, rand() < 0.5);
      const top = Math.max(...kept.map((t) => /** @type {number} */ (monoDegree(t))));
      let ghost = randomMono(rand, nonZero(rand, -5, 5), 4);
      while ((monoDegree(ghost) ?? 0) <= top || kept.some((t) => varKey(t) === varKey(ghost))) {
        ghost = randomMono(rand, nonZero(rand, -5, 5), 4);
      }
      const all = shuffle(rand, [...kept, ghost, mono(-ghost.coef, ghost.vars)]);
      const d = /** @type {number} */ (polyDegree(all));
      return {
        prompt: `Tìm bậc của đa thức ${polyText(all)}.`,
        answer: d,
        hints: [
          'Thu gọn đa thức trước khi tìm bậc.',
          `Hai hạng tử chứa ${varText(ghost)} có tổng bằng bao nhiêu?`,
        ],
        steps: [
          `${monoText(ghost)} và ${monoText(mono(-ghost.coef, ghost.vars))} triệt tiêu nhau.`,
          `Dạng thu gọn: ${polyText(collect(all))}.`,
          `Hạng tử bậc cao nhất có bậc ${d}, nên đa thức có bậc ${d}.`,
        ],
      };
    }
    // Some like terms to collect: three different parts, one of them twice.
    const base = distinctTerms(rand, 3, true);
    const twin = pick(rand, base);
    const extra = mono(nonZero(rand, -5, 5), twin.vars);
    const all = shuffle(rand, [...base, extra]);
    const c = collect(all);
    if (v === 1) {
      return {
        prompt: `Thu gọn đa thức ${polyText(all)}. Dạng thu gọn có bao nhiêu hạng tử?`,
        answer: c.length,
        hints: [
          'Tìm các hạng tử đồng dạng (cùng phần biến) rồi cộng chúng.',
          'Hạng tử nào có tổng bằng 0 thì biến mất.',
        ],
        steps: [`Dạng thu gọn: ${polyText(c)}.`, `Đa thức thu gọn có ${c.length} hạng tử.`],
      };
    }
    const val = point(rand);
    return {
      prompt: `Tính giá trị của đa thức ${polyText(all)} tại ${at(val)}.`,
      answer: evalPoly(c, val),
      hints: ['Thu gọn đa thức trước để tính gọn hơn.', `Dạng thu gọn là ${polyText(c)}.`],
      steps: [
        `Thu gọn: ${polyText(c)}.`,
        `Thay ${at(val)}: ${sumLine(c.map((t) => evalMono(t, val)))} = ${intText(evalPoly(c, val))}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const congTruDaThuc = {
  id: 'cong-tru-da-thuc',
  label: 'Bài 3. Phép cộng và phép trừ đa thức',
  make(rand) {
    const v = int(rand, 0, 2);
    const sub = rand() < 0.5;
    const sign = sub ? '−' : '+';
    const a = distinctTerms(rand, 3, rand() < 0.5);
    // B shares at least two parts with A so that like terms meet.
    const shared = shuffle(rand, a).slice(0, 2);
    const b = shuffle(rand, [
      ...shared.map((t) => mono(nonZero(rand, -6, 6), t.vars)),
      ...distinctTerms(rand, 1).filter((t) => !a.some((s) => varKey(s) === varKey(t))),
    ]);
    const res = collect([...a, ...(sub ? neg(b) : b)]);
    const name = `A ${sign} B`;
    const given = `Cho A = ${polyText(a)} và B = ${polyText(b)}.`;
    const open = sub
      ? `A − B = ${polyText([...a, ...neg(b)])} (bỏ ngoặc, đổi dấu mọi hạng tử của B).`
      : `A + B = ${polyText([...a, ...b])}.`;
    if (v === 0) {
      // Two shared parts hold at most one constant, so a variable part remains.
      const target = pick(
        rand,
        shared.filter((t) => varKey(t) !== ''),
      );
      const ta = /** @type {Mono} */ (a.find((t) => varKey(t) === varKey(target)));
      const tb = /** @type {Mono} */ (b.find((t) => varKey(t) === varKey(target)));
      const coef = sub ? ta.coef - tb.coef : ta.coef + tb.coef;
      return {
        prompt: `${given} Tính ${name}. Hệ số của hạng tử chứa ${varText(target)} là bao nhiêu (ghi 0 nếu hạng tử đó triệt tiêu)?`,
        answer: coef,
        hints: [
          sub ? 'Khi trừ, đổi dấu mọi hạng tử của B rồi mới cộng.' : 'Cộng các hạng tử đồng dạng.',
          `Hai hạng tử chứa ${varText(target)} là ${monoText(ta)} và ${monoText(tb)}.`,
        ],
        steps: [
          open,
          `Hệ số của ${varText(target)}: ${intText(ta.coef)} ${sign} ${operand(tb.coef)} = ${intText(coef)}.`,
          `${name} = ${polyText(res)}.`,
        ],
      };
    }
    if (v === 1) {
      const val = point(rand);
      return {
        prompt: `${given} Tính giá trị của ${name} tại ${at(val)}.`,
        answer: evalPoly(res, val),
        hints: [`Thu gọn ${name} trước rồi mới thay số.`, `${name} = ${polyText(res)}.`],
        steps: [
          open,
          `${name} = ${polyText(res)}.`,
          `Thay ${at(val)} được ${intText(evalPoly(res, val))}.`,
        ],
      };
    }
    if (res.length === 0) return congTruDaThuc.make(rand);
    const d = /** @type {number} */ (polyDegree(res));
    return {
      prompt: `${given} Tìm bậc của đa thức ${name}.`,
      answer: d,
      hints: [`Thu gọn ${name} trước khi tìm bậc.`, 'Bậc là bậc của hạng tử có bậc cao nhất.'],
      steps: [open, `${name} = ${polyText(res)}.`, `Hạng tử bậc cao nhất có bậc ${d}.`],
    };
  },
};

/** The skills of the lessons before "Luyện tập chung trang 17". */
export const SKILLS_TRANG_17 = [donThuc, daThuc, congTruDaThuc];
