/**
 * The solids grade 2 meets and the everyday things that have their form, as
 * the year-end review of geometry asks about them. Pure data.
 */

/** @typedef {'tru' | 'cau' | 'hop-chu-nhat' | 'lap-phuong'} SolidKind */

/** Every solid. */
export const SOLID_KINDS = /** @type {const} */ (['tru', 'cau', 'hop-chu-nhat', 'lap-phuong']);

/** Names as the book writes them. */
export const SOLID_NAMES = /** @type {const} */ ({
  tru: 'khối trụ',
  cau: 'khối cầu',
  'hop-chu-nhat': 'khối hộp chữ nhật',
  'lap-phuong': 'khối lập phương',
});

/** What a screen reader hears for a solid, without its name. */
export const SOLID_LOOKS = /** @type {const} */ ({
  tru: 'thân tròn, hai đầu là hai mặt tròn',
  cau: 'tròn đều về mọi phía',
  'hop-chu-nhat': 'có sáu mặt là hình chữ nhật',
  'lap-phuong': 'có sáu mặt vuông bằng nhau',
});

/**
 * Everyday things and the solid each one has the form of.
 * @type {ReadonlyArray<{ name: string, kind: SolidKind }>}
 */
export const THINGS = [
  { name: 'Lon sữa', kind: 'tru' },
  { name: 'Lon nước ngọt', kind: 'tru' },
  { name: 'Ống nước', kind: 'tru' },
  { name: 'Quả bóng', kind: 'cau' },
  { name: 'Quả cam', kind: 'cau' },
  { name: 'Viên bi', kind: 'cau' },
  { name: 'Hộp quà', kind: 'hop-chu-nhat' },
  { name: 'Quyển sách', kind: 'hop-chu-nhat' },
  { name: 'Con xúc xắc', kind: 'lap-phuong' },
];
