/**
 * Question generators for the chapter "Phương trình bậc nhất và hàm số bậc
 * nhất", one skill per lesson. Answers are integers or exact fractions, read
 * with `readNumber` and written with `numberText`. Prompts and steps are
 * plain text with the book's minus sign; a word problem's steps state its
 * equation after "Phương trình: " so tests can check it.
 */

import { int, pick } from '#lib/core/drill.js';
import { intText, operand } from '#lib/core/number-format.js';
import { numberText } from '#lib/core/decimal.js';
import { polyText } from '#lib/algebra-engine/polynomial.js';

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
 * ax + b as plain text: 3x − 5, −x, 7.
 * @param {number} a
 * @param {number} b
 */
export const lin = (a, b) => polyText([b, a]);

/**
 * x + p in brackets when p ≠ 0: (x − 3), x.
 * @param {number} p
 */
const xPlus = (p) => (p === 0 ? 'x' : `(${lin(1, p)})`);

/**
 * k(x + p) with the factor dropped when k = 1: 2(x − 3), (x + 1), x.
 * @param {number} k
 * @param {number} p
 */
const times = (k, p) => (k === 1 ? xPlus(p) : `${k}${xPlus(p)}`);

/**
 * (x + p)/m as plain text: (x − 3)/4, x/2.
 * @param {number} p
 * @param {number} m
 */
const over = (p, m) => (p === 0 ? `x/${m}` : `(${lin(1, p)})/${m}`);

/** @type {Skill} */
export const phuongTrinh = {
  id: 'phuong-trinh-bac-nhat',
  label: 'Bài 25. Phương trình bậc nhất một ẩn',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = nonZero(rand, -9, 9);
      const b = nonZero(rand, -12, 12);
      const x = -b / a;
      return {
        prompt: `Giải phương trình ${lin(a, b)} = 0. Nhập nghiệm x.`,
        answer: x,
        hints: [
          `Chuyển ${intText(b)} sang vế phải và đổi dấu.`,
          `${lin(a, 0)} = ${intText(-b)}; chia hai vế cho ${operand(a)}.`,
        ],
        steps: [
          `Chuyển vế: ${lin(a, 0)} = ${intText(-b)}.`,
          `Chia hai vế cho ${operand(a)}: x = ${intText(-b)} : ${operand(a)} = ${numberText(x)}.`,
        ],
      };
    }
    if (v === 1) {
      const x = int(rand, -9, 9);
      const a = nonZero(rand, -7, 7);
      let c = nonZero(rand, -7, 7);
      while (c === a) c = nonZero(rand, -7, 7);
      const b = int(rand, -15, 15);
      const d = a * x + b - c * x;
      return {
        prompt: `Giải phương trình ${lin(a, b)} = ${lin(c, d)}. Nhập nghiệm x.`,
        answer: x,
        hints: [
          'Chuyển các hạng tử chứa x sang vế trái, các hằng số sang vế phải, nhớ đổi dấu.',
          `${lin(a - c, 0)} = ${intText(d - b)}.`,
        ],
        steps: [
          `Chuyển vế: ${lin(a, 0)} ${c < 0 ? '+' : '−'} ${lin(Math.abs(c), 0)} = ${intText(d)}${b === 0 ? '' : ` ${b < 0 ? '+' : '−'} ${Math.abs(b)}`}.`,
          `Thu gọn: ${lin(a - c, 0)} = ${intText(d - b)}.`,
          `x = ${intText(d - b)} : ${operand(a - c)} = ${intText(x)}.`,
        ],
      };
    }
    if (v === 2) {
      const x = int(rand, -8, 8);
      const a = int(rand, 2, 5);
      const p = nonZero(rand, -6, 6);
      const q = int(rand, -9, 9);
      let c = nonZero(rand, -4, 6);
      while (c === a) c = nonZero(rand, -4, 6);
      const d = a * (x + p) + q - c * x;
      const leftB = a * p + q;
      const tail = q === 0 ? '' : q < 0 ? ` − ${-q}` : ` + ${q}`;
      return {
        prompt: `Giải phương trình ${a}${xPlus(p)}${tail} = ${lin(c, d)}. Nhập nghiệm x.`,
        answer: x,
        hints: [
          `Bỏ ngoặc trước: ${a}${xPlus(p)} = ${lin(a, a * p)}.`,
          `Vế trái thu gọn thành ${lin(a, leftB)}; tiếp tục chuyển vế.`,
        ],
        steps: [
          `Bỏ ngoặc và thu gọn: ${lin(a, leftB)} = ${lin(c, d)}.`,
          `Chuyển vế: ${lin(a - c, 0)} = ${intText(d - leftB)}.`,
          `x = ${intText(d - leftB)} : ${operand(a - c)} = ${intText(x)}.`,
        ],
      };
    }
    let m = int(rand, 2, 6);
    let n = int(rand, 2, 6);
    while (n === m) n = int(rand, 2, 6);
    if (m > n) [m, n] = [n, m];
    const x = int(rand, -6, 6);
    const t = nonZero(rand, -3, 3);
    const p = m * t - x;
    const q = n * t - x;
    const l = (m * n) / gcd(m, n);
    return {
      prompt: `Giải phương trình ${over(p, m)} = ${over(q, n)}. Nhập nghiệm x.`,
      answer: x,
      hints: [
        `Nhân hai vế với mẫu chung ${l} để khử mẫu.`,
        `${times(l / m, p)} = ${times(l / n, q)}.`,
      ],
      steps: [
        `Nhân hai vế với ${l}: ${times(l / m, p)} = ${times(l / n, q)}.`,
        `Bỏ ngoặc: ${lin(l / m, (l / m) * p)} = ${lin(l / n, (l / n) * q)}.`,
        `Chuyển vế: ${lin(l / m - l / n, 0)} = ${intText((l / n) * q - (l / m) * p)}, nên x = ${intText(x)}.`,
      ],
    };
  },
};

