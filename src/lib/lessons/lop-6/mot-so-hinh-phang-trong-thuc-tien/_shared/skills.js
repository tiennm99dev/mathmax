/**
 * Question generators for the chapter "Một số hình phẳng trong thực tiễn",
 * one skill per lesson plus one for word problems. Every answer is a natural
 * number, so the drill board's default reader and writer apply.
 */

import { int, pick } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** @type {Skill} */
export const hinhDeu = {
  id: 'hinh-deu',
  label: 'Bài 18. Tam giác đều, hình vuông, lục giác đều',
  make(rand) {
    const v = int(rand, 0, 5);
    const a = int(rand, 3, 25);
    if (v === 0)
      return {
        prompt: `Tính chu vi của tam giác đều có cạnh ${a} cm (đơn vị cm).`,
        answer: 3 * a,
        hints: ['Tam giác đều có ba cạnh bằng nhau.', 'Chu vi bằng 3 lần cạnh.'],
        steps: [`Ba cạnh đều dài ${a} cm.`, `Chu vi: 3 · ${a} = ${3 * a} (cm).`],
      };
    if (v === 1)
      return {
        prompt: `Tính chu vi của hình lục giác đều có cạnh ${a} cm (đơn vị cm).`,
        answer: 6 * a,
        hints: ['Lục giác đều có sáu cạnh bằng nhau.', 'Chu vi bằng 6 lần cạnh.'],
        steps: [`Sáu cạnh đều dài ${a} cm.`, `Chu vi: 6 · ${a} = ${6 * a} (cm).`],
      };
    if (v === 2)
      return {
        prompt: `Hình lục giác đều ABCDEF ghép từ sáu tam giác đều có chung đỉnh O, biết OA = ${a} cm. Tính độ dài đường chéo chính AD (đơn vị cm).`,
        answer: 2 * a,
        hints: [
          'Đường chéo chính AD đi qua O.',
          'AD = OA + OD, và OD cũng là cạnh của một tam giác đều.',
        ],
        steps: [`OD = OA = ${a} cm.`, `AD = OA + OD = ${a} + ${a} = ${2 * a} (cm).`],
      };
    if (v === 3)
      return {
        prompt: `Một hình lục giác đều có chu vi ${6 * a} cm. Mỗi cạnh dài bao nhiêu xăng-ti-mét?`,
        answer: a,
        hints: ['Chu vi lục giác đều bằng 6 lần cạnh.', 'Lấy chu vi chia cho 6.'],
        steps: [`Cạnh: ${6 * a} : 6 = ${a} (cm).`],
      };
    if (v === 4) {
      const side = rand() < 0.5;
      return side
        ? {
            prompt: `Một hình vuông có chu vi ${4 * a} cm. Cạnh hình vuông dài bao nhiêu xăng-ti-mét?`,
            answer: a,
            hints: ['Hình vuông có bốn cạnh bằng nhau.', 'Lấy chu vi chia cho 4.'],
            steps: [`Cạnh: ${4 * a} : 4 = ${a} (cm).`],
          }
        : {
            prompt: `Tính chu vi của hình vuông có cạnh ${a} cm (đơn vị cm).`,
            answer: 4 * a,
            hints: ['Hình vuông có bốn cạnh bằng nhau.'],
            steps: [`Chu vi: 4 · ${a} = ${4 * a} (cm).`],
          };
    }
    return {
      prompt: `Một khung lục giác đều cạnh ${a} cm có thêm ba thanh nẹp theo ba đường chéo chính. Tính tổng độ dài các thanh (đơn vị cm).`,
      answer: 12 * a,
      hints: [
        'Tính tổng sáu cạnh, rồi tổng ba đường chéo chính.',
        `Mỗi đường chéo chính dài gấp đôi cạnh, tức ${2 * a} cm.`,
      ],
      steps: [
        `Sáu cạnh: 6 · ${a} = ${6 * a} (cm).`,
        `Ba đường chéo chính: 3 · ${2 * a} = ${6 * a} (cm).`,
        `Tổng: ${6 * a} + ${6 * a} = ${12 * a} (cm).`,
      ],
    };
  },
};

