/**
 * The adaptive review of data tables and of how likely an event is
 * ("chắc chắn, có thể, không thể") in grade 3. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { CHANCES, boxText, chanceOfOne } from './chance.js';
import { dong, valueOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').ReviewQuestion} ReviewQuestion */
/** @typedef {import('./visual.js').DataTable} DataTable */
/** @typedef {import('./visual.js').BallColor} BallColor */

export const SCHOOL_DAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];
export const PARTS = ['Buổi sáng', 'Buổi chiều'];

/**
 * A school day inside a sentence: 'thứ Hai'.
 * @param {number} d
 */
export const dayInText = (d) => `t${SCHOOL_DAYS[d].slice(1)}`;

/**
 * Children who came to the library on each school day, morning and
 * afternoon, in fives from 20 to 70.
 * @param {() => number} rand
 * @returns {number[][]} a row per part of the day, a value per day
 */
export function drawVisits(rand) {
  return PARTS.map(() => SCHOOL_DAYS.map(() => int(rand, 4, 14) * 5));
}

/**
 * The library table of `drawVisits`.
 * @param {number[][]} visits
 * @returns {DataTable}
 */
export function visitTable(visits) {
  return {
    caption: 'Số học sinh đến thư viện trong một tuần',
    corner: 'Buổi',
    head: SCHOOL_DAYS,
    rows: PARTS.map((label, r) => ({ label, cells: visits[r].map(String) })),
  };
}

/** @type {ReviewSkill} */
export const readTable = {
  id: 'doc-bang',
  label: 'Đọc bảng số liệu',
  make(rand) {
    const visits = drawVisits(rand);
    const r = int(rand, 0, 1);
    const d = int(rand, 0, 4);
    const right = visits[r][d];
    return {
      prompt: `${PARTS[r]} ${dayInText(d)} có bao nhiêu học sinh đến thư viện?`,
      visual: { type: 'table', table: visitTable(visits) },
      ...valueOptions(right, [visits[1 - r][d], visits[r][(d + 1) % 5]], { step: 5 }),
      hint: `Em tìm cột ${SCHOOL_DAYS[d]}, rồi dóng sang hàng ${PARTS[r].toLowerCase()}.`,
      solution: `Ở cột ${SCHOOL_DAYS[d]}, hàng ${PARTS[r].toLowerCase()} ghi ${right}. Có ${right} học sinh.`,
    };
  },
};

/** @type {ReviewSkill} */
export const mostLeast = {
  id: 'nhieu-it-nhat',
  label: 'Nhiều nhất, ít nhất',
  make(rand) {
    for (;;) {
      const visits = drawVisits(rand);
      const r = int(rand, 0, 1);
      const most = rand() < 0.5;
      const row = visits[r];
      const best = most ? Math.max(...row) : Math.min(...row);
      if (row.filter((v) => v === best).length > 1) continue;
      const d = row.indexOf(best);
      const others = shuffle(
        rand,
        SCHOOL_DAYS.filter((_, i) => i !== d),
      ).slice(0, 3);
      return {
        prompt: `${PARTS[r]} ngày nào có ${most ? 'nhiều' : 'ít'} học sinh đến thư viện nhất?`,
        visual: { type: 'table', table: visitTable(visits) },
        ...mixOptions(rand, SCHOOL_DAYS[d], others),
        hint: `Em đọc các số ở hàng ${PARTS[r].toLowerCase()}, rồi tìm số ${most ? 'lớn' : 'bé'} nhất.`,
        solution: `Hàng ${PARTS[r].toLowerCase()}: ${row.join(', ')}. Số ${most ? 'lớn' : 'bé'} nhất là ${best}, ở cột ${SCHOOL_DAYS[d]}.`,
      };
    }
  },
};

