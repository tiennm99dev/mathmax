/**
 * Question generators for the chapter "Căn bậc hai và căn bậc ba", for the
 * drill board of the practice and review lessons. Answers are integers,
 * decimals or fractions, so the board reads them with `readNumber` and
 * writes them with `numberText` from `#lib/core/decimal.js`. Every decimal
 * answer is built as an integer over a power of ten, so it is the very same
 * double that `readNumber` gives for its digits. Prompts and steps are plain
 * text with the book's minus sign and decimal comma.
 */

import { int, pick } from '#lib/core/drill.js';
import { numberText } from '#lib/core/decimal.js';
import { MINUS, fmt, intText } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * The decimal n / 10^places, as an exact-as-typed double.
 * @param {number} n
 * @param {number} places
 */
export function dec(n, places) {
  return n / 10 ** places;
}

/**
 * A number as the book writes it in plain text: '0,49', '−3', '2/3'.
 * @param {number} value
 */
const t = (value) => numberText(value);

/**
 * `ax + b` as plain text, with the book's minus sign: (3, −12) → '3x − 12',
 * (−2, 5) → '−2x + 5'.
 * @param {number} a non-zero
 * @param {number} b
 */
export function linText(a, b) {
  const lead = a === 1 ? 'x' : a === -1 ? `${MINUS}x` : `${intText(a)}x`;
  if (b === 0) return lead;
  return `${lead} ${b < 0 ? MINUS : '+'} ${fmt(Math.abs(b))}`;
}

/** @type {Skill} */
export const canBacHai = {
  id: 'can-bac-hai',
  label: 'Bài 7. Căn bậc hai và căn thức bậc hai',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      // √ of a short decimal square, such as √0,49 = 0,7 or √1,44 = 1,2.
      const k = int(rand, 2, 19);
      if (k % 10 === 0) return canBacHai.make(rand);
      const root = dec(k, 1);
      const square = dec(k * k, 2);
      return {
        prompt: `Tính √${t(square)}.`,
        answer: root,
        steps: [
          `Tìm số không âm có bình phương bằng ${t(square)}.`,
          `${t(root)}² = ${t(square)} và ${t(root)} > 0, nên √${t(square)} = ${t(root)}.`,
        ],
        hints: [`${k}² = ${fmt(k * k)}.`],
      };
    }
    if (variant === 1) {
      // √(A²) = |A| with A negative.
      const k = int(rand, 2, 15);
      return {
        prompt: `Tính √((${MINUS}${k})²).`,
        answer: k,
        steps: [
          `Áp dụng √(A²) = |A|: √((${MINUS}${k})²) = |${MINUS}${k}|.`,
          `|${MINUS}${k}| = ${k}.`,
        ],
        hints: ['Dùng hằng đẳng thức √(A²) = |A|.', 'Căn bậc hai số học không bao giờ âm.'],
      };
    }
    if (variant === 2) {
      // Smallest integer x for which √(ax + b) is defined, a > 0.
      const a = int(rand, 2, 5);
      const b = int(rand, -20, 20);
      if (b === 0) return canBacHai.make(rand);
      const x = Math.ceil(-b / a);
      const g = gcd(Math.abs(b), a);
      const bound = a / g === 1 ? intText(-b / a) : `${intText(-b / g)}/${a / g}`;
      return {
        prompt: `Tìm số nguyên x nhỏ nhất để √(${linText(a, b)}) xác định.`,
        answer: x,
        steps: [
          `√(${linText(a, b)}) xác định khi ${linText(a, b)} ≥ 0.`,
          `${a}x ≥ ${intText(-b)}, nên x ≥ ${bound}.`,
          `Số nguyên nhỏ nhất thoả mãn là ${intText(x)}.`,
        ],
        hints: ['√A xác định khi A ≥ 0.', `Giải bất phương trình ${linText(a, b)} ≥ 0.`],
      };
    }
    // √(x² − 2rx + r²) = |x − r| at a given x.
    const r = int(rand, 1, 6) * pick(rand, [1, -1]);
    let x0 = int(rand, -8, 8);
    if (x0 === r) x0 += 3;
    const mid = -2 * r;
    const expr = `x² ${mid < 0 ? MINUS : '+'} ${Math.abs(mid)}x + ${r * r}`;
    const factor = r > 0 ? `x ${MINUS} ${r}` : `x + ${-r}`;
    const value = Math.abs(x0 - r);
    return {
      prompt: `Tính giá trị của √(${expr}) tại x = ${intText(x0)}.`,
      answer: value,
      steps: [
        `${expr} = (${factor})², nên √(${expr}) = |${factor}|.`,
        `Tại x = ${intText(x0)}: |${intText(x0)} ${r > 0 ? MINUS : '+'} ${Math.abs(r)}| = |${intText(x0 - r)}| = ${value}.`,
      ],
      hints: [
        'Biểu thức dưới dấu căn là một bình phương.',
        `Viết nó thành (${factor})² rồi dùng √(A²) = |A|.`,
      ],
    };
  },
};

