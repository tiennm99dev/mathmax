/**
 * Question generators for the chapter "Số hữu tỉ", one skill per idea.
 * Answers are numbers: an integer, or a rational carried as its value n/d,
 * so a drill board reads input with `readValue` and writes answers with
 * `valueText` from `rational.js`.
 */

import { int, pick } from '#lib/core/drill.js';
import { add, compare, div, fraction, mul, simplify, sub } from '#lib/fraction-engine/index.js';
import { gcd, lcm } from '#lib/numtheory-engine/index.js';
import { bracket, decText, fracText, writtenText } from './rational.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {import('./rational.js').Written} Written */
/** @typedef {import('./rational.js').Fraction} Fraction */

/** Denominators that keep mental arithmetic reasonable. */
const DENS = [2, 3, 4, 5, 6, 8, 9, 10, 12];

/**
 * A non-zero integer from lo to hi.
 * @param {() => number} rand @param {number} lo @param {number} hi
 */
function nonZero(rand, lo, hi) {
  for (;;) {
    const n = int(rand, lo, hi);
    if (n !== 0) return n;
  }
}

/**
 * A lowest-terms fraction, not an integer, with |numerator| up to maxN.
 * @param {() => number} rand @param {number} maxN
 * @returns {Written}
 */
function randFrac(rand, maxN) {
  for (;;) {
    const d = pick(rand, DENS);
    const n = nonZero(rand, -maxN, maxN);
    if (gcd(n, d) === 1) return { f: fraction(n, d), form: 'frac' };
  }
}

/**
 * A decimal with one or two places that is not an integer.
 * @param {() => number} rand @param {number} maxTenths
 * @returns {Written}
 */
function randDec(rand, maxTenths) {
  for (;;) {
    const quarters = rand() < 0.35;
    const n = quarters
      ? nonZero(rand, -Math.floor(maxTenths / 2), Math.floor(maxTenths / 2))
      : nonZero(rand, -maxTenths, maxTenths);
    const f = quarters ? simplify(fraction(n * 25, 100)) : simplify(fraction(n, 10));
    if (f.d !== 1) return { f, form: 'dec' };
  }
}

/**
 * A fraction or a decimal, half the time each.
 * @param {() => number} rand
 */
const randRational = (rand) => (rand() < 0.5 ? randFrac(rand, 11) : randDec(rand, 25));

/** @param {Fraction} f */
const val = (f) => f.n / f.d;

/** @param {number} n */
const intText = (n) => (n < 0 ? `−${-n}` : `${n}`);

/** @param {Fraction} f */
const opd = (f) => bracket(fracText(f));

/**
 * '0,25 = 1/4' when a number is not already written as a fraction in lowest
 * terms, otherwise null.
 * @param {Written} w
 */
function asFraction(w) {
  const s = simplify(w.f);
  if (w.form === 'frac' && s.n === w.f.n && s.d === w.f.d) return null;
  return `${writtenText(w)} = ${fracText(s)}`;
}

/**
 * The step that writes numbers as fractions, if any needs it.
 * @param {Written[]} list
 * @returns {string[]}
 */
function fractionStep(list) {
  const parts = list.map(asFraction).filter((s) => s !== null);
  return parts.length ? [`Viết dưới dạng phân số: ${parts.join('; ')}.`] : [];
}

/**
 * Plain-text worked sum x + y of two lowest-terms fractions.
 * @param {Fraction} x @param {Fraction} y
 */
function sumSteps(x, y) {
  const m = lcm(x.d, y.d);
  const xn = x.n * (m / x.d);
  const yn = y.n * (m / y.d);
  const r = simplify(fraction(xn + yn, m));
  const steps = [];
  if (x.d !== y.d) {
    steps.push(
      `Quy đồng mẫu ${m}: ${opd(x)} + ${opd(y)} = ${fracText(fraction(xn, m))} + ${opd(fraction(yn, m))}.`,
    );
  }
  const raw = fraction(xn + yn, m);
  steps.push(
    `Cộng tử, giữ mẫu: ${fracText(raw)}${raw.n !== r.n || raw.d !== r.d ? ` = ${fracText(r)}` : ''}.`,
  );
  return steps;
}