/** @type {Skill} */
export const tuGiac = {
  id: 'tu-giac',
  label: 'Bài 19. Hình chữ nhật, hình thoi, hình bình hành, hình thang cân',
  make(rand) {
    const v = int(rand, 0, 5);
    if (v === 0) {
      const d = int(rand, 5, 30);
      return {
        prompt: `Hình chữ nhật ABCD có đường chéo AC = ${d} cm. Tính BD (đơn vị cm).`,
        answer: d,
        hints: ['Nhớ lại đặc điểm hai đường chéo của hình chữ nhật.'],
        steps: [`Hai đường chéo của hình chữ nhật bằng nhau nên BD = AC = ${d} cm.`],
      };
    }
    if (v === 1) {
      const x = int(rand, 2, 20);
      const [p, q] = pick(rand, [
        ['OA', 'AC'],
        ['OB', 'BD'],
      ]);
      return {
        prompt: `Hình bình hành ABCD có hai đường chéo cắt nhau tại O, ${p} = ${x} cm. Tính ${q} (đơn vị cm).`,
        answer: 2 * x,
        hints: [
          'Hai đường chéo của hình bình hành cắt nhau tại trung điểm của mỗi đường.',
          `O là trung điểm của ${q}.`,
        ],
        steps: [`O là trung điểm của ${q} nên ${q} = 2 · ${p} = 2 · ${x} = ${2 * x} (cm).`],
      };
    }
    if (v === 2) {
      const a = int(rand, 3, 25);
      return {
        prompt: `Một hình thoi có chu vi ${4 * a} cm. Mỗi cạnh dài bao nhiêu xăng-ti-mét?`,
        answer: a,
        hints: ['Hình thoi có bốn cạnh bằng nhau.'],
        steps: [`Cạnh: ${4 * a} : 4 = ${a} (cm).`],
      };
    }
    if (v === 3) {
      const b = int(rand, 3, 12);
      const a = b + int(rand, 2, 10);
      // A leg must be longer than half the difference of the bases, or no
      // isosceles trapezoid has these sides.
      const c = int(rand, Math.floor((a - b) / 2) + 1, 12);
      return {
        prompt: `Hình thang cân ABCD có hai đáy AB = ${a} cm, CD = ${b} cm và cạnh bên AD = ${c} cm. Tính chu vi (đơn vị cm).`,
        answer: a + b + 2 * c,
        hints: ['Hai cạnh bên của hình thang cân bằng nhau: BC = AD.'],
        steps: [`BC = AD = ${c} cm.`, `Chu vi: ${a} + ${b} + ${c} + ${c} = ${a + b + 2 * c} (cm).`],
      };
    }
    if (v === 4) {
      const x = int(rand, 4, 20);
      const y = int(rand, 2, x);
      return {
        prompt: `Hình bình hành ABCD có AB = ${x} cm, BC = ${y} cm. Tính tổng độ dài bốn cạnh (đơn vị cm).`,
        answer: 2 * (x + y),
        hints: ['Các cạnh đối của hình bình hành bằng nhau: CD = AB, DA = BC.'],
        steps: [
          `CD = AB = ${x} cm, DA = BC = ${y} cm.`,
          `Tổng: 2 · (${x} + ${y}) = ${2 * (x + y)} (cm).`,
        ],
      };
    }
    const x = int(rand, 2, 15);
    return {
      prompt: `Hình chữ nhật ABCD có hai đường chéo cắt nhau tại O, OA = ${x} cm. Tính BD (đơn vị cm).`,
      answer: 2 * x,
      hints: [
        'Hình chữ nhật cũng có hai đường chéo cắt nhau tại trung điểm mỗi đường.',
        'Hai đường chéo của hình chữ nhật bằng nhau.',
      ],
      steps: [
        `O là trung điểm của AC nên AC = 2 · ${x} = ${2 * x} (cm).`,
        `Hai đường chéo bằng nhau nên BD = AC = ${2 * x} cm.`,
      ],
    };
  },
};

