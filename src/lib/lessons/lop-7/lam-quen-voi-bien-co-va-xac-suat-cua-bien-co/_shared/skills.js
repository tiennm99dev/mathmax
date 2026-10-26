/**
 * Question generators for the chapter "Làm quen với biến cố và xác suất của
 * biến cố". Answers are counts (natural numbers) or probabilities; a
 * probability travels as its value m/n, and `readProbability` accepts the
 * learner's fraction, whole number or decimal comma, so 2/6, 1/3 and the
 * same value written as a fraction compare equal (equal fractions divide to
 * the very same double).
 */

import { int, pick, shuffle } from '#lib/core/drill.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** @param {number} k */
export const isPrime = (k) => {
  if (k < 2) return false;
  for (let d = 2; d * d <= k; d++) if (k % d === 0) return false;
  return true;
};

/** @param {number} a @param {number} b @returns {number} */
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

/**
 * A probability m/n as plain text in lowest terms: '1/3', '0', '1'.
 * @param {number} m @param {number} n
 */
export function fracText(m, n) {
  if (m === 0) return '0';
  const g = gcd(m, n);
  return n / g === 1 ? String(m / g) : `${m / g}/${n / g}`;
}

/**
 * A probability given as m/n of equally likely outcomes, with the
 * simplification when there is one: '2/6 = 1/3'.
 * @param {number} m @param {number} n
 */
export function ratioText(m, n) {
  const simple = fracText(m, n);
  return simple === `${m}/${n}` ? simple : `${m}/${n} = ${simple}`;
}

/**
 * Reads a probability the learner typed: a fraction 'a/b', a whole number or
 * a decimal with a comma or point. Null when it cannot be read.
 * @param {string} text
 * @returns {number | null}
 */
export function readProbability(text) {
  const s = text.trim().replace(/\s+/g, '');
  let m = /^(\d+)\/(\d+)$/.exec(s);
  if (m) {
    const d = Number(m[2]);
    return d === 0 ? null : Number(m[1]) / d;
  }
  m = /^(\d+)(?:[.,](\d+))?$/.exec(s);
  if (m) return Number(m[2] === undefined ? m[1] : `${m[1]}.${m[2]}`);
  return null;
}

/**
 * The value of a probability as its simplest fraction text, for the drill
 * board's "the answer is" line.
 * @param {number} value
 */
export function probabilityText(value) {
  for (let d = 1; d <= 1000; d++) {
    const n = Math.round(value * d);
    if (n / d === value) return fracText(n, d);
  }
  return String(value).replace('.', ',');
}

/**
 * @typedef {object} Condition
 * @property {string} phrase what is said about the number, e.g. 'là số chẵn'
 * @property {(k: number) => boolean} test
 */

/**
 * A random condition on a number, its thresholds drawn near `lo..hi` so it
 * may come out certain, impossible or random.
 * @param {() => number} rand @param {number} lo @param {number} hi
 * @returns {Condition}
 */
export function condition(rand, lo, hi) {
  const kind = pick(rand, ['chan', 'le', 'chia-3', 'chia-5', 'nguyen-to', 'nho-hon', 'lon-hon']);
  if (kind === 'chan') return { phrase: 'là số chẵn', test: (k) => k % 2 === 0 };
  if (kind === 'le') return { phrase: 'là số lẻ', test: (k) => k % 2 === 1 };
  if (kind === 'chia-3') return { phrase: 'chia hết cho 3', test: (k) => k % 3 === 0 };
  if (kind === 'chia-5') return { phrase: 'chia hết cho 5', test: (k) => k % 5 === 0 };
  if (kind === 'nguyen-to') return { phrase: 'là số nguyên tố', test: isPrime };
  if (kind === 'nho-hon') {
    const t = int(rand, lo, hi + 2);
    return { phrase: `nhỏ hơn ${t}`, test: (k) => k < t };
  }
  const t = int(rand, Math.max(0, lo - 2), hi);
  return { phrase: `lớn hơn ${t}`, test: (k) => k > t };
}

