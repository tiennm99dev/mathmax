/**
 * Review questions on addition and subtraction, within 100 and within 1000:
 * mental sums of whole tens and whole hundreds, column calculations, judging a
 * written calculation, finding the calculation that fits a limit or is the
 * largest, two signs in a row, chains of calculations, comparing, a missing
 * digit and word problems. Pure and DOM-free; each skill is a `KidSkill` for
 * `adaptive-quiz.svelte`.
 */
import { exprText, resultOf } from '#lib/core/kid/column.js';
import { int, pick } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { mixOptions, numberOptions, signOptions } from '#lib/core/kid/quiz.js';
import { MINUS } from '#lib/core/number-format.js';
import { carryCount, columnWords, forgotCarry } from './columns.js';
import { nearOptions, unitOptions } from './options.js';

/** @typedef {import('./visual.js').ReviewSkill} ReviewSkill */
/** @typedef {import('#lib/core/kid/column.js').Op} Op */
/** @typedef {{ a: number, b: number, op: Op }} Calc */

/**
 * The size of a review: the largest result and how a calculation is drawn.
 * @typedef {{ hi: number, draw: (rand: () => number, carry?: boolean) => Calc }} Range
 */

/**
 * A calculation within 100 whose result has at most two digits, from the book's
 * shapes: 57 + 28, 42 − 38, 5 + 48, 60 + 8.
 * @param {() => number} rand
 * @param {boolean} [carry] whether it carries; left out, it mostly does
 * @returns {Calc}
 */
export function draw100(rand, carry = rand() < 0.75) {
  for (;;) {
    /** @type {Op} */
    const op = rand() < 0.5 ? '+' : '-';
    const a = int(rand, 11, 99);
    const b = rand() < 0.3 ? int(rand, 2, 9) : int(rand, 11, 99);
    const r = resultOf(a, b, op);
    if (r < 1 || r > 99 || carryCount(a, b, op) > 0 !== carry) continue;
    return op === '+' && b < 10 && rand() < 0.2 ? { a: b, b: a, op } : { a, b, op };
  }
}

/**
 * A calculation within 1000 with at most one carry, from the book's shapes:
 * 435 + 352, 236 + 528, 354 + 63, 536 + 8, 67 + 829, 880 − 54, 253 − 7,
 * 783 − 745.
 * @param {() => number} rand
 * @param {boolean} [carry] whether it carries; left out, it does six times in ten
 * @returns {Calc}
 */
export function draw1000(rand, carry = rand() < 0.6) {
  for (;;) {
    /** @type {Op} */
    const op = rand() < 0.5 ? '+' : '-';
    const a = int(rand, 100, 999);
    const shape = rand();
    const b =
      shape < 0.6 ? int(rand, 100, 999) : shape < 0.85 ? int(rand, 10, 99) : int(rand, 2, 9);
    const r = resultOf(a, b, op);
    if (r < 1 || r > 999) continue;
    const carries = carryCount(a, b, op);
    if (carries > 1 || carries > 0 !== carry) continue;
    return op === '+' && b < 100 && b >= 10 && rand() < 0.25 ? { a: b, b: a, op } : { a, b, op };
  }
}

/** The review within 100. */
export const RANGE_100 = /** @type {Range} */ ({ hi: 100, draw: draw100 });
/** The review within 1000. */
export const RANGE_1000 = /** @type {Range} */ ({ hi: 1000, draw: draw1000 });

/**
 * A calculation and its result, as text.
 * @param {Calc} c
 */
const lineOf = ({ a, b, op }) => `${exprText(a, b, op)} = ${resultOf(a, b, op)}`;

