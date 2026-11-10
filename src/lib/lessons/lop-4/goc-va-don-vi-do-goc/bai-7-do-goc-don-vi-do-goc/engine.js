/**
 * The virtual protractor of the lesson on measuring angles: turning the side
 * OB in steps of 5°, the goal measures to make and how close the child is,
 * and a round of reading questions (a protractor on an angle, the hands of a
 * clock, the unit of angle). Pure and DOM-free.
 */
import { pick, rng, shuffle } from '#lib/core/drill.js';
import { clockQuestion, drawMeasure, readingQuestion } from '../_shared/questions.js';

/** @typedef {import('../_shared/questions.js').Question} Question */

/** The measures the child is asked to make, in turn. */
export const TARGETS = [60, 90, 45, 120, 35, 150, 180, 75];

/**
 * What the child hears and sees while making the goal measure.
 * @param {number} m the measure now
 * @param {number} target the measure asked for
 * @returns {{ done: boolean, text: string }}
 */
export function targetMessage(m, target) {
  if (m === target)
    return { done: true, text: `Đúng rồi! Góc đỉnh O; cạnh OA, OB bằng ${target}°.` };
  if (m < target)
    return {
      done: false,
      text: `Góc đang là ${m}°, bé hơn ${target}°. Em xoay cạnh OB ra xa cạnh OA thêm.`,
    };
  return {
    done: false,
    text: `Góc đang là ${m}°, lớn hơn ${target}°. Em xoay cạnh OB lại gần cạnh OA.`,
  };
}

/** What each part of the reading round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'thuoc-phai': 'Đọc thước khi cạnh OA ở bên phải',
  'thuoc-trai': 'Đọc thước khi cạnh OA ở bên trái',
  'dong-ho': 'Góc tạo bởi hai kim đồng hồ',
  'don-vi': 'Đơn vị đo góc',
});

/**
 * The unit of angle, its sign and the measure of a right angle.
 * @param {() => number} rand
 * @returns {Question}
 */
export function unitQuestion(rand) {
  const form = pick(rand, ['ten', 'ki-hieu', 'goc-vuong']);
  if (form === 'ten')
    return {
      prompt: 'Đơn vị đo góc là gì?',
      options: ['Độ', 'Xăng-ti-mét', 'Ki-lô-gam', 'Giờ'],
      answer: 0,
      hint: 'Xăng-ti-mét đo độ dài, ki-lô-gam đo cân nặng, giờ đo thời gian.',
      solution: 'Đơn vị đo góc là độ, kí hiệu là °.',
      visual: { type: 'none' },
    };
  if (form === 'ki-hieu')
    return {
      prompt: 'Góc có số đo sáu mươi độ. Em viết số đo đó thế nào?',
      options: ['60°', '60 cm', '6°', '600°'],
      answer: 0,
      optionLabels: ['60 độ', '60 xăng-ti-mét', '6 độ', '600 độ'],
      hint: 'Độ có kí hiệu là một vòng tròn nhỏ viết ở trên, bên phải số.',
      solution: 'Sáu mươi độ viết là 60°.',
      visual: { type: 'none' },
    };
  return {
    prompt: 'Góc vuông có số đo bao nhiêu độ?',
    options: ['45°', '90°', '100°', '180°'],
    answer: 1,
    optionLabels: ['45 độ', '90 độ', '100 độ', '180 độ'],
    hint: 'Lúc 3 giờ, hai kim đồng hồ tạo thành một góc vuông.',
    solution: 'Góc vuông có số đo 90°.',
    visual: { type: 'none' },
  };
}

/**
 * A round of six reading questions, shuffled: two readings with the side OA
 * on the right, two with it on the left, a clock and the unit.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const r1 = drawMeasure(rand);
  const r2 = drawMeasure(rand, r1);
  const l1 = drawMeasure(rand);
  const l2 = drawMeasure(rand, l1);
  /** @type {Question[]} */
  const round = [
    { ...readingQuestion(rand, 'phai', r1), kind: 'thuoc-phai' },
    { ...readingQuestion(rand, 'phai', r2), kind: 'thuoc-phai' },
    { ...readingQuestion(rand, 'trai', l1), kind: 'thuoc-trai' },
    { ...readingQuestion(rand, 'trai', l2), kind: 'thuoc-trai' },
    { ...clockQuestion(rand), kind: 'dong-ho' },
    { ...unitQuestion(rand), kind: 'don-vi' },
  ];
  return shuffle(rand, round);
}
