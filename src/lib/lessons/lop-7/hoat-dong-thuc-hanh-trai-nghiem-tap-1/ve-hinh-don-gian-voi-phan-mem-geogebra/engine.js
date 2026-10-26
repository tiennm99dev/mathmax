/**
 * Geometry behind the GeoGebra-style construction player of grade 7: a line
 * through a point parallel to a given line, the bisector of an angle, the
 * perpendicular bisector of a segment, and triangles from three sides or from
 * two sides and the included angle. Points live in screen coordinates of the
 * board (y grows downwards); "counterclockwise" means counterclockwise as the
 * learner sees it, the way GeoGebra turns a figure.
 */

import { formatNumber } from '#lib/core/number-format.js';

/** @typedef {{ x: number, y: number }} Pt */

/**
 * @typedef {{ kind: 'point', p: Pt, name: string }
 *   | { kind: 'segment', a: Pt, b: Pt }
 *   | { kind: 'line', p: Pt, d: Pt, name: string, dashed?: boolean }
 *   | { kind: 'ray', p: Pt, through: Pt, name: string }
 *   | { kind: 'circle', c: Pt, r: number }
 *   | { kind: 'angle', at: Pt, from: Pt, to: Pt }} Drawn
 */

/**
 * @typedef {object} Step
 * @property {string} tool GeoGebra tool name, as in the Vietnamese interface
 * @property {string} text what to click
 * @property {Drawn[]} draw objects this step adds
 */

/** @typedef {{ label: string, value: number, unit: 'length' | 'deg' }} Measure */

/**
 * @typedef {object} Built
 * @property {Step[]} steps
 * @property {Measure[]} measures shown once the construction is finished
 * @property {string} verdict what the measures prove
 * @property {boolean} ok false when the data give no figure (circles that do not meet)
 */

/** @param {Pt} a @param {Pt} b */
export function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** @param {Pt} a @param {Pt} b @returns {Pt} */
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
/** @param {Pt} a @param {Pt} b @returns {Pt} */
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
/** @param {Pt} a @param {number} k @returns {Pt} */
const mul = (a, k) => ({ x: a.x * k, y: a.y * k });
/** @param {Pt} a @returns {Pt} */
const unit = (a) => mul(a, 1 / Math.hypot(a.x, a.y));

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
  const u = sub(a, o);
  const v = sub(b, o);
  const cos = (u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
  return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
}

/**
 * Distance from `p` to the line through `a` and `b`.
 * @param {Pt} p @param {Pt} a @param {Pt} b
 */
export function distToLine(p, a, b) {
  const d = sub(b, a);
  return Math.abs(d.x * (p.y - a.y) - d.y * (p.x - a.x)) / Math.hypot(d.x, d.y);
}

/**
 * Foot of the perpendicular from `p` to the line through `p0` with direction `d`.
 * @param {Pt} p @param {Pt} p0 @param {Pt} d
 * @returns {Pt}
 */
export function projectOnLine(p, p0, d) {
  const u = unit(d);
  const t = (p.x - p0.x) * u.x + (p.y - p0.y) * u.y;
  return add(p0, mul(u, t));
}

/**
 * The point C of triangle ABC with AB = c, BC = a, CA = b, drawn
 * counterclockwise from A to B, in a frame where A = (0, 0) and B = (c, 0)
 * (y down, so C has a negative y). Null when the two circles centred at A
 * (radius b) and B (radius a) do not meet in two points: no triangle.
 * @param {number} a BC
 * @param {number} b CA
 * @param {number} c AB
 * @returns {Pt | null}
 */
export function thirdVertexSSS(a, b, c) {
  const x = (b * b + c * c - a * a) / (2 * c);
  const h2 = b * b - x * x;
  if (h2 <= 1e-9) return null;
  return { x, y: -Math.sqrt(h2) };
}

/**
 * The point C of triangle ABC with AB = c, AC = b and angle A = `deg`, in the
 * same frame as {@link thirdVertexSSS}.
 * @param {number} b AC
 * @param {number} deg angle BAC
 * @returns {Pt}
 */
export function thirdVertexSAS(b, deg) {
  const t = (deg * Math.PI) / 180;
  return { x: b * Math.cos(t), y: -b * Math.sin(t) };
}

/**
 * Scale (board px per unit) and offset that fit the points `pts`, given in
 * units, inside a `w` × `h` board with margin `pad`, at most `maxScale`.
 * @param {Pt[]} pts
 * @param {number} w
 * @param {number} h
 * @param {number} pad
 * @param {number} maxScale
 */
