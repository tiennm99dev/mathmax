/**
 * Measuring a building's height with a clinometer (giác kế): the observer
 * stands `d` metres from the foot of the building, the clinometer's eye is
 * `eye` metres above the ground, and the sight line to the top makes the
 * angle α with the horizontal. Then the height is eye + d·tan α. Pure logic.
 */

import { formatNumber } from '#lib/core/number-format.js';

/** @param {number} deg */
export const tanDeg = (deg) => Math.tan((deg * Math.PI) / 180);

/**
 * Height of the building measured from distance `d` and sight angle `alpha`.
 * @param {number} d metres
 * @param {number} alpha degrees
 * @param {number} eye metres
 */
export function heightFrom(d, alpha, eye) {
  return eye + d * tanDeg(alpha);
}

/**
 * The sight angle that aims exactly at the top of a building `height` m tall.
 * @param {number} height
 * @param {number} d
 * @param {number} eye
 */
export function trueAngle(height, d, eye) {
  return (Math.atan2(height - eye, d) * 180) / Math.PI;
}

/** Largest gap, in degrees, still counted as aiming at the top. */
export const AIM_TOLERANCE = 0.3;

/**
 * Whether the sight line passes above the top, below it, or hits it.
 * @param {number} alpha
 * @param {number} height
 * @param {number} d
 * @param {number} eye
 * @returns {'high' | 'low' | 'hit'}
 */
export function aimStatus(alpha, height, d, eye) {
  const gap = alpha - trueAngle(height, d, eye);
  if (Math.abs(gap) <= AIM_TOLERANCE) return 'hit';
  return gap > 0 ? 'high' : 'low';
}

/**
 * Whether a typed height matches eye + d·tan α, allowing for rounding to
 * tenths.
 * @param {number | null} typed
 * @param {number} d
 * @param {number} alpha
 * @param {number} eye
 */
export function heightOk(typed, d, alpha, eye) {
  return typed !== null && Math.abs(typed - heightFrom(d, alpha, eye)) <= 0.15;
}

/**
 * A length in metres rounded to tenths, with a decimal comma: '23,4'.
 * @param {number} value
 */
export function metres(value) {
  return formatNumber(Math.round(value * 10) / 10, 1);
}

/**
 * The live sentence about the sight line.
 * @param {'high' | 'low' | 'hit'} status
 */
export function aimSentence(status) {
  if (status === 'hit')
    return 'Tia ngắm đi qua đúng đỉnh toà nhà. Ghi lại góc α và khoảng cách d rồi tính chiều cao.';
  if (status === 'high') return 'Tia ngắm đi phía trên đỉnh toà nhà: hãy giảm góc α.';
  return 'Tia ngắm cắt mặt toà nhà, thấp hơn đỉnh: hãy tăng góc α.';
}
