/**
 * The adaptive review of multiplying and dividing within 100 000: in the
 * head with whole thousands, in columns, the remainder, checking a worked
 * result, the missing number, expressions, "gấp, giảm" and word problems.
 * Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { columnWords, divText, divWords, forgotMulCarry } from './columns.js';
import { dong, valueOptions, withRest } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').ReviewQuestion} ReviewQuestion */

/** @type {ReviewSkill} */
export const headMulDiv = {
  id: 'nham-nhan-chia',
  label: 'Nhân, chia nhẩm số tròn nghìn',
  make(rand) {
    for (;;) {
      const k = int(rand, 2, 30);
      const b = int(rand, 2, 9);
      if (k * b > 99) continue;
      const whole = k * 1000;
      if (rand() < 0.5) {
        const right = whole * b;
        return {
          prompt: `Tính nhẩm: ${fmt(whole)} × ${b} = ?`,
          ...valueOptions(right, [k * b * 100, whole + b * 1000, right + 10000], { step: 1000 }),
          hint: `Em nhẩm: ${k} nghìn × ${b} = mấy nghìn?`,
          solution: `${k} nghìn × ${b} = ${k * b} nghìn. Vậy ${fmt(whole)} × ${b} = ${fmt(right)}.`,
        };
      }
      const n = whole * b;
      return {
        prompt: `Tính nhẩm: ${fmt(n)} : ${b} = ?`,
        ...valueOptions(whole, [k * 100, n - b * 1000, whole + 10000], { step: 1000 }),
        hint: `Em nhẩm: ${k * b} nghìn : ${b} = mấy nghìn?`,
        solution: `${k * b} nghìn : ${b} = ${k} nghìn. Vậy ${fmt(n)} : ${b} = ${fmt(whole)}.`,
      };
    }
  },
};

/**
 * A four- or five-digit number times a digit, with at least one carry and a
 * product within 100 000.
 * @param {() => number} rand
 */
export function drawProduct(rand) {
  for (;;) {
    const b = int(rand, 2, 9);
    const a = int(rand, 1001, Math.floor(99999 / b));
    if (a % 10 > 0 && forgotMulCarry(a, b) !== a * b) return { a, b };
  }
}

/**
 * A four- or five-digit number divided by a digit, even or with a remainder.
 * @param {() => number} rand
 */
export function drawDivision(rand) {
  return { n: int(rand, 1000, 99999), d: int(rand, 2, 9) };
}

/** @type {ReviewSkill} */
export const mulColumns = {
  id: 'nhan-dat-tinh',
  label: 'Đặt tính rồi tính nhân',
  make(rand) {
    const { a, b } = drawProduct(rand);
    const right = a * b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} × ${b} = ?`,
      visual: { type: 'column', op: '×', a, b },
      ...valueOptions(right, [forgotMulCarry(a, b), right + 10, right - 100]),
      hint: 'Em nhân từ hàng đơn vị. Nhớ thêm số đã nhớ vào hàng tiếp theo.',
      solution: columnWords('×', a, b),
    };
  },
};

/** @type {ReviewSkill} */
export const divColumns = {
  id: 'chia-dat-tinh',
  label: 'Đặt tính rồi tính chia',
  make(rand) {
    const { n, d } = drawDivision(rand);
    const q = Math.floor(n / d);
    const rest = n % d;
    const off = rest + 1 < d ? rest + 1 : rest - 1;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(n)} : ${d} = ?`,
      visual: { type: 'div', n, d },
      ...mixOptions(rand, withRest(q, rest), [
        withRest(q + 1, rest),
        withRest(q + 10, rest),
        rest > 0 ? withRest(q, off) : withRest(q - 1, d),
      ]),
      hint: `Em chia từ trái sang phải. Số dư phải bé hơn ${d}.`,
      solution: divWords(n, d),
    };
  },
};

