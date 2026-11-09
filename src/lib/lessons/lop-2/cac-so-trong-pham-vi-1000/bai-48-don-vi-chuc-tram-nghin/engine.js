/**
 * The block-joining game of "Đơn vị, chục, trăm, nghìn": add blocks one by one,
 * join ten of them into one block of the next place, and split that block back.
 * Pure and DOM-free.
 */

/** @typedef {{ level: number, count: number }} Pile */

/**
 * The four places from small to big.
 * @type {ReadonlyArray<{ kind: import('#lib/core/kid/place-value.js').BlockKind, name: string, value: number, cell: number }>}
 */
export const LEVELS = [
  { kind: 'don-vi', name: 'đơn vị', value: 1, cell: 22 },
  { kind: 'chuc', name: 'chục', value: 10, cell: 12 },
  { kind: 'tram', name: 'trăm', value: 100, cell: 5 },
  { kind: 'nghin', name: 'nghìn', value: 1000, cell: 10 },
];

/** Ten blocks of a place make one block of the next. */
export const JOIN_AT = 10;

/** The first pile: no blocks yet. */
export const START = /** @type {Pile} */ ({ level: 0, count: 0 });

/** The last place, which the game stops at. */
const TOP = LEVELS.length - 1;

/** @param {Pile} pile */
export const canAdd = (pile) => pile.level < TOP && pile.count < JOIN_AT;

/** @param {Pile} pile */
export const canRemove = (pile) => pile.count > 0 && !canSplit(pile);

/** @param {Pile} pile */
export const canJoin = (pile) => pile.level < TOP && pile.count === JOIN_AT;

/** @param {Pile} pile */
export const canSplit = (pile) => pile.level > 0 && pile.count === 1;

/**
 * @param {Pile} pile
 * @returns {Pile}
 */
export function add(pile) {
  return canAdd(pile) ? { ...pile, count: pile.count + 1 } : pile;
}

/**
 * @param {Pile} pile
 * @returns {Pile}
 */
export function remove(pile) {
  return canRemove(pile) ? { ...pile, count: pile.count - 1 } : pile;
}

/**
 * Ten blocks become one block of the next place.
 * @param {Pile} pile
 * @returns {Pile}
 */
export function join(pile) {
  return canJoin(pile) ? { level: pile.level + 1, count: 1 } : pile;
}

/**
 * One block breaks back into ten of the place below.
 * @param {Pile} pile
 * @returns {Pile}
 */
export function split(pile) {
  return canSplit(pile) ? { level: pile.level - 1, count: JOIN_AT } : pile;
}

/**
 * The rule a join at `level` teaches: "10 đơn vị = 1 chục".
 * @param {number} level
 */
export function ruleText(level) {
  return `${JOIN_AT} ${LEVELS[level].name} = 1 ${LEVELS[level + 1].name}`;
}

/**
 * What the pile is worth: "3 chục là 30".
 * @param {Pile} pile
 */
export function worthText(pile) {
  const { name, value } = LEVELS[pile.level];
  return `${pile.count} ${name} là ${pile.count * value}`;
}

/**
 * The live line under the pile, leading the child to the next step.
 * @param {Pile} pile
 */
export function pileNote(pile) {
  const { name } = LEVELS[pile.level];
  if (pile.level === TOP) return 'Tuyệt vời! Em đã ghép được 1 nghìn. 1 nghìn viết là 1000.';
  if (pile.count === 0) return `Chưa có khối nào. Em chạm "Thêm 1 ${name}" nhé.`;
  if (pile.count === JOIN_AT) {
    return `Đủ ${JOIN_AT} ${name} rồi! Em chạm "Ghép" để có 1 ${LEVELS[pile.level + 1].name}.`;
  }
  return `Có ${pile.count} ${name}. Cần thêm ${JOIN_AT - pile.count} ${name} nữa để ghép.`;
}
