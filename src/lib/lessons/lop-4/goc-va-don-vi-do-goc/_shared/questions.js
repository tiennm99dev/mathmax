/**
 * Kid questions shared by the lessons of this chapter: reading a protractor
 * laid on an angle and the angle between the hands of a clock. Pure and
 * DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { angleName, clockAngle, degreeOptions, NAME_SETS } from './angle.js';
import { protractorFigure } from './figure.js';

/** @typedef {import('./angle.js').Side} Side */
/**
 * What a question shows above its options.
 * @typedef {{ type: 'figure', figure: import('./figure.js').Figure }
 *   | { type: 'clock', minutes: number }
 *   | { type: 'none' }} Visual
 * @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question
 */

/**
 * A measure to read, from 15° to 165° in steps of 5°, other than `avoid`.
 * @param {() => number} rand
 * @param {number} [avoid]
 */
export function drawMeasure(rand, avoid) {
  let m = int(rand, 3, 33) * 5;
  while (m === avoid) m = int(rand, 3, 33) * 5;
  return m;
}

/**
 * Reading a protractor laid on an angle of measure `m`.
 * @param {() => number} rand
 * @param {Side} side
 * @param {number} m
 * @returns {Question}
 */
export function readingQuestion(rand, side, m) {
  const names = pick(rand, NAME_SETS);
  const [o, p, q] = names;
  const where = side === 'phai' ? 'bên phải' : 'bên trái';
  const ring = side === 'phai' ? 'trong' : 'ngoài';
  return {
    prompt: `Thước đo góc đặt lên ${angleName(o, p, q)}. Góc này có số đo bao nhiêu độ?`,
    ...degreeOptions(m),
    hint: `Cạnh ${o}${p} nằm ở ${where}. Em tìm vạch 0 nằm trên cạnh ${o}${p}: đó là vạch 0 của vòng số ${ring}. Em đọc số trên vòng số ${ring}.`,
    solution: `Vạch 0 của vòng số ${ring} nằm trên cạnh ${o}${p}. Cạnh ${o}${q} đi qua vạch ${m} của vòng số đó. Vậy ${angleName(o, p, q)} bằng ${m}°.`,
    visual: { type: 'figure', figure: protractorFigure(m, side, names) },
  };
}

/**
 * The angle between the hands of a clock at a whole hour from 1 to 6.
 * @param {() => number} rand
 * @returns {Question}
 */
export function clockQuestion(rand) {
  const h = int(rand, 1, 6);
  const m = clockAngle(h);
  return {
    prompt: `Đồng hồ chỉ ${h} giờ. Hai kim đồng hồ tạo thành góc có số đo bao nhiêu độ?`,
    ...degreeOptions(m, [30, -30, 60, -60, 90, -90]),
    hint: 'Kim phút chỉ số 12. Em đếm số khoảng từ số 12 đến số mà kim giờ chỉ. Mỗi khoảng giữa hai số liền nhau là 30°.',
    solution: `Kim phút chỉ số 12, kim giờ chỉ số ${h}. Giữa hai kim có ${h} khoảng, mỗi khoảng 30°. Vậy góc bằng ${m}°.`,
    visual: { type: 'clock', minutes: h * 60 },
  };
}
