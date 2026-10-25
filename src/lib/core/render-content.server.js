/**
 * Turns lesson content into HTML at prerender time. Only `+page.server.js`
 * imports this, so KaTeX never ships to the client for content; the HTML
 * travels in the page data. Widgets that need live TeX use `tex.svelte`.
 */

import katex from 'katex';
import { findClose } from './content-schema.js';
import { texOptions } from './katex-options.js';

/** @typedef {import('./content-schema.js').LessonContent} LessonContent */
/** @typedef {import('./content-schema.js').RenderedLesson} RenderedLesson */
/** @typedef {import('./content-schema.js').RenderedBlock} RenderedBlock */
/** @typedef {import('./content-schema.js').Block} Block */
/** @typedef {import('./content-schema.js').Exercise} Exercise */

/** @type {Record<string, string>} */
const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** @param {string} s */
export function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

/**
 * Renders TeX with the shared options (see `katex-options.js`), so the markup
 * is safe to inject and keeps MathML for screen readers.
 * @param {string} tex
 * @param {boolean} display
 */
export function renderTex(tex, display) {
  return katex.renderToString(tex, texOptions(display));
}

/**
 * Splits text on `$...$` (inline) and `$$...$$` (display) and returns HTML:
 * text is escaped, TeX is rendered. `\$` is a literal dollar. An unclosed
 * delimiter is kept as text (the schema test reports it).
 * @param {string} text
 */
export function renderRichText(text) {
  let html = '';
  let plain = '';
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '\\' && text[i + 1] === '$') {
      plain += '$';
      i += 2;
      continue;
    }
    if (ch === '$') {
      const display = text[i + 1] === '$';
      const open = i + (display ? 2 : 1);
      const close = findClose(text, open, display);
      if (close !== -1) {
        html += escapeHtml(plain) + renderTex(text.slice(open, close), display);
        plain = '';
        i = close + (display ? 2 : 1);
        continue;
      }
    }
    plain += ch;
    i += 1;
  }
  return html + escapeHtml(plain);
}

/**
 * Plain text for meta tags and speech: delimiters dropped, TeX source kept.
 * @param {string} text
 */
export function plainText(text) {
  return text.replace(/\\\$|\$\$?/g, (m) => (m === '\\$' ? '$' : ''));
}

/** @param {string[]} list */
const richAll = (list) => list.map(renderRichText);

/**
 * @param {Block} block
 * @returns {RenderedBlock}
 */
function renderBlock(block) {
  switch (block.type) {
    case 'p':
      return { type: 'p', html: renderRichText(block.text) };
    case 'tex':
      return { type: 'tex', html: renderTex(block.tex, true) };
    case 'list':
      return { type: 'list', items: richAll(block.items), ordered: block.ordered ?? false };
    case 'callout':
      return {
        type: 'callout',
        tone: block.tone,
        title: block.title === undefined ? null : renderRichText(block.title),
        html: renderRichText(block.text),
      };
    case 'table':
      return {
        type: 'table',
        head: richAll(block.head),
        rows: block.rows.map(richAll),
        caption: block.caption === undefined ? null : renderRichText(block.caption),
      };
    case 'widget':
      return { type: 'widget', name: block.name };
  }
}

/**
 * Rich fields become HTML; answer data stays as written.
 * @param {Exercise} ex
 * @returns {Exercise}
 */
function renderExercise(ex) {
  const common = {
    prompt: renderRichText(ex.prompt),
    hints: richAll(ex.hints),
    solution: renderRichText(ex.solution),
  };
  switch (ex.type) {
    case 'choice':
    case 'multi':
      return { ...ex, ...common, options: richAll(ex.options) };
    case 'order':
      return { ...ex, ...common, items: richAll(ex.items) };
    case 'match':
      return { ...ex, ...common, left: richAll(ex.left), right: richAll(ex.right) };
    default:
      return { ...ex, ...common };
  }
}

/**
 * @param {LessonContent} content
 * @returns {RenderedLesson}
 */
export function renderLesson(content) {
  return {
    summary: plainText(content.summary),
    intro: renderRichText(content.intro),
    objectives: richAll(content.objectives),
    sections: content.sections.map((s) => ({
      heading: renderRichText(s.heading),
      label: plainText(s.heading),
      project: s.project ?? false,
      blocks: s.blocks.map(renderBlock),
    })),
    explore: content.explore
      ? {
          title: renderRichText(content.explore.title),
          instruction: renderRichText(content.explore.instruction),
        }
      : null,
    examples: content.examples.map((e) => ({
      problem: renderRichText(e.problem),
      steps: richAll(e.steps),
      answer: renderRichText(e.answer),
    })),
    practice: content.practice.map(renderExercise),
    takeaways: richAll(content.takeaways),
  };
}
