/**
 * The adaptive review of geometry: right angles, midpoints, circles, the cube
 * and the box, and a box built from small cubes and painted. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { cornerMarks, nameAway, pointAt, rightCorners } from './scene.js';
import { countPainted } from './stack.js';
import { valueOptions } from './options.js';

/** @typedef {import('./scene.js').Pt} Pt */
/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').ReviewQuestion} ReviewQuestion */

/**
 * Shapes on a grid whose right angles a child counts. Corners are whole
 * numbers so the test of a right angle is exact.
 * @type {readonly Pt[][]}
 */
export const COUNT_SHAPES = [
  [
    { x: 0, y: 4 },
    { x: 3, y: 0 },
    { x: 6, y: 4 },
  ],
  [
    { x: 1, y: 0 },
    { x: 1, y: 4 },
    { x: 6, y: 4 },
  ],
  [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 6, y: 4 },
    { x: 0, y: 4 },
  ],
  [
    { x: 2, y: 0 },
    { x: 6, y: 0 },
    { x: 4, y: 4 },
    { x: 0, y: 4 },
  ],
  [
    { x: 1, y: 0 },
    { x: 5, y: 0 },
    { x: 5, y: 4 },
    { x: 1, y: 4 },
  ],
  [
    { x: 0, y: 0 },
    { x: 6, y: 0 },
    { x: 6, y: 4 },
    { x: 0, y: 4 },
  ],
  [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 6, y: 2 },
    { x: 4, y: 4 },
    { x: 0, y: 4 },
  ],
];

/**
 * How many right angles a shape has.
 * @param {readonly Pt[]} shape
 * @returns {ReviewQuestion}
 */
export function countRightAngles(shape) {
  const count = rightCorners([...shape]).length;
  const points = shape.map((p) => ({ x: 40 + p.x * 40, y: 20 + p.y * 40 }));
  const sides = shape.length;
  const options = [0, 1, 2, 3, 4];
  return {
    prompt: 'Hình này có mấy góc vuông?',
    options: options.map(String),
    answer: options.indexOf(count),
    hint: 'Em đặt ê ke vào từng góc của hình, rồi đếm.',
    solution:
      count === 0
        ? 'Hình này không có góc vuông nào.'
        : `Hình này có ${count} góc vuông, các dấu xanh chỉ các góc đó.`,
    visual: {
      type: 'scene',
      scene: {
        w: 320,
        h: 200,
        label: `Một hình có ${sides} cạnh. Các góc: ${shape
          .map((_, i) => (rightCorners([...shape]).includes(i) ? 'góc vuông' : 'góc không vuông'))
          .join(', ')}.`,
        settledLabel: `Một hình có ${sides} cạnh và ${count} góc vuông.`,
        polygons: [{ points }],
        reveal: { corners: cornerMarks(points) },
      },
    },
  };
}

/** @type {ReviewSkill} */
export const rightAngles = {
  id: 'goc-vuong',
  label: 'Góc vuông',
  make: (rand) => countRightAngles(pick(rand, COUNT_SHAPES)),
};

/** Where the three points inside a segment 8 parts long may sit. */
const MID_LAYOUTS = /** @type {const} */ ([
  [2, 4, 6],
  [1, 4, 7],
  [3, 4, 6],
  [2, 4, 5],
  [1, 4, 5],
  [3, 4, 7],
]);

