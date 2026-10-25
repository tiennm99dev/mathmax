/**
 * Geometry behind the GeoGebra-style task player: lines, rays, segments,
 * midpoints and angles built from up to three free points. Points live in
 * screen coordinates of the board (y grows downwards); "counterclockwise"
 * means counterclockwise as the learner sees it, the way GeoGebra turns.
 */

/** @typedef {{ x: number, y: number }} Pt */

/**
 * @typedef {{ kind: 'point', p: Pt, name: string }
 *   | { kind: 'segment', a: Pt, b: Pt }
 *   | { kind: 'line', a: Pt, b: Pt }
 *   | { kind: 'ray', a: Pt, b: Pt }
 *   | { kind: 'angle', at: Pt, from: Pt, to: Pt }} Drawn
 */

/** @typedef {{ tool: string, text: string, draw: Drawn[] }} Step */
/** @typedef {{ label: string, value: number, unit: 'length' | 'deg' }} Measure */

/** @param {Pt} a @param {Pt} b */
export function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** @param {Pt} a @param {Pt} b @returns {Pt} */
export function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

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
 * Size of the angle at `o` between rays `oa` and `ob`, in degrees (0 to 180),
 * the way the Grade 6 book measures an angle.
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
 * The angle GeoGebra's "Góc" tool shows when the learner clicks `a`, `o`,
 * `b`: it turns counterclockwise from ray `oa` to ray `ob`, so the value is
 * from 0 up to (but not including) 360 degrees.
 * @param {Pt} a
 * @param {Pt} o
 * @param {Pt} b
 */
export function geogebraAngle(a, o, b) {
  // Screen y points down, so flip it to get the counterclockwise turn.
  const t1 = Math.atan2(-(a.y - o.y), a.x - o.x);
  const t2 = Math.atan2(-(b.y - o.y), b.x - o.x);
  const d = ((t2 - t1) * 180) / Math.PI;
  return ((d % 360) + 360) % 360;
}

/**
 * Name of an angle by its size: nhọn, vuông, tù or bẹt.
 * @param {number} deg 0 to 180
 * @param {number} [tol] degrees of slack for vuông and bẹt
 */
export function angleKind(deg, tol = 0.5) {
  if (Math.abs(deg - 90) <= tol) return 'góc vuông';
  if (Math.abs(deg - 180) <= tol) return 'góc bẹt';
  if (deg < 90) return 'góc nhọn';
  return 'góc tù';
}

/**
 * Whether `c` lies on line `ab`, up to `tol` board units from it.
 * @param {Pt} a
 * @param {Pt} b
 * @param {Pt} c
 * @param {number} [tol]
 */
export function onLine(a, b, c, tol = 1) {
  const d = dist(a, b);
  if (d === 0) return true;
  const cross = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  return Math.abs(cross) / d <= tol;
}

/**
 * The part of the line through `a` and `b` (or the ray from `a` through `b`)
 * inside the board [0, w] × [0, h], as two end points; null when it misses.
 * @param {Pt} a
 * @param {Pt} b
 * @param {number} w
 * @param {number} h
 * @param {boolean} [ray] keep only the half from `a` through `b`
 * @returns {[Pt, Pt] | null}
 */
export function clipLine(a, b, w, h, ray = false) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (dx === 0 && dy === 0) return null;
  let lo = ray ? 0 : -Infinity;
  let hi = Infinity;
  for (const [p, q] of [
    [-dx, a.x],
    [dx, w - a.x],
    [-dy, a.y],
    [dy, h - a.y],
  ]) {
    if (p === 0) {
      if (q < 0) return null;
    } else {
      const t = q / p;
      if (p < 0) lo = Math.max(lo, t);
      else hi = Math.min(hi, t);
    }
  }
  if (lo > hi) return null;
  return [
    { x: a.x + lo * dx, y: a.y + lo * dy },
    { x: a.x + hi * dx, y: a.y + hi * dy },
  ];
}

/** The tasks the player can build, with the names of their free points. */
export const TASKS = /** @type {const} */ ([
  { value: 'duong-thang', label: 'Đường thẳng, tia, đoạn thẳng', points: ['A', 'B', 'C'] },
  { value: 'trung-diem', label: 'Trung điểm', points: ['A', 'B'] },
  { value: 'do-goc', label: 'Đo góc', points: ['O', 'A', 'B'] },
  { value: 'goc-cho-truoc', label: 'Góc cho trước', points: ['O', 'A'] },
]);

/** @typedef {(typeof TASKS)[number]['value']} Task */

/**
 * Steps to build `task` from its free points, and the measures the
 * "Khoảng cách hoặc độ dài" and "Góc" tools would show at the end.
 * @param {Task} task
 * @param {Pt[]} pts the free points, in the order of the task's `points`
 * @param {number} [deg] the given angle for 'goc-cho-truoc'
 * @returns {{ steps: Step[], measures: Measure[], verdict: string }}
 */