/** @type {ReviewSkill} */
export const remainderSkill = {
  id: 'so-du',
  label: 'Tìm số dư',
  make(rand) {
    for (;;) {
      const { n, d } = drawDivision(rand);
      const rest = n % d;
      if (rest === 0 || d < 3) continue;
      return {
        prompt: `Phép chia ${fmt(n)} : ${d} có số dư là bao nhiêu?`,
        visual: { type: 'div', n, d },
        ...valueOptions(rest, [d, rest - 1, d + rest]),
        hint: `Số dư luôn bé hơn số chia, tức là bé hơn ${d}.`,
        solution: `${divText(n, d)}. Số dư là ${rest}.`,
      };
    }
  },
};

/** @type {ReviewSkill} */
export const checkMulDiv = {
  id: 'dung-sai-nhan-chia',
  label: 'Đúng hay sai',
  make(rand) {
    if (rand() < 0.5) {
      const { a, b } = drawProduct(rand);
      const wrong = rand() < 0.5;
      return {
        prompt: `Phép tính này đúng hay sai? ${fmt(a)} × ${b} = ${fmt(wrong ? forgotMulCarry(a, b) : a * b)}`,
        visual: { type: 'column', op: '×', a, b },
        options: ['Đúng', 'Sai'],
        answer: wrong ? 1 : 0,
        hint: 'Em nhân lại từ hàng đơn vị. Đừng quên số đã nhớ.',
        solution: wrong
          ? `Sai, vì phép tính đã quên số nhớ. ${fmt(a)} × ${b} = ${fmt(a * b)}.`
          : `Đúng. ${columnWords('×', a, b)}`,
      };
    }
    for (;;) {
      const { n, d } = drawDivision(rand);
      const q = Math.floor(n / d);
      const rest = n % d;
      if (rand() < 0.5) {
        return {
          prompt: `Phép tính này đúng hay sai? ${divText(n, d)}`,
          visual: { type: 'div', n, d },
          options: ['Đúng', 'Sai'],
          answer: 0,
          hint: 'Em nhân thương với số chia, rồi cộng số dư.',
          solution: `Đúng. ${divWords(n, d)}`,
        };
      }
      if (rest === 0 || q < 2) continue;
      return {
        prompt: `Phép tính này đúng hay sai? ${fmt(n)} : ${d} = ${fmt(q - 1)} (dư ${rest + d})`,
        visual: { type: 'div', n, d },
        options: ['Đúng', 'Sai'],
        answer: 1,
        hint: 'Em so sánh số dư với số chia.',
        solution: `Sai, vì số dư ${rest + d} không bé hơn số chia ${d}. ${divText(n, d)}.`,
      };
    }
  },
};

/** @type {ReviewSkill} */
export const missingMulDiv = {
  id: 'tim-thanh-phan-nhan-chia',
  label: 'Tìm thành phần chưa biết',
  make(rand) {
    const shape = pick(rand, /** @type {const} */ (['thua-so', 'so-bi-chia', 'so-chia']));
    const b = int(rand, 2, 9);
    if (shape === 'thua-so') {
      const right = int(rand, 1001, Math.floor(99999 / b));
      const product = right * b;
      return {
        prompt: `Tìm số thích hợp thay cho dấu ?: ? × ${b} = ${fmt(product)}`,
        ...valueOptions(right, [product - b, right + 1000, right - 10]),
        hint: 'Muốn tìm thừa số, em lấy tích chia cho thừa số kia.',
        solution: `? = ${fmt(product)} : ${b} = ${fmt(right)}.`,
      };
    }
    if (shape === 'so-bi-chia') {
      const q = int(rand, 1001, Math.floor(99999 / b));
      const right = q * b;
      return {
        prompt: `Tìm số thích hợp thay cho dấu ?: ? : ${b} = ${fmt(q)}`,
        ...valueOptions(right, [q + b, right + 1000, right - 10]),
        hint: 'Muốn tìm số bị chia, em lấy thương nhân với số chia.',
        solution: `? = ${fmt(q)} × ${b} = ${fmt(right)}.`,
      };
    }
    const q = int(rand, 101, Math.floor(99999 / b));
    const n = q * b;
    return {
      prompt: `Tìm số thích hợp thay cho dấu ?: ${fmt(n)} : ? = ${fmt(q)}`,
      ...valueOptions(b, [b + 2, b - 1, b + 1]),
      hint: 'Muốn tìm số chia, em lấy số bị chia chia cho thương.',
      solution: `? = ${fmt(n)} : ${fmt(q)} = ${b}.`,
    };
  },
};

