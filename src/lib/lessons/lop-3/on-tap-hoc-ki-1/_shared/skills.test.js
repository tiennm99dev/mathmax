import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { panLayout } from '#lib/core/kid/mass.js';
import {
  ARITH_SKILLS,
  busStory,
  cakeStory,
  canStory,
  checkWork,
  flowerStory,
  missingNumber,
  remainder,
} from './arith-skills.js';
import { divText, forgotCarry, mulColumns, mulWords, sheetRows } from './columns.js';
import {
  EXPRESSION_SKILLS,
  chooseSign,
  classStory,
  compareValues,
  sackStory,
  whichFirst,
  wheelStory,
} from './expression-skills.js';
import { firstOp, leftToRightSlip, valueOf, workLines, workText } from './expression.js';
import { boxesStory, GENERAL_SKILLS } from './general-skills.js';
import {
  COUNT_SHAPES,
  GEOMETRY_SKILLS,
  countRightAngles,
  midpoints,
  paintedCubes,
} from './geometry-skills.js';
import {
  MEASURE_SKILLS,
  balanceQuestion,
  brokenLineQuestion,
  groceryStory,
  measureWork,
  sauceStory,
} from './measure-skills.js';
import { countPainted, cubeFaces, paintedFaces } from './stack.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */

const ALL = [...ARITH_SKILLS, ...EXPRESSION_SKILLS, ...GEOMETRY_SKILLS, ...MEASURE_SKILLS];

/** @param {Question} q */
const rightText = (q) => optionText(q.options[q.answer]);

/**
 * The number an option starts with, without its grouping.
 * @param {string} text
 */
const firstNumber = (text) => Number((text.replace(/\s/g, '').match(/\d+/) ?? [])[0]);

/** @param {Question} q */
const chosen = (q) => firstNumber(rightText(q));

