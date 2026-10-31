/**
 * Question generators for the chapter "Tần số và tần số tương đối", for the
 * drill board of its practice and review lessons. Answers are whole numbers
 * or short decimals, read with `readNumber` and written with `numberText`
 * from `#lib/core/decimal.js`. Prompts, hints and steps are rich text with
 * inline TeX.
 */

import { numTex } from '#lib/core/number-format.js';
import { int, partition, pick, shuffle } from '#lib/core/drill.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A data sample as plain text, '3; 5; 4', so a long sample wraps on a
 * narrow screen (a TeX span never breaks).
 * @param {readonly number[]} values
 */
export const sampleText = (values) => values.join('; ');

/**
 * A frequency table in one line: 'giá trị $2, 3, 4$ có tần số lần lượt là $5, 1, 6$'.
 * @param {readonly (number | string)[]} values
 * @param {readonly (number | string)[]} counts
 */
const tableText = (values, counts) =>
  `giá trị $${values.join(', ')}$ có tần số lần lượt là $${counts.join(', ')}$`;

/** Sample sizes that make every m/n · 100% a short decimal. */
const NICE_N = [20, 25, 40, 50];

/** @type {Skill} */
export const tanSo = {
  id: 'tan-so',
  label: 'Bài 22. Tần số của một giá trị',
  make(rand) {
    const s = int(rand, 0, 6);
    const pool = [s, s + 1, s + 2, s + 3];
    const length = int(rand, 12, 18);
    const values = Array.from({ length }, () => pick(rand, pool));
    const target = pick(rand, values);
    const m = values.filter((v) => v === target).length;
    return {
      prompt: `Cho mẫu dữ liệu: ${sampleText(values)}. Tìm tần số của giá trị $${target}$.`,
      answer: m,
      steps: [
        `Tần số của $${target}$ là số lần $${target}$ xuất hiện trong mẫu.`,
        `Đếm lần lượt (gạch từng số đã đếm): $${target}$ xuất hiện $${m}$ lần.`,
      ],
      hints: [
        'Tần số là số lần giá trị đó xuất hiện trong mẫu.',
        `Đi từ trái sang phải, đếm từng số $${target}$ và gạch đi số đã đếm.`,
      ],
    };
  },
};

/** @type {Skill} */
export const coMau = {
  id: 'co-mau',
  label: 'Bài 22. Bảng tần số và cỡ mẫu',
  make(rand) {
    const s = int(rand, 1, 6);
    const values = [s, s + 1, s + 2, s + 3];
    const counts = values.map(() => int(rand, 1, 12));
    const n = counts.reduce((a, b) => a + b, 0);
    if (rand() < 0.5) {
      return {
        prompt: `Bảng tần số của một mẫu dữ liệu: ${tableText(values, counts)}. Tính cỡ mẫu $n$.`,
        answer: n,
        steps: ['Cỡ mẫu bằng tổng các tần số.', `$n = ${counts.join(' + ')} = ${n}$.`],
        hints: ['Cỡ mẫu bằng tổng các tần số.'],
      };
    }
    const i = int(rand, 0, 3);
    const shown = counts.map((c, j) => (j === i ? 'm' : c));
    const others = counts.filter((_, j) => j !== i);
    const rest = others.reduce((a, b) => a + b, 0);
    return {
      prompt: `Một mẫu dữ liệu có cỡ mẫu $n = ${n}$ và bảng tần số: ${tableText(values, shown)}. Tìm $m$.`,
      answer: counts[i],
      steps: [
        `Tổng các tần số bằng cỡ mẫu: $${shown.join(' + ')} = ${n}$.`,
        `$m = ${n} - (${others.join(' + ')}) = ${n} - ${rest} = ${counts[i]}$.`,
      ],
      hints: ['Tổng các tần số bằng cỡ mẫu $n$.'],
    };
  },
};

/** @type {Skill} */
export const tanSoTuongDoi = {
  id: 'tan-so-tuong-doi',
  label: 'Bài 23. Tần số tương đối',
  make(rand) {
    const n = pick(rand, NICE_N);
    const m = int(rand, 1, n - 1);
    const f = (m * 100) / n;
    if (rand() < 0.6) {
      return {
        prompt: `Một mẫu có $${n}$ dữ liệu, trong đó giá trị $x$ xuất hiện $${m}$ lần. Tính tần số tương đối của $x$ (theo %).`,
        answer: f,
        unit: '%',
        steps: [
          `$f = \\dfrac{m}{n} \\cdot 100\\% = \\dfrac{${m}}{${n}} \\cdot 100\\%$.`,
          `$f = ${numTex(f)}\\%$.`,
        ],
        hints: ['$f = \\dfrac{m}{n} \\cdot 100\\%$, với $n$ là cỡ mẫu.'],
      };
    }
    return {
      prompt: `Một mẫu có $${n}$ dữ liệu, giá trị $x$ có tần số tương đối $${numTex(f)}\\%$. Tìm tần số của $x$.`,
      answer: m,
      steps: [
        'Từ $f = \\dfrac{m}{n} \\cdot 100\\%$ suy ra $m = f \\cdot n$.',
        `$m = ${numTex(f)}\\% \\cdot ${n} = ${numTex(f / 100)} \\cdot ${n} = ${m}$.`,
      ],
      hints: ['Tần số $m = f \\cdot n$ (đổi $f$ từ phần trăm ra số thập phân).'],
    };
  },
};

