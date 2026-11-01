import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  capitalize,
  drawFresh,
  isSettled,
  mixOptions,
  numberOptions,
  optionName,
  optionText,
  pickSkill,
  questionKey,
  signOptions,
  skillMap,
  tapOption,
  toReview,
  weakLabels,
} from './quiz.js';

/** @type {import('./quiz.js').KidQuestion} */
const question = {
  prompt: 'Số nào lớn hơn?',
  options: ['>', '<', '=', { label: 'Hình vuông' }],
  answer: 1,
  hint: 'Đếm xem.',
  solution: '2 < 3.',
};

describe('kid question options', () => {
  it('reads the text of plain and picture options', () => {
    expect(optionText('7')).toBe('7');
    expect(optionText({ label: 'Hình tròn' })).toBe('Hình tròn');
  });

  it('names comparison signs aloud and keeps given labels', () => {
    expect(optionName(question, 0)).toBe('Dấu lớn hơn');
    expect(optionName(question, 2)).toBe('Dấu bằng');
    expect(optionName(question, 3)).toBe('Hình vuông');
    expect(optionName({ ...question, optionLabels: ['A', 'B', 'C', 'D'] }, 0)).toBe('A');
  });

  it('builds number, mixed and sign options that contain the answer', () => {
    for (let seed = 1; seed < 30; seed++) {
      const { options, answer } = numberOptions(rng(seed), 9, 0, 10);
      expect(options[answer]).toBe('9');
      expect(options.every((o) => Number(o) >= 0 && Number(o) <= 10)).toBe(true);
      expect([...options].sort((a, b) => Number(a) - Number(b))).toEqual(options);
    }
    const mixed = mixOptions(rng(3), 'ba', ['hai', 'ba', 'bốn', 'hai']);
    expect(mixed.options).toHaveLength(3);
    expect(mixed.options[mixed.answer]).toBe('ba');
    expect(signOptions('<')).toMatchObject({ answer: 1, options: ['>', '<', '='] });
    expect(capitalize('hình tròn')).toBe('Hình tròn');
  });
});

describe('tapping an option', () => {
  it('ends on a right first tap and records it', () => {
    expect(tapOption({ phase: 'ask', wrong: [] }, 1, 1)).toEqual({
      phase: 'right',
      wrong: [],
      first: true,
    });
  });

  it('gives a second try after one miss and the answer after two', () => {
    const one = tapOption({ phase: 'ask', wrong: [] }, 0, 1);
    expect(one).toEqual({ phase: 'retry', wrong: [0], first: false });
    const again = tapOption(one, 0, 1);
    expect(again.first).toBeNull();
    expect(again.phase).toBe('retry');
    const two = tapOption(one, 2, 1);
    expect(two).toEqual({ phase: 'shown', wrong: [0, 2], first: null });
    expect(isSettled(two.phase)).toBe(true);
    expect(tapOption(two, 1, 1).phase).toBe('shown');
  });

  it('lists the parts with a wrong first try in the order of the labels', () => {
    const labels = { add: 'Phép cộng', sub: 'Phép trừ', story: 'Bài toán' };
    const round = [{ kind: 'story' }, { kind: 'add' }, { kind: 'sub' }].map((k) => ({
      ...question,
      ...k,
    }));
    expect(weakLabels(round, [false, false, true], labels)).toEqual(['Phép cộng', 'Bài toán']);
    expect(weakLabels(round, [true, null], labels)).toEqual([]);
  });
});

describe('adaptive kid set', () => {
  /** @param {string} id @returns {import('./quiz.js').KidSkill} */
  const skill = (id) => ({
    id,
    label: id.toUpperCase(),
    make: (rand) => ({ ...question, prompt: `${id} ${Math.floor(rand() * 3)}` }),
  });
  const skills = [skill('a'), skill('b'), skill('c')];

  it('asks every part once before weighting the weak ones', () => {
    const rand = rng(5);
    /** @type {import('./quiz.js').Attempt[]} */
    const attempts = [];
    const seen = new Set();
    for (let i = 0; i < 3; i++) {
      const { skill: s, reason } = pickSkill(skills, attempts, rand);
      expect(reason).toBe('new');
      seen.add(s.id);
      attempts.push({ skill: s.id, ok: s.id !== 'b' });
    }
    expect(seen.size).toBe(3);
    expect(skillMap(skills, attempts).find((s) => s.id === 'b')?.status).toBe('weak');
    expect(toReview(skills, attempts)).toEqual(['B']);
  });

  it('draws a question not asked yet when it can', () => {
    const rand = rng(2);
    const asked = new Set(['a 0', 'a 1'].map((p) => questionKey({ ...question, prompt: p })));
    expect(drawFresh(skills[0], asked, rand).prompt).toBe('a 2');
  });
});
