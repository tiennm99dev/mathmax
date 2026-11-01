/**
 * "Bài toán về nhiều hơn, ít hơn một số đơn vị" on a segment diagram (sơ đồ
 * đoạn thẳng): the first child's segment is `a` parts long; the child
 * stretches or shortens the second segment until it is `k` parts longer
 * (nhiều hơn) or shorter (ít hơn), then picks the operation and the answer.
 * Pure and DOM-free.
 */
import { numberOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { PAIRS, compareResult } from '../_shared/compare-stories.js';

/** The longest segment, in parts. */
export const MAX_LEN = 20;

/**
 * Keeps a segment length between 1 and MAX_LEN parts.
 * @param {number} len
 */
export function clampLen(len) {
  return Math.max(1, Math.min(MAX_LEN, Math.round(len)));
}

/**
 * How the second segment compares with the first, in words.
 * @param {number} a
 * @param {number} len
 * @param {string} first
 * @param {string} second
 */
export function compareWords(a, len, first, second) {
  if (len === a) return `Đoạn của ${second} dài bằng đoạn của ${first}.`;
  return len > a
    ? `Đoạn của ${second} dài hơn đoạn của ${first} ${len - a} phần.`
    : `Đoạn của ${second} ngắn hơn đoạn của ${first} ${a - len} phần.`;
}

/**
 * The feedback while drawing: `ok` once the second segment matches the story.
 * @param {import('../_shared/compare-stories.js').CompareStory} s
 * @param {number} len
 * @param {boolean} moved whether the child has changed the segment yet
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function drawMessage(s, len, moved) {
  const { who, name } = PAIRS[s.pair];
  const [first, second] = who;
  const rule = `${second} ${s.kind === 'nhieu' ? 'nhiều hơn' : 'ít hơn'} ${first} ${s.k} ${name}.`;
  if (len === compareResult(s)) {
    return {
      tone: 'ok',
      text: `Đúng rồi! ${compareWords(s.a, len, first, second)} Đề bài: ${rule}`,
    };
  }
  if (!moved) {
    return {
      tone: 'info',
      text: `Đoạn của ${first} dài ${s.a} phần. Em kéo đầu đoạn của ${second} cho ${s.kind === 'nhieu' ? 'dài hơn' : 'ngắn hơn'} ${s.k} phần nhé.`,
    };
  }
  return {
    tone: 'warn',
    text: `${compareWords(s.a, len, first, second)} Đề bài: ${rule} Em ${len < compareResult(s) ? 'kéo dài thêm' : 'rút ngắn lại'} nhé.`,
  };
}

/**
 * The two operations to choose from, the right one marked.
 * @param {import('../_shared/compare-stories.js').CompareStory} s
 */
export function operationOptions(s) {
  return {
    options: [`${s.a} + ${s.k}`, `${s.a} ${MINUS} ${s.k}`],
    answer: s.kind === 'nhieu' ? 0 : 1,
  };
}

/**
 * The answer options of a story.
 * @param {() => number} rand
 * @param {import('../_shared/compare-stories.js').CompareStory} s
 */
export function resultOptions(rand, s) {
  return numberOptions(rand, compareResult(s), 0, MAX_LEN);
}
