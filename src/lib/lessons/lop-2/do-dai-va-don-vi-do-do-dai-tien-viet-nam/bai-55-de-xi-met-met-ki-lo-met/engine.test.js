import { describe, expect, it } from 'vitest';
import {
  BAR_MAX,
  BAR_TASKS,
  ROAD_MAX,
  ROAD_STEP,
  ROAD_TASKS,
  barFeedback,
  barParts,
  barSentence,
  roadFeedback,
  roadSentence,
  stopAt,
} from './engine.js';

describe('the measuring bar', () => {
  it('reads one length in dm, cm and m', () => {
    expect(barParts(10)).toEqual({ dm: 10, cm: 100, m: 1, toNextM: 0 });
    expect(barParts(30)).toEqual({ dm: 30, cm: 300, m: 3, toNextM: 0 });
    expect(barParts(13)).toEqual({ dm: 13, cm: 130, m: null, toNextM: 7 });
  });

  it('says how much is missing to the next metre', () => {
    expect(barSentence(0)).toContain('kéo');
    expect(barSentence(4)).toBe('4 dm = 40 cm. Thêm 6 dm nữa là đủ 1 m.');
    expect(barSentence(20)).toBe('20 dm = 200 cm. Thanh đo dài đúng 2 m: 2 m = 20 dm.');
  });

  it('has tasks whose written length matches their bar and fits on it', () => {
    /** @type {Record<string, number>} */
    const dmPer = { cm: 0.1, dm: 1, m: 10 };
    const bad = BAR_TASKS.filter((t) => {
      const [n, unit] = t.text.split(' ');
      return Number(n) * dmPer[unit] !== t.dm || t.dm > BAR_MAX || t.dm < 1;
    });
    expect(bad).toEqual([]);
  });

  it('only calls the asked length done, and points the way otherwise', () => {
    const task = { text: '1 m', dm: 10 };
    expect(barFeedback(task, 10).done).toBe(true);
    expect(barFeedback(task, 10).text).toContain('10 dm = 100 cm = 1 m');
    expect(barFeedback(task, 0).text).toBe(barSentence(0));
    expect(barFeedback(task, 6)).toMatchObject({ done: false });
    expect(barFeedback(task, 6).text).toContain('kéo dài thêm');
    expect(barFeedback(task, 12).text).toContain('kéo ngắn lại');
  });
});

describe('the road of 1 km', () => {
  it('counts what is left of the kilometre', () => {
    expect(roadSentence(300)).toBe('Đã đi 300 m. Còn 700 m nữa là đủ 1 km.');
    expect(roadSentence(ROAD_MAX)).toContain('1 km = 1000 m');
  });

  it('has every place on a step of the slider', () => {
    expect(ROAD_TASKS.filter((s) => s.m % ROAD_STEP !== 0 || s.m > ROAD_MAX)).toEqual([]);
    expect(stopAt(500)?.name).toBe('trường học');
    expect(stopAt(300)).toBeUndefined();
  });

  it('tells when the walk reached the place', () => {
    const school = { m: 500, name: 'trường học' };
    expect(roadFeedback(school, 500).done).toBe(true);
    expect(roadFeedback(school, 0).text).toBe(roadSentence(0));
    expect(roadFeedback(school, 400).text).toContain('đi tiếp');
    expect(roadFeedback(school, 600).text).toContain('quay lại');
    expect(roadFeedback({ m: 1000, name: 'chợ' }, 1000).text).toContain('đúng 1 km');
  });
});
