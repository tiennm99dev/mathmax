/**
 * Building and comparing numbers to 1 000 with place-value blocks, and the
 * review questions of this lesson. Pure and DOM-free; each skill is a
 * `KidSkill` for `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { capitalize, mixOptions, signOptions } from '#lib/core/kid/quiz.js';
import { nearOptions } from '../_shared/options.js';
import {
  PLACES,
  compareWhy,
  decidingPlace,
  placesOf,
  readTo1000,
  sumParts,
  sumText,
} from '../_shared/place.js';

/**
 * What a question shows above its options.
 * @typedef {(
 *   | { type: 'blocks', hundreds: number, tens: number, ones: number }
 *   | { type: 'sequence', items: number[], blank: number }
 * )} Visual
 */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

/**
 * A three-digit number, often with a zero in it, the numbers children misread.
 * @param {() => number} rand
 */
export function threeDigit(rand) {
  const h = int(rand, 1, 9);
  const shape = rand();
  if (shape < 0.3) return h * 100 + int(rand, 1, 9);
  if (shape < 0.45) return h * 100 + int(rand, 1, 9) * 10;
  return h * 100 + int(rand, 1, 9) * 10 + int(rand, 1, 9);
}

/**
 * A target number for the blocks, other than the last one.
 * @param {() => number} rand
 * @param {number} previous
 */
export function nextTarget(rand, previous) {
  for (;;) {
    const n = threeDigit(rand);
    if (n !== previous) return n;
  }
}

/**
 * What the blocks say about the target: which place to fix first, or the
 * number written out once it is right.
 * @param {number} value
 * @param {number} target
 * @returns {{ solved: boolean, text: string }}
 */
export function buildMessage(value, target) {
  const key = decidingPlace(value, target);
  if (key === null) {
    return {
      solved: true,
      text: `Đúng rồi! Số ${target} đọc là ${readTo1000(target)}. ${sumText(target)}.`,
    };
  }
  const place = PLACES.find((p) => p.key === key);
  const diff = placesOf(target)[key] - placesOf(value)[key];
  const words = `${Math.abs(diff)} ${place?.blockName}`;
  return {
    solved: false,
    text: `Em đang có số ${value}. Hàng ${place?.unit} ${diff > 0 ? `còn thiếu ${words}` : `thừa ${words}`}.`,
  };
}

/**
 * Two numbers to compare, close together so that each place gets its turn to
 * decide: another hundreds, the same hundreds with other tens, or only other
 * ones.
 * @param {() => number} rand
 * @returns {[number, number]}
 */
export function nextPair(rand) {
  const a = threeDigit(rand);
  const { hundreds, tens, ones } = placesOf(a);
  const shape = rand();
  const other = (/** @type {number} */ d) => {
    const v = int(rand, 0, 8);
    return v >= d ? v + 1 : v;
  };
  if (shape < 0.3) {
    const h = hundreds === 1 ? int(rand, 2, 9) : other(hundreds) || 1;
    return [a, h * 100 + int(rand, 0, 9) * 10 + int(rand, 0, 9)];
  }
  if (shape < 0.65) return [a, hundreds * 100 + other(tens) * 10 + int(rand, 0, 9)];
  if (shape < 0.9) return [a, hundreds * 100 + tens * 10 + other(ones)];
  return [a, a];
}

/**
 * The tens and ones swapped: 405 gives 450.
 * @param {number} n
 */
function swapEnds(n) {
  const { hundreds, tens, ones } = placesOf(n);
  return hundreds * 100 + ones * 10 + tens;
}

/**
 * Other three-digit numbers a child mixes `n` up with.
 * @param {() => number} rand
 * @param {number} n
 */
function mixUps(rand, n) {
  const { hundreds, tens, ones } = placesOf(n);
  const near = [
    swapEnds(n),
    tens * 100 + hundreds * 10 + ones,
    n + 10,
    n - 10,
    n + 1,
    n - 1,
    n + 100,
    n - 100,
  ];
  const kept = [...new Set(near)].filter((v) => v !== n && v >= 100 && v <= 999);
  return shuffle(rand, kept).slice(0, 3);
}

