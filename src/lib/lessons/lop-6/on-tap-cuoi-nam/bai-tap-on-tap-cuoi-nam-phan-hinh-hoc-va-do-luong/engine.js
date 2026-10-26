/**
 * Construction tasks for the year-end geometry review: on a square grid
 * (one square side is 1 cm), the learner drags points to finish a figure and
 * the board checks the construction. Coordinates are whole grid units with y
 * pointing up, from (0, 0) to (COLS, ROWS).
 */

export const COLS = 10;
export const ROWS = 7;

/** @typedef {{ x: number, y: number }} Pt */
/** @typedef {Record<string, Pt>} Pts */

/**
 * @typedef {object} Task
 * @property {string} id
 * @property {string} title short name for the task list
 * @property {string} text what to build, plain text
 * @property {Pts} fixed points that do not move
 * @property {Pts} start movable points and where they start
 * @property {string[][]} lines polylines through named points (closed when the first name repeats)
 * @property {number} [axis] x of a vertical axis of symmetry to draw
 * @property {string} [ray] name of the origin of a horizontal ray Ox to draw
 * @property {(p: Pts) => { ok: boolean, msg: string }} check
 * @property {(p: Pts) => string} [readout] live measurements
 */

/** @param {Pt} a @param {Pt} b */
const same = (a, b) => a.x === b.x && a.y === b.y;
/** @param {Pt} o @param {Pt} a @param {Pt} b */
const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
/** @param {Pt} a @param {Pt} b */
const dist2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
/** @param {Pt} p */
export const name = (p) => `(${p.x}; ${p.y})`;

/**
 * Whether P lies on segment AB.
 * @param {Pt} p @param {Pt} a @param {Pt} b
 */
export function onSegment(p, a, b) {
  return (
    cross(a, b, p) === 0 &&
    Math.min(a.x, b.x) <= p.x &&
    p.x <= Math.max(a.x, b.x) &&
    Math.min(a.y, b.y) <= p.y &&
    p.y <= Math.max(a.y, b.y)
  );
}

/**
 * Angle xOA in degrees, where Ox points right: 0 to 180 (A above or on Ox),
 * or more than 180 when A is below Ox.
 * @param {Pt} o @param {Pt} a
 */
export function angleFromOx(o, a) {
  const deg = (Math.atan2(a.y - o.y, a.x - o.x) * 180) / Math.PI;
  return deg < 0 ? deg + 360 : deg;
}

