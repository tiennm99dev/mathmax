/**
 * Addition and subtraction as hops on the number ray. Subtraction a − b only
 * exists in ℕ when a ≥ b; otherwise the backward hop runs past 0.
 */

/**
 * @typedef {{ from: number, to: number, label: string, color: string }} Hop
 * @typedef {{
 *   ok: boolean,
 *   result: number | null,
 *   hops: Hop[],
 *   equation: string,
 *   message: string,
 * }} HopModel
 */

export const ADD = '#1B998B';
export const SUB = '#F46036';
export const FAIL = '#D7263D';

/**
 * Model of a + b: start at a, hop b steps forward.
 * @param {number} a
 * @param {number} b
 * @returns {HopModel}
 */
export function addModel(a, b) {
  return {
    ok: true,
    result: a + b,
    hops: b > 0 ? [{ from: a, to: a + b, label: `+${b}`, color: ADD }] : [],
    equation: `${a} + ${b} = ${a + b}`,
    message:
      b === 0
        ? `Cộng với 0 không làm thay đổi số: ${a} + 0 = ${a}.`
        : `Từ điểm ${a} nhảy ${b} bước sang phải, tới điểm ${a + b}.`,
  };
}

/**
 * Model of a − b: start at a, hop b steps back. When b > a the hop stops at 0
 * with steps left over, so the difference is not a natural number.
 * @param {number} a
 * @param {number} b
 * @returns {HopModel}
 */
export function subModel(a, b) {
  if (b <= a) {
    return {
      ok: true,
      result: a - b,
      hops: b > 0 ? [{ from: a, to: a - b, label: `−${b}`, color: SUB }] : [],
      equation: `${a} − ${b} = ${a - b}`,
      message: `Từ điểm ${a} lùi ${b} bước sang trái, tới điểm ${a - b}. Kiểm tra: ${a - b} + ${b} = ${a}.`,
    };
  }
  return {
    ok: false,
    result: null,
    hops: a > 0 ? [{ from: a, to: 0, label: `chỉ lùi được ${a}`, color: FAIL }] : [],
    equation: `${a} − ${b}: không thực hiện được trong ℕ`,
    message: `Từ điểm ${a} lùi tới gốc 0 mới được ${a} bước, còn thiếu ${b - a} bước. Không có số tự nhiên x nào để ${b} + x = ${a}, vì số trừ ${b} lớn hơn số bị trừ ${a}.`,
  };
}