/** Square-free factors that keep √(s·u²) out of the perfect squares. */
const FREE = [2, 3, 5, 6, 7, 10];

/** @type {Skill} */
export const canCuaTich = {
  id: 'can-cua-tich',
  label: 'Bài 8. Căn của một tích',
  make(rand) {
    if (rand() < 0.5) {
      // Khai căn một tích: √(p²·q²) = p·q.
      const p = int(rand, 2, 12);
      const q = int(rand, 2, 15);
      return {
        prompt: `Tính √(${fmt(p * p)} · ${fmt(q * q)}).`,
        answer: p * q,
        steps: [
          `√(${fmt(p * p)} · ${fmt(q * q)}) = √${fmt(p * p)} · √${fmt(q * q)}.`,
          `= ${p} · ${q} = ${fmt(p * q)}.`,
        ],
        hints: ['Khai căn từng thừa số rồi nhân các kết quả.'],
      };
    }
    // Nhân các căn: √(s·u²) · √(s·v²) = √(s²u²v²) = s·u·v.
    const s = pick(rand, FREE);
    const u = int(rand, 1, 4);
    let v = int(rand, 1, 5);
    if (u === v) v += 1;
    const a = s * u * u;
    const b = s * v * v;
    return {
      prompt: `Tính √${fmt(a)} · √${fmt(b)}.`,
      answer: s * u * v,
      steps: [
        `Nhân các số dưới dấu căn: √${fmt(a)} · √${fmt(b)} = √(${fmt(a)} · ${fmt(b)}) = √${fmt(a * b)}.`,
        `${fmt(a * b)} = ${s * u * v}², nên kết quả là ${fmt(s * u * v)}.`,
      ],
      hints: [
        'Từng căn không khai được, nhưng tích của chúng thì được.',
        `Nhân ${fmt(a)} · ${fmt(b)} rồi khai căn.`,
      ],
    };
  },
};

/**
 * Greatest common divisor of two natural numbers.
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function gcd(x, y) {
  return y === 0 ? x : gcd(y, x % y);
}

/** @type {Skill} */
export const canCuaThuong = {
  id: 'can-cua-thuong',
  label: 'Bài 8. Căn của một thương',
  make(rand) {
    if (rand() < 0.5) {
      // Khai căn một thương: √(p²/q²) = p/q, in lowest terms.
      for (;;) {
        const p = int(rand, 1, 12);
        const q = int(rand, 2, 15);
        if (gcd(p, q) !== 1) continue;
        return {
          prompt: `Tính √(${fmt(p * p)}/${fmt(q * q)}). Nhập kết quả dưới dạng phân số.`,
          answer: p / q,
          steps: [
            `√(${fmt(p * p)}/${fmt(q * q)}) = √${fmt(p * p)} / √${fmt(q * q)}.`,
            `= ${p}/${q}.`,
          ],
          hints: ['Căn của một thương bằng thương các căn.'],
        };
      }
    }
    // Chia hai căn: √(s·u²·k²) / √(s·u²) = k.
    const s = pick(rand, FREE);
    const u = int(rand, 1, 3);
    const k = int(rand, 2, 9);
    const b = s * u * u;
    const a = b * k * k;
    if (a > 999) return canCuaThuong.make(rand);
    return {
      prompt: `Tính √${fmt(a)} / √${fmt(b)}.`,
      answer: k,
      steps: [`√${fmt(a)} / √${fmt(b)} = √(${fmt(a)}/${fmt(b)}) = √${k * k}.`, `√${k * k} = ${k}.`],
      hints: ['Gộp thành căn của một thương.', `Chia ${fmt(a)} cho ${fmt(b)} trước.`],
    };
  },
};

