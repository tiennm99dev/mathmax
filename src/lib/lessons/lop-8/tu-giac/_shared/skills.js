/**
 * Question generators for the chapter "Tứ giác", one skill per lesson or
 * kind of task. Angles are whole degrees (unit '°'); lengths are in cm and
 * may be decimals, so the boards read answers with `readNumber` and write
 * them with `numberText`. Prompts and steps are plain text: an angle is
 * written "góc A", a decimal with a comma.
 */

import { int, pick } from '#lib/core/drill.js';
import { numberText } from '#lib/core/decimal.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** @param {number} n */
const deg = (n) => `${n}°`;

/**
 * How the boards write an answer: whole numbers grouped the book's way
 * (12 000), others with a decimal comma (7,5).
 * @param {number} n
 */
export const answerText = (n) => (Number.isInteger(n) && n >= 0 ? fmt(n) : numberText(n));

/** A length in cm with a decimal comma. @param {number} n */
const cm = (n) => `${numberText(n)} cm`;

/** @type {Skill} */
export const tuGiac = {
  id: 'tu-giac',
  label: 'Bài 10. Tứ giác',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      // Three angles given, the fourth between 40° and 160°.
      const a = 5 * int(rand, 12, 30);
      const b = 5 * int(rand, 12, 30);
      const d = 5 * int(rand, 8, 32);
      const c = 360 - a - b - d;
      if (c <= 30 || c >= 175) return tuGiac.make(rand);
      return {
        prompt: `Tứ giác ABCD có góc A = ${deg(a)}, góc B = ${deg(b)}, góc C = ${deg(c)}. Tính góc D.`,
        answer: d,
        unit: '°',
        hints: ['Tổng các góc của một tứ giác bằng 360°.', 'Lấy 360° trừ tổng ba góc đã biết.'],
        steps: [
          `Góc A + góc B + góc C = ${a}° + ${b}° + ${c}° = ${a + b + c}°.`,
          `Góc D = 360° − ${a + b + c}° = ${d}°.`,
        ],
      };
    }
    if (v === 1) {
      const { ratio, asked } = pick(rand, [
        { ratio: [1, 2, 3, 4], asked: 3 },
        { ratio: [1, 2, 3, 4], asked: 1 },
        { ratio: [2, 3, 4, 6], asked: 3 },
        { ratio: [3, 4, 5, 6], asked: 2 },
        { ratio: [1, 1, 2, 2], asked: 2 },
        { ratio: [2, 3, 3, 4], asked: 0 },
        { ratio: [1, 2, 2, 3], asked: 3 },
        { ratio: [4, 5, 6, 9], asked: 3 },
      ]);
      const sum = ratio.reduce((s, r) => s + r, 0);
      const k = 360 / sum;
      const name = 'ABCD'[asked];
      return {
        prompt: `Các góc A, B, C, D của tứ giác ABCD tỉ lệ với ${ratio.join(', ')}. Tính góc ${name}.`,
        answer: ratio[asked] * k,
        unit: '°',
        hints: [
          `Đặt góc A = ${ratio[0]}x, góc B = ${ratio[1]}x, góc C = ${ratio[2]}x, góc D = ${ratio[3]}x.`,
          `Tổng các góc: ${sum}x = 360°.`,
        ],
        steps: [
          `${ratio.map((r) => `${r}x`).join(' + ')} = ${sum}x = 360°, nên x = ${k}°.`,
          `Góc ${name} = ${ratio[asked]} · ${k}° = ${ratio[asked] * k}°.`,
        ],
      };
    }
    if (v === 2) {
      // Exterior angle at D.
      const a = 5 * int(rand, 14, 26);
      const b = 5 * int(rand, 14, 26);
      const c = 5 * int(rand, 14, 26);
      const d = 360 - a - b - c;
      if (d <= 30 || d >= 170) return tuGiac.make(rand);
      return {
        prompt: `Tứ giác ABCD có góc A = ${deg(a)}, góc B = ${deg(b)}, góc C = ${deg(c)}. Tính góc ngoài của tứ giác tại đỉnh D.`,
        answer: 180 - d,
        unit: '°',
        hints: ['Tính góc D trước.', 'Góc ngoài tại D kề bù với góc D.'],
        steps: [
          `Góc D = 360° − (${a}° + ${b}° + ${c}°) = ${d}°.`,
          `Góc ngoài tại D = 180° − ${d}° = ${180 - d}°.`,
        ],
      };
    }
    if (v === 3) {
      // Two equal angles.
      const c = 5 * int(rand, 12, 30);
      const d = 5 * int(rand, 12, 30);
      const rest = 360 - c - d;
      if (rest % 2 !== 0 || rest / 2 <= 30 || rest / 2 >= 175) return tuGiac.make(rand);
      return {
        prompt: `Tứ giác ABCD có góc C = ${deg(c)}, góc D = ${deg(d)} và góc A = góc B. Tính góc A.`,
        answer: rest / 2,
        unit: '°',
        hints: [
          'Góc A + góc B = 360° − (góc C + góc D).',
          'Hai góc bằng nhau nên mỗi góc bằng một nửa tổng.',
        ],
        steps: [
          `Góc A + góc B = 360° − (${c}° + ${d}°) = ${rest}°.`,
          `Góc A = ${rest}° : 2 = ${rest / 2}°.`,
        ],
      };
    }
    // Sum and difference of two angles.
    const s = 10 * int(rand, 12, 24);
    const cd = 360 - s;
    const diff = 10 * int(rand, 1, 6);
    const c = (cd + diff) / 2;
    const d = (cd - diff) / 2;
    if (c >= 175 || d <= 20) return tuGiac.make(rand);
    return {
      prompt: `Tứ giác ABCD có góc A + góc B = ${deg(s)} và góc C − góc D = ${deg(diff)}. Tính góc C.`,
      answer: c,
      unit: '°',
      hints: ['Góc C + góc D = 360° − (góc A + góc B).', 'Biết tổng và hiệu của góc C và góc D.'],
      steps: [`Góc C + góc D = 360° − ${s}° = ${cd}°.`, `Góc C = (${cd}° + ${diff}°) : 2 = ${c}°.`],
    };
  },
};

