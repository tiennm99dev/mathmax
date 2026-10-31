/**
 * Question generators for the chapter "Một số hình khối trong thực tiễn"
 * (lớp 9), for the drill boards of its practice and review lessons. An
 * answer is either the number k of a result written kπ (a whole number or a
 * fraction such as 32/3, typed exactly) or a result rounded to the tenths
 * or to a whole number, drawn so it never sits on a rounding half. Prompts
 * and steps are rich text with the book's decimal comma.
 */

import { int, pick, retryMake, rounded } from '#lib/core/drill.js';
import { numberText } from '#lib/core/decimal.js';
import { numTex } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** A number as the book writes it: '6,5', '7', '32/3'. */
const t = (/** @type {number} */ v) => numberText(v);
/**
 * (n/d)·π in TeX from whole numbers n and d, the fraction in lowest
 * terms: '60\\pi', '\\dfrac{32}{3}\\pi', '1\\,256\\pi'.
 * @param {number} n
 * @param {number} [d]
 */
function piTex(n, d = 1) {
  const g = gcd(n, d);
  const [p, q] = [n / g, d / g];
  if (q === 1) return `${p === 1 ? '' : numTex(p)}\\pi`;
  return `\\dfrac{${numTex(p)}}{${q}}\\pi`;
}
/** A rounded result for TeX: '188{,}5', '1\\,520{,}5'. */
const tex = (/** @type {number} */ v) => numTex(v, 2);

/** Pythagorean triples (leg, leg, hypotenuse). */
export const TRIPLES = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20],
  [7, 24, 25],
];

const ASK_K = 'Viết kết quả dưới dạng $k\\pi$ và nhập số $k$.';

/** @type {Skill} */
export const hinhTru = {
  id: 'hinh-tru',
  label: 'Bài 31. Hình trụ',
  make(rand) {
    const variant = int(rand, 0, 3);
    const r = int(rand, 1, 9);
    const h = int(rand, 2, 15);
    if (variant === 0) {
      return {
        prompt: `Hình trụ có bán kính đáy ${r} cm, chiều cao ${h} cm. Tính diện tích xung quanh (cm²). ${ASK_K}`,
        answer: 2 * r * h,
        steps: [
          '$S_{xq} = 2\\pi rh$.',
          `$S_{xq} = 2\\pi \\cdot ${r} \\cdot ${h} = ${piTex(2 * r * h)}$ (cm²), nên $k = ${2 * r * h}$.`,
        ],
        hints: ['$S_{xq} = 2\\pi rh$.'],
      };
    }
    if (variant === 1) {
      return {
        prompt: `Hình trụ có bán kính đáy ${r} cm, chiều cao ${h} cm. Tính thể tích (cm³). ${ASK_K}`,
        answer: r * r * h,
        steps: [
          '$V = \\pi r^2 h$.',
          `$V = \\pi \\cdot ${r}^2 \\cdot ${h} = ${piTex(r * r * h)}$ (cm³), nên $k = ${r * r * h}$.`,
        ],
        hints: ['$V = \\pi r^2 h$; nhớ bình phương bán kính.'],
      };
    }
    if (variant === 2) {
      const v = r * r * h;
      return {
        prompt: `Hình trụ có thể tích $${v}\\pi$ cm³ và bán kính đáy ${r} cm. Tính chiều cao của hình trụ (cm).`,
        answer: h,
        unit: 'cm',
        steps: [
          'Từ $V = \\pi r^2 h$ suy ra $h = \\dfrac{V}{\\pi r^2}$.',
          `$h = \\dfrac{${v}\\pi}{\\pi \\cdot ${r * r}} = ${h}$ (cm).`,
        ],
        hints: ['Từ $V = \\pi r^2 h$, chia $V$ cho $\\pi r^2$.'],
      };
    }
    return retryMake(() => {
      const r = int(rand, 1, 9);
      const h = int(rand, 2, 15);
      const total = 2 * Math.PI * r * h + 2 * Math.PI * r * r;
      const answer = rounded(total, 1);
      if (answer === null) return null;
      return {
        prompt: `Hình trụ có đường kính đáy ${2 * r} cm, chiều cao ${h} cm. Tính diện tích toàn phần (cm², làm tròn đến hàng phần mười).`,
        answer,
        unit: 'cm²',
        steps: [
          `Bán kính đáy $r = ${2 * r} : 2 = ${r}$ (cm).`,
          `$S_{xq} = 2\\pi \\cdot ${r} \\cdot ${h} = ${piTex(2 * r * h)}$; hai đáy: $2\\pi \\cdot ${r}^2 = ${piTex(2 * r * r)}$.`,
          `$S_{tp} = ${piTex(2 * r * h + 2 * r * r)} \\approx ${tex(answer)}$ (cm²).`,
        ],
        hints: ['Bán kính bằng nửa đường kính.', '$S_{tp} = 2\\pi rh + 2\\pi r^2$.'],
      };
    });
  },
};

