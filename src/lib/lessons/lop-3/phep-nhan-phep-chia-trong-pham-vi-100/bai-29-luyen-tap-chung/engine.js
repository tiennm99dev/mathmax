/**
 * The mixed practice of the chapter: multiplying and dividing tens in the head,
 * two-digit by one-digit multiplication and division, division with a
 * remainder, times and divided down against more and less, and word problems
 * with one or two steps. One question of each part in a shuffled order. Pure
 * and DOM-free.
 */
import { numberDivide } from '#lib/algebra-engine/long-division.js';
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { divText } from '../_shared/division.js';
import { slipOptions } from '../_shared/strip.js';
import {
  answerLine,
  drawStories,
  firstAskMid,
  firstCalc,
  spoken,
  totalAsk,
  totalCalc,
} from '../_shared/two-step.js';

/** @typedef {import('../_shared/two-step.js').Story} Story */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Story>} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'nhan-chuc': 'Nhân nhẩm số tròn chục',
  'chia-chuc': 'Chia nhẩm số tròn chục',
  nhan: 'Nhân số có hai chữ số với số có một chữ số',
  chia: 'Chia số có hai chữ số cho số có một chữ số',
  'chia-du': 'Phép chia có dư',
  gap: 'Gấp một số lên một số lần',
  giam: 'Giảm một số đi một số lần',
  'chon-phep': 'Chọn phép tính',
  chuoi: 'Tính lần lượt từng bước',
  'bai-du': 'Bài toán có phép chia có dư',
  'hai-buoc': 'Bài toán giải bằng hai bước tính',
  'so-do': 'Đọc sơ đồ bài toán',
});

/**
 * How the book says a multiplication, digit by digit.
 * @param {number} n a two-digit number
 * @param {number} m a digit
 */
export function mulWords(n, m) {
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  const low = m * ones;
  const carry = Math.floor(low / 10);
  const high = m * tens;
  const lowWords = `${m} nhân ${ones} bằng ${low}, viết ${low % 10}${carry ? `, nhớ ${carry}` : ''}.`;
  const highWords = carry
    ? `${m} nhân ${tens} bằng ${high}, thêm ${carry} bằng ${high + carry}, viết ${high + carry}.`
    : `${m} nhân ${tens} bằng ${high}, viết ${high}.`;
  return `${lowWords} ${highWords} Vậy ${n} × ${m} = ${n * m}.`;
}

/**
 * How the book says a division, starting from the tens.
 * @param {number} n a two-digit number
 * @param {number} d a digit
 */
export function divWords(n, d) {
  const rounds = numberDivide(n, d).rounds.map(({ digit, partial, product, rest }, i) => {
    const down = i > 0 ? `Hạ ${n % 10}, được ${partial}. ` : '';
    return `${down}${partial} chia ${d} được ${digit}, viết ${digit}; ${digit} nhân ${d} bằng ${product}; ${partial} trừ ${product} bằng ${rest}.`;
  });
  return `${rounds.join(' ')} Vậy ${divText(n, d)}.`;
}

/**
 * A two-digit by one-digit multiplication within 100, with no tens-only number.
 * @param {() => number} rand
 */
function drawProduct(rand) {
  for (;;) {
    const m = int(rand, 2, 6);
    const n = int(rand, 11, 49);
    if (n % 10 !== 0 && n * m <= 99) return { n, m };
  }
}

/**
 * A division with a two-digit quotient, within the steps the book teaches.
 * @param {() => number} rand
 * @param {boolean} exact whether it divides evenly
 */
function drawDivision(rand, exact) {
  for (;;) {
    const d = int(rand, 2, 6);
    const n = int(rand, 12, 99);
    if (Math.floor(n / 10) >= d && (n % d === 0) === exact) return { n, d };
  }
}

/**
 * A division that divides evenly, whose product also stays within 100, so that
 * every operation on the two numbers can be asked for.
 * @param {() => number} rand
 */
function drawSmallDivision(rand) {
  for (;;) {
    const { n, d } = drawDivision(rand, true);
    if (n * d <= 99) return { n, d };
  }
}

/**
 * A quotient and its remainder written the book's way.
 * @param {number} q
 * @param {number} rest
 */
const withRest = (q, rest) => (rest > 0 ? `${q} (dư ${rest})` : String(q));

