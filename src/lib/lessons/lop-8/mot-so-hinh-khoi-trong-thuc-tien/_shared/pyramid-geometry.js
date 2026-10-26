/**
 * Pure geometry for the regular pyramids of this chapter (hình chóp tam giác
 * đều, hình chóp tứ giác đều): the measures the book uses (nửa chu vi đáy p,
 * trung đoạn d, cạnh bên, S_xq = p · d, V = 1/3 · S · h), the faces of the
 * solid unfolded into a net, the water-filled containers of the "rót nước"
 * experiment, and an orthographic view that turns and tilts.
 *
 * Model space is in centimetres: the base lies in the plane z = 0, centred
 * on the origin, z points up. A base polygon is listed counter-clockwise
 * seen from above.
 */

import { formatNumber, fmt } from '#lib/core/number-format.js';

/** @typedef {{ x: number, y: number }} P2 */
/** @typedef {{ x: number, y: number, z: number }} P3 */
/**
 * @typedef {object} Face
 * @property {string} id 'bottom', 'top' or 'side-<i>'
 * @property {'bottom' | 'top' | 'side'} kind
 * @property {number} index side index (edge i of the base), -1 otherwise
 * @property {P3[]} pts corners, counter-clockwise seen from outside the solid
 */

/** @param {P3} a @param {P3} b */
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
/** @param {P3} a @param {P3} b */
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
/** @param {P3} a @param {number} k */
const mul = (a, k) => ({ x: a.x * k, y: a.y * k, z: a.z * k });
/** @param {P3} a @param {P3} b */
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
/** @param {P3} a @param {P3} b */
const cross = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});

/**
 * How the book writes a measure: whole numbers grouped (1 200), others with
 * a decimal comma and at most `places` digits (7,21).
 * @param {number} v
 * @param {number} [places]
 */
export function num(v, places = 2) {
  const r = Math.round(v * 10 ** places) / 10 ** places;
  return Number.isInteger(r) && r >= 0 ? fmt(r) : formatNumber(r, places);
}

/**
 * The regular base polygon with n sides of length a (n = 3 equilateral
 * triangle, n = 4 square), centred on the origin, counter-clockwise, its
 * first edge at the front (smallest y) and parallel to the x-axis.
 * @param {number} n
 * @param {number} a
 * @returns {P2[]}
 */
export function regularBase(n, a) {
  const R = circumradius(n, a);
  // Start so that edge 0 (vertices 0 → 1) lies at the front, horizontal.
  const start = -Math.PI / 2 - Math.PI / n;
  return Array.from({ length: n }, (_, i) => {
    const t = start + (2 * Math.PI * i) / n;
    return { x: R * Math.cos(t), y: R * Math.sin(t) };
  });
}

/**
 * Distance from the centre of a regular n-gon to a vertex.
 * @param {number} n @param {number} a
 */
export function circumradius(n, a) {
  return a / (2 * Math.sin(Math.PI / n));
}

/**
 * Distance from the centre of a regular n-gon to a side (the foot of the
 * height H to the midpoint of a base edge).
 * @param {number} n @param {number} a
 */
export function inradius(n, a) {
  return a / (2 * Math.tan(Math.PI / n));
}

/**
 * Area of the regular base: (√3/4)a² for a triangle, a² for a square.
 * @param {number} n @param {number} a
 */
export function baseArea(n, a) {
  return (n * a * inradius(n, a)) / 2;
}

/**
 * Every measure of the regular pyramid with n-gon base of side a and
 * height h, as the book defines them.
 * @param {number} n
 * @param {number} a
 * @param {number} h
 */
export function pyramidMeasures(n, a, h) {
  const r = inradius(n, a);
  const R = circumradius(n, a);
  const p = (n * a) / 2;
  const d = Math.hypot(h, r);
  const S = baseArea(n, a);
  const lateral = p * d;
  return {
    perimeter: n * a,
    p,
    d,
    edge: Math.hypot(h, R),
    S,
    lateral,
    total: lateral + S,
    volume: (S * h) / 3,
  };
}

/**
 * Puts a face's corners in counter-clockwise order seen from outside a
 * convex solid whose inside contains `inside`.
 * @param {P3[]} pts
 * @param {P3} inside
 */
export function orient(pts, inside) {
  const n = cross(sub(pts[1], pts[0]), sub(pts[2], pts[0]));
  return dot(n, sub(pts[0], inside)) >= 0 ? pts : [...pts].reverse();
}

/**
 * The faces of the regular pyramid S.(base) of height h, unfolded by the
 * fraction t (0 closed, 1 flat). The base stays put; each side triangle
 * turns outwards about its base edge until it lies flat beside the base, so
 * t = 1 is the net: the base with a triangle on each edge.
 * @param {number} n
 * @param {number} a
 * @param {number} h
 * @param {number} t
 * @returns {Face[]}
 */
export function pyramidFaces(n, a, h, t) {
  const base = regularBase(n, a);
  const r = inradius(n, a);
  const d = Math.hypot(h, r);
  const k = Math.min(1, Math.max(0, t));
  // Angle of the face measured from the inward direction in the base plane.
  const closedAngle = Math.atan2(h, r);
  const phi = closedAngle + (Math.PI - closedAngle) * k;
  const up = { x: 0, y: 0, z: 1 };
  const inside = { x: 0, y: 0, z: Math.min(h, 1) / 4 };
  /** @type {Face[]} */
  const faces = [
    {
      id: 'bottom',
      kind: 'bottom',
      index: -1,
      pts: [...base].reverse().map((q) => ({ x: q.x, y: q.y, z: 0 })),
    },
  ];
  for (let i = 0; i < n; i++) {
    const p = { ...base[i], z: 0 };
    const q = { ...base[(i + 1) % n], z: 0 };
    const mid = mul(add(p, q), 0.5);
    const len = Math.hypot(mid.x, mid.y) || 1;
    const inward = { x: -mid.x / len, y: -mid.y / len, z: 0 };
    const apex = add(mid, mul(add(mul(inward, Math.cos(phi)), mul(up, Math.sin(phi))), d));
    // Winding is fixed against the closed solid so it never flips mid-turn.
    const closedApex = { x: 0, y: 0, z: h };
    const ccw = orient([p, q, closedApex], inside)[0] === p;
    faces.push({ id: `side-${i}`, kind: 'side', index: i, pts: ccw ? [p, q, apex] : [q, p, apex] });
  }
  return faces;
}

