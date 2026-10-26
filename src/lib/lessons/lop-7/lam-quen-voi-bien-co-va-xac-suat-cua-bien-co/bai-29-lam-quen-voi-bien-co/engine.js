/**
 * Virtual experiments for "Làm quen với biến cố": each lists its possible
 * outcomes and a few events, and an event's kind (không thể, ngẫu nhiên,
 * chắc chắn) is read off the outcomes that make it happen.
 */

/** @typedef {'khong-the' | 'ngau-nhien' | 'chac-chan'} EventKind */

/**
 * @typedef {object} Outcome
 * @property {number} value the number on the face or card; 0 for a ball
 * @property {string} label how the outcome is written, e.g. '4' or 'xanh'
 */

/**
 * @typedef {object} ChanceEvent
 * @property {string} id
 * @property {string} text the event as the book writes it, in quotes
 * @property {(o: Outcome) => boolean} test whether the outcome makes it happen
 */

/**
 * @typedef {object} Experiment
 * @property {string} id
 * @property {string} label short name for the switch
 * @property {string} setup what is done, in one sentence
 * @property {string} unit what one outcome is called, e.g. 'số chấm'
 * @property {Outcome[]} outcomes every possible outcome, one per equally likely item
 * @property {ChanceEvent[]} events
 */

/** @param {number} n */
const isPrime = (n) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};

/** @param {number[]} values @returns {Outcome[]} */
const numbered = (values) => values.map((value) => ({ value, label: String(value) }));

/** @type {Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'xuc-xac',
    label: 'Gieo xúc xắc',
    setup: 'Gieo một con xúc xắc cân đối và quan sát số chấm xuất hiện.',
    unit: 'số chấm',
    outcomes: numbered([1, 2, 3, 4, 5, 6]),
    events: [
      { id: 'nho-hon-7', text: 'Số chấm xuất hiện nhỏ hơn 7', test: (o) => o.value < 7 },
      { id: 'bang-7', text: 'Số chấm xuất hiện bằng 7', test: (o) => o.value === 7 },
      { id: 'chan', text: 'Số chấm xuất hiện là số chẵn', test: (o) => o.value % 2 === 0 },
      { id: 'lon-hon-4', text: 'Số chấm xuất hiện lớn hơn 4', test: (o) => o.value > 4 },
      { id: 'lon-hon-0', text: 'Số chấm xuất hiện lớn hơn 0', test: (o) => o.value > 0 },
      { id: 'boi-10', text: 'Số chấm xuất hiện là bội của 10', test: (o) => o.value % 10 === 0 },
    ],
  },
  {
    id: 'the-so',
    label: 'Rút thẻ',
    setup:
      'Một hộp có 6 tấm thẻ ghi các số 2; 3; 5; 7; 11; 13. Rút ngẫu nhiên một tấm thẻ và xem số ghi trên thẻ.',
    unit: 'số trên thẻ',
    outcomes: numbered([2, 3, 5, 7, 11, 13]),
    events: [
      { id: 'nguyen-to', text: 'Rút được thẻ ghi số nguyên tố', test: (o) => isPrime(o.value) },
      { id: 'chan', text: 'Rút được thẻ ghi số chẵn', test: (o) => o.value % 2 === 0 },
      {
        id: 'chia-het-4',
        text: 'Rút được thẻ ghi số chia hết cho 4',
        test: (o) => o.value % 4 === 0,
      },
      { id: 'nho-hon-14', text: 'Rút được thẻ ghi số nhỏ hơn 14', test: (o) => o.value < 14 },
      {
        id: 'hai-chu-so',
        text: 'Rút được thẻ ghi số có hai chữ số',
        test: (o) => o.value >= 10 && o.value <= 99,
      },
      {
        id: 'chia-het-6',
        text: 'Rút được thẻ ghi số chia hết cho 6',
        test: (o) => o.value % 6 === 0,
      },
    ],
  },
  {
    id: 'bong',
    label: 'Lấy bóng',
    setup:
      'Một hộp có 3 quả bóng xanh và 2 quả bóng đỏ, cùng kích thước. Lấy ngẫu nhiên một quả bóng và xem màu.',
    unit: 'màu bóng',
    outcomes: [
      { value: 0, label: 'xanh' },
      { value: 0, label: 'xanh' },
      { value: 0, label: 'xanh' },
      { value: 0, label: 'đỏ' },
      { value: 0, label: 'đỏ' },
    ],
    events: [
      { id: 'xanh', text: 'Lấy được quả bóng màu xanh', test: (o) => o.label === 'xanh' },
      { id: 'do', text: 'Lấy được quả bóng màu đỏ', test: (o) => o.label === 'đỏ' },
      { id: 'vang', text: 'Lấy được quả bóng màu vàng', test: (o) => o.label === 'vàng' },
      {
        id: 'xanh-hoac-do',
        text: 'Lấy được quả bóng màu xanh hoặc màu đỏ',
        test: (o) => o.label === 'xanh' || o.label === 'đỏ',
      },
    ],
  },
];

/** The ladder from "không thể" to "chắc chắn", in display order. */
export const BINS = [
  { id: 'khong-the', label: 'Không thể' },
  { id: 'ngau-nhien', label: 'Ngẫu nhiên' },
  { id: 'chac-chan', label: 'Chắc chắn' },
];

