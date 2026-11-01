/**
 * The two games of "Lít": pouring a container into 1 l mugs one litre at a
 * time and counting the full mugs (how many litres it holds), and pouring
 * two containers out to see which holds more (nhiều hơn, ít hơn). The
 * containers live in the chapter's `_shared/capacity.js`. Pure and
 * DOM-free.
 */
import { capitalize, numberOptions } from '#lib/core/kid/quiz.js';
import { CUPS, litres, vessel } from '../_shared/capacity.js';

/**
 * Answer options for "how many litres", written with the unit.
 * @param {() => number} rand
 * @param {number} l the right number of litres
 */
export function litreOptions(rand, l) {
  const { options, answer } = numberOptions(rand, l, 1, CUPS);
  return { options: options.map((o) => litres(Number(o))), answer };
}

/**
 * The two sentences to choose from for two containers, and the right one.
 * @param {[{ id: import('../_shared/capacity.js').VesselId, l: number }, { id: import('../_shared/capacity.js').VesselId, l: number }]} pair
 */
export function moreOptions(pair) {
  const [a, b] = pair.map((p) => capitalize(vessel(p.id).name));
  return {
    options: [`${a} chứa được nhiều nước hơn.`, `${b} chứa được nhiều nước hơn.`],
    answer: pair[0].l > pair[1].l ? 0 : 1,
  };
}

/**
 * What a screen reader hears for a container while it is poured.
 * @param {string} name
 * @param {boolean} empty
 */
export function vesselLabel(name, empty) {
  return empty ? `${capitalize(name)} đã hết nước` : `${capitalize(name)} có nước`;
}
