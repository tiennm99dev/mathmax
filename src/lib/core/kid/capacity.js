/**
 * Capacity in litres, the grade 2 way: containers (can, xô, bình, chai)
 * full of water are poured into 1 l mugs (ca 1 l), and the full mugs are
 * counted. `vessel.svelte` and `cup.svelte` draw them. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { capitalize } from './quiz.js';

/** @typedef {'bottle' | 'jar' | 'can' | 'bucket'} VesselId */

/**
 * A container and the range of whole litres it may hold in a task.
 * @typedef {{ id: VesselId, name: string, lo: number, hi: number }} Vessel
 */

/** @type {readonly Vessel[]} */
export const VESSELS = [
  { id: 'bottle', name: 'chai', lo: 1, hi: 2 },
  { id: 'jar', name: 'bình', lo: 2, hi: 5 },
  { id: 'can', name: 'can', lo: 3, hi: 10 },
  { id: 'bucket', name: 'xô', lo: 4, hi: 10 },
];

/** How many 1 l mugs stand ready under a container. */
export const CUPS = 10;

/**
 * The container with that id.
 * @param {VesselId} id
 * @returns {Vessel}
 */
export function vessel(id) {
  const v = VESSELS.find((x) => x.id === id);
  if (!v) throw new Error(`unknown vessel ${id}`);
  return v;
}

/**
 * Litres written the book's way: "5 l".
 * @param {number} n
 */
export function litres(n) {
  return `${n} l`;
}

/**
 * What a child hears while pouring a container into 1 l mugs.
 * @param {string} name the container, inside a sentence
 * @param {number} full litres the container holds
 * @param {number} poured mugs filled so far
 */
export function pourMessage(name, full, poured) {
  if (poured === 0) return `${capitalize(name)} đầy nước. Em chạm "Rót 1 l" để rót nước ra ca 1 l.`;
  if (poured < full) {
    return `Em đã rót đầy ${poured} ca 1 l. ${capitalize(name)} vẫn còn nước, em rót tiếp nhé.`;
  }
  return `${capitalize(name)} hết nước rồi! Em đếm số ca đầy nước: ${name} chứa được mấy lít?`;
}

/**
 * The sentence once the full mugs are counted.
 * @param {string} name
 * @param {number} full
 */
export function holdsSentence(name, full) {
  return `${capitalize(name)} chứa được ${litres(full)} nước, vì rót ra đầy ${full} ca 1 l.`;
}

/**
 * The sentence comparing two containers by the mugs they fill.
 * @param {{ name: string, l: number }} a
 * @param {{ name: string, l: number }} b
 */
export function compareCapacity(a, b) {
  if (a.l === b.l) return `${capitalize(a.name)} và ${b.name} chứa được bằng nhau: ${litres(a.l)}.`;
  const [more, less] = a.l > b.l ? [a, b] : [b, a];
  return `${capitalize(more.name)} rót được ${more.l} ca, ${less.name} rót được ${less.l} ca. ${capitalize(more.name)} chứa được nhiều nước hơn ${less.name}.`;
}

/**
 * A container and its litres, never the same container twice in a row.
 * @param {() => number} rand
 * @param {VesselId} [prev]
 * @returns {{ id: VesselId, l: number }}
 */
export function newVesselTask(rand, prev) {
  const pool = VESSELS.filter((v) => v.id !== prev && v.hi >= 2);
  const v = pool[int(rand, 0, pool.length - 1)];
  return { id: v.id, l: int(rand, Math.max(2, v.lo), v.hi) };
}

/**
 * Two different containers holding different litres, for comparing.
 * @param {() => number} rand
 * @returns {[{ id: VesselId, l: number }, { id: VesselId, l: number }]}
 */
export function newVesselPair(rand) {
  const a = newVesselTask(rand);
  let b = newVesselTask(rand, a.id);
  for (let tries = 0; b.l === a.l && tries < 20; tries++) b = newVesselTask(rand, a.id);
  if (b.l === a.l) b = { ...b, l: a.l > 2 ? a.l - 1 : a.l + 1 };
  return [a, b];
}
