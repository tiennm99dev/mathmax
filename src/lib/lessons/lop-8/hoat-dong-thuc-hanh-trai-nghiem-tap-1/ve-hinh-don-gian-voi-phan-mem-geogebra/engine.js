/**
 * Constructions behind the GeoGebra activity of grade 8: a rectangle, a
 * parallelogram from two sides and the included angle, the book's trapezoid
 * ADEC from its four sides, and a check of Thalès' theorem. Points are in
 * centimetres with y pointing up, as on GeoGebra's grid; the widget maps
 * them to the screen.
 */

import { formatNumber } from '#lib/core/number-format.js';

/** @typedef {{ x: number, y: number }} Pt */

/**
 * @typedef {{ kind: 'point', p: Pt, name: string }
 *   | { kind: 'segment', a: Pt, b: Pt }
 *   | { kind: 'line', p: Pt, d: Pt }
 *   | { kind: 'ray', p: Pt, through: Pt }
 *   | { kind: 'circle', c: Pt, r: number }
 *   | { kind: 'polygon', pts: Pt[] }
 *   | { kind: 'angle', at: Pt, from: Pt, to: Pt }} Drawn
 */

/**
 * @typedef {object} Step
 * @property {string} tool GeoGebra tool, as named in the Vietnamese interface
 * @property {string} text what to do
 * @property {Drawn[]} draw objects the step adds
 * @property {boolean} [helper] objects hidden once the figure is finished
 */

/** @typedef {{ label: string, value: number, unit: 'cm' | 'deg' | 'ratio' }} Measure */

/**
 * @typedef {object} Built
 * @property {Step[]} steps
 * @property {Measure[]} measures
 * @property {string} verdict what the measures show
 * @property {boolean} ok false when the data give no figure
 * @property {string[]} [hideAtEnd] helper points hidden once the figure is finished
 */

/** @typedef {'chu-nhat' | 'binh-hanh' | 'hinh-thang' | 'thales'} Figure */

/** @type {ReadonlyArray<{ value: Figure, label: string }>} */
export const FIGURES = [
  { value: 'chu-nhat', label: 'Hình chữ nhật' },
  { value: 'binh-hanh', label: 'Hình bình hành' },
  { value: 'hinh-thang', label: 'Hình thang' },
  { value: 'thales', label: 'Định lí Thalès' },
];

/**
 * @typedef {object} Params
 * @property {number} ab rectangle and parallelogram: side AB
 * @property {number} bc rectangle and parallelogram: side BC
 * @property {number} angle parallelogram: angle ABC in degrees
 * @property {number} big trapezoid: larger base AD
 * @property {number} small trapezoid: smaller base EC
 * @property {number} legAC trapezoid: leg AC
 * @property {number} legDE trapezoid: leg DE
 * @property {Pt} apex Thalès: vertex A (B = (0, 0), C = (6, 0))
 * @property {number} t Thalès: AM / AB
 */

/** @type {Params} */
export const DEFAULTS = {
  ab: 4,
  bc: 3,
  angle: 120,
  big: 6,
  small: 3,
  legAC: 2,
  legDE: 4,
  apex: { x: 2, y: 4 },
  t: 0.4,
};

/** Fixed base of the Thalès triangle. */
export const THALES_B = { x: 0, y: 0 };
export const THALES_C = { x: 6, y: 0 };

/** @param {Pt} a @param {Pt} b */
export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
/** @param {Pt} a @param {Pt} b @returns {Pt} */
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
/** @param {Pt} a @param {Pt} b @returns {Pt} */
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
/** @param {Pt} a @param {number} k @returns {Pt} */
const scale = (a, k) => ({ x: a.x * k, y: a.y * k });
/** @param {Pt} a @param {Pt} b @returns {Pt} */
export const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/**
 * Angle at `o` between rays `oa` and `ob`, in degrees (0 to 180).
 * @param {Pt} a @param {Pt} o @param {Pt} b
 */