export function fitToBoard(pts, w, h, pad, maxScale) {
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const s = Math.min(
    maxScale,
    (w - 2 * pad) / Math.max(1e-9, maxX - minX),
    (h - 2 * pad) / Math.max(1e-9, maxY - minY),
  );
  const ox = (w - s * (maxX - minX)) / 2 - s * minX;
  const oy = (h - s * (maxY - minY)) / 2 - s * minY;
  /** @param {Pt} p @returns {Pt} */
  const place = (p) => ({ x: ox + s * p.x, y: oy + s * p.y });
  return { scale: s, place };
}

/** The constructions the player can run. */
export const FIGURES = /** @type {const} */ ([
  { value: 'song-song', label: 'Đường song song' },
  { value: 'phan-giac', label: 'Tia phân giác' },
  { value: 'trung-truc', label: 'Đường trung trực' },
  { value: 'ccc', label: 'Tam giác biết 3 cạnh' },
  { value: 'cgc', label: 'Tam giác biết 2 cạnh, 1 góc' },
]);

/** @typedef {(typeof FIGURES)[number]['value']} Figure */

/**
 * @typedef {object} State
 * @property {Pt} a free point A (px)
 * @property {Pt} b free point B (px)
 * @property {Pt} m free point M (parallel), C (bisector) or M on g (perpendicular bisector)
 * @property {number} unit board px per length unit, for the free figures
 * @property {number} ab triangle side AB, in units
 * @property {number} bc triangle side BC (three sides)
 * @property {number} ca triangle side CA (three sides) or AC (two sides and angle)
 * @property {number} angle angle BAC, in degrees (two sides and angle)
 * @property {number} w board width (px)
 * @property {number} h board height (px)
 */

/** @param {number} v */
const num = (v) => formatNumber(v, 2);

/**
 * Where the board draws the triangle figures: A, B (and C when it exists) in
 * px, and the px per unit used.
 * @param {'ccc' | 'cgc'} figure
 * @param {State} s
 */
export function placeTriangle(figure, s) {
  const A = { x: 0, y: 0 };
  const B = { x: s.ab, y: 0 };
  const C = figure === 'ccc' ? thirdVertexSSS(s.bc, s.ca, s.ab) : thirdVertexSAS(s.ca, s.angle);
  // With no triangle, fit both circles so the learner sees that they miss.
  const frame = C
    ? [A, B, C]
    : [
        { x: -s.ca, y: -s.ca },
        { x: s.ca, y: s.ca },
        { x: s.ab - s.bc, y: -s.bc },
        { x: s.ab + s.bc, y: s.bc },
      ];
  const { scale, place } = fitToBoard(frame, s.w, s.h, 26, 44);
  return { A: place(A), B: place(B), C: C ? place(C) : null, scale };
}

/**
 * Steps to run `figure`, and the measures GeoGebra's "Góc" and "Khoảng cách
 * hoặc độ dài" tools would show at the end.
 * @param {Figure} figure
 * @param {State} s
 * @returns {Built}
 */
export function construction(figure, s) {
  if (figure === 'song-song') return parallel(s);
  if (figure === 'phan-giac') return bisector(s);
  if (figure === 'trung-truc') return perpendicularBisector(s);
  return figure === 'ccc' ? triangleSSS(s) : triangleSAS(s);
}

