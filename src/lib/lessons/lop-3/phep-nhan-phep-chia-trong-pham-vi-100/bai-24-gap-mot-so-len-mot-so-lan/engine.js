/**
 * Multiplying a number up by a number of times: the strip copied that many
 * times, against the slip of adding that many units instead. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { slipOptions } from '../_shared/strip.js';

/** @typedef {{ n: number, times: number }} Task */

/** The first task of the widget. */
export const FIRST_TASK = /** @type {Task} */ ({ n: 6, times: 3 });

/**
 * Longest row the strip of a task ever draws, so its pieces stay one size.
 * @param {Task} task
 */
export const stripScale = ({ n, times }) => n * (times + 2);

/**
 * Most copies the child may lay down: two past the target, to see the overshoot.
 * @param {Task} task
 */
export const maxCopies = ({ times }) => times + 2;

/**
 * The strip written as an addition: "6 + 6 + 6 = 18".
 * @param {number} n
 * @param {number} copies
 */
export function sumText(n, copies) {
  if (copies === 1) return String(n);
  return `${Array.from({ length: copies }, () => n).join(' + ')} = ${n * copies}`;
}

/**
 * The live sentence.
 * @param {Task} task
 * @param {number} copies
 */
export function copyMessage({ n, times }, copies) {
  const result = n * times;
  if (copies === times) {
    return `Đúng rồi! ${n} gấp lên ${times} lần được ${result}. Em tính: ${n} × ${times} = ${result}.`;
  }
  if (copies > times) return `Nhiều quá. Đây là ${copies} băng. Em chỉ cần ${times} băng thôi.`;
  return `Đây là ${copies} băng. Gấp lên ${times} lần thì cần ${times} băng như thế.`;
}

/**
 * A new task, different from `not`, with a result within 90.
 * @param {() => number} rand
 * @param {Task} [not]
 * @returns {Task}
 */
export function makeTask(rand, not) {
  for (;;) {
    const task = { n: int(rand, 2, 15), times: int(rand, 2, 6) };
    if (!not || task.n !== not.n || task.times !== not.times) return task;
  }
}

/** Word problems: `n` multiplied up `times` times, counted in `unit`. */
const STORIES = [
  {
    n: 9,
    times: 4,
    unit: 'tuổi',
    text: 'Con 9 tuổi. Tuổi bố gấp 4 lần tuổi con. Bố bao nhiêu tuổi?',
  },
  {
    n: 5,
    times: 3,
    unit: 'quả',
    text: 'Mai có 5 quả táo. Số táo của Hương gấp 3 lần số táo của Mai. Hương có mấy quả táo?',
  },
  {
    n: 12,
    times: 3,
    unit: 'l',
    text: 'Thùng bé có 12 l nước. Thùng to có số nước gấp 3 lần thùng bé. Thùng to có bao nhiêu lít nước?',
  },
  {
    n: 14,
    times: 2,
    unit: 'nhãn vở',
    text: 'An có 14 nhãn vở. Số nhãn vở của Bình gấp 2 lần của An. Bình có bao nhiêu nhãn vở?',
  },
  {
    n: 16,
    times: 5,
    unit: 'cây',
    text: 'Lớp 3A trồng 16 cây. Số cây lớp 3B trồng gấp 5 lần lớp 3A. Lớp 3B trồng bao nhiêu cây?',
  },
];

/** What each part of a round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  gap: 'Gấp một số lên một số lần',
  them: 'Thêm một số đơn vị',
  pick: 'Chọn phép tính',
  strip: 'Đọc băng giấy',
  story: 'Bài toán',
});

/**
 * @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Task>} RoundQuestion
 */

/**
 * A round of eight questions. Only a strip question carries a picture.
 * @param {number} seed
 * @returns {RoundQuestion[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const stories = shuffle(rand, STORIES);
  /** A number and a count whose product and sum differ, so the slip is a real choice. */
  const draw = () => ({ n: int(rand, 3, 15), times: int(rand, 2, 6) });
  /** @type {(keyof typeof KIND_LABELS)[]} */
  const kinds = ['gap', 'them', 'pick', 'strip', 'story', 'gap', 'them', 'story'];
  return kinds.map((kind, i) => {
    const { n, times } = draw();
    const product = n * times;
    const sum = n + times;
    if (kind === 'gap') {
      return {
        kind,
        prompt: `${n} gấp lên ${times} lần được mấy?`,
        ...slipOptions(product, [sum, product + n, product - n]),
        hint: `Gấp lên ${times} lần thì em làm phép nhân.`,
        solution: `${n} × ${times} = ${product}.`,
      };
    }
    if (kind === 'them') {
      return {
        kind,
        prompt: `${n} thêm ${times} đơn vị được mấy?`,
        ...slipOptions(sum, [product, sum - 1, n]),
        hint: `Thêm ${times} đơn vị thì em làm phép cộng.`,
        solution: `${n} + ${times} = ${sum}.`,
      };
    }
    if (kind === 'pick') {
      const wanted = pick(rand, ['gap', 'them']);
      const right = wanted === 'gap' ? `${n} × ${times}` : `${n} + ${times}`;
      const wrong = wanted === 'gap' ? `${n} + ${times}` : `${n} × ${times}`;
      return {
        kind,
        prompt:
          wanted === 'gap'
            ? `Gấp ${n} lên ${times} lần. Em làm phép tính nào?`
            : `Thêm ${times} đơn vị vào ${n}. Em làm phép tính nào?`,
        options: [wrong, right].sort(),
        answer: [wrong, right].sort().indexOf(right),
        optionLabels: [wrong, right].sort().map((o) => o.replace('×', 'nhân').replace('+', 'cộng')),
        hint: 'Gấp lên một số lần là nhân. Thêm một số đơn vị là cộng.',
        solution:
          wanted === 'gap' ? `Em tính ${right} = ${product}.` : `Em tính ${right} = ${sum}.`,
      };
    }
    if (kind === 'strip') {
      return {
        kind,
        visual: { n, times },
        prompt: `Băng trên dài ${n} cm. Băng dưới dài gấp ${times} lần băng trên. Băng dưới dài bao nhiêu xăng-ti-mét?`,
        ...slipOptions(product, [sum, product + n, product - n]),
        hint: `Băng dưới gồm ${times} băng như băng trên.`,
        solution: `${n} × ${times} = ${product} (cm).`,
      };
    }
    const story = stories[i % stories.length];
    const right = story.n * story.times;
    return {
      kind,
      prompt: story.text,
      ...slipOptions(right, [story.n + story.times, right + story.n, right - story.n]),
      hint: `Lấy ${story.n} gấp lên ${story.times} lần.`,
      solution: `${story.n} × ${story.times} = ${right} (${story.unit}).`,
    };
  });
}
