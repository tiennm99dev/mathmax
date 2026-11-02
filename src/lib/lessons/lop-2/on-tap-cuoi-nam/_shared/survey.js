/**
 * Tally marks the book's way: bundles of five, with the words a child says for
 * them. Pure and DOM-free.
 */

/**
 * The bundles of a tally of `n`: full bundles of five, then what is left.
 * @param {number} n
 * @returns {number[]}
 */
export function tallyBundles(n) {
  const rest = n % 5;
  return [...Array.from({ length: Math.floor(n / 5) }, () => 5), ...(rest > 0 ? [rest] : [])];
}

/**
 * How a tally of `n` is read: '1 bó 5 vạch và 2 vạch'.
 * @param {number} n
 */
export function tallyWords(n) {
  const full = Math.floor(n / 5);
  const rest = n % 5;
  if (full === 0) return `${rest} vạch`;
  return `${full} bó 5 vạch${rest > 0 ? ` và ${rest} vạch` : ''}`;
}
