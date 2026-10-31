/**
 * Cylinders, cones and spheres for the chapter "Một số hình khối trong thực
 * tiễn" (lớp 9): their measures the book's way (with the factor of π kept
 * apart, so a widget can write "60π ≈ 188,5"), and the pieces of a turning
 * drawing: rims, the strips of a surface of revolution swept through an
 * angle, the visible and hidden runs of a rim, and SVG paths that fill many
 * strips without seams.
 *
 * Model space as in `#lib/geom-engine/solid.js`: z points up, the axis of
 * every solid is the z-axis and its base lies on z = 0.
 */

import { facesViewer, viewPoint } from '#lib/geom-engine/solid.js';
import { fmt, formatNumber } from '#lib/core/number-format.js';
import { toFraction } from '#lib/core/fractions.js';

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {import('#lib/geom-engine/solid.js').View} View */
/** @typedef {{ x: number, y: number }} P2 */

/**
 * A measure as the book writes it, rounded to `places` decimals: '12',
 * '37,7', '1.256,6'.
 * @param {number} v
 * @param {number} [places]
 */
export function num(v, places = 1) {
  const r = Math.round(v * 10 ** places) / 10 ** places;
  return Number.isInteger(r) && r >= 0 ? fmt(r) : formatNumber(r, places);
}

/**
 * k·π written as plain text: '60π', '32π/3', 'π', '0'. A k that is not a
 * simple fraction is written rounded: '12,57π'.
 * @param {number} k
 */
export function piText(k) {
  const f = toFraction(k, 100);
  if (!f || Math.abs(f.n / f.d - k) > 1e-9) return `${num(k, 2)}π`;
  if (f.n === 0) return '0';
  const top = f.n === 1 ? 'π' : `${fmt(f.n)}π`;
  return f.d === 1 ? top : `${top}/${f.d}`;
}

/**
 * Hình trụ bán kính đáy r, chiều cao h. Each measure comes with its factor
 * of π (`k`), since S_xq = 2πrh, S_đáy = πr², V = πr²h.
 * @param {number} r
 * @param {number} h
 */
export function cylinderMeasures(r, h) {
  const k = { lateral: 2 * r * h, base: r * r, total: 2 * r * h + 2 * r * r, volume: r * r * h };
  return {
    k,
    lateral: Math.PI * k.lateral,
    base: Math.PI * k.base,
    total: Math.PI * k.total,
    volume: Math.PI * k.volume,
    circumference: 2 * Math.PI * r,
  };
}

/**
 * Hình nón bán kính đáy r, chiều cao h: đường sinh l = √(r² + h²),
 * S_xq = πrl, V = ⅓πr²h, and the angle of its unrolled side (a sector of
 * radius l whose arc is the base circle): 360° · r / l.
 * @param {number} r
 * @param {number} h
 */
export function coneMeasures(r, h) {
  const l = Math.hypot(r, h);
  const k = { lateral: r * l, base: r * r, total: r * l + r * r, volume: (r * r * h) / 3 };
  return {
    l,
    k,
    lateral: Math.PI * k.lateral,
    base: Math.PI * k.base,
    total: Math.PI * k.total,
    volume: Math.PI * k.volume,
    circumference: 2 * Math.PI * r,
    angle: (360 * r) / l,
  };
}

/**
 * Hình cầu bán kính R: S = 4πR², V = ⁴⁄₃πR³.
 * @param {number} R
 */
export function sphereMeasures(R) {
  const k = { area: 4 * R * R, volume: (4 * R * R * R) / 3 };
  return { k, area: Math.PI * k.area, volume: Math.PI * k.volume };
}

/**
 * Radius of the circle cut from a sphere of radius R by a plane at distance
 * d from the centre: √(R² − d²), or 0 when the plane misses or only touches.
 * @param {number} R
 * @param {number} d
 */
export function sectionRadius(R, d) {
  return Math.sqrt(Math.max(0, R * R - d * d));
}

/**
 * Volume of the cap of height k cut from a sphere of radius R (k kept in
 * [0, 2R]): π k² (3R − k) / 3. A whole sphere when k = 2R.
 * @param {number} R
 * @param {number} k
 */
export function capVolume(R, k) {
  const c = Math.max(0, Math.min(2 * R, k));
  return (Math.PI * c * c * (3 * R - c)) / 3;
}

/**
 * Points of the horizontal circle of radius r at height z, from angle
 * `from` to `to` (degrees), `steps` + 1 of them.
 * @param {number} r
 * @param {number} z
 * @param {number} from
 * @param {number} to
 * @param {number} steps
 * @returns {P3[]}
 */
export function rim(r, z, from, to, steps) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = ((from + ((to - from) * i) / steps) * Math.PI) / 180;
    return { x: r * Math.cos(t), y: r * Math.sin(t), z };
  });
}