/** @type {ReviewSkill} */
export const workTable = {
  id: 'tinh-tu-bang',
  label: 'Tính từ bảng số liệu',
  make(rand) {
    for (;;) {
      const visits = drawVisits(rand);
      const d = int(rand, 0, 4);
      const [m, a] = [visits[0][d], visits[1][d]];
      const day = dayInText(d);
      if (rand() < 0.5) {
        const right = m + a;
        return {
          prompt: `Cả buổi sáng và buổi chiều ${day} có bao nhiêu học sinh đến thư viện?`,
          visual: { type: 'table', table: visitTable(visits) },
          ...valueOptions(right, [Math.abs(m - a), m, a], { step: 5 }),
          hint: `Em đọc số học sinh của hai buổi ${day}, rồi cộng lại.`,
          solution: `${m} + ${a} = ${right}. Có ${right} học sinh.`,
        };
      }
      if (m === a) continue;
      const [big, small, bigPart, smallPart] =
        m > a ? [m, a, 'buổi sáng', 'buổi chiều'] : [a, m, 'buổi chiều', 'buổi sáng'];
      const right = big - small;
      return {
        prompt: `Ngày ${day}, ${bigPart} có nhiều hơn ${smallPart} bao nhiêu học sinh đến thư viện?`,
        visual: { type: 'table', table: visitTable(visits) },
        ...valueOptions(right, [big + small, big, right + 10], { step: 5 }),
        hint: 'Muốn biết nhiều hơn bao nhiêu, em lấy số lớn trừ số bé.',
        solution: `${big} − ${small} = ${right}. ${bigPart.charAt(0).toUpperCase()}${bigPart.slice(1)} có nhiều hơn ${right} học sinh.`,
      };
    }
  },
};

export const SAVERS = ['Nam', 'Việt', 'Mai'];
export const NOTES = [1000, 2000, 5000];

/**
 * How many notes of each kind three friends saved in a week.
 * @param {() => number} rand
 * @returns {number[][]} a row per friend, a count per note
 */
export function drawSavings(rand) {
  return SAVERS.map(() => NOTES.map(() => int(rand, 0, 4)));
}

/**
 * The money a row of notes makes.
 * @param {number[]} counts
 */
export const savedOf = (counts) => counts.reduce((s, c, i) => s + c * NOTES[i], 0);

/**
 * The savings table.
 * @param {number[][]} savings
 * @returns {DataTable}
 */
export function savingsTable(savings) {
  return {
    caption: 'Số tờ tiền mỗi bạn tiết kiệm được trong một tuần',
    corner: 'Tên',
    head: NOTES.map((n) => `Tờ ${dong(n)}`),
    rows: SAVERS.map((label, r) => ({ label, cells: savings[r].map(String) })),
  };
}

/**
 * The money of one friend worked out note by note.
 * @param {number[]} counts
 */
export function savedWork(counts) {
  const parts = counts.flatMap((c, i) => (c > 0 ? [`${fmt(NOTES[i])} × ${c}`] : []));
  return `${parts.join(' + ')} = ${fmt(savedOf(counts))} (đồng)`;
}

/** @type {ReviewSkill} */
export const savingsSkill = {
  id: 'tiet-kiem',
  label: 'Bảng số liệu về tiền',
  make(rand) {
    for (;;) {
      const savings = drawSavings(rand);
      const totals = savings.map(savedOf);
      if (totals.some((t) => t === 0) || new Set(totals).size < 3) continue;
      if (rand() < 0.5) {
        const r = int(rand, 0, 2);
        const right = totals[r];
        const counted = savings[r].reduce((s, c) => s + c, 0) * 1000;
        return {
          prompt: `${SAVERS[r]} tiết kiệm được bao nhiêu tiền?`,
          visual: { type: 'table', table: savingsTable(savings) },
          ...valueOptions(right, [counted, totals[(r + 1) % 3], right + 1000], {
            step: 1000,
            write: dong,
          }),
          hint: `Em đọc hàng ${SAVERS[r]}: mỗi loại tờ tiền có mấy tờ, rồi tính số tiền của từng loại.`,
          solution: `${SAVERS[r]}: ${savedWork(savings[r])}.`,
        };
      }
      const most = rand() < 0.5;
      const best = most ? Math.max(...totals) : Math.min(...totals);
      const r = totals.indexOf(best);
      return {
        prompt: `Bạn nào tiết kiệm được ${most ? 'nhiều' : 'ít'} tiền nhất?`,
        visual: { type: 'table', table: savingsTable(savings) },
        ...mixOptions(
          rand,
          SAVERS[r],
          SAVERS.filter((_, i) => i !== r),
        ),
        hint: 'Em tính số tiền của từng bạn, rồi so sánh.',
        solution: `${SAVERS.map((name, i) => `${name}: ${savedWork(savings[i])}`).join('. ')}. ${SAVERS[r]} tiết kiệm được ${most ? 'nhiều' : 'ít'} tiền nhất.`,
      };
    }
  },
};

