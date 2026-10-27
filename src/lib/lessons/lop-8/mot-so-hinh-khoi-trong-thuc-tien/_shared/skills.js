/**
 * Question generators for the chapter "Một số hình khối trong thực tiễn"
 * (hình chóp tam giác đều, hình chóp tứ giác đều). Lengths are whole numbers
 * or halves, so answers are whole numbers or have one decimal digit; the
 * boards read them with `readNumber` and write them with `answerText`.
 * Prompts and steps are rich text: $S_{xq}$ for diện tích xung quanh, a decimal
 * comma, "·" for a product.
 */

import { int, pick } from '#lib/core/drill.js';
import { answerText } from '#lib/core/decimal.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** Rounds away binary noise from products of short decimals. @param {number} n */
export const tidy = (n) => Math.round(n * 1e6) / 1e6;

/** A number written the book's way. @param {number} n */
const t = (n) => answerText(tidy(n));

/**
 * Right triangles (half of the base side, slant height, lateral edge) whose
 * slant height is longer than half the base, so they fit both pyramids.
 */
export const SLANT_TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [6, 8, 10],
  [9, 12, 15],
];

/**
 * Right triangles (height, half of the base side, slant height) for a square
 * pyramid: SH, HI, SI.
 */
export const HEIGHT_TRIPLES = [
  [4, 3, 5],
  [12, 5, 13],
  [3, 4, 5],
  [8, 6, 10],
  [12, 9, 15],
  [15, 8, 17],
];

/**
 * A pyramid volume S · h / 3 that is a whole number: h is made a multiple
 * of 3 when S is not.
 * @param {() => number} rand
 * @param {number} S
 */
function heightFor(rand, S) {
  return S % 3 === 0 ? int(rand, 4, 15) : 3 * int(rand, 2, 5);
}

/** @type {Skill} */
export const chopTamGiac = {
  id: 'chop-tam-giac',
  label: 'Bài 38. Hình chóp tam giác đều',
  make(rand) {
    const kind = pick(rand, ['lateral', 'slant', 'volume', 'edges']);
    if (kind === 'edges') {
      const a = int(rand, 3, 10);
      const b = int(rand, a, a + 6);
      const sum = 3 * a + 3 * b;
      return {
        prompt: `Hình chóp tam giác đều S.ABC có AB = ${a} cm và SA = ${b} cm. Tính tổng độ dài tất cả các cạnh (cm).`,
        answer: sum,
        unit: 'cm',
        hints: [
          'Ba cạnh đáy bằng nhau và ba cạnh bên bằng nhau.',
          'Tổng = 3 · cạnh đáy + 3 · cạnh bên.',
        ],
        steps: [
          `AB = BC = CA = ${a} cm và SA = SB = SC = ${b} cm.`,
          `Tổng độ dài các cạnh: 3 · ${a} + 3 · ${b} = ${3 * a} + ${3 * b} = ${fmt(sum)} (cm).`,
        ],
      };
    }
    if (kind === 'volume') {
      const S = int(rand, 8, 60);
      const h = heightFor(rand, S);
      const V = (S * h) / 3;
      return {
        prompt: `Hình chóp tam giác đều có diện tích đáy ${S} cm² và chiều cao ${h} cm. Tính thể tích (cm³).`,
        answer: V,
        unit: 'cm³',
        hints: ['V = ⅓ · S · h, với S là diện tích đáy và h là chiều cao.'],
        steps: [`V = ⅓ · S · h = ⅓ · ${S} · ${h} = ${fmt(S * h)} : 3 = ${fmt(V)} (cm³).`],
      };
    }
    const a = 2 * int(rand, 2, 6);
    const d = int(rand, a / 2 + 1, a / 2 + 9);
    const p = (3 * a) / 2;
    const S = p * d;
    if (kind === 'slant') {
      return {
        prompt: `Hình chóp tam giác đều có cạnh đáy ${a} cm và diện tích xung quanh ${fmt(S)} cm². Tính trung đoạn (cm).`,
        answer: d,
        unit: 'cm',
        hints: ['$S_{xq}$ = p · d nên d = $S_{xq}$ : p.', 'p là nửa chu vi đáy: 3 · a : 2.'],
        steps: [
          `Nửa chu vi đáy: p = 3 · ${a} : 2 = ${p} (cm).`,
          `d = ${fmt(S)} : ${p} = ${d} (cm).`,
        ],
      };
    }
    return {
      prompt: `Hình chóp tam giác đều có cạnh đáy ${a} cm và trung đoạn ${d} cm. Tính diện tích xung quanh (cm²).`,
      answer: S,
      unit: 'cm²',
      hints: [
        '$S_{xq}$ = p · d, với p là nửa chu vi đáy.',
        'Đáy là tam giác đều: chu vi bằng 3 · a.',
      ],
      steps: [
        `Nửa chu vi đáy: p = 3 · ${a} : 2 = ${p} (cm).`,
        `$S_{xq}$ = p · d = ${p} · ${d} = ${fmt(S)} (cm²).`,
      ],
    };
  },
};

