import { describe, expect, it } from 'vitest';
import { readBig } from '../_shared/big-numbers.js';
import { NUMBERS, builtReading, classesOf, nextClass, partSentence, tapClass } from './engine.js';

/** Group spaces as plain spaces. @param {string} t */
const plain = (t) => t.replace(/\u202f/g, ' ');

describe('classes of a big number', () => {
  it('splits and reads each class', () => {
    expect(classesOf(126476461)).toEqual([
      { cls: 2, text: '126', name: 'Lớp triệu', words: 'một trăm hai mươi sáu triệu' },
      { cls: 1, text: '476', name: 'Lớp nghìn', words: 'bốn trăm bảy mươi sáu nghìn' },
      { cls: 0, text: '461', name: 'Lớp đơn vị', words: 'bốn trăm sáu mươi mốt' },
    ]);
    expect(partSentence(2000001, 1)).toBe('Lớp nghìn là 000: lớp này toàn chữ số 0 nên không đọc.');
    expect(partSentence(3045302, 1)).toBe(
      'Lớp nghìn là 045, đọc là: không trăm bốn mươi lăm nghìn.',
    );
  });
});

describe('reading class by class', () => {
  it('takes the classes from the left only', () => {
    expect(nextClass(97338579, [])).toBe(2);
    const wrong = tapClass(97338579, [], 0);
    expect(wrong.read).toEqual([]);
    expect(wrong.tone).toBe('warn');
    const first = tapClass(97338579, [], 2);
    expect(first.read).toEqual([2]);
    expect(builtReading(97338579, first.read)).toBe('chín mươi bảy triệu');
  });

  it('builds the whole reading of every number', () => {
    const bad = NUMBERS.filter((n) => {
      let read = /** @type {number[]} */ ([]);
      let last = /** @type {ReturnType<typeof tapClass> | null} */ (null);
      for (const cls of [2, 1, 0]) {
        last = tapClass(n, read, cls);
        read = last.read;
      }
      return builtReading(n, read) !== readBig(n) || last?.tone !== 'ok';
    });
    expect(bad).toEqual([]);
    const done = tapClass(2000001, [2, 1], 0);
    expect(plain(done.text)).toBe('2 000 001 đọc là: Hai triệu không trăm linh một.');
  });
});
