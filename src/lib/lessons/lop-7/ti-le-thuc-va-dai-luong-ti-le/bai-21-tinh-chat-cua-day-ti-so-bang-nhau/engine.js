/**
 * Dividing a total in a given ratio with a bar cut into pieces. The learner
 * places the cuts; this module turns cut positions into the pieces, checks
 * them against the ratio with the property of equal ratios
 * (x/m = y/n = z/p = (x + y + z)/(m + n + p)) and says which piece is off.
 */

/**
 * @typedef {object} Task
 * @property {string} id
 * @property {string} label short button text
 * @property {string} story the word problem
 * @property {string} unit unit of each piece, e.g. 'quyển'
 * @property {number} total the amount to divide
 * @property {number[]} ratio the parts, two or three positive integers
 * @property {string[]} names who or what gets each piece
 * @property {number} step the cuts snap to multiples of this
 */

/** @type {Task[]} */
export const TASKS = [
  {
    id: 'vo',
    label: '240 quyển vở · 3 : 4 : 5',
    story: 'Chia 240 quyển vở cho ba lớp 7A, 7B, 7C theo tỉ lệ 3 : 4 : 5.',
    unit: 'quyển',
    total: 240,
    ratio: [3, 4, 5],
    names: ['7A', '7B', '7C'],
    step: 5,
  },
  {
    id: 'thuong',
    label: '150 nghìn đồng · 2 : 3',
    story: 'Chia 150 nghìn đồng tiền thưởng cho hai bạn An và Bình theo tỉ lệ 2 : 3.',
    unit: 'nghìn đồng',
    total: 150,
    ratio: [2, 3],
    names: ['An', 'Bình'],
    step: 5,
  },
  {
    id: 'day',
    label: 'Dây 36 cm · 2 : 3 : 4',
    story: 'Cắt sợi dây dài 36 cm thành ba đoạn tỉ lệ với 2 : 3 : 4.',
    unit: 'cm',
    total: 36,
    ratio: [2, 3, 4],
    names: ['Đoạn 1', 'Đoạn 2', 'Đoạn 3'],
    step: 1,
  },
  {
    id: 'cay',
    label: '90 cây · 1 : 2 : 3',
    story: 'Ba tổ trồng tất cả 90 cây, số cây của ba tổ tỉ lệ với 1 : 2 : 3.',
    unit: 'cây',
    total: 90,
    ratio: [1, 2, 3],
    names: ['Tổ 1', 'Tổ 2', 'Tổ 3'],
    step: 1,
  },
];

/** @param {number[]} xs */
const sum = (xs) => xs.reduce((s, x) => s + x, 0);

/**
 * The value of one equal part: total / (m + n + p).
 * @param {Task} task
 */
export const partValue = (task) => task.total / sum(task.ratio);

/**
 * The correct pieces: each ratio term times the value of one part.
 * @param {Task} task
 */
export const answerFor = (task) => task.ratio.map((r) => r * partValue(task));

/**
 * Cut positions where the bar starts out: equal pieces, snapped to the step.
 * @param {Task} task
 */
export function startCuts(task) {
  const n = task.ratio.length;
  return Array.from({ length: n - 1 }, (_, i) =>
    snap(((i + 1) * task.total) / n, task.step, 0, task.total),
  );
}

/**
 * Rounds v to a multiple of step and keeps it in [lo, hi].
 * @param {number} v
 * @param {number} step
 * @param {number} lo
 * @param {number} hi
 */
export function snap(v, step, lo, hi) {
  const s = Math.round(v / step) * step;
  return Math.min(hi, Math.max(lo, s));
}

/**
 * The pieces between consecutive cuts: [c1, c2 − c1, total − c2].
 * @param {number[]} cuts increasing positions in (0, total)
 * @param {number} total
 */
export function piecesFrom(cuts, total) {
  const edges = [0, ...cuts, total];
  return edges.slice(1).map((e, i) => e - edges[i]);
}

/**
 * @typedef {{ ok: true, k: number }
 *   | { ok: false, k: number, ratios: number[], high: number, low: number }} Verdict
 */

/**
 * Checks pieces against the ratio. They are right when every piece divided
 * by its ratio term equals total / (sum of terms). Otherwise `high` is the
 * piece whose quotient is largest (too big) and `low` the smallest.
 * @param {Task} task
 * @param {number[]} pieces
 * @returns {Verdict}
 */
export function judge(task, pieces) {
  const k = partValue(task);
  const ratios = pieces.map((p, i) => p / task.ratio[i]);
  if (ratios.every((r) => Math.abs(r - k) < 1e-9)) return { ok: true, k };
  let high = 0;
  let low = 0;
  ratios.forEach((r, i) => {
    if (r > ratios[high]) high = i;
    if (r < ratios[low]) low = i;
  });
  return { ok: false, k, ratios, high, low };
}