/**
 * An expression with × or : worked out line by line.
 * @param {string} text the expression
 * @param {string} middle the line after the first step
 * @param {number} right its value
 * @param {number} slip the value a wrong order gives
 * @param {string} rule how to order the work
 * @returns {ReviewQuestion}
 */
function expressionQuestion(text, middle, right, slip, rule) {
  return {
    prompt: `Tính giá trị của biểu thức: ${text}`,
    ...valueOptions(right, [slip, right + 1000, right - 10]),
    hint: rule,
    solution: `${text} = ${middle} = ${fmt(right)}.`,
  };
}

const MUL_FIRST = 'Em làm phép nhân, phép chia trước, phép cộng, phép trừ sau.';
const BRACKETS_FIRST = 'Có dấu ngoặc: em tính trong ngoặc trước.';
const LEFT_TO_RIGHT = 'Chỉ có phép nhân, phép chia: em tính từ trái sang phải.';

/** @type {ReviewSkill} */
export const expressionMulDiv = {
  id: 'bieu-thuc-nhan-chia',
  label: 'Tính giá trị biểu thức',
  make(rand) {
    const shape = int(rand, 0, 4);
    if (shape === 0) {
      const b = int(rand, 2, 9);
      const a = int(rand, 1001, Math.floor(99999 / b));
      const c = int(rand, 100, Math.min(9999, a * b - 1));
      return expressionQuestion(
        `${fmt(a)} × ${b} − ${fmt(c)}`,
        `${fmt(a * b)} − ${fmt(c)}`,
        a * b - c,
        a * b + c,
        MUL_FIRST,
      );
    }
    if (shape === 1) {
      const d = int(rand, 2, 9);
      const q = int(rand, 1001, 9999);
      const c = int(rand, 1, 90) * 100;
      return expressionQuestion(
        `${fmt(q * d)} : ${d} + ${fmt(c)}`,
        `${fmt(q)} + ${fmt(c)}`,
        q + c,
        q * d + c,
        MUL_FIRST,
      );
    }
    if (shape === 2) {
      const c = int(rand, 2, 9);
      const a = int(rand, 101, 5000);
      const b = int(rand, 101, Math.floor(99999 / c) - a);
      return expressionQuestion(
        `(${fmt(a)} + ${fmt(b)}) × ${c}`,
        `${fmt(a + b)} × ${c}`,
        (a + b) * c,
        a + b * c,
        BRACKETS_FIRST,
      );
    }
    if (shape === 3) {
      const a = int(rand, 2, 4);
      const b = 2;
      const q = int(rand, 1001, Math.floor(99999 / (a * b)));
      const n = q * a * b;
      return expressionQuestion(
        `${fmt(n)} : (${a} × ${b})`,
        `${fmt(n)} : ${a * b}`,
        q,
        (n / a) * b,
        BRACKETS_FIRST,
      );
    }
    const a = int(rand, 101, 9999);
    const b = int(rand, 2, 9);
    const c = pick(
      rand,
      [2, 3, 4, 5, 6].filter((v) => v !== b),
    );
    const k = Math.ceil(a / c) * c;
    if (k * b > 99999) return expressionMulDiv.make(rand);
    return expressionQuestion(
      `${fmt(k)} × ${b} : ${c}`,
      `${fmt(k * b)} : ${c}`,
      (k * b) / c,
      k * b,
      LEFT_TO_RIGHT,
    );
  },
};

/** @type {ReviewSkill} */
export const timesSkill = {
  id: 'gap-giam',
  label: 'Gấp lên, giảm đi một số lần',
  make(rand) {
    const k = int(rand, 2, 9);
    if (rand() < 0.5) {
      const n = int(rand, 101, Math.floor(99999 / k));
      const right = n * k;
      return {
        prompt: `Gấp số ${fmt(n)} lên ${k} lần được số nào?`,
        ...valueOptions(right, [n + k, right + 10, right - 100]),
        hint: 'Muốn gấp một số lên nhiều lần, em lấy số đó nhân với số lần.',
        solution: `${fmt(n)} × ${k} = ${fmt(right)}.`,
      };
    }
    const right = int(rand, 101, Math.floor(99999 / k));
    const n = right * k;
    return {
      prompt: `Giảm số ${fmt(n)} đi ${k} lần được số nào?`,
      ...valueOptions(right, [n - k, right + 10, right - 100]),
      hint: 'Muốn giảm một số đi nhiều lần, em lấy số đó chia cho số lần.',
      solution: `${fmt(n)} : ${k} = ${fmt(right)}.`,
    };
  },
};

