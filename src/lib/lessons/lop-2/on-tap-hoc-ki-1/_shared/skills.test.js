import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { FIGURE_NAMES } from '#lib/core/kid/shapes.js';
import { cross } from '#lib/geom-engine/plane.js';
import { fromMinutes } from '#lib/units-engine/clock.js';
import { ARITH_SKILLS, carryWords, makeCarry, towerRows } from './arith-skills.js';
import { WEEKDAYS, handsText } from '#lib/core/kid/time.js';
import { GENERAL_SKILLS } from './general-skills.js';
import { fewestWeights, loadName } from '#lib/core/kid/mass.js';
import { MEASURE_SKILLS } from './measure-skills.js';
import { SHAPE_SKILLS, fourPoints } from './shape-skills.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<import('./visual.js').Visual>} Question */

const ALL = [...ARITH_SKILLS, ...SHAPE_SKILLS, ...MEASURE_SKILLS, ...GENERAL_SKILLS];
const SEEDS = Array.from({ length: 200 }, (_, i) => i + 1);

/** @param {string} text */
const nums = (text) => (text.match(/\d+/g) ?? []).map(Number);

/**
 * "a + b", "a − b" read from a prompt.
 * @param {string} text
 */
function calc(text) {
  const m = text.match(/(\d+)(?: kg| l)? ([+−]) (\d+)/);
  if (!m) throw new Error(`no calculation in ${text}`);
  return m[2] === '+' ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3]);
}

/** @param {Question} q */
const chosen = (q) => optionText(q.options[q.answer]);

/**
 * The answer worked out again from what the child sees, or null when the
 * question has no independent check here.
 * @param {string} id
 * @param {Question} q
 * @returns {boolean | null}
 */
