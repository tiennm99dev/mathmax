/**
 * Question generators for the chapter "Số thập phân", one skill per theory
 * lesson. Every answer is a decimal built from an integer and a power of
 * ten, so it equals exactly what `readDecimal` gives for the typed text, and
 * the drill board writes it back with `valueText`.
 */

import { int, pick } from '#lib/core/drill.js';
import { decStr, decValue } from './decimal.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A non-zero integer from lo to hi whose last digit is not 0.
 * @param {() => number} rand @param {number} lo @param {number} hi
 */
function noTrailingZero(rand, lo, hi) {
  for (;;) {
    const n = int(rand, lo, hi);
    if (n % 10 !== 0) return n;
  }
}

/** @param {() => number} rand */
const sign = (rand) => (rand() < 0.5 ? -1 : 1);

/**
 * A decimal as an operand: negative numbers after the first in brackets.
 * @param {number} n @param {number} k @param {boolean} first
 */
const op = (n, k, first) => (n < 0 && !first ? `(${decStr(n, k)})` : decStr(n, k));

const PLACE_NAMES = ['phần mười', 'phần trăm', 'phần nghìn'];

/** @type {Skill} */
export const soThapPhan = {
  id: 'so-thap-phan',
  label: 'Bài 28. Số thập phân',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const k = int(rand, 1, 3);
      const n = sign(rand) * noTrailingZero(rand, 1, 10 ** (k + 1) - 1);
      const den = 10 ** k;
      return {
        prompt: `Viết phân số thập phân ${n < 0 ? '−' : ''}${Math.abs(n)}/${den} dưới dạng số thập phân.`,
        answer: decValue(n, k),
        hints: [
          `Mẫu ${den} có ${k} chữ số 0, nên số thập phân có ${k} chữ số ở phần thập phân.`,
          'Giữ nguyên dấu của phân số.',
        ],
        steps: [
          `Mẫu ${den} có ${k} chữ số 0: dùng dấu phẩy tách ${k} chữ số ở bên phải của tử (thêm chữ số 0 ở trước nếu thiếu).`,
          `${n < 0 ? '−' : ''}${Math.abs(n)}/${den} = ${decStr(n, k)}.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 1, 3);
      const n = sign(rand) * noTrailingZero(rand, 1, 10 ** (k + 1) - 1);
      const den = 10 ** k;
      return {
        prompt: `Viết số ${decStr(n, k)} dưới dạng phân số thập phân có mẫu ${den}. Tử số bằng bao nhiêu?`,
        answer: n,
        hints: [
          `Mẫu ${den} ứng với ${k} chữ số ở phần thập phân.`,
          'Tử số là số viết được khi bỏ dấu phẩy, giữ nguyên dấu.',
        ],
        steps: [
          `${decStr(n, k)} có ${k} chữ số ở phần thập phân nên ${decStr(n, k)} = ${n < 0 ? '−' : ''}${Math.abs(n)}/${den}.`,
          `Tử số là ${decStr(n, 0)}.`,
        ],
      };
    }
    // The largest or smallest of four decimals with the same integer part.
    const whole = int(rand, 0, 9);
    const neg = rand() < 0.6;
    const seen = new Set();
    /** @type {number[]} */
    const nums = [];
    while (nums.length < 4) {
      const k = int(rand, 1, 3);
      const frac = noTrailingZero(rand, 1, 10 ** k - 1) * 10 ** (3 - k);
      const n = (neg ? -1 : 1) * (whole * 1000 + frac);
      if (!seen.has(n)) {
        seen.add(n);
        nums.push(n);
      }
    }
    const largest = rand() < 0.5;
    const ans = largest ? Math.max(...nums) : Math.min(...nums);
    const word = largest ? 'lớn nhất' : 'nhỏ nhất';
    const sorted = [...nums].sort((a, b) => a - b);
    return {
      prompt: `Tìm số ${word} trong các số: ${nums.map((n) => decStr(n, 3)).join('; ')}.`,
      answer: decValue(ans, 3),
      hints: neg
        ? [
            'Các số đều âm: so sánh các số đối của chúng.',
            'Số âm nào có số đối lớn hơn thì nhỏ hơn.',
          ]
        : ['Phần số nguyên bằng nhau: so sánh lần lượt hàng phần mười, phần trăm, phần nghìn.'],
      steps: [
        neg
          ? `Các số đều âm; số có số đối lớn hơn thì nhỏ hơn.`
          : 'Phần số nguyên bằng nhau, so sánh từng hàng ở phần thập phân.',
        `Thứ tự tăng dần: ${sorted.map((n) => decStr(n, 3)).join(' < ')}.`,
        `Số ${word} là ${decStr(ans, 3)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const tinhToan = {
  id: 'tinh-toan',
  label: 'Bài 29. Tính toán với số thập phân',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      // x ± y with two decimals, at least one negative number.
      const x = sign(rand) * noTrailingZero(rand, 11, 999);
      const y = (x > 0 || rand() < 0.5 ? -1 : 1) * noTrailingZero(rand, 11, 999);
      const plus = rand() < 0.5;
      const ny = plus ? y : -y;
      const r = x + ny;
      if (r === 0) return tinhToan.make(rand);
      const expr = `${op(x, 2, true)} ${plus ? '+' : '−'} ${op(y, 2, false)}`;
      return {
        prompt: `Tính ${expr}.`,
        answer: decValue(r, 2),
        hints: [
          plus
            ? 'Xét dấu hai số hạng: cùng dấu hay khác dấu?'
            : 'Đổi phép trừ thành phép cộng với số đối: a − b = a + (−b).',
          'Cộng hai số âm: cộng hai số đối rồi thêm dấu "−". Hai số khác dấu: lấy số lớn trừ số nhỏ (khi bỏ dấu), giữ dấu của số lớn hơn.',
        ],
        steps: [
          plus ? `${expr}.` : `${expr} = ${op(x, 2, true)} + ${op(ny, 2, false)}.`,
          `Kết quả: ${decStr(r, 2)}.`,
        ],
      };
    }
    if (v === 1) {
      // A product of two decimals with one decimal each.
      const a = sign(rand) * noTrailingZero(rand, 2, 99);
      const b = sign(rand) * noTrailingZero(rand, 2, 49);
      const p = a * b;
      const same = a < 0 === b < 0;
      return {
        prompt: `Tính ${op(a, 1, true)} · ${op(b, 1, false)}.`,
        answer: decValue(p, 2),
        hints: [
          same ? 'Hai thừa số cùng dấu nên tích dương.' : 'Hai thừa số khác dấu nên tích âm.',
          `Nhân ${Math.abs(a)} · ${Math.abs(b)} rồi tách 2 chữ số ở phần thập phân của tích.`,
        ],
        steps: [
          `${Math.abs(a)} · ${Math.abs(b)} = ${Math.abs(p)}; hai thừa số có 1 + 1 = 2 chữ số ở phần thập phân.`,
          `${same ? 'Cùng dấu, tích dương' : 'Khác dấu, tích âm'}: ${decStr(p, 2)}.`,
        ],
      };
    }
    if (v === 2) {
      // An exact quotient: dividend = quotient · divisor.
      const q = sign(rand) * noTrailingZero(rand, 2, 99);
      const d = sign(rand) * noTrailingZero(rand, 2, 25);
      const dividend = q * d; // two decimals: q and d carry one each
      const same = q > 0;
      return {
        prompt: `Tính ${op(dividend, 2, true)} : ${op(d, 1, false)}.`,
        answer: decValue(q, 1),
        hints: [
          same ? 'Hai số cùng dấu nên thương dương.' : 'Hai số khác dấu nên thương âm.',
          'Chuyển dấu phẩy của cả số bị chia và số chia sang phải một chữ số để số chia là số tự nhiên.',
        ],
        steps: [
          `${decStr(Math.abs(dividend), 2)} : ${decStr(Math.abs(d), 1)} = ${decStr(Math.abs(dividend), 1)} : ${Math.abs(d)} = ${decStr(Math.abs(q), 1)}.`,
          `${same ? 'Thương dương' : 'Thương âm'}: ${decStr(q, 1)}.`,
        ],
      };
    }
    // a + b · c: multiplication first.
    const a = sign(rand) * noTrailingZero(rand, 1, 99);
    const b = sign(rand) * noTrailingZero(rand, 2, 19);
    const c = pick(rand, [2, 3, 4, 5, -2, -3, -4, -5]);
    const bc = b * c;
    const r = a + bc;
    return {
      prompt: `Tính ${decStr(a, 1)} + ${op(b, 1, false)} · ${op(c, 0, false)}.`,
      answer: decValue(r, 1),
      hints: ['Nhân trước, cộng sau.', `Tính ${op(b, 1, true)} · ${op(c, 0, false)} trước.`],
      steps: [
        `${op(b, 1, true)} · ${op(c, 0, false)} = ${decStr(bc, 1)}.`,
        `${decStr(a, 1)} + ${op(bc, 1, false)} = ${decStr(r, 1)}.`,
      ],
    };
  },
};

/**
 * n (scaled by 10^k) rounded to the unit 10^u, also scaled by 10^k;
 * negative numbers are rounded through their opposite.
 * @param {number} n @param {number} unit
 */
function roundScaled(n, unit) {
  const a = Math.abs(n);
  const lo = Math.floor(a / unit) * unit;
  const r = (a - lo) * 2 >= unit ? lo + unit : lo;
  return n < 0 ? -r : r;
}

/** @type {Skill} */
export const lamTron = {
  id: 'lam-tron',
  label: 'Bài 30. Làm tròn và ước lượng',
  make(rand) {
    if (rand() < 0.65) {
      // A decimal with four decimals rounded to tenths, hundredths or thousandths.
      const n = sign(rand) * noTrailingZero(rand, 10001, 999999);
      const d = int(rand, 1, 3);
      const unit = 10 ** (4 - d);
      const r = roundScaled(n, unit);
      const a = Math.abs(n);
      const digit = Math.floor(a / unit) % 10;
      const next = Math.floor(a / (unit / 10)) % 10;
      const place = `hàng ${PLACE_NAMES[d - 1]}`;
      return {
        prompt: `Làm tròn ${decStr(n, 4)} đến ${place}.`,
        answer: decValue(r, 4),
        hints: [
          ...(n < 0 ? ['Số âm: làm tròn số đối của nó rồi đặt dấu "−" trước kết quả.'] : []),
          `Chữ số ${place} là ${digit}; xét chữ số ngay bên phải nó.`,
        ],
        steps: [
          `Chữ số ${place} là ${digit}, chữ số bên phải là ${next} ${next >= 5 ? '≥ 5 nên cộng thêm 1' : '< 5 nên giữ nguyên'}.`,
          `${decStr(n, 4)} ≈ ${decStr(r / 10 ** (4 - d), d, true)}.`,
        ],
      };
    }
    // A natural number rounded to tens, hundreds or thousands.
    const n = int(rand, 10000, 999999);
    const p = int(rand, 1, 3);
    const unit = 10 ** p;
    const r = roundScaled(n, unit);
    const names = ['chục', 'trăm', 'nghìn'];
    const place = `hàng ${names[p - 1]}`;
    const digit = Math.floor(n / unit) % 10;
    const next = Math.floor(n / (unit / 10)) % 10;
    return {
      prompt: `Làm tròn ${decStr(n, 0)} đến ${place}.`,
      answer: r,
      hints: [
        `Chữ số ${place} là ${digit}; xét chữ số ngay bên phải nó.`,
        'Các chữ số bên phải hàng làm tròn (ở phần số nguyên) được thay bằng chữ số 0.',
      ],
      steps: [
        `Chữ số ${place} là ${digit}, chữ số bên phải là ${next} ${next >= 5 ? '≥ 5 nên cộng thêm 1' : '< 5 nên giữ nguyên'}.`,
        `${decStr(n, 0)} ≈ ${decStr(r, 0)}.`,
      ],
    };
  },
};

/** Multiples of 5 per cent: m% of a multiple of 20 is a whole number. */
const PERCENTS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 75, 80];

/** @type {Skill} */
export const tiSoPhanTram = {
  id: 'ti-so-phan-tram',
  label: 'Bài 31. Một số bài toán về tỉ số và tỉ số phần trăm',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      // m% of b; b is a multiple of 20, so b · m / 100 is whole.
      const m = pick(rand, PERCENTS);
      const b = pick(rand, [2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 15, 18, 24, 35, 45]) * 20;
      const r = (b * m) / 100;
      return {
        prompt: `Tìm ${m}% của ${decStr(b, 0)}.`,
        answer: r,
        hints: ['Muốn tìm m% của số b, ta nhân b với m rồi chia cho 100.'],
        steps: [
          `${m}% của ${decStr(b, 0)} là ${decStr(b, 0)} · ${m}/100.`,
          `${decStr(b, 0)} · ${m} = ${decStr(b * m, 0)}; ${decStr(b * m, 0)} : 100 = ${decStr(r, 0)}.`,
        ],
      };
    }
    if (v === 1) {
      // A number whose m% is a; the number is a multiple of 20.
      const m = pick(rand, PERCENTS);
      const x = pick(rand, [3, 4, 6, 7, 8, 9, 11, 12, 14, 16, 18, 25, 30]) * 20;
      const a = (x * m) / 100;
      return {
        prompt: `Tìm một số, biết ${m}% của nó bằng ${decStr(a, 0)}.`,
        answer: x,
        hints: [
          'Đây là bài toán tìm một số khi biết giá trị phần trăm của nó.',
          'Lấy giá trị đã biết chia cho m/100, tức là nhân với 100 rồi chia cho m.',
        ],
        steps: [
          `Số cần tìm là ${decStr(a, 0)} : ${m}/100 = ${decStr(a, 0)} · 100 : ${m}.`,
          `${decStr(a * 100, 0)} : ${m} = ${decStr(x, 0)}.`,
        ],
      };
    }
    if (v === 2) {
      // The percentage a : b · 100% for a b that divides a · 100.
      const b = pick(rand, [20, 25, 40, 50, 80, 125, 200, 250, 400]);
      let a;
      do a = int(rand, 1, 2 * b);
      while ((a * 100) % b !== 0 || a === b);
      const q = (a * 100) / b;
      return {
        prompt: `Tính tỉ số phần trăm của ${decStr(a, 0)} và ${decStr(b, 0)} (nhập số phần trăm, có thể kèm dấu %).`,
        answer: q,
        hints: [
          'Tỉ số phần trăm của a và b là a/b · 100%.',
          'Nhân số thứ nhất với 100 rồi chia cho số thứ hai.',
        ],
        steps: [
          `Tỉ số phần trăm là ${decStr(a, 0)}/${decStr(b, 0)} · 100% = (${decStr(a * 100, 0)} : ${decStr(b, 0)})%.`,
          `${decStr(a * 100, 0)} : ${decStr(b, 0)} = ${decStr(q, 0)}, nên tỉ số phần trăm là ${decStr(q, 0)}%.`,
        ],
      };
    }
    if (v === 3) {
      // A price cut by m%: the new price is (100 − m)% of the old one.
      const m = pick(rand, [10, 15, 20, 25, 30, 40, 50]);
      const price = int(rand, 12, 99) * 10000;
      const cut = (price * m) / 100;
      const r = price - cut;
      return {
        prompt: `Một món hàng giá ${decStr(price, 0)} đồng, nay được giảm giá ${m}%. Giá mới của món hàng là bao nhiêu đồng?`,
        answer: r,
        hints: [
          'Tính số tiền được giảm trước: đó là m% của giá cũ.',
          'Giá mới bằng giá cũ trừ số tiền được giảm (hoặc bằng (100 − m)% của giá cũ).',
        ],
        steps: [
          `Số tiền được giảm: ${decStr(price, 0)} · ${m}/100 = ${decStr(cut, 0)} (đồng).`,
          `Giá mới: ${decStr(price, 0)} − ${decStr(cut, 0)} = ${decStr(r, 0)} (đồng).`,
        ],
      };
    }
    // Yearly interest on a deposit of whole millions; the rate has one decimal.
    const rate = pick(rand, [45, 48, 50, 55, 56, 60, 65, 68, 70, 72]);
    const deposit = int(rand, 5, 200) * 1000000;
    const interest = (deposit * rate) / 1000;
    return {
      prompt: `Gửi tiết kiệm ${decStr(deposit, 0)} đồng với lãi suất ${decStr(rate, 1)}% một năm. Sau một năm, tiền lãi là bao nhiêu đồng?`,
      answer: interest,
      hints: ['Tiền lãi một năm bằng lãi suất (tính theo phần trăm) của số tiền gửi.'],
      steps: [
        `Tiền lãi bằng ${decStr(rate, 1)}% của ${decStr(deposit, 0)}: ${decStr(deposit, 0)} · ${decStr(rate, 1)}/100.`,
        `${decStr(deposit / 100, 0)} · ${decStr(rate, 1)} = ${decStr(interest, 0)} (đồng).`,
      ],
    };
  },
};

/** The drill of "Luyện tập chung" after Bài 30. */
export const PAGE_41_SKILLS = [soThapPhan, tinhToan, lamTron];

/** The end-of-chapter test: one skill per theory lesson of the chapter. */
export const CHAPTER_SKILLS = [soThapPhan, tinhToan, lamTron, tiSoPhanTram];
