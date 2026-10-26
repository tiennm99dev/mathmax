/**
 * Question generators for the chapter "Phương trình bậc nhất và hàm số bậc
 * nhất", one skill per lesson. Answers are integers or exact fractions, read
 * with `readNumber` and written with `numberText`. Prompts and steps are
 * plain text with the book's minus sign; a word problem's steps state its
 * equation after "Phương trình: " so tests can check it.
 */

import { int, pick } from '#lib/core/drill.js';
import { fmt, intText, operand } from '#lib/core/number-format.js';
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
        prompt: `Hai địa điểm A và B cách nhau ${d} km. Cùng một lúc, một xe đi từ A với vận tốc ${v1} km/h và một xe đi từ B với vận tốc ${v2} km/h, ngược chiều nhau. Sau bao nhiêu giờ hai xe gặp nhau?`,
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
          prompt: `Một xe máy khởi hành từ A với vận tốc ${v1} km/h. Sau đó ${h} giờ, một ô tô cũng khởi hành từ A đi cùng chiều với vận tốc ${v2} km/h. Sau bao nhiêu giờ kể từ lúc ô tô khởi hành thì ô tô đuổi kịp xe máy?`,
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

/**
 * A signed tail ' + 5', ' − 3', or '' for 0.
 * @param {number} b
 */
const tail = (b) => (b === 0 ? '' : ` ${b < 0 ? '−' : '+'} ${Math.abs(b)}`);

/**
 * a · (t) + b written out, the working of f(t) for f(x) = ax + b.
 * @param {number} a
 * @param {number} b
 * @param {number} t
 */
const subst = (a, b, t) => `${intText(a)} · ${operand(t)}${tail(b)}`;

/**
 * A point (x; y) with the book's minus sign.
 * @param {number} x
 * @param {number} y
 */
export const pt = (x, y) => `(${intText(x)}; ${intText(y)})`;

/**
 * A coefficient written before a factor: '3 · ', '−', '' for 1.
 * @param {number} a
 */
const coef = (a) => (a === 1 ? '' : a === -1 ? '−' : `${intText(a)} · `);

/** @type {Skill} */
export const hamSo = {
  id: 'ham-so-va-do-thi',
  label: 'Bài 27. Khái niệm hàm số và đồ thị của hàm số',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const a = nonZero(rand, -6, 6);
      const b = int(rand, -9, 9);
      const t = nonZero(rand, -5, 5);
      const y = a * t + b;
      return {
        prompt: `Cho hàm số y = f(x) = ${lin(a, b)}. Tính f(${intText(t)}).`,
        answer: y,
        hints: [`Thay x = ${intText(t)} vào công thức, chú ý dấu.`],
        steps: [`f(${intText(t)}) = ${subst(a, b, t)} = ${intText(y)}.`],
      };
    }
    if (v === 1) {
      const a = nonZero(rand, -3, 3);
      const c = int(rand, -9, 9);
      const t = nonZero(rand, -4, 4);
      const y = a * t * t + c;
      return {
        prompt: `Cho hàm số y = f(x) = ${polyText([c, 0, a])}. Tính f(${intText(t)}).`,
        answer: y,
        hints: [
          `Thay x = ${intText(t)}; bình phương của một số luôn không âm: ${operand(t)}² = ${t * t}.`,
        ],
        steps: [
          `f(${intText(t)}) = ${coef(a)}${operand(t)}²${tail(c)} = ${coef(a)}${t * t}${tail(c)} = ${intText(y)}.`,
        ],
      };
    }
    if (v === 2) {
      const p = nonZero(rand, -5, 5);
      let q = nonZero(rand, -12, 12);
      while (q === p) q = nonZero(rand, -12, 12);
      const a = q / p;
      return {
        prompt: `Đồ thị của hàm số y = ax đi qua điểm A${pt(p, q)}. Tìm a (viết dạng số nguyên, phân số hoặc số thập phân).`,
        answer: a,
        hints: [
          'Điểm A thuộc đồ thị nên toạ độ của A thoả mãn y = ax.',
          `Thay x = ${intText(p)}, y = ${intText(q)} vào y = ax.`,
        ],
        steps: [
          `A thuộc đồ thị nên ${intText(q)} = a · ${operand(p)}.`,
          `a = ${intText(q)} : ${operand(p)} = ${numberText(a)}.`,
        ],
      };
    }
    if (v === 3) {
      const a = nonZero(rand, -5, 5);
      const b = int(rand, -9, 9);
      const x = int(rand, -6, 6);
      const k = a * x + b;
      return {
        prompt: `Cho hàm số f(x) = ${lin(a, b)}. Tìm x để f(x) = ${intText(k)}.`,
        answer: x,
        hints: [`Giải phương trình ${lin(a, b)} = ${intText(k)}.`],
        steps: [
          `Ta có phương trình ${lin(a, b)} = ${intText(k)}.`,
          `${lin(a, 0)} = ${intText(k - b)}, nên x = ${intText(k - b)} : ${operand(a)} = ${intText(x)}.`,
        ],
      };
    }
    const xs = [-2, -1, 0, 1, 2];
    const ys = xs.map(() => int(rand, -9, 9));
    const i = int(rand, 0, 4);
    let j = int(rand, 0, 4);
    while (j === i) j = int(rand, 0, 4);
    const sum = ys[i] + ys[j];
    return {
      prompt: `Hàm số y = f(x) cho bởi bảng: x = −2; −1; 0; 1; 2 thì y tương ứng = ${ys.map(intText).join('; ')}. Tính f(${intText(xs[i])}) + f(${intText(xs[j])}).`,
      answer: sum,
      hints: [`f(${intText(xs[i])}) là giá trị của y ứng với x = ${intText(xs[i])} trong bảng.`],
      steps: [
        `Đọc bảng: f(${intText(xs[i])}) = ${intText(ys[i])}, f(${intText(xs[j])}) = ${intText(ys[j])}.`,
        `Tổng: ${intText(ys[i])} + ${operand(ys[j])} = ${intText(sum)}.`,
      ],
    };
  },
};

