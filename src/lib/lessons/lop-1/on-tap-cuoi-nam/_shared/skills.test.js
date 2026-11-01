import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { THINGS } from '#lib/core/kid/length.js';
import { readNumber } from '#lib/core/kid/numbers.js';
import { pictures } from '#lib/core/kid/pictures/index.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { FIGURE_NAMES, OBJECTS } from '#lib/core/kid/shapes.js';
import { HUNDRED_SKILLS, bigOptions, noBorrowPair, noCarryAddends } from './hundred-skills.js';
import { MEASURE_SKILLS, SOLIDS, SOLID_OBJECTS, WEEKDAYS, hourChoices } from './measure-skills.js';
import { TEN_SKILLS } from './ten-skills.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<import('./visual.js').Visual>} KidQuestion */

const WORDS = Array.from({ length: 101 }, (_, n) => readNumber(n));

/**
 * Evaluates "a + b", "a − b" or a lone number.
 * @param {string} text
 */
function evaluate(text) {
  const m = text.trim().match(/^(\d+) ([+−]) (\d+)$/);
  if (!m) return Number(text);
  return m[2] === '+' ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3]);
}

/** @param {number} a @param {number} b */
const sign = (a, b) => (a === b ? '=' : a > b ? '>' : '<');

/** @param {string} name */
const title = (name) => name.charAt(0).toUpperCase() + name.slice(1);

/** @param {number} t @param {number} u */
const place = (t, u) => (u === 0 ? `${t} chục` : `${t} chục và ${u} đơn vị`);

/**
 * The missing entry of a row of evenly spaced numbers with one "?".
 * @param {string} prompt
 */
function rowGap(prompt) {
  const items = prompt.split(': ')[1].split(', ');
  const gap = items.indexOf('?');
  const known = items.map((t, i) => [i, Number(t)]).filter(([i]) => i !== gap);
  const [i0, v0] = known[0];
  const [i1, v1] = known[1];
  return String(v0 + ((gap - i0) * (v1 - v0)) / (i1 - i0));
}

/**
 * The right option worked out again from the prompt and the picture alone.
 * @param {string} id
 * @param {KidQuestion} q
 * @returns {string | null}
 */
