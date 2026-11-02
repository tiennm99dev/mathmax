import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { cross } from '#lib/geom-engine/plane.js';
import { ADD_SUB_100_SKILLS, ADD_SUB_1000_SKILLS, draw100, draw1000 } from './add-sub-skills.js';
import { carryCount, columnWords, forgotCarry } from './columns.js';
import { GEOMETRY_SKILLS, fourPoints } from './geometry-skills.js';
import { MUL_DIV_SKILLS } from './mul-div-skills.js';
import { NUMBER_SKILLS, cardNumbers } from './number-skills.js';
import { compareWhy, readTo1000, sumParts } from './place.js';
import { SOLID_NAMES, THINGS } from './solids.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<import('./visual.js').Visual>} Question */

const SEEDS = Array.from({ length: 200 }, (_, i) => i + 1);

/** @param {string} text */
const nums = (text) => (text.match(/\d+/g) ?? []).map(Number);

/**
 * The value of a calculation written out, worked from left to right.
 * @param {string} text
 */
function evaluate(text) {
  const tokens = text.trim().split(/\s+/);
  let v = Number(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const n = Number(tokens[i + 1]);
    if (tokens[i] === '+') v += n;
    else if (tokens[i] === '−') v -= n;
    else if (tokens[i] === '×') v *= n;
    else if (tokens[i] === ':') v /= n;
    else throw new Error(`no sign in ${text}`);
  }
  return v;
}

/** @param {Question} q */
const chosen = (q) => optionText(q.options[q.answer]);

/** @param {Question} q */
const texts = (q) => q.options.map(optionText);

/**
 * The sign that holds between two values.
 * @param {number} x
 * @param {number} y
 */
const signOf = (x, y) => (x > y ? '>' : x < y ? '<' : '=');

/**
 * The options that hold when put in place of the "?" of a statement.
 * @param {Question} q
 * @param {string} statement
 */
