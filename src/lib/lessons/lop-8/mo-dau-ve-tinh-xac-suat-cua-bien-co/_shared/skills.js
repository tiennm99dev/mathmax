/**
 * Question generators for the chapter "Mở đầu về tính xác suất của biến
 * cố", one skill per lesson plus one for real-life problems. Answers are
 * counts (natural numbers) or probabilities; a probability travels as its
 * value k/n, which `readProbability` and `probabilityText` from
 * `#lib/core/fractions.js` read and write. Prompts and steps are plain text.
 */

import { countsAsNaturals, int, pick } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { ratioText } from '#lib/core/fractions.js';
import { isPrime } from '#lib/numtheory-engine/index.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * @typedef {object} Condition
 * @property {string} phrase what is said about the number, after 'ghi số'
 * @property {(k: number) => boolean} test
 */

/**
 * A condition on a number from `lo` to `hi` that at least one and not every
 * number meets.
 * @param {() => number} rand @param {number} lo @param {number} hi
 * @returns {Condition}
 */
export function condition(rand, lo, hi) {
  for (;;) {
    const kind = pick(rand, ['chan', 'le', 'chia', 'nguyen-to', 'lon-hon']);
    /** @type {Condition} */
    let c;
    if (kind === 'chan') c = { phrase: 'chẵn', test: (k) => k % 2 === 0 };
    else if (kind === 'le') c = { phrase: 'lẻ', test: (k) => k % 2 === 1 };
    else if (kind === 'chia') {
      const d = pick(rand, [3, 4, 5, 6]);
      c = { phrase: `chia hết cho ${d}`, test: (k) => k % d === 0 };
    } else if (kind === 'nguyen-to') c = { phrase: 'nguyên tố', test: isPrime };
    else {
      const t = int(rand, lo + 1, hi - 1);
      c = { phrase: `lớn hơn ${t}`, test: (k) => k > t };
    }
    let hits = 0;
    for (let k = lo; k <= hi; k++) if (c.test(k)) hits++;
    if (hits > 0 && hits < hi - lo + 1) return c;
  }
}

/**
 * @param {number} lo @param {number} hi @param {(k: number) => boolean} test
 * @returns {number[]}
 */
export const numbersIn = (lo, hi, test) => {
  const out = [];
  for (let k = lo; k <= hi; k++) if (test(k)) out.push(k);
  return out;
};

/** @param {number[]} list */
const listText = (list) =>
  list.length <= 12 ? list.join('; ') : `${list.slice(0, 3).join('; ')}; ...; ${list.at(-1)}`;

const COLOURS = ['đỏ', 'xanh', 'vàng'];