/** The skills of "Luyện tập chung" after Bài 7 and Bài 8. */
export const SKILLS_TRANG_52 = [canBacHai, canCuaTich, canCuaThuong];

/** @type {Skill} */
export const dauCan = {
  id: 'dau-can',
  label: 'Bài 9. Đưa thừa số ra ngoài, vào trong dấu căn',
  make(rand) {
    const variant = int(rand, 0, 2);
    const s = pick(rand, FREE);
    if (variant === 0) {
      // Đưa thừa số ra ngoài dấu căn: √(k²·s) = k√s.
      const k = int(rand, 2, 9);
      const n = k * k * s;
      return {
        prompt: `Đưa thừa số ra ngoài dấu căn: √${fmt(n)} = a√${s}. Tìm a.`,
        answer: k,
        steps: [
          `${fmt(n)} = ${k * k} · ${s}, trong đó ${k * k} = ${k}².`,
          `√${fmt(n)} = √(${k}² · ${s}) = ${k}√${s}.`,
        ],
        hints: [`Viết ${fmt(n)} thành tích của một số chính phương với ${s}.`, '√(A²B) = |A|√B.'],
      };
    }
    if (variant === 1) {
      // Đưa thừa số vào trong dấu căn, kể cả khi thừa số âm.
      const k = int(rand, 2, 9);
      const negative = rand() < 0.3;
      const lead = negative ? `${MINUS}${k}` : `${k}`;
      const root = negative ? `${MINUS}√n` : '√n';
      return {
        prompt: `Đưa thừa số vào trong dấu căn: ${lead}√${s} = ${root}. Tìm n.`,
        answer: k * k * s,
        steps: [
          negative
            ? `Thừa số ${MINUS}${k} âm nên giữ dấu trừ ở ngoài: ${lead}√${s} = ${MINUS}√(${k}² · ${s}).`
            : `${k}√${s} = √(${k}² · ${s}).`,
          `${k}² · ${s} = ${k * k} · ${s} = ${fmt(k * k * s)}.`,
        ],
        hints: negative
          ? ['Với A < 0: A√B = −√(A²B).', `Bình phương ${k} rồi nhân với ${s}.`]
          : ['Với A ≥ 0: A√B = √(A²B).', `Bình phương ${k} rồi nhân với ${s}.`],
      };
    }
    // Cộng, trừ các căn đồng dạng: √(u²s) + √(v²s) − √(w²s) = (u + v − w)√s.
    for (;;) {
      const u = int(rand, 2, 5);
      const v = int(rand, 2, 6);
      const w = int(rand, 1, 6);
      const a = u + v - w;
      if (a === 0 || u === v || v === w || u === w) continue;
      const [p, q, r] = [u * u * s, v * v * s, w * w * s].map(fmt);
      const term = (/** @type {number} */ c) =>
        c === 1 ? `√${s}` : c === -1 ? `${MINUS}√${s}` : `${intText(c)}√${s}`;
      return {
        prompt: `Rút gọn: √${p} + √${q} ${MINUS} √${r} = a√${s}. Tìm a.`,
        answer: a,
        steps: [
          `Đưa thừa số ra ngoài dấu căn: √${p} = ${term(u)}, √${q} = ${term(v)}, √${r} = ${term(w)}.`,
          `Cộng các căn đồng dạng: (${u} + ${v} ${MINUS} ${w})√${s} = ${term(a)}.`,
          `Vậy a = ${intText(a)}.`,
        ],
        hints: [
          `Mỗi số dưới dấu căn đều bằng ${s} nhân với một số chính phương.`,
          'Đưa thừa số ra ngoài để có các căn đồng dạng rồi cộng, trừ hệ số.',
        ],
      };
    }
  },
};

