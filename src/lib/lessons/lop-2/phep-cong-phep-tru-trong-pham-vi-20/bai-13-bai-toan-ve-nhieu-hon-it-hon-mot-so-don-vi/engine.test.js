import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { compareResult, newCompareStory } from '../_shared/compare-stories.js';
import {
  MAX_LEN,
  clampLen,
  compareWords,
  drawMessage,
  operationOptions,
  resultOptions,
} from './engine.js';

const more = /** @type {const} */ ({ pair: 0, kind: 'nhieu', a: 6, k: 2 });
const fewer = /** @type {const} */ ({ pair: 1, kind: 'it', a: 9, k: 3 });

describe('the segment diagram', () => {
  it('compares the two segments in words', () => {
    expect(compareWords(6, 8, 'Mai', 'Việt')).toBe('Đoạn của Việt dài hơn đoạn của Mai 2 phần.');
    expect(compareWords(9, 6, 'Lan', 'Nam')).toBe('Đoạn của Nam ngắn hơn đoạn của Lan 3 phần.');
    expect(compareWords(5, 5, 'Lan', 'Nam')).toBe('Đoạn của Nam dài bằng đoạn của Lan.');
    expect(clampLen(0)).toBe(1);
    expect(clampLen(25)).toBe(MAX_LEN);
  });

  it('says when the second segment matches the story', () => {
    expect(drawMessage(more, 6, false).tone).toBe('info');
    expect(drawMessage(more, 7, true)).toEqual({
      tone: 'warn',
      text: 'Đoạn của Việt dài hơn đoạn của Mai 1 phần. Đề bài: Việt nhiều hơn Mai 2 bông hoa. Em kéo dài thêm nhé.',
    });
    expect(drawMessage(more, 8, true).tone).toBe('ok');
    expect(drawMessage(fewer, 6, true).tone).toBe('ok');
    expect(drawMessage(fewer, 7, true).text).toContain('rút ngắn lại');
    expect(drawMessage(fewer, 5, true).text).toContain('kéo dài thêm');
  });

  it('marks the right operation and answer for many stories', () => {
    const rand = rng(8);
    const bad = [];
    /** @type {import('../_shared/compare-stories.js').CompareStory | undefined} */
    let s;
    for (let i = 0; i < 100; i++) {
      s = newCompareStory(rand, s);
      const ops = operationOptions(s);
      const [x, y] = ops.options[ops.answer].split(/ [+−] /).map(Number);
      const value = ops.options[ops.answer].includes('+') ? x + y : x - y;
      const r = resultOptions(rand, s);
      if (value !== compareResult(s) || r.options[r.answer] !== String(value)) bad.push(s);
      if (compareResult(s) > MAX_LEN || s.a > MAX_LEN) bad.push(['too long', s]);
    }
    expect(bad).toEqual([]);
  });
});