function agrees(id, q) {
  const v = q.visual;
  const right = chosen(q);
  switch (id) {
    case 'nham-20':
    case 'tron-chuc':
      return Number(right) === calc(q.prompt);
    case 'dat-tinh':
      return v?.type === 'column' && Number(right) === (v.op === '+' ? v.a + v.b : v.a - v.b);
    case 'tinh-kg':
      return nums(right)[0] === calc(q.prompt);
    case 'so-sanh-20': {
      const [left, other] = q.prompt.split(': ')[1].split(' ... ');
      const [x, y] = [calc(left), calc(other)];
      return right === (x > y ? '>' : x < y ? '<' : '=');
    }
    case 'hai-tui': {
      const [x, y] = nums(q.prompt);
      const [p, q2] = nums(right);
      const wrong = q.options
        .filter((_, i) => i !== q.answer)
        .every((o) => {
          const [u, w] = nums(optionText(o));
          return u + w !== x + y;
        });
      return p + q2 === x + y && wrong;
    }
    case 'mui-ten': {
      if (v?.type !== 'chain') return false;
      const end = v.steps.reduce((s, c) => (c.op === '+' ? s + c.n : s - c.n), v.start);
      return Number(right) === end;
    }
    case 'thap-so':
      return v?.type === 'tower' && Number(right) === v.base[0] + 2 * v.base[1] + v.base[2];
    case 'doan-thang':
      return v?.type === 'figure' && Number(right) === v.figure.segments?.length;
    case 'mot-phan-doan': {
      const [whole, part] = nums(q.prompt);
      return nums(right)[0] === whole - part;
    }
    case 'tu-giac': {
      if (v?.type !== 'figure') return false;
      const sides = (v.figure.shapes ?? []).map((s) => s.length);
      if (q.prompt.includes('mấy')) return Number(right) === sides.filter((s) => s === 4).length;
      return sides[q.answer] === 4 && sides.filter((s) => s === 4).length === 1;
    }
    case 'thang-hang': {
      if (v?.type !== 'figure') return false;
      const dots = v.figure.dots ?? [];
      /** @param {string} name */
      const at = (name) => dots.find((d) => d.name === name) ?? { x: 0, y: 0 };
      const straight = q.options.map((o) => {
        const [a, b, c] = optionText(o).split(', ').map(at);
        return cross(a, b, c) === 0;
      });
      return straight[q.answer] && straight.filter(Boolean).length === 1;
    }
    case 'quy-luat': {
      if (v?.type !== 'pattern') return false;
      const f = v.figures;
      const period = [1, 2, 3, 4].find((p) => f.every((k, i) => i < p || k === f[i - p])) ?? 0;
      return right.toLowerCase() === FIGURE_NAMES[f[f.length - period]];
    }
    case 'do-doan': {
      if (v?.type === 'ruler') return nums(right)[0] === v.to - v.from;
      const lengths = nums(q.prompt);
      const names = ['AB', 'CD', 'MN', 'PQ'];
      if (q.prompt.includes('dài nhất')) return lengths[q.answer] === Math.max(...lengths);
      if (q.prompt.includes('ngắn nhất')) return lengths[q.answer] === Math.min(...lengths);
      const [x, y] = right.split(' và ').map((n) => lengths[names.indexOf(n)]);
      return x === y && new Set(lengths).size === 3;
    }
    case 'gap-khuc': {
      if (v?.type === 'figure') {
        const sum = (v.figure.texts ?? []).reduce((s, t) => s + nums(t.text)[0], 0);
        return nums(right)[0] === sum;
      }
      const [a, b, c, d, e] = nums(q.prompt.replace('ABC', '').replace('MNPQ', ''));
      const shorter = q.prompt.includes('ngắn hơn');
      const firstWins = shorter ? a + b < c + d + e : a + b > c + d + e;
      return a + b !== c + d + e && right === (firstWins ? 'Đường ABC' : 'Đường MNPQ');
    }
    case 'dem-hinh': {
      if (v?.type !== 'figure') return false;
      if (q.prompt.startsWith('Cần')) {
        const [rows, cols] = nums(v.figure.say);
        return Number(right) === rows * cols;
      }
      const lines = (v.figure.strokes ?? []).length;
      const corners = (v.figure.shapes ?? [[]])[0].length;
      const asksTriangles = q.prompt.includes('tam giác');
      const diagonal = v.figure.say.includes('đường chéo');
      if (diagonal) return Number(right) === (asksTriangles ? 2 : 1);
      // A shape cut into n pieces side by side holds n + (n - 1) + ... + 1 of its own kind.
      const n = lines + 1;
      const own = asksTriangles ? corners === 3 : corners === 4;
      return own && Number(right) === (n * (n + 1)) / 2;
    }
    case 'nang-nhe': {
      if (v?.type !== 'scales') return false;
      const things = v.scales.flatMap((sc) => [...sc.left, ...sc.right]);
      const mass = new Map(things.map((t) => [t.kind === 'thing' ? loadName(t) : '', t.kg]));
      /** @param {string} text */
      const massOf = (text) => mass.get(text.toLowerCase()) ?? -1;
      const all = [...mass.values()];
      if (q.prompt.endsWith('nặng nhất?')) return massOf(right) === Math.max(...all);
      if (q.prompt.endsWith('nhẹ nhất?')) return massOf(right) === Math.min(...all);
      if (q.prompt.endsWith('nặng hơn?')) return massOf(right) === Math.max(...all);
      if (q.prompt.endsWith('nhẹ hơn?')) return massOf(right) === Math.min(...all);
      const m = q.prompt.match(/\. (.+) (nặng|nhẹ) hơn (.+)\. Đúng/);
      if (!m) return false;
      const [x, y] = [massOf(m[1]), massOf(m[3])];
      const holds = m[2] === 'nặng' ? x > y : x < y;
      return right === (holds ? 'Đúng' : 'Sai');
    }
    case 'tinh-lit': {
      const terms = q.prompt.match(/(\d+) l (?:([+−]) (\d+) l )?(?:([+−]) (\d+) l )?=/);
      if (!terms) return false;
      let sum = Number(terms[1]);
      for (const i of [2, 4]) {
        if (terms[i]) sum += terms[i] === '+' ? Number(terms[i + 1]) : -Number(terms[i + 1]);
      }
      return nums(right)[0] === sum;
    }
    case 'dong-ho': {
      if (v?.type === 'clock') {
        const { hours, minutes } = fromMinutes(v.minutes);
        const wanted = q.prompt.startsWith('Buổi chiều') ? hours : hours % 12 || 12;
        return right === (minutes ? `${wanted} giờ ${minutes} phút` : `${wanted} giờ`);
      }
      const [hour] = nums(q.prompt);
      const part = hour <= 18 ? 'chiều' : hour <= 21 ? 'tối' : 'đêm';
      return right === `${hour - 12} giờ ${part}`;
    }
    case 'bai-toan':
    case 'bai-toan-do':
    case 'bai-toan-chung': {
      const n = nums(q.prompt.replace(/2A|2B/g, ''));
      if (q.prompt.includes('mỗi ca')) {
        return nums(right)[0] === n[0] - 2 * n[1];
      }
      const minus = /ít hơn|cưa đi|đã dùng/.test(q.prompt);
      return nums(right)[0] === (minus ? n[0] - n[1] : n[0] + n[1]);
    }
    case 'cho-thuyen': {
      const [p, r2, s, most] = nums(q.prompt);
      const [u, w] = nums(right);
      return (
        u + w <= most &&
        [p + r2, p + s, r2 + s].filter((sum) => sum <= most).length === 1 &&
        [p, r2, s].includes(u) &&
        [p, r2, s].includes(w)
      );
    }
    case 'doc-can': {
      if (v?.type !== 'scales') return false;
      const { left, right: pan } = v.scales[0];
      const sum = pan.reduce((s, l) => s + l.kg, 0);
      return sum === left[0].kg && nums(right)[0] === sum;
    }
    case 'doc-lit': {
      if (v?.type !== 'cups') return false;
      return nums(right)[0] === v.groups.reduce((s, g) => s + g.n, 0);
    }
    case 'ba-can': {
      const [tank] = nums(q.prompt);
      const sums = q.options.map((o) => nums(optionText(o)).reduce((s, n) => s + n, 0));
      return sums[q.answer] === tank && sums.filter((s) => s === tank).length === 1;
    }
    case 'tia-so':
      return v?.type === 'number-line' && Number(right) === v.min + v.blank * v.step;
    case 'thu-ngay': {
      const [date, , later] = nums(q.prompt);
      const today = WEEKDAYS.findIndex((d) => q.prompt.includes(`là ${d}.`));
      return right.toLowerCase() === WEEKDAYS[(today + later - date) % 7].toLowerCase();
    }
    default:
      return null;
  }
}

