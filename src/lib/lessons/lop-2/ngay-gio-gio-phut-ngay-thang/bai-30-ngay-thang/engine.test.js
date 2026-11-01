import { describe, expect, it } from 'vitest';
import { daysIn, monthRows, weekdayOf } from '../_shared/time.js';
import { MISSIONS, checkMission, dateSentence, monthSentence } from './engine.js';

/**
 * The date a mission asks for, read again from its sheet.
 * @param {string} prompt
 * @param {number} month
 */
function readSheet(prompt, month) {
  const rows = monthRows(month);
  const column = (/** @type {number} */ col) => rows.map((r) => r[col]).filter((d) => d !== null);
  if (prompt.startsWith('Thứ Hai đầu tiên')) return column(0)[0];
  if (prompt.includes('thứ Bảy tuần sau')) return 16 + 7;
  if (prompt.includes('thứ Sáu tuần trước')) return 16 - 7;
  if (prompt.startsWith('Chủ nhật cuối cùng')) return column(6).at(-1);
  return null;
}

describe('sentences of a sheet', () => {
  it('reads dates and months', () => {
    expect(dateSentence(5, 19)).toBe('Ngày 19 tháng 5 là thứ Năm.');
    expect(dateSentence(4, 30)).toBe('Ngày 30 tháng 4 là thứ Bảy.');
    expect(monthSentence(2)).toBe('Tháng 2 có 28 ngày: ngày 1 là thứ Ba, ngày 28 là thứ Hai.');
  });
});

describe('questions on a sheet', () => {
  it('stores answers that the sheets confirm', () => {
    const wrong = [];
    for (const m of MISSIONS) {
      if (m.way === 'tap') {
        if (readSheet(m.prompt, m.month) !== m.answer) wrong.push(m.prompt);
        if (m.answer > daysIn(m.month)) wrong.push(m.prompt);
      } else if (m.prompt.includes('là thứ mấy')) {
        const date = Number(m.prompt.match(/(\d+) tháng/)?.[1]);
        if (weekdayOf(m.month, date) !== m.answer) wrong.push(m.prompt);
      } else if (m.prompt.includes('bao nhiêu ngày')) {
        if (m.options?.[m.answer] !== `${daysIn(m.month)} ngày`) wrong.push(m.prompt);
      } else if (m.options?.[m.answer] !== String(m.hidden?.[0])) {
        wrong.push(m.prompt);
      }
    }
    expect(wrong).toEqual([]);
  });

  it('keeps the weekday given in a prompt true', () => {
    expect(weekdayOf(4, 16)).toBe(5);
    expect(weekdayOf(9, 16)).toBe(4);
  });

  it('gives the reason when right and a nudge when wrong', () => {
    const m = MISSIONS[1];
    expect(checkMission(m, 7)).toEqual({ ok: true, text: `Đúng rồi! ${m.why}` });
    expect(checkMission(m, 14)).toEqual({ ok: false, text: `Chưa đúng. ${m.hint}` });
  });
});
