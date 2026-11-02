/**
 * Solving a word problem in two steps: first what is missing, then the
 * calculation that finds it, then the one that answers the question. The steps
 * open one by one on the widget and are mixed in the quiz. Pure and DOM-free.
 */
import { rng } from '#lib/core/drill.js';
import { slipOptions } from '../_shared/strip.js';
import {
  answerLine,
  drawStories,
  firstAsk,
  firstAskMid,
  firstCalc,
  firstOptions,
  firstReason,
  needOptions,
  spoken,
  totalAsk,
  totalAskMid,
  totalCalc,
  totalOptions,
} from '../_shared/two-step.js';

/** @typedef {import('../_shared/two-step.js').Story} Story */
/** @typedef {'need' | 'first' | 'total' | 'done'} Stage */

/** Why step 2 adds, in words that also fit a broken line of two segments. */
const JOIN_HINT = 'Bước 2 gộp hai số lại: em làm phép cộng.';

/**
 * What the child answers at a stage.
 * @typedef {object} Step
 * @property {string} ask
 * @property {string[]} options
 * @property {number} answer
 * @property {string[]} [optionLabels]
 * @property {string} slip what a wrong tap is told
 * @property {string} right what the right tap is told
 * @property {Stage} next
 */

/**
 * The step of a stage, or null once the problem is solved.
 * @param {Story} s
 * @param {Stage} stage
 * @returns {Step | null}
 */
export function stepOf(s, stage) {
  if (stage === 'need') {
    return {
      ask: `Muốn biết ${totalAskMid(s)}, em cần tìm gì trước?`,
      ...needOptions(s),
      slip: `Đề bài đã cho biết: ${s.first} ${s.verb} ${s.a} ${s.unit}. Em tìm số còn thiếu.`,
      right: `Đúng rồi! Đề bài chưa cho biết ${firstAskMid(s)}. Em tìm số đó trước.`,
      next: 'first',
    };
  }
  if (stage === 'first') {
    const { options, answer } = firstOptions(s);
    return {
      ask: `Bước 1: ${firstAsk(s)}?`,
      options,
      answer,
      optionLabels: options.map(spoken),
      slip: firstReason(s),
      right: `Đúng rồi! ${firstCalc(s)} = ${s.second}. Em đã biết cả hai số.`,
      next: 'total',
    };
  }
  if (stage === 'total') {
    const { options, answer } = totalOptions(s);
    return {
      ask: `Bước 2: ${totalAsk(s)}?`,
      options,
      answer,
      optionLabels: options.map(spoken),
      slip: JOIN_HINT,
      right: `Đúng rồi! ${totalCalc(s)} = ${s.total}. ${answerLine(s)}`,
      next: 'done',
    };
  }
  return null;
}

/** What each part of a round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  need: 'Tìm gì trước',
  first: 'Phép tính bước 1',
  total: 'Phép tính bước 2',
  answer: 'Giải bài toán',
  diagram: 'Đọc sơ đồ',
});

/**
 * @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Story>} RoundQuestion
 */

/**
 * The solving of a story in one sentence.
 * @param {Story} s
 */
const worked = (s) =>
  `${firstCalc(s)} = ${s.second}. ${totalCalc(s)} = ${s.total}. ${answerLine(s)}`;

/**
 * The options of a full answer: the slip of stopping after step 1 and of mixing
 * the numbers up.
 * @param {Story} s
 */
const answerOptions = (s) => slipOptions(s.total, [s.second, s.a + s.k, s.total + s.a]);

/**
 * A round of eight questions, each on a different problem. Only a diagram
 * question carries a picture.
 * @param {number} seed
 * @returns {RoundQuestion[]}
 */
export function buildRound(seed) {
  const stories = drawStories(rng(seed));
  /** @type {(keyof typeof KIND_LABELS)[]} */
  const kinds = ['need', 'first', 'total', 'answer', 'diagram', 'first', 'answer', 'diagram'];
  return kinds.map((kind, i) => {
    const s = stories[i % stories.length];
    if (kind === 'need') {
      return {
        kind,
        prompt: `${s.text} Em cần tìm gì trước?`,
        ...needOptions(s),
        hint: 'Đề bài đã cho biết số nào? Số nào còn thiếu?',
        solution: `Em tìm trước: ${firstAskMid(s)}.`,
      };
    }
    if (kind === 'first') {
      const { options, answer } = firstOptions(s);
      return {
        kind,
        prompt: `${s.given} ${firstAsk(s)}? Em làm phép tính nào?`,
        options,
        answer,
        optionLabels: options.map(spoken),
        hint: firstReason(s),
        solution: `${firstCalc(s)} = ${s.second} (${s.unit}).`,
      };
    }
    if (kind === 'total') {
      const { options, answer } = totalOptions(s);
      return {
        kind,
        prompt: `${s.first} ${s.verb} ${s.a} ${s.unit}. ${s.other} ${s.verb} ${s.second} ${s.unit}. ${totalAsk(s)}? Em làm phép tính nào?`,
        options,
        answer,
        optionLabels: options.map(spoken),
        hint: JOIN_HINT,
        solution: `${totalCalc(s)} = ${s.total} (${s.unit}).`,
      };
    }
    if (kind === 'diagram') {
      return {
        kind,
        visual: s,
        prompt: `Em nhìn sơ đồ. ${totalAsk(s)}?`,
        ...answerOptions(s),
        hint: `Trước hết em tìm: ${firstAskMid(s)}? Rồi em cộng với ${s.a}.`,
        solution: worked(s),
      };
    }
    return {
      kind,
      prompt: s.text,
      ...answerOptions(s),
      hint: `Bước 1: ${firstAskMid(s)}? Bước 2: cộng hai số lại.`,
      solution: worked(s),
    };
  });
}
