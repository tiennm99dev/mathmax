/**
 * The adaptive review of adding and subtracting within 100 000: in the head
 * with whole thousands and hundreds, in columns, checking a worked result,
 * the missing number, expressions, change from a purchase and two-step word
 * problems. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { columnWords, forgotAddCarry, forgotBorrow } from './columns.js';
import { dong, valueOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('./visual.js').ReviewQuestion} ReviewQuestion */

/** @type {ReviewSkill} */
export const headAddSub = {
  id: 'nham-cong-tru',
  label: 'Cộng, trừ nhẩm',
  make(rand) {
    const hundreds = rand() < 0.4;
    const size = hundreds ? 100 : 1000;
    const word = hundreds ? 'trăm' : 'nghìn';
    const plus = rand() < 0.5;
    const x = hundreds ? int(rand, 11, 60) : int(rand, 2, 60);
    const y = hundreds ? int(rand, 5, 40) : int(rand, 1, 30);
    const [p, q] = plus ? [x, y] : [x + y, y];
    const a = p * size;
    const b = q * size;
    const right = plus ? a + b : a - b;
    const sign = plus ? '+' : '−';
    return {
      prompt: `Tính nhẩm: ${fmt(a)} ${sign} ${fmt(b)} = ?`,
      ...valueOptions(right, [plus ? a - b : a + b, right + size * 10], { step: size }),
      hint: `Em nhẩm theo số ${word}: ${p} ${word} ${sign} ${q} ${word}.`,
      solution: `${p} ${word} ${sign} ${q} ${word} = ${plus ? p + q : p - q} ${word}. Vậy ${fmt(a)} ${sign} ${fmt(b)} = ${fmt(right)}.`,
    };
  },
};

/**
 * Two numbers whose sum stays within 100 000 and needs at least one carry.
 * @param {() => number} rand
 */
export function drawSum(rand) {
  for (;;) {
    const a = int(rand, 1000, 89999);
    const b = int(rand, 100, 99999 - a);
    if (forgotAddCarry(a, b) !== a + b && b >= 100) return { a, b };
  }
}

/**
 * A subtraction within 100 000 that needs at least one borrow.
 * @param {() => number} rand
 */
export function drawDifference(rand) {
  for (;;) {
    const a = int(rand, 1000, 99999);
    const b = int(rand, 100, a - 1);
    if (forgotBorrow(a, b) !== a - b) return { a, b };
  }
}

/** @type {ReviewSkill} */
export const addColumns = {
  id: 'cong-dat-tinh',
  label: 'Đặt tính rồi tính cộng',
  make(rand) {
    const { a, b } = drawSum(rand);
    const right = a + b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} + ${fmt(b)} = ?`,
      visual: { type: 'column', op: '+', a, b },
      ...valueOptions(right, [forgotAddCarry(a, b), right + 100, right - 10]),
      hint: 'Viết các chữ số cùng hàng thẳng cột. Cộng từ phải sang trái, nhớ sang hàng bên trái.',
      solution: columnWords('+', a, b),
    };
  },
};

/** @type {ReviewSkill} */
export const subColumns = {
  id: 'tru-dat-tinh',
  label: 'Đặt tính rồi tính trừ',
  make(rand) {
    const { a, b } = drawDifference(rand);
    const right = a - b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} − ${fmt(b)} = ?`,
      visual: { type: 'column', op: '−', a, b },
      ...valueOptions(right, [forgotBorrow(a, b), right + 100, right - 10]),
      hint: 'Trừ từ phải sang trái. Hàng nào không trừ được thì lấy thêm 10, rồi nhớ 1 sang hàng bên trái.',
      solution: columnWords('−', a, b),
    };
  },
};

/** @type {ReviewSkill} */
export const checkAddSub = {
  id: 'dung-sai-cong-tru',
  label: 'Đúng hay sai',
  make(rand) {
    const plus = rand() < 0.5;
    const { a, b } = plus ? drawSum(rand) : drawDifference(rand);
    const op = plus ? '+' : '−';
    const truth = plus ? a + b : a - b;
    const wrong = rand() < 0.5;
    const shown = wrong ? (plus ? forgotAddCarry(a, b) : forgotBorrow(a, b)) : truth;
    return {
      prompt: `Phép tính này đúng hay sai? ${fmt(a)} ${op} ${fmt(b)} = ${fmt(shown)}`,
      visual: { type: 'column', op, a, b },
      options: ['Đúng', 'Sai'],
      answer: wrong ? 1 : 0,
      hint: plus
        ? 'Em cộng lại từ hàng đơn vị. Đừng quên số đã nhớ.'
        : 'Em thử lại: lấy hiệu cộng với số trừ, xem có bằng số bị trừ không.',
      solution: wrong
        ? `Sai, vì phép tính đã quên số nhớ. ${fmt(a)} ${op} ${fmt(b)} = ${fmt(truth)}.`
        : `Đúng. ${columnWords(op, a, b)}`,
    };
  },
};

