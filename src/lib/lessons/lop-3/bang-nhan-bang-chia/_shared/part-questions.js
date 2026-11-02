/**
 * The kid questions on "một phần mấy", shared by the lesson that teaches it and
 * the chapter's mixed practice. Each maker takes the number of parts `n`, so a
 * round can keep its questions different. Pure and DOM-free.
 */
import { pick, shuffle } from '#lib/core/drill.js';
import { capitalize } from '#lib/core/kid/quiz.js';
import {
  MAX_PARTS,
  MIN_PARTS,
  equalFigure,
  figureLabel,
  partText,
  partWords,
  shapesFor,
  unevenSizes,
} from './parts.js';
import { divLine, quotientOptions } from './times.js';

/** @typedef {import('./parts.js').Figure} Figure */

/**
 * What a question draws: a cut shape, the written form of 1/n, or a set of
 * things that splits into `parts` once the question ends.
 * @typedef {(
 *   | { type: 'figure', figure: Figure }
 *   | { type: 'written', n: number }
 *   | { type: 'set', picture: import('#lib/core/kid/pictures/index.js').PictureName, noun: string, total: number, parts: number }
 * )} PartVisual
 */

/** @typedef {Omit<import('#lib/core/kid/quiz.js').KidQuestion<PartVisual>, 'kind'>} PartQuestion */

/** The largest set a question draws, so its pictures fit a phone. */
const MAX_SET = 24;

/** The most parts an uneven shape has, while its sizes still look different. */
const MAX_UNEVEN = 6;

/** The things a set is made of. */
export const THINGS = /** @type {const} */ ([
  { picture: 'orange', noun: 'quả cam', unit: 'quả' },
  { picture: 'apple', noun: 'quả táo', unit: 'quả' },
  { picture: 'fish', noun: 'con cá', unit: 'con' },
  { picture: 'rabbit', noun: 'con thỏ', unit: 'con' },
  { picture: 'flower', noun: 'bông hoa', unit: 'bông' },
]);

/**
 * The right option among wrong ones, shuffled, for options of any kind.
 * @template T
 * @param {() => number} rand
 * @param {T} right
 * @param {T[]} wrong
 */
function mixed(rand, right, wrong) {
  const options = shuffle(rand, [right, ...wrong]);
  return { options, answer: options.indexOf(right) };
}

/**
 * Part counts near `n`, the likeliest slip first: counting only the white parts
 * gives n − 1.
 * @param {number} n
 */
function nearParts(n) {
  return [n - 1, n + 1, n - 2, n + 2, n - 3, n + 3]
    .filter((v) => v >= MIN_PARTS && v <= MAX_PARTS)
    .slice(0, 3);
}

/**
 * One of the shapes that can be cut into `n` equal parts, picked at random.
 * @param {() => number} rand
 * @param {number} n
 * @param {number} [shaded]
 */
const someFigure = (rand, n, shaded = 0) => equalFigure(pick(rand, shapesFor(n)), n, shaded);

/**
 * Reads the coloured part of a shape as a written 1/n.
 * @param {() => number} rand
 * @param {number} n
 * @returns {PartQuestion}
 */
export function readPart(rand, n) {
  const shaded = Math.floor(rand() * n);
  const { options, answer } = mixed(rand, n, nearParts(n));
  return {
    prompt: 'Phần tô màu là một phần mấy của hình?',
    visual: { type: 'figure', figure: someFigure(rand, n, shaded) },
    options: options.map((v) => ({ label: partText(v), n: v })),
    answer,
    optionLabels: options.map((v) => capitalize(partWords(v))),
    hint: 'Em đếm xem hình được chia thành mấy phần bằng nhau.',
    solution: `Hình được chia thành ${n} phần bằng nhau, tô màu 1 phần. Đã tô màu ${partText(n)} hình, đọc là ${partWords(n)}.`,
  };
}

/**
 * Matches a written 1/n to its reading.
 * @param {() => number} rand
 * @param {number} n
 * @returns {PartQuestion}
 */
export function readWritten(rand, n) {
  const word = n === 4 ? 'bốn' : partWords(n).replace('một phần ', '');
  const reversed = `${capitalize(word)} phần một`;
  return {
    prompt: 'Số này đọc thế nào?',
    visual: { type: 'written', n },
    ...mixed(rand, capitalize(partWords(n)), [
      ...nearParts(n)
        .slice(0, 2)
        .map((v) => capitalize(partWords(v))),
      reversed,
    ]),
    hint: `Số ở dưới cho biết hình được chia thành mấy phần bằng nhau. Số ở dưới là ${n}.`,
    solution: `${partText(n)} đọc là ${partWords(n)}.`,
  };
}

/**
 * Picture options, with what a screen reader hears for each.
 * @param {{ options: Figure[], answer: number }} set
 */
