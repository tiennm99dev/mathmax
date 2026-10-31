/**
 * Question generators for the chapter "Đường tròn ngoại tiếp và đường tròn
 * nội tiếp", for the drill boards of its practice lessons. Every answer is a
 * whole number or ends in ,5 (a radius that is half of a whole length), so
 * the learner types it exactly. Prompts and steps are rich text with the
 * book's decimal comma; angles are written as TeX ($\widehat{BAC}$) and
 * square roots as √3.
 */

import { int, pick } from '#lib/core/drill.js';
import { numberText } from '#lib/core/decimal.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** A number as the book writes it: '6,5', '7'. */
const t = (/** @type {number} */ v) => numberText(v);

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

/** n for which 360°/n is a whole number of degrees, as used in the drills. */
export const POLYGON_SIDES = [3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20];

/** The book's names of the regular polygons with few sides. */
const POLYGON = /** @type {Record<number, string>} */ ({
  3: 'tam giác đều',
  4: 'hình vuông',
  5: 'ngũ giác đều',
  6: 'lục giác đều',
  8: 'bát giác đều',
});
const polygon = (/** @type {number} */ n) => POLYGON[n] ?? `đa giác đều ${n} cạnh`;

/** @type {Skill} */
export const gocNoiTiep = {
  id: 'goc-noi-tiep',
  label: 'Bài 27. Góc nội tiếp',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      const arc = 2 * int(rand, 20, 85);
      return {
        prompt: `Góc nội tiếp AMB của đường tròn (O) chắn cung AB có số đo ${arc}°. Tính số đo góc AMB (độ).`,
        answer: arc / 2,
        unit: '°',
        steps: [
          'Số đo góc nội tiếp bằng nửa số đo cung bị chắn.',
          `$\\widehat{AMB}$ = ${arc}° : 2 = ${arc / 2}°.`,
        ],
        hints: ['Góc nội tiếp bằng nửa số đo cung bị chắn.'],
      };
    }
    if (variant === 1) {
      const x = int(rand, 20, 85);
      return {
        prompt: `Tam giác nhọn ABC nội tiếp đường tròn (O) có $\\widehat{BAC}$ = ${x}°. Tính góc ở tâm BOC (độ).`,
        answer: 2 * x,
        unit: '°',
        steps: [
          'Góc nội tiếp BAC và góc ở tâm BOC cùng chắn cung nhỏ BC.',
          `Góc ở tâm gấp đôi góc nội tiếp: $\\widehat{BOC}$ = 2 · ${x}° = ${2 * x}°.`,
        ],
        hints: ['Hai góc cùng chắn cung BC; góc nội tiếp bằng nửa góc ở tâm.'],
      };
    }
    if (variant === 2) {
      const arc = 2 * int(rand, 20, 80);
      return {
        prompt: `Cung nhỏ AB của đường tròn (O) có số đo ${arc}°. Điểm M nằm trên cung nhỏ AB. Tính $\\widehat{AMB}$ (độ).`,
        answer: (360 - arc) / 2,
        unit: '°',
        steps: [
          'M nằm trên cung nhỏ nên $\\widehat{AMB}$ chắn cung lớn AB.',
          `Cung lớn AB có số đo 360° − ${arc}° = ${360 - arc}°.`,
          `$\\widehat{AMB}$ = ${360 - arc}° : 2 = ${(360 - arc) / 2}°.`,
        ],
        hints: ['M nằm trên cung nhỏ thì góc AMB chắn cung nào?', 'Cung lớn = 360° − cung nhỏ.'],
      };
    }
    const [a, b, c] = pick(rand, TRIPLES);
    return {
      prompt: `AB là đường kính của đường tròn (O). Điểm C nằm trên đường tròn với AC = ${a} cm, BC = ${b} cm. Tính bán kính của đường tròn (cm).`,
      answer: c / 2,
      unit: 'cm',
      steps: [
        'Góc ACB là góc nội tiếp chắn nửa đường tròn nên $\\widehat{ACB}$ = 90°.',
        `AB² = AC² + BC² = ${a * a} + ${b * b} = ${c * c}, nên AB = ${c} cm.`,
        `Bán kính R = AB : 2 = ${t(c / 2)} cm.`,
      ],
      hints: [
        'Góc nội tiếp chắn nửa đường tròn là góc vuông.',
        'Tính đường kính AB bằng định lí Pythagore.',
      ],
    };
  },
};

