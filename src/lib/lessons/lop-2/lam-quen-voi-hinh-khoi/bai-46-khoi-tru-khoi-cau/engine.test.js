import { describe, expect, it } from 'vitest';
import { cross3, dot3, sub3, viewPoint } from '#lib/geom-engine/solid.js';
import {
  CYLINDER_HEIGHT,
  CYLINDER_RADIUS,
  FIND_BINS,
  FIND_CARDS,
  MIN_PITCH,
  SPHERE_RADIUS,
  arrowView,
  cylinderFaces,
  cylinderLines,
  directionOf,
  dragView,
  drawSolid,
  foundOut,
  sphereFaces,
  viewNote,
} from './engine.js';

/** @param {{ x: number, y: number }} p */
const asIs = (p) => ({ x: p.x, y: p.y });

/** @param {import('./engine.js').PaintedFace[]} faces */
function inwardFaces(faces) {
  return faces
    .filter((f) => {
      const mean = f.pts.reduce((s, p) => ({ x: s.x + p.x, y: s.y + p.y, z: s.z + p.z }), {
        x: 0,
        y: 0,
        z: 0,
      });
      return dot3(cross3(sub3(f.pts[1], f.pts[0]), sub3(f.pts[2], f.pts[0])), mean) <= 0;
    })
    .map((f) => f.id);
}

describe('solid models', () => {
  it('lists every face counter-clockwise seen from outside', () => {
    expect(inwardFaces(cylinderFaces())).toEqual([]);
    expect(inwardFaces(sphereFaces())).toEqual([]);
  });

  it('keeps the ball on its radius and the cylinder between its two ends', () => {
    const off = sphereFaces()
      .flatMap((f) => f.pts)
      .filter((p) => Math.abs(Math.sqrt(dot3(p, p)) - SPHERE_RADIUS) > 1e-6);
    expect(off).toEqual([]);
    const zs = cylinderFaces().flatMap((f) => f.pts.map((p) => Math.abs(p.z)));
    expect(new Set(zs)).toEqual(new Set([CYLINDER_HEIGHT / 2]));
    const rs = cylinderFaces().flatMap((f) => f.pts.map((p) => Math.hypot(p.x, p.y)));
    expect(Math.max(...rs)).toBeCloseTo(CYLINDER_RADIUS);
  });

  it('shows no round face side on, the top from above and the bottom from below', () => {
    const shown = (/** @type {number} */ pitch) =>
      drawSolid('tru', { yaw: 20, pitch }, asIs)
        .polys.filter((p) => p.kind !== 'side')
        .map((p) => p.kind);
    expect(shown(0)).toEqual([]);
    expect(shown(40)).toEqual(['top']);
    expect(shown(-40)).toEqual(['bottom']);
  });

  it('shows the same outline of a ball from every direction', () => {
    const faults = [];
    for (const pitch of [-80, -30, 0, 30, 80]) {
      for (const yaw of [-170, -40, 0, 75]) {
        const { polys, lines } = drawSolid('cau', { yaw, pitch }, asIs);
        const far = polys
          .flatMap((p) => p.points.split(' ').map((s) => s.split(',').map(Number)))
          .some(([x, y]) => Math.hypot(x, y) > SPHERE_RADIUS + 0.2);
        if (far || lines.length) faults.push({ yaw, pitch });
      }
    }
    expect(faults).toEqual([]);
  });

  it('outlines a side-on cylinder with two side lines', () => {
    const lines = cylinderLines({ yaw: 15, pitch: 20 });
    const upright = lines.filter(([a, b]) => a.z !== b.z);
    expect(upright).toHaveLength(2);
  });
});

describe('turning the view', () => {
  const NEAR = { x: 0, y: -1, z: 0 };
  const START = { yaw: 0, pitch: 20 };
  /** @param {{ yaw: number, pitch: number }} view */
  const nearX = (view) => viewPoint(NEAR, view).x;

  it('moves the near side the way the pointer drags', () => {
    expect(nearX(dragView(START, 30, 0))).toBeGreaterThan(0);
    expect(nearX(dragView(START, -30, 0))).toBeLessThan(0);
  });

  it('moves the near side the way the left and right arrows point', () => {
    const left = arrowView(START, 'ArrowLeft');
    const right = arrowView(START, 'ArrowRight');
    expect(left && nearX(left)).toBeLessThan(0);
    expect(right && nearX(right)).toBeGreaterThan(0);
  });

  it('tilts towards the top with the up arrow and a downward drag', () => {
    expect(arrowView(START, 'ArrowUp')?.pitch).toBe(30);
    expect(arrowView(START, 'ArrowDown')?.pitch).toBe(10);
    expect(dragView(START, 0, 10).pitch).toBe(26);
  });

  it('keeps the tilt in range so the bottom can be seen and ignores other keys', () => {
    expect(dragView(START, 0, -1000).pitch).toBe(MIN_PITCH);
    expect(dragView(START, 0, 1000).pitch).toBe(80);
    expect(arrowView(START, 'Enter')).toBeNull();
  });
});

describe('what the child sees', () => {
  it('names the direction of a view', () => {
    const at = (/** @type {number} */ pitch) => directionOf({ yaw: 0, pitch });
    expect([at(0), at(12), at(13), at(54), at(55), at(-12), at(-54), at(-55)]).toEqual([
      'ngang',
      'ngang',
      null,
      null,
      'tren',
      'ngang',
      null,
      'duoi',
    ]);
  });

  it('describes the views and what was found', () => {
    expect(viewNote('tru', { yaw: 0, pitch: 70 })).toContain('mặt tròn');
    expect(viewNote('tru', { yaw: 0, pitch: -70 })).toContain('ở dưới');
    expect(viewNote('tru', { yaw: 0, pitch: 30 })).toContain('ở trên');
    expect(viewNote('tru', { yaw: 0, pitch: -30 })).toContain('ở dưới');
    expect(viewNote('cau', { yaw: 0, pitch: 30 })).toContain('tròn đều');
    expect(foundOut('tru')).toContain('hai mặt tròn');
    expect(foundOut('cau')).toContain('chỉ có mặt cong');
  });
});

describe('find-the-object game', () => {
  it('puts every card in a bin of the game and has several of each', () => {
    const bins = FIND_BINS.map((b) => b.id);
    expect(FIND_CARDS.filter((c) => !bins.includes(c.bin))).toEqual([]);
    expect(FIND_CARDS.filter((c) => c.bin === 'tru')).toHaveLength(4);
    expect(FIND_CARDS.filter((c) => c.bin === 'cau')).toHaveLength(4);
    expect(FIND_CARDS.filter((c) => c.bin === 'khac')).toHaveLength(2);
  });

  it('gives a sentence for each card', () => {
    const can = FIND_CARDS.find((c) => c.id === 'lon-nuoc');
    expect(can?.why).toBe('Lon nước ngọt có dạng khối trụ.');
  });
});
