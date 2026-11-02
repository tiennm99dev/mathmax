import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { resultOf } from '#lib/core/kid/column.js';
import { totalKg } from '#lib/core/kid/mass.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { FIGURE_NAMES } from '#lib/core/kid/shapes.js';
import { daysIn, weekdayOf, WEEKDAYS, dialNumber } from '#lib/core/kid/time.js';
import { BALL_COLORS, WORDS, waysToTake, wordOf } from './chance.js';
import { carryCount } from './columns.js';
import { GENERAL_SKILLS } from './general-skills.js';
import { MEASURE_SKILLS, canChoices, clockWords } from './measure-review-skills.js';
import { SURVEY_SKILLS, boxSentences, makeBox } from './survey-skills.js';
import { tallyBundles, tallyWords } from './survey.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<import('./visual.js').Visual>} Question */

const SEEDS = Array.from({ length: 300 }, (_, i) => i + 1);

/** @param {string} text */
const nums = (text) => (text.match(/\d+/g) ?? []).map(Number);

/** @param {Question} q */
const chosen = (q) => optionText(q.options[q.answer]);

/**
 * The stored answer worked out again from what the child sees; null when the
 * question has no independent check here.
 * @param {string} id
 * @param {Question} q
 * @returns {boolean | null}
 */
