import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { inLowestTerms, readValue, sameValue } from '#lib/core/adaptive.js';
import {
  REVIEW_SKILLS,
  canThuc,
  duongTron,
  frac,
  gocNoiTiep,
  hePhuongTrinh,
  heThucLuong,
  hinhKhoi,
  phuongTrinhBacHai,
  phuongTrinhMotAn,
  piText,
  quadText,
  shift,
  tanSo,
  xacSuat,
} from './engine.js';

/** @param {import('#lib/core/adaptive.js').ReviewSkill} skill */
function sample(skill, count = 400) {
  const r = rng(2029);
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

/** @param {number} a @param {number} b */
const close = (a, b) => Math.abs(a - b) < 1e-9;

describe('text helpers', () => {
  it('write expressions the way the book does', () => {
    expect(shift(-3)).toBe('x − 3');
    expect(shift(0)).toBe('x');
    expect(quadText(2, -6, 4)).toBe('2x² − 6x + 4');
    expect(quadText(-1, 0, 9)).toBe('−x² + 9');
    expect(quadText(1, 5, 0)).toBe('x² + 5x');
    expect(quadText(3, 0, 0)).toBe('3x²');
    expect(piText(frac(10, 3))).toBe('(10/3)π');
    expect(piText(frac(1, 1))).toBe('π');
    expect(piText(frac(24, 2))).toBe('12π');
  });
});

describe('every review skill', () => {
  for (const skill of REVIEW_SKILLS) {
    it(`${skill.id} writes its answer the way it checks it`, () => {
      const bad = [];
      for (const q of sample(skill)) {
        const all = [q.prompt, q.display, ...q.steps, ...q.hints].join(' ');
        const shown = readValue(q.display);
        const ok =
          !/undefined|NaN|Infinity|\d\.\d|--|\+ -|\+ 0x|(^|[^\d/])1x|[\d)xy²³] [+−·:] −|\b0x/.test(
            all,
          ) &&
          shown !== null &&
          sameValue(shown, q.answer) &&
          (q.steps.at(-1) ?? '').includes(q.display) &&
          !/\d\/\d+[²³]|\b(\d+)\/(\d+) = \1\/\2\b/.test(all) &&
          q.hints.length > 0 &&
          (q.simplest === true) === q.prompt.includes('phân số tối giản') &&
          (!q.simplest || inLowestTerms(q.display)) &&
          q.hints.every((h) => !h.includes(`= ${q.display}.`));
        if (!ok) bad.push(q.prompt);
      }
      expect(bad).toEqual([]);
    });
  }
});

