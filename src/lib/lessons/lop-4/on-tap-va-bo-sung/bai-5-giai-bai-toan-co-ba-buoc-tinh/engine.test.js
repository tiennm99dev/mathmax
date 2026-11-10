import { describe, expect, it } from 'vitest';
import { PROBLEMS, judge, piecesOf, resultOf, shownOrder, totalOf, widest } from './engine.js';

describe('three-step problems', () => {
  it('have a right first option that finds the bar or the total', () => {
    /** @type {string[]} */
    const wrong = [];
    for (const p of PROBLEMS) {
      if (p.steps.length !== 3) wrong.push(`${p.id} steps`);
      p.steps.forEach((s, i) => {
        const want = s.finds === 'total' ? totalOf(p) : p.bars[s.finds].value;
        if (resultOf(s.options[0]) !== want) wrong.push(`${p.id} step ${i}`);
        if (s.options.slice(1).some((o) => resultOf(o) === want)) wrong.push(`${p.id} twin ${i}`);
        if (new Set(s.options).size !== s.options.length) wrong.push(`${p.id} dup ${i}`);
      });
      if (!p.answer.includes(String(totalOf(p)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '))) {
        wrong.push(`${p.id} answer`);
      }
    }
    expect(wrong).toEqual([]);
    expect(totalOf(PROBLEMS[0])).toBe(3800);
    expect(totalOf(PROBLEMS[1])).toBe(56);
    expect(totalOf(PROBLEMS[2])).toBe(73);
  });

  it('draw every bar to its value', () => {
    /** @type {string[]} */
    const wrong = [];
    for (const p of PROBLEMS) {
      piecesOf(p).forEach((pieces, i) => {
        const drawn = pieces.filter((x) => x.kind !== 'missing').at(-1)?.end;
        if (drawn !== p.bars[i].value) wrong.push(`${p.id} bar ${i}`);
      });
    }
    expect(wrong).toEqual([]);
    expect(widest(PROBLEMS[0])).toBe(1700);
    expect(piecesOf(PROBLEMS[0])[1][1]).toEqual({
      start: 900,
      end: 1200,
      kind: 'missing',
      note: '300',
    });
  });

  it('judge a choice without giving the number away', () => {
    expect(judge(PROBLEMS[0], 0, 0).text).toBe('Đúng rồi! Bác Mận: 1 200 − 300 = 900 (con vịt).');
    const slip = judge(PROBLEMS[2], 0, 1);
    expect(slip.tone).toBe('warn');
    expect(slip.text).toBe(
      'Chưa đúng. Em xem sơ đồ: Bưởi gấp 2 lần Sầu riêng. Em tính từ số của Sầu riêng.',
    );
    expect(judge(PROBLEMS[0], 2, 2).text).not.toMatch(/\d{3}/);
  });

  it('show the options in a mixed order', () => {
    expect(shownOrder(0, 3)).toEqual([1, 2, 0]);
    expect(shownOrder(1, 3)).toEqual([2, 0, 1]);
    expect([0, 1, 2, 3].map((step) => shownOrder(step, 3)[0])).not.toContain(0);
  });
});
