/**
 * Vietnamese number formatting: '.' groups thousands and ',' marks decimals,
 * so 12345.5 reads '12.345,5'. Written by hand rather than with Intl so the
 * output never depends on the ICU data a runtime ships.
 * @param {number} value
 * @param {number} [maxDecimals]
 */
export function formatNumber(value, maxDecimals = 6) {
  const fixed = Math.abs(value).toFixed(maxDecimals);
  const [int, frac = ''] = fixed.split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimals = frac.replace(/0+$/, '');
  const sign = value < 0 && Number(fixed) !== 0 ? '−' : '';
  return decimals ? `${sign}${grouped},${decimals}` : `${sign}${grouped}`;
}

/**
 * @param {number} amount whole đồng
 */
export function formatVnd(amount) {
  return `${formatNumber(amount, 0)} đồng`;
}

/**
 * Parse a number typed the Vietnamese way ('2,5', '1.000', '1.250,75') or the
 * English way ('2.5'). Returns NaN for anything else. A single '.' followed
 * by exactly three digits is read as a thousands separator.
 * @param {string} text
 */
export function parseNumber(text) {
  let s = text.trim().replace(/\s/g, '').replace('−', '-');
  if (s === '') return NaN;
  if (s.includes(',')) {
    s = s.replace(/\./g, '').replace(',', '.');
  } else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, '');
  }
  return /^-?(\d+\.?\d*|\.\d+)$/.test(s) ? Number(s) : NaN;
}
