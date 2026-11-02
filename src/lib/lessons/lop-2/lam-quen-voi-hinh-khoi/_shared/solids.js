/**
 * The solids of this chapter, khối trụ and khối cầu, next to the khối hộp chữ
 * nhật and khối lập phương a child already knows, with the everyday things
 * that have their form. Pure data; `solid-figure.svelte` and
 * `thing-figure.svelte` draw them.
 */

/** @typedef {'tru' | 'cau' | 'hop-chu-nhat' | 'lap-phuong'} SolidKind */

/** Every solid, the two of this chapter first. */
export const SOLID_KINDS = /** @type {const} */ (['tru', 'cau', 'hop-chu-nhat', 'lap-phuong']);

/** Names as the book writes them. */
export const SOLID_NAMES = /** @type {const} */ ({
  tru: 'khối trụ',
  cau: 'khối cầu',
  'hop-chu-nhat': 'khối hộp chữ nhật',
  'lap-phuong': 'khối lập phương',
});

/**
 * "Khối trụ" with a capital letter, for buttons and options.
 * @param {SolidKind} kind
 */
export function solidTitle(kind) {
  const name = SOLID_NAMES[kind];
  return name[0].toUpperCase() + name.slice(1);
}

/** @typedef {{ id: string, name: string, kind: SolidKind }} Thing */

/**
 * Everyday things and the solid each one has the form of.
 * @type {readonly Thing[]}
 */
export const THINGS = [
  { id: 'lon-nuoc', name: 'lon nước ngọt', kind: 'tru' },
  { id: 'lon-sua', name: 'lon sữa', kind: 'tru' },
  { id: 'ong-nuoc', name: 'ống nước', kind: 'tru' },
  { id: 'khuc-go', name: 'khúc gỗ', kind: 'tru' },
  { id: 'cuc-pin', name: 'cục pin', kind: 'tru' },
  { id: 'coc-nuoc', name: 'cốc nước', kind: 'tru' },
  { id: 'qua-bong', name: 'quả bóng', kind: 'cau' },
  { id: 'qua-cam', name: 'quả cam', kind: 'cau' },
  { id: 'qua-dia-cau', name: 'quả địa cầu', kind: 'cau' },
  { id: 'vien-bi', name: 'viên bi', kind: 'cau' },
  { id: 'den-long', name: 'đèn lồng tròn', kind: 'cau' },
  { id: 'qua-buoi', name: 'quả bưởi', kind: 'cau' },
  { id: 'hop-qua', name: 'hộp quà', kind: 'hop-chu-nhat' },
  { id: 'quyen-sach', name: 'quyển sách', kind: 'hop-chu-nhat' },
  { id: 'xuc-xac', name: 'con xúc xắc', kind: 'lap-phuong' },
  { id: 'rubik', name: 'khối rubik', kind: 'lap-phuong' },
];

/**
 * The sentence that says which solid a thing has the form of.
 * @param {Thing} thing
 */
export function thingSentence(thing) {
  const name = thing.name[0].toUpperCase() + thing.name.slice(1);
  return `${name} có dạng ${SOLID_NAMES[thing.kind]}.`;
}

/**
 * The boxes in a stack whose rows hold 1, 2, 3, ... boxes from the top.
 * @param {number} rows
 */
export function stackTotal(rows) {
  return (rows * (rows + 1)) / 2;
}

/**
 * The addition that counts such a stack: "1 + 2 + 3 = 6".
 * @param {number} rows
 */
export function stackSum(rows) {
  if (rows === 1) return '1';
  const parts = Array.from({ length: rows }, (_, i) => i + 1);
  return `${parts.join(' + ')} = ${stackTotal(rows)}`;
}
