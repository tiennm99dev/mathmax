const GRADE_RE = /^lop-(1[0-2]|[1-9])$/;

/**
 * Matches a grade route segment, `lop-1` to `lop-12`.
 * @param {string} param
 * @returns {string | undefined}
 */
export function grade(param) {
  return GRADE_RE.test(param) ? param : undefined;
}
