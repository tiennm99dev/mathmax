/**
 * The two solids of this chapter, khối lập phương and khối hộp chữ nhật, as
 * boxes for the turning drawings: the six faces of a box, faces hidden
 * between touching boxes, the face groups of equal size, everyday objects
 * of each shape with their decorations, and walls of unit cubes for
 * counting. Pure and DOM-free; the view itself is `#lib/geom-engine/solid.js`.
 *
 * Model space: z points up, the ground is z = 0, a box stands on its corner
 * `pos` with sides a (along x), b (along y) and c (height).
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {'lap-phuong' | 'hop-chu-nhat'} SolidKind */
/** @typedef {'front' | 'back' | 'left' | 'right' | 'top' | 'bottom'} FaceId */
/** @typedef {{ a: number, b: number, c: number }} Dims */
/** @typedef {'dice' | 'ribbon' | 'rubik' | 'label' | 'door' | 'lid' | 'brick'} Deco */
/**
 * @typedef {object} Box
 * @property {P3} [pos] front-left-bottom corner, the origin when left out
 * @property {Dims} dims
 * @property {string} color fill colour (hex)
 * @property {Partial<Record<FaceId, string>>} [faceColors] colours of single faces
 * @property {Deco} [deco] what is drawn on the faces
 */
/**
 * @typedef {object} BoxFace
 * @property {string} id
 * @property {'bottom' | 'top' | 'side'} kind
 * @property {number} index
 * @property {FaceId} face
 * @property {number} box index of the box in the list
 * @property {P3[]} pts corners, counter-clockwise seen from outside
 */

/** Solids in the book's order. */
export const SOLIDS = /** @type {const} */ (['lap-phuong', 'hop-chu-nhat']);

/** Names as the book writes them. */
export const SOLID_NAMES = /** @type {const} */ ({
  'lap-phuong': 'khối lập phương',
  'hop-chu-nhat': 'khối hộp chữ nhật',
});

/** One sentence a child hears about each solid. */
export const SOLID_LOOKS = /** @type {const} */ ({
  'lap-phuong': 'Khối lập phương có 6 mặt đều là hình vuông to bằng nhau.',
  'hop-chu-nhat':
    'Khối hộp chữ nhật có 6 mặt, có mặt là hình chữ nhật, các mặt không to bằng nhau hết.',
});

/**
 * "Khối lập phương" with a capital letter, for buttons and options.
 * @param {SolidKind} kind
 */
export function solidTitle(kind) {
  const name = SOLID_NAMES[kind];
  return name[0].toUpperCase() + name.slice(1);
}

/**
 * True when all three sides are equal: the box is a cube.
 * @param {Dims} d
 */
export function isCube(d) {
  return Math.abs(d.a - d.b) < 1e-9 && Math.abs(d.b - d.c) < 1e-9;
}

/**
 * Which solid a box is.
 * @param {Dims} d
 * @returns {SolidKind}
 */
export function kindOf(d) {
  return isCube(d) ? 'lap-phuong' : 'hop-chu-nhat';
}

/**
 * The six faces of a box, each listed counter-clockwise seen from outside.
 * @param {Box} box
 * @param {number} [index] index of the box in a list
 * @returns {BoxFace[]}
 */
export function boxFaces(box, index = 0) {
  const o = box.pos ?? { x: 0, y: 0, z: 0 };
  const { a, b, c } = box.dims;
  /** @param {number} i @param {number} j @param {number} k @returns {P3} */
  const p = (i, j, k) => ({ x: o.x + i * a, y: o.y + j * b, z: o.z + k * c });
  /** @type {Array<[FaceId, P3[]]>} */
  const list = [
    ['bottom', [p(0, 0, 0), p(0, 1, 0), p(1, 1, 0), p(1, 0, 0)]],
    ['top', [p(0, 0, 1), p(1, 0, 1), p(1, 1, 1), p(0, 1, 1)]],
    ['front', [p(0, 0, 0), p(1, 0, 0), p(1, 0, 1), p(0, 0, 1)]],
    ['right', [p(1, 0, 0), p(1, 1, 0), p(1, 1, 1), p(1, 0, 1)]],
    ['back', [p(0, 1, 0), p(0, 1, 1), p(1, 1, 1), p(1, 1, 0)]],
    ['left', [p(0, 0, 0), p(0, 0, 1), p(0, 1, 1), p(0, 1, 0)]],
  ];
  return list.map(([face, pts], i) => ({
    id: `${index}-${face}`,
    kind: face === 'top' || face === 'bottom' ? face : 'side',
    index: face === 'top' || face === 'bottom' ? -1 : i - 2,
    face,
    box: index,
    pts,
  }));
}