function recompute(id, q) {
  const p = q.prompt;
  const nums = (p.match(/\d+/g) ?? []).map(Number);
  const v = q.visual;
  switch (id) {
    case 'dem':
      return v?.type === 'groups' ? String(v.groups[0].n) : null;
    case 'so-sanh':
    case 'so-sanh-100':
      return sign(nums[0], nums[1]);
    case 'lon-be':
    case 'lon-be-100': {
      const values = q.options.map((o) => Number(optionText(o)));
      return String(p.includes('lớn nhất') ? Math.max(...values) : Math.min(...values));
    }
    case 'may-va-may':
      return String(nums[0] - nums[1]);
    case 'cong':
    case 'tru':
    case 'cong-100':
    case 'tru-100':
    case 'tron-chuc':
      return String(evaluate(p.replace(/ = \?$/, '')));
    case 'so-thieu': {
      const m = p.match(/(\d+) ([+−]) \? = (\d+)/);
      if (!m) return null;
      return String(m[2] === '+' ? Number(m[3]) - Number(m[1]) : Number(m[1]) - Number(m[3]));
    }
    case 'nhin-hinh': {
      if (v?.type === 'groups') {
        const [a, b] = v.groups.map((g) => g.n);
        return `${a} + ${b} = ${a + b}`;
      }
      if (v?.type === 'takeaway') return `${v.total} − ${v.gone} = ${v.total - v.gone}`;
      return null;
    }
    case 'bai-toan':
    case 'bai-toan-100':
      return String(p.includes('Thêm') ? nums[0] + nums[1] : nums[0] - nums[1]);
    case 'doc-so-100': {
      if (p.startsWith('Số nào')) return String(WORDS.indexOf(p.match(/"(.+)"/)?.[1] ?? ''));
      return WORDS[nums[0]];
    }
    case 'chuc-don-vi': {
      if (v?.type === 'sticks') return String(10 * v.tens + v.ones);
      return place(Math.floor(nums[0] / 10), nums[0] % 10);
    }
    case 'day-so-100':
      return rowGap(p);
    case 'hinh-phang':
      return v?.type === 'figures' ? title(FIGURE_NAMES[v.figures[0]]) : null;
    case 'do-vat': {
      const object = OBJECTS.find((o) => p.startsWith(`${o.part} `));
      return object ? title(FIGURE_NAMES[object.shape]) : null;
    }
    case 'dem-hinh': {
      if (v?.type !== 'figures') return null;
      const kind = Object.entries(FIGURE_NAMES).find(([, name]) => p === `Có mấy ${name}?`)?.[0];
      return String(v.figures.filter((f) => f === kind).length);
    }
    case 'quy-luat': {
      if (v?.type !== 'figures') return null;
      const f = v.figures;
      for (let len = 2; len <= 3; len++) {
        if (f.every((k, i) => k === f[i % len])) return title(FIGURE_NAMES[f[f.length % len]]);
      }
      return null;
    }
    case 'khoi': {
      if (v?.type === 'figures') return title(FIGURE_NAMES[v.figures[0]]);
      const object = SOLID_OBJECTS.find((o) => p.startsWith(`${o.name} `));
      return object ? title(FIGURE_NAMES[object.solid]) : null;
    }
    case 'trai-phai': {
      if (v?.type !== 'row') return null;
      const names = v.pictures.map((x) => pictures[x]);
      if (p === 'Con nào ở giữa?') return title(names[1]);
      const of = names.findIndex((n) => p.endsWith(` ${n}?`));
      return title(names[p.includes('bên trái') ? of - 1 : of + 1]);
    }
    case 'dai-ngan': {
      if (v?.type !== 'strips') return null;
      const sizes = v.strips.map((s) => s.cm);
      const target = p.includes('dài') ? Math.max(...sizes) : Math.min(...sizes);
      const strip = v.strips.find((s) => s.cm === target);
      return THINGS.find((t) => t.id === strip?.thing)?.label ?? null;
    }
    case 'do-cm':
      return v?.type === 'strips' && v.ruler ? `${v.strips[0].cm} cm` : null;
    case 'tinh-cm':
      return `${p.includes('+') ? nums[0] + nums[1] : nums[0] - nums[1]} cm`;
    case 'xem-gio': {
      if (v?.type === 'clock') return `${v.hour} giờ`;
      return String(p.includes('kim dài') ? 12 : nums[0]);
    }
    case 'ngay-trong-tuan': {
      const today = WEEKDAYS.findIndex((d) => p.startsWith(`Hôm nay là ${d}.`));
      const k = p.includes('Ngày mai') ? 1 : 6;
      return title(WEEKDAYS[(today + k) % 7]);
    }
    default:
      return null;
  }
}

/**
 * Whether the hint names the number of a numeric answer that the prompt
 * does not show ("kim dài chỉ số 12" for "kim dài chỉ số mấy?").
 * @param {KidQuestion} q
 * @param {string} right
 */
function leaksNumber(q, right) {
  const n = right.match(/^\d+/)?.[0];
  if (!n) return false;
  /** @param {string} text @returns {string[]} */
  const tokens = (text) => text.match(/\d+/g) ?? [];
  return tokens(q.hint).includes(n) && !tokens(q.prompt).includes(n);
}

const ALL = [...TEN_SKILLS, ...HUNDRED_SKILLS, ...MEASURE_SKILLS];