/** @type {Skill} */
export const hinhNon = {
  id: 'hinh-non',
  label: 'Bài 31. Hình nón',
  make(rand) {
    const variant = int(rand, 0, 3);
    const [a, b, c] = pick(rand, TRIPLES);
    if (variant === 0) {
      return {
        prompt: `Hình nón có bán kính đáy ${a} cm, chiều cao ${b} cm. Tính độ dài đường sinh (cm).`,
        answer: c,
        unit: 'cm',
        steps: [
          'Đường cao, bán kính đáy và đường sinh tạo thành tam giác vuông: $l^2 = r^2 + h^2$.',
          `$l^2 = ${a * a} + ${b * b} = ${c * c}$, nên $l = ${c}$ (cm).`,
        ],
        hints: ['$l^2 = r^2 + h^2$.'],
      };
    }
    if (variant === 1) {
      const r = int(rand, 2, 9);
      const l = int(rand, r + 1, 20);
      return {
        prompt: `Hình nón có bán kính đáy ${r} cm, đường sinh ${l} cm. Tính diện tích xung quanh (cm²). ${ASK_K}`,
        answer: r * l,
        steps: [
          '$S_{xq} = \\pi rl$.',
          `$S_{xq} = \\pi \\cdot ${r} \\cdot ${l} = ${piTex(r * l)}$ (cm²), nên $k = ${r * l}$.`,
        ],
        hints: ['$S_{xq} = \\pi rl$, dùng đường sinh $l$.'],
      };
    }
    if (variant === 2) {
      const r = 3 * int(rand, 1, 4);
      const h = int(rand, 2, 15);
      return {
        prompt: `Hình nón có bán kính đáy ${r} cm, chiều cao ${h} cm. Tính thể tích (cm³). ${ASK_K}`,
        answer: (r * r * h) / 3,
        steps: [
          '$V = \\dfrac{1}{3}\\pi r^2 h$.',
          `$V = \\dfrac{1}{3}\\pi \\cdot ${r * r} \\cdot ${h} = ${piTex(r * r * h, 3)}$ (cm³), nên $k = ${(r * r * h) / 3}$.`,
        ],
        hints: ['$V = \\dfrac{1}{3}\\pi r^2 h$; đừng quên hệ số $\\dfrac{1}{3}$.'],
      };
    }
    return retryMake(() => {
      const [r, h, l] = pick(rand, TRIPLES);
      const answer = rounded(Math.PI * (r * l + r * r), 1);
      if (answer === null) return null;
      return {
        prompt: `Hình nón có bán kính đáy ${r} cm, chiều cao ${h} cm. Tính diện tích toàn phần (cm², làm tròn đến hàng phần mười).`,
        answer,
        unit: 'cm²',
        steps: [
          `Đường sinh: $l^2 = ${r * r} + ${h * h} = ${l * l}$, nên $l = ${l}$ cm.`,
          `$S_{xq} = \\pi \\cdot ${r} \\cdot ${l} = ${piTex(r * l)}$; đáy: $\\pi \\cdot ${r}^2 = ${piTex(r * r)}$.`,
          `$S_{tp} = ${piTex(r * l + r * r)} \\approx ${tex(answer)}$ (cm²).`,
        ],
        hints: ['Tính đường sinh trước: $l^2 = r^2 + h^2$.', '$S_{tp} = \\pi rl + \\pi r^2$.'],
      };
    });
  },
};

