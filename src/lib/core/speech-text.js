/** Marks the end of a table cell and of a table row in the copied text. */
const CELL = '\u2063';
const ROW = '\u2064';

/**
 * Text to read aloud from rendered content: what a screen reader would read.
 * Formulas keep their accessible text (see `tex-text.js`), the KaTeX drawing
 * and anything else marked `aria-hidden` is dropped, and controls marked
 * `data-no-speech` are skipped. A table is read row by row, its cells
 * separated, so neighbouring cells do not run into one word.
 * @param {Element | null | undefined} el
 * @returns {string}
 */
export function speechText(el) {
  if (!el) return '';
  const copy = /** @type {Element} */ (el.cloneNode(true));
  copy
    .querySelectorAll('.katex-html, annotation, [aria-hidden="true"], [data-no-speech]')
    .forEach((node) => node.remove());
  const doc = copy.ownerDocument;
  copy.querySelectorAll('th, td, caption').forEach((cell) => cell.append(doc.createTextNode(CELL)));
  copy.querySelectorAll('tr').forEach((row) => row.append(doc.createTextNode(ROW)));
  return spokenMath(copy.textContent ?? '');
}

/**
 * Plain text tidied for a speech voice: the signs a voice may skip or read in
 * another language become words, the way a child reads them (6 × 3 → 6 nhân 3,
 * 18 : 3 → 18 chia 3), digit groups join (1 000 → 1000) so the number is read
 * whole, and the separators `speechText` adds collapse.
 * @param {string} text
 * @returns {string}
 */
export function spokenMath(text) {
  return text
    .replace(/[\s\u2063\u2064]+$/, '')
    .replace(/(\d)[\u202f\u00a0 ](?=\d{3}(?!\d))/g, '$1')
    .replace(/\s*[×✕]\s*/g, ' nhân ')
    .replace(/\s*÷\s*/g, ' chia ')
    .replace(/(\d|\))\s+:\s+(?=[\d(])/g, '$1 chia ')
    .replace(/[\s\u2063\u2064]*[\u2063\u2064][\s\u2063\u2064]*/g, (run) =>
      run.includes(ROW) ? '. ' : ', ',
    )
    .replace(/\s+/g, ' ')
    .trim();
}