/** @type {Skill} */
export const ngoaiTiepTamGiac = {
  id: 'ngoai-tiep-tam-giac',
  label: 'Bài 28. Đường tròn ngoại tiếp tam giác',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const [a, b, c] = pick(rand, TRIPLES);
      return {
        prompt: `Tam giác ABC vuông tại A có AB = ${a} cm, AC = ${b} cm. Tính bán kính đường tròn ngoại tiếp tam giác ABC (cm).`,
        answer: c / 2,
        unit: 'cm',
        steps: [
          'Tâm đường tròn ngoại tiếp tam giác vuông là trung điểm cạnh huyền BC.',
          `BC² = ${a * a} + ${b * b} = ${c * c}, nên BC = ${c} cm.`,
          `R = BC : 2 = ${t(c / 2)} cm.`,
        ],
        hints: [
          'Tâm đường tròn ngoại tiếp tam giác vuông là trung điểm cạnh huyền.',
          'Tính cạnh huyền BC rồi lấy một nửa.',
        ],
      };
    }
    if (variant === 1) {
      const k = int(rand, 2, 12);
      return {
        prompt: `Tam giác đều ABC có cạnh ${k}√3 cm. Tính bán kính đường tròn ngoại tiếp tam giác (cm).`,
        answer: k,
        unit: 'cm',
        steps: [
          'Tam giác đều cạnh a có R = a√3/3.',
          `R = ${k}√3 · √3 : 3 = ${k} · 3 : 3 = ${k} cm.`,
        ],
        hints: ['R = a√3/3 với a là cạnh tam giác đều.', '√3 · √3 = 3.'],
      };
    }
    const r = int(rand, 2, 15);
    return {
      prompt: `Tam giác đều ABC nội tiếp đường tròn (O; R) và ngoại tiếp đường tròn (O; r) với r = ${r} cm. Tính R (cm).`,
      answer: 2 * r,
      unit: 'cm',
      steps: [
        'Tam giác đều cạnh a có R = a√3/3 và r = a√3/6, nên R = 2r.',
        `R = 2 · ${r} = ${2 * r} cm.`,
      ],
      hints: ['So sánh hai công thức R = a√3/3 và r = a√3/6.'],
    };
  },
};

/** @type {Skill} */
export const noiTiepTamGiac = {
  id: 'noi-tiep-tam-giac',
  label: 'Bài 28. Đường tròn nội tiếp tam giác',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const [a, b, c] = pick(rand, TRIPLES);
      const S = (a * b) / 2;
      const half = (a + b + c) / 2;
      return {
        prompt: `Tam giác ABC vuông tại A có AB = ${a} cm, AC = ${b} cm, BC = ${c} cm. Tính bán kính đường tròn nội tiếp tam giác (cm).`,
        answer: S / half,
        unit: 'cm',
        steps: [
          `Diện tích S = ${a} · ${b} : 2 = ${S} cm².`,
          `Nối tâm I với ba đỉnh: S = r · p với nửa chu vi p = (${a} + ${b} + ${c}) : 2 = ${half} cm.`,
          `r = S : p = ${S} : ${half} = ${t(S / half)} cm.`,
        ],
        hints: [
          'Chia tam giác thành ba tam giác IAB, IBC, ICA có cùng chiều cao r.',
          'S = r · p, với p là nửa chu vi.',
        ],
      };
    }
    if (variant === 1) {
      const k = int(rand, 2, 16);
      return {
        prompt: `Tam giác đều ABC có cạnh ${k}√3 cm. Tính bán kính đường tròn nội tiếp tam giác (cm).`,
        answer: k / 2,
        unit: 'cm',
        steps: [
          'Tam giác đều cạnh a có r = a√3/6.',
          `r = ${k}√3 · √3 : 6 = ${3 * k} : 6 = ${t(k / 2)} cm.`,
        ],
        hints: ['r = a√3/6 với a là cạnh tam giác đều.'],
      };
    }
    const A = 2 * int(rand, 15, 60);
    return {
      prompt: `Tam giác ABC có $\\widehat{BAC}$ = ${A}°, I là tâm đường tròn nội tiếp. Tính $\\widehat{BIC}$ (độ).`,
      answer: 90 + A / 2,
      unit: '°',
      steps: [
        'I là giao điểm các đường phân giác nên $\\widehat{IBC}$ = $\\widehat{ABC}$/2 và $\\widehat{ICB}$ = $\\widehat{ACB}$/2.',
        `$\\widehat{ABC}$ + $\\widehat{ACB}$ = 180° − ${A}° = ${180 - A}°, nên $\\widehat{IBC}$ + $\\widehat{ICB}$ = ${(180 - A) / 2}°.`,
        `$\\widehat{BIC}$ = 180° − ${(180 - A) / 2}° = ${90 + A / 2}°.`,
      ],
      hints: [
        'BI và CI là các đường phân giác của góc B và góc C.',
        'Tính $\\widehat{IBC}$ + $\\widehat{ICB}$ rồi dùng tổng ba góc của tam giác IBC.',
      ],
    };
  },
};

