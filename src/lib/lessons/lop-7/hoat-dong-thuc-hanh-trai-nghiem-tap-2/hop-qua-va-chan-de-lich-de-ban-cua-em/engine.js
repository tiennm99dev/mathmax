/**
 * Nets that fold into a gift box (hình hộp chữ nhật, hình lập phương) and a
 * desk-calendar stand (hình lăng trụ đứng tam giác), with their glue flaps
 * (mép dán), and the cardboard each one needs.
 *
 * A net is a tree of flat polygons in the plane z = 0, in centimetres. The
 * root lies on the table; every other piece hangs off its parent along a
 * shared edge (the fold line) and turns up about it, towards +z, by
 * `t · angle`, so t = 0 is the flat net and t = 1 the folded solid.
 */

/** @typedef {{ x: number, y: number }} P2 */
/** @typedef {{ x: number, y: number, z: number }} P3 */
/**
 * @typedef {object} Piece
 * @property {string} id
 * @property {'face' | 'flap'} kind a face of the solid, or a glue flap
 * @property {string} name what the piece is called, in Vietnamese
 * @property {P2[]} pts corners in the flat net
 * @property {string | null} parent id of the piece it hangs off
 * @property {[P2, P2] | null} hinge the fold line, shared with the parent
 * @property {number} angle how far it turns when fully folded, in radians
 */

/** Width of a glue flap, in cm. */
export const FLAP = 1;

const RIGHT = Math.PI / 2;

/** @param {number} x0 @param {number} y0 @param {number} x1 @param {number} y1 */
const rect = (x0, y0, x1, y1) => [
  { x: x0, y: y0 },
  { x: x1, y: y0 },
  { x: x1, y: y1 },
  { x: x0, y: y1 },
];

/**
 * A glue flap of width FLAP on the segment p → q, on the side of `away`,
 * with its two ends cut at 45°.
 * @param {P2} p @param {P2} q @param {P2} away a point on the flap's side
 */
function flap(p, q, away) {
  const len = Math.hypot(q.x - p.x, q.y - p.y);
  const u = { x: (q.x - p.x) / len, y: (q.y - p.y) / len };
  let n = { x: -u.y, y: u.x };
  if ((away.x - p.x) * n.x + (away.y - p.y) * n.y < 0) n = { x: -n.x, y: -n.y };
  const f = FLAP;
  return [
    p,
    q,
    { x: q.x - u.x * f + n.x * f, y: q.y - u.y * f + n.y * f },
    { x: p.x + u.x * f + n.x * f, y: p.y + u.y * f + n.y * f },
  ];
}

/**
 * The gift box: length a, width b, height c (a = b = c for a cube). The
 * bottom lies on the table; the four walls make one strip, with a glue flap
 * at its end; the lid hangs off the back wall and tucks into the front with
 * a flap, and the bottom has a tuck flap too, as in the book.
 * @param {number} a @param {number} b @param {number} c
 * @returns {Piece[]}
 */
