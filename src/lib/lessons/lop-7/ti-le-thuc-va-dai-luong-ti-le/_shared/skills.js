/**
 * Question generators for the chapter "Tỉ lệ thức và đại lượng tỉ lệ", one
 * skill per theory lesson. Every answer is an integer, so a drill board
 * reads input with `readInteger` and writes answers with `intText`.
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import { intText, termText } from './numbers.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/**
 * A non-zero integer from −hi to hi.
 * @param {() => number} rand
 * @param {number} hi
 */
const signed = (rand, hi) => (rand() < 0.5 ? -1 : 1) * int(rand, 1, hi);

/**
 * Two different whole numbers from lo to hi.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 * @returns {[number, number]}
 */
function twoDifferent(rand, lo, hi) {
  const a = int(rand, lo, hi);
  let b = int(rand, lo, hi - 1);
  if (b >= a) b++;
  return [a, b];
}

/**
 * Four terms a, b, c, d of a proportion a/b = c/d with b, d > 0: a common
 * ratio s/t in lowest terms scaled by two different factors.
 * @param {() => number} rand
 */
function proportion(rand) {
  for (;;) {
    const s = signed(rand, 9);
    const t = int(rand, 2, 9);
    if (gcd(s, t) !== 1) continue;
    const [u, v] = twoDifferent(rand, 1, 6);
    return [s * u, t * u, s * v, t * v];
  }
}

/** Term names in a : b = c : d, with the kind of each term. */
const ROLE = ['ngoại tỉ', 'trung tỉ', 'trung tỉ', 'ngoại tỉ'];

/**
 * A proportion as plain text, a/b = c/d, with `hole` written in place of
 * the term at `at`.
 * @param {number[]} t
 * @param {number} at
 * @param {string} hole
 */
function proportionText(t, at, hole) {
  const w = t.map((v, i) => (i === at ? hole : intText(v)));
  return `${w[0]}/${w[1]} = ${w[2]}/${w[3]}`;
}

/**
 * Steps that find term `at` of a proportion from its cross products.
 * @param {number[]} t
 * @param {number} at
 * @param {string} name what the missing term is called in the steps
 */
function crossSteps(t, at, name) {
  const outer = at === 0 || at === 3;
  const [p, q] = outer ? [t[1], t[2]] : [t[0], t[3]];
  const own = t[3 - at];
  const product = p * q;
  return [
    outer
      ? `${name} là một ngoại tỉ: tích hai ngoại tỉ bằng tích hai trung tỉ, nên ${name} · ${termText(own)} = ${termText(p)} · ${termText(q)} = ${intText(product)}.`
      : `${name} là một trung tỉ: tích hai trung tỉ bằng tích hai ngoại tỉ, nên ${name} · ${termText(own)} = ${termText(p)} · ${termText(q)} = ${intText(product)}.`,
    `${name} = ${intText(product)} : ${termText(own)} = ${intText(t[at])}.`,
  ];
}