/** @type {Skill} */
export const tapHopSoHuuTi = {
  id: 'tap-hop-so-huu-ti',
  label: 'Bài 1. Tập hợp các số hữu tỉ',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const w = randRational(rand);
      const o = { f: fraction(-w.f.n, w.f.d), form: w.form };
      return {
        prompt: `Tìm số đối của ${writtenText(w)}.`,
        answer: -val(w.f),
        hints: ['Hai số đối nhau nằm hai phía của điểm 0 và cách đều điểm 0.'],
        steps: [
          'Số đối của a là −a, và −(−a) = a.',
          `Số đối của ${writtenText(w)} là ${writtenText(/** @type {Written} */ (o))}.`,
        ],
      };
    }
    if (v === 1) {
      /** @type {Written[]} */
      const list = [];
      while (list.length < 3) {
        const w = randRational(rand);
        if (list.every((x) => compare(x.f, w.f) !== 0)) list.push(w);
      }
      const big = rand() < 0.5;
      const fr = list.map((w) => simplify(w.f));
      const m = fr.reduce((acc, f) => lcm(acc, f.d), 1);
      const best = fr.reduce((acc, f) =>
        (big ? compare(f, acc) > 0 : compare(f, acc) < 0) ? f : acc,
      );
      return {
        prompt: `Số nào ${big ? 'lớn' : 'nhỏ'} nhất trong ba số ${list.map(writtenText).join('; ')}?`,
        answer: val(best),
        hints: [
          'Số âm luôn nhỏ hơn số dương.',
          `Đưa ba số về phân số có cùng mẫu dương ${m} rồi so sánh tử số.`,
        ],
        steps: [
          ...fractionStep(list),
          `Cùng mẫu ${m}: ${fr.map((f) => fracText(fraction(f.n * (m / f.d), m))).join('; ')}.`,
          `So sánh các tử số: số ${big ? 'lớn' : 'nhỏ'} nhất là ${fracText(best)}.`,
        ],
      };
    }
    if (v === 2) {
      let lo = randFrac(rand, 25);
      let hi = randFrac(rand, 25);
      while (Math.floor(val(hi.f)) - Math.ceil(val(lo.f)) < 1) {
        lo = randFrac(rand, 25);
        hi = randFrac(rand, 25);
      }
      const first = Math.ceil(val(lo.f));
      const last = Math.floor(val(hi.f));
      const count = last - first + 1;
      const list = Array.from({ length: count }, (_, i) => intText(first + i));
      return {
        prompt: `Có bao nhiêu số nguyên x thỏa mãn ${writtenText(lo)} < x < ${writtenText(hi)}?`,
        answer: count,
        hints: [
          'Đổi mỗi phân số ra hỗn số hoặc số thập phân để biết nó nằm giữa hai số nguyên nào.',
        ],
        steps: [
          `${writtenText(lo)} nằm giữa ${intText(first - 1)} và ${intText(first)}; ${writtenText(hi)} nằm giữa ${intText(last)} và ${intText(last + 1)}.`,
          count <= 6
            ? `Các số nguyên x là: ${list.join('; ')}.`
            : `Các số nguyên x là các số từ ${intText(first)} đến ${intText(last)}.`,
          `Có ${intText(last)} − ${bracket(intText(first))} + 1 = ${count} số.`,
        ],
      };
    }
    const w = randDec(rand, 99);
    const s = simplify(w.f);
    const places = s.d === 2 || s.d === 5 || s.d === 10 ? 10 : 100;
    const raw = fraction(Math.round(val(w.f) * places), places);
    const g = gcd(raw.n, places);
    return {
      prompt: `Viết số ${decText(w.f)} dưới dạng phân số tối giản có mẫu dương. Mẫu số của phân số đó là bao nhiêu?`,
      answer: s.d,
      hints: ['Viết số thập phân thành phân số thập phân (mẫu 10 hoặc 100) rồi rút gọn.'],
      steps: [
        `${decText(w.f)} = ${fracText(raw)}.`,
        g === 1
          ? `Phân số ${fracText(raw)} đã tối giản.`
          : `Chia cả tử và mẫu cho ${g}: ${fracText(raw)} = ${fracText(s)}.`,
        `Mẫu số là ${s.d}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const congTruSoHuuTi = {
  id: 'cong-tru-so-huu-ti',
  label: 'Bài 2. Cộng, trừ số hữu tỉ',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v < 2) {
      const a = rand() < 0.5 ? randDec(rand, 25) : randFrac(rand, 11);
      const b = randFrac(rand, 11);
      const minus = v === 1;
      const x = simplify(a.f);
      const y = simplify(b.f);
      const y2 = minus ? fraction(-y.n, y.d) : y;
      const r = add(x, y2);
      return {
        prompt: `Tính ${writtenText(a)} ${minus ? '−' : '+'} ${bracket(writtenText(b))}.`,
        answer: val(r),
        steps: [
          ...fractionStep([a]),
          ...(minus
            ? [`Trừ là cộng với số đối: ${opd(x)} − ${opd(y)} = ${opd(x)} + ${opd(y2)}.`]
            : []),
          ...sumSteps(x, y2),
        ],
      };
    }
    // a − (a − c): the bracket rule makes it c.
    const a = randFrac(rand, 9);
    let c = randFrac(rand, 9);
    while (c.f.d === a.f.d) c = randFrac(rand, 9);
    const r = sub(a.f, sub(a.f, c.f));
    return {
      prompt: `Tính một cách hợp lí: ${fracText(a.f)} − (${fracText(a.f)} − ${bracket(fracText(c.f))}).`,
      answer: val(r),
      hints: ['Bỏ ngoặc có dấu "−" đằng trước thì đổi dấu mọi số hạng trong ngoặc.'],
      steps: [
        `Bỏ ngoặc: ${fracText(a.f)} − ${opd(a.f)} + ${opd(c.f)}.`,
        `${fracText(a.f)} − ${opd(a.f)} = 0, nên kết quả là ${fracText(c.f)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const nhanChiaSoHuuTi = {
  id: 'nhan-chia-so-huu-ti',
  label: 'Bài 2. Nhân, chia số hữu tỉ',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 2) {
      const w = randRational(rand);
      const s = simplify(w.f);
      const r = fraction(s.d, s.n);
      return {
        prompt: `Tìm số nghịch đảo của ${writtenText(w)}.`,
        answer: val(r),
        hints: ['Hai số nghịch đảo của nhau có tích bằng 1.', 'Số nghịch đảo của a/b là b/a.'],
        steps: [...fractionStep([w]), `Số nghịch đảo của ${fracText(s)} là ${fracText(r)}.`],
      };
    }
    const a = rand() < 0.5 ? randDec(rand, 25) : randFrac(rand, 11);
    const b = randFrac(rand, 11);
    const x = simplify(a.f);
    const y = simplify(b.f);
    const divide = v === 1;
    const y2 = divide ? fraction(y.d, y.n) : y;
    const raw = fraction(x.n * y2.n, x.d * y2.d);
    const r = divide ? div(x, y) : mul(x, y);
    return {
      prompt: `Tính ${writtenText(a)} ${divide ? ':' : '·'} ${bracket(writtenText(b))}.`,
      answer: val(r),
      hints: divide
        ? ['Chia cho một số là nhân với số nghịch đảo của số đó.']
        : ['Nhân tử với tử, mẫu với mẫu; xét dấu trước.'],
      steps: [
        ...fractionStep([a]),
        ...(divide
          ? [`Chia là nhân với số nghịch đảo: ${opd(x)} : ${opd(y)} = ${opd(x)} · ${opd(y2)}.`]
          : []),
        `${opd(x)} · ${opd(y2)} = ${fracText(raw)}${raw.n !== r.n || raw.d !== r.d ? ` = ${fracText(r)}` : ''}.`,
      ],
    };
  },
};

/** The skills of "Luyện tập chung" after Bài 1 and Bài 2. */
export const PAGE_14_SKILLS = [tapHopSoHuuTi, congTruSoHuuTi, nhanChiaSoHuuTi];
