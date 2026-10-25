import { describe, expect, it } from 'vitest';
import { chapterStatus } from './chapter-status.js';

describe('chapterStatus', () => {
  it('is live only when every lesson is live', () => {
    expect(chapterStatus(5, 5)).toBe('live');
  });

  it('is partial when only some lessons are live', () => {
    expect(chapterStatus(1, 5)).toBe('partial');
    expect(chapterStatus(4, 5)).toBe('partial');
  });

  it('is a stub when no lesson is live', () => {
    expect(chapterStatus(0, 5)).toBe('stub');
    expect(chapterStatus(0, 0)).toBe('stub');
  });
});
