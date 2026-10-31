/**
 * Question generators for the chapter "Phương trình và bất phương trình bậc
 * nhất một ẩn", for the drill board of the practice and review lessons.
 * Every answer is an integer, so the board reads them with `readInteger` and
 * writes them with `intText`. Prompts and steps are plain text with the
 * book's minus sign.
 */

import { int, nonZero, pick, signedInt } from '#lib/core/drill.js';
import { MINUS, fmt, intText } from '#lib/core/number-format.js';
import { factorText, linText, signedFracText } from '#lib/core/algebra-text.js';
import { gcd } from '#lib/numtheory-engine/index.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * `k(x − r)` written as a linear factor: k = 2, r = 3 gives '2x − 6'.
 * @param {number} k
 * @param {number} r
 */
function scaledFactor(k, r) {
  return linText(k, -k * r);
}

/**
 * c times a bracketed factor, the way the book writes it: c = 1 gives the
 * factor alone, c = −1 gives '−(x + 4)', otherwise '2(x − 1)'.
 * @param {number} c non-zero
 * @param {string} f the factor as text
 */
function times(c, f) {
  if (c === 1) return f;
  if (c === -1) return `${MINUS}(${f})`;
  return `${intText(c)}(${f})`;
}

/** @type {Skill} */
export const phuongTrinhTich = {
  id: 'phuong-trinh-tich',
  label: 'Bài 4. Phương trình tích',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      for (;;) {
        const k1 = int(rand, 1, 3);
        const k2 = int(rand, 1, 3);
        const r1 = int(rand, -6, 6);
        const r2 = int(rand, -6, 6);
        // A zero root would print a bare factor x (or 2x) in brackets.
        if (r1 === r2 || r1 === 0 || r2 === 0) continue;
        const big = Math.max(r1, r2);
        const f1 = scaledFactor(k1, r1);
        const f2 = scaledFactor(k2, r2);
        return {
          prompt: `Giải phương trình (${f1})(${f2}) = 0. Nhập nghiệm lớn hơn.`,
          answer: big,
          steps: [
            `Phương trình tích: giải ${f1} = 0 và ${f2} = 0.`,
            `${f1} = 0 cho x = ${intText(r1)}.`,
            `${f2} = 0 cho x = ${intText(r2)}.`,
            `Nghiệm lớn hơn là ${intText(big)}.`,
          ],
          hints: [
            'Tích bằng 0 khi một trong các nhân tử bằng 0.',
            `Giải riêng ${f1} = 0 và ${f2} = 0.`,
          ],
        };
      }
    }
    if (variant === 1) {
      for (;;) {
        const r = int(rand, -6, 6);
        const m = nonZero(rand, -6, 6);
        if (r === -m || r === 0) continue;
        const small = Math.min(r, -m);
        const f = factorText(r);
        const plus = m < 0 ? MINUS : '+';
        const coef = Math.abs(m) === 1 ? '' : Math.abs(m);
        return {
          prompt: `Giải phương trình x(${f}) ${plus} ${coef}(${f}) = 0. Nhập nghiệm nhỏ hơn.`,
          answer: small,
          steps: [
            `Đặt nhân tử chung ${f}: (${f})(${linText(1, m)}) = 0.`,
            `${f} = 0 cho x = ${intText(r)}; ${linText(1, m)} = 0 cho x = ${intText(-m)}.`,
            `Nghiệm nhỏ hơn là ${intText(small)}.`,
          ],
          hints: [
            `Hai hạng tử có chung nhân tử ${f}.`,
            `Đặt ${f} ra ngoài để được một phương trình tích.`,
          ],
        };
      }
    }
    const k = nonZero(rand, -9, 9);
    const kx = `${k < 0 ? MINUS : ''}${Math.abs(k) === 1 ? '' : Math.abs(k)}x`;
    return {
      prompt: `Phương trình x² = ${kx} có hai nghiệm. Nhập nghiệm khác 0.`,
      answer: k,
      steps: [
        `Chuyển vế: x² ${k < 0 ? '+' : MINUS} ${Math.abs(k) === 1 ? '' : Math.abs(k)}x = 0.`,
        `Đặt nhân tử chung: x(${linText(1, -k)}) = 0.`,
        `Do đó x = 0 hoặc x = ${intText(k)}. Nghiệm khác 0 là ${intText(k)}.`,
      ],
      hints: [
        'Đừng chia hai vế cho x: sẽ mất nghiệm x = 0.',
        'Chuyển hết sang vế trái rồi đặt x ra ngoài.',
      ],
    };
  },
};

