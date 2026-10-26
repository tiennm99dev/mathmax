/**
 * Question generators for the grade 7 year-end review: rational and real
 * numbers, proportions, one-variable polynomials, triangles, solids,
 * statistics and probability. Each skill is one strand of the year; answers
 * are exact values (see `#lib/core/adaptive.js`), so integers, fractions and
 * rounded decimals are all checked exactly.
 */

import { int, pick } from '#lib/core/drill.js';
import { fmt, formatFixed, formatNumber, intText, MINUS, sup } from '#lib/core/number-format.js';
import { fracText, fracOperand } from '#lib/core/fractions.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { add, div, fraction, mul, simplify, sub } from '#lib/fraction-engine/index.js';

/** @typedef {import('#lib/core/adaptive.js').ReviewSkill} ReviewSkill */
/** @typedef {import('#lib/core/adaptive.js').ReviewQuestion} ReviewQuestion */
/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */

/** @param {number} n */
const whole = (n) => fraction(n, 1);

/** @param {Fraction} f */
const text = (f) => fracText(f.n, f.d);

/** @param {Fraction} f */
const operandOf = (f) => fracOperand(f.n, f.d);

/**
 * A nonzero fraction p/q in lowest terms with q > 1.
 * @param {() => number} rand
 * @param {number} maxP
 * @param {number[]} dens
 */
function properFraction(rand, maxP, dens) {
  for (;;) {
    const q = pick(rand, dens);
    const p = int(rand, -maxP, maxP);
    if (p !== 0 && gcd(Math.abs(p), q) === 1) return fraction(p, q);
  }
}

/**
 * A polynomial in x from its coefficients, highest degree first, as the book
 * writes it: [2, −3, 0, 5] → '2x³ − 3x + 5'. Zero terms are left out.
 * @param {number[]} coeffs
 */
export function polyText(coeffs) {
  const deg = coeffs.length - 1;
  let out = '';
  coeffs.forEach((c, i) => {
    if (c === 0) return;
    const power = deg - i;
    const abs = Math.abs(c);
    const body =
      power === 0 ? fmt(abs) : `${abs === 1 ? '' : fmt(abs)}x${power > 1 ? sup(power) : ''}`;
    if (out === '') out = (c < 0 ? MINUS : '') + body;
    else out += ` ${c < 0 ? MINUS : '+'} ${body}`;
  });
  return out === '' ? '0' : out;
}

/**
 * Value of a polynomial (highest degree first) at x.
 * @param {number[]} coeffs
 * @param {number} x
 */
export function polyAt(coeffs, x) {
  return coeffs.reduce((acc, c) => acc * x + c, 0);
}

/** @type {ReviewSkill} */
export const soHuuTi = {
  id: 'so-huu-ti',
  label: 'Số hữu tỉ',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = properFraction(rand, 5, [2, 3, 4, 6]);
      const b = properFraction(rand, 5, [3, 4, 5, 6]);
      const c = properFraction(rand, 4, [2, 3, 5]);
      const quotient = div(b, c);
      const answer = simplify(add(a, quotient));
      return {
        prompt: `Tính: ${text(a)} + ${text(b)} : ${operandOf(c)}. Viết kết quả dưới dạng phân số tối giản.`,
        answer,
        display: text(answer),
        simplest: true,
        hints: [
          'Thứ tự thực hiện: chia trước, cộng sau.',
          'Chia cho một số hữu tỉ là nhân với số nghịch đảo của nó; rồi quy đồng mẫu để cộng.',
        ],
        steps: [
          `${text(b)} : ${operandOf(c)} = ${text(b)} · ${operandOf(fraction(c.d, c.n))} = ${text(quotient)}.`,
          `${text(a)} + ${operandOf(quotient)} = ${text(answer)}.`,
          `Kết quả: ${text(answer)}.`,
        ],
      };
    }
    if (v === 1) {
      const base = properFraction(rand, 3, [2, 3, 4, 5]);
      const r = properFraction(rand, 3, [2, 3, 4, 6]);
      const sq = mul(base, base);
      const answer = simplify(sub(sq, r));
      return {
        prompt: `Tính: (${text(base)})² − ${operandOf(r)}. Viết kết quả dưới dạng phân số tối giản.`,
        answer,
        display: text(answer),
        simplest: true,
        hints: [
          'Lũy thừa trước: bình phương cả tử và mẫu; bình phương của một số âm là số dương.',
          'Trừ một số hữu tỉ là cộng với số đối của nó.',
        ],
        steps: [
          `(${text(base)})² = ${text(sq)}.`,
          `${text(sq)} − ${operandOf(r)} = ${text(answer)}.`,
          `Kết quả: ${text(answer)}.`,
        ],
      };
    }
    for (;;) {
      const a = properFraction(rand, 5, [2, 3, 4]);
      const c = properFraction(rand, 5, [3, 5, 6]);
      const answer = simplify(add(c, a));
      if (answer.d === 1) continue;
      return {
        prompt: `Tìm x, biết: x − ${operandOf(a)} = ${text(c)}. Viết x dưới dạng phân số tối giản.`,
        answer,
        display: text(answer),
        simplest: true,
        hints: [
          'x là số bị trừ: số bị trừ bằng hiệu cộng với số trừ.',
          `x = ${text(c)} + ${operandOf(a)}; quy đồng mẫu rồi cộng.`,
        ],
        steps: [`x = ${text(c)} + ${operandOf(a)}.`, `x = ${text(answer)}.`],
      };
    }
  },
};

