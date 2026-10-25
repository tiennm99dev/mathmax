/**
 * Question generators for the chapter "Dữ liệu và xác suất thực nghiệm", one
 * skill per lesson. Every answer is a natural number (a count, a number of
 * pictograph symbols, a value read off a chart, a number of outcomes or an
 * experimental probability written as a whole percentage), so the drill board
 * writes it with its defaults; `readPercentOrNatural` also accepts a typed
 * percent sign.
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import { readNatural } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** @param {number[]} xs */
const total = (xs) => xs.reduce((s, x) => s + x, 0);

/** @param {number[]} xs */
const plus = (xs) => xs.join(' + ');

/** Data items for "how many of these are numbers": [text, isNumber]. */
const MIXED = /** @type {const} */ ([
  ['chiều cao 145 cm', true],
  ['cân nặng 38 kg', true],
  ['số anh chị em ruột: 2', true],
  ['tuổi: 11', true],
  ['cỡ giày 36', true],
  ['điểm Toán: 9', true],
  ['thời gian đến trường: 15 phút', true],
  ['màu yêu thích: xanh lá', false],
  ['môn học yêu thích: Ngữ văn', false],
  ['phương tiện đến trường: xe đạp', false],
  ['loại quả yêu thích: xoài', false],
  ['nơi sinh: Đà Nẵng', false],
  ['giới tính: nữ', false],
  ['con vật nuôi: mèo', false],
]);

/** @type {Skill} */
export const duLieu = {
  id: 'du-lieu',
  label: 'Bài 38. Dữ liệu và thu thập dữ liệu',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const good = Array.from({ length: int(rand, 5, 7) }, () => int(rand, 4, 10));
      const bad = Array.from({ length: int(rand, 1, 3) }, () => int(rand, 11, 19));
      const list = shuffle(rand, [...good, ...bad]);
      return {
        prompt: `Điểm kiểm tra môn Toán (thang điểm 10, điểm là số tự nhiên) của một tổ được ghi lại là: ${list.join('; ')}. Có bao nhiêu giá trị không hợp lí?`,
        answer: bad.length,
        hints: [
          'Điểm theo thang 10 phải nằm trong phạm vi từ 0 đến 10.',
          'Đếm các giá trị lớn hơn 10.',
        ],
        steps: [
          'Điểm hợp lí phải là số tự nhiên từ 0 đến 10.',
          `Các giá trị lớn hơn 10: ${bad.join('; ')}.`,
          `Có ${bad.length} giá trị không hợp lí.`,
        ],
      };
    }
    if (v === 1) {
      const items = shuffle(rand, MIXED).slice(0, int(rand, 5, 7));
      const numbers = items.filter((it) => it[1]);
      return {
        prompt: `Bạn Lan ghi lại thông tin về một bạn trong lớp: ${items.map((it) => it[0]).join('; ')}. Trong các dữ liệu trên, có bao nhiêu dữ liệu là số liệu?`,
        answer: numbers.length,
        hints: ['Số liệu là dữ liệu được ghi bằng số, như chiều cao, cân nặng, số lượng.'],
        steps: [
          numbers.length
            ? `Các dữ liệu là số: ${numbers.map((it) => it[0]).join('; ')}.`
            : 'Không có dữ liệu nào là số.',
          `Có ${numbers.length} dữ liệu là số liệu.`,
        ],
      };
    }
    const n = int(rand, 30, 42);
    const parts = [int(rand, 4, 9), int(rand, 4, 9), int(rand, 4, 9)];
    const last = n - total(parts);
    return {
      prompt: `Lớp 6A có ${n} học sinh, mỗi bạn chọn đúng một phương tiện đến trường. Bảng thống kê ghi: đi bộ ${parts[0]} bạn, xe đạp ${parts[1]} bạn, xe buýt ${parts[2]} bạn, được bố mẹ đưa đón ? bạn. Số ở ô "?" phải bằng bao nhiêu thì bảng mới hợp lí?`,
      answer: last,
      hints: [
        'Mỗi bạn chọn đúng một phương tiện, nên tổng số bạn trong bảng phải bằng sĩ số lớp.',
        `Lấy ${n} trừ đi số bạn của ba phương tiện đã biết.`,
      ],
      steps: [
        `Ba phương tiện đã biết có ${plus(parts)} = ${total(parts)} bạn.`,
        `Ô còn lại: ${n} − ${total(parts)} = ${last} bạn.`,
      ],
    };
  },
};

