import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  EDGES,
  FACES,
  SOLID_DIMS,
  START_VIEW,
  corners,
  edgeId,
  faceFill,
  projectBox,
} from './box.js';
import {
  antOnFrame,
  countSolidPart,
  faceShape,
  nameSolid,
  paintEdges,
  paperLantern,
  thingSolid,
  vertexFlowers,
} from './solid-questions.js';

const KINDS = /** @type {const} */ (['lap-phuong', 'hop-chu-nhat']);
const VIEWS = [
  START_VIEW,
  { yaw: 60, pitch: 40 },
  { yaw: 150, pitch: -38 },
  { yaw: -100, pitch: 80 },
];

/** @type {Record<string, (rand: () => number) => import('./solid-questions.js').SceneQuestion>} */
const MAKERS = {
  antOnFrame,
  countSolidPart,
  faceShape,
  nameSolid,
  paintEdges,
  paperLantern,
  thingSolid,
  vertexFlowers,
};

describe('the parts of a box', () => {
  it('has 8 vertices, 12 edges and 6 faces', () => {
    expect(corners(SOLID_DIMS['lap-phuong'])).toHaveLength(8);
    expect(EDGES).toHaveLength(12);
    expect(FACES).toHaveLength(6);
  });

  it('meets three edges at each vertex and four corners on each face', () => {
    for (let i = 0; i < 8; i++) {
      expect(EDGES.filter(([p, q]) => p === i || q === i)).toHaveLength(3);
    }
    for (const face of FACES) expect(new Set(face.corners).size).toBe(4);
  });

  it('walks each face round its own edges', () => {
    const ids = new Set(EDGES.map(([i, j]) => edgeId(i, j)));
    const onFaces = FACES.flatMap((f) =>
      f.corners.map((c, k) => edgeId(c, f.corners[(k + 1) % 4])),
    );
    expect(onFaces.every((id) => ids.has(id))).toBe(true);
    expect(new Set(onFaces).size).toBe(12);
  });

  it('gives the cube square faces and the box faces that are not', () => {
    const sides = (/** @type {import('./box.js').Dims} */ d) => [d.a, d.b, d.c];
    expect(new Set(sides(SOLID_DIMS['lap-phuong'])).size).toBe(1);
    expect(new Set(sides(SOLID_DIMS['hop-chu-nhat'])).size).toBe(3);
  });
});

describe('a view of the box', () => {
  it('shows three faces, seven vertices and nine edges in front from a corner view', () => {
    const bad = [];
    for (const kind of KINDS) {
      for (const view of VIEWS) {
        const { faces, vertices, edges } = projectBox(SOLID_DIMS[kind], view, 320, 300);
        const counts = [
          faces.filter((f) => f.front).length,
          vertices.filter((v) => v.front).length,
          edges.filter((e) => e.front).length,
        ].join();
        if (counts !== '3,7,9') bad.push(`${kind} ${view.yaw}/${view.pitch}: ${counts}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('shows opposite faces one at a time', () => {
    const { faces } = projectBox(SOLID_DIMS['hop-chu-nhat'], START_VIEW, 320, 300);
    const front = (/** @type {string} */ id) => faces.find((f) => f.id === id)?.front;
    expect(front('tren')).toBe(true);
    expect(front('duoi')).toBe(false);
    expect(front('truoc')).toBe(true);
    expect(front('sau')).toBe(false);
  });

  it('stays on the card whatever the turn', () => {
    const bad = [];
    for (const kind of KINDS) {
      for (let yaw = -180; yaw < 180; yaw += 30) {
        for (const pitch of [-45, -8, 22, 80]) {
          const { vertices } = projectBox(SOLID_DIMS[kind], { yaw, pitch }, 320, 300);
          for (const { at } of vertices) {
            if (at.x < 20 || at.x > 300 || at.y < 20 || at.y > 280)
              bad.push(`${kind} ${yaw} ${pitch}`);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('questions on the solids', () => {
  it('keep every name on the card and have one right option among distinct ones', () => {
    const bad = [];
    for (const [name, make] of Object.entries(MAKERS)) {
      for (let seed = 1; seed <= 40; seed++) {
        const q = make(rng(seed));
        const scene = q.visual;
        if (!scene) {
          bad.push(`${name}: no picture`);
          continue;
        }
        for (const dot of scene.dots ?? []) {
          const s = dot.nameAt ?? dot.at;
          if (s.x < 10 || s.y < 10 || s.x > scene.w - 10 || s.y > scene.h - 10) {
            bad.push(`${name} seed ${seed}: ${s.x.toFixed(0)}, ${s.y.toFixed(0)}`);
          }
        }
        if (q.answer < 0 || q.answer >= q.options.length) bad.push(`${name}: answer ${q.answer}`);
        if (new Set(q.options).size !== q.options.length) bad.push(`${name}: repeated options`);
        if (q.hint === q.solution) bad.push(`${name}: hint is the solution`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('work the answers out from the prompt', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const nums = (/** @type {string} */ t) => (t.match(/\d+/g) ?? []).map(Number);
      const lantern = paperLantern(rng(seed));
      if (Number(lantern.options[lantern.answer]) !== 6 * nums(lantern.prompt)[1])
        bad.push('lantern');
      const flowers = vertexFlowers(rng(seed));
      if (Number(flowers.options[flowers.answer]) !== 8 * nums(flowers.prompt)[0])
        bad.push('flowers');
      const paint = paintEdges(rng(seed));
      if (Number(paint.options[paint.answer]) !== 12 - nums(paint.prompt)[0]) bad.push('paint');
      const part = countSolidPart(rng(seed));
      const want = part.prompt.includes('đỉnh') ? 8 : part.prompt.includes('cạnh') ? 12 : 6;
      if (Number(part.options[part.answer]) !== want) bad.push('part');
      const named = nameSolid(rng(seed));
      const isCube = named.visual?.polygons?.some((p) => p.color === faceFill('lap-phuong', 0));
      if (named.options[named.answer] !== (isCube ? 'Khối lập phương' : 'Khối hộp chữ nhật'))
        bad.push('name');
    }
    expect(bad).toEqual([]);
  });

  it('never state how many edges the ant walks while the question is open', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const q = antOnFrame(rng(seed));
      const n = Number(q.options[q.answer]);
      const red = (q.visual?.lines ?? []).filter((l) => l.color === '#dc2626');
      if (red.length !== n) bad.push(`seed ${seed}: ${red.length} red for ${n}`);
      if (/\d/.test(q.visual?.label ?? '')) bad.push(`seed ${seed}: number in the label`);
      if ((q.visual?.label ?? '').split('một cạnh').length - 1 !== n)
        bad.push(`seed ${seed}: label`);
    }
    expect(bad).toEqual([]);
  });
});
