import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { inLowestTerms, readValue, sameValue } from '#lib/core/adaptive.js';
import {
  REVIEW_SKILLS,
  daThuc,
  dongDang,
  hamSo,
  hangDangThuc,
  hinhChop,
  linText,
  monoText,
  phanThuc,
  phuongTrinh,
  shift,
  sumText,
  thales,
  thongKe,
  tuGiac,
  xacSuat,
} from './engine.js';

/** @param {import('#lib/core/adaptive.js').ReviewSkill} skill */
function sample(skill, count = 500) {
  const r = rng(2028);
  return Array.from({ length: count }, () => skill.make(r));
}

/** Numbers in a text, with the book's minus, grouping and decimal comma undone. */
const nums = (/** @type {string} */ text) =>
  [
    ...text
      .replace(/−/g, '-')
      .replace(/(\d)\u202f(?=\d{3}\b)/g, '$1')
      .replace(/(\d),(\d)/g, '$1.$2')
      .matchAll(/-?\d+(?:\.\d+)?/g),
  ].map((m) => Number(m[0]));

/** @param {import('#lib/fraction-engine/fraction.js').Fraction} f */
const value = (f) => f.n / f.d;

/**
 * Terms [coefficient, exponent of x, exponent of y] of a polynomial written
 * like '−3x²y + xy − 5'.
 * @param {string} poly
 */
function parsePoly(poly) {
  /** @type {Record<string, number>} */
  const exps = { '': 1, '²': 2, '³': 3, '⁴': 4 };
  return poly
    .replace(/ ([+−]) /g, ' $1')
    .split(' ')
    .map((term) => {
      const m = /^([+−]?)(\d*)(?:x([²³⁴]?))?(?:y([²³⁴]?))?$/.exec(term);
      if (!m) throw new Error(poly);
      const sign = m[1] === '−' ? -1 : 1;
      const c = m[2] ? Number(m[2]) : 1;
      const ex = term.includes('x') ? exps[m[3] ?? ''] : 0;
      const ey = term.includes('y') ? exps[m[4] ?? ''] : 0;
      return /** @type {[number, number, number]} */ ([sign * c, ex, ey]);
    });
}

describe('text helpers', () => {
  it('write monomials, sums and linear expressions the way the book does', () => {
    expect(monoText(-3, 2, 1)).toBe('−3x²y');
    expect(monoText(1, 1, 1)).toBe('xy');
    expect(monoText(-7, 0, 0)).toBe('−7');
    expect(
      sumText([
        [3, 2, 1],
        [-1, 1, 1],
        [5, 0, 0],
      ]),
    ).toBe('3x²y − xy + 5');
    expect(shift(-3)).toBe('x − 3');
    expect(shift(2, '3x')).toBe('3x + 2');
    expect(linText(-1, 4)).toBe('−x + 4');
    expect(linText(2, -5)).toBe('2x − 5');
    expect(linText(0, -5)).toBe('−5');
    expect(parsePoly('3x²y − xy + 5')).toEqual([
      [3, 2, 1],
      [-1, 1, 1],
      [5, 0, 0],
    ]);
  });
});

describe('every review skill', () => {
  for (const skill of REVIEW_SKILLS) {
    it(`${skill.id} writes its answer the way it checks it`, () => {
      for (const q of sample(skill)) {
        const all = [q.prompt, q.display, ...q.steps, ...q.hints].join(' ');
        expect(all, q.prompt).not.toMatch(
          /undefined|NaN|Infinity|\d\.\d|--|\+ -|\+ 0x|(^|[^\d])1x/,
        );
        // A negative number after an operation sign is written in brackets.
        expect(all, q.prompt).not.toMatch(/[\d)xy²³] [+−·:] −/);
        const shown = readValue(q.display);
        expect(shown, q.display).not.toBeNull();
        expect(sameValue(/** @type {any} */ (shown), q.answer), q.prompt).toBe(true);
        expect(q.steps.at(-1), q.prompt).toContain(q.display);
        expect(q.hints.length).toBeGreaterThan(0);
        expect(q.simplest === true, q.prompt).toBe(q.prompt.includes('phân số tối giản'));
        if (q.simplest) expect(inLowestTerms(q.display), q.display).toBe(true);
        for (const h of q.hints) expect(h).not.toContain(`= ${q.display}.`);
      }
    });
  }
});

