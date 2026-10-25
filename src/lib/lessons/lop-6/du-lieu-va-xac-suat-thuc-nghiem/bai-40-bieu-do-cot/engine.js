/**
 * Readings of a bar chart (biểu đồ cột) of counts, and the check of a chart
 * drawn from a table.
 */

/** The sports of the class survey drawn in the widget. */
export const SPORTS = ['Bóng đá', 'Cầu lông', 'Bơi', 'Bóng rổ', 'Đá cầu'];

/** The table the learner draws in "Vẽ từ bảng" mode (lớp 6A, 40 học sinh). */
export const GOAL = [12, 8, 6, 4, 10];

/** Top of the value axis, fixed so the bars do not rescale while dragging. */
export const AXIS_MAX = 15;

/**
 * What a reader takes from a bar chart: the tallest and shortest bars
 * (every label that ties), the total and the gap between them.
 * @param {string[]} labels
 * @param {number[]} values
 */
export function readings(labels, values) {
  const hi = Math.max(...values);
  const lo = Math.min(...values);
  return {
    total: values.reduce((s, v) => s + v, 0),
    highest: labels.filter((_, i) => values[i] === hi),
    lowest: labels.filter((_, i) => values[i] === lo),
    hi,
    lo,
    gap: hi - lo,
  };
}

/**
 * Compares each drawn bar with the table.
 * @param {number[]} drawn
 * @param {number[]} goal
 * @returns {{ ok: boolean, text: string }[]}
 */
export function barStatus(drawn, goal) {
  return goal.map((g, i) => {
    const d = drawn[i] ?? 0;
    if (d === g) return { ok: true, text: 'Đúng' };
    return { ok: false, text: d < g ? `Thấp hơn ${g - d}` : `Cao hơn ${d - g}` };
  });
}
