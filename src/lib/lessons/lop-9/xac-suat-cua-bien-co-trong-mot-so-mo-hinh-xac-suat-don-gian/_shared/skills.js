/**
 * Question generators for the chapter "Xác suất của biến cố trong một số mô
 * hình xác suất đơn giản", for the drill board of its practice and review
 * lessons. Answers are counts (natural numbers: how many outcomes) or
 * probabilities k/n, read with `readProbability` and written with
 * `countOrProbabilityText` from `#lib/core/fractions.js`. Prompts, hints and
 * steps are rich text with inline TeX.
 */

import { countsAsNaturals, int, pick } from '#lib/core/drill.js';
import { ratioTex } from '#lib/core/fractions.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A probability step: 'P = 6/36 = 1/6' in TeX.
 * @param {number} k
 * @param {number} n
 */
const pTex = (k, n) => `P = ${k === 0 ? `\\dfrac{0}{${n}} = 0` : ratioTex(k, n)}`;

/**
 * Every ordered pair (a, b) of the numbers 1..m, with a ≠ b when `distinct`.
 * @param {number} m
 * @param {boolean} distinct
 * @returns {Array<[number, number]>}
 */
export function pairs(m, distinct) {
  /** @type {Array<[number, number]>} */
  const out = [];
  for (let a = 1; a <= m; a++)
    for (let b = 1; b <= m; b++) if (!distinct || a !== b) out.push([a, b]);
  return out;
}

/**
 * A list of outcomes as plain text, '(1, 6); (2, 5)', so a long list wraps
 * on a narrow screen (a TeX span never breaks).
 * @param {ReadonlyArray<readonly (number | string)[]>} list
 */
export const pairsText = (list) => list.map((p) => `(${p.join(', ')})`).join('; ');

/** @type {Skill} */
export const khongGianMau = countsAsNaturals({
  id: 'khong-gian-mau',
  label: 'Bài 25. Số phần tử của không gian mẫu',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const k = int(rand, 2, 4);
      const n = 2 ** k;
      return {
        prompt: `Tung một đồng xu $${k}$ lần liên tiếp. Không gian mẫu có bao nhiêu phần tử?`,
        answer: n,
        hints: ['Vẽ sơ đồ cây: mỗi lần tung tách mỗi nhánh thành $2$ nhánh $S, N$.'],
        steps: [
          `Mỗi lần tung có $2$ kết quả, sơ đồ cây có $${k}$ tầng.`,
          `Số ngọn của cây: $${Array(k).fill(2).join(' \\cdot ')} = ${n}$.`,
        ],
      };
    }
    if (v === 1 || v === 2) {
      const m = int(rand, 3, 9);
      const back = v === 2;
      const n = back ? m * m : m * (m - 1);
      return {
        prompt: `Hộp có $${m}$ tấm thẻ ghi các số từ $1$ đến $${m}$. Rút ngẫu nhiên lần lượt hai tấm thẻ, ${back ? 'thẻ rút ra lần đầu được trả lại hộp' : 'thẻ rút ra lần đầu không trả lại hộp'}. Không gian mẫu có bao nhiêu phần tử?`,
        answer: n,
        hints: [
          back
            ? 'Thẻ được trả lại, nên lần thứ hai vẫn có đủ số thẻ như lần đầu.'
            : 'Sau lần rút đầu, trong hộp còn ít hơn một thẻ.',
        ],
        steps: [
          `Lần thứ nhất có $${m}$ kết quả.`,
          back
            ? `Thẻ được trả lại nên lần thứ hai cũng có $${m}$ kết quả: $${m} \\cdot ${m} = ${n}$.`
            : `Lần thứ hai còn $${m - 1}$ thẻ: $${m} \\cdot ${m - 1} = ${n}$.`,
        ],
      };
    }
    if (v === 3) {
      const m = int(rand, 4, 10);
      const n = m * (m - 1);
      return {
        prompt: `Tổ có $${m}$ bạn. Chọn ngẫu nhiên một bạn làm tổ trưởng, rồi chọn ngẫu nhiên một bạn khác làm tổ phó. Không gian mẫu có bao nhiêu phần tử?`,
        answer: n,
        hints: ['Tổ trưởng và tổ phó là hai bạn khác nhau, có thứ tự.'],
        steps: [
          `Có $${m}$ cách chọn tổ trưởng, sau đó còn $${m - 1}$ cách chọn tổ phó.`,
          `Số phần tử: $${m} \\cdot ${m - 1} = ${n}$.`,
        ],
      };
    }
    const a = int(rand, 2, 5);
    const b = int(rand, 2, 6);
    return {
      prompt: `Hộp thứ nhất có $${a}$ viên bi, hộp thứ hai có $${b}$ viên bi; các viên bi đôi một khác màu. Lấy ngẫu nhiên từ mỗi hộp một viên bi. Không gian mẫu có bao nhiêu phần tử?`,
      answer: a * b,
      hints: [
        'Kẻ bảng: mỗi hàng là một viên của hộp thứ nhất, mỗi cột là một viên của hộp thứ hai.',
      ],
      steps: [`Bảng có $${a}$ hàng và $${b}$ cột.`, `Số phần tử: $${a} \\cdot ${b} = ${a * b}$.`],
    };
  },
});