describe('answers recomputed from the prompt', () => {
  it('polynomials', () => {
    for (const q of sample(daThuc)) {
      const x = value(q.answer);
      if (q.prompt.startsWith('Tính giá trị')) {
        const m = /P = (.+) tại x = (.+), y = (.+)\.$/.exec(q.prompt);
        const [px, py] = [nums(m?.[2] ?? '')[0], nums(m?.[3] ?? '')[0]];
        const terms = parsePoly(m?.[1] ?? '');
        expect(x).toBe(terms.reduce((s, [c, ex, ey]) => s + c * px ** ex * py ** ey, 0));
      } else if (q.prompt.startsWith('Tìm bậc')) {
        const terms = parsePoly(/đa thức (.+)\.$/.exec(q.prompt)?.[1] ?? '');
        expect(x).toBe(Math.max(...terms.map(([, ex, ey]) => ex + ey)));
      } else {
        const m = /\((\d)x ([+−]) (\d)\)\(x ([+−]) (\d)\)/.exec(q.prompt);
        const k = Number(m?.[1]);
        const a = (m?.[2] === '−' ? -1 : 1) * Number(m?.[3]);
        const b = (m?.[4] === '−' ? -1 : 1) * Number(m?.[5]);
        expect(x).toBe(k * b + a);
      }
    }
  });

  it('special products', () => {
    for (const q of sample(hangDangThuc)) {
      const n = nums(q.prompt);
      const x = value(q.answer);
      if (q.prompt.includes(' · ')) expect(x).toBe(n[0] * n[1]);
      else if (q.prompt.startsWith('Tính nhanh')) expect(x).toBe(n[0] ** 2);
      else if (q.prompt.startsWith('Tính giá trị')) {
        const sign = q.prompt.includes('x² −') ? -1 : 1;
        const [b, c, t] = n.map(Math.abs);
        const tt = nums(/tại x = (.+)\.$/.exec(q.prompt)?.[1] ?? '')[0];
        expect(c).toBe((b / 2) ** 2);
        expect(t).toBe(Math.abs(tt));
        expect(x).toBe(tt * tt + sign * b * tt + c);
      } else {
        const a = n[0];
        const c = n.at(-1) ?? 0;
        expect((x + a) ** 2 - x * x).toBe(c);
      }
    }
  });

  it('quadrilaterals', () => {
    for (const q of sample(tuGiac)) {
      const n = nums(q.prompt);
      const x = value(q.answer);
      if (q.prompt.startsWith('Tứ giác')) expect(x + n[0] + n[1] + n[2]).toBe(360);
      else if (q.prompt.includes('bình hành'))
        expect(x).toBe(q.prompt.includes('góc B') ? 180 - n[0] : n[0]);
      else if (q.prompt.includes('thoi')) expect(x * x).toBe((n[0] / 2) ** 2 + (n[1] / 2) ** 2);
      else if (q.prompt.includes('chữ nhật')) expect(x * x).toBe(n[0] ** 2 + n[1] ** 2);
      else expect(x + n[0]).toBe(180);
    }
  });

  it('Thalès, midlines and angle bisectors', () => {
    for (const q of sample(thales)) {
      const n = nums(q.prompt);
      const x = value(q.answer);
      if (q.prompt.includes('trung điểm'))
        expect(x).toBe(q.prompt.includes('Tính MN') ? n[0] / 2 : 2 * n[0]);
      else if (q.prompt.includes('MN ∥ BC')) {
        const [am, mb, an] = n;
        expect(am / mb).toBeCloseTo(an / x, 12);
      } else {
        const [ab, ac, dc] = n;
        expect(x / dc).toBeCloseTo(ab / ac, 12);
        const bc = x + dc;
        expect(bc).toBeLessThan(ab + ac);
        expect(bc).toBeGreaterThan(Math.abs(ab - ac));
      }
    }
  });

  it('data and charts', () => {
    for (const q of sample(thongKe)) {
      const x = value(q.answer);
      if (q.prompt.startsWith('Biểu đồ hình quạt')) {
        const n = nums(q.prompt.replace('8A', ''));
        expect(x).toBe((n[0] * n[1]) / 100);
      } else if (q.prompt.includes('cột kép')) {
        const boys = [...q.prompt.matchAll(/(\d+) nam/g)].map((m) => Number(m[1]));
        const girls = [...q.prompt.matchAll(/(\d+) nữ/g)].map((m) => Number(m[1]));
        const series = q.prompt.endsWith('nam?') ? boys : girls;
        expect(x).toBe(series.reduce((s, v) => s + v, 0));
      } else {
        const [, before, , after] = nums(q.prompt);
        expect(x).toBeCloseTo(((after - before) / before) * 100, 9);
      }
    }
  });

  it('rational expressions', () => {
    for (const q of sample(phanThuc)) {
      const x = value(q.answer);
      if (q.prompt.startsWith('Rút gọn')) {
        const n = nums(q.prompt);
        const t = nums(/tại x = (.+)\.$/.exec(q.prompt)?.[1] ?? '')[0];
        expect(x).toBeCloseTo((t * t - n[0]) / (t - n[1]), 12);
      } else if (q.prompt.startsWith('Phân thức')) {
        const den = /\/\((.+)\) không/.exec(q.prompt)?.[1] ?? '';
        const [[k, e1], [c]] = parsePoly(den).map(([cc, ex]) => [cc, ex]);
        expect(e1).toBe(1);
        expect(k * x + c).toBeCloseTo(0, 12);
      } else {
        const a = nums(q.prompt)[1];
        const t = nums(/tại x = (.+)\. Viết/.exec(q.prompt)?.[1] ?? '')[0];
        expect(x).toBeCloseTo(1 / (t - a) - 1 / (t + a), 12);
      }
    }
  });

  it('linear equations', () => {
    for (const q of sample(phuongTrinh)) {
      const x = value(q.answer);
      if (q.prompt.startsWith('Giải phương trình x/')) {
        const [m, n, c] = nums(q.prompt.replace(/x\//g, ''));
        expect(x / m + x / n).toBeCloseTo(c, 12);
      } else if (q.prompt.startsWith('Giải')) {
        const eq = /trình (.+) = (.+)\.$/.exec(q.prompt);
        const side = (/** @type {string} */ s) =>
          parsePoly(s).reduce((acc, [c, ex]) => acc + c * x ** ex, 0);
        expect(side(eq?.[1] ?? '')).toBe(side(eq?.[2] ?? ''));
      } else {
        const [p, d] = nums(q.prompt);
        expect(2 * (x + x + d)).toBe(p);
      }
    }
  });

  it('linear functions', () => {
    for (const q of sample(hamSo)) {
      const x = value(q.answer);
      if (q.prompt.includes('đi qua điểm M')) {
        const m = /y = ax ([+−]) (\d+) đi qua điểm M\((.+); (.+)\)/.exec(q.prompt);
        const b = (m?.[1] === '−' ? -1 : 1) * Number(m?.[2]);
        const [x0, y0] = [nums(m?.[3] ?? '')[0], nums(m?.[4] ?? '')[0]];
        expect(x * x0 + b).toBe(y0);
      } else if (q.prompt.includes('song song')) {
        const line = /đường thẳng y = (.+) và đi qua/.exec(q.prompt)?.[1] ?? '';
        const terms = parsePoly(line);
        const k = terms.find(([, ex]) => ex === 1)?.[0] ?? 0;
        const c = terms.find(([, ex]) => ex === 0)?.[0] ?? 0;
        const m = /A\((.+); (.+)\)/.exec(q.prompt);
        const [x0, y0] = [nums(m?.[1] ?? '')[0], nums(m?.[2] ?? '')[0]];
        expect(k * x0 + x).toBe(y0);
        expect(x).not.toBe(c);
      } else {
        const line = /y = (.+) cắt/.exec(q.prompt)?.[1] ?? '';
        const terms = parsePoly(line);
        const a = terms.find(([, ex]) => ex === 1)?.[0] ?? 0;
        const b = terms.find(([, ex]) => ex === 0)?.[0] ?? 0;
        expect(a * x + b).toBeCloseTo(0, 12);
      }
    }
  });

  it('probabilities', () => {
    for (const q of sample(xacSuat)) {
      const x = value(q.answer);
      const n = nums(q.prompt);
      if (q.prompt.startsWith('Một túi')) {
        const [red, blue, white] = n;
        const total = red + blue + white;
        const fav = q.prompt.includes('không phải màu đỏ')
          ? blue + white
          : q.prompt.includes('không phải màu trắng')
            ? red + blue
            : blue;
        expect(x).toBeCloseTo(fav / total, 12);
      } else if (q.prompt.startsWith('Kiểm tra')) {
        const [checked, bad, lot] = n;
        expect(x).toBe((lot * bad) / checked);
      } else {
        const total = n[3];
        const k = n.at(-1) ?? 1;
        let fav = 0;
        for (let i = 1; i <= total; i++) if (i % k === 0) fav++;
        expect(x).toBeCloseTo(fav / total, 12);
      }
    }
  });

  it('similar triangles and Pythagoras', () => {
    for (const q of sample(dongDang)) {
      const n = nums(q.prompt);
      const x = value(q.answer);
      if (q.prompt.includes('đồng dạng với')) {
        const [ab, bc, de] = n;
        expect(ab / de).toBeCloseTo(bc / x, 12);
      } else if (q.prompt.includes('Tính AC')) expect(x * x + n[1] ** 2).toBe(n[0] ** 2);
      else if (q.prompt.includes('Tính BC')) expect(x * x).toBe(n[0] ** 2 + n[1] ** 2);
      else {
        const [pole, shadow, tree] = n;
        expect(x).toBe((pole * tree) / shadow);
      }
    }
  });

  it('regular pyramids', () => {
    for (const q of sample(hinhChop)) {
      const [a, h] = nums(q.prompt);
      const x = value(q.answer);
      if (q.prompt.includes('thể tích')) expect(x).toBe((a * a * h) / 3);
      else if (q.prompt.includes('tứ giác đều')) {
        expect(h).toBeGreaterThan(a / 2);
        expect(x).toBe(((4 * a) / 2) * h);
      } else {
        expect(h).toBeGreaterThan(a / (2 * Math.sqrt(3)));
        expect(x).toBe(((3 * a) / 2) * h);
      }
    }
  });
});
