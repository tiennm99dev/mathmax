/**
 * Question generators for the chapter "Một số hình khối trong thực tiễn".
 * Every answer is a whole number (cm, cm², cm³ or lít), so a drill board
 * reads input with the default natural-number reader; each question carries
 * its unit, which the learner may type after the number.
 */

import { int, pick } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** @type {Skill} */
export const hopXungQuanh = {
  id: 'hop-xung-quanh',
  label: 'Bài 36. Diện tích xung quanh hình hộp chữ nhật',
  make(rand) {
    const kind = pick(rand, ['lateral', 'total', 'height']);
    const a = int(rand, 4, 15);
    const b = int(rand, 2, a - 1);
    const c = int(rand, 2, 12);
    const lateral = 2 * (a + b) * c;
    if (kind === 'total') {
      const total = lateral + 2 * a * b;
      return {
        prompt: `Một chiếc hộp hình hộp chữ nhật (có nắp) dài ${a} cm, rộng ${b} cm, cao ${c} cm. Tính tổng diện tích tất cả các mặt của hộp (cm²).`,
        answer: total,
        unit: 'cm²',
        hints: [
          'Tổng diện tích các mặt = diện tích xung quanh + diện tích hai đáy.',
          'Mỗi đáy là hình chữ nhật dài a, rộng b.',
        ],
        steps: [
          `S_xq = 2 · (${a} + ${b}) · ${c} = ${fmt(lateral)} (cm²).`,
          `Hai đáy: 2 · ${a} · ${b} = ${fmt(2 * a * b)} (cm²).`,
          `Tổng diện tích các mặt: ${fmt(lateral)} + ${fmt(2 * a * b)} = ${fmt(total)} (cm²).`,
        ],
      };
    }
    if (kind === 'height') {
      return {
        prompt: `Một hình hộp chữ nhật có đáy dài ${a} cm, rộng ${b} cm và diện tích xung quanh ${fmt(lateral)} cm². Tính chiều cao của hình hộp (cm).`,
        answer: c,
        unit: 'cm',
        hints: [
          'S_xq = chu vi đáy · chiều cao.',
          'Tính chu vi đáy 2 · (a + b) rồi lấy S_xq chia cho nó.',
        ],
        steps: [
          `Chu vi đáy: 2 · (${a} + ${b}) = ${2 * (a + b)} (cm).`,
          `Chiều cao: ${fmt(lateral)} : ${2 * (a + b)} = ${c} (cm).`,
        ],
      };
    }
    return {
      prompt: `Một hình hộp chữ nhật dài ${a} cm, rộng ${b} cm, cao ${c} cm. Tính diện tích xung quanh (cm²).`,
      answer: lateral,
      unit: 'cm²',
      hints: ['S_xq = 2 · (a + b) · c.', 'Chỉ tính bốn mặt bên, không tính hai đáy.'],
      steps: [
        `Chu vi đáy: 2 · (${a} + ${b}) = ${2 * (a + b)} (cm).`,
        `S_xq = ${2 * (a + b)} · ${c} = ${fmt(lateral)} (cm²).`,
      ],
    };
  },
};

