/**
 * The tally game: a mixed heap of things to count one by one, then the
 * questions that read the finished tally table.
 */
import { numberOptions, capitalize, mixOptions } from '#lib/core/kid/quiz.js';
import { pictures } from '#lib/core/kid/pictures/index.js';
import { rng, shuffle } from '#lib/core/drill.js';
import { THEMES } from '../_shared/themes.js';
import { extremes, tallyWords } from '../_shared/survey.js';

/**
 * @typedef {object} SceneRow
 * @property {import('#lib/core/kid/pictures/index.js').PictureName} picture
 * @property {string} label its Vietnamese noun
 * @property {number} count
 */

/**
 * @typedef {object} Scene
 * @property {SceneRow[]} rows
 * @property {number[]} items the row of each thing in the heap, mixed
 */

/**
 * A heap of three kinds of thing, with three different counts from 3 to 8, so
 * that one kind is the most and one the fewest.
 * @param {number} seed
 * @returns {Scene}
 */
export function makeScene(seed) {
  const rand = rng(seed);
  const theme = THEMES[seed % THEMES.length];
  const counts = shuffle(rand, [3, 4, 5, 6, 7, 8]).slice(0, 3);
  const rows = theme.map((picture, i) => ({
    picture,
    label: pictures[picture],
    count: counts[i],
  }));
  const items = shuffle(
    rand,
    rows.flatMap((r, i) => Array.from({ length: r.count }, () => i)),
  );
  return { rows, items };
}

/**
 * How many things of each row have been tapped.
 * @param {Scene} scene
 * @param {readonly number[]} counted indices into `scene.items`
 * @returns {number[]}
 */
export function strokes(scene, counted) {
  const tally = scene.rows.map(() => 0);
  for (const i of counted) tally[scene.items[i]] += 1;
  return tally;
}

/**
 * The questions on the finished table: how many of each kind, then the most
 * and the fewest.
 * @param {Scene} scene
 * @param {number} seed
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion[]}
 */
export function questionsOf(scene, seed) {
  const rand = rng(seed + 1000);
  const names = scene.rows.map((r) => capitalize(r.label));
  const { most, least } = extremes(scene.rows);
  const reads = scene.rows.map((r) => ({
    prompt: `Bảng kiểm đếm có mấy ${r.label}?`,
    ...numberOptions(rand, r.count, 1, 10),
    hint: 'Mỗi bó có 5 vạch. Em đếm từng bó, rồi đếm thêm các vạch lẻ.',
    solution: `${capitalize(r.label)}: ${tallyWords(r.count)}, là ${r.count}.`,
  }));
  return [
    ...reads,
    {
      prompt: 'Loại nào nhiều nhất?',
      ...mixOptions(
        rand,
        capitalize(most[0]),
        names.filter((n) => n !== capitalize(most[0])),
      ),
      hint: 'Em tìm hàng có nhiều vạch nhất.',
      solution: `${capitalize(most[0])} nhiều nhất.`,
    },
    {
      prompt: 'Loại nào ít nhất?',
      ...mixOptions(
        rand,
        capitalize(least[0]),
        names.filter((n) => n !== capitalize(least[0])),
      ),
      hint: 'Em tìm hàng có ít vạch nhất.',
      solution: `${capitalize(least[0])} ít nhất.`,
    },
  ];
}
