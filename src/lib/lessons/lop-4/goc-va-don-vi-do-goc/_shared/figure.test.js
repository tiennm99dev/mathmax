import { describe, expect, it } from 'vitest';
import { measure } from '#lib/core/visuals/angle-math.js';
import { angleFigure, fits, layoutFigure, pairFigure, protractorFigure } from './figure.js';

describe('angle figures', () => {
  it('keep every name inside the picture', () => {
    const bad = [];
    for (let m = 5; m <= 180; m += 5) {
      for (let turn = 0; turn < 360; turn += 15)
        if (!fits(layoutFigure(angleFigure(m, turn, ['O', 'A', 'B'])))) bad.push(['goc', m, turn]);
      for (const side of /** @type {const} */ (['phai', 'trai']))
        if (!fits(layoutFigure(protractorFigure(m, side, ['O', 'A', 'B']))))
          bad.push(['thuoc', m, side]);
    }
    for (let a = 20; a <= 90; a += 10)
      for (let b = 20; a + b <= 170; b += 10)
        if (!fits(layoutFigure(pairFigure(a, b)))) bad.push(['ghep', a, b]);
    expect(bad).toEqual([]);
  });

  it('marks the angle between the right rays', () => {
    const fig = protractorFigure(35, 'trai', ['O', 'A', 'B']);
    expect(fig.rays.map((r) => r.dir)).toEqual([180, 145]);
    expect(measure(fig.arcs[0].a, fig.arcs[0].b)).toBe(35);
    const pair = pairFigure(60, 90);
    expect(measure(pair.rays[0].dir, pair.rays[2].dir)).toBe(150);
  });

  it('keeps the measure out of the spoken label until it is given', () => {
    expect(angleFigure(120, 0, ['O', 'A', 'B']).label).not.toContain('120');
    expect(angleFigure(120, 0, ['O', 'A', 'B'], { showMeasure: true }).label).toContain('120 độ');
  });
});