/** @type {ReviewSkill} */
export const mentalTensSkill = {
  id: 'nham-chuc',
  label: 'Tính nhẩm số tròn chục',
  make(rand) {
    const shape = int(rand, 0, 2);
    if (shape === 0) {
      const x = int(rand, 1, 9);
      const y = int(rand, 1, 10 - x);
      const sum = 10 * (x + y);
      return {
        prompt: `${exprText(10 * x, 10 * y, '+')} = ?`,
        ...nearOptions(rand, sum, [10 * Math.abs(x - y), sum + 10, sum - 10], 100),
        hint: `${x} chục cộng ${y} chục bằng mấy chục?`,
        solution: `${x} chục + ${y} chục = ${x + y} chục. Vậy ${exprText(10 * x, 10 * y, '+')} = ${sum}.`,
      };
    }
    if (shape === 1) {
      const n = int(rand, 2, 10);
      const x = int(rand, 1, n - 1);
      const diff = 10 * (n - x);
      return {
        prompt: `${exprText(10 * n, 10 * x, '-')} = ?`,
        ...nearOptions(rand, diff, [diff + 10, diff - 10, diff + 20], 100),
        hint: `${n} chục bớt ${x} chục thì còn mấy chục?`,
        solution: `${n} chục ${MINUS} ${x} chục = ${n - x} chục. Vậy ${exprText(10 * n, 10 * x, '-')} = ${diff}.`,
      };
    }
    const tens = int(rand, 2, 9) * 10;
    const ones = int(rand, 2, 9);
    if (rand() < 0.5) {
      return {
        prompt: `${exprText(tens, ones, '+')} = ?`,
        ...nearOptions(rand, tens + ones, [tens + ones + 10, tens + ones - 10], 100),
        hint: `${tens} là số tròn chục. Em ghép thêm ${ones} đơn vị.`,
        solution: `${tens} + ${ones} = ${tens + ones}, vì ${tens} gồm ${tens / 10} chục, thêm ${ones} đơn vị.`,
      };
    }
    return {
      prompt: `${exprText(tens + ones, ones, '-')} = ?`,
      ...nearOptions(rand, tens, [tens + 10, tens + ones - 10], 100),
      hint: `Em bớt hết ${ones} đơn vị, chỉ còn lại số chục.`,
      solution: `${tens + ones} ${MINUS} ${ones} = ${tens}, vì bớt hết ${ones} đơn vị thì còn ${tens / 10} chục.`,
    };
  },
};

/** @type {ReviewSkill} */
export const mentalHundredsSkill = {
  id: 'nham-tram',
  label: 'Tính nhẩm số tròn trăm, tròn chục',
  make(rand) {
    const shape = int(rand, 0, 2);
    if (shape === 0) {
      const x = int(rand, 1, 9);
      const y = int(rand, 1, 10 - x);
      const sum = 100 * (x + y);
      return {
        prompt: `${exprText(100 * x, 100 * y, '+')} = ?`,
        ...nearOptions(rand, sum, [100 * Math.abs(x - y), sum + 100, sum - 100]),
        hint: `${x} trăm cộng ${y} trăm bằng mấy trăm?`,
        solution: `${x} trăm + ${y} trăm = ${x + y} trăm. Vậy ${exprText(100 * x, 100 * y, '+')} = ${sum}.`,
      };
    }
    if (shape === 1) {
      const n = int(rand, 2, 10);
      const x = int(rand, 1, n - 1);
      const diff = 100 * (n - x);
      return {
        prompt: `${exprText(100 * n, 100 * x, '-')} = ?`,
        ...nearOptions(rand, diff, [diff + 100, diff - 100, diff + 200]),
        hint: `${n} trăm bớt ${x} trăm thì còn mấy trăm?`,
        solution: `${n} trăm ${MINUS} ${x} trăm = ${n - x} trăm. Vậy ${exprText(100 * n, 100 * x, '-')} = ${diff}.`,
      };
    }
    const hundreds = int(rand, 1, 9) * 100;
    const tens = int(rand, 1, 9) * 10;
    const whole = hundreds + tens;
    const form = int(rand, 0, 2);
    if (form === 0) {
      return {
        prompt: `${exprText(hundreds, tens, '+')} = ?`,
        ...nearOptions(rand, whole, [whole + 10, whole - 10, whole + 100]),
        hint: `${hundreds} là ${hundreds / 100} trăm, ${tens} là ${tens / 10} chục. Em ghép lại.`,
        solution: `${hundreds / 100} trăm và ${tens / 10} chục là ${whole}. Vậy ${exprText(hundreds, tens, '+')} = ${whole}.`,
      };
    }
    const [taken, left] = form === 1 ? [tens, hundreds] : [hundreds, tens];
    return {
      prompt: `${exprText(whole, taken, '-')} = ?`,
      ...nearOptions(rand, left, [left + 10, left + 100, whole]),
      hint: `${whole} gồm ${hundreds / 100} trăm và ${tens / 10} chục. Em bớt đi ${taken}.`,
      solution: `${whole} gồm ${hundreds} và ${tens}. Bớt ${taken} thì còn ${left}. Vậy ${exprText(whole, taken, '-')} = ${left}.`,
    };
  },
};

