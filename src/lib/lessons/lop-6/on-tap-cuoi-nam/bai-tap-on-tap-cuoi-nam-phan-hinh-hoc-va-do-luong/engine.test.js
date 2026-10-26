import { describe, it, expect } from 'vitest';
import {
  COLS,
  ROWS,
  TASKS,
  allPoints,
  angleFromOx,
  onSegment,
  rectangleCorners,
  snapPoint,
} from './engine.js';

/** Every placement of the task's movable points on the board that it accepts. */
function solutions(/** @type {import('./engine.js').Task} */ task) {
  const names = Object.keys(task.start);
  /** @type {import('./engine.js').Pts[]} */
  let placements = [{}];
  for (const n of names) {
    const next = [];
    for (const p of placements)
      for (let x = 0; x <= COLS; x++)
        for (let y = 0; y <= ROWS; y++) next.push({ ...p, [n]: { x, y } });
    placements = next;
  }
  return placements.filter((m) => task.check(allPoints(task, m)).ok);
}

/** @param {string} id */
const task = (id) => /** @type {import('./engine.js').Task} */ (TASKS.find((t) => t.id === id));

describe('construction tasks', () => {
  it('start unsolved and have at least one solution on the board', () => {
    for (const t of TASKS) {
      expect(t.check(allPoints(t, t.start)).ok, t.id).toBe(false);
      expect(solutions(t).length, t.id).toBeGreaterThan(0);
    }
  });

  it('accept exactly the right constructions', () => {
    expect(solutions(task('trung-diem'))).toEqual([{ M: { x: 5, y: 3 } }]);
    expect(solutions(task('binh-hanh'))).toEqual([{ D: { x: 3, y: 4 } }]);
    expect(solutions(task('thang-can'))).toEqual([{ D: { x: 3, y: 4 } }]);
    expect(solutions(task('truc-doi-xung'))).toEqual([{ D: { x: 8, y: 4 } }]);
    expect(solutions(task('tam-doi-xung'))).toEqual([{ C: { x: 8, y: 5 }, D: { x: 4, y: 5 } }]);
    expect(solutions(task('goc'))).toEqual([{ A: { x: 0, y: 4 } }, { A: { x: 1, y: 3 } }]);
    expect(solutions(task('chu-nhat'))).toEqual([{ C: { x: 4, y: 5 } }, { C: { x: 5, y: 4 } }]);
    // C beyond B on line AB through (1, 2) and (4, 3).
    expect(solutions(task('thang-hang'))).toEqual([{ C: { x: 7, y: 4 } }, { C: { x: 10, y: 5 } }]);
  });

  it('says what is wrong', () => {
    const mid = task('trung-diem');
    expect(mid.check(allPoints(mid, { M: { x: 9, y: 5 } })).msg).toContain('chưa bằng nhau');
    const line = task('thang-hang');
    expect(line.check(allPoints(line, { C: { x: 7, y: 4 } })).ok).toBe(true);
    expect(line.check(allPoints(line, { C: { x: 10, y: 4 } })).msg).toContain('chưa thẳng hàng');
    const rect = task('chu-nhat');
    expect(rect.check(allPoints(rect, { C: { x: 7, y: 3 } })).msg).toContain('Diện tích đã đúng');
    expect(rect.readout?.(allPoints(rect, { C: { x: 4, y: 5 } }))).toContain('= 14 cm');
  });
});

describe('helpers', () => {
  it('measure angles from Ox and segments', () => {
    expect(angleFromOx({ x: 0, y: 0 }, { x: -1, y: 1 })).toBeCloseTo(135, 9);
    expect(angleFromOx({ x: 0, y: 0 }, { x: 0, y: -1 })).toBeCloseTo(270, 9);
    expect(onSegment({ x: 2, y: 2 }, { x: 0, y: 0 }, { x: 4, y: 4 })).toBe(true);
    expect(onSegment({ x: 5, y: 5 }, { x: 0, y: 0 }, { x: 4, y: 4 })).toBe(false);
  });

  it('snap to the grid inside the board', () => {
    expect(snapPoint(3.4, 7.8)).toEqual({ x: 3, y: ROWS });
    expect(snapPoint(-2, 2.6)).toEqual({ x: 0, y: 3 });
    expect(rectangleCorners({ x: 1, y: 1 }, { x: 4, y: 5 })).toEqual([
      { x: 1, y: 1 },
      { x: 4, y: 1 },
      { x: 4, y: 5 },
      { x: 1, y: 5 },
    ]);
  });
});
