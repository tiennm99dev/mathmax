/**
 * Question generators for the chapter "Phân số", one skill per theory
 * lesson. Answers are numbers: an integer, or a fraction carried as its
 * value n/d, so the drill board reads input with `readFraction` and writes
 * answers with `valueText`.
 */

import { int } from '#lib/core/drill.js';
import { fraction, simplify } from '#lib/fraction-engine/index.js';
import { gcd, lcm } from '#lib/numtheory-engine/index.js';
import { fracOperand, fracText } from './fractions.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

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
 * A fraction p/q in lowest terms with q from 2 to maxQ and p ≠ 0.
 * @param {() => number} rand @param {number} maxP @param {number} maxQ
 */
function simplestFrac(rand, maxP, maxQ) {
  for (;;) {
    const q = int(rand, 2, maxQ);
    const p = nonZero(rand, -maxP, maxP);
    if (gcd(p, q) === 1) return { p, q };
  }
}

/**
 * How a fraction is written in a question: sometimes with a negative
 * denominator, which learners must first turn positive.
 * @param {() => number} rand @param {number} n @param {number} d
 */
function asWritten(rand, n, d) {
  if (n < 0 && rand() < 0.4) return { n: -n, d: -d };
  return { n, d };
}

/** Plain text of a fraction as written, sign kept on the denominator. */
const written = (/** @type {{ n: number, d: number }} */ f) =>
  f.d < 0 ? `${f.n}/−${-f.d}` : fracText(f.n, f.d);

