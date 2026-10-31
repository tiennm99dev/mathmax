/**
 * The start-line game of "Dài hơn, ngắn hơn": two things (or two children)
 * begin away from the start line, placed so the shorter one sticks out
 * further and looks longer. The child moves both to the start line, then
 * says which is longer (taller) or shorter. Pure and DOM-free.
 */
import { int, rng, shuffle } from '#lib/core/drill.js';
import { KIDS, THINGS, compareSentences, pairWords } from '../_shared/length.js';

/** Board size along the compared direction, in units. */
export const SPAN = { length: 16, height: 13 };
/** Smallest and largest size of a thing, in units. */
const SIZES = { length: [3, 12], height: [5, 9] };

/**
 * @typedef {{
 *   dim: import('../_shared/length.js').Dimension;
 *   labels: [string, string];
 *   colors: [string, string];
 *   shapes: [import('../_shared/length.js').Shape, import('../_shared/length.js').Shape];
 *   sizes: [number, number];
 *   starts: [number, number];
 *   ask: 'more' | 'less';
 * }} Round
 */

/**
 * One round from a seed. Sizes differ by at least 2 units. The longer one
 * starts at 0 or 1 unit from the line, the shorter one further out, so its
 * far end passes the longer one's far end by 1 or 2 units.
 * @param {number} seed
 * @param {import('../_shared/length.js').Dimension} dim
 * @returns {Round}
 */
export function makeRound(seed, dim) {
  const rand = rng(seed * 7919 + (dim === 'length' ? 1 : 2));
  const [lo, hi] = SIZES[dim];
  const a = int(rand, lo, hi);
  let b = int(rand, lo, hi);
  while (Math.abs(a - b) < 2) b = int(rand, lo, hi);
  /** @type {[number, number]} */
  const sizes = [a, b];
  const big = a > b ? 0 : 1;
  const small = 1 - big;
  /** @type {[number, number]} */
  const starts = [0, 0];
  starts[big] = int(rand, 0, 1);
  starts[small] = starts[big] + sizes[big] - sizes[small] + int(rand, 1, 2);
  /** @type {readonly { label: string, color: string }[]} */
  const pool = dim === 'length' ? THINGS : KIDS;
  const [p, q] = shuffle(rand, pool);
  return {
    dim,
    labels: [p.label, q.label],
    colors: [p.color, q.color],
    shapes: dim === 'length' ? [shapeOf(p), shapeOf(q)] : ['pencil', 'pencil'],
    sizes,
    starts,
    ask: rand() < 0.5 ? 'more' : 'less',
  };
}

/**
 * The shape of a thing from the list, by its label.
 * @param {{ label: string }} item
 * @returns {import('../_shared/length.js').Shape}
 */
function shapeOf(item) {
  return THINGS.find((t) => t.label === item.label)?.shape ?? 'pencil';
}

/**
 * Index of the right answer: the bigger one for "more", the smaller for "less".
 * @param {Round} r
 */
export function answerOf(r) {
  const big = r.sizes[0] > r.sizes[1] ? 0 : 1;
  return r.ask === 'more' ? big : 1 - big;
}

/**
 * The question of a round: "Cái nào dài hơn?", "Bạn nào thấp hơn?".
 * @param {Round} r
 */
export function questionOf(r) {
  const w = pairWords(r.dim);
  const who = r.dim === 'length' ? 'Vật nào' : 'Bạn nào';
  return `${who} ${r.ask === 'more' ? w.more : w.less}?`;
}

/**
 * Where a dragged start lands: on the line when within half a unit of it,
 * otherwise on the nearest whole unit, inside the board.
 * @param {number} start
 * @param {number} size
 * @param {import('../_shared/length.js').Dimension} dim
 */
export function landStart(start, size, dim) {
  const v = Math.round(start);
  return Math.max(0, Math.min(SPAN[dim] - size, v));
}

/**
 * What the child hears after a move or an answer.
 * @param {Round} r
 * @param {[number, number]} starts
 * @param {number | null} picked
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function roundMessage(r, starts, picked) {
  const ready = starts[0] === 0 && starts[1] === 0;
  const things = r.dim === 'length' ? 'hai vật' : 'hai bạn';
  const line = r.dim === 'length' ? 'sát vạch xuất phát' : 'đứng trên mặt sàn';
  if (picked === null) {
    if (ready) return { tone: 'info', text: `Đã xong! ${questionOf(r)} Em chạm vào câu trả lời.` };
    const done = starts.filter((s) => s === 0).length;
    return {
      tone: 'info',
      text: `Em kéo ${things} về ${line} (${done}/2 đã xong), rồi mới so sánh.`,
    };
  }
  if (!ready) {
    return {
      tone: 'warn',
      text: `Khoan đã! Em đưa cả ${things} về ${line} trước. Chưa thẳng hàng thì dễ nhìn nhầm.`,
    };
  }
  if (picked === answerOf(r)) {
    return { tone: 'ok', text: `Đúng rồi! ${compareSentences(r.labels, r.sizes, r.dim)}` };
  }
  const rule = {
    length: {
      more: 'vật nào có đầu vượt ra xa hơn thì dài hơn',
      less: 'vật nào có đầu ở gần vạch xuất phát hơn thì ngắn hơn',
    },
    height: {
      more: 'bạn nào có đỉnh đầu ở cao hơn thì cao hơn',
      less: 'bạn nào có đỉnh đầu ở thấp hơn thì thấp hơn',
    },
  }[r.dim][r.ask];
  const end = r.dim === 'length' ? 'đầu bên phải' : 'đỉnh đầu';
  return { tone: 'warn', text: `Chưa đúng. Em nhìn ${end}: ${rule}. Em chọn lại nhé.` };
}
