/**
 * Logic of the step-by-step transformer: each problem is a chain of
 * expressions, each reached from the one before by one named rule. The
 * learner picks the next rule; a right pick reveals the next line, a wrong
 * one explains when the picked rule applies. Every line carries its numeric
 * value(s), computed on its own, so the widget can show that each
 * transformation keeps the value, and the tests can prove it.
 */

import { formatFixed } from '#lib/core/number-format.js';

/**
 * @typedef {'ra' | 'vao' | 'khu' | 'truc' | 'lien' | 'gon'} RuleId
 * @typedef {{ id: RuleId, label: string, when: string }} Rule
 * @typedef {{ rule: RuleId, tex: string, values: number[], hint: string }} Step
 * @typedef {{
 *   title: string,
 *   task: string,
 *   tex: string,
 *   values: number[],
 *   at?: string,
 *   steps: Step[],
 * }} Problem
 */

/** @type {Rule[]} */
export const RULES = [
  {
    id: 'ra',
    label: 'Đưa thừa số ra ngoài dấu căn',
    when: 'dùng khi số dưới dấu căn có một thừa số là số chính phương, như √50 = √(25·2) = 5√2',
  },
  {
    id: 'vao',
    label: 'Đưa thừa số vào trong dấu căn',
    when: 'dùng khi muốn viết a√b thành một căn duy nhất, như 3√5 = √45, thường để so sánh',
  },
  {
    id: 'khu',
    label: 'Khử mẫu của biểu thức lấy căn',
    when: 'dùng khi dưới dấu căn có một phân số, như √(3/5) = √15/5',
  },
  {
    id: 'truc',
    label: 'Trục căn thức ở mẫu (nhân với √B)',
    when: 'dùng khi mẫu là một căn √B, như 6/√3: nhân cả tử và mẫu với √3',
  },
  {
    id: 'lien',
    label: 'Nhân với biểu thức liên hợp',
    when: 'dùng khi mẫu là tổng hoặc hiệu có căn, như √5 − √3: nhân cả tử và mẫu với √5 + √3',
  },
  {
    id: 'gon',
    label: 'Thu gọn hoặc so sánh',
    when: 'dùng khi các căn đã đồng dạng, mẫu đã hết căn, hoặc hai căn đã cùng dạng để so sánh',
  },
];

const r2 = Math.sqrt(2);
const r3 = Math.sqrt(3);
const r5 = Math.sqrt(5);
const r15 = Math.sqrt(15);
const A = 2; // the value of a used for the numeric check of the letter problem

