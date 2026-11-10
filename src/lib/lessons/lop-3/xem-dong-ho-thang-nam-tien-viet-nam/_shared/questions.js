/**
 * Kid tap-the-answer questions of the chapter: reading a clock to the minute,
 * the "kém" reading, minutes later, how long something lasts, the days of a
 * month, the calendar, and Vietnamese money. Each lesson's round picks the
 * parts it practises. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { capitalize, mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { SHORT_DAYS, WEEKDAYS, dayTitle, dialNumber } from '#lib/core/kid/time.js';
import { fmt } from '#lib/core/number-format.js';
import { NOTES, NOTE_WORDS, moneyText, sumNotes } from './money.js';
import {
  daysBetween,
  daysIn,
  dialText,
  durationText,
  handsWords,
  kemText,
  later,
  weekdayOf,
} from './time.js';

/**
 * What a question shows above its options: a clock (minutes since 0:00), a
 * calendar sheet with a ringed date, or some banknotes.
 * @typedef {{ clock?: number, month?: number, marks?: number[], notes?: number[] }} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** What each kind of question practises. */
export const LABELS = /** @type {const} */ ({
  read: 'Đọc giờ trên đồng hồ',
  kem: 'Đọc giờ kém',
  after: 'Tính giờ sau một số phút',
  duration: 'Tính thời gian làm một việc',
  month: 'Số ngày trong tháng',
  weekday: 'Xem lịch tìm thứ',
  days: 'Đếm số ngày',
  note: 'Đọc tờ tiền',
  sum: 'Đếm tiền',
  change: 'Tính tiền trả lại',
  exchange: 'Đổi tiền',
  shop: 'Bài toán mua hàng',
});

/** @typedef {keyof typeof LABELS} Kind */

/**
 * A morning time on the dial, often on a number and often between two.
 * @param {() => number} rand
 */
function dialTime(rand) {
  const h = int(rand, 1, 11);
  const m = rand() < 0.4 ? int(rand, 1, 11) * 5 : pick(rand, offFive());
  return h * 60 + m;
}

/** The minutes 1 to 59 that are not on a number of the dial. */
function offFive() {
  return Array.from({ length: 59 }, (_, i) => i + 1).filter((m) => m % 5 !== 0);
}

/**
 * A time of the dial with other minutes.
 * @param {number} total
 * @param {number} minutes
 */
function withMinutes(total, minutes) {
  return total - (total % 60) + minutes;
}

/**
 * Up to three wrong amounts from `slips`, in order, kept between 1 000 and
 * 100 000 đồng and apart from the right one, written as money.
 * @param {number} right
 * @param {number[]} slips
 */
function nearMoney(right, slips) {
  const kept = slips.filter((v) => v !== right && v >= 1000 && v <= 100000);
  return [...new Set(kept)].slice(0, 3).map(moneyText);
}

const READ_HINT =
  'Kim ngắn chỉ giờ: em đọc số kim ngắn vừa đi qua. Kim dài chỉ phút: mỗi số là 5 phút, mỗi vạch nhỏ là 1 phút.';

