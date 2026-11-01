/**
 * "Phép cộng (qua 10) trong phạm vi 20" on two ten-frames: the first frame
 * holds `a` red dots, the second `b` blue dots. Moving blue dots across
 * until the first frame is full shows the split of `b` that makes ten
 * (9 + 5: move 1, so 5 = 1 + 4), and the sum reads as 10 and what is left.
 * Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { numberOptions } from '#lib/core/kid/quiz.js';
import { makeTen, makeTenSteps } from '../_shared/facts.js';

/** @typedef {'empty' | 'red' | 'blue' | 'gone'} Cell */

/**
 * The two frames after `moved` blue dots went across: the first frame has
 * the red dots, then the moved blue dots; the second keeps the rest.
 * @param {number} a
 * @param {number} b
 * @param {number} moved
 * @returns {{ first: Cell[], second: Cell[] }}
 */
export function frames(a, b, moved) {
  const first = Array.from(
    { length: 10 },
    (_, i) => /** @type {Cell} */ (i < a ? 'red' : i < a + moved ? 'blue' : 'empty'),
  );
  const second = Array.from(
    { length: 10 },
    (_, i) => /** @type {Cell} */ (i < b - moved ? 'blue' : 'empty'),
  );
  return { first, second };
}

/**
 * How many more dots can go across: only until the first frame is full.
 * @param {number} a
 * @param {number} moved
 */
export function canMove(a, moved) {
  return a + moved < 10;
}

/**
 * What the frames say now, read aloud.
 * @param {number} a
 * @param {number} b
 * @param {number} moved
 */
export function frameMessage(a, b, moved) {
  const { fill, rest } = makeTen(a, b);
  if (moved === 0) {
    return `Có ${a} chấm đỏ và ${b} chấm xanh. Em chuyển chấm xanh sang khung thứ nhất cho đủ 10 nhé.`;
  }
  if (moved < fill) {
    return `Khung thứ nhất có ${a + moved} chấm. Còn thiếu ${fill - moved} chấm nữa là đủ 10.`;
  }
  return `Khung thứ nhất đủ 10 chấm. Khung thứ hai còn ${rest} chấm. ${b} = ${fill} + ${rest}. 10 + ${rest} = ${a + b}.`;
}

/**
 * The full reason once the sum is found.
 * @param {number} a
 * @param {number} b
 */
export function explain(a, b) {
  return `${makeTenSteps(a, b).join(' ')} Vậy ${a} + ${b} = ${a + b}.`;
}

/**
 * A new addition across ten, `a` from 6 to 9, different from the last one.
 * @param {() => number} rand
 * @param {{ a: number, b: number }} [previous]
 */
export function newPair(rand, previous) {
  for (let i = 0; i < 20; i++) {
    const a = int(rand, 6, 9);
    const b = int(rand, 11 - a, 9);
    if (!previous || a !== previous.a || b !== previous.b) return { a, b };
  }
  return { a: 9, b: 5 };
}

/**
 * Answer options for the sum, near it and within 11 to 18.
 * @param {() => number} rand
 * @param {number} a
 * @param {number} b
 */
export function sumOptions(rand, a, b) {
  return numberOptions(rand, a + b, 11, 18);
}
