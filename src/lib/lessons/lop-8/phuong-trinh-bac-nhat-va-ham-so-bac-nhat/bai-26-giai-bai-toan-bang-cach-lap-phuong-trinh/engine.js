/**
 * Word problems as bar models for "giải bài toán bằng cách lập phương trình".
 * Each scenario fixes the unknown x and its condition, writes the two
 * quantities that must be equal as sums of parts (a bar each), and knows the
 * equation they give. Dragging x stretches the bars; they match only at the
 * solution.
 */

/**
 * @typedef {{ label: string, value: number }} Part
 * @typedef {object} Scenario
 * @property {string} id
 * @property {string} label
 * @property {string} story plain text
 * @property {string} unknown how x is chosen, plain text
 * @property {string} condition the condition on x, TeX
 * @property {number} min smallest x the widget allows
 * @property {number} max
 * @property {number} step
 * @property {number} solution
 * @property {number} scaleMax value drawn as the full bar width
 * @property {string} unit unit of the bar values
 * @property {string} topLabel
 * @property {string} bottomLabel
 * @property {(x: number) => Part[]} top
 * @property {(x: number) => Part[]} bottom
 * @property {string[]} head table header (TeX allowed)
 * @property {Array<{ cells: string[], value: (x: number) => number }>} rows table rows: TeX
 *   cells, the last an expression in x, and that expression's value
 * @property {string} equation TeX
 * @property {string[]} solve TeX lines of the solution
 * @property {string} answer plain text
 */

/** @type {Scenario[]} */
export const SCENARIOS = [
  {
    id: 'nguoc-chieu',
    label: 'Ngược chiều',
    story:
      'Quãng đường AB dài 180 km. Cùng một lúc, một xe máy đi từ A với vận tốc 40 km/h và một ô tô đi từ B với vận tốc 50 km/h, hai xe đi ngược chiều nhau. Sau bao lâu thì hai xe gặp nhau?',
    unknown: 'Gọi x (giờ) là thời gian từ lúc hai xe khởi hành đến lúc gặp nhau.',
    condition: 'x > 0',
    min: 0,
    max: 3.5,
    step: 0.1,
    solution: 2,
    scaleMax: 320,
    unit: 'km',
    topLabel: 'Quãng đường hai xe đã đi',
    bottomLabel: 'Quãng đường AB',
    top: (x) => [
      { label: 'xe máy', value: 40 * x },
      { label: 'ô tô', value: 50 * x },
    ],
    bottom: () => [{ label: 'AB', value: 180 }],
    head: ['Phương tiện', 'Vận tốc (km/h)', 'Thời gian (h)', 'Quãng đường (km)'],
    rows: [
      { cells: ['Xe máy', '40', 'x', '40x'], value: (x) => 40 * x },
      { cells: ['Ô tô', '50', 'x', '50x'], value: (x) => 50 * x },
    ],
    equation: '40x + 50x = 180',
    solve: ['40x + 50x = 180', '90x = 180', 'x = 2'],
    answer: 'x = 2 thoả mãn điều kiện x > 0. Vậy sau 2 giờ thì hai xe gặp nhau.',
  },
  {
    id: 'duoi-kip',
    label: 'Đuổi kịp',
    story:
      'Lúc 7 giờ, một xe máy khởi hành từ A với vận tốc 40 km/h. Lúc 8 giờ, một ô tô cũng khởi hành từ A, đi cùng chiều với xe máy, vận tốc 60 km/h. Hỏi ô tô đuổi kịp xe máy lúc mấy giờ?',
    unknown: 'Gọi x (giờ) là thời gian ô tô đi từ lúc khởi hành đến lúc đuổi kịp xe máy.',
    condition: 'x > 0',
    min: 0,
    max: 4,
    step: 0.1,
    solution: 2,
    scaleMax: 260,
    unit: 'km',
    topLabel: 'Quãng đường ô tô đã đi',
    bottomLabel: 'Quãng đường xe máy đã đi',
    top: (x) => [{ label: 'ô tô', value: 60 * x }],
    bottom: (x) => [
      { label: 'giờ đầu', value: 40 },
      { label: 'xe máy', value: 40 * x },
    ],
    head: ['Phương tiện', 'Vận tốc (km/h)', 'Thời gian (h)', 'Quãng đường (km)'],
    rows: [
      { cells: ['Xe máy', '40', 'x + 1', '40(x + 1)'], value: (x) => 40 * (x + 1) },
      { cells: ['Ô tô', '60', 'x', '60x'], value: (x) => 60 * x },
    ],
    equation: '60x = 40(x + 1)',
    solve: ['60x = 40x + 40', '20x = 40', 'x = 2'],
    answer:
      'x = 2 thoả mãn điều kiện x > 0. Ô tô đi 2 giờ thì đuổi kịp xe máy, tức là lúc 8 + 2 = 10 giờ.',
  },
  {
    id: 'nang-suat',
    label: 'Năng suất',
    story:
      'Theo kế hoạch, mỗi ngày một tổ sản xuất phải làm 50 sản phẩm. Thực tế mỗi ngày tổ làm được 60 sản phẩm nên đã hoàn thành kế hoạch sớm 2 ngày. Hỏi theo kế hoạch tổ phải làm bao nhiêu sản phẩm?',
    unknown: 'Gọi x là số ngày tổ làm theo kế hoạch.',
    condition: 'x \\in \\mathbb{N},\\ x > 2',
    min: 3,
    max: 16,
    step: 1,
    solution: 12,
    scaleMax: 900,
    unit: 'sản phẩm',
    topLabel: 'Số sản phẩm theo kế hoạch',
    bottomLabel: 'Số sản phẩm đã làm thực tế',
    top: (x) => [{ label: 'kế hoạch', value: 50 * x }],
    bottom: (x) => [{ label: 'thực tế', value: 60 * (x - 2) }],
    head: ['Trường hợp', 'Sản phẩm mỗi ngày', 'Số ngày', 'Tổng số sản phẩm'],
    rows: [
      { cells: ['Kế hoạch', '50', 'x', '50x'], value: (x) => 50 * x },
      { cells: ['Thực tế', '60', 'x - 2', '60(x - 2)'], value: (x) => 60 * (x - 2) },
    ],
    equation: '50x = 60(x - 2)',
    solve: ['50x = 60x - 120', '-10x = -120', 'x = 12'],
    answer:
      'x = 12 thoả mãn điều kiện. Theo kế hoạch tổ làm trong 12 ngày, tức là 50 · 12 = 600 sản phẩm.',
  },
];

/** @param {Part[]} parts */
export const total = (parts) => parts.reduce((s, p) => s + p.value, 0);

/**
 * Both sides of the equation at x and their difference.
 * @param {Scenario} s
 * @param {number} x
 */
export function sides(s, x) {
  const left = total(s.top(x));
  const right = total(s.bottom(x));
  return { left, right, diff: left - right };
}

/**
 * x rounded to the scenario's step and kept in range.
 * @param {Scenario} s
 * @param {number} x
 */
export function snapX(s, x) {
  const n = Math.round((x - s.min) / s.step);
  const v = s.min + n * s.step;
  return Math.round(Math.min(s.max, Math.max(s.min, v)) * 1000) / 1000;
}

/**
 * The x whose top bar has this length (the top bar is proportional to x).
 * @param {Scenario} s
 * @param {number} length
 */
export function xForTop(s, length) {
  return length / total(s.top(1));
}
