/**
 * Question generators for the chapter "Tính đối xứng của hình phẳng trong
 * tự nhiên": one skill per lesson plus one that mixes both kinds of symmetry.
 * Every answer is a natural number (a count of axes, of letters or shapes,
 * or a length in whole centimetres), so the drill board's default reader
 * and writer apply. The facts come from `symmetry.js`, whose tests check
 * them against the geometry.
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import { SHAPES } from './symmetry.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * Capital letters as the book prints them (sans-serif), with whether each
 * has an axis and a centre of symmetry. Letters whose answer depends on the
 * typeface (B, K, W and the like) are left out.
 */
export const LETTERS = /** @type {Record<string, { axis: boolean, center: boolean }>} */ ({
  A: { axis: true, center: false },
  C: { axis: true, center: false },
  D: { axis: true, center: false },
  E: { axis: true, center: false },
  H: { axis: true, center: true },
  I: { axis: true, center: true },
  M: { axis: true, center: false },
  O: { axis: true, center: true },
  T: { axis: true, center: false },
  U: { axis: true, center: false },
  V: { axis: true, center: false },
  X: { axis: true, center: true },
  Y: { axis: true, center: false },
  F: { axis: false, center: false },
  G: { axis: false, center: false },
  L: { axis: false, center: false },
  N: { axis: false, center: true },
  P: { axis: false, center: false },
  R: { axis: false, center: false },
  S: { axis: false, center: true },
  Z: { axis: false, center: true },
});

/** Figures the drills name, with the wording used in a sentence. */
const FIGURES = [
  { id: 'doan-thang', name: 'đoạn thẳng' },
  { id: 'tam-giac-deu', name: 'tam giác đều' },
  { id: 'hinh-vuong', name: 'hình vuông' },
  { id: 'hinh-chu-nhat', name: 'hình chữ nhật (không phải hình vuông)' },
  { id: 'hinh-thoi', name: 'hình thoi (không phải hình vuông)' },
  { id: 'hinh-thang-can', name: 'hình thang cân' },
  { id: 'hinh-binh-hanh', name: 'hình bình hành (không phải hình chữ nhật, hình thoi)' },
  { id: 'luc-giac-deu', name: 'lục giác đều' },
  { id: 'hinh-tron', name: 'hình tròn' },
].map((f) => ({ ...f, axes: SHAPES[f.id].axes, center: SHAPES[f.id].center !== null }));

/** Figures with a finite number of axes, for "how many axes" questions. */
const COUNTABLE = FIGURES.filter((f) => f.axes !== 'vo-so');

/** Where the axes of each figure lie, as said in Bài 21. */
const AXIS_WHERE = /** @type {Record<string, string>} */ ({
  'doan-thang':
    'đường thẳng vuông góc với đoạn thẳng tại trung điểm và chính đường thẳng chứa đoạn thẳng',
  'tam-giac-deu': 'mỗi đường thẳng đi qua một đỉnh và trung điểm cạnh đối diện',
  'hinh-vuong': 'hai đường chéo và hai đường thẳng đi qua trung điểm hai cạnh đối diện',
  'hinh-chu-nhat': 'hai đường thẳng đi qua trung điểm hai cạnh đối diện',
  'hinh-thoi': 'hai đường chéo',
  'hinh-thang-can': 'đường thẳng đi qua trung điểm hai đáy',
  'hinh-binh-hanh': 'không có đường thẳng nào gấp được cho hai phần chồng khít',
  'luc-giac-deu': 'ba đường chéo chính và ba đường thẳng đi qua trung điểm hai cạnh đối diện',
});

/** @param {() => number} rand @param {number} n */
const letterSet = (rand, n) => shuffle(rand, Object.keys(LETTERS)).slice(0, n);

/**
 * @param {() => number} rand @param {number} n
 * @param {(f: (typeof FIGURES)[number]) => boolean} [keep] figures allowed
 */
const figureSet = (rand, n, keep = () => true) => shuffle(rand, FIGURES.filter(keep)).slice(0, n);

/** @param {string} t */
const cap = (t) => t[0].toUpperCase() + t.slice(1);

/** @param {string[]} items */
const list = (items) => items.join(', ');