/** @param {State} s @returns {Built} */
function parallel({ a, b, m, unit: u }) {
  const d = sub(b, a);
  const n = add(m, mul(unit(d), -70));
  const alt1 = angleAt(m, a, b);
  const alt2 = angleAt(a, m, n);
  return {
    ok: true,
    steps: [
      {
        tool: 'Đường thẳng',
        text: 'Chọn công cụ Đường thẳng, nháy chuột vào hai điểm A và B: được đường thẳng a.',
        draw: [
          { kind: 'point', p: a, name: 'A' },
          { kind: 'point', p: b, name: 'B' },
          { kind: 'line', p: a, d, name: 'a' },
        ],
      },
      {
        tool: 'Điểm mới',
        text: 'Chọn công cụ Điểm mới, nháy chuột vào một chỗ nằm ngoài đường thẳng a: được điểm M.',
        draw: [{ kind: 'point', p: m, name: 'M' }],
      },
      {
        tool: 'Đường song song',
        text: 'Chọn công cụ Đường song song, nháy chuột vào điểm M rồi vào đường thẳng a: được đường thẳng g đi qua M và song song với a.',
        draw: [{ kind: 'line', p: m, d, name: 'g' }],
      },
      {
        tool: 'Góc',
        text: 'Vẽ đoạn thẳng AM. Chọn công cụ Góc, đo hai góc so le trong MAB và AMN (N là một điểm trên g).',
        draw: [
          { kind: 'segment', a, b: m },
          { kind: 'point', p: n, name: 'N' },
          { kind: 'angle', at: a, from: b, to: m },
          { kind: 'angle', at: m, from: n, to: a },
        ],
      },
    ],
    measures: [
      { label: 'Góc MAB', value: alt1, unit: 'deg' },
      { label: 'Góc AMN', value: alt2, unit: 'deg' },
      { label: 'Khoảng cách từ M đến a', value: distToLine(m, a, b) / u, unit: 'length' },
    ],
    verdict:
      'Hai góc so le trong MAB và AMN bằng nhau, nên g song song với a. Kéo M đi đâu, GeoGebra cũng chỉ cho đúng một đường thẳng g: qua một điểm nằm ngoài một đường thẳng chỉ có một đường thẳng song song với đường thẳng đó (tiên đề Euclid).',
  };
}

/** @param {State} s @returns {Built} */
function bisector({ a, b, m: c }) {
  const dir = add(unit(sub(b, a)), unit(sub(c, a)));
  const t = add(a, mul(unit(dir), 120));
  return {
    ok: true,
    steps: [
      {
        tool: 'Tia đi qua hai điểm',
        text: 'Chọn công cụ Tia đi qua hai điểm, nháy vào A rồi B: được tia AB. Làm lại với A rồi C: được tia AC, ta có góc BAC.',
        draw: [
          { kind: 'point', p: a, name: 'A' },
          { kind: 'ray', p: a, through: b, name: '' },
          { kind: 'ray', p: a, through: c, name: '' },
        ],
      },
      {
        tool: 'Góc',
        text: 'Chọn công cụ Góc, nháy lần lượt vào B, A, C để đo góc BAC.',
        draw: [{ kind: 'angle', at: a, from: b, to: c }],
      },
      {
        tool: 'Đường phân giác',
        text: 'Chọn công cụ Đường phân giác, nháy lần lượt vào B, A, C. Phần đường thẳng nằm trong góc BAC là tia phân giác At.',
        draw: [
          { kind: 'line', p: a, d: dir, name: '', dashed: true },
          { kind: 'ray', p: a, through: t, name: 't' },
        ],
      },
      {
        tool: 'Góc',
        text: 'Lấy một điểm t trên tia phân giác, đo hai góc BAt và tAC.',
        draw: [
          { kind: 'angle', at: a, from: b, to: t },
          { kind: 'angle', at: a, from: t, to: c },
        ],
      },
    ],
    measures: [
      { label: 'Góc BAC', value: angleAt(b, a, c), unit: 'deg' },
      { label: 'Góc BAt', value: angleAt(b, a, t), unit: 'deg' },
      { label: 'Góc tAC', value: angleAt(t, a, c), unit: 'deg' },
    ],
    verdict:
      'Tia At nằm giữa hai tia AB, AC và tạo với hai cạnh hai góc bằng nhau, mỗi góc bằng nửa góc BAC: At là tia phân giác của góc BAC. Kéo B hoặc C, hai góc vẫn luôn bằng nhau.',
  };
}

/**
 * The perpendicular bisector of AB: its midpoint I and its direction.
 * @param {Pt} a @param {Pt} b
 */
export function bisectorLine(a, b) {
  const i = mul(add(a, b), 0.5);
  const d = sub(b, a);
  return { i, d: { x: -d.y, y: d.x } };
}

