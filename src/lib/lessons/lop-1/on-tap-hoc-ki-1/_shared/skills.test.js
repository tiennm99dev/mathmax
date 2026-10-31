import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { pictures } from '#lib/core/kid/pictures/index.js';
import { ARITH_SKILLS } from './arith-skills.js';
import { MORE_FEWER, NUMBER_SKILLS, NUMBER_WORDS } from './number-skills.js';
import { drawFresh, numberOptions, pickSkill, questionKey, skillMap, toReview } from './quiz.js';
import {
  FIGURE_NAMES,
  SHAPE_OBJECTS,
  SHAPE_SKILLS,
  SOLID_OBJECTS,
  SOLIDS,
} from './shape-skills.js';

/** @typedef {import('./quiz.js').KidQuestion} KidQuestion */

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
    case 'doc-so': {
      if (p.startsWith('Số nào')) {
        const word = p.match(/"(.+)"/)?.[1] ?? '';
        return String(NUMBER_WORDS.indexOf(/** @type {never} */ (word)));
      }
      return NUMBER_WORDS[nums[0]];
    }
    case 'nhieu-it': {
      if (v?.type !== 'groups') return null;
      const [a, b] = v.groups.map((g) => g.n);
      return MORE_FEWER[a > b ? 0 : a < b ? 1 : 2];
    }
    case 'so-sanh':
      return sign(nums[0], nums[1]);
    case 'lon-be': {
      const values = q.options.map(Number);
      return String(p.includes('lớn nhất') ? Math.max(...values) : Math.min(...values));
    }
    case 'day-so': {
      const items = p.split(': ')[1].split(', ');
      const gap = items.indexOf('?');
      const known = items.map((t, i) => [i, Number(t)]).filter(([i]) => i !== gap);
      const [i0, v0] = known[0];
      const [i1, v1] = known[1];
      const step = (v1 - v0) / (i1 - i0);
      return String(v0 + (gap - i0) * step);
    }
    case 'may-va-may':
      return String(nums[0] - nums[1]);
    case 'cong':
    case 'tru':
      return String(evaluate(p.replace(/ = \?$/, '')));
    case 'so-thieu': {
      const m = p.match(/(\d+) ([+−]) \? = (\d+)/);
      if (!m) return null;
      return String(m[2] === '+' ? Number(m[3]) - Number(m[1]) : Number(m[1]) - Number(m[3]));
    }
    case 'so-sanh-phep-tinh': {
      const m = p.match(/: (.+) \.\.\. (\d+)$/);
      return m ? sign(evaluate(m[1]), Number(m[2])) : null;
    }
    case 'nhin-hinh': {
      if (v?.type === 'groups') {
        const [a, b] = v.groups.map((g) => g.n);
        return `${a} + ${b} = ${a + b}`;
      }
      if (v?.type === 'takeaway') {
        return `${v.total} − ${v.gone} = ${v.total - v.gone}`;
      }
      return null;
    }
    case 'bai-toan':
      return String(p.includes('Thêm') ? nums[0] + nums[1] : nums[0] - nums[1]);
    case 'ket-qua': {
      const k = nums[0];
      const hits = q.options.filter((o) => evaluate(o) === k);
      return hits.length === 1 ? hits[0] : null;
    }
    case 'hinh-phang':
      return v?.type === 'figures' ? title(FIGURE_NAMES[v.figures[0]]) : null;
    case 'do-vat': {
      const object = SHAPE_OBJECTS.find((o) => p.startsWith(`${o.part} `));
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
      // The shortest group that repeats through the whole row.
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
    case 'tren-duoi': {
      if (v?.type !== 'table') return null;
      const [top, under] = [pictures[v.top], pictures[v.under]];
      if (p.endsWith('ở đâu?')) {
        return p.startsWith(title(top)) ? 'Ở trên cái bàn' : 'Ở dưới cái bàn';
      }
      return title(p.includes('trên') ? top : under);
    }
    default:
      return null;
  }
}

const ALL = [...NUMBER_SKILLS, ...ARITH_SKILLS, ...SHAPE_SKILLS];

