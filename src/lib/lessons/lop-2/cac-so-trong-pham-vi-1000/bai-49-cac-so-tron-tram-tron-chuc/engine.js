/**
 * The zoomable number line of "Các số tròn trăm, tròn chục": the whole line
 * from 0 to 1000 shows the round hundreds; zooming into one hundred shows its
 * round tens. Pure and DOM-free.
 */
import { readTo1000 } from '#lib/core/kid/place-value.js';

/** @typedef {{ start: number | null, value: number }} View `start` is the zoomed hundred, or null for the whole line. */

/** The numbers the child is asked to find, in order. */
export const TARGETS = /** @type {const} */ ([300, 700, 420, 850, 190, 1000, 560]);

/** The whole line. */
export const WHOLE = /** @type {View} */ ({ start: null, value: 100 });

/**
 * What the line shows for a view.
 * @param {View} view
 * @returns {{ min: number, max: number, step: number }}
 */
export function lineOf(view) {
  if (view.start === null) return { min: 0, max: 1000, step: 100 };
  return { min: view.start, max: view.start + 100, step: 10 };
}

/**
 * Zooms into the hundred that starts at the marker; 1000 opens the last one.
 * @param {View} view
 * @returns {View}
 */
export function zoomIn(view) {
  if (view.start !== null) return view;
  return { start: Math.min(900, Math.floor(view.value / 100) * 100), value: view.value };
}

/**
 * Back to the whole line; the marker falls back to the round hundred before it.
 * @param {View} view
 * @returns {View}
 */
export function zoomOut(view) {
  return { start: null, value: Math.floor(view.value / 100) * 100 };
}

/**
 * Moves the marker one mark along the line, staying on the line.
 * @param {View} view
 * @param {1 | -1} direction
 * @returns {View}
 */
export function hop(view, direction) {
  const { min, max, step } = lineOf(view);
  return { ...view, value: Math.max(min, Math.min(max, view.value + direction * step)) };
}

/**
 * Which round number a number is.
 * @param {number} n
 * @returns {'tram' | 'chuc' | 'khac'}
 */
export function roundKind(n) {
  if (n % 100 === 0) return 'tram';
  return n % 10 === 0 ? 'chuc' : 'khac';
}

/**
 * Why a found number is round.
 * @param {number} n
 */
export function foundText(n) {
  const words = `${n} đọc là ${readTo1000(n)}`;
  return roundKind(n) === 'tram'
    ? `Đúng rồi! ${words}. Đây là số tròn trăm: hai chữ số cuối đều là 0.`
    : `Đúng rồi! ${words}. Đây là số tròn chục: chữ số cuối là 0.`;
}

/**
 * The live line that leads the child to the target.
 * @param {View} view
 * @param {number} target
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function targetNote(view, target) {
  if (view.value === target) return { tone: 'ok', text: foundText(target) };
  const { min, max } = lineOf(view);
  if (view.start === null && roundKind(target) !== 'tram') {
    const below = Math.floor(target / 100) * 100;
    return {
      tone: 'info',
      text: `${target} nằm giữa ${below} và ${below + 100}. Em đưa điểm đến ${below} rồi chạm "Phóng to".`,
    };
  }
  if (target < min || target > max) {
    return { tone: 'info', text: `Đoạn này không có số ${target}. Em chạm "Thu nhỏ" nhé.` };
  }
  return {
    tone: 'info',
    text: `${view.value} ${view.value < target ? 'bé hơn' : 'lớn hơn'} ${target}. Em đi tiếp sang ${view.value < target ? 'phải' : 'trái'}.`,
  };
}