describe('answers recomputed from the prompt', () => {
  it('systems of two linear equations', () => {
    const bad = [];
    for (const q of sample(hePhuongTrinh)) {
      const n = nums(q.prompt);
      if (q.prompt.startsWith('Giải hệ')) {
        // a x + b y = c and d x + e y = f, read back from the two equations.
        const eqs = /gồm (.+) và (.+)\. Hệ/.exec(q.prompt);
        const parse = (/** @type {string} */ e) => {
          const m = /^(−?\d*)x ([+−]) (\d*)y = (−?\d+)$/.exec(e.replace(/\u202f/g, ''));
          if (!m) throw new Error(e);
          const coef = (/** @type {string} */ s) =>
            s === '' ? 1 : s === '−' ? -1 : Number(s.replace('−', '-'));
          return [coef(m[1]), (m[2] === '−' ? -1 : 1) * coef(m[3]), Number(m[4].replace('−', '-'))];
        };
        const [a, b, c] = parse(eqs?.[1] ?? '');
        const [d, e, f] = parse(eqs?.[2] ?? '');
        const det = a * e - b * d;
        const x = (c * e - b * f) / det;
        const y = (a * f - c * d) / det;
        const want = q.prompt.endsWith('Tìm x.') ? x : y;
        if (!close(value(q.answer), want)) bad.push(q.prompt);
      } else {
        const [p, k, people, total] = n;
        const kids = (p * people - total) / (p - k);
        const want = q.prompt.includes('trẻ em?') ? kids : people - kids;
        if (!close(value(q.answer), want) || kids < 1 || kids >= people) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('equations and inequalities in one unknown', () => {
    const bad = [];
    for (const q of sample(phuongTrinhMotAn)) {
      const ans = value(q.answer);
      if (q.prompt.startsWith('Tính tổng')) {
        const [m, k, t] = /\(x ([+−]) (\d+)\)\((\d+)x ([+−]) (\d+)\)/
          .exec(q.prompt)
          ?.slice(1)
          .reduce((acc, s, i, arr) => {
            if (i === 1) acc.push((arr[0] === '−' ? 1 : -1) * Number(s));
            if (i === 2) acc.push(Number(s));
            if (i === 4) acc.push((arr[3] === '−' ? -1 : 1) * Number(s));
            return acc;
          }, /** @type {number[]} */ ([])) ?? [NaN, NaN, NaN];
        if (!close(ans, m - t / k)) bad.push(q.prompt);
      } else if (q.prompt.startsWith('Giải phương trình')) {
        const m = /trình \(?([^()/]+)\)?\/\(?([^()/]+)\)? = (.+)\.$/.exec(q.prompt);
        const lin = (/** @type {string} */ s) =>
          s === '' ? 0 : (nums(s.replace(' ', ''))[0] ?? 0);
        const a = lin(m?.[1].replace(/^x ?/, '') ?? 'NaN');
        const b = -lin(m?.[2].replace(/^x ?/, '') ?? 'NaN');
        const c = nums(m?.[3] ?? '')[0];
        const x = ans;
        if (!close(x + a, c * (x - b)) || x === b) bad.push(q.prompt);
      } else {
        const m = /bất phương trình (.+) ([<>≤≥]) (.+)\.$/.exec(q.prompt);
        const lin = (/** @type {string} */ s) => {
          const t = s.replace(/−/g, '-').replace(/ /g, '');
          const mm = /^(?:(-?\d*)x)?([+-]\d+)?$|^(-?\d+)$/.exec(t);
          if (!mm) throw new Error(s);
          if (mm[3] !== undefined) return [0, Number(mm[3])];
          const co =
            mm[1] === undefined ? 0 : mm[1] === '' ? 1 : mm[1] === '-' ? -1 : Number(mm[1]);
          return [co, mm[2] ? Number(mm[2]) : 0];
        };
        const [a, b] = lin(m?.[1] ?? '');
        const [c, d] = lin(m?.[3] ?? '');
        const rel = m?.[2];
        /** @param {number} x */
        const holds = (x) => {
          const l = a * x + b;
          const r = c * x + d;
          return rel === '<' ? l < r : rel === '>' ? l > r : rel === '≤' ? l <= r : l >= r;
        };
        const largest = q.prompt.includes('lớn nhất');
        const ok = holds(ans) && !holds(largest ? ans + 1 : ans - 1);
        if (!ok) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('square and cube roots', () => {
    const bad = [];
    for (const q of sample(canThuc)) {
      const ans = value(q.answer);
      if (q.prompt.startsWith('Rút gọn')) {
        const expr = /A = (.+) về dạng m√(\d)/.exec(q.prompt);
        const s = Number(expr?.[2]);
        const total = [...(expr?.[1] ?? '').matchAll(/(^|[+−] )(\d*)√(\d+)/g)].reduce(
          (sum, t) =>
            sum + (t[1].startsWith('−') ? -1 : 1) * Number(t[2] || 1) * Math.sqrt(Number(t[3])),
          0,
        );
        if (!close(total, ans * Math.sqrt(s))) bad.push(q.prompt);
      } else if (q.prompt.includes('∛')) {
        const total = [...q.prompt.matchAll(/(^|[+−] |Tính )∛\(?(−?\d+)\)?/g)].reduce(
          (sum, t) =>
            sum + (t[1].startsWith('−') ? -1 : 1) * Math.cbrt(Number(t[2].replace('−', '-'))),
          0,
        );
        if (!close(Math.round(total), ans)) bad.push(q.prompt);
      } else if (q.prompt.startsWith('Tính giá trị')) {
        const [twoK, kk, t] = nums(q.prompt);
        if (!close(Math.sqrt(t * t - twoK * t + kk), ans)) bad.push(q.prompt);
      } else {
        const [a, b] = nums(q.prompt);
        const want = q.prompt.includes('·') ? Math.sqrt(a * b) : Math.sqrt(a / b);
        if (!close(want, ans)) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('trigonometric ratios in the right triangle', () => {
    const bad = [];
    for (const q of sample(heThucLuong)) {
      const ans = value(q.answer);
      const n = nums(q.prompt);
      let want;
      if (q.prompt.includes('AB = ') && q.prompt.includes('AC = ')) {
        const [ab, ac] = n;
        const bc = Math.hypot(ab, ac);
        const angle = /Tính (\w+) ([BC])/.exec(q.prompt);
        const [opp, adj] = angle?.[2] === 'B' ? [ac, ab] : [ab, ac];
        /** @type {Record<string, number>} */
        const r = { sin: opp / bc, cos: adj / bc, tan: opp / adj, cot: adj / opp };
        want = r[angle?.[1] ?? ''];
      } else if (q.prompt.includes('45°')) {
        want = n[0];
      } else if (q.prompt.includes('cạnh huyền')) {
        const [bc, deg] = n;
        const rad = (deg * Math.PI) / 180;
        want = q.prompt.endsWith('Tính AC (cm).') ? bc * Math.sin(rad) : bc * Math.cos(rad);
      } else {
        const [p, qq, shadow] = n;
        want = (shadow * p) / qq;
      }
      if (!close(want, ans)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('the circle', () => {
    const bad = [];
    for (const q of sample(duongTron)) {
      const ans = value(q.answer);
      const n = nums(q.prompt);
      let want;
      if (q.prompt.includes('độ dài cung')) want = (n[1] * n[0]) / 180;
      else if (q.prompt.includes('hình quạt')) want = (n[0] * n[0] * n[1]) / 360;
      else if (q.prompt.includes('vành khuyên')) want = n[0] ** 2 - n[1] ** 2;
      else if (q.prompt.includes('dây AB')) want = 2 * Math.sqrt(n[0] ** 2 - n[1] ** 2);
      else want = Math.sqrt(n[1] ** 2 - n[0] ** 2);
      if (!close(want, ans)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('y = ax² and quadratic equations', () => {
    const bad = [];
    for (const q of sample(phuongTrinhBacHai)) {
      const ans = value(q.answer);
      if (q.prompt.startsWith('Đồ thị')) {
        const [, x, y] = nums(q.prompt.replace('y = ax²', ''));
        if (!close(ans * x * x, y)) bad.push(q.prompt);
        continue;
      }
      const poly = /trình (.+) = 0/.exec(q.prompt)?.[1] ?? '';
      const t = poly.replace(/−/g, '-').replace(/ /g, '');
      const m = /^(-?\d*)x²(?:([+-]\d*)x)?([+-]\d+)?$/.exec(t);
      if (!m) throw new Error(poly);
      const co = (/** @type {string | undefined} */ s, absent = 0) =>
        s === undefined ? absent : s === '' || s === '+' ? 1 : s === '-' ? -1 : Number(s);
      const a = co(m[1]);
      const b = co(m[2]);
      const c = co(m[3]);
      const d = Math.sqrt(b * b - 4 * a * c);
      const x1 = (-b + d) / (2 * a);
      const x2 = (-b - d) / (2 * a);
      let want;
      if (q.prompt.includes('nghiệm lớn hơn')) want = Math.max(x1, x2);
      else if (q.prompt.includes('nghiệm nhỏ hơn')) want = Math.min(x1, x2);
      else if (q.prompt.includes('x₁² + x₂²')) want = x1 * x1 + x2 * x2;
      else want = 1 / x1 + 1 / x2;
      if (Math.abs(want - ans) > 1e-6 || !(b * b - 4 * a * c > 0)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('frequencies', () => {
    const bad = [];
    for (const q of sample(tanSo)) {
      const ans = value(q.answer);
      let want;
      if (q.prompt.startsWith('Điểm')) {
        const list = /là: (.+)\. Tìm/.exec(q.prompt)?.[1].split('; ').map(Number) ?? [];
        const target = nums(q.prompt).at(-1);
        want = list.filter((x) => x === target).length;
        if (list.length !== nums(q.prompt)[0]) bad.push(q.prompt);
      } else if (q.prompt.startsWith('Lớp')) {
        const [n, m] = nums(q.prompt);
        want = (100 * m) / n;
      } else {
        const n = nums(q.prompt)[0];
        const given = [...q.prompt.matchAll(/có (\d+) bạn/g)].map((x) => Number(x[1]));
        want = (100 * (n - given.reduce((s, x) => s + x, 0))) / n;
        if (given.length !== 3) bad.push(q.prompt);
      }
      if (!close(want, ans)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('probability, recounted over the whole sample space', () => {
    const bad = [];
    for (const q of sample(xacSuat)) {
      const ans = value(q.answer);
      let want;
      if (q.prompt.includes('xúc xắc')) {
        const s = nums(q.prompt).at(-1) ?? 0;
        let hits = 0;
        for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) hits++;
        want = hits / 36;
      } else if (q.prompt.includes('đồng xu')) {
        const space = ['SS', 'SN', 'NS', 'NN'];
        /** @type {Record<string, (o: string) => boolean>} */
        const events = {
          'Có ít nhất một lần xuất hiện mặt sấp': (o) => o.includes('S'),
          'Hai lần gieo cho kết quả giống nhau': (o) => o[0] === o[1],
          'Có đúng một lần xuất hiện mặt ngửa': (o) => o.split('N').length - 1 === 1,
          'Cả hai lần đều xuất hiện mặt ngửa': (o) => o === 'NN',
        };
        const name = /"(.+)"/.exec(q.prompt)?.[1] ?? '';
        want = space.filter(events[name]).length / 4;
      } else {
        const N = nums(q.prompt)[0];
        const all = Array.from({ length: N }, (_, i) => i + 1);
        const isPrime = (/** @type {number} */ x) =>
          x > 1 && all.filter((d) => d > 1 && d < x).every((d) => x % d !== 0);
        const k = q.prompt.includes('chia hết') ? (nums(q.prompt).at(-1) ?? 1) : 0;
        want = all.filter((x) => (k ? x % k === 0 : isPrime(x))).length / N;
      }
      if (!close(want, ans)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('inscribed angles and regular polygons', () => {
    const bad = [];
    for (const q of sample(gocNoiTiep)) {
      const ans = value(q.answer);
      const n = nums(q.prompt);
      let want;
      if (q.prompt.includes('góc AOB')) want = n[0] / 2;
      else if (q.prompt.includes('Tứ giác')) want = 180 - n[0];
      else if (q.prompt.includes('mỗi góc')) want = ((n[0] - 2) * 180) / n[0];
      else if (q.prompt.includes('Phép quay')) want = 360 / n[2];
      else want = Math.hypot(n[0], n[1]) / 2;
      if (!close(want, ans)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('cylinders, cones and spheres', () => {
    const bad = [];
    for (const q of sample(hinhKhoi)) {
      const k = value(q.answer);
      const n = nums(q.prompt);
      let want;
      if (q.prompt.includes('hình trụ')) {
        const [r, h] = n;
        want = q.prompt.includes('thể tích') ? r * r * h : 2 * r * h;
      } else if (q.prompt.includes('hình nón')) {
        const [r, h] = n;
        want = q.prompt.includes('thể tích') ? (r * r * h) / 3 : r * Math.hypot(r, h);
      } else {
        const R = q.prompt.includes('đường kính') ? n[0] / 2 : n[0];
        want = q.prompt.includes('mặt cầu') ? 4 * R * R : (4 * R ** 3) / 3;
      }
      if (!close(want, k)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});
