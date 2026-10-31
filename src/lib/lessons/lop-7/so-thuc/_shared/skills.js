/**
 * Question generators for the chapter "Số thực", one skill per lesson plus
 * an applied skill for the chapter review. Answers are numbers (an integer,
 * a decimal built from its digits, or a fraction p/q), so a drill board
 * reads input with `readNumber` and writes answers with `numberText`.
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import {
  PRECISIONS,
  decimalText,
  digitAt,
  digitsText,
  expand,
  isFiniteDecimal,
  isSquare,
  numberText,
  primeFactors,
  roundFraction,
  roundSqrt,
  scaledText,
  scaledValue,
  sqrtFloor,
} from '#lib/core/decimal.js';
import { intText } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** Denominators whose fractions repeat. */
const REPEATING_DENS = [3, 6, 7, 9, 11, 12, 13, 15, 18, 22, 27, 33, 37];

/**
 * A positive lowest-terms fraction p/q, p < 3q, with q from `dens`.
 * @param {() => number} rand
 * @param {number[]} dens
 */
function randFraction(rand, dens) {
  for (;;) {
    const q = pick(rand, dens);
    const p = int(rand, 1, 3 * q - 1);
    if (gcd(p, q) === 1) return { p, q };
  }
}

/**
 * A natural number from lo to hi that is not a perfect square.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 */
function nonSquare(rand, lo, hi) {
  for (;;) {
    const n = int(rand, lo, hi);
    if (!isSquare(n)) return n;
  }
}

/**
 * Tenths from 0,1 to 9,9 that are not whole numbers, as an integer count of
 * tenths: 25 stands for 2,5.
 * @param {() => number} rand
 */
function tenths(rand) {
  for (;;) {
    const n = int(rand, 1, 99);
    if (n % 10 !== 0) return n;
  }
}

/**
 * Plain-text decimal of a value with one or two places: 2.5 → '2,5'.
 * @param {number} scaled
 * @param {number} places
 */
const dec = (scaled, places) => scaledText(scaled, places);

/**
 * The remainders of p : q after the comma, as a short list for a step.
 * @param {number} p
 * @param {number} q
 */
function remainderStep(p, q) {
  const e = expand(p, q);
  const back = e.remainders[e.start];
  return `Chia ${p} : ${q}, các số dư sau dấu phẩy là ${e.remainders.join(', ')}, rồi số dư ${back} lặp lại.`;
}

