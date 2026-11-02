import { describe, expect, it } from 'vitest';
import {
  TARGETS,
  WHOLE,
  foundText,
  hop,
  lineOf,
  roundKind,
  targetNote,
  zoomIn,
  zoomOut,
} from './engine.js';

describe('zooming the number line', () => {
  it('shows round hundreds on the whole line and round tens when zoomed', () => {
    expect(lineOf(WHOLE)).toEqual({ min: 0, max: 1000, step: 100 });
    expect(lineOf(zoomIn({ start: null, value: 400 }))).toEqual({ min: 400, max: 500, step: 10 });
  });

  it('opens the last hundred from 1000 and keeps the marker on the line', () => {
    const view = zoomIn({ start: null, value: 1000 });
    expect(view).toEqual({ start: 900, value: 1000 });
  });

  it('falls back to the round hundred when zooming out', () => {
    expect(zoomOut({ start: 400, value: 460 })).toEqual({ start: null, value: 400 });
    expect(zoomOut({ start: 400, value: 500 })).toEqual({ start: null, value: 500 });
  });

  it('hops one mark and stops at the ends', () => {
    expect(hop({ start: null, value: 300 }, 1).value).toBe(400);
    expect(hop({ start: 400, value: 420 }, -1).value).toBe(410);
    expect(hop({ start: 400, value: 500 }, 1).value).toBe(500);
    expect(hop({ start: null, value: 0 }, -1).value).toBe(0);
  });
});

describe('round numbers', () => {
  it('tells round hundreds from round tens', () => {
    expect(roundKind(1000)).toBe('tram');
    expect(roundKind(700)).toBe('tram');
    expect(roundKind(850)).toBe('chuc');
    expect(roundKind(205)).toBe('khac');
  });

  it('says why a found number is round', () => {
    expect(foundText(300)).toContain('ba trăm');
    expect(foundText(300)).toContain('số tròn trăm');
    expect(foundText(420)).toContain('bốn trăm hai mươi');
    expect(foundText(420)).toContain('số tròn chục');
  });
});

describe('leading the child to the target', () => {
  it('asks for a zoom when the target is between two round hundreds', () => {
    const note = targetNote({ start: null, value: 100 }, 420);
    expect(note.text).toContain('giữa 400 và 500');
    expect(note.text).toContain('Phóng to');
  });

  it('asks to zoom out from the wrong hundred', () => {
    expect(targetNote({ start: 300, value: 350 }, 420).text).toContain('Thu nhỏ');
  });

  it('points the way along the line', () => {
    expect(targetNote({ start: 400, value: 410 }, 420).text).toContain('sang phải');
    expect(targetNote({ start: null, value: 900 }, 300).text).toContain('sang trái');
  });

  it('can reach every target from the start by hops and zooms', () => {
    const stuck = TARGETS.filter((target) => {
      let view = WHOLE;
      const below = roundKind(target) === 'tram' ? target : Math.floor(target / 100) * 100;
      while (view.value < below) view = hop(view, 1);
      if (roundKind(target) !== 'tram') view = zoomIn(view);
      while (view.value < target) view = hop(view, 1);
      return targetNote(view, target).tone !== 'ok';
    });
    expect(stuck).toEqual([]);
  });
});