/** @type {Skill} */
export const bieuDoTranh = {
  id: 'bieu-do-tranh',
  label: 'Bài 39. Bảng thống kê và biểu đồ tranh',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const target = int(rand, 0, 3);
      const list = Array.from({ length: int(rand, 10, 14) }, () => int(rand, 0, 3));
      if (!list.includes(target)) list[int(rand, 0, list.length - 1)] = target;
      const count = list.filter((x) => x === target).length;
      return {
        prompt: `Số anh chị em ruột của các bạn trong một tổ là: ${list.join('; ')}. Khi lập bảng thống kê, ô ứng với "${target} anh chị em ruột" ghi số bạn là bao nhiêu?`,
        answer: count,
        hints: [`Đếm xem số ${target} xuất hiện bao nhiêu lần trong dãy dữ liệu.`],
        steps: [
          `Số ${target} xuất hiện ${count} lần trong dãy dữ liệu.`,
          `Ô cần tìm ghi ${count} bạn.`,
        ],
      };
    }
    const k = pick(rand, [2, 4, 6, 10, 20]);
    if (v === 1) {
      const whole = int(rand, 1, 6);
      const half = rand() < 0.5;
      const answer = whole * k + (half ? k / 2 : 0);
      return {
        prompt: `Trong một biểu đồ tranh, mỗi biểu tượng ứng với ${k} quyển sách. Hàng của lớp 6B có ${whole} biểu tượng${half ? ' và nửa biểu tượng' : ''}. Lớp 6B quyên góp được bao nhiêu quyển sách?`,
        answer,
        hints: [
          `Mỗi biểu tượng là ${k} quyển, nửa biểu tượng là ${k / 2} quyển.`,
          'Nhân số biểu tượng với số quyển ứng với một biểu tượng.',
        ],
        steps: [
          `${whole} biểu tượng ứng với ${whole} · ${k} = ${whole * k} quyển.`,
          half
            ? `Nửa biểu tượng ứng với ${k} : 2 = ${k / 2} quyển; tổng cộng ${whole * k} + ${k / 2} = ${answer} quyển.`
            : `Lớp 6B quyên góp được ${answer} quyển.`,
        ],
      };
    }
    const icons = int(rand, 2, 9);
    const value = icons * k;
    return {
      prompt: `Vẽ biểu đồ tranh biểu diễn số cây trồng được, mỗi biểu tượng ứng với ${k} cây. Lớp 6C trồng được ${value} cây. Hàng của lớp 6C cần vẽ bao nhiêu biểu tượng?`,
      answer: icons,
      hints: ['Chia số cây cho số cây ứng với một biểu tượng.'],
      steps: [`Số biểu tượng: ${value} : ${k} = ${icons}.`, `Cần vẽ ${icons} biểu tượng.`],
    };
  },
};

const SPORTS = ['bóng đá', 'cầu lông', 'bơi', 'bóng rổ', 'đá cầu', 'cờ vua'];