/** @type {ReviewSkill} */
export const soThuc = {
  id: 'so-thuc',
  label: 'Số thực, căn bậc hai, giá trị tuyệt đối',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const m = int(rand, 2, 15);
      const n = int(rand, 1, 9);
      const total = m * 10 + n;
      const answer = simplify(fraction(total, 10));
      const display = formatNumber(total / 10, 1);
      const dec = formatNumber((n * n) / 100, 2);
      return {
        prompt: `Tính: √${fmt(m * m)} + √${dec}.`,
        answer,
        display,
        hints: [
          'Căn bậc hai số học của a ≥ 0 là số không âm có bình phương bằng a.',
          `Số nào bình phương bằng ${dec}? Thử 0,${n} · 0,${n}.`,
        ],
        steps: [
          `√${fmt(m * m)} = ${m} vì ${m}² = ${fmt(m * m)}.`,
          `√${dec} = 0,${n} vì 0,${n}² = ${dec}.`,
          `${m} + 0,${n} = ${display}.`,
        ],
      };
    }
    if (v === 1) {
      const a = int(rand, 1, 12) * pick(rand, [1, 1, -1]);
      const b = int(rand, 2, 15);
      const answer = a - b;
      const inner = a > 0 ? `x − ${a}` : `x + ${-a}`;
      return {
        prompt: `Tìm số x nhỏ hơn ${intText(a)}, biết |${inner}| = ${b}.`,
        answer: whole(answer),
        display: intText(answer),
        hints: [
          `|${inner}| = ${b} nên ${inner} = ${b} hoặc ${inner} = ${MINUS}${b}.`,
          `Vì x < ${intText(a)} nên ${inner} là số âm.`,
        ],
        steps: [
          `x < ${intText(a)} nên ${inner} < 0, do đó ${inner} = ${MINUS}${b}.`,
          `x = ${intText(a)} − ${b} = ${intText(answer)}.`,
        ],
      };
    }
    const squares = [4, 9, 16, 25, 36, 49, 64, 81];
    let n = int(rand, 2, 99);
    while (squares.includes(n)) n = int(rand, 2, 99);
    const hundredths = Math.round(Math.sqrt(n) * 100);
    const answer = simplify(fraction(hundredths, 100));
    const display = formatFixed(hundredths / 100, 2);
    return {
      prompt: `Dùng máy tính cầm tay, tính √${n} rồi làm tròn kết quả đến hàng phần trăm.`,
      answer,
      display,
      hints: [
        `√${n} là số vô tỉ: máy tính chỉ hiện một số chữ số đầu của số thập phân vô hạn không tuần hoàn.`,
        'Nhìn chữ số hàng phần nghìn: từ 5 trở lên thì cộng 1 vào hàng phần trăm, nhỏ hơn 5 thì giữ nguyên.',
      ],
      steps: [
        `Máy tính cho √${n} = ${formatNumber(Math.sqrt(n), 5)}...`,
        `Làm tròn đến hàng phần trăm: √${n} ≈ ${display}.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const daiLuongTiLe = {
  id: 'dai-luong-ti-le',
  label: 'Tỉ lệ thức và đại lượng tỉ lệ',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const x = int(rand, 2, 30) * pick(rand, [1, -1]);
      const a = int(rand, 2, 12);
      const t = int(rand, 2, 6);
      const b = x * t;
      const c = a * t;
      return {
        prompt: `Tìm x trong tỉ lệ thức x/${a} = ${intText(b)}/${c}.`,
        answer: whole(x),
        display: intText(x),
        hints: [
          'Trong tỉ lệ thức a/b = c/d, tích trung tỉ bằng tích ngoại tỉ: a · d = b · c.',
          `x · ${c} = ${a} · ${fracOperand(b, 1)}.`,
        ],
        steps: [
          `x · ${c} = ${a} · ${fracOperand(b, 1)} = ${intText(a * b)}.`,
          `x = ${intText(a * b)} : ${c} = ${intText(x)}.`,
        ],
      };
    }
    if (v === 1) {
      const [p, q, r] = pick(rand, [
        [3, 4, 5],
        [2, 3, 4],
        [4, 5, 6],
        [5, 6, 7],
        [2, 3, 5],
      ]);
      const k = int(rand, 3, 12);
      const total = k * (p + q + r);
      const which = int(rand, 0, 2);
      const share = [p, q, r][which];
      const cls = ['7A', '7B', '7C'][which];
      return {
        prompt: `Ba lớp 7A, 7B, 7C trồng được tất cả ${fmt(total)} cây. Số cây của ba lớp tỉ lệ với ${p}; ${q}; ${r}. Lớp ${cls} trồng được bao nhiêu cây?`,
        answer: whole(k * share),
        display: fmt(k * share),
        hints: [
          `Gọi số cây ba lớp là x, y, z thì x/${p} = y/${q} = z/${r} và x + y + z = ${fmt(total)}.`,
          'Áp dụng tính chất của dãy tỉ số bằng nhau: mỗi tỉ số bằng tổng các tử chia cho tổng các mẫu.',
        ],
        steps: [
          `x/${p} = y/${q} = z/${r} = (x + y + z)/(${p} + ${q} + ${r}) = ${fmt(total)}/${p + q + r} = ${k}.`,
          `Lớp ${cls}: ${k} · ${share} = ${fmt(k * share)} (cây).`,
          `Lớp ${cls} trồng được ${fmt(k * share)} cây.`,
        ],
      };
    }
    for (;;) {
      const w2 = int(rand, 3, 24);
      const d2 = int(rand, 3, 30);
      const work = w2 * d2;
      const divisors = [];
      for (let w = 2; w <= 30; w++)
        if (work % w === 0 && w !== w2 && work / w <= 60) divisors.push(w);
      if (!divisors.length) continue;
      const w1 = pick(rand, divisors);
      const d1 = work / w1;
      return {
        prompt: `${w1} công nhân làm xong một công việc trong ${d1} ngày. Hỏi ${w2} công nhân (năng suất như nhau) làm xong công việc đó trong bao nhiêu ngày?`,
        answer: whole(d2),
        display: fmt(d2),
        hints: [
          'Với cùng một công việc, số công nhân và số ngày làm là hai đại lượng tỉ lệ nghịch.',
          'Hai đại lượng tỉ lệ nghịch thì tích của hai giá trị tương ứng không đổi.',
        ],
        steps: [
          `Số công nhân và số ngày tỉ lệ nghịch, nên ${w1} · ${d1} = ${w2} · x.`,
          `x = ${fmt(work)} : ${w2} = ${fmt(d2)}.`,
          `${w2} công nhân làm xong trong ${fmt(d2)} ngày.`,
        ],
      };
    }
  },
};

/** @type {ReviewSkill} */
export const daThuc = {
  id: 'da-thuc',
  label: 'Đa thức một biến',
  make(rand) {
    const v = int(rand, 0, 2);
    const nz = () => int(rand, 1, 6) * pick(rand, [1, -1]);
    if (v === 0) {
      const coeffs = [nz(), int(rand, -6, 6), int(rand, -9, 9)];
      const x = int(rand, -3, 3) || 2;
      const value = polyAt(coeffs, x);
      const [a, b, c] = coeffs;
      const xs = fracOperand(x, 1);
      return {
        prompt: `Tính giá trị của đa thức P(x) = ${polyText(coeffs)} tại x = ${intText(x)}.`,
        answer: whole(value),
        display: intText(value),
        hints: [
          `Thay x = ${intText(x)} vào từng hạng tử; nhớ đặt số âm trong ngoặc.`,
          'Tính lũy thừa trước, rồi nhân, cuối cùng cộng các kết quả.',
        ],
        steps: [
          `P(${intText(x)}) = ${intText(a)} · ${xs}² + ${fracOperand(b, 1)} · ${xs} + ${fracOperand(c, 1)}.`,
          `= ${intText(a * x * x)} + ${fracOperand(b * x, 1)} + ${fracOperand(c, 1)}.`,
          `P(${intText(x)}) = ${intText(value)}.`,
        ],
      };
    }
    if (v === 1) {
      const a = nz();
      const root = int(rand, 1, 9) * pick(rand, [1, -1]);
      const b = -a * root;
      const coeffs = [a, b];
      return {
        prompt: `Tìm nghiệm của đa thức A(x) = ${polyText(coeffs)}.`,
        answer: whole(root),
        display: intText(root),
        hints: [
          'Nghiệm của đa thức là giá trị của x làm cho đa thức có giá trị bằng 0.',
          `Giải ${polyText(coeffs)} = 0.`,
        ],
        steps: [
          `${polyText(coeffs)} = 0 khi ${polyText([a, 0])} = ${intText(-b)}.`,
          `x = ${intText(-b)} : ${fracOperand(a, 1)} = ${intText(root)}.`,
          `Nghiệm của A(x) là x = ${intText(root)}.`,
        ],
      };
    }
    const p = [nz(), int(rand, -6, 6), int(rand, -6, 6), int(rand, -9, 9)];
    const q = [0, nz(), int(rand, -6, 6), int(rand, -9, 9)];
    const minus = rand() < 0.5;
    const power = int(rand, 0, 2);
    const idx = 3 - power;
    const coef = minus ? p[idx] - q[idx] : p[idx] + q[idx];
    const what = power === 0 ? 'hệ số tự do' : `hệ số của x${power > 1 ? sup(power) : ''}`;
    const op = minus ? '−' : '+';
    return {
      prompt: `Cho P(x) = ${polyText(p)} và Q(x) = ${polyText(q.slice(1))}. Tìm ${what} của đa thức P(x) ${op} Q(x).`,
      answer: whole(coef),
      display: intText(coef),
      hints: [
        `Chỉ cần ${minus ? 'trừ' : 'cộng'} các hạng tử cùng bậc.`,
        'Hạng tử không xuất hiện có hệ số bằng 0.',
      ],
      steps: [
        `Trong P(x): ${what} là ${intText(p[idx])}; trong Q(x): ${what} là ${intText(q[idx])}.`,
        `${intText(p[idx])} ${op} ${fracOperand(q[idx], 1)} = ${intText(coef)}.`,
        `${what[0].toUpperCase()}${what.slice(1)} của P(x) ${op} Q(x) là ${intText(coef)}.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const tamGiac = {
  id: 'tam-giac',
  label: 'Tam giác',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = int(rand, 30, 100);
      const b = int(rand, 20, 150 - a);
      const c = 180 - a - b;
      const exterior = rand() < 0.5;
      if (exterior) {
        return {
          prompt: `Tam giác ABC có góc A = ${a}°, góc B = ${b}°. Tính số đo (theo độ) góc ngoài tại đỉnh C.`,
          answer: whole(a + b),
          display: String(a + b),
          hints: [
            'Góc ngoài tại C kề bù với góc C của tam giác.',
            'Mỗi góc ngoài của tam giác bằng tổng hai góc trong không kề với nó.',
          ],
          steps: [
            `Góc C = 180° − ${a}° − ${b}° = ${c}°, góc ngoài tại C = 180° − ${c}°.`,
            `Hay bằng tổng hai góc trong không kề: ${a}° + ${b}° = ${a + b}°.`,
            `Góc ngoài tại C bằng ${a + b}°.`,
          ],
        };
      }
      return {
        prompt: `Tam giác ABC có góc A = ${a}°, góc B = ${b}°. Tính số đo (theo độ) góc C.`,
        answer: whole(c),
        display: String(c),
        hints: ['Tổng ba góc của một tam giác bằng 180°.'],
        steps: [`Góc C = 180° − (${a}° + ${b}°).`, `Góc C = ${c}°.`],
      };
    }
    if (v === 1) {
      const apex = 2 * int(rand, 10, 70);
      const base = (180 - apex) / 2;
      return {
        prompt: `Tam giác ABC cân tại A có góc A = ${apex}°. Tính số đo (theo độ) góc B.`,
        answer: whole(base),
        display: String(base),
        hints: [
          'Trong tam giác cân, hai góc ở đáy bằng nhau: góc B = góc C.',
          'Tổng ba góc của tam giác bằng 180°.',
        ],
        steps: [
          `Góc B + góc C = 180° − ${apex}° = ${180 - apex}°.`,
          `Góc B = góc C, nên góc B = ${180 - apex}° : 2 = ${base}°.`,
        ],
      };
    }
    if (v === 2) {
      const k = int(rand, 2, 12);
      const am = 3 * k;
      const askAG = rand() < 0.5;
      const value = askAG ? 2 * k : k;
      return {
        prompt: `Tam giác ABC có đường trung tuyến AM = ${am} cm và G là trọng tâm. Tính độ dài ${askAG ? 'AG' : 'GM'} (theo cm).`,
        answer: whole(value),
        display: String(value),
        hints: [
          'Trọng tâm là giao điểm ba đường trung tuyến.',
          'Trọng tâm cách mỗi đỉnh một khoảng bằng 2/3 độ dài đường trung tuyến đi qua đỉnh đó.',
        ],
        steps: [
          `AG = 2/3 · AM = 2/3 · ${am} = ${2 * k} (cm).`,
          `GM = AM − AG = ${am} − ${2 * k} = ${k} (cm).`,
          `${askAG ? 'AG' : 'GM'} = ${value} cm.`,
        ],
      };
    }
    const a = int(rand, 2, 8);
    const b = int(rand, a + 1, 15);
    const count = 2 * a - 1;
    return {
      prompt: `Một tam giác có hai cạnh dài ${a} cm và ${b} cm. Độ dài cạnh thứ ba là một số nguyên (cm). Có bao nhiêu giá trị có thể có của độ dài cạnh thứ ba?`,
      answer: whole(count),
      display: String(count),
      hints: [
        'Bất đẳng thức tam giác: mỗi cạnh lớn hơn hiệu và nhỏ hơn tổng hai cạnh kia.',
        `${b} − ${a} < c < ${b} + ${a}; đếm các số nguyên trong khoảng đó.`,
      ],
      steps: [
        `${b - a} < c < ${a + b}.`,
        `c nhận các giá trị nguyên từ ${b - a + 1} đến ${a + b - 1}.`,
        `Có ${a + b - 1} − ${b - a + 1} + 1 = ${count} giá trị.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const hinhKhoi = {
  id: 'hinh-khoi',
  label: 'Hình hộp, lập phương, lăng trụ đứng',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = int(rand, 3, 15);
      const b = int(rand, 2, a);
      const c = int(rand, 2, 10);
      const vol = a * b * c;
      return {
        prompt: `Một hình hộp chữ nhật có chiều dài ${a} cm, chiều rộng ${b} cm và chiều cao ${c} cm. Tính thể tích của nó (theo cm³).`,
        answer: whole(vol),
        display: fmt(vol),
        hints: ['Thể tích hình hộp chữ nhật bằng tích ba kích thước.'],
        steps: [`V = ${a} · ${b} · ${c}.`, `V = ${fmt(vol)} cm³.`],
      };
    }
    if (v === 1) {
      const a = int(rand, 2, 12);
      const sxq = 4 * a * a;
      return {
        prompt: `Một hình lập phương có cạnh ${a} cm. Tính diện tích xung quanh của nó (theo cm²).`,
        answer: whole(sxq),
        display: fmt(sxq),
        hints: [
          'Diện tích xung quanh gồm bốn mặt bên, mỗi mặt là một hình vuông.',
          `Mỗi mặt có diện tích ${a} · ${a} cm².`,
        ],
        steps: [`Mỗi mặt: ${a}² = ${a * a} cm².`, `S xung quanh = 4 · ${a * a} = ${fmt(sxq)} cm².`],
      };
    }
    if (v === 2) {
      const [x, y, z] = pick(rand, [
        [3, 4, 5],
        [5, 5, 6],
        [4, 6, 7],
        [6, 8, 10],
        [5, 12, 13],
        [7, 7, 7],
      ]);
      const h = int(rand, 3, 15);
      const sxq = (x + y + z) * h;
      return {
        prompt: `Một hình lăng trụ đứng tam giác có ba cạnh đáy dài ${x} cm, ${y} cm, ${z} cm và chiều cao ${h} cm. Tính diện tích xung quanh của nó (theo cm²).`,
        answer: whole(sxq),
        display: fmt(sxq),
        hints: ['Diện tích xung quanh của hình lăng trụ đứng bằng chu vi đáy nhân với chiều cao.'],
        steps: [
          `Chu vi đáy: ${x} + ${y} + ${z} = ${x + y + z} (cm).`,
          `S xung quanh = ${x + y + z} · ${h} = ${fmt(sxq)} cm².`,
        ],
      };
    }
    for (;;) {
      const big = int(rand, 4, 14);
      const small = int(rand, 2, big - 1);
      const ht = int(rand, 2, 10);
      if (((big + small) * ht) % 2) continue;
      const base = ((big + small) * ht) / 2;
      const h = int(rand, 3, 15);
      const vol = base * h;
      return {
        prompt: `Một hình lăng trụ đứng có đáy là hình thang với hai đáy ${big} cm, ${small} cm và chiều cao hình thang ${ht} cm; chiều cao lăng trụ là ${h} cm. Tính thể tích lăng trụ (theo cm³).`,
        answer: whole(vol),
        display: fmt(vol),
        hints: [
          'Thể tích hình lăng trụ đứng bằng diện tích đáy nhân với chiều cao.',
          'Diện tích hình thang bằng tổng hai đáy nhân chiều cao rồi chia 2.',
        ],
        steps: [
          `S đáy = (${big} + ${small}) · ${ht} : 2 = ${base} (cm²).`,
          `V = ${base} · ${h} = ${fmt(vol)} cm³.`,
        ],
      };
    }
  },
};

/** @type {ReviewSkill} */
export const thongKe = {
  id: 'thong-ke',
  label: 'Thống kê và biểu đồ',
  make(rand) {
    const v = int(rand, 0, 2);
    const sports = ['bóng đá', 'cầu lông', 'bơi lội', 'bóng rổ', 'cờ vua'];
    if (v === 0) {
      const total = pick(rand, [20, 25, 40, 50, 80]);
      const step = 100 / gcd(total, 100);
      const percent = step * int(rand, 1, Math.floor(60 / step));
      const count = (total * percent) / 100;
      const sport = pick(rand, sports);
      return {
        prompt: `Lớp 7B có ${total} học sinh. Biểu đồ hình quạt tròn cho biết ${percent}% số học sinh thích môn ${sport}. Có bao nhiêu học sinh thích môn ${sport}?`,
        answer: whole(count),
        display: String(count),
        hints: [
          'Mỗi hình quạt biểu diễn tỉ số phần trăm của một phần so với toàn thể.',
          `Tính ${percent}% của ${total}.`,
        ],
        steps: [
          `${total} · ${percent}/100 = ${count}.`,
          `Có ${count} học sinh thích môn ${sport}.`,
        ],
      };
    }
    if (v === 1) {
      const total = pick(rand, [20, 25, 40, 50]);
      const count = int(rand, 1, Math.floor(total * 0.6));
      const percent = (count * 100) / total;
      const sport = pick(rand, sports);
      return {
        prompt: `Trong ${total} học sinh được hỏi có ${count} bạn chọn môn ${sport}. Hình quạt biểu diễn môn ${sport} chiếm bao nhiêu phần trăm hình tròn?`,
        answer: simplify(fraction(count * 100, total)),
        display: formatNumber(percent, 2),
        hints: ['Tỉ số phần trăm của a so với b là a · 100/b (%).'],
        steps: [
          `${count} · 100/${total} = ${formatNumber(percent, 2)}.`,
          `Chiếm ${formatNumber(percent, 2)}%.`,
        ],
      };
    }
    const years = [2019, 2020, 2021, 2022, 2023];
    const values = years.map(() => int(rand, 12, 60));
    if (values.every((x) => x === values[0])) values[0] += 5;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const list = years.map((y, i) => `${y}: ${values[i]}`).join('; ');
    return {
      prompt: `Biểu đồ đoạn thẳng cho số cây xanh trường trồng được mỗi năm (${list}). Năm trồng nhiều nhất hơn năm trồng ít nhất bao nhiêu cây?`,
      answer: whole(max - min),
      display: String(max - min),
      hints: [
        'Điểm cao nhất của đường gấp khúc ứng với năm trồng nhiều nhất, điểm thấp nhất ứng với năm trồng ít nhất.',
      ],
      steps: [
        `Nhiều nhất: ${max} cây; ít nhất: ${min} cây.`,
        `${max} − ${min} = ${max - min}.`,
        `Hơn ${max - min} cây.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const xacSuat = {
  id: 'xac-suat',
  label: 'Biến cố và xác suất',
  make(rand) {
    const v = int(rand, 0, 1);
    if (v === 0) {
      const n = int(rand, 10, 30);
      const k = int(rand, 2, 6);
      const fav = Math.floor(n / k);
      const answer = simplify(fraction(fav, n));
      const multiples =
        fav <= 4
          ? Array.from({ length: fav }, (_, i) => (i + 1) * k).join(', ')
          : `${k}, ${2 * k}, ..., ${fav * k}`;
      return {
        prompt: `Một hộp có ${n} tấm thẻ cùng loại, ghi các số 1, 2, ..., ${n}. Rút ngẫu nhiên một thẻ. Tính xác suất để số trên thẻ chia hết cho ${k} (viết dạng phân số).`,
        answer,
        display: text(answer),
        hints: [
          `Có ${n} kết quả đồng khả năng. Đếm các số từ 1 đến ${n} chia hết cho ${k}.`,
          'Xác suất bằng số kết quả thuận lợi chia cho số kết quả có thể.',
        ],
        steps: [
          `Các số chia hết cho ${k}: ${multiples}, gồm ${fav} số.`,
          answer.d === n
            ? `Xác suất là ${text(answer)}.`
            : `Xác suất là ${fav}/${n} = ${text(answer)}.`,
        ],
      };
    }
    const events = [
      { name: 'là số nguyên tố', fav: [2, 3, 5] },
      { name: 'là số chẵn', fav: [2, 4, 6] },
      { name: 'chia hết cho 3', fav: [3, 6] },
      { name: 'lớn hơn 4', fav: [5, 6] },
      { name: 'nhỏ hơn 7', fav: [1, 2, 3, 4, 5, 6] },
      { name: 'lớn hơn 6', fav: [] },
      { name: 'là số lẻ nhỏ hơn 4', fav: [1, 3] },
      { name: 'khác 6', fav: [1, 2, 3, 4, 5] },
    ];
    const e = pick(rand, events);
    const answer = simplify(fraction(e.fav.length, 6));
    const listed = e.fav.length ? e.fav.join(', ') : 'không có mặt nào';
    return {
      prompt: `Gieo một con xúc xắc cân đối. Tính xác suất của biến cố "Số chấm xuất hiện ${e.name}".`,
      answer,
      display: text(answer),
      hints: [
        'Gieo xúc xắc có 6 kết quả đồng khả năng: 1, 2, 3, 4, 5, 6 chấm.',
        'Biến cố chắc chắn có xác suất 1, biến cố không thể có xác suất 0.',
      ],
      steps: [
        `Các kết quả thuận lợi: ${listed} (${e.fav.length} kết quả).`,
        `Xác suất là ${e.fav.length}/6 = ${text(answer)}.`,
      ],
    };
  },
};

/** Every strand of the year-end review, in book order. */
export const REVIEW_SKILLS = [
  soHuuTi,
  soThuc,
  daiLuongTiLe,
  daThuc,
  tamGiac,
  hinhKhoi,
  thongKe,
  xacSuat,
];