/** @type {Skill} */
export const ketQua = countsAsNaturals({
  id: 'ket-qua',
  label: 'Bài 30. Kết quả có thể và kết quả thuận lợi',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = int(rand, 1, 30);
      const b = a + int(rand, 9, 40);
      const n = b - a + 1;
      return {
        prompt: `Một hộp có các tấm thẻ ghi các số tự nhiên từ ${a} đến ${b}, mỗi thẻ ghi một số khác nhau. Rút ngẫu nhiên một tấm thẻ. Có bao nhiêu kết quả có thể?`,
        answer: n,
        hints: [
          'Mỗi tấm thẻ có thể được rút ra là một kết quả có thể.',
          'Số các số tự nhiên từ a đến b là b − a + 1.',
        ],
        steps: [
          `Các kết quả có thể là rút được thẻ ghi ${a}; ${a + 1}; ...; ${b}.`,
          `Có ${b} − ${a} + 1 = ${n} kết quả có thể.`,
        ],
      };
    }
    if (v === 1) {
      const n = int(rand, 10, 30);
      const c = condition(rand, 1, n);
      const fav = numbersIn(1, n, c.test);
      return {
        prompt: `Rút ngẫu nhiên một tấm thẻ từ hộp có ${n} tấm thẻ ghi các số 1; 2; ...; ${n}. Có bao nhiêu kết quả thuận lợi cho biến cố "Rút được thẻ ghi số ${c.phrase}"?`,
        answer: fav.length,
        hints: [
          'Kết quả thuận lợi là các thẻ làm cho biến cố xảy ra.',
          `Liệt kê các số từ 1 đến ${n} là số ${c.phrase}.`,
        ],
        steps: [
          `Các thẻ ghi số ${c.phrase} là: ${listText(fav)}.`,
          `Vậy có ${fav.length} kết quả thuận lợi.`,
        ],
      };
    }
    if (v === 2) {
      const total = int(rand, 28, 40);
      const girls = int(rand, 10, total - 12);
      const boys = total - girls;
      const glasses = int(rand, 2, Math.min(girls, boys) - 2);
      if (rand() < 0.5) {
        return {
          prompt: `Lớp 8A có ${total} học sinh, trong đó có ${girls} bạn nữ; có ${glasses} bạn nữ đeo kính. Chọn ngẫu nhiên một học sinh. Có bao nhiêu kết quả thuận lợi cho biến cố "Học sinh được chọn là nữ không đeo kính"?`,
          answer: girls - glasses,
          hints: ['Mỗi học sinh là một kết quả có thể.', 'Bớt các bạn nữ đeo kính khỏi số bạn nữ.'],
          steps: [`Số bạn nữ không đeo kính: ${girls} − ${glasses} = ${girls - glasses}.`],
        };
      }
      return {
        prompt: `Lớp 8A có ${total} học sinh, trong đó có ${girls} bạn nữ; có ${glasses} bạn nam đeo kính. Chọn ngẫu nhiên một học sinh. Có bao nhiêu kết quả thuận lợi cho biến cố "Học sinh được chọn là nam không đeo kính"?`,
        answer: boys - glasses,
        hints: ['Tính số bạn nam trước.'],
        steps: [
          `Số bạn nam: ${total} − ${girls} = ${boys}.`,
          `Số bạn nam không đeo kính: ${boys} − ${glasses} = ${boys - glasses}.`,
        ],
      };
    }
    const counts = [int(rand, 2, 9), int(rand, 2, 9), int(rand, 2, 9)];
    const not = int(rand, 0, 2);
    const others = [0, 1, 2].filter((i) => i !== not);
    const fav = counts[others[0]] + counts[others[1]];
    return {
      prompt: `Một túi có ${counts[0]} viên bi đỏ, ${counts[1]} viên bi xanh và ${counts[2]} viên bi vàng cùng kích thước. Lấy ngẫu nhiên một viên bi. Có bao nhiêu kết quả thuận lợi cho biến cố "Lấy được viên bi không phải màu ${COLOURS[not]}"?`,
      answer: fav,
      hints: [
        'Mỗi viên bi là một kết quả có thể.',
        `Bi không phải màu ${COLOURS[not]} gồm những màu nào?`,
      ],
      steps: [
        `Bi không phải màu ${COLOURS[not]} là bi ${COLOURS[others[0]]} hoặc bi ${COLOURS[others[1]]}.`,
        `Số kết quả thuận lợi: ${counts[others[0]]} + ${counts[others[1]]} = ${fav}.`,
      ],
    };
  },
});

/** @type {Skill} */
export const tiSo = countsAsNaturals({
  id: 'ti-so',
  label: 'Bài 31. Cách tính xác suất của biến cố bằng tỉ số',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const counts = [int(rand, 1, 9), int(rand, 1, 9), int(rand, 1, 9)];
      const n = counts[0] + counts[1] + counts[2];
      const c = int(rand, 0, 2);
      const p = counts[c] / n;
      return {
        prompt: `Một túi có ${counts[0]} viên bi đỏ, ${counts[1]} viên bi xanh và ${counts[2]} viên bi vàng cùng kích thước. Lấy ngẫu nhiên một viên bi. Tính xác suất của biến cố "Lấy được viên bi màu ${COLOURS[c]}".`,
        answer: p,
        hints: [
          'Mỗi viên bi là một kết quả có thể; các kết quả đồng khả năng.',
          'P(E) = số kết quả thuận lợi : tổng số kết quả có thể.',
        ],
        steps: [
          `Có ${counts[0]} + ${counts[1]} + ${counts[2]} = ${n} kết quả có thể, đồng khả năng.`,
          `Có ${counts[c]} kết quả thuận lợi.`,
          `P(E) = ${ratioText(counts[c], n)}.`,
        ],
      };
    }
    if (v === 1) {
      const lo = pick(rand, [1, 1, 10, 20]);
      const hi = lo + int(rand, 9, 29);
      const c = condition(rand, lo, hi);
      const fav = numbersIn(lo, hi, c.test);
      const n = hi - lo + 1;
      return {
        prompt: `Một hộp có các tấm thẻ như nhau ghi các số ${lo}; ${lo + 1}; ...; ${hi}, mỗi thẻ một số. Rút ngẫu nhiên một tấm thẻ. Tính xác suất của biến cố "Rút được thẻ ghi số ${c.phrase}".`,
        answer: fav.length / n,
        hints: [`Đếm số thẻ: từ ${lo} đến ${hi}.`, `Liệt kê các số ${c.phrase} trong khoảng đó.`],
        steps: [
          `Có ${hi} − ${lo} + 1 = ${n} kết quả có thể, đồng khả năng.`,
          `Các số ${c.phrase}: ${listText(fav)}, gồm ${fav.length} số.`,
          `P(E) = ${ratioText(fav.length, n)}.`,
        ],
      };
    }
    if (v === 2) {
      const c = condition(rand, 1, 6);
      const fav = numbersIn(1, 6, c.test);
      return {
        prompt: `Gieo một con xúc xắc cân đối. Tính xác suất của biến cố "Số chấm xuất hiện là số ${c.phrase}".`,
        answer: fav.length / 6,
        hints: ['Sáu mặt đồng khả năng.', `Mặt nào có số chấm là số ${c.phrase}?`],
        steps: [
          `Có 6 kết quả có thể, đồng khả năng.`,
          `Kết quả thuận lợi: mặt ${fav.join('; ')} chấm, gồm ${fav.length} kết quả.`,
          `P(E) = ${ratioText(fav.length, 6)}.`,
        ],
      };
    }
    const red = int(rand, 2, 6);
    const q = int(rand, 3, 6);
    const blue = red * q - red;
    return {
      prompt: `Một hộp có ${red} viên bi đỏ và một số viên bi xanh cùng kích thước. Lấy ngẫu nhiên một viên bi, xác suất lấy được bi đỏ là 1/${q}. Hộp có bao nhiêu viên bi xanh?`,
      answer: blue,
      hints: [`Gọi tổng số bi là n thì ${red}/n = 1/${q}.`, 'Tìm n rồi trừ đi số bi đỏ.'],
      steps: [
        `${red}/n = 1/${q} nên n = ${red} · ${q} = ${red * q}.`,
        `Số bi xanh: ${red * q} − ${red} = ${blue}.`,
      ],
    };
  },
});

