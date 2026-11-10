/**
 * The mixed practice of the grade 4 review chapter: reading and comparing
 * numbers to 100 000, rounding, even and odd numbers, the four operations in
 * columns, checking a division with a remainder, expressions with letters and
 * word problems in two and three steps. One question of each part in a
 * shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { TOP, readTo100000, roundTo, roundWhy } from '../_shared/numbers.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'viet-so': 'Đọc, viết số',
  'so-sanh': 'So sánh số',
  'lam-tron': 'Làm tròn số',
  'chan-le': 'Số chẵn, số lẻ',
  'dat-tinh': 'Đặt tính rồi tính',
  'thu-lai': 'Thử lại phép chia có dư',
  'bieu-thuc': 'Biểu thức chứa chữ',
  'bai-hai-buoc': 'Bài toán giải bằng hai bước',
  'bai-ba-buoc': 'Bài toán giải bằng ba bước',
});

/**
 * Up to four number options in increasing order: the right one and the
 * slips a child makes, then near numbers, all positive and at most 100 000.
 * @param {number} right
 * @param {number[]} slips
 * @returns {{ options: string[], answer: number }}
 */
export function slipOptions(right, slips) {
  const near = [right + 10, right - 10, right + 100, right - 100, right + 1, right - 1];
  const others = [...new Set([...slips, ...near])].filter(
    (v) => v !== right && v > 0 && v <= TOP && Number.isInteger(v),
  );
  const values = [right, ...others.slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(fmt), answer: values.indexOf(right) };
}

/**
 * The digits of a five-digit number from the left.
 * @param {number} n
 */
const digitsOf = (n) => String(n).split('').map(Number);

/**
 * The number written by five digits from the left.
 * @param {number[]} d
 */
const fromDigits = (d) => Number(d.join(''));

/**
 * The digits of `n` with places `i` and `j` swapped.
 * @param {number} n
 * @param {number} i
 * @param {number} j
 */
function swapped(n, i, j) {
  const d = digitsOf(n);
  [d[i], d[j]] = [d[j], d[i]];
  return fromDigits(d);
}

/**
 * A five-digit number with a zero in one of its middle places, the kind a
 * child misreads.
 * @param {() => number} rand
 */
function withZero(rand) {
  const d = [int(rand, 1, 9), int(rand, 0, 9), int(rand, 1, 9), int(rand, 1, 9), int(rand, 1, 9)];
  d[pick(rand, [1, 2, 3])] = 0;
  return fromDigits(d);
}

/**
 * Why the last digit makes a number even or odd.
 * @param {number} n
 */
const parityWhy = (n) =>
  `${fmt(n)} có chữ số tận cùng là ${n % 10} nên là số ${n % 2 === 0 ? 'chẵn' : 'lẻ'}.`;

