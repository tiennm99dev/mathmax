/**
 * Angle facts for the grade 4 chapter on angles, the way the book writes
 * them: an angle is named by its vertex and sides ("góc đỉnh O; cạnh OA,
 * OB"), measured in degrees with a protractor, and sorted by comparing it
 * with a right angle (90°). Pure and DOM-free.
 *
 * Directions are whole degrees measured the mathematical way: 0° points
 * right and angles grow counter-clockwise.
 *
 * @typedef {'nhon' | 'vuong' | 'tu' | 'bet'} AngleKind
 * @typedef {'phai' | 'trai'} Side where the side OA lies on the protractor
 */

/** The kinds in the book's order. */
export const KINDS = /** @type {const} */ (['nhon', 'vuong', 'tu', 'bet']);

/** Vietnamese names of the kinds. */
export const KIND_NAME = /** @type {Record<AngleKind, string>} */ ({
  nhon: 'góc nhọn',
  vuong: 'góc vuông',
  tu: 'góc tù',
  bet: 'góc bẹt',
});

/**
 * Kind of an angle by its measure, 0° < m ≤ 180°.
 * @param {number} m
 * @returns {AngleKind}
 */
export function kindOf(m) {
  if (m === 180) return 'bet';
  if (m === 90) return 'vuong';
  return m < 90 ? 'nhon' : 'tu';
}

/**
 * Why an angle of measure `m` is of its kind, compared with 90°.
 * @param {number} m
 */
export function kindWhy(m) {
  switch (kindOf(m)) {
    case 'nhon':
      return `${m}° bé hơn 90°, nên đó là góc nhọn.`;
    case 'vuong':
      return 'Góc có số đo 90° là góc vuông.';
    case 'tu':
      return `${m}° lớn hơn 90° và bé hơn 180°, nên đó là góc tù.`;
    default:
      return 'Góc có số đo 180° bằng hai góc vuông, đó là góc bẹt.';
  }
}

/**
 * The book's name of an angle: "góc đỉnh O; cạnh OA, OB".
 * @param {string} vertex @param {string} p @param {string} q
 */
export function angleName(vertex, p, q) {
  return `góc đỉnh ${vertex}; cạnh ${vertex}${p}, ${vertex}${q}`;
}

/** Vertex first, then the points on the two sides. */
export const NAME_SETS = /** @type {const} */ ([
  ['O', 'A', 'B'],
  ['O', 'M', 'N'],
  ['N', 'M', 'H'],
  ['C', 'A', 'B'],
  ['D', 'A', 'B'],
  ['I', 'K', 'L'],
  ['G', 'S', 'L'],
  ['E', 'P', 'Q'],
]);

/**
 * Direction of the side OB for an angle AOB of measure `m` when the side OA
 * points right (direction 0°) or left (direction 180°).
 * @param {number} m @param {Side} side
 */
export const rayDirection = (m, side) => (side === 'phai' ? m : 180 - m);

/**
 * Measure of the angle AOB from the direction of OB (0° to 180°).
 * @param {number} dir @param {Side} side
 */
export const measureFrom = (dir, side) => (side === 'phai' ? dir : 180 - dir);

/**
 * A pointer direction seen from O folded onto the upper half, where the
 * protractor lies: a direction below the base line goes to the nearer end.
 * @param {number} dir in [0, 360)
 */
export function foldUpper(dir) {
  if (dir <= 180) return dir;
  return dir < 270 ? 180 : 0;
}

/** The step the side OB turns by. */
export const STEP = 5;
/** Smallest measure the side OB can make: the two sides never meet. */
export const MIN = 5;
export const MAX = 180;

/**
 * A measure kept between MIN and MAX on the 5° grid.
 * @param {number} m
 */
export function clampMeasure(m) {
  return Math.min(MAX, Math.max(MIN, Math.round(m / STEP) * STEP));
}

/**
 * The measure the side OB makes when the pointer is in direction `dir`
 * (degrees, [0, 360)) seen from O.
 * @param {number} dir @param {Side} side
 */
export function measureAt(dir, side) {
  return clampMeasure(measureFrom(foldUpper(dir), side));
}

/**
 * The numbers a protractor shows at the side OB: the inner scale has its 0 on
 * the right, the outer scale its 0 on the left.
 * @param {number} m @param {Side} side
 */
export function scaleReadings(m, side) {
  const dir = rayDirection(m, side);
  return { inner: dir, outer: 180 - dir };
}

/**
 * How a screen reader hears a protractor laid on an angle: the two numbers
 * the side OB passes and which scale starts at the side OA, so the child
 * still picks the scale, as a sighted child does.
 * @param {number} m @param {Side} side
 * @param {readonly [string, string, string]} names
 */
export function protractorText(m, side, names) {
  const [o, p, q] = names;
  const { inner, outer } = scaleReadings(m, side);
  const zero = side === 'phai' ? 'trong' : 'ngoài';
  return `Thước đo góc đặt lên ${angleName(o, p, q)}, tâm thước ở đỉnh ${o}. Cạnh ${o}${q} đi qua vạch ${inner} ở vòng số trong và vạch ${outer} ở vòng số ngoài. Vạch 0 của vòng số ${zero} nằm trên cạnh ${o}${p}.`;
}

/**
 * Degree options for a measure `m`: the right one, the reading on the wrong
 * scale (180° − m) when it differs, and near readings, at most four, in
 * increasing order, with their spoken names.
 * @param {number} m
 * @param {number[]} [steps] how far the near readings lie from `m`, tried in
 *   turn (a clock question steps by 30°)
 * @returns {{ options: string[], answer: number, optionLabels: string[] }}
 */
export function degreeOptions(m, steps = [10, -10, 5, -5, 20, -20]) {
  const near = steps.map((d) => m + d).filter((v) => v > 0 && v <= 180 && v !== m && v !== 180 - m);
  const flipped = m !== 90 && m !== 180;
  const wrong = flipped ? [180 - m, near[0], near[1]] : [near[0], near[1], near[2]];
  const values = [m, ...wrong].sort((a, b) => a - b);
  return {
    options: values.map((v) => `${v}°`),
    answer: values.indexOf(m),
    optionLabels: values.map((v) => `${v} độ`),
  };
}

/** The four kinds as option texts, in the book's order. */
export const KIND_OPTIONS = KINDS.map((k) => {
  const name = KIND_NAME[k];
  return name.charAt(0).toUpperCase() + name.slice(1);
});

/**
 * The angle between the two hands of a clock at `h` o'clock sharp (1 to 12),
 * from 0° to 180°.
 * @param {number} h
 */
export function clockAngle(h) {
  const turn = (30 * h) % 360;
  return turn <= 180 ? turn : 360 - turn;
}
