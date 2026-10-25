import { describe, expect, it } from 'vitest';
import { MIN_HIT, hitDistance } from './draggable.svelte.js';

describe('hitDistance', () => {
  // A 16 px knob centred on (100, 100), as a 12-unit handle renders at 390 px.
  const knob = { left: 92, top: 92, width: 16, height: 16 };

  it('grows a small handle to a MIN_HIT box around its centre', () => {
    expect(MIN_HIT).toBe(44);
    expect(hitDistance(knob, 100, 100)).toBe(0);
    expect(hitDistance(knob, 121, 100)).toBe(21);
    expect(hitDistance(knob, 100, 78)).toBe(22);
  });

  it('misses outside the hit box', () => {
    expect(hitDistance(knob, 123, 100)).toBe(-1);
    expect(hitDistance(knob, 100, 123)).toBe(-1);
  });

  it('keeps a handle that is already larger at its own size', () => {
    const bar = { left: 0, top: 96, width: 120, height: 8 };
    expect(hitDistance(bar, 5, 100)).toBe(55);
    expect(hitDistance(bar, 125, 100)).toBe(-1);
    expect(hitDistance(bar, 60, 121)).toBe(21);
  });
});
