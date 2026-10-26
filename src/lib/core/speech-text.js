/**
 * Text to read aloud from rendered content: what a screen reader would read.
 * Formulas keep their accessible text (see `tex-text.js`), the KaTeX drawing
 * and anything else marked `aria-hidden` is dropped, and controls marked
 * `data-no-speech` are skipped.
 * @param {Element | null | undefined} el
 * @returns {string}
 */
export function speechText(el) {
  if (!el) return '';
  const copy = /** @type {Element} */ (el.cloneNode(true));
  copy
    .querySelectorAll('.katex-html, annotation, [aria-hidden="true"], [data-no-speech]')
    .forEach((node) => node.remove());
  return (copy.textContent ?? '').replace(/\s+/g, ' ').trim();
}
