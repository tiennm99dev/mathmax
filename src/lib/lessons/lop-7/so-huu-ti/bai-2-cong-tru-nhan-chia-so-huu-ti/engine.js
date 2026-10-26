/**
 * The step-by-step rational calculator: turns two rational numbers, given as
 * fractions, integers or decimals, into fractions with positive
 * denominators, then adds, subtracts, multiplies or divides them the way the
 * book does it, each step as a caption and a line of TeX.
 */

import { fraction, isSimplest, simplify } from '#lib/fraction-engine/index.js';
import { lcm } from '#lib/numtheory-engine/index.js';
import {
  fracText,
  isFiniteDecimal,
  texBracket,
  texDec,
  texFrac,
  writtenTex,
} from '../_shared/rational.js';

/** @typedef {import('../_shared/rational.js').Written} Written */
/** @typedef {import('../_shared/rational.js').Fraction} Fraction */
/** @typedef {'+' | '-' | '*' | ':'} Op */
/** @typedef {{ caption: string, tex: string }} Step */

/** TeX of each operation sign. */
export const OP_TEX = { '+': '+', '-': '-', '*': '\\cdot', ':': ':' };

/** Spoken names of the operations. */
export const OP_NAME = { '+': 'cộng', '-': 'trừ', '*': 'nhân', ':': 'chia' };

/**
 * TeX of a fraction used as an operand.
 * @param {Fraction} f
 */
const operand = (f) => texBracket(texFrac(f));

/**
 * The worked steps of `a op b`, and the result in lowest terms; `error`
 * instead when dividing by 0.
 * @param {Written} a
 * @param {Op} op
 * @param {Written} b
 * @returns {{ steps: Step[], result: Fraction } | { error: string }}
 */
export function solve(a, op, b) {
  if (op === ':' && b.f.n === 0) {
    return { error: 'Không chia được cho 0: số chia phải khác 0.' };
  }
  /** @type {Step[]} */
  const steps = [];
  const head = `${writtenTex(a)} ${OP_TEX[op]} ${texBracket(writtenTex(b))}`;

  // Step 1: both numbers as lowest-terms fractions with a positive denominator.
  const x = simplify(a.f);
  const y = simplify(b.f);
  const rewritten = [a, b].filter((w, i) => {
    const s = i === 0 ? x : y;
    return w.form !== 'frac' || s.n !== w.f.n || s.d !== w.f.d;
  });
  if (rewritten.length > 0) {
    steps.push({
      caption: 'Viết các số hữu tỉ dưới dạng phân số tối giản có mẫu dương.',
      tex: rewritten.map((w) => `${writtenTex(w)} = ${texFrac(simplify(w.f))}`).join(';\\quad '),
    });
  }
  const start = `${head} = ${operand(x)} ${OP_TEX[op]} ${operand(y)}`;

  /** @type {Fraction} */
  let result;
  if (op === '+' || op === '-') {
    let y2 = y;
    let line = start;
    if (op === '-') {
      y2 = fraction(-y.n, y.d);
      line = `${line} = ${operand(x)} + ${operand(y2)}`;
      steps.push({
        caption: 'Trừ một số hữu tỉ là cộng với số đối của nó.',
        tex: line,
      });
    } else {
      steps.push({ caption: 'Viết phép tính với hai phân số.', tex: line });
    }
    const m = lcm(x.d, y2.d);
    const xn = x.n * (m / x.d);
    const yn = y2.n * (m / y2.d);
    if (x.d !== y2.d) {
      steps.push({
        caption: `Quy đồng mẫu số: mẫu chung là ${m}.`,
        tex: `${operand(x)} + ${operand(y2)} = ${operand(fraction(xn, m))} + ${operand(fraction(yn, m))}`,
      });
    }
    const sum = fraction(xn + yn, m);
    steps.push({
      caption: 'Cộng các tử số, giữ nguyên mẫu số chung.',
      tex: `\\frac{${xn} + ${texBracket(String(yn))}}{${m}} = ${texFrac(sum)}`,
    });
    result = simplify(sum);
    if (!isSimplest(sum)) {
      steps.push({ caption: 'Rút gọn phân số.', tex: `${texFrac(sum)} = ${texFrac(result)}` });
    }
  } else {
    let y2 = y;
    if (op === ':') {
      y2 = fraction(y.d, y.n);
      steps.push({
        caption: `Chia cho một số là nhân với số nghịch đảo của số đó. Số nghịch đảo của ${fracText(y)} là ${fracText(y2)}.`,
        tex: `${start} = ${operand(x)} \\cdot ${operand(y2)}`,
      });
    } else {
      steps.push({ caption: 'Viết phép tính với hai phân số.', tex: start });
    }
    const p = fraction(x.n * y2.n, x.d * y2.d);
    steps.push({
      caption: 'Nhân tử với tử, mẫu với mẫu.',
      tex: `${operand(x)} \\cdot ${operand(y2)} = \\frac{${x.n} \\cdot ${texBracket(String(y2.n))}}{${x.d} \\cdot ${y2.d}} = ${texFrac(p)}`,
    });
    result = simplify(p);
    if (!isSimplest(p)) {
      steps.push({ caption: 'Rút gọn phân số.', tex: `${texFrac(p)} = ${texFrac(result)}` });
    }
  }

  const decimal = result.d !== 1 && isFiniteDecimal(result) ? ` = ${texDec(result)}` : '';
  steps.push({
    caption: 'Kết quả.',
    tex: `${head} = ${texFrac(result)}${decimal}`,
  });
  return { steps, result };
}
