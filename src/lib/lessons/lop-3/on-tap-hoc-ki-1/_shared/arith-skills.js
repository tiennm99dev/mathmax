/**
 * The adaptive review of multiplying and dividing within 100 and 1 000: in the
 * head and in columns, the remainder, checking a worked result, finding the
 * missing number, and word problems. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { divText, divWords, forgotCarry, mulWords } from './columns.js';
import { valueOptions, withRest } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').ReviewQuestion} ReviewQuestion */

/**
 * In-the-head work with whole tens or hundreds.
 * @param {() => number} rand
 * @param {number} size 10 or 100
 * @param {string} word 'chục' or 'trăm'
 * @returns {ReviewQuestion}
 */
function headQuestion(rand, size, word) {
  for (;;) {
    const t = int(rand, 1, 5);
    const b = int(rand, 2, 9);
    if (t * b > 10) continue;
    const whole = t * size;
    if (rand() < 0.5) {
      const right = whole * b;
      return {
        prompt: `Tính nhẩm: ${fmt(whole)} × ${b} = ?`,
        ...valueOptions(right, [t * b, whole + b, right + size]),
        hint: `Em nhẩm: ${t} ${word} × ${b} = mấy ${word}?`,
        solution: `${t} ${word} × ${b} = ${t * b} ${word}. Vậy ${fmt(whole)} × ${b} = ${fmt(right)}.`,
      };
    }
    const n = whole * b;
    return {
      prompt: `Tính nhẩm: ${fmt(n)} : ${b} = ?`,
      ...valueOptions(whole, [t, n - b, whole + size]),
      hint: `Em nhẩm: ${t * b} ${word} : ${b} = mấy ${word}?`,
      solution: `${t * b} ${word} : ${b} = ${t} ${word}. Vậy ${fmt(n)} : ${b} = ${fmt(whole)}.`,
    };
  }
}

/**
 * A multiplication set out in columns.
 * @param {number} a
 * @param {number} b
 * @returns {ReviewQuestion}
 */
function mulQuestion(a, b) {
  const right = a * b;
  return {
    prompt: `Đặt tính rồi tính: ${a} × ${b} = ?`,
    visual: { type: 'mul', a, b },
    ...valueOptions(right, [forgotCarry(a, b), right + 10, right - 10]),
    hint: 'Em nhân từ hàng đơn vị. Nhớ thêm số đã nhớ vào hàng tiếp theo.',
    solution: mulWords(a, b),
  };
}

/**
 * A division set out in columns.
 * @param {() => number} rand
 * @param {number} n
 * @param {number} d
 * @returns {ReviewQuestion}
 */
function divQuestion(rand, n, d) {
  const q = Math.floor(n / d);
  const rest = n % d;
  const right = withRest(q, rest);
  const off = rest + 1 < d ? rest + 1 : rest - 1;
  return {
    prompt: `Đặt tính rồi tính: ${n} : ${d} = ?`,
    visual: { type: 'div', n, d },
    ...mixOptions(rand, right, [
      withRest(q + 1, rest),
      withRest(q + 10, rest),
      rest > 0 ? withRest(q, off) : withRest(q - 1, d),
    ]),
    hint: `Em chia từ trái sang phải. Số dư phải bé hơn ${d}.`,
    solution: divWords(n, d),
  };
}

/**
 * A two-digit number times a digit, within 100.
 * @param {() => number} rand
 */
export function drawSmallProduct(rand) {
  for (;;) {
    const a = int(rand, 11, 49);
    const b = int(rand, 2, 9);
    if (a * b <= 100 && a % 10 > 0) return { a, b };
  }
}

/**
 * A multiplication with a product from 100 to 999.
 * @param {() => number} rand
 */
export function drawBigProduct(rand) {
  for (;;) {
    const a = int(rand, 51, 499);
    const b = int(rand, 2, 9);
    if (a * b >= 100 && a * b <= 999 && a % 10 > 0) return { a, b };
  }
}

/**
 * A three-digit division by a digit, even or with a remainder.
 * @param {() => number} rand
 */
export function drawBigDivision(rand) {
  return { n: int(rand, 100, 999), d: int(rand, 2, 9) };
}

/** @type {ReviewSkill} */
export const headTens = {
  id: 'nham-chuc',
  label: 'Nhân, chia nhẩm số tròn chục',
  make: (rand) => headQuestion(rand, 10, 'chục'),
};

/** @type {ReviewSkill} */
export const headHundreds = {
  id: 'nham-tram',
  label: 'Nhân, chia nhẩm số tròn trăm',
  make: (rand) => headQuestion(rand, 100, 'trăm'),
};

/** @type {ReviewSkill} */
export const mulWithin100 = {
  id: 'nhan-100',
  label: 'Nhân trong phạm vi 100',
  make(rand) {
    const { a, b } = drawSmallProduct(rand);
    return mulQuestion(a, b);
  },
};