/** @type {ReadonlyArray<BallColor>} */
const COLORS = ['đỏ', 'xanh', 'vàng', 'trắng', 'nâu', 'tím'];

/** @type {ReviewSkill} */
export const oneBall = {
  id: 'chac-chan-co-the',
  label: 'Chắc chắn, có thể, không thể',
  make(rand) {
    const [x, y, z] = shuffle(rand, COLORS);
    const kind = int(rand, 0, 2);
    const balls =
      kind === 0
        ? [{ color: x, count: int(rand, 3, 6) }]
        : [
            { color: x, count: int(rand, 2, 4) },
            { color: y, count: int(rand, 1, 3) },
          ];
    const color = kind === 2 ? z : rand() < 0.5 || kind === 0 ? x : y;
    const right = chanceOfOne(balls, color);
    return {
      prompt: `Nhắm mắt lấy ra 1 quả bóng từ hộp. Lấy được quả bóng ${color} là:`,
      visual: { type: 'box', balls },
      options: [...CHANCES],
      answer: CHANCES.indexOf(right),
      hint: `Em xem trong hộp có bóng ${color} không, và có bóng màu khác không.`,
      solution: `${boxText(balls)} ${
        right === 'Chắc chắn'
          ? `Mọi quả bóng đều màu ${color}, nên chắc chắn lấy được bóng ${color}.`
          : right === 'Có thể'
            ? `Hộp có bóng ${color} và cả bóng màu khác, nên có thể lấy được bóng ${color}.`
            : `Hộp không có bóng ${color}, nên không thể lấy được bóng ${color}.`
      }`,
    };
  },
};

/**
 * "2 quả bóng đỏ", "1 quả bóng đỏ và 1 quả bóng xanh".
 * @param {BallColor} a
 * @param {BallColor} b
 */
export const pairText = (a, b) =>
  a === b ? `2 quả bóng ${a}` : `1 quả bóng ${a} và 1 quả bóng ${b}`;

/** @type {ReviewSkill} */
export const twoBalls = {
  id: 'lay-hai-qua',
  label: 'Lấy cùng lúc hai đồ vật',
  make(rand) {
    const [x, y, z] = shuffle(rand, COLORS);
    const balls = [
      { color: x, count: int(rand, 2, 3) },
      { color: y, count: 1 },
    ];
    /** @type {Array<[BallColor, BallColor]>} */
    const can = [
      [x, x],
      [x, y],
    ];
    /** @type {Array<[BallColor, BallColor]>} */
    const cannot = [
      [y, y],
      [x, z],
    ];
    const askCan = rand() < 0.5;
    const right = askCan ? pick(rand, can) : pick(rand, cannot);
    const wrong = askCan ? cannot : can;
    return {
      prompt: `Lấy cùng một lúc 2 quả bóng từ hộp. Sự kiện nào ${askCan ? 'có thể' : 'không thể'} xảy ra?`,
      visual: { type: 'box', balls },
      ...mixOptions(
        rand,
        pairText(...right),
        wrong.map((w) => pairText(...w)),
      ),
      hint: `Hộp chỉ có 1 quả bóng ${y}. Em xem mỗi sự kiện cần những quả bóng nào.`,
      solution: `${boxText(balls)} Có thể lấy được ${pairText(x, x)}, hoặc ${pairText(x, y)}. Không thể lấy được ${pairText(y, y)} vì chỉ có 1 quả bóng ${y}, cũng không thể lấy được bóng ${z} vì hộp không có bóng ${z}.`,
    };
  },
};

/**
 * Events of one throw of a dice or one toss of a coin, with how likely each
 * is.
 * @type {ReadonlyArray<{ text: string, chance: import('./chance.js').Chance, why: string }>}
 */