/** @type {Skill} */
export const hopTheTich = {
  id: 'hop-the-tich',
  label: 'Bài 36. Thể tích hình hộp chữ nhật',
  make(rand) {
    const kind = pick(rand, ['volume', 'height', 'litre']);
    if (kind === 'litre') {
      const a = 10 * int(rand, 4, 12);
      const b = 10 * int(rand, 2, Math.min(a / 10, 6));
      const c = 10 * int(rand, 2, 6);
      const v = a * b * c;
      return {
        prompt: `Lòng trong một bể nước hình hộp chữ nhật dài ${a} cm, rộng ${b} cm, cao ${c} cm. Bể chứa đầy được bao nhiêu lít nước?`,
        answer: v / 1000,
        unit: 'lít',
        hints: ['Tính thể tích bằng cm³ trước.', '1 lít = 1 dm³ = 1 000 cm³.'],
        steps: [
          `V = ${a} · ${b} · ${c} = ${fmt(v)} (cm³).`,
          `${fmt(v)} cm³ = ${fmt(v / 1000)} dm³ = ${fmt(v / 1000)} lít.`,
        ],
      };
    }
    const a = int(rand, 3, 15);
    const b = int(rand, 2, Math.min(a, 12));
    const c = int(rand, 2, 12);
    const v = a * b * c;
    if (kind === 'height') {
      return {
        prompt: `Một hình hộp chữ nhật có thể tích ${fmt(v)} cm³, đáy dài ${a} cm và rộng ${b} cm. Tính chiều cao (cm).`,
        answer: c,
        unit: 'cm',
        hints: ['V = diện tích đáy · chiều cao.', 'Diện tích đáy bằng a · b.'],
        steps: [
          `Diện tích đáy: ${a} · ${b} = ${a * b} (cm²).`,
          `Chiều cao: ${fmt(v)} : ${a * b} = ${c} (cm).`,
        ],
      };
    }
    return {
      prompt: `Tính thể tích của hình hộp chữ nhật dài ${a} cm, rộng ${b} cm, cao ${c} cm (cm³).`,
      answer: v,
      unit: 'cm³',
      hints: ['Thể tích bằng tích ba kích thước.'],
      steps: [`V = ${a} · ${b} · ${c} = ${fmt(v)} (cm³).`],
    };
  },
};

/** @type {Skill} */
export const lapPhuong = {
  id: 'lap-phuong',
  label: 'Bài 36. Hình lập phương',
  make(rand) {
    const kind = pick(rand, ['lateral', 'volume', 'fromLateral']);
    const a = int(rand, 2, 15);
    if (kind === 'lateral') {
      return {
        prompt: `Một hình lập phương có cạnh ${a} cm. Tính diện tích xung quanh (cm²).`,
        answer: 4 * a * a,
        unit: 'cm²',
        hints: ['Bốn mặt bên đều là hình vuông cạnh a: S_xq = 4a².'],
        steps: [`a² = ${a} · ${a} = ${a * a}.`, `S_xq = 4 · ${a * a} = ${fmt(4 * a * a)} (cm²).`],
      };
    }
    if (kind === 'volume') {
      return {
        prompt: `Một khối gỗ hình lập phương có cạnh ${a} cm. Tính thể tích khối gỗ (cm³).`,
        answer: a ** 3,
        unit: 'cm³',
        hints: ['V = a³ = a · a · a.'],
        steps: [`V = ${a} · ${a} · ${a} = ${fmt(a ** 3)} (cm³).`],
      };
    }
    return {
      prompt: `Một hình lập phương có diện tích xung quanh ${fmt(4 * a * a)} cm². Tính thể tích của nó (cm³).`,
      answer: a ** 3,
      unit: 'cm³',
      hints: ['Từ 4a² = S_xq tìm a², rồi tìm cạnh a.', 'Có cạnh a rồi thì V = a³.'],
      steps: [
        `a² = ${fmt(4 * a * a)} : 4 = ${a * a}, nên a = ${a} cm.`,
        `V = ${a}³ = ${fmt(a ** 3)} (cm³).`,
      ],
    };
  },
};

/** Triangles with whole sides: [p, q, r]. */
const TRIANGLES = [
  [3, 4, 5],
  [5, 5, 6],
  [5, 6, 7],
  [4, 7, 9],
  [6, 8, 10],
  [7, 8, 9],
  [5, 12, 13],
  [6, 6, 6],
  [8, 9, 10],
  [9, 10, 11],
];