function agrees(id, q) {
  const v = q.visual;
  const right = chosen(q);
  const value = nums(right)[0];
  switch (id) {
    case 'tinh-so-do': {
      const m = q.prompt.match(/^(\d+) \S+ ([+−×:]) (\d+)/);
      if (!m) return false;
      const [a, sign, b] = [Number(m[1]), m[2], Number(m[3])];
      const worked = sign === '+' ? a + b : sign === '−' ? a - b : sign === '×' ? a * b : a / b;
      const unit = q.prompt.split(' ')[1];
      return right === `${worked} ${unit}`;
    }
    case 'can-dia': {
      if (v?.type !== 'balance') return false;
      const weights = v.left.filter((l) => l.kind === 'weight');
      return value === totalKg(v.right) - totalKg(weights);
    }
    case 'lay-can': {
      if (v?.type !== 'cans') return false;
      const target = nums(q.prompt)[0];
      return nums(right).reduce((s, n) => s + n, 0) === target;
    }
    case 'doi-don-vi': {
      const m = q.prompt.match(/^(\d+) (\w+) = \? (\w+)$/);
      if (!m) return false;
      /** @type {Record<string, number>} */
      const CM = { cm: 1, dm: 10, m: 100, km: 100000 };
      return Number(right) * CM[m[3]] === Number(m[1]) * CM[m[2]];
    }
    case 'dong-ho':
      return v?.type === 'clock' && right === clockWords(v.minutes);
    case 'gio-chieu': {
      const n = nums(q.prompt)[0];
      if (q.prompt.endsWith('giờ?') && /^\d+ giờ còn/.test(q.prompt)) {
        return value === n - 12 && n >= 13;
      }
      return value === n + 12;
    }
    case 'xem-lich': {
      if (v?.type !== 'month') return false;
      const date = v.marks[0];
      if (date < 1 || date > daysIn(v.month)) return false;
      const wd = weekdayOf(v.month, date);
      if (q.prompt.startsWith('Ngày')) return right.toLowerCase() === WEEKDAYS[wd].toLowerCase();
      if (!q.prompt.includes(WEEKDAYS[wd])) return false;
      const later = q.prompt.includes('tuần sau');
      return (
        value === (later ? date + 7 : date - 7) &&
        weekdayOf(v.month, value) === wd &&
        value >= 1 &&
        value <= daysIn(v.month)
      );
    }
    case 'dung-gio': {
      if (v?.type !== 'clocks') return false;
      const bell = q.prompt.match(/Giờ vào học là (.+?)\. Bạn/)?.[1];
      const at = v.clocks.find((c) => c.name === right)?.minutes ?? -1;
      const bellAt = v.clocks.map((c) => c.minutes).sort((x, y) => x - y)[1];
      if (clockWords(bellAt) !== bell) return false;
      if (q.prompt.endsWith('muộn?')) return at > bellAt;
      if (q.prompt.endsWith('sớm?')) return at < bellAt;
      return at === bellAt;
    }
    case 'dem-hinh': {
      if (v?.type !== 'scatter') return false;
      /** @type {Record<string, string>} */
      const KIND = {
        'hình tròn': 'tron',
        'hình vuông': 'vuong',
        'hình tam giác': 'tam-giac',
      };
      const count = (/** @type {string} */ k) => v.kinds.filter((x) => x === k).length;
      if (q.prompt.startsWith('Có mấy')) {
        const name = q.prompt.replace('Có mấy ', '').replace('?', '');
        return value === count(KIND[name]);
      }
      const counts = Object.values(KIND).map(count);
      const wanted = q.prompt.includes('nhiều') ? Math.max(...counts) : Math.min(...counts);
      return count(KIND[right.toLowerCase()]) === wanted;
    }
    case 'doc-vach': {
      if (v?.type !== 'tally') return false;
      return v.rows.some((r) => r.count === value && q.solution.includes(`Hàng ${r.label}`));
    }
    case 'ghi-vach':
      return right.toLowerCase() === tallyWords(nums(q.prompt)[0]);
    case 'bieu-do': {
      if (v?.type !== 'chart') return false;
      if (q.prompt.startsWith('Có bao nhiêu')) {
        const noun = q.prompt.replace('Có bao nhiêu ', '').replace('?', '').toLowerCase();
        return value === v.rows.find((r) => r.label.toLowerCase() === noun)?.count;
      }
      const counts = v.rows.map((r) => r.count);
      const wanted = q.prompt.includes('nhiều') ? Math.max(...counts) : Math.min(...counts);
      return v.rows[q.answer].count === wanted;
    }
    case 'hon-kem': {
      if (v?.type !== 'chart') return false;
      if (q.prompt.includes('tất cả')) {
        return value === v.rows.reduce((s, r) => s + r.count, 0);
      }
      const rows = v.rows.filter((r) => q.prompt.toLowerCase().includes(r.label.toLowerCase()));
      return rows.length === 2 && value === Math.abs(rows[0].count - rows[1].count);
    }
    case 'nhieu-it': {
      if (v?.type !== 'table') return false;
      const counts = v.rows.map((r) => r[1]);
      const wanted = q.prompt.includes('nhiều') ? Math.max(...counts) : Math.min(...counts);
      return counts[q.answer] === wanted;
    }
    case 'kha-nang-bong': {
      if (v?.type !== 'box') return false;
      const taken = nums(q.prompt)[0] === 1 ? 1 : 2;
      const ways = waysToTake(v.balls, taken);
      const color = /** @type {import('./chance.js').BallColor} */ (
        Object.entries(BALL_COLORS).find(([, c]) => q.prompt.includes(`bóng ${c.name} là`))?.[0]
      );
      const holds = q.prompt.includes('Cả 2')
        ? (/** @type {string[]} */ w) => w.every((b) => b === color)
        : (/** @type {string[]} */ w) => w.includes(color);
      return right === wordOf(ways, holds);
    }
    case 'cau-dung': {
      if (v?.type !== 'box') return false;
      const sentences = boxSentences(v.balls);
      const truths = q.options
        .map(optionText)
        .filter((t) => sentences.find((s) => s.text === t)?.holds);
      return truths.length === 1 && truths[0] === right;
    }
    case 'kha-nang-the': {
      if (v?.type !== 'cards') return false;
      const x = nums(q.prompt).at(-1) ?? 0;
      const bigger = q.prompt.includes('lớn hơn');
      return right === wordOf(v.digits, (d) => (bigger ? d > x : d < x));
    }
    case 'quy-luat': {
      if (v?.type !== 'pattern') return false;
      const last = v.items.length - 1;
      const first = JSON.stringify(v.items[0]);
      const period = v.items.findIndex((it, i) => i > 0 && JSON.stringify(it) === first);
      const expected = v.items[last % period];
      const name = `${FIGURE_NAMES[expected.kind]} ${BALL_COLORS[expected.color].name}`;
      return period > 0 && right.toLowerCase() === name;
    }
    case 'can-nang': {
      if (v?.type !== 'table') return false;
      const found = v.rows.filter((r) => q.prompt.toLowerCase().includes(r[0].toLowerCase()));
      if (found.length !== 2) return false;
      const [x, y] = found.map((r) => r[1]);
      return value === (q.prompt.includes('nặng hơn') ? Math.abs(x - y) : x + y);
    }
    default:
      return null;
  }
}