/**
 * @typedef {object} DiceAsk
 * @property {string} phrase the event, after 'biến cố'
 * @property {(i: number, j: number) => boolean} test
 * @property {string} hint
 */

/**
 * A random event on two dice that has at least one favourable outcome.
 * @param {() => number} rand
 * @returns {DiceAsk}
 */
function diceEvent(rand) {
  const v = int(rand, 0, 4);
  if (v === 0) {
    const s = int(rand, 3, 11);
    return {
      phrase: `"Tổng số chấm xuất hiện bằng $${s}$"`,
      test: (i, j) => i + j === s,
      hint: `Liệt kê các cặp $(i, j)$ có $i + j = ${s}$.`,
    };
  }
  if (v === 1) {
    const s = int(rand, 4, 10);
    return {
      phrase: `"Tổng số chấm xuất hiện lớn hơn $${s}$"`,
      test: (i, j) => i + j > s,
      hint: `Đếm theo từng giá trị của tổng từ $${s + 1}$ đến $12$.`,
    };
  }
  if (v === 2) {
    const d = int(rand, 1, 4);
    return {
      phrase: `"Hai số chấm xuất hiện hơn kém nhau $${d}$"`,
      test: (i, j) => Math.abs(i - j) === d,
      hint: `Tìm các cặp có $i - j = ${d}$ hoặc $j - i = ${d}$.`,
    };
  }
  if (v === 3) {
    return pick(rand, [
      {
        phrase: '"Hai con xúc xắc xuất hiện số chấm bằng nhau"',
        test: (/** @type {number} */ i, /** @type {number} */ j) => i === j,
        hint: 'Các kết quả thuận lợi có dạng $(i, i)$.',
      },
      {
        phrase: '"Tích hai số chấm là số lẻ"',
        test: (/** @type {number} */ i, /** @type {number} */ j) => (i * j) % 2 === 1,
        hint: 'Tích lẻ khi cả hai số đều lẻ.',
      },
      {
        phrase: '"Có ít nhất một con xúc xắc xuất hiện mặt $1$ chấm"',
        test: (/** @type {number} */ i, /** @type {number} */ j) => i === 1 || j === 1,
        hint: 'Tô hàng $i = 1$ và cột $j = 1$ trên bảng; ô $(1, 1)$ chỉ đếm một lần.',
      },
    ]);
  }
  const t = int(rand, 1, 5);
  return {
    phrase: `"Cả hai con xúc xắc đều xuất hiện số chấm lớn hơn $${t}$"`,
    test: (i, j) => i > t && j > t,
    hint: `Mỗi con có $${6 - t}$ mặt lớn hơn $${t}$.`,
  };
}

/** @param {(i: number, j: number) => boolean} test */
const diceHits = (test) => pairs(6, false).filter(([i, j]) => test(i, j));

/** @type {Skill} */
export const ketQuaThuanLoi = countsAsNaturals({
  id: 'ket-qua-thuan-loi',
  label: 'Bài 26. Đếm kết quả thuận lợi',
  make(rand) {
    const e = diceEvent(rand);
    const hits = diceHits(e.test);
    return {
      prompt: `Gieo đồng thời hai con xúc xắc. Có bao nhiêu kết quả thuận lợi cho biến cố ${e.phrase}?`,
      answer: hits.length,
      hints: ['Mỗi kết quả là một cặp $(i, j)$ trong bảng $6 \\times 6$.', e.hint],
      steps: [
        hits.length <= 12
          ? `Các kết quả thuận lợi: ${pairsText(hits)}.`
          : `Đếm trên bảng $6 \\times 6$ các ô làm biến cố xảy ra.`,
        `Có $${hits.length}$ kết quả thuận lợi.`,
      ],
    };
  },
});

