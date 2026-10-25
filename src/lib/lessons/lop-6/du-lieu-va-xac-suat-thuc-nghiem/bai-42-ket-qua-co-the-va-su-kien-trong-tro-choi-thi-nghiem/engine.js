/**
 * Possible outcomes and events of three chance experiments: tossing a coin,
 * rolling a die and taking a ball from a box. An event is described by the
 * test it puts to an outcome; it happens exactly when the outcome obtained
 * passes that test.
 */

/**
 * @typedef {object} ChanceEvent
 * @property {string} text the event as the book writes it, in quotes
 * @property {(value: number) => boolean} test whether an outcome makes it happen
 */

/**
 * @typedef {object} Experiment
 * @property {string} id
 * @property {string} name what is done, as a button label
 * @property {string} action the sentence describing one trial
 * @property {string[]} outcomes the possible outcomes, in book order
 * @property {number[]} values the number each outcome stands for (dots, side, colour index)
 * @property {ChanceEvent[]} events
 */

const isPrime = (/** @type {number} */ n) => n === 2 || n === 3 || n === 5;

/** @type {Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'dong-xu',
    name: 'Tung đồng xu',
    action: 'Tung một đồng xu',
    outcomes: ['Mặt sấp (S)', 'Mặt ngửa (N)'],
    values: [0, 1],
    events: [
      { text: 'Mặt xuất hiện là mặt ngửa', test: (v) => v === 1 },
      { text: 'Mặt xuất hiện là mặt sấp', test: (v) => v === 0 },
    ],
  },
  {
    id: 'xuc-xac',
    name: 'Gieo xúc xắc',
    action: 'Gieo một con xúc xắc',
    outcomes: ['1 chấm', '2 chấm', '3 chấm', '4 chấm', '5 chấm', '6 chấm'],
    values: [1, 2, 3, 4, 5, 6],
    events: [
      { text: 'Số chấm xuất hiện là số chẵn', test: (v) => v % 2 === 0 },
      { text: 'Số chấm xuất hiện là số nguyên tố', test: isPrime },
      { text: 'Số chấm xuất hiện lớn hơn 4', test: (v) => v > 4 },
      { text: 'Số chấm xuất hiện chia hết cho 3', test: (v) => v % 3 === 0 },
    ],
  },
  {
    id: 'hop-bong',
    name: 'Lấy bóng',
    action: 'Lấy ngẫu nhiên một quả bóng từ hộp có bốn quả bóng xanh, đỏ, vàng, trắng',
    outcomes: ['Bóng xanh', 'Bóng đỏ', 'Bóng vàng', 'Bóng trắng'],
    values: [0, 1, 2, 3],
    events: [
      { text: 'Lấy được bóng đỏ', test: (v) => v === 1 },
      { text: 'Không lấy được bóng xanh', test: (v) => v !== 0 },
      { text: 'Lấy được bóng xanh hoặc bóng vàng', test: (v) => v === 0 || v === 2 },
    ],
  },
];

/**
 * Whether an event happens when the outcome at `index` comes up.
 * @param {Experiment} exp
 * @param {number} event index into `exp.events`
 * @param {number} index index into `exp.outcomes`
 */
export function occurs(exp, event, index) {
  return exp.events[event].test(exp.values[index]);
}

/**
 * The outcomes that make an event happen.
 * @param {Experiment} exp
 * @param {number} event
 * @returns {string[]}
 */
export function favourable(exp, event) {
  return exp.outcomes.filter((_, i) => occurs(exp, event, i));
}

/**
 * An outcome's name inside a sentence: only the first letter is lowered, so
 * the symbols S and N keep their capitals ("mặt ngửa (N)").
 * @param {Experiment} exp
 * @param {number} index
 */
export function outcomeInText(exp, index) {
  const name = exp.outcomes[index];
  return name.charAt(0).toLowerCase() + name.slice(1);
}

/**
 * Why an event did or did not happen for the outcome obtained, in words.
 * @param {Experiment} exp
 * @param {number} event
 * @param {number} index
 */
export function explain(exp, event, index) {
  const yes = occurs(exp, event, index);
  const list = exp.outcomes
    .map((_, i) => i)
    .filter((i) => occurs(exp, event, i))
    .map((i) => outcomeInText(exp, i))
    .join(', ');
  const got = outcomeInText(exp, index);
  return yes
    ? `"${exp.events[event].text}" xảy ra: kết quả ${got} nằm trong các kết quả ${list}.`
    : `"${exp.events[event].text}" không xảy ra: sự kiện chỉ xảy ra với ${list}, còn kết quả là ${got}.`;
}

/**
 * The learner's marks checked against the outcome: for each event, true when
 * marked right, false when marked wrong, null when not marked.
 * @param {Experiment} exp
 * @param {number} index outcome obtained
 * @param {Array<boolean | null>} marks true = "xảy ra", false = "không xảy ra"
 * @returns {Array<boolean | null>}
 */
export function grade(exp, index, marks) {
  return exp.events.map((_, e) =>
    marks[e] === null || marks[e] === undefined ? null : marks[e] === occurs(exp, e, index),
  );
}

/**
 * A random outcome index.
 * @param {Experiment} exp
 * @param {() => number} rand numbers in [0, 1)
 */
export function trial(exp, rand) {
  return Math.min(exp.outcomes.length - 1, Math.floor(rand() * exp.outcomes.length));
}
