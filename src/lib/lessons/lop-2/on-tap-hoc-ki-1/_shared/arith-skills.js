/**
 * Review questions on addition and subtraction within 20 and within 100: mental
 * sums and differences across ten, comparing two calculations, whole tens,
 * calculations with carrying set out in columns, following a chain of
 * calculations, number towers, picking two bags that balance, and word
 * problems. Pure and DOM-free; each skill is a `KidSkill` for
 * `adaptive-quiz.svelte`.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { mixOptions, signOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {'+' | '-'} Op */
/** @typedef {'add-one' | 'add-two' | 'sub-one' | 'sub-two'} CarryKind */

/**
 * "35 + 7" or "42 − 7".
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function expr(a, b, op) {
  return `${a} ${op === '+' ? '+' : MINUS} ${b}`;
}

/**
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function resultOf(a, b, op) {
  return op === '+' ? a + b : a - b;
}

/**
 * Up to four number options in increasing order: the right one and the slips
 * a child makes (the given ones first, then one off and ten off), from 0 to
 * `hi`.
 * @param {() => number} rand
 * @param {number} right
 * @param {number[]} [slips]
 * @param {number} [hi]
 * @returns {{ options: string[], answer: number }}
 */
export function nearOptions(rand, right, slips = [], hi = 100) {
  const ok = (/** @type {number} */ v) => v !== right && v >= 0 && v <= hi;
  const first = [...new Set(slips.filter(ok))];
  const rest = shuffle(
    rand,
    [right - 1, right + 1, right - 10, right + 10, right + 2].filter(
      (v) => ok(v) && !first.includes(v),
    ),
  );
  const values = [right, ...[...first, ...rest].slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map(String), answer: values.indexOf(right) };
}

/**
 * Number options written with a unit: "13 bạn".
 * @param {() => number} rand
 * @param {number} right
 * @param {string} unit
 * @param {number[]} [slips]
 * @param {number} [hi]
 */
export function unitOptions(rand, right, unit, slips = [], hi = 100) {
  const { options, answer } = nearOptions(rand, right, slips, hi);
  return { options: options.map((o) => `${o} ${unit}`), answer };
}

/**
 * A calculation with carrying whose result stays below 100; a difference may
 * have one digit, as 91 − 85 does in the book.
 * @param {() => number} rand
 * @param {CarryKind} kind
 * @returns {{ a: number, b: number, op: Op }}
 */
export function makeCarry(rand, kind) {
  if (kind === 'add-one') {
    const ua = int(rand, 2, 9);
    return { a: int(rand, 1, 8) * 10 + ua, b: int(rand, 10 - ua, 9), op: '+' };
  }
  if (kind === 'add-two') {
    const ua = int(rand, 1, 9);
    const ta = int(rand, 1, 7);
    return { a: ta * 10 + ua, b: int(rand, 1, 8 - ta) * 10 + int(rand, 10 - ua, 9), op: '+' };
  }
  const ua = int(rand, 0, 8);
  const ta = int(rand, 2, 9);
  if (kind === 'sub-one') return { a: ta * 10 + ua, b: int(rand, ua + 1, 9), op: '-' };
  return { a: ta * 10 + ua, b: int(rand, 1, ta - 1) * 10 + int(rand, ua + 1, 9), op: '-' };
}

/** The four kinds of carrying calculation. */
const CARRY_KINDS = /** @type {const} */ (['add-one', 'add-two', 'sub-one', 'sub-two']);

/**
 * A carrying calculation of any kind. A one-digit addend may come first, as
 * in the book's 5 + 48.
 * @param {() => number} rand
 * @returns {{ a: number, b: number, op: Op }}
 */
export function anyCarry(rand) {
  const kind = pick(rand, CARRY_KINDS);
  const p = makeCarry(rand, kind);
  return kind === 'add-one' && rand() < 0.3 ? { a: p.b, b: p.a, op: p.op } : p;
}

