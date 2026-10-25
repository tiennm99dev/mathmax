/**
 * Checks a learner's choice of the points inside an angle against the points
 * that really are inside, and says what went wrong.
 * @param {string[]} inside names of the points inside the angle
 * @param {string[]} chosen names the learner picked
 * @returns {{ ok: boolean, text: string }}
 */
export function challengeResult(inside, chosen) {
  const missed = inside.filter((n) => !chosen.includes(n));
  const extra = chosen.filter((n) => !inside.includes(n));
  if (missed.length === 0 && extra.length === 0) {
    return {
      ok: true,
      text:
        inside.length === 0
          ? 'Đúng rồi! Không có điểm nào trong năm điểm nằm trong góc xOy.'
          : `Đúng rồi! Các điểm nằm trong góc xOy là ${inside.join(', ')}.`,
    };
  }
  const parts = [];
  if (extra.length > 0) parts.push(`${extra.join(', ')} không nằm trong góc xOy`);
  if (missed.length > 0) parts.push(`em còn thiếu ${missed.length} điểm nằm trong góc`);
  return { ok: false, text: `Chưa đúng: ${parts.join('; ')}. Nhìn phần tô màu giữa hai cạnh.` };
}
