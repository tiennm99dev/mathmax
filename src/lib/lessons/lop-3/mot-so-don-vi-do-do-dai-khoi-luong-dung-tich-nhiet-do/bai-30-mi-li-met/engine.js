/**
 * Millimetres on a zoomed ruler: stretching a strip to a given length, and a
 * practice round of conversions, ruler readings and sums in millimetres.
 * Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mmText, RULER_CM, sortedOptions } from '../_shared/measure.js';

/**
 * How long the strip should be; `asCm` gives that length in centimetres.
 * @typedef {{ mm: number, asCm: boolean }} Task
 */

/** The first task of the widget. */
export const FIRST_TASK = /** @type {Task} */ ({ mm: 10, asCm: true });

/**
 * What the child is asked to do.
 * @param {Task} task
 */
export function taskText({ mm, asCm }) {
  return asCm ? `Kéo băng màu dài đúng ${mm / 10} cm` : `Kéo băng màu dài đúng ${mmText(mm)}`;
}

/**
 * The live sentence under the ruler.
 * @param {Task} task
 * @param {number} mm the strip's length now
 */
export function stretchMessage({ mm: target, asCm }, mm) {
  if (mm === target) {
    if (asCm) return `Đúng rồi! ${target / 10} cm = ${mmText(target)}.`;
    return target % 10 === 0
      ? `Đúng rồi! Băng dài ${mmText(target)}, tức là ${target / 10} cm.`
      : `Đúng rồi! Băng dài ${mmText(target)}.`;
  }
  const now = mm === 0 ? 'Băng chưa dài chút nào.' : `Băng dài ${mmText(mm)}.`;
  const goal = asCm ? `${target / 10} cm` : mmText(target);
  return mm < target
    ? `${now} Còn ngắn hơn ${goal}, em kéo dài thêm.`
    : `${now} Dài hơn ${goal} rồi, em kéo ngắn lại.`;
}

/**
 * A new task, different from `not`: a whole number of centimetres, or any
 * length the zoomed ruler can show.
 * @param {() => number} rand
 * @param {Task} [not]
 * @returns {Task}
 */
export function makeTask(rand, not) {
  for (;;) {
    const asCm = rand() < 0.4;
    const mm = asCm ? int(rand, 1, RULER_CM) * 10 : int(rand, 3, RULER_CM * 10);
    if (!not || mm !== not.mm || asCm !== not.asCm) return { mm, asCm };
  }
}

/** What each part of a round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  read: 'Đọc thước',
  toMm: 'Đổi xăng-ti-mét ra mi-li-mét',
  toCm: 'Đổi mi-li-mét ra xăng-ti-mét',
  compare: 'So sánh độ dài',
  calc: 'Tính với mi-li-mét',
  story: 'Bài toán',
});

/** Word problems, each with its working. */
const STORIES = [
  {
    text: 'Con kiến bò được 125 mm, rồi bò thêm 230 mm nữa. Con kiến bò được tất cả bao nhiêu mi-li-mét?',
    right: 355,
    slips: [105, 345, 455],
    work: '125 + 230 = 355 (mm).',
    hint: 'Muốn tìm tất cả, em làm phép cộng.',
  },
  {
    text: 'Sợi dây dài 480 mm. Bạn Hà cắt đi 150 mm. Sợi dây còn lại dài bao nhiêu mi-li-mét?',
    right: 330,
    slips: [630, 320, 430],
    work: '480 − 150 = 330 (mm).',
    hint: 'Cắt đi thì sợi dây ngắn lại. Em làm phép trừ.',
  },
  {
    text: 'Con dế nhảy xa 15 mm. Con châu chấu nhảy xa gấp 4 lần con dế. Con châu chấu nhảy xa bao nhiêu mi-li-mét?',
    right: 60,
    slips: [19, 45, 75],
    work: '15 × 4 = 60 (mm).',
    hint: 'Gấp lên 4 lần thì em làm phép nhân.',
  },
  {
    text: 'Có 3 chiếc kẹp giấy xếp nối nhau, mỗi chiếc dài 28 mm. Cả hàng dài bao nhiêu mi-li-mét?',
    right: 84,
    slips: [31, 64, 94],
    work: '28 × 3 = 84 (mm).',
    hint: '3 chiếc dài bằng nhau: em lấy độ dài một chiếc nhân với 3.',
  },
];

/**
 * How a length is read off the ruler, for the end of a question.
 * @param {number} mm
 */