/**
 * Setting a calculation out in columns.
 * @param {Range} range
 * @returns {ReviewSkill}
 */
export function columnSkill(range) {
  return {
    id: 'dat-tinh',
    label: 'Đặt tính rồi tính',
    make(rand) {
      const { a, b, op } = range.draw(rand);
      const r = resultOf(a, b, op);
      return {
        prompt: `Đặt tính rồi tính: ${exprText(a, b, op)}. Kết quả là bao nhiêu?`,
        visual: { type: 'column', a, b, op },
        ...nearOptions(rand, r, [forgotCarry(a, b, op) ?? r + 10], range.hi),
        hint: 'Em tính từ phải sang trái, bắt đầu từ hàng đơn vị. Nhớ 1 sang hàng bên trái khi cần.',
        solution: columnWords(a, b, op),
      };
    },
  };
}

/**
 * Judging a calculation already written in columns, as the book's Đ/S tasks do.
 * @param {Range} range
 * @returns {ReviewSkill}
 */
export function trueFalseSkill(range) {
  return {
    id: 'dung-sai',
    label: 'Phép tính đúng hay sai',
    make(rand) {
      const { a, b, op } = range.draw(rand);
      const r = resultOf(a, b, op);
      const holds = rand() < 0.5;
      const slips = [forgotCarry(a, b, op), r + 1, r > 11 ? r - 10 : r + 10].filter(
        (v) => v !== null && v > 0 && v !== r,
      );
      const shown = holds ? r : pick(rand, /** @type {number[]} */ (slips));
      return {
        prompt: 'Bạn Mai đã đặt tính và viết kết quả. Bạn ấy làm đúng hay sai?',
        visual: { type: 'column', a, b, op, shown },
        options: ['Đúng', 'Sai'],
        answer: holds ? 0 : 1,
        hint: 'Em tính lại từng hàng, từ phải sang trái, rồi so sánh với kết quả đã viết.',
        solution: holds
          ? `${columnWords(a, b, op)} Bạn Mai làm đúng.`
          : `${columnWords(a, b, op)} Bạn Mai viết ${shown} là sai.`,
      };
    },
  };
}

/**
 * Finding the one calculation below or above a limit; another one lands on the
 * limit itself, which counts as neither.
 * @param {Range} range
 * @returns {ReviewSkill}
 */
export function limitSkill(range) {
  return {
    id: 'gioi-han',
    label: 'Tìm phép tính theo kết quả',
    make(rand) {
      for (;;) {
        const below = rand() < 0.5;
        const c = range.draw(rand, false);
        const r = resultOf(c.a, c.b, c.op);
        const limit = below ? (Math.floor(r / 5) + 1) * 5 : (Math.ceil(r / 5) - 1) * 5;
        if (limit < 20 || limit > range.hi - 20) continue;
        const taken =
          range.hi === 100
            ? int(rand, 2, Math.min(limit - 2, 30))
            : int(rand, 1, Math.min(Math.floor((limit - 10) / 10), 30)) * 10;
        const onLimit =
          rand() < 0.5
            ? { a: limit - taken, b: taken, op: /** @type {Op} */ ('+') }
            : { a: limit + taken, b: taken, op: /** @type {Op} */ ('-') };
        if (Math.max(onLimit.a, onLimit.b) >= range.hi) continue;
        const calcs = [c, onLimit];
        for (let i = 0; i < 40 && calcs.length < 4; i++) {
          const d = range.draw(rand, false);
          const v = resultOf(d.a, d.b, d.op);
          const fits = below ? v > limit : v < limit;
          if (fits && !calcs.some((o) => exprText(o.a, o.b, o.op) === exprText(d.a, d.b, d.op))) {
            calcs.push(d);
          }
        }
        if (calcs.length < 4) continue;
        const word = below ? 'bé hơn' : 'lớn hơn';
        const right = exprText(c.a, c.b, c.op);
        return {
          prompt: `Phép tính nào có kết quả ${word} ${limit}?`,
          ...mixOptions(
            rand,
            right,
            calcs.slice(1).map((o) => exprText(o.a, o.b, o.op)),
          ),
          hint: `Em tính kết quả từng phép tính, rồi so sánh với ${limit}. Bằng ${limit} thì chưa được.`,
          solution: `${calcs.map(lineOf).join('. ')}. Chỉ có ${r} ${word} ${limit}, nên em chọn ${right}.`,
        };
      }
    },
  };
}

