/**
 * Badge status of a chapter from how many of its lessons are live: `live` only
 * when every lesson is written, `partial` when some are, `stub` when none are.
 * @param {number} live
 * @param {number} total
 * @returns {'live' | 'partial' | 'stub'}
 */
export function chapterStatus(live, total) {
  if (live <= 0) return 'stub';
  return live >= total ? 'live' : 'partial';
}