/**
 * Father and child: how many times as old.
 * @param {number} child
 * @param {number} times
 * @returns {ReviewQuestion}
 */
export function ageStory(child, times) {
  const father = child * times;
  const more = father - child;
  return {
    prompt: `Năm nay Nam ${child} tuổi, bố hơn Nam ${more} tuổi. Hỏi tuổi bố gấp mấy lần tuổi Nam?`,
    ...valueOptions(times, [more, father, times + 1]),
    hint: 'Em tìm tuổi bố trước. Rồi lấy tuổi bố chia cho tuổi Nam.',
    solution: `Tuổi bố: ${child} + ${more} = ${father} (tuổi). ${father} : ${child} = ${times}. Tuổi bố gấp ${times} lần tuổi Nam.`,
  };
}

/**
 * The price of one kilogram, then of some kilograms.
 * @param {number} each price of 1 kg
 * @param {number} bought kilograms in the first bag
 * @param {number} want kilograms asked about
 * @returns {ReviewQuestion}
 */
export function riceStory(each, bought, want) {
  const paid = each * bought;
  const right = each * want;
  return {
    prompt: `Cô Hoa mua ${bought} kg gạo hết ${dong(paid)}. Nếu mua ${want} kg gạo như thế thì hết bao nhiêu tiền?`,
    ...valueOptions(right, [paid * want, each, right + 1000], { step: 1000, write: dong }),
    hint: 'Em tìm giá tiền của 1 kg gạo trước.',
    solution: `1 kg gạo giá: ${fmt(paid)} : ${bought} = ${fmt(each)} (đồng). ${want} kg gạo giá: ${fmt(each)} × ${want} = ${fmt(right)} (đồng).`,
  };
}

/**
 * Bricks still to buy after some equal loads.
 * @param {number} need
 * @param {number} each
 * @param {number} loads
 * @returns {ReviewQuestion}
 */
export function brickStory(need, each, loads) {
  const got = each * loads;
  const right = need - got;
  return {
    prompt: `Để xây nhà, bác Ba cần ${fmt(need)} viên gạch. Bác đã mua ${loads} lần, mỗi lần ${fmt(each)} viên. Bác còn phải mua thêm bao nhiêu viên gạch?`,
    ...valueOptions(right, [need - each, got, right + 1000], { step: 100 }),
    hint: 'Em tìm số gạch bác đã mua trong cả mấy lần trước.',
    solution: `Đã mua: ${fmt(each)} × ${loads} = ${fmt(got)} (viên). Còn phải mua: ${fmt(need)} − ${fmt(got)} = ${fmt(right)} (viên).`,
  };
}

/** @type {ReviewSkill} */
export const storyMulDiv = {
  id: 'bai-toan-nhan-chia',
  label: 'Bài toán có lời văn',
  make(rand) {
    const kind = int(rand, 0, 2);
    if (kind === 0) return ageStory(int(rand, 6, 10), int(rand, 3, 5));
    if (kind === 1) {
      const bought = int(rand, 3, 5);
      const want = pick(
        rand,
        [2, 3, 4].filter((w) => w !== bought),
      );
      return riceStory(int(rand, 12, 19) * 1000, bought, want);
    }
    const loads = int(rand, 2, 4);
    const each = int(rand, 100, 200) * 100;
    return brickStory(each * loads + int(rand, 20, 150) * 100, each, loads);
  },
};

/** The parts of the review of multiplying and dividing. */
export const MUL_DIV_SKILLS = [
  headMulDiv,
  mulColumns,
  divColumns,
  remainderSkill,
  checkMulDiv,
  missingMulDiv,
  expressionMulDiv,
  timesSkill,
  storyMulDiv,
];