/** @type {Skill} */
export const bieuDoCot = {
  id: 'bieu-do-cot',
  label: 'Bài 40. Biểu đồ cột',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const s = pick(rand, [2, 5, 10, 20]);
      const m = int(rand, 2, 9);
      return {
        prompt: `Trên trục dọc của một biểu đồ cột, các vạch chia cách đều nhau và mỗi khoảng chia ứng với ${s} học sinh, bắt đầu từ 0. Cột "Cầu lông" cao đúng đến vạch thứ ${m} (không kể vạch 0). Có bao nhiêu học sinh thích cầu lông?`,
        answer: s * m,
        hints: ['Vạch thứ nhất ứng với một khoảng chia, vạch thứ hai ứng với hai khoảng chia, …'],
        steps: [`Vạch thứ ${m} ứng với ${m} · ${s} = ${s * m}.`, `Có ${s * m} học sinh.`],
      };
    }
    const names = shuffle(rand, SPORTS).slice(0, 4);
    const values = names.map(() => int(rand, 3, 15));
    // Two different heights, so "most" and "least" name different sports.
    if (Math.max(...values) === Math.min(...values)) values[0] += 2;
    const listing = names.map((n, i) => `${n} ${values[i]}`).join(', ');
    if (v === 1) {
      const answer = total(values);
      return {
        prompt: `Biểu đồ cột cho biết số học sinh lớp 6A thích mỗi môn thể thao (mỗi bạn chọn một môn), chiều cao các cột lần lượt là: ${listing}. Lớp 6A có bao nhiêu học sinh?`,
        answer,
        hints: ['Mỗi bạn chọn đúng một môn, nên sĩ số là tổng chiều cao các cột.'],
        steps: [`Tổng số học sinh: ${plus(values)} = ${answer}.`],
      };
    }
    const top = Math.max(...values);
    const bottom = Math.min(...values);
    return {
      prompt: `Biểu đồ cột cho biết số học sinh lớp 6A thích mỗi môn thể thao, chiều cao các cột lần lượt là: ${listing}. Môn được thích nhiều nhất hơn môn được thích ít nhất bao nhiêu học sinh?`,
      answer: top - bottom,
      hints: ['Tìm cột cao nhất và cột thấp nhất, rồi lấy hiệu.'],
      steps: [
        `Cột cao nhất: ${top}; cột thấp nhất: ${bottom}.`,
        `Chênh lệch: ${top} − ${bottom} = ${top - bottom} học sinh.`,
      ],
    };
  },
};

const CLASSES = ['6A', '6B', '6C', '6D'];

/** @type {Skill} */
export const bieuDoCotKep = {
  id: 'bieu-do-cot-kep',
  label: 'Bài 41. Biểu đồ cột kép',
  make(rand) {
    const boys = CLASSES.map(() => int(rand, 12, 24));
    const girls = CLASSES.map(() => int(rand, 12, 24));
    const i = int(rand, 0, 3);
    // The class asked about in the difference question never has a tie.
    if (boys[i] === girls[i]) girls[i] += 3;
    const listing = CLASSES.map((c, i) => `${c}: nam ${boys[i]}, nữ ${girls[i]}`).join('; ');
    const head = `Biểu đồ cột kép biểu diễn số học sinh nam và nữ của bốn lớp khối 6 (${listing}).`;
    const v = int(rand, 0, 2);
    if (v === 0) {
      const answer = total(girls);
      return {
        prompt: `${head} Khối 6 có tất cả bao nhiêu học sinh nữ?`,
        answer,
        hints: ['Cộng chiều cao các cột biểu diễn học sinh nữ của cả bốn lớp.'],
        steps: [`Số học sinh nữ: ${plus(girls)} = ${answer}.`],
      };
    }
    if (v === 1) {
      const prompt = `${head} Ở lớp ${CLASSES[i]}, số học sinh nam và số học sinh nữ chênh lệch nhau bao nhiêu bạn?`;
      const hi = Math.max(boys[i], girls[i]);
      const lo = Math.min(boys[i], girls[i]);
      return {
        prompt,
        answer: hi - lo,
        hints: [`So sánh hai cột cạnh nhau của lớp ${CLASSES[i]}.`],
        steps: [
          `Lớp ${CLASSES[i]} có ${boys[i]} nam và ${girls[i]} nữ.`,
          `Chênh lệch: ${hi} − ${lo} = ${hi - lo} bạn.`,
        ],
      };
    }
    const more = CLASSES.filter((_, i) => boys[i] > girls[i]);
    return {
      prompt: `${head} Có bao nhiêu lớp có số học sinh nam nhiều hơn số học sinh nữ?`,
      answer: more.length,
      hints: ['Ở mỗi lớp, so sánh cột nam với cột nữ đứng cạnh nó.'],
      steps: [
        more.length
          ? `Các lớp có cột nam cao hơn cột nữ: ${more.join(', ')}.`
          : 'Không lớp nào có cột nam cao hơn cột nữ.',
        `Có ${more.length} lớp.`,
      ],
    };
  },
};

