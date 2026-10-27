/**
 * Geometry behind the GeoGebra-style construction player. Points live in
 * screen coordinates of the board (y grows downwards); "counterclockwise"
 * always means counterclockwise as the learner sees it, the way GeoGebra
 * turns a figure.
 */

import { dist } from '#lib/geom-engine/plane.js';

/** @typedef {{ x: number, y: number }} Pt */

/**
 * @typedef {{ kind: 'point', p: Pt, name: string }
 *   | { kind: 'segment', a: Pt, b: Pt, name: string }
 *   | { kind: 'circle', c: Pt, r: number }
 *   | { kind: 'polygon', pts: Pt[] }
 *   | { kind: 'angle', at: Pt, from: Pt, deg: number }} Drawn
 */

/**
 * @typedef {object} Step
 * @property {string} tool GeoGebra tool name, as in the Vietnamese interface
 * @property {string} text what to click
 * @property {Drawn[]} draw objects this step adds
 */

/** @typedef {{ label: string, value: number, unit: 'length' | 'deg' }} Measure */

/**
 * Turns `p` around `c` by `deg` degrees, counterclockwise on screen.
 * @param {Pt} p
 * @param {Pt} c
 * @param {number} deg
 * @returns {Pt}
 */
export function rotate(p, c, deg) {
  const t = (deg * Math.PI) / 180;
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return {
    x: c.x + dx * Math.cos(t) + dy * Math.sin(t),
    y: c.y - dx * Math.sin(t) + dy * Math.cos(t),
  };
}

/**
 * Size of the angle at `o` between rays `oa` and `ob`, in degrees (0 to 180).
 * @param {Pt} a
 * @param {Pt} o
 * @param {Pt} b
 */
