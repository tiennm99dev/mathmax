/**
 * Question generators for the year-end review of "Số và đại số" in grade 6:
 * natural numbers and powers, divisibility (ƯCLN, BCNN), integers, fractions,
 * and decimals with percentages. Answers are exact values (see `adaptive.js`),
 * so integers, fractions and decimals are all checked exactly.
 */

import { int, pick } from '#lib/core/drill.js';
import { fmt, formatFixed, formatNumber, powText } from '#lib/core/number-format.js';
import { gcd, lcm } from '#lib/numtheory-engine/index.js';
import { fraction, simplify, format as fracText } from '#lib/fraction-engine/index.js';

/** @typedef {import('./adaptive.js').ReviewSkill} ReviewSkill */

/**
 * An integer the book's way: −12, 1 024.
 * @param {number} n
 */
export const intText = (n) => (n < 0 ? `−${fmt(-n)}` : fmt(n));

/**
 * An integer written after an operator: negatives in brackets, (−12).
 * @param {number} n
 */
export const term = (n) => (n < 0 ? `(−${fmt(-n)})` : fmt(n));

/** @param {number} n */
const whole = (n) => fraction(n, 1);

/** @type {ReviewSkill} */
export const soTuNhien = {
  id: 'so-tu-nhien',
  label: 'Số tự nhiên và lũy thừa',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = int(rand, 2, 9);
      const b = int(rand, 3, 12);
      const c = int(rand, 3, 12);
      const d = int(rand, 1, a * a + b * c - 1);
      const sq = a * a;
      const answer = sq + b * c - d;
      return {
        prompt: `Tính giá trị của biểu thức: ${powText(a, 2)} + ${b} · ${c} − ${d}.`,
        answer: whole(answer),
        display: fmt(answer),
        hints: [
          'Thứ tự thực hiện: lũy thừa trước, rồi đến nhân, cuối cùng là cộng và trừ từ trái sang phải.',
          `${powText(a, 2)} = ${a} · ${a}.`,
        ],
        steps: [
          `${powText(a, 2)} = ${sq}; ${b} · ${c} = ${b * c}.`,
          `${sq} + ${b * c} − ${d} = ${sq + b * c} − ${d}.`,
          `Kết quả: ${fmt(answer)}.`,
        ],
      };
    }
    if (v === 1) {
      const a = int(rand, 3, 12);
      const x = int(rand, 4, 40);
      const b = int(rand, 5, 60);
      const c = a * x + b;
      return {
        prompt: `Tìm số tự nhiên x, biết: ${a} · x + ${b} = ${fmt(c)}.`,
        answer: whole(x),
        display: fmt(x),
        hints: [
          `Coi ${a} · x là số hạng chưa biết: ${a} · x = ${fmt(c)} − ${b}.`,
          'Sau đó x bằng tích chia cho thừa số đã biết.',
        ],
        steps: [
          `${a} · x = ${fmt(c)} − ${b} = ${fmt(a * x)}.`,
          `x = ${fmt(a * x)} : ${a}.`,
          `x = ${x}.`,
        ],
      };
    }
    const base = pick(rand, [2, 3, 5, 7, 10]);
    const m = int(rand, 2, 9);
    const n = int(rand, 2, 9);
    const division = rand() < 0.5;
    if (division) {
      const top = m + n;
      return {
        prompt: `Viết kết quả phép tính ${powText(base, top)} : ${powText(base, n)} dưới dạng một lũy thừa của ${base}. Số mũ của lũy thừa đó là bao nhiêu?`,
        answer: whole(m),
        display: String(m),
        hints: ['Chia hai lũy thừa cùng cơ số (khác 0): giữ nguyên cơ số và trừ các số mũ.'],
        steps: [
          `${powText(base, top)} : ${powText(base, n)} = ${base}^(${top} − ${n}).`,
          `Số mũ là ${m}.`,
        ],
      };
    }
    return {
      prompt: `Viết kết quả phép tính ${powText(base, m)} · ${powText(base, n)} dưới dạng một lũy thừa của ${base}. Số mũ của lũy thừa đó là bao nhiêu?`,
      answer: whole(m + n),
      display: String(m + n),
      hints: ['Nhân hai lũy thừa cùng cơ số: giữ nguyên cơ số và cộng các số mũ.'],
      steps: [
        `${powText(base, m)} · ${powText(base, n)} = ${base}^(${m} + ${n}).`,
        `Số mũ là ${m + n}.`,
      ],
    };
  },
};