export const THROWS = [
  {
    text: 'Gieo xúc xắc, mặt trên có 7 chấm',
    chance: 'Không thể',
    why: 'Xúc xắc chỉ có các mặt 1, 2, 3, 4, 5, 6 chấm, không có mặt 7 chấm.',
  },
  {
    text: 'Gieo xúc xắc, mặt trên có 3 chấm',
    chance: 'Có thể',
    why: 'Mặt 3 chấm là một trong 6 mặt, nhưng mặt trên cũng có thể là mặt khác.',
  },
  {
    text: 'Gieo xúc xắc, mặt trên có số chấm bé hơn 7',
    chance: 'Chắc chắn',
    why: 'Mặt nào của xúc xắc cũng có từ 1 đến 6 chấm, đều bé hơn 7.',
  },
  {
    text: 'Gieo xúc xắc, mặt trên có 6 chấm',
    chance: 'Có thể',
    why: 'Mặt 6 chấm là một trong 6 mặt, nhưng mặt trên cũng có thể là mặt khác.',
  },
  {
    text: 'Gieo xúc xắc, mặt trên không có chấm nào',
    chance: 'Không thể',
    why: 'Mặt nào của xúc xắc cũng có ít nhất 1 chấm.',
  },
  {
    text: 'Tung đồng xu có một mặt hình ngôi sao, một mặt hình chiếc lá, mặt trên là hình ngôi sao',
    chance: 'Có thể',
    why: 'Mặt trên có thể là hình ngôi sao, cũng có thể là hình chiếc lá.',
  },
  {
    text: 'Tung đồng xu có một mặt hình ngôi sao, một mặt hình chiếc lá, mặt trên là hình con cá',
    chance: 'Không thể',
    why: 'Đồng xu không có mặt nào hình con cá.',
  },
  {
    text: 'Tung đồng xu có một mặt hình ngôi sao, một mặt hình chiếc lá, mặt trên là hình ngôi sao hoặc hình chiếc lá',
    chance: 'Chắc chắn',
    why: 'Đồng xu chỉ có hai mặt đó, nên mặt trên luôn là một trong hai hình.',
  },
];

/** @type {ReviewSkill} */
export const throwSkill = {
  id: 'xuc-xac-dong-xu',
  label: 'Gieo xúc xắc, tung đồng xu',
  make(rand) {
    const t = pick(rand, THROWS);
    return {
      prompt: `${t.text}. Sự kiện đó là:`,
      options: [...CHANCES],
      answer: CHANCES.indexOf(t.chance),
      hint: 'Em nghĩ xem xúc xắc hay đồng xu có những mặt nào.',
      solution: `${t.chance}. ${t.why}`,
    };
  },
};

export const FRUITS = ['Cam', 'Táo', 'Chuối', 'Xoài'];

/** @type {ReviewSkill} */
export const fruitTable = {
  id: 'bang-mot-hang',
  label: 'Lập và đọc bảng số liệu',
  make(rand) {
    for (;;) {
      const counts = FRUITS.map(() => int(rand, 3, 12));
      /** @type {DataTable} */
      const table = {
        caption: 'Loại quả các bạn lớp 3B thích nhất',
        corner: 'Loại quả',
        head: FRUITS,
        rows: [{ label: 'Số bạn', cells: counts.map(String) }],
      };
      if (rand() < 0.5) {
        const right = counts.reduce((s, c) => s + c, 0);
        return {
          prompt: 'Lớp 3B có tất cả bao nhiêu bạn được hỏi?',
          visual: { type: 'table', table },
          ...valueOptions(right, [right - counts[0], Math.max(...counts), right + 10]),
          hint: 'Mỗi bạn chọn một loại quả. Em cộng số bạn của tất cả các loại quả.',
          solution: `${counts.join(' + ')} = ${right}. Có ${right} bạn được hỏi.`,
        };
      }
      const [i, j] = shuffle(rand, [0, 1, 2, 3]);
      if (counts[i] === counts[j]) continue;
      const [big, small] = counts[i] > counts[j] ? [i, j] : [j, i];
      const right = counts[big] - counts[small];
      return {
        prompt: `Số bạn thích ${FRUITS[big].toLowerCase()} nhiều hơn số bạn thích ${FRUITS[small].toLowerCase()} là bao nhiêu bạn?`,
        visual: { type: 'table', table },
        ...valueOptions(right, [counts[big] + counts[small], counts[big], right + 2]),
        hint: 'Em đọc số bạn của hai loại quả, rồi lấy số lớn trừ số bé.',
        solution: `${counts[big]} − ${counts[small]} = ${right}. Nhiều hơn ${right} bạn.`,
      };
    }
  },
};

/** The parts of the review of data tables and chance. */
export const DATA_CHANCE_SKILLS = [
  readTable,
  mostLeast,
  workTable,
  fruitTable,
  savingsSkill,
  oneBall,
  twoBalls,
  throwSkill,
];