/** @type {Skill} */
export const chopTuGiac = {
  id: 'chop-tu-giac',
  label: 'Bài 39. Hình chóp tứ giác đều',
  make(rand) {
    const kind = pick(rand, ['lateral', 'total', 'volume', 'height', 'box']);
    if (kind === 'volume' || kind === 'height' || kind === 'box') {
      const a = int(rand, 2, 12);
      const S = a * a;
      const h = heightFor(rand, S);
      const V = (S * h) / 3;
      if (kind === 'height') {
        return {
          prompt: `Hình chóp tứ giác đều có cạnh đáy ${a} cm và thể tích ${fmt(V)} cm³. Tính chiều cao (cm).`,
          answer: h,
          unit: 'cm',
          hints: ['Từ V = ⅓ · S · h suy ra h = 3 · V : S.', 'Đáy là hình vuông: S = a².'],
          steps: [
            `Diện tích đáy: S = ${a}² = ${fmt(S)} (cm²).`,
            `h = 3 · ${fmt(V)} : ${fmt(S)} = ${fmt(3 * V)} : ${fmt(S)} = ${h} (cm).`,
          ],
        };
      }
      if (kind === 'box') {
        return {
          prompt: `Một hình hộp chữ nhật và một hình chóp tứ giác đều có cùng đáy và cùng chiều cao. Thể tích hình hộp là ${fmt(S * h)} cm³. Tính thể tích hình chóp (cm³).`,
          answer: V,
          unit: 'cm³',
          hints: ['Rót đầy hình chóp mấy lần thì đầy hình hộp cùng đáy, cùng chiều cao?'],
          steps: [
            'Hình chóp có thể tích bằng ⅓ thể tích hình hộp cùng đáy, cùng chiều cao.',
            `V_chóp = ${fmt(S * h)} : 3 = ${fmt(V)} (cm³).`,
          ],
        };
      }
      return {
        prompt: `Hình chóp tứ giác đều có cạnh đáy ${a} cm và chiều cao ${h} cm. Tính thể tích (cm³).`,
        answer: V,
        unit: 'cm³',
        hints: ['Đáy là hình vuông cạnh a: S = a².', 'V = ⅓ · S · h.'],
        steps: [
          `Diện tích đáy: S = ${a}² = ${fmt(S)} (cm²).`,
          `V = ⅓ · ${fmt(S)} · ${h} = ${fmt(S * h)} : 3 = ${fmt(V)} (cm³).`,
        ],
      };
    }
    const a = int(rand, 2, 12);
    const d = int(rand, Math.floor(a / 2) + 1, Math.floor(a / 2) + 9);
    const p = 2 * a;
    const lateral = p * d;
    if (kind === 'total') {
      const total = lateral + a * a;
      return {
        prompt: `Hình chóp tứ giác đều có cạnh đáy ${a} cm và trung đoạn ${d} cm. Tính diện tích toàn phần (cm²).`,
        answer: total,
        unit: 'cm²',
        hints: [
          'Diện tích toàn phần = diện tích xung quanh + diện tích đáy.',
          '$S_{xq}$ = p · d với p = 2 · a; đáy là hình vuông cạnh a.',
        ],
        steps: [
          `p = 2 · ${a} = ${p} (cm); $S_{xq}$ = ${p} · ${d} = ${fmt(lateral)} (cm²).`,
          `Diện tích đáy: ${a}² = ${fmt(a * a)} (cm²).`,
          `$S_{tp}$ = ${fmt(lateral)} + ${fmt(a * a)} = ${fmt(total)} (cm²).`,
        ],
      };
    }
    return {
      prompt: `Hình chóp tứ giác đều có cạnh đáy ${a} cm và trung đoạn ${d} cm. Tính diện tích xung quanh (cm²).`,
      answer: lateral,
      unit: 'cm²',
      hints: [
        '$S_{xq}$ = p · d, với p là nửa chu vi đáy.',
        'Đáy là hình vuông: nửa chu vi bằng 2 · a.',
      ],
      steps: [
        `Nửa chu vi đáy: p = 2 · ${a} = ${p} (cm).`,
        `$S_{xq}$ = p · d = ${p} · ${d} = ${fmt(lateral)} (cm²).`,
      ],
    };
  },
};