function digitsThatHold(q, statement) {
  return texts(q).filter((digit) => {
    const filled = statement.replace('?', digit);
    if (filled.includes('=')) {
      const [left, right] = filled.split(' = ');
      return evaluate(left) === Number(right);
    }
    const m = filled.match(/(\d+) ([<>]) (\d+)/);
    if (!m) throw new Error(`cannot read ${statement}`);
    return signOf(Number(m[1]), Number(m[3])) === m[2];
  });
}

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
    case 'day-so':
      return (
        v?.type === 'sequence' && Number(right) === v.items[0] + v.blank * (v.items[1] - v.items[0])
      );
    case 'so-sanh': {
      const m = q.prompt.match(/(\d+) \.\.\. (\d+)/);
      return Boolean(m) && right === signOf(Number(m?.[1]), Number(m?.[2]));
    }
    case 'lon-be': {
      if (q.prompt.startsWith('Dãy')) {
        const list = nums(right);
        return list.every((n, i) => i === 0 || list[i - 1] < n);
      }
      const list = nums(q.prompt);
      const wanted = q.prompt.includes('lớn nhất') ? Math.max(...list) : Math.min(...list);
      return Number(right) === wanted;
    }
    case 'chu-so': {
      const statement = q.prompt.split('dấu hỏi? ')[1];
      const held = digitsThatHold(q, statement);
      return held.length === 1 && held[0] === right;
    }
    case 'tim-chu-so': {
      const statement = q.prompt.split('dấu hỏi? ')[1];
      const held = digitsThatHold(q, statement);
      return held.length === 1 && held[0] === right;
    }
    case 'tach-so': {
      if (q.prompt.endsWith('= ?')) return Number(right) === evaluate(q.prompt.split(' = ')[0]);
      const n = nums(q.prompt)[0];
      const wrong = texts(q).filter((t) => t !== right);
      return evaluate(right) === n && wrong.every((t) => evaluate(t) !== n);
    }
    case 'the-so': {
      if (v?.type !== 'cards') return false;
      const all = cardNumbers(v.digits);
      const wanted = q.prompt.includes('lớn nhất') ? Math.max(...all) : Math.min(...all);
      return Number(right) === wanted && all.every((n) => n >= 100);
    }
    case 'khoi':
      if (v?.type === 'blocks') {
        return Number(right) === v.hundreds * 100 + v.tens * 10 + v.ones;
      }
      if (v?.type === 'solids') {
        const kind = v.kinds[q.answer];
        return q.prompt.includes(SOLID_NAMES[kind]);
      }
      return (
        right.toLowerCase() ===
        SOLID_NAMES[THINGS.find((t) => q.prompt.startsWith(t.name))?.kind ?? 'tru']
      );
    case 'bang-so': {
      if (v?.type !== 'table') return false;
      const counts = v.rows.map((r) => r[1]);
      const wanted = q.prompt.includes('nhiều') ? Math.max(...counts) : Math.min(...counts);
      return counts[q.answer] === wanted;
    }
    case 'nham-chuc':
    case 'nham-tram':
    case 'hai-dau':
    case 'bang':
      return Number(right) === evaluate(q.prompt.split(' = ')[0]);
    case 'dat-tinh':
      return v?.type === 'column' && Number(right) === (v.op === '+' ? v.a + v.b : v.a - v.b);
    case 'dung-sai': {
      if (v?.type !== 'column') return false;
      const r = v.op === '+' ? v.a + v.b : v.a - v.b;
      return right === (v.shown === r ? 'Đúng' : 'Sai');
    }
    case 'gioi-han': {
      const limit = nums(q.prompt)[0];
      const below = q.prompt.includes('bé hơn');
      const fits = texts(q).filter((t) => (below ? evaluate(t) < limit : evaluate(t) > limit));
      return fits.length === 1 && fits[0] === right;
    }
    case 'lon-be-nhat': {
      const values = texts(q).map(evaluate);
      const wanted = q.prompt.includes('lớn nhất') ? Math.max(...values) : Math.min(...values);
      return evaluate(right) === wanted && new Set(values).size === values.length;
    }
    case 'mui-ten': {
      if (v?.type !== 'chain') return false;
      const line = [v.start, ...v.steps.flatMap((s) => [s.sign, s.n])].join(' ');
      return Number(right) === evaluate(line);
    }
    case 'so-sanh-tinh': {
      const [left, other] = q.prompt.split(': ')[1].split(' ... ');
      return right === signOf(evaluate(left), evaluate(other));
    }
    case 'bai-toan':
      return storyAgrees(q);
    case 'nhom-hinh': {
      if (v?.type !== 'groups') return false;
      return right.startsWith(`${v.each} × ${v.groups} =`) && nums(right)[2] === v.each * v.groups;
    }
    case 'tong': {
      if (q.prompt.includes('thành tổng')) {
        const product = q.prompt.split(' viết')[0];
        const n = nums(product);
        const parts = right.split(' + ').map(Number);
        return parts.length === n[1] && parts.every((p) => p === n[0]);
      }
      const parts = q.prompt.split(' viết')[0].split(' + ').map(Number);
      return right === `${parts[0]} × ${parts.length}`;
    }
    case 'nhan-sang-chia': {
      const m = q.prompt.match(/= (\d+), em có (\d+) : (\d+)/);
      return Boolean(m) && Number(right) === Number(m?.[2]) / Number(m?.[3]);
    }
    case 'ten-goi': {
      const m = q.prompt.match(/(\d+) ([×:]) (\d+) = (\d+), số (\d+)/);
      if (!m) return false;
      const [a, sign, b, c, asked] = [m[1], m[2], m[3], m[4], m[5]];
      if (sign === '×') return right === (asked === c ? 'Tích' : 'Thừa số');
      return (
        right === (asked === a ? 'Số bị chia' : asked === b ? 'Số chia' : 'Thương') &&
        new Set([a, b, c]).size === 3
      );
    }
    case 'cung-ket-qua': {
      const value = 2 * nums(q.prompt)[1];
      const hits = texts(q).filter((t) => evaluate(t) === value);
      return hits.length === 1 && hits[0] === right;
    }
    case 'dem-duong':
      if (v?.type !== 'figure') return false;
      if (q.prompt.includes('đường cong')) return Number(right) === v.figure.curves?.length;
      return Number(right) === v.figure.segments?.length;
    case 'tu-giac': {
      if (v?.type !== 'figure') return false;
      const sides = (v.figure.shapes ?? []).map((s) => s.length);
      if (q.prompt.startsWith('Hình nào')) {
        return sides[q.answer] === 4 && sides.filter((s) => s === 4).length === 1;
      }
      if (q.prompt.includes('tất cả')) {
        const n = (v.figure.strokes ?? []).length + 1;
        return Number(right) === (n * (n + 1)) / 2;
      }
      return Number(right) === sides.filter((s) => s === 4).length;
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
    case 'do-doan':
      return v?.type === 'ruler' && nums(right)[0] === v.to - v.from;
    case 'doan-ghep': {
      const [x, y] = nums(q.prompt);
      return nums(right)[0] === (q.prompt.includes('Đoạn thẳng BC dài bao') ? x - y : x + y);
    }
    case 'gap-khuc': {
      if (v?.type !== 'figure') return false;
      const sum = (v.figure.texts ?? []).reduce((s, t) => s + nums(t.text)[0], 0);
      return nums(right)[0] === sum;
    }
    case 'hai-duong': {
      if (v?.type !== 'figure') return false;
      const [a, b, c, d] = (v.figure.texts ?? []).map((t) => nums(t.text)[0]);
      const shorter = q.prompt.includes('ngắn hơn');
      const manWins = shorter ? a + b < c + d : a + b > c + d;
      return a + b !== c + d && right === (manWins ? 'Đường MAN' : 'Đường MBN');
    }
    default:
      return null;
  }
}