/** @type {Skill} */
export const gocQuat = {
  id: 'goc-quat',
  label: 'Bài 23. Biểu đồ hình quạt tròn',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const f = 5 * int(rand, 1, 19);
      const angle = (360 * f) / 100;
      return {
        prompt: `Trong biểu đồ hình quạt tròn, giá trị $x$ có tần số tương đối $${f}\\%$. Tính góc ở tâm của hình quạt biểu diễn $x$ (theo độ).`,
        answer: angle,
        unit: '°',
        steps: [
          'Góc ở tâm của hình quạt bằng $360^\\circ \\cdot f$.',
          `$360^\\circ \\cdot ${f}\\% = 360^\\circ \\cdot ${numTex(f / 100)} = ${angle}^\\circ$.`,
        ],
        hints: ['Cả hình tròn ($360^\\circ$) ứng với $100\\%$.'],
      };
    }
    if (variant === 1) {
      const n = pick(rand, [20, 40, 60, 80]);
      const k = int(rand, 1, 19);
      const angle = 18 * k;
      const m = (k * n) / 20;
      return {
        prompt: `Biểu đồ hình quạt tròn biểu diễn một mẫu gồm $${n}$ dữ liệu. Hình quạt ứng với giá trị $x$ có góc ở tâm $${angle}^\\circ$. Tìm tần số của $x$.`,
        answer: m,
        steps: [
          `Tần số tương đối $f = \\dfrac{${angle}^\\circ}{360^\\circ} = ${numTex(angle / 360)}$.`,
          `Tần số $m = f \\cdot n = ${numTex(angle / 360)} \\cdot ${n} = ${m}$.`,
        ],
        hints: ['Tần số tương đối bằng góc ở tâm chia cho $360^\\circ$.', 'Rồi nhân với cỡ mẫu.'],
      };
    }
    const n = pick(rand, [20, 24, 30, 36, 40, 45, 60]);
    const m = int(rand, 1, n - 1);
    const angle = (360 * m) / n;
    return {
      prompt: `Một mẫu có $${n}$ dữ liệu, giá trị $x$ có tần số $${m}$. Tính góc ở tâm của hình quạt biểu diễn $x$ trong biểu đồ hình quạt tròn (theo độ).`,
      answer: angle,
      unit: '°',
      steps: [
        `Tần số tương đối $f = \\dfrac{${m}}{${n}}$.`,
        `Góc ở tâm $= 360^\\circ \\cdot \\dfrac{${m}}{${n}} = ${angle}^\\circ$.`,
      ],
      hints: ['Góc ở tâm $= 360^\\circ \\cdot \\dfrac{m}{n}$.'],
    };
  },
};

/**
 * Four equal classes [a0 + i·w; a0 + (i + 1)·w) on a random start and width.
 * @param {() => number} rand
 */
function classes(rand) {
  const w = pick(rand, [5, 10]);
  const a0 = w * int(rand, 2, 12);
  return { w, bounds: [0, 1, 2, 3, 4].map((i) => a0 + i * w) };
}