describe('year-end review question makers', () => {
  it('have distinct ids', () => {
    expect(new Set(ALL.map((s) => s.id)).size).toBe(ALL.length);
  });

  it('store the answer that the prompt and picture give', () => {
    const failures = [];
    for (const skill of ALL) {
      const rand = rng(17);
      for (let i = 0; i < 300; i++) {
        const q = skill.make(rand);
        const texts = q.options.map(optionText);
        const right = texts[q.answer];
        const again = recompute(skill.id, q);
        const ok =
          q.answer >= 0 &&
          q.answer < texts.length &&
          texts.length >= 2 &&
          new Set(texts).size === texts.length &&
          right === again &&
          q.hint.length > 0 &&
          !q.hint.includes(` ${right}.`) &&
          !leaksNumber(q, right) &&
          q.solution.toLowerCase().includes(right.toLowerCase().split(' ')[0]);
        if (!ok) failures.push({ id: skill.id, prompt: q.prompt, options: texts, right, again });
      }
    }
    expect(failures.slice(0, 5)).toEqual([]);
  });

  it('offer at least three options wherever a question has more than two answers', () => {
    const failures = [];
    for (const skill of ALL) {
      if (skill.id === 'khoi' || skill.id === 'dai-ngan') continue;
      const rand = rng(23);
      for (let i = 0; i < 200; i++) {
        const q = skill.make(rand);
        if (q.options.length < 3) failures.push({ id: skill.id, prompt: q.prompt });
      }
    }
    expect(failures.slice(0, 5)).toEqual([]);
  });

  it('keep the numbers of each review within its range', () => {
    /** @type {[typeof ALL, number][]} */
    const scopes = [
      [TEN_SKILLS, 10],
      [HUNDRED_SKILLS, 99],
      [MEASURE_SKILLS, 20],
    ];
    const failures = [];
    for (const [skills, top] of scopes) {
      for (const skill of skills) {
        const rand = rng(3);
        for (let i = 0; i < 200; i++) {
          const q = skill.make(rand);
          const nums = [q.prompt, ...q.options.map(optionText)].join(' ').match(/\d+/g) ?? [];
          if (nums.some((n) => Number(n) > top)) failures.push(q.prompt);
          const v = q.visual;
          if (v?.type === 'groups' && v.groups.some((g) => g.n < 1 || g.n > 10))
            failures.push(q.prompt);
          if (v?.type === 'takeaway' && (v.gone < 1 || v.gone >= v.total || v.total > 10))
            failures.push(q.prompt);
          if (v?.type === 'strips' && v.strips.some((s) => s.cm < 1 || s.cm > 11))
            failures.push(q.prompt);
        }
      }
    }
    expect(failures.slice(0, 5)).toEqual([]);
  });

  it('offers both solids in the same order every time', () => {
    const skill = MEASURE_SKILLS.find((s) => s.id === 'khoi');
    const q = skill?.make(rng(1));
    expect(q?.options).toEqual(SOLIDS.map((k) => title(FIGURE_NAMES[k])));
  });
});

describe('two-digit calculations', () => {
  it('never carry or borrow', () => {
    const rand = rng(11);
    const failures = [];
    for (let i = 0; i < 500; i++) {
      const [a, b] = noCarryAddends(rand);
      if (a < 10 || (a % 10) + (b % 10) > 9 || a + b > 99) failures.push(['+', a, b]);
      const [c, d] = noBorrowPair(rand);
      if (c < 10 || d < 1 || c % 10 < d % 10 || d > c) failures.push(['−', c, d]);
    }
    expect(failures).toEqual([]);
  });

  it('offer the answer among increasing options in range', () => {
    const rand = rng(9);
    const failures = [];
    for (const right of [0, 9, 10, 11, 45, 90, 99]) {
      const { options, answer } = bigOptions(rand, right, 0, 99);
      const values = options.map(Number);
      const sorted = [...values].sort((a, b) => a - b);
      if (values[answer] !== right || values.some((x) => x < 0 || x > 99)) failures.push(right);
      if (values.join() !== sorted.join() || values.length < 3) failures.push(right);
    }
    expect(failures).toEqual([]);
  });
});

describe('clock choices', () => {
  it('hold three different hours with the right one', () => {
    const failures = [];
    for (let h = 1; h <= 12; h++) {
      const c = hourChoices(h);
      if (new Set(c).size !== 3 || !c.includes(h)) failures.push(h);
    }
    expect(failures).toEqual([]);
  });
});