/** @type {Skill} */
export const thucNghiem = countsAsNaturals({
  id: 'thuc-nghiem',
  label: 'Bài 32. Xác suất thực nghiệm và ứng dụng',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const n = pick(rand, [50, 60, 80, 100, 120, 150, 200]);
      const face = int(rand, 1, 6);
      const k = Math.round(n / 6) + int(rand, -4, 4);
      return {
        prompt: `Gieo một con xúc xắc ${n} lần, mặt ${face} chấm xuất hiện ${k} lần. Tính xác suất thực nghiệm của biến cố "Xuất hiện mặt ${face} chấm".`,
        answer: k / n,
        hints: ['Xác suất thực nghiệm = số lần biến cố xảy ra : số lần thực nghiệm.'],
        steps: [`n = ${n}, k = ${k}.`, `Xác suất thực nghiệm: ${ratioText(k, n)}.`],
      };
    }
    if (v === 1) {
      const n = pick(rand, [40, 50, 80, 100, 200, 250]);
      const k = int(rand, Math.round(n * 0.2), Math.round(n * 0.8));
      const what = pick(rand, [
        'thích đọc sách',
        'đi xe đạp đến trường',
        'ủng hộ việc phân loại rác',
        'có tham gia câu lạc bộ thể thao',
      ]);
      return {
        prompt: `Hỏi ngẫu nhiên ${n} học sinh của một trường, có ${k} bạn ${what}. Ước lượng xác suất của biến cố "Một học sinh được chọn ngẫu nhiên ${what}".`,
        answer: k / n,
        hints: ['Xác suất được ước lượng bằng xác suất thực nghiệm k/n.'],
        steps: [`n = ${n}, k = ${k}.`, `P ≈ ${ratioText(k, n)}.`],
      };
    }
    if (v === 2) {
      const n = pick(rand, [50, 100, 200, 250, 400, 500]);
      const d = int(rand, 1, 9);
      const m = pick(rand, [10, 20, 25, 40, 50]);
      const lot = n * m;
      return {
        prompt: `Kiểm tra ngẫu nhiên ${n} sản phẩm của một nhà máy thấy có ${d} sản phẩm bị lỗi. Ước lượng số sản phẩm bị lỗi trong một lô ${fmt(lot)} sản phẩm.`,
        answer: d * m,
        hints: [
          `Xác suất một sản phẩm bị lỗi được ước lượng là ${d}/${n}.`,
          'Nhân xác suất đó với số sản phẩm của lô.',
        ],
        steps: [
          `Xác suất thực nghiệm: ${d}/${n}.`,
          `Số sản phẩm lỗi ≈ ${fmt(lot)} · ${d}/${n} = ${fmt(d * m)}.`,
        ],
      };
    }
    const marked = pick(rand, [40, 50, 60, 80, 100, 120]);
    const k = pick(rand, [2, 4, 5, 8, 10]);
    const t = int(rand, 8, 20);
    const caught = k * t;
    const total = marked * t;
    return {
      prompt: `Người ta bắt ${marked} con cá trong một hồ, đánh dấu rồi thả lại. Ít ngày sau bắt ngẫu nhiên ${caught} con thì thấy có ${k} con được đánh dấu. Ước lượng số cá trong hồ.`,
      answer: total,
      hints: [
        'Tỉ lệ cá có đánh dấu trong lần bắt sau xấp xỉ tỉ lệ cá có đánh dấu trong cả hồ.',
        `${marked}/N ≈ ${k}/${caught}.`,
      ],
      steps: [
        `Gọi N là số cá trong hồ: ${marked}/N ≈ ${k}/${caught}.`,
        `N ≈ ${marked} · ${caught} : ${k} = ${fmt(total)}.`,
      ],
    };
  },
});

