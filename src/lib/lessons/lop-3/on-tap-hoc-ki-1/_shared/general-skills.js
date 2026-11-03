/**
 * The adaptive review of the whole term: a part from each of the other reviews,
 * and word problems that join two steps. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { divWithin1000, mulWithin1000 } from './arith-skills.js';
import { addSubOrder, brackets, mulDivOrder, strongFirst } from './expression-skills.js';
import { midpoints, rightAngles } from './geometry-skills.js';
import { balances, brokenLines, measureWork, sauceStory } from './measure-skills.js';
import { valueOptions } from './options.js';

/**
 * A second week that brings some times as much as the first.
 * @param {number} first
 * @param {number} times
 * @returns {import('./visual.js').ReviewQuestion}
 */
export function boxesStory(first, times) {
  const second = first * times;
  const right = first + second;
  return {
    prompt: `Tuần trước trường em góp được ${first} thùng đồ dùng học tập. Tuần sau góp được số thùng gấp ${times} lần tuần trước. Cả hai tuần trường em góp được bao nhiêu thùng?`,
    ...valueOptions(right, [second, first + times, right + 10]),
    hint: 'Em tìm số thùng của tuần sau trước, rồi cộng với tuần trước.',
    solution: `${first} × ${times} = ${second} (thùng). ${first} + ${second} = ${right} (thùng).`,
  };
}

/** @type {import('./visual.js').ReviewSkill} */
const twoSteps = {
  id: 'bai-toan-chung',
  label: 'Bài toán hai bước tính',
  make(rand) {
    if (rand() < 0.5) return boxesStory(pick(rand, [15, 20, 25, 30]), int(rand, 2, 3));
    return sauceStory(pick(rand, [80, 100, 120]), int(rand, 3, 8), pick(rand, [5, 10]));
  },
};

/** The parts of the review of the whole term. */
export const GENERAL_SKILLS = [
  mulWithin1000,
  divWithin1000,
  addSubOrder,
  mulDivOrder,
  strongFirst,
  brackets,
  rightAngles,
  midpoints,
  brokenLines,
  balances,
  measureWork,
  twoSteps,
];
