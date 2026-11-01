import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { areCollinear } from '../_shared/figures.js';
import { KINDS, KIND_LABELS, buildRound } from './engine.js';

/** @param {import('./engine.js').Question} q */
function numbers(q) {
  return (q.prompt.match(/\d+/g) ?? []).map(Number);
}

/**
 * The name list of a figure's segments, each written as in the options.
 * @param {import('./engine.js').Question} q
 */
function segmentNames(q) {
  return (q.visual?.segments ?? []).map((s) => s.join('')).join(', ');
}

/**
 * The three dots of a figure that lie on one line.
 * @param {import('./engine.js').Question} q
 */
function collinearTriple(q) {
  const dots = q.visual?.dots ?? [];
  for (let skip = 0; skip < dots.length; skip++) {
    const [a, b, c] = dots.filter((_, i) => i !== skip);
    if (areCollinear(a, b, c)) {
      return [a, b, c]
        .map((d) => d.name)
        .sort()
        .join(', ');
    }
  }
  return '';
}

/**
 * The right option worked out again from the prompt and the picture alone.
 * @param {import('./engine.js').Question} q
 * @returns {string}
 */
function recompute(q) {
  const v = q.visual;
  const nums = numbers(q);
  switch (q.kind) {
    case 'doan-thang':
      return q.prompt.includes('mấy') ? String(v?.segments?.length) : segmentNames(q);
    case 'duong':
      if (q.prompt.includes('mấy')) return String(v?.curves?.length);
      if (v?.curves?.length) return 'Đường cong';
      return v?.lines?.length ? 'Đường thẳng' : 'Đoạn thẳng';
    case 'thang-hang': {
      const triple = collinearTriple(q);
      if (q.prompt === 'Ba điểm nào thẳng hàng?') return triple;
      return q.prompt.includes(triple) ? 'Đúng' : 'Sai';
    }
    case 'gap-khuc': {
      const lengths = (v?.texts ?? []).map((t) => parseInt(t.text, 10));
      if (q.prompt.includes('mấy')) return String(lengths.length);
      return `${lengths.reduce((s, x) => s + x, 0)} cm`;
    }
    case 'tu-giac': {
      const shapes = v?.shapes ?? [];
      if (v?.strokes?.length) {
        const [[p, q2]] = v.strokes;
        const diagonal =
          (p.x === shapes[0][0].x && p.y === shapes[0][0].y) ||
          (q2.x === shapes[0][2].x && q2.y === shapes[0][2].y);
        return diagonal ? '1' : '3';
      }
      return String(shapes.filter((s) => s.length === 4).length);
    }
    case 'bai-toan':
      if (q.prompt.includes('Con nào')) {
        return nums[0] + nums[1] > nums[2] + nums[3] ? 'Kiến' : 'Ốc sên';
      }
      if (q.prompt.includes('Sợi dây')) return `${nums[1] * nums[0]} cm`;
      return `${nums[0] + nums[1] + nums[2]} cm`;
    default:
      return '';
  }
}

describe('the mixed practice round', () => {
  it('asks each kind twice and every answer checks out', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const round = buildRound(seed);
      if (round.length !== 2 * KINDS.length) bad.push([seed, 'length']);
      for (const k of KINDS) {
        if (round.filter((q) => q.kind === k).length !== 2) bad.push([seed, 'kind', k]);
      }
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (texts[q.answer] !== recompute(q)) bad.push([seed, q.prompt, texts[q.answer]]);
        if (new Set(texts).size !== texts.length) bad.push([seed, 'options', q.prompt]);
        if (q.hint.includes(texts[q.answer])) bad.push([seed, 'hint', q.hint]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('draws four points with exactly one collinear three', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      for (const q of buildRound(seed)) {
        if (q.kind !== 'thang-hang') continue;
        const dots = q.visual?.dots ?? [];
        let triples = 0;
        for (let skip = 0; skip < dots.length; skip++) {
          const [a, b, c] = dots.filter((_, i) => i !== skip);
          if (areCollinear(a, b, c)) triples++;
        }
        if (dots.length !== 4 || triples !== 1) bad.push([seed, q.prompt]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps every drawing inside its frame and names each kind', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const v = q.visual;
        if (!v) continue;
        const pts = [...(v.dots ?? []), ...(v.shapes ?? []).flat(), ...(v.strokes ?? []).flat()];
        for (const p of pts) {
          if (p.x < 0 || p.x > v.w || p.y < 0 || p.y > v.h) bad.push([seed, q.prompt, p]);
        }
      }
    }
    expect(bad).toEqual([]);
    expect(Object.keys(KIND_LABELS)).toEqual([...KINDS]);
  });
});