/** Skills of "Luyện tập chung" on page 87: Bài 38 to Bài 41. */
export const PAGE_87_SKILLS = [duLieu, bieuDoTranh, bieuDoCot, bieuDoCotKep];

/**
 * Die events by the faces that make them happen.
 * @type {ReadonlyArray<readonly [string, readonly number[]]>}
 */
const DIE_EVENTS = [
  ['Số chấm xuất hiện là số chẵn', [2, 4, 6]],
  ['Số chấm xuất hiện là số lẻ', [1, 3, 5]],
  ['Số chấm xuất hiện là số nguyên tố', [2, 3, 5]],
  ['Số chấm xuất hiện là hợp số', [4, 6]],
  ['Số chấm xuất hiện chia hết cho 3', [3, 6]],
  ['Số chấm xuất hiện lớn hơn 4', [5, 6]],
  ['Số chấm xuất hiện nhỏ hơn 3', [1, 2]],
];

const COLOURS = ['xanh', 'đỏ', 'vàng', 'trắng', 'tím'];

/** @type {Skill} */
export const ketQuaSuKien = {
  id: 'ket-qua-su-kien',
  label: 'Bài 42. Kết quả có thể và sự kiện',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const n = int(rand, 10, 20);
      const d = int(rand, 2, 5);
      const hits = Array.from({ length: Math.floor(n / d) }, (_, k) => d * (k + 1));
      return {
        prompt: `Một hộp có ${n} tấm thẻ được đánh số từ 1 đến ${n}. Rút ngẫu nhiên một tấm thẻ. Có bao nhiêu kết quả có thể làm cho sự kiện "Số ghi trên thẻ chia hết cho ${d}" xảy ra?`,
        answer: hits.length,
        hints: [
          `Liệt kê các số từ 1 đến ${n} chia hết cho ${d}.`,
          `Đó là các bội của ${d}: ${d}; ${2 * d}; … không vượt quá ${n}.`,
        ],
        steps: [
          `Các số từ 1 đến ${n} chia hết cho ${d}: ${hits.join('; ')}.`,
          `Có ${hits.length} kết quả làm sự kiện xảy ra.`,
        ],
      };
    }
    if (v === 1) {
      const [text, faces] = pick(rand, DIE_EVENTS);
      return {
        prompt: `Gieo một con xúc xắc. Có bao nhiêu kết quả có thể làm cho sự kiện "${text}" xảy ra?`,
        answer: faces.length,
        hints: [
          'Các kết quả có thể là 1; 2; 3; 4; 5; 6 chấm.',
          'Kiểm tra từng kết quả xem sự kiện có xảy ra không.',
        ],
        steps: [
          `Các kết quả làm sự kiện xảy ra: ${faces.join('; ')} chấm.`,
          `Có ${faces.length} kết quả.`,
        ],
      };
    }
    if (v === 2) {
      const k = int(rand, 3, 5);
      const colours = COLOURS.slice(0, k);
      const pairs = colours.flatMap((a, i) => colours.slice(i + 1).map((b) => `(${a}, ${b})`));
      return {
        prompt: `Một hộp có ${k} quả bóng màu ${colours.join(', ')}. Lấy ra cùng lúc hai quả bóng. Có bao nhiêu kết quả có thể?`,
        answer: pairs.length,
        hints: [
          'Mỗi kết quả là một cặp hai màu khác nhau, không kể thứ tự.',
          `Ghép bóng ${colours[0]} với từng màu còn lại, rồi ghép bóng ${colours[1]} với các màu chưa ghép, …`,
        ],
        steps: [`Các kết quả có thể: ${pairs.join(', ')}.`, `Có ${pairs.length} kết quả.`],
      };
    }
    const a = int(rand, 1, 6);
    const b = int(rand, 1, 6);
    const s = a + b;
    const p = a * b;
    const events = [
      ['Tổng số chấm là số chẵn', s % 2 === 0, `${a} + ${b} = ${s} là số ${s % 2 ? 'lẻ' : 'chẵn'}`],
      ['Tổng số chấm lớn hơn 6', s > 6, `${s} ${s > 6 ? '>' : '≤'} 6`],
      ['Hai con xúc xắc có số chấm bằng nhau', a === b, a === b ? `${a} = ${b}` : `${a} ≠ ${b}`],
      [
        'Tích số chấm chia hết cho 3',
        p % 3 === 0,
        `${a} · ${b} = ${p} ${p % 3 ? 'không chia hết' : 'chia hết'} cho 3`,
      ],
    ];
    const yes = events.filter((e) => e[1]).length;
    return {
      prompt: `Gieo đồng thời hai con xúc xắc, được một con ${a} chấm và một con ${b} chấm. Trong bốn sự kiện "${events.map((e) => e[0]).join('", "')}", có bao nhiêu sự kiện xảy ra?`,
      answer: yes,
      hints: ['Tính tổng và tích số chấm, rồi xét từng sự kiện với kết quả đã có.'],
      steps: [
        ...events.map((e) => `"${e[0]}": ${e[2]}, nên ${e[1] ? 'xảy ra' : 'không xảy ra'}.`),
        `Có ${yes} sự kiện xảy ra.`,
      ],
    };
  },
};

