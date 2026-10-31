/**
 * Question generators for the grade 9 year-end review, one skill per chapter
 * of the book in book order: systems of two linear equations, equations and
 * inequalities in one unknown, square and cube roots, trigonometric ratios in
 * the right triangle, the circle, y = ax² and quadratic equations, frequency
 * tables, probability, inscribed angles and regular polygons, and solids.
 * Answers are exact values (see `#lib/core/adaptive.js`): an answer that
 * holds π or a root asks for its rational coefficient (V = kπ, A = m√2).
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import { fmt, formatNumber, intText, operand } from '#lib/core/number-format.js';
import { fracText } from '#lib/core/fractions.js';
import { eqText, linText, pairText } from '#lib/core/algebra-text.js';
import { fraction, simplify } from '#lib/fraction-engine/index.js';

/** @typedef {import('#lib/core/adaptive.js').ReviewSkill} ReviewSkill */
/** @typedef {import('#lib/core/adaptive.js').ReviewQuestion} ReviewQuestion */
/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */

/** @param {number} n */
const whole = (n) => fraction(n, 1);

/**
 * The exact value n/d in lowest terms.
 * @param {number} n
 * @param {number} d
 */
export const frac = (n, d) => simplify(fraction(n, d));

/** @param {Fraction} f */
export const show = (f) => fracText(f.n, f.d);

/**
 * k·π written the book's way: 'π', '12π', '(10/3)π'.
 * @param {Fraction} k
 */
export function piText(k) {
  if (k.d === 1) return k.n === 1 ? 'π' : `${fmt(k.n)}π`;
  return `(${show(k)})π`;
}

/** A fraction as an operand: negatives in brackets. */
const showOp = (/** @type {Fraction} */ f) => (f.n < 0 ? `(${show(f)})` : show(f));

/** A fraction as a base or a divisor: negatives and p/q in brackets. */
const showTight = (/** @type {Fraction} */ f) => (f.n < 0 || f.d !== 1 ? `(${show(f)})` : show(f));

/**
 * 'm/n = p/q', or just 'm/n' when it is already in lowest terms.
 * @param {number} m
 * @param {number} n
 * @param {Fraction} f m/n in lowest terms
 */
const reduced = (m, n, f) => (f.n === m && f.d === n ? `${m}/${n}` : `${m}/${n} = ${show(f)}`);

/** A nonzero integer in [−max, −1] ∪ [1, max]. */
const nonzero = (/** @type {() => number} */ rand, /** @type {number} */ max) =>
  int(rand, 1, max) * pick(rand, [1, -1]);

/** Pythagorean triples (leg, leg, hypotenuse). */
export const TRIPLES = /** @type {const} */ ([
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [9, 40, 41],
]);

/** A triple scaled so its hypotenuse stays at most `max`. */
function triple(/** @type {() => number} */ rand, max = 30) {
  const [a, b, c] = pick(
    rand,
    TRIPLES.filter((t) => t[2] <= max),
  );
  const k = int(rand, 1, Math.max(1, Math.floor(max / c)));
  return [a * k, b * k, c * k];
}

/**
 * 'x + 3', 'x − 3' or 'x' for x + a.
 * @param {number} a
 * @param {string} [v]
 */
export function shift(a, v = 'x') {
  if (a === 0) return v;
  return a > 0 ? `${v} + ${a}` : `${v} − ${-a}`;
}

/**
 * ax² + bx + c as plain text: '2x² − 6x + 4', '−x² + 9'.
 * @param {number} a nonzero
 * @param {number} b
 * @param {number} c
 */
export function quadText(a, b, c) {
  const lead = `${a < 0 ? '−' : ''}${Math.abs(a) === 1 ? '' : Math.abs(a)}x²`;
  const rest = linText(b, c);
  if (rest === '0') return lead;
  return rest.startsWith('−') ? `${lead} − ${rest.slice(1)}` : `${lead} + ${rest}`;
}

/**
 * ' + 3' or ' − 3': a signed term after another term.
 * @param {number} n
 * @param {string} [tail] written after the number, e.g. '√2'
 */
function term(n, tail = '') {
  const mag = Math.abs(n) === 1 && tail ? '' : fmt(Math.abs(n));
  return ` ${n < 0 ? '−' : '+'} ${mag}${tail}`;
}

/** The first term of a sum: '3√2', '√2', '−√2'. */
function lead(/** @type {number} */ n, tail = '') {
  const mag = Math.abs(n) === 1 && tail ? '' : fmt(Math.abs(n));
  return `${n < 0 ? '−' : ''}${mag}${tail}`;
}