/** @type {Skill} */
export const langTruTamGiac = {
  id: 'lang-tru-tam-giac',
  label: 'Bài 37. Hình lăng trụ đứng tam giác',
  make(rand) {
    const kind = pick(rand, ['lateral', 'rightVolume', 'volume']);
    const h = int(rand, 3, 15);
    if (kind === 'lateral') {
      const [p, q, r] = pick(rand, TRIANGLES);
      const C = p + q + r;
      return {
        prompt: `Một hình lăng trụ đứng tam giác có ba cạnh đáy ${p} cm, ${q} cm, ${r} cm và chiều cao ${h} cm. Tính diện tích xung quanh (cm²).`,
        answer: C * h,
        unit: 'cm²',
        hints: ['S_xq = chu vi đáy · chiều cao.'],
        steps: [
          `Chu vi đáy: ${p} + ${q} + ${r} = ${C} (cm).`,
          `S_xq = ${C} · ${h} = ${fmt(C * h)} (cm²).`,
        ],
      };
    }
    if (kind === 'rightVolume') {
      const p = int(rand, 3, 12);
      const q = 2 * int(rand, 2, 6);
      const S = (p * q) / 2;
      return {
        prompt: `Một hình lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông ${p} cm và ${q} cm, chiều cao lăng trụ ${h} cm. Tính thể tích (cm³).`,
        answer: S * h,
        unit: 'cm³',
        hints: [
          'V = diện tích đáy · chiều cao.',
          'Diện tích tam giác vuông bằng nửa tích hai cạnh góc vuông.',
        ],
        steps: [`S_đáy = ${p} · ${q} : 2 = ${S} (cm²).`, `V = ${S} · ${h} = ${fmt(S * h)} (cm³).`],
      };
    }
    const base = 2 * int(rand, 2, 8);
    const height = int(rand, 2, 10);
    const S = (base * height) / 2;
    return {
      prompt: `Đáy của một hình lăng trụ đứng là tam giác có một cạnh ${base} cm và đường cao ứng với cạnh đó ${height} cm. Chiều cao lăng trụ là ${h} cm. Tính thể tích (cm³).`,
      answer: S * h,
      unit: 'cm³',
      hints: [
        'Diện tích tam giác = cạnh đáy · đường cao tương ứng : 2.',
        'Đừng nhầm đường cao của tam giác với chiều cao của lăng trụ.',
      ],
      steps: [
        `S_đáy = ${base} · ${height} : 2 = ${S} (cm²).`,
        `V = ${S} · ${h} = ${fmt(S * h)} (cm³).`,
      ],
    };
  },
};