/** @type {Skill} */
export const tuGiacNoiTiep = {
  id: 'tu-giac-noi-tiep',
  label: 'Bài 29. Tứ giác nội tiếp',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      const x = int(rand, 40, 140);
      const [given, asked] = pick(rand, [
        ['A', 'C'],
        ['B', 'D'],
        ['C', 'A'],
        ['D', 'B'],
      ]);
      return {
        prompt: `Tứ giác ABCD nội tiếp đường tròn có $\\widehat{${given}}$ = ${x}°. Tính $\\widehat{${asked}}$ (độ).`,
        answer: 180 - x,
        unit: '°',
        steps: [
          `$\\widehat{${given}}$ và $\\widehat{${asked}}$ là hai góc đối của tứ giác nội tiếp nên $\\widehat{${given}}$ + $\\widehat{${asked}}$ = 180°.`,
          `$\\widehat{${asked}}$ = 180° − ${x}° = ${180 - x}°.`,
        ],
        hints: ['Trong tứ giác nội tiếp, tổng hai góc đối bằng 180°.'],
      };
    }
    if (variant === 1) {
      const [p, q] = pick(rand, [
        [1, 2],
        [1, 3],
        [1, 5],
        [2, 3],
        [3, 7],
        [4, 5],
        [5, 7],
        [7, 11],
      ]);
      const unit = 180 / (p + q);
      return {
        prompt: `Tứ giác ABCD nội tiếp đường tròn có $\\widehat{A}$ : $\\widehat{C}$ = ${p} : ${q}. Tính $\\widehat{C}$ (độ).`,
        answer: q * unit,
        unit: '°',
        steps: [
          '$\\widehat{A}$ + $\\widehat{C}$ = 180° (hai góc đối của tứ giác nội tiếp).',
          `Chia 180° thành ${p} + ${q} = ${p + q} phần, mỗi phần ${unit}°.`,
          `$\\widehat{C}$ = ${q} · ${unit}° = ${q * unit}°.`,
        ],
        hints: ['$\\widehat{A}$ + $\\widehat{C}$ = 180°.', `Chia 180° theo tỉ lệ ${p} : ${q}.`],
      };
    }
    if (variant === 2) {
      const [a, b, c] = pick(rand, TRIPLES);
      return {
        prompt: `Hình chữ nhật ABCD có AB = ${a} cm, BC = ${b} cm. Tính bán kính đường tròn ngoại tiếp hình chữ nhật (cm).`,
        answer: c / 2,
        unit: 'cm',
        steps: [
          'Tâm đường tròn ngoại tiếp hình chữ nhật là giao điểm hai đường chéo; bán kính bằng nửa đường chéo.',
          `AC² = ${a * a} + ${b * b} = ${c * c}, nên AC = ${c} cm.`,
          `R = ${c} : 2 = ${t(c / 2)} cm.`,
        ],
        hints: ['Bán kính bằng nửa đường chéo.', 'Tính đường chéo bằng định lí Pythagore.'],
      };
    }
    const k = int(rand, 2, 12);
    return {
      prompt: `Hình vuông ABCD có cạnh ${k}√2 cm. Tính bán kính đường tròn ngoại tiếp hình vuông (cm).`,
      answer: k,
      unit: 'cm',
      steps: [
        'Đường chéo hình vuông cạnh a bằng a√2.',
        `AC = ${k}√2 · √2 = ${2 * k} cm.`,
        `R = AC : 2 = ${k} cm.`,
      ],
      hints: ['Bán kính bằng nửa đường chéo.', 'Đường chéo hình vuông cạnh a bằng a√2.'],
    };
  },
};

