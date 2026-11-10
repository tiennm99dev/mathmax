/**
 * The measures of the grade 4 chapter "Một số đơn vị đo đại lượng": mass in
 * tấn, tạ, yến and kg, area in m², dm², cm² and mm², time in giây and
 * centuries written with Roman numerals. Every amount is held as a whole
 * number of the smallest unit (kg, mm², giây, năm). Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/**
 * A mass unit of the chapter, largest first, with its size in kilograms.
 * @typedef {{ id: 'tan' | 'ta' | 'yen' | 'kg', name: string, kg: number }} MassUnit
 */

/** @type {readonly MassUnit[]} */
export const MASS_UNITS = [
  { id: 'tan', name: 'tấn', kg: 1000 },
  { id: 'ta', name: 'tạ', kg: 100 },
  { id: 'yen', name: 'yến', kg: 10 },
  { id: 'kg', name: 'kg', kg: 1 },
];

/**
 * A mass in kilograms split into tấn, tạ, yến and kg, each part below ten
 * except the tấn.
 * @param {number} kg a whole number of kilograms
 * @returns {Record<MassUnit['id'], number>}
 */
export function massParts(kg) {
  return {
    tan: Math.floor(kg / 1000),
    ta: Math.floor((kg % 1000) / 100),
    yen: Math.floor((kg % 100) / 10),
    kg: kg % 10,
  };
}

/**
 * The kilograms of an amount given in several units.
 * @param {Partial<Record<MassUnit['id'], number>>} parts
 */
export function massTotal(parts) {
  return MASS_UNITS.reduce((sum, u) => sum + (parts[u.id] ?? 0) * u.kg, 0);
}

/**
 * A mass written with the units the book uses, skipping the empty ones:
 * 1205 → '1 tấn 2 tạ 5 kg', 0 → '0 kg'.
 * @param {number} kg
 */
export function massText(kg) {
  if (kg === 0) return '0 kg';
  const parts = massParts(kg);
  return MASS_UNITS.filter((u) => parts[u.id] > 0)
    .map((u) => `${fmt(parts[u.id])} ${u.name}`)
    .join(' ');
}

/**
 * An area unit, largest first, with its size in square millimetres and
 * the side of its square.
 * @typedef {{ id: 'm2' | 'dm2' | 'cm2' | 'mm2', symbol: string, name: string, side: string, mm2: number }} AreaUnit
 */

/** @type {readonly AreaUnit[]} */
export const AREA_UNITS = [
  { id: 'm2', symbol: 'm²', name: 'mét vuông', side: '1 m', mm2: 1_000_000 },
  { id: 'dm2', symbol: 'dm²', name: 'đề-xi-mét vuông', side: '1 dm', mm2: 10_000 },
  { id: 'cm2', symbol: 'cm²', name: 'xăng-ti-mét vuông', side: '1 cm', mm2: 100 },
  { id: 'mm2', symbol: 'mm²', name: 'mi-li-mét vuông', side: '1 mm', mm2: 1 },
];

/**
 * The area unit with that id.
 * @param {AreaUnit['id']} id
 * @returns {AreaUnit}
 */
export function areaUnit(id) {
  const u = AREA_UNITS.find((a) => a.id === id);
  if (!u) throw new Error(`unknown area unit ${id}`);
  return u;
}

/**
 * An amount of area turned from one unit into another; null when the result
 * is not whole, since the chapter only converts to whole numbers.
 * @param {number} value
 * @param {AreaUnit['id']} from
 * @param {AreaUnit['id']} to
 * @returns {number | null}
 */
export function convertArea(value, from, to) {
  const mm2 = value * areaUnit(from).mm2;
  const size = areaUnit(to).mm2;
  return mm2 % size === 0 ? mm2 / size : null;
}

/**
 * A duration in seconds as the book writes it: 125 → '2 phút 5 giây',
 * 120 → '2 phút', 45 → '45 giây'.
 * @param {number} seconds a whole number
 */
export function durationText(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  if (min === 0) return `${sec} giây`;
  return sec === 0 ? `${min} phút` : `${min} phút ${sec} giây`;
}

const ROMAN = /** @type {const} */ ([
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]);

/**
 * A number from 1 to 39 in Roman numerals, as centuries are written:
 * 21 → 'XXI'.
 * @param {number} n
 */
export function roman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 39) throw new Error(`no Roman numeral for ${n}`);
  let rest = n;
  let text = '';
  for (const [value, mark] of ROMAN) {
    while (rest >= value) {
      text += mark;
      rest -= value;
    }
  }
  return text;
}

/**
 * The century a year belongs to: years 1 to 100 are century I, 101 to 200
 * century II, and 2001 to 2100 century XXI.
 * @param {number} year from 1
 */
export function centuryOf(year) {
  return Math.ceil(year / 100);
}

/**
 * The first and last year of a century.
 * @param {number} century
 * @returns {[number, number]}
 */
export function centuryYears(century) {
  return [century * 100 - 99, century * 100];
}

/**
 * 'thế kỉ XXI'
 * @param {number} century
 */
export function centuryText(century) {
  return `thế kỉ ${roman(century)}`;
}

/**
 * Why a year is in its century: 'Năm 1945 thuộc thế kỉ XX (từ năm 1901 đến
 * năm 2000).'
 * @param {number} year
 */
export function centuryWhy(year) {
  const c = centuryOf(year);
  const [first, last] = centuryYears(c);
  return `Năm ${year} thuộc ${centuryText(c)} (từ năm ${first} đến năm ${last}).`;
}