/**
 * A setting with numbered, equally likely outcomes.
 * @typedef {object} Setting
 * @property {string} setup the sentence describing the game
 * @property {string} subject how a condition starts, e.g. 'Số chấm xuất hiện'
 * @property {string} unit what an outcome is called in the working
 * @property {number[]} values the possible outcomes
 */

/**
 * @param {() => number} rand
 * @returns {Setting}
 */
export function setting(rand) {
  const kind = pick(rand, ['xuc-xac', 'the', 'the']);
  if (kind === 'xuc-xac')
    return {
      setup: 'Gieo một con xúc xắc cân đối.',
      subject: 'Số chấm xuất hiện',
      unit: 'mặt',
      values: [1, 2, 3, 4, 5, 6],
    };
  const pool = Array.from({ length: 30 }, (_, i) => i + 1);
  const values = shuffle(rand, pool)
    .slice(0, int(rand, 5, 6))
    .sort((a, b) => a - b);
  return {
    setup: `Một hộp có ${values.length} tấm thẻ ghi các số ${values.join('; ')}. Rút ngẫu nhiên một tấm thẻ.`,
    subject: 'Số ghi trên thẻ',
    unit: 'thẻ',
    values,
  };
}

/** @typedef {'chắc chắn' | 'không thể' | 'ngẫu nhiên'} KindName */

/**
 * @param {Condition} c @param {number[]} values
 * @returns {KindName}
 */
export function kindOf(c, values) {
  const m = values.filter(c.test).length;
  if (m === values.length) return 'chắc chắn';
  if (m === 0) return 'không thể';
  return 'ngẫu nhiên';
}

/**
 * One line of working: which outcomes make the event happen.
 * @param {string} name @param {Condition} c @param {Setting} s
 */
function working(name, c, s) {
  const yes = s.values.filter(c.test);
  const list = yes.length === 0 ? 'không có' : yes.join('; ');
  return `${name}: các ${s.unit} làm biến cố xảy ra: ${list} (${yes.length} trong ${s.values.length} kết quả) → ${kindOf(c, s.values)}.`;
}

/** @type {Skill} */
export const nhanBietBienCo = {
  id: 'nhan-biet-bien-co',
  label: 'Bài 29. Làm quen với biến cố',
  make(rand) {
    const s = setting(rand);
    const lo = s.values[0];
    const hi = s.values[s.values.length - 1];
    if (pick(rand, ['dem-ket-qua', 'dem-bien-co', 'dem-bien-co']) === 'dem-ket-qua') {
      const c = condition(rand, lo, hi);
      const yes = s.values.filter(c.test);
      return {
        prompt: `${s.setup} Có bao nhiêu kết quả có thể làm cho biến cố "${s.subject} ${c.phrase}" xảy ra?`,
        answer: yes.length,
        hints: [
          `Liệt kê các kết quả có thể: ${s.values.join('; ')}.`,
          `Với từng kết quả, kiểm tra xem số đó có ${c.phrase} không.`,
        ],
        steps: [
          `Các kết quả có thể: ${s.values.join('; ')}.`,
          `Các kết quả làm biến cố xảy ra: ${yes.length === 0 ? 'không có' : yes.join('; ')}.`,
          `Có ${yes.length} kết quả.`,
        ],
      };
    }
    /** @type {Condition[]} */
    const events = [];
    const phrases = new Set();
    while (events.length < 4) {
      const c = condition(rand, lo, hi);
      if (phrases.has(c.phrase)) continue;
      phrases.add(c.phrase);
      events.push(c);
    }
    /** @type {KindName} */
    const target = pick(rand, ['chắc chắn', 'không thể', 'ngẫu nhiên']);
    const names = ['A', 'B', 'C', 'D'];
    const count = events.filter((c) => kindOf(c, s.values) === target).length;
    return {
      prompt: `${s.setup} Xét các biến cố ${events.map((c, i) => `${names[i]}: "${s.subject} ${c.phrase}"`).join('; ')}. Có bao nhiêu biến cố ${target} trong bốn biến cố đó?`,
      answer: count,
      hints: [
        `Các kết quả có thể: ${s.values.join('; ')}.`,
        'Chắc chắn: mọi kết quả làm biến cố xảy ra. Không thể: không kết quả nào. Ngẫu nhiên: có kết quả làm xảy ra, có kết quả không.',
      ],
      steps: [
        `Các kết quả có thể: ${s.values.join('; ')}.`,
        ...events.map((c, i) => working(names[i], c, s)),
        `Số biến cố ${target}: ${count}.`,
      ],
    };
  },
};