describe('review skills of the term', () => {
  it('builds well-formed questions whose stored answer holds', () => {
    const bad = [];
    for (const skill of ALL) {
      for (const seed of SEEDS) {
        const q = skill.make(rng(seed));
        const texts = q.options.map(optionText);
        if (q.answer < 0 || q.answer >= texts.length) bad.push(`${skill.id} ${seed}: answer index`);
        if (new Set(texts).size !== texts.length) bad.push(`${skill.id} ${seed}: repeated option`);
        if (texts.length < 2) bad.push(`${skill.id} ${seed}: too few options`);
        if (!q.hint || !q.solution) bad.push(`${skill.id} ${seed}: no hint or solution`);
        if (/undefined|NaN/.test(`${q.prompt} ${q.solution} ${texts.join()}`)) {
          bad.push(`${skill.id} ${seed}: broken text ${q.prompt}`);
        }
        if (agrees(skill.id, q) === false)
          bad.push(`${skill.id} ${seed}: ${q.prompt} / ${chosen(q)}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('offers three bag pairs of which only the right one balances, never the same bags', () => {
    const skill = ARITH_SKILLS.find((s) => s.id === 'hai-tui');
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill?.make(rng(seed));
      if (!q) continue;
      const [x, y] = nums(q.prompt);
      const [p, r] = nums(chosen(q));
      if (q.options.length !== 3 || p === r || [x, y].includes(p) || [x, y].includes(r)) {
        bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('never calls a square of tiles a rectangle', () => {
    const skill = SHAPE_SKILLS.find((s) => s.id === 'dem-hinh');
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill?.make(rng(seed));
      if (q?.visual?.type !== 'figure' || !q.prompt.startsWith('Cần')) continue;
      const [rows, cols] = nums(q.visual.figure.say);
      if (rows === cols) bad.push(q.visual.figure.say);
    }
    expect(bad).toEqual([]);
  });

  it('never repeats a skill id within one lesson', () => {
    for (const skills of [ARITH_SKILLS, SHAPE_SKILLS, MEASURE_SKILLS, GENERAL_SKILLS]) {
      expect(new Set(skills.map((s) => s.id)).size).toBe(skills.length);
    }
  });

  it('keeps every carrying calculation a real carry within 100', () => {
    const bad = [];
    for (const kind of /** @type {const} */ (['add-one', 'add-two', 'sub-one', 'sub-two'])) {
      for (const seed of SEEDS) {
        const { a, b, op } = makeCarry(rng(seed), kind);
        const r = op === '+' ? a + b : a - b;
        const carries = op === '+' ? (a % 10) + (b % 10) >= 10 : a % 10 < b % 10;
        if (!carries || r < 1 || r > 99) bad.push(`${a} ${op} ${b}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('reads carrying calculations the way the book does', () => {
    expect(carryWords(35, 7, '+')).toBe(
      '5 cộng 7 bằng 12, viết 2, nhớ 1. 3 thêm 1 bằng 4, viết 4. Vậy 35 + 7 = 42.',
    );
    expect(carryWords(5, 48, '+')).toBe(
      '5 cộng 8 bằng 13, viết 3, nhớ 1. 4 thêm 1 bằng 5, viết 5. Vậy 5 + 48 = 53.',
    );
    expect(carryWords(62, 37, '-')).toBe(
      '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2. Vậy 62 − 37 = 25.',
    );
    expect(carryWords(91, 85, '-')).toBe(
      '1 không trừ được 5, lấy 11 trừ 5 bằng 6, viết 6, nhớ 1. 8 thêm 1 bằng 9, 9 trừ 9 bằng 0. Vậy 91 − 85 = 6.',
    );
    expect(carryWords(42, 7, '-')).toBe(
      '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 4 trừ 1 bằng 3, viết 3. Vậy 42 − 7 = 35.',
    );
  });

  it('builds number towers from the bottom row up', () => {
    expect(towerRows([3, 4, 4])).toEqual([[3, 4, 4], [7, 8], [15]]);
  });

  it('finds the fewest weights', () => {
    expect(fewestWeights(7)).toEqual([5, 2]);
    expect(fewestWeights(9)).toEqual([5, 2, 2]);
    expect(fewestWeights(10)).toEqual([5, 5]);
  });

  it('places exactly three of four points on a line', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const [a, b, c, off] = fourPoints(rng(seed));
      if (cross(a, b, c) !== 0 || cross(a, c, off) === 0) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('says where the hands point without naming the time', () => {
    expect(handsText(15 * 60 + 30)).toBe('kim ngắn ở giữa số 3 và số 4, kim dài chỉ số 6');
    expect(handsText(12 * 60)).toBe('kim ngắn chỉ số 12, kim dài chỉ số 12');
  });
});
