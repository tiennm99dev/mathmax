import { describe, expect, it } from 'vitest';
import { ROUTINES, hourOfDay } from './time.js';

describe('a school day', () => {
  it('says each routine time with the part of the day', () => {
    expect(ROUTINES.map((r) => hourOfDay(r.hour))).toEqual([
      '6 giờ sáng',
      '7 giờ sáng',
      '11 giờ trưa',
      '5 giờ chiều',
      '7 giờ tối',
      '9 giờ tối',
    ]);
  });
});
