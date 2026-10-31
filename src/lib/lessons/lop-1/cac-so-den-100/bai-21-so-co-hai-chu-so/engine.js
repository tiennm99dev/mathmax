/**
 * The counting-stick board of "Số có hai chữ số": bundles of ten for the
 * tens, loose sticks for the ones, and the step of tying ten loose sticks
 * into one more bundle. The board shows numbers up to 99. Pure and DOM-free.
 */
import { placeText, readNumber } from '../_shared/numbers.js';

/** Largest number on the board. */
export const MAX = 99;

/** @typedef {{ tens: number, ones: number }} Sticks */

/** @param {Sticks} s */
export function valueOf(s) {
  return s.tens * 10 + s.ones;
}

/**
 * The board after one change, or the same board when the change is not
 * allowed: no negative counts, at most 10 loose sticks, at most 99 sticks.
 * @param {Sticks} s
 * @param {'bundle+' | 'bundle-' | 'stick+' | 'stick-' | 'tie'} action
 * @returns {Sticks}
 */
export function apply(s, action) {
  /** @type {Sticks} */
  let next = s;
  if (action === 'bundle+') next = { tens: s.tens + 1, ones: s.ones };
  if (action === 'bundle-') next = { tens: s.tens - 1, ones: s.ones };
  if (action === 'stick+') next = { tens: s.tens, ones: s.ones + 1 };
  if (action === 'stick-') next = { tens: s.tens, ones: s.ones - 1 };
  if (action === 'tie') next = s.ones === 10 ? { tens: s.tens + 1, ones: 0 } : s;
  if (next.tens < 0 || next.ones < 0 || next.ones > 10 || valueOf(next) > MAX) return s;
  return next;
}

/**
 * Whether an action changes the board, to enable its button.
 * @param {Sticks} s
 * @param {'bundle+' | 'bundle-' | 'stick+' | 'stick-' | 'tie'} action
 */
export function can(s, action) {
  const next = apply(s, action);
  return next.tens !== s.tens || next.ones !== s.ones;
}

/**
 * What the board shows, as a child would say it.
 * @param {Sticks} s
 * @returns {string}
 */
export function describe(s) {
  if (s.ones === 10) {
    return `Có 10 que rời rồi! Em bó 10 que thành 1 chục nhé: ${s.tens} chục và 10 que là ${s.tens + 1} chục.`;
  }
  const n = valueOf(s);
  if (n === 0) return 'Chưa có que tính nào. Em thêm bó chục hoặc que rời nhé.';
  if (n < 10) return `Có ${n} que tính. Số ${n} đọc là "${readNumber(n)}".`;
  return `Số ${n} gồm ${placeText(s.tens, s.ones)}, đọc là "${readNumber(n)}".`;
}

/**
 * The next step toward building `target` (10 to 99), or a "done" sentence.
 * @param {Sticks} s
 * @param {number} target
 * @returns {{ done: boolean, text: string }}
 */
export function guide(s, target) {
  const t = Math.floor(target / 10);
  const u = target % 10;
  if (s.ones === 10) return { done: false, text: 'Có 10 que rời. Em bó lại thành 1 chục trước.' };
  if (s.tens === t && s.ones === u) {
    return {
      done: true,
      text: `Đúng rồi! ${placeText(t, u)} là số ${target}, đọc là "${readNumber(target)}".`,
    };
  }
  if (s.tens < t) return { done: false, text: `Số ${target} có ${t} chục. Em thêm bó chục nhé.` };
  if (s.tens > t)
    return { done: false, text: `Số ${target} chỉ có ${t} chục. Em bớt bó chục nhé.` };
  return s.ones < u
    ? { done: false, text: `Đủ ${t} chục rồi. Số ${target} có ${u} đơn vị: em thêm que rời.` }
    : { done: false, text: `Đủ ${t} chục rồi. Số ${target} chỉ có ${u} đơn vị: em bớt que rời.` };
}

/**
 * A new target from 11 to 99 that differs from `previous`.
 * @param {number} previous
 * @param {() => number} [random] Returns a number in [0, 1).
 */
export function nextTarget(previous, random = Math.random) {
  const pool = [];
  for (let n = 11; n <= MAX; n++) if (n !== previous) pool.push(n);
  return pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))];
}
