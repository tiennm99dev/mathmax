import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { optionText } from '#lib/core/kid/quiz.js';
import {
  ADD_SUB_SKILLS,
  addSubExpression,
  changeStory,
  doseStory,
  treeStory,
} from './add-sub-skills.js';
import { CHANCES, chanceOfOne, pairPossible } from './chance.js';
import {
  addSteps,
  columnValue,
  columnWords,
  divText,
  divWords,
  forgotAddCarry,
  forgotBorrow,
  forgotMulCarry,
  sheetRows,
  subSteps,
} from './columns.js';
import {
  DATA_CHANCE_SKILLS,
  THROWS,
  oneBall,
  savedOf,
  savedWork,
  twoBalls,
} from './data-chance-skills.js';
import {
  GEOMETRY_MEASURE_SKILLS,
  convertQuestion,
  shoppingStory,
} from './geometry-measure-skills.js';
import { clockLabel, convert, shapeLabel, timeText } from './measure.js';
import { MUL_DIV_SKILLS, ageStory, brickStory, riceStory } from './mul-div-skills.js';
import { NUMBER_SKILLS, SPECIAL, addAll, gapSlip } from './number-skills.js';
import { compareWhy, readTo100000, roman, roundTo, roundWhy, sumText } from './numbers.js';
import { valueOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */

const SETS = [
  NUMBER_SKILLS,
  ADD_SUB_SKILLS,
  MUL_DIV_SKILLS,
  GEOMETRY_MEASURE_SKILLS,
  DATA_CHANCE_SKILLS,
];
const ALL = SETS.flat();

/** @param {Question} q */
const rightText = (q) => optionText(q.options[q.answer]);

/**
 * The first number an option holds, without its grouping.
 * @param {string} text
 */
const firstNumber = (text) => Number((text.replace(/[\s\u202f]/g, '').match(/\d+/) ?? [])[0]);

/** @param {Question} q */
const chosen = (q) => firstNumber(rightText(q));

describe('every review question', () => {
  it('has distinct options, a valid answer and no broken text', () => {
    const bad = [];
    for (const skill of ALL) {
      for (let seed = 1; seed <= 60; seed++) {
        const q = skill.make(rng(seed));
        const texts = q.options.map(optionText);
        const all = `${q.prompt} ${q.hint} ${q.solution} ${texts.join(' ')}`;
        const least = q.options.length === 2 && rightText(q).length < 5 ? 2 : 3;
        if (new Set(texts).size !== texts.length || texts.length < least)
          bad.push([skill.id, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([skill.id, 'answer']);
        if (/undefined|NaN|\.\d|Infinity|null| -\d/.test(all)) bad.push([skill.id, all]);
        if (/\b\d{4,}\b/.test(all)) bad.push([skill.id, 'ungrouped', all]);
        const right = rightText(q);
        if (right.length > 2 && q.hint.includes(right)) bad.push([skill.id, 'hint', right]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps every number within 100 000, the limit of grade 3', () => {
    const bad = [];
    for (const skill of ALL) {
      for (let seed = 1; seed <= 400; seed++) {
        const q = skill.make(rng(seed));
        const all = `${q.prompt} ${q.solution} ${rightText(q)}`.replace(/\u202f/g, '');
        const over = (all.match(/\d+/g) ?? []).map(Number).filter((n) => n > 100000);
        if (over.length > 0) bad.push([skill.id, over]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps each review a short set with distinct parts', () => {
    for (const skills of SETS) {
      expect(skills.length).toBeLessThanOrEqual(12);
      expect(new Set(skills.map((s) => s.id)).size).toBe(skills.length);
    }
    expect(new Set(ALL.map((s) => s.id)).size).toBe(ALL.length);
  });

  it('stores the answer that a drawn operation gives', () => {
    const bad = [];
    for (const skill of ALL) {
      if (skill.id.startsWith('dung-sai') || skill.id === 'so-du') continue;
      for (let seed = 1; seed <= 60; seed++) {
        const q = skill.make(rng(seed));
        const v = q.visual;
        if (v?.type === 'column' && chosen(q) !== columnValue(v.op, v.a, v.b)) bad.push(q.prompt);
        if (v?.type === 'column' && columnValue(v.op, v.a, v.b) > 99999) bad.push(q.prompt);
        if (v?.type === 'div' && rightText(q) !== divText(v.n, v.d).split(' = ')[1]) {
          bad.push(q.prompt);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('gives remainders below the divisor', () => {
    const bad = [];
    const skill = MUL_DIV_SKILLS.find((s) => s.id === 'so-du');
    for (let seed = 1; seed <= 60; seed++) {
      const q = /** @type {NonNullable<typeof skill>} */ (skill).make(rng(seed));
      const v = q.visual;
      if (v?.type !== 'div' || chosen(q) !== v.n % v.d || chosen(q) >= v.d) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('calls a worked result right exactly when it is', () => {
    const bad = [];
    for (const skill of ALL.filter((s) => s.id.startsWith('dung-sai'))) {
      for (let seed = 1; seed <= 80; seed++) {
        const q = skill.make(rng(seed));
        const v = q.visual;
        const shown = q.prompt.split('? ')[1].replace(/\u202f/g, ' ');
        let truth = '';
        if (v?.type === 'column') {
          truth = `${v.a} ${v.op} ${v.b} = ${columnValue(v.op, v.a, v.b)}`;
        } else if (v?.type === 'div') {
          truth = divText(v.n, v.d).replace(/\u202f/g, ' ');
        }
        const plain = (/** @type {string} */ s) => s.replace(/ (?=\d{3}\b)/g, '');
        const good = plain(shown) === plain(truth.replace(/\u202f/g, ' '));
        if ((q.answer === 0) !== good) bad.push([q.prompt, truth]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('numbers to 100 000', () => {
  it('reads numbers the way the book does', () => {
    expect(readTo100000(9084)).toBe('chín nghìn không trăm tám mươi tư');
    expect(readTo100000(12765)).toBe('mười hai nghìn bảy trăm sáu mươi lăm');
    expect(readTo100000(30258)).toBe('ba mươi nghìn hai trăm năm mươi tám');
    expect(readTo100000(61409)).toBe('sáu mươi mốt nghìn bốn trăm linh chín');
    expect(readTo100000(95027)).toBe('chín mươi lăm nghìn không trăm hai mươi bảy');
    expect(readTo100000(92007)).toBe('chín mươi hai nghìn không trăm linh bảy');
    expect(readTo100000(100000)).toBe('một trăm nghìn');
    expect(gapSlip(9084)).toBe('chín nghìn tám mươi tư');
  });

  it('writes sums of places, rounds, compares and reads Roman numerals', () => {
    expect(sumText(46109).replace(/\u202f/g, ' ')).toBe('46 109 = 40 000 + 6 000 + 100 + 9');
    expect(roundTo(48620, 1000)).toBe(49000);
    expect(roundTo(48420, 10000)).toBe(50000);
    expect(roundTo(44999, 10000)).toBe(40000);
    expect(roundWhy(48420, 1000)).toContain('4 < 5');
    expect(compareWhy(90537, 90357)).toContain('Ở hàng trăm: 5 lớn hơn 3');
    expect(compareWhy(9999, 10001)).toContain('ít chữ số hơn');
    expect([4, 9, 14, 19, 20].map(roman)).toEqual(['IV', 'IX', 'XIV', 'XIX', 'XX']);
    expect(addAll('XIV')).toBe(16);
  });

  it('keeps the puzzle numbers right', () => {
    const different = (/** @type {number} */ n) => new Set(String(n)).size === String(n).length;
    const bad = SPECIAL.filter((s) => {
      if (s.name.includes('khác nhau') && !different(s.right)) return true;
      if (s.name.includes('tròn chục') && s.right % 10 !== 0) return true;
      return s.wrong.includes(s.right);
    });
    expect(bad).toEqual([]);
    expect(SPECIAL.map((s) => s.right)).toEqual([9999, 10000, 99999, 9870, 1230, 1023, 9876]);
  });

  it('builds four options that always include the right one', () => {
    const { options, answer } = valueOptions(5, [5, -1, 7]);
    expect(options[answer]).toBe('5');
    expect(new Set(options).size).toBe(4);
  });
});

describe('columns', () => {
  it('adds and subtracts the book way', () => {
    expect(addSteps(639, 5246)).toEqual([
      '9 cộng 6 bằng 15, viết 5, nhớ 1',
      '3 cộng 4 bằng 7, thêm 1 bằng 8, viết 8',
      '6 cộng 2 bằng 8, viết 8',
      'Hạ 5',
    ]);
    expect(subSteps(7486, 539)[0]).toBe('6 không trừ được 9, lấy 16 trừ 9 bằng 7, viết 7, nhớ 1');
    expect(subSteps(7486, 539)[1]).toBe('3 thêm 1 bằng 4; 8 trừ 4 bằng 4, viết 4');
    expect(columnWords('−', 86769, 78495)).toContain('= 8\u202f274.');
    expect(forgotAddCarry(45738, 39145)).toBe(74873);
    expect(forgotBorrow(13627, 8454)).toBe(15273);
    expect(forgotMulCarry(9160, 5)).toBe(45500);
  });

  it('says every column of random work with the right result', () => {
    const bad = [];
    const rand = rng(7);
    for (let i = 0; i < 300; i++) {
      const a = Math.floor(rand() * 99000) + 1000;
      const b = Math.floor(rand() * (a - 1)) + 1;
      if (!columnWords('−', a, b).endsWith(`= ${fmt(a - b)}.`)) bad.push(['−', a, b]);
      const digits = subSteps(a, b)
        .map((s) => /viết (\d+)/.exec(s)?.[1] ?? /Hạ (\d)/.exec(s)?.[1] ?? '')
        .reverse()
        .join('');
      if (Number(digits) !== a - b) bad.push(['digits', a, b, digits]);
      const sum = addSteps(b, a - b)
        .map((s) => /viết (\d+)/.exec(s)?.[1] ?? /Hạ (\d)/.exec(s)?.[1] ?? '')
        .reverse()
        .join('');
      if (Number(sum) !== a) bad.push(['+', b, a - b, sum]);
    }
    expect(bad).toEqual([]);
  });

  it('sets a five-digit division out as the book prints it', () => {
    expect(sheetRows(57436, 6).map((r) => r.cells.join(''))).toEqual([
      '57436',
      '54',
      '34',
      '30',
      '43',
      '42',
      '16',
      '12',
      '4',
    ]);
    expect(divWords(57436, 6)).toContain('Vậy 57\u202f436 : 6 = 9\u202f572 (dư 4).');
  });
});

describe('word problems match the book', () => {
  it('works out the book numbers', () => {
    expect(chosenOf(changeStory(28000, 3000, 50000))).toBe(19000);
    expect(chosenOf(doseStory(35800, 16400, 17340))).toBe(2060);
    expect(chosenOf(treeStory(1200, 350))).toBe(2750);
    expect(chosenOf(ageStory(9, 4))).toBe(4);
    expect(chosenOf(riceStory(17000, 5, 4))).toBe(68000);
    expect(chosenOf(brickStory(87000, 18200, 4))).toBe(14200);
    expect(chosenOf(shoppingStory(5, 7000, 60000))).toBe(95000);
    expect(chosenOf(addSubExpression(4569, 3721, 500, 'a+b-c'))).toBe(7790);
    expect(chosenOf(addSubExpression(9170, 15729, 7729, 'a+(b-c)'))).toBe(17170);
    expect(chosenOf(convertQuestion(4, 'm', 'mm'))).toBe(4000);
  });
});

/** @param {Question} q */
function chosenOf(q) {
  return chosen(q);
}

describe('measures', () => {
  it('reads clocks, units and shapes', () => {
    expect(timeText(4 * 60 + 40)).toBe('4 giờ 40 phút');
    expect(timeText(12 * 60)).toBe('12 giờ');
    expect(clockLabel(10 * 60 + 8)).toBe(
      'Đồng hồ: kim ngắn ở giữa số 10 và số 11, kim dài chỉ vạch thứ 3 sau số 1.',
    );
    expect(clockLabel(12 * 60 + 3)).toContain('vạch thứ 3 sau số 12');
    expect(convert(3, 'dm', 'mm')).toBe(300);
    expect(convert(2, 'kg', 'g')).toBe(2000);
    expect(convert(1, 'km', 'm')).toBe(1000);
    expect(shapeLabel('rect', ['8 m', '6 m'])).toBe(
      'Hình chữ nhật, chiều dài 8 m, chiều rộng 6 m.',
    );
  });

  it('answers every clock and calendar question right', () => {
    const bad = [];
    const clock = GEOMETRY_MEASURE_SKILLS.find((s) => s.id === 'xem-dong-ho');
    for (let seed = 1; seed <= 60; seed++) {
      const q = /** @type {NonNullable<typeof clock>} */ (clock).make(rng(seed));
      if (q.visual?.type !== 'clock' || rightText(q) !== timeText(q.visual.minutes)) {
        bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('data and chance', () => {
  it('says how likely a ball is', () => {
    const balls = /** @type {import('./visual.js').Ball[]} */ ([
      { color: 'đỏ', count: 3 },
      { color: 'xanh', count: 2 },
    ]);
    expect(chanceOfOne(balls, 'đỏ')).toBe('Có thể');
    expect(chanceOfOne(balls, 'vàng')).toBe('Không thể');
    expect(chanceOfOne([{ color: 'đỏ', count: 5 }], 'đỏ')).toBe('Chắc chắn');
    expect(pairPossible(balls, 'xanh', 'xanh')).toBe(true);
    expect(
      pairPossible(
        [
          { color: 'trắng', count: 2 },
          { color: 'nâu', count: 1 },
        ],
        'nâu',
        'nâu',
      ),
    ).toBe(false);
  });

  it('answers every ball question right', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const one = oneBall.make(rng(seed));
      const color = /bóng (\S+) là:$/.exec(one.prompt)?.[1];
      if (one.visual?.type !== 'box' || !color) throw new Error('no box');
      const want = chanceOfOne(one.visual.balls, /** @type {any} */ (color));
      if (rightText(one) !== want) bad.push(one.prompt);

      const two = twoBalls.make(rng(seed));
      if (two.visual?.type !== 'box') throw new Error('no box');
      const askCan = two.prompt.includes('có thể');
      const box = two.visual.balls;
      two.options.forEach((o, i) => {
        const text = optionText(o);
        const m = /^2 quả bóng (\S+)$/.exec(text);
        const n = /^1 quả bóng (\S+) và 1 quả bóng (\S+)$/.exec(text);
        const [a, b] = m ? [m[1], m[1]] : [n?.[1], n?.[2]];
        const can = pairPossible(box, /** @type {any} */ (a), /** @type {any} */ (b));
        if ((i === two.answer) !== (can === askCan)) bad.push([two.prompt, text]);
      });
    }
    expect(bad).toEqual([]);
  });

  it('keeps the dice and coin events right', () => {
    expect(THROWS.every((t) => CHANCES.includes(t.chance))).toBe(true);
    expect(new Set(THROWS.map((t) => t.chance)).size).toBe(3);
  });

  it('adds up the savings table', () => {
    expect(savedOf([0, 0, 2])).toBe(10000);
    expect(savedOf([5, 5, 0])).toBe(15000);
    expect(savedWork([0, 2, 1]).replace(/\u202f/g, ' ')).toBe(
      '2 000 × 2 + 5 000 × 1 = 9 000 (đồng)',
    );
  });

  it('answers every table question from the table', () => {
    const bad = [];
    for (const skill of DATA_CHANCE_SKILLS) {
      for (let seed = 1; seed <= 60; seed++) {
        const q = skill.make(rng(seed));
        if (q.visual?.type !== 'table') continue;
        const t = q.visual.table;
        const cells = t.rows.flatMap((r) => r.cells.map(Number));
        if (cells.some((c) => !Number.isInteger(c) || c < 0)) bad.push(['cells', skill.id]);
        if (skill.id === 'doc-bang' && !cells.includes(chosen(q))) bad.push(q.prompt);
        if (skill.id === 'nhieu-it-nhat') {
          const r = q.prompt.startsWith('Buổi sáng') ? 0 : 1;
          const row = t.rows[r].cells.map(Number);
          const want = q.prompt.includes('nhiều') ? Math.max(...row) : Math.min(...row);
          if (t.head[row.indexOf(want)] !== rightText(q)) bad.push(q.prompt);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
