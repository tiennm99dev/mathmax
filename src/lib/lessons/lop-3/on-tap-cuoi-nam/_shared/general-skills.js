/**
 * The general year-end review of grade 3: one part from each strand of the
 * year, plus two parts the book asks for in its last lesson (a square found
 * from its perimeter, and a span of time on one hour). Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { addColumns, subColumns } from './add-sub-skills.js';
import { readTable, oneBall } from './data-chance-skills.js';
import { massCapacity } from './geometry-measure-skills.js';
import { timeText } from './measure.js';
import { divColumns, expressionMulDiv, mulColumns, timesSkill } from './mul-div-skills.js';
import { orderSkill } from './number-skills.js';
import { valueOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */

/**
 * Options that carry a unit: "64 cm²".
 * @param {string} unit
 */
const inUnit = (unit) => (/** @type {number} */ n) => `${n} ${unit}`;

/**
 * A square known by its perimeter: its area, or the perimeter of a
 * rectangle whose width is the square's side and whose length is a few times
 * that width.
 * @type {ReviewSkill}
 */
export const squareFromPerimeter = {
  id: 'tu-chu-vi-hinh-vuong',
  label: 'Hình vuông biết chu vi',
  make(rand) {
    const side = int(rand, 3, 12);
    const perimeter = side * 4;
    if (int(rand, 0, 1) === 0) {
      const right = side * side;
      return {
        prompt: `Một hình vuông có chu vi ${perimeter} cm. Tính diện tích hình vuông đó.`,
        visual: { type: 'shape', kind: 'square', labels: ['? cm'] },
        ...valueOptions(right, [perimeter, side * 2, right + side], { write: inUnit('cm²') }),
        hint: 'Em tìm cạnh hình vuông trước: lấy chu vi chia cho 4.',
        solution: `Cạnh hình vuông là: ${perimeter} : 4 = ${side} (cm). Diện tích hình vuông là: ${side} × ${side} = ${right} (cm²).`,
      };
    }
    const times = int(rand, 2, 4);
    const length = side * times;
    const right = (length + side) * 2;
    return {
      prompt: `Một hình vuông có chu vi ${perimeter} cm. Hình chữ nhật có chiều rộng bằng cạnh hình vuông, chiều dài gấp ${times} lần chiều rộng. Tính chu vi hình chữ nhật.`,
      ...valueOptions(right, [length * side, length + side, (perimeter + side) * 2], {
        write: inUnit('cm'),
      }),
      hint: 'Cạnh hình vuông bằng chu vi chia cho 4. Đó cũng là chiều rộng hình chữ nhật.',
      solution: `Chiều rộng là: ${perimeter} : 4 = ${side} (cm). Chiều dài là: ${side} × ${times} = ${length} (cm). Chu vi hình chữ nhật là: (${length} + ${side}) × 2 = ${right} (cm).`,
    };
  },
};

/** Stories of a span of time: who, what they start and what they finish. */
const SPANS = [
  { who: 'Nam', start: 'đi từ nhà', end: 'đến trường', ask: 'đi từ nhà đến trường hết' },
  { who: 'Mai', start: 'bắt đầu làm bài', end: 'làm xong', ask: 'làm bài hết' },
  { who: 'Rô-bốt', start: 'bắt đầu tưới cây', end: 'tưới xong', ask: 'tưới cây hết' },
];

/**
 * How many minutes pass between two times on the same hour, as when Núi leaves
 * home at 6 giờ 5 phút and reaches school at 6 giờ 55 phút.
 * @type {ReviewSkill}
 */
export const elapsedSkill = {
  id: 'khoang-thoi-gian',
  label: 'Tính khoảng thời gian',
  make(rand) {
    const story = pick(rand, SPANS);
    const hour = int(rand, 6, 10);
    const from = int(rand, 0, 5) * 5;
    const span = int(rand, 2, Math.floor((55 - from) / 5)) * 5;
    const to = from + span;
    const startText = timeText(hour * 60 + from);
    const endText = timeText(hour * 60 + to);
    return {
      prompt: `${story.who} ${story.start} lúc ${startText} và ${story.end} lúc ${endText}. ${story.who} ${story.ask} bao nhiêu phút?`,
      ...valueOptions(span, [to, from + to, span + 10], { step: 5, write: inUnit('phút') }),
      hint: 'Hai lúc cùng một giờ. Em lấy số phút lúc sau trừ số phút lúc trước.',
      solution: `Từ ${startText} đến ${endText}: ${to} − ${from} = ${span} (phút).`,
    };
  },
};

/** The general review: one or two parts from every strand of grade 3. */
export const GENERAL_SKILLS = [
  orderSkill,
  addColumns,
  subColumns,
  mulColumns,
  divColumns,
  expressionMulDiv,
  timesSkill,
  squareFromPerimeter,
  massCapacity,
  elapsedSkill,
  readTable,
  oneBall,
];