/** @type {Skill} */
export const chuaAnOMau = {
  id: 'chua-an-o-mau',
  label: 'Bài 4. Phương trình chứa ẩn ở mẫu',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      for (;;) {
        const q = nonZero(rand, -5, 5);
        const m = pick(rand, [-3, -2, 2, 3, 4]);
        const x0 = int(rand, -8, 8);
        if (x0 === q) continue;
        const p = m * (x0 - q) - x0;
        if (p === -q) continue; // the fraction would reduce to 1
        const num = linText(1, p);
        const den = factorText(q);
        return {
          prompt: `Giải phương trình ${p === 0 ? num : `(${num})`}/(${den}) = ${intText(m)}.`,
          answer: x0,
          steps: [
            `ĐKXĐ: x ≠ ${intText(q)}.`,
            `Khử mẫu: ${num} = ${intText(m)}(${den}).`,
            `${num} = ${linText(m, -m * q)}, nên ${linText(1 - m, 0)} = ${intText(-m * q - p)}, tức x = ${intText(x0)}.`,
            `x = ${intText(x0)} thoả mãn ĐKXĐ. Phương trình có nghiệm x = ${intText(x0)}.`,
          ],
          hints: [
            `ĐKXĐ: x ≠ ${intText(q)}. Nhân hai vế với ${den}.`,
            `Giải phương trình bậc nhất ${num} = ${intText(m)}(${den}).`,
          ],
        };
      }
    }
    if (variant === 1) {
      for (;;) {
        const q1 = nonZero(rand, -5, 5);
        const q2 = nonZero(rand, -5, 5);
        const x0 = int(rand, -8, 8);
        if (q1 === q2 || x0 === q1 || x0 === q2) continue;
        const g = gcd(x0 - q1, x0 - q2);
        const c1 = (x0 - q1) / g;
        const c2 = (x0 - q2) / g;
        if (Math.abs(c1) > 9 || Math.abs(c2) > 9) continue;
        const d1 = factorText(q1);
        const d2 = factorText(q2);
        const lhs = linText(c1, -c1 * q2);
        const rhs = linText(c2, -c2 * q1);
        return {
          prompt: `Giải phương trình ${intText(c1)}/(${d1}) = ${intText(c2)}/(${d2}).`,
          answer: x0,
          steps: [
            `ĐKXĐ: x ≠ ${intText(q1)} và x ≠ ${intText(q2)}.`,
            `Khử mẫu (nhân hai vế với (${d1})(${d2})): ${times(c1, d2)} = ${times(c2, d1)}.`,
            `${lhs} = ${rhs}, nên ${linText(c1 - c2, 0)} = ${intText(c1 * q2 - c2 * q1)}, tức x = ${intText(x0)}.`,
            `x = ${intText(x0)} thoả mãn ĐKXĐ. Phương trình có nghiệm x = ${intText(x0)}.`,
          ],
          hints: [
            `ĐKXĐ: x ≠ ${intText(q1)} và x ≠ ${intText(q2)}.`,
            `Nhân chéo: ${times(c1, d2)} = ${times(c2, d1)}.`,
          ],
        };
      }
    }
    const q = nonZero(rand, -6, 6);
    const d = factorText(q);
    return {
      prompt: `Giải phương trình x²/(${d}) = ${fmt(q * q)}/(${d}).`,
      answer: -q,
      steps: [
        `ĐKXĐ: x ≠ ${intText(q)}.`,
        `Khử mẫu: x² = ${fmt(q * q)}, tức (${factorText(q)})(${factorText(-q)}) = 0.`,
        `Do đó x = ${intText(q)} hoặc x = ${intText(-q)}.`,
        `x = ${intText(q)} vi phạm ĐKXĐ nên bị loại. Phương trình có nghiệm x = ${intText(-q)}.`,
      ],
      hints: ['Viết ĐKXĐ trước khi khử mẫu.', 'Khử mẫu rồi giải; đối chiếu từng giá trị với ĐKXĐ.'],
    };
  },
};

