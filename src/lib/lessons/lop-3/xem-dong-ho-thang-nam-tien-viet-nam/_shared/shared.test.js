import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { WEEKDAYS } from '#lib/core/kid/time.js';
import { GROUP } from '#lib/core/number-format.js';
import { NOTES, fewestNotes, moneyText, notesText, spareNote, sumNotes } from './money.js';
import { LABELS, MAKERS, labelsOf, roundOf } from './questions.js';
import {
  THIRTY,
  THIRTY_ONE,
  daysBetween,
  daysIn,
  dialText,
  durationText,
  handsWords,
  kemText,
  later,
  monthDaysText,
  nthWeekday,
  weekdayOf,
} from './time.js';

/** @param {string} text */
const value = (text) => Number(text.replaceAll(GROUP, '').replace(/\D+$/, ''));

describe('reading a clock to the minute', () => {
  it('reads the dial and the kém form', () => {
    expect(dialText(8 * 60 + 32)).toBe('8 giờ 32 phút');
    expect(dialText(16 * 60 + 55)).toBe('4 giờ 55 phút');
    expect(kemText(8 * 60 + 55)).toBe('9 giờ kém 5 phút');
    expect(kemText(11 * 60 + 40)).toBe('12 giờ kém 20 phút');
    expect(kemText(8 * 60 + 30)).toBeNull();
  });

  it('says where the hands point without the time', () => {
    expect(handsWords(8 * 60 + 32)).toBe(
      'kim ngắn ở giữa số 8 và số 9, kim dài chỉ vạch nhỏ thứ 2 sau số 6',
    );
    expect(handsWords(3 * 60)).toBe('kim ngắn chỉ số 3, kim dài chỉ số 12');
    expect(handsWords(3 * 60 + 15)).toContain('kim dài chỉ số 3');
    expect(handsWords(3 * 60 + 3)).toContain('vạch nhỏ thứ 3 sau số 12');
  });

  it('adds minutes and writes lengths of time', () => {
    expect(dialText(later(10 * 60 + 10, 40))).toBe('10 giờ 50 phút');
    expect(dialText(later(3 * 60 + 50, 25))).toBe('4 giờ 15 phút');
    expect(durationText(55)).toBe('55 phút');
    expect(durationText(75)).toBe('1 giờ 15 phút');
  });
});

describe('months and the calendar', () => {
  it('knows the days of every month', () => {
    expect(THIRTY.every((m) => daysIn(m) === 30)).toBe(true);
    expect(THIRTY_ONE.every((m) => daysIn(m) === 31)).toBe(true);
    expect(monthDaysText(2)).toBe('28 hoặc 29 ngày');
    expect(THIRTY.length + THIRTY_ONE.length + 1).toBe(12);
  });

  it('counts days with both ends and finds weekdays', () => {
    expect(daysBetween(8, 30, 9, 3)).toBe(5);
    expect(daysBetween(6, 24, 6, 30)).toBe(7);
    expect(daysBetween(2, 27, 3, 2)).toBe(4);
    const first = nthWeekday(5, 6, 1);
    expect(weekdayOf(5, first)).toBe(6);
    expect(first).toBeLessThanOrEqual(7);
    expect(nthWeekday(3, 6, -1) + 7).toBeGreaterThan(daysIn(3));
  });
});

describe('money', () => {
  it('adds notes and pays with the fewest', () => {
    expect(sumNotes([20000, 10000, 5000])).toBe(35000);
    expect(fewestNotes(38000)).toEqual([20000, 10000, 5000, 2000, 1000]);
    expect(fewestNotes(1500)).toBeNull();
    expect(notesText([5000, 20000, 5000])).toBe(
      `1 tờ ${moneyText(20000)} và 2 tờ ${moneyText(5000)}`,
    );
  });

  it('spots a note the buyer did not need', () => {
    expect(spareNote([20000, 10000, 5000], 25000)).toBe(10000);
    expect(spareNote([20000, 10000, 5000], 27000)).toBe(5000);
    expect(spareNote([50000, 20000], 30000)).toBe(20000);
    expect(spareNote([20000, 10000], 25000)).toBeNull();
  });
});