/**
 * Finding the calculation with the largest or the smallest result.
 * @param {Range} range
 * @returns {ReviewSkill}
 */
export function extremeSkill(range) {
  return {
    id: 'lon-be-nhat',
    label: 'Kết quả lớn nhất, bé nhất',
    make(rand) {
      /** @type {Calc[]} */
      const calcs = [];
      while (calcs.length < 4) {
        const c = range.draw(rand, false);
        const r = resultOf(c.a, c.b, c.op);
        if (!calcs.some((o) => resultOf(o.a, o.b, o.op) === r)) calcs.push(c);
      }
      const results = calcs.map((c) => resultOf(c.a, c.b, c.op));
      const largest = rand() < 0.5;
      const best = largest ? Math.max(...results) : Math.min(...results);
      const at = results.indexOf(best);
      const word = largest ? 'lớn nhất' : 'bé nhất';
      return {
        prompt: `Phép tính nào có kết quả ${word}?`,
        options: calcs.map((c) => exprText(c.a, c.b, c.op)),
        answer: at,
        hint: 'Em tính kết quả từng phép tính, rồi so sánh các kết quả.',
        solution: `${calcs.map(lineOf).join('. ')}. Số ${word} là ${best}, nên em chọn ${exprText(calcs[at].a, calcs[at].b, calcs[at].op)}.`,
      };
    },
  };
}

/**
 * Two signs in a row, worked from left to right.
 * @param {Range} range
 * @returns {ReviewSkill}
 */
export function twoSignsSkill(range) {
  const most = range.hi === 100 ? 30 : 200;
  return {
    id: 'hai-dau',
    label: 'Tính từ trái sang phải',
    make(rand) {
      for (;;) {
        const { a, b, op } = range.draw(rand);
        const first = resultOf(a, b, op);
        /** @type {Op} */
        const then = op === '+' ? '-' : '+';
        const room = then === '-' ? first - 1 : range.hi - 1 - first;
        if (room < 3) continue;
        const c = int(rand, 2, Math.min(room, most));
        const r = resultOf(first, c, then);
        if (carryCount(first, c, then) > 1) continue;
        const slip = then === '+' ? first - c : first + c;
        return {
          prompt: `${exprText(a, b, op)} ${then === '+' ? '+' : MINUS} ${c} = ?`,
          ...nearOptions(rand, r, [first, slip], range.hi),
          hint: 'Em tính từ trái sang phải: tính phép đầu trước, rồi lấy kết quả tính tiếp.',
          solution: `${exprText(a, b, op)} = ${first}. ${exprText(first, c, then)} = ${r}.`,
        };
      }
    },
  };
}

/**
 * A chain of calculations along arrows.
 * @param {Range} range
 * @returns {ReviewSkill}
 */