/** @type {Skill} */
export const rutGon = {
  id: 'rut-gon',
  label: 'Bài 9. Trục căn thức ở mẫu, rút gọn',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      // Trục căn thức ở mẫu: ks / √s = k√s.
      const s = pick(rand, FREE);
      const k = int(rand, 2, 9);
      const num = k * s;
      return {
        prompt: `Trục căn thức ở mẫu: ${num}/√${s} = a√${s}. Tìm a.`,
        answer: k,
        steps: [
          `Nhân cả tử và mẫu với √${s}: ${num}/√${s} = ${num}√${s} / (√${s} · √${s}) = ${num}√${s} / ${s}.`,
          `Rút gọn ${num} : ${s} = ${k}, nên ${num}/√${s} = ${k}√${s}.`,
        ],
        hints: [`Nhân cả tử và mẫu với √${s}.`, `√${s} · √${s} = ${s}.`],
      };
    }
    if (variant === 1) {
      // Biểu thức liên hợp: 1/(r − √s) + 1/(r + √s) = 2r / (r² − s).
      for (;;) {
        const r = int(rand, 2, 6);
        const divisors = [];
        for (let d = 1; d <= 2 * r; d++) if ((2 * r) % d === 0) divisors.push(d);
        const d = pick(rand, divisors);
        const s = r * r - d;
        if (s <= 1 || Number.isInteger(Math.sqrt(s))) continue;
        return {
          prompt: `Tính 1/(${r} ${MINUS} √${s}) + 1/(${r} + √${s}).`,
          answer: (2 * r) / d,
          steps: [
            `Mẫu chung: (${r} ${MINUS} √${s})(${r} + √${s}) = ${r}² ${MINUS} ${s} = ${d}.`,
            `Tử: (${r} + √${s}) + (${r} ${MINUS} √${s}) = ${2 * r}.`,
            `Kết quả: ${2 * r} : ${d} = ${(2 * r) / d}.`,
          ],
          hints: [
            `${r} ${MINUS} √${s} và ${r} + √${s} là hai biểu thức liên hợp.`,
            'Quy đồng mẫu rồi dùng hằng đẳng thức (a − b)(a + b) = a² − b².',
          ],
        };
      }
    }
    // (√(a²s) − √(b²s) + √(c²s)) : √s = a − b + c.
    for (;;) {
      const s = pick(rand, [2, 3, 5]);
      const a = int(rand, 1, 4);
      const b = int(rand, 2, 6);
      const c = int(rand, 2, 6);
      if (a === b || b === c || a === c || a - b + c === 0) continue;
      const [p, q, r] = [a * a * s, b * b * s, c * c * s].map(fmt);
      return {
        prompt: `Tính (√${p} ${MINUS} √${q} + √${r}) : √${s}.`,
        answer: a - b + c,
        steps: [
          `Chia từng số hạng cho √${s}: √(${p} : ${s}) ${MINUS} √(${q} : ${s}) + √(${r} : ${s}) = √${a * a} ${MINUS} √${b * b} + √${c * c}.`,
          `= ${a} ${MINUS} ${b} + ${c} = ${intText(a - b + c)}.`,
        ],
        hints: [
          'Thương của hai căn bằng căn của thương: √A : √B = √(A : B).',
          `Hoặc đưa thừa số ra ngoài dấu căn để có các căn đồng dạng với √${s}.`,
        ],
      };
    }
  },
};

/** Non-cube factors for products of cube roots that come out whole. */
const NON_CUBE = [2, 3, 4, 5];

