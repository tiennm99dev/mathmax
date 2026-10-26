/**
 * The experiments of the outcome-listing widget: each one lists all of its
 * possible outcomes and a few events, and an event picks out the outcomes
 * that favour it. Checking a learner's selection names what is missing and
 * what does not belong.
 */

/**
 * @typedef {object} Outcome
 * @property {string} id
 * @property {string} label short text on the tile, e.g. '5' or 'V3'
 * @property {string} name how the outcome is read out, e.g. 'mặt 5 chấm'
 * @property {number} value the number on the face or card
 * @property {'vang' | 'xanh' | null} color the card colour, when it has one
 */

/**
 * @typedef {object} EventDef
 * @property {string} id
 * @property {string} text the event as the book writes it, in quotes
 * @property {(o: Outcome) => boolean} test
 */

/**
 * @typedef {object} Experiment
 * @property {string} id
 * @property {string} label
 * @property {string} action the action, as one sentence
 * @property {'xuc-xac' | 'the'} look how the tiles are drawn
 * @property {Outcome[]} outcomes
 * @property {EventDef[]} events
 */

/** @param {number} k */
export function isPrime(k) {
  if (k < 2) return false;
  for (let d = 2; d * d <= k; d++) if (k % d === 0) return false;
  return true;
}

/**
 * @param {number} from @param {number} to
 * @param {(k: number) => string} name
 * @returns {Outcome[]}
 */
const numbered = (from, to, name) =>
  Array.from({ length: to - from + 1 }, (_, i) => ({
    id: String(from + i),
    label: String(from + i),
    name: name(from + i),
    value: from + i,
    color: null,
  }));

/** @type {Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'xuc-xac',
    label: 'Gieo xúc xắc',
    action: 'Gieo một con xúc xắc cân đối và quan sát số chấm xuất hiện.',
    look: 'xuc-xac',
    outcomes: numbered(1, 6, (k) => `mặt ${k} chấm`),
    events: [
      { id: 'nguyen-to', text: 'Số chấm xuất hiện là số nguyên tố', test: (o) => isPrime(o.value) },
      { id: 'chan', text: 'Số chấm xuất hiện là số chẵn', test: (o) => o.value % 2 === 0 },
      { id: 'lon-hon-4', text: 'Số chấm xuất hiện lớn hơn 4', test: (o) => o.value > 4 },
      { id: 'chia-3', text: 'Số chấm xuất hiện chia hết cho 3', test: (o) => o.value % 3 === 0 },
      { id: 'nho-hon-7', text: 'Số chấm xuất hiện nhỏ hơn 7', test: (o) => o.value < 7 },
    ],
  },
  {
    id: 'the-so',
    label: 'Rút thẻ số',
    action: 'Rút ngẫu nhiên một tấm thẻ từ hộp có 12 tấm thẻ ghi các số 1; 2; ...; 12.',
    look: 'the',
    outcomes: numbered(1, 12, (k) => `thẻ số ${k}`),
    events: [
      { id: 'chia-3', text: 'Rút được thẻ ghi số chia hết cho 3', test: (o) => o.value % 3 === 0 },
      { id: 'nguyen-to', text: 'Rút được thẻ ghi số nguyên tố', test: (o) => isPrime(o.value) },
      { id: 'uoc-12', text: 'Rút được thẻ ghi số là ước của 12', test: (o) => 12 % o.value === 0 },
      {
        id: 'le-lon-5',
        text: 'Rút được thẻ ghi số lẻ lớn hơn 5',
        test: (o) => o.value % 2 === 1 && o.value > 5,
      },
      { id: 'lon-hon-12', text: 'Rút được thẻ ghi số lớn hơn 12', test: (o) => o.value > 12 },
    ],
  },
  {
    id: 'the-mau',
    label: 'Thẻ hai màu',
    action:
      'Hộp có 5 tấm thẻ màu vàng ghi số 1 đến 5 và 3 tấm thẻ màu xanh ghi số 1 đến 3. Rút ngẫu nhiên một tấm thẻ.',
    look: 'the',
    outcomes: [
      ...[1, 2, 3, 4, 5].map((k) => ({
        id: `V${k}`,
        label: `V${k}`,
        name: `thẻ vàng số ${k}`,
        value: k,
        color: /** @type {const} */ ('vang'),
      })),
      ...[1, 2, 3].map((k) => ({
        id: `X${k}`,
        label: `X${k}`,
        name: `thẻ xanh số ${k}`,
        value: k,
        color: /** @type {const} */ ('xanh'),
      })),
    ],
    events: [
      { id: 'xanh', text: 'Rút được thẻ màu xanh', test: (o) => o.color === 'xanh' },
      { id: 'so-2', text: 'Rút được thẻ ghi số 2', test: (o) => o.value === 2 },
      {
        id: 'vang-le',
        text: 'Rút được thẻ màu vàng ghi số lẻ',
        test: (o) => o.color === 'vang' && o.value % 2 === 1,
      },
      { id: 'lon-hon-3', text: 'Rút được thẻ ghi số lớn hơn 3', test: (o) => o.value > 3 },
    ],
  },
];

/**
 * The outcomes that favour an event, in listing order.
 * @param {Experiment} exp @param {EventDef} event
 * @returns {Outcome[]}
 */
export function favourable(exp, event) {
  return exp.outcomes.filter(event.test);
}

/**
 * Compares the outcomes a learner picked with the favourable ones.
 * @param {Experiment} exp @param {EventDef} event @param {Iterable<string>} picked ids
 * @returns {{ correct: boolean, missing: Outcome[], extra: Outcome[] }}
 */
export function checkPicked(exp, event, picked) {
  const chosen = new Set(picked);
  const missing = exp.outcomes.filter((o) => event.test(o) && !chosen.has(o.id));
  const extra = exp.outcomes.filter((o) => !event.test(o) && chosen.has(o.id));
  return { correct: missing.length === 0 && extra.length === 0, missing, extra };
}

/**
 * Pip positions of a die face on a 0..1 square, the usual layout.
 * @param {number} k 1 to 6
 * @returns {Array<[number, number]>}
 */
export function pips(k) {
  const a = 0.27;
  const m = 0.5;
  const b = 0.73;
  /** @type {Record<number, Array<[number, number]>>} */
  const faces = {
    1: [[m, m]],
    2: [
      [a, a],
      [b, b],
    ],
    3: [
      [a, a],
      [m, m],
      [b, b],
    ],
    4: [
      [a, a],
      [b, a],
      [a, b],
      [b, b],
    ],
    5: [
      [a, a],
      [b, a],
      [m, m],
      [a, b],
      [b, b],
    ],
    6: [
      [a, a],
      [b, a],
      [a, m],
      [b, m],
      [a, b],
      [b, b],
    ],
  };
  return faces[k] ?? [];
}
