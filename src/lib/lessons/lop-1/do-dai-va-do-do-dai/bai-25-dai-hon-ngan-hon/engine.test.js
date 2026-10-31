import { describe, it, expect } from 'vitest';
import { SPAN, answerOf, landStart, makeRound, questionOf, roundMessage } from './engine.js';

/** @type {import('../_shared/length.js').Dimension[]} */
const DIMS = ['length', 'height'];

describe('start-line rounds', () => {
  it('make the shorter one look longer until both are on the line, over many seeds', () => {
    const bad = [];
    for (const dim of DIMS) {
      for (let seed = 1; seed <= 80; seed++) {
        const r = makeRound(seed, dim);
        const [a, b] = r.sizes;
        const big = a > b ? 0 : 1;
        const small = 1 - big;
        const ends = r.starts.map((s, i) => s + r.sizes[i]);
        if (Math.abs(a - b) < 2) bad.push({ seed, dim, why: 'too close', sizes: r.sizes });
        if (ends[small] <= ends[big]) bad.push({ seed, dim, why: 'not misleading', r });
        if (Math.max(...ends) > SPAN[dim]) bad.push({ seed, dim, why: 'off the board', r });
        if (r.starts[small] === 0) bad.push({ seed, dim, why: 'already on the line', r });
        if (r.labels[0] === r.labels[1]) bad.push({ seed, dim, why: 'same thing', r });
      }
    }
    expect(bad).toEqual([]);
  });

  it('asks for the bigger or the smaller one', () => {
    const r = { ...makeRound(3, 'length'), sizes: /** @type {[number, number]} */ ([4, 9]) };
    expect(answerOf({ ...r, ask: 'more' })).toBe(1);
    expect(answerOf({ ...r, ask: 'less' })).toBe(0);
    expect(questionOf({ ...r, ask: 'more' })).toBe('Vật nào dài hơn?');
    const k = makeRound(3, 'height');
    expect(questionOf({ ...k, ask: 'less' })).toBe('Bạn nào thấp hơn?');
  });

  it('lands a drag on whole units inside the board', () => {
    expect(landStart(0.4, 5, 'length')).toBe(0);
    expect(landStart(-2, 5, 'length')).toBe(0);
    expect(landStart(3.6, 5, 'length')).toBe(4);
    expect(landStart(20, 5, 'length')).toBe(SPAN.length - 5);
  });

  it('judges an answer only once both are on the line', () => {
    const r = makeRound(5, 'height');
    const right = answerOf(r);
    expect(roundMessage(r, r.starts, right).tone).toBe('warn');
    expect(roundMessage(r, [0, 0], right).tone).toBe('ok');
    expect(roundMessage(r, [0, 0], 1 - right).tone).toBe('warn');
    expect(roundMessage(r, [0, 0], null).tone).toBe('info');
  });
});
