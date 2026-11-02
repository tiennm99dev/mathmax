/**
 * The calculations the theory lessons of this chapter work through, taken from
 * the book's exercises where they fit. The test checks that each set really
 * has the carry its name says.
 */

/** @typedef {{ a: number, b: number, op: import('#lib/core/kid/column.js').Op }} Problem */

/**
 * @param {import('#lib/core/kid/column.js').Op} op
 * @param {Array<[number, number]>} pairs
 * @returns {Problem[]}
 */
const set = (op, pairs) => pairs.map(([a, b]) => ({ a, b, op }));

export const ADD_PLAIN = set('+', [
  [247, 351],
  [526, 32],
  [815, 60],
  [923, 6],
  [375, 622],
  [800, 37],
]);

export const ADD_CARRY_ONES = set('+', [
  [427, 246],
  [729, 32],
  [246, 44],
  [326, 29],
  [709, 289],
  [427, 125],
]);

export const ADD_CARRY_TENS = set('+', [
  [381, 342],
  [550, 192],
  [762, 184],
  [546, 172],
  [248, 70],
  [690, 89],
]);

export const SUB_PLAIN = set('-', [
  [543, 403],
  [619, 207],
  [758, 727],
  [347, 120],
  [580, 40],
  [465, 240],
]);

export const SUB_CARRY_TENS = set('-', [
  [362, 36],
  [485, 128],
  [780, 68],
  [364, 126],
  [456, 148],
  [650, 329],
]);

export const SUB_CARRY_HUNDREDS = set('-', [
  [427, 251],
  [608, 315],
  [382, 190],
  [721, 350],
  [205, 12],
  [288, 190],
]);
