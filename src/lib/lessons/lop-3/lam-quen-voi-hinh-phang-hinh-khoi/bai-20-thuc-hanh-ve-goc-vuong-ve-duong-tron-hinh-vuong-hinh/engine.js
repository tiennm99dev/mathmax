/**
 * The lesson's drawing board. A tool has two grid handles and gives a draft:
 * a right angle from a set square, a circle from a compass, a rectangle or a
 * square from two opposite corners. "Vẽ" stamps the draft. Also the book's
 * flower of three circles and the tally of what has been drawn. All lengths
 * are in grid cells. Pure and DOM-free.
 */

/** Board size in cells, SVG units per cell and the space round the grid. */
export const COLS = 14;
export const ROWS = 12;
export const CELL = 26;
export const PAD = 20;

/** @typedef {'goc' | 'tron' | 'chu-nhat' | 'vuong'} Tool */
/** @typedef {{ x: number, y: number }} Pt */

/**
 * A drawn thing.
 * @typedef {{ kind: 'goc', corner: Pt, p: Pt, q: Pt }
 *   | { kind: 'tron', centre: Pt, radius: number }
 *   | { kind: 'chu-nhat' | 'vuong', left: number, top: number, width: number, height: number }} Item
 */

/** The tools, with what each one needs. */
export const TOOLS = /** @type {const} */ ([
  { id: 'goc', label: 'Góc vuông' },
  { id: 'tron', label: 'Đường tròn' },
  { id: 'chu-nhat', label: 'Hình chữ nhật' },
  { id: 'vuong', label: 'Hình vuông' },
]);

/** Colours to fill a drawn shape with, and their names. */
export const COLOURS = /** @type {const} */ ([
  { value: '#fca5a5', label: 'Đỏ' },
  { value: '#fde68a', label: 'Vàng' },
  { value: '#86efac', label: 'Xanh lá' },
  { value: '#93c5fd', label: 'Xanh dương' },
  { value: 'none', label: 'Không tô' },
]);

/** The radius of the book's flower. */
export const FLOWER_RADIUS = 4;

/**
 * Where a grid point sits on the board.
 * @param {Pt} g
 */
export const toBoard = (g) => ({ x: PAD + g.x * CELL, y: PAD + g.y * CELL });

/**
 * The grid point nearest a board point, kept on the grid.
 * @param {Pt} p
 */
export function toGrid(p) {
  const clampTo = (/** @type {number} */ v, /** @type {number} */ hi) =>
    Math.max(0, Math.min(hi, Math.round(v)));
  return { x: clampTo((p.x - PAD) / CELL, COLS), y: clampTo((p.y - PAD) / CELL, ROWS) };
}

/**
 * Whether a grid point lies on the board.
 * @param {Pt} g
 */
const inside = (g) => g.x >= 0 && g.x <= COLS && g.y >= 0 && g.y <= ROWS;

/**
 * Where the second handle may go for a tool, given the first: a compass opens
 * along the row; a square keeps its sides equal and stays on the board.
 * @param {Tool} tool
 * @param {Pt} a first handle
 * @param {Pt} b asked for
 * @returns {Pt}
 */
export function placeSecond(tool, a, b) {
  if (tool === 'tron') return { x: b.x, y: a.y };
  if (tool !== 'vuong') return b;
  const signX = b.x >= a.x ? 1 : -1;
  const signY = b.y >= a.y ? 1 : -1;
  const roomX = signX > 0 ? COLS - a.x : a.x;
  const roomY = signY > 0 ? ROWS - a.y : a.y;
  const side = Math.min(Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y)), roomX, roomY);
  return { x: a.x + signX * side, y: a.y + signY * side };
}

/**
 * The second side of a right angle: the first side turned a quarter of a turn,
 * as a set square would give it, on whichever side still fits the board.
 * @param {Pt} corner
 * @param {Pt} p end of the first side
 * @returns {Pt | null} null when neither way fits
 */
export function secondSide(corner, p) {
  const dx = p.x - corner.x;
  const dy = p.y - corner.y;
  const left = { x: corner.x + dy, y: corner.y - dx };
  const right = { x: corner.x - dy, y: corner.y + dx };
  if (inside(left)) return left;
  return inside(right) ? right : null;
}

