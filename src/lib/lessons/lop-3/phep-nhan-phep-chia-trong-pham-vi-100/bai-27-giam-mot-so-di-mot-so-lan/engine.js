/**
 * Dividing a number down by a number of times: a strip cut into that many equal
 * pieces, of which one stays, against the slip of taking away that many units.
 * Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { slipOptions } from '../_shared/strip.js';

/** @typedef {{ n: number, times: number }} Task */

/** The first task of the widget. */
export const FIRST_TASK = /** @type {Task} */ ({ n: 18, times: 3 });

/** Most pieces the strip may be cut into. */
export const MAX_PARTS = 9;

/**
 * The size of one piece, as a whole number when the cut comes out even.
 * @param {number} n
 * @param {number} parts
 */
export const pieceText = (n, parts) => (n % parts === 0 ? String(n / parts) : '');

/**
 * The live sentence.
 * @param {Task} task
 * @param {number} parts
 */
export function cutMessage({ n, times }, parts) {
  const result = n / times;
  if (parts === times) {
    return `Đúng rồi! Cắt thành ${times} phần bằng nhau, giữ lại 1 phần. ${n} giảm đi ${times} lần được ${result}. Em tính: ${n} : ${times} = ${result}.`;
  }
  if (parts === 1)
    return `Băng còn nguyên. Giảm đi ${times} lần thì cắt thành ${times} phần bằng nhau.`;
  return parts < times
    ? `Băng có ${parts} phần. Em cần ${times} phần bằng nhau: cắt thêm đi.`
    : `Băng có ${parts} phần, nhiều quá. Em cần ${times} phần bằng nhau thôi.`;
}

/**
 * A new task that divides evenly, different from `not`.
 * @param {() => number} rand
 * @param {Task} [not]
 * @returns {Task}
 */
export function makeTask(rand, not) {
  for (;;) {
    const times = int(rand, 2, 6);
    const n = times * int(rand, 3, 15);
    if (!not || n !== not.n || times !== not.times) return { n, times };
  }
}

/** Word problems: `n` divided down `times` times, counted in `unit`. */
const STORIES = [
  {
    n: 42,
    times: 3,
    unit: 'nhãn vở',
    text: 'Nam có 42 nhãn vở. Sau khi cho bạn, số nhãn vở giảm đi 3 lần. Nam còn bao nhiêu nhãn vở?',
  },
  {
    n: 28,
    times: 4,
    unit: 'cái bút',
    text: 'Mai có 28 cái bút màu. Sau khoá học, số bút giảm đi 4 lần. Mai còn bao nhiêu cái bút màu?',
  },
  {
    n: 60,
    times: 5,
    unit: 'quả',
    text: 'Cửa hàng có 60 quả dưa. Sau khi bán, số dưa giảm đi 5 lần. Cửa hàng còn bao nhiêu quả dưa?',
  },
  {
    n: 36,
    times: 2,
    unit: 'con',
    text: 'Bể có 36 con cá. Sau khi chuyển bớt, số cá giảm đi 2 lần. Bể còn bao nhiêu con cá?',
  },
  {
    n: 48,
    times: 6,
    unit: 'l',
    text: 'Thùng có 48 l nước. Sau khi dùng, số nước giảm đi 6 lần. Thùng còn bao nhiêu lít nước?',
  },
];

/** What each part of a round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  giam: 'Giảm một số đi một số lần',
  bot: 'Bớt đi một số đơn vị',
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
  /** @type {(keyof typeof KIND_LABELS)[]} */
  const kinds = ['giam', 'bot', 'pick', 'strip', 'story', 'giam', 'bot', 'story'];
  return kinds.map((kind, i) => {
    const times = int(rand, 2, 6);
    const q = int(rand, 3, 15);
    const n = times * q;
    const less = n - times;
    if (kind === 'giam') {
      return {
        kind,
        prompt: `${n} giảm đi ${times} lần được mấy?`,
        ...slipOptions(q, [less, q + times, n * times]),
        hint: `Giảm đi ${times} lần thì em làm phép chia.`,
        solution: `${n} : ${times} = ${q}.`,
      };
    }
    if (kind === 'bot') {
      return {
        kind,
        prompt: `${n} bớt đi ${times} đơn vị được mấy?`,
        ...slipOptions(less, [q, less - 1, n]),
        hint: `Bớt đi ${times} đơn vị thì em làm phép trừ.`,
        solution: `${n} − ${times} = ${less}.`,
      };
    }
    if (kind === 'pick') {
      const wanted = pick(rand, ['giam', 'bot']);
      const right = wanted === 'giam' ? `${n} : ${times}` : `${n} − ${times}`;
      const wrong = wanted === 'giam' ? `${n} − ${times}` : `${n} : ${times}`;
      const options = [wrong, right].sort();
      return {
        kind,
        prompt:
          wanted === 'giam'
            ? `Giảm ${n} đi ${times} lần. Em làm phép tính nào?`
            : `Bớt ${n} đi ${times} đơn vị. Em làm phép tính nào?`,
        options,
        answer: options.indexOf(right),
        optionLabels: options.map((o) => o.replace(':', 'chia').replace('−', 'trừ')),
        hint: 'Giảm đi một số lần là chia. Bớt đi một số đơn vị là trừ.',
        solution: wanted === 'giam' ? `Em tính ${right} = ${q}.` : `Em tính ${right} = ${less}.`,
      };
    }
    if (kind === 'strip') {
      return {
        kind,
        visual: { n, times },
        prompt: `Băng giấy dài ${n} cm. Độ dài băng giảm đi ${times} lần. Băng còn dài bao nhiêu xăng-ti-mét?`,
        ...slipOptions(q, [less, q + times, n * times]),
        hint: `Băng được cắt thành ${times} phần bằng nhau, giữ lại 1 phần.`,
        solution: `${n} : ${times} = ${q} (cm).`,
      };
    }
    const story = stories[i % stories.length];
    const right = story.n / story.times;
    return {
      kind,
      prompt: story.text,
      ...slipOptions(right, [story.n - story.times, right + story.times, story.n * story.times]),
      hint: `Lấy ${story.n} giảm đi ${story.times} lần.`,
      solution: `${story.n} : ${story.times} = ${right} (${story.unit}).`,
    };
  });
}