/** @type {Skill} */
export const thapPhanTuanHoan = {
  id: 'thap-phan-tuan-hoan',
  label: 'Bài 5. Số thập phân vô hạn tuần hoàn',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const { p, q } = randFraction(rand, REPEATING_DENS);
      const e = expand(p, q);
      const cycle = e.digits.slice(e.start).join('');
      return {
        prompt: `Viết phân số ${p}/${q} dưới dạng số thập phân. Chu kì của nó gồm mấy chữ số?`,
        answer: e.period,
        hints: [
          'Chia tử cho mẫu và ghi lại các số dư.',
          'Khi một số dư cũ xuất hiện lại, các chữ số của thương bắt đầu lặp lại.',
        ],
        steps: [
          remainderStep(p, q),
          `${p}/${q} = ${decimalText(p, q)}, chu kì là ${cycle}, gồm ${e.period} chữ số.`,
        ],
      };
    }
    if (v === 1) {
      const { p, q } = randFraction(rand, [7, 11, 13, 27, 33, 37]);
      const e = expand(p, q);
      const n = int(rand, 12, 60);
      const d = digitAt(p, q, n);
      const k = n - e.start;
      const r = k % e.period;
      const pos = r === 0 ? e.period : r;
      const cycle = e.digits.slice(e.start).join('');
      return {
        prompt: `${p}/${q} = ${decimalText(p, q)}. Chữ số thứ ${n} sau dấu phẩy là chữ số nào?`,
        answer: d,
        hints: [
          `Chu kì ${cycle} gồm ${e.period} chữ số, lặp lại sau mỗi ${e.period} vị trí.`,
          `Chia ${n}${e.start ? ` − ${e.start}` : ''} cho ${e.period} và xem số dư.`,
        ],
        steps: [
          e.start
            ? `Có ${e.start} chữ số đứng trước chu kì; chữ số thứ ${n} là chữ số thứ ${k} tính từ đầu chu kì.`
            : `Chu kì bắt đầu ngay sau dấu phẩy.`,
          `${k} = ${e.period} · ${Math.floor((k - 1) / e.period)} + ${pos}: đó là chữ số thứ ${pos} của chu kì ${cycle}.`,
          `Chữ số cần tìm là ${d}.`,
        ],
      };
    }
    if (v === 2) {
      const { p, q } = randFraction(rand, REPEATING_DENS);
      const i = int(rand, 0, 2);
      const pr = PRECISIONS[i];
      const scaled = roundFraction(p, q, pr.places);
      const next = digitAt(p, q, pr.places + 1);
      return {
        prompt: `Làm tròn số ${p}/${q} với độ chính xác ${pr.text}.`,
        answer: scaledValue(scaled, pr.places),
        hints: [
          `Độ chính xác ${pr.text} nghĩa là làm tròn đến ${pr.place}.`,
          'Viết phân số dưới dạng số thập phân với vài chữ số, rồi nhìn chữ số ngay bên phải hàng làm tròn.',
        ],
        steps: [
          `${p}/${q} = ${decimalText(p, q)} = ${digitsText(p, q, pr.places + 3)}…`,
          `Độ chính xác ${pr.text}: làm tròn đến ${pr.place}. Chữ số ngay bên phải là ${next} ${next >= 5 ? '≥ 5 nên tăng chữ số hàng làm tròn thêm 1' : '< 5 nên giữ nguyên chữ số hàng làm tròn'}.`,
          `Kết quả: ${dec(scaled, pr.places)}.`,
        ],
      };
    }
    /** @type {Array<{ p: number, q: number }>} */
    const list = [];
    const dens = [4, 5, 6, 8, 12, 14, 15, 16, 20, 21, 24, 25, 30, 35, 40, 45];
    while (list.length < 4) {
      const q = pick(rand, dens);
      const p = (rand() < 0.5 ? -1 : 1) * int(rand, 1, q - 1);
      if (!list.some((f) => f.p * q === p * f.q)) list.push({ p, q });
    }
    const finite = list.filter((f) => isFiniteDecimal(f.p, f.q));
    const lowest = (/** @type {{ p: number, q: number }} */ f) => {
      const g = gcd(Math.abs(f.p), f.q);
      return { p: f.p / g, q: f.q / g };
    };
    const text = (/** @type {{ p: number, q: number }} */ f) => `${intText(f.p)}/${f.q}`;
    return {
      prompt: `Trong các phân số ${list.map(text).join('; ')}, có bao nhiêu phân số viết được dưới dạng số thập phân hữu hạn?`,
      answer: finite.length,
      hints: [
        'Rút gọn từng phân số trước.',
        'Phân số tối giản mẫu dương là số thập phân hữu hạn khi mẫu không có ước nguyên tố khác 2 và 5.',
      ],
      steps: [
        `Rút gọn: ${list
          .map((f) => {
            const l = lowest(f);
            return l.q === f.q ? text(f) : `${text(f)} = ${text(l)}`;
          })
          .join('; ')}.`,
        `Mẫu tối giản và ước nguyên tố: ${list
          .map((f) => {
            const l = lowest(f);
            return l.q === 1
              ? `${text(f)} là số nguyên`
              : `${l.q} có ước ${primeFactors(l.q).join(', ')}`;
          })
          .join('; ')}.`,
        finite.length
          ? `Các phân số viết được dưới dạng số thập phân hữu hạn: ${finite.map((f) => `${text(f)} = ${decimalText(f.p, f.q)}`).join('; ')}. Có ${finite.length} phân số.`
          : 'Không có phân số nào viết được dưới dạng số thập phân hữu hạn: có 0 phân số.',
      ],
    };
  },
};