/** @type {ReviewSkill} */
export const missingAddSub = {
  id: 'tim-thanh-phan-cong-tru',
  label: 'Tìm thành phần chưa biết',
  make(rand) {
    const shape = pick(rand, /** @type {const} */ (['so-hang', 'so-bi-tru', 'so-tru']));
    const x = int(rand, 10, 600) * 100;
    const y = int(rand, 10, 300) * 100 + pick(rand, [0, 50]);
    if (shape === 'so-hang') {
      const s = x + y;
      return {
        prompt: `Tìm số thích hợp thay cho dấu ?: ? + ${fmt(y)} = ${fmt(s)}`,
        ...valueOptions(x, [s + y, x + 1000, x - 100], { step: 100 }),
        hint: 'Muốn tìm số hạng, em lấy tổng trừ đi số hạng kia.',
        solution: `? = ${fmt(s)} − ${fmt(y)} = ${fmt(x)}.`,
      };
    }
    if (shape === 'so-bi-tru') {
      const right = x + y;
      return {
        prompt: `Tìm số thích hợp thay cho dấu ?: ? − ${fmt(y)} = ${fmt(x)}`,
        ...valueOptions(right, [Math.abs(x - y), right + 1000, right - 100], { step: 100 }),
        hint: 'Muốn tìm số bị trừ, em lấy hiệu cộng với số trừ.',
        solution: `? = ${fmt(x)} + ${fmt(y)} = ${fmt(right)}.`,
      };
    }
    const a = x + y;
    return {
      prompt: `Tìm số thích hợp thay cho dấu ?: ${fmt(a)} − ? = ${fmt(x)}`,
      ...valueOptions(y, [a + x, y + 1000, y - 100], { step: 100 }),
      hint: 'Muốn tìm số trừ, em lấy số bị trừ trừ đi hiệu.',
      solution: `? = ${fmt(a)} − ${fmt(x)} = ${fmt(y)}.`,
    };
  },
};

/**
 * An expression with + and − worked out line by line.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {'a+b-c' | 'a-b+c' | 'a+(b-c)' | 'a-(b+c)'} shape
 * @returns {ReviewQuestion}
 */
export function addSubExpression(a, b, c, shape) {
  /** @type {Record<typeof shape, { text: string, first: number, right: number, slip: number, rule: string }>} */
  const forms = {
    'a+b-c': {
      text: `${fmt(a)} + ${fmt(b)} − ${fmt(c)}`,
      first: a + b,
      right: a + b - c,
      slip: a + b + c,
      rule: 'Chỉ có phép cộng, phép trừ: em tính từ trái sang phải.',
    },
    'a-b+c': {
      text: `${fmt(a)} − ${fmt(b)} + ${fmt(c)}`,
      first: a - b,
      right: a - b + c,
      slip: a - (b + c),
      rule: 'Chỉ có phép cộng, phép trừ: em tính từ trái sang phải.',
    },
    'a+(b-c)': {
      text: `${fmt(a)} + (${fmt(b)} − ${fmt(c)})`,
      first: b - c,
      right: a + (b - c),
      slip: a + b + c,
      rule: 'Có dấu ngoặc: em tính trong ngoặc trước.',
    },
    'a-(b+c)': {
      text: `${fmt(a)} − (${fmt(b)} + ${fmt(c)})`,
      first: b + c,
      right: a - (b + c),
      slip: a - b + c,
      rule: 'Có dấu ngoặc: em tính trong ngoặc trước.',
    },
  };
  const f = forms[shape];
  const inside = shape.includes('(');
  const second = inside
    ? `${fmt(a)} ${shape === 'a+(b-c)' ? '+' : '−'} ${fmt(f.first)}`
    : `${fmt(f.first)} ${shape === 'a+b-c' ? '−' : '+'} ${fmt(c)}`;
  return {
    prompt: `Tính giá trị của biểu thức: ${f.text}`,
    ...valueOptions(f.right, [f.slip, f.right + 1000, f.right - 100], { step: 100 }),
    hint: f.rule,
    solution: `${f.text} = ${second} = ${fmt(f.right)}.`,
  };
}

/** @type {ReviewSkill} */
export const expressionAddSub = {
  id: 'bieu-thuc-cong-tru',
  label: 'Tính giá trị biểu thức',
  make(rand) {
    const shape = pick(rand, /** @type {const} */ (['a+b-c', 'a-b+c', 'a+(b-c)', 'a-(b+c)']));
    const c = int(rand, 1, 9) * pick(rand, [100, 1000]);
    const b = c + int(rand, 2, 20) * 500;
    const a = b + c + int(rand, 1, 40) * 500 + int(rand, 0, 9) * 10;
    if (a + b > 99999) return expressionAddSub.make(rand);
    return addSubExpression(a, b, c, shape);
  },
};

