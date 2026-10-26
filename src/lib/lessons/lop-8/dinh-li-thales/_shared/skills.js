/**
 * Question generators for the chapter "Định lí Thalès", one skill per lesson
 * plus one for real-life problems. Lengths are in cm or m and may be
 * decimals with at most two digits after the comma, so the boards read
 * answers with `readNumber` and write them with `answerText`. Prompts and
 * steps are plain text: a ratio is written "AM/AB", a decimal with a comma.
 */

import { int, pick } from '#lib/core/drill.js';
import { numberText } from '#lib/core/decimal.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * How the boards write an answer: whole numbers grouped the book's way,
 * others with a decimal comma (7,5).
 * @param {number} n
 */
export const answerText = (n) => (Number.isInteger(n) && n >= 0 ? fmt(n) : numberText(n));

/** Rounds away binary noise from products of short decimals. @param {number} n */
const tidy = (n) => Math.round(n * 1e6) / 1e6;

/** A number with a decimal comma. @param {number} n */
const t = (n) => numberText(tidy(n));

/** Half-steps 1; 1,5; 2; ... for scale factors. @param {() => number} rand */
const halfStep = (rand) => int(rand, 2, 8) / 2;

/** Ratio p : q of the two parts of a side, with p ≠ q. @param {() => number} rand */
function parts(rand) {
  const p = int(rand, 1, 5);
  let q = int(rand, 1, 5);
  if (q === p) q = p === 5 ? 4 : p + 1;
  return { p, q };
}

/** @type {Skill} */
export const thales = {
  id: 'thales',
  label: 'Bài 15. Định lí Thalès',
  make(rand) {
    const v = int(rand, 0, 3);
    const { p, q } = parts(rand);
    const u = halfStep(rand);
    const s = halfStep(rand);
    // AM = p·u, MB = q·u on AB; AN = p·s, NC = q·s on AC.
    const am = p * u;
    const mb = q * u;
    const an = p * s;
    const nc = q * s;
    const given = `Tam giác ABC có MN ∥ BC (M thuộc AB, N thuộc AC)`;
    if (v === 0) {
      return {
        prompt: `${given}, AM = ${t(am)} cm, MB = ${t(mb)} cm, AN = ${t(an)} cm. Tính NC.`,
        answer: tidy(nc),
        unit: 'cm',
        hints: ['Dùng định lí Thalès với các đoạn trên hai cạnh: AM/MB = AN/NC.'],
        steps: [
          `Vì MN ∥ BC nên AM/MB = AN/NC, tức ${t(am)}/${t(mb)} = ${t(an)}/NC.`,
          `NC = ${t(an)} · ${t(mb)} : ${t(am)} = ${t(nc)} cm.`,
        ],
      };
    }
    if (v === 1) {
      return {
        prompt: `${given}, AM = ${t(am)} cm, AB = ${t(am + mb)} cm, AC = ${t(an + nc)} cm. Tính AN.`,
        answer: tidy(an),
        unit: 'cm',
        hints: ['So đoạn sát đỉnh A với cả cạnh: AM/AB = AN/AC.'],
        steps: [
          `Vì MN ∥ BC nên AM/AB = AN/AC, tức ${t(am)}/${t(am + mb)} = AN/${t(an + nc)}.`,
          `AN = ${t(an + nc)} · ${t(am)} : ${t(am + mb)} = ${t(an)} cm.`,
        ],
      };
    }
    if (v === 2) {
      return {
        prompt: `${given}, AM = ${t(am)} cm, MB = ${t(mb)} cm, AC = ${t(an + nc)} cm. Tính AN.`,
        answer: tidy(an),
        unit: 'cm',
        hints: ['Tính AB = AM + MB trước.', 'Rồi dùng AM/AB = AN/AC.'],
        steps: [
          `AB = ${t(am)} + ${t(mb)} = ${t(am + mb)} cm.`,
          `AM/AB = AN/AC nên AN = ${t(an + nc)} · ${t(am)} : ${t(am + mb)} = ${t(an)} cm.`,
        ],
      };
    }
    return {
      prompt: `${given}, AN = ${t(an)} cm, NC = ${t(nc)} cm, AB = ${t(am + mb)} cm. Tính MB.`,
      answer: tidy(mb),
      unit: 'cm',
      hints: ['Tính AC = AN + NC.', 'Dùng MB/AB = NC/AC.'],
      steps: [
        `AC = ${t(an)} + ${t(nc)} = ${t(an + nc)} cm.`,
        `MB/AB = NC/AC nên MB = ${t(am + mb)} · ${t(nc)} : ${t(an + nc)} = ${t(mb)} cm.`,
      ],
    };
  },
};

