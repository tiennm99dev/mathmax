/**
 * Review questions on counting data and on what can happen: counting shapes,
 * reading and writing tally marks, picture charts, the most and the fewest, and
 * the words "chắc chắn, có thể, không thể" for balls in a box and number cards.
 * Pure and DOM-free; each skill is a `KidSkill` for `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { capitalize, mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { pictures } from '#lib/core/kid/pictures/index.js';
import { FIGURE_NAMES } from '#lib/core/kid/shapes.js';
import { BALL_COLORS, COLOR_IDS, WORDS, waysToTake, wordOf } from './chance.js';
import { nearOptions } from './options.js';
import { tallyWords } from './survey.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./chance.js').BallColor} BallColor */
/** @typedef {import('./chance.js').ChanceWord} ChanceWord */

const SHAPE_KINDS = /** @type {const} */ (['vuong', 'tron', 'tam-giac']);

/**
 * Three different counts from `lo` to `hi`.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 * @returns {[number, number, number]}
 */
function threeCounts(rand, lo, hi) {
  for (;;) {
    const c = /** @type {[number, number, number]} */ ([
      int(rand, lo, hi),
      int(rand, lo, hi),
      int(rand, lo, hi),
    ]);
    if (new Set(c).size === 3) return c;
  }
}

/** @type {ReviewSkill} */
export const countShapesSkill = {
  id: 'dem-hinh',
  label: 'Đếm hình theo từng loại',
  make(rand) {
    const counts = threeCounts(rand, 2, 7);
    const kinds = shuffle(
      rand,
      SHAPE_KINDS.flatMap((kind, i) => Array.from({ length: counts[i] }, () => kind)),
    );
    const visual = /** @type {const} */ ({ type: 'scatter', kinds });
    if (rand() < 0.7) {
      const at = int(rand, 0, 2);
      const name = FIGURE_NAMES[SHAPE_KINDS[at]];
      return {
        prompt: `Có mấy ${name}?`,
        visual,
        ...numberOptions(rand, counts[at], 1, 12),
        hint: `Em chỉ đếm ${name}, đếm đến đâu nhớ đến đó.`,
        solution: `Có ${counts[at]} ${name}.`,
      };
    }
    const most = rand() < 0.5;
    const best = most ? Math.max(...counts) : Math.min(...counts);
    const at = counts.indexOf(best);
    return {
      prompt: `Loại hình nào có ${most ? 'nhiều' : 'ít'} nhất?`,
      visual,
      options: SHAPE_KINDS.map((k) => capitalize(FIGURE_NAMES[k])),
      answer: at,
      hint: 'Em đếm từng loại hình, rồi so sánh ba số.',
      solution: SHAPE_KINDS.map((k, i) => `${counts[i]} ${FIGURE_NAMES[k]}`).join(', ') + '.',
    };
  },
};

/**
 * Things to count, each with its noun inside a sentence and its row label.
 * @type {ReadonlyArray<ReadonlyArray<{ noun: string, label: string }>>}
 */
const TALLY_THEMES = [
  [
    { noun: 'quả cam', label: 'Cam' },
    { noun: 'quả táo', label: 'Táo' },
    { noun: 'quả xoài', label: 'Xoài' },
  ],
  [
    { noun: 'con gà', label: 'Gà' },
    { noun: 'con vịt', label: 'Vịt' },
    { noun: 'con ngan', label: 'Ngan' },
  ],
  [
    { noun: 'chiếc xe đạp', label: 'Xe đạp' },
    { noun: 'chiếc xe máy', label: 'Xe máy' },
    { noun: 'chiếc ô tô', label: 'Ô tô' },
  ],
];

