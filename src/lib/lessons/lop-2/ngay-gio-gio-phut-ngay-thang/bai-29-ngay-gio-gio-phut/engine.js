/**
 * Logic of the widgets of "Ngày - giờ, giờ - phút": the challenge of setting a
 * clock to a named time, the walk of the minute hand round the dial, and a
 * round of reading clocks. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { toMinutes } from '#lib/units-engine/clock.js';
import {
  dayClockText,
  dialNumber,
  dialText,
  handsText,
  mod,
  partText,
  sameOnDial,
} from '../_shared/time.js';

/**
 * Times to set on the clock, each named one of the ways the lesson teaches.
 * @type {ReadonlyArray<{ minutes: number, ask: string }>}
 */
export const TARGETS = [
  { minutes: toMinutes(15, 0), ask: '15 giờ' },
  { minutes: toMinutes(8, 30), ask: '8 giờ rưỡi sáng' },
  { minutes: toMinutes(20, 0), ask: '20 giờ' },
  { minutes: toMinutes(14, 15), ask: '14 giờ 15 phút' },
  { minutes: toMinutes(21, 30), ask: '9 giờ 30 phút tối' },
  { minutes: toMinutes(17, 15), ask: '17 giờ 15 phút' },
];

/**
 * The number the minute hand points at for a count of minutes.
 * @param {number} minutes 0 to 59
 */
function minuteNumber(minutes) {
  return minutes / 5 || 12;
}

/**
 * Feedback once the child has set the clock to `shown` for `target`. A dial
 * shows morning and afternoon alike, so only the position of the hands counts.
 * @param {number} shown
 * @param {number} target
 * @returns {{ ok: boolean, text: string }}
 */
export function checkTarget(shown, target) {
  const hoursNow = Math.floor(target / 60);
  if (sameOnDial(shown, target)) {
    const also = hoursNow >= 13 ? ` ${dayClockText(target)} còn gọi là ${partText(target)}.` : '';
    return { ok: true, text: `Đúng rồi!${also} Đồng hồ có ${handsText(target)}.` };
  }
  const want = mod(target, 60);
  if (mod(shown, 60) !== want) {
    return {
      ok: false,
      text: `Kim dài chưa đúng: ${want} phút thì kim dài chỉ số ${minuteNumber(want)}.`,
    };
  }
  const hour = dialNumber(hoursNow);
  return {
    ok: false,
    text:
      want === 0
        ? `Kim dài đúng rồi. Kim ngắn cần chỉ số ${hour}.`
        : `Kim dài đúng rồi. Kim ngắn cần ở giữa số ${hour} và số ${dialNumber(hoursNow + 1)}.`,
  };
}

/** The minute hand starts on 12 and walks one number at a time. */
export const WALK_START = toMinutes(7, 0);
/** Minutes the hand moves from one number to the next. */
export const WALK_STEP = 5;

/**
 * What the child sees after the minute hand has walked `walked` minutes.
 * @param {number} walked 0 to 60
 */
export function walkMessage(walked) {
  if (walked === 0) return 'Kim dài đang chỉ số 12. Bấm nút để kim dài đi tiếp.';
  if (walked === 60) {
    return 'Kim dài đi hết một vòng: 60 phút. Kim ngắn đi từ số 7 đến số 8: 1 giờ. Vậy 1 giờ = 60 phút.';
  }
  return `Kim dài chỉ số ${walked / WALK_STEP}: đã đi ${walked} phút.`;
}

/** @typedef {'tron-gio' | 'muoi-lam-phut' | 'ba-muoi-phut'} ClockKind */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<number> & { kind: ClockKind }} ClockQuestion */

/** What each kind practises, for the end card. */
export const CLOCK_LABELS = /** @type {const} */ ({
  'tron-gio': 'Kim dài chỉ số 12',
  'muoi-lam-phut': 'Kim dài chỉ số 3',
  'ba-muoi-phut': 'Kim dài chỉ số 6',
});

/** @type {Record<ClockKind, number>} */
const KIND_MINUTES = { 'tron-gio': 0, 'muoi-lam-phut': 15, 'ba-muoi-phut': 30 };

/**
 * One clock to read, with options that come from real misreadings: the next
 * hour, and the right hour with the wrong minutes.
 * @param {ClockKind} kind
 * @param {() => number} rand
 * @returns {ClockQuestion}
 */
export function clockQuestion(kind, rand) {
  const m = KIND_MINUTES[kind];
  const hour = int(rand, 1, 12);
  const minutes = toMinutes(hour, m);
  const right = m === 30 && rand() < 0.5 ? `${hour} giờ rưỡi` : dialText(minutes);
  const others = [0, 15, 30].filter((x) => x !== m);
  const wrong = [
    dialText(toMinutes(dialNumber(hour + 1), m)),
    dialText(toMinutes(hour, pick(rand, others))),
    dialText(toMinutes(dialNumber(hour + 1), pick(rand, others))),
  ];
  return {
    kind,
    prompt: 'Đồng hồ chỉ mấy giờ?',
    visual: minutes,
    ...mixOptions(rand, right, wrong),
    hint: 'Xem kim dài trước: số 12 là đúng giờ, số 3 là 15 phút, số 6 là 30 phút. Rồi xem kim ngắn vừa đi qua số nào.',
    solution: `Đồng hồ có ${handsText(minutes)}. Đó là ${right}.`,
  };
}

/**
 * A round of six clocks in mixed order, two of each kind.
 * @param {number} seed
 * @returns {ClockQuestion[]}
 */
export function buildClockRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {ClockKind[]} */ (Object.keys(CLOCK_LABELS));
  return shuffle(rand, [...kinds, ...kinds]).map((k) => clockQuestion(k, rand));
}
