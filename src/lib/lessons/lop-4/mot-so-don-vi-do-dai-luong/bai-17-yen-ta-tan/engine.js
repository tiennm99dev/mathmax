/**
 * Loading a truck scale with blocks of 1 tấn, 1 tạ, 1 yến and 1 kg until it
 * weighs as much as an animal or a load. The child sees the mass written in
 * kilograms and in the big units at once, and breaks one block into ten of
 * the next smaller unit (1 tạ = 10 yến) or joins ten back into one.
 * Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { MASS_UNITS, massText, massTotal } from '../_shared/measures.js';

/** @typedef {import('../_shared/measures.js').MassUnit} MassUnit */
/** @typedef {Record<MassUnit['id'], number>} Parts */

/**
 * What the scale must match: the thing, a picture for it and its mass.
 * @typedef {{ name: string, icon: string, kg: number }} Target
 */

/** @type {readonly Target[]} */
export const TARGETS = [
  { name: 'Bao gạo', icon: '🌾', kg: 50 },
  { name: 'Con lợn', icon: '🐖', kg: 120 },
  { name: 'Con bò', icon: '🐄', kg: 350 },
  { name: 'Con hổ', icon: '🐅', kg: 205 },
  { name: 'Xe chở lúa', icon: '🛻', kg: 1250 },
  { name: 'Con voi', icon: '🐘', kg: 3500 },
  { name: 'Thùng hàng', icon: '📦', kg: 2045 },
];

/** The most blocks of one unit on the scale: ten of a small unit make one of the next. */
export const MAX_BLOCKS = /** @type {Parts} */ ({ tan: 9, ta: 10, yen: 10, kg: 10 });

/** An empty scale. */
export const EMPTY = /** @type {Parts} */ ({ tan: 0, ta: 0, yen: 0, kg: 0 });

/**
 * The blocks on the scale as the book writes them, ten of a unit included:
 * '3 tạ 10 yến'.
 * @param {Parts} parts
 */
export function partsText(parts) {
  const used = MASS_UNITS.filter((u) => parts[u.id] > 0);
  if (used.length === 0) return '0 kg';
  return used.map((u) => `${parts[u.id]} ${u.name}`).join(' ');
}

/**
 * The unit just below `id`, or null under the kilogram.
 * @param {MassUnit['id']} id
 * @returns {MassUnit | null}
 */
export function smallerUnit(id) {
  const i = MASS_UNITS.findIndex((u) => u.id === id);
  return MASS_UNITS[i + 1] ?? null;
}

/**
 * The unit just above `id`, or null above the tấn.
 * @param {MassUnit['id']} id
 * @returns {MassUnit | null}
 */
export function biggerUnit(id) {
  const i = MASS_UNITS.findIndex((u) => u.id === id);
  return i > 0 ? MASS_UNITS[i - 1] : null;
}

/**
 * Whether one block of `id` can be broken into ten of the next unit: there
 * is one, and the next unit has no blocks yet, so the ten fit.
 * @param {Parts} parts
 * @param {MassUnit['id']} id
 */
export function canBreak(parts, id) {
  const small = smallerUnit(id);
  return small !== null && parts[id] > 0 && parts[small.id] === 0;
}

/**
 * One block of `id` broken into ten of the next unit.
 * @param {Parts} parts
 * @param {MassUnit['id']} id
 * @returns {Parts}
 */
export function breakBlock(parts, id) {
  const small = smallerUnit(id);
  if (!small || !canBreak(parts, id)) return parts;
  return { ...parts, [id]: parts[id] - 1, [small.id]: 10 };
}

/**
 * Whether ten blocks of `id` can be joined into one of the next unit up.
 * @param {Parts} parts
 * @param {MassUnit['id']} id
 */
export function canJoin(parts, id) {
  const big = biggerUnit(id);
  return big !== null && parts[id] >= 10 && parts[big.id] < MAX_BLOCKS[big.id];
}

/**
 * Ten blocks of `id` joined into one of the next unit up.
 * @param {Parts} parts
 * @param {MassUnit['id']} id
 * @returns {Parts}
 */
export function joinBlocks(parts, id) {
  const big = biggerUnit(id);
  if (!big || !canJoin(parts, id)) return parts;
  return { ...parts, [id]: parts[id] - 10, [big.id]: parts[big.id] + 1 };
}

/**
 * The sentence for one break or join: '1 tạ = 10 yến'.
 * @param {MassUnit['id']} id the bigger unit
 */
export function swapText(id) {
  const big = MASS_UNITS.find((u) => u.id === id);
  const small = smallerUnit(id);
  if (!big || !small) return '';
  return `1 ${big.name} = 10 ${small.name}`;
}

/**
 * What the scale says against the target, and whether they match.
 * @param {Target} target
 * @param {Parts} parts
 * @returns {{ done: boolean, text: string }}
 */
export function scaleMessage(target, parts) {
  const kg = massTotal(parts);
  const on = `Trên cân: ${partsText(parts)} = ${fmt(kg)} kg.`;
  const what = target.name.toLowerCase();
  if (kg === target.kg) {
    const tens = MASS_UNITS.some((u) => u.id !== 'tan' && parts[u.id] >= 10);
    const tidy = tens ? ` Em gộp 10 khối nhỏ thành 1 khối lớn để viết gọn: ${massText(kg)}.` : '';
    return {
      done: true,
      text: `Đúng rồi! ${on} ${target.name} nặng ${fmt(target.kg)} kg = ${massText(target.kg)}.${tidy}`,
    };
  }
  if (kg < target.kg) {
    return {
      done: false,
      text: `${on} Còn nhẹ hơn ${what} ${fmt(target.kg - kg)} kg. Em thêm khối nhé.`,
    };
  }
  return {
    done: false,
    text: `${on} Nặng hơn ${what} ${fmt(kg - target.kg)} kg. Em bớt khối nhé.`,
  };
}