/**
 * The columns read the book's way, ones first: "5 cộng 7 bằng 12, viết 2, nhớ
 * 1. 3 thêm 1 bằng 4, viết 4. Vậy 35 + 7 = 42."
 * @param {number} a
 * @param {number} b
 * @param {Op} op
 */
export function carryWords(a, b, op) {
  const [ta, ua, tb, ub] = [Math.floor(a / 10), a % 10, Math.floor(b / 10), b % 10];
  const r = resultOf(a, b, op);
  const [tr, ur] = [Math.floor(r / 10), r % 10];
  let ones;
  let tens;
  if (op === '+') {
    ones = `${ua} cộng ${ub} bằng ${ua + ub}, viết ${ur}, nhớ 1.`;
    tens =
      ta > 0 && tb > 0
        ? `${ta} cộng ${tb} bằng ${ta + tb}, thêm 1 bằng ${tr}, viết ${tr}.`
        : `${ta + tb} thêm 1 bằng ${tr}, viết ${tr}.`;
  } else {
    ones = `${ua} không trừ được ${ub}, lấy ${10 + ua} trừ ${ub} bằng ${ur}, viết ${ur}, nhớ 1.`;
    const write = tr > 0 ? `, viết ${tr}.` : '.';
    tens =
      tb > 0
        ? `${tb} thêm 1 bằng ${tb + 1}, ${ta} trừ ${tb + 1} bằng ${tr}${write}`
        : `${ta} trừ 1 bằng ${tr}${write}`;
  }
  return `${ones} ${tens} Vậy ${expr(a, b, op)} = ${r}.`;
}

/**
 * Two numbers from 2 to 9 adding up to `total`, other than the pair holding
 * `avoid` when another pair exists.
 * @param {() => number} rand
 * @param {number} total 11 to 18
 * @param {number} [avoid]
 * @returns {[number, number]}
 */
function addends(rand, total, avoid) {
  const all = [2, 3, 4, 5, 6, 7, 8, 9].filter((x) => total - x >= 2 && total - x <= 9);
  const kept = all.filter((x) => x !== avoid && total - x !== avoid);
  const x = pick(rand, kept.length > 0 ? kept : all);
  return [x, total - x];
}

