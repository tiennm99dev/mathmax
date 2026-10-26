/**
 * Question generators for the chapter "Hằng đẳng thức đáng nhớ và ứng dụng",
 * one skill per lesson or method. Every answer is an integer, possibly
 * negative, so the drill board reads them with `readInteger` and writes them
 * with `intText`. Prompts and steps are plain text with the book's minus sign
 * and superscript exponents; polynomials are in the single variable x.
 */

import { int, pick } from '#lib/core/drill.js';
import { MINUS, intText, operand } from '#lib/core/number-format.js';
import { polyText } from '#lib/algebra-engine/polynomial.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

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
 * A polynomial in x from coefficients, lowest degree first: [9, 6, 1] gives
 * 'x² + 6x + 9'.
 * @param {number[]} coefs
 */
const P = (coefs) => polyText(coefs);

/**
 * The binomial ax + b in brackets: '(2x − 3)'.
 * @param {number} a
 * @param {number} b
 */
const bin = (a, b) => `(${P([b, a])})`;

/**
 * '+ 5' or '− 5' to continue a written sum.
 * @param {number} n
 */
const signed = (n) => (n < 0 ? `${MINUS} ${intText(-n)}` : `+ ${intText(n)}`);

/**
 * A term n·s continuing a written sum, with a coefficient ±1 left out:
 * term(3, 'x') is '+ 3x', term(−1, '(x + 2)') is '− (x + 2)'.
 * @param {number} n
 * @param {string} s
 */
const term = (n, s) => (n === 1 ? `+ ${s}` : n === -1 ? `${MINUS} ${s}` : `${signed(n)}${s}`);

/**
 * A leading term n·s with a coefficient ±1 left out: lead(−1, 'x') is '−x'.
 * @param {number} n
 * @param {string} s
 */
const lead = (n, s) => (n === 1 ? s : n === -1 ? `${MINUS}${s}` : `${intText(n)}${s}`);

/**
 * A power of ax written for a worked step: 'x²' when a is 1, else '(2x)²'.
 * @param {number} a
 * @param {string} exp superscript exponent
 */
const pw = (a, exp) => (a === 1 ? `x${exp}` : `(${a}x)${exp}`);

