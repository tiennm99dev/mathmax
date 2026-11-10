/**
 * The adaptive review of numbers to 10 000 and 100 000: reading and writing,
 * counting on, comparing and ordering, the sum of places, rounding, the
 * numbers just before and after, Roman numerals and the special numbers of
 * the book's puzzles. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { mixOptions, signOptions } from '#lib/core/kid/quiz.js';
import { readNumber } from '#lib/core/kid/numbers.js';
import { readTo1000 } from '#lib/core/kid/place-value.js';
import { compareWhy, readTo100000, roman, roundTo, roundWhy, sumParts } from './numbers.js';
import { valueOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').ReviewQuestion} ReviewQuestion */

/**
 * A four- or five-digit number that often has a zero inside it, the numbers
 * children misread most.
 * @param {() => number} rand
 */
export function drawNumber(rand) {
  const size = rand() < 0.4 ? 4 : 5;
  let text = String(int(rand, 1, 9));
  for (let i = 1; i < size; i++) text += String(rand() < 0.3 ? 0 : int(rand, 1, 9));
  return Number(text);
}

/**
 * The number with two neighbouring digits swapped, when that changes it.
 * @param {number} n
 * @param {number} i
 */
export function swapDigits(n, i) {
  const d = String(n).split('');
  if (i + 1 >= d.length || d[i] === d[i + 1] || (i === 0 && d[1] === '0')) return n;
  [d[i], d[i + 1]] = [d[i + 1], d[i]];
  return Number(d.join(''));
}

/**
 * The number written with every zero left out, a slip of writing from words.
 * @param {number} n
 */
export const dropZeros = (n) => Number(String(n).replace(/0/g, '')) || n;

/**
 * The slip of reading a number without "không trăm" or "linh": 9 084 read as
 * "chín nghìn tám mươi tư". Null when the number has no such gap.
 * @param {number} n
 */
export function gapSlip(n) {
  const rest = n % 1000;
  if (n < 1000 || rest === 0 || rest >= 100) return null;
  return `${readNumber(Math.floor(n / 1000))} nghìn ${readTo1000(rest)}`;
}

/** @type {ReviewSkill} */
export const readSkill = {
  id: 'doc-so',
  label: 'Đọc số',
  make(rand) {
    for (;;) {
      const n = drawNumber(rand);
      const right = readTo100000(n);
      const wrong = [
        gapSlip(n),
        readTo100000(swapDigits(n, int(rand, 0, String(n).length - 2))),
        readTo100000(swapDigits(n, String(n).length - 2)),
        readTo100000(Math.min(99999, n + pick(rand, [100, 1000, 10]))),
      ].filter((w) => w !== null && w !== right);
      const options = mixOptions(rand, right, /** @type {string[]} */ (wrong).slice(0, 3));
      if (options.options.length < 3) continue;
      return {
        prompt: `Số ${fmt(n)} đọc là:`,
        ...options,
        hint: 'Em đọc phần nghìn trước, rồi đọc ba chữ số sau như một số có ba chữ số. Hàng trăm là 0 thì đọc "không trăm".',
        solution: `${fmt(n)} đọc là: ${right}.`,
      };
    }
  },
};

/** @type {ReviewSkill} */
export const writeSkill = {
  id: 'viet-so',
  label: 'Viết số',
  make(rand) {
    for (;;) {
      const n = drawNumber(rand);
      if (!String(n).includes('0')) continue;
      return {
        prompt: `Số "${readTo100000(n)}" viết là:`,
        ...valueOptions(n, [dropZeros(n), swapDigits(n, 1), n * 10, n + 1000], { step: 100 }),
        hint: 'Hàng nào không được đọc tên số thì em viết chữ số 0 ở hàng đó.',
        solution: `"${readTo100000(n)}" viết là ${fmt(n)}.`,
      };
    }
  },
};

