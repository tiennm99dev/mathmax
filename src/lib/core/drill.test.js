import { describe, it, expect } from 'vitest';
import {
  buildSet,
  hintsFor,
  int,
  isDone,
  nextPhase,
  readAnswer,
  rng,
  shuffle,
  skillMap,
  splitUnit,
  withUnit,
} from './drill.js';
import { GROUP, readNatural } from './number-format.js';

/** @type {import('./drill.js').Skill[]} */
const SKILLS = [
  { id: 'a', label: 'A', make: (r) => ({ prompt: `a${int(r, 0, 999)}`, answer: 1, steps: ['x'] }) },
  { id: 'b', label: 'B', make: (r) => ({ prompt: `b${int(r, 0, 999)}`, answer: 2, steps: ['y'] }) },
];

describe('rng', () => {
  it('repeats for the same seed and stays in [0, 1)', () => {
    const [r1, r2] = [rng(42), rng(42)];
    for (let i = 0; i < 100; i++) {
      const x = r1();
      expect(x).toBe(r2());
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });

  it('int covers both ends', () => {
    const r = rng(1);
    const seen = new Set(Array.from({ length: 500 }, () => int(r, 1, 3)));
    expect([...seen].sort()).toEqual([1, 2, 3]);
  });

  it('shuffle keeps every item', () => {
    expect(shuffle(rng(3), [1, 2, 3, 4, 5]).sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('buildSet', () => {
  it('draws perSkill distinct questions from every skill', () => {
    const set = buildSet(SKILLS, 3, 7);
    expect(set).toHaveLength(6);
    expect(set.filter((q) => q.skill === 'a')).toHaveLength(3);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(6);
    expect(buildSet(SKILLS, 3, 7)).toEqual(set);
  });
});

describe('skillMap', () => {
  it('colours skills by first-attempt results', () => {
    const qs = [
      { skill: 'a', prompt: '1', answer: 1, steps: [] },
      { skill: 'a', prompt: '2', answer: 1, steps: [] },
      { skill: 'b', prompt: '3', answer: 1, steps: [] },
      { skill: 'b', prompt: '4', answer: 1, steps: [] },
    ];
    const map = (/** @type {Array<boolean | null>} */ res) =>
      skillMap(SKILLS, qs, res).map((s) => s.status);
    expect(map([null, null, null, null])).toEqual(['todo', 'todo']);
    expect(map([true, true, false, false])).toEqual(['good', 'weak']);
    expect(map([true, false, true, null])).toEqual(['mixed', 'good']);
    expect(skillMap(SKILLS, qs, [true, false, null, null])[0]).toMatchObject({
      right: 1,
      answered: 2,
      total: 2,
    });
  });
});

describe('nextPhase', () => {
  it('gives a second try after a wrong first answer', () => {
    expect(nextPhase('ask', true)).toBe('right');
    expect(nextPhase('ask', false)).toBe('retry');
    expect(nextPhase('retry', true)).toBe('fixed');
    expect(nextPhase('retry', false)).toBe('wrong');
  });

  it('never spends a try on unreadable input', () => {
    expect(nextPhase('ask', null)).toBe('invalid');
    expect(nextPhase('invalid', false)).toBe('retry');
    expect(nextPhase('retry', null)).toBe('retry-invalid');
    expect(nextPhase('retry-invalid', false)).toBe('wrong');
  });

  it('settles after a right answer or two misses', () => {
    expect(isDone('right')).toBe(true);
    expect(isDone('fixed')).toBe(true);
    expect(isDone('wrong')).toBe(true);
    expect(isDone('retry')).toBe(false);
    expect(nextPhase('wrong', true)).toBe('wrong');
  });
});

describe('hintsFor', () => {
  const q = (/** @type {Partial<import('./drill.js').Question>} */ over) => ({
    skill: 'a',
    prompt: 'p',
    answer: 1024,
    steps: ['Viết 2¹⁰ = 2 · 2 · … · 2.', `2¹⁰ = 1${GROUP}024.`, 'Vậy đáp số là 1024.'],
    ...over,
  });

  it('uses the steps before the last one that do not state the answer', () => {
    expect(hintsFor(q({}))).toEqual(['Viết 2¹⁰ = 2 · 2 · … · 2.']);
    expect(hintsFor(q({ answer: 5, steps: ['a = 15', 'b = 5', 'c'] }))).toEqual(['a = 15']);
  });

  it('prefers the hints a question carries', () => {
    expect(hintsFor(q({ hints: ['Đếm số thừa số.'] }))).toEqual(['Đếm số thừa số.']);
  });
});

describe('per-question answers', () => {
  it('splits a trailing unit off the number', () => {
    expect(splitUnit(' 45 % ')).toEqual({ number: '45', unit: '%' });
    expect(splitUnit('1 300 000 đồng')).toEqual({ number: '1 300 000', unit: 'đồng' });
    expect(splitUnit('−3/4')).toEqual({ number: '−3/4', unit: '' });
    expect(splitUnit('(−2)')).toEqual({ number: '(−2)', unit: '' });
    expect(splitUnit('abc')).toEqual({ number: 'abc', unit: '' });
  });

  it('accepts a unit only on a question that has it', () => {
    const money = { unit: 'đồng' };
    expect(readAnswer(money, '12 000 đồng', readNatural)).toBe(12000);
    expect(readAnswer(money, '12 000 đ', readNatural)).toBe(12000);
    expect(readAnswer(money, '12 000', readNatural)).toBe(12000);
    expect(readAnswer(money, '12 000 %', readNatural)).toBe('unit');
    expect(readAnswer({}, '45%', readNatural)).toBe('unit');
    expect(readAnswer({}, '45 đồng', readNatural)).toBe('unit');
    expect(readAnswer({ unit: '°' }, '130 độ', readNatural)).toBe(130);
  });

  it('lets a question bring its own reader', () => {
    const half = { read: (/** @type {string} */ t) => (t === '1/2' ? 0.5 : null) };
    expect(readAnswer(half, '1/2', readNatural)).toBe(0.5);
    expect(readAnswer({}, '1/2', readNatural)).toBeNull();
  });

  it('writes an answer with its unit', () => {
    expect(withUnit('45', '%')).toBe('45%');
    expect(withUnit('90', '°')).toBe('90°');
    expect(withUnit('12 000', 'đồng')).toBe('12 000 đồng');
    expect(withUnit('7')).toBe('7');
  });
});