/** @type {Skill} */
export const binhPhuong = {
  id: 'binh-phuong',
  label: 'Bài 6. Hiệu hai bình phương, bình phương của tổng, hiệu',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const k = nonZero(rand, -9, 9);
      const n = 100 + k;
      const op = k > 0 ? '+' : MINUS;
      const ak = Math.abs(k);
      return {
        prompt: `Tính nhanh ${n}².`,
        answer: n * n,
        hints: [
          `Viết ${n} = 100 ${op} ${ak}.`,
          `Dùng bình phương của một ${k > 0 ? 'tổng' : 'hiệu'}: (A ${op} B)² = A² ${op} 2AB + B².`,
        ],
        steps: [
          `${n}² = (100 ${op} ${ak})² = 100² ${op} 2 · 100 · ${ak} + ${ak}².`,
          `= ${intText(10000)} ${op} ${intText(200 * ak)} + ${ak * ak} = ${intText(n * n)}.`,
        ],
      };
    }
    if (v === 1) {
      const m = pick(rand, [20, 30, 40, 50, 60, 100]);
      const k = int(rand, 1, 9);
      return {
        prompt: `Tính nhanh ${m + k} · ${m - k}.`,
        answer: m * m - k * k,
        hints: [
          `${m + k} = ${m} + ${k} và ${m - k} = ${m} − ${k}.`,
          'Dùng hiệu hai bình phương: (A + B)(A − B) = A² − B².',
        ],
        steps: [
          `${m + k} · ${m - k} = (${m} + ${k})(${m} − ${k}) = ${m}² − ${k}².`,
          `= ${intText(m * m)} − ${k * k} = ${intText(m * m - k * k)}.`,
        ],
      };
    }
    if (v === 2) {
      const a = int(rand, 1, 4);
      const b = nonZero(rand, -9, 9);
      const shown = bin(a, b);
      const ax = a === 1 ? 'x' : `${a}x`;
      return {
        prompt: `Khai triển ${shown}². Hệ số của x trong kết quả là bao nhiêu?`,
        answer: 2 * a * b,
        hints: [
          `Áp dụng (A ${b > 0 ? '+' : MINUS} B)² với A = ${ax}, B = ${Math.abs(b)}.`,
          'Hạng tử chứa x là hạng tử 2AB, mang dấu của phép tính trong ngoặc.',
        ],
        steps: [
          `${shown}² = ${pw(a, '²')} ${b > 0 ? '+' : MINUS} 2 · ${ax} · ${Math.abs(b)} + ${Math.abs(b)}².`,
          `= ${P([b * b, 2 * a * b, a * a])}; hệ số của x là ${intText(2 * a * b)}.`,
        ],
      };
    }
    const x = int(rand, 1, 9);
    const y = int(rand, 1, 9);
    const s = x + y;
    const p = x * y;
    return {
      prompt: `Biết a + b = ${s} và ab = ${p}. Tính a² + b².`,
      answer: s * s - 2 * p,
      hints: ['(a + b)² = a² + 2ab + b².', 'Suy ra a² + b² = (a + b)² − 2ab.'],
      steps: [
        'a² + b² = (a + b)² − 2ab.',
        `= ${s}² − 2 · ${p} = ${s * s} − ${2 * p} = ${s * s - 2 * p}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const lapPhuong = {
  id: 'lap-phuong',
  label: 'Bài 7. Lập phương của một tổng, một hiệu',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = int(rand, 1, 3);
      const b = nonZero(rand, -4, 4);
      const shown = bin(a, b);
      const ax = a === 1 ? 'x' : `${a}x`;
      const askSquare = rand() < 0.5;
      const c2 = 3 * a * a * b;
      const c1 = 3 * a * b * b;
      const op = b > 0 ? '+' : MINUS;
      const B = Math.abs(b);
      return {
        prompt: `Khai triển ${shown}³. Hệ số của ${askSquare ? 'x²' : 'x'} trong kết quả là bao nhiêu?`,
        answer: askSquare ? c2 : c1,
        hints: [
          `Áp dụng (A ${op} B)³ = A³ ${op} 3A²B + 3AB² ${op} B³ với A = ${ax}, B = ${B}.`,
          askSquare
            ? 'Hạng tử chứa x² là 3A²B, mang dấu của phép tính trong ngoặc.'
            : 'Hạng tử chứa x là 3AB², luôn mang dấu cộng.',
        ],
        steps: [
          `${shown}³ = ${pw(a, '³')} ${op} 3 · ${pw(a, '²')} · ${B} + 3 · ${ax} · ${B}² ${op} ${B}³.`,
          `= ${P([b * b * b, c1, c2, a * a * a])}.`,
          `Hệ số của ${askSquare ? 'x²' : 'x'} là ${intText(askSquare ? c2 : c1)}.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 1, 4);
      const minus = rand() < 0.5;
      const sk = minus ? -k : k;
      const poly = P([sk * sk * sk, 3 * sk * sk, 3 * sk, 1]);
      return {
        prompt: `Viết ${poly} dưới dạng (x ${minus ? MINUS : '+'} □)³. Số trong ô trống là bao nhiêu?`,
        answer: k,
        hints: [
          `So sánh với (x ${minus ? MINUS : '+'} B)³ = x³ ${minus ? MINUS : '+'} 3x²B + 3xB² ${minus ? MINUS : '+'} B³.`,
          `Hạng tử tự do là ${minus ? MINUS : ''}B³; tìm B có lập phương bằng ${k ** 3}.`,
        ],
        steps: [
          `${intText(k ** 3)} = ${k}³ và ${3 * k}x² = 3 · x² · ${k}.`,
          `Vậy ${poly} = (x ${minus ? MINUS : '+'} ${k})³, ô trống là ${k}.`,
        ],
      };
    }
    const k = int(rand, 1, 3);
    const minus = rand() < 0.5;
    const target = pick(rand, [10, 20]);
    const x = minus ? target + k : target - k;
    const sk = minus ? -k : k;
    const poly = P([sk * sk * sk, 3 * sk * sk, 3 * sk, 1]);
    return {
      prompt: `Tính giá trị của biểu thức ${poly} tại x = ${x}.`,
      answer: target ** 3,
      hints: [
        `Viết biểu thức dưới dạng lập phương của một ${minus ? 'hiệu' : 'tổng'}.`,
        `${poly} = (x ${minus ? MINUS : '+'} ${k})³.`,
      ],
      steps: [
        `${poly} = (x ${minus ? MINUS : '+'} ${k})³.`,
        `Tại x = ${x}: (${x} ${minus ? MINUS : '+'} ${k})³ = ${target}³ = ${intText(target ** 3)}.`,
      ],
    };
  },
};