/** @type {Skill} */
export const trucDoiXung = {
  id: 'truc-doi-xung',
  label: 'Bài 21. Hình có trục đối xứng',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const f = pick(
        rand,
        COUNTABLE.filter((x) => x.axes !== 0),
      );
      return {
        prompt: `Một ${f.name} có bao nhiêu trục đối xứng?`,
        answer: /** @type {number} */ (f.axes),
        hints: [
          'Tưởng tượng gấp hình theo các đường chéo và theo các đường đi qua trung điểm cạnh.',
        ],
        steps: [`Các trục đối xứng: ${AXIS_WHERE[f.id]}.`, `Số trục đối xứng: ${f.axes}.`],
      };
    }
    if (v === 1) {
      const letters = letterSet(rand, int(rand, 5, 7));
      const yes = letters.filter((c) => LETTERS[c].axis);
      return {
        prompt: `Trong các chữ cái in hoa ${list(letters)}, có bao nhiêu chữ có trục đối xứng?`,
        answer: yes.length,
        hints: [
          'Thử đặt một chiếc gương dọc ở giữa mỗi chữ, rồi thử một chiếc gương ngang.',
          'Chữ N, S, Z trông cân đối nhưng không có trục đối xứng.',
        ],
        steps: [
          yes.length > 0
            ? `Các chữ có trục đối xứng: ${list(yes)}.`
            : 'Không chữ nào có trục đối xứng.',
          `Có ${yes.length} chữ.`,
        ],
      };
    }
    if (v === 2) {
      const [f, g] = shuffle(rand, COUNTABLE).slice(0, 2);
      const a = /** @type {number} */ (f.axes);
      const b = /** @type {number} */ (g.axes);
      return {
        prompt: `Tính tổng số trục đối xứng của một ${f.name} và một ${g.name}.`,
        answer: a + b,
        hints: ['Đếm số trục đối xứng của từng hình rồi cộng lại.'],
        steps: [
          `${cap(f.name)} có ${a} trục đối xứng.`,
          `${cap(g.name)} có ${b} trục đối xứng.`,
          `Tổng: ${a} + ${b} = ${a + b}.`,
        ],
      };
    }
    if (v === 3) {
      const x = int(rand, 3, 15);
      const half = int(rand, 2, 9);
      return rand() < 0.5
        ? {
            prompt: `Hình thang cân ABCD có hai đáy AB và CD, cạnh bên AD = ${x} cm. Gấp hình theo trục đối xứng của nó thì cạnh AD chồng khít lên cạnh BC. Tính BC (đơn vị cm).`,
            answer: x,
            hints: ['Hai đoạn thẳng chồng khít lên nhau thì dài bằng nhau.'],
            steps: [`AD chồng khít lên BC nên BC = AD.`, `BC = ${x} cm.`],
          }
        : {
            prompt: `Hình chữ nhật ABCD có AB = ${2 * half} cm. Trục đối xứng d cắt AB tại M và gấp theo d thì A trùng với B. Tính MA (đơn vị cm).`,
            answer: half,
            hints: ['Gấp theo d, đoạn MA chồng khít lên đoạn MB.', 'M là trung điểm của AB.'],
            steps: [`MA = MB, nên M là trung điểm của AB.`, `MA = ${2 * half} : 2 = ${half} (cm).`],
          };
    }
    const figs = figureSet(rand, 4);
    const yes = figs.filter((f) => f.axes !== 0);
    return {
      prompt: `Trong các hình sau: ${list(figs.map((f) => f.name))}, có bao nhiêu hình có trục đối xứng?`,
      answer: yes.length,
      hints: [
        'Chỉ có hình bình hành (không phải hình chữ nhật, hình thoi) là không có trục đối xứng.',
      ],
      steps: [
        yes.length > 0
          ? `Các hình có trục đối xứng: ${list(yes.map((f) => f.name))}.`
          : 'Không hình nào có trục đối xứng.',
        `Có ${yes.length} hình.`,
      ],
    };
  },
};

