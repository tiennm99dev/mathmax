/**
 * Review questions on the numbers from 0 to 10: counting, reading and
 * writing a number, more and fewer, comparing with >, < and =, the largest
 * and the smallest number, the missing number of a counting row and
 * splitting a number into two parts. Each skill builds tap-the-answer
 * questions from a random source. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { pictureGroups, pictures } from '#lib/core/kid/pictures/index.js';
import { SIGN_WORDS, mixOptions, numberOptions, signOf, signOptions } from './quiz.js';

/** @typedef {import('./quiz.js').KidSkill} KidSkill */

/** Number words, indexed by value, as the book reads them. */
export const NUMBER_WORDS = /** @type {const} */ ([
  'không',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
  'mười',
]);

/** Pictures that are counted in the questions. */
export const COUNTABLE = /** @type {const} */ ([
  ...pictureGroups.fruit,
  ...pictureGroups.animals,
  ...pictureGroups.things,
]);

/** @type {KidSkill} */
export const countSkill = {
  id: 'dem',
  label: 'Đếm số lượng',
  make(rand) {
    const picture = pick(rand, COUNTABLE);
    const noun = pictures[picture];
    const n = int(rand, 1, 10);
    return {
      prompt: `Có mấy ${noun}?`,
      visual: { type: 'groups', groups: [{ picture, n }] },
      ...numberOptions(rand, n, 1, 10),
      hint: `Em chỉ tay vào từng ${noun} và đếm: một, hai, ba, ...`,
      solution: `Em đếm từ một đến ${NUMBER_WORDS[n]}. Có ${n} ${noun}.`,
    };
  },
};

/** @type {KidSkill} */
export const readSkill = {
  id: 'doc-so',
  label: 'Đọc, viết số',
  make(rand) {
    const n = int(rand, 0, 10);
    const word = NUMBER_WORDS[n];
    const solution = `Số ${n} đọc là "${word}".`;
    if (rand() < 0.5) {
      const others = shuffle(
        rand,
        [n - 2, n - 1, n + 1, n + 2].filter((v) => v >= 0 && v <= 10),
      ).slice(0, 2);
      return {
        prompt: `Số ${n} đọc là gì?`,
        ...mixOptions(
          rand,
          word,
          others.map((v) => NUMBER_WORDS[v]),
        ),
        hint: 'Em đếm từ không và chỉ vào từng số: không, một, hai, ...',
        solution,
      };
    }
    return {
      prompt: `Số nào đọc là "${word}"?`,
      ...numberOptions(rand, n),
      hint: 'Em đếm từ không và chỉ vào từng số cho đến khi nghe tiếng đó.',
      solution,
    };
  },
};

/** What the options of a more-or-fewer question say. */
export const MORE_FEWER = /** @type {const} */ (['Nhiều hơn', 'Ít hơn', 'Bằng nhau']);

/** @type {KidSkill} */
export const moreFewerSkill = {
  id: 'nhieu-it',
  label: 'Nhiều hơn, ít hơn',
  make(rand) {
    const [p1, p2] = shuffle(rand, [...pictureGroups.fruit]).slice(0, 2);
    const [a, b] = [pictures[p1], pictures[p2]];
    const n1 = int(rand, 1, 7);
    const n2 = rand() < 0.25 ? n1 : int(rand, 1, 7);
    const answer = n1 > n2 ? 0 : n1 < n2 ? 1 : 2;
    const relation = ['nhiều hơn', 'ít hơn', 'bằng'][answer];
    return {
      prompt: `Số ${a} nhiều hơn, ít hơn hay bằng số ${b}?`,
      visual: {
        type: 'groups',
        groups: [
          { picture: p1, n: n1 },
          { picture: p2, n: n2 },
        ],
      },
      options: [...MORE_FEWER],
      answer,
      hint: `Em nối mỗi ${a} với một ${b}. Bên nào còn thừa thì bên đó nhiều hơn.`,
      solution: `Có ${n1} ${a} và ${n2} ${b}. Số ${a} ${relation} số ${b}.`,
    };
  },
};

/** @type {KidSkill} */
export const compareSkill = {
  id: 'so-sanh',
  label: 'So sánh hai số',
  make(rand) {
    const a = int(rand, 0, 10);
    const b = rand() < 0.25 ? a : int(rand, 0, 10);
    const sign = signOf(a, b);
    return {
      prompt: `Chọn dấu đúng: ${a} ... ${b}`,
      ...signOptions(sign),
      hint:
        a === b
          ? 'Hai số này có giống nhau không?'
          : 'Khi đếm từ không, số nào đếm sau thì số đó lớn hơn.',
      solution: `${a} ${SIGN_WORDS[sign]} ${b}, nên ${a} ${sign} ${b}.`,
    };
  },
};

/** @type {KidSkill} */
export const extremeSkill = {
  id: 'lon-be',
  label: 'Số lớn nhất, số bé nhất',
  make(rand) {
    const values = shuffle(rand, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 4);
    const sorted = [...values].sort((x, y) => x - y);
    const biggest = rand() < 0.5;
    const right = biggest ? sorted[3] : sorted[0];
    return {
      prompt: `Trong các số dưới đây, số nào ${biggest ? 'lớn nhất' : 'bé nhất'}?`,
      options: values.map(String),
      answer: values.indexOf(right),
      hint: biggest
        ? 'Em đếm từ không. Số nào được đếm sau cùng thì lớn nhất.'
        : 'Em đếm từ không. Số nào được đếm trước tiên thì bé nhất.',
      solution: `Xếp từ bé đến lớn: ${sorted.join(', ')}. Số ${biggest ? 'lớn nhất' : 'bé nhất'} là ${right}.`,
    };
  },
};

/** @type {KidSkill} */
export const rowSkill = {
  id: 'day-so',
  label: 'Điền số vào dãy',
  make(rand) {
    const up = rand() < 0.5;
    const start = up ? int(rand, 0, 7) : int(rand, 3, 10);
    const row = [0, 1, 2, 3].map((i) => (up ? start + i : start - i));
    const gap = int(rand, 0, 3);
    const shown = row.map((v, i) => (i === gap ? '?' : String(v)));
    return {
      prompt: `Chọn số thay cho dấu hỏi: ${shown.join(', ')}`,
      ...numberOptions(rand, row[gap]),
      hint: up
        ? 'Các số xếp từ bé đến lớn. Đếm thêm 1 thì được số tiếp theo.'
        : 'Các số xếp từ lớn đến bé. Đếm bớt 1 thì được số tiếp theo.',
      solution: `Dãy số đầy đủ: ${row.join(', ')}. Số cần điền là ${row[gap]}.`,
    };
  },
};

/** @type {KidSkill} */
export const splitSkill = {
  id: 'may-va-may',
  label: 'Mấy và mấy',
  make(rand) {
    const n = int(rand, 2, 10);
    const a = int(rand, 1, n - 1);
    const b = n - a;
    return {
      prompt: `${n} gồm ${a} và mấy?`,
      ...numberOptions(rand, b, 0, n),
      hint: `Em lấy ${n} que tính, tách ra ${a} que. Em đếm số que còn lại.`,
      solution: `Tách ${n} que tính ra ${a} que thì còn ${b} que. Vậy ${n} gồm ${a} và ${b}.`,
    };
  },
};

/** The parts of the review on numbers, in the book's order. */
export const NUMBER_SKILLS = [
  countSkill,
  readSkill,
  moreFewerSkill,
  compareSkill,
  extremeSkill,
  rowSkill,
  splitSkill,
];