export function chainSkill(range) {
  const [lo, top, most] = range.hi === 100 ? [12, 60, 40] : [100, 600, 300];
  return {
    id: 'mui-ten',
    label: 'Tính theo mũi tên',
    make(rand) {
      for (;;) {
        const start = int(rand, lo, top);
        const count = int(rand, 2, 3);
        /** @type {import('./visual.js').ChainStep[]} */
        const steps = [];
        let v = start;
        while (steps.length < count) {
          /** @type {Op} */
          const op = v >= range.hi - lo || (v > lo && rand() < 0.5) ? '-' : '+';
          const room = op === '-' ? v - 2 : range.hi - 1 - v;
          const n = int(rand, 3, Math.min(room, most));
          if (carryCount(v, n, op) > 1) continue;
          v = resultOf(v, n, op);
          steps.push({
            sign: op === '+' ? '+' : MINUS,
            word: op === '+' ? 'cộng' : 'trừ',
            n,
            value: v,
          });
        }
        const before = steps[steps.length - 2].value;
        const last = steps[steps.length - 1];
        const flipped = last.sign === '+' ? before - last.n : before + last.n;
        if (flipped === last.value) continue;
        const words = [start, ...steps.map((s) => s.value)];
        return {
          prompt: 'Em tính theo chiều mũi tên. Ô cuối cùng là số nào?',
          visual: { type: 'chain', start, steps },
          ...nearOptions(rand, last.value, [before, flipped], range.hi),
          hint: 'Em tính từng phép từ trái sang phải. Kết quả của phép trước là số đầu của phép sau.',
          solution: `${steps.map((s, i) => `${words[i]} ${s.sign} ${s.n} = ${s.value}`).join('. ')}. Ô cuối cùng là ${last.value}.`,
        };
      }
    },
  };
}

/**
 * Comparing a calculation with a number or with another calculation.
 * @param {Range} range
 * @returns {ReviewSkill}
 */
export function compareCalcSkill(range) {
  return {
    id: 'so-sanh-tinh',
    label: 'So sánh phép tính',
    make(rand) {
      const { a, b, op } = range.draw(rand);
      const r = resultOf(a, b, op);
      const shape = int(rand, 0, 2);
      if (shape === 0) {
        const other = Math.max(1, r + int(rand, -6, 6));
        const sign = compareSign(r, other);
        return {
          prompt: `Chọn dấu đúng: ${exprText(a, b, op)} ... ${other}`,
          ...signOptions(sign),
          hint: 'Em tính kết quả phép tính, rồi so sánh với số bên phải.',
          solution: `${exprText(a, b, op)} = ${r}. ${r} ${sign} ${other}, nên ${exprText(a, b, op)} ${sign} ${other}.`,
        };
      }
      if (shape === 1) {
        const [x, y] = op === '+' ? [a, b] : [r, b];
        if (x === y) return this.make(rand);
        return {
          prompt: `Chọn dấu đúng: ${exprText(x, y, '+')} ... ${exprText(y, x, '+')}`,
          ...signOptions('='),
          hint: 'Hai phép cộng có cùng hai số, chỉ đổi chỗ cho nhau.',
          solution: `${exprText(x, y, '+')} = ${x + y}, ${exprText(y, x, '+')} = ${x + y}. Khi đổi chỗ hai số, tổng không đổi.`,
        };
      }
      const whole = Math.max(a, b);
      const taken = () => {
        for (;;) {
          const t = int(rand, 2, whole - 1);
          if (carryCount(whole, t, '-') <= 1) return t;
        }
      };
      const [m, n] = [taken(), taken()];
      const [x, y] = [whole - m, whole - n];
      const sign = compareSign(x, y);
      return {
        prompt: `Chọn dấu đúng: ${exprText(whole, m, '-')} ... ${exprText(whole, n, '-')}`,
        ...signOptions(sign),
        hint: 'Em tính kết quả từng phép tính, rồi so sánh hai kết quả.',
        solution: `${exprText(whole, m, '-')} = ${x}, ${exprText(whole, n, '-')} = ${y}. ${x} ${sign} ${y}.`,
      };
    },
  };
}

/**
 * Finding a digit hidden in a calculation.
 * @param {Range} range
 * @returns {ReviewSkill}
 */
