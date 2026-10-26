/**
 * Question generators for the chapter "Biểu thức đại số và đa thức một
 * biến", one skill per theory lesson. Every answer is an integer, so a drill
 * board reads input with `readInteger` and writes answers with `intText`.
 * Prompts and steps are plain text with the book's minus sign and
 * superscript exponents.
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import { intText, operand } from '#lib/core/number-format.js';
import {
  add,
  coef,
  collect,
  degree,
  evaluate,
  mul,
  polyText,
  sub,
  termText,
  termsOf,
  termsText,
} from '#lib/algebra-engine/polynomial.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {import('#lib/algebra-engine/polynomial.js').Term} Term */

/**
 * A non-zero integer from −hi to hi.
 * @param {() => number} rand
 * @param {number} hi
 */
const signed = (rand, hi) => (rand() < 0.5 ? -1 : 1) * int(rand, 1, hi);

/** An integer bracketed when negative: (−3). */
const br = operand;

/**
 * A collected polynomial of the given degree: a non-zero leading
 * coefficient and random lower ones (some may be 0).
 * @param {() => number} rand
 * @param {number} d
 * @param {number} [hi]
 * @returns {number[]}
 */
function randomPoly(rand, d, hi = 6) {
  const p = Array.from({ length: d }, () => (rand() < 0.25 ? 0 : signed(rand, hi)));
  p.push(signed(rand, hi));
  return p;
}

/**
 * Writes p uncollected: one term split into two like terms, optionally a
 * pair of higher-degree terms that cancel, all in shuffled order.
 * @param {() => number} rand
 * @param {number[]} p
 * @param {boolean} trap add a cancelling pair one degree above the top
 * @returns {Term[]}
 */
function scramble(rand, p, trap) {
  /** @type {Term[]} */
  const terms = [];
  p.forEach((c, e) => {
    if (c !== 0) terms.push({ c, e });
  });
  const k = int(rand, 0, terms.length - 1);
  const part = signed(rand, 5);
  const split = terms[k];
  if (part !== split.c) {
    terms.splice(k, 1, { c: part, e: split.e }, { c: split.c - part, e: split.e });
  }
  if (trap) {
    const m = int(rand, 1, 4);
    terms.push({ c: m, e: p.length }, { c: -m, e: p.length });
  }
  return shuffle(rand, terms);
}

/** @type {Skill} */
export const bieuThuc = {
  id: 'bieu-thuc-dai-so',
  label: 'Bài 24. Biểu thức đại số',
  make(rand) {
    if (rand() < 0.5) {
      const p = [signed(rand, 9), signed(rand, 6), signed(rand, 5)];
      const x = int(rand, -4, 4);
      const value = evaluate(p, x);
      return {
        prompt: `Tính giá trị của biểu thức ${polyText(p)} tại x = ${intText(x)}.`,
        answer: value,
        hints: [
          `Thay x bằng ${br(x)}${x < 0 ? ', nhớ đặt số âm trong ngoặc' : ''}.`,
          'Tính lũy thừa trước, rồi nhân, cuối cùng cộng trừ.',
        ],
        steps: [
          `Thay x = ${intText(x)}: ${intText(p[2])} · ${br(x)}² ${p[1] < 0 ? '−' : '+'} ${Math.abs(p[1])} · ${br(x)} ${p[0] < 0 ? '−' : '+'} ${Math.abs(p[0])}.`,
          `= ${intText(p[2] * x * x)} ${p[1] * x < 0 ? '−' : '+'} ${Math.abs(p[1] * x)} ${p[0] < 0 ? '−' : '+'} ${Math.abs(p[0])} = ${intText(value)}.`,
        ],
      };
    }
    const m = signed(rand, 5);
    const n = signed(rand, 5);
    const k = signed(rand, 3);
    const x = signed(rand, 4);
    const y = signed(rand, 4);
    const value = m * x + n * y + k * x * y;
    const mx = termText({ c: m, e: 1 }, true, 'x');
    const ny = termText({ c: n, e: 1 }, false, 'y');
    const kxy = termText({ c: k, e: 1 }, false, 'xy');
    return {
      prompt: `Tính giá trị của biểu thức ${mx}${ny}${kxy} tại x = ${intText(x)} và y = ${intText(y)}.`,
      answer: value,
      hints: [
        'Thay x và y bằng các số đã cho, đặt số âm trong ngoặc.',
        `xy = ${br(x)} · ${br(y)} = ${intText(x * y)}.`,
      ],
      steps: [
        `${intText(m)} · ${br(x)} = ${intText(m * x)}; ${intText(n)} · ${br(y)} = ${intText(n * y)}; ${intText(k)} · ${br(x)} · ${br(y)} = ${intText(k * x * y)}.`,
        `Giá trị của biểu thức: ${intText(m * x)} + ${br(n * y)} + ${br(k * x * y)} = ${intText(value)}.`,
      ],
    };
  },
};