/** @type {Skill} */
export const langTruTuGiac = {
  id: 'lang-tru-tu-giac',
  label: 'Bài 37. Hình lăng trụ đứng tứ giác',
  make(rand) {
    const kind = pick(rand, ['trapezoidVolume', 'lateral', 'rhombusVolume']);
    const h = int(rand, 3, 15);
    if (kind === 'trapezoidVolume') {
      const small = int(rand, 2, 8);
      const big = small + 2 * int(rand, 1, 5);
      const t = int(rand, 2, 9);
      const S = ((big + small) * t) / 2;
      return {
        prompt: `Một hình lăng trụ đứng tứ giác có đáy là hình thang với hai đáy ${big} cm, ${small} cm và chiều cao hình thang ${t} cm. Chiều cao lăng trụ là ${h} cm. Tính thể tích (cm³).`,
        answer: S * h,
        unit: 'cm³',
        hints: ['Diện tích hình thang = (tổng hai đáy) · chiều cao : 2.', 'Rồi V = S_đáy · h.'],
        steps: [
          `S_đáy = (${big} + ${small}) · ${t} : 2 = ${S} (cm²).`,
          `V = ${S} · ${h} = ${fmt(S * h)} (cm³).`,
        ],
      };
    }
    if (kind === 'rhombusVolume') {
      const d1 = 2 * int(rand, 2, 8);
      const d2 = int(rand, 3, 14);
      const S = (d1 * d2) / 2;
      return {
        prompt: `Một hình lăng trụ đứng tứ giác có đáy là hình thoi với hai đường chéo ${d1} cm và ${d2} cm, chiều cao lăng trụ ${h} cm. Tính thể tích (cm³).`,
        answer: S * h,
        unit: 'cm³',
        hints: ['Diện tích hình thoi bằng nửa tích hai đường chéo.'],
        steps: [
          `S_đáy = ${d1} · ${d2} : 2 = ${S} (cm²).`,
          `V = ${S} · ${h} = ${fmt(S * h)} (cm³).`,
        ],
      };
    }
    // Each side shorter than the other three together, so the quadrilateral exists.
    /** @type {number[]} */
    let sides;
    do sides = [0, 1, 2, 3].map(() => int(rand, 3, 12));
    while (2 * Math.max(...sides) >= sides.reduce((s, x) => s + x, 0));
    const fourth = sides[3];
    const C = sides[0] + sides[1] + sides[2] + fourth;
    return {
      prompt: `Một hình lăng trụ đứng tứ giác có các cạnh đáy ${sides[0]} cm, ${sides[1]} cm, ${sides[2]} cm, ${fourth} cm và chiều cao ${h} cm. Tính diện tích xung quanh (cm²).`,
      answer: C * h,
      unit: 'cm²',
      hints: ['S_xq = chu vi đáy · chiều cao.'],
      steps: [
        `Chu vi đáy: ${sides[0]} + ${sides[1]} + ${sides[2]} + ${fourth} = ${C} (cm).`,
        `S_xq = ${C} · ${h} = ${fmt(C * h)} (cm²).`,
      ],
    };
  },
};

/** @type {Skill} */
export const langTruNguoc = {
  id: 'lang-tru-nguoc',
  label: 'Bài 37. Tìm chiều cao, diện tích đáy của lăng trụ',
  make(rand) {
    const kind = pick(rand, ['heightFromLateral', 'heightFromVolume', 'baseFromVolume']);
    const h = int(rand, 3, 15);
    if (kind === 'heightFromLateral') {
      const C = int(rand, 9, 40);
      return {
        prompt: `Một hình lăng trụ đứng có chu vi đáy ${C} cm và diện tích xung quanh ${fmt(C * h)} cm². Tính chiều cao của lăng trụ (cm).`,
        answer: h,
        unit: 'cm',
        hints: ['Từ S_xq = C_đáy · h suy ra h = S_xq : C_đáy.'],
        steps: [`h = ${fmt(C * h)} : ${C} = ${h} (cm).`],
      };
    }
    const S = int(rand, 6, 60);
    if (kind === 'heightFromVolume') {
      return {
        prompt: `Một hình lăng trụ đứng có diện tích đáy ${S} cm² và thể tích ${fmt(S * h)} cm³. Tính chiều cao của lăng trụ (cm).`,
        answer: h,
        unit: 'cm',
        hints: ['Từ V = S_đáy · h suy ra h = V : S_đáy.'],
        steps: [`h = ${fmt(S * h)} : ${S} = ${h} (cm).`],
      };
    }
    return {
      prompt: `Một hình lăng trụ đứng có chiều cao ${h} cm và thể tích ${fmt(S * h)} cm³. Tính diện tích đáy (cm²).`,
      answer: S,
      unit: 'cm²',
      hints: ['Từ V = S_đáy · h suy ra S_đáy = V : h.'],
      steps: [`S_đáy = ${fmt(S * h)} : ${h} = ${S} (cm²).`],
    };
  },
};

/** Skills of the practice after Bài 36. */
export const PAGE_92_SKILLS = [hopXungQuanh, hopTheTich, lapPhuong];

/** Skills of the practice after Bài 37. */
export const PAGE_100_SKILLS = [langTruTamGiac, langTruTuGiac, langTruNguoc];

/** Every skill of the chapter, for the end-of-chapter review. */
export const CHAPTER_SKILLS = [...PAGE_92_SKILLS, ...PAGE_100_SKILLS];
