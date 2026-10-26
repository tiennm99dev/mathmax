import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { PAGE_34_SKILLS, bieuThuc, congTru, daThuc } from './skills.js';

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
  throw new Error(`unrecognised prompt: ${prompt}`);
}

describe('chapter skills', () => {
  for (const skill of [bieuThuc, daThuc, congTru]) {
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
