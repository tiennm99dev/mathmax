/**
 * The mixed practice of the chapter: the tables of 6 to 9, finding a missing
 * number, "một phần mấy", the book's triangle of products and word problems,
 * with one question of each part in a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { pickPart, readPart, shareOf } from '../_shared/part-questions.js';
import { divLine, mulLine, productOptions, quotientOptions } from '../_shared/times.js';

/**
 * Three numbers on the corners of a triangle, and the side whose product is
 * hidden: side `i` joins corner `i` and the next corner.
 * @typedef {{ type: 'triangle', corners: [number, number, number], hidden: number }} TriangleVisual
 */
/** @typedef {import('../_shared/part-questions.js').PartVisual | TriangleVisual} Visual */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  nhan: 'Bảng nhân',
  chia: 'Bảng chia',
  'nhan-chia': 'Từ phép nhân ra phép chia',
  'be-hon': 'So sánh kết quả',
  'thua-so': 'Tìm thừa số',
  'so-bi-chia': 'Tìm số bị chia',
  'so-chia': 'Tìm số chia',
  'xep-do': 'Bài toán phép nhân',
  'chia-nhom': 'Bài toán phép chia',
  'doc-phan': 'Đọc phần tô màu',
  'tim-hinh': 'Tìm hình đã tô màu',
  'mot-phan': 'Một phần mấy của số đồ vật',
  'tam-giac': 'Tam giác các tích',
});

/** The tables this chapter builds. */
const TABLES = /** @type {const} */ ([6, 7, 8, 9]);

/**
 * The side of a triangle that joins corner `i` to the next.
 * @param {[number, number, number]} corners
 * @param {number} i
 * @returns {[number, number]}
 */
export const sideEnds = (corners, i) => [corners[i], corners[(i + 1) % 3]];

/**
 * A division of the tables of 6 to 9 with the given result.
 * @param {() => number} rand
 * @param {number} result
 */
function divisionWith(rand, result) {
  const base = pick(rand, TABLES);
  return `${base * result} : ${base}`;
}

/**
 * The questions of one part, by kind.
 * @type {Record<keyof typeof KIND_LABELS, (rand: () => number) => Omit<Question, 'kind'>>}
 */
