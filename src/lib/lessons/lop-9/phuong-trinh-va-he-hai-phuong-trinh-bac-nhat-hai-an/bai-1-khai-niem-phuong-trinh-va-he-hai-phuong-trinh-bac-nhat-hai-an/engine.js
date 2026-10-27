/**
 * Pure logic of the "nghiệm và đường thẳng" widget: checking whether a grid
 * point is a solution of one equation `a·x + b·y = c` or of a system of two,
 * and keeping the list of points the learner has tried.
 */

import { solveSystem } from '#lib/algebra-engine/system.js';
import { intText } from '#lib/core/number-format.js';
import { pairText, substituteText } from '../_shared/equation-text.js';

/** @typedef {{ a: number, b: number, c: number }} Equation */
/** @typedef {{ x: number, y: number }} Point */
/** @typedef {{ x: number, y: number, ok: boolean }} Tried */

/**
 * Whether the equation is a linear equation in two unknowns (a ≠ 0 or b ≠ 0).
 * @param {Equation} eq
 */
export function isLinear(eq) {
  return eq.a !== 0 || eq.b !== 0;
}

/**
 * Substitutes the point and compares with c.
 * @param {Equation} eq
 * @param {Point} p
 */
export function check(eq, p) {
  const value = eq.a * p.x + eq.b * p.y;
  return { value, ok: value === eq.c };
}

/**
 * One line of feedback for a point and an equation:
 * '2 · 1 + 3 · 2 = 8 ≠ 4' or '2 · (−1) + 3 · 2 = 4 = c'.
 * @param {Equation} eq
 * @param {Point} p
 */
export function checkLine(eq, p) {
  const { ok } = check(eq, p);
  const sub = substituteText(eq.a, eq.b, p.x, p.y);
  return ok ? `${sub}, đúng bằng vế phải` : `${sub} ≠ ${intText(eq.c)}`;
}

/**
 * The tried points with `p` added (or its verdict refreshed), newest last.
 * @param {Tried[]} list
 * @param {Point} p
 * @param {boolean} ok
 * @returns {Tried[]}
 */
export function record(list, p, ok) {
  return [...list.filter((t) => t.x !== p.x || t.y !== p.y), { x: p.x, y: p.y, ok }];
}

/**
 * How many solutions of the equation the learner has found.
 * @param {Tried[]} list
 */
export function foundCount(list) {
  return list.filter((t) => t.ok).length;
}

/**
 * What the shape of the solution set is, in words, for an equation with
 * a ≠ 0 or b ≠ 0.
 * @param {Equation} eq
 */
export function lineKind(eq) {
  if (eq.a === 0) return eq.c === 0 ? 'trục Ox' : 'đường thẳng song song với trục Ox';
  if (eq.b === 0) return eq.c === 0 ? 'trục Oy' : 'đường thẳng song song với trục Oy';
  return 'đường thẳng';
}

/**
 * The verdict for a point and a system of two equations.
 * @param {Equation} eq1
 * @param {Equation} eq2
 * @param {Point} p
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function systemVerdict(eq1, eq2, p) {
  const pair = pairText(p.x, p.y);
  const one = check(eq1, p).ok;
  const two = check(eq2, p).ok;
  if (one && two) {
    return {
      tone: 'ok',
      text: `${pair} thoả mãn cả hai phương trình: đó là một nghiệm của hệ, cũng là giao điểm của hai đường thẳng.`,
    };
  }
  if (one) {
    return {
      tone: 'warn',
      text: `${pair} chỉ thoả mãn phương trình (1): điểm nằm trên đường thẳng (1) nhưng không nằm trên đường thẳng (2), nên chưa là nghiệm của hệ.`,
    };
  }
  if (two) {
    return {
      tone: 'warn',
      text: `${pair} chỉ thoả mãn phương trình (2): điểm nằm trên đường thẳng (2) nhưng không nằm trên đường thẳng (1), nên chưa là nghiệm của hệ.`,
    };
  }
  return {
    tone: 'info',
    text: `${pair} không thoả mãn phương trình nào. Kéo điểm tới chỗ hai đường thẳng gặp nhau.`,
  };
}

/**
 * How the two lines of a system lie, and so how many solutions it has.
 * @param {Equation} eq1
 * @param {Equation} eq2
 * @param {number} [span] the plot shows −span..span on both axes
 */
export function systemShape(eq1, eq2, span = Infinity) {
  const s = solveSystem(eq1, eq2);
  if (s.kind === 'unique') {
    const onGrid = Number.isInteger(s.point.x) && Number.isInteger(s.point.y);
    if (onGrid && (Math.abs(s.point.x) > span || Math.abs(s.point.y) > span)) {
      return 'Hai đường thẳng cắt nhau tại một điểm nằm ngoài khung hình: hệ có đúng một nghiệm. Đổi hệ số để thấy giao điểm.';
    }
    return onGrid
      ? 'Hai đường thẳng cắt nhau tại một điểm: hệ có đúng một nghiệm. Hãy tìm nó.'
      : 'Hai đường thẳng cắt nhau tại một điểm không nằm trên nút lưới: hệ có một nghiệm nhưng toạ độ không nguyên.';
  }
  if (s.kind === 'parallel') return 'Hai đường thẳng song song: không có điểm chung, hệ vô nghiệm.';
  if (s.kind === 'coincident') {
    return 'Hai đường thẳng trùng nhau: mọi nghiệm của phương trình này đều là nghiệm của phương trình kia, hệ có vô số nghiệm.';
  }
  return 'Mỗi phương trình cần a ≠ 0 hoặc b ≠ 0.';
}