/**
 * The slips of a division with a remainder: a remainder not below the divisor,
 * a quotient one too big and a remainder off by one.
 * @param {number} q
 * @param {number} rest
 * @param {number} d
 * @returns {[number, number][]}
 */
function restSlips(q, rest, d) {
  const off = rest + 1 < d ? rest + 1 : rest - 1;
  return [
    [q - 1, rest + d],
    [q + 1, rest],
    [q, off],
  ];
}

/** Word problems with a remainder: as many as fit, and what is left over. */
const LEFTOVERS = [
  {
    text: (/** @type {number} */ n, /** @type {number} */ d) =>
      `Có ${n} m vải. Mỗi bộ quần áo may hết ${d} m vải. May được nhiều nhất bao nhiêu bộ quần áo và còn thừa mấy mét vải?`,
    say: (/** @type {number} */ q, /** @type {number} */ rest) => `${q} bộ, thừa ${rest} m`,
  },
  {
    text: (/** @type {number} */ n, /** @type {number} */ d) =>
      `Có ${n} cái bánh, xếp vào các hộp, mỗi hộp ${d} cái. Xếp được nhiều nhất bao nhiêu hộp và còn thừa mấy cái bánh?`,
    say: (/** @type {number} */ q, /** @type {number} */ rest) => `${q} hộp, thừa ${rest} cái`,
  },
];

/**
 * The solving of a two-step story in one sentence.
 * @param {Story} s
 */
const worked = (s) =>
  `${firstCalc(s)} = ${s.second}. ${totalCalc(s)} = ${s.total}. ${answerLine(s)}`;

