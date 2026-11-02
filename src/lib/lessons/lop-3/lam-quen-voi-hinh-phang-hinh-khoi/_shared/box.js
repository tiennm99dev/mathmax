/**
 * The cube and the box of this chapter as corners, edges and faces, seen in the
 * turning view of `#lib/geom-engine/solid.js`, and their still picture as a
 * `Scene`. Pure and DOM-free.
 *
 * Model space: z points up, y points away from the viewer and the solid is
 * centred on the origin. Corner i has its x, y and z sides on bits 0, 1 and 2.
 */
import { facesViewer, viewPoint } from '#lib/geom-engine/solid.js';

/** @typedef {import('./scene.js').Pt} Pt */
/** @typedef {import('./scene.js').Scene} Scene */
/** @typedef {'lap-phuong' | 'hop-chu-nhat'} SolidKind */
/** @typedef {{ a: number, b: number, c: number }} Dims */
/** @typedef {{ yaw: number, pitch: number }} View */

/** The two solids with their sizes. The box has three different sides, so no face is a square. */
export const SOLID_DIMS = /** @type {Record<SolidKind, Dims>} */ ({
  'lap-phuong': { a: 2, b: 2, c: 2 },
  'hop-chu-nhat': { a: 3.2, b: 2, c: 1.4 },
});

/** Names as the book writes them. */
export const SOLID_NAMES = /** @type {const} */ ({
  'lap-phuong': 'khối lập phương',
  'hop-chu-nhat': 'khối hộp chữ nhật',
});

/** What each face of a solid is. */
export const FACE_SHAPES = /** @type {const} */ ({
  'lap-phuong': 'hình vuông',
  'hop-chu-nhat': 'hình chữ nhật',
});

/** The view the pictures use: every corner but one is in front. */
export const START_VIEW = /** @type {View} */ ({ yaw: -30, pitch: 22 });

/** Fills of a solid, from its lightest face to its darkest. */
const FILLS = /** @type {const} */ ({
  'lap-phuong': ['#ddd6fe', '#c4b5fd', '#a78bfa'],
  'hop-chu-nhat': ['#fed7aa', '#fdba74', '#fb923c'],
});

/**
 * The six faces, each listing its corners counter-clockwise seen from outside.
 * `tone` picks the fill: the top and bottom are lightest, the left and right
 * darkest, as if lit from above.
 */
export const FACES = /** @type {const} */ ([
  { id: 'duoi', corners: [0, 2, 3, 1], tone: 0 },
  { id: 'tren', corners: [4, 5, 7, 6], tone: 0 },
  { id: 'truoc', corners: [0, 1, 5, 4], tone: 1 },
  { id: 'phai', corners: [1, 3, 7, 5], tone: 2 },
  { id: 'sau', corners: [2, 6, 7, 3], tone: 1 },
  { id: 'trai', corners: [0, 4, 6, 2], tone: 2 },
]);

/** The twelve edges: pairs of corners that differ on one side. */
export const EDGES = /** @type {[number, number][]} */ (
  [0, 1, 2, 3, 4, 5, 6, 7].flatMap((i) =>
    [1, 2, 4].flatMap((bit) => (i & bit ? [] : [[i, i | bit]])),
  )
);

/**
 * The eight corners of a solid in model space.
 * @param {Dims} d
 */
export function corners({ a, b, c }) {
  return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    x: ((i & 1 ? 1 : -1) * a) / 2,
    y: ((i & 2 ? 1 : -1) * b) / 2,
    z: ((i & 4 ? 1 : -1) * c) / 2,
  }));
}

/**
 * What a solid looks like from a view on a `w` × `h` card. A corner or an edge
 * is in front when a face towards the viewer holds it; the others are behind
 * the solid. It fits the card whatever the turn.
 * @param {Dims} d
 * @param {View} view
 * @param {number} w
 * @param {number} h
 */
export function projectBox(d, view, w, h) {
  const model = corners(d);
  const scale = (Math.min(w, h) * 0.4) / (Math.hypot(d.a, d.b, d.c) / 2);
  const points = model.map((p) => {
    const v = viewPoint(p, view);
    return { x: w / 2 + v.x * scale, y: h / 2 + v.y * scale };
  });
  const faces = FACES.map((f) => {
    const pts = f.corners.map((i) => points[i]);
    return {
      id: f.id,
      tone: f.tone,
      corners: f.corners,
      points: pts,
      front: facesViewer(
        f.corners.map((i) => model[i]),
        view,
      ),
      middle: {
        x: pts.reduce((s, p) => s + p.x, 0) / 4,
        y: pts.reduce((s, p) => s + p.y, 0) / 4,
      },
    };
  });
  const seen = new Set(
    faces.flatMap((f) =>
      f.front ? f.corners.map((i, k) => edgeId(i, f.corners[(k + 1) % 4])) : [],
    ),
  );
  const near = new Set(
    faces.flatMap((f) => (f.front ? /** @type {number[]} */ ([...f.corners]) : [])),
  );
  return {
    centre: { x: w / 2, y: h / 2 },
    faces,
    edges: EDGES.map(([i, j]) => ({
      id: edgeId(i, j),
      a: points[i],
      b: points[j],
      front: seen.has(edgeId(i, j)),
    })),
    vertices: points.map((at, i) => ({ id: `d${i}`, at, front: near.has(i) })),
  };
}

/**
 * The id of the edge between two corners, whichever comes first.
 * @param {number} i
 * @param {number} j
 */
export function edgeId(i, j) {
  return `c${Math.min(i, j)}-${Math.max(i, j)}`;
}

/**
 * The fill of a face of a solid.
 * @param {SolidKind} kind
 * @param {number} tone
 */
export function faceFill(kind, tone) {
  return FILLS[kind][tone];
}

/**
 * A still picture of a solid, drawn the book's way: the faces in front, and the
 * edges behind as dashed lines.
 * @param {SolidKind} kind
 * @param {string} label
 * @param {Dims} [dims]
 * @returns {Scene}
 */
export function boxScene(kind, label, dims = SOLID_DIMS[kind]) {
  const w = 320;
  const h = 212;
  const { faces, edges } = projectBox(dims, START_VIEW, w, h);
  return {
    w,
    h,
    label,
    polygons: faces
      .filter((f) => f.front)
      .map((f) => ({ points: f.points, color: faceFill(kind, f.tone) })),
    lines: edges.filter((e) => !e.front).map((e) => ({ a: e.a, b: e.b, dash: true })),
  };
}
