import { describe, it, expect } from 'vitest';
import { escapeHtml, plainText, renderLesson, renderRichText } from './render-content.server.js';

describe('renderRichText', () => {
  it('escapes plain text', () => {
    expect(renderRichText('a < b & "c"')).toBe('a &lt; b &amp; &quot;c&quot;');
    expect(escapeHtml("<script>'")).toBe('&lt;script&gt;&#39;');
  });

  it('renders inline TeX between text', () => {
    const html = renderRichText('Ta có $a^2$ nhé');
    expect(html.startsWith('Ta có <span class="tex"><span class="sr-only">a²</span>')).toBe(true);
    expect(html).toContain('<span aria-hidden="true"><span class="katex">');
    expect(html.endsWith(' nhé')).toBe(true);
    expect(html).not.toContain('katex-display');
    expect(html).not.toContain('<math');
  });

  it('renders display TeX', () => {
    const html = renderRichText('Xem $$\\frac{1}{2}$$');
    expect(html).toContain('katex-display');
    expect(html).toContain('mfrac');
  });

  it('keeps escaped and unclosed dollars as text', () => {
    expect(renderRichText('giá \\$5')).toBe('giá $5');
    expect(renderRichText('mở $a+b')).toBe('mở $a+b');
  });

  it('does not let TeX inject markup', () => {
    const html = renderRichText('$\\text{<img src=x>}$');
    expect(html).not.toContain('<img');
  });
});

describe('plainText', () => {
  it('drops delimiters but keeps the TeX source and literal dollars', () => {
    expect(plainText('Tính $a+b$ và $$c$$, giá \\$5')).toBe('Tính a+b và c, giá $5');
  });
});

describe('renderLesson', () => {
  const rendered = renderLesson({
    summary: 'Tóm tắt',
    intro: 'Mở $x$',
    objectives: ['Học $y$'],
    sections: [
      {
        heading: 'Phần $1$',
        blocks: [
          { type: 'p', text: 'Đoạn' },
          { type: 'tex', tex: 'x^2' },
          { type: 'list', items: ['a'] },
          { type: 'callout', tone: 'note', text: 'Ghi' },
          { type: 'table', head: ['<h>'], rows: [['$1$']] },
          { type: 'widget', name: 'balance' },
        ],
      },
    ],
    examples: [{ problem: 'P', steps: ['S'], answer: 'A' }],
    practice: [
      {
        type: 'choice',
        prompt: 'Chọn',
        options: ['$1$', '2'],
        answer: 0,
        hints: ['h'],
        solution: 's',
      },
      { type: 'text', prompt: 'Viết', accept: ['<vuông>'], hints: ['h'], solution: 's' },
      { type: 'number', prompt: 'Số', answer: 2, unit: 'cm', hints: ['h'], solution: 's' },
    ],
    takeaways: ['Nhớ'],
  });

  it('maps every block to HTML and keeps defaults explicit', () => {
    const blocks = rendered.sections[0].blocks;
    expect(blocks.map((b) => b.type)).toEqual(['p', 'tex', 'list', 'callout', 'table', 'widget']);
    expect(blocks[1]).toMatchObject({ type: 'tex' });
    expect(/** @type {{ html: string }} */ (blocks[1]).html).toContain('katex-display');
    expect(blocks[2]).toEqual({ type: 'list', items: ['a'], ordered: false });
    expect(blocks[3]).toEqual({ type: 'callout', tone: 'note', title: null, html: 'Ghi' });
    expect(blocks[4]).toMatchObject({ head: ['&lt;h&gt;'], caption: null });
    expect(rendered.sections[0].project).toBe(false);
    expect(rendered.explore).toBeNull();
  });

  it('renders exercise rich fields but leaves answer data alone', () => {
    const [choice, text, number] = rendered.practice;
    expect(choice.type === 'choice' && choice.options[0]).toContain('katex');
    expect(choice.type === 'choice' && choice.answer).toBe(0);
    expect(text.type === 'text' && text.accept).toEqual(['<vuông>']);
    expect(number.type === 'number' && number.unit).toBe('cm');
  });

  it('is plain serialisable data', () => {
    expect(JSON.parse(JSON.stringify(rendered))).toEqual(rendered);
  });
});