/** @type {Problem[]} */
export const PROBLEMS = [
  {
    title: 'Cộng các căn',
    task: 'Rút gọn',
    tex: '\\sqrt{50} + \\sqrt{18} - \\sqrt{8}',
    values: [Math.sqrt(50) + Math.sqrt(18) - Math.sqrt(8)],
    steps: [
      {
        rule: 'ra',
        tex: '5\\sqrt{2} + 3\\sqrt{2} - 2\\sqrt{2}',
        values: [5 * r2 + 3 * r2 - 2 * r2],
        hint: '50 = 25·2, 18 = 9·2, 8 = 4·2: mỗi số có một thừa số chính phương.',
      },
      {
        rule: 'gon',
        tex: '6\\sqrt{2}',
        values: [6 * r2],
        hint: 'Ba hạng tử đều là bội của √2: cộng các hệ số.',
      },
    ],
  },
  {
    title: 'So sánh',
    task: 'So sánh',
    tex: '3\\sqrt{5} \\;\\text{và}\\; 2\\sqrt{11}',
    values: [3 * r5, 2 * Math.sqrt(11)],
    steps: [
      {
        rule: 'vao',
        tex: '\\sqrt{45} \\;\\text{và}\\; \\sqrt{44}',
        values: [Math.sqrt(45), Math.sqrt(44)],
        hint: 'Viết mỗi số thành một căn: 3√5 = √(3²·5).',
      },
      {
        rule: 'gon',
        tex: '\\sqrt{45} > \\sqrt{44} \\;\\Rightarrow\\; 3\\sqrt{5} > 2\\sqrt{11}',
        values: [Math.sqrt(45), Math.sqrt(44)],
        hint: 'Hai căn đã cùng dạng: số dưới dấu căn lớn hơn thì căn lớn hơn.',
      },
    ],
  },
  {
    title: 'Khử mẫu',
    task: 'Rút gọn',
    tex: '2\\sqrt{\\dfrac{3}{5}} + \\sqrt{\\dfrac{5}{3}}',
    values: [2 * Math.sqrt(3 / 5) + Math.sqrt(5 / 3)],
    steps: [
      {
        rule: 'khu',
        tex: '\\dfrac{2\\sqrt{15}}{5} + \\dfrac{\\sqrt{15}}{3}',
        values: [(2 * r15) / 5 + r15 / 3],
        hint: 'Dưới dấu căn là phân số: √(3/5) = √(3·5/5²) = √15/5.',
      },
      {
        rule: 'gon',
        tex: '\\dfrac{6\\sqrt{15} + 5\\sqrt{15}}{15} = \\dfrac{11\\sqrt{15}}{15}',
        values: [(11 * r15) / 15],
        hint: 'Hai hạng tử là bội của √15: quy đồng rồi cộng.',
      },
    ],
  },
  {
    title: 'Mẫu là một căn',
    task: 'Trục căn thức ở mẫu',
    tex: '\\dfrac{6}{\\sqrt{3}}',
    values: [6 / r3],
    steps: [
      {
        rule: 'truc',
        tex: '\\dfrac{6\\sqrt{3}}{\\sqrt{3} \\cdot \\sqrt{3}} = \\dfrac{6\\sqrt{3}}{3}',
        values: [(6 * r3) / 3],
        hint: 'Mẫu là √3: nhân cả tử và mẫu với √3.',
      },
      {
        rule: 'gon',
        tex: '2\\sqrt{3}',
        values: [2 * r3],
        hint: 'Mẫu đã hết căn: rút gọn 6/3.',
      },
    ],
  },
  {
    title: 'Mẫu là hiệu hai căn',
    task: 'Trục căn thức ở mẫu',
    tex: '\\dfrac{2}{\\sqrt{5} - \\sqrt{3}}',
    values: [2 / (r5 - r3)],
    steps: [
      {
        rule: 'lien',
        tex: '\\dfrac{2(\\sqrt{5} + \\sqrt{3})}{(\\sqrt{5} - \\sqrt{3})(\\sqrt{5} + \\sqrt{3})}',
        values: [(2 * (r5 + r3)) / ((r5 - r3) * (r5 + r3))],
        hint: 'Mẫu là hiệu √5 − √3: biểu thức liên hợp là √5 + √3.',
      },
      {
        rule: 'gon',
        tex: '\\dfrac{2(\\sqrt{5} + \\sqrt{3})}{5 - 3}',
        values: [(2 * (r5 + r3)) / (5 - 3)],
        hint: 'Mẫu có dạng (a − b)(a + b) = a² − b².',
      },
      {
        rule: 'gon',
        tex: '\\sqrt{5} + \\sqrt{3}',
        values: [r5 + r3],
        hint: 'Mẫu bằng 2: rút gọn với số 2 ở tử.',
      },
    ],
  },
  {
    title: 'Biểu thức chứa chữ',
    task: 'Rút gọn với a ≥ 0',
    tex: '\\sqrt{9a} - \\sqrt{16a} + \\sqrt{49a}',
    at: 'a = 2',
    values: [Math.sqrt(9 * A) - Math.sqrt(16 * A) + Math.sqrt(49 * A)],
    steps: [
      {
        rule: 'ra',
        tex: '3\\sqrt{a} - 4\\sqrt{a} + 7\\sqrt{a}',
        values: [3 * Math.sqrt(A) - 4 * Math.sqrt(A) + 7 * Math.sqrt(A)],
        hint: '9, 16, 49 là các số chính phương: √(9a) = 3√a.',
      },
      {
        rule: 'gon',
        tex: '6\\sqrt{a}',
        values: [6 * Math.sqrt(A)],
        hint: 'Ba hạng tử đều là bội của √a: cộng các hệ số.',
      },
    ],
  },
  {
    title: 'Phối hợp',
    task: 'Rút gọn',
    tex: '\\dfrac{1}{\\sqrt{2} + 1} + \\sqrt{8}',
    values: [1 / (r2 + 1) + Math.sqrt(8)],
    steps: [
      {
        rule: 'lien',
        tex: '\\dfrac{\\sqrt{2} - 1}{(\\sqrt{2} + 1)(\\sqrt{2} - 1)} + \\sqrt{8}',
        values: [(r2 - 1) / ((r2 + 1) * (r2 - 1)) + Math.sqrt(8)],
        hint: 'Mẫu √2 + 1 là một tổng có căn: nhân với √2 − 1.',
      },
      {
        rule: 'gon',
        tex: '\\sqrt{2} - 1 + \\sqrt{8}',
        values: [r2 - 1 + Math.sqrt(8)],
        hint: 'Mẫu bằng (√2)² − 1² = 1.',
      },
      {
        rule: 'ra',
        tex: '\\sqrt{2} - 1 + 2\\sqrt{2}',
        values: [r2 - 1 + 2 * r2],
        hint: '8 = 4·2 có thừa số chính phương 4.',
      },
      {
        rule: 'gon',
        tex: '3\\sqrt{2} - 1',
        values: [3 * r2 - 1],
        hint: '√2 và 2√2 là hai căn đồng dạng.',
      },
    ],
  },
];

/**
 * The rule with this id.
 * @param {RuleId} id
 */
export function ruleOf(id) {
  return /** @type {Rule} */ (RULES.find((r) => r.id === id));
}

/**
 * The numeric check of a line: '≈ 8,4853' or '≈ 6,7082 và ≈ 6,6332'.
 * @param {number[]} values
 */
export function valuesText(values) {
  return values.map((v) => `≈ ${formatFixed(v, 4)}`).join(' và ');
}

/**
 * Judges the rule picked for step `index` of `problem`.
 * @param {Problem} problem
 * @param {number} index
 * @param {RuleId} picked
 * @returns {{ ok: boolean, text: string }}
 */
export function judge(problem, index, picked) {
  const step = problem.steps[index];
  if (picked === step.rule) {
    const last = index === problem.steps.length - 1;
    return {
      ok: true,
      text: last
        ? `Đúng, xong! Giá trị số ${valuesText(step.values)} vẫn giữ nguyên qua mọi bước.`
        : `Đúng: "${ruleOf(picked).label}". Giá trị số vẫn ${valuesText(step.values)}.`,
    };
  }
  return {
    ok: false,
    text: `Chưa hợp: "${ruleOf(picked).label}" ${ruleOf(picked).when}. Gợi ý: ${step.hint}`,
  };
}