/** @type {Skill} */
export const tiLeThuc = {
  id: 'ti-le-thuc',
  label: 'Bài 20. Tỉ lệ thức',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const t = proportion(rand);
      const at = int(rand, 0, 3);
      return {
        prompt: `Tìm x, biết ${proportionText(t, at, 'x')}.`,
        answer: t[at],
        hints: [
          `x là một ${ROLE[at]} của tỉ lệ thức.`,
          at === 0 || at === 3
            ? 'Ngoại tỉ chưa biết bằng tích hai trung tỉ chia cho ngoại tỉ đã biết.'
            : 'Trung tỉ chưa biết bằng tích hai ngoại tỉ chia cho trung tỉ đã biết.',
        ],
        steps: crossSteps(t, at, 'x'),
      };
    }
    if (v === 1) {
      const t = proportion(rand);
      const e = signed(rand, 9);
      const x = t[0] - e;
      const head = e > 0 ? `(x + ${e})` : `(x − ${-e})`;
      return {
        prompt: `Tìm x, biết ${head}/${t[1]} = ${intText(t[2])}/${t[3]}.`,
        answer: x,
        hints: [
          `Coi ${head} là một ngoại tỉ chưa biết và tìm nó trước.`,
          `${head} = ${t[1]} · ${termText(t[2])} : ${t[3]}.`,
        ],
        steps: [
          ...crossSteps(t, 0, head),
          e > 0
            ? `x = ${intText(t[0])} − ${e} = ${intText(x)}.`
            : `x = ${intText(t[0])} + ${-e} = ${intText(x)}.`,
        ],
      };
    }
    /** @type {Array<{ p: number, q: number, r: number, s: number, ok: boolean }>} */
    const pairs = [];
    const want = int(rand, 0, 4);
    while (pairs.length < 4) {
      const ok = pairs.filter((x) => x.ok).length < want;
      const s0 = int(rand, 1, 9);
      const t0 = int(rand, 2, 9);
      if (s0 === t0 || gcd(s0, t0) !== 1) continue;
      const [u, w] = twoDifferent(rand, 1, 5);
      const p = s0 * u;
      const q = t0 * u;
      const r = s0 * w;
      const s = ok ? t0 * w : t0 * w + pick(rand, [-1, 1]);
      if (s <= 0 || (!ok && p * s === q * r)) continue;
      pairs.push({ p, q, r, s, ok });
    }
    const list = shuffle(rand, pairs);
    const count = list.filter((x) => x.ok).length;
    return {
      prompt: `Có bao nhiêu cặp tỉ số lập thành tỉ lệ thức? ${list
        .map((x, i) => `(${i + 1}) ${x.p} : ${x.q} và ${x.r} : ${x.s}`)
        .join('; ')}.`,
      answer: count,
      hints: [
        'Hai tỉ số p : q và r : s lập thành tỉ lệ thức khi p · s = q · r.',
        'Hoặc rút gọn từng tỉ số rồi so sánh.',
      ],
      steps: [
        ...list.map(
          (x, i) =>
            `(${i + 1}) ${x.p} · ${x.s} = ${x.p * x.s}, ${x.q} · ${x.r} = ${x.q * x.r}: ${x.ok ? 'bằng nhau, lập thành tỉ lệ thức' : 'khác nhau, không lập thành tỉ lệ thức'}.`,
        ),
        `Có ${count} cặp lập thành tỉ lệ thức.`,
      ],
    };
  },
};

/**
 * Three-part sharing stories. `fits` rejects ratios the story cannot have
 * (three sides of a triangle).
 * @type {Array<{ text: (n: number, r: number[]) => string, ask: string, who: string[], unit: string, fits: (r: number[]) => boolean }>}
 */
const STORIES = [
  {
    text: (n, r) =>
      `Ba lớp 7A, 7B, 7C quyên góp được ${n} quyển sách, số sách của ba lớp tỉ lệ với ${r.join('; ')}.`,
    ask: 'Lớp {who} quyên góp được bao nhiêu quyển sách?',
    who: ['7A', '7B', '7C'],
    unit: 'quyển',
    fits: () => true,
  },
  {
    text: (n, r) => `Ba tổ trồng được tất cả ${n} cây, số cây của ba tổ tỉ lệ với ${r.join('; ')}.`,
    ask: 'Tổ {who} trồng được bao nhiêu cây?',
    who: ['1', '2', '3'],
    unit: 'cây',
    fits: () => true,
  },
  {
    text: (n, r) => `Một tam giác có chu vi ${n} cm, độ dài ba cạnh tỉ lệ với ${r.join('; ')}.`,
    ask: 'Cạnh {who} dài bao nhiêu xăng-ti-mét?',
    who: ['tỉ lệ với số thứ nhất', 'tỉ lệ với số thứ hai', 'tỉ lệ với số thứ ba'],
    unit: 'cm',
    fits: ([a, b, c]) => a < b + c && b < a + c && c < a + b,
  },
];