/** @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Question>} */
const MAKERS = {
  'viet-so': (rand) => {
    const n = withZero(rand);
    const slips = [
      swapped(n, 1, 2),
      swapped(n, 2, 3),
      swapped(n, 3, 4),
      swapped(n, 2, 4),
      n + 100,
      n + 10,
    ].filter((v) => v !== n && v >= 10000 && v < TOP);
    return {
      prompt: `Số "${readTo100000(n)}" viết là số nào?`,
      ...mixOptions(rand, fmt(n), [...new Set(slips)].slice(0, 3).map(fmt)),
      hint: 'Em viết từ hàng chục nghìn đến hàng đơn vị. Hàng nào không có thì em viết chữ số 0.',
      solution: `Số "${readTo100000(n)}" viết là ${fmt(n)}.`,
    };
  },
  'so-sanh': (rand) => {
    const head = int(rand, 2, 8) * 10000;
    /** @type {Set<number>} */
    const set = new Set();
    while (set.size < 4) set.add(head + int(rand, 0, 9999));
    const numbers = [...set];
    const most = rand() < 0.5;
    const right = most ? Math.max(...numbers) : Math.min(...numbers);
    const word = most ? 'lớn nhất' : 'bé nhất';
    return {
      prompt: `Trong các số ${numbers.map(fmt).join('; ')}, số nào ${word}?`,
      ...mixOptions(rand, fmt(right), numbers.filter((v) => v !== right).map(fmt)),
      hint: 'Các số cùng có năm chữ số và cùng chữ số hàng chục nghìn. Em so sánh tiếp chữ số hàng nghìn, rồi hàng trăm.',
      solution: `Xếp theo thứ tự từ bé đến lớn: ${numbers
        .toSorted((x, y) => x - y)
        .map(fmt)
        .join('; ')}. Số ${word} là ${fmt(right)}.`,
    };
  },
  'lam-tron': (rand) => {
    const unit = /** @type {import('../_shared/numbers.js').RoundUnit} */ (
      pick(rand, [1000, 10000])
    );
    let n = int(rand, 10001, 98999);
    if (n % (unit / 10) === 0) n += int(rand, 1, 9) * (unit / 100);
    const right = roundTo(n, unit);
    const low = Math.floor(n / unit) * unit;
    const other = right === low ? low + unit : low;
    const place = unit === 1000 ? 'hàng nghìn' : 'hàng chục nghìn';
    return {
      prompt: `Làm tròn số ${fmt(n)} đến ${place} được số nào?`,
      ...slipOptions(right, [
        other,
        roundTo(n, unit === 1000 ? 10000 : 1000),
        Math.round(n / 100) * 100,
        Math.floor(n / (unit / 10)) * (unit / 10),
        low - unit,
      ]),
      hint:
        unit === 1000
          ? 'Em nhìn chữ số hàng trăm: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.'
          : 'Em nhìn chữ số hàng nghìn: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
      solution: roundWhy(n, unit),
    };
  },
  'chan-le': (rand) => {
    const even = rand() < 0.5;
    const want = even ? 0 : 1;
    const right = int(rand, 500, 4999) * 2 + want;
    /** @type {Set<number>} */
    const set = new Set();
    while (set.size < 3) set.add(int(rand, 500, 4999) * 2 + 1 - want);
    const wrong = [...set];
    return {
      prompt: `Số nào là số ${even ? 'chẵn' : 'lẻ'}?`,
      ...mixOptions(rand, fmt(right), wrong.map(fmt)),
      hint: even
        ? 'Số chẵn có chữ số tận cùng là 0, 2, 4, 6, 8.'
        : 'Số lẻ có chữ số tận cùng là 1, 3, 5, 7, 9.',
      solution: parityWhy(right),
    };
  },
  'dat-tinh': (rand) => {
    const op = pick(rand, /** @type {const} */ (['+', '−', '×', ':']));
    if (op === '+') {
      const a = int(rand, 10000, 59999);
      const b = int(rand, 10000, 39999);
      const right = a + b;
      return {
        prompt: `Đặt tính rồi tính: ${fmt(a)} + ${fmt(b)} = ?`,
        ...slipOptions(right, [right - 1000, right - 10, right + 100]),
        hint: 'Em cộng từ hàng đơn vị sang trái. Đủ 10 thì nhớ 1 sang hàng bên trái.',
        solution: `${fmt(a)} + ${fmt(b)} = ${fmt(right)}. Thử lại: ${fmt(right)} − ${fmt(b)} = ${fmt(a)}.`,
      };
    }
    if (op === '−') {
      const a = int(rand, 40000, 99999);
      const b = int(rand, 1000, a - 10000);
      const right = a - b;
      return {
        prompt: `Đặt tính rồi tính: ${fmt(a)} − ${fmt(b)} = ?`,
        ...slipOptions(right, [right + 1000, right + 10, right - 100]),
        hint: 'Em trừ từ hàng đơn vị sang trái. Không trừ được thì lấy thêm 10, rồi nhớ 1 sang hàng bên trái của số trừ.',
        solution: `${fmt(a)} − ${fmt(b)} = ${fmt(right)}. Thử lại: ${fmt(right)} + ${fmt(b)} = ${fmt(a)}.`,
      };
    }
    if (op === '×') {
      const b = int(rand, 3, 9);
      const a = int(rand, 1001, Math.floor(99999 / b));
      const right = a * b;
      return {
        prompt: `Đặt tính rồi tính: ${fmt(a)} × ${b} = ?`,
        ...slipOptions(right, [right - a, right + a, right - 10]),
        hint: `Em nhân ${b} lần lượt với từng chữ số của ${fmt(a)}, từ hàng đơn vị sang trái, nhớ sang hàng bên trái.`,
        solution: `${fmt(a)} × ${b} = ${fmt(right)}. Thử lại: ${fmt(right)} : ${b} = ${fmt(a)}.`,
      };
    }
    const b = int(rand, 3, 9);
    const right = int(rand, 1001, Math.floor(99999 / b));
    const a = right * b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} : ${b} = ?`,
      ...slipOptions(right, [right + 1, right - 1, right + 10]),
      hint: `Em chia từ hàng cao nhất của ${fmt(a)}: lấy từng phần chia cho ${b}, nhân lại rồi trừ, hạ chữ số tiếp theo.`,
      solution: `${fmt(a)} : ${b} = ${fmt(right)}. Thử lại: ${fmt(right)} × ${b} = ${fmt(a)}.`,
    };
  },
  'thu-lai': (rand) => {
    const d = int(rand, 3, 9);
    const q = int(rand, 1001, Math.floor(99990 / d));
    const r = int(rand, 1, d - 1);
    const a = q * d + r;
    const right = `${fmt(q)} × ${d} + ${r}`;
    return {
      prompt: `${fmt(a)} : ${d} = ${fmt(q)} (dư ${r}). Em thử lại bằng phép tính nào?`,
      ...mixOptions(rand, right, [
        `${fmt(q)} × ${d} − ${r}`,
        `${fmt(q)} × ${r} + ${d}`,
        `${fmt(q)} + ${d} + ${r}`,
      ]),
      hint: 'Phép chia có dư: số bị chia bằng thương nhân với số chia, rồi cộng số dư.',
      solution: `Em lấy thương nhân số chia rồi cộng số dư: ${fmt(q)} × ${d} + ${r} = ${fmt(q * d)} + ${r} = ${fmt(a)}, đúng bằng số bị chia.`,
    };
  },
  'bieu-thuc': (rand) => {
    const form = pick(rand, /** @type {const} */ (['abc', 'cmn', 'abk']));
    if (form === 'abc') {
      const a = int(rand, 200, 900);
      const b = int(rand, 100, 500);
      const c = int(rand, 50, 150);
      const right = a + b - c;
      return {
        prompt: `Tính giá trị của biểu thức a + b − c với a = ${a}, b = ${b}, c = ${c}.`,
        ...slipOptions(right, [a - b + c, a + b + c, right + 10]),
        hint: 'Em thay chữ bằng số. Biểu thức chỉ có cộng, trừ thì em tính từ trái sang phải.',
        solution: `Với a = ${a}, b = ${b}, c = ${c} thì a + b − c = ${a} + ${b} − ${c} = ${a + b} − ${c} = ${right}.`,
      };
    }
    if (form === 'cmn') {
      const c = int(rand, 10, 50) * 100;
      const m = int(rand, 101, 999);
      const n = int(rand, 2, 9);
      const right = c + m * n;
      return {
        prompt: `Tính giá trị của biểu thức c + m × n với c = ${fmt(c)}, m = ${m}, n = ${n}.`,
        ...slipOptions(right, [(c + m) * n, c + m + n, right - m]),
        hint: 'Em thay chữ bằng số. Biểu thức có cộng và nhân thì em làm phép nhân trước.',
        solution: `Với c = ${fmt(c)}, m = ${m}, n = ${n} thì c + m × n = ${fmt(c)} + ${m} × ${n} = ${fmt(c)} + ${fmt(m * n)} = ${fmt(right)}.`,
      };
    }
    const k = int(rand, 2, 9);
    const diff = int(rand, 1000, Math.floor(99999 / k));
    const b = int(rand, 1000, 9999);
    const a = diff + b;
    const right = diff * k;
    return {
      prompt: `Tính giá trị của biểu thức (a − b) × k với a = ${fmt(a)}, b = ${fmt(b)}, k = ${k}.`,
      ...slipOptions(right, [a - b * k, right - k, right + diff]),
      hint: 'Em thay chữ bằng số. Biểu thức có dấu ngoặc thì em tính trong ngoặc trước.',
      solution: `Với a = ${fmt(a)}, b = ${fmt(b)}, k = ${k} thì (a − b) × k = (${fmt(a)} − ${fmt(b)}) × ${k} = ${fmt(diff)} × ${k} = ${fmt(right)}.`,
    };
  },
  'bai-hai-buoc': (rand) => {
    const women = int(rand, 3000, 15000);
    const men = women + int(rand, 2000, 20000);
    const total = women + men;
    const right = men - women;
    return {
      prompt: `Một trận bóng đá có ${fmt(total)} khán giả, trong đó có ${fmt(women)} khán giả nữ. Hỏi số khán giả nam nhiều hơn số khán giả nữ bao nhiêu người?`,
      ...slipOptions(right, [men, total + women, right + 1000]),
      hint: 'Trước hết em tìm số khán giả nam.',
      solution: `Số khán giả nam là: ${fmt(total)} − ${fmt(women)} = ${fmt(men)} (người). Số khán giả nam nhiều hơn số khán giả nữ là: ${fmt(men)} − ${fmt(women)} = ${fmt(right)} (người). Đáp số: ${fmt(right)} người.`,
    };
  },
  'bai-ba-buoc': (rand) => {
    const pen = int(rand, 6, 19) * 500;
    const book = int(rand, 8, 16) * 500;
    const count = int(rand, 3, 5);
    const books = book * count;
    const spent = pen + books;
    const note = 50000;
    const right = note - spent;
    return {
      prompt: `Mai mua 1 cái bút giá ${fmt(pen)} đồng và ${count} quyển vở, mỗi quyển giá ${fmt(book)} đồng. Mai đưa cô bán hàng tờ ${fmt(note)} đồng. Cô bán hàng trả lại Mai bao nhiêu tiền?`,
      ...slipOptions(right, [spent, note - pen - book, note - books]),
      hint: 'Bước 1: tính tiền mua vở. Bước 2: tính tiền Mai phải trả. Bước 3: tính tiền trả lại.',
      solution: `Mua ${count} quyển vở hết: ${fmt(book)} × ${count} = ${fmt(books)} (đồng). Mai phải trả: ${fmt(pen)} + ${fmt(books)} = ${fmt(spent)} (đồng). Cô bán hàng trả lại Mai: ${fmt(note)} − ${fmt(spent)} = ${fmt(right)} (đồng). Đáp số: ${fmt(right)} đồng.`,
    };
  },
};

/**
 * A round with one question of every part, shuffled.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {(keyof typeof KIND_LABELS)[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand), kind }));
}
