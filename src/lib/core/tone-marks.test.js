import { describe, expect, it } from 'vitest';
import { newToneMarks, oldToneMarks } from './tone-marks.js';

describe('newToneMarks', () => {
  it.each([
    ['hóa học', 'hoá học'],
    ['Hóa học', 'Hoá học'],
    ['HÓA HỌC', 'HOÁ HỌC'],
    ['hòa tan', 'hoà tan'],
    ['dầu hỏa', 'dầu hoả'],
    ['Thủy ngân', 'Thuỷ ngân'],
    ['tỏa nhiệt', 'toả nhiệt'],
    ['khóa', 'khoá'],
    ['lũy thừa', 'luỹ thừa'],
    ['tùy ý', 'tuỳ ý'],
    ['sức khỏe', 'sức khoẻ'],
    ['nhụy hoa', 'nhuỵ hoa'],
    ['tuyến tụy', 'tuyến tuỵ'],
    ['thỏa mãn', 'thoả mãn'],
    ['tọa độ', 'toạ độ'],
    ['(hóa)', '(hoá)'],
    ['oxi hóa-khử', 'oxi hoá-khử'],
  ])('%s → %s', (old, next) => {
    expect(newToneMarks(old)).toBe(next);
  });

  it('leaves closed syllables, qu syllables and new-style words alone', () => {
    const keep = 'khoảng cách, hoàn thành, thuyền, toán, quý, quả, quỳ, hoá, thuỷ, của, mùa';
    expect(newToneMarks(keep)).toBe(keep);
    expect(oldToneMarks(keep)).toEqual([]);
  });

  it('leaves unaccented slugs and ids alone', () => {
    const slug = 'hoa-hoc/bai-1-thuy-ngan';
    expect(newToneMarks(slug)).toBe(slug);
  });
});

describe('oldToneMarks', () => {
  it('lists each old-style word', () => {
    expect(oldToneMarks('Hóa học và thủy tinh, hóa trị')).toEqual(['Hóa', 'thủy', 'hóa']);
  });
});

/**
 * Lesson copy, curriculum titles and subject data of this site, read as text.
 * Slugs and ids are unaccented, so only copy can hold a tone mark.
 */
const sources = /** @type {Record<string, string>} */ (
  import.meta.glob(
    [
      '/src/lib/lessons/**/*.{js,svelte}',
      '/src/lib/curriculum/*.json',
      '/src/lib/domain/**/*.{js,svelte}',
      '/src/lib/i18n/*.js',
      '/src/lib/core/**/*.{js,svelte}',
      '!/src/lib/core/tone-marks*.js',
    ],
    { eager: true, query: '?raw', import: 'default' },
  )
);

describe('site copy', () => {
  it('uses the new tone-mark style (hoá, thuỷ, khoẻ)', () => {
    const bad = Object.entries(sources).flatMap(([path, text]) => {
      const words = oldToneMarks(text);
      return words.length ? [`${path}: ${[...new Set(words)].join(', ')}`] : [];
    });
    expect(bad).toEqual([]);
  });
});
