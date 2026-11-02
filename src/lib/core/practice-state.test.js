import { describe, it, expect } from 'vitest';
import { checkAnswer } from './answer-check.js';
import {
  afterCheck,
  afterRetry,
  choiceOrder,
  exerciseSeed,
  isAttempt,
  loadSolved,
  matchOrder,
  saveSolved,
  scrambledOrder,
} from './practice-state.js';

function memoryStorage() {
  /** @type {Map<string, string>} */
  const data = new Map();
  return {
    data,
    /** @param {string} k */
    getItem: (k) => data.get(k) ?? null,
    /** @param {string} k @param {string} v */
    setItem: (k, v) => void data.set(k, v),
  };
}

const throwing = {
  getItem() {
    throw new Error('SecurityError');
  },
  setItem() {
    throw new Error('QuotaExceededError');
  },
};

describe('solved store', () => {
  it('round-trips solved indices per key', () => {
    const s = memoryStorage();
    expect(saveSolved('/a/', [0, 2], s)).toBe(true);
    expect(loadSolved('/a/', 5, s)).toEqual([0, 2]);
    expect(loadSolved('/b/', 5, s)).toEqual([]);
  });

  it('drops stale, repeated and junk entries', () => {
    const s = memoryStorage();
    s.setItem('practice:/a/', JSON.stringify([4, 1, 1, 9, -1, 'x', 2.5]));
    expect(loadSolved('/a/', 5, s)).toEqual([1, 4]);
    s.setItem('practice:/a/', '{not json');
    expect(loadSolved('/a/', 5, s)).toEqual([]);
    s.setItem('practice:/a/', '{"a":1}');
    expect(loadSolved('/a/', 5, s)).toEqual([]);
  });

  it('works without storage', () => {
    expect(loadSolved('/a/', 5, null)).toEqual([]);
    expect(saveSolved('/a/', [1], null)).toBe(false);
  });

  it('survives storage that throws', () => {
    expect(loadSolved('/a/', 5, throwing)).toEqual([]);
    expect(saveSolved('/a/', [1], throwing)).toBe(false);
  });

  it('falls back to the global storage, which Node lacks', () => {
    expect(loadSolved('/a/', 5)).toEqual([]);
  });
});

describe('scrambledOrder', () => {
  it('keeps the authored order when it is not the answer', () => {
    expect(scrambledOrder([2, 0, 1])).toEqual([0, 1, 2]);
  });

  it('reverses when the authored order is already the answer', () => {
    expect(scrambledOrder([0, 1, 2])).toEqual([2, 1, 0]);
  });
});

/**
 * @param {Array<[number, number]>} pairs
 * @param {string[]} [right]
 * @returns {import('./content-schema.js').MatchExercise}
 */
const matchOf = (pairs, right = ['x', 'y', 'z', 'w']) => ({
  type: 'match',
  prompt: 'Nối',
  left: pairs.map((_, i) => `l${i}`),
  right,
  pairs,
  hints: ['h'],
  solution: 's',
});

describe('exerciseSeed', () => {
  it('is stable for the same exercise and changes with its items', () => {
    const a = matchOf([
      [0, 0],
      [1, 1],
    ]);
    expect(exerciseSeed(a)).toBe(
      exerciseSeed(
        matchOf([
          [0, 0],
          [1, 1],
        ]),
      ),
    );
    expect(exerciseSeed(a)).not.toBe(
      exerciseSeed(
        matchOf(
          [
            [0, 0],
            [1, 1],
          ],
          ['x', 'y', 'q'],
        ),
      ),
    );
    expect(Number.isInteger(exerciseSeed(a)) && exerciseSeed(a) >= 0).toBe(true);
  });
});

