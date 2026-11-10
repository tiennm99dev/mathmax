/**
 * Reading a number of the millions class class by class: the child taps the
 * classes from the left (lớp triệu, lớp nghìn, lớp đơn vị), hears each part
 * read with its class name, and the parts join into the whole reading.
 * Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { CLASS_NAMES, capitalBig, classParts, readPart } from '../_shared/big-numbers.js';

/** The numbers to read: populations and the book's numbers. */
export const NUMBERS = /** @type {const} */ ([
  126476461, 97338579, 273523615, 109140903, 3045302, 304028102, 2000001, 63782910,
]);

/**
 * The classes of a number from the left, each with its digits and reading.
 * @param {number} n
 * @returns {{ cls: number, text: string, name: string, words: string }[]}
 */
export function classesOf(n) {
  return classParts(n).map((p) => ({
    cls: p.cls,
    text: p.text,
    name: `Lớp ${CLASS_NAMES[p.cls]}`,
    words: readPart(n, p.cls),
  }));
}

/**
 * The next class the child should read: the leftmost one not read yet, or
 * null when every class is read.
 * @param {number} n
 * @param {number[]} read classes read so far
 */
export function nextClass(n, read) {
  return classParts(n).find((p) => !read.includes(p.cls))?.cls ?? null;
}

/**
 * Taps a class. The classes are read from the left; a tap out of order is
 * not taken and gets a nudge.
 * @param {number} n
 * @param {number[]} read
 * @param {number} cls
 * @returns {{ read: number[], tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function tapClass(n, read, cls) {
  if (read.includes(cls)) {
    return { read, tone: 'info', text: partSentence(n, cls) };
  }
  const want = nextClass(n, read);
  if (cls !== want) {
    return {
      read,
      tone: 'warn',
      text: `Em đọc từ trái sang phải. Em chạm lớp ${CLASS_NAMES[/** @type {number} */ (want)]} trước nhé.`,
    };
  }
  const now = [...read, cls];
  if (nextClass(n, now) === null) {
    return { read: now, tone: 'ok', text: `${fmt(n)} đọc là: ${capitalBig(n)}.` };
  }
  return { read: now, tone: 'info', text: partSentence(n, cls) };
}

/**
 * What one class says: "Lớp triệu là 126, đọc là một trăm hai mươi sáu
 * triệu." A class of 000 after the first is not read.
 * @param {number} n
 * @param {number} cls
 */
export function partSentence(n, cls) {
  const part = classesOf(n).find((p) => p.cls === cls);
  if (!part) return '';
  if (part.words === '')
    return `${part.name} là ${part.text}: lớp này toàn chữ số 0 nên không đọc.`;
  return `${part.name} là ${part.text}, đọc là: ${part.words}.`;
}

/**
 * The reading built so far from the classes read, in order.
 * @param {number} n
 * @param {number[]} read
 */
export function builtReading(n, read) {
  return classesOf(n)
    .filter((p) => read.includes(p.cls) && p.words !== '')
    .map((p) => p.words)
    .join(' ');
}
