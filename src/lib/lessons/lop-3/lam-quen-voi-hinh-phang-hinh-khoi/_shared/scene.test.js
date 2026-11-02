import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { countRightAngles, findSides, findVertex, isRightAngle } from './angle-questions.js';
import {
  diameterFrom,
  findCentre,
  findSegment,
  otherRadius,
  radiusFrom,
  twoCircles,
} from './circle-questions.js';
import { cornerMarks, isRightAt, rightCorners } from './scene.js';
import {
  doubleOf,
  findMidpoint,
  halfOf,
  hopsToMiddle,
  isBetween,
  isMidpoint,
} from './segment-questions.js';
import { countParts, nameShape, notASide, rectangleSide, squareSide } from './shape-questions.js';

/** @type {Record<string, (rand: () => number) => import('./segment-questions.js').SceneQuestion>} */
const MAKERS = {
  isMidpointYes: (r) => isMidpoint(r, true),
  isMidpointNo: (r) => isMidpoint(r, false),
  findMidpoint,
  isBetweenOn: (r) => isBetween(r, 'giua'),
  isBetweenOff: (r) => isBetween(r, 'lech'),
  isBetweenOut: (r) => isBetween(r, 'ngoai'),
  halfOf,
  doubleOf,
  hopsToMiddle,
  findCentre,
  findRadius: (r) => findSegment(r, 'ban-kinh'),
  findDiameter: (r) => findSegment(r, 'duong-kinh'),
  diameterFrom,
  radiusFrom,
  otherRadius,
  twoCircles,
  isRightAngleYes: (r) => isRightAngle(r, true),
  isRightAngleNo: (r) => isRightAngle(r, false),
  findVertex,
  findSides,
  countRightAngles: (r) => countRightAngles(r),
  nameShape: (r) => nameShape(r),
  countParts,
  notASide,
  rectangleSide,
  squareSide,
};

describe('question pictures', () => {
  it('keep every point and every name on the card', () => {
    const bad = [];
    for (const [name, make] of Object.entries(MAKERS)) {
      for (let seed = 1; seed <= 40; seed++) {
        const q = make(rng(seed));
        const scene = q.visual;
        if (!scene) {
          bad.push(`${name}: no picture`);
          continue;
        }
        const spots = [
          ...(scene.dots ?? []).flatMap((d) => (d.nameAt ? [d.at, d.nameAt] : [d.at])),
          ...(scene.texts ?? []),
        ];
        for (const s of spots) {
          if (s.x < 10 || s.y < 10 || s.x > scene.w - 10 || s.y > scene.h - 10) {
            bad.push(`${name} seed ${seed}: ${s.x.toFixed(0)}, ${s.y.toFixed(0)}`);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('have one right option among distinct ones, with a hint that is not the solution', () => {
    const bad = [];
    for (const [name, make] of Object.entries(MAKERS)) {
      for (let seed = 1; seed <= 40; seed++) {
        const q = make(rng(seed));
        if (q.answer < 0 || q.answer >= q.options.length) bad.push(`${name}: answer ${q.answer}`);
        if (new Set(q.options).size !== q.options.length) bad.push(`${name}: repeated options`);
        if (q.hint === q.solution) bad.push(`${name}: hint is the solution`);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('right corners', () => {
  const square = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 2 },
    { x: 0, y: 2 },
  ];

  it('finds them exactly on whole-number points', () => {
    expect(isRightAt({ x: 0, y: 0 }, { x: 3, y: 1 }, { x: -1, y: 3 })).toBe(true);
    expect(isRightAt({ x: 0, y: 0 }, { x: 3, y: 1 }, { x: 0, y: 3 })).toBe(false);
    expect(rightCorners(square)).toEqual([0, 1, 2, 3]);
    expect(cornerMarks(square)).toHaveLength(4);
  });
});
