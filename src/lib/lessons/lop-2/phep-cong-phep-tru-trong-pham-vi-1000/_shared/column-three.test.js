import { describe, expect, it } from 'vitest';
import { resultOf } from '#lib/core/kid/column.js';
import {
  actionAsk,
  actionLabel,
  blocksLeft,
  carryCount,
  carryPlace,
  columnSteps,
  columnText,
  isShowable,
  planOf,
  viewAt,
} from './column-three.js';
import {
  ADD_CARRY_ONES,
  ADD_CARRY_TENS,
  ADD_PLAIN,
  SUB_CARRY_HUNDREDS,
  SUB_CARRY_TENS,
  SUB_PLAIN,
} from './problems.js';

const ALL = [
  ...ADD_PLAIN,
  ...ADD_CARRY_ONES,
  ...ADD_CARRY_TENS,
  ...SUB_PLAIN,
  ...SUB_CARRY_TENS,
  ...SUB_CARRY_HUNDREDS,
];

/**
 * Every showable calculation with a sample of three-digit first numbers.
 * @returns {Array<{ a: number, b: number, op: '+' | '-' }>}
 */
function sample() {
  /** @type {Array<{ a: number, b: number, op: '+' | '-' }>} */
  const cases = [];
  for (let a = 100; a <= 999; a += 37) {
    for (let b = 1; b <= 999; b += 23) {
      for (const op of /** @type {const} */ (['+', '-'])) {
        if (isShowable(a, b, op)) cases.push({ a, b, op });
      }
    }
  }
  return cases;
}

describe('columnSteps', () => {
  it('reads an addition with a carry as the book does', () => {
    expect(columnText(427, 246, '+')).toBe(
      '7 cộng 6 bằng 13, viết 3, nhớ 1. 2 cộng 4 bằng 6, thêm 1 bằng 7, viết 7. 4 cộng 2 bằng 6, viết 6. Vậy 427 + 246 = 673.',
    );
  });

  it('brings down a hundreds digit with nothing under it', () => {
    expect(columnSteps(923, 6, '+')[2].text).toBe('Hạ 9, viết 9.');
    expect(columnSteps(729, 32, '+')[2].text).toBe('Hạ 7, viết 7.');
  });

  it('adds the carry to a column with one digit', () => {
    expect(columnSteps(381, 72, '+')[2].text).toBe('3 thêm 1 bằng 4, viết 4.');
  });

  it('reads a subtraction with a carry as the book does', () => {
    expect(columnText(485, 128, '-')).toBe(
      '5 không trừ được 8, lấy 15 trừ 8 bằng 7, viết 7, nhớ 1. 2 thêm 1 bằng 3, 8 trừ 3 bằng 5, viết 5. 4 trừ 1 bằng 3, viết 3. Vậy 485 − 128 = 357.',
    );
  });

  it('takes the carry from a column with one digit', () => {
    expect(columnSteps(780, 68, '-')[2].text).toBe('Hạ 7, viết 7.');
    expect(columnSteps(420, 60, '-')[2].text).toBe('4 trừ 1 bằng 3, viết 3.');
  });

  it('leaves out a zero at the front of the result', () => {
    const [, tens, hundreds] = columnSteps(651, 635, '-');
    expect(tens.digit).toBe(1);
    expect(hundreds.blank).toBe(true);
    expect(hundreds.text).toBe('6 trừ 6 bằng 0, không cần viết.');
  });

  it('keeps a zero inside the result', () => {
    const [, tens] = columnSteps(456, 148, '-');
    expect(tens.digit).toBe(0);
    expect(tens.blank).toBe(false);
    const [, first, second] = columnSteps(543, 403, '-');
    expect(first.digit).toBe(4);
    expect(second.digit).toBe(1);
  });

  it('gives the digits of the real result', () => {
    const bad = sample().filter(({ a, b, op }) => {
      const digits = columnSteps(a, b, op)
        .map((s, i) => (s.blank ? 0 : s.digit * 10 ** i))
        .reduce((sum, d) => sum + d, 0);
      return digits !== resultOf(a, b, op);
    });
    expect(bad).toEqual([]);
  });
});

