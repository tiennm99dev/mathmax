/**
 * Sentences about counting sticks for the widgets of this chapter: how many
 * bundles of ten and loose sticks a number has. Pure and DOM-free.
 */

/**
 * "4 chục và 1 que rời", "4 chục" or "5 que rời".
 * @param {number} n A number from 0 to 99.
 */
export function sticksWords(n) {
  const t = Math.floor(n / 10);
  const u = n % 10;
  if (t === 0) return `${u} que rời`;
  if (u === 0) return `${t} chục`;
  return `${t} chục và ${u} que rời`;
}