describe('the question makers', () => {
  it('make sound questions on every seed', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const rand = rng(seed);
      for (const kind of /** @type {(keyof typeof LABELS)[]} */ (Object.keys(LABELS))) {
        const q = MAKERS[kind](rand);
        const texts = q.options.map(optionText);
        if (
          q.kind !== kind ||
          texts.length !== (kind === 'month' ? 3 : 4) ||
          new Set(texts).size !== texts.length ||
          q.answer < 0 ||
          q.answer >= texts.length ||
          q.hint.includes(texts[q.answer])
        ) {
          bad.push({ seed, kind, q });
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('keep every stored answer right', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const rand = rng(seed);
      for (const kind of /** @type {(keyof typeof LABELS)[]} */ (Object.keys(LABELS))) {
        const q = MAKERS[kind](rand);
        const right = optionText(q.options[q.answer]);
        const v = q.visual;
        if (kind === 'read' && v?.clock !== undefined && right !== dialText(v.clock)) bad.push(q);
        if (kind === 'kem' && v?.clock !== undefined && right !== kemText(v.clock)) bad.push(q);
        if (kind === 'after') {
          const m = /^Bây giờ là (.+)\. (\d+) phút nữa/.exec(q.prompt);
          if (!m || v?.clock === undefined || dialText(v.clock) !== m[1]) bad.push(q);
          else if (right !== dialText(later(v.clock, Number(m[2])))) bad.push(q);
        }
        if (kind === 'duration') {
          const m = /từ \d+ giờ(?: (\d+) phút)? đến \d+ giờ(?: (\d+) phút)?/.exec(q.prompt);
          if (!m || value(right) !== Number(m[2] ?? 0) - Number(m[1] ?? 0)) bad.push(q);
        }
        if (kind === 'month') {
          const month = Number(/Tháng (\d+)/.exec(q.prompt)?.[1]);
          if (right !== monthDaysText(month)) bad.push(q);
        }
        if (kind === 'weekday' && v?.month !== undefined && v.marks) {
          const w = weekdayOf(v.month, v.marks[0]);
          if (right.toLowerCase() !== WEEKDAYS[w].toLowerCase()) bad.push(q);
        }
        if (kind === 'days') {
          const m = /từ ngày (\d+) tháng (\d+) đến hết ngày (\d+)(?: tháng (\d+))?/.exec(q.prompt);
          if (!m) bad.push(q);
          else {
            const [m1, d1, d2] = [Number(m[2]), Number(m[1]), Number(m[3])];
            const m2 = m[4] ? Number(m[4]) : m1;
            if (value(right) !== daysBetween(m1, d1, m2, d2) || d2 > daysIn(m2)) bad.push(q);
          }
        }
        if (kind === 'sum' && v?.notes && value(right) !== sumNotes(v.notes)) bad.push(q);
        if (kind === 'change') {
          const [price, paid] = [...q.prompt.matchAll(/([\d\u202f]+) đồng/g)].map((x) =>
            value(x[1]),
          );
          if (value(right) !== paid - price || price >= paid) bad.push(q);
        }
        if (kind === 'exchange') {
          const [big, small] = [...q.prompt.matchAll(/([\d\u202f]+) đồng/g)].map((x) =>
            value(x[1]),
          );
          if (Number(right) * small !== big) bad.push(q);
        }
        if (kind === 'shop') {
          const [a, b] = [...q.prompt.matchAll(/([\d\u202f]+) đồng/g)].map((x) => value(x[1]));
          if (value(right) !== a + b) bad.push(q);
        }
        if (kind === 'note' && v?.notes && !NOTES.includes(/** @type {any} */ (v.notes[0])))
          bad.push(q);
      }
    }
    expect(bad).toEqual([]);
  });

  it('stay within 100 000 and the clock dial', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const rand = rng(seed);
      for (const kind of /** @type {(keyof typeof LABELS)[]} */ (Object.keys(LABELS))) {
        const q = MAKERS[kind](rand);
        const text = [q.prompt, q.solution, ...q.options.map(optionText)].join(' ');
        const numbers = text.replaceAll(GROUP, '').match(/\d+/g) ?? [];
        if (numbers.some((n) => Number(n) > 100000)) bad.push(q);
        if (/\d+ giờ (?:[6-9]\d|\d{3}) phút/.test(text)) bad.push(q);
      }
    }
    expect(bad).toEqual([]);
  });

  it('builds a round with one question of each kind', () => {
    const round = roundOf(['read', 'note', 'sum'], rng(3));
    expect(round.map((q) => q.kind).sort()).toEqual(['note', 'read', 'sum']);
    expect(labelsOf(['read', 'read', 'sum'])).toEqual({ read: LABELS.read, sum: LABELS.sum });
  });
});
