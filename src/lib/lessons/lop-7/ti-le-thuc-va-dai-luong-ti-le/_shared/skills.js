/**
 * Question generators for the chapter "Tỉ lệ thức và đại lượng tỉ lệ", one
 * skill per theory lesson plus one of real-life applications. Every answer
 * is an integer, so a drill board reads input with `readInteger` and writes
 * answers with `intText`.
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

/**
 * The divisors of a positive integer, smallest first.
 * @param {number} n
 */
function divisors(n) {
  /** @type {number[]} */
  const out = [];
  for (let d = 1; d <= n; d++) if (n % d === 0) out.push(d);
  return out;
}

/**
 * A ratio p/q (q > 0) as plain text: '−3', '5/2', '−3/2'.
 * @param {number} p
 * @param {number} q
 */
function ratioText(p, q) {
  const g = gcd(p, q);
  const [a, b] = [p / g, q / g];
  return b === 1 ? intText(a) : `${intText(a)}/${b}`;
}

/**
 * Real-life pairs of directly proportional quantities: the known pair
 * (a1, b1 = rate · a1) and a new a2; the question asks for b2.
 * @type {Array<{ text: (a1: number, b1: number, a2: number) => string, rate: [number, number], a: [number, number], pair: string, unit: string }>}
 */
const DIRECT = [
  {
    text: (a1, b1, a2) =>
      `Mua ${a1} quyển vở hết ${b1} nghìn đồng. Hỏi mua ${a2} quyển vở cùng loại hết bao nhiêu nghìn đồng?`,
    rate: [6, 15],
    a: [2, 12],
    pair: 'Số tiền phải trả và số quyển vở',
    unit: 'nghìn đồng',
  },
  {
    text: (a1, b1, a2) =>
      `Một máy in in được ${b1} trang trong ${a1} phút. Hỏi trong ${a2} phút máy in đó in được bao nhiêu trang?`,
    rate: [15, 40],
    a: [2, 15],
    pair: 'Số trang in được và thời gian in',
    unit: 'trang',
  },
  {
    text: (a1, b1, a2) =>
      `Một công nhân làm được ${b1} sản phẩm trong ${a1} giờ. Hỏi với năng suất như vậy, trong ${a2} giờ người đó làm được bao nhiêu sản phẩm?`,
    rate: [4, 12],
    a: [2, 10],
    pair: 'Số sản phẩm và thời gian làm',
    unit: 'sản phẩm',
  },
];

