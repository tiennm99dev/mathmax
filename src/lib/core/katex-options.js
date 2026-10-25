/**
 * KaTeX options shared by the prerender (`render-content.server.js`) and the
 * live widget renderer (`tex.svelte`), so both treat Vietnamese text the same.
 */

/** Strict-mode codes KaTeX raises for a letter its fonts do not cover. */
const LETTER_CODES = new Set(['unknownSymbol', 'unicodeTextInMathMode', 'symbolNotInFont']);

/** A Latin letter outside ASCII, which covers every Vietnamese letter. */
const ACCENTED_LATIN = /^(?![\p{ASCII}])\p{Script=Latin}$/u;

/**
 * KaTeX `strict` handler. Vietnamese letters inside TeX (`\text{bể}`, `ừ`) are
 * shown by the page font, so their warnings are ignored; every other
 * LaTeX-incompatible input still warns, and the content test fails on it.
 * @param {string} code
 * @param {string} message
 * @returns {'ignore' | 'warn'}
 */
export function texStrict(code, message) {
  if (!LETTER_CODES.has(code)) return 'warn';
  const ch = /(?:"|')(.)(?:"|')/u.exec(message)?.[1] ?? '';
  return ACCENTED_LATIN.test(ch) ? 'ignore' : 'warn';
}

/**
 * Options for `katex.renderToString`. KaTeX escapes its input and runs with
 * `trust: false`, so the markup is safe to inject. Output keeps MathML for
 * screen readers.
 * @param {boolean} display
 */
export function texOptions(display) {
  return /** @type {const} */ ({
    displayMode: display,
    throwOnError: false,
    output: 'htmlAndMathml',
    strict: texStrict,
  });
}
