/**
 * Geometry behind the GeoGebra-style construction player of grade 9: the
 * tangent to a circle at a point on it, the two tangents from an outside
 * point, the circumscribed circle of a triangle (perpendicular bisectors) and
 * the inscribed circle (angle bisectors). Points live in screen coordinates
 * of the board. Each construction is a list of steps, named after the tools of
 * the Vietnamese GeoGebra interface, plus the measures that check the result.
 */

import { formatNumber } from '#lib/core/number-format.js';
import { angleAt, dist, midpoint } from '#lib/geom-engine/plane.js';
import { circumcircle, incircle, touchPoints } from '#lib/geom-engine/centers.js';

/** @typedef {{ x: number, y: number }} Pt */

/**
 * @typedef {{ kind: 'point', p: Pt, name: string }
 *   | { kind: 'segment', a: Pt, b: Pt, faint?: boolean }
 *   | { kind: 'line', p: Pt, d: Pt, name?: string, faint?: boolean, color?: string }
 *   | { kind: 'circle', c: Pt, r: number, faint?: boolean, color?: string }
 *   | { kind: 'right', at: Pt, u: Pt, v: Pt }} Drawn
 */

/**
 * @typedef {object} Step
 * @property {string} tool tool name in GeoGebra's Vietnamese interface
 * @property {string} text what to do
 * @property {Drawn[]} draw objects the step adds
 */

/** @typedef {{ label: string, value: number, unit: 'length' | 'deg' }} Measure */

/**
 * @typedef {object} Built
 * @property {Step[]} steps
 * @property {Measure[]} measures shown once the construction is finished
 * @property {string} verdict what the measures show
 * @property {boolean} ok false when the figure cannot be drawn (M inside the circle)
 */

export const FIGURES = /** @type {const} */ ([
  { value: 'tiep-tuyen-tai', label: 'Tiếp tuyến tại B' },
  { value: 'tiep-tuyen-qua', label: 'Tiếp tuyến qua M' },
  { value: 'ngoai-tiep', label: 'Đường tròn ngoại tiếp' },
  { value: 'noi-tiep', label: 'Đường tròn nội tiếp' },
]);

/** @typedef {(typeof FIGURES)[number]['value']} Figure */

/** SVG units per length unit shown in the measures (one grid square). */
export const UNIT = 40;

/** @param {Pt} a @param {Pt} b @returns {Pt} */
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
/** @param {Pt} a @param {Pt} b @returns {Pt} */
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
/** @param {Pt} a @param {number} k @returns {Pt} */
const mul = (a, k) => ({ x: a.x * k, y: a.y * k });
/** @param {Pt} a @returns {Pt} */
const perp = (a) => ({ x: -a.y, y: a.x });

/**
 * The points where the tangents from M touch the circle (O; r): none when M
 * is inside, one (M itself) when M is on the circle, else two.
 * @param {Pt} O
 * @param {number} r
 * @param {Pt} M
 * @param {number} [eps] tolerance on |OM − r|
 * @returns {Pt[]}
 */
export function tangentPoints(O, r, M, eps = 1e-9) {
  const d = dist(O, M);
  if (d < r - eps) return [];
  if (Math.abs(d - r) <= eps) return [{ ...M }];
  const u = mul(sub(M, O), 1 / d);
  const n = perp(u);
  const along = (r * r) / d;
  const h = Math.sqrt(r * r - along * along);
  const base = add(O, mul(u, along));
  return [add(base, mul(n, h)), add(base, mul(n, -h))];
}

/**
 * Direction of the bisector of angle `at` between the rays to `p` and `q`.
 * @param {Pt} at @param {Pt} p @param {Pt} q
 * @returns {Pt}
 */
export function bisectorDirection(at, p, q) {
  const u = sub(p, at);
  const v = sub(q, at);
  const lu = Math.hypot(u.x, u.y);
  const lv = Math.hypot(v.x, v.y);
  return add(mul(u, 1 / lu), mul(v, 1 / lv));
}

/**
 * Distance from P to the line through A with direction d.
 * @param {Pt} P @param {Pt} A @param {Pt} d
 */
export function distToLine(P, A, d) {
  return Math.abs((P.x - A.x) * d.y - (P.y - A.y) * d.x) / Math.hypot(d.x, d.y);
}

