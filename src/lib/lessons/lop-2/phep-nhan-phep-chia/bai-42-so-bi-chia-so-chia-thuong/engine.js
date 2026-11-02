/**
 * Naming the parts of a division and building two divisions from one
 * multiplication. A task is written `dividend : divisor = quotient`, and the
 * multiplication that goes with it is `quotient × divisor = dividend`.
 * Pure and DOM-free.
 */

/** @typedef {'dividend' | 'divisor' | 'quotient'} Part */
/** @typedef {{ dividend: number, divisor: number, quotient: number }} Division */
/** @typedef {{ a: number, b: number }} Fact a × b */
/** @typedef {[number | null, number | null, number | null]} Slots dividend, divisor, quotient */

/** @type {readonly Part[]} */
export const PARTS = ['dividend', 'divisor', 'quotient'];

/** @type {Readonly<Record<Part, string>>} */
export const PART_NAMES = { dividend: 'Số bị chia', divisor: 'Số chia', quotient: 'Thương' };

/** @type {Readonly<Record<Part, string>>} */
const PART_HINTS = {
  dividend: 'Số bị chia là số đem chia, đứng đầu phép chia.',
  divisor: 'Số chia đứng ngay sau dấu chia.',
  quotient: 'Thương là kết quả, đứng sau dấu bằng.',
};

/** @param {number} dividend @param {number} divisor @returns {Division} */
const division = (dividend, divisor) => ({ dividend, divisor, quotient: dividend / divisor });

/** Divisions whose three numbers differ, so each name points at one number. */
export const TASKS = [
  division(6, 2),
  division(10, 2),
  division(20, 5),
  division(8, 2),
  division(15, 5),
  division(12, 2),
  division(10, 5),
  division(14, 2),
];

/** Multiplications to build two divisions from. */
export const FACTS = /** @type {readonly Fact[]} */ ([
  { a: 2, b: 3 },
  { a: 5, b: 4 },
  { a: 2, b: 5 },
  { a: 5, b: 3 },
  { a: 2, b: 7 },
]);

/**
 * The order the names are asked in, turned one step per task so a child looks
 * at the sentence and does not learn a fixed tapping order.
 * @param {number} round
 * @returns {Part[]}
 */
export function askOrder(round) {
  const start = round % PARTS.length;
  return [...PARTS.slice(start), ...PARTS.slice(0, start)];
}

/** @param {Part} part */
export const askText = (part) => `Em chạm vào ${PART_NAMES[part].toLowerCase()}.`;

/**
 * What a tap on a number says.
 * @param {Part} asked
 * @param {Part} tapped
 * @returns {{ right: boolean, text: string }}
 */
export function tapResult(asked, tapped) {
  if (asked === tapped)
    return { right: true, text: `Đúng rồi! Đây là ${PART_NAMES[asked].toLowerCase()}.` };
  return { right: false, text: `Chưa đúng. ${PART_HINTS[asked]}` };
}

/**
 * "6 : 2 = 3"
 * @param {Division} d
 */
export const divisionText = (d) => `${d.dividend} : ${d.divisor} = ${d.quotient}`;

/**
 * The multiplication that goes with a division: "3 × 2 = 6".
 * @param {Division} d
 */
export const multiplicationText = (d) => `${d.quotient} × ${d.divisor} = ${d.dividend}`;

/**
 * What the widget says when all three names are placed.
 * @param {Division} d
 */
export function namedText(d) {
  return `Số bị chia ${d.dividend}, số chia ${d.divisor}, thương ${d.quotient}. Thương nhân với số chia thì được số bị chia: ${multiplicationText(d)}.`;
}

/**
 * The three number cards of a multiplication, smallest first.
 * @param {Fact} fact
 */
export const cardsOf = ({ a, b }) => [a, b, a * b].sort((x, y) => x - y);

/**
 * Puts a card into the first empty slot; a full sentence or a used card
 * stays as it is.
 * @param {Slots} slots
 * @param {number} card
 * @returns {Slots}
 */
export function placeCard(slots, card) {
  if (slots.includes(card)) return slots;
  const free = slots.indexOf(null);
  if (free < 0) return slots;
  const next = /** @type {Slots} */ ([...slots]);
  next[free] = card;
  return next;
}

/**
 * The two divisions a multiplication gives.
 * @param {Fact} fact
 * @returns {Division[]}
 */
export function divisionsOf({ a, b }) {
  return [division(a * b, a), division(a * b, b)];
}

/**
 * Judges a full sentence against what is already found. `found` holds divisors.
 * @param {Fact} fact
 * @param {Slots} slots
 * @param {readonly number[]} found
 * @returns {{ kind: 'wait' | 'new' | 'again' | 'wrong', text: string }}
 */
export function judge(fact, slots, found) {
  const [dividend, divisor, quotient] = slots;
  if (dividend === null || divisor === null || quotient === null) {
    return { kind: 'wait', text: 'Em chạm vào các thẻ số để ghép phép chia.' };
  }
  const product = fact.a * fact.b;
  if (dividend !== product) {
    return {
      kind: 'wrong',
      text: `Chưa đúng. Tích ${product} là số bị chia, em đặt nó đứng đầu.`,
    };
  }
  const sentence = `${dividend} : ${divisor} = ${quotient}`;
  if (found.includes(divisor)) {
    return { kind: 'again', text: `Em đã có ${sentence} rồi. Em đổi chỗ hai số còn lại nhé.` };
  }
  return {
    kind: 'new',
    text:
      found.length === 0
        ? `Đúng rồi! ${sentence}. Em tìm thêm một phép chia nữa nhé.`
        : `Đúng rồi! ${sentence}. Từ một phép nhân, em lập được hai phép chia.`,
  };
}