/** @type {ReviewSkill} */
export const midpoints = {
  id: 'trung-diem',
  label: 'Trung điểm của đoạn thẳng',
  make(rand) {
    if (rand() < 0.5) {
      const half = int(rand, 2, 9);
      const whole = half * 2;
      return {
        prompt: `Đoạn thẳng AB dài ${whole} cm. M là trung điểm của AB. Đoạn thẳng AM dài bao nhiêu?`,
        ...valueOptions(half, [whole, whole - 1, half + 2], (n) => `${n} cm`),
        hint: 'Trung điểm chia đoạn thẳng thành hai phần bằng nhau.',
        solution: `AM = MB. ${whole} : 2 = ${half}. Đoạn thẳng AM dài ${half} cm.`,
      };
    }
    const unit = pick(rand, [1, 2]);
    const layout = pick(rand, MID_LAYOUTS);
    const names = shuffle(rand, ['M', 'N', 'P']);
    const scale = 34;
    const left = 24;
    /** @param {number} at */
    const spot = (at) => ({ x: left + at * scale, y: 90 });
    const stops = [0, ...layout, 8];
    const labels = ['A', ...names, 'B'];
    const right = names[1];
    return {
      prompt:
        'Các số trên hình là độ dài theo xăng-ti-mét. Điểm nào là trung điểm của đoạn thẳng AB?',
      ...mixOptions(
        rand,
        right,
        names.filter((n) => n !== right),
      ),
      hint: 'Trung điểm nằm giữa hai đầu đoạn thẳng và cách đều hai đầu đó.',
      solution: `${right} nằm giữa A và B. A${right} = ${right}B = ${4 * unit} cm, nên ${right} là trung điểm của AB.`,
      visual: {
        type: 'scene',
        scene: {
          w: 320,
          h: 140,
          label: `Đoạn thẳng AB có các điểm theo thứ tự ${labels.join(', ')}. Độ dài các phần lần lượt là ${stops
            .slice(1)
            .map((s, i) => `${(s - stops[i]) * unit} xăng-ti-mét`)
            .join(', ')}.`,
          lines: [{ a: spot(0), b: spot(8) }],
          dots: stops.map((s, i) => ({
            at: spot(s),
            name: labels[i],
            nameAt: { x: spot(s).x, y: 62 },
          })),
          texts: stops.slice(1).map((s, i) => ({
            x: (spot(s).x + spot(stops[i]).x) / 2,
            y: 112,
            text: `${(s - stops[i]) * unit}`,
          })),
        },
      },
    };
  },
};

const CENTRE = { x: 160, y: 125 };
const R = 90;

/**
 * A circle with centre O, the diameter AB, the radius OC and a segment DE that
 * misses the centre.
 * @returns {import('./scene.js').Scene}
 */
function circleScene() {
  const a = pointAt(CENTRE, R, 180);
  const b = pointAt(CENTRE, R, 0);
  const c = pointAt(CENTRE, R, -60);
  const d = pointAt(CENTRE, R, 120);
  const e = pointAt(CENTRE, R, 40);
  /** @type {[string, Pt][]} */
  const rim = [
    ['A', a],
    ['B', b],
    ['C', c],
    ['D', d],
    ['E', e],
  ];
  return {
    w: 320,
    h: 250,
    label:
      'Hình tròn tâm O. Đoạn thẳng AB đi qua O. Đoạn thẳng OC nối O với điểm C trên đường tròn. Đoạn thẳng DE không đi qua O.',
    circles: [{ c: CENTRE, r: R }],
    lines: [
      { a, b },
      { a: CENTRE, b: c },
      { a: d, b: e },
    ],
    dots: [
      { at: CENTRE, name: 'O', nameAt: { x: CENTRE.x - 16, y: CENTRE.y + 18 } },
      ...rim.map(([name, at]) => ({ at, name, nameAt: nameAway(at, CENTRE) })),
    ],
  };
}

/** @type {ReviewSkill} */
export const circles = {
  id: 'hinh-tron',
  label: 'Tâm, bán kính, đường kính',
  make(rand) {
    const shape = int(rand, 0, 3);
    if (shape === 0) {
      return {
        prompt: 'Đoạn thẳng nào là đường kính của hình tròn?',
        ...mixOptions(rand, 'AB', ['OC', 'DE']),
        hint: 'Đường kính đi qua tâm, hai đầu nằm trên đường tròn.',
        solution: 'AB đi qua tâm O và hai đầu nằm trên đường tròn, nên AB là đường kính.',
        visual: { type: 'scene', scene: circleScene() },
      };
    }
    if (shape === 1) {
      const right = pick(rand, ['OA', 'OB', 'OC']);
      return {
        prompt: 'Đoạn thẳng nào là bán kính của hình tròn?',
        ...mixOptions(rand, right, ['AB', 'DE', 'CE']),
        hint: 'Bán kính nối tâm với một điểm trên đường tròn.',
        solution: `${right} nối tâm O với một điểm trên đường tròn, nên ${right} là bán kính.`,
        visual: { type: 'scene', scene: circleScene() },
      };
    }
    const r = int(rand, 2, 12);
    const d = r * 2;
    if (shape === 2) {
      return {
        prompt: `Hình tròn có bán kính ${r} cm. Đường kính dài bao nhiêu?`,
        ...valueOptions(d, [r, r + 2, d + 2], (n) => `${n} cm`),
        hint: 'Đường kính dài gấp 2 lần bán kính.',
        solution: `${r} × 2 = ${d}. Đường kính dài ${d} cm.`,
      };
    }
    return {
      prompt: `Hình tròn có đường kính ${d} cm. Bán kính dài bao nhiêu?`,
      ...valueOptions(r, [d, d - 2, r + 2], (n) => `${n} cm`),
      hint: 'Bán kính dài bằng một nửa đường kính.',
      solution: `${d} : 2 = ${r}. Bán kính dài ${r} cm.`,
    };
  },
};