/** @type {ReviewSkill} */
export const readTallySkill = {
  id: 'doc-vach',
  label: 'Đọc vạch kiểm đếm',
  make(rand) {
    const theme = pick(rand, TALLY_THEMES);
    const counts = threeCounts(rand, 4, 19);
    const at = int(rand, 0, 2);
    const n = counts[at];
    return {
      prompt: `Có bao nhiêu ${theme[at].noun}?`,
      visual: {
        type: 'tally',
        rows: theme.map((t, i) => ({ label: t.label, count: counts[i] })),
      },
      ...nearOptions(
        rand,
        n,
        [n + 5, n - 5, n + 1, n - 1].filter((v) => v > 0),
        30,
      ),
      hint: 'Mỗi bó có 5 vạch. Em đếm thêm 5 cho mỗi bó, rồi đếm các vạch lẻ.',
      solution: `Hàng ${theme[at].label} có ${tallyWords(n)}, tức là ${n} ${theme[at].noun}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const writeTallySkill = {
  id: 'ghi-vach',
  label: 'Ghi vạch kiểm đếm',
  make(rand) {
    const n = int(rand, 6, 24);
    const { noun } = pick(rand, pick(rand, TALLY_THEMES));
    return {
      prompt: `Có ${n} ${noun}. Em ghi vạch kiểm đếm thế nào?`,
      ...mixOptions(
        rand,
        capitalize(tallyWords(n)),
        [n + 5, n - 5, n + 1, n - 1, n + 2]
          .filter((v) => v > 0 && v <= 29)
          .slice(0, 3)
          .map((v) => capitalize(tallyWords(v))),
      ),
      hint: 'Cứ 5 vạch em bó lại một bó. Em xem số đó có mấy lần 5, còn thừa mấy.',
      solution: `${n} gồm ${tallyWords(n)}.`,
    };
  },
};

/**
 * Things for a picture chart, one picture per thing.
 * @type {ReadonlyArray<readonly import('#lib/core/kid/pictures/index.js').PictureName[]>}
 */
const CHART_THEMES = [
  ['apple', 'banana', 'orange'],
  ['fish', 'cat', 'rabbit'],
  ['star', 'flower', 'balloon'],
  ['pencil', 'ball', 'cube'],
];

/**
 * A picture chart with three different counts.
 * @param {() => number} rand
 */
function makeChart(rand) {
  const theme = pick(rand, CHART_THEMES);
  const counts = threeCounts(rand, 2, 10);
  const nouns = theme.map((p) => pictures[p]);
  /** @type {import('./visual.js').Visual} */
  const visual = {
    type: 'chart',
    title: 'Biểu đồ tranh',
    rows: theme.map((picture, i) => ({
      label: capitalize(nouns[i]),
      count: counts[i],
      picture,
    })),
  };
  return { visual, counts, nouns };
}

/** @type {ReviewSkill} */
export const readChartSkill = {
  id: 'bieu-do',
  label: 'Đọc biểu đồ tranh',
  make(rand) {
    const { visual, counts, nouns } = makeChart(rand);
    if (rand() < 0.5) {
      const at = int(rand, 0, 2);
      return {
        prompt: `Có bao nhiêu ${nouns[at]}?`,
        visual,
        ...numberOptions(rand, counts[at], 1, 12),
        hint: `Em đếm các hình ở hàng ${nouns[at]}.`,
        solution: `Hàng ${nouns[at]} có ${counts[at]} hình, nên có ${counts[at]} ${nouns[at]}.`,
      };
    }
    const most = rand() < 0.5;
    const best = most ? Math.max(...counts) : Math.min(...counts);
    const at = counts.indexOf(best);
    return {
      prompt: `Hàng nào có ${most ? 'nhiều' : 'ít'} hình nhất?`,
      visual,
      options: nouns.map(capitalize),
      answer: at,
      hint: 'Các hình thẳng cột. Em xem hàng nào dài nhất, hàng nào ngắn nhất.',
      solution: `${capitalize(nouns[at])}: ${best} hình, ${most ? 'nhiều' : 'ít'} nhất.`,
    };
  },
};

/** @type {ReviewSkill} */
export const chartSumSkill = {
  id: 'hon-kem',
  label: 'Hơn, kém và tổng trên biểu đồ',
  make(rand) {
    const { visual, counts, nouns } = makeChart(rand);
    if (rand() < 0.5) {
      const total = counts[0] + counts[1] + counts[2];
      return {
        prompt: 'Biểu đồ có tất cả bao nhiêu hình?',
        visual,
        ...nearOptions(rand, total, [total + 1, total - 1, total + 2], 40),
        hint: 'Em đếm từng hàng, rồi cộng ba số lại.',
        solution: `${counts[0]} + ${counts[1]} + ${counts[2]} = ${total}.`,
      };
    }
    const [i, j] = shuffle(rand, [0, 1, 2]);
    const [more, less] = counts[i] > counts[j] ? [i, j] : [j, i];
    const diff = counts[more] - counts[less];
    return {
      prompt: `Số ${nouns[more]} nhiều hơn số ${nouns[less]} bao nhiêu ${nouns[more].split(' ')[0]}?`,
      visual,
      ...numberOptions(rand, diff, 1, 12),
      hint: 'Em đếm hai hàng đó, rồi lấy số lớn trừ số bé.',
      solution: `${counts[more]} − ${counts[less]} = ${diff}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const mostFewestSkill = {
  id: 'nhieu-it',
  label: 'Nhiều nhất, ít nhất',
  make(rand) {
    const counts = threeCounts(rand, 20, 60);
    const theme = pick(rand, TALLY_THEMES);
    const most = rand() < 0.5;
    const best = most ? Math.max(...counts) : Math.min(...counts);
    const at = counts.indexOf(best);
    return {
      prompt: `Loại nào có số lượng ${most ? 'nhiều' : 'ít'} nhất?`,
      visual: {
        type: 'table',
        head: ['Loại', 'Số lượng'],
        rows: theme.map((t, i) => [t.label, counts[i]]),
      },
      options: theme.map((t) => t.label),
      answer: at,
      hint: `Em so sánh ba số và tìm số ${most ? 'lớn' : 'bé'} nhất.`,
      solution: `${best} là số ${most ? 'lớn' : 'bé'} nhất, nên ${theme[at].label} có số lượng ${most ? 'nhiều' : 'ít'} nhất.`,
    };
  },
};

/**
 * A box of two to six balls, of one colour or two.
 * @param {() => number} rand
 * @param {number} [least] fewest balls
 * @returns {BallColor[]}
 */
export function makeBox(rand, least = 2) {
  const [a, b] = shuffle(rand, COLOR_IDS);
  const na = int(rand, 1, 4);
  const nb = rand() < 0.25 ? 0 : int(rand, 1, 3);
  const balls = [
    ...Array.from({ length: Math.max(na, least - nb) }, () => a),
    ...Array.from({ length: nb }, () => b),
  ];
  return shuffle(rand, balls);
}

/**
 * Why taking one ball gives a colour or not.
 * @param {readonly BallColor[]} balls
 * @param {BallColor} color
 */
function whyOne(balls, color) {
  const name = BALL_COLORS[color].name;
  const n = balls.filter((b) => b === color).length;
  if (n === 0) return `Trong hộp không có bóng ${name}, nên không thể lấy được.`;
  if (n === balls.length) return `Trong hộp toàn bóng ${name}, nên chắc chắn lấy được.`;
  return `Trong hộp có bóng ${name} và cả bóng màu khác, nên có thể lấy được, cũng có thể không.`;
}

/**
 * Why two balls taken are both of a colour or not.
 * @param {readonly BallColor[]} balls
 * @param {BallColor} color
 */
function whyBoth(balls, color) {
  const name = BALL_COLORS[color].name;
  const n = balls.filter((b) => b === color).length;
  if (n < 2) return `Trong hộp không có đủ 2 bóng ${name}, nên không thể.`;
  if (n === balls.length) return `Trong hộp toàn bóng ${name}, nên chắc chắn.`;
  return `Hộp có đủ 2 bóng ${name} nhưng còn bóng màu khác, nên có thể, cũng có thể không.`;
}

/**
 * Why two balls taken include a colour or not.
 * @param {readonly BallColor[]} balls
 * @param {BallColor} color
 */
function whyHas(balls, color) {
  const name = BALL_COLORS[color].name;
  const n = balls.filter((b) => b === color).length;
  const others = balls.length - n;
  if (n === 0) return `Trong hộp không có bóng ${name}, nên không thể.`;
  if (others < 2)
    return `Chỉ có ${others} bóng khác màu ${name}, nên 2 quả lấy ra luôn có bóng ${name}. Chắc chắn.`;
  return `Hai quả lấy ra có thể đều khác màu ${name}, cũng có thể có bóng ${name}, nên có thể.`;
}

/**
 * A question asked over a box of balls, in the book's words.
 * @param {() => number} rand
 * @returns {{ balls: BallColor[], taken: 1 | 2, event: string, word: ChanceWord, why: string }}
 */
export function boxEvent(rand) {
  const taken = /** @type {1 | 2} */ (rand() < 0.5 ? 1 : 2);
  const balls = makeBox(rand, taken === 1 ? 2 : 3);
  const ways = waysToTake(balls, taken);
  const color = rand() < 0.25 ? pick(rand, COLOR_IDS) : pick(rand, balls);
  const name = BALL_COLORS[color].name;
  if (taken === 1) {
    return {
      balls,
      taken,
      event: `Lấy được bóng ${name}`,
      word: wordOf(ways, (w) => w[0] === color),
      why: whyOne(balls, color),
    };
  }
  if (rand() < 0.5) {
    return {
      balls,
      taken,
      event: `Cả 2 quả đều là bóng ${name}`,
      word: wordOf(ways, (w) => w.every((b) => b === color)),
      why: whyBoth(balls, color),
    };
  }
  return {
    balls,
    taken,
    event: `Trong 2 quả có bóng ${name}`,
    word: wordOf(ways, (w) => w.includes(color)),
    why: whyHas(balls, color),
  };
}

/** @type {ReviewSkill} */
export const boxChanceSkill = {
  id: 'kha-nang-bong',
  label: 'Chắc chắn, có thể, không thể',
  make(rand) {
    const { balls, taken, event, word, why } = boxEvent(rand);
    return {
      prompt: `Rô-bốt lấy ${taken} quả bóng, không nhìn. ${event} là việc thế nào?`,
      visual: { type: 'box', balls },
      options: [...WORDS],
      answer: WORDS.indexOf(word),
      hint:
        taken === 1
          ? 'Em nhìn xem trong hộp có bóng màu đó không, và còn màu nào khác không.'
          : 'Em thử nghĩ các cách lấy ra 2 quả bóng từ hộp.',
      solution: why,
    };
  },
};

/**
 * Sentences on taking one ball, each with whether it holds for the box.
 * @param {readonly BallColor[]} balls
 */
export function boxSentences(balls) {
  const ways = waysToTake(balls, 1);
  return COLOR_IDS.flatMap((color) =>
    WORDS.map((word) => ({
      text: `${word} lấy được bóng ${BALL_COLORS[color].name}.`,
      color,
      holds: wordOf(ways, (w) => w[0] === color) === word,
    })),
  );
}

/** @type {ReviewSkill} */
export const trueSentenceSkill = {
  id: 'cau-dung',
  label: 'Chọn câu đúng về khả năng',
  make(rand) {
    const balls = makeBox(rand);
    const sentences = boxSentences(balls);
    const right = pick(
      rand,
      sentences.filter((s) => s.holds),
    );
    const wrong = shuffle(
      rand,
      sentences.filter((s) => !s.holds),
    ).slice(0, 2);
    return {
      prompt: 'Rô-bốt lấy 1 quả bóng, không nhìn. Câu nào đúng?',
      visual: { type: 'box', balls },
      ...mixOptions(
        rand,
        right.text,
        wrong.map((s) => s.text),
      ),
      hint: 'Em xem từng màu: trong hộp có màu đó không, và còn màu nào khác không.',
      solution: `${right.text} ${whyOne(balls, right.color)}`,
    };
  },
};

/** @type {ReviewSkill} */
export const cardChanceSkill = {
  id: 'kha-nang-the',
  label: 'Rút thẻ số',
  make(rand) {
    const digits = shuffle(rand, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
    const wanted = pick(rand, WORDS);
    for (;;) {
      const bigger = rand() < 0.5;
      const x = int(rand, 1, 10);
      const holds = (/** @type {number} */ d) => (bigger ? d > x : d < x);
      const word = wordOf(digits, holds);
      if (word !== wanted) continue;
      const hits = digits.filter(holds);
      const side = bigger ? 'lớn hơn' : 'bé hơn';
      return {
        prompt: `Rút một thẻ, không nhìn. Số trên thẻ ${side} ${x} là việc thế nào?`,
        visual: { type: 'cards', digits },
        options: [...WORDS],
        answer: WORDS.indexOf(word),
        hint: `Em so sánh từng thẻ với số ${x}.`,
        solution:
          word === 'Không thể'
            ? `Không thẻ nào có số ${side} ${x}, nên không thể.`
            : word === 'Chắc chắn'
              ? `Thẻ nào cũng có số ${side} ${x}, nên chắc chắn.`
              : `Thẻ ${hits.join(', ')} có số ${side} ${x}, còn thẻ khác thì không, nên có thể.`,
      };
    }
  },
};

/** The parts of the review of counting data and of what can happen. */
export const SURVEY_SKILLS = [
  countShapesSkill,
  readTallySkill,
  writeTallySkill,
  readChartSkill,
  chartSumSkill,
  mostFewestSkill,
  boxChanceSkill,
  trueSentenceSkill,
  cardChanceSkill,
];
