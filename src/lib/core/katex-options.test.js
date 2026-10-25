import { afterEach, describe, expect, it, vi } from 'vitest';
import katex from 'katex';
import { texOptions, texStrict } from './katex-options.js';

describe('texStrict', () => {
  it('ignores Vietnamese letters KaTeX has no glyph for', () => {
    expect(texStrict('unknownSymbol', 'Unrecognized Unicode character "ẻ" (7867)')).toBe('ignore');
    expect(
      texStrict('symbolNotInFont', "No character metrics for 'ừ' in style 'Main-Regular'"),
    ).toBe('ignore');
    expect(texStrict('unicodeTextInMathMode', 'Unicode text character "đ" used in math mode')).toBe(
      'ignore',
    );
  });

  it('still warns on other strict-mode problems', () => {
    expect(texStrict('unknownSymbol', 'Unrecognized Unicode character "★" (9733)')).toBe('warn');
    expect(texStrict('unicodeTextInMathMode', 'Unicode text character "λ" used in math mode')).toBe(
      'warn',
    );
    expect(texStrict('newLineInDisplayMode', 'In LaTeX, \\\\ or \\newline does nothing')).toBe(
      'warn',
    );
  });
});

describe('texOptions', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders Vietnamese text in math without strict warnings', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const html = katex.renderToString('\\text{thừa số} = ẻ + đ', texOptions(false));
    expect(html).toContain('ừ');
    expect(warn).not.toHaveBeenCalled();
  });
});