export function angleAt(a, o, b) {
  const u = { x: a.x - o.x, y: a.y - o.y };
  const v = { x: b.x - o.x, y: b.y - o.y };
  const cos = (u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
  return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
}

/**
 * The vertices of the regular polygon with `n` vertices on side AB, going
 * counterclockwise from A to B, as GeoGebra's "Đa giác đều" tool draws it.
 * @param {Pt} a
 * @param {Pt} b
 * @param {number} n
 */
export function regularPolygon(a, b, n) {
  const interior = 180 - 360 / n;
  const pts = [a, b];
  while (pts.length < n) {
    const prev = pts[pts.length - 2];
    const cur = pts[pts.length - 1];
    pts.push(rotate(prev, cur, -interior));
  }
  return pts;
}

/**
 * Where two circles meet: 0, 1 or 2 points.
 * @param {Pt} c1
 * @param {number} r1
 * @param {Pt} c2
 * @param {number} r2
 * @returns {Pt[]}
 */
export function circleIntersections(c1, r1, c2, r2) {
  const d = dist(c1, c2);
  if (d === 0 || d > r1 + r2 || d < Math.abs(r1 - r2)) return [];
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
  const mx = c1.x + (a * (c2.x - c1.x)) / d;
  const my = c1.y + (a * (c2.y - c1.y)) / d;
  const ox = (h * (c2.y - c1.y)) / d;
  const oy = (h * (c2.x - c1.x)) / d;
  if (h === 0) return [{ x: mx, y: my }];
  return [
    { x: mx + ox, y: my - oy },
    { x: mx - ox, y: my + oy },
  ];
}

const NAMES = ['A', 'B', 'C', 'D', 'E', 'F'];

/** The figures the player can build. */
export const FIGURES = /** @type {const} */ ([
  { value: 'tam-giac-deu', label: 'Tam giác đều' },
  { value: 'hinh-vuong', label: 'Hình vuông' },
  { value: 'luc-giac-deu', label: 'Lục giác đều' },
  { value: 'hinh-thoi', label: 'Hình thoi' },
]);

/** @typedef {(typeof FIGURES)[number]['value']} Figure */

/**
 * Steps to build `figure` from the two free points A and B, and the measures
 * the "Khoảng cách hoặc độ dài" and "Góc" tools would show at the end.
 * @param {Figure} figure
 * @param {Pt} a
 * @param {Pt} b
 * @returns {{ steps: Step[], measures: Measure[], verdict: string }}
 */
export function construction(figure, a, b) {
  /** @type {Step[]} */
  const start = [
    {
      tool: 'Điểm mới',
      text: 'Chọn nhóm công cụ Điểm, chọn Điểm mới, nháy chuột vào vùng làm việc để vẽ hai điểm A và B.',
      draw: [
        { kind: 'point', p: a, name: 'A' },
        { kind: 'point', p: b, name: 'B' },
      ],
    },
  ];

  if (figure === 'tam-giac-deu') {
    const b1 = rotate(b, a, 60);
    return {
      steps: [
        ...start,
        {
          tool: 'Đoạn thẳng',
          text: 'Chọn nhóm công cụ Đường thẳng, chọn Đoạn thẳng, nháy vào A rồi B để vẽ đoạn AB.',
          draw: [{ kind: 'segment', a, b, name: 'AB' }],
        },
        {
          tool: 'Góc với số đo cho trước',
          text: "Chọn nhóm công cụ Góc, chọn Góc với số đo cho trước, nháy vào B rồi A, gõ 60° và chọn ngược chiều kim đồng hồ: GeoGebra tạo điểm B'.",
          draw: [
            { kind: 'angle', at: a, from: b, deg: 60 },
            { kind: 'point', p: b1, name: "B'" },
          ],
        },
        {
          tool: 'Đoạn thẳng',
          text: "Vẽ thêm hai đoạn thẳng AB' và BB'.",
          draw: [
            { kind: 'segment', a, b: b1, name: "AB'" },
            { kind: 'segment', a: b, b: b1, name: "BB'" },
          ],
        },
      ],
      measures: [
        { label: 'AB', value: dist(a, b), unit: 'length' },
        { label: "AB'", value: dist(a, b1), unit: 'length' },
        { label: "BB'", value: dist(b, b1), unit: 'length' },
        { label: "Góc BAB'", value: angleAt(b, a, b1), unit: 'deg' },
      ],
      verdict:
        "B' là ảnh của B khi quay quanh A một góc 60°, nên AB' = AB. Tam giác cân ABB' có góc ở đỉnh A bằng 60°, đo ba cạnh thấy bằng nhau: ABB' là tam giác đều.",
    };
  }

  if (figure === 'hinh-thoi') {
    const r = dist(a, b);
    const [c, d] = circleIntersections(a, r, b, r);
    return {
      steps: [
        ...start,
        {
          tool: 'Đường tròn khi biết tâm và 1 điểm trên đường tròn',
          text: 'Chọn nhóm công cụ Đường tròn, chọn Đường tròn khi biết tâm và 1 điểm trên đường tròn, nháy vào A rồi B.',
          draw: [{ kind: 'circle', c: a, r }],
        },
        {
          tool: 'Đường tròn khi biết tâm và 1 điểm trên đường tròn',
          text: 'Làm lại với tâm B: nháy vào B rồi A.',
          draw: [{ kind: 'circle', c: b, r }],
        },
        {
          tool: 'Giao điểm của 2 đối tượng',
          text: 'Chọn nhóm công cụ Điểm, chọn Giao điểm của 2 đối tượng, nháy vào hai đường tròn: được hai giao điểm C và D.',
          draw: [
            { kind: 'point', p: c, name: 'C' },
            { kind: 'point', p: d, name: 'D' },
          ],
        },
        {
          tool: 'Đoạn thẳng',
          text: 'Vẽ các đoạn thẳng AC, CB, BD, DA rồi ẩn hai đường tròn (bỏ chọn Hiển thị đối tượng).',
          draw: [
            { kind: 'segment', a, b: c, name: 'AC' },
            { kind: 'segment', a: c, b, name: 'CB' },
            { kind: 'segment', a: b, b: d, name: 'BD' },
            { kind: 'segment', a: d, b: a, name: 'DA' },
          ],
        },
      ],
      measures: [
        { label: 'AC', value: dist(a, c), unit: 'length' },
        { label: 'CB', value: dist(c, b), unit: 'length' },
        { label: 'BD', value: dist(b, d), unit: 'length' },
        { label: 'DA', value: dist(d, a), unit: 'length' },
      ],
      verdict:
        'C và D nằm trên cả hai đường tròn bán kính AB, nên AC = AD = AB và BC = BD = AB. Tứ giác ACBD có bốn cạnh bằng nhau: đó là hình thoi.',
    };
  }

  const n = figure === 'hinh-vuong' ? 4 : 6;
  const pts = regularPolygon(a, b, n);
  const names = NAMES.slice(0, n);
  const sides = pts.map((p, i) => ({
    label: `${names[i]}${names[(i + 1) % n]}`,
    value: dist(p, pts[(i + 1) % n]),
    unit: /** @type {const} */ ('length'),
  }));
  return {
    steps: [
      ...start,
      {
        tool: 'Đa giác đều',
        text: `Chọn nhóm công cụ Đa giác, chọn Đa giác đều, nháy vào A rồi B, gõ số đỉnh ${n} và chọn OK.`,
        draw: [
          { kind: 'polygon', pts },
          ...pts.slice(2).map((p, i) => ({
            kind: /** @type {const} */ ('point'),
            p,
            name: names[i + 2],
          })),
        ],
      },
      {
        tool: 'Khoảng cách hoặc độ dài',
        text: 'Chọn nhóm công cụ Góc, chọn Khoảng cách hoặc độ dài, nháy vào từng cạnh để đo; chọn Góc rồi nháy vào hình để đo các góc.',
        draw: [],
      },
    ],
    measures: [
      ...sides,
      {
        label: `Góc ${names[n - 1]}AB`,
        value: angleAt(pts[n - 1], pts[0], pts[1]),
        unit: 'deg',
      },
      { label: 'Góc ABC', value: angleAt(pts[0], pts[1], pts[2]), unit: 'deg' },
    ],
    verdict:
      n === 4
        ? 'Bốn cạnh bằng AB và bốn góc đều bằng 90°: ABCD là hình vuông. Kéo A hoặc B, hình vẫn là hình vuông.'
        : 'Sáu cạnh bằng AB và sáu góc đều bằng 120°: ABCDEF là lục giác đều. Kéo A hoặc B, hình vẫn là lục giác đều.',
  };
}