/** @type {Skill} */
export const daGiacDeu = {
  id: 'da-giac-deu',
  label: 'Bài 30. Đa giác đều',
  make(rand) {
    const variant = int(rand, 0, 4);
    const n = pick(rand, POLYGON_SIDES);
    const center = 360 / n;
    if (variant === 0) {
      return {
        prompt: `Một ${polygon(n)} tâm O có ${n} đỉnh $A_1, A_2, \\ldots, A_{${n}}$. Tính góc ở tâm $\\widehat{A_1OA_2}$ (độ).`,
        answer: center,
        unit: '°',
        steps: [
          `${n} đỉnh chia đường tròn ngoại tiếp thành ${n} cung bằng nhau.`,
          `$\\widehat{A_1OA_2}$ = 360° : ${n} = ${center}°.`,
        ],
        hints: ['Các đỉnh chia đường tròn ngoại tiếp thành các cung bằng nhau.'],
      };
    }
    if (variant === 1) {
      return {
        prompt: `Tính số đo mỗi góc của ${polygon(n)}${POLYGON[n] ? ` (${n} cạnh)` : ''} (độ).`,
        answer: 180 - center,
        unit: '°',
        steps: [
          `Góc ở tâm bằng 360° : ${n} = ${center}°.`,
          `Mỗi góc của đa giác đều bằng 180° − ${center}° = ${180 - center}°.`,
        ],
        hints: ['Tính góc ở tâm trước.', 'Mỗi góc của đa giác đều n cạnh bằng 180° − 360°/n.'],
      };
    }
    if (variant === 2) {
      return {
        prompt: `Mỗi góc của một đa giác đều bằng ${180 - center}°. Đa giác đó có bao nhiêu cạnh?`,
        answer: n,
        steps: [
          `Góc ở tâm bằng 180° − ${180 - center}° = ${center}°.`,
          `Số cạnh n = 360° : ${center}° = ${n}.`,
        ],
        hints: ['Mỗi góc bằng 180° − góc ở tâm.', 'Góc ở tâm bằng 360° : n.'],
      };
    }
    if (variant === 3) {
      const k = int(rand, 1, n - 1);
      return {
        prompt: `Một ${polygon(n)} tâm O có ${n} đỉnh $A_1, A_2, \\ldots, A_{${n}}$ kí hiệu theo chiều kim đồng hồ. Phép quay thuận chiều ${k * center}° tâm O biến $A_1$ thành $A_m$. Tìm m.`,
        answer: k + 1,
        steps: [
          `Góc ở tâm bằng 360° : ${n} = ${center}°.`,
          `${k * center}° = ${k} · ${center}°, nên $A_1$ dịch đi ${k} đỉnh theo chiều kim đồng hồ.`,
          `$A_1$ biến thành $A_{${k + 1}}$, tức m = ${k + 1}.`,
        ],
        hints: [
          'Mỗi lần quay một góc ở tâm, mỗi đỉnh chuyển sang đỉnh kế tiếp.',
          'Chia góc quay cho góc ở tâm.',
        ],
      };
    }
    const R = int(rand, 2, 15);
    return {
      prompt: `Lục giác đều ABCDEF nội tiếp đường tròn bán kính ${R} cm. Tính chu vi lục giác (cm).`,
      answer: 6 * R,
      unit: 'cm',
      steps: [
        'Góc ở tâm 60°, tam giác OAB cân có một góc 60° nên là tam giác đều: AB = R.',
        `Chu vi = 6 · ${R} = ${6 * R} cm.`,
      ],
      hints: ['Cạnh của lục giác đều nội tiếp đường tròn bằng bán kính.'],
    };
  },
};

/** The drill of "Luyện tập chung trang 78": Bài 27 and Bài 28. */
export const SKILLS_TRANG_78 = [gocNoiTiep, ngoaiTiepTamGiac, noiTiepTamGiac];

/** The drill of "Luyện tập chung trang 90": Bài 29 and Bài 30. */
export const SKILLS_TRANG_90 = [tuGiacNoiTiep, daGiacDeu];

/** The drill of the chapter review, one skill per idea of each lesson. */
export const CHAPTER_SKILLS = [
  gocNoiTiep,
  ngoaiTiepTamGiac,
  noiTiepTamGiac,
  tuGiacNoiTiep,
  daGiacDeu,
];