/** @type {Skill} */
export const hinhThangCan = {
  id: 'hinh-thang-can',
  label: 'Bài 11. Hình thang cân',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const d = 5 * int(rand, 9, 17);
      const { name, value, why } = pick(rand, [
        {
          name: 'A',
          value: 180 - d,
          why: `Góc A và góc D kề cạnh bên AD nên bù nhau: góc A = 180° − ${d}° = ${180 - d}°.`,
        },
        {
          name: 'B',
          value: 180 - d,
          why: `Góc C = góc D = ${d}°, và góc B bù với góc C: góc B = 180° − ${d}° = ${180 - d}°.`,
        },
        { name: 'C', value: d, why: `Hai góc kề đáy CD bằng nhau: góc C = góc D = ${d}°.` },
      ]);
      return {
        prompt: `Hình thang cân ABCD (AB ∥ CD) có góc D = ${deg(d)}. Tính góc ${name}.`,
        answer: value,
        unit: '°',
        hints: [
          'Hình thang cân có hai góc kề một đáy bằng nhau.',
          'Hai góc kề một cạnh bên của hình thang bù nhau.',
        ],
        steps: [why],
      };
    }
    if (v === 1) {
      const k = pick(rand, [2, 3, 5]);
      const d = 180 / (k + 1);
      return {
        prompt: `Hình thang ABCD (AB ∥ CD) có góc A = ${k} lần góc D. Tính góc D.`,
        answer: d,
        unit: '°',
        hints: [
          'Góc A và góc D kề cạnh bên AD nên góc A + góc D = 180°.',
          `Thay góc A = ${k} · góc D.`,
        ],
        steps: [
          `${k} · góc D + góc D = 180°, tức ${k + 1} · góc D = 180°.`,
          `Góc D = 180° : ${k + 1} = ${d}°.`,
        ],
      };
    }
    if (v === 2) {
      const diff = 10 * int(rand, 1, 8);
      const d = (180 - diff) / 2;
      return {
        prompt: `Hình thang cân ABCD (AB ∥ CD) có góc A − góc D = ${deg(diff)}. Tính góc C.`,
        answer: d,
        unit: '°',
        hints: ['Góc A + góc D = 180°.', 'Tìm góc D rồi dùng góc C = góc D.'],
        steps: [
          `Góc D = (180° − ${diff}°) : 2 = ${d}°.`,
          `Hình thang cân nên góc C = góc D = ${d}°.`,
        ],
      };
    }
    if (v === 3) {
      const small = int(rand, 3, 12);
      const overhang = int(rand, 1, 6);
      const big = small + 2 * overhang;
      // A leg longer than the overhang (big − small) : 2 lets the trapezoid exist.
      const leg = overhang + int(rand, 1, 4) + pick(rand, [0, 0, 0.5]);
      const p = small + big + 2 * leg;
      return {
        prompt: `Hình thang cân ABCD có đáy nhỏ AB = ${cm(small)}, đáy lớn CD = ${cm(big)}, cạnh bên AD = ${cm(leg)}. Tính chu vi hình thang (cm).`,
        answer: p,
        unit: 'cm',
        hints: ['Hai cạnh bên của hình thang cân bằng nhau.'],
        steps: [
          `BC = AD = ${cm(leg)}.`,
          `Chu vi = ${numberText(small)} + ${numberText(big)} + ${numberText(leg)} + ${numberText(leg)} = ${cm(p)}.`,
        ],
      };
    }
    // An isosceles triangle cut by a line parallel to its base.
    const a = 10 * int(rand, 2, 14);
    const base = (180 - a) / 2;
    return {
      prompt: `Tam giác ABC cân tại A có góc A = ${deg(a)}. Lấy M trên AB, N trên AC sao cho AM = AN. Tính góc BMN của hình thang cân BMNC.`,
      answer: 180 - base,
      unit: '°',
      hints: ['Tam giác AMN cân tại A.', 'Góc BMN kề bù với góc AMN.'],
      steps: [
        `Góc AMN = (180° − ${a}°) : 2 = ${base}°.`,
        `Góc BMN = 180° − ${base}° = ${180 - base}°.`,
      ],
    };
  },
};

