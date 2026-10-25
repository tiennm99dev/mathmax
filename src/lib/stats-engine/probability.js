/**
 * Index of the outcome picked by `r`, a uniform number in [0, 1), when each
 * outcome has the given weight. Zero-weight outcomes are never picked.
 * @param {readonly number[]} weights non-negative, not all zero
 * @param {number} r
 * @returns {number}
 */
export function pickWeighted(weights, r) {
  const total = weights.reduce((s, w) => s + w, 0);
  if (!(total > 0)) throw new Error('weights must have a positive total');
  let acc = 0;
  const target = Math.min(Math.max(r, 0), 1) * total;
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i];
    if (weights[i] > 0 && target < acc) return i;
  }
  // r === 1 or rounding at the top end: the last outcome with weight.
  for (let i = weights.length - 1; i >= 0; i--) if (weights[i] > 0) return i;
  return weights.length - 1;
}

/**
 * Theoretical probability of each outcome: weight / total.
 * @param {readonly number[]} weights
 * @returns {number[]}
 */
export function probabilities(weights) {
  const total = weights.reduce((s, w) => s + w, 0);
  return weights.map((w) => (total === 0 ? 0 : w / total));
}

/**
 * Experimental probability of an event: times it happened / trials, or 0
 * before the first trial.
 * @param {number} count
 * @param {number} trials
 */
export function experimentalProbability(count, trials) {
  return trials === 0 ? 0 : count / trials;
}
