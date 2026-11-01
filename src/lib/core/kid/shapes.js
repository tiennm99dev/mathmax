/**
 * The four plane shapes a grade 1 child meets (hình vuông, hình tròn, hình
 * tam giác, hình chữ nhật), the two solids (khối lập phương, khối hộp chữ
 * nhật) and the everyday objects that have their form. Pure data and
 * geometry for `shape-figure.svelte` and `object-figure.svelte`; no DOM.
 */

/** @typedef {'vuong' | 'tron' | 'tam-giac' | 'chu-nhat'} ShapeKind */
/** @typedef {'lap-phuong' | 'hop-chu-nhat'} SolidKind */
/** @typedef {ShapeKind | SolidKind} FigureKind */

/** The four shapes, in the book's order. */
export const SHAPES = /** @type {const} */ (['vuong', 'tron', 'tam-giac', 'chu-nhat']);

/** Vietnamese name of each shape. */
export const SHAPE_NAMES = /** @type {const} */ ({
  vuong: 'hình vuông',
  tron: 'hình tròn',
  'tam-giac': 'hình tam giác',
  'chu-nhat': 'hình chữ nhật',
});

/** Vietnamese name of each solid. */
export const SOLID_NAMES = /** @type {const} */ ({
  'lap-phuong': 'khối lập phương',
  'hop-chu-nhat': 'khối hộp chữ nhật',
});

/** Vietnamese name of every shape and solid. */
export const FIGURE_NAMES = /** @type {const} */ ({ ...SHAPE_NAMES, ...SOLID_NAMES });

/**
 * Whether a kind is a solid, drawn with its front, top and side faces.
 * @param {FigureKind} kind
 * @returns {kind is SolidKind}
 */
export function isSolid(kind) {
  return kind === 'lap-phuong' || kind === 'hop-chu-nhat';
}

/** One short sentence a child hears about how each shape looks. */
export const SHAPE_LOOKS = /** @type {const} */ ({
  vuong: 'Hình vuông có 4 cạnh dài bằng nhau.',
  tron: 'Hình tròn tròn đều, không có cạnh nào.',
  'tam-giac': 'Hình tam giác có 3 cạnh.',
  'chu-nhat': 'Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn.',
});

/**
 * Name with a capital first letter, for bin labels and headings.
 * @param {ShapeKind} kind
 */
