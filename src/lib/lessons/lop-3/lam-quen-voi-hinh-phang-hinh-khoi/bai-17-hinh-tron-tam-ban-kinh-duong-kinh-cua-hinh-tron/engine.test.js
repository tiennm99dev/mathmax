import { describe, expect, it } from 'vitest';
import { dist } from '#lib/geom-engine/plane.js';
import {
  CENTRE,
  CM,
  KIND_LABELS,
  MAX_RADIUS,
  buildRound,
  compassMessage,
  drawnArc,
  hingeOf,
  readRim,
  rimPoint,
} from './engine.js';

/** @typedef {ReturnType<typeof buildRound>[number]} Question */

/**
 * Names the segment drawn between two dots of the picture, by what it does.
 * @param {Question} q
 * @param {string} name such as 'OA'
 */
function roleOf(q, name) {
  const [c] = q.visual?.circles ?? [];
  if (!c) throw new Error('no circle');
  const at = (/** @type {string} */ n) => q.visual?.dots?.find((d) => d.name === n)?.at;
  const [p, r] = [at(name[0]), at(name[1])];
  if (!p || !r) throw new Error(`no segment ${name}`);
  const onRim = (/** @type {{ x: number, y: number }} */ t) => Math.abs(dist(t, c.c) - c.r) < 0.01;
  if (dist(p, c.c) < 0.01 || dist(r, c.c) < 0.01) return 'ban-kinh';
  if (onRim(p) && onRim(r) && Math.abs(dist(p, r) - 2 * c.r) < 0.01) return 'duong-kinh';
  return 'khac';
}

/**
 * Whether the stored answer is right, worked out again from the question.
 * @param {Question} q
 */
function isRight(q) {
  const right = String(q.options[q.answer]);
  const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
  switch (q.kind) {
    case 'tam': {
      const [c] = q.visual?.circles ?? [];
      const dot = q.visual?.dots?.find((d) => d.name === right);
      return Boolean(c && dot && dist(dot.at, c.c) < 0.01);
    }
    case 'ban-kinh':
    case 'duong-kinh':
      return roleOf(q, right) === q.kind;
    case 'tinh-duong-kinh':
      return Number(right) === nums[0] * 2;
    case 'tinh-ban-kinh':
      return Number(right) === nums[0] / 2;
    case 'bang-nhau':
      return Number(right) === nums[0];
    default:
      return Number(right) === nums[0] * 4;
  }
}

describe('the compass', () => {
  it('reads whole centimetres and turns in steps', () => {
    expect(readRim(rimPoint(3, 45))).toEqual({ radius: 3, deg: 45 });
    expect(readRim(rimPoint(5, 345))).toEqual({ radius: 5, deg: 345 });
    expect(readRim(CENTRE).radius).toBe(1);
    expect(readRim({ x: CENTRE.x + 9999, y: CENTRE.y }).radius).toBe(MAX_RADIUS);
  });

  it('keeps both legs the same length, with the hinge above them', () => {
    const bad = [];
    for (const radius of [1, 3, 5]) {
      for (const deg of [0, 90, 180, 270, 45, 200]) {
        const tip = rimPoint(radius, deg);
        const hinge = hingeOf(tip);
        if (Math.abs(dist(hinge, tip) - dist(hinge, CENTRE)) > 1e-6) bad.push([radius, deg]);
        if (hinge.y < 0 || hinge.x < 0) bad.push([radius, deg, 'off the board']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('draws nothing, then an arc, then the whole circle', () => {
    expect(drawnArc(2, 0, 0)).toBe('');
    expect(drawnArc(2, 0, 90)).toContain(`A ${2 * CM} ${2 * CM} 0 0 1`);
    expect(drawnArc(2, 0, 270)).toContain(`A ${2 * CM} ${2 * CM} 0 1 1`);
    expect(drawnArc(2, 0, 360).match(/A /g)).toHaveLength(2);
  });

  it('says the diameter is twice the radius', () => {
    expect(compassMessage(4, true, 0)).toContain('4 × 2 = 8');
    expect(compassMessage(4, false, 0)).not.toContain('Đường kính');
  });
});

describe('the round', () => {
  it('has right answers worked out again from each question', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        if (!isRight(q))
          bad.push(`${seed}: ${q.kind} ${q.prompt} -> ${String(q.options[q.answer])}`);
        if (new Set(q.options).size !== q.options.length) bad.push(`${seed}: repeats ${q.prompt}`);
        if (!(q.kind in KIND_LABELS)) bad.push(`${seed}: kind ${q.kind}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('offers segments that are not what the question asks for', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        if (q.kind !== 'ban-kinh' && q.kind !== 'duong-kinh') continue;
        const wrong = q.options.filter((_, i) => i !== q.answer);
        if (wrong.some((o) => roleOf(q, String(o)) === q.kind)) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
