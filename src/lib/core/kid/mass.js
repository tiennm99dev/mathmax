/**
 * Mass with a pan balance (cân đĩa), the grade 2 way: things to weigh, the
 * 1 kg, 2 kg and 5 kg weights (quả cân), which pan goes down, how the loads
 * sit on a pan, and the sentences a child hears while weighing.
 * `balance-scale.svelte` draws it. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { capitalize } from './quiz.js';

/**
 * Things to put on the balance, with the range of whole kilograms they may
 * weigh in a task and their size on the pan (SVG units).
 * @typedef {{ id: ThingId, name: string, lo: number, hi: number, w: number, h: number }} MassThing
 */

/** @typedef {'pomelo' | 'bag' | 'melon' | 'pumpkin' | 'box' | 'sack'} ThingId */

/** @type {readonly MassThing[]} */
export const MASS_THINGS = [
  { id: 'pomelo', name: 'quả bưởi', lo: 1, hi: 2, w: 40, h: 38 },
  { id: 'bag', name: 'túi đường', lo: 1, hi: 3, w: 36, h: 46 },
  { id: 'melon', name: 'quả dưa hấu', lo: 2, hi: 5, w: 58, h: 42 },
  { id: 'pumpkin', name: 'quả bí ngô', lo: 2, hi: 6, w: 56, h: 42 },
  { id: 'box', name: 'thùng sách', lo: 4, hi: 9, w: 62, h: 44 },
  { id: 'sack', name: 'bao gạo', lo: 5, hi: 10, w: 54, h: 54 },
];

/** The weights (quả cân) of the balance, in kilograms. */
export const WEIGHTS = /** @type {const} */ ([1, 2, 5]);

/** At most this many weights fit on a pan. */
export const MAX_WEIGHTS = 6;

/** Size of a weight on the pan, by its kilograms. */
const WEIGHT_SIZE = /** @type {Record<number, [number, number]>} */ ({
  1: [28, 24],
  2: [32, 28],
  5: [38, 34],
});

/**
 * One thing on a pan: a drawn thing of a known mass (`id`), a labelled box of a
 * known mass for anything else (`name`), or a weight.
 * @typedef {(
 *   | { kind: 'thing', id: ThingId, kg: number }
 *   | { kind: 'thing', name: string, kg: number }
 *   | { kind: 'weight', kg: number }
 * )} Load
 */

/**
 * The thing with that id.
 * @param {ThingId} id
 * @returns {MassThing}
 */
export function massThing(id) {
  const t = MASS_THINGS.find((m) => m.id === id);
  if (!t) throw new Error(`unknown thing ${id}`);
  return t;
}

/** Size on a pan of a labelled box (a thing given by `name`). */
const NAMED_BOX = /** @type {[number, number]} */ ([86, 36]);

/**
 * The size of one load on a pan.
 * @param {Load} load
 * @returns {[number, number]} width and height in SVG units
 */
function sizeOnPan(load) {
  if (load.kind === 'weight') return WEIGHT_SIZE[load.kg] ?? WEIGHT_SIZE[1];
  if ('name' in load) return NAMED_BOX;
  const { w, h } = massThing(load.id);
  return [w, h];
}

/**
 * The name of a load: 'quả dưa hấu', the name it was given, or 'quả cân 2 kg'.
 * @param {Load} load
 */
export function loadName(load) {
  if (load.kind === 'weight') return `quả cân ${load.kg} kg`;
  return 'name' in load ? load.name : massThing(load.id).name;
}

/**
 * What a screen reader says for a balance: both pans, then which pan is lower.
 * @param {readonly Load[]} left
 * @param {readonly Load[]} right
 */
export function balanceText(left, right) {
  /** @param {readonly Load[]} loads */
  const side = (loads) => loads.map(loadName).join(', ') || 'trống';
  const low = heavierSide(totalKg(left), totalKg(right));
  const tilt =
    low === 'level'
      ? 'Cân thăng bằng.'
      : low === 'left'
        ? 'Đĩa bên trái thấp hơn.'
        : 'Đĩa bên phải thấp hơn.';
  return `Cân đĩa. Đĩa bên trái: ${side(left)}. Đĩa bên phải: ${side(right)}. ${tilt}`;
}

/**
 * Total kilograms on a pan.
 * @param {readonly Load[]} loads
 */
export function totalKg(loads) {
  return loads.reduce((s, l) => s + l.kg, 0);
}

/**
 * Which pan goes down: the heavier one, or neither when they balance.
 * @param {number} leftKg
 * @param {number} rightKg
 * @returns {'left' | 'right' | 'level'}
 */
export function heavierSide(leftKg, rightKg) {
  if (leftKg === rightKg) return 'level';
  return leftKg > rightKg ? 'left' : 'right';
}

/**
 * Weights written as a sum, the book's way: "2 kg + 1 kg".
 * @param {readonly number[]} weights
 */
export function weightsText(weights) {
  return weights.map((w) => `${w} kg`).join(' + ');
}

/**
 * The fewest weights that make `kg`, biggest first.
 * @param {number} kg a whole number of kilograms, 0 or more
 * @returns {number[]}
 */