/**
 * A word problem's answer from its two numbers and its wording.
 * @param {Question} q
 */
function storyAgrees(q) {
  const [x, y] = nums(q.prompt);
  const got = nums(chosen(q))[0];
  if (/chia đều|cắt thành|mỗi nhóm/.test(q.prompt)) return got === x / y;
  if (/Mỗi (chùm|lượt)/.test(q.prompt)) return got === x * y;
  if (/ít hơn|dài hơn quãng|cao hơn em/.test(q.prompt)) return got === x - y;
  return got === x + y;
}

const ALL = [
  ...NUMBER_SKILLS,
  ...ADD_SUB_100_SKILLS,
  ...ADD_SUB_1000_SKILLS,
  ...MUL_DIV_SKILLS,
  ...GEOMETRY_SKILLS,
];

describe('review skills of the year', () => {
  it('builds well-formed questions whose stored answer holds', () => {
    const bad = [];
    for (const skill of ALL) {
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
    for (const skills of [
      NUMBER_SKILLS,
      ADD_SUB_100_SKILLS,
      ADD_SUB_1000_SKILLS,
      MUL_DIV_SKILLS,
      GEOMETRY_SKILLS,
    ]) {
      expect(new Set(skills.map((s) => s.id)).size).toBe(skills.length);
    }
  });

  it('keeps calculations in range with at most one carry', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const rand = rng(seed);
      for (const [draw, hi] of /** @type {const} */ ([
        [draw100, 99],
        [draw1000, 999],
      ])) {
        const { a, b, op } = draw(rand);
        const r = op === '+' ? a + b : a - b;
        if (r < 1 || r > hi || carryCount(a, b, op) > 1) bad.push(`${a} ${op} ${b}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('never asks a table question outside the tables of 2 and 5', () => {
    const skill = MUL_DIV_SKILLS.find((s) => s.id === 'bang');
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill?.make(rng(seed));
      if (!q) continue;
      const [x, y] = nums(q.prompt);
      const table = q.prompt.includes('×') ? x : y;
      if (table !== 2 && table !== 5) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('places exactly three of four points on a line', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const [a, b, c, off] = fourPoints(rng(seed));
      if (cross(a, b, c) !== 0 || cross(a, c, off) === 0) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });
});

describe('numbers to 1000', () => {
  it('reads numbers the way the book does', () => {
    expect(readTo1000(405)).toBe('bốn trăm linh năm');
    expect(readTo1000(415)).toBe('bốn trăm mười lăm');
    expect(readTo1000(450)).toBe('bốn trăm năm mươi');
    expect(readTo1000(451)).toBe('bốn trăm năm mươi mốt');
    expect(readTo1000(700)).toBe('bảy trăm');
    expect(readTo1000(1000)).toBe('một nghìn');
  });

  it('writes a number as a sum of its places', () => {
    expect(sumParts(525)).toEqual([500, 20, 5]);
    expect(sumParts(106)).toEqual([100, 6]);
    expect(sumParts(810)).toEqual([800, 10]);
  });

  it('explains a comparison place by place', () => {
    expect(compareWhy(438, 483)).toBe('Hàng trăm bằng nhau. 3 chục bé hơn 8 chục. Vậy 438 < 483.');
    expect(compareWhy(178, 99)).toBe('178 có ba chữ số, 99 có hai chữ số. Vậy 178 > 99.');
    expect(compareWhy(308, 300)).toBe(
      'Hàng trăm, chục bằng nhau. 8 đơn vị lớn hơn 0 đơn vị. Vậy 308 > 300.',
    );
  });

  it('never starts a card number with zero', () => {
    expect(cardNumbers([4, 5, 0]).sort((x, y) => x - y)).toEqual([405, 450, 504, 540]);
  });
});

describe('column readings', () => {
  it('reads each column the way the book does', () => {
    expect(columnWords(236, 528, '+')).toBe(
      '6 cộng 8 bằng 14, viết 4, nhớ 1. 3 cộng 2 bằng 5, thêm 1 bằng 6, viết 6. 2 cộng 5 bằng 7, viết 7. Vậy 236 + 528 = 764.',
    );
    expect(columnWords(354, 63, '+')).toBe(
      '4 cộng 3 bằng 7, viết 7. 5 cộng 6 bằng 11, viết 1, nhớ 1. 3 thêm 1 bằng 4, viết 4. Vậy 354 + 63 = 417.',
    );
    expect(columnWords(67, 829, '+')).toBe(
      '7 cộng 9 bằng 16, viết 6, nhớ 1. 6 cộng 2 bằng 8, thêm 1 bằng 9, viết 9. Hạ 8, viết 8. Vậy 67 + 829 = 896.',
    );
    expect(columnWords(880, 54, '-')).toBe(
      '0 không trừ được 4, lấy 10 trừ 4 bằng 6, viết 6, nhớ 1. 5 thêm 1 bằng 6, 8 trừ 6 bằng 2, viết 2. Hạ 8, viết 8. Vậy 880 − 54 = 826.',
    );
    expect(columnWords(42, 38, '-')).toBe(
      '2 không trừ được 8, lấy 12 trừ 8 bằng 4, viết 4, nhớ 1. 3 thêm 1 bằng 4, 4 trừ 4 bằng 0. Vậy 42 − 38 = 4.',
    );
    expect(columnWords(5, 48, '+')).toBe(
      '5 cộng 8 bằng 13, viết 3, nhớ 1. 4 thêm 1 bằng 5, viết 5. Vậy 5 + 48 = 53.',
    );
  });

  it('finds the result of a forgotten carry', () => {
    expect(forgotCarry(46, 39, '+')).toBe(75);
    expect(forgotCarry(354, 63, '+')).toBe(317);
    expect(forgotCarry(83, 19, '-')).toBe(74);
    expect(forgotCarry(435, 382, '+')).toBe(717);
    expect(forgotCarry(435, 142, '-')).toBe(393);
    expect(forgotCarry(435, 112, '-')).toBeNull();
  });
});
