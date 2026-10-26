/**
 * Proofs to rebuild: each theorem lists its steps with the reason that
 * justifies each one and the earlier steps it relies on. A proof is in a
 * valid order when every step comes after the steps it uses, so several
 * orders can be right (two independent facts may come in either order).
 * Statements are plain text with the Vietnamese angle notation xÔy.
 */

/**
 * @typedef {object} Step
 * @property {string} text
 * @property {number} reason index into the theorem's `reasons`
 * @property {number[]} uses indices of the steps this one relies on
 *
 * @typedef {object} Theorem
 * @property {string} id
 * @property {string} title
 * @property {string} gt
 * @property {string} kl
 * @property {string[]} reasons
 * @property {Step[]} steps in one valid order; the last one is the conclusion
 */

/** @type {Theorem[]} */
export const THEOREMS = [
  {
    id: 'doi-dinh',
    title: 'Hai góc đối đỉnh thì bằng nhau',
    gt: "Hai đường thẳng xx' và yy' cắt nhau tại O",
    kl: "xÔy = x'Ôy'",
    reasons: [
      'Hai góc kề bù',
      'Cùng bằng 180°',
      "Bớt yÔx' ở cả hai vế",
      'Hai góc đối đỉnh',
      'Giả thiết',
    ],
    steps: [
      { text: "xÔy + yÔx' = 180°", reason: 0, uses: [] },
      { text: "x'Ôy' + yÔx' = 180°", reason: 0, uses: [] },
      { text: "xÔy + yÔx' = x'Ôy' + yÔx'", reason: 1, uses: [0, 1] },
      { text: "xÔy = x'Ôy'", reason: 2, uses: [2] },
    ],
  },
  {
    id: 'phan-giac-ke-bu',
    title: 'Hai tia phân giác của hai góc kề bù thì vuông góc với nhau',
    gt: "xÔy và yÔx' kề bù; Om là tia phân giác của xÔy; On là tia phân giác của yÔx'",
    kl: 'Om ⊥ On',
    reasons: [
      'Om là tia phân giác của xÔy',
      "On là tia phân giác của yÔx'",
      'Hai góc kề bù',
      'Tia Oy nằm giữa hai tia Om và On',
      'Thay các kết quả trên vào',
      'Góc tạo bởi hai đường thẳng bằng 90°',
      'Hai góc đối đỉnh',
    ],
    steps: [
      { text: 'mÔy = xÔy : 2', reason: 0, uses: [] },
      { text: "yÔn = yÔx' : 2", reason: 1, uses: [] },
      { text: "xÔy + yÔx' = 180°", reason: 2, uses: [] },
      { text: 'mÔn = mÔy + yÔn', reason: 3, uses: [] },
      { text: "mÔn = (xÔy + yÔx') : 2 = 180° : 2 = 90°", reason: 4, uses: [0, 1, 2, 3] },
      { text: 'Om ⊥ On', reason: 5, uses: [4] },
    ],
  },
  {
    id: 'cung-vuong-goc',
    title: 'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thì song song',
    gt: 'a ⊥ c tại A, b ⊥ c tại B (a, b phân biệt)',
    kl: 'a // b',
    reasons: [
      'a ⊥ c',
      'b ⊥ c',
      'Cùng bằng 90°',
      'Có một cặp góc đồng vị bằng nhau (dấu hiệu nhận biết)',
      'Tiên đề Euclid',
    ],
    steps: [
      { text: 'Â₁ = 90°', reason: 0, uses: [] },
      { text: 'B̂₁ = 90°', reason: 1, uses: [] },
      { text: 'Â₁ = B̂₁, hai góc ở vị trí đồng vị', reason: 2, uses: [0, 1] },
      { text: 'a // b', reason: 3, uses: [2] },
    ],
  },
];

/**
 * A fixed shuffle of the step indices that is never the book order, so the
 * learner always has something to rebuild.
 * @param {number} n
 * @returns {number[]}
 */
export function scrambled(n) {
  const out = Array.from({ length: n }, (_, i) => (i * 3 + 1) % n);
  // (3i + 1) mod n is a permutation unless 3 divides n; fall back to reverse.
  if (new Set(out).size !== n) return Array.from({ length: n }, (_, i) => n - 1 - i);
  return out;
}

/**
 * Checks a proof: `order` lists step indices top to bottom, `chosen[s]` is
 * the reason picked for step `s` (or null).
 * @param {Theorem} theorem
 * @param {number[]} order
 * @param {Array<number | null>} chosen
 */
export function checkProof(theorem, order, chosen) {
  const lines = order.map((s, pos) => {
    const step = theorem.steps[s];
    const before = new Set(order.slice(0, pos));
    const placeOk = step.uses.every((u) => before.has(u));
    const reasonOk = chosen[s] === step.reason;
    return { step: s, placeOk, reasonOk, missing: chosen[s] === null };
  });
  const conclusionLast = order[order.length - 1] === theorem.steps.length - 1;
  const placeOk = lines.every((l) => l.placeOk) && conclusionLast;
  const reasonsOk = lines.every((l) => l.reasonOk);
  return { lines, placeOk, reasonsOk, done: placeOk && reasonsOk };
}

/**
 * Moves the item at `from` one place up (-1) or down (+1).
 * @param {number[]} order @param {number} from @param {-1 | 1} by
 */
export function move(order, from, by) {
  const to = from + by;
  if (to < 0 || to >= order.length) return order;
  const out = [...order];
  [out[from], out[to]] = [out[to], out[from]];
  return out;
}
