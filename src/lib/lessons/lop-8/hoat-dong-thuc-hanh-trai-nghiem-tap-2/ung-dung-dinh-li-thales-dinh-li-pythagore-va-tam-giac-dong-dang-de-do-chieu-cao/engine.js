/**
 * Indirect measuring for the outdoor activity: the height of a tree from
 * shadows (similar triangles), from a stake and a sight line (Thalès), and
 * the width of a river to a point that cannot be reached (Pythagoras and
 * similar right triangles). Lengths are in metres, angles in degrees.
 */

const RAD = Math.PI / 180;

/**
 * Length of the shadow of an upright object of height `h` when the sun is
 * `angle` degrees above the horizon.
 * @param {number} h
 * @param {number} angle
 */
export function shadowLength(h, angle) {
  return h / Math.tan(angle * RAD);
}

/**
 * Height from shadows: the sun's rays are parallel, so the tree and a stake
 * make similar right triangles with their shadows, H / S = h / s.
 * @param {number} stake height h of the stake
 * @param {number} stakeShadow its shadow s
 * @param {number} treeShadow the tree's shadow S
 */
export function heightFromShadow(stake, stakeShadow, treeShadow) {
  return (stake * treeShadow) / stakeShadow;
}

/**
 * Sighting: an eye on the ground at C, a stake of height `h` at distance `ca`
 * from C, a tree at distance `ct`. The line from C through the stake's top
 * meets the tree at height h · ct / ca (Thalès, stake parallel to tree).
 * @param {number} h
 * @param {number} ca
 * @param {number} ct
 */
export function sightHeight(h, ca, ct) {
  return (h * ct) / ca;
}

/**
 * Where to put the stake so the sight line passes the tree top: CA = CT · h / H.
 * @param {number} h stake height
 * @param {number} treeHeight
 * @param {number} ct distance from the eye to the tree
 */
export function alignDistance(h, treeHeight, ct) {
  return (ct * h) / treeHeight;
}

/**
 * The river set-up: A on this bank, B straight across (AB is the width),
 * C along the bank with AC ⟂ AB, and D the foot of the perpendicular from A
 * to the sight line CB. Returns every length the triangles give.
 * @param {number} ab the width to find
 * @param {number} ac the distance walked along the bank
 */
export function riverLengths(ab, ac) {
  const bc = Math.hypot(ab, ac);
  return { bc, ad: (ab * ac) / bc, cd: (ac * ac) / bc, bd: (ab * ab) / bc };
}

/**
 * Method 1: triangles DBA and DAC are similar, so BD = AD² / CD, then
 * Pythagoras in the right triangle ADB gives AB.
 * @param {number} ad
 * @param {number} cd
 */
export function widthByPythagoras(ad, cd) {
  const bd = (ad * ad) / cd;
  return Math.hypot(ad, bd);
}

/**
 * Method 2: triangles ABC and DAC are similar, so AB / DA = AC / DC.
 * @param {number} ad
 * @param {number} ac
 * @param {number} cd
 */
export function widthBySimilar(ad, ac, cd) {
  return (ad * ac) / cd;
}

/**
 * Round to two decimals, as a tape measure reads to the centimetre.
 * @param {number} v
 */
export const toCm = (v) => Math.round(v * 100) / 100;
