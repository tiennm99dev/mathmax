/**
 * Review questions on multiplication and division: the tables of 2 and 5,
 * equal groups of pictures, a product written as a sum, division from
 * multiplication, the names of the numbers, calculations with the same result,
 * chains and word problems. Pure and DOM-free; each skill is a `KidSkill` for
 * `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { nearOptions, unitOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */

/** The two tables grade 2 learns. */
const TABLES = /** @type {const} */ ([2, 5]);

/** Pictures for equal groups. */
const GROUP_PICTURES = /** @type {const} */ (['apple', 'orange', 'strawberry', 'star', 'flower']);

/** @type {ReviewSkill} */
export const tableSkill = {
  id: 'bang',
  label: 'Bảng nhân, bảng chia 2 và 5',
  make(rand) {
    const base = pick(rand, TABLES);
    const n = int(rand, 1, 10);
    const product = base * n;
    if (rand() < 0.5) {
      return {
        prompt: `${base} × ${n} = ?`,
        ...nearOptions(rand, product, [base + n, product + base, product - base], 50),
        hint: `Em đọc lại bảng nhân ${base}, hoặc đếm thêm ${base} tất cả ${n} lần.`,
        solution: `${base} × ${n} = ${product}.`,
      };
    }
    return {
      prompt: `${product} : ${base} = ?`,
      ...numberOptions(rand, n, 1, 12),
      hint: `Em nghĩ: ${base} nhân với mấy thì bằng ${product}?`,
      solution: `Vì ${base} × ${n} = ${product} nên ${product} : ${base} = ${n}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const groupsSkill = {
  id: 'nhom-hinh',
  label: 'Phép nhân theo hình vẽ',
  make(rand) {
    const each = int(rand, 2, 6);
    const groups = int(rand, 2, each >= 5 ? 4 : 5);
    const total = each * groups;
    const right = `${each} × ${groups} = ${total}`;
    const wrong = [
      `${each} × ${groups + 1} = ${each * (groups + 1)}`,
      `${each + 1} × ${groups} = ${(each + 1) * groups}`,
    ];
    if (each !== groups) wrong.push(`${groups} × ${each} = ${total}`);
    return {
      prompt: 'Phép nhân nào đúng với hình vẽ?',
      visual: { type: 'groups', each, groups, picture: pick(rand, GROUP_PICTURES) },
      ...mixOptions(rand, right, wrong),
      hint: 'Em đếm số hình trong mỗi nhóm, rồi đếm số nhóm. Số hình mỗi nhóm viết trước.',
      solution: `Có ${groups} nhóm, mỗi nhóm ${each} hình. ${each} được lấy ${groups} lần nên ${right}.`,
    };
  },
};

/**
 * A number added to itself: "3 + 3 + 3".
 * @param {number} n
 * @param {number} times
 */
const sumOf = (n, times) => Array.from({ length: times }, () => n).join(' + ');

/** @type {ReviewSkill} */
export const sumSkill = {
  id: 'tong',
  label: 'Tích và tổng',
  make(rand) {
    const n = int(rand, 2, 9);
    let times = int(rand, 2, 5);
    if (times === n) times = times === 2 ? 3 : times - 1;
    if (rand() < 0.5) {
      return {
        prompt: `${n} × ${times} viết thành tổng nào?`,
        ...mixOptions(rand, sumOf(n, times), [
          sumOf(times, n),
          `${n} + ${times}`,
          sumOf(n, times + 1),
        ]),
        hint: `${n} × ${times} là ${n} được lấy ${times} lần.`,
        solution: `${n} được lấy ${times} lần: ${n} × ${times} = ${sumOf(n, times)} = ${n * times}.`,
      };
    }
    return {
      prompt: `${sumOf(n, times)} viết thành phép nhân nào?`,
      ...mixOptions(rand, `${n} × ${times}`, [
        `${times} × ${n}`,
        `${n} × ${times + 1}`,
        `${n} + ${times}`,
      ]),
      hint: 'Số được cộng viết trước. Em đếm xem số đó được lấy mấy lần.',
      solution: `${n} được lấy ${times} lần, nên viết là ${n} × ${times}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const familySkill = {
  id: 'nhan-sang-chia',
  label: 'Từ phép nhân đến phép chia',
  make(rand) {
    const base = pick(rand, TABLES);
    const other = pick(
      rand,
      [3, 4, 6, 7, 8, 9].filter((n) => n !== base),
    );
    const product = base * other;
    const [by, right] = rand() < 0.5 ? [base, other] : [other, base];
    return {
      prompt: `Từ ${base} × ${other} = ${product}, em có ${product} : ${by} = ?`,
      ...numberOptions(rand, right, 1, 10),
      hint: `Lấy tích chia cho thừa số này thì được thừa số kia.`,
      solution: `${base} × ${other} = ${product}, nên ${product} : ${base} = ${other} và ${product} : ${other} = ${base}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const namesSkill = {
  id: 'ten-goi',
  label: 'Tên các số trong phép tính',
  make(rand) {
    const base = pick(rand, TABLES);
    const n = int(rand, 3, 9);
    const product = base * n;
    if (rand() < 0.5) {
      const asksProduct = rand() < 0.5;
      const asked = asksProduct ? product : base;
      return {
        prompt: `Trong phép nhân ${base} × ${n} = ${product}, số ${asked} gọi là gì?`,
        options: ['Thừa số', 'Tích', 'Thương'],
        answer: asksProduct ? 1 : 0,
        hint: 'Hai số nhân với nhau gọi là thừa số. Kết quả của phép nhân gọi là tích.',
        solution: `${base} và ${n} là thừa số, ${product} là tích.`,
      };
    }
    // A quotient equal to the divisor would give one number two names.
    const q = n === base ? n + 1 : n;
    const dividend = base * q;
    const place = int(rand, 0, 2);
    const asked = [dividend, base, q][place];
    return {
      prompt: `Trong phép chia ${dividend} : ${base} = ${q}, số ${asked} gọi là gì?`,
      options: ['Số bị chia', 'Số chia', 'Thương'],
      answer: place,
      hint: 'Số đứng trước dấu chia là số bị chia, số đứng sau là số chia, kết quả là thương.',
      solution: `${dividend} là số bị chia, ${base} là số chia, ${q} là thương.`,
    };
  },
};

/** @type {ReviewSkill} */
export const sameResultSkill = {
  id: 'cung-ket-qua',
  label: 'Phép tính cùng kết quả',
  make(rand) {
    const k = int(rand, 2, 5);
    const value = 2 * k;
    const by = pick(rand, TABLES);
    const others = shuffle(
      rand,
      [2, 4, 6, 8, 10].filter((v) => v !== value),
    ).slice(0, 2);
    /** @param {number} v */
    const divide = (v) => `${v * by} : ${by}`;
    return {
      prompt: `Phép chia nào có cùng kết quả với 2 × ${k}?`,
      ...mixOptions(rand, divide(value), others.map(divide)),
      hint: `Em tính 2 × ${k} trước, rồi tính từng phép chia.`,
      solution: `2 × ${k} = ${value}. ${divide(value)} = ${value}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const chainSkill = {
  id: 'mui-ten',
  label: 'Tính theo mũi tên',
  make(rand) {
    for (;;) {
      const start = int(rand, 2, 10);
      /** @type {import('./visual.js').ChainStep[]} */
      const steps = [];
      let v = start;
      const count = int(rand, 2, 3);
      while (steps.length < count) {
        const divisors = TABLES.filter((d) => v % d === 0 && v / d <= 10);
        if (divisors.length > 0 && (v > 10 || rand() < 0.4)) {
          const d = pick(rand, divisors);
          v /= d;
          steps.push({ sign: ':', word: 'chia', n: d, value: v });
        } else {
          const m = pick(rand, TABLES);
          v *= m;
          steps.push({ sign: '×', word: 'nhân', n: m, value: v });
        }
      }
      if (steps.some((s) => s.value > 50)) continue;
      const last = steps[steps.length - 1];
      const before = steps[steps.length - 2].value;
      const words = [start, ...steps.map((s) => s.value)];
      return {
        prompt: 'Em tính theo chiều mũi tên. Ô cuối cùng là số nào?',
        visual: { type: 'chain', start, steps },
        ...nearOptions(rand, last.value, [before, last.value + last.n], 50),
        hint: 'Em tính từng phép từ trái sang phải. Kết quả của phép trước là số đầu của phép sau.',
        solution: `${steps.map((s, i) => `${words[i]} ${s.sign} ${s.n} = ${s.value}`).join('. ')}. Ô cuối cùng là ${last.value}.`,
      };
    }
  },
};

/** The book's word problems. */
const STORIES = [
  /** @param {() => number} rand */
  (rand) => {
    const a = pick(rand, TABLES);
    const n = int(rand, 3, 9);
    return {
      prompt: `Mỗi chùm có ${a} quả dừa. Hỏi ${n} chùm như thế có bao nhiêu quả dừa?`,
      ...unitOptions(rand, a * n, 'quả', [a + n, a * (n + 1)], 50),
      hint: `${a} quả được lấy ${n} lần, em làm phép nhân.`,
      solution: `${n} chùm có số quả dừa là: ${a} × ${n} = ${a * n} (quả). Đáp số: ${a * n} quả dừa.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const a = pick(rand, TABLES);
    const n = int(rand, 3, 8);
    return {
      prompt: `Mỗi lượt đua thuyền có ${a} thuyền. Hỏi ${n} lượt đua có bao nhiêu thuyền tham gia?`,
      ...unitOptions(rand, a * n, 'thuyền', [a + n, a * (n - 1)], 50),
      hint: `${a} thuyền được lấy ${n} lần, em làm phép nhân.`,
      solution: `${n} lượt đua có số thuyền là: ${a} × ${n} = ${a * n} (thuyền). Đáp số: ${a * n} thuyền.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const d = pick(rand, TABLES);
    const n = int(rand, 2, 8);
    const total = d * n;
    return {
      prompt: `Cô giáo có ${total} hộp bánh, chia đều cho ${d} tổ. Hỏi mỗi tổ được mấy hộp bánh?`,
      ...unitOptions(rand, n, 'hộp', [total - d, n + 1, n + 2], 50),
      hint: 'Chia đều thì em làm phép chia.',
      solution: `Mỗi tổ được số hộp bánh là: ${total} : ${d} = ${n} (hộp). Đáp số: ${n} hộp bánh.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const d = pick(rand, TABLES);
    const n = int(rand, 2, 8);
    const total = d * n;
    return {
      prompt: `Bác thợ mộc có thanh gỗ dài ${total} dm, cắt thành ${d} đoạn dài bằng nhau. Hỏi mỗi đoạn dài mấy đề-xi-mét?`,
      ...unitOptions(rand, n, 'dm', [total - d, n + 1, n + 2], 50),
      hint: 'Cắt thành các đoạn bằng nhau là chia đều, em làm phép chia.',
      solution: `Mỗi đoạn gỗ dài là: ${total} : ${d} = ${n} (dm). Đáp số: ${n} dm.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const d = pick(rand, TABLES);
    const n = int(rand, 2, 8);
    const total = d * n;
    return {
      prompt: `Có ${total} bạn xếp thành các nhóm, mỗi nhóm ${d} bạn. Hỏi xếp được mấy nhóm?`,
      ...unitOptions(rand, n, 'nhóm', [total - d, n + 1, n + 2], 50),
      hint: `Em xem ${total} bạn chia được mấy nhóm, mỗi nhóm ${d} bạn.`,
      solution: `Xếp được số nhóm là: ${total} : ${d} = ${n} (nhóm). Đáp số: ${n} nhóm.`,
    };
  },
];

/** @type {ReviewSkill} */
export const storySkill = {
  id: 'bai-toan',
  label: 'Giải bài toán',
  make: (rand) => pick(rand, STORIES)(rand),
};

/** The parts of the review of multiplication and division. */
export const MUL_DIV_SKILLS = [
  tableSkill,
  groupsSkill,
  sumSkill,
  familySkill,
  namesSkill,
  sameResultSkill,
  chainSkill,
  storySkill,
];
