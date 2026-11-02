import { describe, expect, it } from 'vitest';
import { angleAt } from '#lib/geom-engine/plane.js';
import { COUNT_SHAPES, countRightAngles } from '../_shared/angle-questions.js';
import { rng } from '#lib/core/drill.js';
import {
  ANGLES,
  HEIGHT,
  KIND_LABELS,
  START,
  WIDTH,
  angleEnds,
  angleName,
  buildRound,
  checkMessage,
  isOnVertex,
  setSquare,
} from './engine.js';

/** @typedef {ReturnType<typeof buildRound>[number]} Question */

/** @param {{ x: number, y: number }} p */
const onBoard = (p) => p.x >= 0 && p.x <= WIDTH && p.y >= 0 && p.y <= HEIGHT;

/**
 * Measures the drawn angle of a question.
 * @param {Question} q
 */
function drawnDegrees(q) {
  const [first, second] = q.visual?.lines ?? [];
  return Math.round(angleAt(first.a, first.b, second.b));
}

/**
 * Whether the stored answer is right, worked out again from the picture.
 * @param {Question} q
 */
function isRight(q) {
  const right = String(q.options[q.answer]);
  const [first] = q.visual?.lines ?? [];
  switch (q.kind) {
    case 'dinh':
      return q.visual?.dots?.find((d) => d.name === right)?.at === first.a;
    case 'canh': {
      const vertex = q.visual?.dots?.find((d) => d.at === first.a)?.name ?? '';
      return right.split(' và ').every((side) => side.startsWith(vertex));
    }
    case 'vuong':
      return (right === 'Góc vuông') === (drawnDegrees(q) === 90);
    default: {
      const points = q.visual?.polygons?.[0]?.points ?? [];
      const n = points.length;
      const count = points.filter(
        (p, i) => Math.round(angleAt(p, points[(i + n - 1) % n], points[(i + 1) % n])) === 90,
      ).length;
      return Number(right) === count;
    }
  }
}

describe('the angles to check', () => {
  it('stay on the board, as does the set square lying on them', () => {
    const bad = [];
    for (const card of ANGLES) {
      const { p, q } = angleEnds(card);
      const square = setSquare(card, card.at);
      const waiting = setSquare(card, START);
      for (const point of [card.at, p, q, square.long, square.short, waiting.long, waiting.short]) {
        if (!onBoard(point)) bad.push(`${card.vertex}: ${point.x}, ${point.y}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('are drawn at their stated measure', () => {
    const bad = ANGLES.filter((card) => {
      const { p, q } = angleEnds(card);
      return Math.abs(angleAt(card.at, p, q) - card.deg) > 1e-6;
    });
    expect(bad).toEqual([]);
  });

  it('have both right angles and others', () => {
    expect(ANGLES.filter((a) => a.deg === 90).length).toBeGreaterThan(0);
    expect(ANGLES.filter((a) => a.deg !== 90).length).toBeGreaterThan(0);
  });

  it('reads an angle the way the book does', () => {
    expect(angleName(ANGLES[0])).toBe('Góc đỉnh A; cạnh AB, AC');
  });
});

describe('the set square', () => {
  const [right, narrow] = ANGLES;

  it('always has a right corner, on the vertex or off it', () => {
    const bad = [];
    for (const card of ANGLES) {
      for (const at of [card.at, START]) {
        const s = setSquare(card, at);
        if (Math.abs(angleAt(s.corner, s.long, s.short) - 90) > 1e-6) bad.push(card.vertex);
      }
    }
    expect(bad).toEqual([]);
  });

  it('snaps onto the vertex only when near it', () => {
    expect(isOnVertex(right, { x: right.at.x + 10, y: right.at.y + 10 })).toBe(true);
    expect(isOnVertex(right, START)).toBe(false);
    expect(setSquare(right, { x: right.at.x + 10, y: right.at.y }).corner).toEqual(right.at);
  });

  it('asks, then judges the answer against the real angle', () => {
    expect(checkMessage(right, false, null)).toContain('đỉnh A');
    expect(checkMessage(right, true, null)).toContain('AC');
    expect(checkMessage(right, true, true)).toContain('Đúng rồi');
    expect(checkMessage(right, true, false)).toContain('Chưa đúng');
    expect(checkMessage(narrow, true, false)).toContain('Đúng rồi');
    expect(checkMessage(narrow, true, true)).toContain('bên trong');
  });
});

describe('the round', () => {
  it('has right answers worked out again from each picture', () => {
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

  it('counts the right angles of every shape, from 0 to 4', () => {
    const counts = new Set(
      COUNT_SHAPES.map((shape) => {
        const q = countRightAngles(rng(1), shape);
        return q.options[q.answer];
      }),
    );
    expect([...counts].map(String).sort()).toEqual(['0', '1', '2', '3', '4']);
  });

  it('marks the right angles only when the question has ended', () => {
    const bad = buildRound(5)
      .filter((q) => q.kind === 'dem' && (q.visual?.corners ?? []).length > 0)
      .map((q) => q.prompt);
    expect(bad).toEqual([]);
  });
});