/** What a polynomial question can ask. */
const ASK = ['bậc', 'hệ số cao nhất', 'hệ số tự do'];

/** @type {Skill} */
export const daThuc = {
  id: 'da-thuc-mot-bien',
  label: 'Bài 25. Đa thức một biến',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v <= 2) {
      const p = randomPoly(rand, int(rand, 2, 4));
      const trap = rand() < 0.5;
      const terms = scramble(rand, p, trap);
      const d = /** @type {number} */ (degree(p));
      const answer = v === 0 ? d : v === 1 ? p[d] : p[0];
      return {
        prompt: `Tìm ${ASK[v]} của đa thức P(x) = ${termsText(terms)}.`,
        answer,
        hints: [
          'Thu gọn đa thức trước: cộng các hạng tử cùng bậc.',
          v === 0
            ? 'Bậc là số mũ cao nhất của hạng tử còn lại (khác 0) sau khi thu gọn.'
            : v === 1
              ? 'Hệ số cao nhất là hệ số của hạng tử có bậc cao nhất sau khi thu gọn.'
              : 'Hệ số tự do là hệ số của hạng tử bậc 0 (không chứa x); nếu không có thì bằng 0.',
        ],
        steps: [
          `Thu gọn: P(x) = ${polyText(p)}.`,
          v === 0
            ? `Hạng tử bậc cao nhất là ${termText({ c: p[d], e: d })}, nên P(x) có bậc ${d}.`
            : v === 1
              ? `Hạng tử bậc cao nhất là ${termText({ c: p[d], e: d })}, nên hệ số cao nhất là ${intText(p[d])}.`
              : `Hệ số tự do là ${intText(p[0])}.`,
        ],
      };
    }
    if (v === 3) {
      const p = randomPoly(rand, int(rand, 2, 3), 5);
      const a = signed(rand, 3);
      const value = evaluate(p, a);
      const parts = [];
      for (let e = p.length - 1; e >= 0; e--) {
        if (p[e] !== 0) parts.push(intText(p[e] * a ** e));
      }
      return {
        prompt: `Cho P(x) = ${polyText(p)}. Tính P(${intText(a)}).`,
        answer: value,
        hints: [`Thay x = ${intText(a)} vào từng hạng tử.`],
        steps: [
          `Các hạng tử tại x = ${intText(a)} lần lượt bằng ${parts.join('; ')}.`,
          `P(${intText(a)}) = ${intText(value)}.`,
        ],
      };
    }
    const r1 = int(rand, -3, 3);
    let r2 = int(rand, -3, 3);
    if (r2 === r1 && rand() < 0.7) r2 = r1 === 3 ? -3 : r1 + 1;
    // (x − r1)(x − r2) = x² − (r1 + r2)x + r1·r2
    const p = collect([
      { c: 1, e: 2 },
      { c: -(r1 + r2), e: 1 },
      { c: r1 * r2, e: 0 },
    ]);
    const candidates = shuffle(rand, [-3, -2, -1, 0, 1, 2, 3])
      .slice(0, 4)
      .sort((x, y) => x - y);
    const roots = candidates.filter((c) => evaluate(p, c) === 0);
    return {
      prompt: `Trong các số ${candidates.map((n) => intText(n)).join('; ')}, có bao nhiêu số là nghiệm của đa thức P(x) = ${polyText(p)}?`,
      answer: roots.length,
      hints: ['a là nghiệm của P(x) khi P(a) = 0.', 'Tính P tại từng số đã cho.'],
      steps: [
        candidates.map((c) => `P(${intText(c)}) = ${intText(evaluate(p, c))}`).join('; ') + '.',
        roots.length === 0
          ? 'Không có số nào làm P bằng 0.'
          : `Các số làm P bằng 0: ${roots.map((n) => intText(n)).join('; ')}. Có ${roots.length} nghiệm.`,
      ],
    };
  },
};

