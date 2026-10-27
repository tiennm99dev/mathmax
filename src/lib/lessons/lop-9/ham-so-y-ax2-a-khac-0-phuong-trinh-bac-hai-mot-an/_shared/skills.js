/**
 * Question generators for the chapter "Hàm số y = ax² (a ≠ 0). Phương trình
 * bậc hai một ẩn", for the drill board of its practice and review lessons.
 * Answers are integers or short decimals, read with `readNumber` and written
 * with `numberText` from `#lib/core/decimal.js`. Prompts, hints and steps are
 * rich text with inline TeX.
 */

import { int, pick } from '#lib/core/drill.js';
import { numTex as dottedTex } from '#lib/algebra-engine/polynomial.js';
import { clean, discriminant, quadTex, solveQuadratic, texOperand } from './quadratic.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A number in TeX with the book's thousands spacing and decimal comma:
 * 1296 gives '1\,296', -2.5 gives '-2{,}5'.
 * @param {number} v
 */
const numTex = (v) => dottedTex(v).replace(/(\d)\.(?=\d{3})/g, '$1\\,');

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

/** Leading coefficients whose quotients −b/a and c/a stay short decimals. */
const VIETE_A = [1, 1, 2, 4, 5, -1, -2, -4, -5];

/** @type {Skill} */
export const viete = {
  id: 'dinh-li-viete',
  label: 'Bài 20. Định lí Viète và ứng dụng',
  make(rand) {
    const variant = int(rand, 0, 4);
    if (variant <= 1) {
      // Sum or product of the roots without solving.
      const a = pick(rand, VIETE_A);
      let b = int(rand, -12, 12);
      let c = nonZero(rand, -12, 12);
      while (discriminant(a, b, c) <= 0) {
        b = int(rand, -12, 12);
        c = nonZero(rand, -12, 12);
      }
      const delta = discriminant(a, b, c);
      const sum = variant === 0;
      const answer = sum ? clean(-b / a) : clean(c / a);
      return {
        prompt: `Không giải phương trình, tính ${sum ? 'tổng' : 'tích'} hai nghiệm của phương trình $${quadTex(a, b, c)} = 0$.`,
        answer,
        steps: [
          `$\\Delta = ${texOperand(b)}^2 - 4 \\cdot ${texOperand(a)} \\cdot ${texOperand(c)} = ${numTex(delta)} > 0$ nên phương trình có hai nghiệm phân biệt.`,
          sum
            ? `Theo định lí Viète: $x_1 + x_2 = -\\dfrac{b}{a} = -\\dfrac{${numTex(b)}}{${numTex(a)}} = ${numTex(answer)}$.`
            : `Theo định lí Viète: $x_1 x_2 = \\dfrac{c}{a} = \\dfrac{${numTex(c)}}{${numTex(a)}} = ${numTex(answer)}$.`,
        ],
        hints: [
          'Kiểm tra phương trình có nghiệm ($\\Delta \\ge 0$) trước khi dùng định lí Viète.',
          sum ? '$x_1 + x_2 = -\\dfrac{b}{a}$.' : '$x_1 x_2 = \\dfrac{c}{a}$.',
        ],
      };
    }
    if (variant === 2) {
      // A symmetric expression of the roots of x² + bx + c = 0.
      let s = nonZero(rand, -7, 7);
      let p = nonZero(rand, -12, 12);
      while (s * s - 4 * p <= 0) {
        s = nonZero(rand, -7, 7);
        p = nonZero(rand, -12, 12);
      }
      const kind = int(rand, 0, 2);
      const [exprTex, formula, answer] =
        kind === 0
          ? ['x_1^2 + x_2^2', '(x_1 + x_2)^2 - 2x_1 x_2', s * s - 2 * p]
          : kind === 1
            ? ['(x_1 - x_2)^2', '(x_1 + x_2)^2 - 4x_1 x_2', s * s - 4 * p]
            : ['x_1^3 + x_2^3', '(x_1 + x_2)^3 - 3x_1 x_2(x_1 + x_2)', s ** 3 - 3 * p * s];
      const value =
        kind === 0
          ? `${texOperand(s)}^2 - 2 \\cdot ${texOperand(p)}`
          : kind === 1
            ? `${texOperand(s)}^2 - 4 \\cdot ${texOperand(p)}`
            : `${texOperand(s)}^3 - 3 \\cdot ${texOperand(p)} \\cdot ${texOperand(s)}`;
      return {
        prompt: `Gọi $x_1$, $x_2$ là hai nghiệm của phương trình $${quadTex(1, -s, p)} = 0$. Không giải phương trình, tính $${exprTex}$.`,
        answer,
        steps: [
          `$\\Delta = ${s * s - 4 * p} > 0$; theo định lí Viète: $x_1 + x_2 = ${s}$, $x_1 x_2 = ${p}$.`,
          `$${exprTex} = ${formula}$.`,
          `$= ${value} = ${answer}$.`,
        ],
        hints: [
          'Tính tổng $S$ và tích $P$ của hai nghiệm theo định lí Viète.',
          `Viết $${exprTex}$ theo $x_1 + x_2$ và $x_1 x_2$.`,
        ],
      };
    }
    if (variant === 3) {
      // Mental roots: a + b + c = 0 or a − b + c = 0.
      const a = pick(rand, VIETE_A);
      let c = nonZero(rand, -9, 9);
      if (c === a) c = -a;
      const plus = rand() < 0.5;
      const b = plus ? -a - c : a + c;
      const answer = plus ? clean(c / a) : clean(-c / a);
      const known = plus ? 1 : -1;
      return {
        prompt: `Nhẩm nghiệm của phương trình $${quadTex(a, b, c)} = 0$. Nhập nghiệm khác $${known}$.`,
        answer,
        steps: [
          plus
            ? `$a + b + c = ${numTex(a)} + ${texOperand(b)} + ${texOperand(c)} = 0$ nên $x_1 = 1$.`
            : `$a - b + c = ${numTex(a)} - ${texOperand(b)} + ${texOperand(c)} = 0$ nên $x_1 = -1$.`,
          plus
            ? `$x_2 = \\dfrac{c}{a} = \\dfrac{${numTex(c)}}{${numTex(a)}} = ${numTex(answer)}$.`
            : `$x_2 = -\\dfrac{c}{a} = -\\dfrac{${numTex(c)}}{${numTex(a)}} = ${numTex(answer)}$.`,
        ],
        hints: [
          'Tính $a + b + c$ và $a - b + c$.',
          'Nghiệm còn lại suy ra từ tích $x_1 x_2 = \\dfrac{c}{a}$.',
        ],
      };
    }
    // Two numbers from their sum and product.
    const u = int(rand, -9, 15);
    let v = int(rand, -9, 15);
    if (v === u) v = u - int(rand, 1, 6);
    const big = Math.max(u, v);
    const small = Math.min(u, v);
    const s = u + v;
    const p = u * v;
    const larger = rand() < 0.5;
    const answer = larger ? big : small;
    return {
      prompt: `Tìm hai số biết tổng của chúng bằng $${s}$ và tích bằng $${p}$. Nhập số ${larger ? 'lớn hơn' : 'nhỏ hơn'}.`,
      answer,
      steps: [
        `Hai số cần tìm là nghiệm của phương trình $${quadTex(1, -s, p)} = 0$.`,
        `$\\Delta = ${texOperand(s)}^2 - 4 \\cdot ${texOperand(p)} = ${s * s - 4 * p}$, $\\sqrt{\\Delta} = ${big - small}$.`,
        `$x_1 = \\dfrac{${s} + ${big - small}}{2} = ${big}$, $x_2 = \\dfrac{${s} - ${big - small}}{2} = ${small}$. Số ${larger ? 'lớn hơn' : 'nhỏ hơn'} là $${answer}$.`,
      ],
      hints: ['Hai số có tổng $S$, tích $P$ là nghiệm của $x^2 - Sx + P = 0$.'],
    };
  },
};

