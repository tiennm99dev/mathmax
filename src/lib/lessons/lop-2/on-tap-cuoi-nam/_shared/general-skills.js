/**
 * The review of the whole year: one part from every topic, plus what only
 * this review asks, a repeating row of shapes and a table of masses. Pure and
 * DOM-free; each skill is a `KidSkill` for `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { capitalize, mixOptions } from '#lib/core/kid/quiz.js';
import { FIGURE_NAMES } from '#lib/core/kid/shapes.js';
import { RANGE_1000, columnSkill, story1000Skill, twoSignsSkill } from './add-sub-skills.js';
import { BALL_COLORS, COLOR_IDS } from './chance.js';
import { carryCount } from './columns.js';
import { polylineSkill, quadSkill } from './geometry-skills.js';
import { calendarSkill, clockSkill } from './measure-review-skills.js';
import { storySkill as mulDivStorySkill, tableSkill as timesTableSkill } from './mul-div-skills.js';
import { largestSkill, placesSkill, readWriteSkill } from './number-skills.js';
import { unitOptions } from './options.js';
import { boxChanceSkill, readTallySkill } from './survey-skills.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').PatternItem} PatternItem */

const PLANE_KINDS = /** @type {const} */ (['tron', 'vuong', 'tam-giac']);

/**
 * The name of a shape in a repeating row: 'Hình tròn đỏ'.
 * @param {PatternItem} item
 */
const itemName = (item) => capitalize(`${FIGURE_NAMES[item.kind]} ${BALL_COLORS[item.color].name}`);

/** @type {ReviewSkill} */
export const patternSkill = {
  id: 'quy-luat',
  label: 'Quy luật dãy hình',
  make(rand) {
    const byColor = rand() < 0.6;
    const kind = pick(rand, PLANE_KINDS);
    const color = pick(rand, COLOR_IDS);
    /** @type {PatternItem[]} */
    const choices = byColor
      ? shuffle(rand, COLOR_IDS).map((c) => ({ kind, color: c }))
      : shuffle(rand, [...PLANE_KINDS]).map((k) => ({ kind: k, color }));
    const period = rand() < 0.7 ? 3 : 2;
    const unit = choices.slice(0, period);
    const length = int(rand, 6, 8);
    const items = Array.from({ length }, (_, i) => unit[i % period]);
    const right = items[length - 1];
    return {
      prompt: 'Các hình lặp lại theo quy luật. Dấu hỏi là hình nào?',
      visual: { type: 'pattern', items },
      ...mixOptions(rand, itemName(right), choices.filter((c) => c !== right).map(itemName)),
      hint: 'Em tìm nhóm hình lặp đi lặp lại, rồi đọc tiếp đến dấu hỏi.',
      solution: `Nhóm lặp lại là: ${unit.map((u) => itemName(u).toLowerCase()).join(', ')}. Dấu hỏi là ${itemName(right).toLowerCase()}.`,
    };
  },
};

const COWS = /** @type {const} */ (['A', 'B', 'C', 'D']);

/** @type {ReviewSkill} */
export const massTableSkill = {
  id: 'can-nang',
  label: 'Tính từ bảng cân nặng',
  make(rand) {
    for (;;) {
      const masses = shuffle(
        rand,
        [0, 1, 2, 3].map((i) => 310 + i * 30 + int(rand, 0, 25)),
      );
      /** @type {import('./visual.js').Visual} */
      const visual = {
        type: 'table',
        head: ['Con bò', 'Cân nặng (kg)'],
        rows: COWS.map((c, i) => [`Bò ${c}`, masses[i]]),
      };
      const [i, j] = shuffle(rand, [0, 1, 2, 3]);
      const add = rand() < 0.5;
      const [big, small] = masses[i] > masses[j] ? [i, j] : [j, i];
      if (add) {
        if (carryCount(masses[i], masses[j], '+') > 1) continue;
        const r = masses[i] + masses[j];
        return {
          prompt: `Bò ${COWS[i]} và bò ${COWS[j]} cân nặng tất cả bao nhiêu ki-lô-gam?`,
          visual,
          ...unitOptions(rand, r, 'kg', [r + 10, r - 10, r + 100]),
          hint: 'Em tìm hai số trong bảng, rồi làm phép cộng.',
          solution: `${masses[i]} + ${masses[j]} = ${r} (kg).`,
        };
      }
      if (carryCount(masses[big], masses[small], '-') > 1) continue;
      const r = masses[big] - masses[small];
      return {
        prompt: `Bò ${COWS[big]} nặng hơn bò ${COWS[small]} bao nhiêu ki-lô-gam?`,
        visual,
        ...unitOptions(rand, r, 'kg', [r + 10, r - 10], 1000, 1),
        hint: 'Em tìm hai số trong bảng, rồi lấy số lớn trừ số bé.',
        solution: `${masses[big]} − ${masses[small]} = ${r} (kg).`,
      };
    }
  },
};

/** The parts of the review of the whole year. */
export const GENERAL_SKILLS = [
  readWriteSkill,
  placesSkill,
  largestSkill,
  columnSkill(RANGE_1000),
  twoSignsSkill(RANGE_1000),
  story1000Skill,
  timesTableSkill,
  { ...mulDivStorySkill, id: 'bai-toan-nhan', label: 'Bài toán nhân, chia' },
  quadSkill,
  patternSkill,
  polylineSkill,
  massTableSkill,
  clockSkill,
  calendarSkill,
  readTallySkill,
  boxChanceSkill,
];
