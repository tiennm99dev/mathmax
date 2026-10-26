/**
 * Question generators for the chapter "Số hữu tỉ", one skill per idea.
 * Answers are numbers: an integer, or a rational carried as its value n/d,
 * so a drill board reads input with `readValue` and writes answers with
 * `valueText` from `rational.js`.
 */

import { int, pick } from '#lib/core/drill.js';
import { add, compare, div, fraction, mul, simplify, sub } from '#lib/fraction-engine/index.js';
import { gcd, lcm } from '#lib/numtheory-engine/index.js';
import { sup } from '#lib/core/number-format.js';
import { bracket, decText, fracText, writtenText } from './rational.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {import('./rational.js').Written} Written */
/** @typedef {import('./rational.js').Fraction} Fraction */

/** Denominators that keep mental arithmetic reasonable. */
const DENS = [2, 3, 4, 5, 6, 8, 9, 10, 12];

/**
 * A non-zero integer from lo to hi.
 * @param {() => number} rand @param {number} lo @param {number} hi
 */
function nonZero(rand, lo, hi) {
  for (;;) {
    const n = int(rand, lo, hi);
    if (n !== 0) return n;
  }
}

/**
 * A lowest-terms fraction, not an integer, with |numerator| up to maxN.
 * @param {() => number} rand @param {number} maxN
 * @returns {Written}
 */
function randFrac(rand, maxN) {
  for (;;) {
    const d = pick(rand, DENS);
    const n = nonZero(rand, -maxN, maxN);
    if (gcd(n, d) === 1) return { f: fraction(n, d), form: 'frac' };
  }
}

/**
 * A decimal with one or two places that is not an integer.
 * @param {() => number} rand @param {number} maxTenths
 * @returns {Written}
 */
function randDec(rand, maxTenths) {
  for (;;) {
    const quarters = rand() < 0.35;
    const n = quarters
      ? nonZero(rand, -Math.floor(maxTenths / 2), Math.floor(maxTenths / 2))
      : nonZero(rand, -maxTenths, maxTenths);
    const f = quarters ? simplify(fraction(n * 25, 100)) : simplify(fraction(n, 10));
    if (f.d !== 1) return { f, form: 'dec' };
  }
}

/**
 * A fraction or a decimal, half the time each.
 * @param {() => number} rand
 */
const randRational = (rand) => (rand() < 0.5 ? randFrac(rand, 11) : randDec(rand, 25));

/** @param {Fraction} f */
const val = (f) => f.n / f.d;

/** @param {number} n */
const intText = (n) => (n < 0 ? `−${-n}` : `${n}`);

/** @param {Fraction} f */
const opd = (f) => bracket(fracText(f));

/**
 * '0,25 = 1/4' when a number is not already written as a fraction in lowest
 * terms, otherwise null.
 * @param {Written} w
 */
function asFraction(w) {
  const s = simplify(w.f);
  const t = writtenText(w);
  if (t === fracText(s)) return null;
  return `${t} = ${fracText(s)}`;
}

/**
 * The step that writes numbers as fractions, if any needs it.
 * @param {Written[]} list
 * @returns {string[]}
 */
function fractionStep(list) {
  const parts = list.map(asFraction).filter((s) => s !== null);
  return parts.length ? [`Viết dưới dạng phân số: ${parts.join('; ')}.`] : [];
}

/**
 * Plain-text worked sum x + y of two lowest-terms fractions.
 * @param {Fraction} x @param {Fraction} y
 */
function sumSteps(x, y) {
  const m = lcm(x.d, y.d);
  const xn = x.n * (m / x.d);
  const yn = y.n * (m / y.d);
  const r = simplify(fraction(xn + yn, m));
  const steps = [];
  if (x.d !== y.d) {
    steps.push(
      `Quy đồng mẫu ${m}: ${opd(x)} + ${opd(y)} = ${fracText(fraction(xn, m))} + ${opd(fraction(yn, m))}.`,
    );
  }
  const raw = fraction(xn + yn, m);
  steps.push(
    `Cộng tử, giữ mẫu: ${fracText(raw)}${raw.n !== r.n || raw.d !== r.d ? ` = ${fracText(r)}` : ''}.`,
  );
  return steps;
}