/** @type {Task[]} */
export const TASKS = [
  {
    id: 'trung-diem',
    title: 'Trung điểm',
    text: 'Kéo điểm M đến trung điểm của đoạn thẳng AB.',
    fixed: { A: { x: 1, y: 1 }, B: { x: 9, y: 5 } },
    start: { M: { x: 2, y: 5 } },
    lines: [['A', 'B']],
    check: ({ A, B, M }) => {
      if (!onSegment(M, A, B)) return { ok: false, msg: 'M chưa nằm trên đoạn thẳng AB.' };
      if (dist2(M, A) !== dist2(M, B))
        return { ok: false, msg: 'M nằm trên đoạn thẳng AB nhưng MA và MB chưa bằng nhau.' };
      return { ok: true, msg: 'Đúng: M nằm giữa A, B và MA = MB, nên M là trung điểm của AB.' };
    },
  },
  {
    id: 'thang-hang',
    title: 'Ba điểm thẳng hàng',
    text: 'Kéo điểm C sao cho ba điểm A, B, C thẳng hàng và điểm B nằm giữa hai điểm A và C.',
    fixed: { A: { x: 1, y: 2 }, B: { x: 4, y: 3 } },
    start: { C: { x: 8, y: 1 } },
    lines: [['A', 'B']],
    check: ({ A, B, C }) => {
      if (same(C, A) || same(C, B)) return { ok: false, msg: 'C đang trùng với một điểm đã có.' };
      if (cross(A, B, C) !== 0)
        return { ok: false, msg: 'A, B, C chưa thẳng hàng: C chưa nằm trên đường thẳng AB.' };
      if ((B.x - A.x) * (C.x - B.x) + (B.y - A.y) * (C.y - B.y) < 0 || onSegment(C, A, B))
        return { ok: false, msg: 'Ba điểm đã thẳng hàng, nhưng B chưa nằm giữa A và C.' };
      return {
        ok: true,
        msg: 'Đúng: C nằm trên đường thẳng AB, ở phía của B, nên B nằm giữa A và C.',
      };
    },
  },
  {
    id: 'goc',
    title: 'Góc 135°',
    text: 'Kéo điểm A sao cho góc xOA có số đo 135°. Mỗi ô vuông có đường chéo tạo với cạnh ô một góc 45°.',
    fixed: { O: { x: 2, y: 2 } },
    start: { A: { x: 6, y: 3 } },
    lines: [['O', 'A']],
    ray: 'O',
    readout: ({ O, A }) =>
      same(O, A)
        ? 'A đang trùng với O.'
        : `Góc xOA ≈ ${Math.round(Math.min(angleFromOx(O, A), 360 - angleFromOx(O, A)))}°.`,
    check: ({ O, A }) => {
      if (same(O, A)) return { ok: false, msg: 'A đang trùng với O, chưa có tia OA.' };
      const deg = angleFromOx(O, A);
      // The angle between rays Ox and OA, whichever side of Ox A is on.
      const measure = Math.min(deg, 360 - deg);
      const shown = Math.round(measure);
      if (Math.abs(measure - 135) < 1e-9)
        return { ok: true, msg: 'Đúng: góc xOA = 90° + 45° = 135°, là một góc tù.' };
      if (shown < 90)
        return { ok: false, msg: `Góc xOA ≈ ${shown}° là góc nhọn; cần một góc tù 135°.` };
      return { ok: false, msg: `Góc xOA ≈ ${shown}°, chưa bằng 135°.` };
    },
  },
  {
    id: 'chu-nhat',
    title: 'Chu vi và diện tích',
    text: 'Kéo đỉnh C để hình chữ nhật ABCD có chu vi 14 cm và diện tích 12 cm² (cạnh mỗi ô vuông là 1 cm).',
    fixed: { A: { x: 1, y: 1 } },
    start: { C: { x: 3, y: 2 } },
    lines: [],
    readout: ({ A, C }) => {
      const w = Math.abs(C.x - A.x);
      const h = Math.abs(C.y - A.y);
      return `Chiều dài các cạnh: ${w} cm và ${h} cm. Chu vi: 2 · (${w} + ${h}) = ${2 * (w + h)} cm. Diện tích: ${w} · ${h} = ${w * h} cm².`;
    },
    check: ({ A, C }) => {
      const w = Math.abs(C.x - A.x);
      const h = Math.abs(C.y - A.y);
      const p = 2 * (w + h);
      const s = w * h;
      if (s === 0)
        return { ok: false, msg: 'Hình chưa có diện tích: C phải nằm khác hàng, khác cột với A.' };
      if (p === 14 && s === 12)
        return {
          ok: true,
          msg: `Đúng: hai cạnh ${w} cm và ${h} cm cho chu vi 14 cm, diện tích 12 cm².`,
        };
      if (p === 14) return { ok: false, msg: `Chu vi đã đúng 14 cm nhưng diện tích là ${s} cm².` };
      if (s === 12) return { ok: false, msg: `Diện tích đã đúng 12 cm² nhưng chu vi là ${p} cm.` };
      return { ok: false, msg: `Chu vi ${p} cm, diện tích ${s} cm²: cả hai chưa đúng.` };
    },
  },
  {
    id: 'binh-hanh',
    title: 'Hình bình hành',
    text: 'Kéo đỉnh D sao cho ABCD là hình bình hành.',
    fixed: { A: { x: 1, y: 1 }, B: { x: 6, y: 1 }, C: { x: 8, y: 4 } },
    start: { D: { x: 2, y: 6 } },
    lines: [['A', 'B', 'C', 'D', 'A']],
    check: ({ A, B, C, D }) => {
      if (D.x === A.x + C.x - B.x && D.y === A.y + C.y - B.y)
        return { ok: true, msg: 'Đúng: AB song song và bằng CD, AD song song và bằng BC.' };
      if (D.y !== C.y) return { ok: false, msg: 'Cạnh CD chưa song song với cạnh AB.' };
      return {
        ok: false,
        msg: 'CD đã song song với AB nhưng hai cạnh đối AB và CD chưa bằng nhau.',
      };
    },
  },
  {
    id: 'thang-can',
    title: 'Hình thang cân',
    text: 'Kéo đỉnh D sao cho ABCD là hình thang cân có hai đáy AB và CD.',
    fixed: { A: { x: 1, y: 1 }, B: { x: 9, y: 1 }, C: { x: 7, y: 4 } },
    start: { D: { x: 1, y: 6 } },
    lines: [['A', 'B', 'C', 'D', 'A']],
    check: ({ A, B, C, D }) => {
      if (D.y !== C.y) return { ok: false, msg: 'Đáy CD chưa song song với đáy AB.' };
      if (D.x === A.x + B.x - C.x)
        return {
          ok: true,
          msg: 'Đúng: CD song song với AB, hai cạnh bên AD = BC và hai đường chéo AC = BD.',
        };
      if (dist2(A, D) === dist2(B, C))
        return {
          ok: false,
          msg: 'AD = BC nhưng ABCD đang là hình bình hành; hai đường chéo AC và BD chưa bằng nhau.',
        };
      return {
        ok: false,
        msg: 'CD đã song song với AB nhưng hai cạnh bên AD và BC chưa bằng nhau.',
      };
    },
  },
  {
    id: 'truc-doi-xung',
    title: 'Trục đối xứng',
    text: 'Kéo đỉnh D sao cho đường thẳng d là trục đối xứng của hình ABCD.',
    fixed: { A: { x: 5, y: 6 }, B: { x: 2, y: 4 }, C: { x: 5, y: 0 } },
    start: { D: { x: 9, y: 2 } },
    lines: [['A', 'B', 'C', 'D', 'A']],
    axis: 5,
    check: ({ B, D }) => {
      if (D.x === 2 * 5 - B.x && D.y === B.y)
        return {
          ok: true,
          msg: 'Đúng: gấp hình theo d thì B trùng D, A và C nằm trên d, nên d là trục đối xứng.',
        };
      if (D.y !== B.y)
        return { ok: false, msg: 'Gấp theo d thì B không trùng D: D phải ở cùng hàng với B.' };
      return { ok: false, msg: 'D đã cùng hàng với B nhưng chưa cách d một khoảng bằng B.' };
    },
  },
  {
    id: 'tam-doi-xung',
    title: 'Tâm đối xứng',
    text: 'Kéo hai đỉnh C và D sao cho ABCD là hình bình hành nhận điểm O làm tâm đối xứng.',
    fixed: { A: { x: 2, y: 1 }, B: { x: 6, y: 1 }, O: { x: 5, y: 3 } },
    start: { C: { x: 9, y: 2 }, D: { x: 1, y: 6 } },
    lines: [['A', 'B', 'C', 'D', 'A']],
    check: ({ A, B, C, D, O }) => {
      const cOk = C.x === 2 * O.x - A.x && C.y === 2 * O.y - A.y;
      const dOk = D.x === 2 * O.x - B.x && D.y === 2 * O.y - B.y;
      if (cOk && dOk)
        return {
          ok: true,
          msg: 'Đúng: O là trung điểm của AC và BD, quay hình nửa vòng quanh O thì hình trùng với chính nó.',
        };
      if (!cOk && !dOk)
        return { ok: false, msg: 'O chưa là trung điểm của AC, cũng chưa là trung điểm của BD.' };
      return cOk
        ? {
            ok: false,
            msg: 'C đã đúng (O là trung điểm của AC), nhưng O chưa là trung điểm của BD.',
          }
        : {
            ok: false,
            msg: 'D đã đúng (O là trung điểm của BD), nhưng O chưa là trung điểm của AC.',
          };
    },
  },
];

/**
 * A movable point after a drag or key move: snapped to the grid and kept on
 * the board.
 * @param {number} x @param {number} y
 * @returns {Pt}
 */
export function snapPoint(x, y) {
  return {
    x: Math.min(COLS, Math.max(0, Math.round(x))),
    y: Math.min(ROWS, Math.max(0, Math.round(y))),
  };
}

/**
 * Every point of a task with the movable ones at `moved`.
 * @param {Task} task @param {Pts} moved
 * @returns {Pts}
 */
export function allPoints(task, moved) {
  return { ...task.fixed, ...moved };
}

/**
 * The corners of the rectangle task (A fixed, C dragged), in order A, B, C, D.
 * @param {Pt} a @param {Pt} c
 */
export function rectangleCorners(a, c) {
  return [a, { x: c.x, y: a.y }, c, { x: a.x, y: c.y }];
}
