/**
 * The two games of "Ki-lô-gam" on a pan balance: reading which of two
 * things is heavier (nặng hơn, nhẹ hơn), and putting 1 kg, 2 kg and 5 kg
 * weights against a thing until the balance is level, which gives its mass
 * in kilograms. The balance itself lives in the chapter's `_shared/mass.js`.
 * Pure and DOM-free.
 */
import { capitalize } from '#lib/core/kid/quiz.js';
import { heavierSide, massThing, totalKg, weightsText } from '../_shared/mass.js';

/**
 * The three sentences to choose from for a pair on the balance, always in
 * the same order, and the right one.
 * @param {[{ id: import('../_shared/mass.js').ThingId, kg: number }, { id: import('../_shared/mass.js').ThingId, kg: number }]} pair
 */
export function compareOptions(pair) {
  const [a, b] = pair.map((p) => massThing(p.id).name);
  const side = heavierSide(pair[0].kg, pair[1].kg);
  return {
    options: [
      `${capitalize(a)} nặng hơn ${b}.`,
      `${capitalize(b)} nặng hơn ${a}.`,
      'Hai vật nặng bằng nhau.',
    ],
    answer: side === 'left' ? 0 : side === 'right' ? 1 : 2,
  };
}

/**
 * What a screen reader hears for the balance.
 * @param {readonly import('../_shared/mass.js').Load[]} left
 * @param {readonly import('../_shared/mass.js').Load[]} right
 */
export function scaleLabel(left, right) {
  /** @param {readonly import('../_shared/mass.js').Load[]} loads */
  const names = (loads) => {
    const things = loads.flatMap((l) => (l.kind === 'thing' ? [massThing(l.id).name] : []));
    const weights = loads.flatMap((l) => (l.kind === 'weight' ? [l.kg] : []));
    const parts = [...things];
    if (weights.length > 0) parts.push(`quả cân ${weightsText(weights)}`);
    return parts.length > 0 ? parts.join(' và ') : 'không có gì';
  };
  const side = heavierSide(totalKg(left), totalKg(right));
  const tilt =
    side === 'level'
      ? 'Cân thăng bằng.'
      : side === 'left'
        ? 'Đĩa bên trái thấp hơn.'
        : 'Đĩa bên phải thấp hơn.';
  return `Cân đĩa. Đĩa bên trái: ${names(left)}. Đĩa bên phải: ${names(right)}. ${tilt}`;
}