/** @type {Skill} */
export const phanSoBangNhau = {
  id: 'phan-so-bang-nhau',
  label: 'Bài 23. Mở rộng phân số. Phân số bằng nhau',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const { p, q } = simplestFrac(rand, 7, 9);
      const k1 = int(rand, 1, 4);
      let k2 = int(rand, 2, 6);
      if (k2 === k1) k2++;
      const b = q * k1;
      const x = p * k1;
      const c = p * k2;
      const d = q * k2;
      return {
        prompt: `Tìm số nguyên x, biết x/${b} = ${fracText(c, d)}.`,
        answer: x,
        hints: [
          `Hai phân số bằng nhau khi tích chéo bằng nhau: x · ${d} = ${b} · ${fracOperand(c, 1)}.`,
          `Hoặc rút gọn ${fracText(c, d)} trước rồi nhân cả tử và mẫu để có mẫu ${b}.`,
        ],
        steps: [
          `x · ${d} = ${b} · ${fracOperand(c, 1)} = ${fracText(b * c, 1)}.`,
          `x = ${fracText(b * c, 1)} : ${d} = ${fracText(x, 1)}.`,
        ],
      };
    }
    if (v === 1) {
      const { p, q } = simplestFrac(rand, 9, 9);
      const k = int(rand, 2, 9);
      const shown = asWritten(rand, p * k, q * k);
      const g = gcd(p * k, q * k);
      return {
        prompt: `Rút gọn phân số ${written(shown)} về phân số tối giản có mẫu dương. Tử số của phân số đó bằng bao nhiêu?`,
        answer: p,
        hints: [
          shown.d < 0
            ? 'Trước hết nhân cả tử và mẫu với −1 để mẫu dương.'
            : 'Tìm ƯCLN của tử và mẫu (không kể dấu).',
          `ƯCLN(${Math.abs(p * k)}, ${q * k}) = ${g}; chia cả tử và mẫu cho ${g}.`,
        ],
        steps: [
          ...(shown.d < 0 ? [`${written(shown)} = ${fracText(p * k, q * k)}.`] : []),
          `Chia cả tử và mẫu cho ƯCLN = ${g}: ${fracText(p * k, q * k)} = ${fracText(p, q)}.`,
          `Tử số là ${fracText(p, 1)}.`,
        ],
      };
    }
    const { p, q } = simplestFrac(rand, 8, 9);
    const k = int(rand, 2, 6);
    const shown = asWritten(rand, p, q);
    return {
      prompt: `Viết phân số ${written(shown)} thành phân số bằng nó có mẫu ${q * k}. Tử số mới bằng bao nhiêu?`,
      answer: p * k,
      hints: [
        shown.d < 0
          ? `Đưa về mẫu dương trước: ${written(shown)} = ${fracText(p, q)}.`
          : `${q * k} = ${q} · ${k}.`,
        `Nhân cả tử và mẫu của ${fracText(p, q)} với ${k}.`,
      ],
      steps: [
        ...(shown.d < 0 ? [`${written(shown)} = ${fracText(p, q)}.`] : []),
        `${fracText(p, q)} = (${fracText(p, 1)} · ${k})/(${q} · ${k}) = ${fracText(p * k, q * k)}.`,
        `Tử số mới là ${fracText(p * k, 1)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const soSanhHonSo = {
  id: 'so-sanh-hon-so',
  label: 'Bài 24. So sánh phân số. Hỗn số dương',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      let a = simplestFrac(rand, 9, 12);
      let b = simplestFrac(rand, 9, 12);
      while (a.p * b.q === b.p * a.q || a.q === b.q) {
        a = simplestFrac(rand, 9, 12);
        b = simplestFrac(rand, 9, 12);
      }
      const m = lcm(a.q, b.q);
      const an = a.p * (m / a.q);
      const bn = b.p * (m / b.q);
      const big = an > bn ? a : b;
      const sa = asWritten(rand, a.p, a.q);
      const sb = asWritten(rand, b.p, b.q);
      return {
        prompt: `Phân số nào lớn hơn: ${written(sa)} hay ${written(sb)}? Nhập phân số lớn hơn.`,
        answer: big.p / big.q,
        hints: [
          'Đưa các phân số về mẫu dương rồi quy đồng mẫu.',
          `Mẫu chung là BCNN(${a.q}, ${b.q}) = ${m}; so sánh các tử.`,
        ],
        steps: [
          `${written(sa)} = ${fracText(an, m)}; ${written(sb)} = ${fracText(bn, m)}.`,
          `Vì ${fracText(Math.max(an, bn), 1)} > ${fracText(Math.min(an, bn), 1)} nên phân số lớn hơn là ${fracText(big.p, big.q)}.`,
        ],
      };
    }
    if (v === 1) {
      const d = int(rand, 2, 9);
      const whole = int(rand, 1, 9);
      const r = int(rand, 1, d - 1);
      const g = gcd(r, d);
      const rn = r / g;
      const rd = d / g;
      return {
        prompt: `Viết hỗn số ${whole} ${rn}/${rd} dưới dạng phân số.`,
        answer: (whole * rd + rn) / rd,
        hints: ['a b/c = (a · c + b)/c.', `Tính ${whole} · ${rd} + ${rn}.`],
        steps: [
          `${whole} ${rn}/${rd} = (${whole} · ${rd} + ${rn})/${rd} = ${whole * rd + rn}/${rd}.`,
        ],
      };
    }
    if (v === 2) {
      const d = int(rand, 2, 9);
      const whole = int(rand, 1, 9);
      let r = int(rand, 1, d - 1);
      while (gcd(r, d) !== 1) r = int(rand, 1, d - 1);
      const n = whole * d + r;
      return {
        prompt: `Viết phân số ${n}/${d} dưới dạng hỗn số. Phần phân số của hỗn số là bao nhiêu?`,
        answer: r / d,
        hints: [`Chia ${n} cho ${d}: thương là phần số nguyên, số dư là tử của phần phân số.`],
        steps: [
          `${n} = ${d} · ${whole} + ${r}.`,
          `${n}/${d} = ${whole} ${r}/${d}; phần phân số là ${r}/${d}.`,
        ],
      };
    }
    const qa = int(rand, 2, 12);
    let qb = int(rand, 2, 12);
    while (qb === qa) qb = int(rand, 2, 12);
    const pa = nonZero(rand, -9, 9);
    const pb = nonZero(rand, -9, 9);
    const sb = rand() < 0.5 ? { n: -pb, d: -qb } : { n: pb, d: qb };
    const m = lcm(qa, qb);
    return {
      prompt: `Quy đồng mẫu hai phân số ${fracText(pa, qa)} và ${written(sb)} với mẫu chung nhỏ nhất. Mẫu chung bằng bao nhiêu?`,
      answer: m,
      hints: ['Đưa các mẫu về số dương trước.', `Mẫu chung nhỏ nhất là BCNN(${qa}, ${qb}).`],
      steps: [`Mẫu dương là ${qa} và ${qb}.`, `BCNN(${qa}, ${qb}) = ${m}.`],
    };
  },
};

/** @type {Skill} */
export const congTruPhanSo = {
  id: 'cong-tru-phan-so',
  label: 'Bài 25. Phép cộng và phép trừ phân số',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 4) {
      const { p, q } = simplestFrac(rand, 12, 15);
      const shown = asWritten(rand, p, q);
      return {
        prompt: `Tìm số đối của phân số ${written(shown)}.`,
        answer: -p / q,
        hints: ['Hai số đối nhau có tổng bằng 0.', 'Số đối của a/b là −a/b.'],
        steps: [
          ...(shown.d < 0 ? [`${written(shown)} = ${fracText(p, q)}.`] : []),
          `Số đối của ${fracText(p, q)} là ${fracText(-p, q)}, vì ${fracText(p, q)} + ${fracOperand(-p, q)} = 0.`,
        ],
      };
    }
    const a = simplestFrac(rand, 9, 12);
    const b = simplestFrac(rand, 9, 12);
    const minus = v >= 2;
    const m = lcm(a.q, b.q);
    const x = a.p * (m / a.q);
    const y = b.p * (m / b.q);
    const sum = minus ? x - y : x + y;
    const res = simplify(fraction(sum, m));
    const op = minus ? '−' : '+';
    const steps = [
      `Mẫu chung: BCNN(${a.q}, ${b.q}) = ${m}.`,
      `${fracText(a.p, a.q)} ${op} ${fracOperand(b.p, b.q)} = ${fracText(x, m)} ${op} ${fracOperand(y, m)}${minus ? ` = ${fracText(x, m)} + ${fracOperand(-y, m)}` : ''}.`,
      `= (${fracText(x, 1)} + ${fracOperand(minus ? -y : y, 1)})/${m} = ${fracText(sum, m)}${res.d !== m ? ` = ${fracText(res.n, res.d)}` : ''}.`,
    ];
    return {
      prompt: `Tính ${fracText(a.p, a.q)} ${op} ${fracOperand(b.p, b.q)}.`,
      answer: res.n / res.d,
      hints: [
        minus
          ? 'Trừ một phân số là cộng với số đối của nó.'
          : 'Quy đồng mẫu rồi cộng các tử, giữ nguyên mẫu chung.',
        `Mẫu chung nhỏ nhất là BCNN(${a.q}, ${b.q}) = ${m}.`,
      ],
      steps,
    };
  },
};

/** @type {Skill} */
export const nhanChiaPhanSo = {
  id: 'nhan-chia-phan-so',
  label: 'Bài 26. Phép nhân và phép chia phân số',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 4) {
      const { p, q } = simplestFrac(rand, 12, 12);
      return {
        prompt: `Tìm phân số nghịch đảo của ${fracText(p, q)}.`,
        answer: q / p,
        hints: ['Hai số nghịch đảo của nhau có tích bằng 1.', 'Nghịch đảo của a/b (a ≠ 0) là b/a.'],
        steps: [
          `Nghịch đảo của ${fracText(p, q)} là ${fracText(q, p)}, vì ${fracText(p, q)} · ${fracOperand(q, p)} = 1.`,
        ],
      };
    }
    const a = simplestFrac(rand, 9, 10);
    const b = simplestFrac(rand, 9, 10);
    const divide = v >= 2;
    const op = divide ? ':' : '·';
    // The reciprocal of p/q, with its denominator made positive.
    const c = divide ? (b.p < 0 ? { p: -b.q, q: -b.p } : { p: b.q, q: b.p }) : b;
    const num = a.p * c.p;
    const den = a.q * c.q;
    const res = simplify(fraction(num, den));
    const line = `${fracText(a.p, a.q)} · ${fracOperand(c.p, c.q)} = (${fracText(a.p, 1)} · ${fracOperand(c.p, 1)})/(${a.q} · ${c.q}) = ${fracText(num, den)}${res.n !== fraction(num, den).n || res.d !== fraction(num, den).d ? ` = ${fracText(res.n, res.d)}` : ''}.`;
    return {
      prompt: `Tính ${fracText(a.p, a.q)} ${op} ${fracOperand(b.p, b.q)}.`,
      answer: res.n / res.d,
      hints: divide
        ? [
            'Chia cho một phân số là nhân với phân số nghịch đảo của nó.',
            `Nghịch đảo của ${fracText(b.p, b.q)} là ${fracText(b.q, b.p)}.`,
          ]
        : ['Nhân tử với tử, mẫu với mẫu.', 'Rút gọn kết quả về phân số tối giản.'],
      steps: divide
        ? [
            `${fracText(a.p, a.q)} : ${fracOperand(b.p, b.q)} = ${fracText(a.p, a.q)} · ${fracOperand(b.q, b.p)}.`,
            line,
          ]
        : [line],
    };
  },
};

/** Skills of the lessons before "Luyện tập chung trang 13". */
export const PAGE_13_SKILLS = [phanSoBangNhau, soSanhHonSo];

/** Every skill of the chapter written so far, in book order. */
export const CHAPTER_SKILLS = [phanSoBangNhau, soSanhHonSo, congTruPhanSo, nhanChiaPhanSo];