export function angleAt(a, o, b) {
  const u = sub(a, o);
  const v = sub(b, o);
  const cos = (u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
  return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
}

/**
 * Third vertex C of a triangle with A = (0, 0), B = (c, 0), AC = b, BC = a,
 * above AB; null when the circles (A; b) and (B; a) do not meet.
 * @param {number} c @param {number} b @param {number} a
 * @returns {Pt | null}
 */
export function thirdVertex(c, b, a) {
  if (c <= 0 || b <= 0 || a <= 0) return null;
  if (!(a < b + c && b < a + c && c < a + b)) return null;
  const x = (b * b - a * a + c * c) / (2 * c);
  return { x, y: Math.sqrt(Math.max(0, b * b - x * x)) };
}

/** @param {Pt} p @param {string} name @returns {Drawn} */
const point = (p, name) => ({ kind: 'point', p, name });
/** @param {Pt} a @param {Pt} b @returns {Drawn} */
const seg = (a, b) => ({ kind: 'segment', a, b });

/**
 * @param {Pt[]} pts
 * @param {string[]} names
 * @returns {Measure[]}
 */
function anglesOf(pts, names) {
  return pts.map((p, i) => ({
    label: `Góc ${names[i]}`,
    value: angleAt(pts[(i + pts.length - 1) % pts.length], p, pts[(i + 1) % pts.length]),
    unit: /** @type {const} */ ('deg'),
  }));
}

/** @param {number} v */
const show = (v) => formatNumber(v, 2);

/** @param {Params} q @returns {Built} */
function rectangle(q) {
  const A = { x: 0, y: 0 };
  const B = { x: q.ab, y: 0 };
  const C = { x: q.ab, y: q.bc };
  const D = { x: 0, y: q.bc };
  const up = { x: 0, y: 1 };
  return {
    ok: true,
    steps: [
      {
        tool: 'Đoạn thẳng với độ dài cố định',
        text: `Nháy vào điểm A, gõ độ dài ${show(q.ab)}: được đoạn AB.`,
        draw: [point(A, 'A'), point(B, 'B'), seg(A, B)],
      },
      {
        tool: 'Đường vuông góc',
        text: 'Nháy vào A rồi vào AB, rồi nháy vào B và AB: hai đường thẳng vuông góc với AB tại A và tại B.',
        draw: [
          { kind: 'line', p: A, d: up },
          { kind: 'line', p: B, d: up },
        ],
        helper: true,
      },
      {
        tool: 'Đường tròn khi biết tâm và bán kính',
        text: `Nháy vào B, gõ bán kính ${show(q.bc)}.`,
        draw: [{ kind: 'circle', c: B, r: q.bc }],
        helper: true,
      },
      {
        tool: 'Giao điểm của 2 đối tượng',
        text: 'Nháy vào đường tròn và đường vuông góc tại B, lấy giao điểm phía trên: điểm C.',
        draw: [point(C, 'C')],
      },
      {
        tool: 'Đường song song',
        text: 'Nháy vào C rồi vào AB; lấy giao điểm D của đường này với đường vuông góc tại A.',
        draw: [{ kind: 'line', p: C, d: { x: 1, y: 0 } }, point(D, 'D')],
        helper: true,
      },
      {
        tool: 'Đa giác',
        text: 'Ẩn các đường phụ, nháy lần lượt A, B, C, D, A: được hình chữ nhật ABCD.',
        draw: [{ kind: 'polygon', pts: [A, B, C, D] }],
      },
    ],
    measures: [
      ...anglesOf([A, B, C, D], ['A', 'B', 'C', 'D']),
      { label: 'AC', value: dist(A, C), unit: 'cm' },
      { label: 'BD', value: dist(B, D), unit: 'cm' },
    ],
    verdict: 'Công cụ Góc cho bốn góc đều bằng 90°, và hai đường chéo bằng nhau: AC = BD.',
  };
}

/** @param {Params} q @returns {Built} */
function parallelogram(q) {
  const A = { x: 0, y: 0 };
  const B = { x: q.ab, y: 0 };
  const turn = ((180 - q.angle) * Math.PI) / 180;
  const dir = { x: Math.cos(turn), y: Math.sin(turn) };
  const A1 = add(B, scale(dir, q.ab));
  const C = add(B, scale(dir, q.bc));
  const D = add(A, sub(C, B));
  const I = midpoint(A, C);
  const J = midpoint(B, D);
  return {
    ok: true,
    steps: [
      {
        tool: 'Đoạn thẳng với độ dài cố định',
        text: `Nháy vào điểm A, gõ độ dài ${show(q.ab)}: được đoạn AB.`,
        draw: [point(A, 'A'), point(B, 'B'), seg(A, B)],
      },
      {
        tool: 'Góc với số đo cho trước',
        text: `Nháy vào A rồi B, gõ ${q.angle}°, chọn cùng chiều kim đồng hồ: được điểm A'. Vẽ tia BA'.`,
        draw: [
          { kind: 'angle', at: B, from: A, to: A1 },
          point(A1, "A'"),
          { kind: 'ray', p: B, through: A1 },
        ],
        helper: true,
      },
      {
        tool: 'Đường tròn khi biết tâm và bán kính',
        text: `Nháy vào B, gõ bán kính ${show(q.bc)}; giao điểm của đường tròn với tia BA' là C.`,
        draw: [{ kind: 'circle', c: B, r: q.bc }, point(C, 'C')],
        helper: true,
      },
      {
        tool: 'Đường song song',
        text: 'Vẽ đường qua A song song với BC và đường qua C song song với AB; giao điểm của chúng là D.',
        draw: [
          { kind: 'line', p: A, d: dir },
          { kind: 'line', p: C, d: { x: 1, y: 0 } },
          point(D, 'D'),
        ],
        helper: true,
      },
      {
        tool: 'Đa giác',
        text: 'Ẩn các đối tượng phụ, nháy lần lượt A, B, C, D, A: được hình bình hành ABCD.',
        draw: [{ kind: 'polygon', pts: [A, B, C, D] }],
      },
      {
        tool: 'Trung điểm hoặc tâm',
        text: 'Lấy trung điểm I của AC và trung điểm J của BD.',
        draw: [seg(A, C), seg(B, D), point(I, 'I ≡ J')],
      },
    ],
    measures: [
      { label: 'AB', value: dist(A, B), unit: 'cm' },
      { label: 'CD', value: dist(C, D), unit: 'cm' },
      { label: 'BC', value: dist(B, C), unit: 'cm' },
      { label: 'DA', value: dist(D, A), unit: 'cm' },
      ...anglesOf([A, B, C, D], ['A', 'B', 'C', 'D']),
      { label: 'IJ', value: dist(I, J), unit: 'cm' },
    ],
    verdict:
      'Các cạnh đối bằng nhau, các góc đối bằng nhau, và IJ = 0: trung điểm của hai đường chéo trùng nhau.',
    hideAtEnd: ["A'"],
  };
}

/** @param {Params} q @returns {Built} */
function trapezoid(q) {
  const A = { x: 0, y: 0 };
  const base = q.big - q.small;
  const B = { x: base, y: 0 };
  const firstStep = {
    tool: 'Đoạn thẳng với độ dài cố định',
    text: `Nháy vào A, gõ độ dài AD − EC = ${show(q.big)} − ${show(q.small)} = ${show(base)}: được đoạn AB.`,
    draw: base > 0 ? [point(A, 'A'), point(B, 'B'), seg(A, B)] : [],
    helper: false,
  };
  if (base <= 0) {
    return {
      ok: false,
      steps: [{ ...firstStep, text: 'Đáy lớn AD phải dài hơn đáy nhỏ EC.' }],
      measures: [],
      verdict: 'Không dựng được: đáy lớn AD phải dài hơn đáy nhỏ EC.',
    };
  }
  const C = thirdVertex(base, q.legAC, q.legDE);
  /** @type {Step} */
  const circles = {
    tool: 'Đường tròn khi biết tâm và bán kính',
    text: `Vẽ đường tròn tâm A bán kính ${show(q.legAC)} và đường tròn tâm B bán kính ${show(q.legDE)}; giao điểm của chúng là C.`,
    draw: [
      { kind: 'circle', c: A, r: q.legAC },
      { kind: 'circle', c: B, r: q.legDE },
      ...(C ? [point(C, 'C'), seg(A, C), seg(B, C)] : []),
    ],
    helper: true,
  };
  if (!C) {
    return {
      ok: false,
      steps: [firstStep, { ...circles, text: `${circles.text} Hai đường tròn không cắt nhau!` }],
      measures: [],
      verdict: `Không dựng được: không có tam giác ABC với AB = ${show(base)}, AC = ${show(q.legAC)}, BC = ${show(q.legDE)} (cạnh lớn nhất phải nhỏ hơn tổng hai cạnh kia).`,
    };
  }
  const D = { x: q.big, y: 0 };
  const E = add(D, sub(C, B));
  return {
    ok: true,
    steps: [
      firstStep,
      circles,
      {
        tool: 'Tia đi qua hai điểm',
        text: `Vẽ tia AB và đường tròn tâm A bán kính ${show(q.big)}; giao điểm của chúng là D.`,
        draw: [
          { kind: 'ray', p: A, through: B },
          { kind: 'circle', c: A, r: q.big },
          point(D, 'D'),
        ],
        helper: true,
      },
      {
        tool: 'Đường song song',
        text: 'Vẽ đường qua D song song với BC và đường qua C song song với AB; giao điểm của chúng là E.',
        draw: [
          { kind: 'line', p: D, d: sub(C, B) },
          { kind: 'line', p: C, d: { x: 1, y: 0 } },
          point(E, 'E'),
        ],
        helper: true,
      },
      {
        tool: 'Đa giác',
        text: 'Ẩn các đối tượng phụ và điểm B, nháy lần lượt A, D, E, C, A: được hình thang ADEC.',
        draw: [{ kind: 'polygon', pts: [A, D, E, C] }],
      },
    ],
    measures: [
      { label: 'AD', value: dist(A, D), unit: 'cm' },
      { label: 'EC', value: dist(E, C), unit: 'cm' },
      { label: 'AC', value: dist(A, C), unit: 'cm' },
      { label: 'DE', value: dist(D, E), unit: 'cm' },
      { label: 'Góc A + góc C', value: angleAt(D, A, C) + angleAt(A, C, E), unit: 'deg' },
    ],
    verdict:
      'EC ∥ AD (vì E và C cùng độ cao) nên ADEC là hình thang; đo được DE và AC đúng như đề, và góc A + góc C = 180°.',
    hideAtEnd: ['B'],
  };
}

/** @param {Params} q @returns {Built} */
function thales(q) {
  const A = q.apex;
  const B = THALES_B;
  const C = THALES_C;
  const M = add(A, scale(sub(B, A), q.t));
  const N = add(A, scale(sub(C, A), q.t));
  const am = dist(A, M);
  const ab = dist(A, B);
  const an = dist(A, N);
  const ac = dist(A, C);
  return {
    ok: true,
    steps: [
      {
        tool: 'Đa giác',
        text: 'Nháy A, B, C, A: được tam giác ABC.',
        draw: [{ kind: 'polygon', pts: [A, B, C] }, point(A, 'A'), point(B, 'B'), point(C, 'C')],
      },
      {
        tool: 'Điểm trên đối tượng',
        text: 'Nháy vào cạnh AB: được điểm M di chuyển được trên AB.',
        draw: [point(M, 'M')],
      },
      {
        tool: 'Đường song song',
        text: 'Nháy vào M rồi vào cạnh BC: đường thẳng qua M song song với BC.',
        draw: [{ kind: 'line', p: M, d: { x: 1, y: 0 } }],
      },
      {
        tool: 'Giao điểm của 2 đối tượng',
        text: 'Nháy vào đường song song và cạnh AC: được giao điểm N.',
        draw: [point(N, 'N'), seg(M, N)],
      },
      {
        tool: 'Khoảng cách hoặc độ dài',
        text: 'Đo AM, AB, AN, AC; gõ AM / AB và AN / AC vào ô Nhập để so sánh. Kéo A hoặc M và quan sát.',
        draw: [],
      },
    ],
    measures: [
      { label: 'AM', value: am, unit: 'cm' },
      { label: 'AB', value: ab, unit: 'cm' },
      { label: 'AN', value: an, unit: 'cm' },
      { label: 'AC', value: ac, unit: 'cm' },
      { label: 'AM / AB', value: am / ab, unit: 'ratio' },
      { label: 'AN / AC', value: an / ac, unit: 'ratio' },
      { label: 'AM / MB', value: am / (ab - am), unit: 'ratio' },
      { label: 'AN / NC', value: an / (ac - an), unit: 'ratio' },
    ],
    verdict:
      'Dù kéo A hay M thế nào, luôn có AM/AB = AN/AC và AM/MB = AN/NC: đường thẳng song song với BC định ra trên AB, AC những đoạn thẳng tương ứng tỉ lệ (định lí Thalès).',
  };
}

/**
 * Steps, measures and verdict of one construction.
 * @param {Figure} figure
 * @param {Params} params
 * @returns {Built}
 */
export function construction(figure, params) {
  if (figure === 'chu-nhat') return rectangle(params);
  if (figure === 'binh-hanh') return parallelogram(params);
  if (figure === 'hinh-thang') return trapezoid(params);
  return thales(params);
}

/**
 * Bounding box of every point a construction draws, polygons included.
 * @param {Step[]} steps
 */
export function bounds(steps) {
  /** @type {Pt[]} */
  const pts = [];
  for (const s of steps) {
    for (const d of s.draw) {
      if (d.kind === 'point') pts.push(d.p);
      else if (d.kind === 'polygon') pts.push(...d.pts);
    }
  }
  if (!pts.length) pts.push({ x: 0, y: 0 });
  return {
    minX: Math.min(...pts.map((p) => p.x)),
    maxX: Math.max(...pts.map((p) => p.x)),
    minY: Math.min(...pts.map((p) => p.y)),
    maxY: Math.max(...pts.map((p) => p.y)),
  };
}

/**
 * Thalès: the part `t` = AM / AB of the foot of `p` on AB, kept inside the side.
 * @param {Pt} p
 * @param {Pt} apex
 */
export function ratioOnSide(p, apex) {
  const d = sub(THALES_B, apex);
  const t = ((p.x - apex.x) * d.x + (p.y - apex.y) * d.y) / (d.x * d.x + d.y * d.y);
  return Math.max(0.1, Math.min(0.9, t));
}
