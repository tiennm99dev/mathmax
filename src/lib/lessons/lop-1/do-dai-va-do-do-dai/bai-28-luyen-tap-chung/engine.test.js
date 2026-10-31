import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { KINDS, buildRound, spreadSizes, weakKinds } from './engine.js';

/**
 * The right option worked out from the question's picture or numbers,
 * independently of the maker; null for the unit facts, checked by hand.
 * @param {import('./engine.js').Question} q
 */
function expected(q) {
  const most = /dài nhất|cao nhất|dài hơn/.test(q.prompt);
  const s = q.scene;
  if (s?.type === 'things') {
    const sizes = s.items.map((it) => it.length);
    const v = most ? Math.max(...sizes) : Math.min(...sizes);
    return s.items[sizes.indexOf(v)].thing.label;
  }
  if (s?.type === 'kids') {
    const sizes = s.items.map((it) => it.height);
    const v = most ? Math.max(...sizes) : Math.min(...sizes);
    return s.items[sizes.indexOf(v)].kid.label;
  }
  if (s?.type === 'ruler') return `${s.length} cm`;
  if (q.kind === 'cm') {
    const m = [...q.prompt.matchAll(/(.+?) dài (\d+) cm\. ?/g)].map((x) => ({
      label: x[1].trim(),
      cm: Number(x[2]),
    }));
    const pick = most ? (m[0].cm > m[1].cm ? m[0] : m[1]) : m[0].cm < m[1].cm ? m[0] : m[1];
    return pick.label;
  }
  return null;
}

const UNIT_ANSWERS = {
  'Xăng-ti-mét viết tắt là gì?': 'cm',
  'Đo bằng thước, em đặt vạch số mấy thẳng với một đầu đồ vật?': 'Vạch 0',
  'Gang tay bố dài hơn gang tay em. Đo cùng một cái bàn, ai đếm được nhiều gang tay hơn?': 'Em',
  'Muốn so chiều cao hai bạn, hai bạn phải đứng thế nào?': 'Trên cùng một mặt sàn',
};

describe('chapter practice round', () => {
  it('asks every kind twice', () => {
    const round = buildRound(1);
    expect(round).toHaveLength(KINDS.length * 2);
    for (const k of KINDS) expect(round.filter((q) => q.kind === k)).toHaveLength(2);
  });

  it('marks the right option and offers distinct options, over many seeds', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const right = q.options[q.answer];
        const want =
          q.kind === 'unit'
            ? UNIT_ANSWERS[/** @type {keyof typeof UNIT_ANSWERS} */ (q.prompt)]
            : expected(q);
        if (right !== want) bad.push({ seed, prompt: q.prompt, right, want });
        if (new Set(q.options).size !== q.options.length || q.options.length < 2)
          bad.push({ seed, prompt: q.prompt, options: q.options });
        if (q.options.some((o) => /^-?\d+ cm$/.test(o) && Number.parseInt(o, 10) < 1))
          bad.push({ seed, prompt: q.prompt, options: q.options });
      }
    }
    expect(bad).toEqual([]);
  });

  it('puts the right answer in more than one place', () => {
    const spots = new Set();
    for (let seed = 1; seed <= 20; seed++) for (const q of buildRound(seed)) spots.add(q.answer);
    expect(spots.size).toBeGreaterThanOrEqual(3);
  });

  it('spreads sizes apart', () => {
    const sizes = spreadSizes(rng(4), 3, 3, 13, 2).sort((a, b) => a - b);
    expect(sizes[1] - sizes[0]).toBeGreaterThanOrEqual(2);
    expect(sizes[2] - sizes[1]).toBeGreaterThanOrEqual(2);
  });

  it('lists the kinds missed at the first try', () => {
    const round = buildRound(2);
    const firstTry = round.map((_, i) => i !== 0);
    expect(weakKinds(round, firstTry)).toHaveLength(1);
  });
});
