/**
 * Repeated trials for the experimental-probability widget: run an
 * experiment many times, keep the experimental probability k/n after every
 * trial, sample that path for drawing, and use the result to estimate an
 * unknown count (N · k/n).
 */

/** The most trials one run keeps; the path stays small enough to redraw. */
export const MAX_TRIALS = 10000;

/**
 * @typedef {object} Experiment
 * @property {string} id
 * @property {string} label
 * @property {string} action
 * @property {string} event the event E, in quotes in the page
 * @property {number} favourable favourable outcomes when the box is known
 * @property {number} total possible outcomes
 * @property {boolean} hidden whether the favourable count is a secret
 */

/** @type {Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'xuc-xac',
    label: 'Xúc xắc',
    action: 'Gieo một con xúc xắc cân đối.',
    event: 'Xuất hiện mặt 6 chấm',
    favourable: 1,
    total: 6,
    hidden: false,
  },
  {
    id: 'dong-xu',
    label: 'Đồng xu',
    action: 'Tung một đồng xu cân đối.',
    event: 'Đồng xu xuất hiện mặt ngửa',
    favourable: 1,
    total: 2,
    hidden: false,
  },
  {
    id: 'bi',
    label: 'Túi bi',
    action:
      'Túi có 3 viên bi đỏ và 2 viên bi xanh cùng kích thước. Lấy ngẫu nhiên một viên, ghi màu rồi trả lại túi.',
    event: 'Lấy được viên bi màu đỏ',
    favourable: 3,
    total: 5,
    hidden: false,
  },
  {
    id: 'bi-an',
    label: 'Túi bí ẩn',
    action:
      'Túi có 20 viên bi đỏ và xanh cùng kích thước, không biết bao nhiêu viên màu đỏ. Lấy ngẫu nhiên một viên, ghi màu rồi trả lại túi.',
    event: 'Lấy được viên bi màu đỏ',
    favourable: 7,
    total: 20,
    hidden: true,
  },
];

/**
 * @typedef {object} Run
 * @property {number} n trials so far
 * @property {number} k times E happened
 * @property {number[]} path k/n after each trial
 */

/** @returns {Run} */
export const emptyRun = () => ({ n: 0, k: 0, path: [] });

/**
 * Runs more trials of an experiment whose event has probability `p`; stops
 * at `MAX_TRIALS`.
 * @param {Run} run @param {number} times @param {number} p
 * @param {() => number} rand
 * @returns {Run}
 */
export function addTrials(run, times, p, rand) {
  let { n, k } = run;
  const path = [...run.path];
  const stop = Math.min(MAX_TRIALS, n + times);
  while (n < stop) {
    n++;
    if (rand() < p) k++;
    path.push(k / n);
  }
  return { n, k, path };
}

/**
 * At most `max` points [trial number, k/n] spread evenly along the path,
 * always ending at the last trial.
 * @param {readonly number[]} path @param {number} max
 * @returns {Array<[number, number]>}
 */
export function samplePath(path, max) {
  const len = path.length;
  if (len === 0) return [];
  if (len <= max) return path.map((v, i) => [i + 1, v]);
  /** @type {Array<[number, number]>} */
  const out = [];
  for (let j = 0; j < max; j++) {
    const i = Math.round((j * (len - 1)) / (max - 1));
    out.push([i + 1, path[i]]);
  }
  return out;
}

/**
 * The estimate of a count from an experimental probability: N · k/n,
 * rounded to the nearest whole number.
 * @param {number} population @param {number} k @param {number} n
 */
export function estimate(population, k, n) {
  return n === 0 ? 0 : Math.round((population * k) / n);
}