/** @param {State} s @returns {Built} */
function perpendicularBisector({ a, b, m, unit: u }) {
  const { i, d } = bisectorLine(a, b);
  const onG = add(i, mul(unit(d), 1));
  return {
    ok: true,
    steps: [
      {
        tool: 'Đoạn thẳng',
        text: 'Chọn công cụ Đoạn thẳng, nháy vào A rồi B: được đoạn thẳng AB.',
        draw: [
          { kind: 'point', p: a, name: 'A' },
          { kind: 'point', p: b, name: 'B' },
          { kind: 'segment', a, b },
        ],
      },
      {
        tool: 'Đường trung trực',
        text: 'Chọn công cụ Đường trung trực, nháy chuột vào đoạn thẳng AB: được đường thẳng g.',
        draw: [{ kind: 'line', p: i, d, name: 'g' }],
      },
      {
        tool: 'Trung điểm hoặc tâm',
        text: 'Kiểm tra: chọn công cụ Trung điểm hoặc tâm, nháy vào đoạn AB: được trung điểm I, nằm đúng trên g. Đo góc giữa g và AB.',
        draw: [
          { kind: 'point', p: i, name: 'I' },
          { kind: 'angle', at: i, from: b, to: onG },
        ],
      },
      {
        tool: 'Khoảng cách hoặc độ dài',
        text: 'Lấy điểm M trên g (kéo được), vẽ MA, MB và đo hai độ dài này.',
        draw: [
          { kind: 'segment', a: m, b: a },
          { kind: 'segment', a: m, b },
          { kind: 'point', p: m, name: 'M' },
        ],
      },
    ],
    measures: [
      { label: 'IA', value: dist(i, a) / u, unit: 'length' },
      { label: 'IB', value: dist(i, b) / u, unit: 'length' },
      { label: 'Góc giữa g và AB', value: angleAt(b, i, onG), unit: 'deg' },
      { label: 'MA', value: dist(m, a) / u, unit: 'length' },
      { label: 'MB', value: dist(m, b) / u, unit: 'length' },
    ],
    verdict:
      'g vuông góc với AB tại trung điểm I, nên g là đường trung trực của AB. Kéo M trên g: luôn có MA = MB, mọi điểm của đường trung trực cách đều hai đầu mút A, B.',
  };
}

/**
 * The opening step of both triangles: segment AB of the given length.
 * @param {Pt} A @param {Pt} B @param {number} ab @param {number} scale
 * @returns {Step}
 */
function sideAB(A, B, ab, scale) {
  return {
    tool: 'Đường tròn khi biết tâm và bán kính',
    text: `Vẽ điểm A, vẽ đường tròn tâm A bán kính ${num(ab)}, lấy điểm B trên đường tròn đó rồi vẽ đoạn thẳng AB: AB = ${num(ab)} cm.`,
    draw: [
      { kind: 'circle', c: A, r: ab * scale },
      { kind: 'point', p: A, name: 'A' },
      { kind: 'point', p: B, name: 'B' },
      { kind: 'segment', a: A, b: B },
    ],
  };
}

/**
 * Side lengths (units) and angles of triangle ABC drawn at `scale` px per unit.
 * @param {Pt} A @param {Pt} B @param {Pt} C @param {number} scale
 * @returns {Measure[]}
 */
function triangleMeasures(A, B, C, scale) {
  return [
    { label: 'AB', value: dist(A, B) / scale, unit: 'length' },
    { label: 'BC', value: dist(B, C) / scale, unit: 'length' },
    { label: 'CA', value: dist(C, A) / scale, unit: 'length' },
    { label: 'Góc A', value: angleAt(B, A, C), unit: 'deg' },
    { label: 'Góc B', value: angleAt(A, B, C), unit: 'deg' },
    { label: 'Góc C', value: angleAt(A, C, B), unit: 'deg' },
  ];
}

/**
 * Kind of triangle from its angles, in Vietnamese.
 * @param {number[]} angles
 */
export function triangleKind(angles) {
  const big = Math.max(...angles);
  if (Math.abs(big - 90) < 0.05) return 'tam giác vuông';
  return big > 90 ? 'tam giác tù' : 'tam giác nhọn';
}