/** @type {ReviewSkill} */
export const hePhuongTrinh = {
  id: 'he-phuong-trinh',
  label: 'Hệ hai phương trình bậc nhất hai ẩn',
  make(rand) {
    if (rand() < 0.55) {
      for (;;) {
        const [a, b, d, e] = [
          nonzero(rand, 5),
          nonzero(rand, 5),
          nonzero(rand, 5),
          nonzero(rand, 5),
        ];
        const det = a * e - b * d;
        if (det === 0) continue;
        const x = nonzero(rand, 6);
        const y = nonzero(rand, 6);
        const c = a * x + b * y;
        const f = d * x + e * y;
        const askX = rand() < 0.5;
        const name = askX ? 'x' : 'y';
        const value = askX ? x : y;
        return {
          prompt: `Giải hệ phương trình gồm ${eqText(a, b, c)} và ${eqText(d, e, f)}. Hệ có nghiệm duy nhất (x; y). Tìm ${name}.`,
          answer: whole(value),
          display: intText(value),
          hints: [
            'Dùng phương pháp thế hoặc phương pháp cộng đại số để khử bớt một ẩn.',
            askX
              ? `Nhân hai vế để hệ số của y trong hai phương trình bằng nhau (hoặc đối nhau), rồi trừ (hoặc cộng) vế theo vế.`
              : `Nhân hai vế để hệ số của x trong hai phương trình bằng nhau (hoặc đối nhau), rồi trừ (hoặc cộng) vế theo vế.`,
          ],
          steps: [
            `Nhân hai vế của phương trình thứ nhất với ${operand(e)}, của phương trình thứ hai với ${operand(b)} rồi trừ vế theo vế: ${linText(det, 0)} = ${intText(c * e - b * f)}, nên x = ${intText(x)}.`,
            `Thay x = ${intText(x)} vào phương trình thứ nhất: ${operand(a)} · ${operand(x)}${term(b, 'y')} = ${intText(c)}, nên y = ${intText(y)}.`,
            `Hệ có nghiệm duy nhất ${pairText(x, y)}, vậy ${name} = ${intText(value)}.`,
          ],
        };
      }
    }
    for (;;) {
      const p = pick(rand, [50, 60, 70, 80, 100]);
      const q = pick(rand, [20, 25, 30, 40]);
      const adults = int(rand, 3, 25);
      const kids = int(rand, 3, 25);
      if (adults === kids) continue;
      const n = adults + kids;
      const total = p * adults + q * kids;
      const askKids = rand() < 0.5;
      const value = askKids ? kids : adults;
      return {
        prompt: `Vé vào một bảo tàng giá ${p} nghìn đồng cho người lớn và ${q} nghìn đồng cho trẻ em. Một đoàn ${n} người mua vé hết ${fmt(total)} nghìn đồng. Đoàn có bao nhiêu ${askKids ? 'trẻ em' : 'người lớn'}?`,
        answer: whole(value),
        display: String(value),
        hints: [
          'Gọi x là số người lớn, y là số trẻ em (x, y nguyên dương); lập một phương trình về số người và một phương trình về số tiền.',
          `Hệ gồm x + y = ${n} và ${p}x + ${q}y = ${fmt(total)}.`,
        ],
        steps: [
          `Gọi x là số người lớn, y là số trẻ em. Ta có hệ: x + y = ${n} và ${p}x + ${q}y = ${fmt(total)}.`,
          `Từ phương trình thứ nhất, y = ${n} − x. Thế vào phương trình thứ hai: ${p}x + ${q}(${n} − x) = ${fmt(total)}, nên ${p - q}x = ${fmt(total - q * n)}, x = ${adults}.`,
          `y = ${n} − ${adults} = ${kids}. Vậy đoàn có ${value} ${askKids ? 'trẻ em' : 'người lớn'}.`,
        ],
      };
    }
  },
};

/** An expression in brackets when it has more than one term. */
const wrap = (/** @type {string} */ e) => (e.includes(' ') ? `(${e})` : e);

/** The largest integer below or at n/d. */
const floorDiv = (/** @type {number} */ n, /** @type {number} */ d) => Math.floor(n / d);

/** @type {ReviewSkill} */
export const phuongTrinhMotAn = {
  id: 'phuong-trinh-mot-an',
  label: 'Phương trình và bất phương trình bậc nhất một ẩn',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      for (;;) {
        const m = nonzero(rand, 6);
        const k = int(rand, 2, 5);
        const t = nonzero(rand, 9);
        const r2 = frac(-t, k);
        if ((r2.d === 1 && r2.n === m) || m * k === t) continue;
        const sum = frac(m * k - t, k);
        return {
          prompt: `Tính tổng các nghiệm của phương trình (${linText(1, -m)})(${linText(k, t)}) = 0.`,
          answer: sum,
          display: show(sum),
          hints: [
            'Tích bằng 0 khi một trong các thừa số bằng 0.',
            `Giải riêng ${linText(1, -m)} = 0 và ${linText(k, t)} = 0.`,
          ],
          steps: [
            `${linText(1, -m)} = 0 hoặc ${linText(k, t)} = 0.`,
            `x = ${intText(m)} hoặc x = ${show(r2)}.`,
            `Tổng các nghiệm: ${intText(m)} + ${showOp(r2)} = ${show(sum)}.`,
          ],
        };
      }
    }
    if (v === 1) {
      for (;;) {
        const b = int(rand, -6, 6);
        const x = int(rand, -8, 8);
        const c = pick(rand, [2, 3, 4, -2, -3]);
        if (x === b) continue;
        const a = c * (x - b) - x;
        return {
          prompt: `Giải phương trình ${wrap(shift(a))}/${wrap(shift(-b))} = ${intText(c)}.`,
          answer: whole(x),
          display: intText(x),
          hints: [
            'Tìm điều kiện xác định trước: mẫu phải khác 0.',
            `Nhân hai vế với ${shift(-b)} để khử mẫu, rồi giải phương trình bậc nhất nhận được.`,
          ],
          steps: [
            `Điều kiện xác định: x ≠ ${intText(b)}.`,
            `Khử mẫu: ${shift(a)} = ${intText(c)}(${shift(-b)}), tức là ${shift(a)} = ${linText(c, -c * b)}.`,
            `Chuyển vế: ${linText(1 - c, 0)} = ${intText(-c * b - a)}, nên x = ${intText(x)} (thỏa mãn điều kiện xác định).`,
          ],
        };
      }
    }
    for (;;) {
      const a = nonzero(rand, 7);
      const c = int(rand, -7, 7);
      const b = int(rand, -12, 12);
      const d = int(rand, -12, 12);
      const k = a - c;
      if (k === 0 || Math.abs(k) === 1) continue;
      const rel = pick(rand, ['<', '>', '≤', '≥']);
      const rhs = d - b;
      const flip = k < 0;
      /** @type {Record<string, string>} */
      const flipped = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' };
      const solved = flip ? flipped[rel] : rel;
      const bound = frac(rhs, k);
      const fl = floorDiv(bound.n, bound.d);
      const exact = bound.d === 1;
      const largest = solved === '<' || solved === '≤';
      let value;
      if (solved === '<') value = exact ? bound.n - 1 : fl;
      else if (solved === '≤') value = fl;
      else if (solved === '>') value = fl + 1;
      else value = exact ? bound.n : fl + 1;
      const which = largest ? 'lớn nhất' : 'nhỏ nhất';
      return {
        prompt: `Tìm số nguyên ${which} thỏa mãn bất phương trình ${linText(a, b)} ${rel} ${linText(c, d)}.`,
        answer: whole(value),
        display: intText(value),
        hints: [
          'Chuyển các hạng tử chứa x sang một vế, các số sang vế kia.',
          'Khi chia hai vế cho một số âm, phải đổi chiều bất phương trình.',
        ],
        steps: [
          `Chuyển vế: ${linText(k, 0)} ${rel} ${intText(rhs)}.`,
          `Chia hai vế cho ${operand(k)}${flip ? ' (số âm nên đổi chiều)' : ''}: x ${solved} ${show(bound)}.`,
          `Số nguyên ${which} thỏa mãn là ${intText(value)}.`,
        ],
      };
    }
  },
};