const LISTS = [MEASURE_SKILLS, SURVEY_SKILLS, GENERAL_SKILLS];

describe('review skills of measures, counting data and the whole year', () => {
  it('builds well-formed questions whose stored answer holds', () => {
    const bad = [];
    for (const skill of new Set(LISTS.flat())) {
      for (const seed of SEEDS) {
        const q = skill.make(rng(seed));
        const options = q.options.map(optionText);
        if (q.answer < 0 || q.answer >= options.length) bad.push(`${skill.id} ${seed}: answer`);
        if (new Set(options).size !== options.length) {
          bad.push(`${skill.id} ${seed}: repeated option ${options.join(' | ')}`);
        }
        if (options.length < 2) bad.push(`${skill.id} ${seed}: too few options`);
        if (!q.hint || !q.solution) bad.push(`${skill.id} ${seed}: no hint or solution`);
        if (/undefined|NaN/.test(`${q.prompt} ${q.solution} ${options.join()}`)) {
          bad.push(`${skill.id} ${seed}: broken text ${q.prompt}`);
        }
        if (agrees(skill.id, q) === false) {
          bad.push(`${skill.id} ${seed}: ${q.prompt} / ${chosen(q)}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('never repeats a skill id within one lesson', () => {
    for (const skills of LISTS) {
      expect(new Set(skills.map((s) => s.id)).size).toBe(skills.length);
    }
  });

  it('asks about every topic of the year in the review of the whole year', () => {
    expect(GENERAL_SKILLS.map((s) => s.id)).toEqual(
      expect.arrayContaining(['doc-viet', 'dat-tinh', 'bang', 'tu-giac', 'dong-ho', 'doc-vach']),
    );
  });

  it('keeps the calculations with units and masses to at most one carry', () => {
    const bad = [];
    const unitCalc = MEASURE_SKILLS.find((s) => s.id === 'tinh-so-do');
    const masses = GENERAL_SKILLS.find((s) => s.id === 'can-nang');
    for (const seed of SEEDS) {
      for (const skill of [unitCalc, masses]) {
        const q = skill?.make(rng(seed));
        for (const [text, a, sign, b] of (q?.solution ?? '').matchAll(
          /(\d+)(?: \S+)? ([+−]) (\d+)/g,
        )) {
          const op = sign === '+' ? '+' : '-';
          if (carryCount(Number(a), Number(b), op) > 1) bad.push(text);
          if (resultOf(Number(a), Number(b), op) < 0) bad.push(text);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('asks only for clock times grade 2 reads', () => {
    const bad = [];
    for (const skill of MEASURE_SKILLS.filter((s) => s.id === 'dong-ho' || s.id === 'dung-gio')) {
      for (const seed of SEEDS) {
        const v = skill.make(rng(seed)).visual;
        const times =
          v?.type === 'clock'
            ? [v.minutes]
            : v?.type === 'clocks'
              ? v.clocks.map((c) => c.minutes)
              : [];
        if (times.some((t) => ![0, 15, 30].includes(t % 60))) bad.push(`${skill.id} ${seed}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('gives one choice of cans for each amount', () => {
    const cansSkill = MEASURE_SKILLS.find((s) => s.id === 'lay-can');
    const bad = [];
    for (const seed of SEEDS) {
      const q = cansSkill?.make(rng(seed));
      if (q?.visual?.type !== 'cans') continue;
      const target = nums(q.prompt)[0];
      const count = q.prompt.includes('hai can') ? 2 : 3;
      const fits = canChoices(q.visual.litres, count).filter(
        (c) => c.reduce((s, n) => s + n, 0) === target,
      );
      if (fits.length !== 1) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('never gives a count away while a question is open', () => {
    const bad = [];
    for (const skill of SURVEY_SKILLS) {
      for (const seed of SEEDS) {
        const q = skill.make(rng(seed));
        if (q.visual?.type === 'tally' && nums(q.prompt).length > 0) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('takes the book’s box the way the book does', () => {
    const box = /** @type {const} */ (['xanh', 'xanh', 'do']);
    const ways = waysToTake(box, 2);
    expect(wordOf(ways, (w) => w.every((b) => b === 'xanh'))).toBe('Có thể');
    expect(wordOf(ways, (w) => w.every((b) => b === 'do'))).toBe('Không thể');
    expect(wordOf(ways, (w) => w.includes('xanh'))).toBe('Chắc chắn');
    expect(WORDS).toHaveLength(3);
  });

  it('builds boxes of at least the asked size', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const box = makeBox(rng(seed), 3);
      if (box.length < 3 || box.length > 7) bad.push(box.join());
    }
    expect(bad).toEqual([]);
  });

  it('bundles tally marks in fives', () => {
    expect(tallyBundles(13)).toEqual([5, 5, 3]);
    expect(tallyWords(13)).toBe('2 bó 5 vạch và 3 vạch');
    expect(tallyWords(10)).toBe('2 bó 5 vạch');
    expect(tallyWords(4)).toBe('4 vạch');
  });

  it('keeps slips and working sensible for a child', () => {
    const bad = [];
    /** @param {string} id */
    const skillOf = (id) => LISTS.flat().find((s) => s.id === id);
    for (const seed of SEEDS) {
      const balance = skillOf('can-dia')?.make(rng(seed));
      if (balance?.options.map(optionText).includes('0 kg')) bad.push(`no weight ${seed}`);

      const hour = skillOf('gio-chieu')?.make(rng(seed));
      for (const t of hour?.options.map(optionText) ?? []) {
        if (/^\d+ giờ \D/.test(t) && nums(t)[0] > 12) bad.push(`dial hour ${t}`);
      }

      const convert = skillOf('doi-don-vi')?.make(rng(seed));
      if (convert) {
        const worked = convert.prompt.replace('?', optionText(convert.options[convert.answer]));
        if (convert.hint.includes(worked)) bad.push(`hint gives away ${worked}`);
      }

      const box = skillOf('kha-nang-bong')?.make(rng(seed));
      if (box?.solution.includes(' 0 ')) bad.push(`no balls ${box.solution}`);

      const more = skillOf('hon-kem')?.make(rng(seed));
      const asked = more?.prompt.match(/^Số (\S+) [^?]+ số (\S+) [^?]+ bao nhiêu (\S+)\?$/);
      if (asked && asked[3] !== 'hình' && (asked[3] !== asked[1] || asked[1] !== asked[2])) {
        bad.push(more?.prompt);
      }

      const cans = skillOf('lay-can')?.make(rng(seed));
      if (cans?.solution.split(' và ').length !== 2) bad.push(`cans ${cans?.solution}`);
    }
    expect(bad).toEqual([]);
  });

  it('names a dial hour with no leading zero', () => {
    expect(clockWords(13 * 60)).toBe(`${dialNumber(13)} giờ`);
    expect(clockWords(7 * 60 + 15)).toBe('7 giờ 15 phút');
  });
});
