/**
 * A point M on the segment AB, measured in whole millimetres from A: the
 * lengths MA and MB and whether M is the midpoint of AB.
 *
 * @typedef {{ ma: number, mb: number, isMid: boolean, nearer: 'A' | 'B' | null, gap: number }} MidStatus
 */

/**
 * @param {number} ab length of AB, mm
 * @param {number} am distance from A to M along AB, mm (0 to ab)
 * @returns {MidStatus}
 */
export function midStatus(ab, am) {
  const ma = am;
  const mb = ab - am;
  const isMid = ma === mb && ma > 0;
  /** @type {'A' | 'B' | null} */
  let nearer = null;
  if (ma < mb) nearer = 'A';
  else if (ma > mb) nearer = 'B';
  // How far M is from the midpoint, in mm.
  const gap = Math.abs(ma - mb) / 2;
  return { ma, mb, isMid, nearer, gap };
}

/**
 * A new length for AB: an even number of millimetres from `lo` to `hi`, so
 * that its midpoint lies on a whole millimetre, and different from `avoid`.
 * @param {() => number} rand
 * @param {number} avoid
 * @param {number} [lo]
 * @param {number} [hi]
 */
export function newLength(rand, avoid, lo = 30, hi = 100) {
  const count = Math.floor((hi - lo) / 2) + 1;
  for (;;) {
    const ab = lo + 2 * Math.floor(rand() * count);
    if (ab !== avoid) return ab;
  }
}
