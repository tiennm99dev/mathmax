/**
 * The sorting game: a heap of mixed things comes one at a time, the child puts
 * each into its group, the data table fills itself, and then questions read
 * the finished table.
 */
import { bigOptions, capitalize, mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { pictures } from '#lib/core/kid/pictures/index.js';
import { int, rng, shuffle } from '#lib/core/drill.js';
import { countBy, extremes, totalOf } from '../_shared/data.js';

/**
 * @typedef {object} Theme
 * @property {string} title where the heap comes from
 * @property {string} head the header of the name row
 * @property {string} all the word for every thing in the heap ("quả")
 * @property {readonly import('#lib/core/kid/pictures/index.js').PictureName[]} kinds
 */

/** @type {readonly Theme[]} */
export const THEMES = [
  { title: 'Giỏ quả của mẹ', head: 'Loại quả', all: 'quả', kinds: ['apple', 'banana', 'orange'] },
  {
    title: 'Hộp đồ chơi của Nam',
    head: 'Đồ chơi',
    all: 'đồ chơi',
    kinds: ['ball', 'balloon', 'cube'],
  },
  { title: 'Góc vườn nhà Mai', head: 'Con vật', all: 'con vật', kinds: ['fish', 'cat', 'rabbit'] },
  {
    title: 'Mâm quả ngày hội',
    head: 'Loại quả',
    all: 'quả',
    kinds: ['strawberry', 'apple', 'banana'],
  },
];

/**
 * @typedef {object} SceneRow
 * @property {import('#lib/core/kid/pictures/index.js').PictureName} picture
 * @property {string} noun the Vietnamese noun ("quả táo")
 * @property {string} label the column name ("Quả táo")
 * @property {number} count
 */

/**
 * @typedef {object} Scene
 * @property {Theme} theme
 * @property {SceneRow[]} rows
 * @property {number[]} items the group of each thing in the heap, in the order they come
 */

/**
 * A heap of three kinds of thing with three different counts from 3 to 8, so
 * that one kind is the most and one the fewest.
 * @param {number} seed
 * @returns {Scene}
 */
export function makeScene(seed) {
  const rand = rng(seed);
  const theme = THEMES[seed % THEMES.length];
  const counts = shuffle(rand, [3, 4, 5, 6, 7, 8]).slice(0, 3);
  const rows = theme.kinds.map((picture, i) => ({
    picture,
    noun: pictures[picture],
    label: capitalize(pictures[picture]),
    count: counts[i],
  }));
  const items = shuffle(
    rand,
    rows.flatMap((r, i) => Array.from({ length: r.count }, () => i)),
  );
  return { theme, rows, items };
}

/**
 * The counts in the table once the first `done` things are sorted.
 * @param {Scene} scene
 * @param {number} done
 * @returns {number[]}
 */
export function tableCounts(scene, done) {
  return countBy(scene.items.slice(0, done), scene.rows.length);
}

/**
 * What the child hears after putting the current thing in group `group`.
 * @param {Scene} scene
 * @param {number} done how many things were sorted before this one
 * @param {number} group
 * @returns {{ ok: boolean, message: string }}
 */
export function sortStep(scene, done, group) {
  const right = scene.items[done];
  const thing = scene.rows[right];
  if (group !== right) {
    return {
      ok: false,
      message: `Chưa đúng. Đây là ${thing.noun}. Em tìm cột ${thing.label} nhé.`,
    };
  }
  const left = scene.items.length - done - 1;
  const n = tableCounts(scene, done + 1)[right];
  return {
    ok: true,
    message:
      left === 0
        ? 'Em đã phân loại xong! Bảng số liệu đã điền đủ. Em chạm "Đọc bảng số liệu" nhé.'
        : `Đúng rồi! Cột ${thing.label} có ${n}. Còn ${left} đồ vật nữa.`,
  };
}

/**
 * The questions on the finished table: one count, the most, the fewest, the
 * difference between them and the total.
 * @param {Scene} scene
 * @param {number} seed
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion[]}
 */
export function questionsOf(scene, seed) {
  const rand = rng(seed + 1000);
  const { rows, theme } = scene;
  const names = rows.map((r) => r.label);
  const { most, least, max, min } = extremes(rows);
  const pick = rows[int(rand, 0, rows.length - 1)];
  const top = rows.find((r) => r.label === most[0]) ?? rows[0];
  const low = rows.find((r) => r.label === least[0]) ?? rows[0];
  const total = totalOf(rows);
  const sum = rows.map((r) => r.count).join(' + ');
  return [
    {
      prompt: `Bảng số liệu cho biết có bao nhiêu ${pick.noun}?`,
      ...numberOptions(rand, pick.count, 0, 12),
      hint: `Em tìm cột ${pick.label}, rồi nhìn xuống hàng Số lượng.`,
      solution: `Dưới cột ${pick.label} ghi số ${pick.count}. Có ${pick.count} ${pick.noun}.`,
    },
    {
      prompt: `Loại nào nhiều nhất?`,
      ...mixOptions(
        rand,
        top.label,
        names.filter((n) => n !== top.label),
      ),
      hint: 'Em so sánh các số ở hàng Số lượng. Số nào lớn nhất?',
      solution: `Số lớn nhất là ${max}, ở cột ${top.label}. ${top.label} nhiều nhất.`,
    },
    {
      prompt: `Loại nào ít nhất?`,
      ...mixOptions(
        rand,
        low.label,
        names.filter((n) => n !== low.label),
      ),
      hint: 'Em so sánh các số ở hàng Số lượng. Số nào bé nhất?',
      solution: `Số bé nhất là ${min}, ở cột ${low.label}. ${low.label} ít nhất.`,
    },
    {
      prompt: `Số ${top.noun} nhiều hơn số ${low.noun} là bao nhiêu?`,
      ...numberOptions(rand, max - min, 0, 10),
      hint: 'Muốn biết nhiều hơn bao nhiêu, em lấy số lớn trừ số bé.',
      solution: `${max} − ${min} = ${max - min}. Số ${top.noun} nhiều hơn số ${low.noun} là ${max - min}.`,
    },
    {
      prompt: `Có tất cả bao nhiêu ${theme.all}?`,
      ...bigOptions(rand, total, 0, 40),
      hint: 'Em cộng tất cả các số ở hàng Số lượng.',
      solution: `${sum} = ${total}. Có tất cả ${total} ${theme.all}.`,
    },
  ];
}