/** @param {P3[]} pts */
const planeKey = (pts) =>
  pts
    .map((q) => `${q.x.toFixed(4)},${q.y.toFixed(4)},${q.z.toFixed(4)}`)
    .sort()
    .join('|');

/**
 * The faces of all boxes except those pressed against a face of another box,
 * which lie inside the stack and are never seen.
 * @param {Box[]} boxes
 * @returns {BoxFace[]}
 */
export function outerFaces(boxes) {
  const all = boxes.flatMap((b, i) => boxFaces(b, i));
  /** @type {Map<string, number>} */
  const seen = new Map();
  for (const f of all) seen.set(planeKey(f.pts), (seen.get(planeKey(f.pts)) ?? 0) + 1);
  return all.filter((f) => seen.get(planeKey(f.pts)) === 1);
}

/**
 * The two sides of a face, smaller first.
 * @param {FaceId} face
 * @param {Dims} d
 * @returns {[number, number]}
 */
export function faceSides(face, d) {
  const pair =
    face === 'top' || face === 'bottom'
      ? [d.a, d.b]
      : face === 'front' || face === 'back'
        ? [d.a, d.c]
        : [d.b, d.c];
  return /** @type {[number, number]} */ (pair.sort((x, y) => x - y));
}

/**
 * Groups of faces of equal size: 1 for a cube, 2 or 3 for any other box.
 * Each face gets the number of its group, the biggest faces first.
 * @param {Dims} d
 * @returns {Record<FaceId, number>}
 */
export function faceGroups(d) {
  /** @type {FaceId[]} */
  const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
  const keys = [...new Set(faces.map((f) => faceSides(f, d).join('x')))].sort((p, q) => {
    const [a1, b1] = p.split('x').map(Number);
    const [a2, b2] = q.split('x').map(Number);
    return a2 * b2 - a1 * b1;
  });
  return /** @type {Record<FaceId, number>} */ (
    Object.fromEntries(faces.map((f) => [f, keys.indexOf(faceSides(f, d).join('x'))]))
  );
}

/**
 * True when a face is a square.
 * @param {FaceId} face
 * @param {Dims} d
 */
export function isSquareFace(face, d) {
  const [s, t] = faceSides(face, d);
  return Math.abs(s - t) < 1e-9;
}

/**
 * Everyday objects in the book's pictures, each with the solid it has.
 * @type {ReadonlyArray<{ id: string, name: string, kind: SolidKind, box: Box }>}
 */
export const OBJECTS = [
  {
    id: 'xuc-xac',
    name: 'con xúc xắc',
    kind: 'lap-phuong',
    box: { dims: { a: 2, b: 2, c: 2 }, color: '#f8fafc', deco: 'dice' },
  },
  {
    id: 'hop-qua',
    name: 'hộp quà',
    kind: 'lap-phuong',
    box: { dims: { a: 2, b: 2, c: 2 }, color: '#f43f5e', deco: 'ribbon' },
  },
  {
    id: 'rubik',
    name: 'khối rubik',
    kind: 'lap-phuong',
    box: {
      dims: { a: 3, b: 3, c: 3 },
      color: '#facc15',
      deco: 'rubik',
      faceColors: {
        top: '#f8fafc',
        front: '#ef4444',
        right: '#22c55e',
        left: '#3b82f6',
        back: '#f97316',
        bottom: '#facc15',
      },
    },
  },
  {
    id: 'hop-sua',
    name: 'hộp sữa',
    kind: 'hop-chu-nhat',
    box: { dims: { a: 2, b: 1.4, c: 3.6 }, color: '#e0f2fe', deco: 'label' },
  },
  {
    id: 'vien-gach',
    name: 'viên gạch',
    kind: 'hop-chu-nhat',
    box: { dims: { a: 4, b: 2, c: 1.2 }, color: '#c2410c', deco: 'brick' },
  },
  {
    id: 'hop-but',
    name: 'hộp bút',
    kind: 'hop-chu-nhat',
    box: { dims: { a: 5, b: 1.6, c: 1.2 }, color: '#8b5cf6', deco: 'lid' },
  },
  {
    id: 'cai-tu',
    name: 'cái tủ',
    kind: 'hop-chu-nhat',
    box: { dims: { a: 3, b: 1.6, c: 4.4 }, color: '#d97706', deco: 'door' },
  },
];