/**
 * The product form of a sum or difference of cubes:
 * (x + k)(x² − kx + k²) or (x − k)(x² + kx + k²).
 * @param {number} k
 * @param {boolean} sum
 */
const cubeProduct = (k, sum) =>
  sum ? `${bin(1, k)}(${P([k * k, -k, 1])})` : `${bin(1, -k)}(${P([k * k, k, 1])})`;

/** @type {Skill} */
export const tongHieuLapPhuong = {
  id: 'tong-hieu-lap-phuong',
  label: 'Bài 8. Tổng và hiệu hai lập phương',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const k = int(rand, 2, 6);
      const sum = rand() < 0.5;
      if (sum) {
        return {
          prompt: `Điền số thích hợp: x³ + ${k ** 3} = (x + ${k})(x² − □x + ${k * k}).`,
          answer: k,
          hints: [
            `${k ** 3} = ${k}³, nên đây là tổng hai lập phương với A = x, B = ${k}.`,
            'A³ + B³ = (A + B)(A² − AB + B²).',
          ],
          steps: [
            `x³ + ${k ** 3} = x³ + ${k}³ = (x + ${k})(x² − x · ${k} + ${k}²).`,
            `= (x + ${k})(x² − ${k}x + ${k * k}); ô trống là ${k}.`,
          ],
        };
      }
      return {
        prompt: `Điền số thích hợp: x³ − ${k ** 3} = (x − ${k})(x² + ${k}x + □).`,
        answer: k * k,
        hints: [
          `${k ** 3} = ${k}³, nên đây là hiệu hai lập phương với A = x, B = ${k}.`,
          'A³ − B³ = (A − B)(A² + AB + B²).',
        ],
        steps: [
          `x³ − ${k ** 3} = x³ − ${k}³ = (x − ${k})(x² + x · ${k} + ${k}²).`,
          `= (x − ${k})(x² + ${k}x + ${k * k}); ô trống là ${k * k}.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 1, 5);
      const x = int(rand, 2, 10);
      const sum = rand() < 0.5;
      const expr = cubeProduct(k, sum);
      const value = sum ? x ** 3 + k ** 3 : x ** 3 - k ** 3;
      return {
        prompt: `Tính giá trị của biểu thức ${expr} tại x = ${x}.`,
        answer: value,
        hints: [
          `Biểu thức là dạng tích của ${sum ? 'tổng' : 'hiệu'} hai lập phương.`,
          `${expr} = x³ ${sum ? '+' : '−'} ${k ** 3}.`,
        ],
        steps: [
          `${expr} = x³ ${sum ? '+' : '−'} ${k}³ = x³ ${sum ? '+' : '−'} ${k ** 3}.`,
          `Tại x = ${x}: ${intText(x ** 3)} ${sum ? '+' : '−'} ${k ** 3} = ${intText(value)}.`,
        ],
      };
    }
    if (v === 2) {
      const k = int(rand, 1, 5);
      const sum = rand() < 0.5;
      const expr = `${cubeProduct(k, sum)} − x³`;
      const value = sum ? k ** 3 : -(k ** 3);
      return {
        prompt: `Rút gọn biểu thức ${expr}. Kết quả là số nào?`,
        answer: value,
        hints: [
          `Tích đầu tiên là dạng ${sum ? 'tổng' : 'hiệu'} hai lập phương.`,
          'Viết tích thành x³ cộng hoặc trừ một lập phương rồi trừ x³.',
        ],
        steps: [
          `${cubeProduct(k, sum)} = x³ ${sum ? '+' : '−'} ${k ** 3}.`,
          `Biểu thức bằng x³ ${sum ? '+' : '−'} ${k ** 3} − x³ = ${intText(value)}.`,
        ],
      };
    }
    const a = int(rand, 1, 6);
    const b = int(rand, 1, 6);
    const s = a + b;
    const p = a * b;
    return {
      prompt: `Biết a + b = ${s} và ab = ${p}. Tính a³ + b³.`,
      answer: s ** 3 - 3 * p * s,
      hints: [
        'a³ + b³ = (a + b)(a² − ab + b²) và a² + b² = (a + b)² − 2ab.',
        'Từ đó a³ + b³ = (a + b)³ − 3ab(a + b).',
      ],
      steps: [
        'a³ + b³ = (a + b)³ − 3ab(a + b).',
        `= ${s}³ − 3 · ${p} · ${s} = ${intText(s ** 3)} − ${intText(3 * p * s)} = ${intText(s ** 3 - 3 * p * s)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const datNhanTuChung = {
  id: 'dat-nhan-tu-chung',
  label: 'Đặt nhân tử chung',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = int(rand, 2, 6);
      const b = nonZero(rand, -7, 7);
      const poly = P([0, a * b, a]);
      return {
        prompt: `Phân tích ${poly} thành nhân tử: ${poly} = ${a}x(x + □). Số trong ô trống là bao nhiêu?`,
        answer: b,
        hints: [
          `Hai hạng tử cùng chia hết cho ${a}x.`,
          `Chia hạng tử thứ hai ${P([0, a * b])} cho ${a}x.`,
        ],
        steps: [
          `${poly} = ${a}x · x + ${a}x · ${operand(b)}.`,
          `= ${a}x(x ${signed(b)}); ô trống là ${intText(b)}.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 11, 99);
      const m = int(rand, 11, 89);
      const n = 100 - m;
      return {
        prompt: `Tính nhanh ${k} · ${m} + ${k} · ${n}.`,
        answer: 100 * k,
        hints: [`Hai tích có chung thừa số ${k}.`, `${m} + ${n} = 100.`],
        steps: [
          `${k} · ${m} + ${k} · ${n} = ${k} · (${m} + ${n}).`,
          `= ${k} · 100 = ${intText(100 * k)}.`,
        ],
      };
    }
    // x(x − a) + b(x − a): the common factor is a whole bracket.
    const a = nonZero(rand, -6, 6);
    const b = nonZero(rand, -6, 6);
    const br = bin(1, -a);
    const shown = `x${br} ${term(b, br)}`;
    return {
      prompt: `Phân tích ${shown} thành nhân tử: ${br}(x + □). Số trong ô trống là bao nhiêu?`,
      answer: b,
      hints: [
        `Nhân tử chung của hai hạng tử là cả ngoặc ${br}.`,
        'Đặt ngoặc đó ra ngoài, giữ lại x và số đứng trước ngoặc thứ hai.',
      ],
      steps: [`${shown} = ${br}(x ${signed(b)}).`, `Ô trống là ${intText(b)}.`],
    };
  },
};

/** @type {Skill} */
export const dungHangDangThuc = {
  id: 'dung-hang-dang-thuc',
  label: 'Dùng hằng đẳng thức',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const k = nonZero(rand, -9, 9);
      const poly = P([k * k, 2 * k, 1]);
      const op = k > 0 ? '+' : MINUS;
      return {
        prompt: `Viết ${poly} dưới dạng (x ${op} □)². Số trong ô trống là bao nhiêu?`,
        answer: Math.abs(k),
        hints: [
          `So sánh với (A ${op} B)² = A² ${op} 2AB + B² với A = x.`,
          `2AB = ${Math.abs(2 * k)}x, nên B bằng một nửa của ${Math.abs(2 * k)}.`,
        ],
        steps: [
          `${poly} = x² ${op} 2 · x · ${Math.abs(k)} + ${Math.abs(k)}².`,
          `= (x ${op} ${Math.abs(k)})²; ô trống là ${Math.abs(k)}.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 2, 9);
      const poly = P([0, -k * k, 0, 1]);
      return {
        prompt: `Phân tích ${poly} thành nhân tử: ${poly} = x(x − □)(x + □), hai ô trống cùng một số dương. Số đó là bao nhiêu?`,
        answer: k,
        hints: [
          'Đặt nhân tử chung x trước.',
          `Trong ngoặc còn x² − ${k * k}, là hiệu hai bình phương.`,
        ],
        steps: [
          `${poly} = x(x² − ${k * k}) = x(x² − ${k}²).`,
          `= x(x − ${k})(x + ${k}); số cần điền là ${k}.`,
        ],
      };
    }
    const m = pick(rand, [50, 100, 150, 200]);
    const d = int(rand, 1, 20);
    const a = m / 2 + d;
    const b = m / 2 - d;
    return {
      prompt: `Tính nhanh ${a}² − ${b}².`,
      answer: a * a - b * b,
      hints: ['Dùng A² − B² = (A + B)(A − B).', `${a} + ${b} = ${m}.`],
      steps: [
        `${a}² − ${b}² = (${a} + ${b})(${a} − ${b}).`,
        `= ${m} · ${a - b} = ${intText(a * a - b * b)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const nhomHangTu = {
  id: 'nhom-hang-tu',
  label: 'Nhóm hạng tử',
  make(rand) {
    const v = int(rand, 0, 1);
    if (v === 0) {
      const a = nonZero(rand, -6, 6);
      let b = nonZero(rand, -6, 6);
      // b = a gives a square, b = −a cancels the middle terms.
      while (b === a || b === -a) b = nonZero(rand, -6, 6);
      // x² + ax + bx + ab written ungathered, so the learner groups it.
      const shown = `x² ${term(a, 'x')} ${term(b, 'x')} ${signed(a * b)}`;
      return {
        prompt: `Phân tích ${shown} thành nhân tử: ${bin(1, a)}(x + □). Số trong ô trống là bao nhiêu?`,
        answer: b,
        hints: [
          'Nhóm hai hạng tử đầu và hai hạng tử cuối.',
          `Từ nhóm đầu đặt x ra ngoài, từ nhóm sau đặt ${intText(b)} ra ngoài.`,
        ],
        steps: [
          `${shown} = (x² ${term(a, 'x')}) + (${P([a * b, b])}).`,
          `= x${bin(1, a)} ${term(b, bin(1, a))} = ${bin(1, a)}(x ${signed(b)}).`,
          `Ô trống là ${intText(b)}.`,
        ],
      };
    }
    const k = nonZero(rand, -6, 6);
    const m = nonZero(rand, -6, 6);
    const shown = `xy ${term(k, 'y')} ${term(m, 'x')} ${signed(k * m)}`;
    return {
      prompt: `Phân tích ${shown} thành nhân tử: (x ${signed(k)})(y + □). Số trong ô trống là bao nhiêu?`,
      answer: m,
      hints: [
        'Nhóm xy với hạng tử chứa y, nhóm hạng tử chứa x với hạng tử tự do.',
        `Nhân tử chung sau khi nhóm là (x ${signed(k)}).`,
      ],
      steps: [
        `${shown} = (xy ${term(k, 'y')}) + (${lead(m, 'x')} ${signed(k * m)}).`,
        `= y(x ${signed(k)}) ${term(m, `(x ${signed(k)})`)} = (x ${signed(k)})(y ${signed(m)}).`,
        `Ô trống là ${intText(m)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const vanDung = {
  id: 'van-dung',
  label: 'Vận dụng: tìm x, tính nhanh',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const k = nonZero(rand, -9, 9);
      const poly = P([0, -k, 1]);
      return {
        prompt: `Tìm x ≠ 0 biết ${poly} = 0.`,
        answer: k,
        hints: [
          'Phân tích vế trái thành nhân tử.',
          'Một tích bằng 0 khi một trong các thừa số bằng 0.',
        ],
        steps: [
          `${poly} = x${bin(1, -k)} = 0.`,
          `x = 0 hoặc x ${signed(-k)} = 0. Vì x ≠ 0 nên x = ${intText(k)}.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 1, 9);
      const neg = rand() < 0.5;
      const poly = P([k * k, neg ? -2 * k : 2 * k, 1]);
      const root = neg ? k : -k;
      return {
        prompt: `Tìm x biết ${poly} = 0.`,
        answer: root,
        hints: [
          'Vế trái là bình phương của một tổng hoặc một hiệu.',
          'Một bình phương bằng 0 khi cơ số bằng 0.',
        ],
        steps: [
          `${poly} = ${bin(1, -root)}² = 0.`,
          `x ${signed(-root)} = 0, nên x = ${intText(root)}.`,
        ],
      };
    }
    const y = int(rand, 1, 9);
    const x = pick(rand, [10, 20, 30, 50]) + y;
    const d = x - y;
    return {
      prompt: `Tính giá trị của biểu thức x² − 2xy + y² tại x = ${x}, y = ${y}.`,
      answer: d * d,
      hints: ['Viết biểu thức thành bình phương của một hiệu.', 'x² − 2xy + y² = (x − y)².'],
      steps: [
        `x² − 2xy + y² = (x − y)².`,
        `Tại x = ${x}, y = ${y}: (${x} − ${y})² = ${d}² = ${intText(d * d)}.`,
      ],
    };
  },
};

export const SKILLS_TRANG_40 = [binhPhuong, lapPhuong, tongHieuLapPhuong];
export const SKILLS_TRANG_45 = [datNhanTuChung, dungHangDangThuc, nhomHangTu, vanDung];

/** Every skill of the chapter, in lesson order. */
export const CHAPTER_SKILLS = [...SKILLS_TRANG_40, ...SKILLS_TRANG_45];
