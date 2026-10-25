/**
 * Pure state for `card-sorter.svelte`: the learner puts each card into one of
 * several bins and every placement is checked against the card's own bin.
 */

/** @typedef {{ id: string, label: string, bin: string, why: string }} SortCard */
/** @typedef {{ id: string, label: string }} SortBin */
/** @typedef {Record<string, string>} Placements card id → bin id */

/**
 * A copy of `placements` with the card moved into `binId`, or taken out of
 * every bin when `binId` is null.
 * @param {Placements} placements @param {string} cardId @param {string | null} binId
 * @returns {Placements}
 */
export function place(placements, cardId, binId) {
  const next = { ...placements };
  if (binId === null) delete next[cardId];
  else next[cardId] = binId;
  return next;
}

/**
 * Whether one card sits in its own bin; null while it is still unplaced.
 * @param {SortCard} card @param {Placements} placements
 */
export function isCorrect(card, placements) {
  const bin = placements[card.id];
  return bin === undefined ? null : bin === card.bin;
}

/**
 * A copy of `placements` keeping only the cards that sit in their own bin, so
 * every wrong card goes back to the pool.
 * @param {SortCard[]} cards @param {Placements} placements
 * @returns {Placements}
 */
export function clearWrong(cards, placements) {
  /** @type {Placements} */
  const next = {};
  for (const c of cards) if (placements[c.id] === c.bin) next[c.id] = c.bin;
  return next;
}

/**
 * The line announced after a card is put into `binId`. A wrong move says how
 * to retry, and with `hintOnWrong` also gives the card's `why` as a hint.
 * @param {SortCard} card @param {string} binId @param {SortBin[]} bins
 * @param {boolean} [hintOnWrong]
 */
export function moveFeedback(card, binId, bins, hintOnWrong = false) {
  const name = bins.find((b) => b.id === binId)?.label ?? binId;
  if (card.bin === binId) return `Đúng: "${card.label}" thuộc ${name}. ${card.why}`;
  const wrong = `Chưa đúng: "${card.label}" không thuộc ${name}.`;
  return hintOnWrong
    ? `${wrong} Gợi ý: ${card.why}`
    : `${wrong} Chạm vào thẻ để lấy lại và thử ô khác.`;
}

/**
 * Progress over all cards.
 * @param {SortCard[]} cards @param {Placements} placements
 */
export function progress(cards, placements) {
  let placed = 0;
  let correct = 0;
  for (const c of cards) {
    const ok = isCorrect(c, placements);
    if (ok === null) continue;
    placed += 1;
    if (ok) correct += 1;
  }
  return { placed, correct, total: cards.length, done: correct === cards.length };
}

/**
 * The cards in a fixed shuffled order, so the deck never lists one bin's cards
 * together and every visitor sees the same order.
 * @template T
 * @param {T[]} items @param {number} seed
 * @returns {T[]}
 */
export function shuffled(items, seed) {
  const out = [...items];
  let s = seed >>> 0 || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