/** @type {Skill} */
export const trungBinh = {
  id: 'trung-binh',
  label: 'Bài 16. Đường trung bình',
  make(rand) {
    const v = int(rand, 0, 3);
    const mn = 'M, N lần lượt là trung điểm của AB, AC';
    if (v === 0) {
      const bc = int(rand, 5, 30);
      return {
        prompt: `Tam giác ABC có BC = ${bc} cm, ${mn}. Tính MN.`,
        answer: bc / 2,
        unit: 'cm',
        hints: [
          'MN là đường trung bình của tam giác ABC.',
          'Đường trung bình bằng nửa cạnh thứ ba.',
        ],
        steps: [
          'MN là đường trung bình của tam giác ABC nên MN = BC : 2.',
          `MN = ${bc} : 2 = ${t(bc / 2)} cm.`,
        ],
      };
    }
    if (v === 1) {
      const half = int(rand, 5, 40) / 2;
      return {
        prompt: `Tam giác ABC có ${mn} và MN = ${t(half)} cm. Tính BC.`,
        answer: tidy(2 * half),
        unit: 'cm',
        hints: ['MN là đường trung bình ứng với cạnh BC.', 'BC gấp đôi MN.'],
        steps: [
          'MN là đường trung bình nên MN = BC : 2.',
          `BC = 2 · ${t(half)} = ${t(2 * half)} cm.`,
        ],
      };
    }
    if (v === 2) {
      // Three sides of a real triangle.
      const a = int(rand, 4, 14);
      const b = int(rand, 4, 14);
      const lo = Math.abs(a - b) + 1;
      const c = int(rand, lo, a + b - 1);
      const sum = a + b + c;
      return {
        prompt: `Tam giác ABC có AB = ${a} cm, AC = ${b} cm, BC = ${c} cm. Gọi M, N, P là trung điểm của AB, AC, BC. Tính chu vi tam giác MNP.`,
        answer: sum / 2,
        unit: 'cm',
        hints: [
          'Mỗi cạnh của tam giác MNP là một đường trung bình của tam giác ABC.',
          'Chu vi tam giác MNP bằng nửa chu vi tam giác ABC.',
        ],
        steps: [
          `MN = ${t(c / 2)} cm, NP = ${t(a / 2)} cm, MP = ${t(b / 2)} cm.`,
          `Chu vi tam giác MNP = (${a} + ${b} + ${c}) : 2 = ${t(sum / 2)} cm.`,
        ],
      };
    }
    const angle = 5 * int(rand, 6, 24);
    const which = pick(rand, [
      { ask: 'AMN', given: 'ABC' },
      { ask: 'ANM', given: 'ACB' },
    ]);
    return {
      prompt: `Tam giác ABC có góc ${which.given} = ${angle}°, ${mn}. Tính góc ${which.ask}.`,
      answer: angle,
      unit: '°',
      hints: ['MN ∥ BC.', `Góc ${which.ask} và góc ${which.given} ở vị trí đồng vị.`],
      steps: [
        'MN là đường trung bình nên MN ∥ BC.',
        `Góc ${which.ask} = góc ${which.given} = ${angle}° (hai góc đồng vị).`,
      ],
    };
  },
};

