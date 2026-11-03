/**
 * Two paper strips and how many times the short one fits along the long one:
 * the child lays the short strip again and again, then says how many times the
 * big number is the small one. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';

/** @typedef {{ big: number, small: number }} Task */

/** @type {Task} */
export const FIRST_TASK = { big: 6, small: 2 };

/**
 * A new pair where the big number is a whole number of times the small one.
 * @param {() => number} rand
 * @param {Task} [not]
 * @returns {Task}
 */
export function makeTask(rand, not) {
  for (;;) {
    const small = int(rand, 2, 9);
    const big = small * int(rand, 2, 9);
    if (!not || not.big !== big || not.small !== small) return { big, small };
  }
}

/**
 * How many times the short strip fits.
 * @param {Task} task
 */
export const timesOf = ({ big, small }) => big / small;

/**
 * The live sentence while the strip is laid.
 * @param {Task} task
 * @param {number} laid how many times it was laid so far
 */
export function layMessage(task, laid) {
  const { big, small } = task;
  const reached = laid * small;
  if (laid === 0)
    return `Thanh dài ${big} cm, thanh ngắn ${small} cm. Em đặt thanh ngắn dọc theo thanh dài.`;
  return reached === big
    ? `Vừa khít! Thanh ngắn đặt được ${laid} lần. Vậy ${big} gấp mấy lần ${small}?`
    : `Đặt ${laid} lần được ${reached} cm, chưa đủ ${big} cm.`;
}

/**
 * Number options: the right one, the difference (the slip of subtracting
 * instead of dividing) and neighbours. Whole, above 0, in increasing order.
 * @param {Task} task
 */
export function timesOptions(task) {
  const right = timesOf(task);
  const slips = [task.big - task.small, right + 1, right - 1, right + 2];
  const others = [...new Set(slips)].filter((v) => v !== right && v > 0);
  return [right, ...others.slice(0, 3)].sort((x, y) => x - y);
}

/**
 * What a wrong option gets: why it is wrong, or the sentence on a second try.
 * @param {Task} task
 * @param {number} value
 * @param {number} tries wrong tries, this one included
 */
export function wrongTimes(task, value, tries) {
  const { big, small } = task;
  if (tries >= 2) return `Em xem nhé: ${big} : ${small} = ${timesOf(task)}.`;
  if (value === big - small) {
    return `${big} − ${small} = ${value} là số lớn hơn số bé bao nhiêu. Em đếm số lần đặt thanh ngắn.`;
  }
  return `Chưa đúng. Em đếm lại số lần đặt thanh ngắn, hoặc tính ${big} : ${small}.`;
}

/**
 * The closing sentences: how many times, and how many more.
 * @param {Task} task
 */
export function doneLines(task) {
  const { big, small } = task;
  const times = timesOf(task);
  return [
    `${big} : ${small} = ${times}. Số lớn gấp ${times} lần số bé.`,
    `${big} − ${small} = ${big - small}. Số lớn hơn số bé ${big - small} đơn vị.`,
  ];
}