const COLORS = ['đỏ', 'xanh', 'vàng'];

/** @type {Skill} */
export const xacSuatBienCo = {
  id: 'xac-suat-bien-co',
  label: 'Bài 30. Làm quen với xác suất của biến cố',
  make(rand) {
    const kind = pick(rand, ['xuc-xac-the', 'xuc-xac-the', 'bong', 'vong-quay']);
    if (kind === 'bong') {
      const counts = COLORS.map(() => int(rand, 1, 7));
      const total = counts.reduce((a, b) => a + b, 0);
      const i = int(rand, 0, 2);
      const m = counts[i];
      return {
        prompt: `Một túi có ${counts[0]} viên bi đỏ, ${counts[1]} viên bi xanh và ${counts[2]} viên bi vàng cùng kích thước. Lấy ngẫu nhiên một viên bi. Tính xác suất của biến cố "Lấy được viên bi màu ${COLORS[i]}" (nhập phân số dạng a/b).`,
        answer: m / total,
        hints: [
          'Các viên bi cùng kích thước: mỗi viên bi là một kết quả, các kết quả đồng khả năng.',
          `Tổng số viên bi: ${counts.join(' + ')}.`,
        ],
        steps: [
          `Tổng số viên bi: ${counts.join(' + ')} = ${total}; ${total} kết quả đồng khả năng.`,
          `Có ${m} viên bi màu ${COLORS[i]}.`,
          `Xác suất: ${ratioText(m, total)}.`,
        ],
      };
    }
    if (kind === 'vong-quay') {
      const n = int(rand, 4, 12);
      const t = int(rand, 1, n - 1);
      const m = n - t;
      return {
        prompt: `Một vòng quay chia thành ${n} ô bằng nhau, ghi các số từ 1 đến ${n}. Quay một lần. Tính xác suất của biến cố "Mũi tên chỉ vào ô ghi số lớn hơn ${t}" (nhập phân số dạng a/b).`,
        answer: m / n,
        hints: [
          `${n} ô bằng nhau nên ${n} kết quả đồng khả năng.`,
          `Đếm các số từ ${t + 1} đến ${n}.`,
        ],
        steps: [
          `${n} ô bằng nhau: ${n} kết quả đồng khả năng.`,
          `Các ô ghi số lớn hơn ${t}: từ ${t + 1} đến ${n}, có ${m} ô.`,
          `Xác suất: ${ratioText(m, n)}.`,
        ],
      };
    }
    const s = setting(rand);
    const c = condition(rand, s.values[0], s.values[s.values.length - 1]);
    const yes = s.values.filter(c.test);
    const n = s.values.length;
    return {
      prompt: `${s.setup} Tính xác suất của biến cố "${s.subject} ${c.phrase}" (nhập phân số dạng a/b, hoặc 0, 1).`,
      answer: yes.length / n,
      hints: [
        `${n} kết quả có thể ${s.values.join('; ')} đồng khả năng.`,
        'Đếm số kết quả làm biến cố xảy ra; nếu không có kết quả nào thì xác suất là 0, nếu mọi kết quả thì là 1.',
      ],
      steps: [
        `${n} kết quả đồng khả năng: ${s.values.join('; ')}.`,
        `Các kết quả làm biến cố xảy ra: ${yes.length === 0 ? 'không có' : yes.join('; ')} (${yes.length} kết quả).`,
        yes.length === 0
          ? 'Biến cố không thể, xác suất bằng 0.'
          : yes.length === n
            ? 'Biến cố chắc chắn, xác suất bằng 1.'
            : `Xác suất: ${ratioText(yes.length, n)}.`,
      ],
    };
  },
};

/** Every skill of the chapter, in lesson order. */
export const CHAPTER_SKILLS = [nhanBietBienCo, xacSuatBienCo];