/**
 * Five counts from lo to hi and a sixth that makes the total n, the sixth
 * kept from min to max.
 * @param {() => number} rand
 * @param {number} n
 */
function dieTable(rand, n) {
  const lo = Math.floor(n / 6) - 3;
  const hi = Math.floor(n / 6) + 3;
  for (;;) {
    const five = Array.from({ length: 5 }, () => int(rand, lo, hi));
    const last = n - total(five);
    if (last >= lo && last <= hi) return [...five, last];
  }
}

/** @type {Skill} */
export const xacSuatThucNghiem = {
  id: 'xac-suat-thuc-nghiem',
  label: 'Bài 43. Xác suất thực nghiệm',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const n = pick(rand, [10, 20, 25, 50]);
      const heads = int(rand, Math.round(n * 0.3), Math.round(n * 0.7));
      const askHeads = rand() < 0.5;
      const k = askHeads ? heads : n - heads;
      const answer = (k * 100) / n;
      return {
        prompt: `Tung một đồng xu ${n} lần, có ${heads} lần xuất hiện mặt ngửa. Xác suất thực nghiệm của sự kiện "Xuất hiện mặt ${askHeads ? 'ngửa' : 'sấp'}" bằng bao nhiêu phần trăm?`,
        answer,
        hints: askHeads
          ? [`Lập tỉ số ${heads}/${n} rồi đổi ra tỉ số phần trăm.`]
          : ['Mỗi lần tung chỉ được mặt sấp hoặc mặt ngửa.', `Số lần mặt sấp là ${n} − ${heads}.`],
        steps: [
          askHeads
            ? `n(A) = ${heads}, n = ${n}.`
            : `Số lần mặt sấp: n(A) = ${n} − ${heads} = ${k}.`,
          `Xác suất thực nghiệm: ${k}/${n} = ${answer}/100 = ${answer}%.`,
        ],
      };
    }
    if (v === 1) {
      const n = pick(rand, [20, 50, 100]);
      const k = int(rand, 2, Math.floor(n / 3));
      const pct = (k * 100) / n;
      return {
        prompt: `Gieo một con xúc xắc ${n} lần, xác suất thực nghiệm của sự kiện "Xuất hiện mặt 6 chấm" là ${pct}%. Mặt 6 chấm đã xuất hiện bao nhiêu lần?`,
        answer: k,
        hints: [`n(A)/${n} = ${pct}/100, nên n(A) = ${n} · ${pct} : 100.`],
        steps: [`n(A) = ${n} · ${pct} : 100 = ${k}.`, `Mặt 6 chấm xuất hiện ${k} lần.`],
      };
    }
    if (v === 2) {
      const n = pick(rand, [20, 25, 50, 100]);
      const colours = shuffle(rand, ['xanh', 'đỏ', 'vàng']);
      const a = int(rand, Math.ceil(n / 5), Math.floor(n / 2));
      const b = int(rand, Math.ceil(n / 5), n - a - Math.ceil(n / 5));
      const counts = [a, b, n - a - b];
      const j = int(rand, 0, 2);
      const k = n - counts[j];
      const answer = (k * 100) / n;
      const listing = colours.map((c, i) => `${c} ${counts[i]} lần`).join(', ');
      return {
        prompt: `Lấy một quả bóng từ hộp, xem màu rồi trả lại; lặp lại ${n} lần thì được: ${listing}. Xác suất thực nghiệm của sự kiện "Không lấy được bóng ${colours[j]}" bằng bao nhiêu phần trăm?`,
        answer,
        hints: [
          `Sự kiện xảy ra mỗi lần lấy được bóng không phải màu ${colours[j]}.`,
          `n(A) = ${n} − ${counts[j]}.`,
        ],
        steps: [
          `n(A) = ${n} − ${counts[j]} = ${k}.`,
          `Xác suất thực nghiệm: ${k}/${n} = ${answer}/100 = ${answer}%.`,
        ],
      };
    }
    const n = pick(rand, [50, 100]);
    const counts = dieTable(rand, n);
    const [text, faces] = pick(rand, DIE_EVENTS);
    const k = total(faces.map((f) => counts[f - 1]));
    const answer = (k * 100) / n;
    return {
      prompt: `Gieo một con xúc xắc ${n} lần, số lần xuất hiện các mặt 1, 2, 3, 4, 5, 6 chấm lần lượt là ${counts.join('; ')}. Xác suất thực nghiệm của sự kiện "${text}" bằng bao nhiêu phần trăm?`,
      answer,
      hints: [
        `Tìm các mặt làm sự kiện xảy ra, rồi cộng số lần xuất hiện của chúng.`,
        `Chia tổng đó cho ${n} rồi đổi ra tỉ số phần trăm.`,
      ],
      steps: [
        `Sự kiện xảy ra khi được ${faces.join('; ')} chấm.`,
        `n(A) = ${plus(faces.map((f) => counts[f - 1]))} = ${k}.`,
        `Xác suất thực nghiệm: ${k}/${n} = ${answer}/100 = ${answer}%.`,
      ],
    };
  },
};

/** Skills of "Luyện tập chung" on page 97: Bài 42 and Bài 43. */
export const PAGE_97_SKILLS = [ketQuaSuKien, xacSuatThucNghiem];

/** Every lesson of the chapter, for the end-of-chapter test. */
export const CHAPTER_SKILLS = [...PAGE_87_SKILLS, ...PAGE_97_SKILLS];

/**
 * Reads a natural-number answer typed with or without a final percent sign,
 * so "65" and "65%" both answer a percentage question.
 * @param {string} text
 */
export function readPercentOrNatural(text) {
  return readNatural(text.trim().replace(/\s*%$/, ''));
}
