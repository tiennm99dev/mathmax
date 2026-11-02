import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { SCENES, makeStory } from '../_shared/two-step.js';
import { KIND_LABELS, buildRound, stepOf } from './engine.js';

/**
 * The value of a calculation matched as [text, x, sign, y].
 * @param {RegExpMatchArray} m
 */
function worked(m) {
  const [x, y] = [Number(m[1]), Number(m[3])];
  if (m[2] === '×') return x * y;
  if (m[2] === ':') return x / y;
  return m[2] === '+' ? x + y : x - y;
}

describe('the steps of a problem', () => {
  it('open in order and end with the solved problem', () => {
    const can = makeStory(SCENES[0]);
    const need = stepOf(can, 'need');
    expect(need?.options[need.answer]).toContain('Can thứ hai');
    expect(need?.next).toBe('first');
    const first = stepOf(can, 'first');
    expect(first?.options[first.answer]).toBe('5 × 3');
    expect(first?.right).toContain('5 × 3 = 15');
    expect(first?.next).toBe('total');
    const total = stepOf(can, 'total');
    expect(total?.options[total.answer]).toBe('5 + 15');
    expect(total?.right).toContain('Đáp số: 20 l nước mắm.');
    expect(stepOf(can, 'done')).toBeNull();
  });

  it('explains the operation of a wrong tap from the comparison', () => {
    const boats = makeStory(SCENES[1]);
    expect(stepOf(boats, 'first')?.slip).toContain('phép trừ');
    expect(stepOf(makeStory(SCENES[4]), 'first')?.slip).toContain('phép cộng');
    expect(stepOf(makeStory(SCENES[5]), 'first')?.slip).toContain('phép chia');
    expect(stepOf(makeStory(SCENES[0]), 'first')?.slip).toContain('phép nhân');
  });
});

describe('names in the middle of a sentence', () => {
  it('keep the capitals of a person and of points', () => {
    expect(stepOf(makeStory(SCENES[1]), 'need')?.right).toContain('biết Nam gấp');
    expect(stepOf(makeStory(SCENES[3]), 'need')?.right).toContain('đoạn thẳng BC dài');
    expect(stepOf(makeStory(SCENES[3]), 'need')?.ask).toContain('đường gấp khúc ABC dài');
    expect(stepOf(makeStory(SCENES[0]), 'need')?.ask).toContain('cả hai can đựng');
  });
});

describe('the round', () => {
  it('stores the answers that the numbers of the problem give', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]);
        if (new Set(q.options.map(optionText)).size !== q.options.length) bad.push(q.prompt);
        if (!(q.kind && q.kind in KIND_LABELS)) bad.push(q.prompt);
        if (q.kind === 'answer' || q.kind === 'diagram') {
          const lines = [...q.solution.matchAll(/(\d+) ([×:+−]) (\d+) = (\d+)/g)];
          if (lines.length !== 2 || lines.some((m) => worked(m) !== Number(m[4])))
            bad.push(q.solution);
          if (Number(right) !== Number(lines[1]?.[4])) bad.push(q.prompt);
        }
        if (q.kind === 'total') {
          const [x, y] = q.prompt.match(/\b\d+\b/g)?.map(Number) ?? [];
          if (right !== `${x} + ${y}`) bad.push(q.prompt);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('never tells the answer of a diagram while it is open', () => {
    const bad = [];
    for (let seed = 1; seed <= 20; seed++) {
      for (const q of buildRound(seed)) {
        if (q.kind === 'diagram' && !q.visual) bad.push(q.prompt);
        if (q.kind === 'diagram' && q.prompt.includes(optionText(q.options[q.answer])))
          bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
