/**
 * Logic of the "nested sets" widget: each number card belongs in the
 * smallest of the sets ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ that holds it, or in I when it is
 * irrational. The widget checks a placement, explains a wrong one and lists
 * the placed numbers in increasing order.
 */

/** @typedef {'N' | 'Z' | 'Q' | 'I'} SetId */

/**
 * @typedef {object} NumberCard
 * @property {string} id
 * @property {string} label as printed on the card: '√9', '−1,25'
 * @property {number} value its value, for the number line and ordering
 * @property {SetId} set smallest set that holds it
 * @property {string} why the reason, shown after a placement
 * @property {string} opposite its opposite as text
 * @property {string} abs its absolute value as text
 */

/** The regions of the diagram, from the innermost set out. */
export const SETS = /** @type {const} */ ([
  { id: 'N', name: 'ℕ', title: 'Số tự nhiên' },
  { id: 'Z', name: 'ℤ', title: 'Số nguyên (không thuộc ℕ)' },
  { id: 'Q', name: 'ℚ', title: 'Số hữu tỉ (không thuộc ℤ)' },
  { id: 'I', name: 'I', title: 'Số vô tỉ' },
]);

/** Rank of a rational set in ℕ ⊂ ℤ ⊂ ℚ; I sits outside the chain. */
const RANK = { N: 0, Z: 1, Q: 2 };

/** @type {NumberCard[]} */
export const CARDS = [
  {
    id: 'sqrt9',
    label: '√9',
    value: 3,
    set: 'N',
    why: '√9 = 3 là số tự nhiên.',
    opposite: '−√9 = −3',
    abs: '3',
  },
  {
    id: 'minus-sqrt5',
    label: '−√5',
    value: -Math.sqrt(5),
    set: 'I',
    why: '5 không phải là số chính phương nên √5 là số vô tỉ, và −√5 cũng là số vô tỉ.',
    opposite: '√5',
    abs: '√5',
  },
  {
    id: 'two-thirds',
    label: '2/3',
    value: 2 / 3,
    set: 'Q',
    why: '2/3 = 0,(6) là số hữu tỉ nhưng không phải là số nguyên.',
    opposite: '−2/3',
    abs: '2/3',
  },
  {
    id: 'minus5',
    label: '−5',
    value: -5,
    set: 'Z',
    why: '−5 là số nguyên âm, không phải là số tự nhiên.',
    opposite: '5',
    abs: '5',
  },
  {
    id: 'pi',
    label: 'π',
    value: Math.PI,
    set: 'I',
    why: 'π = 3,14159… là số thập phân vô hạn không tuần hoàn, một số vô tỉ.',
    opposite: '−π',
    abs: 'π',
  },
  {
    id: 'zero',
    label: '0',
    value: 0,
    set: 'N',
    why: '0 là số tự nhiên.',
    opposite: '0',
    abs: '0',
  },
  {
    id: 'minus1-25',
    label: '−1,25',
    value: -1.25,
    set: 'Q',
    why: '−1,25 = −5/4 là số thập phân hữu hạn, một số hữu tỉ không nguyên.',
    opposite: '1,25',
    abs: '1,25',
  },
  {
    id: 'sqrt2',
    label: '√2',
    value: Math.SQRT2,
    set: 'I',
    why: '√2 = 1,41421356… là số vô tỉ.',
    opposite: '−√2',
    abs: '√2',
  },
  {
    id: 'minus-sqrt16',
    label: '−√16',
    value: -4,
    set: 'Z',
    why: '−√16 = −4 là số nguyên âm.',
    opposite: '√16 = 4',
    abs: '4',
  },
  {
    id: 'repeating',
    label: '0,(3)',
    value: 1 / 3,
    set: 'Q',
    why: '0,(3) là số thập phân vô hạn tuần hoàn, bằng 1/3: một số hữu tỉ.',
    opposite: '−0,(3)',
    abs: '0,(3)',
  },
  {
    id: 'sqrt-quarter',
    label: '√0,25',
    value: 0.5,
    set: 'Q',
    why: '√0,25 = 0,5 vì 0,5² = 0,25: một số hữu tỉ.',
    opposite: '−√0,25 = −0,5',
    abs: '0,5',
  },
  {
    id: 'four',
    label: '4',
    value: 4,
    set: 'N',
    why: '4 là số tự nhiên.',
    opposite: '−4',
    abs: '4',
  },
  {
    id: 'non-repeating',
    label: '−1,010010001…',
    value: -1.010010001,
    set: 'I',
    why: 'Sau mỗi chữ số 1 có thêm một chữ số 0, nên các chữ số không lặp lại theo chu kì: đây là số vô tỉ.',
    opposite: '1,010010001…',
    abs: '1,010010001…',
  },
];

/**
 * Checks putting a card into a region. Right only when the region is the
 * smallest set holding the number; a larger set that still holds it is
 * 'larger', anything else 'wrong'.
 * @param {NumberCard} card
 * @param {SetId} region
 * @returns {{ result: 'right' | 'larger' | 'wrong', text: string }}
 */
export function judge(card, region) {
  if (region === card.set) return { result: 'right', text: `Đúng. ${card.why}` };
  const name = (/** @type {SetId} */ id) => SETS.find((s) => s.id === id)?.name ?? id;
  if (region !== 'I' && card.set !== 'I' && RANK[region] > RANK[card.set]) {
    return {
      result: 'larger',
      text: `${card.label} cũng thuộc ${name(region)}, nhưng còn thuộc tập nhỏ hơn là ${name(card.set)}. Hãy đặt vào ô của tập nhỏ nhất chứa nó.`,
    };
  }
  return { result: 'wrong', text: `Chưa đúng. ${card.why}` };
}

/**
 * The cards in increasing order of value, as '−5 < −√16 < …'.
 * @param {NumberCard[]} cards
 */
export function chainText(cards) {
  return [...cards]
    .sort((a, b) => a.value - b.value)
    .map((c) => c.label)
    .join(' < ');
}

/**
 * Every set a card belongs to, innermost first: √9 → ['ℕ', 'ℤ', 'ℚ', 'ℝ'].
 * @param {NumberCard} card
 */
export function memberships(card) {
  if (card.set === 'I') return ['I', 'ℝ'];
  const chain = ['ℕ', 'ℤ', 'ℚ'];
  return [...chain.slice(RANK[card.set]), 'ℝ'];
}
