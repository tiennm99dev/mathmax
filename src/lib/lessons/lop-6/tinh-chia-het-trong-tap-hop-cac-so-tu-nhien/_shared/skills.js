/**
 * Question generators for the chapter "Tính chia hết trong tập hợp các số tự
 * nhiên", one skill per lesson. Every question has a natural-number answer
 * and a worked solution in plain text; the practice and review lessons draw
 * their generated sets from these.
 */

import { gcd, isPrime, lcm } from '#lib/numtheory-engine/index.js';
import { int, pick } from './drill.js';
import { divisorsOf, factorText, factorize, gcdFactors, lcmFactors } from './divisibility.js';
import { fmt } from './format.js';

/** @typedef {import('./drill.js').Skill} Skill */

/**
 * A set written the book's way: {1; 2; 3}.
 * @param {number[]} items
 */
const setText = (items) => `{${items.map(fmt).join('; ')}}`;

/** @type {Skill} */
export const quanHeChiaHet = {
  id: 'quan-he-chia-het',
  label: 'Bài 8. Quan hệ chia hết',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const n = pick(rand, [12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 60, 72]);
      const ds = divisorsOf(n);
      return {
        prompt: `Số ${n} có bao nhiêu ước?`,
        answer: ds.length,
        steps: [
          `Chia ${n} lần lượt cho 1, 2, 3, …, ${n} và giữ lại các số chia hết.`,
          `Ư(${n}) = ${setText(ds)}.`,
          `Vậy ${n} có ${ds.length} ước.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 3, 12);
      const lo = int(rand, 5, 40);
      const hi = lo + int(rand, 20, 60);
      /** @type {number[]} */
      const ms = [];
      for (let x = lo + 1; x < hi; x++) if (x % k === 0) ms.push(x);
      return {
        prompt: `Có bao nhiêu bội của ${k} lớn hơn ${lo} và nhỏ hơn ${hi}?`,
        answer: ms.length,
        steps: [
          `Các bội của ${k} là ${k} · 0, ${k} · 1, ${k} · 2, …`,
          ms.length
            ? `Các bội lớn hơn ${lo} và nhỏ hơn ${hi} là ${ms.join('; ')}.`
            : `Không có bội nào của ${k} lớn hơn ${lo} và nhỏ hơn ${hi}.`,
          `Vậy có ${ms.length} bội.`,
        ],
      };
    }
    const k = int(rand, 6, 19);
    const limit = pick(rand, [100, 200, 500, 1000]);
    const q = Math.floor((limit - 1) / k);
    return {
      prompt: `Tìm số tự nhiên x lớn nhất sao cho x ∈ B(${k}) và x < ${fmt(limit)}.`,
      answer: k * q,
      steps: [
        `x là bội của ${k}, tức x = ${k} · q với q là số tự nhiên.`,
        `${k} · ${q} = ${fmt(k * q)} < ${fmt(limit)}, còn ${k} · ${q + 1} = ${fmt(k * (q + 1))} ≥ ${fmt(limit)}.`,
        `Vậy x = ${fmt(k * q)}.`,
      ],
    };
  },
};

/**
 * Every digit that can replace the star so that the number divides by all
 * of `by`. `pattern` holds the digits, with null where the star is.
 * @param {Array<number | null>} pattern
 * @param {number[]} by
 */
export function starDigits(pattern, by) {
  /** @type {number[]} */
  const out = [];
  for (let d = 0; d <= 9; d++) {
    if (d === 0 && pattern[0] === null) continue;
    const n = Number(pattern.map((x) => (x === null ? d : x)).join(''));
    if (by.every((m) => n % m === 0)) out.push(d);
  }
  return out;
}

/** @param {Array<number | null>} pattern */
const patternText = (pattern) => pattern.map((x) => (x === null ? '*' : String(x))).join('');

/** @type {Skill} */
export const dauHieuChiaHet = {
  id: 'dau-hieu-chia-het',
  label: 'Bài 9. Dấu hiệu chia hết',
  make(rand) {
    for (;;) {
      const len = int(rand, 3, 4);
      /** @type {Array<number | null>} */
      const pattern = Array.from({ length: len }, (_, i) => int(rand, i === 0 ? 1 : 0, 9));
      const v = int(rand, 0, 2);
      if (v === 0) {
        // Star in the middle, divisible by 9: always solvable, asked for the largest digit.
        pattern[int(rand, 1, len - 2)] = null;
        const ds = starDigits(pattern, [9]);
        if (ds.length === 0) continue;
        const known = pattern.filter((x) => x !== null).reduce((s, x) => s + x, 0);
        const best = ds[ds.length - 1];
        return {
          prompt: `Thay dấu * bởi chữ số lớn nhất để số ${patternText(pattern)} chia hết cho 9. Chữ số đó là bao nhiêu?`,
          answer: best,
          steps: [
            `Tổng các chữ số là ${known} + *. Số chia hết cho 9 khi tổng này chia hết cho 9.`,
            `Với * từ 0 đến 9, các giá trị thỏa mãn là ${ds.join(', ')}.`,
            `Chữ số lớn nhất là ${best}; khi đó tổng các chữ số là ${known + best}.`,
          ],
        };
      }
      if (v === 1) {
        // Star anywhere but the last digit, divisible by 3: count the digits.
        pattern[int(rand, 0, len - 2)] = null;
        const ds = starDigits(pattern, [3]);
        const known = pattern.filter((x) => x !== null).reduce((s, x) => s + x, 0);
        return {
          prompt: `Có bao nhiêu chữ số có thể thay cho dấu * để số ${patternText(pattern)} chia hết cho 3?`,
          answer: ds.length,
          steps: [
            `Tổng các chữ số là ${known} + *; số chia hết cho 3 khi tổng này chia hết cho 3.`,
            pattern[0] === null ? 'Chữ số đầu tiên phải khác 0.' : 'Thử * lần lượt từ 0 đến 9.',
            `Các chữ số thỏa mãn: ${ds.join(', ')}. Có ${ds.length} chữ số.`,
          ],
        };
      }
      // Last digit is the star: divisible by 2, 5 and 3, or by 5 and 9.
      pattern[len - 1] = null;
      const by = pick(rand, [
        [2, 5, 3],
        [5, 9],
        [2, 9],
      ]);
      const ds = starDigits(pattern, by);
      if (ds.length !== 1) continue;
      const known = pattern.filter((x) => x !== null).reduce((s, x) => s + x, 0);
      const tail = by.includes(5) ? (by.includes(2) ? '0' : '0 hoặc 5') : '0, 2, 4, 6 hoặc 8';
      const sumBy = by.includes(9) ? 9 : 3;
      return {
        prompt: `Thay dấu * bởi một chữ số để số ${patternText(pattern)} chia hết cho cả ${by.slice(0, -1).join(', ')} và ${by[by.length - 1]}. Chữ số đó là bao nhiêu?`,
        answer: ds[0],
        steps: [
          `Chữ số tận cùng * phải là ${tail}.`,
          `Tổng các chữ số ${known} + * phải chia hết cho ${sumBy}.`,
          `Chỉ * = ${ds[0]} thỏa mãn cả hai điều kiện: ${known} + ${ds[0]} = ${known + ds[0]}.`,
        ],
      };
    }
  },
};

/** @type {Skill} */
export const soNguyenTo = {
  id: 'so-nguyen-to',
  label: 'Bài 10. Số nguyên tố',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const lo = int(rand, 1, 60);
      const hi = lo + int(rand, 10, 25);
      /** @type {number[]} */
      const ps = [];
      for (let x = lo + 1; x < hi; x++) if (isPrime(x)) ps.push(x);
      return {
        prompt: `Có bao nhiêu số nguyên tố lớn hơn ${lo} và nhỏ hơn ${hi}?`,
        answer: ps.length,
        steps: [
          'Số nguyên tố là số lớn hơn 1, chỉ có hai ước là 1 và chính nó.',
          ps.length
            ? `Các số nguyên tố cần tìm: ${ps.join('; ')}.`
            : 'Không có số nguyên tố nào trong khoảng này.',
          `Vậy có ${ps.length} số.`,
        ],
      };
    }
    const n = pick(
      rand,
      [60, 72, 84, 90, 96, 108, 120, 126, 132, 144, 150, 168, 180, 196, 220, 252, 280, 300, 360],
    );
    const fs = factorize(n);
    if (v === 1) {
      const [p, e] = pick(rand, fs);
      return {
        prompt: `Phân tích ${n} ra thừa số nguyên tố. Số mũ của thừa số ${p} là bao nhiêu?`,
        answer: e,
        steps: [
          'Chia liên tiếp cho các số nguyên tố từ nhỏ đến lớn: 2, 3, 5, 7, …',
          `${n} = ${factorText(fs)}.`,
          `Thừa số ${p} có số mũ ${e}.`,
        ],
      };
    }
    const largest = fs[fs.length - 1][0];
    return {
      prompt: `Ước nguyên tố lớn nhất của ${n} là số nào?`,
      answer: largest,
      steps: [
        `Phân tích ra thừa số nguyên tố: ${n} = ${factorText(fs)}.`,
        `Ước nguyên tố lớn nhất là ${largest}.`,
      ],
    };
  },
};

/**
 * Two numbers from 12 to 216 that share a factor bigger than 1.
 * @param {() => number} rand
 */
function sharedPair(rand) {
  const g = pick(rand, [2, 3, 4, 5, 6, 8, 9, 12, 14, 15, 18]);
  for (;;) {
    const x = int(rand, 2, 12);
    const y = int(rand, 2, 12);
    if (x !== y && gcd(x, y) === 1 && g * x >= 12 && g * y >= 12) {
      return [g * Math.max(x, y), g * Math.min(x, y)];
    }
  }
}

/** @type {Skill} */
export const uocChung = {
  id: 'uoc-chung',
  label: 'Bài 11. Ước chung. ƯCLN',
  make(rand) {
    const [a, b] = sharedPair(rand);
    const g = gcd(a, b);
    const fa = factorText(factorize(a));
    const fb = factorText(factorize(b));
    const v = int(rand, 0, 2);
    if (v === 0) {
      return {
        prompt: `Tìm ƯCLN(${a}, ${b}).`,
        answer: g,
        steps: [
          `${a} = ${fa} và ${b} = ${fb}.`,
          `Lấy các thừa số chung với số mũ nhỏ nhất: ${factorText(gcdFactors(a, b))}.`,
          `ƯCLN(${a}, ${b}) = ${g}.`,
        ],
      };
    }
    if (v === 1) {
      const ds = divisorsOf(g);
      return {
        prompt: `Hai số ${a} và ${b} có bao nhiêu ước chung?`,
        answer: ds.length,
        steps: [
          `${a} = ${fa}, ${b} = ${fb}, nên ƯCLN(${a}, ${b}) = ${g}.`,
          `Các ước chung là các ước của ${g}: ƯC(${a}, ${b}) = ${setText(ds)}.`,
          `Có ${ds.length} ước chung.`,
        ],
      };
    }
    const [thing1, thing2] = pick(rand, [
      ['quyển vở', 'cái bút'],
      ['cái bánh', 'hộp sữa'],
      ['quả cam', 'quả táo'],
    ]);
    return {
      prompt: `Có ${a} ${thing1} và ${b} ${thing2}, chia đều vào các phần quà giống nhau, không thừa. Chia được nhiều nhất bao nhiêu phần quà?`,
      answer: g,
      steps: [
        `Số phần quà là ước chung của ${a} và ${b}; nhiều nhất là ƯCLN(${a}, ${b}).`,
        `${a} = ${fa}, ${b} = ${fb}, nên ƯCLN = ${g}.`,
        `Chia được nhiều nhất ${g} phần, mỗi phần ${a / g} ${thing1} và ${b / g} ${thing2}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const boiChung = {
  id: 'boi-chung',
  label: 'Bài 12. Bội chung. BCNN',
  make(rand) {
    const v = int(rand, 0, 2);
    let a = int(rand, 4, 30);
    let b = int(rand, 4, 30);
    while (a === b || a % b === 0 || b % a === 0) b = int(rand, 4, 30);
    if (a < b) [a, b] = [b, a];
    const m = lcm(a, b);
    const fa = factorText(factorize(a));
    const fb = factorText(factorize(b));
    const build = `${a} = ${fa}, ${b} = ${fb}; lấy các thừa số chung và riêng với số mũ lớn nhất: BCNN(${a}, ${b}) = ${factorText(lcmFactors(a, b))} = ${fmt(m)}.`;
    if (v === 0) {
      return { prompt: `Tìm BCNN(${a}, ${b}).`, answer: m, steps: [build] };
    }
    if (v === 1) {
      const [p, q] = [int(rand, 4, 15), int(rand, 4, 15)].sort((x, y) => x - y);
      if (p === q || lcm(p, q) > 120) {
        return { prompt: `Tìm BCNN(${a}, ${b}).`, answer: m, steps: [build] };
      }
      const t = lcm(p, q);
      return {
        prompt: `Hai đèn cùng nháy lúc 0 giây; đèn A cứ ${p} giây nháy một lần, đèn B cứ ${q} giây nháy một lần. Sau ít nhất bao nhiêu giây hai đèn lại cùng nháy?`,
        answer: t,
        steps: [
          `Số giây cần tìm là bội chung nhỏ nhất khác 0 của ${p} và ${q}.`,
          `BCNN(${p}, ${q}) = ${t}.`,
          `Sau ít nhất ${t} giây.`,
        ],
      };
    }
    const lo = m * int(rand, 1, 3) + int(rand, 1, m - 1);
    const hi = lo + m - 1;
    const x = Math.ceil(lo / m) * m;
    return {
      prompt: `Tìm số tự nhiên x, biết x chia hết cho cả ${a} và ${b}, và ${fmt(lo)} ≤ x ≤ ${fmt(hi)}.`,
      answer: x,
      steps: [
        build,
        `x thuộc BC(${a}, ${b}), tức là bội của ${fmt(m)}: 0; ${fmt(m)}; ${fmt(2 * m)}; ${fmt(3 * m)}; ${fmt(4 * m)}; …`,
        `Chỉ có ${fmt(x)} nằm trong khoảng từ ${fmt(lo)} đến ${fmt(hi)}.`,
      ],
    };
  },
};

/** Every skill of the chapter, in book order. */
export const CHAPTER_SKILLS = [quanHeChiaHet, dauHieuChiaHet, soNguyenTo, uocChung, boiChung];
