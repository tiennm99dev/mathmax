/**
 * Lengths as a grade 1 child meets them: the things the chapter's widgets
 * draw, the words for comparing two lengths or heights, reading a ruler
 * placed at its 0 mark, and scoring a guessed length. Pure and DOM-free.
 */

/** @typedef {'pencil' | 'crayon' | 'ribbon' | 'straw'} Shape */
/** @typedef {'length' | 'height'} Dimension */

/**
 * @typedef {{ id: string, label: string, shape: Shape, color: string }} Thing
 * @typedef {{ id: string, label: string, color: string }} Kid
 */

/** Things that lie flat and are measured along their length. */
export const THINGS = /** @type {readonly Thing[]} */ ([
  { id: 'red-pencil', label: 'Bút chì đỏ', shape: 'pencil', color: '#ef4444' },
  { id: 'blue-pencil', label: 'Bút chì xanh', shape: 'pencil', color: '#3b82f6' },
  { id: 'yellow-crayon', label: 'Bút sáp vàng', shape: 'crayon', color: '#eab308' },
  { id: 'green-ribbon', label: 'Ruy băng xanh lá', shape: 'ribbon', color: '#22c55e' },
  { id: 'pink-straw', label: 'Ống hút hồng', shape: 'straw', color: '#ec4899' },
  { id: 'purple-ribbon', label: 'Ruy băng tím', shape: 'ribbon', color: '#8b5cf6' },
]);

/** Children who stand side by side to compare heights. */
export const KIDS = /** @type {readonly Kid[]} */ ([
  { id: 'nam', label: 'Bạn Nam', color: '#2563eb' },
  { id: 'mai', label: 'Bạn Mai', color: '#db2777' },
  { id: 'an', label: 'Bạn An', color: '#16a34a' },
  { id: 'lan', label: 'Bạn Lan', color: '#ea580c' },
]);

/** The last number on the chapter's ruler, in cm. */
export const RULER_CM = 12;
/** Longest thing measured with that ruler, in cm. */
export const LONGEST = 11;

/**
 * Words for "more" and "less" along a dimension: longer and shorter for a
 * length, taller and shorter for a height.
 * @param {Dimension} dim
 */
export function pairWords(dim) {
  return dim === 'length'
    ? { more: 'dài hơn', less: 'ngắn hơn', most: 'dài nhất', least: 'ngắn nhất' }
    : { more: 'cao hơn', less: 'thấp hơn', most: 'cao nhất', least: 'thấp nhất' };
}

/**
 * A label used inside a sentence: "Bút chì đỏ" becomes "bút chì đỏ", but a
 * child's name keeps its capital ("bạn Nam").
 * @param {string} label
 */
export function inSentence(label) {
  return label.charAt(0).toLowerCase() + label.slice(1);
}

/**
 * Both ways of saying how two different sizes compare, the book's pair of
 * sentences: "Bút chì đỏ dài hơn bút chì xanh. Bút chì xanh ngắn hơn bút chì đỏ."
 * @param {[string, string]} labels
 * @param {[number, number]} sizes
 * @param {Dimension} dim
 */
export function compareSentences(labels, sizes, dim) {
  const w = pairWords(dim);
  const big = sizes[0] > sizes[1] ? 0 : 1;
  const small = 1 - big;
  return `${labels[big]} ${w.more} ${inSentence(labels[small])}. ${labels[small]} ${w.less} ${inSentence(labels[big])}.`;
}

/**
 * Index of the largest value, or -1 when it is not the only largest one.
 * @param {readonly number[]} values
 */
export function largestIndex(values) {
  const top = Math.max(...values);
  return values.filter((v) => v === top).length === 1 ? values.indexOf(top) : -1;
}

/**
 * Index of the smallest value, or -1 when it is not the only smallest one.
 * @param {readonly number[]} values
 */
export function smallestIndex(values) {
  const low = Math.min(...values);
  return values.filter((v) => v === low).length === 1 ? values.indexOf(low) : -1;
}

/**
 * The ruler's 0 mark sits `shift` cm to the right of the thing's left end
 * (negative: to the left). The drag lands on whole centimetres, within reach.
 * @param {number} shift
 * @param {number} [reach]
 */
export function snapShift(shift, reach = 4) {
  const v = Math.round(shift);
  return Math.max(-reach, Math.min(reach, v)) || 0;
}

/**
 * What a child should hear about where the ruler lies under a thing of
 * `length` cm: move it, or read the number at the far end.
 * @param {number} shift where the 0 mark is, from the thing's left end, in cm
 * @param {number} length
 * @param {string} noun the thing, inside a sentence ("bút chì đỏ")
 */
export function rulerAdvice(shift, length, noun) {
  if (shift === 0) {
    return `Vạch 0 đã thẳng với đầu ${noun}. Đầu kia ở vạch ${length}: ${noun} dài ${length} cm.`;
  }
  const side = shift > 0 ? 'trái' : 'phải';
  return `Vạch 0 chưa thẳng với đầu ${noun}. Em kéo thước sang ${side} nhé.`;
}

/**
 * Stars for a guessed length: 3 when exact, 2 when 1 cm off, 1 when 2 cm
 * off, otherwise 0.
 * @param {number} guess
 * @param {number} actual
 */
export function estimateStars(guess, actual) {
  return Math.max(0, 3 - Math.abs(guess - actual));
}

/**
 * Feedback on a guess once the ruler has measured the thing.
 * @param {number} guess
 * @param {number} actual
 * @param {string} noun the thing, inside a sentence
 */
export function estimateMessage(guess, actual, noun) {
  const head = `Thước đo được: ${noun} dài ${actual} cm. Em đoán ${guess} cm.`;
  const d = Math.abs(guess - actual);
  if (d === 0) return `${head} Đoán đúng luôn! Em được 3 sao.`;
  const side = guess > actual ? 'dài hơn' : 'ngắn hơn';
  if (d <= 2) {
    const stars = estimateStars(guess, actual);
    return `${head} Em đoán ${side} ${d} cm, rất gần rồi! Em được ${stars} sao.`;
  }
  return `${head} Em đoán ${side} ${d} cm. Lần sau em so với ô 1 cm nhé.`;
}

/**
 * How many hand spans of `span` units it takes to cover `length` units,
 * laid end to end, the last one reaching the end or just past it.
 * @param {number} length
 * @param {number} span
 */
export function spansToCover(length, span) {
  return Math.ceil(length / span - 1e-9);
}
