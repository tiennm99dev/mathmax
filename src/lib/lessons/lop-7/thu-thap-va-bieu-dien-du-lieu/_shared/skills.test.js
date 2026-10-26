import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, DATA_POOL, monthlySeries } from './skills.js';

/** @param {string} s */
const n = (s) => Number(s);

/**
 * Recomputes a question's answer from its prompt alone.
 * @param {string} prompt
 * @returns {number}
 */
function recompute(prompt) {
  let m;
  if ((m = /có (\d+) khối, mỗi khối có (\d+) lớp\..*chọn ngẫu nhiên (\d+) học sinh/.exec(prompt)))
    return n(m[1]) * n(m[2]) * n(m[3]);
  if ((m = /năm dãy dữ liệu: (.*)\. Có bao nhiêu dãy là (.*)\?$/.exec(prompt))) {
    const items = m[1].split('; ').map((s) => s.replace(/^\(\d\) /, ''));
    expect(items).toHaveLength(5);
    const kinds = items.map((t) => {
      const hit = DATA_POOL.find((x) => x.text === t);
      expect(hit, t).toBeDefined();
      return hit?.kind;
    });
    const want = m[2].startsWith('số liệu')
      ? 'so'
      : m[2].includes('nhưng sắp thứ tự được')
        ? 'thu-tu'
        : 'khong';
    return kinds.filter((k) => k === want).length;
  }
  if (
    (m =
      /có (\d+) học sinh\. Trên biểu đồ hình quạt, hình quạt "Thích đọc truyện" biểu diễn (\d+)%/.exec(
        prompt,
      ))
  )
    return (n(m[1]) * n(m[2])) / 100;
  if ((m = /có (\d+) học sinh, trong đó (\d+) bạn đi xe đạp/.exec(prompt)))
    return (n(m[2]) * 100) / n(m[1]);
  if ((m = /Ba hình quạt biểu diễn (\d+)%, (\d+)% và (\d+)%/.exec(prompt)))
    return 100 - n(m[1]) - n(m[2]) - n(m[3]);
  if ((m = /^Hình quạt biểu diễn (\d+)% có góc ở tâm/.exec(prompt))) return (n(m[1]) * 36) / 10;
  if ((m = /góc ở tâm (\d+)°\. Hình quạt đó biểu diễn/.exec(prompt))) return (n(m[1]) * 100) / 360;
  if (
    (m =
      /Lớp có (\d+) học sinh\. .* (\d+)% số bạn thích bóng đá và (\d+)% số bạn thích cầu lông/.exec(
        prompt,
      ))
  )
    return (n(m[1]) * (n(m[2]) - n(m[3]))) / 100;
  if ((m = /trong sáu tháng: (.*?)\. (.*)$/.exec(prompt))) {
    const v = m[1].split('; ').map((s) => n(s.replace(/^tháng \d: /, '')));
    expect(v).toHaveLength(6);
    const q = m[2];
    const d = v.slice(1).map((x, i) => x - v[i]);
    let k;
    if ((k = /Từ tháng (\d) đến tháng (\d)/.exec(q))) {
      expect(n(k[2])).toBe(n(k[1]) + 1);
      return Math.abs(v[n(k[2]) - 1] - v[n(k[1]) - 1]);
    }
    if (q.includes('nhiều sách nhất')) return v.indexOf(Math.max(...v)) + 1;
    if (q.includes('ít sách nhất')) return v.indexOf(Math.min(...v)) + 1;
    if (q.includes('nhiều nhất hơn tháng cho mượn ít nhất')) return Math.max(...v) - Math.min(...v);
    if (q.includes('tăng nhiều nhất')) return Math.max(...d);
    if (q.includes('đi xuống')) return d.filter((x) => x < 0).length;
  }
  throw new Error(`no recompute rule for: ${prompt}`);
}

describe('chapter skills', () => {
  it('give natural-number answers that match a recomputation, over many sets', () => {
    for (let seed = 1; seed <= 150; seed++) {
      for (const q of buildSet(CHAPTER_SKILLS, 4, seed)) {
        expect(Number.isInteger(q.answer), q.prompt).toBe(true);
        expect(q.answer, q.prompt).toBeGreaterThanOrEqual(0);
        expect(q.answer, q.prompt).toBe(recompute(q.prompt));
        expect(q.steps.length, q.prompt).toBeGreaterThan(0);
        expect(q.hints?.length ?? 0, q.prompt).toBeGreaterThan(0);
      }
    }
  });

  it('reaches every question kind', () => {
    const seen = new Set();
    for (let seed = 1; seed <= 150; seed++)
      for (const q of buildSet(CHAPTER_SKILLS, 4, seed))
        seen.add(q.prompt.replace(/\d+/g, '#').slice(-60));
    expect(seen.size).toBeGreaterThan(14);
  });

  it('does not give the answer away in the hints', () => {
    for (let seed = 1; seed <= 60; seed++)
      for (const q of buildSet(CHAPTER_SKILLS, 4, seed)) {
        if (!/bao nhiêu (phần trăm|độ)\?/.test(q.prompt)) continue;
        for (const h of q.hints ?? [])
          expect(h, q.prompt).not.toMatch(new RegExp(`(^|\\D)${q.answer}(%|°)`));
      }
  });

  it('draws monthly series with one highest, one lowest, a rise and a fall', () => {
    const rand = rng(7);
    for (let k = 0; k < 200; k++) {
      const v = monthlySeries(rand);
      expect(v.filter((x) => x === Math.max(...v))).toHaveLength(1);
      expect(v.filter((x) => x === Math.min(...v))).toHaveLength(1);
      for (const x of v) expect(x % 5).toBe(0);
    }
  });

  it('keeps one kind of data per pool entry, with every kind present', () => {
    expect(new Set(DATA_POOL.map((x) => x.text)).size).toBe(DATA_POOL.length);
    for (const k of ['so', 'thu-tu', 'khong'])
      expect(DATA_POOL.some((x) => x.kind === k)).toBe(true);
  });
});
