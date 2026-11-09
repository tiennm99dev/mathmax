import { describe, it, expect } from 'vitest';
import { calloutLabel } from './copy.vi.js';

describe('calloutLabel', () => {
  it('keeps the book word from grade 6 up', () => {
    expect(calloutLabel('theorem')).toBe('Định lí');
    expect(calloutLabel('definition')).toBe('Định nghĩa');
  });

  it('gives a child a word to remember by, with the other tones unchanged', () => {
    expect(calloutLabel('theorem', true)).toBe('Ghi nhớ');
    expect(calloutLabel('definition', true)).toBe('Em cần biết');
    expect(calloutLabel('note', true)).toBe('Ghi chú');
    expect(calloutLabel('warning', true)).toBe('Lưu ý');
  });
});