export function readingText(mm) {
  const cm = Math.floor(mm / 10);
  const rest = mm % 10;
  if (cm === 0) return `Băng đi qua ${rest} khoảng nhỏ, tức là ${mmText(mm)}.`;
  if (rest === 0) return `Băng đến vạch số ${cm}. ${cm} cm = ${mmText(mm)}.`;
  return `Vạch số ${cm} là ${mmText(cm * 10)}, thêm ${rest} khoảng nhỏ nữa là ${mmText(mm)}.`;
}

/**
 * @typedef {import('#lib/core/kid/quiz.js').KidQuestion<{ mm: number }>} RoundQuestion
 */

/**
 * A round of eight questions. Only a ruler reading carries a picture.
 * @param {number} seed
 * @returns {RoundQuestion[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const stories = shuffle(rand, STORIES);
  /** @type {(keyof typeof KIND_LABELS)[]} */
  const kinds = ['read', 'toMm', 'toCm', 'read', 'compare', 'calc', 'story', 'story'];
  let told = 0;
  return kinds.map((kind) => {
    if (kind === 'read') {
      const mm = int(rand, 3, 29);
      return {
        kind,
        visual: { mm },
        prompt: 'Băng màu dài bao nhiêu mi-li-mét?',
        ...sortedOptions(
          mmText,
          mm,
          [mm + 10, mm - 1, mm + 1, mm + 5].filter((v) => v > 0),
        ),
        hint: 'Từ vạch số này đến vạch số kế tiếp có 10 khoảng nhỏ. Mỗi khoảng nhỏ dài 1 mm.',
        solution: readingText(mm),
      };
    }
    if (kind === 'toMm') {
      const cm = int(rand, 2, 9);
      return {
        kind,
        prompt: `${cm} cm bằng bao nhiêu mi-li-mét?`,
        ...sortedOptions(mmText, cm * 10, [cm, cm * 100, cm * 10 + 10]),
        hint: '1 cm = 10 mm.',
        solution: `${cm} cm = ${mmText(cm * 10)}, vì ${cm} × 10 = ${cm * 10}.`,
      };
    }
    if (kind === 'toCm') {
      const cm = int(rand, 2, 9);
      const format = (/** @type {number} */ v) => `${fmt(v)} cm`;
      return {
        kind,
        prompt: `${cm * 10} mm bằng bao nhiêu xăng-ti-mét?`,
        ...sortedOptions(format, cm, [cm * 10, cm * 100, cm + 1]),
        hint: '10 mm = 1 cm. Em đếm xem có mấy chục mi-li-mét.',
        solution: `${cm * 10} mm = ${cm} cm, vì ${cm * 10} : 10 = ${cm}.`,
      };
    }
    if (kind === 'compare') {
      const cm = int(rand, 2, 8);
      const mm = cm * 10 + pick(rand, [-5, 5]);
      const longer = mm > cm * 10 ? mmText(mm) : `${cm} cm`;
      const options = [`${cm} cm`, mmText(mm)];
      return {
        kind,
        prompt: 'Độ dài nào dài hơn?',
        options,
        answer: options.indexOf(longer),
        hint: 'Em đổi xăng-ti-mét ra mi-li-mét rồi so sánh.',
        solution: `${cm} cm = ${mmText(cm * 10)}. Vậy ${longer} dài hơn.`,
      };
    }
    if (kind === 'calc') {
      const a = int(rand, 2, 8) * 10 + 5;
      const b = int(rand, 1, 4) * 10;
      const add = rand() < 0.5;
      const right = add ? a + b : Math.abs(a - b);
      const [x, y] = add ? [a, b] : [Math.max(a, b), Math.min(a, b)];
      return {
        kind,
        prompt: `${mmText(x)} ${add ? '+' : '−'} ${mmText(y)} = ?`,
        ...sortedOptions(mmText, right, [right + 10, Math.abs(right - 10), add ? x - y : x + y]),
        hint: 'Em tính như với số, rồi viết thêm mm ở kết quả.',
        solution: `${x} ${add ? '+' : '−'} ${y} = ${right}. Vậy kết quả là ${mmText(right)}.`,
      };
    }
    const s = stories[told++ % stories.length];
    return {
      kind,
      prompt: s.text,
      ...sortedOptions(mmText, s.right, s.slips),
      hint: s.hint,
      solution: s.work,
    };
  });
}
