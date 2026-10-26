/**
 * Bases the prism widget offers, chosen so that every side, the perimeter
 * and the area are whole numbers of centimetres. Corners are listed
 * counter-clockwise from A at the front left.
 */

/** @typedef {{ id: string, short: string, name: string, pts: { x: number, y: number }[] }} Base */

/** @type {Base[]} */
export const BASES = [
  {
    id: 'tam-giac-vuong',
    short: 'Tam giác vuông',
    name: 'tam giác ABC vuông tại A, AB = 4 cm, AC = 3 cm, BC = 5 cm',
    pts: [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 3 },
    ],
  },
  {
    id: 'tam-giac-can',
    short: 'Tam giác cân',
    name: 'tam giác ABC cân tại C, AB = 6 cm, CA = CB = 5 cm, đường cao từ C dài 4 cm',
    pts: [
      { x: 0, y: 0 },
      { x: 6, y: 0 },
      { x: 3, y: 4 },
    ],
  },
  {
    id: 'hinh-thang-vuong',
    short: 'Hình thang vuông',
    name: 'hình thang ABCD vuông tại B và C, đáy AB = 6 cm, CD = 3 cm, BC = 4 cm, DA = 5 cm',
    pts: [
      { x: 0, y: 0 },
      { x: 6, y: 0 },
      { x: 6, y: 4 },
      { x: 3, y: 4 },
    ],
  },
  {
    id: 'hinh-thang-can',
    short: 'Hình thang cân',
    name: 'hình thang cân ABCD, đáy AB = 8 cm, CD = 2 cm, BC = DA = 5 cm, chiều cao 4 cm',
    pts: [
      { x: 0, y: 0 },
      { x: 8, y: 0 },
      { x: 5, y: 4 },
      { x: 3, y: 4 },
    ],
  },
];