/** @type {ReviewSkill} */
export const sequenceSkill = {
  id: 'day-so',
  label: 'Số tiếp theo trong dãy',
  make(rand) {
    const step = pick(rand, [1, 10, 100, 1000]);
    const near = pick(rand, [10000, 20000, 50000, 70000, 100000]);
    const start =
      rand() < 0.5
        ? near - step * int(rand, 2, 3)
        : int(rand, 1, 9) * 1000 * pick(rand, [1, 10]) + step * int(rand, 0, 5);
    const terms = [0, 1, 2, 3].map((k) => start + k * step);
    if (terms[3] > 100000) return sequenceSkill.make(rand);
    const gap = int(rand, 1, 3);
    const right = terms[gap];
    const shown = terms.map((t, k) => (k === gap ? '?' : fmt(t))).join('; ');
    return {
      prompt: `Số nào thích hợp thay cho dấu ?: ${shown}`,
      ...valueOptions(right, [right + step * 10, right + 1, right + 10], { step }),
      hint: `Em xem hai số đứng liền nhau trong dãy hơn kém nhau bao nhiêu.`,
      solution: `Mỗi số hơn số đứng trước ${fmt(step)} đơn vị. Số cần điền là ${fmt(right)}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const compareSkill = {
  id: 'so-sanh',
  label: 'So sánh hai số',
  make(rand) {
    const a = int(rand, 10000, 99999);
    const kind = int(rand, 0, 3);
    let b;
    if (kind === 0) b = int(rand, 1000, 9999);
    else if (kind === 1) b = a;
    else {
      const place = pick(rand, [10, 100, 1000]);
      b = a + pick(rand, [-1, 1]) * place * int(rand, 1, 3);
      if (b < 10000 || b > 99999) b = a - place;
    }
    const [x, y] = rand() < 0.5 ? [a, b] : [b, a];
    const sign = x > y ? '>' : x < y ? '<' : '=';
    return {
      prompt: `Chọn dấu thích hợp: ${fmt(x)} ? ${fmt(y)}`,
      ...signOptions(sign),
      hint: 'Em đếm số chữ số trước. Nếu bằng nhau, em so sánh từng hàng từ trái sang phải.',
      solution: compareWhy(x, y),
    };
  },
};

/**
 * Four numbers close to one another, as in the book's tables of fish weights
 * or masks made in a day.
 * @param {() => number} rand
 */
export function drawFour(rand) {
  const base = int(rand, 2, 8) * 10000;
  const values = new Set();
  while (values.size < 4) values.add(base + int(rand, -9, 9) * pick(rand, [1000, 100]));
  return [...values];
}

/** @type {ReviewSkill} */
export const orderSkill = {
  id: 'lon-be-thu-tu',
  label: 'Số lớn nhất, bé nhất, sắp xếp',
  make(rand) {
    const values = drawFour(rand);
    const up = [...values].sort((a, b) => a - b);
    const kind = int(rand, 0, 2);
    if (kind < 2) {
      const most = kind === 0;
      const right = most ? up[3] : up[0];
      const wrong = values.filter((v) => v !== right).map(fmt);
      return {
        prompt: `Số ${most ? 'lớn nhất' : 'bé nhất'} trong các số ${shuffle(rand, values).map(fmt).join('; ')} là:`,
        ...mixOptions(rand, fmt(right), wrong),
        hint: 'Các số đều có năm chữ số. Em so sánh hàng chục nghìn, rồi hàng nghìn, rồi hàng trăm.',
        solution: `Xếp từ bé đến lớn: ${up.map(fmt).join('; ')}. Số ${most ? 'lớn nhất' : 'bé nhất'} là ${fmt(right)}.`,
      };
    }
    const toBig = rand() < 0.5;
    const right = toBig ? up : [...up].reverse();
    const slip = [...right];
    [slip[1], slip[2]] = [slip[2], slip[1]];
    const back = [...right].reverse();
    /** @param {number[]} list */
    const line = (list) => list.map(fmt).join('; ');
    return {
      prompt: `Dãy số nào được xếp theo thứ tự từ ${toBig ? 'bé đến lớn' : 'lớn đến bé'}?`,
      ...mixOptions(rand, line(right), [line(slip), line(back)]),
      hint: `Em tìm số ${toBig ? 'bé' : 'lớn'} nhất để viết đầu tiên, rồi tìm tiếp.`,
      solution: `Từ ${toBig ? 'bé đến lớn' : 'lớn đến bé'}: ${line(right)}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const placesSkill = {
  id: 'tong-cac-hang',
  label: 'Viết số thành tổng',
  make(rand) {
    for (;;) {
      const n = drawNumber(rand);
      const parts = sumParts(n);
      if (parts.length < 3) continue;
      if (rand() < 0.5) {
        const lead = Number(parts.map((p) => String(p)[0]).join(''));
        const shifted = n - parts[parts.length - 1] + parts[parts.length - 1] * 10;
        return {
          prompt: `${parts.map(fmt).join(' + ')} = ?`,
          ...valueOptions(n, [lead, shifted, dropZeros(n) * 10], { step: 1000 }),
          hint: 'Mỗi số hạng cho em biết chữ số ở một hàng. Hàng nào không có thì viết 0.',
          solution: `${parts.map(fmt).join(' + ')} = ${fmt(n)}.`,
        };
      }
      const k = int(rand, 1, parts.length - 1);
      const right = parts[k];
      const lead = Number(String(right)[0]);
      const shown = parts.map((p, i) => (i === k ? '?' : fmt(p))).join(' + ');
      return {
        prompt: `${fmt(n)} = ${shown}. Số nào thay cho dấu ?`,
        ...valueOptions(right, [lead, right * 10, right / 10], { step: right }),
        hint: 'Em tìm chữ số ở hàng còn thiếu, rồi viết thêm các chữ số 0 cho đúng hàng.',
        solution: `${fmt(n)} = ${parts.map(fmt).join(' + ')}. Số cần điền là ${fmt(right)}.`,
      };
    }
  },
};

/** @type {ReviewSkill} */
export const roundSkill = {
  id: 'lam-tron',
  label: 'Làm tròn số',
  make(rand) {
    for (;;) {
      const unit = pick(rand, /** @type {const} */ ([1000, 10000]));
      const n = int(rand, 11000, 98999);
      if (n % unit === 0) continue;
      const right = roundTo(n, unit);
      const low = Math.floor(n / unit) * unit;
      const other = right === low ? low + unit : low;
      const slip = roundTo(n, unit === 1000 ? 10000 : 1000);
      return {
        prompt: `Làm tròn số ${fmt(n)} đến hàng ${unit === 1000 ? 'nghìn' : 'chục nghìn'} ta được số nào?`,
        ...valueOptions(right, [other, slip, Math.round(n / 100) * 100], { step: unit }),
        hint: `Em nhìn chữ số ${unit === 1000 ? 'hàng trăm' : 'hàng nghìn'}: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.`,
        solution: roundWhy(n, unit),
      };
    }
  },
};

/** @type {ReviewSkill} */
export const neighbourSkill = {
  id: 'lien-truoc-sau',
  label: 'Số liền trước, số liền sau',
  make(rand) {
    const after = rand() < 0.5;
    const n =
      rand() < 0.5
        ? int(rand, 1, 9) * pick(rand, [1000, 10000]) - (after ? 1 : 0)
        : int(rand, 1001, 99998);
    const right = after ? n + 1 : n - 1;
    return {
      prompt: `Số liền ${after ? 'sau' : 'trước'} của ${fmt(n)} là:`,
      ...valueOptions(right, [
        after ? n - 1 : n + 1,
        right + (after ? 10 : -10),
        n + (after ? 1000 : -1000),
      ]),
      hint: `Số liền ${after ? 'sau' : 'trước'} ${after ? 'hơn' : 'kém'} số đã cho 1 đơn vị.`,
      solution: `${fmt(n)} ${after ? '+' : '−'} 1 = ${fmt(right)}. Số liền ${after ? 'sau' : 'trước'} của ${fmt(n)} là ${fmt(right)}.`,
    };
  },
};

/**
 * The value of a Roman numeral read by adding every symbol, the slip of
 * reading IV as 6.
 * @param {string} text
 */
export const addAll = (text) =>
  [...text].reduce((s, c) => s + (c === 'X' ? 10 : c === 'V' ? 5 : 1), 0);

/** @type {ReviewSkill} */
export const romanSkill = {
  id: 'la-ma',
  label: 'Chữ số La Mã',
  make(rand) {
    const n = rand() < 0.6 ? pick(rand, [4, 6, 9, 11, 14, 16, 19, 20]) : int(rand, 1, 20);
    const r = roman(n);
    if (rand() < 0.5) {
      return {
        prompt: `Số La Mã ${r} đọc là số nào?`,
        ...valueOptions(n, [addAll(r), n === 20 ? 2 : n + 10, n + 1, n + 2]),
        hint: 'I là 1, V là 5, X là 10. Chữ I đứng bên trái V hay X thì bớt đi 1.',
        solution: `${r} là ${n}.`,
      };
    }
    const wrong = [n + 2, n - 1, n + 1, n - 2, n === 4 ? 6 : n === 9 ? 11 : n + 10]
      .filter((v) => v >= 1 && v <= 20 && v !== n)
      .map(roman);
    return {
      prompt: `Số ${n} viết bằng chữ số La Mã là:`,
      ...mixOptions(rand, r, wrong.slice(0, 3)),
      hint: 'I là 1, V là 5, X là 10. Chữ I đứng bên trái V hay X thì bớt đi 1, đứng bên phải thì thêm 1.',
      solution: `${n} viết là ${r}.`,
    };
  },
};

/**
 * The special numbers of the book's puzzles, with the slips that look like
 * them.
 * @type {ReadonlyArray<{ name: string, right: number, wrong: number[], why: string }>}
 */
export const SPECIAL = [
  {
    name: 'Số lớn nhất có bốn chữ số',
    right: 9999,
    wrong: [1000, 9000, 99999],
    why: 'Mỗi hàng em chọn chữ số lớn nhất là 9: số đó là 9 999.',
  },
  {
    name: 'Số bé nhất có năm chữ số',
    right: 10000,
    wrong: [11111, 9999, 10001],
    why: 'Hàng chục nghìn bé nhất là 1, các hàng còn lại là 0: số đó là 10 000.',
  },
  {
    name: 'Số lớn nhất có năm chữ số',
    right: 99999,
    wrong: [90000, 9999, 99990],
    why: 'Mỗi hàng em chọn chữ số lớn nhất là 9: số đó là 99 999.',
  },
  {
    name: 'Số tròn chục lớn nhất có bốn chữ số khác nhau',
    right: 9870,
    wrong: [9876, 9880, 9780],
    why: 'Số tròn chục có chữ số hàng đơn vị là 0. Các hàng còn lại em chọn lần lượt 9, 8, 7: số đó là 9 870.',
  },
  {
    name: 'Số tròn chục bé nhất có bốn chữ số khác nhau',
    right: 1230,
    wrong: [1023, 1000, 1200],
    why: 'Số tròn chục có chữ số hàng đơn vị là 0. Hàng nghìn bé nhất là 1, rồi hàng trăm là 2, hàng chục là 3: số đó là 1 230.',
  },
  {
    name: 'Số bé nhất có bốn chữ số khác nhau',
    right: 1023,
    wrong: [1000, 1234, 1203],
    why: 'Hàng nghìn bé nhất là 1, các hàng sau em chọn lần lượt 0, 2, 3: số đó là 1 023.',
  },
  {
    name: 'Số lớn nhất có bốn chữ số khác nhau',
    right: 9876,
    wrong: [9999, 9870, 9867],
    why: 'Các hàng từ trái sang phải em chọn lần lượt 9, 8, 7, 6: số đó là 9 876.',
  },
];

/** @type {ReviewSkill} */
export const specialSkill = {
  id: 'so-dac-biet',
  label: 'Tìm số theo điều kiện',
  make(rand) {
    const s = pick(rand, SPECIAL);
    return {
      prompt: `${s.name} là số nào?`,
      ...valueOptions(s.right, s.wrong),
      hint: 'Em chọn chữ số cho từng hàng, bắt đầu từ hàng lớn nhất bên trái.',
      solution: s.why,
    };
  },
};

/** The parts of the review of numbers to 10 000 and 100 000. */
export const NUMBER_SKILLS = [
  readSkill,
  writeSkill,
  sequenceSkill,
  compareSkill,
  orderSkill,
  placesSkill,
  roundSkill,
  neighbourSkill,
  romanSkill,
  specialSkill,
];