describe('review question makers', () => {
  it('have distinct ids', () => {
    expect(new Set(ALL.map((s) => s.id)).size).toBe(ALL.length);
  });

  it('store the answer that the prompt and picture give', () => {
    const failures = [];
    for (const skill of ALL) {
      const rand = rng(17);
      for (let i = 0; i < 300; i++) {
        const q = skill.make(rand);
        const right = q.options[q.answer];
        const again = recompute(skill.id, q);
        const ok =
          q.answer >= 0 &&
          q.answer < q.options.length &&
          q.options.length >= 2 &&
          new Set(q.options).size === q.options.length &&
          right === again &&
          q.hint.length > 0 &&
          !q.hint.includes(` ${right}.`) &&
          q.solution.length > 0;
        if (!ok)
          failures.push({ id: skill.id, prompt: q.prompt, options: q.options, right, again });
      }
    }
    expect(failures.slice(0, 5)).toEqual([]);
  });

  it('keep numbers within 10 and pictures within reach', () => {
    const failures = [];
    for (const skill of ALL) {
      const rand = rng(3);
      for (let i = 0; i < 200; i++) {
        const q = skill.make(rand);
        const nums = [q.prompt, ...q.options].join(' ').match(/\d+/g) ?? [];
        if (nums.some((n) => Number(n) > 10)) failures.push(q.prompt);
        const v = q.visual;
        if (v?.type === 'groups' && v.groups.some((g) => g.n < 1 || g.n > 10))
          failures.push(q.prompt);
        if (v?.type === 'takeaway' && (v.gone < 1 || v.gone >= v.total || v.total > 10)) {
          failures.push(q.prompt);
        }
      }
    }
    expect(failures).toEqual([]);
  });

  it('offers both solids in the same order every time', () => {
    const skill = SHAPE_SKILLS.find((s) => s.id === 'khoi');
    const q = skill?.make(rng(1));
    expect(q?.options).toEqual(SOLIDS.map((k) => title(FIGURE_NAMES[k])));
  });
});

describe('number options', () => {
  it('include the answer, stay in range and go up', () => {
    const rand = rng(9);
    const failures = [];
    for (let right = 0; right <= 10; right++) {
      const { options, answer } = numberOptions(rand, right);
      const values = options.map(Number);
      const sorted = [...values].sort((a, b) => a - b);
      if (
        values[answer] !== right ||
        values.some((x) => x < 0 || x > 10) ||
        values.join() !== sorted.join()
      ) {
        failures.push(right);
      }
    }
    expect(failures).toEqual([]);
  });
});

describe('adaptive choice', () => {
  it('asks every part once before repeating one', () => {
    const rand = rng(5);
    /** @type {import('./quiz.js').Attempt[]} */
    const attempts = [];
    for (let i = 0; i < NUMBER_SKILLS.length; i++) {
      const { skill, reason } = pickSkill(NUMBER_SKILLS, attempts, rand);
      expect(reason).toBe('new');
      attempts.push({ skill: skill.id, ok: true });
    }
    expect(new Set(attempts.map((a) => a.skill)).size).toBe(NUMBER_SKILLS.length);
  });

  it('comes back to a part answered wrong more often', () => {
    const rand = rng(8);
    const [weak, ...rest] = ARITH_SKILLS;
    /** @type {import('./quiz.js').Attempt[]} */
    const base = [{ skill: weak.id, ok: false }, ...rest.map((s) => ({ skill: s.id, ok: true }))];
    let hits = 0;
    for (let i = 0; i < 200; i++) if (pickSkill(ARITH_SKILLS, base, rand).skill === weak) hits++;
    expect(hits).toBeGreaterThan(80);
  });

  it('lists the parts to review and maps their status', () => {
    const attempts = [
      { skill: 'dem', ok: false },
      { skill: 'doc-so', ok: true },
    ];
    expect(toReview(NUMBER_SKILLS, attempts)).toEqual(['Đếm số lượng']);
    const map = skillMap(NUMBER_SKILLS, attempts);
    expect(map.map((s) => s.status).slice(0, 3)).toEqual(['weak', 'good', 'todo']);
  });

  it('draws a question not asked yet', () => {
    const rand = rng(2);
    const skill = NUMBER_SKILLS[0];
    const asked = new Set();
    for (let i = 0; i < 8; i++) {
      const q = drawFresh(skill, asked, rand);
      expect(asked.has(questionKey(q))).toBe(false);
      asked.add(questionKey(q));
    }
  });
});