/** @type {Skill} */
export const tanSoNhom = {
  id: 'tan-so-nhom',
  label: 'Bài 24. Tần số của một nhóm',
  make(rand) {
    const { bounds } = classes(rand);
    const lo = bounds[0];
    const hi = bounds[4];
    const length = int(rand, 12, 16);
    // Some data sit exactly on a shared boundary, the case learners miss.
    const onEdge = [bounds[1], bounds[2], bounds[3]];
    const values = shuffle(rand, [
      pick(rand, onEdge),
      pick(rand, onEdge),
      ...Array.from({ length: length - 2 }, () => int(rand, lo, hi - 1)),
    ]);
    const j = int(rand, 0, 3);
    const a = bounds[j];
    const b = bounds[j + 1];
    const inside = values.filter((v) => v >= a && v < b);
    return {
      prompt: `Cho mẫu số liệu: ${sampleText(values)}. Tìm tần số của nhóm $[${a}; ${b})$.`,
      answer: inside.length,
      steps: [
        `Nhóm $[${a}; ${b})$ gồm các số $x$ với $${a} \\le x < ${b}$ (có $${a}$, không có $${b}$).`,
        inside.length === 0
          ? 'Không có số nào của mẫu thuộc nhóm này.'
          : `Các số thuộc nhóm: ${inside.join('; ')}.`,
        `Tần số của nhóm là $${inside.length}$.`,
      ],
      hints: [
        `Nhóm $[${a}; ${b})$ chứa $${a}$ nhưng không chứa $${b}$.`,
        `Đếm các số lớn hơn hoặc bằng $${a}$ và nhỏ hơn $${b}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const daiDien = {
  id: 'gia-tri-dai-dien',
  label: 'Bài 24. Giá trị đại diện và số nhóm',
  make(rand) {
    if (rand() < 0.6) {
      const w = pick(rand, [2, 3, 5, 10]);
      const a = w * int(rand, 2, 40);
      const b = a + w;
      const mid = (a + b) / 2;
      return {
        prompt: `Tìm giá trị đại diện của nhóm $[${a}; ${b})$.`,
        answer: mid,
        steps: [
          'Giá trị đại diện của nhóm là trung điểm của nhóm.',
          `$\\dfrac{${a} + ${b}}{2} = \\dfrac{${a + b}}{2} = ${numTex(mid)}$.`,
        ],
        hints: ['Giá trị đại diện của nhóm $[a; b)$ là $\\dfrac{a + b}{2}$.'],
      };
    }
    const w = pick(rand, [2, 4, 5, 10]);
    const k = int(rand, 4, 8);
    const a = w * int(rand, 2, 20);
    const b = a + k * w;
    return {
      prompt: `Số liệu nằm trong khoảng từ $${a}$ đến dưới $${b}$ được ghép thành các nhóm cùng độ dài $${w}$, nhóm đầu tiên là $[${a}; ${a + w})$. Có bao nhiêu nhóm?`,
      answer: k,
      steps: [
        `Độ dài cả khoảng: $${b} - ${a} = ${b - a}$.`,
        `Số nhóm: $${b - a} : ${w} = ${k}$; nhóm cuối là $[${b - w}; ${b})$.`,
      ],
      hints: ['Chia độ dài cả khoảng cho độ dài một nhóm.'],
    };
  },
};

/** @type {Skill} */
export const tanSoTuongDoiNhom = {
  id: 'tan-so-tuong-doi-nhom',
  label: 'Bài 24. Tần số tương đối ghép nhóm',
  make(rand) {
    const { bounds } = classes(rand);
    const n = pick(rand, NICE_N);
    const counts = partition(rand, n, 4);
    const groups = counts.map((m, i) => `$[${bounds[i]}; ${bounds[i + 1]})$: $${m}$`).join('; ');
    const head = `Bảng tần số ghép nhóm của một mẫu cỡ $${n}$: ${groups}.`;
    if (rand() < 0.5) {
      const j = int(rand, 0, 3);
      const f = (counts[j] * 100) / n;
      return {
        prompt: `${head} Tính tần số tương đối của nhóm $[${bounds[j]}; ${bounds[j + 1]})$ (theo %).`,
        answer: f,
        unit: '%',
        steps: [`$f = \\dfrac{${counts[j]}}{${n}} \\cdot 100\\% = ${numTex(f)}\\%$.`],
        hints: ['$f = \\dfrac{m}{n} \\cdot 100\\%$ với $m$ là tần số của nhóm.'],
      };
    }
    const j = int(rand, 1, 3);
    const below = counts.slice(0, j).reduce((a, b) => a + b, 0);
    const f = (below * 100) / n;
    return {
      prompt: `${head} Có bao nhiêu phần trăm dữ liệu nhỏ hơn $${bounds[j]}$?`,
      answer: f,
      unit: '%',
      steps: [
        `Dữ liệu nhỏ hơn $${bounds[j]}$ thuộc ${j === 1 ? 'nhóm' : 'các nhóm'} từ $[${bounds[0]}; ${bounds[1]})$ đến $[${bounds[j - 1]}; ${bounds[j]})$: có $${counts.slice(0, j).join(' + ')} = ${below}$ dữ liệu.`,
        `Tỉ lệ: $\\dfrac{${below}}{${n}} \\cdot 100\\% = ${numTex(f)}\\%$.`,
      ],
      hints: [
        `Cộng tần số của các nhóm nằm hoàn toàn bên trái $${bounds[j]}$.`,
        'Rồi chia cho cỡ mẫu và nhân $100\\%$.',
      ],
    };
  },
};

/** Skills of the practice lesson after Bài 22 and Bài 23. */
export const SKILLS_TRANG_43 = [tanSo, coMau, tanSoTuongDoi, gocQuat];

/** Skills of Bài 24. */
export const SKILLS_BAI_24 = [tanSoNhom, daiDien, tanSoTuongDoiNhom];

/** Every skill of the chapter, for the chapter review. */
export const CHAPTER_SKILLS = [...SKILLS_TRANG_43, ...SKILLS_BAI_24];