/** @type {Skill} */
export const batDangThuc = {
  id: 'bat-dang-thuc',
  label: 'Bài 5. Bất đẳng thức và tính chất',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const m = int(rand, -6, 8);
      const p = int(rand, 2, 6);
      const r = signedInt(rand, 1, 9);
      const expr = linText(p, r);
      const value = p * m + r;
      return {
        prompt: `Cho x ≥ ${intText(m)}. Tìm giá trị nhỏ nhất của biểu thức ${expr}.`,
        answer: value,
        steps: [
          `Nhân hai vế của x ≥ ${intText(m)} với ${p} > 0 (giữ chiều): ${p}x ≥ ${intText(p * m)}.`,
          `Cộng ${intText(r)} vào hai vế: ${expr} ≥ ${intText(value)}.`,
          `Dấu bằng xảy ra khi x = ${intText(m)}, nên giá trị nhỏ nhất là ${intText(value)}.`,
        ],
        hints: [
          `Nhân hai vế của x ≥ ${intText(m)} với ${p}, rồi cộng ${intText(r)}.`,
          'Nhân với số dương thì giữ chiều.',
        ],
      };
    }
    if (variant === 1) {
      const m = int(rand, -6, 8);
      const p = int(rand, 2, 6);
      const r = int(rand, 1, 20);
      const expr = `${r} ${MINUS} ${p}x`;
      const value = r - p * m;
      return {
        prompt: `Cho x ≤ ${intText(m)}. Tìm giá trị nhỏ nhất của biểu thức ${expr}.`,
        answer: value,
        steps: [
          `Nhân hai vế của x ≤ ${intText(m)} với ${MINUS}${p} < 0 (đổi chiều): ${MINUS}${p}x ≥ ${intText(-p * m)}.`,
          `Cộng ${r} vào hai vế: ${expr} ≥ ${intText(value)}.`,
          `Dấu bằng xảy ra khi x = ${intText(m)}, nên giá trị nhỏ nhất là ${intText(value)}.`,
        ],
        hints: [
          `Nhân hai vế của x ≤ ${intText(m)} với ${MINUS}${p}. Chiều của bất đẳng thức thay đổi thế nào?`,
          `Được ${MINUS}${p}x ≥ ${intText(-p * m)}; cộng ${r} vào hai vế.`,
        ],
      };
    }
    const k = nonZero(rand, -6, 6);
    const c = signedInt(rand, 1, 9);
    const left = linText(k, c).replace(/x/, 'a');
    const right = linText(k, c).replace(/x/, 'b');
    const keeps = k > 0;
    return {
      prompt: `Cho a < b. So sánh ${left} và ${right}: nhập 1 nếu ${left} < ${right}, nhập 2 nếu ${left} > ${right}.`,
      answer: keeps ? 1 : 2,
      steps: [
        keeps
          ? `Nhân hai vế của a < b với ${k} > 0 (giữ chiều): ${linText(k, 0).replace('x', 'a')} < ${linText(k, 0).replace('x', 'b')}.`
          : `Nhân hai vế của a < b với ${intText(k)} < 0 (đổi chiều): ${linText(k, 0).replace('x', 'a')} > ${linText(k, 0).replace('x', 'b')}.`,
        `Cộng ${intText(c)} vào hai vế (giữ chiều): ${left} ${keeps ? '<' : '>'} ${right}.`,
        `Đáp án: ${keeps ? 1 : 2}.`,
      ],
      hints: [
        `Hệ số ${intText(k)} là số ${keeps ? 'dương' : 'âm'}.`,
        'Nhân với số âm thì đổi chiều; cộng một số thì giữ chiều.',
      ],
    };
  },
};