/** @type {Skill} */
export const tapHopSoHuuTi = {
  id: 'tap-hop-so-huu-ti',
  label: 'Bài 1. Tập hợp các số hữu tỉ',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const w = randRational(rand);
      const o = { f: fraction(-w.f.n, w.f.d), form: w.form };
      return {
        prompt: `Tìm số đối của ${writtenText(w)}.`,
        answer: -val(w.f),
        hints: ['Hai số đối nhau nằm hai phía của điểm 0 và cách đều điểm 0.'],
        steps: [
          'Số đối của a là −a, và −(−a) = a.',
          `Số đối của ${writtenText(w)} là ${writtenText(/** @type {Written} */ (o))}.`,
        ],
      };
    }
    if (v === 1) {
      /** @type {Written[]} */
      const list = [];
      while (list.length < 3) {
        const w = randRational(rand);
        if (list.every((x) => compare(x.f, w.f) !== 0)) list.push(w);
      }
      const big = rand() < 0.5;
      const fr = list.map((w) => simplify(w.f));
      const m = fr.reduce((acc, f) => lcm(acc, f.d), 1);
      const best = fr.reduce((acc, f) =>
        (big ? compare(f, acc) > 0 : compare(f, acc) < 0) ? f : acc,
      );
      return {
        prompt: `Số nào ${big ? 'lớn' : 'nhỏ'} nhất trong ba số ${list.map(writtenText).join('; ')}?`,
        answer: val(best),
        hints: [
          'Số âm luôn nhỏ hơn số dương.',
          `Đưa ba số về phân số có cùng mẫu dương ${m} rồi so sánh tử số.`,
        ],
        steps: [
          ...fractionStep(list),
          `Cùng mẫu ${m}: ${fr.map((f) => fracText(fraction(f.n * (m / f.d), m))).join('; ')}.`,
          `So sánh các tử số: số ${big ? 'lớn' : 'nhỏ'} nhất là ${fracText(best)}.`,
        ],
      };
    }
    if (v === 2) {
      let lo = randFrac(rand, 25);
      let hi = randFrac(rand, 25);
      while (Math.floor(val(hi.f)) - Math.ceil(val(lo.f)) < 1) {
        lo = randFrac(rand, 25);
        hi = randFrac(rand, 25);
      }
      const first = Math.ceil(val(lo.f));
      const last = Math.floor(val(hi.f));
      const count = last - first + 1;
      const list = Array.from({ length: count }, (_, i) => intText(first + i));
      return {
        prompt: `Có bao nhiêu số nguyên x thỏa mãn ${writtenText(lo)} < x < ${writtenText(hi)}?`,
        answer: count,
        hints: [
          'Đổi mỗi phân số ra hỗn số hoặc số thập phân để biết nó nằm giữa hai số nguyên nào.',
        ],
        steps: [
          `${writtenText(lo)} nằm giữa ${intText(first - 1)} và ${intText(first)}; ${writtenText(hi)} nằm giữa ${intText(last)} và ${intText(last + 1)}.`,
          count <= 6
            ? `Các số nguyên x là: ${list.join('; ')}.`
            : `Các số nguyên x là các số từ ${intText(first)} đến ${intText(last)}.`,
          `Có ${intText(last)} − ${bracket(intText(first))} + 1 = ${count} số.`,
        ],
      };
    }
    const w = randDec(rand, 99);
    const s = simplify(w.f);
    const places = s.d === 2 || s.d === 5 || s.d === 10 ? 10 : 100;
    const raw = fraction(Math.round(val(w.f) * places), places);
    const g = gcd(raw.n, places);
    return {
      prompt: `Viết số ${decText(w.f)} dưới dạng phân số tối giản có mẫu dương. Mẫu số của phân số đó là bao nhiêu?`,
      answer: s.d,
      hints: ['Viết số thập phân thành phân số thập phân (mẫu 10 hoặc 100) rồi rút gọn.'],
      steps: [
        `${decText(w.f)} = ${fracText(raw)}.`,
        g === 1
          ? `Phân số ${fracText(raw)} đã tối giản.`
          : `Chia cả tử và mẫu cho ${g}: ${fracText(raw)} = ${fracText(s)}.`,
        `Mẫu số là ${s.d}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const congTruSoHuuTi = {
  id: 'cong-tru-so-huu-ti',
  label: 'Bài 2. Cộng, trừ số hữu tỉ',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v < 2) {
      const a = rand() < 0.5 ? randDec(rand, 25) : randFrac(rand, 11);
      const b = randFrac(rand, 11);
      const minus = v === 1;
      const x = simplify(a.f);
      const y = simplify(b.f);
      const y2 = minus ? fraction(-y.n, y.d) : y;
      const r = add(x, y2);
      return {
        prompt: `Tính ${writtenText(a)} ${minus ? '−' : '+'} ${bracket(writtenText(b))}.`,
        answer: val(r),
        steps: [
          ...fractionStep([a]),
          ...(minus
            ? [`Trừ là cộng với số đối: ${opd(x)} − ${opd(y)} = ${opd(x)} + ${opd(y2)}.`]
            : []),
          ...sumSteps(x, y2),
        ],
      };
    }
    // a − (a − c): the bracket rule makes it c.
    const a = randFrac(rand, 9);
    let c = randFrac(rand, 9);
    while (c.f.d === a.f.d) c = randFrac(rand, 9);
    const r = sub(a.f, sub(a.f, c.f));
    return {
      prompt: `Tính một cách hợp lí: ${fracText(a.f)} − (${fracText(a.f)} − ${bracket(fracText(c.f))}).`,
      answer: val(r),
      hints: ['Bỏ ngoặc có dấu "−" đằng trước thì đổi dấu mọi số hạng trong ngoặc.'],
      steps: [
        `Bỏ ngoặc: ${fracText(a.f)} − ${opd(a.f)} + ${opd(c.f)}.`,
        `${fracText(a.f)} − ${opd(a.f)} = 0, nên kết quả là ${fracText(c.f)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const nhanChiaSoHuuTi = {
  id: 'nhan-chia-so-huu-ti',
  label: 'Bài 2. Nhân, chia số hữu tỉ',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 2) {
      const w = randRational(rand);
      const s = simplify(w.f);
      const r = fraction(s.d, s.n);
      return {
        prompt: `Tìm số nghịch đảo của ${writtenText(w)}.`,
        answer: val(r),
        hints: ['Hai số nghịch đảo của nhau có tích bằng 1.', 'Số nghịch đảo của a/b là b/a.'],
        steps: [...fractionStep([w]), `Số nghịch đảo của ${fracText(s)} là ${fracText(r)}.`],
      };
    }
    const a = rand() < 0.5 ? randDec(rand, 25) : randFrac(rand, 11);
    const b = randFrac(rand, 11);
    const x = simplify(a.f);
    const y = simplify(b.f);
    const divide = v === 1;
    const y2 = divide ? fraction(y.d, y.n) : y;
    const raw = fraction(x.n * y2.n, x.d * y2.d);
    const r = divide ? div(x, y) : mul(x, y);
    return {
      prompt: `Tính ${writtenText(a)} ${divide ? ':' : '·'} ${bracket(writtenText(b))}.`,
      answer: val(r),
      hints: divide
        ? ['Chia cho một số là nhân với số nghịch đảo của số đó.']
        : ['Nhân tử với tử, mẫu với mẫu; xét dấu trước.'],
      steps: [
        ...fractionStep([a]),
        ...(divide
          ? [`Chia là nhân với số nghịch đảo: ${opd(x)} : ${opd(y)} = ${opd(x)} · ${opd(y2)}.`]
          : []),
        `${opd(x)} · ${opd(y2)} = ${fracText(raw)}${raw.n !== r.n || raw.d !== r.d ? ` = ${fracText(r)}` : ''}.`,
      ],
    };
  },
};

/**
 * x^k of a fraction, exact and not reduced further than its base.
 * @param {Fraction} f @param {number} k
 */
const powF = (f, k) => fraction(f.n ** k, f.d ** k);

/**
 * A number written as the base of a power: positive integers stand alone
 * (3⁴), everything else goes in brackets: (−2/3)³, (0,5)², (−2)⁴.
 * @param {Written} w
 */
function baseText(w) {
  const t = writtenText(w);
  return w.form === 'int' && w.f.n > 0 ? t : `(${t})`;
}

/** Decimal bases whose small powers are easy to work out by hand. */
const DEC_BASES = [5, -5, 2, -2, 3, -3, 1, -1, 12, -12, 15, -15];

/** @type {Skill} */
export const tinhLuyThua = {
  id: 'tinh-luy-thua',
  label: 'Bài 3. Tính lũy thừa',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      let w = randFrac(rand, 5);
      while (w.f.d > 5) w = randFrac(rand, 5);
      const small = Math.abs(w.f.n) <= 3 && w.f.d <= 3;
      const k = int(rand, 2, small ? 4 : 3);
      const r = powF(w.f, k);
      const num = w.f.n < 0 ? `(${intText(w.f.n)})` : `${w.f.n}`;
      return {
        prompt: `Tính ${baseText(w)}${sup(k)}.`,
        answer: val(r),
        hints: [
          'Lũy thừa của một thương: (a/b)ⁿ = aⁿ/bⁿ.',
          w.f.n < 0
            ? `Cơ số âm, số mũ ${k} là số ${k % 2 === 0 ? 'chẵn' : 'lẻ'}, nên kết quả ${k % 2 === 0 ? 'dương' : 'âm'}.`
            : 'Cơ số dương nên kết quả dương.',
        ],
        steps: [
          `${baseText(w)}${sup(k)} = ${num}${sup(k)}/${w.f.d}${sup(k)}.`,
          `= ${fracText(r)}.`,
        ],
      };
    }
    if (v === 1) {
      const tenths = pick(rand, DEC_BASES);
      const f = simplify(fraction(tenths, 10));
      const w = /** @type {Written} */ ({ f, form: 'dec' });
      const k = Math.abs(tenths) >= 12 ? 2 : int(rand, 2, Math.abs(tenths) === 3 ? 3 : 4);
      const r = powF(f, k);
      const factors = Array.from({ length: k }, () => baseText(w)).join(' · ');
      return {
        prompt: `Tính ${baseText(w)}${sup(k)}.`,
        answer: val(r),
        hints: [
          `${baseText(w)}${sup(k)} là tích của ${k} thừa số bằng ${writtenText(w)}.`,
          f.n < 0
            ? 'Lũy thừa bậc chẵn của số âm là số dương, bậc lẻ là số âm.'
            : 'Đếm số chữ số thập phân: mỗi thừa số góp thêm các chữ số thập phân của nó.',
        ],
        steps: [`${baseText(w)}${sup(k)} = ${factors}.`, `= ${decText(r)}.`],
      };
    }
    // x^n · y^n = (x · y)^n with a product that is a small integer.
    const [xn, xd, y, p] = pick(rand, [
      [1, 2, 2, 1],
      [1, 4, 4, 1],
      [1, 8, 8, 1],
      [1, 5, 5, 1],
      [-1, 2, 4, -2],
      [1, 2, 6, 3],
      [-1, 4, 8, -2],
      [2, 5, 5, 2],
      [-1, 5, 10, -2],
      [1, 4, 12, 3],
    ]);
    const x = /** @type {Written} */ ({ f: fraction(xn, xd), form: 'dec' });
    const k =
      Math.abs(p) === 1 ? int(rand, 3, 9) : Math.abs(p) === 2 ? int(rand, 2, 5) : int(rand, 2, 4);
    const r = p ** k;
    return {
      prompt: `Tính nhanh ${baseText(x)}${sup(k)} · ${y}${sup(k)}.`,
      answer: r,
      hints: ['Hai lũy thừa cùng số mũ: xⁿ · yⁿ = (x · y)ⁿ.'],
      steps: [
        `${baseText(x)}${sup(k)} · ${y}${sup(k)} = (${writtenText(x)} · ${y})${sup(k)}.`,
        `${writtenText(x)} · ${y} = ${intText(p)}, nên kết quả là ${bracket(intText(p))}${sup(k)} = ${intText(r)}.`,
      ],
    };
  },
};

