/**
 * Question generators for the chapter "Hàm số y = ax² (a ≠ 0). Phương trình
 * bậc hai một ẩn", for the drill board of its practice and review lessons.
 * Answers are integers or short decimals, read with `readNumber` and written
 * with `numberText` from `#lib/core/decimal.js`. Prompts, hints and steps are
 * rich text with inline TeX.
 */

import { int, pick } from '#lib/core/drill.js';
import { numTex } from '#lib/algebra-engine/polynomial.js';
import { clean, discriminant, quadTex, solveQuadratic, texOperand } from './quadratic.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** Coefficients a whose products with small squares stay short decimals. */
const NICE_A = [-3, -2, -1.5, -1, -0.5, -0.25, 0.25, 0.5, 1, 1.5, 2, 3];

/**
 * A whole number other than 0 in [lo, hi].
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 */
function nonZero(rand, lo, hi) {
  const v = int(rand, lo, hi);
  return v === 0 ? hi : v;
}

/** @type {Skill} */
export const hamSo = {
  id: 'ham-so-y-ax2',
  label: 'Bài 18. Hàm số y = ax² (a ≠ 0)',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      // Value of y = ax² at a given x.
      const a = pick(rand, NICE_A);
      const x = nonZero(rand, -4, 4);
      const y = clean(a * x * x);
      return {
        prompt: `Cho hàm số $y = ${quadTex(a, 0, 0)}$. Tính giá trị của $y$ tại $x = ${numTex(x)}$.`,
        answer: y,
        steps: [
          `Thay $x = ${numTex(x)}$: $y = ${numTex(a)} \\cdot ${texOperand(x)}^2$.`,
          `$= ${numTex(a)} \\cdot ${x * x} = ${numTex(y)}$.`,
        ],
        hints: [
          'Thay giá trị của $x$ vào công thức.',
          'Bình phương $x$ trước rồi mới nhân với $a$.',
        ],
      };
    }
    if (variant === 1) {
      // The a that puts a given point on the graph.
      const a = pick(rand, NICE_A);
      const x = nonZero(rand, -4, 4);
      const y = clean(a * x * x);
      return {
        prompt: `Đồ thị của hàm số $y = ax^2$ đi qua điểm $A(${numTex(x)}; ${numTex(y)})$. Tìm $a$.`,
        answer: a,
        steps: [
          `$A$ thuộc đồ thị nên $${numTex(y)} = a \\cdot ${texOperand(x)}^2 = ${x * x}a$.`,
          `$a = ${numTex(y)} : ${x * x} = ${numTex(a)}$.`,
        ],
        hints: ['Điểm $M(x_0; y_0)$ thuộc đồ thị khi $y_0 = a x_0^2$.'],
      };
    }
    // The positive x of the point with a given y.
    const a = pick(rand, [-3, -2, -0.5, 0.5, 1, 2, 3]);
    const x = int(rand, 1, 5);
    const y = clean(a * x * x);
    return {
      prompt: `Trên parabol $y = ${quadTex(a, 0, 0)}$, tìm hoành độ dương của điểm có tung độ bằng $${numTex(y)}$.`,
      answer: x,
      steps: [
        `Giải $${quadTex(a, 0, 0)} = ${numTex(y)}$: $x^2 = ${numTex(y)} : ${texOperand(a)} = ${x * x}$.`,
        `$x = ${x}$ hoặc $x = -${x}$; hoành độ dương là $${x}$.`,
      ],
      hints: [
        'Thay $y$ vào công thức rồi tìm $x^2$.',
        'Hai điểm đối xứng qua $Oy$ có cùng tung độ.',
      ],
    };
  },
};

/** @type {Skill} */
export const bietThuc = {
  id: 'biet-thuc',
  label: 'Bài 19. Biệt thức Δ',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const a = nonZero(rand, -4, 4);
      const b = int(rand, -9, 9);
      const c = nonZero(rand, -9, 9);
      const d = discriminant(a, b, c);
      return {
        prompt: `Tính biệt thức $\\Delta$ của phương trình $${quadTex(a, b, c)} = 0$.`,
        answer: d,
        steps: [
          `$a = ${a}$, $b = ${b}$, $c = ${c}$.`,
          `$\\Delta = b^2 - 4ac = ${texOperand(b)}^2 - 4 \\cdot ${texOperand(a)} \\cdot ${texOperand(c)} = ${numTex(d)}$.`,
        ],
        hints: ['$\\Delta = b^2 - 4ac$.', 'Chú ý dấu của $a$, $b$, $c$.'],
      };
    }
    if (variant === 1) {
      const a = nonZero(rand, -4, 4);
      const half = nonZero(rand, -6, 6);
      const c = nonZero(rand, -9, 9);
      const d = clean(half * half - a * c);
      return {
        prompt: `Tính $\\Delta'$ của phương trình $${quadTex(a, 2 * half, c)} = 0$.`,
        answer: d,
        steps: [
          `$b = ${2 * half}$ nên $b' = ${half}$.`,
          `$\\Delta' = b'^2 - ac = ${texOperand(half)}^2 - ${texOperand(a)} \\cdot ${texOperand(c)} = ${numTex(d)}$.`,
        ],
        hints: ["$b = 2b'$, $\\Delta' = b'^2 - ac$."],
      };
    }
    // Nghiệm kép: x² + bx + m = 0 with b even.
    const half = nonZero(rand, -6, 6);
    const m = half * half;
    return {
      prompt: `Tìm $m$ để phương trình $${quadTex(1, 2 * half, 0)} + m = 0$ có nghiệm kép.`,
      answer: m,
      steps: [
        `$\\Delta' = ${texOperand(half)}^2 - 1 \\cdot m = ${m} - m$.`,
        `Nghiệm kép khi $\\Delta' = 0$, tức $m = ${m}$.`,
      ],
      hints: ["Phương trình có nghiệm kép khi $\\Delta = 0$ (hay $\\Delta' = 0$)."],
    };
  },
};