/** @typedef {(typeof OBJECTS)[number]} SolidObject */

/**
 * "Con xúc xắc có dạng khối lập phương."
 * @param {SolidObject} o
 */
export function objectSentence(o) {
  const name = o.name[0].toUpperCase() + o.name.slice(1);
  return `${name} có dạng ${SOLID_NAMES[o.kind]}.`;
}

/**
 * A wall of unit cubes standing side by side on one row: heights[i] cubes
 * stacked in column i. Every cube shows its front face.
 * @param {readonly number[]} heights
 * @param {string} [color]
 * @returns {Box[]}
 */
export function cubeWall(heights, color = '#60a5fa') {
  /** @type {Box[]} */
  const boxes = [];
  heights.forEach((h, i) => {
    for (let k = 0; k < h; k++) {
      boxes.push({ pos: { x: i, y: 0, z: k }, dims: { a: 1, b: 1, c: 1 }, color });
    }
  });
  return boxes;
}

/**
 * The corner and size of the smallest box holding all boxes.
 * @param {Box[]} boxes
 */
export function bounds(boxes) {
  const pts = boxes.flatMap((b) => boxFaces(b).flatMap((f) => f.pts));
  const lo = {
    x: Math.min(...pts.map((p) => p.x)),
    y: Math.min(...pts.map((p) => p.y)),
    z: Math.min(...pts.map((p) => p.z)),
  };
  const hi = {
    x: Math.max(...pts.map((p) => p.x)),
    y: Math.max(...pts.map((p) => p.y)),
    z: Math.max(...pts.map((p) => p.z)),
  };
  return {
    centre: { x: (lo.x + hi.x) / 2, y: (lo.y + hi.y) / 2, z: (lo.z + hi.z) / 2 },
    radius: Math.hypot(hi.x - lo.x, hi.y - lo.y, hi.z - lo.z) / 2,
  };
}

/**
 * A point of a face given by its place (u, v) on the face, both from 0 to 1:
 * u runs from the first corner to the second, v from the first to the last.
 * In an orthographic view the face stays a parallelogram, so this map works
 * on screen points too.
 * @template {{ x: number, y: number }} T
 * @param {T[]} pts
 * @param {number} u
 * @param {number} v
 */
export function onFace(pts, u, v) {
  const [p0, p1, , p3] = pts;
  return {
    x: p0.x + u * (p1.x - p0.x) + v * (p3.x - p0.x),
    y: p0.y + u * (p1.y - p0.y) + v * (p3.y - p0.y),
  };
}

/** Dots of a dice face, in (u, v) places. Opposite faces add up to 7. */
const PIPS = /** @type {Record<number, Array<[number, number]>>} */ ({
  1: [[0.5, 0.5]],
  2: [
    [0.28, 0.28],
    [0.72, 0.72],
  ],
  3: [
    [0.25, 0.25],
    [0.5, 0.5],
    [0.75, 0.75],
  ],
  4: [
    [0.28, 0.28],
    [0.72, 0.28],
    [0.28, 0.72],
    [0.72, 0.72],
  ],
  5: [
    [0.25, 0.25],
    [0.75, 0.25],
    [0.5, 0.5],
    [0.25, 0.75],
    [0.75, 0.75],
  ],
  6: [
    [0.28, 0.22],
    [0.28, 0.5],
    [0.28, 0.78],
    [0.72, 0.22],
    [0.72, 0.5],
    [0.72, 0.78],
  ],
});

