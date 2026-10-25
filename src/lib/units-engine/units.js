/**
 * Measurement units of the primary-school books, each as a multiple of its
 * quantity's base unit (mm, g, ml, second, đồng). Lists run from the smallest
 * unit to the largest, which is the order of the conversion ladder.
 *
 * @typedef {'length' | 'mass' | 'capacity' | 'time' | 'money'} Quantity
 * @typedef {Readonly<{ id: string, symbol: string, name: string, factor: number }>} Unit
 * @typedef {Readonly<{ unit: string, value: number }>} UnitAmount
 */

/** @type {Readonly<Record<Quantity, readonly Unit[]>>} */
export const UNITS = {
  length: [
    { id: 'mm', symbol: 'mm', name: 'mi-li-mét', factor: 1 },
    { id: 'cm', symbol: 'cm', name: 'xăng-ti-mét', factor: 10 },
    { id: 'dm', symbol: 'dm', name: 'đề-xi-mét', factor: 100 },
    { id: 'm', symbol: 'm', name: 'mét', factor: 1000 },
    { id: 'dam', symbol: 'dam', name: 'đề-ca-mét', factor: 10_000 },
    { id: 'hm', symbol: 'hm', name: 'héc-tô-mét', factor: 100_000 },
    { id: 'km', symbol: 'km', name: 'ki-lô-mét', factor: 1_000_000 },
  ],
  mass: [
    { id: 'g', symbol: 'g', name: 'gam', factor: 1 },
    { id: 'dag', symbol: 'dag', name: 'đề-ca-gam', factor: 10 },
    { id: 'hg', symbol: 'hg', name: 'héc-tô-gam', factor: 100 },
    { id: 'kg', symbol: 'kg', name: 'ki-lô-gam', factor: 1000 },
    { id: 'yen', symbol: 'yến', name: 'yến', factor: 10_000 },
    { id: 'ta', symbol: 'tạ', name: 'tạ', factor: 100_000 },
    { id: 'tan', symbol: 'tấn', name: 'tấn', factor: 1_000_000 },
  ],
  capacity: [
    { id: 'ml', symbol: 'ml', name: 'mi-li-lít', factor: 1 },
    { id: 'l', symbol: 'l', name: 'lít', factor: 1000 },
  ],
  time: [
    { id: 's', symbol: 'giây', name: 'giây', factor: 1 },
    { id: 'min', symbol: 'phút', name: 'phút', factor: 60 },
    { id: 'h', symbol: 'giờ', name: 'giờ', factor: 3600 },
    { id: 'day', symbol: 'ngày', name: 'ngày', factor: 86_400 },
    { id: 'week', symbol: 'tuần', name: 'tuần', factor: 604_800 },
    // A common year of 365 days, as the books use for conversions.
    { id: 'year', symbol: 'năm', name: 'năm', factor: 31_536_000 },
    { id: 'century', symbol: 'thế kỉ', name: 'thế kỉ', factor: 3_153_600_000 },
  ],
  money: [
    { id: 'dong', symbol: 'đồng', name: 'đồng', factor: 1 },
    { id: 'nghin-dong', symbol: 'nghìn đồng', name: 'nghìn đồng', factor: 1000 },
    { id: 'trieu-dong', symbol: 'triệu đồng', name: 'triệu đồng', factor: 1_000_000 },
  ],
};

/** @type {Map<string, { unit: Unit, quantity: Quantity }>} */
const byId = new Map();
for (const [quantity, units] of Object.entries(UNITS)) {
  for (const unit of units)
    byId.set(unit.id, { unit, quantity: /** @type {Quantity} */ (quantity) });
}

/**
 * @param {string} id
 * @returns {Unit}
 */
export function unit(id) {
  const hit = byId.get(id);
  if (!hit) throw new Error(`unknown unit: ${id}`);
  return hit.unit;
}

/**
 * @param {string} id
 * @returns {Quantity}
 */
export function quantityOf(id) {
  unit(id);
  return /** @type {{ quantity: Quantity }} */ (byId.get(id)).quantity;
}

/**
 * Round away binary noise: 0.1 * 3 → 0.3. Twelve significant digits is more
 * than any textbook conversion needs.
 * @param {number} x
 */
function clean(x) {
  return Number(x.toPrecision(12)) + 0;
}

/**
 * Convert `value` between two units of the same quantity: 3 m → 300 cm.
 * @param {number} value
 * @param {string} from unit id
 * @param {string} to unit id
 */
export function convert(value, from, to) {
  if (quantityOf(from) !== quantityOf(to)) {
    throw new Error(`cannot convert ${from} to ${to}`);
  }
  return clean((value * unit(from).factor) / unit(to).factor);
}

/**
 * How many of the smaller unit make one of the larger: ratio('m', 'cm') is
 * 100, ratio('h', 'min') is 60. Not always a whole number (year to week).
 * @param {string} larger unit id
 * @param {string} smaller unit id
 */
export function ratio(larger, smaller) {
  return convert(1, larger, smaller);
}

/**
 * Split an amount into whole parts of the listed units, largest first, with
 * any remainder in the last unit: 135 min in [h, min] is 2 h 15 min, and
 * 2,35 m in [m, cm] is 2 m 35 cm.
 * @param {number} value non-negative
 * @param {string} from unit id of `value`
 * @param {readonly string[]} into unit ids of one quantity
 * @returns {UnitAmount[]}
 */
export function splitMixed(value, from, into) {
  if (value < 0) throw new Error('splitMixed needs a non-negative amount');
  const parts = [...into].sort((a, b) => unit(b).factor - unit(a).factor);
  let rest = convert(value, from, parts[parts.length - 1]);
  /** @type {UnitAmount[]} */
  const out = [];
  parts.forEach((id, i) => {
    const per = convert(1, id, parts[parts.length - 1]);
    const whole = i === parts.length - 1 ? clean(rest) : Math.floor(clean(rest / per));
    out.push({ unit: id, value: whole });
    rest = clean(rest - whole * per);
  });
  return out;
}

/**
 * The reverse of `splitMixed`: 2 h 15 min in minutes is 135.
 * @param {readonly UnitAmount[]} parts
 * @param {string} to unit id
 */
export function joinMixed(parts, to) {
  return clean(parts.reduce((s, p) => s + convert(p.value, p.unit, to), 0));
}