/** @type {Skill} */
export const canBacHai = {
  id: 'can-bac-hai',
  label: 'Bài 6. Số vô tỉ. Căn bậc hai số học',
  make(rand) {
    const v = int(rand, 0, 5);
    if (v === 0) {
      const k = int(rand, 11, 25);
      return {
        prompt: `Tính √${k * k}.`,
        answer: k,
        hints: [`Tìm số không âm có bình phương bằng ${k * k}.`],
        steps: [`${k} ≥ 0 và ${k}² = ${k * k}.`, `Vậy √${k * k} = ${k}.`],
      };
    }
    if (v === 1) {
      let k = int(rand, 2, 19);
      while (k % 10 === 0) k = int(rand, 2, 19);
      return {
        prompt: `Tính √${dec(k * k, 2)}.`,
        answer: scaledValue(k, 1),
        hints: [`Nhớ rằng ${k}² = ${k * k}; dời dấu phẩy cho đúng.`],
        steps: [
          `${dec(k, 1)}² = ${dec(k * k, 2)} và ${dec(k, 1)} ≥ 0.`,
          `Vậy √${dec(k * k, 2)} = ${dec(k, 1)}.`,
        ],
      };
    }
    if (v === 2) {
      let a = int(rand, 1, 12);
      let b = int(rand, 2, 12);
      while (gcd(a, b) !== 1) {
        a = int(rand, 1, 12);
        b = int(rand, 2, 12);
      }
      return {
        prompt: `Tính √(${a * a}/${b * b}). Viết kết quả dạng phân số a/b.`,
        answer: a / b,
        hints: ['Tìm căn bậc hai số học của tử và của mẫu.'],
        steps: [
          `(${a}/${b})² = ${a * a}/${b * b} và ${a}/${b} ≥ 0.`,
          `Vậy √(${a * a}/${b * b}) = ${a}/${b}.`,
        ],
      };
    }
    if (v === 3) {
      const a = nonSquare(rand, 2, 30);
      const k = int(rand, 2, 12);
      const plus = rand() < 0.5;
      const ans = plus ? a + k : a - k;
      return {
        prompt: `Tính (√${a})² ${plus ? '+' : '−'} √${k * k}.`,
        answer: ans,
        hints: ['Với a ≥ 0 thì (√a)² = a.'],
        steps: [
          `(√${a})² = ${a}; √${k * k} = ${k}.`,
          `${a} ${plus ? '+' : '−'} ${k} = ${intText(ans)}.`,
        ],
      };
    }
    if (v === 4) {
      const s = nonSquare(rand, 2, 300);
      const n = sqrtFloor(s, 0);
      return {
        prompt: `Tìm số tự nhiên n sao cho n < √${s} < n + 1.`,
        answer: n,
        hints: [`Tìm hai số chính phương liên tiếp kẹp ${s}.`],
        steps: [
          `${n * n} < ${s} < ${(n + 1) * (n + 1)}, tức là ${n}² < ${s} < ${n + 1}².`,
          `Vậy ${n} < √${s} < ${n + 1}, nên n = ${n}.`,
        ],
      };
    }
    const s = nonSquare(rand, 2, 99);
    const places = int(rand, 1, 2);
    const scaled = roundSqrt(s, places);
    const shown = sqrtFloor(s, 5);
    const next = Math.floor(sqrtFloor(s, places + 1) % 10);
    const place = places === 1 ? 'hàng phần mười' : 'hàng phần trăm';
    return {
      prompt: `Dùng máy tính cầm tay tính √${s} rồi làm tròn kết quả đến ${place}.`,
      answer: scaledValue(scaled, places),
      hints: [
        `Máy tính cho √${s} = ${dec(sqrtFloor(s, places + 2), places + 2)}…`,
        `Nhìn chữ số ngay bên phải ${place}.`,
      ],
      steps: [
        `√${s} = ${dec(shown, 5)}…`,
        `Chữ số ngay bên phải ${place} là ${next} ${next >= 5 ? '≥ 5 nên tăng thêm 1' : '< 5 nên giữ nguyên'}.`,
        `√${s} ≈ ${dec(scaled, places)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const soThuc = {
  id: 'so-thuc',
  label: 'Bài 7. Tập hợp các số thực',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const [a, b, c] = [tenths(rand), tenths(rand), tenths(rand)];
      const [sa, sb, sc] = shuffle(rand, [-1, -1, 1]);
      const ans = a + b - c;
      const term = (/** @type {number} */ x, /** @type {number} */ s) => `|${dec(s * x, 1)}|`;
      return {
        prompt: `Tính ${term(a, sa)} + ${term(b, sb)} − ${term(c, sc)}.`,
        answer: scaledValue(ans, 1),
        hints: ['Tính từng giá trị tuyệt đối trước: |a| = a nếu a ≥ 0, |a| = −a nếu a < 0.'],
        steps: [
          `${term(a, sa)} = ${dec(a, 1)}; ${term(b, sb)} = ${dec(b, 1)}; ${term(c, sc)} = ${dec(c, 1)}.`,
          `${dec(a, 1)} + ${dec(b, 1)} − ${dec(c, 1)} = ${numberText(scaledValue(ans, 1))}.`,
        ],
      };
    }
    if (v === 1) {
      const a = tenths(rand);
      const neg = rand() < 0.5;
      const t = dec(a, 1);
      return {
        prompt: `Tìm x, biết |x| = ${t} và x ${neg ? '<' : '>'} 0.`,
        answer: scaledValue(neg ? -a : a, 1),
        hints: ['|x| = a (a > 0) khi x = a hoặc x = −a.'],
        steps: [
          `|x| = ${t} nên x = ${t} hoặc x = ${dec(-a, 1)}.`,
          `Vì x ${neg ? '<' : '>'} 0 nên x = ${dec(neg ? -a : a, 1)}.`,
        ],
      };
    }
    if (v === 2) {
      const a = nonSquare(rand, 2, 80);
      const b = nonSquare(rand, 2, 80);
      const fa = sqrtFloor(a, 0);
      const fb = sqrtFloor(b, 0);
      const count = fa + fb + 1;
      return {
        prompt: `Có bao nhiêu số nguyên x thoả mãn −√${a} < x < √${b}?`,
        answer: count,
        hints: ['Tìm hai số nguyên liên tiếp kẹp mỗi căn bậc hai.'],
        steps: [
          `${fa}² < ${a} < ${fa + 1}² nên −${fa + 1} < −√${a} < −${fa}; ${fb}² < ${b} < ${fb + 1}² nên ${fb} < √${b} < ${fb + 1}.`,
          `Các số nguyên x là các số từ ${intText(-fa)} đến ${fb}.`,
          `Có ${fb} − ${fa ? `(${intText(-fa)})` : '0'} + 1 = ${count} số.`,
        ],
      };
    }
    const s = nonSquare(rand, 2, 150);
    const f = sqrtFloor(s, 0);
    return {
      prompt: `Tìm số nguyên n lớn nhất sao cho n < −√${s}.`,
      answer: -f - 1,
      hints: [
        `√${s} nằm giữa hai số tự nhiên liên tiếp nào?`,
        'Trên trục số, −√a nằm đối xứng với √a qua điểm 0.',
      ],
      steps: [
        `${f}² < ${s} < ${f + 1}² nên ${f} < √${s} < ${f + 1}, suy ra −${f + 1} < −√${s} < −${f}.`,
        `Số nguyên lớn nhất nhỏ hơn −√${s} là ${intText(-f - 1)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const vanDung = {
  id: 'van-dung',
  label: 'Vận dụng thực tế',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const s = nonSquare(rand, 20, 500);
      const scaled = roundSqrt(s, 1);
      return {
        prompt: `Một mảnh vườn hình vuông có diện tích ${s} m². Tính độ dài cạnh mảnh vườn theo mét, làm tròn đến hàng phần mười.`,
        answer: scaledValue(scaled, 1),
        hints: ['Cạnh x thoả mãn x² = diện tích, nên x là căn bậc hai số học của diện tích.'],
        steps: [
          `Cạnh x = √${s} = ${dec(sqrtFloor(s, 3), 3)}… (m).`,
          `Làm tròn đến hàng phần mười: x ≈ ${dec(scaled, 1)} m.`,
        ],
      };
    }
    if (v === 1) {
      const s = nonSquare(rand, 10, 200);
      const scaled = roundSqrt(16 * s, 1);
      return {
        prompt: `Một tấm thảm hình vuông có diện tích ${s} dm². Tính chu vi tấm thảm theo đề-xi-mét, làm tròn đến hàng phần mười.`,
        answer: scaledValue(scaled, 1),
        hints: [
          'Tính cạnh bằng căn bậc hai số học của diện tích, rồi nhân 4.',
          'Chỉ làm tròn ở bước cuối.',
        ],
        steps: [
          `Cạnh = √${s} (dm), chu vi = 4 · √${s} = √${16 * s} = ${dec(sqrtFloor(16 * s, 3), 3)}… (dm).`,
          `Làm tròn đến hàng phần mười: chu vi ≈ ${dec(scaled, 1)} dm.`,
        ],
      };
    }
    const q = pick(rand, [3, 6, 7, 9, 12]);
    let p = int(rand, q + 1, 4 * q);
    while (p % q === 0) p = int(rand, q + 1, 4 * q);
    const scaled = roundFraction(p, q, 2);
    return {
      prompt: `Rót đều ${p} lít nước mắm vào ${q} can. Mỗi can chứa bao nhiêu lít? Làm tròn với độ chính xác 0,005.`,
      answer: scaledValue(scaled, 2),
      hints: ['Mỗi can chứa p/q lít.', 'Độ chính xác 0,005: làm tròn đến hàng phần trăm.'],
      steps: [
        `Mỗi can chứa ${p} : ${q} = ${decimalText(p, q)} = ${digitsText(p, q, 4)}… (lít).`,
        `Làm tròn đến hàng phần trăm: ${dec(scaled, 2)} lít.`,
      ],
    };
  },
};

/** The practice lesson on page 37: one skill per lesson of the chapter. */
export const PAGE_37_SKILLS = [thapPhanTuanHoan, canBacHai, soThuc];

/** The chapter review: every lesson plus applied problems. */
export const CHAPTER_SKILLS = [thapPhanTuanHoan, canBacHai, soThuc, vanDung];
