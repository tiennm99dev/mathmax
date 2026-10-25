/**
 * Pure answer checking for practice exercises. DOM-free so it runs in Node
 * tests and in the browser alike.
 *
 * Responses by exercise type:
 * - `number`, `fraction`, `text`: the raw string the learner typed.
 * - `choice`, `count`: the picked index or number.
 * - `multi`: the picked option indices.
 * - `order`: item indices in the order the learner arranged them.
 * - `match`: `[leftIndex, rightIndex]` pairs.
 */

import { gcd } from '#lib/numtheory-engine/index.js';

/** @typedef {import('./content-schema.js').Exercise} Exercise */

/**
 * - `correct`: the answer is right.
 * - `empty`: nothing was answered yet.
 * - `incomplete`: some of a multi-part answer is missing (unmatched pairs).
 * - `invalid`: the input could not be read as the expected form.
 * - `unit`: the value is right but a different unit was written.
 * - `not-simplest`: the fraction is equal but not in lowest terms.
 * - `wrong`: a readable, complete answer that is not right.
 * @typedef {'correct' | 'empty' | 'incomplete' | 'invalid' | 'unit' | 'not-simplest' | 'wrong'} CheckReason
 */

/** @typedef {{ correct: boolean, reason: CheckReason }} CheckResult */

const MINUS_RE = /[\u2212\u2013\u2014]/g;
// JS `\s` already covers no-break and thin spaces.
const SPACE_RE = /\s+/g;
const SUPERSCRIPTS = /** @type {Record<string, string>} */ ({ '²': '2', '³': '3', '¹': '1' });

/**
 * Normalises a unit for comparison: case, spaces, `^` and superscript digits
 * are ignored, so `cm²`, `cm^2` and `CM2` match.
 * @param {string} unit
 */
export function normalizeUnit(unit) {
  return unit
    .toLowerCase()
    .replace(SPACE_RE, '')
    .replace(/\^/g, '')
    .replace(/[²³¹]/g, (c) => SUPERSCRIPTS[c]);
}

/**
 * Reads the digits part of a number the Vietnamese way: `,` is the decimal
 * mark and `.` or a space groups thousands, so `3,5` is 3.5 and `70.000` or
 * `2.100` is a whole number. A single `.` is read as a decimal mark only where
 * it cannot be a thousands group (`3.5`, `0.125`, `12.34`, `1234.5`).
 * Repeated marks of one kind group thousands (`1.000.000`), and with both kinds
 * the last one is the decimal mark (`1.234,5` or `1,234.5`). Spaces may group
 * thousands (`1 000 000`).
 * @param {string} digits
 * @returns {number | null}
 */
function readDigits(digits) {
  let s = digits;
  if (/\s/.test(s)) {
    s = s.replace(SPACE_RE, ' ');
    if (!/^\d{1,3}(?: \d{3})+(?:[.,]\d+)?$/.test(s)) return null;
    s = s.replace(/ /g, '');
  }
  const dots = (s.match(/\./g) ?? []).length;
  const commas = (s.match(/,/g) ?? []).length;

  let intPart = s;
  let frac = '';
  /** @type {string | null} */
  let group = null;

  if (dots && commas) {
    const decimal = s.lastIndexOf('.') > s.lastIndexOf(',') ? '.' : ',';
    group = decimal === '.' ? ',' : '.';
    const at = s.lastIndexOf(decimal);
    if (s.indexOf(decimal) !== at) return null;
    intPart = s.slice(0, at);
    frac = s.slice(at + 1);
  } else if (dots === 1 && !commas && /^[1-9]\d{0,2}\.\d{3}$/.test(s)) {
    group = '.';
  } else if (dots + commas === 1) {
    const at = Math.max(s.indexOf('.'), s.indexOf(','));
    intPart = s.slice(0, at) || '0';
    frac = s.slice(at + 1);
  } else if (dots + commas > 1) {
    group = dots ? '.' : ',';
  }

  if (group) {
    const parts = intPart.split(group);
    if (!/^\d{1,3}$/.test(parts[0]) || parts.slice(1).some((p) => !/^\d{3}$/.test(p))) {
      return null;
    }
    intPart = parts.join('');
  }
  if (!/^\d+$/.test(intPart) || (frac !== '' && !/^\d+$/.test(frac))) return null;
  return Number(frac ? `${intPart}.${frac}` : intPart);
}

/**
 * Parses a typed number with an optional trailing unit.
 * @param {string} input
 * @returns {{ value: number, unit: string } | null}
 */
export function parseNumber(input) {
  const s = input.trim().replace(MINUS_RE, '-');
  const m = /^([+-]?)\s*((?:\d|[.,](?=\d))[\d.,\s]*?)\s*([^\d\s.,].*)?$/u.exec(s);
  if (!m) return null;
  const [, sign, digits, unit = ''] = m;
  if (!/\d$/.test(digits)) return null;
  const value = readDigits(digits);
  if (value === null) return null;
  return { value: sign === '-' ? -value : value, unit: unit.trim() };
}

/**
 * Parses `p/q`, a whole number, or a mixed number such as `1 1/2`.
 * Returns `[numerator, denominator]` exactly as written (mixed numbers become
 * improper fractions), or null.
 * @param {string} input
 * @returns {[number, number] | null}
 */