/** @type {Skill} */
export const canBacBa = {
  id: 'can-bac-ba',
  label: 'Bài 10. Căn bậc ba và căn thức bậc ba',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0 || variant === 1) {
      // ∛ of an integer cube (variant 0) or of a decimal cube (variant 1).
      const k = variant === 0 ? int(rand, 2, 12) : int(rand, 1, 9);
      const negative = rand() < 0.5;
      const sign = negative ? -1 : 1;
      const root = variant === 0 ? sign * k : sign * dec(k, 1);
      const cube = variant === 0 ? sign * k ** 3 : sign * dec(k ** 3, 3);
      const cubeText = variant === 0 ? `${negative ? MINUS : ''}${fmt(k ** 3)}` : t(cube);
      const arg = negative ? `(${cubeText})` : cubeText;
      const rootText = variant === 0 ? intText(root) : t(root);
      const base = negative ? `(${rootText})` : rootText;
      return {
        prompt: `Tính ∛${arg}.`,
        answer: root,
        steps: [
          `Tìm số có lập phương bằng ${cubeText}.`,
          `${base}³ = ${cubeText}, nên ∛${arg} = ${rootText}.`,
        ],
        hints: [
          negative
            ? 'Căn bậc ba của một số âm là một số âm.'
            : 'Tìm số x sao cho x³ bằng số dưới dấu căn.',
          variant === 0 ? `Thử các lập phương 2³ = 8, 3³ = 27, 4³ = 64, …` : `${k}³ = ${k ** 3}.`,
        ],
      };
    }
    if (variant === 2) {
      // ∛(su³) · ∛(s²v³) = ∛((suv)³) = suv.
      const s = pick(rand, NON_CUBE);
      const u = int(rand, 1, 3);
      const v = int(rand, 1, 3);
      const a = s * u ** 3;
      const b = s * s * v ** 3;
      const k = s * u * v;
      return {
        prompt: `Tính ∛${fmt(a)} · ∛${fmt(b)}.`,
        answer: k,
        steps: [
          `∛${fmt(a)} · ∛${fmt(b)} = ∛(${fmt(a)} · ${fmt(b)}) = ∛${fmt(a * b)}.`,
          `${fmt(a * b)} = ${k}³, nên kết quả là ${k}.`,
        ],
        hints: [
          'Từng căn không khai được, nhưng tích của chúng thì được.',
          'Dùng tính chất ∛a · ∛b = ∛(ab).',
        ],
      };
    }
    // Giải phương trình ∛(ax + b) = c bằng cách lập phương hai vế.
    for (;;) {
      const a = int(rand, 1, 5) * pick(rand, [1, -1]);
      const c = int(rand, -4, 4);
      const x = int(rand, -9, 9);
      const b = c ** 3 - a * x;
      if (c === 0 || b === 0 || Math.abs(b) > 99) continue;
      const lhs = linText(a, b);
      const ax = c ** 3 - b;
      return {
        prompt: `Tìm x, biết ∛(${lhs}) = ${intText(c)}.`,
        answer: x,
        steps: [
          `Lập phương hai vế: ${lhs} = ${c < 0 ? `(${intText(c)})` : c}³ = ${intText(c ** 3)}.`,
          `${linText(a, 0)} = ${intText(ax)}, nên x = ${intText(ax)} : ${a < 0 ? `(${intText(a)})` : a} = ${intText(x)}.`,
        ],
        hints: ['Với mọi A: (∛A)³ = A.', 'Lập phương hai vế để mất dấu căn.'],
      };
    }
  },
};

/** @type {Skill} */
export const thucTe = {
  id: 'thuc-te',
  label: 'Vận dụng: bài toán thực tế',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const k = int(rand, 6, 30);
      return {
        prompt: `Một mảnh vườn hình vuông có diện tích ${fmt(k * k)} m². Tính chu vi mảnh vườn theo mét.`,
        answer: 4 * k,
        unit: 'm',
        steps: [
          `Cạnh mảnh vườn dài √${fmt(k * k)} = ${k} (m).`,
          `Chu vi: 4 · ${k} = ${4 * k} (m).`,
        ],
        hints: ['Diện tích hình vuông bằng bình phương cạnh.', 'Tìm cạnh bằng căn bậc hai.'],
      };
    }
    if (variant === 1) {
      const k = int(rand, 3, 20);
      return {
        prompt: `Một bể nước hình lập phương chứa đầy được ${fmt(k ** 3)} lít nước. Tính độ dài cạnh của bể theo đềximét (1 lít = 1 dm³).`,
        answer: k,
        unit: 'dm',
        steps: [
          `Thể tích bể là ${fmt(k ** 3)} dm³ = a³, với a là cạnh bể.`,
          `a = ∛${fmt(k ** 3)} = ${k} (dm).`,
        ],
        hints: ['Thể tích hình lập phương bằng lập phương của cạnh.', 'Tìm cạnh bằng căn bậc ba.'],
      };
    }
    const time = int(rand, 2, 9);
    const h = 5 * time * time;
    return {
      prompt: `Thời gian t (giây) để một vật rơi tự do từ độ cao h (mét) chạm đất được tính gần đúng bởi t = √(h/5). Vật rơi từ độ cao ${h} m thì sau bao nhiêu giây chạm đất?`,
      answer: time,
      unit: 's',
      steps: [`Thay h = ${h}: t = √(${h}/5) = √${time * time}.`, `t = ${time} (giây).`],
      hints: ['Thay h vào công thức.', `Tính ${h} : 5 trước rồi khai căn.`],
    };
  },
};

/** The skills of "Luyện tập chung" after Bài 9 and Bài 10. */
export const SKILLS_TRANG_63 = [dauCan, rutGon, canBacBa];

/** Every skill of the chapter, for "Bài tập cuối chương 3". */
export const CHAPTER_SKILLS = [...SKILLS_TRANG_52, ...SKILLS_TRANG_63, thucTe];
