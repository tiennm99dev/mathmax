import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import {
  CHAPTER_SKILLS,
  PAGE_34_SKILLS,
  PAGE_44_SKILLS,
  bieuThuc,
  chia,
  congTru,
  daThuc,
  nhan,
} from './skills.js';

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/**
 * Parses plain-text terms such as '−3x² + x − 5' or '2x − y + 3xy' into a
 * map from the variable part ('', 'x', 'x²', 'y', 'xy') to the summed
 * coefficient. Written independently of the generators.
 * @param {string} text
 */
function parseTerms(text) {
  const s = text.replace(/−/g, '-').replace(/\s/g, '');
  /** @type {Map<string, number>} */
  const out = new Map();
  for (const raw of s.match(/[+-]?[^+-]+/g) ?? []) {
    const m = /^([+-]?)(\d*)([a-z]*[⁰¹²³⁴⁵⁶⁷⁸⁹]*)$/.exec(raw);
    if (!m) throw new Error(`bad term ${raw} in ${text}`);
    const c = (m[1] === '-' ? -1 : 1) * (m[2] === '' ? 1 : Number(m[2]));
    out.set(m[3], (out.get(m[3]) ?? 0) + c);
  }
  return out;
}

/**
 * Coefficients by degree of a one-variable polynomial in x.
 * @param {string} text
 * @returns {Map<number, number>}
 */
function parsePoly(text) {
  /** @type {Map<number, number>} */
  const out = new Map();
  for (const [part, c] of parseTerms(text)) {
    let e = 0;
    if (part.startsWith('x')) {
      const digits = part.slice(1);
      e = digits === '' ? 1 : Number([...digits].map((d) => SUP.indexOf(d)).join(''));
    } else if (part !== '') throw new Error(part);
    out.set(e, (out.get(e) ?? 0) + c);
  }
  for (const [e, c] of out) if (c === 0) out.delete(e);
  return out;
}

/** @param {Map<number, number>} p @param {number} a */
const valueAt = (p, a) => [...p].reduce((s, [e, c]) => s + c * a ** e, 0);

/** @param {string} n */
const num = (n) => Number(n.replace(/−/g, '-'));

/**
 * Coefficients by degree as an array.
 * @param {Map<number, number>} p
 */
const toArray = (p) => {
  const out = Array(Math.max(0, ...p.keys()) + 1).fill(0);
  for (const [e, c] of p) out[e] = c;
  return out;
};

/** @param {number[]} p @param {number[]} q */
const times = (p, q) => {
  const out = Array(p.length + q.length - 1).fill(0);
  p.forEach((a, i) => q.forEach((b, j) => (out[i + j] += a * b)));
  return out;
};

/**
 * Long division of coefficient arrays: quotient and remainder.
 * @param {number[]} p
 * @param {number[]} q
 */
function divide(p, q) {
  const rest = p.slice();
  const dq = q.length - 1;
  const quot = Array(Math.max(1, p.length - dq)).fill(0);
  for (let e = rest.length - 1; e >= dq; e--) {
    const c = rest[e] / q[dq];
    quot[e - dq] = c + 0;
    q.forEach((b, j) => (rest[e - dq + j] -= c * b));
  }
  return { quot, rest: rest.slice(0, dq).map((c) => c + 0) };
}

/**
 * The degree asked for by 'hệ số tự do' or 'hệ số của x²'.
 * @param {string} name
 */
function askedDegree(name) {
  if (name === 'hệ số tự do') return 0;
  const k = /^hệ số của x([⁰¹²³⁴⁵⁶⁷⁸⁹]*)$/.exec(name);
  if (!k) throw new Error(name);
  return k[1] === '' ? 1 : SUP.indexOf(k[1]);
}

/**
 * Two factors written '(A) · (B)' or '(A)(B)'.
 * @param {string} text
 */
function factors(text) {
  const parts = text.includes(') · (') ? text.split(') · (') : text.split(')(');
  if (parts.length !== 2) throw new Error(text);
  return [parts[0].replace(/^\(/, ''), parts[1].replace(/\)$/, '')].map((t) =>
    toArray(parsePoly(t)),
  );
}

/**
 * Recomputes an answer from the prompt alone.
 * @param {string} prompt
 */
