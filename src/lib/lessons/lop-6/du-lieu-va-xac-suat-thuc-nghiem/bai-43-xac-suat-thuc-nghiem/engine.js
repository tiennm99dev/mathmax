/**
 * Experimental probability of die events: roll a die many times, count how
 * often an event happened, and follow the ratio n(A)/n as n grows.
 */

/** Most rolls one simulation keeps. */
export const MAX_ROLLS = 5000;

/** Trial counts at which the widget reports the ratio, to show it settling. */
export const CHECKPOINTS = [10, 50, 100, 500, 1000, 5000];

/**
 * @typedef {object} DieEvent
 * @property {string} id
 * @property {string} text the event, as the book writes it
 * @property {number[]} faces the faces that make it happen
 */

/** @type {DieEvent[]} */
export const EVENTS = [
  { id: 'mat-6', text: 'Xuất hiện mặt 6 chấm', faces: [6] },
  { id: 'chan', text: 'Số chấm xuất hiện là số chẵn', faces: [2, 4, 6] },
  { id: 'lon-hon-4', text: 'Số chấm xuất hiện lớn hơn 4', faces: [5, 6] },
];

/**
 * A die roll from 1 to 6.
 * @param {() => number} rand numbers in [0, 1)
 */
export function roll(rand) {
  return Math.min(6, 1 + Math.floor(rand() * 6));
}

/**
 * `count` more rolls appended to `faces`, never past MAX_ROLLS.
 * @param {number[]} faces
 * @param {number} count
 * @param {() => number} rand
 */
export function addRolls(faces, count, rand) {
  const room = Math.max(0, Math.min(count, MAX_ROLLS - faces.length));
  const out = faces.slice();
  for (let k = 0; k < room; k++) out.push(roll(rand));
  return out;
}

/**
 * How many times each face came up, faces 1 to 6.
 * @param {number[]} faces
 */
export function faceCounts(faces) {
  const counts = [0, 0, 0, 0, 0, 0];
  for (const f of faces) counts[f - 1]++;
  return counts;
}

/**
 * n(A): how many of the rolls made the event happen.
 * @param {number[]} faces
 * @param {DieEvent} event
 */
export function eventCount(faces, event) {
  return faces.filter((f) => event.faces.includes(f)).length;
}

/**
 * The experimental probability n(A)/n after each roll: entry k is the ratio
 * after k + 1 rolls.
 * @param {number[]} faces
 * @param {DieEvent} event
 */
export function runningRatio(faces, event) {
  let hits = 0;
  return faces.map((f, k) => {
    if (event.faces.includes(f)) hits++;
    return hits / (k + 1);
  });
}

/**
 * At most `limit` points [n, ratio] of a running ratio for drawing, always
 * keeping the first and the last.
 * @param {number[]} ratios
 * @param {number} [limit]
 * @returns {Array<[number, number]>}
 */
export function samplePoints(ratios, limit = 240) {
  const n = ratios.length;
  if (n <= limit) return ratios.map((r, k) => [k + 1, r]);
  /** @type {Array<[number, number]>} */
  const out = [];
  for (let j = 0; j < limit; j++) {
    const k = Math.round((j * (n - 1)) / (limit - 1));
    out.push([k + 1, ratios[k]]);
  }
  return out;
}

/**
 * The largest change of the ratio over the last `window` rolls: small when
 * the ratio has settled.
 * @param {number[]} ratios
 * @param {number} window
 */
export function spread(ratios, window) {
  const tail = ratios.slice(-window);
  if (tail.length === 0) return 0;
  return Math.max(...tail) - Math.min(...tail);
}
