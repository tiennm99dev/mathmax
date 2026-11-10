/**
 * The lucky wheel: equal cells painted in up to three colours, an event
 * "the arrow stops on colour X", and whether that event is certain, possible
 * or impossible.
 */

export const COLORS = /** @type {const} */ ([
  { id: 'do', name: 'đỏ', fill: '#dc2626' },
  { id: 'xanh', name: 'xanh', fill: '#2563eb' },
  { id: 'vang', name: 'vàng', fill: '#ca8a04' },
]);

/** @typedef {(typeof COLORS)[number]['id']} ColorId */
/** @typedef {'chac-chan' | 'co-the' | 'khong-the'} Possibility */

/** @type {ReadonlyArray<{ value: Possibility, label: string }>} */
export const CHOICES = [
  { value: 'chac-chan', label: 'Chắc chắn' },
  { value: 'co-the', label: 'Có thể' },
  { value: 'khong-the', label: 'Không thể' },
];

export const MIN_CELLS = 2;
export const MAX_CELLS = 8;

/**
 * Ready wheels: one colour, two colours, three colours.
 * @type {ReadonlyArray<{ name: string, cells: readonly ColorId[] }>}
 */
export const PRESETS = [
  { name: 'Toàn ô đỏ', cells: ['do', 'do', 'do', 'do'] },
  { name: 'Đỏ và xanh', cells: ['do', 'xanh', 'do', 'xanh', 'do', 'xanh'] },
  { name: 'Ba màu', cells: ['do', 'xanh', 'vang', 'do', 'xanh', 'vang'] },
];

/**
 * @param {ColorId} id
 */
export function colorOf(id) {
  return COLORS.find((c) => c.id === id) ?? COLORS[0];
}

/**
 * The next colour when a cell is tapped.
 * @param {ColorId} id
 * @returns {ColorId}
 */
export function nextColor(id) {
  const i = COLORS.findIndex((c) => c.id === id);
  return COLORS[(i + 1) % COLORS.length].id;
}

/**
 * The wheel with `n` cells: extra cells take the colours in turn, and cells
 * past `n` go.
 * @param {readonly ColorId[]} cells
 * @param {number} n
 * @returns {ColorId[]}
 */
export function resize(cells, n) {
  const size = Math.max(MIN_CELLS, Math.min(MAX_CELLS, n));
  return Array.from({ length: size }, (_, i) => cells[i] ?? COLORS[i % COLORS.length].id);
}

/**
 * How possible it is for the arrow to stop on colour `wanted`.
 * @param {readonly ColorId[]} cells
 * @param {ColorId} wanted
 * @returns {Possibility}
 */
export function possibility(cells, wanted) {
  const hits = cells.filter((c) => c === wanted).length;
  if (hits === 0) return 'khong-the';
  return hits === cells.length ? 'chac-chan' : 'co-the';
}

/**
 * The colours the arrow can stop on, in the order of `COLORS`.
 * @param {readonly ColorId[]} cells
 * @returns {ColorId[]}
 */
export function outcomes(cells) {
  return COLORS.map((c) => c.id).filter((id) => cells.includes(id));
}

/**
 * Every event that can happen, as a sentence: "Kim có thể dừng ở ô đỏ hoặc ô xanh."
 * @param {readonly ColorId[]} cells
 */
export function outcomesText(cells) {
  const names = outcomes(cells).map((id) => `ô ${colorOf(id).name}`);
  if (names.length === 1) return `Kim chỉ có thể dừng ở ${names[0]}.`;
  return `Kim có thể dừng ở ${names.slice(0, -1).join(', ')} hoặc ${names[names.length - 1]}.`;
}

/**
 * The reason, in a child's words, for a wheel and a wanted colour.
 * @param {readonly ColorId[]} cells
 * @param {ColorId} wanted
 */
export function reasonText(cells, wanted) {
  const name = colorOf(wanted).name;
  const kind = possibility(cells, wanted);
  if (kind === 'chac-chan') {
    return `Mọi ô đều màu ${name}, nên kim chắc chắn dừng ở ô ${name}.`;
  }
  if (kind === 'co-the') {
    return `Vòng quay có ô ${name} và cả ô màu khác, nên kim có thể dừng ở ô ${name}, cũng có thể không.`;
  }
  return `Vòng quay không có ô ${name} nào, nên kim không thể dừng ở ô ${name}.`;
}

/**
 * How many times the arrow stopped on each colour, from the counts per cell.
 * @param {readonly ColorId[]} cells
 * @param {readonly number[]} counts
 * @returns {Record<ColorId, number>}
 */
export function countsByColor(cells, counts) {
  /** @type {Record<ColorId, number>} */
  const out = { do: 0, xanh: 0, vang: 0 };
  cells.forEach((c, i) => (out[c] += counts[i] ?? 0));
  return out;
}
