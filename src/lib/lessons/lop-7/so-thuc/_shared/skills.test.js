import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, PAGE_37_SKILLS } from './skills.js';
import { numberText, readNumber } from './decimal.js';

/**
 * Every number in a text as written: '−2,5', '7/12', '144'.
 * @param {string} text
 */
const numbers = (text) => [...text.matchAll(/−?\d+(?:,\d+)?/g)].map((m) => m[0]);

/** @param {string} t */
const num = (t) => /** @type {number} */ (readNumber(t));

/**
 * Rounds x to `places` decimals the schoolbook way, for values that are
 * never exactly halfway (irrational roots, repeating decimals).
 * @param {number} x @param {number} places
 */
const round = (x, places) => Math.round(x * 10 ** places) / 10 ** places;

/** Precision text to decimal places. */
const PLACES = { '0,5': 0, '0,05': 1, '0,005': 2 };

/**
 * Recomputes a question's answer from its prompt with floating point.
 * @param {string} prompt
 */
function recompute(prompt) {
  const n = numbers(prompt);
  let m;
  if ((m = /^Viết phân số (\d+)\/(\d+) dưới dạng/.exec(prompt))) {
    const [p, q] = [Number(m[1]), Number(m[2])];
    // Period length: the order of 10 modulo q with the factors 2 and 5 removed.
    let d = q / gcdOf(p, q);
    while (d % 2 === 0) d /= 2;
    while (d % 5 === 0) d /= 5;
    let k = 1;
    let r = 10 % d;
    while (r !== 1 % d) {
      r = (r * 10) % d;
      k++;
    }
    return k;
  }
  if ((m = /^(\d+)\/(\d+) = .*Chữ số thứ (\d+)/.exec(prompt))) {
    const [p, q, k] = [Number(m[1]), Number(m[2]), Number(m[3])];
    // The k-th digit is floor(10 · (10^(k−1) · p mod q) / q).
    let r = p % q;
    for (let i = 1; i < k; i++) r = (r * 10) % q;
    return Math.floor((r * 10) / q);
  }
  if ((m = /^Làm tròn số (\d+)\/(\d+) với độ chính xác (\S+)\.$/.exec(prompt))) {
    const places = PLACES[/** @type {keyof typeof PLACES} */ (m[3])];
    return round(Number(m[1]) / Number(m[2]), places);
  }
  if (prompt.startsWith('Trong các phân số')) {
    const fr = [...prompt.matchAll(/(−?\d+)\/(\d+)/g)].map((x) => [num(x[1]), Number(x[2])]);
    return fr.filter(([p, q]) => {
      let d = q / gcdOf(Math.abs(p), q);
      while (d % 2 === 0) d /= 2;
      while (d % 5 === 0) d /= 5;
      return d === 1;
    }).length;
  }
  if ((m = /^Tính √\((\d+)\/(\d+)\)/.exec(prompt))) {
    return Math.sqrt(Number(m[1])) / Math.sqrt(Number(m[2]));
  }
  if ((m = /^Tính \(√(\d+)\)² ([+−]) √(\d+)\.$/.exec(prompt))) {
    const r = Math.sqrt(Number(m[3]));
    return m[2] === '+' ? Number(m[1]) + r : Number(m[1]) - r;
  }
  if ((m = /^Tính √(\d+(?:,\d+)?)\.$/.exec(prompt))) return round(Math.sqrt(num(m[1])), 2);
  if ((m = /^Tìm số tự nhiên n sao cho n < √(\d+)/.exec(prompt))) {
    return Math.floor(Math.sqrt(Number(m[1])));
  }
  if (
    (m = /^Dùng máy tính cầm tay tính √(\d+) rồi làm tròn kết quả đến hàng phần (mười|trăm)/.exec(
      prompt,
    ))
  ) {
    return round(Math.sqrt(Number(m[1])), m[2] === 'mười' ? 1 : 2);
  }
  if (prompt.startsWith('Tính |')) {
    const [a, b, c] = n.map(num);
    return round(Math.abs(a) + Math.abs(b) - Math.abs(c), 1);
  }
  if ((m = /^Tìm x, biết \|x\| = (\S+) và x ([<>]) 0/.exec(prompt))) {
    return m[2] === '<' ? -num(m[1]) : num(m[1]);
  }
  if ((m = /^Có bao nhiêu số nguyên x thoả mãn −√(\d+) < x < √(\d+)/.exec(prompt))) {
    const lo = -Math.sqrt(Number(m[1]));
    const hi = Math.sqrt(Number(m[2]));
    let c = 0;
    for (let x = -50; x <= 50; x++) if (lo < x && x < hi) c++;
    return c;
  }
  if ((m = /^Tìm số nguyên n lớn nhất sao cho n < −√(\d+)/.exec(prompt))) {
    let x = 0;
    while (!(x < -Math.sqrt(Number(m[1])))) x--;
    return x;
  }
  if ((m = /diện tích (\d+) m²/.exec(prompt))) return round(Math.sqrt(Number(m[1])), 1);
  if ((m = /diện tích (\d+) dm²/.exec(prompt))) return round(4 * Math.sqrt(Number(m[1])), 1);
  if ((m = /^Rót đều (\d+) lít nước mắm vào (\d+) can/.exec(prompt))) {
    return round(Number(m[1]) / Number(m[2]), 2);
  }
  throw new Error(`unknown prompt ${prompt}`);
}

/** @param {number} a @param {number} b @returns {number} */
function gcdOf(a, b) {
  return b === 0 ? a : gcdOf(b, a % b);
}

describe('chapter skills', () => {
  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id} answers match a recomputation from the prompt`, () => {
      const r = rng(2026);
      for (let i = 0; i < 800; i++) {
        const q = skill.make(r);
        expect(Number.isFinite(q.answer), q.prompt).toBe(true);
        expect(q.answer, q.prompt).toBeCloseTo(recompute(q.prompt), 9);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.hints?.length ?? 0).toBeGreaterThan(0);
        for (const t of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
          // Book typography: a true minus sign, never a hyphen before a digit.
          expect(t).not.toMatch(/-\d/);
          expect(t).not.toMatch(/undefined|NaN|\.\d/);
        }
      }
    });

    it(`${skill.id} answers survive being typed back as written`, () => {
      const r = rng(7);
      for (let i = 0; i < 300; i++) {
        const q = skill.make(r);
        expect(readNumber(numberText(q.answer)), q.prompt).toBe(q.answer);
      }
    });

    it(`${skill.id} hints never state the answer of a number question`, () => {
      const r = rng(99);
      for (let i = 0; i < 300; i++) {
        const q = skill.make(r);
        const answer = numberText(q.answer);
        for (const h of q.hints ?? []) {
          expect(h.split(/[\s;:.,()]+/).filter((w) => w === answer && answer.length > 2)).toEqual(
            [],
          );
        }
      }
    });
  }

  it('builds varied sets for both drills', () => {
    for (const skills of [PAGE_37_SKILLS, CHAPTER_SKILLS]) {
      const set = buildSet(skills, 3, 1);
      expect(set.length).toBe(skills.length * 3);
      expect(new Set(set.map((q) => q.prompt)).size).toBe(set.length);
    }
  });
});