/**
 * The coefficient (m + k) as text: (m − 3), (m + 2), m.
 * @param {number} k
 */
const mPlus = (k) => (k === 0 ? 'm' : `(m${tail(k)})`);

/** @type {Skill} */
export const hamSoBacNhat = {
  id: 'ham-so-bac-nhat',
  label: 'Bài 28. Hàm số bậc nhất và đồ thị của hàm số bậc nhất',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const a = nonZero(rand, -6, 6);
      const b = nonZero(rand, -12, 12);
      const x = -b / a;
      return {
        prompt: `Đồ thị của hàm số y = ${lin(a, b)} cắt trục hoành tại điểm có hoành độ bằng bao nhiêu? (Viết dạng số nguyên, phân số hoặc số thập phân.)`,
        answer: x,
        hints: [
          'Mọi điểm trên trục hoành có tung độ bằng 0.',
          `Giải phương trình ${lin(a, b)} = 0.`,
        ],
        steps: [
          `Cho y = 0: ${lin(a, b)} = 0.`,
          `${lin(a, 0)} = ${intText(-b)}, nên x = ${intText(-b)} : ${operand(a)} = ${numberText(x)}.`,
        ],
      };
    }
    if (v === 1) {
      const k = nonZero(rand, -5, 5);
      const a = nonZero(rand, -4, 4);
      const p = nonZero(rand, -4, 4);
      const d = int(rand, -6, 6);
      const q = a * p + d;
      const m = a - k;
      return {
        prompt: `Cho hàm số bậc nhất y = ${mPlus(k)}x${tail(d)} với m ≠ ${intText(-k)}. Tìm m để đồ thị của hàm số đi qua điểm A${pt(p, q)}.`,
        answer: m,
        hints: [
          `Thay x = ${intText(p)}, y = ${intText(q)} vào công thức để được một phương trình ẩn m.`,
          `Tìm hệ số ${mPlus(k)} trước: ${mPlus(k)} · ${operand(p)} = ${intText(q - d)}.`,
        ],
        steps: [
          `Thay toạ độ của A: ${intText(q)} = ${mPlus(k)} · ${operand(p)}${tail(d)}.`,
          `${mPlus(k)} · ${operand(p)} = ${intText(q - d)}, nên m${tail(k)} = ${intText(a)}.`,
          `m = ${intText(m)} (thoả mãn m ≠ ${intText(-k)}).`,
        ],
      };
    }
    if (v === 2) {
      const a = nonZero(rand, -5, 5);
      const p = nonZero(rand, -4, 4);
      const b = nonZero(rand, -9, 9);
      const q = a * p + b;
      return {
        prompt: `Tìm b để đồ thị của hàm số y = ${lin(a, 0)} + b đi qua điểm B${pt(p, q)}.`,
        answer: b,
        hints: [`Thay x = ${intText(p)}, y = ${intText(q)} vào công thức.`],
        steps: [
          `${intText(q)} = ${subst(a, 0, p)} + b = ${intText(a * p)} + b.`,
          `b = ${intText(q)} − ${operand(a * p)} = ${intText(b)}.`,
        ],
      };
    }
    if (v === 3) {
      const open = pick(rand, [10, 12, 15]);
      const rate = pick(rand, [11, 12, 13, 14, 15, 16]);
      const x = int(rand, 3, 30);
      const cost = open + rate * (x - 1);
      return {
        prompt: `Một hãng taxi tính giá cước theo công thức T(x) = ${open} + ${rate}(x − 1) (nghìn đồng), trong đó x là số ki-lô-mét đã đi (x ≥ 1). Một khách trả ${fmt(cost)} nghìn đồng. Khách đã đi bao nhiêu ki-lô-mét?`,
        answer: x,
        unit: 'km',
        hints: [
          `Giải phương trình ${open} + ${rate}(x − 1) = ${cost}.`,
          `${rate}(x − 1) = ${cost - open}.`,
        ],
        steps: [
          `Phương trình: ${open} + ${rate}(x − 1) = ${cost}.`,
          `${rate}(x − 1) = ${cost - open}, nên x − 1 = ${x - 1}, x = ${x} (thoả mãn).`,
        ],
      };
    }
    const years = int(rand, 3, 6);
    const drop = pick(rand, [2, 3, 4, 5, 6]);
    const price = drop * years;
    const half = int(rand, 1, 2 * years - 1);
    const left = price - (drop * half) / 2;
    const x = half / 2;
    return {
      prompt: `Một máy mới mua giá ${price} triệu đồng, mỗi năm giá trị giảm ${drop} triệu đồng, nên sau x năm giá trị còn lại là V(x) = ${price} − ${drop}x (triệu đồng), 0 ≤ x ≤ ${years}. Sau bao nhiêu năm giá trị của máy còn ${numberText(left)} triệu đồng?`,
      answer: x,
      unit: 'năm',
      hints: [`Giải phương trình ${price} − ${drop}x = ${numberText(left)}.`],
      steps: [
        `Phương trình: ${price} − ${drop}x = ${numberText(left)}.`,
        `${drop}x = ${numberText(price - left)}, nên x = ${numberText(x)} (thoả mãn).`,
      ],
    };
  },
};

