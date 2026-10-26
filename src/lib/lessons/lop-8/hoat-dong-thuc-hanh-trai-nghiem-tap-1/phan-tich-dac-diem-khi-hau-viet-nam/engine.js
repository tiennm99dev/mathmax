/**
 * Monthly climate data of three Vietnamese cities and the statistics the
 * activity reads from them: yearly mean temperature, yearly temperature
 * range, yearly rainfall and the rainy season (months with at least 100 mm,
 * the convention of Vietnamese geography lessons).
 *
 * The values are rounded long-term monthly averages, prepared for the lesson
 * so that every exercise can be worked from the table.
 */

import { fmt, formatNumber } from '#lib/core/number-format.js';

/** @typedef {'ha-noi' | 'hue' | 'tp-hcm'} CityId */
/** @typedef {'temp' | 'rain' | 'humid'} Quantity */

/**
 * @typedef {object} City
 * @property {CityId} id
 * @property {string} name
 * @property {string} region
 * @property {string} color
 * @property {number[]} temp mean temperature of each month, °C
 * @property {number[]} rain rainfall of each month, mm
 * @property {number[]} humid relative humidity of each month, %
 */

/** @type {City[]} */
export const CITIES = [
  {
    id: 'ha-noi',
    name: 'Hà Nội',
    region: 'miền Bắc',
    color: '#DC2626',
    temp: [16.4, 17.2, 20.0, 23.9, 27.4, 29.0, 29.2, 28.6, 27.5, 24.9, 21.5, 18.3],
    rain: [19, 26, 44, 90, 189, 240, 288, 318, 265, 131, 43, 23],
    humid: [80, 82, 85, 85, 81, 79, 80, 82, 80, 77, 76, 76],
  },
  {
    id: 'hue',
    name: 'Huế',
    region: 'miền Trung',
    color: '#059669',
    temp: [20.0, 20.9, 23.1, 26.0, 28.3, 29.3, 29.4, 28.9, 27.1, 25.1, 23.1, 20.8],
    rain: [161, 62, 47, 51, 82, 90, 95, 98, 473, 795, 580, 297],
    humid: [88, 88, 86, 83, 78, 73, 71, 74, 83, 87, 89, 89],
  },
  {
    id: 'tp-hcm',
    name: 'TP Hồ Chí Minh',
    region: 'miền Nam',
    color: '#2563EB',
    temp: [25.8, 26.7, 27.9, 28.9, 28.3, 27.5, 27.1, 27.1, 26.8, 26.7, 26.4, 25.7],
    rain: [14, 4, 11, 50, 218, 312, 294, 270, 327, 267, 117, 48],
    humid: [72, 70, 70, 72, 79, 82, 83, 83, 85, 84, 80, 77],
  },
];

/** Rainfall of a month in the rainy season is at least this many millimetres. */
export const RAINY_MM = 100;

/** @type {Record<Quantity, { label: string, unit: string, decimals: number }>} */
export const QUANTITIES = {
  temp: { label: 'Nhiệt độ', unit: '°C', decimals: 1 },
  rain: { label: 'Lượng mưa', unit: 'mm', decimals: 0 },
  humid: { label: 'Độ ẩm', unit: '%', decimals: 0 },
};

/** @param {CityId} id */
export function cityOf(id) {
  return CITIES.find((c) => c.id === id) ?? CITIES[0];
}

/** @param {number[]} xs */
export const total = (xs) => xs.reduce((s, x) => s + x, 0);
/** @param {number[]} xs */
export const mean = (xs) => total(xs) / xs.length;
/** Difference between the largest and the smallest value. @param {number[]} xs */
export const range = (xs) => Math.max(...xs) - Math.min(...xs);

/**
 * Month numbers (1 to 12) of the largest and smallest values; ties keep the
 * first month.
 * @param {number[]} xs
 */
export function extremes(xs) {
  return {
    max: xs.indexOf(Math.max(...xs)) + 1,
    min: xs.indexOf(Math.min(...xs)) + 1,
  };
}

/**
 * Months of the rainy season, in calendar order.
 * @param {number[]} rain
 * @param {number} [threshold]
 */
export function rainyMonths(rain, threshold = RAINY_MM) {
  return rain.flatMap((mm, i) => (mm >= threshold ? [i + 1] : []));
}

/**
 * The rainy season as text, joining months that follow each other across
 * the new year: [1, 9, 10, 11, 12] → 'tháng 9 đến tháng 1'.
 * @param {number[]} months
 */
export function seasonText(months) {
  if (!months.length) return 'không có';
  if (months.length === 12) return 'cả năm';
  const set = new Set(months);
  // Start at a month whose previous month is not in the season.
  const start = months.find((m) => !set.has(m === 1 ? 12 : m - 1)) ?? months[0];
  let end = start;
  let count = 1;
  while (set.has(end === 12 ? 1 : end + 1) && count < months.length) {
    end = end === 12 ? 1 : end + 1;
    count++;
  }
  if (count === months.length) return `tháng ${start} đến tháng ${end}`;
  return months.map((m) => `tháng ${m}`).join(', ');
}

/**
 * One value with its unit, written the Vietnamese way: '23,7 °C'.
 * @param {number} v
 * @param {Quantity} q
 */
export function valueText(v, q) {
  const { unit, decimals } = QUANTITIES[q];
  const rounded = Math.round(v * 10 ** decimals) / 10 ** decimals;
  const n = decimals === 0 ? fmt(rounded) : formatNumber(rounded, decimals);
  return unit === '%' ? `${n}%` : `${n} ${unit}`;
}

/**
 * Summary numbers of a city.
 * @param {City} c
 */
export function summary(c) {
  const rainy = rainyMonths(c.rain);
  return {
    meanTemp: mean(c.temp),
    tempRange: range(c.temp),
    hottest: extremes(c.temp).max,
    coldest: extremes(c.temp).min,
    totalRain: total(c.rain),
    wettest: extremes(c.rain).max,
    rainy,
    season: seasonText(rainy),
  };
}
