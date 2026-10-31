/**
 * A mixed practice round over the chapter "Thời gian. Giờ và lịch": reading
 * whole hours on a clock, where the two hands point, yesterday and tomorrow,
 * reading a calendar page, the time of daily routines, and the facts of the
 * chapter. Questions are built from a seed, so the first round is the same
 * on the server and in the browser. Pure and DOM-free.
 */
import { int, rng, shuffle } from '#lib/core/drill.js';
import {
  ROUTINES,
  WEEKDAYS,
  dayAfter,
  dayTitle,
  dialHour,
  hourOfDay,
  hourOptions,
} from '../_shared/time.js';

/** @typedef {'read' | 'hands' | 'week' | 'sheet' | 'routine' | 'fact'} Kind */

/**
 * @typedef {(
 *   | { type: 'clock', hour: number }
 *   | { type: 'sheet', month: number, date: number, weekday: number }
 * )} Scene
 */

/**
 * @typedef {{
 *   kind: Kind;
 *   prompt: string;
 *   scene?: Scene;
 *   options: string[];
 *   answer: number;
 *   hint: string;
 *   solution: string;
 * }} Question
 */

/** Question kinds, each asked twice per round. */
export const KINDS = /** @type {const} */ (['read', 'hands', 'week', 'sheet', 'routine', 'fact']);

/** What each kind practises, for the progress line and the summary. */
export const KIND_LABELS = /** @type {const} */ ({
  read: 'Đọc giờ trên đồng hồ',
  hands: 'Kim giờ, kim phút',
  week: 'Hôm qua, ngày mai',
  sheet: 'Đọc tờ lịch',
  routine: 'Giờ và việc hằng ngày',
  fact: 'Ngày và giờ',
});

/** Facts of the chapter, each with its options and right answer. */
const FACTS = [
  {
    prompt: 'Một tuần có mấy ngày?',
    options: ['7 ngày', '5 ngày', '12 ngày'],
    answer: 0,
    hint: 'Em đếm từ thứ Hai đến Chủ nhật.',
    solution: 'Một tuần có 7 ngày.',
  },
  {
    prompt: 'Kim dài của đồng hồ là kim gì?',
    options: ['Kim phút', 'Kim giờ'],
    answer: 0,
    hint: 'Kim ngắn là kim giờ.',
    solution: 'Kim dài là kim phút, kim ngắn là kim giờ.',
  },
  {
    prompt: 'Ngày nào đứng ngay sau Chủ nhật?',
    options: ['Thứ Hai', 'Thứ Bảy', 'Thứ Ba'],
    answer: 0,
    hint: 'Hết Chủ nhật, tuần mới bắt đầu.',
    solution: 'Sau Chủ nhật là thứ Hai của tuần mới.',
  },
  {
    prompt: 'Giờ đúng thì kim dài chỉ số mấy?',
    options: ['Số 12', 'Số 6', 'Số 1'],
    answer: 0,
    hint: 'Số ở trên cùng mặt đồng hồ.',
    solution: 'Giờ đúng thì kim dài chỉ số 12.',
  },
];

/** What Nam does at each routine, as said after his name. */
const DOING = /** @type {Record<string, string>} */ ({
  wake: 'thức dậy',
  school: 'vào lớp học',
  lunch: 'ăn trưa',
  home: 'đi học về',
  dinner: 'ăn tối',
  sleep: 'đi ngủ',
});

/**
 * @param {() => number} rand
 * @param {string[]} options the right one first
 * @returns {{ options: string[], answer: number }}
 */
function mixed(rand, options) {
  const order = shuffle(
    rand,
    options.map((_, i) => i),
  );
  return { options: order.map((i) => options[i]), answer: order.indexOf(0) };
}

/**
 * @param {Kind} kind
 * @param {() => number} rand
 * @param {number} turn which of the two questions of this kind (0 or 1)
 * @returns {Question}
 */