/** @type {Skill} */
export const heSoGoc = {
  id: 'he-so-goc',
  label: 'Bài 29. Hệ số góc của đường thẳng',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const b = nonZero(rand, -9, 9);
      const a = nonZero(rand, -6, 6);
      const r = pick(rand, [2, 3, 4, 5]);
      if (rand() < 0.5) {
        return {
          prompt: `Tìm hệ số góc của đường thẳng y = ${intText(b)} ${a < 0 ? '−' : '+'} ${lin(Math.abs(a), 0)}.`,
          answer: a,
          hints: ['Viết lại về dạng y = ax + b rồi đọc hệ số của x.'],
          steps: [`y = ${lin(a, b)}, nên hệ số góc là ${intText(a)}.`],
        };
      }
      return {
        prompt: `Tìm hệ số góc của đường thẳng y = (${lin(a, b)})/${r}. (Viết dạng số nguyên, phân số hoặc số thập phân.)`,
        answer: a / r,
        hints: [
          'Viết lại về dạng y = ax + b: chia từng hạng tử của tử thức cho mẫu.',
          'Hệ số góc là hệ số của x, viết ở dạng tối giản.',
        ],
        steps: [
          `y = (${intText(a)}/${r})x + (${intText(b)}/${r}).`,
          `Hệ số góc là ${intText(a)}/${r} = ${numberText(a / r)}.`,
        ],
      };
    }
    if (v === 1) {
      const a = nonZero(rand, -6, 6);
      const k = nonZero(rand, -5, 5);
      const c = int(rand, -9, 9);
      let d = int(rand, -9, 9);
      while (d === c) d = int(rand, -9, 9);
      const m = a - k;
      return {
        prompt: `Tìm m để đường thẳng y = ${mPlus(k)}x${tail(c)} song song với đường thẳng y = ${lin(a, d)}.`,
        answer: m,
        hints: [
          'Hai đường thẳng song song khi hệ số góc bằng nhau và hệ số tự do khác nhau.',
          `m${tail(k)} = ${intText(a)}.`,
        ],
        steps: [
          `Hệ số tự do ${intText(c)} ≠ ${intText(d)}, nên chỉ cần hai hệ số góc bằng nhau.`,
          `m${tail(k)} = ${intText(a)}, nên m = ${intText(m)}.`,
        ],
      };
    }
    if (v === 2) {
      const a = nonZero(rand, -5, 5);
      const p = nonZero(rand, -4, 4);
      const b = int(rand, -9, 9);
      const q = a * p + b;
      return {
        prompt: `Đường thẳng y = ax + b có hệ số góc bằng ${intText(a)} và đi qua điểm ${pt(p, q)}. Tìm b.`,
        answer: b,
        hints: [
          `Hệ số góc ${intText(a)} cho a = ${intText(a)}; thay toạ độ điểm vào y = ${lin(a, 0)} + b.`,
        ],
        steps: [
          `a = ${intText(a)}, nên y = ${lin(a, 0)} + b.`,
          `Thay x = ${intText(p)}, y = ${intText(q)}: ${intText(q)} = ${intText(a * p)} + b, nên b = ${intText(b)}.`,
        ],
      };
    }
    if (v === 3) {
      const a = nonZero(rand, -4, 4);
      let c = nonZero(rand, -4, 4);
      while (c === a) c = nonZero(rand, -4, 4);
      const x = int(rand, -4, 4);
      const y = int(rand, -8, 8);
      const b = y - a * x;
      const d = y - c * x;
      const askY = rand() < 0.5;
      return {
        prompt: `Hai đường thẳng y = ${lin(a, b)} và y = ${lin(c, d)} cắt nhau tại điểm A. Tìm ${askY ? 'tung độ' : 'hoành độ'} của A.`,
        answer: askY ? y : x,
        hints: [
          'Tại giao điểm, hai đường thẳng có cùng hoành độ và cùng tung độ, nên hai biểu thức của y bằng nhau.',
          `Giải ${lin(a, b)} = ${lin(c, d)}${askY ? ' rồi thay x vào một trong hai công thức' : ''}.`,
        ],
        steps: [
          `Phương trình hoành độ giao điểm: ${lin(a, b)} = ${lin(c, d)}.`,
          `${lin(a - c, 0)} = ${intText(d - b)}, nên x = ${intText(x)}.`,
          `y = ${subst(a, b, x)} = ${intText(y)}. Giao điểm A${pt(x, y)}.`,
        ],
      };
    }
    const a = nonZero(rand, -5, 5);
    let c = nonZero(rand, -5, 5);
    while (c === a) c = nonZero(rand, -5, 5);
    const k = nonZero(rand, -6, 6);
    const e = nonZero(rand, -9, 9);
    const m = e - k;
    return {
      prompt: `Tìm m để hai đường thẳng y = ${lin(a, 0)} + m${tail(k)} và y = ${lin(c, e)} cắt nhau tại một điểm trên trục tung.`,
      answer: m,
      hints: [
        `Hệ số góc ${intText(a)} ≠ ${intText(c)} nên hai đường thẳng luôn cắt nhau.`,
        'Điểm trên trục tung có hoành độ 0: hai hệ số tự do phải bằng nhau.',
      ],
      steps: [
        `Đường thẳng y = ${lin(c, e)} cắt trục tung tại ${pt(0, e)}.`,
        `Cần m${tail(k)} = ${intText(e)}, nên m = ${intText(m)}.`,
      ],
    };
  },
};

/** The practice set after Bài 25 and Bài 26. */
export const SKILLS_TRANG_37 = [phuongTrinh, lapPhuongTrinh];

/** The practice set after Bài 27, Bài 28 and Bài 29. */
export const SKILLS_TRANG_55 = [hamSo, hamSoBacNhat, heSoGoc];

/** Every skill of the chapter, one per lesson, for the chapter review. */
export const CHAPTER_SKILLS = [...SKILLS_TRANG_37, ...SKILLS_TRANG_55];
