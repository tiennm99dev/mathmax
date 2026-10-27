/**
 * Question generators for the chapter "Phương trình và hệ hai phương trình
 * bậc nhất hai ẩn", for the drill board of the practice and review lessons.
 * Every answer is an integer, so the board reads them with `readInteger` and
 * writes them with `intText`. Prompts and steps are plain text with the
 * book's minus sign and the pair notation (x; y).
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import { MINUS, fmt, intText, operand } from '#lib/core/number-format.js';
import { eqText, linText, pairText, substituteText } from '#lib/core/algebra-text.js';
import { gcd } from '#lib/numtheory-engine/index.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A non-zero integer from lo to hi.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 */
export function nonZero(rand, lo, hi) {
  for (;;) {
    const n = int(rand, lo, hi);
    if (n !== 0) return n;
  }
}

/**
 * An integer whose size is from lo to hi, with a random sign.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 */
function signed(rand, lo, hi) {
  return int(rand, lo, hi) * (rand() < 0.5 ? -1 : 1);
}

/**
 * A term with a letter coefficient next to a number term, as plain text:
 * ('m', 'x', 3, 'y') gives 'mx + 3y'; (−2, 'x', 'n', 'y') gives '−2x + ny'.
 * @param {string | number} p coefficient of the first variable
 * @param {string} u first variable
 * @param {string | number} q coefficient of the second variable
 * @param {string} v second variable
 */
function letterSide(p, u, q, v) {
  /** @param {string | number} c @param {string} name */
  const mag = (c, name) =>
    typeof c === 'string' ? `${c}${name}` : `${Math.abs(c) === 1 ? '' : Math.abs(c)}${name}`;
  const first = `${typeof p === 'number' && p < 0 ? MINUS : ''}${mag(p, u)}`;
  const sign = typeof q === 'number' && q < 0 ? MINUS : '+';
  return `${first} ${sign} ${mag(q, v)}`;
}

/** @type {Skill} */
export const phuongTrinh = {
  id: 'phuong-trinh',
  label: 'Bài 1. Phương trình bậc nhất hai ẩn',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const a = signed(rand, 1, 5);
      const b = signed(rand, 1, 5);
      const x0 = int(rand, -5, 5);
      const y0 = nonZero(rand, -6, 6);
      const c = a * x0 + b * y0;
      const rest = c - a * x0;
      return {
        prompt: `Cặp số (${intText(x0)}; y) là một nghiệm của phương trình ${eqText(a, b, c)}. Tìm y.`,
        answer: y0,
        steps: [
          `Thay x = ${intText(x0)} vào phương trình: ${a === 1 ? '' : a === -1 ? MINUS : `${intText(a)} · `}${operand(x0)} ${b < 0 ? MINUS : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y = ${intText(c)}.`,
          `${eqText(0, b, rest)}.`,
          `y = ${intText(rest)} : ${operand(b)} = ${intText(y0)}.`,
        ],
        hints: [
          `Thay x = ${intText(x0)} vào phương trình để được một phương trình ẩn y.`,
          'Chuyển số hạng không chứa y sang vế phải rồi chia cho hệ số của y.',
        ],
      };
    }
    if (variant === 1) {
      const m = signed(rand, 1, 6);
      const b = signed(rand, 1, 5);
      const x0 = signed(rand, 2, 4);
      const y0 = nonZero(rand, -5, 5);
      const c = m * x0 + b * y0;
      const rest = c - b * y0;
      return {
        prompt: `Tìm m để cặp số ${pairText(x0, y0)} là một nghiệm của phương trình ${letterSide('m', 'x', b, 'y')} = ${intText(c)}.`,
        answer: m,
        steps: [
          `Thay x = ${intText(x0)}, y = ${intText(y0)}: m · ${operand(x0)} ${b < 0 ? MINUS : '+'} ${Math.abs(b) === 1 ? '' : `${Math.abs(b)} · `}${operand(y0)} = ${intText(c)}.`,
          `${intText(x0)}m = ${intText(c)} ${b * y0 < 0 ? '+' : MINUS} ${fmt(Math.abs(b * y0))} = ${intText(rest)}.`,
          `m = ${intText(rest)} : ${operand(x0)} = ${intText(m)}.`,
        ],
        hints: [
          'Cặp số là nghiệm khi thay vào phương trình được một đẳng thức đúng.',
          `Thay x = ${intText(x0)}, y = ${intText(y0)} rồi giải phương trình ẩn m.`,
        ],
      };
    }
    const a = signed(rand, 1, 5);
    const b = signed(rand, 1, 4);
    const k = nonZero(rand, -6, 6);
    const c = b * k;
    return {
      prompt: `Đường thẳng biểu diễn tập nghiệm của phương trình ${eqText(a, b, c)} cắt trục Oy tại điểm có tung độ bằng bao nhiêu?`,
      answer: k,
      steps: [
        'Mọi điểm trên trục Oy có hoành độ x = 0.',
        `Thay x = 0: ${eqText(0, b, c)}.`,
        `y = ${intText(c)} : ${operand(b)} = ${intText(k)}.`,
      ],
      hints: [
        'Điểm nằm trên trục Oy có hoành độ bằng bao nhiêu?',
        'Thay x = 0 vào phương trình rồi tìm y.',
      ],
    };
  },
};

