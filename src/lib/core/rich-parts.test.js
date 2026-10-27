import { describe, expect, it } from 'vitest';
import { findClose, richParts } from './rich-parts.js';

describe('richParts', () => {
  it('returns plain text as one part', () => {
    expect(richParts('S = a · b')).toEqual([{ kind: 'text', text: 'S = a · b' }]);
    expect(richParts('')).toEqual([]);
  });

  it('splits inline and display TeX from the text', () => {
    expect(richParts('Tính $S_{xq}$ trước.')).toEqual([
      { kind: 'text', text: 'Tính ' },
      { kind: 'tex', tex: 'S_{xq}', display: false },
      { kind: 'text', text: ' trước.' },
    ]);
    expect(richParts('$$x^2$$')).toEqual([{ kind: 'tex', tex: 'x^2', display: true }]);
  });

  it('keeps escaped dollars and unclosed delimiters as text', () => {
    expect(richParts('Giá \\$5')).toEqual([{ kind: 'text', text: 'Giá $5' }]);
    expect(richParts('Giá $5')).toEqual([{ kind: 'text', text: 'Giá $5' }]);
  });

  it('skips escaped dollars inside TeX when finding the close', () => {
    expect(findClose('a\\$b$', 0, false)).toBe(4);
    expect(findClose('a$b', 0, true)).toBe(-1);
  });
});