export function shapeTitle(kind) {
  const name = SHAPE_NAMES[kind];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * @typedef {'dong-ho' | 'dong-xu' | 'cai-dia' | 'banh-chung' | 'cua-so' | 'vien-gach'
 *   | 'bien-bao' | 'co-duoi-nheo' | 'e-ke' | 'quyen-vo' | 'cua-ra-vao' | 'la-co'} ObjectId
 */

/** @typedef {{ id: ObjectId, name: string, shape: ShapeKind, part: string }} ShapeObject */

/**
 * Everyday objects, three for each shape. `part` names the face that has the
 * shape, so a sentence reads "Mặt đồng hồ có dạng hình tròn."
 * @type {readonly ShapeObject[]}
 */
export const OBJECTS = [
  { id: 'dong-ho', name: 'đồng hồ', shape: 'tron', part: 'Mặt đồng hồ' },
  { id: 'dong-xu', name: 'đồng xu', shape: 'tron', part: 'Mặt đồng xu' },
  { id: 'cai-dia', name: 'cái đĩa', shape: 'tron', part: 'Cái đĩa' },
  { id: 'banh-chung', name: 'bánh chưng', shape: 'vuong', part: 'Mặt bánh chưng' },
  { id: 'cua-so', name: 'ô cửa sổ', shape: 'vuong', part: 'Ô cửa sổ' },
  { id: 'vien-gach', name: 'viên gạch hoa', shape: 'vuong', part: 'Mặt viên gạch hoa' },
  { id: 'bien-bao', name: 'biển báo', shape: 'tam-giac', part: 'Biển báo nguy hiểm' },
  { id: 'co-duoi-nheo', name: 'cờ đuôi nheo', shape: 'tam-giac', part: 'Lá cờ đuôi nheo' },
  { id: 'e-ke', name: 'thước ê ke', shape: 'tam-giac', part: 'Thước ê ke' },
  { id: 'quyen-vo', name: 'quyển vở', shape: 'chu-nhat', part: 'Bìa quyển vở' },
  { id: 'cua-ra-vao', name: 'cánh cửa', shape: 'chu-nhat', part: 'Cánh cửa ra vào' },
  { id: 'la-co', name: 'lá cờ Tổ quốc', shape: 'chu-nhat', part: 'Lá cờ Tổ quốc' },
];

/**
 * The sentence that says which shape an object has.
 * @param {ShapeObject} object
 */
export function objectSentence(object) {
  return `${object.part} có dạng ${SHAPE_NAMES[object.shape]}.`;
}

/**
 * How one shape or solid is drawn: its kind, a fill colour, a size factor (1
 * fills most of the 100 × 100 canvas), a turn in degrees and, for triangles
 * and rectangles, a variant (0, 1 or 2) that changes its proportions.
 * @typedef {{ kind: FigureKind, color: string, size: number, turn: number, variant: number }} Figure
 */

/**
 * A figure with the plain look of a picture card: no turn, the first
 * variant, a colour of its own per kind.
 * @param {FigureKind} kind
 * @param {number} [size] 1.1 for a shape and 1 for a solid unless given
 * @returns {Figure}
 */
export function plainFigure(kind, size = isSolid(kind) ? 1 : 1.1) {
  return { kind, color: PLAIN_COLORS[kind], size, turn: 0, variant: 0 };
}

/** The colour of each kind in `plainFigure`. */
export const PLAIN_COLORS = /** @type {const} */ ({
  vuong: '#60a5fa',
  tron: '#f59e0b',
  'tam-giac': '#34d399',
  'chu-nhat': '#f472b6',
  'lap-phuong': '#a78bfa',
  'hop-chu-nhat': '#fb923c',
});

/** Kid-friendly fill colours. */
export const COLORS = /** @type {const} */ ([
  '#f87171',
  '#fbbf24',
  '#34d399',
  '#60a5fa',
  '#a78bfa',
  '#f472b6',
]);

/** Colour names, read to screen readers with the shape. */
export const COLOR_NAMES = /** @type {const} */ ([
  'màu đỏ',
  'màu vàng',
  'màu xanh lá',
  'màu xanh dương',
  'màu tím',
  'màu hồng',
]);

/**
 * Accessible description of a figure, such as "hình tam giác màu đỏ".
 * @param {Figure} figure
 */
export function figureLabel(figure) {
  const at = COLORS.indexOf(/** @type {(typeof COLORS)[number]} */ (figure.color));
  const name = FIGURE_NAMES[figure.kind];
  return at === -1 ? name : `${name} ${COLOR_NAMES[at]}`;
}

/**
 * Polygon corners (before the turn) of a figure on the 100 × 100 canvas,
 * centred on (50, 50); null for a circle or a solid.
 * @param {Figure} figure
 * @returns {{ x: number, y: number }[] | null}
 */
export function figureCorners(figure) {
  const s = figure.size;
  const box = (/** @type {number} */ w, /** @type {number} */ h) => [
    { x: 50 - w / 2, y: 50 - h / 2 },
    { x: 50 + w / 2, y: 50 - h / 2 },
    { x: 50 + w / 2, y: 50 + h / 2 },
    { x: 50 - w / 2, y: 50 + h / 2 },
  ];
  if (figure.kind === 'tron' || isSolid(figure.kind)) return null;
  if (figure.kind === 'vuong') return box(62 * s, 62 * s);
  if (figure.kind === 'chu-nhat') {
    const [w, h] = [
      [84, 46],
      [80, 36],
      [70, 44],
    ][figure.variant % 3];
    return box(w * s, h * s);
  }
  const triangles = [
    // Equal sides.
    [
      { x: 50, y: 14 },
      { x: 90, y: 82 },
      { x: 10, y: 82 },
    ],
    // A right angle at the bottom left.
    [
      { x: 16, y: 14 },
      { x: 86, y: 84 },
      { x: 16, y: 84 },
    ],
    // Low and wide.
    [
      { x: 38, y: 26 },
      { x: 92, y: 76 },
      { x: 8, y: 76 },
    ],
  ][figure.variant % 3];
  return triangles.map((p) => ({ x: 50 + (p.x - 50) * s, y: 50 + (p.y - 50) * s }));
}

/**
 * Radius of a circle figure on the 100 × 100 canvas.
 * @param {Figure} figure
 */
export function circleRadius(figure) {
  return 36 * figure.size;
}

/**
 * The front, top and side faces of a solid on the 100 × 100 canvas, as
 * polygon `points` strings: a cube or a box seen a little from above and
 * the right, scaled by the figure's size about the centre.
 * @param {Figure} figure
 * @returns {{ front: string, top: string, side: string } | null}
 */
export function solidFaces(figure) {
  if (!isSolid(figure.kind)) return null;
  const [x, y, w, h, dx, dy] =
    figure.kind === 'lap-phuong' ? [14, 34, 56, 56, 20, 20] : [6, 46, 72, 44, 18, 16];
  const s = figure.size;
  const p = (/** @type {number} */ px, /** @type {number} */ py) =>
    `${50 + (px - 50) * s},${50 + (py - 50) * s}`;
  return {
    front: [p(x, y), p(x + w, y), p(x + w, y + h), p(x, y + h)].join(' '),
    top: [p(x, y), p(x + dx, y - dy), p(x + w + dx, y - dy), p(x + w, y)].join(' '),
    side: [p(x + w, y), p(x + w + dx, y - dy), p(x + w + dx, y + h - dy), p(x + w, y + h)].join(
      ' ',
    ),
  };
}