/** @type {Skill} */
export const haiXucXac = {
  id: 'hai-xuc-xac',
  label: 'Bài 26. Xác suất khi gieo hai con xúc xắc',
  make(rand) {
    const e = diceEvent(rand);
    const hits = diceHits(e.test);
    const k = hits.length;
    return {
      prompt: `Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất của biến cố ${e.phrase}.`,
      answer: k / 36,
      hints: ['Không gian mẫu có $36$ kết quả $(i, j)$ đồng khả năng.', e.hint],
      steps: [
        'Không gian mẫu có $n = 36$ phần tử đồng khả năng.',
        k <= 12
          ? `Các kết quả thuận lợi: ${pairsText(hits)}, nên $k = ${k}$.`
          : `Đếm trên bảng $6 \\times 6$: $k = ${k}$.`,
        `$${pTex(k, 36)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const rutThe = {
  id: 'rut-the',
  label: 'Bài 26. Xác suất khi rút thẻ',
  make(rand) {
    const m = int(rand, 4, 6);
    const all = pairs(m, true);
    const n = all.length;
    const v = int(rand, 0, 3);
    /** @type {{ phrase: string, test: (a: number, b: number) => boolean }} */
    let e;
    if (v === 0) {
      const parity = pick(rand, ['chẵn', 'lẻ']);
      e = {
        phrase: `"Tổng hai số ghi trên hai thẻ là số ${parity}"`,
        test: (a, b) => (a + b) % 2 === (parity === 'chẵn' ? 0 : 1),
      };
    } else if (v === 1) {
      e = {
        phrase: '"Số ghi trên thẻ thứ nhất lớn hơn số ghi trên thẻ thứ hai"',
        test: (a, b) => a > b,
      };
    } else if (v === 2) {
      const c = int(rand, 1, m);
      e = { phrase: `"Có một thẻ ghi số $${c}$"`, test: (a, b) => a === c || b === c };
    } else {
      const t = int(rand, 4, 2 * m - 2);
      e = { phrase: `"Tổng hai số ghi trên hai thẻ bằng $${t}$"`, test: (a, b) => a + b === t };
    }
    const hits = all.filter(([a, b]) => e.test(a, b));
    const k = hits.length;
    return {
      prompt: `Hộp có $${m}$ tấm thẻ ghi các số từ $1$ đến $${m}$. Rút ngẫu nhiên lần lượt hai tấm thẻ, thẻ rút ra lần đầu không trả lại hộp. Tính xác suất của biến cố ${e.phrase}.`,
      answer: k / n,
      hints: [
        `Không gian mẫu gồm các cặp $(a, b)$ với $a \\ne b$: có $${m} \\cdot ${m - 1}$ phần tử.`,
        'Liệt kê các cặp làm biến cố xảy ra; nhớ rằng $(a, b)$ và $(b, a)$ là hai kết quả khác nhau.',
      ],
      steps: [
        `Không gian mẫu có $n = ${m} \\cdot ${m - 1} = ${n}$ phần tử đồng khả năng.`,
        k === 0
          ? 'Không có kết quả thuận lợi nào, $k = 0$.'
          : k <= 12
            ? `Các kết quả thuận lợi: ${pairsText(hits)}, nên $k = ${k}$.`
            : `Đếm các cặp thuận lợi: $k = ${k}$.`,
        `$${pTex(k, n)}$.`,
      ],
    };
  },
};

/**
 * Every sequence of S and N of length k.
 * @param {number} k
 * @returns {string[]}
 */
export const coinWords = (k) =>
  Array.from({ length: 2 ** k }, (_, x) =>
    Array.from({ length: k }, (_, b) => ((x >> (k - 1 - b)) & 1 ? 'N' : 'S')).join(''),
  );

/** @type {Skill} */
export const dongXu = {
  id: 'dong-xu',
  label: 'Bài 26. Xác suất khi tung đồng xu',
  make(rand) {
    const k = int(rand, 2, 4);
    const words = coinWords(k);
    const n = words.length;
    const v = int(rand, 0, 2);
    /** @type {{ phrase: string, test: (w: string) => boolean }} */
    let e;
    if (v === 0) {
      const r = int(rand, 1, k - 1);
      e = {
        phrase: `"Có đúng $${r}$ lần xuất hiện mặt sấp"`,
        test: (w) => [...w].filter((c) => c === 'S').length === r,
      };
    } else if (v === 1) {
      e = { phrase: '"Có ít nhất một lần xuất hiện mặt ngửa"', test: (w) => w.includes('N') };
    } else {
      e = {
        phrase: '"Lần tung đầu tiên và lần tung cuối cùng xuất hiện cùng một mặt"',
        test: (w) => w[0] === w[w.length - 1],
      };
    }
    const hits = words.filter(e.test);
    return {
      prompt: `Tung một đồng xu cân đối $${k}$ lần liên tiếp. Tính xác suất của biến cố ${e.phrase}.`,
      answer: hits.length / n,
      hints: [
        `Vẽ sơ đồ cây: không gian mẫu có $${n}$ phần tử.`,
        'Đọc từng ngọn và đánh dấu kết quả thuận lợi.',
      ],
      steps: [
        `Không gian mẫu gồm các dãy $S, N$ dài $${k}$, có $n = ${n}$ phần tử đồng khả năng.`,
        `Các kết quả thuận lợi: ${hits.join('; ')}, nên $k = ${hits.length}$.`,
        `$${pTex(hits.length, n)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const xucXacDongXu = {
  id: 'xuc-xac-dong-xu',
  label: 'Bài 26. Gieo xúc xắc và tung đồng xu',
  make(rand) {
    const side = pick(rand, ['S', 'N']);
    const word = side === 'S' ? 'sấp' : 'ngửa';
    const v = int(rand, 0, 2);
    /** @type {{ phrase: string, test: (d: number) => boolean }} */
    let e;
    if (v === 0) {
      const parity = pick(rand, ['chẵn', 'lẻ']);
      e = { phrase: `số chấm là số ${parity}`, test: (d) => d % 2 === (parity === 'chẵn' ? 0 : 1) };
    } else if (v === 1) {
      const t = int(rand, 1, 5);
      e = { phrase: `số chấm lớn hơn $${t}$`, test: (d) => d > t };
    } else {
      e = { phrase: 'số chấm là số nguyên tố', test: (d) => d === 2 || d === 3 || d === 5 };
    }
    const faces = [1, 2, 3, 4, 5, 6].filter(e.test);
    const k = faces.length;
    return {
      prompt: `Gieo một con xúc xắc và tung một đồng xu, cả hai đều cân đối. Tính xác suất của biến cố "Xúc xắc có ${e.phrase} và đồng xu xuất hiện mặt ${word}".`,
      answer: k / 12,
      hints: [
        'Không gian mẫu gồm các cặp (số chấm, mặt đồng xu): $6 \\cdot 2 = 12$ phần tử.',
        `Đồng xu phải ra mặt $${side}$, nên chỉ xét các cặp có dạng $(d, ${side})$.`,
      ],
      steps: [
        'Không gian mẫu có $n = 6 \\cdot 2 = 12$ phần tử đồng khả năng.',
        `Các kết quả thuận lợi: ${pairsText(faces.map((d) => [d, side]))}, nên $k = ${k}$.`,
        `$${pTex(k, 12)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const chonNguoi = {
  id: 'chon-nguoi',
  label: 'Bài 26. Chọn người, chọn phiếu',
  make(rand) {
    const names = ['An', 'Bình', 'Chi', 'Dũng', 'Hà', 'Khánh'];
    const m = int(rand, 4, 6);
    const team = names.slice(0, m);
    const n = m * (m - 1);
    const who = pick(rand, team);
    const v = int(rand, 0, 2);
    const other = team.find((x) => x !== who) ?? '';
    /** @type {{ phrase: string, k: number, list: string }} */
    let e;
    if (v === 0) {
      e = {
        phrase: `"${who} được chọn"`,
        k: 2 * (m - 1),
        list: `${who} làm tổ trưởng ($${m - 1}$ cách chọn tổ phó) hoặc ${who} làm tổ phó ($${m - 1}$ cách chọn tổ trưởng): $k = 2 \\cdot ${m - 1} = ${2 * (m - 1)}$`,
      };
    } else if (v === 1) {
      e = {
        phrase: `"${who} làm tổ trưởng"`,
        k: m - 1,
        list: `${who} làm tổ trưởng, tổ phó là một trong $${m - 1}$ bạn còn lại: $k = ${m - 1}$`,
      };
    } else {
      e = {
        phrase: `"Cả ${who} và ${other} đều được chọn"`,
        k: 2,
        list: `(${who}, ${other}) và (${other}, ${who}): $k = 2$`,
      };
    }
    return {
      prompt: `Tổ có $${m}$ bạn: ${team.join(', ')}. Chọn ngẫu nhiên một bạn làm tổ trưởng, rồi chọn ngẫu nhiên một bạn khác làm tổ phó. Tính xác suất của biến cố ${e.phrase}.`,
      answer: e.k / n,
      hints: [
        `Mỗi kết quả là một cặp (tổ trưởng, tổ phó); có $${m} \\cdot ${m - 1}$ kết quả.`,
        'Đếm các cặp làm biến cố xảy ra.',
      ],
      steps: [
        `Không gian mẫu có $n = ${m} \\cdot ${m - 1} = ${n}$ phần tử đồng khả năng.`,
        `Kết quả thuận lợi: ${e.list}.`,
        `$${pTex(e.k, n)}$.`,
      ],
    };
  },
};

/** Skills of the practice lesson after Bài 25 and Bài 26. */
export const PRACTICE_SKILLS = [khongGianMau, ketQuaThuanLoi, haiXucXac, rutThe, dongXu];

/** Every skill of the chapter, for the chapter review. */
export const CHAPTER_SKILLS = [...PRACTICE_SKILLS, xucXacDongXu, chonNguoi];