/**
 * Coefficients of a system with a unique integer solution (x0; y0).
 * @param {() => number} rand
 * @param {number} lo smallest coefficient size
 * @param {number} hi largest coefficient size
 */
function system(rand, lo, hi) {
  for (;;) {
    const a1 = signed(rand, lo, hi);
    const b1 = signed(rand, lo, hi);
    const a2 = signed(rand, lo, hi);
    const b2 = signed(rand, lo, hi);
    if (a1 * b2 - a2 * b1 === 0) continue;
    const x0 = int(rand, -6, 6);
    const y0 = int(rand, -6, 6);
    if (x0 === 0 && y0 === 0) continue;
    return { a1, b1, a2, b2, x0, y0, c1: a1 * x0 + b1 * y0, c2: a2 * x0 + b2 * y0 };
  }
}

/** @type {Skill} */
export const nghiemHe = {
  id: 'nghiem-he',
  label: 'Bài 1. Nghiệm của hệ hai phương trình',
  make(rand) {
    const { a1, b1, a2, b2, x0, y0, c1, c2 } = system(rand, 1, 4);
    // A point on line (1) only and a point on line (2) only: one step along
    // each line's direction vector (b, −a) away from the common point.
    const on1 = { x: x0 + b1, y: y0 - a1 };
    const on2 = { x: x0 + b2, y: y0 - a2 };
    const options = shuffle(rand, [
      { x: x0, y: y0, both: true },
      { ...on1, both: false },
      { ...on2, both: false },
    ]);
    const answer = options.findIndex((o) => o.both) + 1;
    const list = options.map((o, i) => `(${i + 1}) ${pairText(o.x, o.y)}`).join(', ');
    const check = options.map((o, i) => {
      const r1 = a1 * o.x + b1 * o.y;
      const r2 = a2 * o.x + b2 * o.y;
      const ok1 = r1 === c1 ? 'thoả mãn' : 'không thoả mãn';
      const ok2 = r2 === c2 ? 'thoả mãn' : 'không thoả mãn';
      return `Cặp số (${i + 1}): ${ok1} phương trình thứ nhất (${substituteText(a1, b1, o.x, o.y)}), ${ok2} phương trình thứ hai (${substituteText(a2, b2, o.x, o.y)}).`;
    });
    return {
      prompt: `Cho hệ phương trình gồm ${eqText(a1, b1, c1)} và ${eqText(a2, b2, c2)}. Trong các cặp số ${list}, cặp số nào là nghiệm của hệ? Nhập số thứ tự của cặp số đó.`,
      answer,
      steps: [...check, `Chỉ cặp số (${answer}) thoả mãn cả hai phương trình.`],
      hints: [
        'Nghiệm của hệ phải thoả mãn đồng thời cả hai phương trình.',
        'Thay từng cặp số vào cả hai phương trình; loại cặp số nào làm sai dù chỉ một phương trình.',
      ],
    };
  },
};