/** Two teams' times: the faster team alone x hours, the other x + k, together t. */
const TEAM_TIMES = [
  { x: 2, k: 1, t: 1.2 },
  { x: 3, k: 3, t: 2 },
  { x: 4, k: 2, t: 2.4 },
  { x: 4, k: 12, t: 3.2 },
  { x: 3, k: 6, t: 2.25 },
  { x: 6, k: 3, t: 3.6 },
  { x: 6, k: 4, t: 3.75 },
  { x: 6, k: 6, t: 4 },
  { x: 10, k: 5, t: 6 },
  { x: 12, k: 6, t: 7.2 },
];

/**
 * A time in hours as 'h giờ m phút' with TeX numbers: 1,2 gives '$1$ giờ $12$
 * phút', 0,5 gives '$30$ phút'.
 * @param {number} hours
 */
export function hoursText(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `$${h}$ giờ`;
  return h === 0 ? `$${m}$ phút` : `$${h}$ giờ $${m}$ phút`;
}

/** @type {Skill} */
export const lapPhuongTrinh = {
  id: 'lap-phuong-trinh-bac-hai',
  label: 'Bài 21. Giải bài toán bằng cách lập phương trình',
  make(rand) {
    const variant = int(rand, 0, 4);
    if (variant === 0) {
      // Two consecutive natural numbers with a given product.
      const n = int(rand, 5, 25);
      const p = n * (n + 1);
      const sq = 2 * n + 1;
      return {
        prompt: `Tích của hai số tự nhiên liên tiếp bằng $${p}$. Tìm số nhỏ hơn.`,
        answer: n,
        steps: [
          `Gọi số nhỏ là $x$ $(x \\in \\mathbb{N})$, số liền sau là $x + 1$. Ta có $x(x + 1) = ${p}$, tức $x^2 + x - ${p} = 0$.`,
          `$\\Delta = 1 + 4 \\cdot ${p} = ${numTex(sq * sq)} = ${sq}^2$; $x_1 = \\dfrac{-1 + ${sq}}{2} = ${n}$, $x_2 = \\dfrac{-1 - ${sq}}{2} = ${-n - 1}$ (loại vì không là số tự nhiên).`,
          `Số nhỏ hơn là $${n}$.`,
        ],
        hints: [
          'Gọi số nhỏ là $x$ thì số kia là $x + 1$.',
          'Lập phương trình $x(x + 1) = P$ rồi loại nghiệm âm.',
        ],
      };
    }
    if (variant === 1) {
      // A rectangle with a given area, length = width + d.
      const w = int(rand, 3, 15);
      const d = int(rand, 1, 8);
      const area = w * (w + d);
      const sq = 2 * w + d;
      return {
        prompt: `Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng $${d}$ m và diện tích bằng $${area}$ m². Tính chiều rộng của mảnh vườn (theo mét).`,
        answer: w,
        unit: 'm',
        steps: [
          `Gọi chiều rộng là $x$ (m), $x > 0$; chiều dài là $x + ${d}$ (m). Ta có $x(x + ${d}) = ${area}$, tức $${quadTex(1, d, -area)} = 0$.`,
          `$\\Delta = ${d * d} + 4 \\cdot ${area} = ${numTex(sq * sq)} = ${sq}^2$; $x_1 = \\dfrac{-${d} + ${sq}}{2} = ${w}$, $x_2 = \\dfrac{-${d} - ${sq}}{2} = ${-w - d}$ (loại vì $x > 0$).`,
          `Chiều rộng mảnh vườn là $${w}$ m.`,
        ],
        hints: [
          'Gọi chiều rộng là $x$ (m) thì chiều dài là $x + d$.',
          'Diện tích bằng chiều dài nhân chiều rộng; loại nghiệm âm.',
        ],
      };
    }
    if (variant === 2) {
      // Two teams sharing one job.
      const { x, k, t } = pick(rand, TEAM_TIMES);
      const b = clean(k - 2 * t);
      const c = clean(-k * t);
      const other = clean(c / x);
      return {
        prompt: `Hai đội công nhân cùng làm một công việc thì hoàn thành sau ${hoursText(t)}. Nếu làm riêng, đội I hoàn thành công việc nhanh hơn đội II $${k}$ giờ. Hỏi nếu làm riêng thì đội I cần bao nhiêu giờ?`,
        answer: x,
        unit: 'giờ',
        steps: [
          `${Number.isInteger(t) ? '' : `${hoursText(t)} $= ${numTex(t)}$ giờ. `}Gọi thời gian đội I làm riêng là $x$ (giờ), $x > 0$; đội II cần $x + ${k}$ giờ.`,
          `Mỗi giờ hai đội làm được $\\dfrac{1}{x} + \\dfrac{1}{x + ${k}} = \\dfrac{1}{${numTex(t)}}$ công việc, suy ra $${numTex(t)}(2x + ${k}) = x(x + ${k})$, tức $${quadTex(1, b, c)} = 0$.`,
          `Phương trình có hai nghiệm $${x}$ và $${numTex(other)}$; loại nghiệm âm.`,
          `Đội I làm riêng cần $${x}$ giờ (đội II cần $${x + k}$ giờ).`,
        ],
        hints: [
          'Gọi thời gian đội I làm riêng là $x$ giờ; mỗi giờ đội I làm được $\\dfrac{1}{x}$ công việc.',
          'Đổi thời gian làm chung ra giờ rồi lập phương trình theo phần việc làm được trong một giờ.',
        ],
      };
    }
    if (variant === 3) {
      // A trip finished earlier at a higher speed.
      let v = 0;
      let k = 0;
      let t = 0;
      let dist = 0.5;
      while (!Number.isInteger(dist) || dist > 900) {
        v = 5 * int(rand, 6, 12);
        k = pick(rand, [5, 10, 15, 20]);
        t = pick(rand, [0.5, 1]);
        dist = (t * v * (v + k)) / k;
      }
      const c = clean((-dist * k) / t);
      return {
        prompt: `Một ô tô đi quãng đường $${dist}$ km với vận tốc không đổi. Nếu mỗi giờ ô tô đi nhanh hơn $${k}$ km thì đến nơi sớm hơn ${hoursText(t)}. Tính vận tốc ban đầu của ô tô (km/h).`,
        answer: v,
        unit: 'km/h',
        steps: [
          `Gọi vận tốc ban đầu là $x$ (km/h), $x > 0$. Thời gian đi là $\\dfrac{${dist}}{x}$ giờ; khi đi nhanh hơn là $\\dfrac{${dist}}{x + ${k}}$ giờ.`,
          `$\\dfrac{${dist}}{x} - \\dfrac{${dist}}{x + ${k}} = ${numTex(t)}$, suy ra $x^2 + ${k}x - ${numTex(-c)} = 0$.`,
          `Phương trình có hai nghiệm $${v}$ và $${-v - k}$; loại nghiệm âm.`,
          `Vận tốc ban đầu của ô tô là $${v}$ km/h.`,
        ],
        hints: [
          'Gọi vận tốc ban đầu là $x$ km/h; thời gian bằng quãng đường chia vận tốc.',
          'Thời gian lúc đầu trừ thời gian lúc sau bằng thời gian đến sớm hơn.',
        ],
      };
    }
    // The same growth rate applied twice.
    const base = pick(rand, [100, 200, 400]);
    const r = base === 400 ? pick(rand, [5, 10, 20, 25, 50]) : pick(rand, [10, 20, 30, 50]);
    const end = (base * (100 + r) ** 2) / 10000;
    const ratio = clean(end / base);
    const root = clean(1 + r / 100);
    return {
      prompt: `Giá một chiếc áo là $${base}$ nghìn đồng. Sau hai lần tăng giá liên tiếp, mỗi lần tăng cùng một tỉ lệ phần trăm so với giá ngay trước đó, giá chiếc áo là $${end}$ nghìn đồng. Mỗi lần giá tăng bao nhiêu phần trăm?`,
      answer: r,
      unit: '%',
      steps: [
        `Gọi tỉ lệ tăng mỗi lần là $x$ (viết dưới dạng số thập phân), $x > 0$. Sau hai lần tăng, giá là $${base}(1 + x)^2$ nghìn đồng.`,
        `$${base}(1 + x)^2 = ${end} \\Leftrightarrow (1 + x)^2 = ${numTex(ratio)} \\Leftrightarrow 1 + x = ${numTex(root)}$ hoặc $1 + x = -${numTex(root)}$.`,
        `$x = ${numTex(clean(root - 1))}$ hoặc $x = ${numTex(clean(-root - 1))}$ (loại vì $x > 0$).`,
        `Mỗi lần giá tăng $${r}\\%$.`,
      ],
      hints: [
        'Sau mỗi lần tăng $x$, giá được nhân với $1 + x$.',
        'Lập phương trình $A(1 + x)^2 = B$ rồi loại nghiệm âm.',
      ],
    };
  },
};

/** The drill of "Luyện tập chung" after Bài 18 and Bài 19. */
export const SKILLS_TRANG_18 = [hamSo, bietThuc, giaiPhuongTrinh];

/** The drill of "Luyện tập chung" after Bài 20 and Bài 21. */
export const SKILLS_TRANG_28 = [viete, lapPhuongTrinh];

/** The end-of-chapter review: one skill per lesson of the chapter. */
export const CHAPTER_SKILLS = [hamSo, bietThuc, giaiPhuongTrinh, viete, lapPhuongTrinh];