/** @type {ReviewSkill} */
export const pickExpression = {
  id: 'chon-phep-tinh',
  label: 'So sánh kết quả các phép tính',
  make(rand) {
    for (;;) {
      const most = rand() < 0.5;
      const items = [0, 1, 2].map(() => {
        const plus = rand() < 0.5;
        const p = int(rand, 5, 60);
        const q = int(rand, 1, 30);
        return plus
          ? { text: `${fmt(p * 1000)} + ${fmt(q * 1000)}`, value: (p + q) * 1000 }
          : { text: `${fmt((p + q) * 1000)} − ${fmt(q * 1000)}`, value: p * 1000 };
      });
      const values = items.map((i) => i.value);
      if (new Set(values).size < 3) continue;
      const best = most ? Math.max(...values) : Math.min(...values);
      const right = /** @type {{ text: string, value: number }} */ (
        items.find((i) => i.value === best)
      );
      return {
        prompt: `Phép tính nào có kết quả ${most ? 'lớn nhất' : 'bé nhất'}?`,
        ...mixOptions(
          rand,
          right.text,
          items.filter((i) => i !== right).map((i) => i.text),
        ),
        hint: 'Em tính nhẩm từng phép tính theo số nghìn, rồi so sánh các kết quả.',
        solution: `${items.map((i) => `${i.text} = ${fmt(i.value)}`).join('; ')}. Phép tính có kết quả ${most ? 'lớn nhất' : 'bé nhất'} là ${right.text}.`,
      };
    }
  },
};

/**
 * Buying two things and paying with one note: the change.
 * @param {number} first price of the first thing
 * @param {number} second price of the second thing
 * @param {number} note the note given
 * @returns {ReviewQuestion}
 */
export function changeStory(first, second, note) {
  const total = first + second;
  const right = note - total;
  return {
    prompt: `Mai mua một hộp bút giá ${dong(first)} và một quyển vở giá ${dong(second)}. Mai đưa cô bán hàng tờ ${dong(note)}. Cô trả lại Mai bao nhiêu tiền?`,
    ...valueOptions(right, [total, note - first, right + 1000], { step: 1000, write: dong }),
    hint: 'Em tính số tiền Mai phải trả trước, rồi lấy số tiền Mai đưa trừ đi.',
    solution: `Mai phải trả: ${fmt(first)} + ${fmt(second)} = ${fmt(total)} (đồng). Cô trả lại: ${fmt(note)} − ${fmt(total)} = ${fmt(right)} (đồng).`,
  };
}

/** @type {ReviewSkill} */
export const changeSkill = {
  id: 'tien-tra-lai',
  label: 'Tính tiền trả lại',
  make(rand) {
    const first = int(rand, 10, 45) * 1000;
    const second = int(rand, 2, 9) * 1000 + pick(rand, [0, 500]);
    const note = first + second < 50000 ? 50000 : 100000;
    return changeStory(first, second, note);
  },
};

/**
 * Doses left after two rounds of vaccination.
 * @param {number} total
 * @param {number} first
 * @param {number} second
 * @returns {ReviewQuestion}
 */
export function doseStory(total, first, second) {
  const used = first + second;
  const right = total - used;
  return {
    prompt: `Một trung tâm y tế có ${fmt(total)} liều vắc-xin. Đợt một đã tiêm ${fmt(first)} liều, đợt hai tiêm ${fmt(second)} liều. Trung tâm còn lại bao nhiêu liều vắc-xin?`,
    ...valueOptions(right, [total - first, used, right + 1000], { step: 100 }),
    hint: 'Em tìm số liều đã tiêm trong cả hai đợt trước.',
    solution: `Hai đợt đã tiêm: ${fmt(first)} + ${fmt(second)} = ${fmt(used)} (liều). Còn lại: ${fmt(total)} − ${fmt(used)} = ${fmt(right)} (liều).`,
  };
}

/**
 * Two farms, the second with some more trees than the first: how many in all.
 * @param {number} first
 * @param {number} more
 * @returns {ReviewQuestion}
 */
export function treeStory(first, more) {
  const second = first + more;
  const right = first + second;
  return {
    prompt: `Đội Một trồng được ${fmt(first)} cây. Đội Hai trồng được nhiều hơn Đội Một ${fmt(more)} cây. Cả hai đội trồng được bao nhiêu cây?`,
    ...valueOptions(right, [first + more, second, right + 1000], { step: 100 }),
    hint: 'Em tìm số cây của Đội Hai trước, rồi cộng với số cây của Đội Một.',
    solution: `Đội Hai trồng được: ${fmt(first)} + ${fmt(more)} = ${fmt(second)} (cây). Cả hai đội: ${fmt(first)} + ${fmt(second)} = ${fmt(right)} (cây).`,
  };
}

/** @type {ReviewSkill} */
export const storyAddSub = {
  id: 'bai-toan-cong-tru',
  label: 'Bài toán hai bước tính',
  make(rand) {
    if (rand() < 0.5) {
      const first = int(rand, 100, 200) * 100;
      const second = int(rand, 100, 200) * 100 + pick(rand, [0, 40, 60]);
      return doseStory(first + second + int(rand, 10, 50) * 100, first, second);
    }
    return treeStory(int(rand, 120, 300) * 10, int(rand, 15, 90) * 10);
  },
};

/** The parts of the review of adding and subtracting. */
export const ADD_SUB_SKILLS = [
  headAddSub,
  addColumns,
  subColumns,
  checkAddSub,
  missingAddSub,
  expressionAddSub,
  pickExpression,
  changeSkill,
  storyAddSub,
];