/** @type {Skill} */
export const hinhCau = {
  id: 'hinh-cau',
  label: 'Bài 32. Hình cầu',
  make(rand) {
    const variant = int(rand, 0, 4);
    const R = int(rand, 1, 12);
    if (variant === 0) {
      return {
        prompt: `Mặt cầu có bán kính ${R} cm. Tính diện tích mặt cầu (cm²). ${ASK_K}`,
        answer: 4 * R * R,
        steps: [
          '$S = 4\\pi R^2$.',
          `$S = 4\\pi \\cdot ${R}^2 = ${piTex(4 * R * R)}$ (cm²), nên $k = ${4 * R * R}$.`,
        ],
        hints: ['$S = 4\\pi R^2$.'],
      };
    }
    if (variant === 1) {
      const k = (4 * R * R * R) / 3;
      return {
        prompt: `Hình cầu có bán kính ${R} cm. Tính thể tích (cm³). ${ASK_K} ($k$ có thể là phân số, ví dụ 32/3.)`,
        answer: k,
        steps: [
          '$V = \\dfrac{4}{3}\\pi R^3$.',
          `$V = \\dfrac{4}{3}\\pi \\cdot ${R * R * R} = ${piTex(4 * R * R * R, 3)}$ (cm³), nên $k = ${t(k)}$.`,
        ],
        hints: ['$V = \\dfrac{4}{3}\\pi R^3$.'],
      };
    }
    if (variant === 2) {
      const [a, b, c] = pick(rand, TRIPLES);
      return {
        prompt: `Cắt hình cầu bán kính ${c} cm bởi một mặt phẳng cách tâm ${a} cm. Tính bán kính của hình tròn cắt (cm).`,
        answer: b,
        unit: 'cm',
        steps: [
          'Gọi $I$ là tâm hình tròn cắt, $M$ trên biên: tam giác $OIM$ vuông tại $I$, $OM = R$.',
          `$r^2 = ${c}^2 - ${a}^2 = ${c * c - a * a}$, nên $r = ${b}$ (cm).`,
        ],
        hints: ['$r = \\sqrt{R^2 - d^2}$.'],
      };
    }
    if (variant === 3) {
      return {
        prompt: `Một mặt cầu có diện tích $${4 * R * R}\\pi$ cm². Tính bán kính của mặt cầu (cm).`,
        answer: R,
        unit: 'cm',
        steps: [`$4\\pi R^2 = ${4 * R * R}\\pi$ nên $R^2 = ${R * R}$.`, `$R = ${R}$ (cm).`],
        hints: ['Giải phương trình $4\\pi R^2 = S$ để tìm $R^2$.'],
      };
    }
    return retryMake(() => {
      const d = 2 * int(rand, 1, 12);
      const r = d / 2;
      const answer = rounded((4 / 3) * Math.PI * r * r * r, 1);
      if (answer === null) return null;
      return {
        prompt: `Một quả bóng hình cầu có đường kính ${d} cm. Tính thể tích của quả bóng (cm³, làm tròn đến hàng phần mười).`,
        answer,
        unit: 'cm³',
        steps: [
          `Bán kính $R = ${d} : 2 = ${r}$ (cm).`,
          `$V = \\dfrac{4}{3}\\pi \\cdot ${r}^3 = ${piTex(4 * r * r * r, 3)} \\approx ${tex(answer)}$ (cm³).`,
        ],
        hints: ['Bán kính bằng nửa đường kính.', '$V = \\dfrac{4}{3}\\pi R^3$.'],
      };
    });
  },
};

