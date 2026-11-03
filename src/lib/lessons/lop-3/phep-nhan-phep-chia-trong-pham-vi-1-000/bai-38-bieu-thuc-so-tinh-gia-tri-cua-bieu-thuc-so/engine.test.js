import { describe, expect, it } from 'vitest';
import { applyOp, nextOp, parse, partsOf, valueOf, workLines } from '../_shared/expression.js';
import { EXPRESSIONS, growTree, leavesOf, valueOptions } from './engine.js';

/** The values worked out by hand from the book's rules. */
const VALUES = /** @type {Record<string, number>} */ ({
  '27 − 7 + 30': 50,
  '60 + 50 − 20': 90,
  '30 : 5 × 2': 12,
  '67 − 15 − 5': 47,
  '8 × 3 : 4': 6,
  '24 + 5 × 6': 54,
  '30 − 18 : 3': 24,
  '40 + 32 : 4': 48,
  '56 − 2 × 5': 46,
  '90 : 9 + 15': 25,
  '8 × (11 − 6)': 40,
  '45 : (5 + 4)': 5,
  '(15 + 5) : 5': 4,
  '32 − (25 + 4)': 3,
  '5 × (6 − 2)': 20,
});

describe('the expressions', () => {
  it('have the values worked out by hand, whole at every step', () => {
    const bad = [];
    for (const text of Object.values(EXPRESSIONS).flat()) {
      if (valueOf(text) !== VALUES[text]) bad.push(text);
      if (
        workLines(text)
          .join(' ')
          .match(/\d\.\d/)
      )
        bad.push(text);
    }
    expect(bad).toEqual([]);
  });
});

describe('the tree', () => {
  it('stands the numbers side by side', () => {
    const leaves = leavesOf('24 + 5 × 6', 300);
    expect(leaves.map((n) => [n.value, n.x, n.level])).toEqual([
      [24, 50, 0],
      [5, 150, 0],
      [6, 250, 0],
    ]);
  });

  it('grows up to the value, whichever operation comes first', () => {
    const bad = [];
    for (const text of Object.values(EXPRESSIONS).flat()) {
      let tree = leavesOf(text, 300);
      let tokens = parse(text);
      let id = 50;
      while (nextOp(tokens) >= 0) {
        const i = nextOp(tokens);
        const { left, op, right } = partsOf(tokens, i);
        tree = growTree(tree, left.id, op, right.id, id);
        tokens = applyOp(tokens, i, id);
        id += 1;
      }
      const top = tree[tree.length - 1];
      if (top.value !== VALUES[text] || top.level !== 2) bad.push(text);
    }
    expect(bad).toEqual([]);
  });
});

describe('the options', () => {
  it('hold the right value once, with the other operation among the slips', () => {
    expect(valueOptions(5, '×', 6)).toEqual([11, 29, 30, 31]);
    expect(valueOptions(11, '−', 6)).toEqual([4, 5, 6, 17]);
    expect(valueOptions(45, ':', 9)).toEqual([4, 5, 6, 36]);
  });

  it('hold different numbers that are not negative', () => {
    const options = valueOptions(0, '+', 0);
    expect(new Set(options).size).toBe(options.length);
    expect(options.every((v) => v >= 0)).toBe(true);
    expect(options).toContain(0);
  });
});