export function makeQuestion(kind, rand, turn) {
  if (kind === 'read') {
    const hour = int(rand, 1, 12);
    const values = hourOptions(hour);
    return {
      kind,
      prompt: 'Đồng hồ chỉ mấy giờ?',
      scene: { type: 'clock', hour },
      options: values.map((v) => `${v} giờ`),
      answer: values.indexOf(hour),
      hint: 'Kim dài chỉ số 12. Em nhìn kim ngắn.',
      solution: `Kim ngắn chỉ số ${hour}, kim dài chỉ số 12: ${hour} giờ.`,
    };
  }
  if (kind === 'hands') {
    const hour = int(rand, 1, 11);
    const other = (hour % 11) + 1;
    const long = turn === 1;
    const right = long ? 12 : hour;
    const { options, answer } = mixed(
      rand,
      [right, long ? hour : 12, other].map((v) => `Số ${v}`),
    );
    return {
      kind,
      prompt: `Lúc ${hour} giờ, kim ${long ? 'dài' : 'ngắn'} chỉ số mấy?`,
      options,
      answer,
      hint: long
        ? 'Giờ đúng thì kim dài luôn chỉ cùng một số.'
        : 'Kim ngắn chỉ số nào thì là bấy nhiêu giờ.',
      solution: `Lúc ${hour} giờ, kim ngắn chỉ số ${hour}, kim dài chỉ số 12.`,
    };
  }
  if (kind === 'week') {
    const today = int(rand, 0, 6);
    const step = turn === 0 ? 1 : -1;
    const word = turn === 0 ? 'Ngày mai' : 'Hôm qua';
    const right = dayAfter(today, step);
    const { options, answer } = mixed(
      rand,
      [right, today, dayAfter(today, -step)].map((d) => dayTitle(d)),
    );
    return {
      kind,
      prompt: `Hôm nay là ${WEEKDAYS[today]}. ${word} là thứ mấy?`,
      options,
      answer,
      hint: `${word} là ngày ngay ${turn === 0 ? 'sau' : 'trước'} hôm nay.`,
      solution: `${word} là ${WEEKDAYS[right]}.`,
    };
  }
  if (kind === 'sheet') {
    const month = int(rand, 1, 12);
    const date = int(rand, 2, 27);
    const weekday = int(rand, 0, 6);
    const scene = /** @type {Scene} */ ({ type: 'sheet', month, date, weekday });
    if (turn === 0) {
      const { options, answer } = mixed(
        rand,
        [weekday, dayAfter(weekday, 1), dayAfter(weekday, -1)].map((d) => dayTitle(d)),
      );
      return {
        kind,
        prompt: `Tờ lịch ngày ${date} tháng ${month} là thứ mấy?`,
        scene,
        options,
        answer,
        hint: 'Thứ ghi ở dòng dưới số ngày.',
        solution: `Tờ lịch ghi ${WEEKDAYS[weekday]}, ngày ${date} tháng ${month}.`,
      };
    }
    const { options, answer } = mixed(
      rand,
      [date + 1, date, date - 1].map((d) => `Ngày ${d}`),
    );
    return {
      kind,
      prompt: 'Đây là tờ lịch hôm nay. Tờ lịch ngày mai ghi ngày bao nhiêu?',
      scene,
      options,
      answer,
      hint: 'Ngày mai thì số ngày tăng thêm 1.',
      solution: `Hôm nay là ngày ${date}, ngày mai là ngày ${date + 1} tháng ${month}.`,
    };
  }
  if (kind === 'routine') {
    const r = ROUTINES[(int(rand, 0, 2) * 2 + turn) % ROUTINES.length];
    const right = hourOfDay(r.hour);
    const { options, answer } = mixed(rand, [
      right,
      hourOfDay((r.hour + 12) % 24),
      hourOfDay(r.hour + 1),
    ]);
    return {
      kind,
      prompt: `Nam ${DOING[r.id]}. Đồng hồ chỉ như hình. Đó là lúc mấy giờ?`,
      scene: { type: 'clock', hour: r.hour },
      options,
      answer,
      hint: `Kim ngắn chỉ số ${dialHour(r.hour * 60)}. Việc này làm buổi nào trong ngày?`,
      solution: `Nam ${DOING[r.id]} lúc ${right}.`,
    };
  }
  const fact = FACTS[(int(rand, 0, 1) * 2 + turn) % FACTS.length];
  const { options, answer } = mixed(rand, [
    fact.options[fact.answer],
    ...fact.options.filter((_, i) => i !== fact.answer),
  ]);
  return {
    kind,
    prompt: fact.prompt,
    options,
    answer,
    hint: fact.hint,
    solution: fact.solution,
  };
}

/**
 * True when two questions of the same kind come one after the other.
 * @param {Question[]} list
 */
function hasRepeat(list) {
  return list.some((q, i) => i > 0 && q.kind === list[i - 1].kind);
}

/**
 * One round: every kind twice, in a mixed order with no kind twice in a
 * row. The order is reshuffled from the same seed until no kind repeats,
 * so it stays the same for every visitor.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed * 3371 + 37);
  const list = KINDS.flatMap((k) => [makeQuestion(k, rand, 0), makeQuestion(k, rand, 1)]);
  let order = shuffle(rand, list);
  for (let tries = 0; tries < 200 && hasRepeat(order); tries++) order = shuffle(rand, list);
  return order;
}

/**
 * Kinds to review: those missed at the first try.
 * @param {Question[]} round
 * @param {Array<boolean | null>} firstTry
 */
export function weakKinds(round, firstTry) {
  const weak = new Set();
  round.forEach((q, i) => {
    if (firstTry[i] === false) weak.add(KIND_LABELS[q.kind]);
  });
  return [...weak];
}
