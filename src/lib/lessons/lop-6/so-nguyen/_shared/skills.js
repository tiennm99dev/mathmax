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
          `Các số nguyên x là ${
            count <= 4
              ? Array.from({ length: count }, (_, i) => intText(lo + 1 + i)).join('; ')
              : `${intText(lo + 1)}; ${intText(lo + 2)}; …; ${intText(hi - 1)}`
          }.`,
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

/** @type {Skill} */
export const nhanSoNguyen = {
  id: 'nhan-so-nguyen',
  label: 'Bài 16. Phép nhân số nguyên',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = nonZero(rand, -25, 25);
      const b = a > 0 ? nonZero(rand, -25, -1) : nonZero(rand, -25, 25);
      const p = a * b;
      const same = a < 0 === b < 0;
      return {
        prompt: `Tính: ${operand(a)} · ${operand(b)}.`,
        answer: p,
        hints: [
          same
            ? 'Hai số cùng dấu: nhân hai phần số tự nhiên, tích dương.'
            : 'Hai số khác dấu: nhân hai phần số tự nhiên rồi đặt dấu "−" trước kết quả.',
          `Phần số tự nhiên của tích là ${Math.abs(a)} · ${Math.abs(b)}.`,
        ],
        steps: [
          `${operand(a)} · ${operand(b)} = ${same ? `${Math.abs(a)} · ${Math.abs(b)}` : `−(${Math.abs(a)} · ${Math.abs(b)})`} = ${intText(p)}.`,
        ],
      };
    }
    if (v === 1) {
      const f = [nonZero(rand, -9, 9), nonZero(rand, -9, 9), nonZero(rand, -9, 9)];
      const p = f[0] * f[1] * f[2];
      const negatives = f.filter((x) => x < 0).length;
      return {
        prompt: `Tính: ${f.map(operand).join(' · ')}.`,
        answer: p,
        hints: [
          'Đếm số thừa số âm để biết dấu của tích.',
          `Có ${negatives} thừa số âm, là số ${negatives % 2 === 0 ? 'chẵn' : 'lẻ'}, nên tích mang dấu "${p > 0 ? '+' : '−'}".`,
        ],
        steps: [
          `${operand(f[0])} · ${operand(f[1])} = ${intText(f[0] * f[1])}.`,
          `${operand(f[0] * f[1])} · ${operand(f[2])} = ${intText(p)}.`,
        ],
      };
    }
    if (v === 2) {
      const a = nonZero(rand, -60, 60);
      const total = pick(rand, [100, -100, 10, -10]);
      let b = 0;
      let c = 0;
      while (b === 0 || c === 0) {
        b = int(rand, Math.min(total, 0) - 40, Math.max(total, 0) + 40);
        c = total - b;
      }
      const p = a * total;
      return {
        prompt: `Tính nhanh: ${operand(a)} · ${operand(b)} + ${operand(a)} · ${operand(c)}.`,
        answer: p,
        hints: [
          `Đặt thừa số chung ${operand(a)} ra ngoài: a · b + a · c = a · (b + c).`,
          `${operand(b)} + ${operand(c)} = ${intText(total)}.`,
        ],
        steps: [
          `${operand(a)} · ${operand(b)} + ${operand(a)} · ${operand(c)} = ${operand(a)} · ${b < 0 || c < 0 ? `[${operand(b)} + ${operand(c)}]` : `(${b} + ${c})`}.`,
          `= ${operand(a)} · ${operand(total)} = ${intText(p)}.`,
        ],
      };
    }
    const t0 = int(rand, -5, 10);
    const hours = int(rand, 2, 6);
    const drop = int(rand, 2, 5);
    const t1 = t0 + hours * -drop;
    return {
      prompt: `Lúc 18 giờ nhiệt độ là ${intText(t0)} °C. Từ đó, mỗi giờ nhiệt độ giảm ${drop} °C. Sau ${hours} giờ, nhiệt độ là bao nhiêu độ C?`,
      answer: t1,
      hints: [
        `Mỗi giờ nhiệt độ thay đổi ${intText(-drop)} °C.`,
        `Tính ${operand(t0)} + ${hours} · ${operand(-drop)}.`,
      ],
      steps: [
        `${operand(t0)} + ${hours} · ${operand(-drop)} = ${operand(t0)} + ${operand(-hours * drop)} = ${intText(t1)}. Nhiệt độ là ${intText(t1)} °C.`,
      ],
    };
  },
};