/** @type {Skill} */
export const dayTiSo = {
  id: 'day-ti-so',
  label: 'Bài 21. Dãy tỉ số bằng nhau',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0 || v === 1) {
      const [m, n] = twoDifferent(rand, 2, 9);
      const k = signed(rand, 12);
      const x = m * k;
      const y = n * k;
      const askX = rand() < 0.5;
      const sum = v === 0;
      const known = sum ? x + y : x - y;
      const op = sum ? '+' : '−';
      return {
        prompt: `Cho x/${m} = y/${n} và x ${op} y = ${intText(known)}. Tính ${askX ? 'x' : 'y'}.`,
        answer: askX ? x : y,
        hints: [
          `Áp dụng tính chất của dãy tỉ số bằng nhau: x/${m} = y/${n} = (x ${op} y)/(${m} ${op} ${n}).`,
          `Tính giá trị chung rồi nhân với ${askX ? m : n}.`,
        ],
        steps: [
          `x/${m} = y/${n} = (x ${op} y)/(${m} ${op} ${n}) = ${intText(known)}/${sum ? m + n : intText(m - n)} = ${intText(k)}.`,
          askX
            ? `x = ${m} · ${termText(k)} = ${intText(x)}.`
            : `y = ${n} · ${termText(k)} = ${intText(y)}.`,
        ],
      };
    }
    if (v === 2) {
      const story = pick(rand, STORIES);
      for (;;) {
        const r = [int(rand, 1, 9), int(rand, 1, 9), int(rand, 1, 9)];
        if (gcd(gcd(r[0], r[1]), r[2]) !== 1 || !story.fits(r)) continue;
        const s = r[0] + r[1] + r[2];
        const k = int(rand, 2, 20);
        const n = s * k;
        const i = int(rand, 0, 2);
        return {
          prompt: `${story.text(n, r)} ${story.ask.replace('{who}', story.who[i])}`,
          answer: r[i] * k,
          hints: [
            `Gọi ba số cần tìm là a, b, c: a/${r[0]} = b/${r[1]} = c/${r[2]} và a + b + c = ${n}.`,
            `Chia ${n} thành ${r[0]} + ${r[1]} + ${r[2]} = ${s} phần bằng nhau.`,
          ],
          steps: [
            `a/${r[0]} = b/${r[1]} = c/${r[2]} = (a + b + c)/(${r[0]} + ${r[1]} + ${r[2]}) = ${n}/${s} = ${k}.`,
            `Số cần tìm ứng với số tỉ lệ ${r[i]}: ${r[i]} · ${k} = ${r[i] * k} ${story.unit}.`,
          ],
        };
      }
    }
    for (;;) {
      const m = int(rand, 2, 9);
      const n = int(rand, 2, 9);
      const p = int(rand, 2, 9);
      const den = m + n - p;
      if (den === 0) continue;
      const k = signed(rand, 9);
      const known = den * k;
      const ask = int(rand, 0, 2);
      const name = ['x', 'y', 'z'][ask];
      const coef = [m, n, p][ask];
      return {
        prompt: `Cho x/${m} = y/${n} = z/${p} và x + y − z = ${intText(known)}. Tính ${name}.`,
        answer: coef * k,
        hints: [
          `x/${m} = y/${n} = z/${p} = (x + y − z)/(${m} + ${n} − ${p}).`,
          `Mẫu ${m} + ${n} − ${p} = ${intText(den)}.`,
        ],
        steps: [
          `x/${m} = y/${n} = z/${p} = (x + y − z)/(${m} + ${n} − ${p}) = ${intText(known)}/${termText(den)} = ${intText(k)}.`,
          `${name} = ${coef} · ${termText(k)} = ${intText(coef * k)}.`,
        ],
      };
    }
  },
};

/** The skills practised on "Luyện tập chung" page 10. */
export const PAGE_10_SKILLS = [tiLeThuc, dayTiSo];