/** Number of dots on each face of the dice. */
export const DICE = /** @type {Record<FaceId, number>} */ ({
  top: 1,
  bottom: 6,
  front: 2,
  back: 5,
  right: 3,
  left: 4,
});

/**
 * @typedef {object} DecoMark
 * @property {'dot' | 'band' | 'line'} type
 * @property {Array<[number, number]>} uv places on the face: a dot centre, a band's corners, a line's ends
 * @property {number} [r] dot radius as a share of the face
 * @property {string} [fill]
 */

/**
 * What to draw on one face of a decorated box, in (u, v) places.
 * @param {Deco | undefined} deco
 * @param {FaceId} face
 * @returns {DecoMark[]}
 */
export function decoMarks(deco, face) {
  if (deco === 'dice') {
    return PIPS[DICE[face]].map((uv) => ({ type: 'dot', uv: [uv], r: 0.09, fill: '#1e293b' }));
  }
  if (deco === 'ribbon') {
    /** @param {number} u0 @param {number} u1 @returns {DecoMark} */
    const across = (u0, u1) => ({
      type: 'band',
      uv: [
        [u0, 0],
        [u1, 0],
        [u1, 1],
        [u0, 1],
      ],
      fill: '#fde047',
    });
    /** @type {DecoMark[]} */
    const marks = [across(0.42, 0.58)];
    if (face === 'top' || face === 'bottom') {
      marks.push({
        type: 'band',
        uv: [
          [0, 0.42],
          [1, 0.42],
          [1, 0.58],
          [0, 0.58],
        ],
        fill: '#fde047',
      });
    }
    return marks;
  }
  if (deco === 'rubik') {
    /** @type {DecoMark[]} */
    const lines = [];
    for (const t of [1 / 3, 2 / 3]) {
      lines.push({
        type: 'line',
        uv: [
          [t, 0],
          [t, 1],
        ],
      });
      lines.push({
        type: 'line',
        uv: [
          [0, t],
          [1, t],
        ],
      });
    }
    return lines;
  }
  if (deco === 'label' && (face === 'front' || face === 'back')) {
    return [
      {
        type: 'band',
        uv: [
          [0, 0.3],
          [1, 0.3],
          [1, 0.62],
          [0, 0.62],
        ],
        fill: '#2563eb',
      },
      { type: 'dot', uv: [[0.5, 0.46]], r: 0.11, fill: '#f8fafc' },
    ];
  }
  if (deco === 'brick' && face !== 'top' && face !== 'bottom') {
    return [
      {
        type: 'line',
        uv: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
    ];
  }
  if (deco === 'lid' && face !== 'top' && face !== 'bottom') {
    return [
      {
        type: 'line',
        uv: [
          [0, 0.72],
          [1, 0.72],
        ],
      },
    ];
  }
  if (deco === 'door' && face === 'front') {
    return [
      {
        type: 'line',
        uv: [
          [0.5, 0.04],
          [0.5, 0.96],
        ],
      },
      { type: 'dot', uv: [[0.42, 0.55]], r: 0.04, fill: '#1e293b' },
      { type: 'dot', uv: [[0.58, 0.55]], r: 0.04, fill: '#1e293b' },
    ];
  }
  return [];
}

/**
 * A colour mixed towards white (k > 0) or black (k < 0).
 * @param {string} hex '#rrggbb'
 * @param {number} k from −1 to 1
 */
export function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) =>
    Math.round(k >= 0 ? v + (255 - v) * k : v * (1 + k)),
  );
  return `#${ch.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

const NUMBER_WORDS = [
  'không',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
  'mười',
];

/**
 * "một, hai, ba" counted up to n (at most 10).
 * @param {number} n
 */
export function countAloud(n) {
  return NUMBER_WORDS.slice(1, n + 1).join(', ');
}