/**
 * What a tool would draw with its handles here, or null when they do not make
 * a figure yet.
 * @param {Tool} tool
 * @param {Pt} a
 * @param {Pt} b
 * @returns {Item | null}
 */
export function draftOf(tool, a, b) {
  if (tool === 'goc') {
    if (a.x === b.x && a.y === b.y) return null;
    const q = secondSide(a, b);
    return q ? { kind: 'goc', corner: a, p: b, q } : null;
  }
  if (tool === 'tron') {
    const radius = Math.abs(b.x - a.x);
    return radius > 0 ? { kind: 'tron', centre: a, radius } : null;
  }
  const width = Math.abs(b.x - a.x);
  const height = Math.abs(b.y - a.y);
  if (width === 0 || height === 0) return null;
  return {
    kind: width === height ? 'vuong' : 'chu-nhat',
    left: Math.min(a.x, b.x),
    top: Math.min(a.y, b.y),
    width,
    height,
  };
}

/**
 * The book's flower: a circle, a second one centred on the first, and a third
 * centred where those two meet, all with the same radius.
 * @param {Pt} [first] centre of the first circle
 * @param {number} [radius]
 * @returns {Item[]}
 */
export function flower(first = { x: 5, y: 8 }, radius = FLOWER_RADIUS) {
  const second = { x: first.x + radius, y: first.y };
  const third = { x: first.x + radius / 2, y: first.y - (radius * Math.sqrt(3)) / 2 };
  return [first, second, third].map((centre) => ({ kind: 'tron', centre, radius }));
}

/**
 * How many of each thing has been drawn.
 * @param {Item[]} items
 */
export function tally(items) {
  /** @type {Record<Tool, number>} */
  const counts = { goc: 0, tron: 0, 'chu-nhat': 0, vuong: 0 };
  for (const item of items) counts[item.kind] += 1;
  return counts;
}

/** How each thing is called in a sentence. */
const NAMES = /** @type {const} */ ({
  goc: 'góc vuông',
  tron: 'đường tròn',
  'chu-nhat': 'hình chữ nhật',
  vuong: 'hình vuông',
});

/**
 * What the tool's draft is, in a short sentence.
 * @param {Tool} tool
 * @param {Item | null} draft
 */
export function draftMessage(tool, draft) {
  if (!draft) {
    return tool === 'goc'
      ? 'Em kéo hai nút cách nhau vừa phải, để ê ke nằm gọn trong bảng.'
      : tool === 'tron'
        ? 'Em kéo nút bút để mở compa, bán kính ít nhất 1 ô.'
        : 'Em kéo hai nút để hai góc đối nhau cách nhau cả hai chiều.';
  }
  switch (draft.kind) {
    case 'goc':
      return 'Ê ke đã đặt xong: đỉnh góc là nút nâu, hai cạnh dọc theo hai cạnh ê ke. Bấm "Vẽ".';
    case 'tron':
      return `Compa mở ${draft.radius} ô: bán kính ${draft.radius} ô, đường kính ${draft.radius * 2} ô. Bấm "Vẽ".`;
    case 'vuong':
      return `Hình vuông: mỗi cạnh ${draft.width} ô. Bấm "Vẽ".`;
    default:
      return `Hình chữ nhật: chiều dài ${Math.max(draft.width, draft.height)} ô, chiều rộng ${Math.min(draft.width, draft.height)} ô. Bấm "Vẽ".`;
  }
}

/**
 * What the child has drawn and what is still missing.
 * @param {Item[]} items
 */
export function progressMessage(items) {
  const counts = tally(items);
  const keys = /** @type {Tool[]} */ (Object.keys(NAMES));
  const missing = keys.filter((k) => counts[k] === 0).map((k) => NAMES[k]);
  if (missing.length === 0) {
    return 'Em đã vẽ đủ góc vuông, đường tròn, hình chữ nhật và hình vuông. Giờ hãy trang trí bức tranh của em!';
  }
  const made = keys.filter((k) => counts[k] > 0).map((k) => `${counts[k]} ${NAMES[k]}`);
  const start = made.length > 0 ? `Em đã vẽ ${made.join(', ')}. ` : '';
  return `${start}Còn thiếu: ${missing.join(', ')}.`;
}

/**
 * Whether the child has drawn one of everything.
 * @param {Item[]} items
 */
export function isComplete(items) {
  return Object.values(tally(items)).every((n) => n > 0);
}
