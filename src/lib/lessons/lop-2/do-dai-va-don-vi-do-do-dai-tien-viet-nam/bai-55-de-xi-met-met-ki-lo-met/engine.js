/**
 * The two boards of "Đề-xi-mét. Mét. Ki-lô-mét": a measuring bar that grows in
 * steps of 1 dm and reads the same length in dm, cm and m, and a road 1 km
 * long walked in steps of 100 m past places on the way. Pure and DOM-free.
 */

/** Longest bar, in dm (3 m). */
export const BAR_MAX = 30;
/** Length of the road, in m (1 km). */
export const ROAD_MAX = 1000;
/** A step along the road, in m. */
export const ROAD_STEP = 100;

/**
 * What to make the bar: a length written in cm, dm or m, and that length in dm.
 * @typedef {{ text: string, dm: number }} BarTask
 */

/** @type {readonly BarTask[]} */
export const BAR_TASKS = [
  { text: '3 dm', dm: 3 },
  { text: '1 m', dm: 10 },
  { text: '40 cm', dm: 4 },
  { text: '2 m', dm: 20 },
  { text: '15 dm', dm: 15 },
  { text: '100 cm', dm: 10 },
  { text: '3 m', dm: 30 },
  { text: '70 cm', dm: 7 },
];

/** Places along the road, in m from home. */
export const STOPS = /** @type {const} */ ([
  { m: 0, name: 'Nhà em', short: 'Nhà em' },
  { m: 200, name: 'cửa hàng', short: 'Cửa hàng' },
  { m: 500, name: 'trường học', short: 'Trường' },
  { m: 800, name: 'công viên', short: 'Công viên' },
  { m: 1000, name: 'chợ', short: 'Chợ' },
]);

/** Where to walk to: every place but home. */
export const ROAD_TASKS = STOPS.slice(1);

/**
 * The same bar in the three units; `m` is null when it is not a whole number
 * of metres, and `toNextM` tells how many dm more reach the next whole metre.
 * @param {number} dm
 */
export function barParts(dm) {
  const whole = dm % 10 === 0;
  return { dm, cm: dm * 10, m: whole ? dm / 10 : null, toNextM: whole ? 0 : 10 - (dm % 10) };
}

/**
 * What the bar shows now, in a sentence.
 * @param {number} dm
 */
export function barSentence(dm) {
  if (dm === 0) return 'Em kéo thanh trượt để thanh đo dài ra.';
  const { cm, m, toNextM } = barParts(dm);
  if (m !== null) return `${dm} dm = ${cm} cm. Thanh đo dài đúng ${m} m: ${m} m = ${dm} dm.`;
  const next = Math.floor(dm / 10) + 1;
  return `${dm} dm = ${cm} cm. Thêm ${toNextM} dm nữa là đủ ${next} m.`;
}

/**
 * Feedback for a bar task; `done` when the bar has the asked length.
 * @param {BarTask} task
 * @param {number} dm
 */
export function barFeedback(task, dm) {
  if (dm === task.dm) {
    const { cm, m } = barParts(dm);
    const inM = m === null ? '' : ` = ${m} m`;
    return { done: true, text: `Đúng rồi! Thanh đo dài ${task.text}: ${dm} dm = ${cm} cm${inM}.` };
  }
  if (dm === 0) return { done: false, text: barSentence(0) };
  const way = dm < task.dm ? 'Thanh đo còn ngắn, kéo dài thêm.' : 'Thanh đo dài quá, kéo ngắn lại.';
  return { done: false, text: `${way} ${barSentence(dm)}` };
}

/**
 * The place at `m` from home, if there is one.
 * @param {number} m
 */
export function stopAt(m) {
  return STOPS.find((s) => s.m === m);
}

/**
 * What the walk shows now, in a sentence.
 * @param {number} m
 */
export function roadSentence(m) {
  if (m === 0) return 'Bạn nhỏ đang ở nhà. Em kéo thanh trượt để đi.';
  if (m === ROAD_MAX) return 'Đã đi đúng 1 km: 1 km = 1000 m.';
  return `Đã đi ${m} m. Còn ${ROAD_MAX - m} m nữa là đủ 1 km.`;
}

/**
 * Feedback for walking to a place; `done` when the walk stopped there.
 * @param {{ m: number, name: string }} stop
 * @param {number} m
 */
export function roadFeedback(stop, m) {
  if (m === stop.m) {
    const km = m === ROAD_MAX ? ' Vậy là đúng 1 km.' : '';
    return { done: true, text: `Đến ${stop.name} rồi! Từ nhà đến ${stop.name} là ${m} m.${km}` };
  }
  if (m === 0) return { done: false, text: roadSentence(0) };
  const way =
    m < stop.m ? `Chưa đến ${stop.name}, đi tiếp nhé.` : `Quá ${stop.name} rồi, quay lại.`;
  return { done: false, text: `${way} ${roadSentence(m)}` };
}