describe('carry counts', () => {
  it('finds the place that carries', () => {
    expect(carryPlace(247, 351, '+')).toBe(null);
    expect(carryPlace(427, 246, '+')).toBe('ones');
    expect(carryPlace(381, 342, '+')).toBe('tens');
    expect(carryPlace(362, 36, '-')).toBe('ones');
    expect(carryPlace(427, 251, '-')).toBe('tens');
    expect(carryPlace(205, 12, '-')).toBe('tens');
  });

  it('refuses two carries, a result of 1000 and a small first number', () => {
    expect(carryCount(358, 276, '+')).toBe(2);
    expect(isShowable(358, 276, '+')).toBe(false);
    expect(isShowable(305, 128, '-')).toBe(false);
    expect(isShowable(500, 500, '+')).toBe(false);
    expect(isShowable(75, 25, '+')).toBe(false);
  });
});

describe('the sets of the lessons', () => {
  it('are all showable and have correct carries', () => {
    const wrong = [
      ...ADD_PLAIN.map((p) => [p, null]),
      ...ADD_CARRY_ONES.map((p) => [p, 'ones']),
      ...ADD_CARRY_TENS.map((p) => [p, 'tens']),
      ...SUB_PLAIN.map((p) => [p, null]),
      ...SUB_CARRY_TENS.map((p) => [p, 'ones']),
      ...SUB_CARRY_HUNDREDS.map((p) => [p, 'tens']),
    ].filter(([p, place]) => {
      const { a, b, op } = /** @type {import('./problems.js').Problem} */ (p);
      return !isShowable(a, b, op) || carryPlace(a, b, op) !== place;
    });
    expect(wrong).toEqual([]);
  });

  it('have the expected results', () => {
    expect(resultOf(709, 289, '+')).toBe(998);
    expect(resultOf(205, 12, '-')).toBe(193);
    expect(resultOf(650, 329, '-')).toBe(321);
    expect(ALL.length).toBe(36);
  });
});

describe('the block plan', () => {
  it('has no action for a column with nothing to do', () => {
    const types = planOf(923, 6, '+').map((x) => x.type);
    expect(types).toEqual(['join', 'digit', 'digit', 'digit']);
  });

  it('joins, trades, then writes', () => {
    const types = planOf(427, 246, '+').map((x) => `${x.type}:${x.step.place}`);
    expect(types).toEqual([
      'join:ones',
      'swap:ones',
      'digit:ones',
      'join:tens',
      'digit:tens',
      'join:hundreds',
      'digit:hundreds',
    ]);
  });

  it('opens a block, takes away, then writes', () => {
    const types = planOf(362, 36, '-').map((x) => `${x.type}:${x.step.place}`);
    expect(types).toEqual([
      'untie:ones',
      'take:ones',
      'digit:ones',
      'take:tens',
      'digit:tens',
      'digit:hundreds',
    ]);
  });

  it('shows the book action on the buttons', () => {
    const swap = planOf(381, 342, '+').find((x) => x.type === 'swap');
    expect(swap && actionLabel(swap)).toBe('Đổi 10 thanh chục thành 1 tấm trăm');
    const untie = planOf(427, 251, '-').find((x) => x.type === 'untie');
    expect(untie && actionLabel(untie)).toBe('Tháo 1 tấm trăm thành 10 thanh chục');
    expect(untie && actionAsk(untie, '-')).toContain('có 2 thanh chục, phải bớt 5');
  });

  it('moves a traded block into the next column', () => {
    const view = viewAt(381, 342, '+', 4);
    expect(view.carried).toBe('hundreds');
    expect(view.columns.tens.top).toBe(2);
    expect(view.columns.hundreds.extra).toBe(1);
  });

  it('moves an opened block into the column that needs it', () => {
    const view = viewAt(427, 251, '-', 3);
    expect(view.carried).toBe('hundreds');
    expect(view.columns.hundreds.top).toBe(3);
    expect(view.columns.tens.top).toBe(12);
  });

  it('makes every written digit the count of the blocks left', () => {
    const bad = sample().filter(({ a, b, op }) => {
      const plan = planOf(a, b, op);
      return plan.some((action, i) => {
        if (action.type !== 'digit') return false;
        return blocksLeft(viewAt(a, b, op, i).columns[action.step.place]) !== action.step.digit;
      });
    });
    expect(bad).toEqual([]);
  });

  it('writes the whole result by the end', () => {
    const view = viewAt(651, 635, '-', planOf(651, 635, '-').length);
    expect(view.written).toEqual({ ones: 6, tens: 1, hundreds: null });
    expect(view.active).toBe(null);
  });
});