/** @type {Skill} */
export const phanGiac = {
  id: 'phan-giac',
  label: 'Bài 17. Đường phân giác',
  make(rand) {
    const v = int(rand, 0, 2);
    const { p, q } = parts(rand);
    // AB = p·u, AC = q·u; DB = p·s, DC = q·s with s < u so BC < AB + AC.
    const u = int(rand, 2, 5);
    let s = halfStep(rand);
    if (s >= u) s = u - 1;
    // Triangle inequality BC > |AB − AC| needs (p + q)·s > |p − q|·u.
    if ((p + q) * s <= Math.abs(p - q) * u) return phanGiac.make(rand);
    const ab = p * u;
    const ac = q * u;
    const db = p * s;
    const dc = q * s;
    const given = 'Tam giác ABC có AD là đường phân giác của góc A (D thuộc BC)';
    if (v === 0) {
      return {
        prompt: `${given}, AB = ${ab} cm, AC = ${ac} cm, DB = ${t(db)} cm. Tính DC.`,
        answer: tidy(dc),
        unit: 'cm',
        hints: ['Tính chất đường phân giác: DB/DC = AB/AC.'],
        steps: [
          `DB/DC = AB/AC, tức ${t(db)}/DC = ${ab}/${ac}.`,
          `DC = ${t(db)} · ${ac} : ${ab} = ${t(dc)} cm.`,
        ],
      };
    }
    if (v === 1) {
      return {
        prompt: `${given}, AB = ${ab} cm, AC = ${ac} cm, BC = ${t(db + dc)} cm. Tính DB.`,
        answer: tidy(db),
        unit: 'cm',
        hints: ['DB/AB = DC/AC = (DB + DC)/(AB + AC).', 'DB + DC = BC.'],
        steps: [
          `DB/${ab} = DC/${ac} = BC/(AB + AC) = ${t(db + dc)}/${ab + ac}.`,
          `DB = ${ab} · ${t(db + dc)} : ${ab + ac} = ${t(db)} cm.`,
        ],
      };
    }
    return {
      prompt: `${given}, AB = ${ab} cm, DB = ${t(db)} cm, DC = ${t(dc)} cm. Tính AC.`,
      answer: ac,
      unit: 'cm',
      hints: ['DB/DC = AB/AC, ẩn là AC.'],
      steps: [
        `DB/DC = AB/AC, tức ${t(db)}/${t(dc)} = ${ab}/AC.`,
        `AC = ${ab} · ${t(dc)} : ${t(db)} = ${ac} cm.`,
      ],
    };
  },
};

/** @type {Skill} */
export const thucTe = {
  id: 'thuc-te',
  label: 'Vận dụng thực tế',
  make(rand) {
    const v = int(rand, 0, 1);
    if (v === 0) {
      const mn = int(rand, 12, 60);
      return {
        prompt: `Hai điểm B, C ở hai bờ một cái hồ. Người ta chọn điểm A rồi đánh dấu trung điểm M của AB và trung điểm N của AC, đo được MN = ${mn} m. Tính khoảng cách BC (mét).`,
        answer: 2 * mn,
        unit: 'm',
        hints: ['MN là đường trung bình của tam giác ABC.', 'BC = 2 · MN.'],
        steps: [
          'MN là đường trung bình của tam giác ABC nên MN = BC : 2.',
          `BC = 2 · ${mn} = ${2 * mn} m.`,
        ],
      };
    }
    // A roof truss: a brace MN ∥ BC, AM = p·u on AB = (p + q)·u.
    const { p, q } = parts(rand);
    // Rafters of nearly equal length: AC differs from AB by at most one step.
    const tenths = int(rand, 3, 6);
    const u = tenths / 10;
    const s = (tenths + pick(rand, [-1, 0, 1])) / 10;
    const ab = (p + q) * u;
    const ac = (p + q) * s;
    return {
      prompt: `Khung mái nhà hình tam giác ABC có kèo AB = ${t(ab)} m, AC = ${t(ac)} m. Thanh giằng MN song song với xà ngang BC (M trên AB, N trên AC) và AM = ${t(p * u)} m. Tính AN (mét).`,
      answer: tidy(p * s),
      unit: 'm',
      hints: ['MN ∥ BC nên dùng được định lí Thalès.', 'AM/AB = AN/AC.'],
      steps: [
        `AM/AB = AN/AC, tức ${t(p * u)}/${t(ab)} = AN/${t(ac)}.`,
        `AN = ${t(ac)} · ${t(p * u)} : ${t(ab)} = ${t(p * s)} m.`,
      ],
    };
  },
};

/** The three lessons practised on the "Luyện tập chung" page. */
export const PRACTICE_SKILLS = [thales, trungBinh, phanGiac];

/** The whole chapter, for the end-of-chapter test. */
export const CHAPTER_SKILLS = [thales, trungBinh, phanGiac, thucTe];
