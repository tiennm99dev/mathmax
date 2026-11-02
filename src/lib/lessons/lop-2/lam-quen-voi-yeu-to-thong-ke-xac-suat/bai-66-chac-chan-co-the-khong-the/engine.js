/**
 * The ball box: balls in three colours, one colour wanted, and whether drawing
 * one ball can give that colour.
 */

export const COLORS = /** @type {const} */ ([
  { id: 'xanh', name: 'xanh', fill: '#2563eb', mark: 'X', ink: '#ffffff' },
  { id: 'do', name: 'đỏ', fill: '#dc2626', mark: 'Đ', ink: '#ffffff' },
  { id: 'vang', name: 'vàng', fill: '#facc15', mark: 'V', ink: '#334155' },
]);

/** @typedef {(typeof COLORS)[number]['id']} ColorId */
/** @typedef {'chac-chan' | 'co-the' | 'khong-the'} Possibility */

/** @type {ReadonlyArray<{ value: Possibility, label: string }>} */
export const CHOICES = [
  { value: 'chac-chan', label: 'Chắc chắn' },
  { value: 'co-the', label: 'Có thể' },
  { value: 'khong-the', label: 'Không thể' },
];

/**
 * The three boxes of the lesson: the wanted ball is always blue.
 * @type {ReadonlyArray<{ name: string, balls: readonly ColorId[] }>}
 */
export const PRESETS = [
  { name: 'Hộp của Mai', balls: ['xanh', 'xanh', 'xanh', 'xanh', 'xanh', 'xanh'] },
  { name: 'Hộp của Việt', balls: ['xanh', 'do', 'xanh', 'do', 'do', 'xanh'] },
  { name: 'Hộp của Nam', balls: ['do', 'vang', 'do', 'vang', 'do', 'vang'] },
];

/**
 * The next colour when a ball is tapped.
 * @param {ColorId} id
 * @returns {ColorId}
 */
export function nextColor(id) {
  const i = COLORS.findIndex((c) => c.id === id);
  return COLORS[(i + 1) % COLORS.length].id;
}

/**
 * @param {ColorId} id
 */
export function colorOf(id) {
  return COLORS.find((c) => c.id === id) ?? COLORS[0];
}

/**
 * How possible drawing the wanted colour is.
 * @param {readonly ColorId[]} balls
 * @param {ColorId} wanted
 * @returns {Possibility}
 */
export function possibility(balls, wanted) {
  const hits = balls.filter((b) => b === wanted).length;
  if (hits === 0) return 'khong-the';
  return hits === balls.length ? 'chac-chan' : 'co-the';
}

/**
 * The reason, in a child's words, for a box and a wanted colour.
 * @param {readonly ColorId[]} balls
 * @param {ColorId} wanted
 */
export function reasonText(balls, wanted) {
  const name = colorOf(wanted).name;
  const kind = possibility(balls, wanted);
  if (kind === 'chac-chan') {
    return `Trong hộp toàn bóng ${name}, nên em chắc chắn lấy được bóng ${name}.`;
  }
  if (kind === 'co-the') {
    return `Trong hộp có bóng ${name} và cả bóng màu khác, nên em có thể lấy được bóng ${name}.`;
  }
  return `Trong hộp không có bóng ${name}, nên em không thể lấy được bóng ${name}.`;
}

/**
 * One ball drawn at random; it goes back into the box afterwards.
 * @param {readonly ColorId[]} balls
 * @param {() => number} rand
 * @returns {ColorId}
 */
export function drawBall(balls, rand) {
  return balls[Math.floor(rand() * balls.length)];
}