/** @type {Skill} */
export const tiLeThuan = {
  id: 'ti-le-thuan',
  label: 'Bài 22. Đại lượng tỉ lệ thuận',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      for (;;) {
        const p = signed(rand, 9);
        const q = int(rand, 1, 5);
        if (gcd(p, q) !== 1) continue;
        const u = signed(rand, 6);
        const w = signed(rand, 6);
        if (u === w) continue;
        const [x1, y1, x2] = [q * u, p * u, q * w];
        const k = ratioText(p, q);
        return {
          prompt: `Cho biết y tỉ lệ thuận với x và khi x = ${intText(x1)} thì y = ${intText(y1)}. Tính y khi x = ${intText(x2)}.`,
          answer: p * w,
          hints: [
            'y tỉ lệ thuận với x nên y = kx; tìm hệ số tỉ lệ k trước.',
            `k = ${intText(y1)} : ${termText(x1)}.`,
          ],
          steps: [
            `y = kx nên k = y : x = ${intText(y1)} : ${termText(x1)} = ${k}.`,
            `Khi x = ${intText(x2)}: y = ${k} · ${termText(x2)} = ${intText(p * w)}.`,
          ],
        };
      }
    }
    if (v === 1) {
      const k = signed(rand, 12);
      const x = signed(rand, 9);
      return {
        prompt: `Cho biết y tỉ lệ thuận với x và khi x = ${intText(x)} thì y = ${intText(k * x)}. Tìm hệ số tỉ lệ của y đối với x.`,
        answer: k,
        hints: ['y = kx, nên hệ số tỉ lệ k = y : x.', 'Chú ý dấu của thương.'],
        steps: [`k = y : x = ${intText(k * x)} : ${termText(x)} = ${intText(k)}.`],
      };
    }
    if (v === 2) {
      const story = pick(rand, DIRECT);
      const r = int(rand, ...story.rate);
      const [a1, a2] = twoDifferent(rand, ...story.a);
      const b1 = r * a1;
      return {
        prompt: story.text(a1, b1, a2),
        answer: r * a2,
        hints: [
          `${story.pair} là hai đại lượng tỉ lệ thuận.`,
          `Gọi đại lượng cần tìm là y, ta có y/${a2} = ${b1}/${a1}.`,
        ],
        steps: [
          `${story.pair} là hai đại lượng tỉ lệ thuận, nên y/${a2} = ${b1}/${a1}.`,
          `y = ${b1} · ${a2} : ${a1} = ${r * a2} (${story.unit}).`,
        ],
      };
    }
    let [a, b] = twoDifferent(rand, 5, 30);
    if (a > b) [a, b] = [b, a];
    const k = int(rand, 7, 11);
    const first = rand() < 0.5;
    return {
      prompt: `Hai thanh kim loại đồng chất có thể tích ${a} cm³ và ${b} cm³. Thanh thứ hai nặng hơn thanh thứ nhất ${(b - a) * k} g. Hỏi thanh thứ ${first ? 'nhất' : 'hai'} nặng bao nhiêu gam?`,
      answer: (first ? a : b) * k,
      hints: [
        'Hai thanh đồng chất nên khối lượng tỉ lệ thuận với thể tích.',
        `Gọi khối lượng hai thanh là m₁, m₂: m₁/${a} = m₂/${b} = (m₂ − m₁)/(${b} − ${a}).`,
      ],
      steps: [
        `m₁/${a} = m₂/${b} = (m₂ − m₁)/(${b} − ${a}) = ${(b - a) * k}/${b - a} = ${k}.`,
        first ? `m₁ = ${a} · ${k} = ${a * k} (g).` : `m₂ = ${b} · ${k} = ${b * k} (g).`,
      ],
    };
  },
};

/**
 * Three parts inversely proportional to d1, d2, d3, with total n: the
 * parts are c/d1, c/d2, c/d3 for c = t · lcm(d1, d2, d3).
 * @param {() => number} rand
 */
function inverseParts(rand) {
  for (;;) {
    const d = [int(rand, 2, 12), int(rand, 2, 12), int(rand, 2, 12)];
    if (new Set(d).size < 3) continue;
    const l = d.reduce((x, y) => (x * y) / gcd(x, y));
    if (l > 60) continue;
    const base = d.map((x) => l / x);
    const sum = base[0] + base[1] + base[2];
    const t = int(rand, 1, 4);
    if (sum * t > 60) continue;
    return { d, l, t, c: l * t, parts: base.map((x) => x * t), n: sum * t };
  }
}

const ORDINAL = ['nhất', 'hai', 'ba'];

