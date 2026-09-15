import {
  compose,
  translate,
  rotate,
  shear,
  applyToPolygon,
} from '$lib/geom-engine/transforms.js';

/**
 * Geometry helpers for the Pythagoras dissection-shear lesson.
 * All coordinates are in SVG viewBox units.
 *
 * Triangle layout (legs axis-aligned):
 *   A  — top apex,    x = R.x,  y = fixed top
 *   R  — right-angle vertex, draggable
 *   H  — horizontal foot, y = R.y, x = fixed right
 *
 * @typedef {{ x: number; y: number }} Pt
 * @typedef {Pt[]} Poly
 */

/**
 * Build square-a polygon (on vertical leg AR, extends LEFT from the leg).
 * Vertices in order: A, R, bottom-left, top-left.
 * @param {Pt} A @param {Pt} R @returns {Poly}
 */
export function squareA(A, R) {
  const a = R.y - A.y; // leg length
  return [A, R, { x: R.x - a, y: R.y }, { x: R.x - a, y: A.y }];
}

/**
 * Build square-b polygon (on horizontal leg RH, extends DOWN from the leg).
 * Vertices: R, H, bottom-right, bottom-left.
 * @param {Pt} R @param {Pt} H @returns {Poly}
 */
export function squareB(R, H) {
  const b = H.x - R.x; // leg length
  return [R, H, { x: H.x, y: R.y + b }, { x: R.x, y: R.y + b }];
}

/**
 * Build square-c polygon (on hypotenuse AH, extends AWAY from triangle).
 * The outward normal direction from AH (away from R) is (a/c, -b/c) scaled by c.
 * Vertices: A, H, H+normal, A+normal.
 * @param {Pt} A @param {Pt} H @param {number} a @param {number} b @param {number} c
 * @returns {Poly}
 */
export function squareC(A, H, a, b, c) {
  // Offset to the far side of the square: the AH direction (b, a) turned a
  // quarter turn, giving (a, -b). Its length is hypot(a, b) = c, so the far
  // edge sits exactly one side-length away.
  const nx = a;
  const ny = -b;
  return [
    A,
    H,
    { x: H.x + nx, y: H.y + ny },
    { x: A.x + nx, y: A.y + ny },
  ];
}

/**
 * Compute the foot of the altitude from R onto hypotenuse AH.
 * F = A + t*(H-A)  where t = dot(R-A, H-A) / |H-A|²
 * For axis-aligned legs (a vertical, b horizontal):
 *   t = a² / c²
 * @param {Pt} A @param {Pt} H @param {number} a @param {number} c @returns {Pt}
 */
export function altitudeFoot(A, H, a, c) {
  const t = (a * a) / (c * c);
  return { x: A.x + t * (H.x - A.x), y: A.y + t * (H.y - A.y) };
}

/**
 * Target polygon for shear-a animation: the "a-rectangle" portion of square-c.
 * This is the rectangle bounded by A, F (altitude foot), and the corresponding
 * two points on the far edge of square-c. Area = a² = a-side × AF.
 * @param {Pt} A @param {Pt} F @param {number} a @param {number} b @param {number} c
 * @returns {Poly}
 */
export function shearATarget(A, F, a, b, c) {
  const nx = a;
  const ny = -b;
  return [
    A,
    F,
    { x: F.x + nx, y: F.y + ny },
    { x: A.x + nx, y: A.y + ny },
  ];
}

/**
 * Target polygon for shear-b animation: the "b-rectangle" portion of square-c.
 * Bounded by F, H, and the far edge of square-c. Area = b².
 * @param {Pt} F @param {Pt} H @param {number} a @param {number} b @param {number} c
 * @returns {Poly}
 */
export function shearBTarget(F, H, a, b, c) {
  const nx = a;
  const ny = -b;
  return [
    F,
    H,
    { x: H.x + nx, y: H.y + ny },
    { x: F.x + nx, y: F.y + ny },
  ];
}

/**
 * Progress of stage `i` (0-based) when the whole morph runs over t ∈ [0,1].
 * @param {number} t @param {number} i @returns {number}
 */
function stage(t, i) {
  return Math.max(0, Math.min(1, t * 3 - i));
}

/**
 * Shear parallel to the hypotenuse-square normal, holding the line through
 * `origin` in that direction fixed. Points move by `lambda` times their
 * offset along AH, which is what slides a vertex onto the altitude foot.
 * @param {Pt} origin @param {number} a @param {number} b @param {number} lambda
 * @returns {import('$lib/geom-engine/transforms.js').Mat3}
 */
function shearAlongNormal(origin, a, b, lambda) {
  const alpha = Math.atan2(a, b); // direction of AH
  return compose(
    translate(-origin.x, -origin.y),
    rotate(-alpha),
    shear(0, -lambda),
    rotate(alpha),
    translate(origin.x, origin.y)
  );
}

/**
 * Area-preserving morph of the square on leg `a` onto the rectangle it equals
 * inside the hypotenuse square. Runs in three stages, each of determinant 1,
 * so the area is exactly a² at every `t`:
 *
 *   1. shear parallel to AH's horizontal leg, sliding R onto H
 *   2. quarter turn about A
 *   3. shear parallel to the hypotenuse-square normal, sliding a vertex onto F
 *
 * @param {Pt} A @param {Pt} R @param {Pt} H
 * @param {number} a @param {number} b @param {number} t 0..1
 * @returns {Poly}
 */
export function morphSquareA(A, R, H, a, b, t) {
  const m = compose(
    // stage 1 — horizontal shear about the line y = A.y
    translate(0, -A.y),
    shear((b * stage(t, 0)) / a, 0),
    translate(0, A.y),
    // stage 2 — quarter turn about A
    rotate((-Math.PI / 2) * stage(t, 1), A),
    // stage 3 — shear onto the altitude foot
    shearAlongNormal(A, a, b, (b / a) * stage(t, 2))
  );
  return applyToPolygon(m, squareA(A, R));
}

/**
 * Area-preserving morph of the square on leg `b` onto its rectangle, mirroring
 * `morphSquareA` about the hypotenuse. Area is exactly b² at every `t`.
 *
 * @param {Pt} R @param {Pt} H
 * @param {number} a @param {number} b @param {number} t 0..1
 * @returns {Poly}
 */
export function morphSquareB(R, H, a, b, t) {
  const m = compose(
    // stage 1 — vertical shear about the line x = H.x
    translate(-H.x, 0),
    shear(0, (a * stage(t, 0)) / b),
    translate(H.x, 0),
    // stage 2 — quarter turn about H, the other way round
    rotate((Math.PI / 2) * stage(t, 1), H),
    // stage 3 — shear onto the altitude foot
    shearAlongNormal(H, a, b, (-a / b) * stage(t, 2))
  );
  return applyToPolygon(m, squareB(R, H));
}

/**
 * Convert a Poly to an SVG points attribute string.
 * @param {Poly} pts @returns {string}
 */
export function polyPoints(pts) {
  return pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
}