/** @type {ReviewSkill} */
export const divWithin100 = {
  id: 'chia-100',
  label: 'Chia số có hai chữ số',
  make(rand) {
    const d = int(rand, 2, 9);
    return divQuestion(rand, int(rand, d * 10, 99), d);
  },
};

/** @type {ReviewSkill} */
export const mulWithin1000 = {
  id: 'nhan-1000',
  label: 'Nhân trong phạm vi 1 000',
  make(rand) {
    const { a, b } = drawBigProduct(rand);
    return mulQuestion(a, b);
  },
};

/** @type {ReviewSkill} */
export const divWithin1000 = {
  id: 'chia-1000',
  label: 'Chia số có ba chữ số',
  make(rand) {
    const { n, d } = drawBigDivision(rand);
    return divQuestion(rand, n, d);
  },
};

/** @type {ReviewSkill} */
export const remainder = {
  id: 'so-du',
  label: 'Tìm số dư',
  make(rand) {
    for (;;) {
      const d = int(rand, 3, 9);
      const n = int(rand, 30, 999);
      const rest = n % d;
      if (rest === 0) continue;
      return {
        prompt: `Phép chia ${n} : ${d} có số dư là bao nhiêu?`,
        visual: { type: 'div', n, d },
        ...valueOptions(rest, [d, rest - 1, d + rest]),
        hint: `Số dư luôn bé hơn số chia, tức là bé hơn ${d}.`,
        solution: `${divText(n, d)}. Số dư là ${rest}.`,
      };
    }
  },
};

/**
 * A worked result that is wrong the way children get it wrong: a forgotten
 * carry, or a remainder not below the divisor.
 * @param {() => number} rand
 * @returns {ReviewQuestion}
 */
function wrongWork(rand) {
  if (rand() < 0.5) {
    for (;;) {
      const { a, b } = drawBigProduct(rand);
      const slip = forgotCarry(a, b);
      if (slip === a * b) continue;
      return {
        prompt: `Phép tính này đúng hay sai? ${a} × ${b} = ${slip}`,
        visual: { type: 'mul', a, b },
        options: ['Đúng', 'Sai'],
        answer: 1,
        hint: 'Em nhân lại từ hàng đơn vị. Đừng quên số đã nhớ.',
        solution: `Sai, vì phép tính đã quên số nhớ. ${a} × ${b} = ${a * b}.`,
      };
    }
  }
  for (;;) {
    const { n, d } = drawBigDivision(rand);
    const q = Math.floor(n / d);
    const rest = n % d;
    if (rest === 0 || q < 2) continue;
    return {
      prompt: `Phép tính này đúng hay sai? ${n} : ${d} = ${q - 1} (dư ${rest + d})`,
      visual: { type: 'div', n, d },
      options: ['Đúng', 'Sai'],
      answer: 1,
      hint: 'Em so sánh số dư với số chia.',
      solution: `Sai, vì số dư ${rest + d} không bé hơn số chia ${d}. ${divText(n, d)}.`,
    };
  }
}

/** @type {ReviewSkill} */
export const checkWork = {
  id: 'dung-sai',
  label: 'Đúng hay sai',
  make(rand) {
    if (rand() < 0.5) return wrongWork(rand);
    if (rand() < 0.5) {
      const { a, b } = drawBigProduct(rand);
      return {
        prompt: `Phép tính này đúng hay sai? ${a} × ${b} = ${a * b}`,
        visual: { type: 'mul', a, b },
        options: ['Đúng', 'Sai'],
        answer: 0,
        hint: 'Em nhân lại từ hàng đơn vị. Đừng quên số đã nhớ.',
        solution: `Đúng. ${mulWords(a, b)}`,
      };
    }
    const { n, d } = drawBigDivision(rand);
    return {
      prompt: `Phép tính này đúng hay sai? ${divText(n, d)}`,
      visual: { type: 'div', n, d },
      options: ['Đúng', 'Sai'],
      answer: 0,
      hint: 'Em nhân thương với số chia, rồi cộng số dư.',
      solution: `Đúng. ${divWords(n, d)}`,
    };
  },
};