/** @param {number} v */
const len = (v) => formatNumber(v / UNIT, 2);

/**
 * @typedef {object} Input
 * @property {Pt} O centre of the circle (tangent figures)
 * @property {Pt} B point on the circle, which fixes its radius
 * @property {Pt} M outside point for the two tangents
 * @property {[Pt, Pt, Pt]} tri triangle ABC (circle figures)
 */

/**
 * The steps and measures of one construction.
 * @param {Figure} figure
 * @param {Input} input
 * @returns {Built}
 */
export function construction(figure, input) {
  if (figure === 'tiep-tuyen-tai') return tangentAt(input.O, input.B);
  if (figure === 'tiep-tuyen-qua') return tangentsFrom(input.O, input.B, input.M);
  if (figure === 'ngoai-tiep') return circumscribed(...input.tri);
  return inscribed(...input.tri);
}

/** @param {Pt} O @param {Pt} B @returns {Built} */
function tangentAt(O, B) {
  const r = dist(O, B);
  const ob = sub(B, O);
  const t = perp(ob);
  const steps = [
    {
      tool: 'Đường tròn khi biết tâm và một điểm',
      text: 'Chọn điểm O rồi điểm B: được đường tròn (O) đi qua B.',
      draw: /** @type {Drawn[]} */ ([
        { kind: 'circle', c: O, r },
        { kind: 'point', p: O, name: 'O' },
        { kind: 'point', p: B, name: 'B' },
      ]),
    },
    {
      tool: 'Đoạn thẳng',
      text: 'Nối O với B: được bán kính OB.',
      draw: /** @type {Drawn[]} */ ([{ kind: 'segment', a: O, b: B }]),
    },
    {
      tool: 'Đường vuông góc',
      text: 'Chọn điểm B rồi đoạn OB: được đường thẳng d qua B vuông góc với OB. Đó là tiếp tuyến của (O) tại B.',
      draw: /** @type {Drawn[]} */ ([
        { kind: 'line', p: B, d: t, name: 'd', color: '#7C3AED' },
        { kind: 'right', at: B, u: mul(ob, -1), v: t },
      ]),
    },
  ];
  return {
    steps,
    measures: [
      { label: 'OB', value: r / UNIT, unit: 'length' },
      { label: 'Góc giữa d và OB', value: 90, unit: 'deg' },
    ],
    verdict: `d vuông góc với bán kính OB tại B và chỉ chung với (O) đúng một điểm B (khoảng cách từ O đến d bằng R = ${len(r)}), nên d là tiếp tuyến của (O) tại B.`,
    ok: true,
  };
}

