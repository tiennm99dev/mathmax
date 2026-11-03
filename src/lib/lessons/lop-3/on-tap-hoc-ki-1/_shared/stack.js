/**
 * A box built from small cubes and painted on the outside: how many faces of
 * each small cube got paint, and where its three visible faces are drawn in a
 * corner view. Pure and DOM-free.
 */

/** Size of a small cube's edge, in SVG units. */
const EDGE = 26;
const RUN = EDGE * 0.87;
const RISE = EDGE * 0.5;

/**
 * The size of a box, in small cubes: `a` along one side, `b` along the other,
 * `c` layers high.
 * @typedef {{ a: number, b: number, c: number }} Dims
 */

/**
 * @param {number} i
 * @param {number} size
 */
const onEnd = (i, size) => (i === 0 ? 1 : 0) + (i === size - 1 ? 1 : 0);

/**
 * How many faces of the small cube at (x, y, z) are on the outside of the box.
 * @param {Dims} dims
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
export function paintedFaces({ a, b, c }, x, y, z) {
  return onEnd(x, a) + onEnd(y, b) + onEnd(z, c);
}

/**
 * How many small cubes of the box have exactly `faces` faces painted.
 * @param {Dims} dims
 * @param {number} faces
 */
export function countPainted(dims, faces) {
  let count = 0;
  for (let x = 0; x < dims.a; x++) {
    for (let y = 0; y < dims.b; y++) {
      for (let z = 0; z < dims.c; z++) {
        if (paintedFaces(dims, x, y, z) === faces) count++;
      }
    }
  }
  return count;
}

/**
 * The small cubes far to near, each with the corners of its visible faces, in
 * a frame that fits the box.
 * @param {Dims} dims
 */
export function cubeFaces(dims) {
  const { a, b, c } = dims;
  const left = b * RUN + 6;
  const top = c * EDGE + 6;
  /** @param {number} x @param {number} y @param {number} z */
  const at = (x, y, z) => ({
    x: left + (x - y) * RUN,
    y: top + (x + y) * RISE - z * EDGE,
  });
  /** @type {{ x: number, y: number, z: number }[]} */
  const cubes = [];
  for (let z = 0; z < c; z++) {
    for (let sum = 0; sum <= a + b - 2; sum++) {
      for (let x = 0; x < a; x++) {
        const y = sum - x;
        if (y >= 0 && y < b) cubes.push({ x, y, z });
      }
    }
  }
  return {
    w: (a + b) * RUN + 12,
    h: (a + b) * RISE + c * EDGE + 12,
    cubes: cubes.map(({ x, y, z }) => ({
      id: `${x}-${y}-${z}`,
      painted: paintedFaces(dims, x, y, z),
      top: [at(x, y, z + 1), at(x + 1, y, z + 1), at(x + 1, y + 1, z + 1), at(x, y + 1, z + 1)],
      side: [at(x, y + 1, z + 1), at(x + 1, y + 1, z + 1), at(x + 1, y + 1, z), at(x, y + 1, z)],
      front: [at(x + 1, y, z + 1), at(x + 1, y + 1, z + 1), at(x + 1, y + 1, z), at(x + 1, y, z)],
    })),
  };
}
