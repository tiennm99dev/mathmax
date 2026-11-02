import { describe, expect, it } from 'vitest';
import { optionText, questionKey } from '#lib/core/kid/quiz.js';
import { THINGS, solidTitle, stackTotal } from '../_shared/solids.js';
import { KINDS, KIND_LABELS, buildRound } from './engine.js';

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1);

/** @param {import('./engine.js').Question} q */
function numbers(q) {
  return (q.prompt.match(/\d+/g) ?? []).map(Number);
}

/**
 * The right option worked out again from the prompt and the picture alone.
 * @param {import('./engine.js').Question} q
 * @returns {string | undefined} undefined when the question is not rechecked here
 */
function recompute(q) {
  const v = q.visual;
  if (v?.type === 'solid') return solidTitle(v.kind);
  if (v?.type === 'thing') {
    const thing = THINGS.find((t) => t.id === v.id);
    return thing && solidTitle(thing.kind);
  }
  if (v?.type === 'scene') {
    const kinds = /** @type {const} */ (['tru', 'cau', 'hop-chu-nhat']);
    const names = { tru: 'khối trụ', cau: 'khối cầu', 'hop-chu-nhat': 'khối hộp chữ nhật' };
    const kind = kinds.find((k) => q.prompt.includes(names[k]));
    return String(v.items.filter((i) => i === kind).length);
  }
  if (v?.type === 'cells') {
    const best = v.cells.reduce((a, b) => (b.value > a.value ? b : a));
    return best.kind === 'tru' ? 'Khối trụ' : 'Khối cầu';
  }
  if (v?.type === 'blocks') {
    const spheres = v.blocks
      .filter((b) => b.kind === 'cau')
      .map((b) => b.kg)
      .sort((a, b) => a - b);
    const cylinders = v.blocks
      .filter((b) => b.kind === 'tru')
      .map((b) => b.kg)
      .sort((a, b) => a - b);
    if (q.prompt.includes('nhẹ nhất')) return `${spheres[0] + cylinders[0]} kg`;
    return `${spheres[0] + spheres[1]} kg`;
  }
  if (v?.type === 'stack') return String(stackTotal(v.rows));
  if (q.prompt.startsWith('Tê tê')) {
    const [start, end] = numbers(q);
    return `${end - start} cm`;
  }
  if (q.prompt.startsWith('Mỗi hộp')) {
    const [per, boxes] = numbers(q);
    const object = /Mỗi hộp có \d+ (.+?)\./.exec(q.prompt)?.[1];
    return `${per * boxes} ${object}`;
  }
  return undefined;
}

describe('buildRound', () => {
  it('asks every kind twice, with labels for the end card', () => {
    for (const seed of [1, 2]) {
      const kinds = buildRound(seed)
        .map((q) => q.kind)
        .sort();
      expect(kinds).toEqual([...KINDS, ...KINDS].sort());
    }
    expect(Object.keys(KIND_LABELS).sort()).toEqual([...KINDS].sort());
  });

  it('builds the same round from the same seed', () => {
    expect(buildRound(7)).toEqual(buildRound(7));
  });

  it('never repeats a question in a round', () => {
    const repeats = SEEDS.filter((seed) => {
      const keys = buildRound(seed).map(questionKey);
      return new Set(keys).size !== keys.length;
    });
    expect(repeats).toEqual([]);
  });

  it('gives each question distinct options and an answer among them', () => {
    const faults = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const texts = q.options.map(optionText);
        if (new Set(texts).size !== texts.length || texts.length < 2 || !texts[q.answer]) {
          faults.push(q.prompt);
        }
      }
    }
    expect(faults).toEqual([]);
  });

  it('stores the answer the prompt and the picture give', () => {
    const faults = [];
    let checked = 0;
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        const expected = recompute(q);
        if (expected === undefined) continue;
        checked += 1;
        if (optionText(q.options[q.answer]) !== expected) {
          faults.push({ prompt: q.prompt, expected, got: optionText(q.options[q.answer]) });
        }
      }
    }
    expect(faults).toEqual([]);
    expect(checked).toBeGreaterThan(200);
  });

  it('keeps the gap of a pattern inside a row whose rule can be read', () => {
    const faults = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        if (q.visual?.type !== 'pattern') continue;
        const { items } = q.visual;
        const gap = items.indexOf(null);
        const size = (items.length - 1) / 2;
        const right = /** @type {any} */ (q.options[q.answer]).solid;
        const twin = gap >= size ? items[gap - size] : items[gap + size];
        if (gap < size || twin !== right) faults.push(items);
      }
    }
    expect(faults).toEqual([]);
  });

  it('marks the only thing of the asked form as right among picture options', () => {
    const faults = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        if (q.kind !== 'do-vat' || q.visual) continue;
        const wanted = q.prompt.includes('khối trụ') ? 'tru' : 'cau';
        const fits = q.options.map(
          (o) => THINGS.find((t) => t.id === /** @type {any} */ (o).thing)?.kind === wanted,
        );
        if (fits.filter(Boolean).length !== 1 || !fits[q.answer]) faults.push(q.prompt);
      }
    }
    expect(faults).toEqual([]);
  });

  it('keeps the right option out of the hint of a naming question', () => {
    const faults = [];
    for (const seed of SEEDS) {
      for (const q of buildRound(seed)) {
        if (q.kind !== 'nhan-khoi') continue;
        const right = optionText(q.options[q.answer]).toLowerCase();
        if (q.hint.toLowerCase().includes(right)) faults.push(q.prompt);
      }
    }
    expect(faults).toEqual([]);
  });
});
