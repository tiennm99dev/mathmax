import { describe, it, expect } from 'vitest';
import { htmlText, texHtml, texText } from './tex-text.js';
import { renderRichText } from './render-content.server.js';

describe('texText', () => {
  it.each([
    ['\\sqrt{144}', '√144'],
    ['\\sqrt{a+b}', '√(a+b)'],
    ['\\sqrt[3]{8}', '∛8'],
    ['10\\times', '10×'],
    ['-1', '−1'],
    ['\\frac{3}{4}', '3/4'],
    ['\\dfrac{-3}{x+1}', '(−3)/(x+1)'],
    ['x^2 + y^{3}', 'x²+y³'],
    ['2^{10}', '2¹⁰'],
    ['a^{x+1}', 'a^(x+1)'],
    ['H_2O', 'H₂O'],
    ['90^\\circ', '90°'],
    ['3{,}5', '3,5'],
    ['1\\,234', '1 234'],
    ['5\\text{ cm}', '5 cm'],
    ['\\widehat{ABC} = 60^\\circ', 'góc ABC=60°'],
    ['x \\in \\mathbb{N}', 'x∈ℕ'],
    ['a \\ne b', 'a≠b'],
    ['a \\not= b', 'a≠b'],
    ['\\left( \\frac{1}{2} \\right)^2', '(1/2)²'],
    ['25\\%', '25%'],
    ['A \\cap B = \\emptyset', 'A∩B=∅'],
    ['\\sin x', 'sin x'],
    ['3 + \\square = 5', '3+ ô trống =5'],
    ['\\Box - 2', 'ô trống −2'],
    ['\\frac{1}{6x^2}', '1/(6x²)'],
    ['\\frac{5}{2\\pi}', '5/(2π)'],
    ['\\frac{6x^2}{3}', '6x²/3'],
    ['\\frac{AB}{CD}', 'AB/CD'],
    ['\\frac{1}{x^2}', '1/x²'],
    ['\\frac{3}{4,5}', '3/4,5'],
    ['\\frac{1}{\\frac{2}{3}}', '1/(2/3)'],
  ])('%s → %s', (tex, text) => {
    expect(texText(tex)).toBe(text);
  });

  it('keeps options that differ only in their formula distinct', () => {
    const names = ['\\sqrt{144}', '144', '-144'].map(texText);
    expect(new Set(names).size).toBe(3);
  });
});

describe('texHtml', () => {
  it('puts escaped text before the hidden drawing', () => {
    expect(texHtml('<b>x</b>', 'a<b')).toBe(
      '<span class="tex"><span class="sr-only">a&lt;b</span><span aria-hidden="true"><b>x</b></span></span>',
    );
  });

  it('prefers an explicit label', () => {
    expect(texHtml('k', 'x', 'nhãn')).toContain('<span class="sr-only">nhãn</span>');
  });
});

describe('htmlText', () => {
  it('reads rendered rich text the way a screen reader names it', () => {
    expect(htmlText(renderRichText('Số $\\sqrt{144}$ & $-1$'))).toBe('Số √144 & −1');
  });

  it('skips nested hidden markup and decodes entities', () => {
    expect(htmlText('a <span aria-hidden="true"><span>b</span>c</span> d &lt;e&gt;')).toBe(
      'a d <e>',
    );
  });
});