/** Divisor sets for the "lining up leaves the same remainder" problems. */
const ROWS = /** @type {const} */ ([
  [3, 4, 5],
  [4, 5, 6],
  [6, 8, 10],
  [8, 10, 12],
  [10, 12, 15],
  [12, 15, 18],
]);

/** @type {ReviewSkill} */
export const chiaHet = {
  id: 'chia-het',
  label: 'Tính chia hết, ƯCLN, BCNN',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const g = pick(rand, [4, 6, 8, 9, 12, 14, 15, 18]);
      let p = int(rand, 2, 9);
      let q = int(rand, 2, 9);
      while (p === q || gcd(p, q) !== 1) {
        p = int(rand, 2, 9);
        q = int(rand, 2, 9);
      }
      const a = g * p;
      const b = g * q;
      return {
        prompt: `Tìm ƯCLN(${a}, ${b}).`,
        answer: whole(g),
        display: String(g),
        hints: [
          'Phân tích mỗi số ra thừa số nguyên tố.',
          'Chọn các thừa số nguyên tố chung, mỗi thừa số lấy với số mũ nhỏ nhất, rồi nhân lại.',
        ],
        steps: [
          `${a} = ${g} · ${p} và ${b} = ${g} · ${q}, trong đó ${p} và ${q} không có ước chung nào khác 1.`,
          `Vậy ƯCLN(${a}, ${b}) = ${g}.`,
        ],
      };
    }
    if (v === 1) {
      let a = int(rand, 4, 30);
      let b = int(rand, 4, 30);
      while (a === b || a % b === 0 || b % a === 0 || gcd(a, b) === 1) {
        a = int(rand, 4, 30);
        b = int(rand, 4, 30);
      }
      const g = gcd(a, b);
      const l = lcm(a, b);
      return {
        prompt: `Tìm BCNN(${a}, ${b}).`,
        answer: whole(l),
        display: fmt(l),
        hints: [
          'Phân tích mỗi số ra thừa số nguyên tố.',
          'Chọn tất cả các thừa số nguyên tố chung và riêng, mỗi thừa số lấy với số mũ lớn nhất.',
          `Có thể kiểm tra lại: ƯCLN(${a}, ${b}) = ${g} và ƯCLN · BCNN = ${a} · ${b}.`,
        ],
        steps: [
          `ƯCLN(${a}, ${b}) = ${g}.`,
          `BCNN(${a}, ${b}) = ${a} · ${b} : ${g}.`,
          `BCNN(${a}, ${b}) = ${fmt(l)}.`,
        ],
      };
    }
    const rows = pick(rand, ROWS);
    const L = rows.reduce((acc, r) => lcm(acc, r), 1);
    const k = Math.ceil(200 / L) + int(rand, 0, 3);
    const r = int(rand, 1, rows[0] - 1);
    const lo = k * L;
    const hi = (k + 1) * L;
    const n = lo + r;
    return {
      prompt: `Số học sinh khối 6 của một trường trong khoảng từ ${fmt(lo)} đến ${fmt(hi)} em. Khi xếp hàng ${rows.join(', hàng ')} đều thừa ${r} em. Khối 6 có bao nhiêu học sinh?`,
      answer: whole(n),
      display: fmt(n),
      hints: [
        `Bớt đi ${r} em thì số còn lại chia hết cho cả ${rows.join(', ')}.`,
        `Số còn lại là bội chung của ${rows.join(', ')}, tức là bội của BCNN(${rows.join(', ')}).`,
      ],
      steps: [
        `Gọi số học sinh là n. Khi đó n − ${r} chia hết cho ${rows.join(', ')}.`,
        `BCNN(${rows.join(', ')}) = ${L}, nên n − ${r} là một bội của ${L}.`,
        `Trong khoảng đã cho, chỉ có n − ${r} = ${fmt(lo)} thỏa mãn.`,
        `n = ${fmt(lo)} + ${r} = ${fmt(n)}.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const soNguyen = {
  id: 'so-nguyen',
  label: 'Số nguyên',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = -int(rand, 5, 60);
      const b = int(rand, 5, 60);
      const c = int(rand, 5, 40);
      const d = -int(rand, 5, 40);
      const inner = c - d;
      const answer = a + b - inner;
      return {
        prompt: `Tính: ${intText(a)} + ${b} − (${c} − ${term(d)}).`,
        answer: whole(answer),
        display: intText(answer),
        hints: [
          'Khi bỏ dấu ngoặc có dấu "−" đằng trước, ta đổi dấu tất cả các số hạng trong ngoặc.',
          `${c} − ${term(d)} = ${c} + ${-d}.`,
        ],
        steps: [
          `${c} − ${term(d)} = ${c} + ${-d} = ${inner}.`,
          `${intText(a)} + ${b} = ${intText(a + b)}.`,
          `${intText(a + b)} − ${inner} = ${intText(answer)}.`,
        ],
      };
    }
    if (v === 1) {
      const a = -int(rand, 2, 15);
      const b = int(rand, 2, 12);
      const c = -int(rand, 2, 12);
      const d = -int(rand, 2, 12);
      const answer = a * b + c * d;
      return {
        prompt: `Tính: ${term(a)} · ${b} + ${term(c)} · ${term(d)}.`,
        answer: whole(answer),
        display: intText(answer),
        hints: [
          'Tích hai số nguyên khác dấu là số âm; tích hai số nguyên cùng dấu là số dương.',
          'Làm phép nhân trước, phép cộng sau.',
        ],
        steps: [
          `${term(a)} · ${b} = ${intText(a * b)}.`,
          `${term(c)} · ${term(d)} = ${c * d}.`,
          `${intText(a * b)} + ${c * d} = ${intText(answer)}.`,
        ],
      };
    }
    const x = int(rand, -40, 40) || -7;
    const a = (rand() < 0.5 ? -1 : 1) * int(rand, 5, 50);
    const c = x + a;
    return {
      prompt: `Tìm số nguyên x, biết: x + ${term(a)} = ${intText(c)}.`,
      answer: whole(x),
      display: intText(x),
      hints: [
        'Số hạng chưa biết bằng tổng trừ đi số hạng đã biết.',
        'Trừ đi một số nguyên là cộng với số đối của nó.',
      ],
      steps: [
        `x = ${intText(c)} − ${term(a)} = ${intText(c)} + ${term(-a)}.`,
        `x = ${intText(x)}.`,
      ],
    };
  },
};

/**
 * A proper or improper positive fraction with a small denominator.
 * @param {() => number} rand
 */
function smallFraction(rand) {
  const d = pick(rand, [2, 3, 4, 5, 6, 8, 9, 10, 12]);
  let n = int(rand, 1, d + 3);
  while (gcd(n, d) !== 1) n = int(rand, 1, d + 3);
  return fraction(n, d);
}

/** @param {import('./adaptive.js').ReviewQuestion['answer']} f */
const ft = (f) => fracText(f);

/** @type {ReviewSkill} */
export const phanSo = {
  id: 'phan-so',
  label: 'Phân số',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const p = smallFraction(rand);
      let q = smallFraction(rand);
      while (q.d === p.d) q = smallFraction(rand);
      const minus = rand() < 0.5 && p.n * q.d > q.n * p.d;
      const l = lcm(p.d, q.d);
      const pn = p.n * (l / p.d);
      const qn = q.n * (l / q.d);
      const raw = fraction(minus ? pn - qn : pn + qn, l);
      const answer = simplify(raw);
      const op = minus ? '−' : '+';
      return {
        simplest: true,
        prompt: `Tính và viết kết quả dưới dạng phân số tối giản: ${ft(p)} ${op} ${ft(q)}.`,
        answer,
        display: ft(answer),
        hints: [
          `Quy đồng mẫu: mẫu chung nhỏ nhất là BCNN(${p.d}, ${q.d}).`,
          `Mẫu chung là ${l}; viết lại hai phân số với mẫu ${l} rồi ${minus ? 'trừ' : 'cộng'} các tử.`,
        ],
        steps: [
          `Mẫu chung: BCNN(${p.d}, ${q.d}) = ${l}.`,
          `${ft(p)} ${op} ${ft(q)} = ${pn}/${l} ${op} ${qn}/${l} = ${ft(raw)}.`,
          `Rút gọn: ${ft(answer)}.`,
        ],
      };
    }
    if (v === 1) {
      const p = smallFraction(rand);
      const q = smallFraction(rand);
      const divide = rand() < 0.5;
      const raw = divide ? fraction(p.n * q.d, p.d * q.n) : fraction(p.n * q.n, p.d * q.d);
      const answer = simplify(raw);
      return {
        simplest: true,
        prompt: `Tính và viết kết quả dưới dạng phân số tối giản: ${ft(p)} ${divide ? ':' : '·'} ${ft(q)}.`,
        answer,
        display: ft(answer),
        hints: divide
          ? [
              'Muốn chia cho một phân số, ta nhân với phân số nghịch đảo của nó.',
              `Phân số nghịch đảo của ${ft(q)} là ${q.d}/${q.n}.`,
            ]
          : ['Nhân tử với tử, mẫu với mẫu.', 'Rút gọn kết quả (hoặc rút gọn chéo trước khi nhân).'],
        steps: divide
          ? [
              `${ft(p)} : ${ft(q)} = ${ft(p)} · ${q.d}/${q.n} = ${ft(raw)}.`,
              `Rút gọn: ${ft(answer)}.`,
            ]
          : [`${ft(p)} · ${ft(q)} = ${p.n * q.n}/${p.d * q.d}.`, `Rút gọn: ${ft(answer)}.`],
      };
    }
    if (v === 2) {
      const d = pick(rand, [3, 4, 5, 6, 8]);
      let n = int(rand, 1, d - 1);
      while (gcd(n, d) !== 1) n = int(rand, 1, d - 1);
      const total = d * int(rand, 3, 15);
      const answer = (total / d) * n;
      const what = pick(rand, [
        ['Lớp 6A có', 'học sinh', 'số học sinh thích môn Toán', 'học sinh thích môn Toán'],
        ['Một thùng có', 'quả cam', 'số cam đã bán', 'quả cam đã bán'],
        ['Một cuốn sách có', 'trang', 'số trang Lan đã đọc', 'trang Lan đã đọc'],
      ]);
      return {
        prompt: `${what[0]} ${total} ${what[1]}, ${what[2]} bằng ${n}/${d} tổng số. Có bao nhiêu ${what[3]}?`,
        answer: whole(answer),
        display: fmt(answer),
        hints: [`Muốn tìm ${n}/${d} của một số, ta nhân số đó với ${n}/${d}.`],
        steps: [
          `${n}/${d} của ${total} là ${total} · ${n}/${d} = ${total} : ${d} · ${n}.`,
          `= ${total / d} · ${n} = ${answer}.`,
        ],
      };
    }
    const d = pick(rand, [3, 4, 5, 6, 7, 8]);
    let n = int(rand, 1, d - 1);
    while (gcd(n, d) !== 1) n = int(rand, 1, d - 1);
    const total = d * int(rand, 4, 20);
    const part = (total / d) * n;
    return {
      prompt: `Nam đã đọc ${part} trang, bằng ${n}/${d} số trang của cuốn sách. Cuốn sách có bao nhiêu trang?`,
      answer: whole(total),
      display: fmt(total),
      hints: [`Muốn tìm một số biết ${n}/${d} của nó bằng ${part}, ta chia ${part} cho ${n}/${d}.`],
      steps: [
        `Số trang: ${part} : ${n}/${d} = ${part} · ${d}/${n}.`,
        `= ${part / n} · ${d} = ${total}.`,
      ],
    };
  },
};

/**
 * A decimal given in hundredths, written with a comma: 1234 → '12,34'.
 * @param {number} hundredths
 */
export const dec = (hundredths) => formatNumber(hundredths / 100, 2);

/** @type {ReviewSkill} */
export const soThapPhan = {
  id: 'so-thap-phan',
  label: 'Số thập phân, tỉ số phần trăm',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      // Amounts in hundredths keep the arithmetic exact.
      const a = int(rand, 150, 4000);
      const b = int(rand, 150, 4000);
      const c = -int(rand, 50, 2000);
      const sum = a - b + c;
      return {
        prompt: `Tính: ${dec(a)} − ${dec(b)} + (${dec(c)}).`,
        answer: simplify(fraction(sum, 100)),
        display: dec(sum),
        hints: [
          'Cộng với một số âm là trừ đi số đối của nó.',
          'Đặt tính sao cho các chữ số cùng hàng thẳng cột, dấu phẩy thẳng dấu phẩy.',
        ],
        steps: [
          `${dec(a)} − ${dec(b)} = ${dec(a - b)}.`,
          `${dec(a - b)} + (${dec(c)}) = ${dec(a - b)} − ${dec(-c)} = ${dec(sum)}.`,
        ],
      };
    }
    if (v === 1) {
      const a = int(rand, 12, 99); // tenths
      const b = int(rand, 2, 30); // tenths
      const prod = a * b; // hundredths
      return {
        prompt: `Tính: ${formatNumber(a / 10, 1)} · ${formatNumber(b / 10, 1)}.`,
        answer: simplify(fraction(prod, 100)),
        display: dec(prod),
        hints: [
          'Nhân như nhân hai số tự nhiên, rồi đếm số chữ số ở phần thập phân của cả hai thừa số.',
          'Hai thừa số có tất cả hai chữ số ở phần thập phân, nên tích có hai chữ số ở phần thập phân.',
        ],
        steps: [`${a} · ${b} = ${fmt(prod)}.`, `Tách hai chữ số thập phân: ${dec(prod)}.`],
      };
    }
    if (v === 2) {
      const p = pick(rand, [5, 10, 15, 20, 25, 30, 40, 60, 75]);
      const total = 20 * int(rand, 2, 40);
      const answer = (total * p) / 100;
      return {
        prompt: `Một cửa hàng giảm giá ${p}% cho một món hàng giá ${fmt(total)} nghìn đồng. Số tiền được giảm là bao nhiêu nghìn đồng?`,
        answer: simplify(fraction(total * p, 100)),
        display: formatNumber(answer, 2),
        hints: [`${p}% của một số a là a · ${p}/100.`],
        steps: [
          `Số tiền được giảm: ${fmt(total)} · ${p}/100.`,
          `= ${formatNumber(answer, 2)} (nghìn đồng).`,
        ],
      };
    }
    // Rounding to tenths or hundredths, never on a tie so the rule is plain.
    const toTenths = rand() < 0.5;
    const unit = toTenths ? 1000 : 100;
    let x = int(rand, 10001, 99999); // ten-thousandths
    while (x % 10 === 0 || x % unit === unit / 2) x = int(rand, 10001, 99999);
    const rounded = Math.round(x / unit); // in tenths or hundredths
    const places = toTenths ? 1 : 2;
    const text = formatNumber(x / 10000, 4);
    const roundedText = formatFixed(rounded / (toTenths ? 10 : 100), places);
    const nextDigit = Math.floor((x % unit) / (unit / 10));
    return {
      prompt: `Làm tròn số ${text} đến hàng ${toTenths ? 'phần mười' : 'phần trăm'}.`,
      answer: simplify(fraction(rounded, toTenths ? 10 : 100)),
      display: roundedText,
      hints: [
        `Nhìn chữ số ngay bên phải hàng ${toTenths ? 'phần mười' : 'phần trăm'}.`,
        'Chữ số đó nhỏ hơn 5 thì giữ nguyên hàng làm tròn; lớn hơn hoặc bằng 5 thì cộng thêm 1 vào hàng làm tròn.',
      ],
      steps: [
        `Chữ số ngay sau hàng làm tròn là ${nextDigit} ${nextDigit >= 5 ? '≥ 5, nên tăng hàng làm tròn thêm 1' : '< 5, nên giữ nguyên hàng làm tròn'}.`,
        `Kết quả: ${roundedText}.`,
      ],
    };
  },
};

export const NUMBER_SKILLS = [soTuNhien, chiaHet, soNguyen, phanSo, soThapPhan];