describe('every review question', () => {
  it('has distinct options, a valid answer and no broken text', () => {
    const bad = [];
    for (const skill of [...ALL, ...GENERAL_SKILLS]) {
      for (let seed = 1; seed <= 40; seed++) {
        const q = skill.make(rng(seed));
        const texts = q.options.map(optionText);
        const all = `${q.prompt} ${q.hint} ${q.solution} ${texts.join(' ')}`;
        if (new Set(texts).size !== texts.length || texts.length < 2) bad.push([skill.id, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([skill.id, 'answer']);
        if (/undefined|NaN|\.\d|Infinity| -\d/.test(all)) bad.push([skill.id, all]);
        if (/\b\d{4,}\b/.test(all)) bad.push([skill.id, 'ungrouped', all]);
        const right = rightText(q);
        if (right.length > 2 && q.hint.includes(right)) bad.push([skill.id, 'hint', right]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps each review within one set of questions', () => {
    for (const skills of [ARITH_SKILLS, EXPRESSION_SKILLS, GENERAL_SKILLS]) {
      expect(skills.length).toBeLessThanOrEqual(12);
      expect(new Set(skills.map((s) => s.id)).size).toBe(skills.length);
    }
    expect(GEOMETRY_SKILLS.length + MEASURE_SKILLS.length).toBeLessThanOrEqual(12);
  });
});

describe('multiplying and dividing', () => {
  it('works columns the book way', () => {
    expect(mulColumns(107, 9).map((c) => c.digit)).toEqual([3, 6, 9]);
    expect(mulWords(107, 9)).toContain('Vậy 107 × 9 = 963.');
    expect(forgotCarry(107, 9)).toBe(903);
    expect(divText(95, 8)).toBe('95 : 8 = 11 (dư 7)');
    expect(divText(628, 8)).toBe('628 : 8 = 78 (dư 4)');
  });

  it('sets a division out as the book prints it', () => {
    expect(sheetRows(567, 9).map((r) => r.cells.join(''))).toEqual(['567', '54', '27', '27', '0']);
    expect(sheetRows(740, 5).map((r) => r.cells.join(''))).toEqual([
      '740',
      '5',
      '24',
      '20',
      '40',
      '40',
      '0',
    ]);
  });

  it('stores the answers that the numbers give', () => {
    const bad = [];
    for (const skill of ARITH_SKILLS) {
      for (let seed = 1; seed <= 60; seed++) {
        const q = skill.make(rng(seed));
        if (skill.id === remainder.id && q.visual?.type === 'div') {
          if (chosen(q) !== q.visual.n % q.visual.d || chosen(q) >= q.visual.d) bad.push(q.prompt);
        } else if (skill.id === checkWork.id) {
          continue;
        } else if (q.visual?.type === 'mul') {
          if (chosen(q) !== q.visual.a * q.visual.b) bad.push(q.prompt);
          if (skill.id === 'nhan-100' && q.visual.a * q.visual.b > 100) bad.push(q.prompt);
          if (skill.id === 'nhan-1000' && q.visual.a * q.visual.b > 999) bad.push(q.prompt);
        } else if (q.visual?.type === 'div') {
          const want = divText(q.visual.n, q.visual.d).split(' = ')[1];
          if (rightText(q) !== want) bad.push(q.prompt);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('calls a worked result right exactly when it is', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const q = checkWork.make(rng(seed));
      const v = q.visual;
      if (!v) throw new Error('no drawing');
      const shown = q.prompt.split('? ')[1];
      const truth = v.type === 'mul' ? `${v.a} × ${v.b} = ${v.a * v.b}` : '';
      const good =
        v.type === 'mul' ? shown === truth : v.type === 'div' && shown === divText(v.n, v.d);
      if ((rightText(q) === 'Đúng') !== good) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('finds the missing number', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = missingNumber.make(rng(seed));
      const line = q.prompt.split('dấu ?: ')[1].replace('?', String(chosen(q)));
      const [left, value] = line.split(' = ');
      if (valueOf(left) !== Number(value)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('solves the book problems', () => {
    expect(chosen(busStory(45, 2))).toBe(90);
    expect(chosen(canStory(28, 5))).toBe(6);
    expect(chosen(canStory(30, 5))).toBe(6);
    expect(chosen(cakeStory(256, 8))).toBe(32);
    expect(chosen(flowerStory(25, 3))).toBe(100);
  });
});

describe('number expressions', () => {
  it('follows the rules of order', () => {
    expect(valueOf('47 + 36 − 50')).toBe(33);
    expect(valueOf('731 − 680 + 19')).toBe(70);
    expect(valueOf('85 : 5 × 4')).toBe(68);
    expect(valueOf('63 × 2 : 7')).toBe(18);
    expect(valueOf('14 × 6 − 29')).toBe(55);
    expect(valueOf('192 − 23 × 4')).toBe(100);
    expect(valueOf('96 : 8 + 78')).toBe(90);
    expect(valueOf('348 + 84 : 6')).toBe(362);
    expect(valueOf('45 + (62 + 38)')).toBe(145);
    expect(valueOf('182 − (96 − 54)')).toBe(140);
    expect(valueOf('64 : (4 × 2)')).toBe(8);
    expect(valueOf('7 × (48 : 6)')).toBe(56);
    expect(valueOf('4 × (54 − 44)')).toBe(40);
    expect(valueOf('(33 + 67) : 2')).toBe(50);
    expect(valueOf('52 + 24 × 2')).toBe(100);
    expect(valueOf('(25 + 45) × 3')).toBe(210);
  });

  it('writes the working line by line', () => {
    expect(workLines('14 × 6 − 29')).toEqual(['14 × 6 − 29', '84 − 29', '55']);
    expect(workText('7 × (48 : 6)')).toBe('7 × (48 : 6) = 7 × 8 = 56');
    expect(firstOp('8 + 6 × (9 − 4)')).toBe('9 − 4');
    expect(firstOp('50 − 20 + 3')).toBe('50 − 20');
    expect(leftToRightSlip('52 + 24 × 2')).toBe(152);
  });

  it('asks only expressions with a small whole value', () => {
    const bad = [];
    for (const skill of EXPRESSION_SKILLS) {
      for (let seed = 1; seed <= 60; seed++) {
        const q = skill.make(rng(seed));
        if (q.visual?.type !== 'work') continue;
        const lines = workLines(q.visual.text);
        const numbers = lines.flatMap((l) => (l.match(/\d+/g) ?? []).map(Number));
        const value = valueOf(q.visual.text);
        if (chosen(q) !== value || !Number.isInteger(value) || value < 0) bad.push(q.prompt);
        if (numbers.some((n) => n >= 1000) || lines.some((l) => l.includes('.')))
          bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('points at the one expression asked for', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const q = compareValues.make(rng(seed));
      const limit = firstNumber(q.prompt);
      const texts = q.options.map(optionText);
      const fits = q.prompt.includes('lớn hơn')
        ? texts.filter((t) => valueOf(t) > limit)
        : texts.filter((t) => valueOf(t) === limit);
      if (fits.length !== 1 || fits[0] !== rightText(q)) bad.push(q.prompt);
      const first = whichFirst.make(rng(seed));
      const expression = first.prompt.split('biểu thức ')[1].split(',')[0];
      if (rightText(first) !== firstOp(expression)) bad.push(first.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('keeps a chosen sign the only one that fits', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const q = chooseSign.make(rng(seed));
      const right = rightText(q);
      const bracket = q.prompt.match(/\((\d+) \? (\d+)\) × (\d+) = (\d+)/);
      if (bracket) {
        const [, a, b, c, value] = bracket;
        const fits = q.options
          .map(optionText)
          .filter((sign) => valueOf(`(${a} ${sign} ${b}) × ${c}`) === Number(value));
        if (fits.length !== 1 || fits[0] !== right) bad.push(q.prompt);
        continue;
      }
      const extreme = q.prompt.match(/(\d+) × \((\d+) \? (\d+)\)/);
      if (extreme) {
        const [, n, m] = extreme;
        const values = q.options.map((s) => valueOf(`${n} × (${m} ${optionText(s)} ${m})`));
        const want = q.prompt.includes('bé nhất') ? Math.min(...values) : Math.max(...values);
        if (valueOf(`${n} × (${m} ${right} ${m})`) !== want) bad.push(q.prompt);
        if (values.filter((v) => v === want).length !== 1) bad.push(q.prompt);
        continue;
      }
      const target = firstNumber(q.prompt);
      const fits = q.options.map(optionText).filter((t) => valueOf(t) === target);
      if (fits.length !== 1 || fits[0] !== right) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('solves the book problems', () => {
    expect(chosen(sackStory(30, 3, 45))).toBe(135);
    expect(chosen(wheelStory(288, 4, 8))).toBe(9);
    expect(chosen(classStory(31, 6, 34))).toBe(220);
  });
});

describe('geometry', () => {
  it('counts right angles from the shape', () => {
    const counts = COUNT_SHAPES.map((shape) => chosen(countRightAngles(shape)));
    expect(counts).toEqual([0, 1, 2, 0, 4, 4, 3]);
  });

  it('marks the midpoint halfway along', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = midpoints.make(rng(seed));
      if (q.visual?.type !== 'scene') {
        if (!q.solution.includes(`dài ${chosen(q)} cm`)) bad.push(q.prompt);
        continue;
      }
      const dots = q.visual.scene.dots ?? [];
      const at = dots.find((d) => d.name === rightText(q));
      if (at?.at.x !== (dots[0].at.x + dots[dots.length - 1].at.x) / 2) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('counts painted cubes by trying every cube', () => {
    expect(countPainted({ a: 2, b: 2, c: 3 }, 3)).toBe(8);
    expect(countPainted({ a: 2, b: 2, c: 3 }, 2)).toBe(4);
    expect(countPainted({ a: 3, b: 3, c: 2 }, 2)).toBe(8);
    expect(paintedFaces({ a: 2, b: 2, c: 3 }, 0, 0, 1)).toBe(2);
    expect(cubeFaces({ a: 2, b: 3, c: 2 }).cubes).toHaveLength(12);
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = paintedCubes.make(rng(seed));
      if (q.visual?.type !== 'cubes') throw new Error('no drawing');
      const { dims, mark } = q.visual;
      const want = mark === undefined ? dims.a * dims.b * dims.c : countPainted(dims, mark);
      if (chosen(q) !== want) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});

describe('measures', () => {
  it('solves the book problems', () => {
    expect(chosen(brokenLineQuestion([28, 28, 28]))).toBe(84);
    expect(chosen(brokenLineQuestion([30, 42, 28]))).toBe(100);
    expect(chosen(balanceQuestion('Quả bưởi', [500, 500], 100))).toBe(900);
    expect(chosen(balanceQuestion('Túi muối', [200, 200, 100]))).toBe(500);
    expect(chosen(groceryStory(80, 3, 455))).toBe(695);
    expect(chosen(sauceStory(100, 5, 10))).toBe(150);
    expect(chosen(boxesStory(20, 3))).toBe(80);
  });

  it('keeps every balance level, with its loads in the three rows under the beam', () => {
    const bad = [];
    const balances = MEASURE_SKILLS.find((s) => s.id === 'can-gam');
    if (!balances) throw new Error('no balance skill');
    for (let seed = 1; seed <= 60; seed++) {
      const { visual } = balances.make(rng(seed));
      if (visual?.type !== 'balance') throw new Error('no drawing');
      const sum = (/** @type {{ kg: number }[]} */ loads) => loads.reduce((s, l) => s + l.kg, 0);
      if (sum(visual.left) !== sum(visual.right)) bad.push(seed);
      for (const loads of [visual.left, visual.right]) {
        if (new Set(panLayout(loads, 104).map((it) => it.y)).size > 3) bad.push(seed);
      }
    }
    expect(bad).toEqual([]);
  });

  it('works with measures like plain numbers', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const q = measureWork.make(rng(seed));
      const clean = q.prompt.replace(/(?<=\d)\s(?=\d)/g, '').replace(/ (mm|g|ml)/g, '');
      const text = clean.replace(' = ?', '');
      if (valueOf(text) !== chosen(q) || !Number.isInteger(chosen(q)) || chosen(q) > 1000) {
        bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
