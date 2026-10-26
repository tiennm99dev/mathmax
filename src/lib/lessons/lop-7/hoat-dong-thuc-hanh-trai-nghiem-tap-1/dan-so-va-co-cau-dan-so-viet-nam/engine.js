/**
 * Data and pure logic for the population activity: Viet Nam's average
 * population from 2011 to 2020 (millions, rounded, as used in the textbook
 * activity), the population structure by sex and by place of residence in the
 * 2009 and 2019 censuses and in 2020, and the arithmetic the activity asks
 * for: changes between years, central angles of a pie chart and the number of
 * people a percentage stands for.
 */

import { formatNumber } from '#lib/core/number-format.js';

/** Years of the population series. */
export const YEARS = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

/** Average population of Viet Nam, millions of people, one per year in {@link YEARS}. */
export const POPULATION = [88.87, 89.9, 90.75, 91.71, 92.68, 93.64, 94.6, 95.55, 96.46, 97.58];

/** Average population in 2021, millions, to check a forecast against. */
export const POPULATION_2021 = 98.51;

/**
 * @typedef {object} Structure
 * @property {string} source where the figures come from
 * @property {number} total population, millions
 * @property {[number, number]} sex percentages of males, females
 * @property {[number, number]} residence percentages of urban, rural
 */

/** Population structure in the years the pie chart offers. */
export const STRUCTURE = /** @type {Record<'2009' | '2019' | '2020', Structure>} */ ({
  2009: {
    source: 'Tổng điều tra dân số 1/4/2009',
    total: 85.85,
    sex: [49.4, 50.6],
    residence: [29.6, 70.4],
  },
  2019: {
    source: 'Tổng điều tra dân số 1/4/2019',
    total: 96.21,
    sex: [49.8, 50.2],
    residence: [34.4, 65.6],
  },
  2020: {
    source: 'Dân số trung bình năm 2020',
    total: 97.58,
    sex: [49.8, 50.2],
    residence: [36.8, 63.2],
  },
});

/** The two ways the population is split, with the names of the two parts. */
export const CRITERIA = /** @type {const} */ ({
  sex: { label: 'Giới tính', parts: ['Nam', 'Nữ'] },
  residence: { label: 'Nơi sinh sống', parts: ['Thành thị', 'Nông thôn'] },
});

/** @typedef {keyof typeof CRITERIA} Criterion */

/**
 * Rounds to `d` decimals without floating-point noise.
 * @param {number} v @param {number} [d]
 */
export function round(v, d = 2) {
  const k = 10 ** d;
  return Math.round((v + Number.EPSILON * Math.sign(v)) * k) / k;
}

/**
 * Central angle, in degrees, of the slice for `percent` %.
 * @param {number} percent
 */
export function centralAngle(percent) {
  return round(percent * 3.6, 4);
}

/**
 * People, in millions, that `percent` % of `total` millions stands for.
 * @param {number} percent @param {number} total
 */
export function share(percent, total) {
  return (percent / 100) * total;
}

/**
 * Population in year `y` (from {@link YEARS}), millions.
 * @param {number} y
 */
export function populationIn(y) {
  const i = YEARS.indexOf(y);
  if (i < 0) throw new RangeError(`no data for ${y}`);
  return POPULATION[i];
}

/**
 * Change from year `from` to year `to` and the average change per year.
 * @param {number} from @param {number} to
 */
export function growth(from, to) {
  const total = round(populationIn(to) - populationIn(from));
  const years = to - from;
  return { total, years, perYear: years > 0 ? total / years : 0 };
}

/** Change from each year to the next, millions. */
export function yearlyChanges() {
  return POPULATION.slice(1).map((v, i) => round(v - POPULATION[i]));
}

/**
 * How close a drawn pie is to the table: the drawn percentage of the first
 * part against the table's, and whether they agree to 0,1 %.
 * @param {number} drawn first part's percentage on the chart
 * @param {number} target first part's percentage in the table
 */
export function pieMatch(drawn, target) {
  const gap = round(drawn - target, 1);
  return { gap, ok: Math.abs(gap) < 0.05 };
}

/**
 * Feedback on a forecast of the 2021 population.
 * @param {number} guess millions
 */
export function forecastFeedback(guess) {
  const gap = round(guess - POPULATION_2021);
  const avg = growth(2011, 2020).perYear;
  const trendGuess = round(POPULATION[POPULATION.length - 1] + avg);
  const near = Math.abs(gap) <= 0.2;
  const word =
    gap === 0
      ? 'đúng bằng'
      : gap > 0
        ? `cao hơn ${formatNumber(gap, 2)} triệu so với`
        : `thấp hơn ${formatNumber(-gap, 2)} triệu so với`;
  return {
    near,
    text: `Dự đoán của em ${word} số liệu thật: ${formatNumber(POPULATION_2021, 2)} triệu người. ${
      near ? 'Rất sát!' : 'Còn khá xa.'
    } Nếu dân số tiếp tục tăng trung bình ${formatNumber(round(avg), 2)} triệu người mỗi năm như giai đoạn 2011 – 2020, ta dự đoán khoảng ${formatNumber(trendGuess, 2)} triệu người.`,
  };
}
