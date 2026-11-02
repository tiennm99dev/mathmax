/**
 * For tests of generated questions: finds the TeX KaTeX refuses in strict mode.
 * Each distinct span is rendered once and failures come back as a list for one
 * `expect`, so a large sample stays fast when the suite runs under load.
 */
import katex from 'katex';

/**
 * Every `$...$` span of a rich text.
 * @param {string} text
 * @returns {string[]}
 */
export function texSpans(text) {
  return [...text.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);
}

/**
 * The distinct TeX spans in `texts` that strict mode rejects, each with its error.
 * @param {readonly string[]} texts rich texts
 * @returns {string[]}
 */
export function strictTexFailures(texts) {
  const failures = [];
  for (const tex of new Set(texts.flatMap(texSpans))) {
    try {
      katex.renderToString(tex, { strict: 'error', throwOnError: true });
    } catch (e) {
      failures.push(`${tex}: ${/** @type {Error} */ (e).message}`);
    }
  }
  return failures;
}