export function parseFraction(input) {
  const s = input.trim().replace(MINUS_RE, '-').replace(SPACE_RE, ' ');
  let m = /^([+-]?\d+)$/.exec(s);
  if (m) return [Number(m[1]), 1];
  m = /^([+-]?\d+) ?\/ ?([+-]?\d+)$/.exec(s);
  if (m) {
    const q = Number(m[2]);
    return q === 0 ? null : [Number(m[1]), q];
  }
  m = /^([+-]?)(\d+) (\d+) ?\/ ?(\d+)$/.exec(s);
  if (m) {
    const whole = Number(m[2]);
    const p = Number(m[3]);
    const q = Number(m[4]);
    if (q === 0 || p >= q) return null;
    const n = whole * q + p;
    return [m[1] === '-' ? -n : n, q];
  }
  return null;
}

/**
 * Lowest-terms test: numerator and denominator share no factor and the
 * denominator is positive.
 * @param {[number, number]} f
 */
export function isSimplest([p, q]) {
  return q > 0 && gcd(p, q) === 1;
}

/**
 * Folds case, diacritics (including đ), surrounding spaces, inner runs of
 * spaces and trailing sentence punctuation, so `Hình Vuông.` equals
 * `hinh vuong`.
 * @param {string} s
 */
export function normalizeText(s) {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(SPACE_RE, ' ')
    .trim()
    .replace(/\s*[.!?;]+$/, '');
}

/** @param {unknown} v */
function isBlank(v) {
  return v === undefined || v === null || (typeof v === 'string' && v.trim() === '');
}

/**
 * @param {CheckReason} reason
 * @returns {CheckResult}
 */
function result(reason) {
  return { correct: reason === 'correct', reason };
}

/** @param {unknown} v @returns {number[] | null} */
function indexList(v) {
  return Array.isArray(v) && v.every((x) => Number.isInteger(x))
    ? /** @type {number[]} */ (v)
    : null;
}

/**
 * Checks a learner's response against an exercise.
 * @param {Exercise} exercise
 * @param {unknown} response
 * @returns {CheckResult}
 */
export function checkAnswer(exercise, response) {
  switch (exercise.type) {
    case 'number': {
      if (isBlank(response)) return result('empty');
      if (typeof response !== 'string' && typeof response !== 'number') return result('invalid');
      const parsed =
        typeof response === 'number' ? { value: response, unit: '' } : parseNumber(response);
      if (!parsed || !Number.isFinite(parsed.value)) return result('invalid');
      const tol = exercise.tolerance ?? 1e-9 * Math.max(1, Math.abs(exercise.answer));
      const close = Math.abs(parsed.value - exercise.answer) <= tol;
      if (parsed.unit !== '') {
        if (!exercise.unit) return result('invalid');
        if (normalizeUnit(parsed.unit) !== normalizeUnit(exercise.unit)) {
          return result(close ? 'unit' : 'wrong');
        }
      }
      return result(close ? 'correct' : 'wrong');
    }
    case 'fraction': {
      if (isBlank(response)) return result('empty');
      if (typeof response !== 'string') return result('invalid');
      const f = parseFraction(response);
      if (!f) return result('invalid');
      const [p, q] = exercise.answer;
      if (f[0] * q !== p * f[1]) return result('wrong');
      if (exercise.simplest && !isSimplest(f)) return result('not-simplest');
      return result('correct');
    }
    case 'choice':
    case 'count': {
      if (response === undefined || response === null) return result('empty');
      if (!Number.isInteger(response)) return result('invalid');
      return result(response === exercise.answer ? 'correct' : 'wrong');
    }
    case 'multi': {
      const picked = indexList(response);
      if (!picked) return result(isBlank(response) ? 'empty' : 'invalid');
      if (picked.length === 0) return result('empty');
      const want = new Set(exercise.answers);
      const got = new Set(picked);
      const same = got.size === want.size && [...got].every((i) => want.has(i));
      return result(same ? 'correct' : 'wrong');
    }
    case 'text': {
      if (isBlank(response)) return result('empty');
      if (typeof response !== 'string') return result('invalid');
      const given = normalizeText(response);
      return result(exercise.accept.some((a) => normalizeText(a) === given) ? 'correct' : 'wrong');
    }
    case 'order': {
      const got = indexList(response);
      if (!got) return result(isBlank(response) ? 'empty' : 'invalid');
      if (got.length !== exercise.answer.length) return result('incomplete');
      return result(got.every((v, i) => v === exercise.answer[i]) ? 'correct' : 'wrong');
    }
    case 'match': {
      if (isBlank(response)) return result('empty');
      if (!Array.isArray(response)) return result('invalid');
      /** @type {Map<number, number>} */
      const given = new Map();
      for (const pair of response) {
        if (!Array.isArray(pair) || pair.length !== 2 || !pair.every(Number.isInteger)) {
          return result('invalid');
        }
        given.set(pair[0], pair[1]);
      }
      if (given.size === 0) return result('empty');
      if (given.size < exercise.left.length) return result('incomplete');
      const ok = exercise.pairs.every(([l, r]) => given.get(l) === r);
      return result(ok ? 'correct' : 'wrong');
    }
  }
}