const SQUARE_FREE = [2, 3, 5, 6, 7];

/** @type {ReviewSkill} */
export const canThuc = {
  id: 'can-thuc',
  label: 'Căn bậc hai và căn bậc ba',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      for (;;) {
        const s = pick(rand, SQUARE_FREE);
        const sq = shuffle(rand, [2, 3, 4, 5]).slice(0, 3);
        const co = [int(rand, 1, 4), nonzero(rand, 4), nonzero(rand, 4)];
        const m = co.reduce((sum, c, i) => sum + c * sq[i], 0);
        if (m === 0) continue;
        const inside = sq.map((n) => n * n * s);
        const expr = co
          .map((c, i) => (i === 0 ? lead(c, `√${inside[i]}`) : term(c, `√${inside[i]}`)))
          .join('');
        const simple = co
          .map((c, i) => (i === 0 ? lead(c * sq[i], `√${s}`) : term(c * sq[i], `√${s}`)))
          .join('');
        return {
          prompt: `Rút gọn A = ${expr} về dạng m√${s}. Tìm m.`,
          answer: whole(m),
          display: intText(m),
          hints: [
            `Đưa thừa số ra ngoài dấu căn: viết mỗi số dưới dấu căn thành tích của một số chính phương với ${s}.`,
            `Ví dụ √${inside[0]} = √(${sq[0]}² · ${s}) = ${sq[0]}√${s}.`,
          ],
          steps: [
            inside.map((n, i) => `√${n} = ${sq[i]}√${s}`).join('; ') + '.',
            `A = ${simple}.`,
            `A = ${lead(m, `√${s}`)}, nên m = ${intText(m)}.`,
          ],
        };
      }
    }
    if (v === 1) {
      const roots = [nonzero(rand, 6), nonzero(rand, 6), nonzero(rand, 6)];
      const signs = [1, pick(rand, [1, -1]), pick(rand, [1, -1])];
      const cube = (/** @type {number} */ r) => (r < 0 ? `∛(${intText(r ** 3)})` : `∛${r ** 3}`);
      const expr = roots
        .map((r, i) => (i === 0 ? cube(r) : ` ${signs[i] < 0 ? '−' : '+'} ${cube(r)}`))
        .join('');
      const value = roots.reduce((sum, r, i) => sum + signs[i] * r, 0);
      const middle = roots
        .map((r, i) => (i === 0 ? intText(r) : ` ${signs[i] < 0 ? '−' : '+'} ${operand(r)}`))
        .join('');
      return {
        prompt: `Tính ${expr}.`,
        answer: whole(value),
        display: intText(value),
        hints: [
          'Căn bậc ba của a là số x sao cho x³ = a; căn bậc ba của một số âm là một số âm.',
          `Ví dụ ∛(−64) = −4 vì (−4)³ = −64.`,
        ],
        steps: [
          roots.map((r) => `${cube(r)} = ${intText(r)}`).join('; ') + '.',
          `Biểu thức bằng ${middle} = ${intText(value)}.`,
        ],
      };
    }
    if (v === 2) {
      const k = int(rand, 1, 9);
      const t = int(rand, -9, 9);
      const value = Math.abs(t - k);
      return {
        prompt: `Tính giá trị của biểu thức √(x² − ${2 * k}x + ${k * k}) tại x = ${intText(t)}.`,
        answer: whole(value),
        display: String(value),
        hints: [
          'Biểu thức dưới dấu căn là một bình phương.',
          'Dùng √(A²) = |A|: căn bậc hai số học không bao giờ âm.',
        ],
        steps: [
          `x² − ${2 * k}x + ${k * k} = (x − ${k})², nên √((x − ${k})²) = |x − ${k}|.`,
          `Tại x = ${intText(t)}: |${intText(t)} − ${k}| = |${intText(t - k)}| = ${value}.`,
        ],
      };
    }
    for (;;) {
      const s = pick(rand, SQUARE_FREE);
      const m = int(rand, 1, 6);
      const n = int(rand, 1, 6);
      if (m === n) continue;
      const a = s * m * m;
      const b = s * n * n;
      if (rand() < 0.5) {
        const value = s * m * n;
        return {
          prompt: `Tính √${a} · √${b}.`,
          answer: whole(value),
          display: fmt(value),
          hints: ['Với a, b không âm: √a · √b = √(a · b).', `${a} · ${b} là một số chính phương.`],
          steps: [`√${a} · √${b} = √(${a} · ${b}) = √${fmt(a * b)}.`, `= ${fmt(value)}.`],
        };
      }
      const value = frac(m, n);
      return {
        prompt: `Tính √${a} : √${b}, viết kết quả dưới dạng phân số tối giản.`,
        answer: value,
        display: show(value),
        simplest: true,
        hints: [
          'Với a không âm và b dương: √a : √b = √(a : b).',
          `Rút gọn phân số ${a}/${b} trước khi khai căn.`,
        ],
        steps: [
          `√${a} : √${b} = √(${a}/${b}) = ${value.d === 1 ? `√${value.n ** 2}` : `√(${value.n ** 2}/${value.d ** 2})`}.`,
          `= ${show(value)}.`,
        ],
      };
    }
  },
};