export function boxNet(a, b, c) {
  const x1 = a;
  const x2 = a + b;
  const x3 = 2 * a + b;
  const x4 = 2 * a + 2 * b;
  return [
    {
      id: 'day',
      kind: 'face',
      name: 'Mặt đáy',
      pts: rect(0, 0, a, b),
      parent: null,
      hinge: null,
      angle: 0,
    },
    {
      id: 'truoc',
      kind: 'face',
      name: 'Mặt trước',
      pts: rect(0, -c, x1, 0),
      parent: 'day',
      hinge: [
        { x: 0, y: 0 },
        { x: a, y: 0 },
      ],
      angle: RIGHT,
    },
    {
      id: 'phai',
      kind: 'face',
      name: 'Mặt bên phải',
      pts: rect(x1, -c, x2, 0),
      parent: 'truoc',
      hinge: [
        { x: x1, y: -c },
        { x: x1, y: 0 },
      ],
      angle: RIGHT,
    },
    {
      id: 'sau',
      kind: 'face',
      name: 'Mặt sau',
      pts: rect(x2, -c, x3, 0),
      parent: 'phai',
      hinge: [
        { x: x2, y: -c },
        { x: x2, y: 0 },
      ],
      angle: RIGHT,
    },
    {
      id: 'trai',
      kind: 'face',
      name: 'Mặt bên trái',
      pts: rect(x3, -c, x4, 0),
      parent: 'sau',
      hinge: [
        { x: x3, y: -c },
        { x: x3, y: 0 },
      ],
      angle: RIGHT,
    },
    {
      id: 'mep-than',
      kind: 'flap',
      name: 'Mép dán thân hộp',
      pts: flap({ x: x4, y: 0 }, { x: x4, y: -c }, { x: x4 + 1, y: 0 }),
      parent: 'trai',
      hinge: [
        { x: x4, y: -c },
        { x: x4, y: 0 },
      ],
      angle: RIGHT,
    },
    {
      id: 'nap',
      kind: 'face',
      name: 'Nắp hộp',
      pts: rect(x2, -c - b, x3, -c),
      parent: 'sau',
      hinge: [
        { x: x2, y: -c },
        { x: x3, y: -c },
      ],
      angle: RIGHT,
    },
    {
      id: 'mep-nap',
      kind: 'flap',
      name: 'Mép gài nắp',
      pts: flap({ x: x2, y: -c - b }, { x: x3, y: -c - b }, { x: x2, y: -c - b - 1 }),
      parent: 'nap',
      hinge: [
        { x: x2, y: -c - b },
        { x: x3, y: -c - b },
      ],
      angle: RIGHT,
    },
    {
      id: 'mep-day',
      kind: 'flap',
      name: 'Mép gài đáy',
      pts: flap({ x: 0, y: b }, { x: a, y: b }, { x: 0, y: b + 1 }),
      parent: 'day',
      hinge: [
        { x: 0, y: b },
        { x: a, y: b },
      ],
      angle: RIGHT,
    },
  ];
}

/**
 * Isosceles triangles for the calendar stand's cross-section: base w, the
 * two equal sides s and the height m on the base, in cm (w² / 4 + m² = s²,
 * so the folded stand closes exactly).
 */
export const TRIANGLES = [
  { w: 8, s: 5, m: 3 },
  { w: 6, s: 5, m: 4 },
  { w: 12, s: 10, m: 8 },
  { w: 16, s: 10, m: 6 },
];

/**
 * The calendar stand: a right prism lying on a rectangular face. Its
 * cross-section is the isosceles triangle (w, s, s) with height m, and it is
 * L long. The net is a strip of three rectangles (w, s, s) with a glue flap,
 * plus the two triangular ends when `ends` is set.
 * @param {{ w: number, s: number, m: number }} tri
 * @param {number} L
 * @param {boolean} ends
 * @returns {Piece[]}
 */
export function standNet(tri, L, ends) {
  const { w, s, m } = tri;
  const base = Math.atan2(m, w / 2); // base angle of the triangle
  const apex = Math.PI - 2 * base;
  /** @type {Piece[]} */
  const pieces = [
    {
      id: 'day',
      kind: 'face',
      name: 'Mặt đáy (nằm trên bàn)',
      pts: rect(0, 0, L, w),
      parent: null,
      hinge: null,
      angle: 0,
    },
    {
      id: 'mat-lich',
      kind: 'face',
      name: 'Mặt dán lịch',
      pts: rect(0, w, L, w + s),
      parent: 'day',
      hinge: [
        { x: 0, y: w },
        { x: L, y: w },
      ],
      angle: Math.PI - base,
    },
    {
      id: 'mat-sau',
      kind: 'face',
      name: 'Mặt sau',
      pts: rect(0, w + s, L, w + 2 * s),
      parent: 'mat-lich',
      hinge: [
        { x: 0, y: w + s },
        { x: L, y: w + s },
      ],
      angle: Math.PI - apex,
    },
    {
      id: 'mep',
      kind: 'flap',
      name: 'Mép dán',
      pts: flap({ x: 0, y: w + 2 * s }, { x: L, y: w + 2 * s }, { x: 0, y: w + 2 * s + 1 }),
      parent: 'mat-sau',
      hinge: [
        { x: 0, y: w + 2 * s },
        { x: L, y: w + 2 * s },
      ],
      angle: Math.PI - base,
    },
  ];
  if (ends) {
    pieces.push(
      {
        id: 'tam-giac-trai',
        kind: 'face',
        name: 'Mặt tam giác bên trái',
        pts: [
          { x: 0, y: 0 },
          { x: 0, y: w },
          { x: -m, y: w / 2 },
        ],
        parent: 'day',
        hinge: [
          { x: 0, y: 0 },
          { x: 0, y: w },
        ],
        angle: RIGHT,
      },
      {
        id: 'tam-giac-phai',
        kind: 'face',
        name: 'Mặt tam giác bên phải',
        pts: [
          { x: L, y: 0 },
          { x: L + m, y: w / 2 },
          { x: L, y: w },
        ],
        parent: 'day',
        hinge: [
          { x: L, y: 0 },
          { x: L, y: w },
        ],
        angle: RIGHT,
      },
    );
  }
  return pieces;
}