/** @type {Skill} */
export const chuViDienTich = {
  id: 'chu-vi-dien-tich',
  label: 'Bài 20. Chu vi và diện tích của một số tứ giác',
  make(rand) {
    const v = int(rand, 0, 6);
    if (v === 0) {
      const a = int(rand, 5, 30);
      const b = int(rand, 2, a - 1);
      return {
        prompt: `Tính diện tích hình chữ nhật có chiều dài ${a} m, chiều rộng ${b} m (đơn vị m²).`,
        answer: a * b,
        hints: ['S = a · b.'],
        steps: [`S = ${a} · ${b} = ${fmt(a * b)} (m²).`],
      };
    }
    if (v === 1) {
      const a = int(rand, 3, 20);
      return {
        prompt: `Một hình vuông có chu vi ${4 * a} cm. Tính diện tích hình vuông (đơn vị cm²).`,
        answer: a * a,
        hints: ['Tìm cạnh: chu vi chia cho 4.', 'Rồi tính S = a · a.'],
        steps: [`Cạnh: ${4 * a} : 4 = ${a} (cm).`, `S = ${a} · ${a} = ${fmt(a * a)} (cm²).`],
      };
    }
    if (v === 2) {
      const a = int(rand, 4, 25);
      const h = int(rand, 2, 15);
      return {
        prompt: `Tính diện tích hình bình hành có cạnh đáy ${a} cm và chiều cao tương ứng ${h} cm (đơn vị cm²).`,
        answer: a * h,
        hints: ['S = a · h.'],
        steps: [`S = ${a} · ${h} = ${fmt(a * h)} (cm²).`],
      };
    }
    if (v === 3) {
      const m = 2 * int(rand, 2, 12);
      const n = int(rand, 3, 20);
      return {
        prompt: `Tính diện tích hình thoi có hai đường chéo dài ${m} cm và ${n} cm (đơn vị cm²).`,
        answer: (m * n) / 2,
        hints: ['S = ½ · m · n, với m, n là hai đường chéo.'],
        steps: [`S = ${m} · ${n} : 2 = ${fmt(m * n)} : 2 = ${fmt((m * n) / 2)} (cm²).`],
      };
    }
    if (v === 4) {
      const h = 2 * int(rand, 1, 8);
      const b = int(rand, 2, 15);
      const a = b + int(rand, 1, 12);
      return {
        prompt: `Tính diện tích hình thang có hai đáy ${a} cm, ${b} cm và chiều cao ${h} cm (đơn vị cm²).`,
        answer: ((a + b) * h) / 2,
        hints: ['S = (a + b) · h : 2.'],
        steps: [
          `a + b = ${a} + ${b} = ${a + b} (cm).`,
          `S = ${a + b} · ${h} : 2 = ${fmt((a + b) * h)} : 2 = ${fmt(((a + b) * h) / 2)} (cm²).`,
        ],
      };
    }
    if (v === 5) {
      const a = int(rand, 3, 15);
      const h = int(rand, 2, 12);
      return {
        prompt: `Một hình bình hành có diện tích ${a * h} cm² và cạnh đáy ${a} cm. Tính chiều cao tương ứng (đơn vị cm).`,
        answer: h,
        hints: ['Từ S = a · h suy ra h = S : a.'],
        steps: [`h = ${a * h} : ${a} = ${h} (cm).`],
      };
    }
    const a = int(rand, 5, 40);
    const b = int(rand, 2, a - 1);
    return {
      prompt: `Tính chu vi hình chữ nhật có chiều dài ${a} m và chiều rộng ${b} m (đơn vị m).`,
      answer: 2 * (a + b),
      hints: ['C = 2 · (a + b).'],
      steps: [`C = 2 · (${a} + ${b}) = 2 · ${a + b} = ${2 * (a + b)} (m).`],
    };
  },
};