/** @type {Skill} */
export const vanDung = {
  id: 'van-dung',
  label: 'Vận dụng thực tế',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      return retryMake(() => {
        const r = int(rand, 1, 4);
        const h = int(rand, 2, 12);
        const answer = rounded(Math.PI * r * r * h + (4 / 3) * Math.PI * r ** 3, 1);
        if (answer === null) return null;
        return {
          prompt: `Một viên thuốc con nhộng gồm một hình trụ bán kính đáy ${r} mm, chiều cao ${h} mm và hai nửa hình cầu bán kính ${r} mm gắn ở hai đầu. Tính thể tích viên thuốc (mm³, làm tròn đến hàng phần mười).`,
          answer,
          unit: 'mm³',
          steps: [
            `Phần hình trụ: $\\pi \\cdot ${r}^2 \\cdot ${h} = ${piTex(r * r * h)}$ (mm³).`,
            `Hai nửa hình cầu ghép thành một hình cầu: $\\dfrac{4}{3}\\pi \\cdot ${r}^3 = ${piTex(4 * r ** 3, 3)}$ (mm³).`,
            `$V = ${piTex(3 * r * r * h + 4 * r ** 3, 3)} \\approx ${tex(answer)}$ (mm³).`,
          ],
          hints: ['Hai nửa hình cầu ghép lại thành một hình cầu.'],
        };
      });
    }
    if (variant === 1) {
      return retryMake(() => {
        const r = int(rand, 2, 4);
        const h = int(rand, 8, 14);
        const answer = rounded((Math.PI * r * r * h) / 3 + (2 / 3) * Math.PI * r ** 3, 1);
        if (answer === null) return null;
        return {
          prompt: `Một cây kem ốc quế gồm phần vỏ hình nón bán kính đáy ${r} cm, chiều cao ${h} cm, chứa đầy kem và phía trên có thêm một nửa hình cầu kem bán kính ${r} cm. Tính thể tích kem (cm³, làm tròn đến hàng phần mười).`,
          answer,
          unit: 'cm³',
          steps: [
            `Phần hình nón: $\\dfrac{1}{3}\\pi \\cdot ${r}^2 \\cdot ${h} = ${piTex(r * r * h, 3)}$ (cm³).`,
            `Nửa hình cầu: $\\dfrac{1}{2} \\cdot \\dfrac{4}{3}\\pi \\cdot ${r}^3 = ${piTex(2 * r ** 3, 3)}$ (cm³).`,
            `$V = ${piTex(r * r * h + 2 * r ** 3, 3)} \\approx ${tex(answer)}$ (cm³).`,
          ],
          hints: ['Thể tích nửa hình cầu bằng $\\dfrac{2}{3}\\pi R^3$.'],
        };
      });
    }
    if (variant === 2) {
      return retryMake(() => {
        const dm = int(rand, 4, 12);
        const h = int(rand, 8, 20);
        const r = dm / 2;
        // Litres from cubic decimetres: 1 dm³ = 1 l.
        const answer = rounded(Math.PI * r * r * h, 0);
        if (answer === null) return null;
        return {
          prompt: `Một thùng nước hình trụ có đường kính đáy ${dm} dm và chiều cao ${h} dm. Thùng chứa được bao nhiêu lít nước (làm tròn đến hàng đơn vị)?`,
          answer,
          unit: 'lít',
          steps: [
            `Bán kính đáy $r = ${dm} : 2 = ${tex(r)}$ (dm).`,
            `$V = \\pi \\cdot ${tex(r)}^2 \\cdot ${h} = ${piTex(r * r * h)} \\approx ${tex(answer)}$ (dm³).`,
            `$1$ dm³ $= 1$ lít, nên thùng chứa khoảng $${answer}$ lít.`,
          ],
          hints: ['$V = \\pi r^2 h$ với $r$ bằng nửa đường kính.', '$1$ dm³ $= 1$ lít.'],
        };
      });
    }
    // A sphere dropped into a cylinder of water raises the level by V / (πr²).
    return retryMake(() => {
      const R = int(rand, 1, 4);
      const rc = int(rand, R + 1, 10);
      const answer = rounded((4 * R ** 3) / (3 * rc * rc), 1);
      if (answer === null) return null;
      return {
        prompt: `Một cốc hình trụ có bán kính đáy ${rc} cm đựng nước. Thả chìm hẳn một viên bi hình cầu bán kính ${R} cm vào cốc (nước không tràn ra). Mực nước dâng lên bao nhiêu xăng-ti-mét (làm tròn đến hàng phần mười)?`,
        answer,
        unit: 'cm',
        steps: [
          `Thể tích nước dâng bằng thể tích viên bi: $\\dfrac{4}{3}\\pi \\cdot ${R}^3 = ${piTex(4 * R ** 3, 3)}$ (cm³).`,
          `Phần nước dâng là hình trụ bán kính ${rc} cm, chiều cao $x$: $\\pi \\cdot ${rc}^2 \\cdot x = ${piTex(4 * R ** 3, 3)}$.`,
          `$x = \\dfrac{${4 * R ** 3}}{${3 * rc * rc}} \\approx ${tex(answer)}$ (cm).`,
        ],
        hints: [
          'Lượng nước dâng lên bằng thể tích viên bi.',
          'Phần nước dâng là một hình trụ có cùng đáy với cốc.',
        ],
      };
    });
  },
};

/** The practice lesson after Bài 31 and Bài 32. */
export const SKILLS_TRANG_106 = [hinhTru, hinhNon, hinhCau];

/** The end-of-chapter review. */
export const CHAPTER_SKILLS = [hinhTru, hinhNon, hinhCau, vanDung];
