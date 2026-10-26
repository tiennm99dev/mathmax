/**
 * Right triangles built from a pair of data. A right triangle DEF has its
 * right angle at D; the learner sets two data of one congruence case and the
 * board compares the triangle with a given right triangle ABC (right angle
 * at A, B matched with E, C with F).
 */

const RAD = Math.PI / 180;

/** @typedef {'cgv' | 'cgv-gn' | 'ch-gn' | 'ch-cgv'} Case */

/**
 * @typedef {object} CaseInfo
 * @property {Case} id
 * @property {string} name case name as the book words it
 * @property {string} short label on the switch
 * @property {[string, string]} data names of the two data on triangle DEF
 * @property {[string, string]} ref the matching names on triangle ABC
 * @property {[number, number]} given the values of ABC's two data
 * @property {[{ min: number, max: number, step: number, unit: 'cm' | '°' }, { min: number, max: number, step: number, unit: 'cm' | '°' }]} range
 */

/** @type {CaseInfo[]} */
export const CASES = [
  {
    id: 'cgv',
    name: 'hai cạnh góc vuông',
    short: 'Hai cạnh góc vuông',
    data: ['DE', 'DF'],
    ref: ['AB', 'AC'],
    given: [3, 4],
    range: [
      { min: 1, max: 7, step: 0.5, unit: 'cm' },
      { min: 1, max: 7, step: 0.5, unit: 'cm' },
    ],
  },
  {
    id: 'cgv-gn',
    name: 'cạnh góc vuông và góc nhọn kề cạnh ấy',
    short: 'Cạnh góc vuông, góc nhọn kề',
    data: ['DE', 'góc E'],
    ref: ['AB', 'góc B'],
    given: [4, 35],
    range: [
      { min: 1, max: 6, step: 0.5, unit: 'cm' },
      { min: 15, max: 60, step: 1, unit: '°' },
    ],
  },
  {
    id: 'ch-gn',
    name: 'cạnh huyền và góc nhọn',
    short: 'Cạnh huyền, góc nhọn',
    data: ['EF', 'góc E'],
    ref: ['BC', 'góc B'],
    given: [6, 50],
    range: [
      { min: 2, max: 8, step: 0.5, unit: 'cm' },
      { min: 15, max: 75, step: 1, unit: '°' },
    ],
  },
  {
    id: 'ch-cgv',
    name: 'cạnh huyền và cạnh góc vuông',
    short: 'Cạnh huyền, cạnh góc vuông',
    data: ['EF', 'DE'],
    ref: ['BC', 'AB'],
    given: [6.5, 2.5],
    range: [
      { min: 2, max: 8, step: 0.5, unit: 'cm' },
      { min: 1, max: 7, step: 0.5, unit: 'cm' },
    ],
  },
];

/**
 * The two legs of the right triangle that the data of a case give: `e` is
 * the leg next to the vertex E (DE), `f` the leg DF. Null when no right
 * triangle has these data (a leg as long as the hypotenuse or longer).
 * @param {Case} id @param {number} p first datum @param {number} q second datum
 * @returns {{ e: number, f: number } | null}
 */
export function legs(id, p, q) {
  if (id === 'cgv') return { e: p, f: q };
  if (id === 'cgv-gn') return { e: p, f: p * Math.tan(q * RAD) };
  if (id === 'ch-gn') return { e: p * Math.cos(q * RAD), f: p * Math.sin(q * RAD) };
  if (q >= p) return null;
  return { e: q, f: Math.sqrt(p * p - q * q) };
}

/**
 * All sides and acute angles of a right triangle from its legs.
 * @param {{ e: number, f: number }} l
 */
export function measures(l) {
  const E = Math.atan2(l.f, l.e) / RAD;
  return { leg1: l.e, leg2: l.f, hyp: Math.hypot(l.e, l.f), E, F: 90 - E };
}

/**
 * Compares the learner's data with ABC's: which of the two data match, and
 * whether the triangles coincide.
 * @param {CaseInfo} info @param {number} p @param {number} q
 */
export function compare(info, p, q) {
  const ok = [Math.abs(p - info.given[0]) < 1e-9, Math.abs(q - info.given[1]) < 1e-9];
  return { ok, congruent: ok[0] && ok[1] };
}
