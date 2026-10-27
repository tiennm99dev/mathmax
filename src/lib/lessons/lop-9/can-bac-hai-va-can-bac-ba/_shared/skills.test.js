import { describe, it, expect } from 'vitest';
import { readNumber } from '#lib/core/decimal.js';
import { rng } from '#lib/core/drill.js';
import { SKILLS_TRANG_52, dec, linText } from './skills.js';

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