/** @type {Skill} */
export const giaiPhuongTrinh = {
  id: 'giai-phuong-trinh-bac-hai',
  label: 'Bài 19. Giải phương trình bậc hai',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      // Two roots: a(x − r)(x − s), one of them a half when a = 2.
      const a = pick(rand, [1, 1, 2, -1, 3, -2]);
      const r = int(rand, -6, 6);
      let s = a === 2 ? int(rand, -9, 9) / 2 : int(rand, -6, 6);
      if (s === r) s = r + 1;
      const b = clean(-a * (r + s));
      const c = clean(a * r * s);
      const { delta, roots } = solveQuadratic(a, b, c);
      const larger = rand() < 0.5;
      const answer = larger ? roots[0] : roots[1];
      const sq = Math.round(Math.sqrt(delta));
      return {
        prompt: `Giải phương trình $${quadTex(a, b, c)} = 0$. Nhập nghiệm ${larger ? 'lớn hơn' : 'nhỏ hơn'}.`,
        answer,
        steps: [
          `$\\Delta = ${texOperand(b)}^2 - 4 \\cdot ${texOperand(a)} \\cdot ${texOperand(c)} = ${numTex(delta)}$, $\\sqrt{\\Delta} = ${sq}$.`,
          `$x = \\dfrac{${numTex(-b)} \\pm ${sq}}{${numTex(2 * a)}}$, nên $x_1 = ${numTex(roots[0])}$, $x_2 = ${numTex(roots[1])}$.`,
          `Nghiệm ${larger ? 'lớn hơn' : 'nhỏ hơn'} là $${numTex(answer)}$.`,
        ],
        hints: ['Tính $\\Delta = b^2 - 4ac$.', 'Dùng $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$.'],
      };
    }
    if (variant === 1) {
      // c = 0: ax² + bx = 0.
      const a = nonZero(rand, -4, 4);
      const root = nonZero(rand, -7, 7);
      const b = -a * root;
      return {
        prompt: `Giải phương trình $${quadTex(a, b, 0)} = 0$. Nhập nghiệm khác $0$.`,
        answer: root,
        steps: [
          `Đặt nhân tử chung: $x(${quadTex(0, a, b)}) = 0$.`,
          `$x = 0$ hoặc $${quadTex(0, a, b)} = 0 \\Leftrightarrow x = ${numTex(root)}$.`,
        ],
        hints: ['Phương trình khuyết $c$: đặt $x$ làm nhân tử chung.'],
      };
    }
    if (variant === 2) {
      // b = 0: ax² + c = 0.
      const a = nonZero(rand, -5, 5);
      const root = int(rand, 1, 6);
      const c = -a * root * root;
      return {
        prompt: `Giải phương trình $${quadTex(a, 0, c)} = 0$. Nhập nghiệm dương.`,
        answer: root,
        steps: [
          `$${quadTex(a, 0, 0)} = ${numTex(-c)} \\Leftrightarrow x^2 = ${root * root}$.`,
          `$x = ${root}$ hoặc $x = -${root}$; nghiệm dương là $${root}$.`,
        ],
        hints: ['Phương trình khuyết $b$: chuyển $c$ sang vế phải rồi chia cho $a$.'],
      };
    }
    // Double root a(x − r)².
    const a = pick(rand, [1, 1, 4, -1, -4]);
    const r = Math.abs(a) === 4 ? nonZero(rand, -5, 5) / 2 : nonZero(rand, -6, 6);
    const b = clean(-2 * a * r);
    const c = clean(a * r * r);
    return {
      prompt: `Phương trình $${quadTex(a, b, c)} = 0$ có nghiệm kép. Tìm nghiệm kép đó.`,
      answer: r,
      steps: [
        `$\\Delta = ${texOperand(b)}^2 - 4 \\cdot ${texOperand(a)} \\cdot ${texOperand(c)} = 0$.`,
        `$x_1 = x_2 = -\\dfrac{b}{2a} = ${numTex(r)}$.`,
      ],
      hints: ['Nghiệm kép $x_1 = x_2 = -\\dfrac{b}{2a}$.'],
    };
  },
};

/** The drill of "Luyện tập chung" after Bài 18 and Bài 19. */
export const SKILLS_TRANG_18 = [hamSo, bietThuc, giaiPhuongTrinh];
