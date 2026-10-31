/**
 * The two games of "Đơn vị đo độ dài": measure a table with hand spans
 * (two hands give two different counts, which is why we need a common
 * unit), and slide a centimetre ruler under a thing until its 0 mark meets
 * the near end, then read the far end. Pure and DOM-free.
 */
import { int, pick, rng } from '#lib/core/drill.js';
import {
  LONGEST,
  RULER_CM,
  THINGS,
  inSentence,
  rulerAdvice,
  spansToCover,
} from '../_shared/length.js';

/** The table both hands measure, in board units. */
export const TABLE = 12;

/** Hand spans, in board units: a child's hand and a grown-up's hand. */
export const HANDS = /** @type {const} */ ({
  child: { label: 'Gang tay của em', owner: 'của em', span: 3 },
  adult: { label: 'Gang tay của bố', owner: 'của bố', span: 4 },
});

/** @typedef {keyof typeof HANDS} Hand */

/**
 * What the child hears while laying hand spans on the table.
 * @param {Hand} hand
 * @param {number} placed spans laid so far
 * @param {Partial<Record<Hand, number>>} done counts already finished, per hand
 */
export function spanMessage(hand, placed, done) {
  const h = HANDS[hand];
  const need = spansToCover(TABLE, h.span);
  if (done.child !== undefined && done.adult !== undefined) {
    return `Cùng một mặt bàn: ${done.child} gang tay của em, ${done.adult} gang tay của bố. Gang tay mỗi người dài khác nhau, nên số đo khác nhau. Vì vậy người ta dùng đơn vị chung là xăng-ti-mét.`;
  }
  if (placed >= need) {
    const other = hand === 'child' ? 'bố' : 'em';
    return `Mặt bàn dài ${need} gang tay ${h.owner}. Bây giờ em thử đo bằng gang tay của ${other}.`;
  }
  if (placed === 0)
    return `Em bấm "Đặt 1 gang tay" để đặt gang tay ${h.owner} từ mép trái của mặt bàn.`;
  return `Đã đặt ${placed} gang tay ${h.owner}. Đặt tiếp cho đến mép phải của mặt bàn.`;
}

/**
 * @typedef {{
 *   thing: import('../_shared/length.js').Thing;
 *   length: number;
 *   shift: number;
 * }} Task
 */

/**
 * A thing to measure: 3 to 11 cm long, with the ruler's 0 mark 1 or 2 cm
 * away from its near end at the start.
 * @param {number} seed
 * @returns {Task}
 */
export function makeTask(seed) {
  const rand = rng(seed * 104729 + 26);
  return {
    thing: pick(rand, THINGS),
    length: int(rand, 3, LONGEST),
    shift: pick(rand, [-2, -1, 1, 2]),
  };
}

/**
 * Four answer cards in increasing order: the length, one more, one less, and
 * the number the far end shows when the ruler starts misplaced.
 * @param {Task} t
 * @returns {number[]}
 */
export function answerCards(t) {
  const L = t.length;
  const pool = [L, L - t.shift, L + 1, L - 1, L + 2, L - 2, L + 3, L - 3];
  const cards = [...new Set(pool.filter((v) => v >= 1 && v <= RULER_CM))].slice(0, 4);
  return cards.sort((a, b) => a - b);
}

/**
 * What the child hears about the ruler and an answer card.
 * @param {Task} t
 * @param {number} shift where the 0 mark is now, from the thing's near end, in cm
 * @param {number | null} picked
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function measureMessage(t, shift, picked) {
  const noun = inSentence(t.thing.label);
  if (shift !== 0) {
    if (picked !== null) {
      return {
        tone: 'warn',
        text: `Khoan đã! Vạch 0 chưa thẳng với đầu ${noun}, nên số ở đầu kia chưa phải độ dài. Em kéo thước sang ${shift > 0 ? 'trái' : 'phải'}.`,
      };
    }
    return { tone: 'info', text: rulerAdvice(shift, t.length, noun) };
  }
  if (picked === null) {
    return {
      tone: 'info',
      text: `Vạch 0 đã thẳng với đầu ${noun}. Đầu kia ở vạch số mấy? Em chạm vào thẻ số.`,
    };
  }
  if (picked === t.length) {
    return { tone: 'ok', text: `Đúng rồi! ${t.thing.label} dài ${t.length} cm.` };
  }
  return {
    tone: 'warn',
    text: `Chưa đúng. Em nhìn đầu kia của ${noun}: nó thẳng với vạch số nào trên thước?`,
  };
}