/** Bases for the exponent rules: never 0, 1 or −1, so the exponent is unique. */
const RULE_BASES = /** @type {Written[]} */ ([
  { f: fraction(-2, 3), form: 'frac' },
  { f: fraction(3, 5), form: 'frac' },
  { f: fraction(-1, 2), form: 'frac' },
  { f: fraction(5, 4), form: 'frac' },
  { f: fraction(-7, 3), form: 'frac' },
  { f: fraction(1, 2), form: 'dec' },
  { f: fraction(-3, 10), form: 'dec' },
  { f: fraction(6, 5), form: 'dec' },
  { f: fraction(-2, 1), form: 'int' },
  { f: fraction(3, 1), form: 'int' },
]);

/** @type {Skill} */
export const quyTacLuyThua = {
  id: 'quy-tac-luy-thua',
  label: 'Bài 3. Quy tắc lũy thừa',
  make(rand) {
    const w = pick(rand, RULE_BASES);
    const b = baseText(w);
    /** @param {number} m @param {number} n */
    const powPow = (m, n) =>
      b.startsWith('(') ? `[${b}${sup(m)}]${sup(n)}` : `(${b}${sup(m)})${sup(n)}`;
    const v = int(rand, 0, 4);
    const rules = {
      nhan: 'Nhân hai lũy thừa cùng cơ số: giữ nguyên cơ số, cộng các số mũ.',
      chia: 'Chia hai lũy thừa cùng cơ số: giữ nguyên cơ số, lấy số mũ của số bị chia trừ số mũ của số chia.',
      luyThua: 'Lũy thừa của lũy thừa: giữ nguyên cơ số, nhân hai số mũ.',
    };
    let expr;
    let k;
    /** @type {string[]} */
    let steps;
    /** @type {string[]} */
    let hints;
    if (v === 0) {
      const m = int(rand, 2, 9);
      const n = int(rand, 2, 9);
      k = m + n;
      expr = `${b}${sup(m)} · ${b}${sup(n)}`;
      hints = [rules.nhan];
      steps = [`Giữ nguyên cơ số, cộng số mũ: ${m} + ${n} = ${k}.`, `${expr} = ${b}${sup(k)}.`];
    } else if (v === 1) {
      const n = int(rand, 2, 7);
      const m = n + int(rand, 1, 8);
      k = m - n;
      expr = `${b}${sup(m)} : ${b}${sup(n)}`;
      hints = [rules.chia];
      steps = [`Giữ nguyên cơ số, trừ số mũ: ${m} − ${n} = ${k}.`, `${expr} = ${b}${sup(k)}.`];
    } else if (v === 2) {
      const m = int(rand, 2, 5);
      const n = int(rand, 2, 4);
      k = m * n;
      expr = powPow(m, n);
      hints = [rules.luyThua];
      steps = [`Giữ nguyên cơ số, nhân hai số mũ: ${m} · ${n} = ${k}.`, `${expr} = ${b}${sup(k)}.`];
    } else if (v === 3) {
      const m = int(rand, 2, 8);
      const n = int(rand, 2, 8);
      const c = int(rand, 1, m + n - 2);
      k = m + n - c;
      expr = `${b}${sup(m)} · ${b}${sup(n)} : ${b}${sup(c)}`;
      hints = ['Làm từ trái sang phải: nhân trước rồi chia.', rules.nhan, rules.chia];
      steps = [
        `${b}${sup(m)} · ${b}${sup(n)} = ${b}${sup(m + n)}.`,
        `${b}${sup(m + n)} : ${b}${sup(c)} = ${b}${sup(k)}.`,
        `Số mũ là ${m} + ${n} − ${c} = ${k}.`,
      ];
    } else {
      const m = int(rand, 2, 4);
      const n = int(rand, 2, 3);
      const c = int(rand, 1, m * n - 2);
      k = m * n - c;
      expr = `${powPow(m, n)} : ${b}${sup(c)}`;
      hints = [rules.luyThua, rules.chia];
      steps = [
        `${powPow(m, n)} = ${b}${sup(m * n)}.`,
        `${b}${sup(m * n)} : ${b}${sup(c)} = ${b}${sup(k)}.`,
        `Số mũ là ${m} · ${n} − ${c} = ${k}.`,
      ];
    }
    return {
      prompt: `Viết ${expr} dưới dạng một lũy thừa của ${writtenText(w)}. Số mũ của lũy thừa đó bằng bao nhiêu?`,
      answer: k,
      hints,
      steps,
    };
  },
};

