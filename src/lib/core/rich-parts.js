/**
 * Splits rich text into plain text and TeX parts. Pure and KaTeX-free, so the
 * prerender (`render-content.server.js`) and the live renderer
 * (`#lib/components/live-rich-text.svelte`) read `$...$` the same way.
 */

/**
 * @typedef {{ kind: 'text', text: string } | { kind: 'tex', tex: string, display: boolean }} RichPart
 */

/**
 * Index of the closing delimiter, or -1. Backslash escapes are skipped so
 * `\$` inside TeX does not close it.
 * @param {string} text
 * @param {number} from
 * @param {boolean} display
 */
export function findClose(text, from, display) {
  for (let j = from; j < text.length; j++) {
    if (text[j] === '\\') {
      j += 1;
      continue;
    }
    if (text[j] !== '$') continue;
    if (!display) return j;
    if (text[j + 1] === '$') return j;
  }
  return -1;
}

/**
 * Splits text on `$...$` (inline) and `$$...$$` (display). `\$` is a literal
 * dollar, and an unclosed delimiter is kept as text. Neighbouring text is
 * merged, so text and TeX parts alternate.
 * @param {string} text
 * @returns {RichPart[]}
 */
export function richParts(text) {
  /** @type {RichPart[]} */
  const parts = [];
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
        if (plain) parts.push({ kind: 'text', text: plain });
        parts.push({ kind: 'tex', tex: text.slice(open, close), display });
        plain = '';
        i = close + (display ? 2 : 1);
        continue;
      }
    }
    plain += ch;
    i += 1;
  }
  if (plain) parts.push({ kind: 'text', text: plain });
  return parts;
}
