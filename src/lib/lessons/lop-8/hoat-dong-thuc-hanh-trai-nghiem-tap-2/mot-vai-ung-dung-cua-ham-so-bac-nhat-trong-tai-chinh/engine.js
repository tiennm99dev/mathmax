/**
 * Linear money models for the finance activity: a cost that is a fixed fee
 * plus a price per unit, y = ax + b, compared with another such cost or with
 * the revenue y = px. Two lines cross where both sides are equal: the month
 * two plans cost the same, or the break-even quantity where revenue meets cost.
 */

/** @typedef {{ a: number, b: number }} Line y = a x + b */
/** @typedef {{ x: number, y: number }} Pt */

/**
 * Value of the line at x.
 * @param {Line} line
 * @param {number} x
 */
export const valueAt = (line, x) => line.a * x + line.b;

/**
 * Where two lines meet, or null when they are parallel (or the same line).
 * @param {Line} l1
 * @param {Line} l2
 * @returns {Pt | null}
 */
export function crossing(l1, l2) {
  const da = l1.a - l2.a;
  if (Math.abs(da) < 1e-12) return null;
  const x = (l2.b - l1.b) / da;
  return { x, y: valueAt(l1, x) };
}

/**
 * Break-even quantity: revenue p·x equals cost F + v·x when x = F / (p − v).
 * Null when each unit sells for no more than it costs, so the business never
 * breaks even.
 * @param {number} fixed fixed cost F
 * @param {number} unitCost cost of one unit v
 * @param {number} price selling price of one unit p
 */
export function breakEven(fixed, unitCost, price) {
  if (price <= unitCost) return null;
  return fixed / (price - unitCost);
}

/**
 * Profit L(x) = R(x) − C(x) = (p − v)x − F.
 * @param {number} fixed
 * @param {number} unitCost
 * @param {number} price
 * @param {number} x
 */
export function profit(fixed, unitCost, price, x) {
  return (price - unitCost) * x - fixed;
}

/**
 * Straight-line depreciation: a price P spread evenly over n years leaves
 * the book value P − (P / n)·x after x years.
 * @param {number} price
 * @param {number} years
 * @returns {Line}
 */
export function depreciation(price, years) {
  return { a: -price / years, b: price };
}

/**
 * The strips between two lines over [0, xMax], split where they cross. Each
 * strip is a quadrilateral (corners in drawing order) with `sign` +1 when the
 * second line is above the first, −1 when below.
 * @param {Line} l1
 * @param {Line} l2
 * @param {number} xMax
 * @returns {Array<{ points: Pt[], sign: number }>}
 */
export function strips(l1, l2, xMax) {
  const cut = crossing(l1, l2);
  const xs = [0];
  if (cut && cut.x > 1e-9 && cut.x < xMax - 1e-9) xs.push(cut.x);
  xs.push(xMax);
  /** @type {Array<{ points: Pt[], sign: number }>} */
  const out = [];
  for (let i = 0; i + 1 < xs.length; i++) {
    const s = xs[i];
    const e = xs[i + 1];
    const mid = (s + e) / 2;
    const gap = valueAt(l2, mid) - valueAt(l1, mid);
    out.push({
      points: [
        { x: s, y: valueAt(l1, s) },
        { x: e, y: valueAt(l1, e) },
        { x: e, y: valueAt(l2, e) },
        { x: s, y: valueAt(l2, s) },
      ],
      sign: Math.abs(gap) < 1e-9 ? 0 : Math.sign(gap),
    });
  }
  return out;
}

/**
 * A round upper bound for an axis: 1, 2, 2,5 or 5 times a power of ten.
 * @param {number} v
 */
export function niceCeil(v) {
  if (v <= 0) return 1;
  const mag = 10 ** Math.floor(Math.log10(v));
  const m = [1, 2, 2.5, 5, 10].find((k) => k * mag >= v - 1e-9) ?? 10;
  return m * mag;
}

/**
 * Round tick values from 0 to at least `hi`, about `count` steps.
 * @param {number} hi
 * @param {number} [count]
 */
export function ticksTo(hi, count = 4) {
  const step = niceCeil(Math.max(hi, 1e-9) / count);
  /** @type {number[]} */
  const out = [];
  for (let k = 0; k * step < hi + step - 1e-9; k++) out.push(Math.round(k * step * 1e6) / 1e6);
  return out;
}