/** @type {Skill} */
export const heThe = {
  id: 'phuong-phap-the',
  label: 'Bài 2. Phương pháp thế',
  make(rand) {
    for (;;) {
      const a1 = signed(rand, 1, 5);
      const s = rand() < 0.5 ? 1 : -1;
      const a2 = signed(rand, 1, 5);
      const b2 = signed(rand, 1, 5);
      // y = αx + β from the first equation a1·x + s·y = c1.
      const alpha = -s * a1;
      const k = a2 + b2 * alpha;
      if (k === 0) continue;
      const x0 = int(rand, -6, 6);
      const y0 = int(rand, -6, 6);
      const c1 = a1 * x0 + s * y0;
      const c2 = a2 * x0 + b2 * y0;
      const beta = s * c1;
      const r = c2 - b2 * beta;
      const askX = rand() < 0.5;
      const lin = linText(alpha, beta);
      const a2Text = a2 === 1 ? '' : a2 === -1 ? MINUS : intText(a2);
      const b2Mag = Math.abs(b2) === 1 ? '' : Math.abs(b2);
      const alphaPart = alpha === 1 ? '' : alpha === -1 ? MINUS : `${intText(alpha)} · `;
      const betaPart = beta === 0 ? '' : ` ${beta < 0 ? MINUS : '+'} ${fmt(Math.abs(beta))}`;
      return {
        prompt: `Giải hệ phương trình gồm ${eqText(a1, s, c1)} và ${eqText(a2, b2, c2)} bằng phương pháp thế. Tìm ${askX ? 'x' : 'y'}.`,
        answer: askX ? x0 : y0,
        steps: [
          `Từ phương trình thứ nhất: y = ${lin}.`,
          `Thế vào phương trình thứ hai: ${a2Text}x ${b2 < 0 ? MINUS : '+'} ${b2Mag}(${lin}) = ${intText(c2)}.`,
          `Thu gọn: ${eqText(k, 0, r)}, nên x = ${intText(x0)}.`,
          `Thay lại: y = ${alphaPart}${operand(x0)}${betaPart} = ${intText(y0)}.`,
          `Hệ có nghiệm duy nhất ${pairText(x0, y0)}.`,
        ],
        hints: [
          'Phương trình thứ nhất có hệ số của y bằng 1 hoặc −1: rút y theo x từ phương trình đó.',
          'Thế biểu thức của y vào phương trình thứ hai để được phương trình một ẩn x.',
        ],
      };
    }
  },
};

/** @type {Skill} */
export const heCong = {
  id: 'phuong-phap-cong',
  label: 'Bài 2. Phương pháp cộng đại số',
  make(rand) {
    const { a1, b1, a2, b2, x0, y0, c1, c2 } = system(rand, 2, 6);
    const askX = rand() < 0.5;
    const g = gcd(Math.abs(b1), Math.abs(b2));
    const m1 = Math.abs(b2) / g;
    const m2 = Math.abs(b1) / g;
    const add = b1 * b2 < 0; // y coefficients opposite after scaling
    const k = add ? m1 * a1 + m2 * a2 : m1 * a1 - m2 * a2;
    const r = add ? m1 * c1 + m2 * c2 : m1 * c1 - m2 * c2;
    const relation = add ? 'đối nhau' : 'bằng nhau';
    const factors = [
      m1 === 1 ? '' : `phương trình thứ nhất với ${m1}`,
      m2 === 1 ? '' : `phương trình thứ hai với ${m2}`,
    ].filter(Boolean);
    const scaled =
      factors.length === 0
        ? `Hệ số của y ở hai phương trình ${relation}.`
        : `Nhân hai vế ${factors.join(', ')}: ${eqText(m1 * a1, m1 * b1, m1 * c1)} và ${eqText(m2 * a2, m2 * b2, m2 * c2)}; hệ số của y ${relation}.`;
    const elimHint =
      factors.length === 0
        ? `Hệ số của y đã ${relation}: ${add ? 'cộng' : 'trừ'} từng vế để khử y.`
        : `Thử khử y: nhân hai vế ${factors.join(', ')}.`;
    const rest = c1 - a1 * x0;
    return {
      prompt: `Giải hệ phương trình gồm ${eqText(a1, b1, c1)} và ${eqText(a2, b2, c2)} bằng phương pháp cộng đại số. Tìm ${askX ? 'x' : 'y'}.`,
      answer: askX ? x0 : y0,
      steps: [
        scaled,
        `${add ? 'Cộng' : 'Trừ'} từng vế hai phương trình: ${eqText(k, 0, r)}, nên x = ${intText(x0)}.`,
        `Thay x = ${intText(x0)} vào phương trình thứ nhất: ${eqText(0, b1, rest)}, nên y = ${intText(y0)}.`,
        `Hệ có nghiệm duy nhất ${pairText(x0, y0)}.`,
      ],
      hints: [
        'Làm cho hệ số của cùng một ẩn ở hai phương trình bằng nhau hoặc đối nhau.',
        elimHint,
      ],
    };
  },
};

