import { describe, it, expect } from 'vitest';
import { readNumber } from '#lib/core/decimal.js';
import { rng } from '#lib/core/drill.js';
import {
  CHAPTER_SKILLS,
  SKILLS_TRANG_52,
  SKILLS_TRANG_63,
  dec,
  linText,
  thucTe,
} from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 800) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** Plain text with the book's signs turned into what Number reads. */
const plain = (/** @type {string} */ s) =>
  s
    .replace(/−/g, '-')
    .replace(/\u202f/g, '')
    .replace(/ /g, '');

/**
 * Recomputes the answer from the prompt alone, independently of the
 * generator.
 * @param {string} prompt
 */
function solve(prompt) {
  const p = plain(prompt);
  let m = /^Tính√\(\((-\d+)\)²\)\.$/.exec(p);
  if (m) return Math.abs(Number(m[1]));
  m = /^Tính√([\d,]+)\.$/.exec(p);
  if (m) return Math.sqrt(/** @type {number} */ (readNumber(m[1])));
  m = /^Tìmsốnguyênxnhỏnhấtđể√\((-?\d*)x([+-]\d+)\)xácđịnh\.$/.exec(p);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    let x = -100;
    while (a * x + b < 0) x++;
    return x;
  }
  m = /^Tínhgiátrịcủa√\(x²([+-]\d+)x\+(\d+)\)tạix=(-?\d+)\.$/.exec(p);
  if (m) {
    const x = Number(m[3]);
    return Math.sqrt(x * x + Number(m[1]) * x + Number(m[2]));
  }
  m = /^Tính√\((\d+)·(\d+)\)\.$/.exec(p);
  if (m) return Math.sqrt(Number(m[1]) * Number(m[2]));
  m = /^Tính√(\d+)·√(\d+)\.$/.exec(p);
  if (m) return Math.sqrt(Number(m[1]) * Number(m[2]));
  m = /^Tính√\((\d+)\/(\d+)\)\.Nhập/.exec(p);
  if (m) return Math.sqrt(Number(m[1]) / Number(m[2]));
  m = /^Tính√(\d+)\/√(\d+)\.$/.exec(p);
  if (m) return Math.sqrt(Number(m[1]) / Number(m[2]));
  return solveLater(p, prompt);
}

/**
 * Real cube root, negative numbers included.
 * @param {number} x
 */
const cbrt = (x) => Math.sign(x) * Math.abs(x) ** (1 / 3);

/**
 * Recomputes the answers of the skills after Bài 9 and Bài 10 and of the
 * word problems.
 * @param {string} p the prompt without spaces, with ASCII minus signs
 * @param {string} prompt the original prompt, for error messages
 */
function solveLater(p, prompt) {
  let m = /^Đưathừasốrangoàidấucăn:√(\d+)=a√(\d+)\.Tìma\.$/.exec(p);
  if (m) return Math.sqrt(Number(m[1])) / Math.sqrt(Number(m[2]));
  m = /^Đưathừasốvàotrongdấucăn:(-?)(\d+)√(\d+)=(-?)√n\.Tìmn\.$/.exec(p);
  if (m) {
    expect(m[1]).toBe(m[4]);
    return Number(m[2]) ** 2 * Number(m[3]);
  }
  m = /^Rútgọn:√(\d+)\+√(\d+)-√(\d+)=a√(\d+)\.Tìma\.$/.exec(p);
  if (m) {
    const [x, y, z, s] = m.slice(1).map(Number);
    return (Math.sqrt(x) + Math.sqrt(y) - Math.sqrt(z)) / Math.sqrt(s);
  }
  m = /^Trụccănthứcởmẫu:(\d+)\/√(\d+)=a√(\d+)\.Tìma\.$/.exec(p);
  if (m) return Number(m[1]) / Math.sqrt(Number(m[2])) / Math.sqrt(Number(m[3]));
  m = /^Tính1\/\((\d+)-√(\d+)\)\+1\/\((\d+)\+√(\d+)\)\.$/.exec(p);
  if (m) {
    const [r, s, r2, s2] = m.slice(1).map(Number);
    return 1 / (r - Math.sqrt(s)) + 1 / (r2 + Math.sqrt(s2));
  }
  m = /^Tính\(√(\d+)-√(\d+)\+√(\d+)\):√(\d+)\.$/.exec(p);
  if (m) {
    const [x, y, z, s] = m.slice(1).map(Number);
    return (Math.sqrt(x) - Math.sqrt(y) + Math.sqrt(z)) / Math.sqrt(s);
  }
  m = /^Tính∛\(?(-?[\d,]+)\)?\.$/.exec(p);
  if (m) return cbrt(/** @type {number} */ (readNumber(m[1])));
  m = /^Tính∛(\d+)·∛(\d+)\.$/.exec(p);
  if (m) return cbrt(Number(m[1]) * Number(m[2]));
  m = /^Tìmx,biết∛\((-?\d*)x([+-]\d+)\)=(-?\d+)\.$/.exec(p);
  if (m) {
    const a = m[1] === '-' ? -1 : m[1] === '' ? 1 : Number(m[1]);
    const b = Number(m[2]);
    const c = Number(m[3]);
    for (let x = -50; x <= 50; x++) if (a * x + b === c ** 3) return x;
    throw new Error(`no solution: ${prompt}`);
  }
  m = /hìnhvuôngcódiệntích(\d+)m²/.exec(p);
  if (m) return 4 * Math.sqrt(Number(m[1]));
  m = /chứađầyđược(\d+)lít/.exec(p);
  if (m) return cbrt(Number(m[1]));
  m = /từđộcao(\d+)mthì/.exec(p);
  if (m) return Math.sqrt(Number(m[1]) / 5);
  throw new Error(`unknown prompt: ${prompt}`);
}