/** @type {Skill} */
export const batPhuongTrinh = {
  id: 'bat-phuong-trinh',
  label: 'Bài 6. Bất phương trình bậc nhất một ẩn',
  make(rand) {
    const variant = int(rand, 0, 1);
    if (variant === 0) {
      for (;;) {
        const a = signedInt(rand, 1, 7);
        const c = signedInt(rand, 1, 7);
        const A = a - c;
        if (A === 0) continue;
        const b = signedInt(rand, 0, 12);
        const d = signedInt(rand, 0, 12);
        const B = d - b;
        const strict = rand() < 0.5;
        // Solution: x > B/A (or ≥) when A > 0, x < B/A (or ≤) when A < 0.
        const right = A > 0;
        const sol = right ? (strict ? '>' : '≥') : strict ? '<' : '≤';
        const sign = strict ? '>' : '≥';
        const v = B / A;
        let answer;
        if (right) answer = strict ? Math.floor(v) + 1 : Math.ceil(v);
        else answer = strict ? Math.ceil(v) - 1 : Math.floor(v);
        answer += 0; // no −0
        const xSide = `${linText(a, 0)} ${c < 0 ? '+' : MINUS} ${Math.abs(c) === 1 ? '' : Math.abs(c)}x`;
        const numSide =
          b === 0 ? intText(d) : `${intText(d)} ${b < 0 ? '+' : MINUS} ${fmt(Math.abs(b))}`;
        const bound = signedFracText(B, A);
        return {
          prompt: `Tìm số nguyên ${right ? 'nhỏ nhất' : 'lớn nhất'} thoả mãn bất phương trình ${linText(a, b)} ${sign} ${linText(c, d)}.`,
          answer,
          steps: [
            `Chuyển vế: ${xSide} ${sign} ${numSide}, tức ${linText(A, 0)} ${sign} ${intText(B)}.`,
            ...(A === 1
              ? []
              : [
                  A > 0
                    ? `Chia hai vế cho ${A} > 0 (giữ chiều): x ${sol} ${bound}.`
                    : `Chia hai vế cho ${intText(A)} < 0 (đổi chiều): x ${sol} ${bound}.`,
                ]),
            `Số nguyên ${right ? 'nhỏ nhất' : 'lớn nhất'} thoả mãn x ${sol} ${bound} là ${intText(answer)}.`,
          ],
          hints: [
            'Chuyển các hạng tử chứa x sang vế trái, các hằng số sang vế phải, rồi thu gọn.',
            `Được ${linText(A, 0)} ${sign} ${intText(B)}. ${A > 0 ? 'Chia cho số dương: giữ chiều.' : 'Chia cho số âm: đổi chiều.'}`,
          ],
        };
      }
    }
    for (;;) {
      const k = int(rand, 2, 12);
      const a = signedInt(rand, 1, 5);
      const b = -a * k;
      // Bounded above: x ≤ k (or x < k).
      const strict = rand() < 0.5;
      const sign = a > 0 ? (strict ? '<' : '≤') : strict ? '>' : '≥';
      const sol = strict ? '<' : '≤';
      const count = strict ? k - 1 : k;
      return {
        prompt: `Có bao nhiêu số nguyên dương x thoả mãn bất phương trình ${linText(a, b)} ${sign} 0?`,
        answer: count,
        steps: [
          `Chuyển vế: ${linText(a, 0)} ${sign} ${intText(-b)}.`,
          a > 0
            ? `Chia hai vế cho ${a} > 0 (giữ chiều): x ${sol} ${k}.`
            : `Chia hai vế cho ${intText(a)} < 0 (đổi chiều): x ${sol} ${k}.`,
          `Các số nguyên dương thoả mãn là ${count <= 3 ? Array.from({ length: count }, (_, i) => i + 1).join(', ') : `1, 2, …, ${count}`}: có ${count} số.`,
        ],
        hints: [
          'Giải bất phương trình trước, nhớ đổi chiều khi chia cho số âm.',
          `Đếm các số nguyên dương từ 1 đến số lớn nhất còn thoả mãn.`,
        ],
      };
    }
  },
};

/** Things bought one by one after a fixed first item: [item, fixed price, unit]. */
const SHOPPING = [
  ['quyển vở', 'một chiếc bút', 'quyển'],
  ['cái bánh', 'một hộp sữa', 'cái'],
  ['bông hoa', 'một chiếc giỏ', 'bông'],
];

