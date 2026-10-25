// Vietnamese number writing is owned by core; this engine re-exports it.
import { formatNumber } from '#lib/core/number-format.js';

export { formatNumber };

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