/** @type {ReviewSkill} */
const readWriteSkill = {
  id: 'doc-viet',
  label: 'Đọc, viết số',
  make(rand) {
    const n = threeDigit(rand);
    const others = mixUps(rand, n);
    if (rand() < 0.5) {
      return {
        prompt: `Số ${n} đọc là gì?`,
        ...mixOptions(
          rand,
          capitalize(readTo1000(n)),
          others.map((v) => capitalize(readTo1000(v))),
        ),
        hint: 'Em đọc từ trái sang phải: trăm, chục, đơn vị. Hàng chục là 0 thì đọc "linh".',
        solution: `Số ${n} đọc là: ${readTo1000(n)}.`,
      };
    }
    const values = [n, ...others].sort((x, y) => x - y);
    return {
      prompt: `Số "${readTo1000(n)}" viết là số nào?`,
      options: values.map(String),
      answer: values.indexOf(n),
      hint: 'Em viết lần lượt chữ số hàng trăm, hàng chục, hàng đơn vị. "Linh" nghĩa là hàng chục là 0.',
      solution: `"${capitalize(readTo1000(n))}" viết là ${n}.`,
    };
  },
};

/** @type {ReviewSkill} */
const blocksSkill = {
  id: 'khoi',
  label: 'Số theo trăm, chục, đơn vị',
  make(rand) {
    const n = threeDigit(rand);
    const { hundreds, tens, ones } = placesOf(n);
    const swapped = swapEnds(n);
    return {
      prompt: 'Hình vẽ cho biết số nào?',
      visual: { type: 'blocks', hundreds, tens, ones },
      ...nearOptions(rand, n, [swapped, tens * 100 + hundreds * 10 + ones], 999, 100),
      hint: 'Em đếm số tấm trăm, số thanh chục, rồi số khối đơn vị.',
      solution: `${hundreds} trăm, ${tens} chục, ${ones} đơn vị là số ${n}.`,
    };
  },
};

/** @type {ReviewSkill} */
const sumSkill = {
  id: 'cau-tao',
  label: 'Viết số thành tổng',
  make(rand) {
    let n = threeDigit(rand);
    while (sumParts(n).length < 2) n = threeDigit(rand);
    const { hundreds, tens, ones } = placesOf(n);
    const right = sumParts(n).join(' + ');
    if (rand() < 0.5) {
      const wrong = [
        [hundreds * 100, ones * 10, tens],
        [hundreds * 10, tens * 100, ones],
        [hundreds * 100, tens, ones * 10],
        [(hundreds === 9 ? 8 : hundreds + 1) * 100, tens * 10, ones],
        [hundreds * 100, (tens === 9 ? 8 : tens + 1) * 10, ones],
        [hundreds * 100, tens * 10, ones === 9 ? 8 : ones + 1],
      ]
        .filter((parts) => parts[0] + parts[1] + parts[2] !== n)
        .map((parts) => parts.filter((v) => v > 0).join(' + '));
      const distinct = [...new Set(wrong)].filter((w) => w !== right).slice(0, 3);
      return {
        prompt: `${n} viết thành tổng các trăm, chục, đơn vị là:`,
        ...mixOptions(rand, right, distinct),
        hint: `Em tìm chữ số hàng trăm của ${n}, rồi hàng chục, rồi hàng đơn vị.`,
        solution: `${n} gồm ${hundreds} trăm, ${tens} chục, ${ones} đơn vị. ${sumText(n)}.`,
      };
    }
    return {
      prompt: `${right} = ?`,
      ...nearOptions(rand, n, [swapEnds(n), n + 100, n - 100], 999, 100),
      hint: 'Em viết lần lượt chữ số hàng trăm, chục, đơn vị. Hàng nào không có thì viết 0.',
      solution: `${hundreds} trăm, ${tens} chục, ${ones} đơn vị là số ${n}.`,
    };
  },
};

/** @type {ReviewSkill} */
const neighbourSkill = {
  id: 'lien-truoc-sau',
  label: 'Số liền trước, số liền sau',
  make(rand) {
    const n = int(rand, 11, 998);
    const before = rand() < 0.5;
    const right = before ? n - 1 : n + 1;
    const word = before ? 'liền trước' : 'liền sau';
    return {
      prompt: `Số ${word} của ${n} là số nào?`,
      ...nearOptions(rand, right, [n, before ? n + 1 : n - 1, before ? n - 10 : n + 10], 1000, 1),
      hint: before
        ? 'Số liền trước: em lấy số đó trừ đi 1.'
        : 'Số liền sau: em lấy số đó cộng thêm 1.',
      solution: `${before ? `${n} − 1` : `${n} + 1`} = ${right}. Số ${word} của ${n} là ${right}.`,
    };
  },
};

