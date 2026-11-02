/**
 * Sharing sweets into bags: bags are filled until too few are left for another
 * one. What is left is the remainder, always less than the divisor. Pure and
 * DOM-free.
 */
import { divText } from '../_shared/division.js';

/** @typedef {{ total: number, per: number }} Task */

/** Exact and remainder divisions in turn, from the book's numbers. */
export const TASKS = /** @type {readonly Task[]} */ ([
  { total: 8, per: 2 },
  { total: 9, per: 2 },
  { total: 15, per: 3 },
  { total: 14, per: 3 },
  { total: 20, per: 4 },
  { total: 19, per: 5 },
  { total: 18, per: 6 },
  { total: 17, per: 2 },
  { total: 21, per: 3 },
  { total: 34, per: 6 },
]);

/**
 * The sweets not yet in a bag.
 * @param {Task} task
 * @param {number} bags
 */
export const leftOver = ({ total, per }, bags) => total - per * bags;

/**
 * Whether another bag can still be filled.
 * @param {Task} task
 * @param {number} bags
 */
export const canFill = (task, bags) => leftOver(task, bags) >= task.per;

/**
 * What pressing "Đóng một túi" says when too few sweets are left.
 * @param {Task} task
 * @param {number} bags
 */
export function cannotFillMessage(task, bags) {
  const left = leftOver(task, bags);
  if (left === 0) return 'Hết kẹo rồi. Em bấm "Xong" nhé.';
  return `Chỉ còn ${left} cái kẹo, không đủ ${task.per} cái cho một túi. Em bấm "Xong" nhé.`;
}

/**
 * What pressing "Xong" says.
 * @param {Task} task
 * @param {number} bags
 * @returns {{ done: boolean, text: string }}
 */
export function finish(task, bags) {
  const left = leftOver(task, bags);
  if (left >= task.per) {
    return {
      done: false,
      text: `Còn ${left} cái kẹo, vẫn đủ ${task.per} cái cho một túi nữa. Số dư phải bé hơn số chia.`,
    };
  }
  if (left === 0)
    return { done: true, text: `${divText(task.total, task.per)}. Đây là phép chia hết.` };
  return {
    done: true,
    text: `${divText(task.total, task.per)}. Đây là phép chia có dư. Số dư ${left} bé hơn số chia ${task.per}.`,
  };
}

/**
 * The sentence while the child is still filling bags.
 * @param {Task} task
 * @param {number} bags
 */
export function progressMessage(task, bags) {
  return `Đã đóng ${bags} túi. Còn ${leftOver(task, bags)} cái kẹo.`;
}