/** @type {Skill} */
export const hinhBinhHanh = {
  id: 'hinh-binh-hanh',
  label: 'Bài 12. Hình bình hành: góc, cạnh, đường chéo',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const a = 5 * int(rand, 7, 29);
      if (a === 90) return hinhBinhHanh.make(rand);
      const { name, value, why } = pick(rand, [
        {
          name: 'B',
          value: 180 - a,
          why: `Góc A và góc B kề cạnh AB nên bù nhau: góc B = 180° − ${a}° = ${180 - a}°.`,
        },
        { name: 'C', value: a, why: `Các góc đối bằng nhau: góc C = góc A = ${a}°.` },
        {
          name: 'D',
          value: 180 - a,
          why: `Góc D bù với góc A (kề cạnh AD): góc D = 180° − ${a}° = ${180 - a}°.`,
        },
      ]);
      return {
        prompt: `Hình bình hành ABCD có góc A = ${deg(a)}. Tính góc ${name}.`,
        answer: value,
        unit: '°',
        hints: [
          'Trong hình bình hành, các góc đối bằng nhau.',
          'Hai góc kề một cạnh của hình bình hành bù nhau.',
        ],
        steps: [why],
      };
    }
    if (v === 1) {
      const diff = 10 * int(rand, 1, 10);
      const a = (180 + diff) / 2;
      return {
        prompt: `Hình bình hành ABCD có góc A − góc B = ${deg(diff)}. Tính góc A.`,
        answer: a,
        unit: '°',
        hints: ['Góc A + góc B = 180°.', 'Biết tổng và hiệu của hai góc.'],
        steps: [
          `Góc A + góc B = 180° và góc A − góc B = ${diff}°.`,
          `Góc A = (180° + ${diff}°) : 2 = ${a}°.`,
        ],
      };
    }
    if (v === 2) {
      const k = pick(rand, [2, 3, 5, 8]);
      const b = 180 / (k + 1);
      return {
        prompt: `Hình bình hành ABCD có góc A = ${k} lần góc B. Tính góc D.`,
        answer: b,
        unit: '°',
        hints: ['Góc A + góc B = 180°.', 'Góc D đối với góc B.'],
        steps: [`${k + 1} · góc B = 180°, nên góc B = ${b}°.`, `Góc D = góc B = ${b}°.`],
      };
    }
    if (v === 3) {
      const ab = int(rand, 4, 15);
      const bc = int(rand, 2, ab);
      const per = 2 * (ab + bc);
      if (rand() < 0.5) {
        return {
          prompt: `Hình bình hành ABCD có AB = ${cm(ab)}, BC = ${cm(bc)}. Tính chu vi (cm).`,
          answer: per,
          unit: 'cm',
          hints: ['Các cạnh đối bằng nhau: CD = AB, DA = BC.'],
          steps: [`Chu vi = 2 · (${ab} + ${bc}) = ${cm(per)}.`],
        };
      }
      return {
        prompt: `Hình bình hành ABCD có chu vi ${cm(per)} và AB = ${cm(ab)}. Tính BC (cm).`,
        answer: bc,
        unit: 'cm',
        hints: ['Chu vi = 2 · (AB + BC).'],
        steps: [`AB + BC = ${per} : 2 = ${ab + bc} cm.`, `BC = ${ab + bc} − ${ab} = ${cm(bc)}.`],
      };
    }
    const half = int(rand, 2, 12) + pick(rand, [0, 0.5]);
    if (rand() < 0.5) {
      return {
        prompt: `Hình bình hành ABCD có hai đường chéo cắt nhau tại O và OB = ${cm(half)}. Tính BD (cm).`,
        answer: 2 * half,
        unit: 'cm',
        hints: ['Giao điểm hai đường chéo là trung điểm của mỗi đường.'],
        steps: [
          `O là trung điểm của BD nên BD = 2 · OB = 2 · ${numberText(half)} = ${cm(2 * half)}.`,
        ],
      };
    }
    return {
      prompt: `Hình bình hành ABCD có hai đường chéo cắt nhau tại O và AC = ${cm(2 * half)}. Tính OC (cm).`,
      answer: half,
      unit: 'cm',
      hints: ['Giao điểm hai đường chéo là trung điểm của mỗi đường.'],
      steps: [
        `O là trung điểm của AC nên OC = AC : 2 = ${numberText(2 * half)} : 2 = ${cm(half)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const binhHanhThucTe = {
  id: 'binh-hanh-thuc-te',
  label: 'Bài 12. Vận dụng hình bình hành vào thực tế',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = int(rand, 8, 30);
      const b = int(rand, 5, a);
      const price = 1000 * pick(rand, [15, 20, 25, 30, 40, 50]);
      const per = 2 * (a + b);
      return {
        prompt: `Một mảnh vườn hình bình hành có hai cạnh kề dài ${a} m và ${b} m. Làm hàng rào quanh vườn hết ${fmt(price)} đồng mỗi mét. Hết bao nhiêu đồng?`,
        answer: per * price,
        unit: 'đồng',
        hints: [
          'Các cạnh đối bằng nhau, nên chu vi = 2 · (tổng hai cạnh kề).',
          'Nhân chu vi với giá mỗi mét.',
        ],
        steps: [
          `Chu vi vườn = 2 · (${a} + ${b}) = ${per} m.`,
          `Số tiền = ${per} · ${fmt(price)} = ${fmt(per * price)} đồng.`,
        ],
      };
    }
    if (v === 1) {
      const a = 5 * int(rand, 7, 29);
      if (a === 90) return binhHanhThucTe.make(rand);
      return {
        prompt: `Một cổng xếp được ghép từ các thanh sắt tạo thành các hình bình hành. Khi kéo cổng, một góc của mỗi hình bình hành là ${deg(a)}. Góc kề với nó (chung một cạnh) bằng bao nhiêu độ?`,
        answer: 180 - a,
        unit: '°',
        hints: ['Trong hình bình hành, hai góc kề một cạnh bù nhau.'],
        steps: [`Góc kề = 180° − ${a}° = ${180 - a}°.`],
      };
    }
    const a = int(rand, 3, 9) * 2;
    // Keeping b ≤ a lets a side of a/2 + 1 close a triangle with the half sticks.
    const b = int(rand, 2, a / 2) * 2;
    return {
      prompt: `Hai thanh tre dài ${a} dm và ${b} dm được buộc chặt tại trung điểm của mỗi thanh. Nối bốn đầu thanh, ta được tứ giác có một cạnh dài ${numberText(a / 2 + 1)} dm. Cạnh đối với cạnh đó dài bao nhiêu đề-xi-mét?`,
      answer: a / 2 + 1,
      unit: 'dm',
      hints: [
        'Hai thanh tre là hai đường chéo của tứ giác; chúng cắt nhau tại trung điểm của mỗi đường.',
        'Tứ giác đó là hình bình hành, nên các cạnh đối bằng nhau.',
      ],
      steps: [
        'Hai đường chéo cắt nhau tại trung điểm mỗi đường nên tứ giác là hình bình hành.',
        `Các cạnh đối của hình bình hành bằng nhau: cạnh đối dài ${numberText(a / 2 + 1)} dm.`,
      ],
    };
  },
};

/** Skills of "Luyện tập chung trang 56". */
export const SKILLS_TRANG_56 = [tuGiac, hinhThangCan];

/** Skills of "Luyện tập chung trang 62". */
export const SKILLS_TRANG_62 = [hinhBinhHanh, binhHanhThucTe];
