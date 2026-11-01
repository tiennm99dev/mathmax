/**
 * Sharing candies onto plates. The same division sentence answers two
 * questions: share equally among a number of friends ("mỗi bạn mấy cái"), or
 * give each friend a set number ("chia được cho mấy bạn"). `where[i]` is the
 * plate candy i sits on, or null while it waits in the bowl.
 */

/** @typedef {{ mode: 'share', total: number, parts: number }} ShareTask */
/** @typedef {{ mode: 'group', total: number, each: number }} GroupTask */
/** @typedef {ShareTask | GroupTask} Task */
/** @typedef {Array<number | null>} Where */

/** The most candies one plate has room for. */
export const PLATE_ROOM = 6;

/** The plates offered when the question is how many friends get candy. */
export const GROUP_PLATES = 6;

export const NAMES = /** @type {const} */ (['Mai', 'Nam', 'Việt', 'Hà', 'An', 'Lan']);

/** @type {readonly ShareTask[]} */
export const SHARE_TASKS = [
  { mode: 'share', total: 6, parts: 2 },
  { mode: 'share', total: 8, parts: 2 },
  { mode: 'share', total: 10, parts: 5 },
  { mode: 'share', total: 12, parts: 3 },
  { mode: 'share', total: 10, parts: 2 },
  { mode: 'share', total: 8, parts: 4 },
];

/** @type {readonly GroupTask[]} */
export const GROUP_TASKS = [
  { mode: 'group', total: 6, each: 2 },
  { mode: 'group', total: 10, each: 5 },
  { mode: 'group', total: 8, each: 2 },
  { mode: 'group', total: 12, each: 4 },
  { mode: 'group', total: 6, each: 3 },
  { mode: 'group', total: 10, each: 2 },
];

/**
 * How many plates a task shows.
 * @param {Task} task
 */
export const plateCount = (task) => (task.mode === 'share' ? task.parts : GROUP_PLATES);

/**
 * How many candies sit on each plate.
 * @param {Where} where
 * @param {number} plates
 */
export function counts(where, plates) {
  const out = Array.from({ length: plates }, () => 0);
  for (const p of where) if (p !== null) out[p] += 1;
  return out;
}

/**
 * The plate a tap sends a candy to: the emptiest one when sharing, so a
 * round of tapping goes friend by friend; the first unfilled one when giving
 * each friend a set number. Null when no plate fits.
 * @param {Task} task
 * @param {Where} where
 */
export function nextPlate(task, where) {
  const c = counts(where, plateCount(task));
  if (task.mode === 'group') {
    const open = c.findIndex((n) => n < task.each);
    return open === -1 ? null : open;
  }
  const least = c.indexOf(Math.min(...c));
  return c[least] < PLATE_ROOM ? least : null;
}

/**
 * The sentences of a task: the question, the division with its answer, and
 * the multiplication it comes from.
 * @param {Task} task
 */
export function sentences(task) {
  const { total } = task;
  if (task.mode === 'share') {
    const each = total / task.parts;
    return {
      question: `Có ${total} cái kẹo, chia đều cho ${task.parts} bạn. Mỗi bạn được mấy cái?`,
      blank: `${total} : ${task.parts} = ?`,
      division: `${total} : ${task.parts} = ${each}`,
      multiplication: `${each} × ${task.parts} = ${total}`,
      result: `Mỗi bạn được ${each} cái kẹo.`,
    };
  }
  const friends = total / task.each;
  return {
    question: `Có ${total} cái kẹo, mỗi bạn được ${task.each} cái. Chia được cho mấy bạn?`,
    blank: `${total} : ${task.each} = ?`,
    division: `${total} : ${task.each} = ${friends}`,
    multiplication: `${task.each} × ${friends} = ${total}`,
    result: `Chia được cho ${friends} bạn.`,
  };
}

/**
 * Whether the candies are all shared out as the task asks, and what to say.
 * @param {Task} task
 * @param {Where} where
 * @returns {{ done: boolean, text: string }}
 */
export function status(task, where) {
  const c = counts(where, plateCount(task));
  const left = where.filter((p) => p === null).length;
  if (task.mode === 'group' && c.some((n) => n > task.each)) {
    return { done: false, text: `Mỗi bạn chỉ được ${task.each} cái. Em lấy bớt kẹo ra nhé.` };
  }
  if (left > 0) {
    return { done: false, text: `Còn ${left} cái kẹo trong bát. Em chia tiếp nhé.` };
  }
  const short =
    task.mode === 'share' ? c.some((n) => n !== c[0]) : c.some((n) => n > 0 && n < task.each);
  if (short) {
    const want = task.mode === 'share' ? 'phải bằng nhau' : `phải có đủ ${task.each} cái`;
    return { done: false, text: `Hết kẹo rồi, nhưng phần của mỗi bạn ${want}. Em chuyển lại nhé.` };
  }
  const s = sentences(task);
  return { done: true, text: `Đúng rồi! ${s.result} ${s.division}, vì ${s.multiplication}.` };
}

/* Drawing: the bowl on top, the plates below, in a 360-wide picture. */

export const WIDTH = 360;
export const CANDY = 32;
const BOWL_COLUMNS = 6;
const BOWL_CELL = 56;
const BOWL_ROW = 46;
export const BOWL_HEIGHT = 112;
const PLATE_W = 110;
const PLATE_H = 112;
const PLATE_GAP = 10;
const PLATES_TOP = BOWL_HEIGHT + 12;
const SLOT = 34;

/**
 * Where candy `id` waits in the bowl.
 * @param {number} id
 */
export function bowlSpot(id) {
  return {
    x: 12 + (id % BOWL_COLUMNS) * BOWL_CELL + (BOWL_CELL - CANDY) / 2,
    y: 12 + Math.floor(id / BOWL_COLUMNS) * BOWL_ROW,
  };
}

/**
 * The box of plate `p`.
 * @param {number} p
 */
export function plateBox(p) {
  return {
    x: 5 + (p % 3) * (PLATE_W + PLATE_GAP),
    y: PLATES_TOP + Math.floor(p / 3) * (PLATE_H + PLATE_GAP),
    w: PLATE_W,
    h: PLATE_H,
  };
}

/**
 * Where the `slot`-th candy on plate `p` sits.
 * @param {number} p
 * @param {number} slot
 */
export function plateSpot(p, slot) {
  const box = plateBox(p);
  return {
    x: box.x + 4 + (slot % 3) * SLOT,
    y: box.y + 28 + Math.floor(slot / 3) * SLOT + 8,
  };
}

/**
 * How tall the picture is for `plates` plates.
 * @param {number} plates
 */
export const pictureHeight = (plates) => PLATES_TOP + Math.ceil(plates / 3) * (PLATE_H + PLATE_GAP);

/**
 * The plate under a picture point, or null.
 * @param {number} x
 * @param {number} y
 * @param {number} plates
 */
export function plateAt(x, y, plates) {
  for (let p = 0; p < plates; p++) {
    const b = plateBox(p);
    if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return p;
  }
  return null;
}

/**
 * Where candy `id` belongs on the picture.
 * @param {Where} where
 * @param {number} id
 */
export function spotOf(where, id) {
  const p = where[id];
  if (p === null) return bowlSpot(id);
  const slot = where.slice(0, id).filter((q) => q === p).length;
  return plateSpot(p, slot);
}
