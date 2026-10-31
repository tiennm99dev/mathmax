/**
 * Solids drawn in an orthographic view that turns and tilts: 3D vector
 * arithmetic on `{ x, y, z }`, the view transform, back-face tests, the
 * far-to-near drawing order of faces, and the drag and arrow-key controls of
 * the view.
 *
 * Model space: z points up and the ground is the plane z = 0. A face lists
 * its corners counter-clockwise seen from outside the solid.
 */

/** @typedef {{ x: number, y: number, z: number }} P3 */
/**
 * @typedef {object} Face
 * @property {string} id 'bottom', 'top' or 'side-<i>'
 * @property {'bottom' | 'top' | 'side'} kind
 * @property {number} index side index (edge i of the base), -1 otherwise
 * @property {P3[]} pts corners, counter-clockwise seen from outside the solid
 */
/** @typedef {{ yaw: number, pitch: number }} View */

/** @param {P3} a @param {P3} b @returns {P3} */
export const sub3 = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
/** @param {P3} a @param {P3} b @returns {P3} */
export const add3 = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
/** @param {P3} a @param {number} k @returns {P3} */
export const mul3 = (a, k) => ({ x: a.x * k, y: a.y * k, z: a.z * k });
/** @param {P3} a @param {P3} b */
export const dot3 = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
/** @param {P3} a @param {P3} b @returns {P3} */
export const cross3 = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});

/**
 * Turns a model point for an orthographic view: `yaw` spins about the
 * vertical axis, `pitch` tilts the eye up above the ground (degrees).
 * Returns screen coordinates (y down) relative to the model origin and the
 * depth towards the viewer.
 * @param {P3} p
 * @param {View} view
 */
export function viewPoint(p, view) {
  const a = (view.yaw * Math.PI) / 180;
  const b = (view.pitch * Math.PI) / 180;
  const x = p.x * Math.cos(a) - p.y * Math.sin(a);
  const y = p.x * Math.sin(a) + p.y * Math.cos(a);
  return {
    x,
    y: -(y * Math.sin(b) + p.z * Math.cos(b)),
    depth: -y * Math.cos(b) + p.z * Math.sin(b),
  };
}

/**
 * True when the outer side of a face is towards the viewer.
 * @param {P3[]} pts corners counter-clockwise seen from outside
 * @param {View} view
 */
export function facesViewer(pts, view) {
  const v = pts.slice(0, 3).map((p) => viewPoint(p, view));
  // Camera frame (x right, y up, depth towards the viewer) is right-handed.
  const a = { x: v[1].x - v[0].x, y: -(v[1].y - v[0].y), z: v[1].depth - v[0].depth };
  const b = { x: v[2].x - v[0].x, y: -(v[2].y - v[0].y), z: v[2].depth - v[0].depth };
  return cross3(a, b).z > 1e-9;
}

/**
 * Faces in drawing order (farthest first), each with its screen polygon,
 * mean depth and whether its outer side faces the viewer.
 * @param {Face[]} faces
 * @param {View} view
 * @param {(p: { x: number, y: number }) => { x: number, y: number }} toScreen
 */
export function drawOrder(faces, view, toScreen) {
  return faces
    .map((f) => {
      const v = f.pts.map((p) => viewPoint(p, view));
      return {
        face: f,
        screen: v.map((p) => toScreen(p)),
        depth: v.reduce((s, p) => s + p.depth, 0) / v.length,
        front: facesViewer(f.pts, view),
      };
    })
    .sort((a, b) => a.depth - b.depth);
}

/**
 * A tilt kept between `min` (a little below the ground) and 80° (almost
 * straight down).
 * @param {number} v
 * @param {number} [min]
 */
export const clampPitch = (v, min = -5) => Math.max(min, Math.min(80, v));

/**
 * A turn wrapped into [−180°, 180°).
 * @param {number} v
 */
export const wrapYaw = (v) => ((((v + 180) % 360) + 360) % 360) - 180;

/**
 * The view after an arrow key, or null for any other key: left/right turn
 * by 10° (30° with Shift), up/down tilt, the tilt kept by `clampPitch`.
 * @param {View} view
 * @param {string} key
 * @param {boolean} shift
 * @param {number} [minPitch]
 * @returns {View | null}
 */
export function turnByKey(view, key, shift, minPitch = -5) {
  const step = shift ? 30 : 10;
  /** @type {Record<string, [number, number]>} */
  const moves = {
    ArrowLeft: [step, 0],
    ArrowRight: [-step, 0],
    ArrowUp: [0, step],
    ArrowDown: [0, -step],
  };
  const m = moves[key];
  if (!m) return null;
  return { yaw: wrapYaw(view.yaw + m[0]), pitch: clampPitch(view.pitch + m[1], minPitch) };
}