function pictureOptions({ options, answer }) {
  return {
    options: options.map((figure) => ({ label: figureLabel(figure), figure })),
    answer,
    optionLabels: options.map(figureLabel),
  };
}

/**
 * Finds the shape coloured 1/n among shapes cut into other numbers of parts or
 * into parts that are not equal.
 * @param {() => number} rand
 * @param {number} n
 * @returns {PartQuestion}
 */
export function pickPart(rand, n) {
  const shape = pick(rand, /** @type {const} */ (['circle', 'bar']));
  const other = shape === 'circle' ? 'bar' : 'circle';
  const [first, second, third] = nearParts(n);
  const wrong = [equalFigure(shape, first), equalFigure(other, second)];
  wrong.push(
    n <= MAX_UNEVEN
      ? { shape: other, sizes: unevenSizes(n, 0), shaded: 1 }
      : equalFigure(shape, third),
  );
  return {
    prompt: `Hình nào đã tô màu ${partText(n)}?`,
    ...pictureOptions(mixed(rand, equalFigure(shape, n), wrong)),
    hint: `Em tìm hình được chia thành ${n} phần bằng nhau và tô màu 1 phần.`,
    solution: `${partText(n)} là chia hình thành ${n} phần bằng nhau, tô màu 1 phần.`,
  };
}

/**
 * Finds the shape cut into equal parts.
 * @param {() => number} rand
 * @param {number} n
 * @returns {PartQuestion}
 */
export function equalParts(rand, n) {
  const parts = Math.max(3, Math.min(n, MAX_UNEVEN));
  const shapes = shuffle(rand, /** @type {const} */ (['circle', 'bar', 'circle', 'bar']));
  const wrong = [0, 1, 2].map((pattern, i) => ({
    shape: shapes[i],
    sizes: unevenSizes(parts, pattern),
    shaded: -1,
  }));
  return {
    prompt: 'Hình nào được chia thành các phần bằng nhau?',
    ...pictureOptions(mixed(rand, equalFigure(shapes[3], parts, -1), wrong)),
    hint: 'Em so sánh các phần trong mỗi hình. Có phần nào to hơn không?',
    solution: `Hình đúng có ${parts} phần to bằng nhau. Các hình còn lại có phần to, phần nhỏ.`,
  };
}

/**
 * A claim about a shape to judge: right, with the wrong number of parts, or with
 * parts that are not equal.
 * @param {() => number} rand
 * @param {number} n
 * @returns {PartQuestion}
 */
export function rightOrWrong(rand, n) {
  const form = pick(rand, ['dung', 'sai-so', n <= MAX_UNEVEN ? 'sai-phan' : 'dung']);
  const said = form === 'sai-so' ? pick(rand, nearParts(n)) : n;
  const figure =
    form === 'sai-phan'
      ? {
          shape: pick(rand, /** @type {const} */ (['circle', 'bar'])),
          sizes: unevenSizes(n, 0),
          shaded: 1,
        }
      : someFigure(rand, n, Math.floor(rand() * n));
  const solution = {
    dung: `Đúng. Hình được chia thành ${n} phần bằng nhau, tô màu 1 phần: đó là ${partText(n)}.`,
    'sai-so': `Sai. Hình được chia thành ${n} phần bằng nhau, nên đã tô màu ${partText(n)}.`,
    'sai-phan': `Sai. Các phần không bằng nhau, nên phần tô màu không phải là ${partText(n)}.`,
  };
  return {
    prompt: `Đã tô màu ${partText(said)} hình. Đúng hay sai?`,
    visual: { type: 'figure', figure },
    options: ['Đúng', 'Sai'],
    answer: form === 'dung' ? 0 : 1,
    hint: 'Các phần có bằng nhau không? Hình được chia thành mấy phần?',
    solution: solution[/** @type {keyof typeof solution} */ (form)],
  };
}

/**
 * Finds 1/n of a set of things by dividing.
 * @param {() => number} rand
 * @param {number} n
 * @returns {PartQuestion}
 */
export function shareOf(rand, n) {
  const most = Math.min(Math.floor(MAX_SET / n), 9);
  const each = 2 + Math.floor(rand() * (most - 1));
  const { picture, noun, unit } = pick(rand, THINGS);
  const total = n * each;
  return {
    prompt: `Có ${total} ${noun}. ${partText(n)} số ${noun} là mấy ${unit}?`,
    visual: { type: 'set', picture, noun, total, parts: n },
    ...quotientOptions(n, each),
    hint: `Em chia ${total} ${noun} thành ${n} phần bằng nhau. Mỗi phần có mấy ${unit}?`,
    solution: `${divLine(n, each)}. ${partText(n)} số ${noun} là ${each} ${unit}.`,
  };
}