/** @type {Skill} */
export const thucTe = countsAsNaturals({
  id: 'thuc-te',
  label: 'Vận dụng thực tế',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const tickets = pick(rand, [50, 60, 80, 100, 120, 200]);
      const win = int(rand, 2, 15);
      return {
        prompt: `Một hội chợ có ${tickets} phiếu bốc thăm như nhau, trong đó có ${win} phiếu trúng thưởng. Bạn Minh bốc ngẫu nhiên một phiếu đầu tiên. Tính xác suất Minh bốc được phiếu trúng thưởng.`,
        answer: win / tickets,
        hints: ['Mỗi phiếu là một kết quả có thể, đồng khả năng.'],
        steps: [
          `Có ${tickets} kết quả có thể, ${win} kết quả thuận lợi.`,
          `P = ${ratioText(win, tickets)}.`,
        ],
      };
    }
    if (v === 1) {
      const red = int(rand, 2, 8);
      const blue = red + int(rand, 2, 8);
      return {
        prompt: `Một hộp có ${red} viên bi đỏ và ${blue} viên bi xanh cùng kích thước. Cần cho thêm vào hộp bao nhiêu viên bi đỏ để xác suất lấy ngẫu nhiên được bi đỏ bằng 1/2?`,
        answer: blue - red,
        hints: ['Xác suất lấy được bi đỏ bằng 1/2 khi số bi đỏ bằng số bi xanh.'],
        steps: [
          `P(đỏ) = 1/2 khi số bi đỏ bằng số bi xanh, tức bằng ${blue}.`,
          `Số bi đỏ cần thêm: ${blue} − ${red} = ${blue - red}.`,
        ],
      };
    }
    if (v === 2) {
      const n = pick(rand, [100, 200, 400, 500]);
      const k = int(rand, Math.round(n * 0.3), Math.round(n * 0.9));
      const m = pick(rand, [10, 20, 30, 50]);
      const pop = n * m;
      return {
        prompt: `Hỏi ngẫu nhiên ${n} người dân của một phường có ${fmt(pop)} người, có ${k} người ủng hộ việc trồng thêm cây xanh. Ước lượng số người dân của phường ủng hộ việc trồng thêm cây xanh.`,
        answer: k * m,
        hints: [`Xác suất một người ủng hộ được ước lượng là ${k}/${n}.`],
        steps: [
          `Xác suất thực nghiệm: ${k}/${n}.`,
          `Số người ủng hộ ≈ ${fmt(pop)} · ${k}/${n} = ${fmt(k * m)}.`,
        ],
      };
    }
    const events = [
      { text: 'Hai đồng xu cùng xuất hiện mặt sấp', fav: ['SS'] },
      { text: 'Hai đồng xu xuất hiện hai mặt giống nhau', fav: ['SS', 'NN'] },
      { text: 'Có ít nhất một đồng xu xuất hiện mặt ngửa', fav: ['SN', 'NS', 'NN'] },
      { text: 'Có đúng một đồng xu xuất hiện mặt ngửa', fav: ['SN', 'NS'] },
    ];
    const e = pick(rand, events);
    return {
      prompt: `Tung đồng thời hai đồng xu cân đối. Tính xác suất của biến cố "${e.text}".`,
      answer: e.fav.length / 4,
      hints: [
        'Liệt kê các kết quả có thể: SS, SN, NS, NN (S: sấp, N: ngửa).',
        'Bốn kết quả này đồng khả năng.',
      ],
      steps: [
        'Có 4 kết quả có thể, đồng khả năng: SS, SN, NS, NN.',
        `Kết quả thuận lợi: ${e.fav.join(', ')}.`,
        `P = ${ratioText(e.fav.length, 4)}.`,
      ],
    };
  },
});

/** The three lessons of the chapter, for the practice lesson. */
export const PRACTICE_SKILLS = [ketQua, tiSo, thucNghiem];

/** The chapter review: every lesson plus real-life problems. */
export const CHAPTER_SKILLS = [ketQua, tiSo, thucNghiem, thucTe];