export function construction(task, pts, deg = 60) {
  const names = TASKS.find((t) => t.value === task)?.points ?? [];
  /** @type {Step} */
  const start = {
    tool: 'Điểm mới',
    text: `Chọn công cụ Điểm mới, nháy chuột vào vùng làm việc để vẽ ${names.length === 2 ? 'hai' : 'ba'} điểm ${names.join(', ')}.`,
    draw: names.map((name, i) => ({ kind: /** @type {const} */ ('point'), p: pts[i], name })),
  };

  if (task === 'duong-thang') {
    const [a, b, c] = pts;
    const inLine = onLine(a, b, c, 2);
    return {
      steps: [
        start,
        {
          tool: 'Đường thẳng',
          text: 'Chọn công cụ Đường thẳng (đi qua 2 điểm), nháy vào A rồi B: được đường thẳng AB, kéo dài mãi về hai phía.',
          draw: [{ kind: 'line', a, b }],
        },
        {
          tool: 'Tia',
          text: 'Chọn công cụ Tia, nháy vào A (gốc) rồi C: được tia AC, bắt đầu ở A và kéo dài mãi về phía C.',
          draw: [{ kind: 'ray', a, b: c }],
        },
        {
          tool: 'Đoạn thẳng',
          text: 'Chọn công cụ Đoạn thẳng, nháy vào B rồi C: được đoạn thẳng BC, có hai đầu mút B và C.',
          draw: [{ kind: 'segment', a: b, b: c }],
        },
      ],
      measures: [
        { label: 'AB', value: dist(a, b), unit: 'length' },
        { label: 'BC', value: dist(b, c), unit: 'length' },
        { label: 'Góc BAC', value: angleAt(b, a, c), unit: 'deg' },
      ],
      verdict: inLine
        ? 'C nằm trên đường thẳng AB: ba điểm A, B, C thẳng hàng, tia AC nằm trên đường thẳng AB.'
        : 'C không nằm trên đường thẳng AB: ba điểm A, B, C không thẳng hàng. Kéo C lên đường thẳng AB để ba điểm thẳng hàng.',
    };
  }

  if (task === 'trung-diem') {
    const [a, b] = pts;
    const m = midpoint(a, b);
    return {
      steps: [
        start,
        {
          tool: 'Đoạn thẳng',
          text: 'Chọn công cụ Đoạn thẳng, nháy vào A rồi B để vẽ đoạn thẳng AB.',
          draw: [{ kind: 'segment', a, b }],
        },
        {
          tool: 'Trung điểm hoặc tâm',
          text: 'Chọn công cụ Trung điểm hoặc tâm, nháy vào A rồi B (hoặc nháy vào đoạn AB): GeoGebra tạo trung điểm, đổi tên thành M.',
          draw: [{ kind: 'point', p: m, name: 'M' }],
        },
        {
          tool: 'Khoảng cách hoặc độ dài',
          text: 'Chọn công cụ Khoảng cách hoặc độ dài, nháy vào A rồi M, rồi M và B, rồi A và B để đo.',
          draw: [],
        },
      ],
      measures: [
        { label: 'AM', value: dist(a, m), unit: 'length' },
        { label: 'MB', value: dist(m, b), unit: 'length' },
        { label: 'AB', value: dist(a, b), unit: 'length' },
      ],
      verdict:
        'M nằm giữa A và B và MA = MB = AB : 2, nên M là trung điểm của đoạn thẳng AB. Kéo A hoặc B: M luôn là trung điểm.',
    };
  }

  if (task === 'do-goc') {
    const [o, a, b] = pts;
    const size = angleAt(a, o, b);
    return {
      steps: [
        start,
        {
          tool: 'Tia',
          text: 'Chọn công cụ Tia, nháy vào O rồi A, sau đó nháy vào O rồi B: được hai tia chung gốc OA, OB.',
          draw: [
            { kind: 'ray', a: o, b: a },
            { kind: 'ray', a: o, b },
          ],
        },
        {
          tool: 'Góc',
          text: 'Chọn công cụ Góc, nháy lần lượt vào A, O, B (điểm ở giữa là đỉnh O): GeoGebra hiện số đo góc AOB.',
          draw: [{ kind: 'angle', at: o, from: a, to: b }],
        },
      ],
      measures: [{ label: 'Góc AOB', value: size, unit: 'deg' }],
      verdict: `Góc AOB có đỉnh O, hai cạnh là tia OA và tia OB; nó là ${angleKind(size)}.`,
    };
  }

  const [o, a] = pts;
  const a1 = rotate(a, o, deg);
  return {
    steps: [
      start,
      {
        tool: 'Tia',
        text: 'Chọn công cụ Tia, nháy vào O rồi A để vẽ tia OA.',
        draw: [{ kind: 'ray', a: o, b: a }],
      },
      {
        tool: 'Góc với số đo cho trước',
        text: `Chọn công cụ Góc với số đo cho trước, nháy vào A rồi O, gõ ${deg}° và chọn ngược chiều kim đồng hồ: GeoGebra tạo điểm A'.`,
        draw: [{ kind: 'point', p: a1, name: "A'" }],
      },
      {
        tool: 'Tia',
        text: "Vẽ tia OA'. Dùng công cụ Góc, nháy vào A, O, A' để kiểm tra số đo.",
        draw: [
          { kind: 'ray', a: o, b: a1 },
          { kind: 'angle', at: o, from: a, to: a1 },
        ],
      },
    ],
    measures: [
      { label: "Góc AOA'", value: angleAt(a, o, a1), unit: 'deg' },
      { label: "OA'", value: dist(o, a1), unit: 'length' },
      { label: 'OA', value: dist(o, a), unit: 'length' },
    ],
    verdict: `Góc AOA' bằng ${deg}°, là ${angleKind(deg)}. Điểm A' được quay từ A quanh O nên OA' = OA.`,
  };
}
