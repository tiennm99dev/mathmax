/**
 * Question generators for the chapter "Số nguyên", one skill per lesson.
 * Answers are integers, possibly negative, so the drill board reads them
 * with `readInteger` and writes them with `intText`.
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import { intText, operand } from './integers.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A non-zero integer from lo to hi.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 */
function nonZero(rand, lo, hi) {
  for (;;) {
    const n = int(rand, lo, hi);
    if (n !== 0) return n;
  }
}

/** @type {Skill} */
export const tapHopSoNguyen = {
  id: 'tap-hop-so-nguyen',
  label: 'Bài 13. Tập hợp các số nguyên',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const lo = int(rand, -15, -2);
      const hi = int(rand, lo + 3, 12);
      const count = hi - lo - 1;
      return {
        prompt: `Có bao nhiêu số nguyên x thỏa mãn ${intText(lo)} < x < ${intText(hi)}?`,
        answer: count,
        hints: [
          'Liệt kê các số nguyên nằm giữa hai số đã cho trên trục số, không lấy hai đầu.',
          `Số nhỏ nhất là ${intText(lo + 1)}, số lớn nhất là ${intText(hi - 1)}.`,
        ],
        steps: [
          `Các số nguyên x là ${intText(lo + 1)}; ${intText(lo + 2)}; …; ${intText(hi - 1)}.`,
          `Đếm: từ ${intText(lo + 1)} đến ${intText(hi - 1)} có ${intText(hi - 1)} − ${operand(lo + 1)} + 1 = ${count} số.`,
        ],
      };
    }
    if (v === 1) {
      const n = int(rand, -40, -2);
      const before = rand() < 0.5;
      const answer = before ? n - 1 : n + 1;
      return {
        prompt: `Tìm số liền ${before ? 'trước' : 'sau'} của ${intText(n)}.`,
        answer,
        hints: [
          before
            ? 'Số liền trước nằm ngay bên trái trên trục số.'
            : 'Số liền sau nằm ngay bên phải trên trục số.',
          before
            ? 'Đi sang trái một đơn vị: số âm có phần số tự nhiên lớn hơn.'
            : 'Đi sang phải một đơn vị: gần điểm 0 hơn.',
        ],
        steps: [
          `Số liền ${before ? 'trước' : 'sau'} của ${intText(n)} là ${intText(answer)}, vì ${before ? `${intText(answer)} < ${intText(n)}` : `${intText(n)} < ${intText(answer)}`} và giữa hai số không có số nguyên nào.`,
        ],
      };
    }
    const values = new Set();
    while (values.size < 5) values.add(int(rand, -30, 30));
    const list = shuffle(rand, [...values]);
    const want = rand() < 0.5 ? 'lớn nhất' : 'nhỏ nhất';
    const answer = want === 'lớn nhất' ? Math.max(...list) : Math.min(...list);
    const sorted = [...list].sort((x, y) => x - y);
    return {
      prompt: `Tìm số ${want} trong các số: ${list.map(intText).join('; ')}.`,
      answer,
      hints: [
        'Số nguyên âm nhỏ hơn 0, số nguyên dương lớn hơn 0.',
        'Với hai số âm, số có phần số tự nhiên lớn hơn thì nhỏ hơn.',
      ],
      steps: [
        `Sắp xếp tăng dần: ${sorted.map(intText).join(' < ')}.`,
        `Số ${want} là ${intText(answer)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const congTruSoNguyen = {
  id: 'cong-tru-so-nguyen',
  label: 'Bài 14. Phép cộng và phép trừ số nguyên',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = nonZero(rand, -80, 80);
      const b = a > 0 ? nonZero(rand, -80, -1) : nonZero(rand, -80, 80);
      const s = a + b;
      const same = a < 0 === b < 0;
      return {
        prompt: `Tính: ${operand(a)} + ${operand(b)}.`,
        answer: s,
        hints: [
          same
            ? 'Hai số cùng dấu: cộng hai phần số tự nhiên rồi đặt dấu chung.'
            : 'Hai số khác dấu: lấy phần số tự nhiên lớn trừ phần số tự nhiên nhỏ.',
          same
            ? 'Kết quả mang dấu chung của hai số.'
            : 'Đặt dấu của số có phần số tự nhiên lớn hơn.',
        ],
        steps: same
          ? [
              `${operand(a)} + ${operand(b)} = ${a < 0 ? '−' : ''}(${Math.abs(a)} + ${Math.abs(b)}) = ${intText(s)}.`,
            ]
          : [
              `Hiệu hai phần số tự nhiên: ${Math.max(Math.abs(a), Math.abs(b))} − ${Math.min(Math.abs(a), Math.abs(b))} = ${Math.abs(s)}.`,
              `${operand(a)} + ${operand(b)} = ${intText(s)}.`,
            ],
      };
    }
    if (v === 1) {
      const a = int(rand, -60, 60);
      const b = nonZero(rand, -60, 60);
      const d = a - b;
      return {
        prompt: `Tính: ${operand(a)} − ${operand(b)}.`,
        answer: d,
        hints: [
          'Trừ là cộng với số đối: a − b = a + (−b).',
          `Số đối của ${intText(b)} là ${intText(-b)}.`,
        ],
        steps: [`${operand(a)} − ${operand(b)} = ${operand(a)} + ${operand(-b)} = ${intText(d)}.`],
      };
    }
    if (v === 2) {
      const t0 = int(rand, -12, 6);
      const up = rand() < 0.5;
      const dt = int(rand, 3, 15);
      const t1 = up ? t0 + dt : t0 - dt;
      return {
        prompt: `Nhiệt độ lúc 6 giờ là ${intText(t0)} °C. Đến 9 giờ nhiệt độ ${up ? 'tăng thêm' : 'giảm đi'} ${dt} °C. Nhiệt độ lúc 9 giờ là bao nhiêu độ C?`,
        answer: t1,
        hints: [
          up ? 'Tăng thêm thì cộng.' : 'Giảm đi thì trừ.',
          `Tính ${operand(t0)} ${up ? '+' : '−'} ${dt}.`,
        ],
        steps: [
          `${operand(t0)} ${up ? '+' : '−'} ${dt} = ${intText(t1)}. Nhiệt độ lúc 9 giờ là ${intText(t1)} °C.`,
        ],
      };
    }
    const a = nonZero(rand, -40, 40);
    const x = nonZero(rand, -40, 40);
    const b = x + a;
    return {
      prompt: `Tìm số nguyên x, biết x + ${operand(a)} = ${intText(b)}.`,
      answer: x,
      hints: [
        'Muốn tìm số hạng chưa biết, lấy tổng trừ đi số hạng đã biết.',
        `x = ${intText(b)} − ${operand(a)}.`,
      ],
      steps: [
        `x = ${intText(b)} − ${operand(a)} = ${intText(b)} + ${operand(-a)} = ${intText(x)}.`,
      ],
    };
  },
};

/**
 * A signed term after another one: ' + 5' or ' − 5'.
 * @param {number} n
 */
const then = (n) => (n < 0 ? ` − ${intText(-n)}` : ` + ${intText(n)}`);

/** @type {Skill} */
export const quyTacDauNgoac = {
  id: 'quy-tac-dau-ngoac',
  label: 'Bài 15. Quy tắc dấu ngoặc',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = int(rand, -50, 50);
      const b = nonZero(rand, -40, 40);
      const c = nonZero(rand, -40, 40);
      const value = a - (b + c);
      return {
        prompt: `Bỏ ngoặc rồi tính: ${intText(a)} − (${intText(b)}${then(c)}).`,
        answer: value,
        hints: [
          'Trước ngoặc là dấu "−": đổi dấu tất cả các số hạng trong ngoặc.',
          `Viết lại: ${intText(a)}${then(-b)}${then(-c)}.`,
        ],
        steps: [`${intText(a)}${then(-b)}${then(-c)} = ${intText(value)}.`],
      };
    }
    if (v === 1) {
      const big = pick(rand, [125, 368, 1001, 2024, 1975, 999, 4567]);
      const p = nonZero(rand, -60, 60);
      const q = nonZero(rand, -60, 60);
      const value = p - q;
      return {
        prompt: `Tính một cách hợp lí: (${intText(big)}${then(p)}) − (${intText(big)}${then(q)}).`,
        answer: value,
        hints: [
          'Bỏ ngoặc thứ hai: đổi dấu cả hai số hạng.',
          `${intText(big)} và ${intText(-big)} là hai số đối nhau.`,
        ],
        steps: [
          `Bỏ ngoặc: ${intText(big)}${then(p)}${then(-big)}${then(-q)}.`,
          `Nhóm hai số đối: [${intText(big)} + ${operand(-big)}]${then(p)}${then(-q)} = 0${then(p)}${then(-q)} = ${intText(value)}.`,
        ],
      };
    }
    const a = nonZero(rand, -30, 30);
    const b = nonZero(rand, -30, 30);
    const c = nonZero(rand, -30, 30);
    // (a + b) − (c + b) + c = a: the quick sum cancels two pairs of opposites.
    const value = a;
    return {
      prompt: `Tính nhanh: (${intText(a)}${then(b)}) − (${intText(c)}${then(b)})${then(c)}.`,
      answer: value,
      hints: [
        'Bỏ hai dấu ngoặc trước, rồi tìm các số đối nhau.',
        `Số hạng ${intText(b)} xuất hiện hai lần với hai dấu ngược nhau.`,
      ],
      steps: [
        `Bỏ ngoặc: ${intText(a)}${then(b)}${then(-c)}${then(-b)}${then(c)}.`,
        `Nhóm các số đối: ${intText(a)} + [${operand(b)} + ${operand(-b)}] + [${operand(-c)} + ${operand(c)}] = ${intText(a)}.`,
      ],
    };
  },
};