/** @param {State} s @returns {Built} */
function triangleSSS(s) {
  const { A, B, C, scale } = placeTriangle('ccc', s);
  const circles = [
    {
      tool: 'Đường tròn khi biết tâm và bán kính',
      text: `Vẽ đường tròn tâm B bán kính ${num(s.bc)} (vì BC = ${num(s.bc)} cm).`,
      draw: [{ kind: 'circle', c: B, r: s.bc * scale }],
    },
    {
      tool: 'Đường tròn khi biết tâm và bán kính',
      text: `Vẽ đường tròn tâm A bán kính ${num(s.ca)} (vì CA = ${num(s.ca)} cm).`,
      draw: [{ kind: 'circle', c: A, r: s.ca * scale }],
    },
  ];
  /** @type {Step[]} */
  const opening = [sideAB(A, B, s.ab, scale), .../** @type {Step[]} */ (circles)];
  if (!C) {
    return {
      ok: false,
      steps: [
        ...opening,
        {
          tool: 'Giao điểm của 2 đối tượng',
          text: 'Chọn công cụ Giao điểm của 2 đối tượng, nháy vào hai đường tròn vừa vẽ: GeoGebra không tìm được giao điểm.',
          draw: [],
        },
      ],
      measures: [],
      verdict: `Hai đường tròn tâm A bán kính ${num(s.ca)} và tâm B bán kính ${num(s.bc)} không cắt nhau, nên không có điểm C: không vẽ được tam giác có ba cạnh ${num(s.ab)}; ${num(s.bc)}; ${num(s.ca)}.`,
    };
  }
  const measures = triangleMeasures(A, B, C, scale);
  const kind = triangleKind(measures.filter((x) => x.unit === 'deg').map((x) => x.value));
  return {
    ok: true,
    steps: [
      ...opening,
      {
        tool: 'Giao điểm của 2 đối tượng',
        text: 'Chọn công cụ Giao điểm của 2 đối tượng, nháy vào hai đường tròn vừa vẽ: giao điểm (phía trên AB) là C.',
        draw: [{ kind: 'point', p: C, name: 'C' }],
      },
      {
        tool: 'Đoạn thẳng',
        text: 'Vẽ các đoạn thẳng BC, CA rồi ẩn các đường tròn (bỏ chọn Hiển thị đối tượng): được tam giác ABC.',
        draw: [
          { kind: 'segment', a: B, b: C },
          { kind: 'segment', a: C, b: A },
        ],
      },
    ],
    measures,
    verdict: `C cách A một khoảng ${num(s.ca)} và cách B một khoảng ${num(s.bc)}, nên tam giác ABC có đúng ba cạnh đã cho. Đo các góc: đây là ${kind}. Mọi tam giác vẽ từ cùng ba cạnh này đều bằng nhau (trường hợp cạnh – cạnh – cạnh).`,
  };
}

/** @param {State} s @returns {Built} */
function triangleSAS(s) {
  const { A, B, C, scale } = placeTriangle('cgc', s);
  const c = /** @type {Pt} */ (C);
  const b1 = rotate(B, A, s.angle);
  const measures = triangleMeasures(A, B, c, scale);
  const angles = measures.filter((x) => x.unit === 'deg').map((x) => x.value);
  const kind = triangleKind(angles);
  return {
    ok: true,
    steps: [
      sideAB(A, B, s.ab, scale),
      {
        tool: 'Góc với số đo cho trước',
        text: `Chọn công cụ Góc với số đo cho trước, nháy vào B rồi A, gõ ${num(s.angle)}° và chọn ngược chiều kim đồng hồ: được điểm B'. Vẽ tia AB'.`,
        draw: [
          { kind: 'angle', at: A, from: B, to: b1 },
          { kind: 'ray', p: A, through: b1, name: '' },
          { kind: 'point', p: b1, name: "B'" },
        ],
      },
      {
        tool: 'Đường tròn khi biết tâm và bán kính',
        text: `Vẽ đường tròn tâm A bán kính ${num(s.ca)}; giao điểm của nó với tia AB' là C, nên AC = ${num(s.ca)} cm.`,
        draw: [
          { kind: 'circle', c: A, r: s.ca * scale },
          { kind: 'point', p: c, name: 'C' },
        ],
      },
      {
        tool: 'Đoạn thẳng',
        text: 'Vẽ các đoạn thẳng AC, BC rồi ẩn đường tròn, tia và điểm phụ: được tam giác ABC.',
        draw: [
          { kind: 'segment', a: A, b: c },
          { kind: 'segment', a: B, b: c },
        ],
      },
    ],
    measures: [
      ...measures,
      { label: 'Tổng ba góc', value: angles[0] + angles[1] + angles[2], unit: 'deg' },
    ],
    verdict: `Tam giác ABC có AB = ${num(s.ab)} cm, AC = ${num(s.ca)} cm và góc xen giữa A = ${num(s.angle)}°; đo các góc thấy đây là ${kind}, tổng ba góc bằng 180°. Mọi tam giác vẽ từ cùng hai cạnh và góc xen giữa này đều bằng nhau (trường hợp cạnh – góc – cạnh).`,
  };
}