/** @type {Record<keyof typeof KIND_LABELS, (rand: () => number, stories: Story[]) => Question>} */
const MAKERS = {
  'nhan-chuc': (rand) => {
    const m = int(rand, 2, 9);
    const tens = int(rand, 1, Math.floor(9 / m)) * 10;
    const right = tens * m;
    return {
      prompt: `Tính nhẩm: ${tens} × ${m} = ?`,
      ...slipOptions(right, [tens / 10, tens + m, right + 10]),
      hint: `Em nhẩm: ${tens / 10} chục × ${m} = mấy chục?`,
      solution: `${tens / 10} chục × ${m} = ${(tens / 10) * m} chục. Vậy ${tens} × ${m} = ${right}.`,
    };
  },
  'chia-chuc': (rand) => {
    const d = int(rand, 2, 9);
    const tens = int(rand, 1, Math.floor(9 / d));
    const n = d * tens * 10;
    return {
      prompt: `Tính nhẩm: ${n} : ${d} = ?`,
      ...slipOptions(tens * 10, [tens, tens * 10 + 10, n - d]),
      hint: `Em nhẩm: ${n / 10} chục : ${d} = mấy chục?`,
      solution: `${n / 10} chục : ${d} = ${tens} chục. Vậy ${n} : ${d} = ${tens * 10}.`,
    };
  },
  nhan: (rand) => {
    const { n, m } = drawProduct(rand);
    const noCarry = Math.floor(n / 10) * m * 10 + (((n % 10) * m) % 10);
    return {
      prompt: `Đặt tính rồi tính: ${n} × ${m} = ?`,
      ...slipOptions(n * m, [noCarry, n * m + 10, n + m]),
      hint: 'Em nhân từ hàng đơn vị. Nhớ cộng số đã nhớ vào hàng chục.',
      solution: mulWords(n, m),
    };
  },
  chia: (rand) => {
    const { n, d } = drawDivision(rand, true);
    const q = n / d;
    return {
      prompt: `Đặt tính rồi tính: ${n} : ${d} = ?`,
      ...slipOptions(q, [q + 10, q - 1, n - d]),
      hint: 'Em chia từ hàng chục, rồi hạ hàng đơn vị xuống.',
      solution: divWords(n, d),
    };
  },
  'chia-du': (rand) => {
    const { n, d } = drawDivision(rand, false);
    const q = Math.floor(n / d);
    const rest = n % d;
    return {
      prompt: `Đặt tính rồi tính: ${n} : ${d} = ?`,
      ...mixOptions(
        rand,
        withRest(q, rest),
        restSlips(q, rest, d).map(([x, y]) => withRest(x, y)),
      ),
      hint: `Số dư phải bé hơn số chia, tức là bé hơn ${d}.`,
      solution: divWords(n, d),
    };
  },
  gap: (rand) => {
    const { n, m } = drawProduct(rand);
    return {
      prompt: `${n} gấp lên ${m} lần được mấy?`,
      ...slipOptions(n * m, [n + m, n * m + 10, n * m - n]),
      hint: 'Gấp lên một số lần thì em làm phép nhân.',
      solution: mulWords(n, m),
    };
  },
  giam: (rand) => {
    const { n, d } = drawDivision(rand, true);
    return {
      prompt: `${n} giảm đi ${d} lần được mấy?`,
      ...slipOptions(n / d, [n - d, n / d + d, n / d + 10]),
      hint: 'Giảm đi một số lần thì em làm phép chia.',
      solution: divWords(n, d),
    };
  },
  'chon-phep': (rand) => {
    const { n, d } = drawSmallDivision(rand);
    const calc = {
      gap: `${n} × ${d}`,
      them: `${n} + ${d}`,
      giam: `${n} : ${d}`,
      bot: `${n} − ${d}`,
    };
    const wanted = pick(rand, /** @type {const} */ (['gap', 'them', 'giam', 'bot']));
    const asks = {
      gap: `Gấp ${n} lên ${d} lần. Em làm phép tính nào?`,
      them: `Thêm ${d} đơn vị vào ${n}. Em làm phép tính nào?`,
      giam: `Giảm ${n} đi ${d} lần. Em làm phép tính nào?`,
      bot: `Bớt ${n} đi ${d} đơn vị. Em làm phép tính nào?`,
    };
    const { options, answer } = mixOptions(rand, calc[wanted], Object.values(calc));
    return {
      prompt: asks[wanted],
      options,
      answer,
      optionLabels: options.map(spoken),
      hint: 'Gấp là nhân, giảm đi mấy lần là chia. Thêm là cộng, bớt là trừ.',
      solution: `Em làm phép tính ${calc[wanted]}.`,
    };
  },
  chuoi: (rand) => {
    const d = int(rand, 2, 5);
    const q = int(rand, 6, 15);
    const add = int(rand, 2, 9);
    const n = d * q;
    const right = q + add;
    return {
      prompt: `Từ số ${n}, em giảm đi ${d} lần, rồi thêm ${add} đơn vị. Em được số nào?`,
      ...slipOptions(right, [n - d + add, q, q - add > 0 ? q - add : q + 1]),
      hint: 'Em làm lần lượt: chia trước, rồi cộng.',
      solution: `${n} : ${d} = ${q}. ${q} + ${add} = ${right}.`,
    };
  },
  'bai-du': (rand) => {
    const { n, d } = drawDivision(rand, false);
    const q = Math.floor(n / d);
    const rest = n % d;
    const leftover = pick(rand, LEFTOVERS);
    const slips = restSlips(q, rest, d).filter(([, y]) => y > 0);
    return {
      prompt: leftover.text(n, d),
      ...mixOptions(
        rand,
        leftover.say(q, rest),
        slips.map(([x, y]) => leftover.say(x, y)),
      ),
      hint: `Em tính ${n} : ${d}. Phần còn thừa phải bé hơn ${d}.`,
      solution: `${divText(n, d)}. Đáp số: ${leftover.say(q, rest)}.`,
    };
  },
  'hai-buoc': (_, [story]) => ({
    prompt: story.text,
    ...slipOptions(story.total, [story.second, story.a + story.k, story.total + story.a]),
    hint: 'Bước 1 tìm số còn thiếu. Bước 2 trả lời câu hỏi của bài toán.',
    solution: worked(story),
  }),
  'so-do': (_, [, story]) => ({
    visual: story,
    prompt: `Em nhìn sơ đồ. ${totalAsk(story)}?`,
    ...slipOptions(story.total, [story.second, story.a + story.k, story.total + story.a]),
    hint: `Trước hết em tìm: ${firstAskMid(story)}? Rồi em cộng với ${story.a}.`,
    solution: worked(story),
  }),
};

/**
 * A round with one question of every part, shuffled. `hai-buoc` and `so-do`
 * take different problems.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const stories = drawStories(rand);
  const kinds = /** @type {(keyof typeof KIND_LABELS)[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand, stories), kind }));
}