/** @type {Record<Kind, (rand: () => number) => Question>} */
export const MAKERS = {
  read(rand) {
    const t = dialTime(rand);
    const m = t % 60;
    const h = Math.floor(t / 60);
    const right = dialText(t);
    const wrong = [
      dialText(t + 60),
      dialText(withMinutes(t, m + 5 <= 59 ? m + 5 : m - 5)),
      dialText(withMinutes(t, m + 1 <= 59 ? m + 1 : m - 1)),
    ];
    return {
      kind: 'read',
      visual: { clock: t },
      prompt: 'Đồng hồ chỉ mấy giờ?',
      ...mixOptions(rand, right, wrong),
      hint: READ_HINT,
      solution: `${capitalize(handsWords(t))}. Kim ngắn đã qua số ${dialNumber(h)}, kim dài chỉ ${m} phút. Đồng hồ chỉ ${right}.`,
    };
  },

  kem(rand) {
    const h = int(rand, 1, 11);
    const m = int(rand, 7, 11) * 5;
    const t = h * 60 + m;
    const right = /** @type {string} */ (kemText(t));
    const next = dialNumber(h + 1);
    return {
      kind: 'kem',
      visual: { clock: t },
      prompt: `${capitalize(dialText(t))} còn gọi là mấy giờ?`,
      ...mixOptions(rand, right, [
        `${h} giờ kém ${60 - m} phút`,
        `${next} giờ kém ${m} phút`,
        `${next} giờ ${60 - m} phút`,
      ]),
      hint: 'Em đếm xem còn bao nhiêu phút nữa thì kim dài chỉ số 12, sang giờ tiếp theo.',
      solution: `Còn 60 − ${m} = ${60 - m} phút nữa là ${next} giờ. Vậy ${dialText(t)} là ${right}.`,
    };
  },

  after(rand) {
    const t = int(rand, 1, 10) * 60 + int(rand, 0, 11) * 5;
    const d = pick(rand, [5, 10, 15, 20, 25, 30, 40]);
    const end = later(t, d);
    const m = t % 60;
    const work =
      m + d >= 60
        ? `${m} phút + ${d} phút = ${m + d} phút, tức là 1 giờ ${m + d - 60} phút.`
        : `${m} phút + ${d} phút = ${m + d} phút.`;
    return {
      kind: 'after',
      visual: { clock: t },
      prompt: `Bây giờ là ${dialText(t)}. ${d} phút nữa là mấy giờ?`,
      ...mixOptions(rand, dialText(end), [
        dialText(later(t, -d)),
        dialText(later(end, 5)),
        dialText(later(end, -5)),
      ]),
      hint: 'Em đếm thêm phút trên mặt đồng hồ. Đủ 60 phút thì sang giờ mới.',
      solution: `${work} Vậy ${d} phút nữa là ${dialText(end)}.`,
    };
  },

  duration(rand) {
    const h = int(rand, 1, 11);
    const a = int(rand, 0, 6) * 5;
    const b = a + int(rand, 2, 11 - a / 5) * 5;
    const who = pick(rand, ['Nam chuẩn bị đồ đi học', 'Mai đọc truyện', 'Lớp em tập thể dục']);
    const right = b - a;
    return {
      kind: 'duration',
      prompt: `${who} từ ${dialText(h * 60 + a)} đến ${dialText(h * 60 + b)}. Hết bao nhiêu phút?`,
      ...mixOptions(
        rand,
        durationText(right),
        [b, right + 5, right - 5, right + 10]
          .filter((v) => v > 0 && v !== right)
          .slice(0, 3)
          .map(durationText),
      ),
      hint: 'Giờ không đổi. Em lấy số phút lúc xong trừ đi số phút lúc bắt đầu.',
      solution: `${b} − ${a} = ${right}. Hết ${durationText(right)}.`,
    };
  },

  month(rand) {
    const month = int(rand, 1, 12);
    const options = ['28 hoặc 29 ngày', '30 ngày', '31 ngày'];
    const answer = month === 2 ? 0 : daysIn(month) === 30 ? 1 : 2;
    return {
      kind: 'month',
      prompt: `Tháng ${month} có bao nhiêu ngày?`,
      options,
      answer,
      hint: 'Em nắm tay lại và đếm tháng trên các khớp, các chỗ lõm giữa hai khớp. Tháng ở khớp tay có nhiều ngày hơn tháng ở chỗ lõm.',
      solution:
        month === 2
          ? 'Tháng 2 có 28 ngày, năm nhuận có 29 ngày.'
          : `Tháng ${month} ở ${daysIn(month) === 31 ? 'khớp tay' : 'chỗ lõm'}, nên có ${daysIn(month)} ngày.`,
    };
  },

  weekday(rand) {
    const month = int(rand, 1, 12);
    const date = int(rand, 1, daysIn(month));
    const w = weekdayOf(month, date);
    const shift = pick(rand, [-1, 1]);
    return {
      kind: 'weekday',
      visual: { month, marks: [date] },
      prompt: `Xem tờ lịch. Ngày ${date} tháng ${month} là thứ mấy?`,
      ...mixOptions(rand, dayTitle(w), [
        dayTitle(w + shift),
        dayTitle(w - shift),
        dayTitle(w + 2 * shift),
      ]),
      hint: 'Em tìm ngày được tô màu rồi nhìn lên chữ ở đầu cột.',
      solution: `Ngày ${date} nằm ở cột ${SHORT_DAYS[w]}, nên ngày ${date} tháng ${month} là ${WEEKDAYS[w]}.`,
    };
  },

  days(rand) {
    let m1;
    let d1;
    let m2;
    let d2;
    if (rand() < 0.5) {
      m1 = m2 = int(rand, 1, 12);
      d1 = int(rand, 1, 20);
      d2 = d1 + int(rand, 2, 7);
    } else {
      m1 = int(rand, 1, 11);
      m2 = m1 + 1;
      d1 = daysIn(m1) - int(rand, 0, 2);
      d2 = int(rand, 1, 4);
    }
    const right = daysBetween(m1, d1, m2, d2);
    const list = [];
    for (let d = d1; d <= daysIn(m1) && (m1 < m2 || d <= d2); d++) list.push(d);
    if (m2 > m1) for (let d = 1; d <= d2; d++) list.push(d);
    const end = m1 === m2 ? `ngày ${d2}` : `ngày ${d2} tháng ${m2}`;
    return {
      kind: 'days',
      prompt: `Gia đình Mai đi chơi từ ngày ${d1} tháng ${m1} đến hết ${end}. Chuyến đi kéo dài mấy ngày?`,
      ...mixOptions(
        rand,
        `${right} ngày`,
        [right - 1, right + 1, right + 2].map((n) => `${n} ngày`),
      ),
      hint:
        m1 === m2
          ? 'Em đếm cả ngày đi và ngày về.'
          : `Tháng ${m1} có ${daysIn(m1)} ngày. Em đếm cả ngày đi và ngày về.`,
      solution: `Các ngày đi chơi là ${list.join(', ')}. Có ${right} ngày.`,
    };
  },

  note(rand) {
    const v = pick(rand, NOTES);
    const lead = String(v)[0];
    const alike = NOTES.filter((n) => n !== v && String(n)[0] === lead);
    const others = shuffle(
      rand,
      NOTES.filter((n) => n !== v && !alike.includes(n)),
    );
    const wrong = [...alike, ...others].slice(0, 3).map((n) => NOTE_WORDS[n]);
    return {
      kind: 'note',
      visual: { notes: [v] },
      prompt: 'Tờ tiền này là bao nhiêu đồng?',
      ...mixOptions(rand, NOTE_WORDS[v], wrong),
      hint: 'Em đọc số ghi trên tờ tiền: ba chữ số 0 ở cuối là nghìn, bốn chữ số 0 là chục nghìn.',
      solution: `Tờ tiền ghi ${fmt(v)}, đọc là ${NOTE_WORDS[v]}.`,
    };
  },

  sum(rand) {
    /** @type {number[]} */
    let notes;
    do {
      notes = Array.from({ length: int(rand, 2, 3) }, () =>
        pick(rand, [1000, 2000, 5000, 10000, 20000, 50000]),
      ).sort((a, b) => b - a);
    } while (sumNotes(notes) > 100000);
    const right = sumNotes(notes);
    const small = notes[notes.length - 1];
    return {
      kind: 'sum',
      visual: { notes },
      prompt: 'Có tất cả bao nhiêu tiền?',
      ...mixOptions(
        rand,
        moneyText(right),
        nearMoney(right, [right - small, right + 1000, right + 10000, right - 1000, right - 10000]),
      ),
      hint: 'Em cộng tiền của các tờ, bắt đầu từ tờ lớn nhất.',
      solution: `${notes.map(fmt).join(' + ')} = ${fmt(right)}. Có tất cả ${moneyText(right)}.`,
    };
  },

  change(rand) {
    const paid = pick(rand, [10000, 20000, 50000, 100000]);
    const price = int(rand, 1, paid / 1000 - 1) * 1000;
    const right = paid - price;
    const thing = pick(rand, [
      'một quyển truyện',
      'một hộp bút màu',
      'một túi cam',
      'một quả bóng',
    ]);
    return {
      kind: 'change',
      prompt: `Mẹ mua ${thing} giá ${moneyText(price)}. Mẹ đưa cô bán hàng tờ ${moneyText(paid)}. Cô trả lại mẹ bao nhiêu tiền?`,
      ...mixOptions(
        rand,
        moneyText(right),
        [
          right + 1000,
          right > 1000 ? right - 1000 : right + 2000,
          price === right ? right + 10000 : price,
        ].map(moneyText),
      ),
      hint: 'Tiền trả lại bằng tiền mẹ đưa trừ đi giá tiền.',
      solution: `${fmt(paid)} − ${fmt(price)} = ${fmt(right)}. Cô trả lại mẹ ${moneyText(right)}.`,
    };
  },

  exchange(rand) {
    const [big, small] = pick(rand, [
      [2000, 1000],
      [5000, 1000],
      [10000, 2000],
      [10000, 5000],
      [20000, 5000],
      [20000, 10000],
      [50000, 10000],
      [100000, 20000],
      [100000, 50000],
    ]);
    const n = big / small;
    return {
      kind: 'exchange',
      visual: { notes: [big] },
      prompt: `1 tờ ${moneyText(big)} đổi được mấy tờ ${moneyText(small)}?`,
      ...numberOptions(rand, n, 1, 10),
      hint: 'Em đếm thêm từng tờ nhỏ cho đến khi đủ số tiền của tờ lớn.',
      solution: `${fmt(small)} × ${n} = ${fmt(big)}. Vậy đổi được ${n} tờ ${moneyText(small)}.`,
    };
  },

  shop(rand) {
    const [x, y] = shuffle(rand, [
      'quyển vở',
      'cái thước',
      'hộp bút chì',
      'quả bóng',
      'cuốn truyện',
    ]).slice(0, 2);
    const a = int(rand, 2, 40) * 1000;
    const b = int(rand, 2, 40) * 1000;
    const right = a + b;
    return {
      kind: 'shop',
      prompt: `Một ${x} giá ${moneyText(a)}, một ${y} giá ${moneyText(b)}. Mua cả hai thứ hết bao nhiêu tiền?`,
      ...mixOptions(
        rand,
        moneyText(right),
        nearMoney(right, [Math.abs(a - b), right + 1000, right + 10000, right - 1000]),
      ),
      hint: 'Mua cả hai thứ: em cộng giá hai thứ.',
      solution: `${fmt(a)} + ${fmt(b)} = ${fmt(right)}. Mua cả hai thứ hết ${moneyText(right)}.`,
    };
  },
};

/**
 * One question of each kind, in a shuffled order.
 * @param {readonly Kind[]} kinds
 * @param {() => number} rand
 */
export function roundOf(kinds, rand) {
  return shuffle(rand, kinds).map((k) => MAKERS[k](rand));
}

/**
 * The labels of some kinds, in order, for a round's summary.
 * @param {readonly Kind[]} kinds
 * @returns {Record<string, string>}
 */
export function labelsOf(kinds) {
  return Object.fromEntries([...new Set(kinds)].map((k) => [k, LABELS[k]]));
}