export function fewestWeights(kg) {
  const out = [];
  let left = kg;
  for (const w of [...WEIGHTS].reverse()) {
    while (left >= w) {
      out.push(w);
      left -= w;
    }
  }
  return out;
}

/**
 * The weights in a row, biggest first, as they are read aloud.
 * @param {readonly number[]} weights
 */
export function sortedWeights(weights) {
  return [...weights].sort((a, b) => b - a);
}

/**
 * What the balance says while a child puts weights against a thing.
 * @param {string} name the thing, inside a sentence
 * @param {number} kg its mass
 * @param {readonly number[]} weights the weights on the other pan
 */
export function weighMessage(name, kg, weights) {
  const sum = weights.reduce((s, w) => s + w, 0);
  if (weights.length === 0) {
    return `Đĩa có ${name} thấp xuống. Em chạm vào quả cân để đặt lên đĩa bên phải.`;
  }
  const on = weightsText(sortedWeights(weights));
  const total = weights.length > 1 ? ` = ${sum} kg` : '';
  if (sum < kg && weights.length >= MAX_WEIGHTS) {
    return `Đĩa quả cân đã đầy mà ${name} vẫn nặng hơn ${on}${total}. Em bỏ bớt quả cân nhỏ, thay bằng quả cân to hơn nhé.`;
  }
  if (sum < kg) {
    return `Đĩa có ${name} vẫn thấp hơn: ${name} nặng hơn ${on}${total}. Em thêm quả cân nhé.`;
  }
  if (sum > kg) {
    return `Đĩa quả cân thấp hơn: ${on}${total} nặng hơn ${name}. Em bỏ bớt quả cân nhé.`;
  }
  return `Cân thăng bằng! ${capitalize(name)} nặng ${on}${total}. ${capitalize(name)} cân nặng ${kg} kg.`;
}

/**
 * The sentence comparing two things that sit on the two pans.
 * @param {{ name: string, kg: number }} a on the left pan
 * @param {{ name: string, kg: number }} b on the right pan
 */
export function compareSentence(a, b) {
  const side = heavierSide(a.kg, b.kg);
  if (side === 'level') return `Cân thăng bằng: ${a.name} nặng bằng ${b.name}.`;
  const [heavy, light] = side === 'left' ? [a, b] : [b, a];
  return `Đĩa có ${heavy.name} thấp hơn: ${heavy.name} nặng hơn ${light.name}, ${light.name} nhẹ hơn ${heavy.name}.`;
}

/**
 * A thing and its mass to weigh, never the same thing twice in a row.
 * @param {() => number} rand
 * @param {ThingId} [prev]
 * @returns {{ id: ThingId, kg: number }}
 */
export function newWeighTask(rand, prev) {
  const pool = MASS_THINGS.filter((t) => t.id !== prev);
  const t = pool[int(rand, 0, pool.length - 1)];
  return { id: t.id, kg: int(rand, t.lo, t.hi) };
}

/**
 * Two different things with their masses for the comparing game; about one
 * pair in five balances.
 * @param {() => number} rand
 * @returns {[{ id: ThingId, kg: number }, { id: ThingId, kg: number }]}
 */
export function newPair(rand) {
  const i = int(rand, 0, MASS_THINGS.length - 1);
  let j = int(rand, 0, MASS_THINGS.length - 2);
  if (j >= i) j += 1;
  const a = MASS_THINGS[i];
  const b = MASS_THINGS[j];
  const ka = int(rand, a.lo, a.hi);
  const level = rand() < 0.2 && ka >= b.lo && ka <= b.hi;
  let kb = level ? ka : int(rand, b.lo, b.hi);
  for (let tries = 0; !level && kb === ka && tries < 20; tries++) kb = int(rand, b.lo, b.hi);
  if (!level && kb === ka) kb = ka + 1;
  return [
    { id: a.id, kg: ka },
    { id: b.id, kg: kb },
  ];
}

/**
 * Where each load sits on a pan of width `width`: left to right in rows,
 * each row on top of the one below. `x` is the left edge from the pan's
 * centre, `y` the bottom edge above the pan's rim (0 or negative).
 * @param {readonly Load[]} loads
 * @param {number} width
 * @returns {Array<{ load: Load, x: number, y: number, w: number, h: number }>}
 */
export function panLayout(loads, width) {
  const gap = 2;
  /** @type {Array<Array<{ load: Load, w: number, h: number }>>} */
  const rows = [[]];
  let used = 0;
  for (const load of loads) {
    const [w, h] = sizeOnPan(load);
    const row = rows[rows.length - 1];
    if (row.length > 0 && used + gap + w > width) {
      rows.push([{ load, w, h }]);
      used = w;
    } else {
      used += (row.length > 0 ? gap : 0) + w;
      row.push({ load, w, h });
    }
  }
  const out = [];
  let base = 0;
  for (const row of rows) {
    const rowWidth = row.reduce((s, r) => s + r.w, 0) + gap * (row.length - 1);
    let x = -rowWidth / 2;
    for (const r of row) {
      out.push({ ...r, x, y: base });
      x += r.w + gap;
    }
    base -= Math.max(0, ...row.map((r) => r.h));
  }
  return out;
}
