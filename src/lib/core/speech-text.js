/**
 * Text to read aloud from rendered content. KaTeX writes each formula twice
 * (visual HTML and MathML); only the MathML text is kept, without its TeX
 * annotation, and controls marked `data-no-speech` are skipped.
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