/** Small denominators for multi-step expressions and equations. */
const SMALL_DENS = [2, 3, 4, 5, 6];

/**
 * A lowest-terms fraction with a small denominator, not an integer.
 * @param {() => number} rand @param {number} maxN
 * @returns {Written}
 */
function smallFrac(rand, maxN) {
  for (;;) {
    const d = pick(rand, SMALL_DENS);
    const n = nonZero(rand, -maxN, maxN);
    if (gcd(n, d) === 1) return { f: fraction(n, d), form: 'frac' };
  }
}

/**
 * A decimal with one place (or a quarter) that is not an integer.
 * @param {() => number} rand
 * @returns {Written}
 */
function smallDec(rand) {
  const quarters = rand() < 0.3;
  for (;;) {
    const f = quarters
      ? simplify(fraction(nonZero(rand, -7, 7) * 25, 100))
      : simplify(fraction(nonZero(rand, -30, 30), 10));
    if (f.d !== 1) return { f, form: 'dec' };
  }
}

/** @param {() => number} rand */
const smallRational = (rand) => (rand() < 0.6 ? smallFrac(rand, 7) : smallDec(rand));

/** @param {Written} w */
const opdW = (w) => bracket(writtenText(w));

/** @type {Skill} */
export const thuTuPhepTinh = {
  id: 'thu-tu-phep-tinh',
  label: 'Bài 4. Thứ tự thực hiện các phép tính',
  make(rand) {
    const v = int(rand, 0, 3);
    const a = smallRational(rand);
    const b = smallRational(rand);
    const c = smallRational(rand);
    const [x, y, z] = [a, b, c].map((w) => simplify(w.f));
    const conv = fractionStep([a, b, c]);
    if (v === 0) {
      const minus = rand() < 0.5;
      const p = mul(y, z);
      const r = minus ? sub(x, p) : add(x, p);
      const op = minus ? '−' : '+';
      return {
        prompt: `Tính ${writtenText(a)} ${op} ${opdW(b)} · ${opdW(c)}.`,
        answer: val(r),
        hints: ['Không có ngoặc: nhân, chia trước; cộng, trừ sau.'],
        steps: [
          ...conv,
          `Nhân trước: ${opd(y)} · ${opd(z)} = ${fracText(p)}.`,
          `${op === '+' ? 'Cộng' : 'Trừ'} sau: ${fracText(x)} ${op} ${opd(p)} = ${fracText(r)}.`,
        ],
      };
    }
    if (v === 1) {
      const minus = rand() < 0.5;
      const q = div(y, z);
      const r = minus ? sub(x, q) : add(x, q);
      const op = minus ? '−' : '+';
      return {
        prompt: `Tính ${writtenText(a)} ${op} ${opdW(b)} : ${opdW(c)}.`,
        answer: val(r),
        hints: ['Phép chia được làm trước phép cộng, trừ.'],
        steps: [
          ...conv,
          `Chia trước: ${opd(y)} : ${opd(z)} = ${opd(y)} · ${opd(fraction(z.d, z.n))} = ${fracText(q)}.`,
          `${op === '+' ? 'Cộng' : 'Trừ'} sau: ${fracText(x)} ${op} ${opd(q)} = ${fracText(r)}.`,
        ],
      };
    }
    if (v === 2) {
      const minus = rand() < 0.5;
      const divide = rand() < 0.5;
      const s = minus ? sub(x, y) : add(x, y);
      const r = divide ? div(s, z) : mul(s, z);
      const op = minus ? '−' : '+';
      const op2 = divide ? ':' : '·';
      return {
        prompt: `Tính (${writtenText(a)} ${op} ${opdW(b)}) ${op2} ${opdW(c)}.`,
        answer: val(r),
        hints: ['Có dấu ngoặc: làm trong ngoặc trước.'],
        steps: [
          ...conv,
          `Trong ngoặc: ${fracText(x)} ${op} ${opd(y)} = ${fracText(s)}.`,
          `${divide ? 'Chia' : 'Nhân'}: ${opd(s)} ${op2} ${opd(z)} = ${fracText(r)}.`,
        ],
      };
    }
    // a · b² ± c with a base that squares or cubes easily.
    const base = pick(
      rand,
      /** @type {Written[]} */ ([
        { f: fraction(-1, 2), form: 'frac' },
        { f: fraction(2, 3), form: 'frac' },
        { f: fraction(-2, 3), form: 'frac' },
        { f: fraction(3, 2), form: 'frac' },
        { f: fraction(-1, 2), form: 'dec' },
        { f: fraction(-1, 1), form: 'int' },
        { f: fraction(2, 1), form: 'int' },
        { f: fraction(-2, 1), form: 'int' },
      ]),
    );
    const k = Math.abs(base.f.n) === 1 && base.f.d === 1 ? int(rand, 3, 5) : int(rand, 2, 3);
    const pk = powF(base.f, k);
    const t = mul(x, pk);
    const minus = rand() < 0.5;
    const r = minus ? sub(t, z) : add(t, z);
    const op = minus ? '−' : '+';
    return {
      prompt: `Tính ${writtenText(a)} · ${baseText(base)}${sup(k)} ${op} ${opdW(c)}.`,
      answer: val(r),
      hints: ['Thứ tự: lũy thừa → nhân và chia → cộng và trừ.'],
      steps: [
        ...fractionStep([a, base, c]),
        `Lũy thừa trước: ${baseText(base)}${sup(k)} = ${fracText(pk)}.`,
        `Nhân: ${fracText(x)} · ${opd(pk)} = ${fracText(t)}.`,
        `${op === '+' ? 'Cộng' : 'Trừ'}: ${fracText(t)} ${op} ${opd(z)} = ${fracText(r)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const quyTacChuyenVe = {
  id: 'quy-tac-chuyen-ve',
  label: 'Bài 4. Quy tắc chuyển vế, tìm x',
  make(rand) {
    const v = int(rand, 0, 4);
    let a = smallRational(rand);
    const b = smallRational(rand);
    const conv = fractionStep([a, b]);
    const hint = 'Chuyển một số hạng sang vế kia thì phải đổi dấu số hạng đó.';
    if (v <= 1) {
      // x + a = b or x − a = b, with a positive.
      a = { f: fraction(Math.abs(a.f.n), a.f.d), form: a.form };
      const x = simplify(a.f);
      const y = simplify(b.f);
      const plus = v === 0;
      const r = plus ? sub(y, x) : add(y, x);
      const sign = plus ? '+' : '−';
      const back = plus ? '−' : '+';
      return {
        prompt: `Tìm x, biết: x ${sign} ${writtenText(a)} = ${writtenText(b)}.`,
        answer: val(r),
        hints: [hint],
        steps: [
          ...fractionStep([a, b]),
          `Chuyển ${sign}${fracText(x)} sang vế phải thành ${back}${fracText(x)}: x = ${fracText(y)} ${back} ${fracText(x)}.`,
          `x = ${fracText(r)}.`,
        ],
      };
    }
    const x = simplify(a.f);
    const y = simplify(b.f);
    if (v === 2) {
      // a − x = b gives x = a − b.
      const r = sub(x, y);
      return {
        prompt: `Tìm x, biết: ${writtenText(a)} − x = ${writtenText(b)}.`,
        answer: val(r),
        hints: [hint, 'Chuyển −x sang vế phải thành +x, chuyển số ở vế phải sang vế trái.'],
        steps: [...conv, `Chuyển vế: ${fracText(x)} − ${opd(y)} = x.`, `x = ${fracText(r)}.`],
      };
    }
    const k = int(rand, 2, 6);
    if (v === 3) {
      // k·x + a = b gives k·x = b − a.
      const plus = rand() < 0.5;
      const xa = fraction(Math.abs(x.n), x.d);
      const aw = /** @type {Written} */ ({ f: fraction(Math.abs(a.f.n), a.f.d), form: a.form });
      const kx = plus ? sub(y, xa) : add(y, xa);
      const r = div(kx, fraction(k, 1));
      const sign = plus ? '+' : '−';
      const back = plus ? '−' : '+';
      return {
        prompt: `Tìm x, biết: ${k}x ${sign} ${writtenText(aw)} = ${writtenText(b)}.`,
        answer: val(r),
        hints: [hint, `Tìm ${k}x trước, rồi chia cho ${k}.`],
        steps: [
          ...fractionStep([aw, b]),
          `Chuyển vế: ${k}x = ${fracText(y)} ${back} ${fracText(xa)} = ${fracText(kx)}.`,
          `x = ${opd(kx)} : ${k} = ${fracText(r)}.`,
        ],
      };
    }
    // a − k·x = b gives k·x = a − b.
    const kx = sub(x, y);
    const r = div(kx, fraction(k, 1));
    return {
      prompt: `Tìm x, biết: ${writtenText(a)} − ${k}x = ${writtenText(b)}.`,
      answer: val(r),
      hints: [
        hint,
        `Đưa ${k}x sang vế phải, ${writtenText(b)} sang vế trái, tìm ${k}x rồi chia cho ${k}.`,
      ],
      steps: [
        ...conv,
        `Chuyển vế: ${fracText(x)} − ${opd(y)} = ${k}x, nên ${k}x = ${fracText(kx)}.`,
        `x = ${opd(kx)} : ${k} = ${fracText(r)}.`,
      ],
    };
  },
};

/** The skills of "Luyện tập chung" after Bài 1 and Bài 2. */
export const PAGE_14_SKILLS = [tapHopSoHuuTi, congTruSoHuuTi, nhanChiaSoHuuTi];

/** The skills of "Luyện tập chung" after Bài 3 and Bài 4. */
export const PAGE_23_SKILLS = [tinhLuyThua, quyTacLuyThua, thuTuPhepTinh, quyTacChuyenVe];

/** Every skill of the chapter, one or two per lesson, for the chapter review. */
export const CHAPTER_SKILLS = [...PAGE_14_SKILLS, ...PAGE_23_SKILLS];