/** @type {Skill} */
export const chiaHetSoNguyen = {
  id: 'chia-het-so-nguyen',
  label: 'Bài 17. Phép chia hết. Ước và bội của một số nguyên',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const b = pick(rand, [-12, -9, -8, -7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9, 12]);
      const q = nonZero(rand, -15, 15);
      const a = b * q;
      const same = a < 0 === b < 0;
      return {
        prompt: `Tính: ${operand(a)} : ${operand(b)}.`,
        answer: q,
        hints: [
          same
            ? 'Hai số cùng dấu: chia hai phần số tự nhiên, thương dương.'
            : 'Hai số khác dấu: chia hai phần số tự nhiên rồi đặt dấu "−" trước kết quả.',
          `Phần số tự nhiên của thương là ${Math.abs(a)} : ${Math.abs(b)}.`,
        ],
        steps: [
          a > 0 && b > 0
            ? `${a} : ${b} = ${q}.`
            : `${operand(a)} : ${operand(b)} = ${same ? `${Math.abs(a)} : ${Math.abs(b)}` : `−(${Math.abs(a)} : ${Math.abs(b)})`} = ${intText(q)}.`,
          `Thử lại: ${operand(b)} · ${operand(q)} = ${intText(a)}.`,
        ],
      };
    }
    if (v === 1) {
      const n = pick(rand, [6, 8, 10, 12, 14, 15, 16, 18, 20, 21, 24, 28, 30, 36]);
      const a = rand() < 0.5 ? -n : n;
      const pos = [];
      for (let d = 1; d <= n; d++) if (n % d === 0) pos.push(d);
      return {
        prompt: `Số ${intText(a)} có tất cả bao nhiêu ước nguyên?`,
        answer: 2 * pos.length,
        hints: [
          `Tìm các ước dương của ${intText(a)} trước: chúng là các ước của ${n}.`,
          'Mỗi ước dương có số đối cũng là một ước.',
        ],
        steps: [
          `Các ước dương: ${pos.join('; ')} (${pos.length} ước).`,
          `Thêm các số đối của chúng: có ${pos.length} · 2 = ${2 * pos.length} ước nguyên.`,
        ],
      };
    }
    if (v === 2) {
      const b = nonZero(rand, -12, 12);
      const x = nonZero(rand, -20, 20);
      const p = b * x;
      return {
        prompt: `Tìm số nguyên x, biết ${operand(b)} · x = ${intText(p)}.`,
        answer: x,
        hints: [
          'Muốn tìm thừa số chưa biết, lấy tích chia cho thừa số đã biết.',
          `x = ${intText(p)} : ${operand(b)}.`,
        ],
        steps: [
          `x = ${intText(p)} : ${operand(b)} = ${intText(x)}.`,
          `Thử lại: ${operand(b)} · ${operand(x)} = ${intText(p)}.`,
        ],
      };
    }
    const b = pick(rand, [-9, -8, -7, -6, -5, -4, -3, 3, 4, 5, 6, 7, 8, 9]);
    const limit = Math.abs(b) * int(rand, 2, 5) + int(rand, 0, Math.abs(b) - 1);
    const k = Math.floor((limit - 1) / Math.abs(b));
    const count = 2 * k + 1;
    const m = Math.abs(b);
    return {
      prompt: `Có bao nhiêu bội của ${intText(b)} lớn hơn ${intText(-limit)} và nhỏ hơn ${intText(limit)}?`,
      answer: count,
      hints: [
        `Các bội của ${intText(b)} có dạng ${operand(b)} · k: 0; ${m}; ${intText(-m)}; ${2 * m}; ${intText(-2 * m)}; …`,
        'Các bội nằm đối xứng qua 0; nhớ đếm cả số 0.',
      ],
      steps: [
        `Các bội dương nhỏ hơn ${limit}: ${Array.from({ length: k }, (_, i) => (i + 1) * m).join('; ')} (${k} số).`,
        `Có ${k} bội âm tương ứng và số 0, nên có ${k} + ${k} + 1 = ${count} bội.`,
      ],
    };
  },
};

/** One skill per lesson of the chapter, in book order. */
export const CHAPTER_SKILLS = [
  tapHopSoNguyen,
  congTruSoNguyen,
  quyTacDauNgoac,
  nhanSoNguyen,
  chiaHetSoNguyen,
];
