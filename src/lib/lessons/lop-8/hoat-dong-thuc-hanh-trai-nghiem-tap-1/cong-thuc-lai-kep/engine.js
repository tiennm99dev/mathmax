/**
 * Savings arithmetic for the compound interest activity: simple interest
 * (only the principal earns interest) against compound interest (each
 * period's interest joins the principal), and the polynomial
 * P(1 + r)^n = P + nPr + ... written out term by term.
 */

/** @typedef {'nam' | 'thang'} Period */

/** Deposit terms the widget offers, with how many periods fit in a year. */
export const PERIODS = /** @type {const} */ ([
  { value: 'nam', label: 'Kì hạn 12 tháng', perYear: 1, unit: 'năm' },
  { value: 'thang', label: 'Kì hạn 1 tháng', perYear: 12, unit: 'tháng' },
]);

/**
 * Interest rate of one period as a decimal: 6 %/năm on a 1-month term is 0,005.
 * @param {number} yearPct yearly rate in percent
 * @param {Period} period
 */
export function periodRate(yearPct, period) {
  const per = period === 'thang' ? 12 : 1;
  return yearPct / 100 / per;
}

/**
 * Money after `n` periods with simple interest: P(1 + nr).
 * @param {number} p principal
 * @param {number} r rate of one period, as a decimal
 * @param {number} n number of periods
 */
export function simpleAmount(p, r, n) {
  return p * (1 + n * r);
}

/**
 * Money after `n` periods with compound interest: P(1 + r)^n.
 * @param {number} p principal
 * @param {number} r rate of one period, as a decimal
 * @param {number} n number of periods
 */
export function compoundAmount(p, r, n) {
  return p * (1 + r) ** n;
}

/**
 * Both amounts after 0, 1, ..., n periods.
 * @param {number} p
 * @param {number} r
 * @param {number} n
 */
export function series(p, r, n) {
  return Array.from({ length: n + 1 }, (_, k) => ({
    k,
    simple: simpleAmount(p, r, k),
    compound: compoundAmount(p, r, k),
  }));
}

/**
 * Binomial coefficient C(n, k).
 * @param {number} n
 * @param {number} k
 */
export function choose(n, k) {
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i;
  return Math.round(c);
}

/**
 * Terms of P(1 + r)^n as a polynomial in r: the coefficient of P r^k is
 * C(n, k). The first two terms, P + nPr, are the simple-interest amount;
 * the rest is interest earned on interest.
 * @param {number} n
 * @returns {Array<{ k: number, c: number }>}
 */
export function expansion(n) {
  return Array.from({ length: n + 1 }, (_, k) => ({ k, c: choose(n, k) }));
}

/**
 * TeX of P(1 + r)^n expanded, for small n: n = 2 gives
 * 'P + 2Pr + Pr^{2}'.
 * @param {number} n
 */
export function expansionTex(n) {
  return expansion(n)
    .map(({ k, c }) => {
      const coef = c === 1 ? '' : String(c);
      const power = k === 0 ? '' : k === 1 ? 'r' : `r^{${k}}`;
      return `${coef}P${power}`;
    })
    .join(' + ');
}

/**
 * Round tick values for an axis from `lo` to `hi`, about `count` of them.
 * @param {number} lo
 * @param {number} hi
 * @param {number} [count]
 */
export function niceTicks(lo, hi, count = 5) {
  const span = Math.max(hi - lo, 1e-9);
  const raw = span / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? 10 * mag;
  const start = Math.floor(lo / step) * step;
  const end = Math.ceil(hi / step) * step;
  /** @type {number[]} */
  const ticks = [];
  for (let v = start; v <= end + step / 2; v += step) ticks.push(Math.round(v / step) * step);
  return ticks;
}