const SOLID_FACTS = [
  { ask: 'Khối lập phương có mấy mặt?', right: 6, say: 'Khối lập phương có 6 mặt là hình vuông.' },
  { ask: 'Khối lập phương có mấy đỉnh?', right: 8, say: 'Khối lập phương có 8 đỉnh.' },
  { ask: 'Khối lập phương có mấy cạnh?', right: 12, say: 'Khối lập phương có 12 cạnh.' },
  {
    ask: 'Khối hộp chữ nhật có mấy mặt?',
    right: 6,
    say: 'Khối hộp chữ nhật có 6 mặt là hình chữ nhật.',
  },
  { ask: 'Khối hộp chữ nhật có mấy đỉnh?', right: 8, say: 'Khối hộp chữ nhật có 8 đỉnh.' },
  { ask: 'Khối hộp chữ nhật có mấy cạnh?', right: 12, say: 'Khối hộp chữ nhật có 12 cạnh.' },
];

/** @type {ReviewSkill} */
export const solidFacts = {
  id: 'khoi-hinh',
  label: 'Khối lập phương, khối hộp chữ nhật',
  make(rand) {
    const fact = pick(rand, SOLID_FACTS);
    return {
      prompt: fact.ask,
      ...numberOptions(rand, fact.right, 4, 14),
      hint: 'Em cầm một hộp giấy hoặc nhìn hình vẽ rồi đếm.',
      solution: fact.say,
    };
  },
};

/** The boxes a child counts and paints; every side is at least 2 cubes. */
const BOXES = /** @type {const} */ ([
  { a: 2, b: 2, c: 3 },
  { a: 2, b: 3, c: 2 },
  { a: 3, b: 2, c: 2 },
  { a: 2, b: 2, c: 4 },
  { a: 3, b: 3, c: 2 },
  { a: 2, b: 3, c: 3 },
]);

/** @type {ReviewSkill} */
export const paintedCubes = {
  id: 'son-mat',
  label: 'Xếp và sơn khối lập phương',
  make(rand) {
    const dims = pick(rand, BOXES);
    const { a, b, c } = dims;
    const shape = int(rand, 0, 2);
    if (shape === 0) {
      const right = a * b * c;
      return {
        prompt: 'Khối hộp này được xếp từ bao nhiêu khối lập phương nhỏ?',
        visual: { type: 'cubes', dims },
        ...valueOptions(right, [a + b + c, a * b, right - 2]),
        hint: 'Em đếm số khối ở một lớp, rồi nhân với số lớp.',
        solution: `Mỗi lớp có ${a} × ${b} = ${a * b} khối. ${a * b} × ${c} = ${right}. Có ${right} khối.`,
      };
    }
    if (shape === 1) {
      const right = countPainted(dims, 3);
      return {
        prompt: 'Sơn tất cả mặt ngoài của khối hộp này. Có bao nhiêu khối nhỏ được sơn 3 mặt?',
        visual: { type: 'cubes', dims, mark: 3 },
        ...valueOptions(right, [4, 6, 12]),
        hint: 'Khối nhỏ ở đỉnh của khối hộp lộ ra 3 mặt. Khối hộp có mấy đỉnh?',
        solution: `Khối hộp có ${right} đỉnh, mỗi đỉnh có 1 khối nhỏ được sơn 3 mặt. Có ${right} khối.`,
      };
    }
    const right = countPainted(dims, 2);
    return {
      prompt: 'Sơn tất cả mặt ngoài của khối hộp này. Có bao nhiêu khối nhỏ được sơn đúng 2 mặt?',
      visual: { type: 'cubes', dims, mark: 2 },
      ...valueOptions(right, [right + 4, 8, 12]),
      hint: 'Khối nhỏ nằm trên cạnh, không ở đỉnh, được sơn 2 mặt.',
      solution: `Mỗi cạnh dài có khối nhỏ ở giữa được sơn 2 mặt. Đếm trên tất cả các cạnh, có ${right} khối. Các khối đó có màu vàng trong hình.`,
    };
  },
};

/** The parts of the review of geometry. */
export const GEOMETRY_SKILLS = [rightAngles, midpoints, circles, solidFacts, paintedCubes];
