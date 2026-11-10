/**
 * The lesson on acute, obtuse and straight angles: turning the side OB and
 * naming the angle by comparing it with a right angle (90°), the kinds the
 * child is asked to make in turn, and the angle cards to sort. Pure and
 * DOM-free.
 */
import { KIND_NAME, angleName, kindOf, kindWhy } from '../_shared/angle.js';

/** @typedef {import('../_shared/angle.js').AngleKind} AngleKind */

/** The kinds the child is asked to make, in turn. */
export const GOALS = /** @type {AngleKind[]} */ (['nhon', 'tu', 'vuong', 'bet', 'tu', 'nhon']);

/**
 * How an angle of measure `m` compares with a right angle, as a sign
 * sentence: "60° < 90°".
 * @param {number} m
 */
export function compareText(m) {
  if (m === 90) return '90° = 90°';
  if (m === 180) return '180° = 90° + 90°';
  return m < 90 ? `${m}° < 90°` : `${m}° > 90°`;
}

/**
 * What the child hears while making an angle of kind `goal`.
 * @param {number} m the measure now
 * @param {AngleKind} goal
 * @returns {{ done: boolean, text: string }}
 */
export function goalMessage(m, goal) {
  const kind = kindOf(m);
  if (kind === goal) return { done: true, text: `Đúng rồi! ${kindWhy(m)}` };
  const now = `Góc đang là ${KIND_NAME[kind]} (${m}°).`;
  switch (goal) {
    case 'nhon':
      return {
        done: false,
        text: `${now} Góc nhọn bé hơn góc vuông: em xoay cạnh OB lại gần cạnh OA.`,
      };
    case 'vuong':
      return { done: false, text: `${now} Góc vuông bằng 90°: em xoay cạnh OB đến vạch nét đứt.` };
    case 'tu':
      return {
        done: false,
        text:
          m <= 90
            ? `${now} Góc tù lớn hơn góc vuông: em xoay cạnh OB qua vạch nét đứt.`
            : `${now} Góc tù bé hơn góc bẹt: em xoay cạnh OB lại một chút.`,
      };
    default:
      return {
        done: false,
        text: `${now} Góc bẹt bằng hai góc vuông: em xoay cạnh OB đến khi hai cạnh nằm trên một đường thẳng.`,
      };
  }
}

/**
 * The angles to sort: measure, direction of the first side and names.
 * @type {{ id: string, m: number, turn: number, names: readonly [string, string, string] }[]}
 */
export const SORT_ANGLES = [
  { id: 'g1', m: 40, turn: 20, names: ['O', 'A', 'B'] },
  { id: 'g2', m: 90, turn: 200, names: ['M', 'P', 'Q'] },
  { id: 'g3', m: 135, turn: 0, names: ['I', 'K', 'L'] },
  { id: 'g4', m: 180, turn: 30, names: ['E', 'G', 'H'] },
  { id: 'g5', m: 70, turn: 250, names: ['C', 'D', 'E'] },
  { id: 'g6', m: 110, turn: 60, names: ['S', 'T', 'U'] },
  { id: 'g7', m: 90, turn: 330, names: ['N', 'M', 'H'] },
  { id: 'g8', m: 160, turn: 190, names: ['G', 'S', 'L'] },
  { id: 'g9', m: 25, turn: 120, names: ['D', 'A', 'B'] },
  { id: 'g10', m: 180, turn: 90, names: ['B', 'A', 'C'] },
];

/** The bins, one per kind, in the book's order. */
export const BINS = /** @type {const} */ ([
  { id: 'nhon', label: 'Góc nhọn' },
  { id: 'vuong', label: 'Góc vuông' },
  { id: 'tu', label: 'Góc tù' },
  { id: 'bet', label: 'Góc bẹt' },
]);

/**
 * The sorter cards of the angles.
 * @returns {import('#lib/core/card-sorter.js').SortCard[]}
 */
export function sortCards() {
  return SORT_ANGLES.map((a) => {
    const [o, p, q] = a.names;
    const name = angleName(o, p, q);
    return {
      id: a.id,
      label: `${name.charAt(0).toUpperCase()}${name.slice(1)}: ${a.m}°`,
      bin: kindOf(a.m),
      why: kindWhy(a.m),
    };
  });
}
