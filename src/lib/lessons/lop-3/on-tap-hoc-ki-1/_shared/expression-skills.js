/**
 * The adaptive review of number expressions: the three rules of order, which
 * operation comes first, comparing values, choosing a sign, and word problems
 * solved with an expression. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { compute, firstOp, leftToRightSlip, valueOf, workText } from './expression.js';
import { valueOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').ReviewQuestion} ReviewQuestion */

/**
 * A question on an expression's value.
 * @param {string} text
 * @param {string} hint
 * @returns {ReviewQuestion}
 */
export function valueQuestion(text, hint) {
  const right = valueOf(text);
  return {
    prompt: `Tính giá trị của biểu thức: ${text}.`,
    visual: { type: 'work', text },
    ...valueOptions(right, [leftToRightSlip(text), right + 10, right - 10]),
    hint,
    solution: `${workText(text)}.`,
  };
}

/**
 * Adding and subtracting only.
 * @param {() => number} rand
 */
export function drawAddSub(rand) {
  if (rand() < 0.5) {
    const a = int(rand, 15, 80);
    const b = int(rand, 11, 60);
    return `${a} + ${b} − ${int(rand, 5, a + b - 1)}`;
  }
  const a = int(rand, 150, 900);
  const b = int(rand, 20, a - 1);
  return `${a} − ${b} + ${int(rand, 5, 60)}`;
}

/**
 * Multiplying and dividing only, with a whole value.
 * @param {() => number} rand
 */
export function drawMulDiv(rand) {
  const d = int(rand, 2, 9);
  if (rand() < 0.5) return `${d * int(rand, 2, 17)} : ${d} × ${int(rand, 2, 5)}`;
  return `${d * int(rand, 2, 11)} × ${int(rand, 2, 3)} : ${d}`;
}

/**
 * Multiplying or dividing to do before adding or subtracting.
 * @param {() => number} rand
 */
export function drawStrong(rand) {
  const b = int(rand, 2, 9);
  const c = int(rand, 2, 19);
  return pick(rand, [
    `${b} × ${c} + ${int(rand, 10, 80)}`,
    `${b * c + int(rand, 5, 90)} − ${b} × ${c}`,
    `${b * c} : ${b} + ${int(rand, 10, 90)}`,
    `${int(rand, 100, 400)} + ${b * c} : ${b}`,
  ]);
}

/**
 * An expression with brackets, whose value is a whole number that is not
 * negative.
 * @param {() => number} rand
 */
export function drawBrackets(rand) {
  const big = int(rand, 20, 90);
  const small = int(rand, 11, big - 1);
  const d = int(rand, 2, 4);
  const m = int(rand, 2, 4);
  return pick(rand, [
    `${int(rand, 11, 90)} + (${big} + ${small})`,
    `${big + small + int(rand, 1, 90)} − (${big} − ${small})`,
    `${d * m * int(rand, 2, 12)} : (${d} × ${m})`,
    `${int(rand, 2, 9)} × (${d * m * 2} : ${d})`,
    `${d} × (${big} − ${small})`,
    `(${big * 2 - small} + ${small}) : 2`,
    `(${small} + ${int(rand, 5, 20)}) × ${d}`,
  ]);
}

/** @type {ReviewSkill} */
export const addSubOrder = {
  id: 'cong-tru',
  label: 'Chỉ có cộng, trừ',
  make: (rand) => valueQuestion(drawAddSub(rand), 'Chỉ có cộng, trừ: em tính từ trái sang phải.'),
};

/** @type {ReviewSkill} */
export const mulDivOrder = {
  id: 'nhan-chia',
  label: 'Chỉ có nhân, chia',
  make: (rand) => valueQuestion(drawMulDiv(rand), 'Chỉ có nhân, chia: em tính từ trái sang phải.'),
};

/** @type {ReviewSkill} */
export const strongFirst = {
  id: 'nhan-chia-truoc',
  label: 'Nhân, chia trước; cộng, trừ sau',
  make: (rand) =>
    valueQuestion(drawStrong(rand), 'Em làm phép nhân, phép chia trước; cộng, trừ sau.'),
};

/** @type {ReviewSkill} */
export const brackets = {
  id: 'ngoac',
  label: 'Biểu thức có dấu ngoặc',
  make: (rand) => valueQuestion(drawBrackets(rand), 'Có dấu ngoặc: em tính trong ngoặc trước.'),
};

/** @type {ReviewSkill} */
export const threeNumbers = {
  id: 'ba-so',
  label: 'Tính với ba số',
  make(rand) {
    if (rand() < 0.5) {
      const b = int(rand, 11, 89);
      const text = `${int(rand, 11, 60)} + ${b} + ${100 - b}`;
      return valueQuestion(text, 'Em tính từ trái sang phải, hoặc cộng hai số cuối trước.');
    }
    const text = `${int(rand, 2, 9)} × 5 × 2`;
    return valueQuestion(text, 'Em tính từ trái sang phải, hoặc nhân 5 với 2 trước.');
  },
};