/** @type {Skill} */
export const thucTe = {
  id: 'thuc-te',
  label: 'Vận dụng: bài toán thực tế',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      for (;;) {
        const [item, first, unit] = pick(rand, SHOPPING);
        const f = int(rand, 2, 6) * 5;
        const u = int(rand, 3, 12);
        const money = int(rand, 10, 30) * 10;
        if (money <= f + u) continue;
        const n = Math.floor((money - f) / u);
        return {
          prompt: `Bạn Mai có ${fmt(money)} nghìn đồng. Bạn mua ${first} giá ${f} nghìn đồng và một số ${item}, mỗi ${unit} giá ${u} nghìn đồng. Bạn Mai mua được nhiều nhất bao nhiêu ${item}?`,
          answer: n,
          unit,
          steps: [
            `Gọi x là số ${item} (x là số tự nhiên). Số tiền phải trả: ${f} + ${u}x (nghìn đồng).`,
            `Lập bất phương trình: ${f} + ${u}x ≤ ${fmt(money)}.`,
            `Giải: ${u}x ≤ ${fmt(money - f)}, nên x ≤ ${signedFracText(money - f, u)}.`,
            `Số tự nhiên lớn nhất thoả mãn là ${n}: mua được nhiều nhất ${n} ${item}.`,
          ],
          hints: [
            `Gọi x là số ${item}; tổng số tiền không vượt quá ${fmt(money)} nghìn đồng.`,
            `Bất phương trình: ${f} + ${u}x ≤ ${fmt(money)}.`,
          ],
        };
      }
    }
    if (variant === 1) {
      const T = int(rand, 10, 40) * 50;
      const d = int(rand, 55, 85);
      const w = pick(rand, [20, 25, 40, 45, 50, 60]);
      const n = Math.floor((T - d) / w);
      return {
        prompt: `Một thang máy chở được tối đa ${fmt(T)} kg. Một người nặng ${d} kg đi cùng các thùng hàng, mỗi thùng nặng ${w} kg. Thang máy chở được nhiều nhất bao nhiêu thùng hàng trong một lần?`,
        answer: n,
        unit: 'thùng',
        steps: [
          `Gọi x là số thùng hàng (x là số tự nhiên). Khối lượng cả người và hàng: ${d} + ${w}x (kg).`,
          `Lập bất phương trình: ${d} + ${w}x ≤ ${fmt(T)}.`,
          `Giải: ${w}x ≤ ${fmt(T - d)}, nên x ≤ ${signedFracText(T - d, w)}.`,
          `Số tự nhiên lớn nhất thoả mãn là ${n}: chở được nhiều nhất ${n} thùng.`,
        ],
        hints: [
          'Gọi x là số thùng; tổng khối lượng không vượt quá mức tối đa của thang máy.',
          `Bất phương trình: ${d} + ${w}x ≤ ${fmt(T)}.`,
        ],
      };
    }
    const F = int(rand, 2, 10) * 10;
    const p1 = int(rand, 1, 3);
    const p2 = p1 + int(rand, 1, 4);
    const diff = p2 - p1;
    const n = Math.floor(F / diff) + 1;
    return {
      prompt: `Gói cước A thu ${F} nghìn đồng mỗi tháng và ${p1} nghìn đồng cho mỗi phút gọi. Gói cước B không thu phí tháng nhưng thu ${p2} nghìn đồng cho mỗi phút gọi. Trong một tháng phải gọi ít nhất bao nhiêu phút (số nguyên) thì gói A rẻ hơn gói B?`,
      answer: n,
      unit: 'phút',
      steps: [
        `Gọi x là số phút gọi trong tháng (x là số tự nhiên). Gói A: ${F} + ${linText(p1, 0)}; gói B: ${p2}x (nghìn đồng).`,
        `Gói A rẻ hơn khi ${F} + ${linText(p1, 0)} < ${p2}x.`,
        `Chuyển vế: ${F} < ${diff === 1 ? '' : diff}x, nên x > ${signedFracText(F, diff)}.`,
        `Số tự nhiên nhỏ nhất thoả mãn là ${n}: phải gọi ít nhất ${n} phút.`,
      ],
      hints: [
        'Viết số tiền phải trả của mỗi gói theo số phút x.',
        `Giải bất phương trình ${F} + ${linText(p1, 0)} < ${p2}x.`,
      ],
    };
  },
};

/** Skills of the practice lesson after Bài 4 and Bài 5. */
export const SKILLS_TRANG_36 = [phuongTrinhTich, chuaAnOMau, batDangThuc];

/** One skill per idea of the chapter, for the end-of-chapter review. */
export const CHAPTER_SKILLS = [...SKILLS_TRANG_36, batPhuongTrinh, thucTe];