/** @type {Skill} */
export const trungDoan = {
  id: 'trung-doan',
  label: 'Trung đoạn và định lí Pythagore',
  make(rand) {
    const kind = pick(rand, ['from-height', 'tri-edge', 'square-edge']);
    if (kind === 'from-height') {
      const [h, half, d] = pick(rand, HEIGHT_TRIPLES);
      const a = 2 * half;
      return {
        prompt: `Hình chóp tứ giác đều S.ABCD có cạnh đáy ${a} cm và chiều cao SH = ${h} cm. Tính trung đoạn SI (cm).`,
        answer: d,
        unit: 'cm',
        hints: [
          'I là trung điểm AB; tam giác SHI vuông tại H.',
          'HI bằng nửa cạnh đáy; dùng định lí Pythagore: SI² = SH² + HI².',
        ],
        steps: [
          `HI = ${a} : 2 = ${half} (cm).`,
          `SI² = ${h}² + ${half}² = ${h * h} + ${half * half} = ${d * d}.`,
          `SI = ${d} (cm).`,
        ],
      };
    }
    const [half, d, e] = pick(rand, SLANT_TRIPLES);
    const a = 2 * half;
    const tri = kind === 'tri-edge';
    const p = tri ? 3 * half : 2 * a;
    const S = p * d;
    return {
      prompt: `Hình chóp ${tri ? 'tam giác' : 'tứ giác'} đều có cạnh đáy ${a} cm và cạnh bên ${e} cm. Tính diện tích xung quanh (cm²).`,
      answer: S,
      unit: 'cm²',
      hints: [
        'Trung đoạn là đường cao của một mặt bên (tam giác cân), nó chia cạnh đáy thành hai nửa.',
        'd² = cạnh bên² − (nửa cạnh đáy)²; sau đó $S_{xq}$ = p · d.',
      ],
      steps: [
        `Nửa cạnh đáy: ${a} : 2 = ${half} (cm).`,
        `Trung đoạn: d² = ${e}² − ${half}² = ${e * e} − ${half * half} = ${d * d}, nên d = ${d} cm.`,
        `Nửa chu vi đáy: p = ${tri ? `3 · ${a} : 2` : `2 · ${a}`} = ${p} (cm).`,
        `$S_{xq}$ = ${p} · ${d} = ${fmt(S)} (cm²).`,
      ],
    };
  },
};