/** @type {Skill} */
export const congTru = {
  id: 'cong-tru-da-thuc',
  label: 'Bài 26. Cộng, trừ đa thức một biến',
  make(rand) {
    const plus = rand() < 0.5;
    const opText = plus ? '+' : '−';
    const v = int(rand, 0, 2);
    const p = randomPoly(rand, 3);
    let q = randomPoly(rand, int(rand, 2, 3));
    if (v === 1 && q.length === 4) {
      // Make the top terms cancel so the degree drops.
      q[3] = plus ? -p[3] : p[3];
    }
    q = collect(q.map((c, e) => ({ c, e })));
    const r = plus ? add(p, q) : sub(p, q);
    const name = `P(x) ${opText} Q(x)`;
    const intro = `Cho P(x) = ${polyText(p)} và Q(x) = ${polyText(q)}.`;
    const working = `${name} = ${polyText(r)}.`;
    if (v === 0) {
      const k = int(rand, 0, 2);
      const power = k === 0 ? 'hệ số tự do' : `hệ số của ${termText({ c: 1, e: k })}`;
      return {
        prompt: `${intro} Tìm ${power} trong ${name}.`,
        answer: coef(r, k),
        hints: [
          plus
            ? 'Cộng hai hệ số của các hạng tử cùng bậc.'
            : 'Lấy hệ số trong P trừ hệ số trong Q (cùng bậc); hệ số vắng mặt bằng 0.',
        ],
        steps: [
          `${intText(coef(p, k))} ${opText} ${br(coef(q, k))} = ${intText(coef(r, k))}.`,
          working,
        ],
      };
    }
    if (v === 1) {
      const d = degree(r);
      if (d === null) return congTru.make(rand);
      return {
        prompt: `${intro} Tìm bậc của ${name}.`,
        answer: d,
        hints: [
          'Thu gọn tổng (hiệu) trước khi tìm bậc.',
          'Các hạng tử bậc cao nhất có thể triệt tiêu nhau.',
        ],
        steps: [working, `Hạng tử bậc cao nhất còn lại có bậc ${d}.`],
      };
    }
    const a = pick(rand, [-2, -1, 1, 2]);
    const value = evaluate(r, a);
    return {
      prompt: `${intro} Tính giá trị của ${name} tại x = ${intText(a)}.`,
      answer: value,
      hints: ['Thu gọn tổng (hiệu) rồi thay số, hoặc tính P và Q tại x riêng rồi cộng (trừ).'],
      steps: [
        `P(${intText(a)}) = ${intText(evaluate(p, a))}; Q(${intText(a)}) = ${intText(evaluate(q, a))}.`,
        `${intText(evaluate(p, a))} ${opText} ${br(evaluate(q, a))} = ${intText(value)}.`,
      ],
    };
  },
};

/**
 * "hệ số của x²" or "hệ số tự do", for a question about a polynomial.
 * @param {number} k
 */
const coefName = (k) => (k === 0 ? 'hệ số tự do' : `hệ số của ${termText({ c: 1, e: k })}`);

/**
 * A single-term polynomial c·xᵉ as coefficients by degree.
 * @param {number} c
 * @param {number} e
 */
const mono = (c, e) => {
  const p = Array(e + 1).fill(0);
  p[e] = c;
  return p;
};

/** @type {Skill} */
export const nhan = {
  id: 'nhan-da-thuc',
  label: 'Bài 27. Phép nhân đa thức một biến',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 1) {
      const m = mono(signed(rand, 4), int(rand, 1, 3));
      const q = randomPoly(rand, 2, 5);
      const r = mul(m, q);
      const k = pick(
        rand,
        r.map((_, e) => e).filter((e) => r[e] !== 0),
      );
      const mt = polyText(m);
      return {
        prompt: `Tìm ${coefName(k)} trong tích (${mt}) · (${polyText(q)}).`,
        answer: r[k],
        hints: [
          'Nhân đơn thức với từng hạng tử của đa thức: nhân các hệ số, cộng các số mũ.',
          `Chỉ một tích cho lũy thừa ${termText({ c: 1, e: k })}.`,
        ],
        steps: [
          `(${mt}) · (${polyText(q)}) = ${polyText(r)}.`,
          `Hệ số cần tìm là ${intText(r[k])}.`,
        ],
      };
    }
    const p = [signed(rand, 5), signed(rand, 3)];
    const q = v === 2 ? randomPoly(rand, 2, 4) : [signed(rand, 5), signed(rand, 3)];
    const r = mul(p, q);
    const factors = `(${polyText(p)})(${polyText(q)})`;
    if (v === 3) {
      const a = pick(rand, [-2, -1, 1, 2, 3]);
      const pa = evaluate(p, a);
      const qa = evaluate(q, a);
      return {
        prompt: `Tính giá trị của tích ${factors} tại x = ${intText(a)}.`,
        answer: pa * qa + 0,
        hints: ['Có thể tính giá trị của từng thừa số rồi nhân, hoặc thu gọn tích rồi thay số.'],
        steps: [
          `${polyText(p)} tại x = ${intText(a)} bằng ${intText(pa)}; ${polyText(q)} tại x = ${intText(a)} bằng ${intText(qa)}.`,
          `Tích bằng ${intText(pa)} · ${br(qa)} = ${intText(pa * qa)}.`,
        ],
      };
    }
    const k = v === 2 ? int(rand, 1, 2) : int(rand, 0, 1);
    return {
      prompt: `Tìm ${coefName(k)} trong tích ${factors}.`,
      answer: coef(r, k),
      hints: [
        'Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia.',
        k === 0
          ? 'Hệ số tự do của tích là tích của hai hệ số tự do.'
          : `Cộng các tích có cùng lũy thừa ${termText({ c: 1, e: k })}.`,
      ],
      steps: [`${factors} = ${polyText(r)}.`, `Hệ số cần tìm là ${intText(coef(r, k))}.`],
    };
  },
};