/** @type {ReviewSkill} */
export const heThucLuong = {
  id: 'he-thuc-luong',
  label: 'Hệ thức lượng trong tam giác vuông',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const [p, q, h] = triple(rand, 40);
      const [ab, ac] = rand() < 0.5 ? [p, q] : [q, p];
      const fn = pick(rand, ['sin', 'cos', 'tan', 'cot']);
      const angle = pick(rand, ['B', 'C']);
      // Opposite and adjacent legs of the chosen angle.
      const [opp, adj, oppName, adjName] =
        angle === 'B' ? [ac, ab, 'AC', 'AB'] : [ab, ac, 'AB', 'AC'];
      /** @type {Record<string, [number, number, string]>} */
      const ratio = {
        sin: [opp, h, `${oppName}/BC`],
        cos: [adj, h, `${adjName}/BC`],
        tan: [opp, adj, `${oppName}/${adjName}`],
        cot: [adj, opp, `${adjName}/${oppName}`],
      };
      const [n, d, def] = ratio[fn];
      const value = frac(n, d);
      const needsBC = fn === 'sin' || fn === 'cos';
      return {
        prompt: `Tam giác ABC vuông tại A có AB = ${ab} cm, AC = ${ac} cm. Tính ${fn} ${angle}, viết dưới dạng phân số tối giản.`,
        answer: value,
        display: show(value),
        simplest: true,
        hints: [
          `Với góc ${angle}: cạnh đối là ${oppName}, cạnh kề là ${adjName}, cạnh huyền là BC.`,
          'sin = đối/huyền, cos = kề/huyền, tan = đối/kề, cot = kề/đối.',
        ],
        steps: [
          ...(needsBC
            ? [`Theo định lí Pythagore: BC² = ${ab}² + ${ac}² = ${fmt(h * h)}, nên BC = ${h} cm.`]
            : []),
          `${fn} ${angle} = ${def} = ${reduced(n, d, value)}.`,
        ],
      };
    }
    if (v === 1) {
      const kind = int(rand, 0, 2);
      if (kind === 2) {
        const ab = int(rand, 2, 20);
        return {
          prompt: `Tam giác ABC vuông tại A có AB = ${ab} cm và góc B bằng 45°. Tính AC (cm).`,
          answer: whole(ab),
          display: String(ab),
          hints: ['AC là cạnh đối, AB là cạnh kề của góc B.', 'Dùng AC = AB · tan B.'],
          steps: [`AC = AB · tan 45° = ${ab} · 1.`, `AC = ${ab} cm.`],
        };
      }
      const bc = int(rand, 3, 30);
      const half = formatNumber(bc / 2, 1);
      const deg = kind === 0 ? 30 : 60;
      const side = kind === 0 ? 'AC' : 'AB';
      return {
        prompt: `Tam giác ABC vuông tại A có cạnh huyền BC = ${bc} cm và góc B bằng ${deg}°. Tính ${side} (cm).`,
        answer: frac(bc, 2),
        display: half,
        hints: [
          kind === 0
            ? 'AC là cạnh đối của góc B; dùng AC = BC · sin B.'
            : 'AB là cạnh kề của góc B; dùng AB = BC · cos B.',
          kind === 0 ? 'sin 30° = 1/2.' : 'cos 60° = 1/2.',
        ],
        steps: [
          kind === 0 ? `AC = BC · sin 30° = ${bc} · 1/2.` : `AB = BC · cos 60° = ${bc} · 1/2.`,
          `${side} = ${half} cm.`,
        ],
      };
    }
    const [p, q] = pick(rand, [
      [3, 4],
      [4, 3],
      [5, 12],
      [2, 3],
      [3, 2],
      [5, 4],
      [3, 5],
    ]);
    const k = int(rand, 1, 6);
    const shadow = q * k;
    const height = p * k;
    return {
      prompt: `Tia nắng tạo với mặt đất một góc α có tan α = ${p}/${q}. Bóng của một cột cờ thẳng đứng trên mặt đất dài ${shadow} m. Cột cờ cao bao nhiêu mét?`,
      answer: whole(height),
      display: String(height),
      hints: [
        'Cột cờ, bóng và tia nắng tạo thành một tam giác vuông; góc α nằm ở đầu bóng.',
        'Chiều cao là cạnh đối, bóng là cạnh kề của góc α.',
      ],
      steps: ['Chiều cao h = bóng · tan α.', `h = ${shadow} · ${p}/${q} = ${height} m.`],
    };
  },
};