/** @type {Skill} */
export const tiLeNghich = {
  id: 'ti-le-nghich',
  label: 'Bài 23. Đại lượng tỉ lệ nghịch',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      for (;;) {
        const x2 = (rand() < 0.5 ? -1 : 1) * int(rand, 2, 9);
        const y2 = signed(rand, 12);
        const a = x2 * y2;
        const ds = divisors(Math.abs(a)).filter((x) => x <= 30);
        const x1 = (rand() < 0.5 ? -1 : 1) * pick(rand, ds);
        if (x1 === x2) continue;
        const y1 = a / x1;
        return {
          prompt: `Cho biết y tỉ lệ nghịch với x và khi x = ${intText(x1)} thì y = ${intText(y1)}. Tính y khi x = ${intText(x2)}.`,
          answer: y2,
          hints: [
            'y tỉ lệ nghịch với x nên xy = a không đổi; tìm hệ số tỉ lệ a trước.',
            `a = ${termText(x1)} · ${termText(y1)}.`,
          ],
          steps: [
            `a = xy = ${termText(x1)} · ${termText(y1)} = ${intText(a)}.`,
            `Khi x = ${intText(x2)}: y = a : x = ${intText(a)} : ${termText(x2)} = ${intText(y2)}.`,
          ],
        };
      }
    }
    if (v === 1) {
      const x = signed(rand, 9);
      const y = signed(rand, 12);
      return {
        prompt: `Cho biết y tỉ lệ nghịch với x và khi x = ${intText(x)} thì y = ${intText(y)}. Tìm hệ số tỉ lệ.`,
        answer: x * y,
        hints: ['y tỉ lệ nghịch với x theo hệ số a khi xy = a.'],
        steps: [`a = xy = ${termText(x)} · ${termText(y)} = ${intText(x * y)}.`],
      };
    }
    if (v === 2) {
      for (;;) {
        if (rand() < 0.5) {
          const n1 = int(rand, 2, 12);
          const d1 = int(rand, 2, 30);
          const total = n1 * d1;
          const ds = divisors(total).filter((x) => x >= 2 && x <= 40 && x !== n1);
          if (ds.length === 0) continue;
          const n2 = pick(rand, ds);
          return {
            prompt: `${n1} công nhân xây xong một ngôi nhà trong ${d1} ngày. Hỏi ${n2} công nhân (năng suất như nhau) xây xong ngôi nhà đó trong bao nhiêu ngày?`,
            answer: total / n2,
            hints: [
              'Với cùng một công việc, số công nhân và số ngày làm là hai đại lượng tỉ lệ nghịch.',
              `Tích số công nhân và số ngày không đổi: ${n1} · ${d1} = ${n2} · y.`,
            ],
            steps: [
              `Số công nhân và số ngày làm tỉ lệ nghịch, nên ${n1} · ${d1} = ${n2} · y.`,
              `y = ${total} : ${n2} = ${total / n2} (ngày).`,
            ],
          };
        }
        const v1 = 5 * int(rand, 6, 18);
        const t1 = int(rand, 2, 6);
        const s = v1 * t1;
        const vs = divisors(s).filter((x) => x % 5 === 0 && x >= 30 && x <= 120 && x !== v1);
        if (vs.length === 0) continue;
        const v2 = pick(rand, vs);
        return {
          prompt: `Một ô tô đi từ A đến B với vận tốc ${v1} km/h thì hết ${t1} giờ. Hỏi nếu đi với vận tốc ${v2} km/h thì ô tô đi từ A đến B hết bao nhiêu giờ?`,
          answer: s / v2,
          hints: [
            'Trên cùng một quãng đường, vận tốc và thời gian là hai đại lượng tỉ lệ nghịch.',
            `${v1} · ${t1} = ${v2} · t.`,
          ],
          steps: [
            `Vận tốc và thời gian tỉ lệ nghịch, nên ${v1} · ${t1} = ${v2} · t.`,
            `t = ${s} : ${v2} = ${s / v2} (giờ).`,
          ],
        };
      }
    }
    const { d, c, parts, n } = inverseParts(rand);
    const i = int(rand, 0, 2);
    if (rand() < 0.5) {
      return {
        prompt: `Ba đội máy cày cày ba cánh đồng có diện tích như nhau. Đội thứ nhất cày xong trong ${d[0]} ngày, đội thứ hai trong ${d[1]} ngày, đội thứ ba trong ${d[2]} ngày. Ba đội có tất cả ${n} máy (năng suất các máy như nhau). Hỏi đội thứ ${ORDINAL[i]} có bao nhiêu máy?`,
        answer: parts[i],
        hints: [
          'Số máy và số ngày cày xong cùng một diện tích là hai đại lượng tỉ lệ nghịch.',
          `Gọi số máy ba đội là x, y, z: ${d[0]}x = ${d[1]}y = ${d[2]}z, tức là x/(1/${d[0]}) = y/(1/${d[1]}) = z/(1/${d[2]}).`,
        ],
        steps: [
          `${d[0]}x = ${d[1]}y = ${d[2]}z = c nên x = c/${d[0]}, y = c/${d[1]}, z = c/${d[2]}.`,
          `x + y + z = c · (1/${d[0]} + 1/${d[1]} + 1/${d[2]}) = ${n}, suy ra c = ${c}.`,
          `Đội thứ ${ORDINAL[i]} có ${c} : ${d[i]} = ${parts[i]} máy.`,
        ],
      };
    }
    return {
      prompt: `Chia số ${n} thành ba phần tỉ lệ nghịch với ${d.join('; ')}. Tìm phần thứ ${ORDINAL[i]}.`,
      answer: parts[i],
      hints: [
        `Ba phần x, y, z tỉ lệ nghịch với ${d.join('; ')} nghĩa là ${d[0]}x = ${d[1]}y = ${d[2]}z.`,
        `Đặt ${d[0]}x = ${d[1]}y = ${d[2]}z = c rồi thay vào x + y + z = ${n}.`,
      ],
      steps: [
        `${d[0]}x = ${d[1]}y = ${d[2]}z = c nên x = c/${d[0]}, y = c/${d[1]}, z = c/${d[2]}.`,
        `x + y + z = c · (1/${d[0]} + 1/${d[1]} + 1/${d[2]}) = ${n}, suy ra c = ${c}.`,
        `Phần thứ ${ORDINAL[i]} là ${c} : ${d[i]} = ${parts[i]}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const vanDung = {
  id: 'van-dung',
  label: 'Vận dụng thực tế',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      for (;;) {
        const z2 = int(rand, 12, 60);
        const r2 = int(rand, 2, 30);
        const p = z2 * r2;
        const zs = divisors(p).filter((x) => x >= 10 && x <= 80 && x !== z2);
        if (zs.length === 0) continue;
        const z1 = pick(rand, zs);
        return {
          prompt: `Hai bánh răng khớp với nhau: bánh thứ nhất có ${z1} răng, bánh thứ hai có ${z2} răng. Khi bánh thứ nhất quay được ${p / z1} vòng thì bánh thứ hai quay được bao nhiêu vòng?`,
          answer: r2,
          hints: [
            'Hai bánh răng khớp nhau thì số răng ăn khớp đi qua là như nhau, nên số răng và số vòng quay tỉ lệ nghịch.',
            `${z1} · ${p / z1} = ${z2} · x.`,
          ],
          steps: [
            `Số răng và số vòng quay tỉ lệ nghịch: ${z1} · ${p / z1} = ${z2} · x = ${p}.`,
            `x = ${p} : ${z2} = ${r2} (vòng).`,
          ],
        };
      }
    }
    if (v === 1) {
      const g = 5 * int(rand, 8, 24);
      const [n1, n2] = twoDifferent(rand, 2, 30);
      return {
        prompt: `Để làm ${n1} chiếc bánh cần ${g * n1} g bột. Hỏi làm ${n2} chiếc bánh như thế cần bao nhiêu gam bột?`,
        answer: g * n2,
        hints: [
          'Khối lượng bột và số bánh là hai đại lượng tỉ lệ thuận.',
          `x/${n2} = ${g * n1}/${n1}.`,
        ],
        steps: [
          `Khối lượng bột tỉ lệ thuận với số bánh: x/${n2} = ${g * n1}/${n1} = ${g}.`,
          `x = ${n2} · ${g} = ${g * n2} (g).`,
        ],
      };
    }
    if (v === 2) {
      for (;;) {
        const p2 = 5 * int(rand, 6, 30);
        const m2 = int(rand, 2, 20);
        const total = p2 * m2;
        const ms = divisors(total).filter((x) => x >= 2 && x <= 40 && x !== m2);
        if (ms.length === 0) continue;
        const m1 = pick(rand, ms);
        return {
          prompt: `Với cùng một số tiền, có thể mua được ${m1} m vải loại I hoặc ${m2} m vải loại II. Giá 1 m vải loại I là ${total / m1} nghìn đồng. Hỏi giá 1 m vải loại II là bao nhiêu nghìn đồng?`,
          answer: p2,
          hints: [
            'Với cùng số tiền, số mét vải mua được và giá 1 m vải là hai đại lượng tỉ lệ nghịch.',
            `${m1} · ${total / m1} = ${m2} · x.`,
          ],
          steps: [
            `Số tiền không đổi: ${m1} · ${total / m1} = ${total} (nghìn đồng).`,
            `Giá 1 m vải loại II: x = ${total} : ${m2} = ${p2} (nghìn đồng).`,
          ],
        };
      }
    }
    if (v === 3) {
      for (;;) {
        const n1 = int(rand, 4, 20);
        const d1 = int(rand, 4, 30);
        // Finish at most half the days early, so the crew at most doubles.
        const e = int(rand, 1, Math.floor(d1 / 2));
        const total = n1 * d1;
        if (total % (d1 - e) !== 0) continue;
        const n2 = total / (d1 - e);
        return {
          prompt: `Một đội ${n1} người làm xong một công việc trong ${d1} ngày. Hỏi cần thêm bao nhiêu người (năng suất như nhau) để làm xong công việc đó sớm hơn ${e} ngày?`,
          answer: n2 - n1,
          hints: [
            'Số người và số ngày làm xong cùng một công việc là hai đại lượng tỉ lệ nghịch.',
            `Số ngày mới là ${d1} − ${e} = ${d1 - e}; tìm số người cần có rồi trừ đi ${n1}.`,
          ],
          steps: [
            `Số ngày mới: ${d1} − ${e} = ${d1 - e} (ngày).`,
            `Số người tỉ lệ nghịch với số ngày: ${n1} · ${d1} = ${d1 - e} · x, nên x = ${total} : ${d1 - e} = ${n2} (người).`,
            `Cần thêm ${n2} − ${n1} = ${n2 - n1} người.`,
          ],
        };
      }
    }
    const [u, w] = twoDifferent(rand, 1, 9);
    const [a, b] = [10 * u, 10 * w];
    const k = int(rand, 1, 3);
    const profit = (u + w) * k;
    const first = rand() < 0.5;
    return {
      prompt: `Hai bạn góp vốn kinh doanh: bạn An góp ${a} triệu đồng, bạn Bình góp ${b} triệu đồng. Tiền lãi ${profit} triệu đồng được chia tỉ lệ thuận với số vốn đã góp. Hỏi bạn ${first ? 'An' : 'Bình'} được chia bao nhiêu triệu đồng?`,
      answer: (first ? u : w) * k,
      hints: [
        `Gọi tiền lãi của An và Bình là x, y (triệu đồng): x/${a} = y/${b} và x + y = ${profit}.`,
        'Dùng tính chất của dãy tỉ số bằng nhau với tổng x + y.',
      ],
      steps: [
        `x/${a} = y/${b} = (x + y)/(${a} + ${b}) = ${profit}/${a + b} = ${ratioText(k, 10)}.`,
        first
          ? `An được x = ${a} · ${ratioText(k, 10)} = ${u * k} (triệu đồng).`
          : `Bình được y = ${b} · ${ratioText(k, 10)} = ${w * k} (triệu đồng).`,
      ],
    };
  },
};

/** The skills practised on "Luyện tập chung" page 10. */
export const PAGE_10_SKILLS = [tiLeThuc, dayTiSo];

/** The skills practised on "Luyện tập chung" page 19. */
export const PAGE_19_SKILLS = [tiLeThuan, tiLeNghich];

/** Every skill of the chapter, for the end-of-chapter review. */
export const CHAPTER_SKILLS = [tiLeThuc, dayTiSo, tiLeThuan, tiLeNghich, vanDung];