/**
 * The closed faces of a container: a square-based pyramid standing on its
 * apex (apex at the origin, square top of side a at height h), cut at
 * water level y. Its side faces and its top square at z = y.
 * @param {number} a
 * @param {number} h
 * @param {number} y
 * @returns {Face[]}
 */
export function invertedPyramid(a, h, y) {
  const lvl = Math.max(0, Math.min(h, y));
  const s = h > 0 ? (a * lvl) / h : 0;
  const top = regularBase(4, s).map((q) => ({ x: q.x, y: q.y, z: lvl }));
  const apex = { x: 0, y: 0, z: 0 };
  const inside = { x: 0, y: 0, z: (lvl * 3) / 4 };
  /** @type {Face[]} */
  const faces = [{ id: 'top', kind: 'top', index: -1, pts: orient(top, inside) }];
  for (let i = 0; i < 4; i++) {
    faces.push({
      id: `side-${i}`,
      kind: 'side',
      index: i,
      pts: orient([top[i], top[(i + 1) % 4], apex], inside),
    });
  }
  return faces;
}

/**
 * The faces of a box with square base of side a (centred on the origin) and
 * height y.
 * @param {number} a
 * @param {number} y
 * @returns {Face[]}
 */
export function squareBox(a, y) {
  const base = regularBase(4, a);
  const low = base.map((q) => ({ x: q.x, y: q.y, z: 0 }));
  const high = base.map((q) => ({ x: q.x, y: q.y, z: y }));
  const inside = { x: 0, y: 0, z: y / 2 };
  /** @type {Face[]} */
  const faces = [
    { id: 'bottom', kind: 'bottom', index: -1, pts: orient(low, inside) },
    { id: 'top', kind: 'top', index: -1, pts: orient(high, inside) },
  ];
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    faces.push({
      id: `side-${i}`,
      kind: 'side',
      index: i,
      pts: orient([low[i], low[j], high[j], high[i]], inside),
    });
  }
  return faces;
}

/**
 * The water level in a pyramid container (apex down, height h) holding the
 * fraction f of its volume: the volume up to level y is (y/h)³ of the whole.
 * @param {number} h
 * @param {number} f
 */
export function pyramidLevel(h, f) {
  return h * Math.cbrt(Math.max(0, Math.min(1, f)));
}

/**
 * Turns a model point for an orthographic view: `yaw` spins about the
 * vertical axis, `pitch` tilts the eye up above the ground (degrees).
 * Returns screen coordinates (y down) relative to the model origin and the
 * depth towards the viewer.
 * @param {P3} p
 * @param {{ yaw: number, pitch: number }} view
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
 * @param {{ yaw: number, pitch: number }} view
 */
export function facesViewer(pts, view) {
  const v = pts.slice(0, 3).map((p) => viewPoint(p, view));
  // Camera frame (x right, y up, depth towards the viewer) is right-handed.
  const a = { x: v[1].x - v[0].x, y: -(v[1].y - v[0].y), z: v[1].depth - v[0].depth };
  const b = { x: v[2].x - v[0].x, y: -(v[2].y - v[0].y), z: v[2].depth - v[0].depth };
  return cross(a, b).z > 1e-9;
}

/**
 * Faces in drawing order (farthest first), each with its screen polygon,
 * mean depth and whether its outer side faces the viewer.
 * @param {Face[]} faces
 * @param {{ yaw: number, pitch: number }} view
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
 * Half-widths of the screen box around the projected centre that holds all
 * the points.
 * @param {P3[]} pts
 * @param {{ yaw: number, pitch: number }} view
 */
export function screenBox(pts, view) {
  const v = pts.map((p) => viewPoint(p, view));
  const xs = v.map((p) => p.x);
  const ys = v.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return {
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    rx: (maxX - minX) / 2,
    ry: (maxY - minY) / 2,
  };
}

/**
 * The book's name of a pyramid face from the apex and base vertex names:
 * 'bottom' → ABC, 'side-0' → SAB.
 * @param {string} id
 * @param {string[]} names
 * @param {string} [apex]
 */
export function faceName(id, names, apex = 'S') {
  if (id === 'bottom') return names.join('');
  const i = Number(id.slice(5));
  return `${apex}${names[i]}${names[(i + 1) % names.length]}`;
}

/** SVG path of a closed polygon. @param {{ x: number, y: number }[]} pts */
export function pathOf(pts) {
  return pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';
}

/** @param {number} v */
export const clampPitch = (v) => Math.max(-5, Math.min(80, v));
/** @param {number} v */
export const wrapYaw = (v) => ((((v + 180) % 360) + 360) % 360) - 180;

/**
 * The view after an arrow key, or null for any other key: left/right turn
 * by 10° (30° with Shift), up/down tilt.
 * @param {{ yaw: number, pitch: number }} view
 * @param {string} key
 * @param {boolean} shift
 */
export function turnByKey(view, key, shift) {
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
  return { yaw: wrapYaw(view.yaw + m[0]), pitch: clampPitch(view.pitch + m[1]) };
}