describe('text helpers', () => {
  it('writes linear expressions the book way', () => {
    expect(linText(3, -12)).toBe('3x − 12');
    expect(linText(-1, 5)).toBe('−x + 5');
    expect(linText(2, 0)).toBe('2x');
  });

  it('builds decimals that read back exactly', () => {
    expect(dec(24, 1)).toBe(readNumber('2,4'));
    expect(dec(121, 2)).toBe(readNumber('1,21'));
  });
});

describe('practice skills after Bài 7 and Bài 8', () => {
  it('has distinct ids', () => {
    expect(new Set(SKILLS_TRANG_52.map((s) => s.id)).size).toBe(SKILLS_TRANG_52.length);
  });

  for (const skill of SKILLS_TRANG_52) {
    it(`${skill.id} gives answers that the prompt alone confirms`, () => {
      for (const q of sample(skill)) {
        expect(Number.isFinite(q.answer), q.prompt).toBe(true);
        expect(solve(q.prompt), q.prompt).toBeCloseTo(q.answer, 9);
        expect(q.steps.length).toBeGreaterThanOrEqual(2);
        expect(q.hints?.length ?? 0).toBeGreaterThanOrEqual(1);
        const all = [q.prompt, ...q.steps, ...(q.hints ?? [])].join(' ');
        expect(all, all).not.toMatch(/\d\.\d|[^\s]-\d| -\d|NaN|undefined/);
      }
    });
  }

  it('stores every decimal answer exactly as a learner types it', () => {
    for (const skill of SKILLS_TRANG_52) {
      for (const q of sample(skill, 200)) {
        if (Number.isInteger(q.answer)) continue;
        const text = String(Math.round(q.answer * 100) / 100).replace('.', ',');
        if (Math.abs(q.answer * 100 - Math.round(q.answer * 100)) < 1e-9) {
          expect(readNumber(text), q.prompt).toBe(q.answer);
        }
      }
    }
  });
});

describe('practice skills after Bài 9 and Bài 10, and the chapter review', () => {
  it('has distinct ids across the chapter', () => {
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(CHAPTER_SKILLS.length);
    expect(CHAPTER_SKILLS).toContain(thucTe);
  });

  for (const skill of [...SKILLS_TRANG_63, thucTe]) {
    it(`${skill.id} gives answers that the prompt alone confirms`, () => {
      for (const q of sample(skill)) {
        expect(Number.isFinite(q.answer), q.prompt).toBe(true);
        expect(solve(q.prompt), q.prompt).toBeCloseTo(q.answer, 9);
        expect(q.steps.length).toBeGreaterThanOrEqual(2);
        expect(q.hints?.length ?? 0).toBeGreaterThanOrEqual(1);
        const all = [q.prompt, ...q.steps, ...(q.hints ?? [])].join(' ');
        expect(all, all).not.toMatch(/\d\.\d|[^\s]-\d| -\d|NaN|undefined|\+ −/);
      }
    });
  }

  it('reads every cube-root decimal answer back exactly', () => {
    for (const skill of SKILLS_TRANG_63) {
      for (const q of sample(skill, 300)) {
        if (Number.isInteger(q.answer)) continue;
        const text = String(q.answer).replace('.', ',');
        expect(readNumber(text), q.prompt).toBe(q.answer);
      }
    }
  });
});