function recompute(prompt) {
  /** @type {RegExpExecArray | null} */
  let m;
  if ((m = /^Tính giá trị của biểu thức (.+) tại x = (\S+) và y = (\S+)\.$/.exec(prompt))) {
    const x = num(m[2]);
    const y = num(m[3]);
    /** @type {Record<string, number>} */
    const vars = { '': 1, x, y, xy: x * y };
    return [...parseTerms(m[1])].reduce((s, [part, c]) => s + c * vars[part], 0);
  }
  if ((m = /^Tính giá trị của biểu thức (.+) tại x = (\S+)\.$/.exec(prompt))) {
    return valueAt(parsePoly(m[1]), num(m[2]));
  }
  if ((m = /^Tìm (bậc|hệ số cao nhất|hệ số tự do) của đa thức P\(x\) = (.+)\.$/.exec(prompt))) {
    const p = parsePoly(m[2]);
    const d = Math.max(...p.keys());
    if (m[1] === 'bậc') return d;
    if (m[1] === 'hệ số cao nhất') return p.get(d);
    return p.get(0) ?? 0;
  }
  if ((m = /^Cho P\(x\) = (.+)\. Tính P\((\S+)\)\.$/.exec(prompt))) {
    return valueAt(parsePoly(m[1]), num(m[2]));
  }
  if (
    (m = /^Trong các số (.+), có bao nhiêu số là nghiệm của đa thức P\(x\) = (.+)\?$/.exec(prompt))
  ) {
    const p = parsePoly(m[2]);
    return m[1].split('; ').filter((a) => valueAt(p, num(a)) === 0).length;
  }
  m = /^Cho P\(x\) = (.+) và Q\(x\) = (.+)\. (.+) P\(x\) ([+−]) Q\(x\)(.*)$/.exec(prompt);
  if (m) {
    const p = parsePoly(m[1]);
    const q = parsePoly(m[2]);
    const sign = m[4] === '+' ? 1 : -1;
    /** @type {Map<number, number>} */
    const r = new Map(p);
    for (const [e, c] of q) r.set(e, (r.get(e) ?? 0) + sign * c);
    for (const [e, c] of r) if (c === 0) r.delete(e);
    const ask = m[3];
    if (ask === 'Tìm bậc của') return Math.max(...r.keys());
    if (ask === 'Tìm hệ số tự do trong') return r.get(0) ?? 0;
    const k = /^Tìm hệ số của x([⁰¹²³⁴⁵⁶⁷⁸⁹]*) trong$/.exec(ask);
    if (k) return r.get(k[1] === '' ? 1 : SUP.indexOf(k[1])) ?? 0;
    const at = /^ tại x = (\S+)\.$/.exec(m[5]);
    if (ask === 'Tính giá trị của' && at) return valueAt(r, num(at[1]));
  }
  if ((m = /^Tìm (.+) trong tích (.+)\.$/.exec(prompt))) {
    const [p, q] = factors(m[2]);
    return times(p, q)[askedDegree(m[1])] ?? 0;
  }
  if ((m = /^Tính giá trị của tích (.+) tại x = (\S+)\.$/.exec(prompt))) {
    const [p, q] = factors(m[1]);
    const a = num(m[2]);
    return valueAt(new Map(times(p, q).map((c, e) => [e, c])), a);
  }
  if ((m = /^Thực hiện phép chia \((.+)\) : \((.+)\)\. Tìm (.+) trong thương\.$/.exec(prompt))) {
    const { quot, rest } = divide(toArray(parsePoly(m[1])), toArray(parsePoly(m[2])));
    expect(rest.every((c) => c === 0)).toBe(true);
    return quot[askedDegree(m[3])] ?? 0;
  }
  if ((m = /^Tìm dư khi chia đa thức (.+) cho (.+)\.$/.exec(prompt))) {
    const { rest } = divide(toArray(parsePoly(m[1])), toArray(parsePoly(m[2])));
    return rest[0];
  }
  if ((m = /^Tìm số a để đa thức (.+) \+ a chia hết cho (.+)\.$/.exec(prompt))) {
    const { rest } = divide(toArray(parsePoly(m[1])), toArray(parsePoly(m[2])));
    return -rest[0];
  }
  throw new Error(`unrecognised prompt: ${prompt}`);
}

describe('chapter skills', () => {
  for (const skill of [bieuThuc, daThuc, congTru, nhan, chia]) {
    it(`${skill.id} answers match a recomputation from the prompt`, () => {
      const rand = rng(12345);
      for (let i = 0; i < 400; i++) {
        const q = skill.make(rand);
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(recompute(q.prompt), q.prompt).toBe(q.answer);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.prompt).not.toMatch(/NaN|undefined|\+ −|− −|\+ \+/);
        for (const s of [...q.steps, ...(q.hints ?? [])]) {
          expect(s).not.toMatch(/NaN|undefined/);
        }
      }
    });
  }

  it('builds a mixed set from every skill', () => {
    const set = buildSet(PAGE_34_SKILLS, 4, 1);
    expect(set).toHaveLength(12);
    expect(new Set(set.map((q) => q.skill)).size).toBe(3);
  });

  it('builds the later practice set and the chapter set', () => {
    expect(new Set(buildSet(PAGE_44_SKILLS, 4, 1).map((q) => q.skill)).size).toBe(2);
    expect(new Set(buildSet(CHAPTER_SKILLS, 2, 1).map((q) => q.skill)).size).toBe(5);
  });

  it('sometimes cancels the top terms when asking for the degree of a sum', () => {
    const rand = rng(7);
    let dropped = 0;
    for (let i = 0; i < 300; i++) {
      const q = congTru.make(rand);
      if (q.prompt.includes('Tìm bậc') && q.answer < 3) dropped++;
    }
    expect(dropped).toBeGreaterThan(0);
  });
});
