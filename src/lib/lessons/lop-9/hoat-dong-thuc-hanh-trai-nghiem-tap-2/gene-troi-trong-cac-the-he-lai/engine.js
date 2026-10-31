/**
 * The probability model behind Mendel's one-trait crosses: each parent passes
 * on one of its two genes, both equally likely, like the two faces of a coin.
 * A is the dominant gene (red flower), a the recessive one (white flower).
 * Counts are exact: a cross has 4 equally likely outcomes, and the
 * self-pollinated generations from F1 are written over powers of 2.
 */

/** @typedef {'AA' | 'Aa' | 'aa'} Genotype */
/** @typedef {Record<Genotype, number>} Counts */

/** @type {Genotype[]} */
export const GENOTYPES = ['AA', 'Aa', 'aa'];

/**
 * A pair of genes written the usual way, the dominant gene first: 'aA' → 'Aa'.
 * @param {string} pair
 * @returns {Genotype}
 */
export function normal(pair) {
  const big = [...pair].filter((g) => g === 'A').length;
  return big === 2 ? 'AA' : big === 1 ? 'Aa' : 'aa';
}

/**
 * Whether a plant of this genotype shows the dominant trait (has a gene A).
 * @param {string} genotype
 */
export const showsDominant = (genotype) => genotype.includes('A');

/**
 * The Punnett square of father × mother: rows are the father's genes, columns
 * the mother's, and each cell the pair as drawn (father's gene first), so the
 * four cells are the four equally likely outcomes ('Aa' and 'aA' both appear).
 * @param {Genotype} father
 * @param {Genotype} mother
 * @returns {string[][]}
 */
export function punnett(father, mother) {
  return [0, 1].map((i) => [0, 1].map((j) => father[i] + mother[j]));
}

/**
 * How many of the 4 equally likely outcomes give each genotype.
 * @param {Genotype} father
 * @param {Genotype} mother
 * @returns {Counts}
 */
export function outcomeCounts(father, mother) {
  /** @type {Counts} */
  const counts = { AA: 0, Aa: 0, aa: 0 };
  for (const row of punnett(father, mother)) for (const cell of row) counts[normal(cell)]++;
  return counts;
}

/**
 * How many of the 4 outcomes show the dominant trait.
 * @param {Genotype} father
 * @param {Genotype} mother
 */
export function dominantCount(father, mother) {
  const c = outcomeCounts(father, mother);
  return c.AA + c.Aa;
}

/**
 * One toss of the two coins: the father's coin, then the mother's. A coin of
 * a pure parent (AA or aa) shows the same gene on both faces.
 * @param {() => number} rand numbers in [0, 1)
 * @param {Genotype} father
 * @param {Genotype} mother
 * @returns {string} the pair as tossed, father's gene first
 */
export function toss(rand, father, mother) {
  const f = father[rand() < 0.5 ? 0 : 1];
  const m = mother[rand() < 0.5 ? 0 : 1];
  return f + m;
}

/**
 * Tally of tossed pairs by genotype.
 * @param {string[]} pairs
 * @returns {Counts}
 */
export function tally(pairs) {
  /** @type {Counts} */
  const counts = { AA: 0, Aa: 0, aa: 0 };
  for (const p of pairs) counts[normal(p)]++;
  return counts;
}

/**
 * Generation `k` (k ≥ 1) of plants that self-pollinate, starting from F1 where
 * every plant is Aa. An AA or aa plant breeds true; an Aa plant gives 1 AA,
 * 2 Aa, 1 aa out of 4. The shares are counts over `den` = 2^k.
 * @param {number} k
 * @returns {{ den: number, counts: Counts }}
 */
export function selfedGeneration(k) {
  if (!Number.isInteger(k) || k < 1) throw new RangeError('k must be a whole number from 1');
  let den = 2;
  /** @type {Counts} */
  let counts = { AA: 0, Aa: 2, aa: 0 };
  for (let g = 1; g < k; g++) {
    den *= 2;
    counts = {
      AA: 2 * counts.AA + counts.Aa / 2,
      Aa: counts.Aa,
      aa: 2 * counts.aa + counts.Aa / 2,
    };
  }
  return { den, counts };
}
