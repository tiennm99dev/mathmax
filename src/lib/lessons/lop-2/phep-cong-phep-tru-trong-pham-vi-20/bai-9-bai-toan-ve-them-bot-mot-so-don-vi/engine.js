/**
 * "Bài toán về thêm, bớt một số đơn vị" as a picture story: the child acts
 * the story out (adds the pictures that come, crosses out the ones that go),
 * picks the calculation (adding for "thêm", subtracting for "bớt"), finds
 * the result and reads the solution set out the book's way. The stories
 * come from the chapter's `_shared/stories.js`. Pure and DOM-free.
 */
import { numberOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { THINGS, result } from '../_shared/stories.js';

export { THINGS, newStory, result, solutionLines, storyText } from '../_shared/stories.js';

/** @typedef {import('../_shared/stories.js').Story} Story */

/**
 * The short summary (tóm tắt) of a story, as the book writes it.
 * @param {Story} s
 * @returns {string[]}
 */
export function summaryLines(s) {
  const t = THINGS[s.thing];
  return s.kind === 'them'
    ? [`Có: ${s.a} ${t.name}`, `Thêm: ${s.b} ${t.name}`, `Có tất cả: ... ${t.name}?`]
    : [`Có: ${s.a} ${t.name}`, `Bớt: ${s.b} ${t.name}`, `Còn lại: ... ${t.name}?`];
}

/**
 * The two calculations to choose from, always adding first and then
 * subtracting, so the position of the right one gives nothing away.
 * @param {Story} s
 */
export function operationOptions(s) {
  return {
    options: [`${s.a} + ${s.b}`, `${s.a} ${MINUS} ${s.b}`],
    answer: s.kind === 'them' ? 0 : 1,
  };
}

/**
 * Answer options near the result.
 * @param {() => number} rand
 * @param {Story} s
 */
export function resultOptions(rand, s) {
  return numberOptions(rand, result(s), 0, 20);
}

/**
 * What the pictures say while the child acts the story out.
 * @param {Story} s
 * @param {number} acted pictures added or crossed out so far
 */
export function actMessage(s, acted) {
  const t = THINGS[s.thing];
  const left = s.b - acted;
  if (s.kind === 'them') {
    if (left > 0) return `Em chạm "Thêm" để thêm ${t.name}. Còn ${left} ${t.name} nữa.`;
    return `Đã thêm đủ ${s.b} ${t.name}. Thêm vào thì em làm phép tính gì?`;
  }
  if (left > 0) return `Em chạm vào ${t.name} để gạch bớt. Còn ${left} ${t.name} nữa.`;
  return `Đã bớt đủ ${s.b} ${t.name}. Bớt đi thì em làm phép tính gì?`;
}