describe('matchOrder', () => {
  it('is a permutation of the right indices', () => {
    const order = matchOrder(
      matchOf([
        [0, 2],
        [1, 0],
        [2, 3],
      ]),
    );
    expect([...order].sort()).toEqual([0, 1, 2, 3]);
  });

  it('is the same on every call, so server and browser agree', () => {
    const ex = matchOf([
      [0, 1],
      [1, 2],
      [2, 0],
    ]);
    expect(matchOrder(ex)).toEqual(matchOrder(structuredClone(ex)));
  });

  it('never shows a left item level with its partner', () => {
    for (let n = 2; n <= 6; n++) {
      const right = Array.from({ length: n }, (_, i) => `r${i}-${n}`);
      for (const pairs of [
        right.map((_, i) => /** @type {[number, number]} */ ([i, i])),
        right.map((_, i) => /** @type {[number, number]} */ ([i, (i + 1) % n])),
      ]) {
        const order = matchOrder(matchOf(pairs, right));
        expect(pairs.filter(([l, r]) => order[l] === r)).toEqual([]);
      }
    }
  });

  it('leaves the answer key alone', () => {
    const ex = matchOf([
      [0, 0],
      [1, 1],
    ]);
    matchOrder(ex);
    expect(ex.pairs).toEqual([
      [0, 0],
      [1, 1],
    ]);
  });
});

describe('choiceOrder', () => {
  /** @param {number} i */
  const exercise = (i) =>
    /** @type {import('./content-schema.js').ChoiceExercise} */ ({
      type: 'choice',
      prompt: `Câu ${i}`,
      options: ['a', 'b', 'c', 'd'],
      answer: 0,
      hints: ['h'],
      solution: 's',
    });

  it('is a stable permutation of the authored indices', () => {
    const order = choiceOrder(exercise(1));
    expect([...order].sort()).toEqual([0, 1, 2, 3]);
    expect(choiceOrder(exercise(1))).toEqual(order);
  });

  it('leaves the stored answer key and options untouched', () => {
    const ex = exercise(2);
    choiceOrder(ex);
    expect(ex.answer).toBe(0);
    expect(ex.options).toEqual(['a', 'b', 'c', 'd']);
    const shown = choiceOrder(ex).map((i) => ex.options[i]);
    const row = shown.indexOf('a');
    expect(checkAnswer(ex, choiceOrder(ex)[row]).correct).toBe(true);
  });

  it('gives a multi exercise the same treatment and depends on its options', () => {
    const multi = /** @type {import('./content-schema.js').MultiExercise} */ ({
      type: 'multi',
      prompt: 'Câu',
      options: ['a', 'b', 'c', 'd', 'e'],
      answers: [0, 1],
      hints: ['h'],
      solution: 's',
    });
    expect([...choiceOrder(multi)].sort()).toEqual([0, 1, 2, 3, 4]);
    expect(exerciseSeed(multi)).not.toBe(exerciseSeed({ ...multi, options: ['a', 'b'] }));
  });

  it('moves an answer written first away from the first row about 3 times in 4', () => {
    const count = 400;
    let first = 0;
    for (let i = 0; i < count; i++) if (choiceOrder(exercise(i))[0] === 0) first += 1;
    expect(first / count).toBeGreaterThan(0.17);
    expect(first / count).toBeLessThan(0.33);
  });
});

describe('an empty answer', () => {
  const number = /** @type {import('./content-schema.js').NumberExercise} */ ({
    type: 'number',
    prompt: 'p',
    answer: 25,
    unit: 'ATP',
    hints: ['h'],
    solution: 's',
  });

  it('is not an attempt, and a real answer is', () => {
    expect(isAttempt(null)).toBe(false);
    expect(isAttempt(checkAnswer(number, ''))).toBe(false);
    expect(isAttempt(checkAnswer(number, '   '))).toBe(false);
    expect(isAttempt(checkAnswer(number, '3'))).toBe(true);
    expect(isAttempt(checkAnswer(number, '25'))).toBe(true);
  });

  it('does not mark the exercise done, and a right answer does', () => {
    const none = [1];
    expect(afterCheck(none, 0, checkAnswer(number, ''))).toBe(none);
    expect(afterCheck(none, 0, checkAnswer(number, '3'))).toBe(none);
    expect(afterCheck(none, 0, checkAnswer(number, '25'))).toEqual([0, 1]);
    expect(afterCheck([0], 0, checkAnswer(number, '25'))).toEqual([0]);
  });

  it('never shows the tick on a card the learner blanked with retry', () => {
    expect(afterRetry([0, 1], 0)).toEqual([1]);
    const solved = [1];
    expect(afterRetry(solved, 0)).toBe(solved);
  });
});