/** @type {ReviewSkill} */
const sequenceSkill = {
  id: 'day-so',
  label: 'Số còn thiếu trong dãy',
  make(rand) {
    const step = pick(rand, [1, 10, 100]);
    const down = rand() < 0.3;
    const count = 5;
    const span = step * (count - 1);
    const lo = step === 100 ? int(rand, 1, 5) * 100 : int(rand, 101, 999 - span);
    const items = Array.from({ length: count }, (_, i) =>
      down ? lo + span - i * step : lo + i * step,
    );
    const blank = int(rand, 1, count - 2);
    const right = items[blank];
    return {
      prompt: 'Số nào thay được dấu "?" trong dãy?',
      visual: { type: 'sequence', items, blank },
      ...nearOptions(rand, right, [right + step + 1, right - step - 1, right + 2 * step], 1000, 1),
      hint: 'Em so sánh hai số đứng cạnh nhau: dãy cứ tăng hay giảm bao nhiêu?',
      solution: `Mỗi số ${down ? 'kém' : 'hơn'} số trước ${step} đơn vị, nên số còn thiếu là ${right}.`,
    };
  },
};

/** @type {ReviewSkill} */
const compareSkill = {
  id: 'so-sanh',
  label: 'So sánh số',
  make(rand) {
    if (rand() < 0.3) {
      const n = threeDigit(rand);
      const parts = sumParts(n);
      if (parts.length > 1) {
        const m = pick(rand, [n, n, n - 1, Math.min(n + 1, 999)]);
        const sign = compareSign(n, m);
        return {
          prompt: `Điền dấu: ${parts.join(' + ')} ? ${m}`,
          ...signOptions(sign),
          hint: 'Em viết tổng thành một số, rồi so sánh từng hàng.',
          solution: `${parts.join(' + ')} = ${n}. ${compareWhy(n, m)}`,
        };
      }
    }
    const [a, b] = nextPair(rand);
    const sign = compareSign(a, b);
    return {
      prompt: `Điền dấu: ${a} ? ${b}`,
      ...signOptions(sign),
      hint: 'Em so sánh hàng trăm trước. Bằng nhau thì so sánh hàng chục, rồi hàng đơn vị.',
      solution: compareWhy(a, b),
    };
  },
};

/** @type {ReviewSkill} */
const orderSkill = {
  id: 'sap-xep',
  label: 'Lớn nhất, bé nhất, sắp xếp',
  make(rand) {
    const digits = shuffle(rand, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
    const [x, y, z] = digits;
    const numbers = shuffle(rand, [
      x * 100 + y * 10 + z,
      x * 100 + z * 10 + y,
      y * 100 + x * 10 + z,
      y * 100 + z * 10 + x,
    ]);
    const up = [...numbers].sort((p, q) => p - q);
    const line = (/** @type {number[]} */ list) => list.join('; ');
    const shape = rand();
    if (shape < 0.34) {
      return {
        prompt: 'Dãy nào xếp các số từ bé đến lớn?',
        ...mixOptions(rand, line(up), [
          line([...up].reverse()),
          line([up[1], up[0], up[2], up[3]]),
          line([up[0], up[1], up[3], up[2]]),
        ]),
        hint: 'Số bé nhất đứng đầu. Em so sánh hàng trăm trước, rồi hàng chục.',
        solution: `Từ bé đến lớn: ${line(up)}.`,
      };
    }
    const largest = shape < 0.67;
    const right = largest ? up[3] : up[0];
    return {
      prompt: `Trong các số ${line(numbers)}, số ${largest ? 'lớn nhất' : 'bé nhất'} là số nào?`,
      options: up.map(String),
      answer: up.indexOf(right),
      hint: 'Em so sánh hàng trăm trước. Hàng trăm bằng nhau thì so sánh hàng chục.',
      solution: `Từ bé đến lớn: ${line(up)}. Số ${largest ? 'lớn nhất' : 'bé nhất'} là ${right}.`,
    };
  },
};

/** The parts of this review. */
export const SKILLS = [
  readWriteSkill,
  blocksSkill,
  sumSkill,
  neighbourSkill,
  sequenceSkill,
  compareSkill,
  orderSkill,
];