/**
 * The strips of the surface swept by the segment from (r1, z1) to (r2, z2)
 * of the half-plane at angle θ, as θ turns from `from` to `to` (degrees):
 * the side of a cylinder (r1 = r2) or of a cone (r2 = 0 at the apex). Each
 * strip lists its corners counter-clockwise seen from outside.
 * @param {number} r1
 * @param {number} z1
 * @param {number} r2
 * @param {number} z2
 * @param {number} from
 * @param {number} to
 * @param {number} steps
 * @returns {P3[][]}
 */
export function sweptStrips(r1, z1, r2, z2, from, to, steps) {
  if (steps < 1 || to <= from) return [];
  const low = rim(r1, z1, from, to, steps);
  const high = rim(r2, z2, from, to, steps);
  return Array.from({ length: steps }, (_, i) => [low[i], low[i + 1], high[i + 1], high[i]]);
}

/**
 * The strips split into those whose outer side faces the viewer and the rest.
 * @param {P3[][]} strips
 * @param {View} view
 */
export function splitStrips(strips, view) {
  /** @type {P3[][]} */
  const front = [];
  /** @type {P3[][]} */
  const back = [];
  for (const s of strips) (facesViewer(s, view) ? front : back).push(s);
  return { front, back };
}

/**
 * Consecutive runs of a rim on the viewer's side of its centre (`front`) and
 * on the far side, each run sharing its end point with the next so the
 * drawn rim has no gaps.
 * @param {P3[]} pts
 * @param {View} view
 * @returns {Array<{ front: boolean, pts: P3[] }>}
 */
export function rimRuns(pts, view) {
  /** @type {Array<{ front: boolean, pts: P3[] }>} */
  const runs = [];
  pts.forEach((p, i) => {
    const centre = viewPoint({ x: 0, y: 0, z: p.z }, view).depth;
    const front = viewPoint(p, view).depth > centre + 1e-9;
    const last = runs[runs.length - 1];
    if (last && last.front === front) last.pts.push(p);
    else {
      if (last) last.pts.push(p);
      runs.push({ front, pts: i > 0 ? [pts[i - 1], p] : [p] });
    }
  });
  return runs.filter((r) => r.pts.length > 1);
}

/**
 * Signed area of a screen polygon (positive when it turns clockwise on a
 * screen whose y points down).
 * @param {P2[]} pts
 */
export function screenArea(pts) {
  let s = 0;
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length];
    s += p.x * q.y - q.x * p.y;
  });
  return s / 2;
}

/**
 * One SVG path for many polygons, each turned the same way round, so the
 * nonzero fill rule paints their union in one pass with no seams between
 * neighbours.
 * @param {P2[][]} polys
 */
export function unionPath(polys) {
  return polys
    .map((poly) => {
      const pts = screenArea(poly) < 0 ? [...poly].reverse() : poly;
      return (
        pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join('') + 'Z'
      );
    })
    .join('');
}

/**
 * An open polyline path through screen points.
 * @param {P2[]} pts
 */
export function linePath(pts) {
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join('');
}

/**
 * The two rim angles (degrees) where the outline of a cone of base radius
 * r and height h touches its base circle in the view, or null when the
 * apex is seen inside the base (looking almost straight down).
 * @param {number} r
 * @param {number} h
 * @param {View} view
 * @returns {[number, number] | null}
 */
export function coneOutline(r, h, view) {
  const apex = viewPoint({ x: 0, y: 0, z: h }, view);
  const pts = rim(r, 0, 0, 360, 720).slice(0, 720);
  const screen = pts.map((p) => viewPoint(p, view));
  // The apex is outside the projected base exactly when every direction to
  // the rim lies within less than a half turn.
  const angles = screen.map((p) => Math.atan2(p.y - apex.y, p.x - apex.x));
  let lo = 0;
  let hi = 0;
  angles.forEach((a, i) => {
    if (a < angles[lo]) lo = i;
    if (a > angles[hi]) hi = i;
  });
  const spread = angles[hi] - angles[lo];
  const below = screen.every((p) => p.y > apex.y);
  if (!below || spread >= Math.PI) return null;
  return [lo / 2, hi / 2];
}

/**
 * Scale and offset that fit model points (x right, y down) into a box of
 * width w and height h with padding `pad`, centred.
 * @param {P2[]} pts
 * @param {number} w
 * @param {number} h
 * @param {number} pad
 */
export function fitBox(pts, w, h, pad) {
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = Math.min((w - 2 * pad) / (maxX - minX || 1), (h - 2 * pad) / (maxY - minY || 1));
  const ox = w / 2 - (scale * (minX + maxX)) / 2;
  const oy = h / 2 - (scale * (minY + maxY)) / 2;
  /** @param {P2} p */
  return (p) => ({ x: ox + scale * p.x, y: oy + scale * p.y });
}