/** Prices in nghìn đồng for adult and child tickets. */
const TICKETS = [
  [50, 30],
  [60, 40],
  [80, 50],
  [70, 45],
  [100, 60],
];

/** Pairs of fruit sold by the kilogram. */
const FRUITS = [
  ['táo', 'cam'],
  ['xoài', 'nho'],
  ['lê', 'quýt'],
];

/** @type {Skill} */
export const lapHe = {
  id: 'lap-he',
  label: 'Bài 3. Giải bài toán bằng cách lập hệ phương trình',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      const x = int(rand, 5, 30);
      const y = int(rand, 5, 30);
      const heads = x + y;
      const legs = 2 * x + 4 * y;
      const askChicken = rand() < 0.5;
      return {
        prompt: `Vừa gà vừa chó, bó lại cho tròn, ${heads} con, ${legs} chân chẵn. Hỏi có bao nhiêu con ${askChicken ? 'gà' : 'chó'}?`,
        answer: askChicken ? x : y,
        unit: 'con',
        steps: [
          'Gọi x là số gà, y là số chó (x, y là số tự nhiên khác 0).',
          `Lập hệ: x + y = ${heads} (số con) và 2x + 4y = ${legs} (số chân).`,
          `Nhân phương trình thứ nhất với 2 rồi trừ: 2y = ${legs} − ${2 * heads} = ${2 * y}, nên y = ${y}; x = ${heads} − ${y} = ${x}.`,
          `Thoả mãn điều kiện: có ${x} con gà và ${y} con chó.`,
        ],
        hints: [
          'Gọi x là số gà, y là số chó. Một con gà có 2 chân, một con chó có 4 chân.',
          `Hệ: x + y = ${heads} và 2x + 4y = ${legs}.`,
        ],
      };
    }
    if (variant === 1) {
      const [p, q] = pick(rand, TICKETS);
      const x = int(rand, 4, 30) * 5;
      const y = int(rand, 4, 30) * 5;
      const n = x + y;
      const money = p * x + q * y;
      const askAdult = rand() < 0.5;
      return {
        prompt: `Một rạp chiếu phim bán vé người lớn giá ${p} nghìn đồng và vé trẻ em giá ${q} nghìn đồng. Một buổi chiếu bán được ${fmt(n)} vé, thu được ${fmt(money)} nghìn đồng. Hỏi bán được bao nhiêu vé ${askAdult ? 'người lớn' : 'trẻ em'}?`,
        answer: askAdult ? x : y,
        unit: 'vé',
        steps: [
          'Gọi x là số vé người lớn, y là số vé trẻ em (x, y là số tự nhiên).',
          `Lập hệ: x + y = ${fmt(n)} và ${p}x + ${q}y = ${fmt(money)}.`,
          `Nhân phương trình thứ nhất với ${q} rồi trừ: ${p - q}x = ${fmt(money)} − ${fmt(q * n)} = ${fmt((p - q) * x)}, nên x = ${fmt(x)}; y = ${fmt(n)} − ${fmt(x)} = ${fmt(y)}.`,
          `Thoả mãn điều kiện: bán được ${fmt(x)} vé người lớn và ${fmt(y)} vé trẻ em.`,
        ],
        hints: [
          'Gọi x là số vé người lớn, y là số vé trẻ em. Lập một phương trình về số vé và một phương trình về số tiền.',
          `Hệ: x + y = ${fmt(n)} và ${p}x + ${q}y = ${fmt(money)}.`,
        ],
      };
    }
    if (variant === 2) {
      const [f1, f2] = pick(rand, FRUITS);
      for (;;) {
        const m1 = int(rand, 1, 4);
        const n1 = int(rand, 1, 4);
        const m2 = int(rand, 1, 4);
        const n2 = int(rand, 1, 4);
        const det = m1 * n2 - m2 * n1;
        if (det === 0) continue;
        const x = int(rand, 4, 12) * 5;
        const y = int(rand, 4, 12) * 5;
        const t1 = m1 * x + n1 * y;
        const t2 = m2 * x + n2 * y;
        const askFirst = rand() < 0.5;
        // Eliminate y: multiply by n2 and n1, then subtract.
        const k = m1 * n2 - m2 * n1;
        const r = t1 * n2 - t2 * n1;
        return {
          prompt: `Mua ${m1} kg ${f1} và ${n1} kg ${f2} hết ${fmt(t1)} nghìn đồng; mua ${m2} kg ${f1} và ${n2} kg ${f2} hết ${fmt(t2)} nghìn đồng. Hỏi giá 1 kg ${askFirst ? f1 : f2} là bao nhiêu nghìn đồng?`,
          answer: askFirst ? x : y,
          unit: 'nghìn đồng',
          steps: [
            `Gọi x, y (nghìn đồng) lần lượt là giá 1 kg ${f1} và 1 kg ${f2} (x > 0, y > 0).`,
            `Lập hệ: ${eqText(m1, n1, t1)} và ${eqText(m2, n2, t2)}.`,
            `Khử y (nhân phương trình thứ nhất với ${n2}, thứ hai với ${n1} rồi trừ): ${eqText(k, 0, r)}, nên x = ${x}.`,
            `Thay vào phương trình thứ nhất: ${eqText(0, n1, t1 - m1 * x)}, nên y = ${y}.`,
            `Giá 1 kg ${f1} là ${x} nghìn đồng, 1 kg ${f2} là ${y} nghìn đồng.`,
          ],
          hints: [
            `Gọi x, y lần lượt là giá 1 kg ${f1} và 1 kg ${f2}; mỗi lần mua cho một phương trình.`,
            `Hệ: ${eqText(m1, n1, t1)} và ${eqText(m2, n2, t2)}.`,
          ],
        };
      }
    }
    const y = int(rand, 6, 12) * 5;
    const d = int(rand, 1, 4) * 5;
    const x = y + d;
    const t = int(rand, 1, 4);
    const s = t * (x + y);
    const askFast = rand() < 0.5;
    return {
      prompt: `Hai xe khởi hành cùng lúc từ hai địa điểm A và B cách nhau ${fmt(s)} km, đi ngược chiều nhau và gặp nhau sau ${t} giờ. Biết mỗi giờ xe đi từ A đi nhanh hơn xe đi từ B ${d} km. Tính vận tốc của xe đi từ ${askFast ? 'A' : 'B'} (km/h).`,
      answer: askFast ? x : y,
      unit: 'km/h',
      steps: [
        'Gọi x, y (km/h) lần lượt là vận tốc của xe đi từ A và xe đi từ B (x > y > 0).',
        t === 1
          ? `Sau 1 giờ hai xe gặp nhau, tổng quãng đường hai xe đi là ${fmt(s)} km: x + y = ${fmt(s)}.`
          : `Đến lúc gặp nhau hai xe đi tổng cộng ${fmt(s)} km: ${t}x + ${t}y = ${fmt(s)}, tức x + y = ${x + y}.`,
        `Xe từ A nhanh hơn ${d} km/h: x − y = ${d}.`,
        `Cộng từng vế: 2x = ${2 * x}, nên x = ${x}; y = ${x} − ${d} = ${y}.`,
        `Thoả mãn điều kiện: xe từ A đi ${x} km/h, xe từ B đi ${y} km/h.`,
      ],
      hints: [
        'Gọi x, y là vận tốc hai xe. Đến lúc gặp nhau, tổng quãng đường hai xe đi bằng AB.',
        `Hệ: ${t === 1 ? '' : t}x + ${t === 1 ? '' : t}y = ${fmt(s)} và x − y = ${d}.`,
      ],
    };
  },
};

/** Skills of the practice lesson after Bài 1 and Bài 2. */
export const SKILLS_TRANG_19 = [phuongTrinh, nghiemHe, heThe, heCong];

/** One skill per idea of the chapter, for the end-of-chapter review. */
export const CHAPTER_SKILLS = [...SKILLS_TRANG_19, lapHe];