/** @type {Skill} */
export const thucTe = {
  id: 'thuc-te',
  label: 'Vận dụng thực tế',
  make(rand) {
    const kind = pick(rand, ['tent', 'tank', 'roof', 'lantern']);
    if (kind === 'tent') {
      const a = int(rand, 2, 4);
      const d = int(rand, a, a + 2);
      const price = 5000 * int(rand, 4, 12);
      const area = 2 * a * d;
      const cost = area * price;
      return {
        prompt: `Một chiếc lều dạng hình chóp tứ giác đều có cạnh đáy ${a} m và trung đoạn ${d} m. Vải may bốn mặt bên giá ${fmt(price)} đồng mỗi mét vuông. Tính tiền mua vải (đồng), bỏ qua mép may.`,
        answer: cost,
        unit: 'đồng',
        hints: [
          'Diện tích vải bằng diện tích xung quanh $S_{xq}$ = p · d.',
          'Nhân diện tích vải với giá một mét vuông.',
        ],
        steps: [
          `$S_{xq}$ = 2 · ${a} · ${d} = ${area} (m²).`,
          `Tiền vải: ${area} · ${fmt(price)} = ${fmt(cost)} (đồng).`,
        ],
      };
    }
    if (kind === 'tank') {
      const a = int(rand, 3, 9);
      const h = heightFor(rand, a * a);
      const V = (a * a * h) / 3;
      return {
        prompt: `Một bể chứa nước dạng hình chóp tứ giác đều (đỉnh hướng xuống) có cạnh đáy ${a} dm và chiều cao ${h} dm. Bể chứa được bao nhiêu lít nước khi đầy?`,
        answer: V,
        unit: 'lít',
        hints: ['V = ⅓ · a² · h; nhớ rằng 1 dm³ = 1 lít.'],
        steps: [
          `V = ⅓ · ${a}² · ${h} = ${fmt(a * a * h)} : 3 = ${fmt(V)} (dm³).`,
          `Vì 1 dm³ = 1 lít nên bể chứa ${fmt(V)} lít.`,
        ],
      };
    }
    if (kind === 'roof') {
      const a = int(rand, 3, 8);
      const d = tidy(int(rand, a + 1, 2 * a + 4) / 2);
      const area = tidy(2 * a * d);
      return {
        prompt: `Mái một chòi nghỉ có dạng hình chóp tứ giác đều không có đáy, cạnh đáy ${a} m, trung đoạn ${t(d)} m. Tính diện tích mái cần lợp (m²).`,
        answer: area,
        unit: 'm²',
        hints: ['Mái gồm bốn mặt bên: diện tích mái là $S_{xq}$ = p · d.'],
        steps: [`p = 2 · ${a} = ${2 * a} (m).`, `$S_{xq}$ = ${2 * a} · ${t(d)} = ${t(area)} (m²).`],
      };
    }
    const a = 2 * int(rand, 4, 10);
    const d = int(rand, a / 2 + 1, a);
    const p = (3 * a) / 2;
    const S = p * d;
    return {
      prompt: `Một chiếc đèn lồng dạng hình chóp tam giác đều có cạnh đáy ${a} cm và trung đoạn ${d} cm. Tính diện tích giấy dán kín ba mặt bên (cm²), bỏ qua mép dán.`,
      answer: S,
      unit: 'cm²',
      hints: ['Ba mặt bên có tổng diện tích bằng $S_{xq}$ = p · d.'],
      steps: [`p = 3 · ${a} : 2 = ${p} (cm).`, `$S_{xq}$ = ${p} · ${d} = ${fmt(S)} (cm²).`],
    };
  },
};

/** The drill of "Luyện tập chung trang 121": both pyramids. */
export const PRACTICE_121 = [chopTamGiac, chopTuGiac];

/** The end-of-chapter test: one skill per lesson, then two mixed skills. */
export const CHAPTER_SKILLS = [chopTamGiac, chopTuGiac, trungDoan, thucTe];