/** @type {ReviewSkill} */
export const missingNumber = {
  id: 'tim-thanh-phan',
  label: 'Tìm thành phần chưa biết',
  make(rand) {
    const shape = pick(rand, /** @type {const} */ (['thua-so', 'so-bi-chia', 'so-chia']));
    if (shape === 'thua-so') {
      const b = int(rand, 2, 9);
      const right = int(rand, 11, Math.floor(999 / b));
      const product = right * b;
      return {
        prompt: `Tìm số thích hợp thay cho dấu ?: ? × ${b} = ${product}`,
        ...valueOptions(right, [product - b, product * b, right + 10]),
        hint: 'Muốn tìm thừa số, em lấy tích chia cho thừa số kia.',
        solution: `? = ${product} : ${b} = ${right}.`,
      };
    }
    if (shape === 'so-bi-chia') {
      const d = int(rand, 2, 9);
      const q = int(rand, 11, Math.floor(999 / d));
      const right = q * d;
      return {
        prompt: `Tìm số thích hợp thay cho dấu ?: ? : ${d} = ${q}`,
        ...valueOptions(right, [q + d, right + 10, right - 10]),
        hint: 'Muốn tìm số bị chia, em lấy thương nhân với số chia.',
        solution: `? = ${q} × ${d} = ${right}.`,
      };
    }
    const right = int(rand, 2, 9);
    const q = int(rand, 2, 9);
    return {
      prompt: `Tìm số thích hợp thay cho dấu ?: ${right * q} : ? = ${q}`,
      ...valueOptions(right, [right * q - q, right * q * q, q]),
      hint: 'Muốn tìm số chia, em lấy số bị chia chia cho thương.',
      solution: `? = ${right * q} : ${q} = ${right}.`,
    };
  },
};

/**
 * Children on buses, the book's way.
 * @param {number} each
 * @param {number} buses
 * @returns {ReviewQuestion}
 */
export function busStory(each, buses) {
  const right = each * buses;
  return {
    prompt: `Có ${buses} xe ô tô, mỗi xe chở ${each} học sinh. Hỏi tất cả có bao nhiêu học sinh?`,
    ...valueOptions(right, [each + buses, right - each, right + 10]),
    hint: `Có ${buses} xe như nhau: em làm phép nhân.`,
    solution: `${each} × ${buses} = ${right}. Có ${right} học sinh.`,
  };
}

/**
 * Pouring into cans: what is left over still needs one more can.
 * @param {number} total
 * @param {number} size
 * @returns {ReviewQuestion}
 */
export function canStory(total, size) {
  const q = Math.floor(total / size);
  const rest = total % size;
  const right = q + (rest > 0 ? 1 : 0);
  return {
    prompt: `Có ${total} l nước mắm. Cần ít nhất bao nhiêu can loại ${size} l để chứa hết?`,
    ...valueOptions(right, [q, q + 2, q - 1]),
    hint: 'Em làm phép chia. Nếu còn thừa nước mắm thì cần có thêm can để đựng.',
    solution:
      rest > 0
        ? `${total} : ${size} = ${q} (dư ${rest}). ${q} can còn thừa ${rest} l, nên cần thêm 1 can. Cần ít nhất ${right} can.`
        : `${total} : ${size} = ${q}. Cần ít nhất ${q} can.`,
  };
}

/**
 * Packing cakes into boxes.
 * @param {number} cakes
 * @param {number} each
 * @returns {ReviewQuestion}
 */
export function cakeStory(cakes, each) {
  const right = cakes / each;
  return {
    prompt: `Có ${cakes} cái bánh xếp vào các hộp, mỗi hộp ${each} cái. Xếp được bao nhiêu hộp?`,
    ...valueOptions(right, [right + 10, right - 10, cakes - each]),
    hint: `Mỗi hộp có ${each} cái: em làm phép chia.`,
    solution: `${cakes} : ${each} = ${right}. Xếp được ${right} hộp.`,
  };
}

/**
 * Two children picking flowers, one some times as many as the other.
 * @param {number} first
 * @param {number} times
 * @returns {ReviewQuestion}
 */
export function flowerStory(first, times) {
  const second = first * times;
  const right = first + second;
  return {
    prompt: `Mi hái được ${first} bông hoa. Mai hái được số hoa gấp ${times} lần Mi. Cả hai bạn hái được bao nhiêu bông hoa?`,
    ...valueOptions(right, [second, first + times, right + 10]),
    hint: 'Em tìm số hoa của Mai trước, rồi cộng với số hoa của Mi.',
    solution: `Mai hái được: ${first} × ${times} = ${second} (bông). Cả hai hái được: ${second} + ${first} = ${right} (bông).`,
  };
}

/** @type {ReviewSkill} */
export const arithStory = {
  id: 'bai-toan-nhan-chia',
  label: 'Giải bài toán',
  make(rand) {
    const kind = int(rand, 0, 3);
    if (kind === 0) return busStory(int(rand, 25, 49), 2);
    if (kind === 1) {
      const size = pick(rand, [4, 5]);
      return canStory(int(rand, 3, 9) * size + int(rand, 1, size - 1), size);
    }
    if (kind === 2) {
      const each = pick(rand, [4, 6, 8]);
      return cakeStory(int(rand, 12, 40) * each, each);
    }
    const times = pick(rand, [2, 3]);
    return flowerStory(int(rand, 15, 30), times);
  },
};

/** The parts of the review of multiplying and dividing. */
export const ARITH_SKILLS = [
  headTens,
  headHundreds,
  mulWithin100,
  divWithin100,
  mulWithin1000,
  divWithin1000,
  remainder,
  checkWork,
  missingNumber,
  arithStory,
];