/** @type {Skill} */
export const tamDoiXung = {
  id: 'tam-doi-xung',
  label: 'Bài 22. Hình có tâm đối xứng',
  make(rand) {
    const v = int(rand, 0, 4);
    const a = int(rand, 2, 15);
    if (v === 0) {
      const shape = pick(rand, ['hình bình hành', 'hình chữ nhật', 'hình thoi', 'hình vuông']);
      return rand() < 0.5
        ? {
            prompt: `Một ${shape} ABCD có tâm đối xứng O, biết OA = ${a} cm. Tính độ dài đường chéo AC (đơn vị cm).`,
            answer: 2 * a,
            hints: [
              `Tâm đối xứng của ${shape} là giao điểm hai đường chéo.`,
              'Quay nửa vòng quanh O thì A đến C, nên O là trung điểm của AC.',
            ],
            steps: [
              `O là trung điểm của AC nên OC = OA = ${a} cm.`,
              `AC = ${a} + ${a} = ${2 * a} (cm).`,
            ],
          }
        : {
            prompt: `Một ${shape} ABCD có đường chéo BD = ${2 * a} cm và tâm đối xứng O. Tính OB (đơn vị cm).`,
            answer: a,
            hints: ['O là giao điểm hai đường chéo, cũng là trung điểm của mỗi đường chéo.'],
            steps: ['O là trung điểm của BD.', `OB = ${2 * a} : 2 = ${a} (cm).`],
          };
    }
    if (v === 1) {
      const letters = letterSet(rand, int(rand, 5, 7));
      const yes = letters.filter((c) => LETTERS[c].center);
      return {
        prompt: `Trong các chữ cái in hoa ${list(letters)}, có bao nhiêu chữ có tâm đối xứng?`,
        answer: yes.length,
        hints: [
          'Xoay tờ giấy ngược lại (nửa vòng): chữ nào vẫn đọc như cũ?',
          'Các chữ có tâm đối xứng là H, I, N, O, S, X, Z.',
        ],
        steps: [
          yes.length > 0
            ? `Các chữ có tâm đối xứng: ${list(yes)}.`
            : 'Không chữ nào có tâm đối xứng.',
          `Có ${yes.length} chữ.`,
        ],
      };
    }
    if (v === 2) {
      const figs = figureSet(rand, 5);
      const yes = figs.filter((f) => f.center);
      return {
        prompt: `Trong các hình sau: ${list(figs.map((f) => f.name))}, có bao nhiêu hình có tâm đối xứng?`,
        answer: yes.length,
        hints: ['Chỉ có tam giác đều và hình thang cân là không có tâm đối xứng.'],
        steps: [
          yes.length > 0
            ? `Các hình có tâm đối xứng: ${list(yes.map((f) => f.name))}.`
            : 'Không hình nào có tâm đối xứng.',
          `Có ${yes.length} hình.`,
        ],
      };
    }
    if (v === 3)
      return {
        prompt: `Quay một hình nửa vòng quanh tâm đối xứng O của nó, điểm M của hình đến vị trí M'. Biết OM = ${a} cm, tính độ dài MM' (đơn vị cm).`,
        answer: 2 * a,
        hints: ["Quay nửa vòng quanh O thì O là trung điểm của MM'."],
        steps: [`OM' = OM = ${a} cm và O nằm giữa M, M'.`, `MM' = ${a} + ${a} = ${2 * a} (cm).`],
      };
    return {
      prompt: `Lục giác đều ABCDEF có tâm đối xứng O và cạnh ${a} cm. Ghép từ sáu tam giác đều chung đỉnh O, nên OA = ${a} cm. Tính độ dài đường chéo chính AD (đơn vị cm).`,
      answer: 2 * a,
      hints: [
        'Tâm đối xứng của lục giác đều là giao điểm ba đường chéo chính.',
        'Quay nửa vòng quanh O thì A đến D, nên O là trung điểm của AD.',
      ],
      steps: [`O là trung điểm của AD nên OD = OA = ${a} cm.`, `AD = ${a} + ${a} = ${2 * a} (cm).`],
    };
  },
};

/** @type {Skill} */
export const haiLoaiDoiXung = {
  id: 'hai-loai-doi-xung',
  label: 'Kết hợp trục đối xứng và tâm đối xứng',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const letters = letterSet(rand, int(rand, 6, 8));
      const yes = letters.filter((c) => LETTERS[c].axis && LETTERS[c].center);
      return {
        prompt: `Trong các chữ cái in hoa ${list(letters)}, có bao nhiêu chữ vừa có trục đối xứng vừa có tâm đối xứng?`,
        answer: yes.length,
        hints: [
          'Với mỗi chữ, kiểm tra hai điều: gấp được cho chồng khít, và quay nửa vòng vẫn như cũ.',
          'Chỉ các chữ H, I, O, X có cả hai.',
        ],
        steps: [
          yes.length > 0 ? `Các chữ có cả hai: ${list(yes)}.` : 'Không chữ nào có cả hai.',
          `Có ${yes.length} chữ.`,
        ],
      };
    }
    if (v === 1) {
      const figs = figureSet(rand, 5);
      const yes = figs.filter((f) => f.axes !== 0 && f.center);
      return {
        prompt: `Trong các hình sau: ${list(figs.map((f) => f.name))}, có bao nhiêu hình vừa có trục đối xứng vừa có tâm đối xứng?`,
        answer: yes.length,
        hints: [
          'Tam giác đều và hình thang cân không có tâm đối xứng.',
          'Hình bình hành (không phải hình chữ nhật, hình thoi) không có trục đối xứng.',
        ],
        steps: [
          yes.length > 0
            ? `Các hình có cả hai: ${list(yes.map((f) => f.name))}.`
            : 'Không hình nào có cả hai.',
          `Có ${yes.length} hình.`,
        ],
      };
    }
    const letters = letterSet(rand, int(rand, 6, 8));
    const yes = letters.filter((c) => LETTERS[c].axis && !LETTERS[c].center);
    return {
      prompt: `Trong các chữ cái in hoa ${list(letters)}, có bao nhiêu chữ có trục đối xứng nhưng không có tâm đối xứng?`,
      answer: yes.length,
      hints: [
        'Tìm các chữ có trục đối xứng, rồi bỏ đi những chữ quay nửa vòng vẫn như cũ.',
        'Các chữ có tâm đối xứng là H, I, N, O, S, X, Z.',
      ],
      steps: [
        yes.length > 0
          ? `Các chữ chỉ có trục, không có tâm: ${list(yes)}.`
          : 'Không chữ nào như vậy.',
        `Có ${yes.length} chữ.`,
      ],
    };
  },
};

/** Skills of the practice lesson after Bài 21 and Bài 22. */
export const LESSON_SKILLS = [trucDoiXung, tamDoiXung];

/** Skills of the end-of-chapter review. */
export const CHAPTER_SKILLS = [trucDoiXung, tamDoiXung, haiLoaiDoiXung];