/**
 * Greatest common divisor of two positive integers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

/** @type {Skill} */
export const lapPhuongTrinh = {
  id: 'lap-phuong-trinh',
  label: 'Bài 26. Giải bài toán bằng cách lập phương trình',
  make(rand) {
    const v = int(rand, 0, 5);
    if (v === 0) {
      const small = int(rand, 6, 40);
      const k = int(rand, 2, 5);
      const sum = small * (k + 1);
      return {
        prompt: `Tổng của hai số là ${sum}. Số lớn gấp ${k} lần số bé. Tìm số bé.`,
        answer: small,
        hints: [`Gọi số bé là x thì số lớn là ${k}x.`, `Phương trình: x + ${k}x = ${sum}.`],
        steps: [
          `Gọi số bé là x, số lớn là ${k}x.`,
          `Phương trình: x + ${k}x = ${sum}.`,
          `${k + 1}x = ${sum}, nên x = ${small}.`,
        ],
      };
    }
    if (v === 1) {
      const v1 = 5 * int(rand, 6, 10);
      let v2 = 5 * int(rand, 6, 12);
      while (v2 === v1) v2 = 5 * int(rand, 6, 12);
      const t = int(rand, 1, 4);
      const d = (v1 + v2) * t;
      return {
        prompt: `Hai bến A và B cách nhau ${d} km. Cùng một lúc, một xe đi từ A với vận tốc ${v1} km/h và một xe đi từ B với vận tốc ${v2} km/h, ngược chiều nhau. Sau bao nhiêu giờ hai xe gặp nhau?`,
        answer: t,
        unit: 'giờ',
        hints: [
          'Gọi x (giờ) là thời gian từ lúc khởi hành đến lúc gặp nhau.',
          'Khi gặp nhau, tổng quãng đường hai xe đã đi bằng AB.',
        ],
        steps: [
          `Gọi thời gian đến lúc gặp nhau là x (giờ), x > 0. Hai xe đi được ${v1}x và ${v2}x (km).`,
          `Phương trình: ${v1}x + ${v2}x = ${d}.`,
          `${v1 + v2}x = ${d}, nên x = ${t} (thoả mãn).`,
        ],
      };
    }
    if (v === 2) {
      for (;;) {
        const v1 = pick(rand, [30, 36, 40, 45, 48, 50]);
        const h = int(rand, 1, 2);
        const x = int(rand, 1, 4);
        const dv = (v1 * h) / x;
        if (!Number.isInteger(dv) || dv < 10 || dv > 40) continue;
        const v2 = v1 + dv;
        return {
          prompt: `Một xe máy khởi hành từ A với vận tốc ${v1} km/h. Sau đó ${h} giờ, một ô tô cũng khởi hành từ A đi cùng chiều với vận tốc ${v2} km/h. Sau bao nhiêu giờ kể từ lúc khởi hành thì ô tô đuổi kịp xe máy?`,
          answer: x,
          unit: 'giờ',
          hints: [
            `Gọi x (giờ) là thời gian ô tô đi; khi đó xe máy đã đi x + ${h} giờ.`,
            'Lúc đuổi kịp, hai xe đi được quãng đường bằng nhau.',
          ],
          steps: [
            `Gọi thời gian ô tô đi đến lúc đuổi kịp là x (giờ), x > 0; xe máy đi x + ${h} giờ.`,
            `Phương trình: ${v2}x = ${v1}(x + ${h}).`,
            `${v2}x = ${v1}x + ${v1 * h}, nên ${dv}x = ${v1 * h}, x = ${x} (thoả mãn).`,
          ],
        };
      }
    }
    if (v === 3) {
      const child = int(rand, 4, 12);
      const k = int(rand, 3, 4);
      const n = child * (k - 2);
      return {
        prompt: `Hiện nay tuổi mẹ gấp ${k} lần tuổi con. Sau ${n} năm nữa, tuổi mẹ chỉ còn gấp 2 lần tuổi con. Hiện nay con bao nhiêu tuổi?`,
        answer: child,
        unit: 'tuổi',
        hints: [
          `Gọi tuổi con hiện nay là x thì tuổi mẹ là ${k}x.`,
          `Sau ${n} năm: tuổi mẹ ${k}x + ${n}, tuổi con x + ${n}.`,
        ],
        steps: [
          `Gọi tuổi con hiện nay là x (x ∈ ℕ, x > 0); tuổi mẹ là ${k}x.`,
          `Phương trình: ${k}x + ${n} = 2(x + ${n}).`,
          `${k}x + ${n} = 2x + ${2 * n}, nên ${k - 2}x = ${n}, x = ${child} (thoả mãn).`,
        ],
      };
    }
    if (v === 4) {
      for (;;) {
        const early = int(rand, 1, 2);
        const extra = pick(rand, [5, 10, 15, 20]);
        const days = int(rand, early + 3, 12);
        const per = (extra * (days - early)) / early;
        if (!Number.isInteger(per) || per < 20 || per > 120) continue;
        const total = per * days;
        return {
          prompt: `Theo kế hoạch, mỗi ngày một tổ làm ${per} sản phẩm. Thực tế mỗi ngày tổ làm thêm được ${extra} sản phẩm nên hoàn thành kế hoạch sớm ${early} ngày. Theo kế hoạch tổ phải làm bao nhiêu sản phẩm?`,
          answer: total,
          unit: 'sản phẩm',
          hints: [
            `Gọi x là số ngày theo kế hoạch; thực tế tổ làm x − ${early} ngày, mỗi ngày ${per + extra} sản phẩm.`,
            'Số sản phẩm theo kế hoạch bằng số sản phẩm làm thực tế. Tìm x rồi tính số sản phẩm.',
          ],
          steps: [
            `Gọi số ngày theo kế hoạch là x (x ∈ ℕ, x > ${early}).`,
            `Phương trình: ${per}x = ${per + extra}(x − ${early}).`,
            `${per}x = ${per + extra}x − ${(per + extra) * early}, nên ${extra}x = ${(per + extra) * early}, x = ${days} (thoả mãn).`,
            `Số sản phẩm theo kế hoạch: ${per} · ${days} = ${total}.`,
          ],
        };
      }
    }
    const w = int(rand, 3, 25);
    const more = int(rand, 2, 12);
    const perim = 2 * (2 * w + more);
    return {
      prompt: `Một mảnh vườn hình chữ nhật có chu vi ${perim} m, chiều dài hơn chiều rộng ${more} m. Tính chiều rộng của mảnh vườn.`,
      answer: w,
      unit: 'm',
      hints: [
        `Gọi chiều rộng là x (m) thì chiều dài là x + ${more}.`,
        'Chu vi = 2 · (dài + rộng).',
      ],
      steps: [
        `Gọi chiều rộng là x (m), x > 0; chiều dài là x + ${more}.`,
        `Phương trình: 2(x + x + ${more}) = ${perim}.`,
        `2x + ${more} = ${perim / 2}, nên 2x = ${2 * w}, x = ${w} (thoả mãn).`,
      ],
    };
  },
};

/** The practice set after Bài 25 and Bài 26. */
export const SKILLS_TRANG_37 = [phuongTrinh, lapPhuongTrinh];
