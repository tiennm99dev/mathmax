/**
 * The virtual ruler of "Vẽ đoạn thẳng": slide the ruler until its 0 mark is on
 * the first point, drag the second point to the asked mark, then join them,
 * and the puzzles for folding, cutting and fitting paper. The board itself is
 * `#lib/core/kid/tangram.js`. Pure and DOM-free.
 */

/** Longest mark on the ruler. */
export const RULER_MAX = 13;

/** How far the ruler slides from the first point, in cm. */
export const REACH = 2;

/**
 * A segment to draw and where the ruler and the second point start.
 * @typedef {{ name: string, cm: number, shift: number, end: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { name: 'AB', cm: 9, shift: 2, end: 3 },
  { name: 'CD', cm: 12, shift: -1, end: 5 },
  { name: 'MN', cm: 5, shift: 1, end: 8 },
  { name: 'PQ', cm: 7, shift: -2, end: 2 },
  { name: 'GH', cm: 10, shift: 2, end: 6 },
];

/**
 * The step a child is at: 1 slide the ruler, 2 place the second point, 3 join
 * them, 4 done.
 * @param {number} shift where the 0 mark is, from the first point, in cm
 * @param {number} end where the second point is, from the first point, in cm
 * @param {number} cm the asked length
 * @param {boolean} joined
 * @returns {1 | 2 | 3 | 4}
 */
export function stepOf(shift, end, cm, joined) {
  if (shift !== 0) return 1;
  if (end !== cm) return 2;
  return joined ? 4 : 3;
}

/**
 * The ruler mark under a point `end` cm from the first point.
 * @param {number} shift
 * @param {number} end
 */
export function markUnder(shift, end) {
  return end - shift;
}

/**
 * Where a point sits on the ruler, in words; the ruler may have slid past it.
 * @param {number} shift
 * @param {number} end
 */
export function markText(shift, end) {
  const mark = markUnder(shift, end);
  return mark < 0 || mark > RULER_MAX ? 'nằm ngoài thước' : `đang ở vạch ${mark} của thước`;
}

/**
 * What the child hears at each step.
 * @param {Task} task
 * @param {number} shift
 * @param {number} end
 * @param {boolean} joined
 */
export function stepText(task, shift, end, joined) {
  const [p, q] = task.name;
  const step = stepOf(shift, end, task.cm, joined);
  if (step === 1) {
    const side = shift > 0 ? 'trái' : 'phải';
    return `Bước 1: vạch 0 chưa trùng với điểm ${p}. Em kéo thước sang ${side} nhé.`;
  }
  if (step === 2) {
    return `Bước 2: điểm ${q} đang ở vạch ${end}. Em kéo điểm ${q} đến vạch ${task.cm}.`;
  }
  if (step === 3) return `Bước 3: điểm ${q} đã ở vạch ${task.cm}. Em nối ${p} với ${q} nhé.`;
  return `Đúng rồi! Đoạn thẳng ${task.name} dài ${task.cm} cm.`;
}

/** @typedef {import('#lib/core/kid/tangram.js').Puzzle} Puzzle */

/** The fitting puzzles, from easy to harder. Target outlines start at (0, 0). */
/** @type {readonly Puzzle[]} */
export const PUZZLES = [
  {
    id: 'to-giay',
    title: 'Tờ giấy',
    goal: 'Tờ giấy được cắt thành 1 hình vuông và 1 hình chữ nhật. Ghép lại thành tờ giấy.',
    done: 'Hình vuông và hình chữ nhật ghép lại thành tờ giấy hình chữ nhật ban đầu.',
    target: [
      [
        { x: 0, y: 0 },
        { x: 3, y: 0 },
        { x: 3, y: 2 },
        { x: 0, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'square', color: '#34d399', rot: 0 },
      { shape: 'rect', color: '#fbbf24', rot: 0 },
    ],
  },
  {
    id: 'hai-manh',
    title: 'Hai mảnh',
    goal: 'Hình vuông được cắt thành 2 phần bằng nhau. Ghép 2 phần lại thành hình vuông.',
    done: 'Hai hình chữ nhật đặt sát nhau thành một hình vuông.',
    target: [
      [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'rect', color: '#60a5fa', rot: 1 },
      { shape: 'rect', color: '#f87171', rot: 1 },
    ],
  },
  {
    id: 'bon-tam-giac',
    title: 'Bốn tam giác',
    goal: 'Gấp đôi hai lần theo đường chéo rồi cắt, hình vuông thành 4 hình tam giác. Ghép lại thành hình vuông.',
    done: 'Bốn hình tam giác ghép lại thành hình vuông ban đầu.',
    target: [
      [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'quarter', color: '#f87171', rot: 0 },
      { shape: 'quarter', color: '#fbbf24', rot: 1 },
      { shape: 'quarter', color: '#34d399', rot: 2 },
      { shape: 'quarter', color: '#60a5fa', rot: 3 },
    ],
  },
  {
    id: 'tam-giac-to',
    title: 'Tam giác to',
    goal: 'Dùng 4 hình tam giác đó xếp thành 1 hình tam giác to.',
    done: 'Cũng 4 mảnh ấy lại xếp được một hình tam giác to.',
    target: [
      [
        { x: 0, y: 2 },
        { x: 2, y: 0 },
        { x: 4, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'quarter', color: '#f87171', rot: 0 },
      { shape: 'quarter', color: '#fbbf24', rot: 1 },
      { shape: 'quarter', color: '#34d399', rot: 2 },
      { shape: 'quarter', color: '#60a5fa', rot: 3 },
    ],
  },
  {
    id: 'nghieng',
    title: 'Hình nghiêng',
    goal: 'Dùng 4 hình tam giác đó xếp thành hình tứ giác nằm nghiêng.',
    done: 'Bốn hình tam giác xếp nối tiếp nhau thành một hình tứ giác.',
    target: [
      [
        { x: 1, y: 0 },
        { x: 5, y: 0 },
        { x: 4, y: 1 },
        { x: 0, y: 1 },
      ],
    ],
    pieces: [
      { shape: 'quarter', color: '#f87171', rot: 0 },
      { shape: 'quarter', color: '#fbbf24', rot: 1 },
      { shape: 'quarter', color: '#34d399', rot: 2 },
      { shape: 'quarter', color: '#60a5fa', rot: 3 },
    ],
  },
];