export function hiddenDigitSkill(range) {
  return {
    id: 'tim-chu-so',
    label: 'Tìm chữ số',
    make(rand) {
      for (;;) {
        const { a, b, op } = range.draw(rand);
        const whichA = rand() < 0.5;
        const n = whichA ? a : b;
        if (n < 10) continue;
        const text = String(n);
        const at = int(rand, 0, text.length - 1);
        const digit = Number(text[at]);
        const masked = `${text.slice(0, at)}?${text.slice(at + 1)}`;
        const r = resultOf(a, b, op);
        const sign = op === '+' ? '+' : MINUS;
        const shown = whichA ? `${masked} ${sign} ${b} = ${r}` : `${a} ${sign} ${masked} = ${r}`;
        return {
          prompt: `Chữ số nào thay được dấu hỏi? ${shown}`,
          ...numberOptions(rand, digit, at === 0 ? 1 : 0, 9),
          hint: 'Em đặt tính và tính lần lượt từng hàng từ phải sang trái để tìm hàng còn thiếu.',
          solution: `${exprText(a, b, op)} = ${r}, nên chữ số cần tìm là ${digit}.`,
        };
      }
    },
  };
}

/** Word problems within 100, from the book's shapes. */
const STORIES_100 = [
  /** @param {() => number} rand */
  (rand) => {
    const a = int(rand, 62, 96);
    const b = int(rand, 8, 40);
    const r = a - b;
    return {
      prompt: `Quãng đường thứ nhất dài ${a} km. Quãng đường thứ hai dài ${b} km. Quãng đường thứ nhất dài hơn quãng đường thứ hai bao nhiêu ki-lô-mét?`,
      ...unitOptions(rand, r, 'km', [a + b, r + 10], 100),
      hint: 'Muốn biết dài hơn bao nhiêu, em lấy số lớn trừ số bé.',
      solution: `Quãng đường thứ nhất dài hơn quãng đường thứ hai là: ${a} ${MINUS} ${b} = ${r} (km). Đáp số: ${r} km.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const a = int(rand, 55, 70);
    const b = int(rand, 2, 9);
    return {
      prompt: `Năm nay bà ${a} tuổi. Ông hơn bà ${b} tuổi. Hỏi năm nay ông bao nhiêu tuổi?`,
      ...unitOptions(rand, a + b, 'tuổi', [a - b, a + b - 1], 100),
      hint: 'Ông hơn bà, nên em làm phép cộng.',
      solution: `Năm nay ông có số tuổi là: ${a} + ${b} = ${a + b} (tuổi). Đáp số: ${a + b} tuổi.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const a = int(rand, 18, 30);
    const b = int(rand, 3, 9);
    return {
      prompt: `Mỗi ngày, con bò nhà bác An cho ${a} l sữa. Con bò nhà bác Bình cho ít hơn con bò nhà bác An ${b} l. Hỏi con bò nhà bác Bình cho bao nhiêu lít sữa mỗi ngày?`,
      ...unitOptions(rand, a - b, 'l', [a + b, a - b + 1], 100),
      hint: 'Ít hơn thì em làm phép trừ.',
      solution: `Con bò nhà bác Bình cho số lít sữa là: ${a} ${MINUS} ${b} = ${a - b} (l). Đáp số: ${a - b} l.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const a = int(rand, 18, 57);
    const b = int(rand, 15, 40);
    return {
      prompt: `Thư viện lớp có ${a} quyển truyện và ${b} quyển thơ. Hỏi thư viện lớp có tất cả bao nhiêu quyển sách?`,
      ...unitOptions(rand, a + b, 'quyển', [a + b - 10, a + b + 10], 100),
      hint: 'Có tất cả là gộp lại, em làm phép cộng.',
      solution: `Thư viện lớp có tất cả số quyển sách là: ${a} + ${b} = ${a + b} (quyển). Đáp số: ${a + b} quyển sách.`,
    };
  },
];

/**
 * Two numbers from their ranges whose calculation carries at most once, as the
 * book's calculations do.
 * @param {() => number} rand
 * @param {[number, number]} rangeA
 * @param {[number, number]} rangeB
 * @param {Op} op
 * @returns {[number, number]}
 */
function storyNumbers(rand, rangeA, rangeB, op) {
  for (;;) {
    const a = int(rand, ...rangeA);
    const b = int(rand, ...rangeB);
    if (carryCount(a, b, op) <= 1) return [a, b];
  }
}

/** Word problems within 1000, from the book's shapes. */
const STORIES_1000 = [
  /** @param {() => number} rand */
  (rand) => {
    const [a, b] = storyNumbers(rand, [120, 480], [110, 450], '+');
    return {
      prompt: `Trường Lê Lợi trồng được ${a} cây. Trường Nguyễn Trãi trồng được ${b} cây. Hỏi cả hai trường trồng được bao nhiêu cây?`,
      ...unitOptions(rand, a + b, 'cây', [a + b - 10, a + b + 10, a + b - 100]),
      hint: 'Cả hai trường là gộp lại, em làm phép cộng.',
      solution: `Cả hai trường trồng được số cây là: ${a} + ${b} = ${a + b} (cây). Đáp số: ${a + b} cây.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const [a, b] = storyNumbers(rand, [350, 750], [18, 180], '-');
    return {
      prompt: `Trường Lê Lợi trồng được ${a} cây. Trường Nguyễn Trãi trồng được ít hơn Trường Lê Lợi ${b} cây. Hỏi Trường Nguyễn Trãi trồng được bao nhiêu cây?`,
      ...unitOptions(rand, a - b, 'cây', [a + b, a - b + 10]),
      hint: 'Ít hơn thì em làm phép trừ.',
      solution: `Trường Nguyễn Trãi trồng được số cây là: ${a} ${MINUS} ${b} = ${a - b} (cây). Đáp số: ${a - b} cây.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const [a, b] = storyNumbers(rand, [110, 480], [120, 450], '+');
    return {
      prompt: `Từ thành phố A đến thành phố B dài ${a} km. Từ thành phố B đến thành phố C dài ${b} km. Hỏi đi từ A đến C, qua B, dài bao nhiêu ki-lô-mét?`,
      ...unitOptions(rand, a + b, 'km', [a + b - 10, a + b + 100]),
      hint: 'Em cộng độ dài hai quãng đường.',
      solution: `Quãng đường từ A đến C, qua B, dài là: ${a} + ${b} = ${a + b} (km). Đáp số: ${a + b} km.`,
    };
  },
  /** @param {() => number} rand */
  (rand) => {
    const [a, b] = storyNumbers(rand, [112, 132], [92, 108], '-');
    return {
      prompt: `Chị Mai cao ${a} cm. Em Mi cao ${b} cm. Hỏi chị Mai cao hơn em Mi bao nhiêu xăng-ti-mét?`,
      ...unitOptions(rand, a - b, 'cm', [a + b, a - b + 10]),
      hint: 'Muốn biết cao hơn bao nhiêu, em lấy số lớn trừ số bé.',
      solution: `Chị Mai cao hơn em Mi là: ${a} ${MINUS} ${b} = ${a - b} (cm). Đáp số: ${a - b} cm.`,
    };
  },
];

/**
 * Word problems drawn from a list.
 * @param {ReadonlyArray<(rand: () => number) => ReturnType<ReviewSkill['make']>>} stories
 * @returns {ReviewSkill}
 */
function storySkill(stories) {
  return {
    id: 'bai-toan',
    label: 'Giải bài toán',
    make: (rand) => pick(rand, stories)(rand),
  };
}

/** The parts of the review within 100. */
export const ADD_SUB_100_SKILLS = [
  mentalTensSkill,
  columnSkill(RANGE_100),
  trueFalseSkill(RANGE_100),
  limitSkill(RANGE_100),
  extremeSkill(RANGE_100),
  twoSignsSkill(RANGE_100),
  chainSkill(RANGE_100),
  compareCalcSkill(RANGE_100),
  hiddenDigitSkill(RANGE_100),
  storySkill(STORIES_100),
];

/** The word problems of the review within 1000. */
export const story1000Skill = storySkill(STORIES_1000);

/** The parts of the review within 1000. */
export const ADD_SUB_1000_SKILLS = [
  mentalHundredsSkill,
  columnSkill(RANGE_1000),
  trueFalseSkill(RANGE_1000),
  limitSkill(RANGE_1000),
  extremeSkill(RANGE_1000),
  twoSignsSkill(RANGE_1000),
  chainSkill(RANGE_1000),
  compareCalcSkill(RANGE_1000),
  hiddenDigitSkill(RANGE_1000),
  story1000Skill,
];
