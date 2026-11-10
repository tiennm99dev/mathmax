/**
 * Still angle pictures for the chapter's questions: one vertex, its rays with
 * names, the angles marked by arcs and, when asked for, a protractor laid on
 * the angle with its centre at the vertex. `layoutFigure` turns a figure into
 * SVG points that `angle-figure.svelte` draws. Pure and DOM-free.
 *
 * @typedef {import('./angle.js').Side} Side
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {{ dir: number, name: string }} Ray
 * @typedef {object} Arc an angle between two rays
 * @property {number} a direction of one side
 * @property {number} b direction of the other side
 * @property {string} [text] its measure, written beside the arc
 * @property {boolean} [late] keep the text and the right-angle mark back
 *   until the question has ended
 * @typedef {object} Figure
 * @property {string} vertex
 * @property {Ray[]} rays
 * @property {Arc[]} arcs
 * @property {Side} [protractor] lay a protractor with its base along the side
 *   pointing right or left
 * @property {string} label what a screen reader hears
 */

import { along, dirOf, measure } from '#lib/core/visuals/angle-math.js';
import { angleName, protractorText, rayDirection } from './angle.js';

export const FIGURE_W = 320;
export const FIGURE_H = 224;
/** Radius of the protractor in a figure. */
export const PROTRACTOR_R = 134;
/** Width of a figure that holds a protractor. */
export const PROTRACTOR_W = 360;

const RAY = 82;
const NAME_GAP = 16;
const PAD = 8;
const ARC = 26;

/**
 * Where the drawing goes: the vertex, the length of the rays and where each
 * name sits.
 * @param {Figure} fig
 */
export function layoutFigure(fig) {
  const len = fig.protractor ? PROTRACTOR_R + 18 : RAY;
  const w = fig.protractor ? PROTRACTOR_W : FIGURE_W;
  const gap = fig.protractor ? 10 : NAME_GAP;
  const away = vertexNameDir(fig);
  /** @type {Pt} */
  let o;
  if (fig.protractor) {
    o = { x: w / 2, y: FIGURE_H - 30 };
  } else {
    const origin = { x: 0, y: 0 };
    const spots = [
      origin,
      along(origin, 22, away),
      ...fig.rays.map((r) => along(origin, len + NAME_GAP, r.dir)),
    ];
    const xs = spots.map((s) => s.x);
    const ys = spots.map((s) => s.y);
    o = {
      x: FIGURE_W / 2 - (Math.min(...xs) + Math.max(...xs)) / 2,
      y: FIGURE_H / 2 - (Math.min(...ys) + Math.max(...ys)) / 2,
    };
  }
  return {
    w,
    h: FIGURE_H,
    o,
    vertexName: along(o, 22, away),
    rays: fig.rays.map((r) => ({
      ...r,
      tip: along(o, len, r.dir),
      at: along(o, len + gap, r.dir),
    })),
    arcs: fig.arcs.map((arc) => ({ ...arc, r: ARC, at: along(o, ARC + 18, middle(arc.a, arc.b)) })),
  };
}

/**
 * Whether every point of a layout stays inside the figure, with a margin.
 * @param {ReturnType<typeof layoutFigure>} lay
 */
export function fits(lay) {
  const pts = [lay.o, lay.vertexName, ...lay.rays.map((r) => r.at)];
  return pts.every((p) => p.x >= PAD && p.x <= lay.w - PAD && p.y >= PAD && p.y <= lay.h - PAD);
}

/**
 * Direction halfway inside the angle from `a` to `b` (the smaller turn).
 * @param {number} a @param {number} b
 */
function middle(a, b) {
  const m = measure(a, b);
  const ccw = (((b - a) % 360) + 360) % 360;
  return ccw === m ? a + m / 2 : b + m / 2;
}

/**
 * Where the vertex name goes: away from all the rays.
 * @param {Figure} fig
 */
function vertexNameDir(fig) {
  const sum = fig.rays.reduce(
    (s, r) => {
      const u = dirOf(r.dir);
      return { x: s.x + u.x, y: s.y - u.y };
    },
    { x: 0, y: 0 },
  );
  if (Math.hypot(sum.x, sum.y) < 0.3) return fig.rays[0].dir + 270;
  return (Math.atan2(sum.y, sum.x) * 180) / Math.PI + 180;
}

/**
 * An angle of measure `m` laid on a protractor, the side OA along the base
 * on the right or the left.
 * @param {number} m
 * @param {Side} side
 * @param {readonly [string, string, string]} names
 * @returns {Figure}
 */
export function protractorFigure(m, side, names) {
  const [o, p, q] = names;
  const a = side === 'phai' ? 0 : 180;
  const b = rayDirection(m, side);
  return {
    vertex: o,
    rays: [
      { dir: a, name: p },
      { dir: b, name: q },
    ],
    arcs: [{ a, b, text: `${m}°`, late: true }],
    protractor: side,
    label: protractorText(m, side, names),
  };
}

/**
 * A plain angle of measure `m`, its first side in direction `turn`.
 * @param {number} m
 * @param {number} turn
 * @param {readonly [string, string, string]} names
 * @param {{ showMeasure?: boolean }} [opts] write the measure from the start
 * @returns {Figure}
 */
export function angleFigure(m, turn, names, opts = {}) {
  const [o, p, q] = names;
  const show = opts.showMeasure ?? false;
  return {
    vertex: o,
    rays: [
      { dir: turn, name: p },
      { dir: turn + m, name: q },
    ],
    arcs: [{ a: turn, b: turn + m, text: `${m}°`, late: !show }],
    label: show
      ? `Hình vẽ ${angleName(o, p, q)}, số đo ${m} độ.`
      : `Hình vẽ ${angleName(o, p, q)}.`,
  };
}

/**
 * Two angles side by side with a shared side ON: MON of measure `a` and NOP
 * of measure `b`, so that MOP measures a + b.
 * @param {number} a
 * @param {number} b
 * @returns {Figure}
 */
export function pairFigure(a, b) {
  const start = (180 - a - b) / 2;
  return {
    vertex: 'O',
    rays: [
      { dir: start, name: 'M' },
      { dir: start + a, name: 'N' },
      { dir: start + a + b, name: 'P' },
    ],
    arcs: [
      { a: start, b: start + a, text: `${a}°` },
      { a: start + a, b: start + a + b, text: `${b}°` },
    ],
    label: `Hình vẽ góc đỉnh O; cạnh OM, ON có số đo ${a} độ và góc đỉnh O; cạnh ON, OP có số đo ${b} độ. Hai góc chung cạnh ON.`,
  };
}
