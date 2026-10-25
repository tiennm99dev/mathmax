/**
 * Comparing two data sets of the same kind on a double bar chart: the boys
 * and girls of four grade-6 classes.
 */

export const CLASSES = ['6A', '6B', '6C', '6D'];
export const BOYS = [18, 22, 15, 20];
export const GIRLS = [20, 17, 21, 20];

/**
 * The comparison of one category, in words.
 * @param {string} name category
 * @param {number} a first series value (boys)
 * @param {number} b second series value (girls)
 */
export function compareText(name, a, b) {
  if (a === b) return `Lớp ${name}: ${a} nam và ${b} nữ, số nam bằng số nữ.`;
  const more = a > b ? 'nam' : 'nữ';
  return `Lớp ${name}: ${a} nam và ${b} nữ, số ${more} nhiều hơn ${Math.abs(a - b)} bạn.`;
}

/** @param {number[]} xs */
export const total = (xs) => xs.reduce((s, x) => s + x, 0);

/**
 * Indices of the categories with the largest gap between the two series.
 * @param {number[]} a @param {number[]} b
 */
export function largestGap(a, b) {
  const gaps = a.map((x, i) => Math.abs(x - b[i]));
  const top = Math.max(...gaps);
  return gaps.flatMap((g, i) => (g === top ? [i] : []));
}

/**
 * Questions answered by picking classes on the chart. `answer` lists every
 * class that fits, computed from the data.
 * @returns {{ prompt: string, answer: number[] }[]}
 */
export function questions() {
  const idx = CLASSES.map((_, i) => i);
  return [
    {
      prompt: 'Lớp nào có số học sinh nam nhiều hơn số học sinh nữ?',
      answer: idx.filter((i) => BOYS[i] > GIRLS[i]),
    },
    {
      prompt: 'Lớp nào có số học sinh nam bằng số học sinh nữ?',
      answer: idx.filter((i) => BOYS[i] === GIRLS[i]),
    },
    {
      prompt: 'Lớp nào có số nam và số nữ chênh lệch nhiều nhất?',
      answer: largestGap(BOYS, GIRLS),
    },
    {
      prompt: 'Lớp nào đông học sinh nhất (cộng cả nam và nữ)?',
      answer: (() => {
        const sizes = idx.map((i) => BOYS[i] + GIRLS[i]);
        const top = Math.max(...sizes);
        return idx.filter((i) => sizes[i] === top);
      })(),
    },
  ];
}