const MAKERS = {
  nhan(rand) {
    const base = pick(rand, TABLES);
    const n = int(rand, 2, 10);
    return {
      prompt: `${base} × ${n} = ?`,
      ...productOptions(base, n),
      hint: `Em đếm thêm ${base}, đếm ${n} lần.`,
      solution: `${mulLine(base, n)}.`,
    };
  },
  chia(rand) {
    const base = pick(rand, TABLES);
    const n = int(rand, 2, 10);
    return {
      prompt: `${base * n} : ${base} = ?`,
      ...quotientOptions(base, n),
      hint: `Em nghĩ: ${base} nhân với mấy thì bằng ${base * n}?`,
      solution: `Vì ${mulLine(base, n)} nên ${divLine(base, n)}.`,
    };
  },
  'nhan-chia'(rand) {
    const base = pick(rand, TABLES);
    const n = int(rand, 2, 9);
    return {
      prompt: `Biết ${mulLine(base, n)}. Vậy ${base * n} : ${base} = ?`,
      ...quotientOptions(base, n),
      hint: 'Lấy tích chia cho một thừa số thì được thừa số kia.',
      solution: `${divLine(base, n)}.`,
    };
  },
  'be-hon'(rand) {
    const limit = int(rand, 6, 8);
    const small = int(rand, 2, limit - 1);
    const right = divisionWith(rand, small);
    const big = shuffle(
      rand,
      Array.from({ length: 10 - limit + 1 }, (_, i) => limit + i),
    ).slice(0, 3);
    return {
      prompt: `Phép tính nào có kết quả bé hơn ${limit}?`,
      ...mixOptions(
        rand,
        right,
        big.map((v) => divisionWith(rand, v)),
      ),
      hint: 'Em tính kết quả của từng phép tính, rồi so sánh.',
      solution: `${right} = ${small}, mà ${small} bé hơn ${limit}. Các phép tính còn lại đều có kết quả không bé hơn ${limit}.`,
    };
  },
  'thua-so'(rand) {
    const known = pick(rand, TABLES);
    const answer = int(rand, 2, 9);
    const total = known * answer;
    return {
      prompt: rand() < 0.5 ? `? × ${known} = ${total}` : `${known} × ? = ${total}`,
      ...quotientOptions(known, answer),
      hint: 'Muốn tìm một thừa số, ta lấy tích chia cho thừa số kia.',
      solution: `${divLine(known, answer)}. Số cần tìm là ${answer}.`,
    };
  },
  'so-bi-chia'(rand) {
    const divisor = pick(rand, TABLES);
    const quotient = int(rand, 2, 9);
    return {
      prompt: `? : ${divisor} = ${quotient}`,
      ...productOptions(divisor, quotient),
      hint: 'Muốn tìm số bị chia, ta lấy thương nhân với số chia.',
      solution: `${quotient} × ${divisor} = ${divisor * quotient}. Số cần tìm là ${divisor * quotient}.`,
    };
  },
  'so-chia'(rand) {
    const quotient = pick(rand, TABLES);
    const answer = int(rand, 2, 9);
    return {
      prompt: `${quotient * answer} : ? = ${quotient}`,
      ...quotientOptions(quotient, answer),
      hint: 'Muốn tìm số chia, ta lấy số bị chia chia cho thương.',
      solution: `${divLine(quotient, answer)}. Thử lại: ${quotient * answer} : ${answer} = ${quotient}.`,
    };
  },
  'xep-do'(rand) {
    const each = pick(rand, TABLES);
    const groups = int(rand, 2, 9);
    const { prompt, unit } = pick(rand, [
      {
        prompt: `Việt xếp ${groups} bàn, mỗi bàn ${each} cái li. Việt xếp tất cả bao nhiêu cái li?`,
        unit: 'cái li',
      },
      {
        prompt: `Có ${groups} hộp bánh, mỗi hộp ${each} cái bánh. Có tất cả bao nhiêu cái bánh?`,
        unit: 'cái bánh',
      },
      {
        prompt: `Mỗi túi có ${each} quả cam. ${groups} túi như thế có bao nhiêu quả cam?`,
        unit: 'quả cam',
      },
    ]);
    return {
      prompt,
      ...productOptions(each, groups),
      hint: `${each} được lấy ${groups} lần. Em viết phép nhân.`,
      solution: `${mulLine(each, groups)} (${unit}).`,
    };
  },
  'chia-nhom'(rand) {
    const each = pick(rand, TABLES);
    const groups = int(rand, 2, 9);
    const total = each * groups;
    const { prompt, unit } = pick(rand, [
      {
        prompt: `Mai có ${total} bông hoa, cắm vào các lọ, mỗi lọ ${each} bông. Mai cắm được mấy lọ?`,
        unit: 'lọ',
      },
      {
        prompt: `Có ${total} học sinh xếp thành các hàng, mỗi hàng ${each} bạn. Xếp được mấy hàng?`,
        unit: 'hàng',
      },
    ]);
    return {
      prompt,
      ...quotientOptions(each, groups),
      hint: 'Chia thành từng nhóm bằng nhau: em làm phép chia.',
      solution: `${divLine(each, groups)} (${unit}).`,
    };
  },
  'doc-phan': (rand) => readPart(rand, int(rand, 2, 9)),
  'tim-hinh': (rand) => pickPart(rand, int(rand, 2, 9)),
  'mot-phan': (rand) => shareOf(rand, int(rand, 2, 9)),
  'tam-giac'(rand) {
    const [a, b, c] = shuffle(rand, [2, 3, 4, 5, 6, 7, 8, 9]);
    /** @type {[number, number, number]} */
    const corners = [a, b, c];
    const hidden = int(rand, 0, 2);
    const [x, y] = sideEnds(corners, hidden);
    return {
      prompt: 'Số trong ô vuông là tích của hai số ở hai đầu cạnh. Số nào thay cho dấu ?',
      visual: { type: 'triangle', corners, hidden },
      ...productOptions(x, y),
      hint: 'Em tìm hai số ở hai đầu cạnh có dấu ?, rồi nhân hai số đó.',
      solution: `${mulLine(x, y)}.`,
    };
  },
};

/**
 * A round with one question of each part.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {(keyof typeof KIND_LABELS)[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ kind, ...MAKERS[kind](rand) }));
}