/**
 * Area of a polygon (shoelace formula).
 * @param {P2[]} pts
 */
export function polygonArea(pts) {
  let s = 0;
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length];
    s += p.x * q.y - q.x * p.y;
  });
  return Math.abs(s) / 2;
}

/**
 * The cardboard a net needs: the faces (the solid's surface), the glue
 * flaps, their sum, and the smallest sheet, a rectangle with sides along the
 * fold lines of the strip, that holds the whole net.
 * @param {Piece[]} net
 */
export function material(net) {
  const faces = net.filter((p) => p.kind === 'face').reduce((s, p) => s + polygonArea(p.pts), 0);
  const flaps = net.filter((p) => p.kind === 'flap').reduce((s, p) => s + polygonArea(p.pts), 0);
  const all = net.flatMap((p) => p.pts);
  const xs = all.map((p) => p.x);
  const ys = all.map((p) => p.y);
  const width = Math.max(...xs) - Math.min(...xs);
  const height = Math.max(...ys) - Math.min(...ys);
  return { faces, flaps, total: faces + flaps, width, height, sheet: width * height };
}

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
/** @param {P2} p */
const lift = (p) => ({ x: p.x, y: p.y, z: 0 });

/**
 * Rotates p about the line through o with unit direction u by `angle`
 * (Rodrigues' formula).
 * @param {P3} p @param {P3} o @param {P3} u @param {number} angle
 */
function rotate(p, o, u, angle) {
  const v = sub(p, o);
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const r = add(add(mul(v, c), mul(cross(u, v), s)), mul(u, dot(u, v) * (1 - c)));
  return add(o, r);
}

/**
 * The pieces of a net folded by t (0 flat, 1 folded), as 3D polygons. Each
 * piece turns about its fold line so that it rises off the table (+z) in its
 * parent's frame, then moves with its parent.
 * @param {Piece[]} net
 * @param {number} t
 * @returns {{ piece: Piece, pts: P3[] }[]}
 */
export function fold(net, t) {
  const k = Math.min(1, Math.max(0, t));
  /** @type {Map<string, (p: P3) => P3>} */
  const place = new Map();
  /** @param {Piece} piece @returns {(p: P3) => P3} */
  function placer(piece) {
    const known = place.get(piece.id);
    if (known) return known;
    /** @type {(p: P3) => P3} */
    let f = (p) => p;
    if (piece.parent && piece.hinge) {
      const parent = net.find((q) => q.id === piece.parent);
      if (!parent) throw new Error(`no piece ${piece.parent}`);
      const up = placer(parent);
      const [a, b] = piece.hinge.map(lift);
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      let u = { x: (b.x - a.x) / len, y: (b.y - a.y) / len, z: 0 };
      // Turn so that the piece's middle rises: (u × v).z > 0.
      const mid = piece.pts.reduce((s, p) => ({ x: s.x + p.x, y: s.y + p.y }), { x: 0, y: 0 });
      const v = sub(lift({ x: mid.x / piece.pts.length, y: mid.y / piece.pts.length }), a);
      if (cross(u, v).z < 0) u = mul(u, -1);
      const angle = k * piece.angle;
      f = (p) => up(rotate(p, a, u, angle));
    }
    place.set(piece.id, f);
    return f;
  }
  return net.map((piece) => {
    const f = placer(piece);
    return { piece, pts: piece.pts.map((p) => f(lift(p))) };
  });
}

/**
 * Turns a model point for an orthographic view: `yaw` spins about the
 * vertical axis, `pitch` tilts the eye above the table (degrees). Returns
 * screen coordinates (y down) and the depth towards the viewer.
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