/** @type {ReviewSkill} */
export const mental20Skill = {
  id: 'nham-20',
  label: 'Tính nhẩm trong phạm vi 20',
  make(rand) {
    if (rand() < 0.5) {
      const a = int(rand, 2, 9);
      const b = int(rand, 11 - a, 9);
      const c = a + b;
      return {
        prompt: `${expr(a, b, '+')} = ?`,
        ...nearOptions(rand, c, [c - 10, c + 1], 20),
        hint: `Em tách số để ${a} cộng thành 10 trước, rồi cộng tiếp phần còn lại.`,
        solution: `${a} + ${10 - a} = 10, 10 + ${c - 10} = ${c}. Vậy ${expr(a, b, '+')} = ${c}.`,
      };
    }
    const c = int(rand, 11, 18);
    const b = int(rand, c - 9, 9);
    const r = c - b;
    return {
      prompt: `${expr(c, b, '-')} = ?`,
      ...nearOptions(rand, r, [r + 10, r - 1], 20),
      hint: `Em bớt ${c - 10} để được 10, rồi bớt tiếp phần còn lại.`,
      solution: `${c} ${MINUS} ${c - 10} = 10, 10 ${MINUS} ${b - (c - 10)} = ${r}. Vậy ${expr(c, b, '-')} = ${r}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const compare20Skill = {
  id: 'so-sanh-20',
  label: 'So sánh hai phép tính',
  make(rand) {
    const delta = int(rand, -2, 2);
    /** @type {[number, number, Op, number, number]} */
    let sides;
    if (rand() < 0.5) {
      const left = int(rand, 11, 17);
      const right = Math.min(17, Math.max(11, left + delta));
      const [a, b] = addends(rand, left);
      const [c, d] = addends(rand, right, a);
      sides = [a, b, '+', c, d];
    } else {
      const left = int(rand, 3, 9);
      const right = Math.min(9, Math.max(3, left + delta));
      const b = int(rand, 11 - left, 9);
      const others = [2, 3, 4, 5, 6, 7, 8, 9].filter((d) => right + d >= 11 && d !== b);
      const d = others.length > 0 ? pick(rand, others) : b;
      sides = [left + b, b, '-', right + d, d];
    }
    const [a, b, op, c, d] = sides;
    const x = resultOf(a, b, op);
    const y = resultOf(c, d, op);
    const sign = compareSign(x, y);
    return {
      prompt: `Chọn dấu đúng: ${expr(a, b, op)} ... ${expr(c, d, op)}`,
      ...signOptions(sign),
      hint: 'Em tính kết quả của từng phép tính, rồi so sánh hai kết quả.',
      solution: `${expr(a, b, op)} = ${x}, ${expr(c, d, op)} = ${y}. ${x} ${sign} ${y}, nên ${expr(a, b, op)} ${sign} ${expr(c, d, op)}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const balanceBagsSkill = {
  id: 'hai-tui',
  label: 'Chọn hai túi để cân thăng bằng',
  make(rand) {
    const x = int(rand, 3, 9);
    const y = int(rand, 3, 9);
    const total = x + y;
    // Two bags of different masses, other than the ones already on the left pan.
    const smaller = Array.from({ length: total }, (_, i) => i).filter(
      (v) => v >= 2 && 2 * v < total && v !== x && v !== y,
    );
    const p = pick(rand, smaller);
    const q = total - p;
    const free = [2, 3, 4, 5, 6, 7, 8, 9].filter((r) => r !== p && r !== q);
    const r = pick(rand, free);
    /** @param {number} u @param {number} v */
    const pair = (u, v) => `Túi ${Math.min(u, v)} kg và túi ${Math.max(u, v)} kg`;
    const right = pair(p, q);
    return {
      prompt: `Đĩa bên trái có túi gạo ${x} kg và túi gạo ${y} kg. Em lấy hai túi nào đặt lên đĩa bên phải để cân thăng bằng?`,
      ...mixOptions(rand, right, [pair(p, r), pair(q, r)]),
      hint: 'Cân thăng bằng khi hai đĩa nặng bằng nhau. Em tính đĩa bên trái trước.',
      solution: `Đĩa bên trái: ${x} + ${y} = ${total} (kg). Hai túi cần chọn: ${p} + ${q} = ${total} (kg).`,
    };
  },
};

/** @type {ReviewSkill} */
export const wholeTensSkill = {
  id: 'tron-chuc',
  label: 'Tính nhẩm số tròn chục',
  make(rand) {
    const x = int(rand, 1, 9);
    const y = int(rand, 1, 10 - x);
    if (rand() < 0.5) {
      return {
        prompt: `${expr(10 * x, 10 * y, '+')} = ?`,
        ...nearOptions(rand, 10 * (x + y), [10 * Math.abs(x - y)]),
        hint: `${x} chục cộng ${y} chục bằng mấy chục?`,
        solution: `${x} chục + ${y} chục = ${x + y} chục. Vậy ${expr(10 * x, 10 * y, '+')} = ${10 * (x + y)}.`,
      };
    }
    const n = x + y;
    return {
      prompt: `${expr(10 * n, 10 * x, '-')} = ?`,
      ...nearOptions(rand, 10 * y, [10 * (n + x)]),
      hint: `${n} chục bớt ${x} chục thì còn mấy chục?`,
      solution: `${n} chục ${MINUS} ${x} chục = ${y} chục. Vậy ${expr(10 * n, 10 * x, '-')} = ${10 * y}.`,
    };
  },
};

/** @type {ReviewSkill} */
export const columnSkill = {
  id: 'dat-tinh',
  label: 'Đặt tính rồi tính',
  make(rand) {
    const { a, b, op } = anyCarry(rand);
    const c = resultOf(a, b, op);
    // Forgetting the carried 1 moves the tens by one.
    const forgot = op === '+' ? c - 10 : c + 10;
    return {
      prompt: `Đặt tính rồi tính: ${expr(a, b, op)}. Kết quả là bao nhiêu?`,
      visual: { type: 'column', a, b, op },
      ...nearOptions(rand, c, [forgot]),
      hint: 'Em tính từ phải sang trái. Tính hàng đơn vị trước, đừng quên nhớ 1 sang hàng chục.',
      solution: carryWords(a, b, op),
    };
  },
};

/**
 * Two or three calculations in a row whose results stay between 1 and 99.
 * @param {() => number} rand
 * @returns {{ start: number, steps: { op: Op, n: number }[], values: number[] }}
 */
export function makeChain(rand) {
  const start = int(rand, 12, 60);
  const count = int(rand, 2, 3);
  /** @type {{ op: Op, n: number }[]} */
  const steps = [];
  const values = [start];
  let v = start;
  for (let i = 0; i < count; i++) {
    /** @type {Op} */
    const op = v >= 70 || (v > 12 && rand() < 0.5) ? '-' : '+';
    const n = op === '-' ? int(rand, 3, Math.min(v - 2, 40)) : int(rand, 3, Math.min(99 - v, 40));
    steps.push({ op, n });
    v = resultOf(v, n, op);
    values.push(v);
  }
  return { start, steps, values };
}

/** @type {ReviewSkill} */
export const chainSkill = {
  id: 'mui-ten',
  label: 'Tính theo mũi tên',
  make(rand) {
    const { start, steps, values } = makeChain(rand);
    const last = values[values.length - 1];
    const before = values[values.length - 2];
    const lastStep = steps[steps.length - 1];
    const flipped = lastStep.op === '+' ? before - lastStep.n : before + lastStep.n;
    return {
      prompt: 'Em tính theo chiều mũi tên. Ô cuối cùng là số nào?',
      visual: { type: 'chain', start, steps },
      ...nearOptions(rand, last, [before, flipped]),
      hint: 'Em tính từng phép tính từ trái sang phải. Kết quả của phép trước là số đầu của phép sau.',
      solution: `${steps.map((s, i) => `${expr(values[i], s.n, s.op)} = ${values[i + 1]}`).join('. ')}. Ô cuối cùng là ${last}.`,
    };
  },
};

/**
 * The rows of a number tower from the bottom up: each number is the sum of the
 * two just below it.
 * @param {readonly number[]} base
 * @returns {number[][]}
 */
export function towerRows(base) {
  const rows = [[...base]];
  while (rows[rows.length - 1].length > 1) {
    const row = rows[rows.length - 1];
    rows.push(row.slice(1).map((n, i) => row[i] + n));
  }
  return rows;
}

/** @type {ReviewSkill} */
export const towerSkill = {
  id: 'thap-so',
  label: 'Tháp số',
  make(rand) {
    const base = [int(rand, 2, 15), int(rand, 2, 15), int(rand, 2, 15)];
    const [[a, b, c], [x, y], [top]] = towerRows(base);
    return {
      prompt: 'Số ở trên bằng tổng hai số ngay dưới nó. Số ở đỉnh tháp là bao nhiêu?',
      visual: { type: 'tower', base },
      ...nearOptions(rand, top, [a + b + c, x, y]),
      hint: 'Em tính từng hàng, từ dưới lên. Hàng giữa có hai số.',
      solution: `${a} + ${b} = ${x}. ${b} + ${c} = ${y}. ${x} + ${y} = ${top}. Đỉnh tháp là ${top}.`,
    };
  },
};

/** The book's word problems within 20. */
const STORIES_20 = [
  /** @param {() => number} rand */
  (rand) => {
    const a = int(rand, 6, 9);
    const b = int(rand, 11 - a, 9);
    const c = a + b;
    return {
      prompt: `Lớp 2A có ${a} bạn học hát. Số bạn học võ nhiều hơn số bạn học hát ${b} bạn. Hỏi lớp 2A có bao nhiêu bạn học võ?`,
      ...unitOptions(rand, c, 'bạn', [Math.abs(a - b), c + 1], 20),
      hint: 'Nhiều hơn thì em làm phép cộng.',
      solution: `Số bạn học võ là: ${a} + ${b} = ${c} (bạn). Đáp số: ${c} bạn.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const a = int(rand, 11, 18);
    const b = int(rand, a - 9, 9);
    const c = a - b;
    return {
      prompt: `Buổi sáng, cửa hàng bán được ${a} máy tính. Buổi chiều bán ít hơn buổi sáng ${b} máy tính. Hỏi buổi chiều bán được bao nhiêu máy tính?`,
      ...unitOptions(rand, c, 'máy tính', [a + b, c + 1]),
      hint: 'Ít hơn thì em làm phép trừ.',
      solution: `Buổi chiều bán được số máy tính là: ${a} ${MINUS} ${b} = ${c} (máy tính). Đáp số: ${c} máy tính.`,
    };
  },
];

/** The book's word problems within 100. */
const STORIES_100 = [
  /** @param {() => number} rand */
  (rand) => {
    const { a, b } = makeCarry(rand, 'add-two');
    return {
      prompt: `Đội đồng diễn có ${a} người mặc áo đỏ và ${b} người mặc áo vàng. Hỏi đội đồng diễn có tất cả bao nhiêu người?`,
      ...unitOptions(rand, a + b, 'người', [a + b - 10]),
      hint: 'Có tất cả là gộp lại, em làm phép cộng.',
      solution: `Đội đồng diễn có tất cả số người là: ${a} + ${b} = ${a + b} (người). Đáp số: ${a + b} người.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const { a, b } = makeCarry(rand, 'sub-two');
    return {
      prompt: `Thanh gỗ dài ${a} cm. Bác thợ mộc cưa đi ${b} cm. Hỏi thanh gỗ còn lại dài bao nhiêu xăng-ti-mét?`,
      ...unitOptions(rand, a - b, 'cm', [a - b + 10]),
      hint: 'Cưa đi là bớt đi, em làm phép trừ.',
      solution: `Thanh gỗ còn lại dài là: ${a} ${MINUS} ${b} = ${a - b} (cm). Đáp số: ${a - b} cm.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const { a, b } = makeCarry(rand, 'sub-two');
    return {
      prompt: `Lớp 2A góp được ${a} quyển sách. Lớp 2B góp được ít hơn lớp 2A ${b} quyển sách. Hỏi lớp 2B góp được bao nhiêu quyển sách?`,
      ...unitOptions(rand, a - b, 'quyển', [a - b + 10]),
      hint: 'Ít hơn thì em làm phép trừ.',
      solution: `Lớp 2B góp được số quyển sách là: ${a} ${MINUS} ${b} = ${a - b} (quyển sách). Đáp số: ${a - b} quyển sách.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const a = int(rand, 82, 89);
    const b = int(rand, 10 - (a % 10), 9);
    return {
      prompt: `Rô-bốt cao ${a} cm. Mi cao hơn Rô-bốt ${b} cm. Hỏi Mi cao bao nhiêu xăng-ti-mét?`,
      ...unitOptions(rand, a + b, 'cm', [a + b - 10, a - b]),
      hint: 'Cao hơn thì em làm phép cộng.',
      solution: `Mi cao là: ${a} + ${b} = ${a + b} (cm). Đáp số: ${a + b} cm.`,
    };
  },
];

/**
 * A word problem with numbers, from the book's shapes within 20 and 100.
 * @param {() => number} rand
 */
export function numberStory(rand) {
  return pick(rand, [...STORIES_20, ...STORIES_100])(rand);
}

/** @type {ReviewSkill} */
export const storySkill = {
  id: 'bai-toan',
  label: 'Giải bài toán',
  make: numberStory,
};

/** The parts of the review of addition and subtraction. */
export const ARITH_SKILLS = [
  mental20Skill,
  compare20Skill,
  balanceBagsSkill,
  wholeTensSkill,
  columnSkill,
  chainSkill,
  towerSkill,
  storySkill,
];