/** @type {ReviewSkill} */
export const duongTron = {
  id: 'duong-tron',
  label: 'Đường tròn',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const R = int(rand, 2, 12);
      const n = pick(rand, [30, 45, 60, 72, 90, 120, 135, 150]);
      const arc = rand() < 0.5;
      const k = arc ? frac(R * n, 180) : frac(R * R * n, 360);
      const what = arc
        ? `độ dài cung tròn ${n}° của đường tròn bán kính ${R} cm`
        : `diện tích hình quạt tròn bán kính ${R} cm, ứng với cung ${n}°`;
      return {
        prompt: `Tính ${what}. Viết kết quả dưới dạng kπ (${arc ? 'cm' : 'cm²'}) rồi nhập k.`,
        answer: k,
        display: show(k),
        hints: [
          arc
            ? 'Độ dài cung n° của đường tròn bán kính R: l = πRn/180.'
            : 'Diện tích hình quạt tròn bán kính R, cung n°: S = πR²n/360.',
          'Giữ π lại, chỉ tính phần hệ số rồi rút gọn.',
        ],
        steps: arc
          ? [`l = π · ${R} · ${n}/180 = ${piText(k)} (cm).`, `k = ${show(k)}.`]
          : [`S = π · ${R}² · ${n}/360 = ${piText(k)} (cm²).`, `k = ${show(k)}.`],
      };
    }
    if (v === 1) {
      const R = int(rand, 3, 12);
      const r = int(rand, 1, R - 1);
      const k = R * R - r * r;
      return {
        prompt: `Hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính ${R} cm và ${r} cm. Viết diện tích của nó dưới dạng kπ (cm²) rồi nhập k.`,
        answer: whole(k),
        display: String(k),
        hints: ['Diện tích hình vành khuyên bằng hiệu diện tích hai hình tròn.', 'S = π(R² − r²).'],
        steps: [`S = π(${R}² − ${r}²) = π(${R * R} − ${r * r}).`, `S = ${k}π cm², nên k = ${k}.`],
      };
    }
    const [p, q, c] = triple(rand, 30);
    if (v === 2) {
      const [d, half] = rand() < 0.5 ? [p, q] : [q, p];
      return {
        prompt: `Đường tròn (O; ${c} cm) có dây AB cách tâm O một khoảng ${d} cm. Tính độ dài dây AB (cm).`,
        answer: whole(2 * half),
        display: String(2 * half),
        hints: [
          'Kẻ OH vuông góc với AB; H là trung điểm của AB.',
          'Trong tam giác vuông OHA: AH² = OA² − OH².',
        ],
        steps: [
          `Kẻ OH ⊥ AB thì H là trung điểm của AB và OH = ${d} cm.`,
          `AH² = ${c}² − ${d}² = ${fmt(half * half)}, nên AH = ${half} cm.`,
          `AB = 2 · ${half} = ${2 * half} cm.`,
        ],
      };
    }
    const [R, t] = rand() < 0.5 ? [p, q] : [q, p];
    return {
      prompt: `Điểm A cách tâm O của đường tròn (O; ${R} cm) một khoảng ${c} cm. Kẻ tiếp tuyến AB với đường tròn (B là tiếp điểm). Tính AB (cm).`,
      answer: whole(t),
      display: String(t),
      hints: [
        'Tiếp tuyến vuông góc với bán kính đi qua tiếp điểm, nên tam giác OBA vuông tại B.',
        'AB² = OA² − OB².',
      ],
      steps: [
        'OB ⊥ AB nên tam giác OBA vuông tại B.',
        `AB² = ${c}² − ${R}² = ${fmt(t * t)}.`,
        `AB = ${t} cm.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const phuongTrinhBacHai = {
  id: 'phuong-trinh-bac-hai',
  label: 'Hàm số y = ax² và phương trình bậc hai',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const x = nonzero(rand, 4);
      const y = nonzero(rand, 12);
      const a = frac(y, x * x);
      return {
        prompt: `Đồ thị của hàm số y = ax² (a ≠ 0) đi qua điểm M${pairText(x, y)}. Tìm a.`,
        answer: a,
        display: show(a),
        hints: [
          'Điểm thuộc đồ thị thì tọa độ của nó thỏa mãn công thức của hàm số.',
          `Thay x = ${intText(x)} và y = ${intText(y)} vào y = ax².`,
        ],
        steps: [
          x * x === 1
            ? `${intText(y)} = a · ${operand(x)}² = a.`
            : `${intText(y)} = a · ${operand(x)}² = ${x * x}a.`,
          x * x === 1 || a.d === x * x
            ? `a = ${show(a)}.`
            : `a = ${intText(y)}/${x * x} = ${show(a)}.`,
        ],
      };
    }
    if (v === 1) {
      for (;;) {
        const k = pick(rand, [1, 1, 2, 3, -1, -2]);
        const r1 = int(rand, -7, 7);
        const r2 = int(rand, -7, 7);
        if (r1 === r2) continue;
        const a = k;
        const b = -k * (r1 + r2);
        const c = k * r1 * r2;
        const delta = b * b - 4 * a * c;
        const root = Math.abs(k * (r1 - r2));
        const big = Math.max(r1, r2);
        const small = Math.min(r1, r2);
        const askBig = rand() < 0.5;
        const value = askBig ? big : small;
        const x1 = frac(-b + root, 2 * a);
        const x2 = frac(-b - root, 2 * a);
        return {
          prompt: `Giải phương trình ${quadText(a, b, c)} = 0 rồi nhập nghiệm ${askBig ? 'lớn hơn' : 'nhỏ hơn'}.`,
          answer: whole(value),
          display: intText(value),
          hints: ['Tính biệt thức Δ = b² − 4ac.', 'Khi Δ > 0, hai nghiệm là x = (−b ± √Δ)/(2a).'],
          steps: [
            `a = ${intText(a)}, b = ${intText(b)}, c = ${intText(c)}; Δ = ${operand(b)}² − 4 · ${operand(a)} · ${operand(c)} = ${fmt(delta)} > 0, √Δ = ${root}.`,
            `x₁ = (${intText(-b)} + ${root})/${operand(2 * a)} = ${show(x1)}; x₂ = (${intText(-b)} − ${root})/${operand(2 * a)} = ${show(x2)}.`,
            `Nghiệm ${askBig ? 'lớn hơn' : 'nhỏ hơn'} là ${intText(value)}.`,
          ],
        };
      }
    }
    for (;;) {
      const a = pick(rand, [1, 1, 2, 3]);
      const b = nonzero(rand, 9);
      const c = nonzero(rand, 9);
      const delta = b * b - 4 * a * c;
      if (delta <= 0) continue;
      const S = frac(-b, a);
      const P = frac(c, a);
      const ask = int(rand, 0, 1);
      const value =
        ask === 0
          ? simplify(fraction(S.n * S.n * P.d - 2 * P.n * S.d * S.d, S.d * S.d * P.d))
          : frac(S.n * P.d, S.d * P.n);
      const asked = ask === 0 ? 'x₁² + x₂²' : '1/x₁ + 1/x₂';
      return {
        prompt: `Gọi x₁, x₂ là hai nghiệm của phương trình ${quadText(a, b, c)} = 0. Không giải phương trình, tính ${asked}.`,
        answer: value,
        display: show(value),
        hints: [
          'Kiểm tra Δ > 0 rồi dùng định lí Viète: x₁ + x₂ = −b/a, x₁x₂ = c/a.',
          ask === 0 ? 'x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂.' : '1/x₁ + 1/x₂ = (x₁ + x₂)/(x₁x₂).',
        ],
        steps: [
          `Δ = ${operand(b)}² − 4 · ${a} · ${operand(c)} = ${fmt(delta)} > 0, nên phương trình có hai nghiệm phân biệt.`,
          `Theo định lí Viète: x₁ + x₂ = ${show(S)}, x₁x₂ = ${show(P)}.`,
          ask === 0
            ? `x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = ${showTight(S)}² − 2 · ${showOp(P)} = ${show(value)}.`
            : `1/x₁ + 1/x₂ = (x₁ + x₂)/(x₁x₂) = ${showOp(S)} : ${showTight(P)} = ${show(value)}.`,
        ],
      };
    }
  },
};

/** @type {ReviewSkill} */
export const tanSo = {
  id: 'tan-so',
  label: 'Tần số và tần số tương đối',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const n = int(rand, 12, 20);
      const data = Array.from({ length: n }, () => int(rand, 5, 10));
      const target = pick(rand, data);
      const count = data.filter((d) => d === target).length;
      return {
        prompt: `Điểm kiểm tra môn Toán của ${n} học sinh là: ${data.join('; ')}. Tìm tần số của điểm ${target}.`,
        answer: whole(count),
        display: String(count),
        hints: [
          'Tần số của một giá trị là số lần giá trị đó xuất hiện trong mẫu dữ liệu.',
          `Đếm cẩn thận số lần điểm ${target} xuất hiện; có thể gạch dần từng số đã đếm.`,
        ],
        steps: [
          `Điểm ${target} xuất hiện ${count} lần trong dãy.`,
          `Tần số của điểm ${target} là ${count}.`,
        ],
      };
    }
    if (v === 1) {
      const n = pick(rand, [20, 25, 40, 50, 80]);
      const m = int(rand, 1, n - 1);
      const pct = frac(100 * m, n);
      const shown = formatNumber((100 * m) / n, 2);
      return {
        prompt: `Lớp có ${n} học sinh được hỏi về môn thể thao yêu thích, trong đó ${m} học sinh chọn bóng đá. Tìm tần số tương đối của lựa chọn bóng đá (tính theo %).`,
        answer: pct,
        display: shown,
        hints: [
          'Tần số tương đối bằng tần số chia cho cỡ mẫu.',
          'Nhân với 100 để đổi ra phần trăm.',
        ],
        steps: [`f = ${m}/${n} · 100%.`, `f = ${shown}%.`],
      };
    }
    for (;;) {
      const n = pick(rand, [20, 25, 40, 50]);
      const parts = [int(rand, 1, 12), int(rand, 1, 12), int(rand, 1, 12)];
      const rest = n - parts.reduce((s, p) => s + p, 0);
      if (rest < 1) continue;
      const freqs = shuffle(rand, [...parts, rest]);
      const hide = int(rand, 0, 3);
      const groups = ['[150; 155)', '[155; 160)', '[160; 165)', '[165; 170)'];
      const listed = freqs
        .map((f, i) => (i === hide ? null : `nhóm ${groups[i]} có ${f} bạn`))
        .filter(Boolean)
        .join(', ');
      const value = freqs[hide];
      const pct = frac(100 * value, n);
      return {
        prompt: `Đo chiều cao (cm) của ${n} học sinh rồi ghép thành bốn nhóm: ${listed}. Tìm tần số tương đối (theo %) của nhóm ${groups[hide]}.`,
        answer: pct,
        display: formatNumber((100 * value) / n, 2),
        hints: [
          'Tổng các tần số bằng cỡ mẫu; tìm tần số của nhóm còn thiếu trước.',
          'Tần số tương đối bằng tần số chia cho cỡ mẫu, rồi nhân 100%.',
        ],
        steps: [
          `Tần số của nhóm ${groups[hide]}: ${n} − ${freqs.filter((_, i) => i !== hide).join(' − ')} = ${value}.`,
          `Tần số tương đối: ${value}/${n} · 100% = ${formatNumber((100 * value) / n, 2)}%.`,
        ],
      };
    }
  },
};

/** The prime numbers from 2 to 30. */
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

/** @type {ReviewSkill} */
export const xacSuat = {
  id: 'xac-suat',
  label: 'Xác suất của biến cố',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const s = int(rand, 3, 11);
      const pairs = [];
      for (let a = 1; a <= 6; a++) if (s - a >= 1 && s - a <= 6) pairs.push(`(${a}; ${s - a})`);
      const p = frac(pairs.length, 36);
      return {
        prompt: `Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất của biến cố "Tổng số chấm trên hai mặt xuất hiện bằng ${s}", viết dưới dạng phân số tối giản.`,
        answer: p,
        display: show(p),
        simplest: true,
        hints: [
          'Không gian mẫu gồm 6 · 6 = 36 kết quả đồng khả năng (a; b).',
          `Liệt kê các cặp (a; b) có a + b = ${s}.`,
        ],
        steps: [
          `Các kết quả thuận lợi: ${pairs.join(', ')}, có ${pairs.length} kết quả.`,
          `P = ${reduced(pairs.length, 36, p)}.`,
        ],
      };
    }
    if (v === 1) {
      /** @type {[string, number, string][]} */
      const events = [
        ['Có ít nhất một lần xuất hiện mặt sấp', 3, 'SS, SN, NS'],
        ['Hai lần gieo cho kết quả giống nhau', 2, 'SS, NN'],
        ['Có đúng một lần xuất hiện mặt ngửa', 2, 'SN, NS'],
        ['Cả hai lần đều xuất hiện mặt ngửa', 1, 'NN'],
      ];
      const [name, count, list] = pick(rand, events);
      const p = frac(count, 4);
      return {
        prompt: `Gieo một đồng xu cân đối hai lần liên tiếp. Tính xác suất của biến cố "${name}", viết dưới dạng phân số tối giản.`,
        answer: p,
        display: show(p),
        simplest: true,
        hints: [
          'Kí hiệu S là mặt sấp, N là mặt ngửa; không gian mẫu là {SS; SN; NS; NN}.',
          'Bốn kết quả đồng khả năng; đếm các kết quả thuận lợi.',
        ],
        steps: [
          `Không gian mẫu {SS; SN; NS; NN} có 4 kết quả đồng khả năng; thuận lợi: ${list}.`,
          `P = ${reduced(count, 4, p)}.`,
        ],
      };
    }
    const N = int(rand, 10, 30);
    if (rand() < 0.5) {
      const k = pick(rand, [2, 3, 4, 5]);
      const count = Math.floor(N / k);
      const p = frac(count, N);
      return {
        prompt: `Một hộp có ${N} tấm thẻ đánh số từ 1 đến ${N}. Rút ngẫu nhiên một thẻ. Tính xác suất của biến cố "Số trên thẻ chia hết cho ${k}", viết dưới dạng phân số tối giản.`,
        answer: p,
        display: show(p),
        simplest: true,
        hints: [
          `Có ${N} kết quả đồng khả năng.`,
          `Các số chia hết cho ${k} là ${k}, ${2 * k}, ${3 * k}, …; đếm xem có bao nhiêu số không vượt quá ${N}.`,
        ],
        steps: [`Từ 1 đến ${N} có ${count} số chia hết cho ${k}.`, `P = ${reduced(count, N, p)}.`],
      };
    }
    const primes = PRIMES.filter((q) => q <= N);
    const p = frac(primes.length, N);
    return {
      prompt: `Một hộp có ${N} tấm thẻ đánh số từ 1 đến ${N}. Rút ngẫu nhiên một thẻ. Tính xác suất của biến cố "Số trên thẻ là số nguyên tố", viết dưới dạng phân số tối giản.`,
      answer: p,
      display: show(p),
      simplest: true,
      hints: [
        `Có ${N} kết quả đồng khả năng.`,
        'Số nguyên tố là số tự nhiên lớn hơn 1 chỉ có hai ước là 1 và chính nó; số 1 không phải số nguyên tố.',
      ],
      steps: [
        `Các số nguyên tố từ 1 đến ${N}: ${primes.join(', ')}, có ${primes.length} số.`,
        `P = ${reduced(primes.length, N, p)}.`,
      ],
    };
  },
};

/** Regular polygons whose interior angle is a whole number of degrees. */
const POLYGONS = [5, 6, 8, 9, 10, 12, 15, 18];

/** @type {ReviewSkill} */
export const gocNoiTiep = {
  id: 'goc-noi-tiep',
  label: 'Góc nội tiếp, tứ giác nội tiếp, đa giác đều',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const m = 2 * int(rand, 20, 85);
      const value = m / 2;
      return {
        prompt: `Trên đường tròn (O) lấy ba điểm A, B, C sao cho góc AOB bằng ${m}° và C thuộc cung lớn AB. Tính số đo góc ACB (độ).`,
        answer: whole(value),
        display: String(value),
        hints: [
          'Góc ACB là góc nội tiếp, góc AOB là góc ở tâm; cả hai cùng chắn cung nhỏ AB.',
          'Góc nội tiếp bằng nửa số đo cung bị chắn.',
        ],
        steps: [
          `Cung nhỏ AB có số đo ${m}° (bằng góc ở tâm AOB).`,
          `Góc ACB = ${m}° : 2 = ${value}°.`,
        ],
      };
    }
    if (v === 1) {
      const a = int(rand, 50, 130);
      const value = 180 - a;
      return {
        prompt: `Tứ giác ABCD nội tiếp một đường tròn và có góc BAD bằng ${a}°. Tính số đo góc BCD (độ).`,
        answer: whole(value),
        display: String(value),
        hints: [
          'Góc BAD và góc BCD là hai góc đối nhau của tứ giác.',
          'Trong tứ giác nội tiếp, tổng hai góc đối bằng 180°.',
        ],
        steps: [`Góc BAD + góc BCD = 180°.`, `Góc BCD = 180° − ${a}° = ${value}°.`],
      };
    }
    if (v === 2) {
      const n = pick(rand, POLYGONS);
      if (rand() < 0.5) {
        const value = ((n - 2) * 180) / n;
        return {
          prompt: `Tính số đo mỗi góc của một đa giác đều ${n} cạnh (độ).`,
          answer: whole(value),
          display: String(value),
          hints: [
            'Tổng các góc của một đa giác n cạnh là (n − 2) · 180°.',
            'Các góc của đa giác đều bằng nhau.',
          ],
          steps: [
            `Tổng các góc: (${n} − 2) · 180° = ${fmt((n - 2) * 180)}°.`,
            `Mỗi góc: ${fmt((n - 2) * 180)}° : ${n} = ${value}°.`,
          ],
        };
      }
      const value = 360 / n;
      return {
        prompt: `Phép quay thuận chiều kim đồng hồ tâm O góc α (0° < α ≤ 360°) biến đa giác đều ${n} cạnh tâm O thành chính nó. Tìm giá trị nhỏ nhất của α (độ).`,
        answer: whole(value),
        display: String(value),
        hints: [
          'Phép quay phải biến mỗi đỉnh thành một đỉnh khác của đa giác.',
          `Các đỉnh chia đường tròn ngoại tiếp thành ${n} cung bằng nhau.`,
        ],
        steps: [
          `Mỗi cung giữa hai đỉnh liên tiếp có số đo 360° : ${n}.`,
          `α nhỏ nhất bằng ${value}°.`,
        ],
      };
    }
    const [p, q, c] = triple(rand, 30);
    const shown = formatNumber(c / 2, 1);
    return {
      prompt: `Tam giác ABC vuông tại A có AB = ${p} cm, AC = ${q} cm. Tính bán kính đường tròn ngoại tiếp tam giác ABC (cm).`,
      answer: frac(c, 2),
      display: shown,
      hints: [
        'Tâm đường tròn ngoại tiếp tam giác vuông là trung điểm của cạnh huyền.',
        'Tìm cạnh huyền BC bằng định lí Pythagore.',
      ],
      steps: [
        `BC² = ${p}² + ${q}² = ${fmt(c * c)}, nên BC = ${c} cm.`,
        `R = BC : 2 = ${shown} cm.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const hinhKhoi = {
  id: 'hinh-khoi',
  label: 'Hình trụ, hình nón, hình cầu',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const r = int(rand, 1, 10);
      const h = int(rand, 2, 15);
      if (rand() < 0.5) {
        const k = r * r * h;
        return {
          prompt: `Một hình trụ có bán kính đáy ${r} cm và chiều cao ${h} cm. Viết thể tích của nó dưới dạng kπ (cm³) rồi nhập k.`,
          answer: whole(k),
          display: fmt(k),
          hints: ['Thể tích hình trụ: V = πr²h.', 'Giữ π lại, chỉ tính r² · h.'],
          steps: [`V = π · ${r}² · ${h} = ${fmt(k)}π (cm³).`, `k = ${fmt(k)}.`],
        };
      }
      const k = 2 * r * h;
      return {
        prompt: `Một hình trụ có bán kính đáy ${r} cm và chiều cao ${h} cm. Viết diện tích xung quanh của nó dưới dạng kπ (cm²) rồi nhập k.`,
        answer: whole(k),
        display: fmt(k),
        hints: [
          'Diện tích xung quanh hình trụ: S xq = 2πrh.',
          'Đó là diện tích hình chữ nhật có một cạnh là chu vi đáy, cạnh kia là chiều cao.',
        ],
        steps: [`S xq = 2π · ${r} · ${h} = ${fmt(k)}π (cm²).`, `k = ${fmt(k)}.`],
      };
    }
    if (v === 1) {
      const [r, h, l] = triple(rand, 26);
      if (rand() < 0.5) {
        const k = frac(r * r * h, 3);
        return {
          prompt: `Một hình nón có bán kính đáy ${r} cm và chiều cao ${h} cm. Viết thể tích của nó dưới dạng kπ (cm³) rồi nhập k.`,
          answer: k,
          display: k.d === 1 ? fmt(k.n) : show(k),
          hints: [
            'Thể tích hình nón: V = (1/3)πr²h.',
            'Bằng một phần ba thể tích hình trụ cùng đáy, cùng chiều cao.',
          ],
          steps: [
            `V = (1/3) · π · ${r}² · ${h} = ${piText(k)} (cm³).`,
            `k = ${k.d === 1 ? fmt(k.n) : show(k)}.`,
          ],
        };
      }
      const k = r * l;
      return {
        prompt: `Một hình nón có bán kính đáy ${r} cm và chiều cao ${h} cm. Viết diện tích xung quanh của nó dưới dạng kπ (cm²) rồi nhập k.`,
        answer: whole(k),
        display: fmt(k),
        hints: [
          'Diện tích xung quanh hình nón: S xq = πrl, với l là độ dài đường sinh.',
          'Đường sinh, bán kính đáy và chiều cao tạo thành một tam giác vuông: l² = r² + h².',
        ],
        steps: [
          `l² = ${r}² + ${h}² = ${fmt(l * l)}, nên l = ${l} cm.`,
          `S xq = π · ${r} · ${l} = ${fmt(k)}π (cm²), nên k = ${fmt(k)}.`,
        ],
      };
    }
    const R = int(rand, 1, 9);
    const byDiameter = rand() < 0.4;
    const given = byDiameter ? `đường kính ${2 * R} cm` : `bán kính ${R} cm`;
    const pre = byDiameter ? [`Bán kính R = ${2 * R} : 2 = ${R} cm.`] : [];
    if (rand() < 0.5) {
      const k = 4 * R * R;
      return {
        prompt: `Một hình cầu có ${given}. Viết diện tích mặt cầu dưới dạng kπ (cm²) rồi nhập k.`,
        answer: whole(k),
        display: fmt(k),
        hints: ['Diện tích mặt cầu: S = 4πR².', 'Nhớ dùng bán kính, không phải đường kính.'],
        steps: [...pre, `S = 4π · ${R}² = ${fmt(k)}π (cm²).`, `k = ${fmt(k)}.`],
      };
    }
    const k = frac(4 * R * R * R, 3);
    const shown = k.d === 1 ? fmt(k.n) : show(k);
    return {
      prompt: `Một hình cầu có ${given}. Viết thể tích hình cầu dưới dạng kπ (cm³) rồi nhập k.`,
      answer: k,
      display: shown,
      hints: ['Thể tích hình cầu: V = (4/3)πR³.', 'Nhớ dùng bán kính, không phải đường kính.'],
      steps: [...pre, `V = (4/3) · π · ${R}³ = ${piText(k)} (cm³).`, `k = ${shown}.`],
    };
  },
};

/** Every chapter of the year-end review, in book order. */
export const REVIEW_SKILLS = [
  hePhuongTrinh,
  phuongTrinhMotAn,
  canThuc,
  heThucLuong,
  duongTron,
  phuongTrinhBacHai,
  tanSo,
  xacSuat,
  gocNoiTiep,
  hinhKhoi,
];