/**
 * The kind of an event: chắc chắn when every outcome makes it happen, không
 * thể when none does, ngẫu nhiên otherwise.
 * @param {ChanceEvent} event @param {Outcome[]} outcomes
 * @returns {EventKind}
 */
export function classify(event, outcomes) {
  const hits = outcomes.filter((o) => event.test(o)).length;
  if (hits === outcomes.length) return 'chac-chan';
  if (hits === 0) return 'khong-the';
  return 'ngau-nhien';
}

/** @param {Outcome[]} outcomes */
const distinct = (outcomes) => [...new Set(outcomes.map((o) => o.label))].join('; ');

/**
 * Why the event has its kind, naming the outcomes that do and do not make it
 * happen.
 * @param {ChanceEvent} event @param {Experiment} exp
 */
export function why(event, exp) {
  const yes = exp.outcomes.filter((o) => event.test(o));
  const no = exp.outcomes.filter((o) => !event.test(o));
  const all = distinct(exp.outcomes);
  const kind = classify(event, exp.outcomes);
  if (kind === 'chac-chan')
    return `Mọi kết quả có thể (${exp.unit}: ${all}) đều làm biến cố xảy ra, nên biến cố luôn xảy ra.`;
  if (kind === 'khong-the')
    return `Không kết quả nào trong các kết quả có thể (${exp.unit}: ${all}) làm biến cố xảy ra, nên biến cố không bao giờ xảy ra.`;
  return `Biến cố xảy ra khi ${exp.unit} là ${distinct(yes)}, không xảy ra khi ${exp.unit} là ${distinct(no)}; không biết trước được.`;
}

/**
 * The cards of one experiment for the card sorter.
 * @param {Experiment} exp
 * @returns {import('#lib/core/card-sorter.js').SortCard[]}
 */
export function cardsFor(exp) {
  return exp.events.map((e) => ({
    id: `${exp.id}-${e.id}`,
    label: e.text,
    bin: classify(e, exp.outcomes),
    why: why(e, exp),
  }));
}

/**
 * How many of the recorded trials made the event happen. `counts[i]` is how
 * often outcome `i` came up.
 * @param {ChanceEvent} event @param {Experiment} exp @param {number[]} counts
 */
export function occurrences(event, exp, counts) {
  return exp.outcomes.reduce((s, o, i) => s + (event.test(o) ? (counts[i] ?? 0) : 0), 0);
}

/**
 * Index of the outcome drawn by a random number in [0, 1); every outcome is
 * equally likely.
 * @param {Experiment} exp @param {number} r
 */
export function draw(exp, r) {
  const n = exp.outcomes.length;
  return Math.min(n - 1, Math.max(0, Math.floor(r * n)));
}
