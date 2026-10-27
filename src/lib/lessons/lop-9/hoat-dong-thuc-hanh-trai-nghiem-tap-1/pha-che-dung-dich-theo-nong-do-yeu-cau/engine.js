/**
 * Mixing solutions to a required percentage concentration. Masses are in
 * grams, concentrations in percent (C% = solute mass / solution mass · 100).
 */

/**
 * Percentage concentration of a solution.
 * @param {number} solute mass of the dissolved substance
 * @param {number} solution mass of the whole solution (solute + solvent)
 * @returns {number} the concentration in percent, 0 for an empty solution
 */
export function percent(solute, solution) {
  return solution > 0 ? (solute / solution) * 100 : 0;
}

/**
 * Pours `m1` grams of a c1% solution and `m2` grams of a c2% solution together.
 * @param {number} m1
 * @param {number} c1
 * @param {number} m2
 * @param {number} c2
 */
export function mix(m1, c1, m2, c2) {
  const mass = m1 + m2;
  const solute = (m1 * c1 + m2 * c2) / 100;
  return { mass, solute, percent: percent(solute, mass) };
}

/**
 * Solves the mixing system  x + y = m,  c1·x + c2·y = c·m  for the masses x of
 * the c1% solution and y of the c2% solution that make m grams of a c% one.
 * There is no mixture unless c lies between c1 and c2 (and c1 ≠ c2).
 * @param {number} c1
 * @param {number} c2
 * @param {number} c
 * @param {number} m
 * @returns {{ x: number, y: number } | null}
 */
export function mixAmounts(c1, c2, c, m) {
  if (c1 === c2) return null;
  const lo = Math.min(c1, c2);
  const hi = Math.max(c1, c2);
  if (c < lo || c > hi) return null;
  const x = (m * (c - c2)) / (c1 - c2);
  return { x, y: m - x };
}

/**
 * The sugar-water task of the book: sugar (density `rho` g/ml) and pure water
 * (1 g/ml) make `volume` ml of an a% solution, taking the volume of the
 * solution as the sum of the two volumes. The system
 *   x / rho + y = volume,  (100 − a)·x − a·y = 0
 * has the solution returned here (x grams of sugar, y grams of water).
 * @param {number} a required concentration, 0 < a < 100
 * @param {number} [volume]
 * @param {number} [rho]
 */
export function sugarWater(a, volume = 1000, rho = 1.1) {
  const sugar = (volume * a * rho) / (a + rho * (100 - a));
  const water = (sugar * (100 - a)) / a;
  return { sugar, water };
}

/**
 * Water to add to `mass` grams of a c% solution to dilute it to `target`%.
 * @param {number} mass
 * @param {number} c
 * @param {number} target
 */
export function waterToAdd(mass, c, target) {
  return (mass * c) / target - mass;
}

/**
 * Solute to add to `mass` grams of a c% solution to bring it up to `target`%:
 * (solute + s) / (mass + s) = target / 100.
 * @param {number} mass
 * @param {number} c
 * @param {number} target
 */
export function soluteToAdd(mass, c, target) {
  return (mass * (target - c)) / (100 - target);
}