/** @type {Skill} */
export const chia = {
  id: 'chia-da-thuc',
  label: 'Bài 28. Phép chia đa thức một biến',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const m = mono(signed(rand, 3), int(rand, 1, 2));
      const q = randomPoly(rand, 2, 5);
      q[0] = q[0] === 0 ? signed(rand, 5) : q[0];
      const a = mul(m, q);
      const k = int(rand, 0, 2);
      const mt = polyText(m);
      return {
        prompt: `Thực hiện phép chia (${polyText(a)}) : (${mt}). Tìm ${coefName(k)} trong thương.`,
        answer: q[k],
        hints: [`Chia từng hạng tử của đa thức cho ${mt}: chia hệ số cho hệ số, trừ các số mũ.`],
        steps: [
          `(${polyText(a)}) : (${mt}) = ${polyText(q)}.`,
          `Kiểm tra: (${mt}) · (${polyText(q)}) = ${polyText(a)}.`,
        ],
      };
    }
    const r = signed(rand, 3);
    const b = [-r, 1]; // x − r
    const bt = polyText(b);
    if (v === 1) {
      const q = [signed(rand, 5), signed(rand, 4), int(rand, 1, 3)];
      const a = mul(b, q);
      const k = int(rand, 0, 1);
      return {
        prompt: `Thực hiện phép chia (${polyText(a)}) : (${bt}). Tìm ${coefName(k)} trong thương.`,
        answer: q[k],
        hints: [
          `Đặt tính: chia hạng tử bậc cao nhất ${termText({ c: a[3], e: 3 })} cho x, nhân rồi trừ; lặp lại.`,
        ],
        steps: [
          `Đặt tính chia được thương ${polyText(q)}, dư 0.`,
          `Kiểm tra: (${bt})(${polyText(q)}) = ${polyText(a)}.`,
        ],
      };
    }
    // Synthetic division by x − r: quotient coefficients from the top down.
    const p = randomPoly(rand, int(rand, 2, 3), 4);
    /** @type {number[]} */
    const quot = Array(p.length - 1).fill(0);
    let carry = 0;
    for (let e = p.length - 1; e >= 1; e--) {
      carry = p[e] + carry * r;
      quot[e - 1] = carry;
    }
    const rest = p[0] + carry * r;
    if (v === 2) {
      return {
        prompt: `Tìm dư khi chia đa thức ${polyText(p)} cho ${bt}.`,
        answer: rest,
        hints: [
          `Đặt tính: chia hạng tử bậc cao nhất cho x, nhân với ${bt} rồi trừ; lặp lại.`,
          'Dừng khi dư không còn chứa x (bậc nhỏ hơn bậc 1 của đa thức chia).',
        ],
        steps: [
          `Các vòng chia lần lượt cho các hạng tử của thương: ${termsOf(quot)
            .map((t) => termText(t))
            .join('; ')}.`,
          `Thương ${polyText(quot)}, dư ${intText(rest)}.`,
          `Kiểm tra: ${polyText(p)} = (${bt})(${polyText(quot)}) + ${br(rest)}.`,
        ],
      };
    }
    // Ask for the constant term that makes the division exact.
    const top = p.slice();
    top[0] = 0;
    const a = -evaluate(top, r);
    if (a === 0) return chia.make(rand);
    const shown = `${polyText(top)} + a`;
    const solved = top.slice();
    solved[0] = a;
    return {
      prompt: `Tìm số a để đa thức ${shown} chia hết cho ${bt}.`,
      answer: a,
      hints: [
        'Đặt tính chia, coi a là một số; dư cuối cùng là một biểu thức chứa a.',
        'Phép chia hết khi dư bằng 0.',
      ],
      steps: [
        `Đặt tính chia ${shown} cho ${bt}: dư cuối cùng là a ${a > 0 ? '−' : '+'} ${Math.abs(a)}.`,
        `Dư bằng 0 khi a = ${intText(a)}; khi đó ${polyText(solved)} = (${bt})(${polyText(quot)}).`,
      ],
    };
  },
};

/** Skills of the practice page after Bài 24 to Bài 26. */
export const PAGE_34_SKILLS = [bieuThuc, daThuc, congTru];

/** Skills of the practice page after Bài 27 and Bài 28. */
export const PAGE_44_SKILLS = [nhan, chia];

/** Every skill of the chapter, in lesson order. */
export const CHAPTER_SKILLS = [bieuThuc, daThuc, congTru, nhan, chia];