/**
 * Four expressions with different values, for comparing.
 * @param {() => number} rand
 * @returns {{ text: string, value: number }[]}
 */
function drawDifferent(rand) {
  for (;;) {
    const list = [drawStrong, drawBrackets, drawMulDiv, drawAddSub]
      .map((draw) => draw(rand))
      .map((text) => ({ text, value: valueOf(text) }));
    if (new Set(list.map((e) => e.value)).size === list.length) return shuffle(rand, list);
  }
}

/** @type {ReviewSkill} */
export const compareValues = {
  id: 'so-sanh',
  label: 'So sánh giá trị biểu thức',
  make(rand) {
    const list = drawDifferent(rand);
    const sorted = list.toSorted((a, b) => a.value - b.value);
    const works = `${list.map((e) => `${e.text} = ${e.value}`).join('; ')}.`;
    const options = list.map((e) => e.text);
    if (rand() < 0.5) {
      const top = sorted[sorted.length - 1];
      const limit = sorted[sorted.length - 2].value;
      return {
        prompt: `Biểu thức nào có giá trị lớn hơn ${limit}?`,
        options,
        answer: options.indexOf(top.text),
        hint: 'Em tính giá trị của từng biểu thức, rồi so sánh.',
        solution: works,
      };
    }
    const target = pick(rand, list);
    return {
      prompt: `Biểu thức nào có giá trị bằng ${target.value}?`,
      options,
      answer: options.indexOf(target.text),
      hint: 'Em tính giá trị của từng biểu thức.',
      solution: `${workText(target.text)}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const whichFirst = {
  id: 'tinh-truoc',
  label: 'Phép tính nào trước',
  make(rand) {
    const a = int(rand, 11, 60);
    const b = int(rand, 2, 9);
    const c = int(rand, 2, 9);
    const shape = int(rand, 0, 3);
    if (shape === 0) {
      const text = `${a} + ${b} × ${c}`;
      return {
        prompt: `Trong biểu thức ${text}, em tính phép nào trước?`,
        ...mixOptions(rand, firstOp(text), [`${a} + ${b}`, `${a} + ${c}`]),
        hint: 'Có cả cộng và nhân: em nhớ thứ tự thực hiện phép tính.',
        solution: `Nhân, chia trước; cộng, trừ sau: em tính ${firstOp(text)} trước.`,
      };
    }
    if (shape === 1) {
      const text = `${a + b + c} − (${b} + ${c})`;
      return {
        prompt: `Trong biểu thức ${text}, em tính phép nào trước?`,
        ...mixOptions(rand, firstOp(text), [`${a + b + c} − ${b}`, `${a + b + c} − ${c}`]),
        hint: 'Em nhìn dấu ngoặc.',
        solution: `Có dấu ngoặc: em tính trong ngoặc trước, tức là ${firstOp(text)}.`,
      };
    }
    if (shape === 2) {
      const text = `${a * 2} : 2 × ${c}`;
      return {
        prompt: `Trong biểu thức ${text}, em tính phép nào trước?`,
        ...mixOptions(rand, firstOp(text), [`2 × ${c}`, `${a * 2} × ${c}`]),
        hint: 'Chỉ có nhân, chia thì em đi theo chiều nào?',
        solution: `Chỉ có nhân, chia: em tính từ trái sang phải, nên tính ${firstOp(text)} trước.`,
      };
    }
    const text = `${a + 20} − ${b} + ${c}`;
    return {
      prompt: `Trong biểu thức ${text}, em tính phép nào trước?`,
      ...mixOptions(rand, firstOp(text), [`${b} + ${c}`, `${a + 20} + ${c}`]),
      hint: 'Chỉ có cộng, trừ thì em đi theo chiều nào?',
      solution: `Chỉ có cộng, trừ: em tính từ trái sang phải, nên tính ${firstOp(text)} trước.`,
    };
  },
};

const SIGN_NAMES = /** @type {const} */ ({
  '+': 'Dấu cộng',
  '−': 'Dấu trừ',
  '×': 'Dấu nhân',
  ':': 'Dấu chia',
});
const SIGNS = /** @type {const} */ (['+', '−', '×', ':']);

/**
 * The four signs as options.
 * @param {import('./expression.js').Op} right
 */
function signOptions(right) {
  return {
    options: [...SIGNS],
    answer: SIGNS.indexOf(right),
    optionLabels: SIGNS.map((s) => SIGN_NAMES[s]),
  };
}

/** @type {ReviewSkill} */
export const chooseSign = {
  id: 'chon-dau',
  label: 'Chọn dấu phép tính',
  make(rand) {
    const shape = int(rand, 0, 2);
    if (shape === 0) {
      const n = int(rand, 2, 9);
      const m = int(rand, 3, 9);
      const least = rand() < 0.5;
      const op = least ? '−' : '×';
      const name = least ? 'bé nhất' : 'lớn nhất';
      const values = SIGNS.map((s) => `${n} × (${m} ${s} ${m}) = ${n * compute(m, s, m)}`);
      return {
        prompt: `Chọn dấu thay cho dấu ? để biểu thức ${n} × (${m} ? ${m}) có giá trị ${name}.`,
        ...signOptions(op),
        hint: 'Em thử từng dấu, tính trong ngoặc trước.',
        solution: `${values.join('; ')}. Dấu ${op} cho giá trị ${name}.`,
      };
    }
    if (shape === 1) {
      const x = int(rand, 3, 9);
      const right = `${x} + ${x} − ${x}`;
      return {
        prompt: `Biểu thức nào có giá trị bằng ${x}?`,
        ...mixOptions(rand, right, [
          `${x} + ${x} + ${x}`,
          `${x} × ${x} + ${x}`,
          `${x} + ${x} × ${x}`,
        ]),
        hint: 'Em tính giá trị của từng biểu thức.',
        solution: `${workText(right)}.`,
      };
    }
    for (;;) {
      const a = int(rand, 3, 12);
      const b = int(rand, 2, a - 1);
      const c = int(rand, 2, 5);
      const results = SIGNS.map((s) => compute(a, s, b));
      const right = pick(
        rand,
        SIGNS.filter((s) => Number.isInteger(compute(a, s, b))),
      );
      if (new Set(results).size !== SIGNS.length) continue;
      const value = compute(a, right, b) * c;
      return {
        prompt: `Chọn dấu thay cho dấu ?: (${a} ? ${b}) × ${c} = ${value}.`,
        ...signOptions(right),
        hint: `Em tính ${value} : ${c} trước để biết trong ngoặc bằng mấy.`,
        solution: `(${a} ${right} ${b}) × ${c} = ${compute(a, right, b)} × ${c} = ${value}.`,
      };
    }
  },
};

/**
 * Sacks of rice and of corn on a cart.
 * @param {number} rice
 * @param {number} sacks
 * @param {number} corn
 * @returns {ReviewQuestion}
 */
export function sackStory(rice, sacks, corn) {
  const total = rice * sacks;
  const right = total + corn;
  return {
    prompt: `Một bao gạo cân nặng ${rice} kg, một bao ngô cân nặng ${corn} kg. Hỏi ${sacks} bao gạo và 1 bao ngô cân nặng bao nhiêu ki-lô-gam?`,
    ...valueOptions(right, [rice + corn, total, right + 10]),
    hint: 'Em tính cân nặng các bao gạo trước, rồi cộng thêm bao ngô.',
    solution: `${rice} × ${sacks} + ${corn} = ${total} + ${corn} = ${right} (kg).`,
  };
}

/**
 * Wheels packed into boxes, boxes into crates.
 * @param {number} wheels
 * @param {number} perBox
 * @param {number} perCrate
 * @returns {ReviewQuestion}
 */
export function wheelStory(wheels, perBox, perCrate) {
  const boxes = wheels / perBox;
  const right = boxes / perCrate;
  return {
    prompt: `Có ${wheels} bánh xe đóng vào các hộp, mỗi hộp ${perBox} bánh xe. Các hộp đóng vào các thùng, mỗi thùng ${perCrate} hộp. Cần bao nhiêu thùng?`,
    ...valueOptions(right, [boxes, right + 1, right + 2]),
    hint: 'Em tìm số hộp trước, rồi tìm số thùng.',
    solution: `${wheels} : ${perBox} : ${perCrate} = ${boxes} : ${perCrate} = ${right} (thùng).`,
  };
}

/**
 * Pupils in classes, plus one more class.
 * @param {number} each
 * @param {number} classes
 * @param {number} last
 * @returns {ReviewQuestion}
 */
export function classStory(each, classes, last) {
  const total = each * classes;
  const right = total + last;
  return {
    prompt: `Khối Ba có ${classes} lớp, mỗi lớp ${each} học sinh, và 1 lớp khác có ${last} học sinh. Khối Ba có tất cả bao nhiêu học sinh?`,
    ...valueOptions(right, [total, each + last, right + 10]),
    hint: 'Em tính số học sinh các lớp bằng nhau trước.',
    solution: `${each} × ${classes} + ${last} = ${total} + ${last} = ${right} (học sinh).`,
  };
}

/** @type {ReviewSkill} */
export const expressionStory = {
  id: 'bai-toan-bieu-thuc',
  label: 'Bài toán viết thành biểu thức',
  make(rand) {
    const kind = int(rand, 0, 2);
    if (kind === 0)
      return sackStory(pick(rand, [20, 25, 30, 40]), int(rand, 2, 5), int(rand, 15, 50));
    if (kind === 1) {
      const perBox = pick(rand, [2, 4]);
      const perCrate = pick(rand, [2, 5, 8]);
      return wheelStory(int(rand, 3, 12) * perBox * perCrate, perBox, perCrate);
    }
    return classStory(int(rand, 28, 36), int(rand, 3, 6), int(rand, 28, 36));
  },
};

/** The parts of the review of expressions. */
export const EXPRESSION_SKILLS = [
  addSubOrder,
  mulDivOrder,
  strongFirst,
  brackets,
  threeNumbers,
  whichFirst,
  compareValues,
  chooseSign,
  expressionStory,
];