/** @type {Skill} */
export const vanDungThucTe = {
  id: 'van-dung-thuc-te',
  label: 'Vận dụng: bài toán thực tế',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const a = int(rand, 10, 40);
      const b = int(rand, 5, a - 1);
      const g = int(rand, 1, 4);
      return {
        prompt: `Rào xung quanh một mảnh vườn hình chữ nhật dài ${a} m, rộng ${b} m, chừa một cổng rộng ${g} m. Hàng rào dài bao nhiêu mét?`,
        answer: 2 * (a + b) - g,
        hints: ['Tính chu vi mảnh vườn.', 'Phần cổng không rào nên trừ đi.'],
        steps: [
          `Chu vi: 2 · (${a} + ${b}) = ${2 * (a + b)} (m).`,
          `Hàng rào: ${2 * (a + b)} − ${g} = ${2 * (a + b) - g} (m).`,
        ],
      };
    }
    if (v === 1) {
      const c = pick(rand, [20, 25, 40, 50]);
      // Lengths in metres that a whole number of tiles covers exactly.
      const perM = c === 40 ? 2 : 1;
      const a = perM * int(rand, 2, c === 40 ? 5 : 8);
      const b = perM * int(rand, 2, a / perM);
      const na = (100 * a) / c;
      const nb = (100 * b) / c;
      return {
        prompt: `Nền một căn phòng hình chữ nhật dài ${a} m, rộng ${b} m được lát kín bằng gạch hình vuông cạnh ${c} cm. Cần bao nhiêu viên gạch?`,
        answer: na * nb,
        hints: [
          `Đổi về xăng-ti-mét: ${a} m = ${a * 100} cm.`,
          'Số viên = diện tích nền : diện tích một viên gạch.',
        ],
        steps: [
          `Diện tích nền: ${a * 100} · ${b * 100} = ${fmt(a * b * 10000)} (cm²).`,
          `Một viên gạch: ${c} · ${c} = ${fmt(c * c)} (cm²).`,
          `Số viên: ${fmt(a * b * 10000)} : ${fmt(c * c)} = ${fmt(na * nb)} (viên).`,
        ],
      };
    }
    if (v === 2) {
      const h = 2 * int(rand, 3, 10);
      const b = int(rand, 10, 25);
      const a = b + int(rand, 2, 15);
      const k = int(rand, 1, 3);
      const S = ((a + b) * h) / 2;
      return {
        prompt: `Một thửa ruộng hình thang có hai đáy ${a} m, ${b} m và chiều cao ${h} m. Mỗi mét vuông thu được ${k} kg thóc. Cả thửa ruộng thu được bao nhiêu ki-lô-gam thóc?`,
        answer: S * k,
        hints: ['Tính diện tích thửa ruộng trước: S = (a + b) · h : 2.'],
        steps: [
          `S = (${a} + ${b}) · ${h} : 2 = ${fmt(S)} (m²).`,
          `Số thóc: ${fmt(S)} · ${k} = ${fmt(S * k)} (kg).`,
        ],
      };
    }
    if (v === 3) {
      const a = int(rand, 10, 30);
      const b = int(rand, 5, a - 2);
      return {
        prompt: `Một mảnh vườn hình chữ nhật dài ${a} m, rộng ${b} m. Người ta làm một lối đi rộng 1 m chạy ngang qua vườn, song song với chiều rộng. Diện tích phần đất còn lại để trồng rau là bao nhiêu mét vuông?`,
        answer: (a - 1) * b,
        hints: [
          'Lối đi là một hình chữ nhật rộng 1 m, dài bằng chiều rộng vườn.',
          'Lấy diện tích vườn trừ diện tích lối đi.',
        ],
        steps: [
          `Diện tích vườn: ${a} · ${b} = ${fmt(a * b)} (m²).`,
          `Diện tích lối đi: 1 · ${b} = ${b} (m²).`,
          `Còn lại: ${fmt(a * b)} − ${b} = ${fmt((a - 1) * b)} (m²).`,
        ],
      };
    }
    const m = 2 * int(rand, 2, 6);
    const n = int(rand, 2, 8);
    const price = pick(rand, [20, 25, 30, 50]);
    const S = (m * n) / 2;
    return {
      prompt: `Một tấm biển quảng cáo hình thoi có hai đường chéo ${m} dm và ${n} dm. Sơn mỗi đề-xi-mét vuông hết ${price} nghìn đồng. Sơn một mặt tấm biển hết bao nhiêu nghìn đồng?`,
      answer: S * price,
      hints: ['Diện tích hình thoi: S = ½ · m · n.'],
      steps: [
        `S = ${m} · ${n} : 2 = ${fmt(S)} (dm²).`,
        `Tiền sơn: ${fmt(S)} · ${price} = ${fmt(S * price)} (nghìn đồng).`,
      ],
    };
  },
};

/** The three lessons of the chapter, for the mid-chapter practice. */
export const LESSON_SKILLS = [hinhDeu, tuGiac, chuViDienTich];

/** Every skill of the chapter, for the end-of-chapter review. */
export const CHAPTER_SKILLS = [hinhDeu, tuGiac, chuViDienTich, vanDungThucTe];