/** @param {Pt} O @param {Pt} B @param {Pt} M @returns {Built} */
function tangentsFrom(O, B, M) {
  const r = dist(O, B);
  const d = dist(O, M);
  const I = midpoint(O, M);
  const touch = tangentPoints(O, r, M, 0.5);
  /** @type {Step[]} */
  const steps = [
    {
      tool: 'Đường tròn khi biết tâm và một điểm',
      text: 'Chọn O rồi B: được đường tròn (O; R) với R = OB.',
      draw: [
        { kind: 'circle', c: O, r },
        { kind: 'point', p: O, name: 'O' },
      ],
    },
    {
      tool: 'Điểm mới',
      text: 'Lấy điểm M nằm ngoài đường tròn (O).',
      draw: [{ kind: 'point', p: M, name: 'M' }],
    },
    {
      tool: 'Trung điểm hoặc tâm',
      text: 'Chọn O rồi M: được trung điểm I của OM.',
      draw: [
        { kind: 'segment', a: O, b: M, faint: true },
        { kind: 'point', p: I, name: 'I' },
      ],
    },
    {
      tool: 'Đường tròn khi biết tâm và một điểm',
      text: 'Chọn I rồi O: được đường tròn đường kính OM.',
      draw: [{ kind: 'circle', c: I, r: d / 2, faint: true }],
    },
  ];
  if (touch.length < 2) {
    return {
      steps,
      measures: [
        { label: 'OM', value: d / UNIT, unit: 'length' },
        { label: 'R', value: r / UNIT, unit: 'length' },
      ],
      verdict:
        touch.length === 1
          ? 'M nằm trên đường tròn: chỉ có một tiếp tuyến, là đường thẳng qua M vuông góc với OM. Kéo M ra ngoài đường tròn.'
          : 'M nằm trong đường tròn (OM < R): hai đường tròn không cắt nhau, không có tiếp tuyến nào đi qua M. Kéo M ra ngoài đường tròn.',
      ok: false,
    };
  }
  const [A, C] = touch;
  steps.push(
    {
      tool: 'Giao điểm của hai đối tượng',
      text: 'Chọn hai đường tròn: được hai giao điểm A và C. Vì A nằm trên đường tròn đường kính OM nên góc OAM vuông.',
      draw: [
        { kind: 'point', p: A, name: 'A' },
        { kind: 'point', p: C, name: 'C' },
      ],
    },
    {
      tool: 'Đường thẳng',
      text: 'Vẽ đường thẳng MA và MC: đó là hai tiếp tuyến của (O) đi qua M.',
      draw: [
        { kind: 'line', p: M, d: sub(A, M), color: '#7C3AED' },
        { kind: 'line', p: M, d: sub(C, M), color: '#7C3AED' },
        { kind: 'segment', a: O, b: A, faint: true },
        { kind: 'segment', a: O, b: C, faint: true },
        { kind: 'right', at: A, u: sub(O, A), v: sub(M, A) },
        { kind: 'right', at: C, u: sub(O, C), v: sub(M, C) },
      ],
    },
  );
  return {
    steps,
    measures: [
      { label: 'MA', value: dist(M, A) / UNIT, unit: 'length' },
      { label: 'MC', value: dist(M, C) / UNIT, unit: 'length' },
      { label: 'Góc OAM', value: angleAt(A, O, M), unit: 'deg' },
      { label: 'Góc OMA', value: angleAt(M, O, A), unit: 'deg' },
      { label: 'Góc OMC', value: angleAt(M, O, C), unit: 'deg' },
    ],
    verdict: `Hai tiếp tuyến cắt nhau tại M: MA = MC = ${len(dist(M, A))} và MO là tia phân giác của góc AMC.`,
    ok: true,
  };
}

/** @param {Pt} A @param {Pt} B @param {Pt} C @returns {Built} */
function circumscribed(A, B, C) {
  const round = circumcircle(A, B, C);
  const tri = triangleDraw(A, B, C);
  const mAB = midpoint(A, B);
  const mBC = midpoint(B, C);
  const mCA = midpoint(C, A);
  /** @type {Step[]} */
  const steps = [
    { tool: 'Đa giác', text: 'Chọn lần lượt A, B, C rồi lại A: được tam giác ABC.', draw: tri },
    {
      tool: 'Đường trung trực',
      text: 'Chọn A rồi B: được đường trung trực của AB.',
      draw: [{ kind: 'line', p: mAB, d: perp(sub(B, A)), faint: true }],
    },
    {
      tool: 'Đường trung trực',
      text: 'Chọn B rồi C: được đường trung trực của BC.',
      draw: [{ kind: 'line', p: mBC, d: perp(sub(C, B)), faint: true }],
    },
  ];
  if (!round) return { steps, measures: [], verdict: 'Ba điểm thẳng hàng.', ok: false };
  const O = round.center;
  steps.push(
    {
      tool: 'Giao điểm của hai đối tượng',
      text: 'Chọn hai đường trung trực: được giao điểm O.',
      draw: [{ kind: 'point', p: O, name: 'O' }],
    },
    {
      tool: 'Đường tròn khi biết tâm và một điểm',
      text: 'Chọn O rồi A: đường tròn đi qua cả ba đỉnh, đó là đường tròn ngoại tiếp tam giác ABC.',
      draw: [{ kind: 'circle', c: O, r: round.radius, color: '#7C3AED' }],
    },
    {
      tool: 'Đường trung trực',
      text: 'Kiểm tra: vẽ thêm đường trung trực của CA, nó cũng đi qua O.',
      draw: [{ kind: 'line', p: mCA, d: perp(sub(A, C)), faint: true, color: '#16A34A' }],
    },
  );
  const angles = [angleAt(A, B, C), angleAt(B, C, A), angleAt(C, A, B)];
  const big = Math.max(...angles);
  const where =
    Math.abs(big - 90) < 0.5
      ? 'Tam giác vuông: tâm O là trung điểm của cạnh huyền.'
      : big > 90
        ? 'Tam giác tù: tâm O nằm ngoài tam giác.'
        : 'Tam giác nhọn: tâm O nằm trong tam giác.';
  return {
    steps,
    measures: [
      { label: 'OA', value: dist(O, A) / UNIT, unit: 'length' },
      { label: 'OB', value: dist(O, B) / UNIT, unit: 'length' },
      { label: 'OC', value: dist(O, C) / UNIT, unit: 'length' },
      { label: 'Góc lớn nhất', value: big, unit: 'deg' },
    ],
    verdict: `OA = OB = OC = ${len(round.radius)}: O cách đều ba đỉnh. ${where}`,
    ok: true,
  };
}

