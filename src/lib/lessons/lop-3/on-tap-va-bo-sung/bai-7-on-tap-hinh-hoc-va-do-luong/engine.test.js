import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { dayAfter, WEEKDAYS } from '#lib/core/kid/time.js';
import { cross } from '#lib/geom-engine/plane.js';
import { COLLINEAR, NOT_COLLINEAR, POINTS, SKILLS, SOLID_NAMES, stripCount } from './engine.js';

/** @param {string} id */
const skill = (id) => {
  const found = SKILLS.find((s) => s.id === id);
  if (!found) throw new Error(`no skill ${id}`);
  return found;
};

/** @param {string} text */
function onOneLine(text) {
  const [a, b, c] = text
    .split(', ')
    .map((name) => POINTS[/** @type {keyof typeof POINTS} */ (name)]);
  return Math.abs(cross(a, b, c)) < 5;
}

/**
 * The number of an option, without its unit.
 * @param {import('#lib/core/kid/quiz.js').KidQuestion<any>} q
 */
function chosen(q) {
  return parseInt(optionText(q.options[q.answer]).replace(/\s/g, ''), 10);
}

describe('the review questions', () => {
  it('always has the right option among three or more distinct ones', () => {
    const bad = [];
    for (const s of SKILLS) {
      for (let seed = 1; seed <= 60; seed++) {
        const q = s.make(rng(seed));
        const texts = q.options.map(optionText);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([s.id, seed, 'index']);
        if (new Set(texts).size !== texts.length) bad.push([s.id, seed, texts]);
        if (texts.length < 3) bad.push([s.id, seed, texts]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('adds up a broken line', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = skill('gap-khuc').make(rng(seed));
      if (q.visual?.type !== 'broken') throw new Error('no drawing');
      const sum = q.visual.lengths.reduce((s, n) => s + n, 0);
      if (chosen(q) !== sum || sum >= 1000) bad.push([seed, sum, q.options[q.answer]]);
    }
    expect(bad).toEqual([]);
  });

  it('counts quadrilaterals', () => {
    expect([2, 3, 4].map(stripCount)).toEqual([3, 6, 10]);
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = skill('tu-giac').make(rng(seed));
      const v = q.visual;
      if (v?.type === 'strip' && chosen(q) !== stripCount(v.cells)) bad.push(seed);
      if (v?.type === 'shapes') {
        const quads = v.shapes.filter((s) => s.kind === 'vuong' || s.kind === 'chu-nhat').length;
        if (chosen(q) !== quads) bad.push(seed);
      }
    }
    expect(bad).toEqual([]);
  });

  it('names only collinear points as right', () => {
    expect(COLLINEAR.filter((t) => !onOneLine(t))).toEqual([]);
    expect(NOT_COLLINEAR.filter(onOneLine)).toEqual([]);
    for (let seed = 1; seed <= 20; seed++) {
      const q = skill('thang-hang').make(rng(seed));
      expect(onOneLine(optionText(q.options[q.answer]))).toBe(true);
    }
  });

  it('continues a row of solids', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const q = skill('khoi-hinh').make(rng(seed));
      if (q.visual?.type !== 'pattern') continue;
      const { row, next } = q.visual;
      const whole = [...row, next];
      const period = [2, 3].find((p) => whole.every((k, i) => i < p || k === whole[i - p]));
      if (!period) bad.push(whole);
      if (optionText(q.options[q.answer]).toLowerCase() !== SOLID_NAMES[next]) bad.push(whole);
    }
    expect(bad).toEqual([]);
  });

  it('reads a balance by its weights', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = skill('khoi-luong').make(rng(seed));
      if (q.visual?.type !== 'balance') continue;
      const kg = q.visual.right.reduce((s, l) => s + l.kg, 0);
      if (kg !== q.visual.left[0].kg || chosen(q) !== kg) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('finds the weekday by counting days on', () => {
    const q = skill('xem-lich').make(rng(5));
    const [date, month, later] = (q.prompt.match(/\d+/g) ?? []).map(Number);
    expect(month).toBeLessThanOrEqual(12);
    const day = WEEKDAYS.findIndex((d) => q.prompt.includes(`là ${d}.`));
    expect(optionText(q.options[q.answer]).toLowerCase()).toBe(
      WEEKDAYS[dayAfter(day, later - date)].toLowerCase(),
    );
  });

  it('turns an afternoon time into hours of the whole day', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = skill('dong-ho').make(rng(seed));
      if (q.visual?.type !== 'clock') continue;
      const m = q.visual.minutes;
      const right = optionText(q.options[q.answer]);
      if (parseInt(right, 10) !== Math.floor(m / 60)) bad.push([m, right]);
    }
    expect(bad).toEqual([]);
  });

  it('solves the word problems', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = skill('bai-toan').make(rng(seed));
      const line = q.solution.match(/(\d+) ([×:]) (\d+) = (\d+)/);
      if (!line) {
        bad.push(q.solution);
        continue;
      }
      const [, a, sign, b, r] = line;
      const value = sign === '×' ? Number(a) * Number(b) : Number(a) / Number(b);
      if (value !== Number(r) || chosen(q) !== value) bad.push(q.solution);
    }
    expect(bad).toEqual([]);
  });
});