/** @param {Pt} A @param {Pt} B @param {Pt} C @returns {Built} */
function inscribed(A, B, C) {
  const round = incircle(A, B, C);
  const tri = triangleDraw(A, B, C);
  /** @type {Step[]} */
  const steps = [
    { tool: 'Đa giác', text: 'Chọn lần lượt A, B, C rồi lại A: được tam giác ABC.', draw: tri },
    {
      tool: 'Đường phân giác',
      text: 'Chọn A, B, C (đỉnh B ở giữa): được đường phân giác của góc ABC.',
      draw: [{ kind: 'line', p: B, d: bisectorDirection(B, A, C), faint: true }],
    },
    {
      tool: 'Đường phân giác',
      text: 'Chọn A, C, B (đỉnh C ở giữa): được đường phân giác của góc ACB.',
      draw: [{ kind: 'line', p: C, d: bisectorDirection(C, A, B), faint: true }],
    },
  ];
  if (!round) return { steps, measures: [], verdict: 'Ba điểm thẳng hàng.', ok: false };
  const I = round.center;
  const [H, K, L] = touchPoints(A, B, C, I);
  steps.push(
    {
      tool: 'Giao điểm của hai đối tượng',
      text: 'Chọn hai đường phân giác: được giao điểm I.',
      draw: [{ kind: 'point', p: I, name: 'I' }],
    },
    {
      tool: 'Đường vuông góc',
      text: 'Chọn I rồi cạnh BC: được đường thẳng qua I vuông góc với BC; dùng "Giao điểm của hai đối tượng" lấy chân đường vuông góc H.',
      draw: [
        { kind: 'segment', a: I, b: H, faint: true },
        { kind: 'right', at: H, u: sub(I, H), v: sub(C, B) },
        { kind: 'point', p: H, name: 'H' },
      ],
    },
    {
      tool: 'Đường tròn khi biết tâm và một điểm',
      text: 'Chọn I rồi H: đường tròn tiếp xúc với cả ba cạnh, đó là đường tròn nội tiếp tam giác ABC.',
      draw: [{ kind: 'circle', c: I, r: round.radius, color: '#7C3AED' }],
    },
    {
      tool: 'Đường phân giác',
      text: 'Kiểm tra: vẽ thêm đường phân giác của góc BAC, nó cũng đi qua I.',
      draw: [{ kind: 'line', p: A, d: bisectorDirection(A, B, C), faint: true, color: '#16A34A' }],
    },
  );
  return {
    steps,
    measures: [
      { label: 'Khoảng cách từ I đến BC', value: dist(I, H) / UNIT, unit: 'length' },
      { label: 'Khoảng cách từ I đến CA', value: dist(I, K) / UNIT, unit: 'length' },
      { label: 'Khoảng cách từ I đến AB', value: dist(I, L) / UNIT, unit: 'length' },
    ],
    verdict: `I cách đều ba cạnh (bán kính r = ${len(round.radius)}), nên đường tròn (I; r) tiếp xúc với ba cạnh. Tâm đường tròn nội tiếp luôn nằm trong tam giác.`,
    ok: true,
  };
}

/** @param {Pt} A @param {Pt} B @param {Pt} C @returns {Drawn[]} */
function triangleDraw(A, B, C) {
  return [
    { kind: 'segment', a: A, b: B },
    { kind: 'segment', a: B, b: C },
    { kind: 'segment', a: C, b: A },
  ];
}
