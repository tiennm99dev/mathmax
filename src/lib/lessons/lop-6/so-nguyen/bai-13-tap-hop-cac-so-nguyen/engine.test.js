import { describe, it, expect } from 'vitest';
import { CHALLENGES, START, compare, relationSentence, temperatureSentence } from './engine.js';

describe('compare', () => {
  it('orders integers as positions on the line', () => {
    expect(compare(-7, -3)).toBe('<');
    expect(compare(-1, 0)).toBe('<');
    expect(compare(2, -9)).toBe('>');
    expect(compare(-4, -4)).toBe('=');
  });
});

describe('relationSentence', () => {
  it('names the side and writes both inequalities', () => {
    expect(relationSentence(-7, -3)).toBe(
      'Điểm a nằm bên trái điểm b nên −7 < −3 (cũng viết −3 > −7).',
    );
    expect(relationSentence(5, -2)).toMatch(/bên phải/);
    expect(relationSentence(0, 0)).toMatch(/trùng nhau/);
  });
});

describe('temperatureSentence', () => {
  it('reads below-zero temperatures as negative', () => {
    expect(temperatureSentence(-7)).toMatch(/âm 7 độ C/);
    expect(temperatureSentence(25)).toMatch(/cao hơn 0 °C là 25 độ/);
    expect(temperatureSentence(0)).toMatch(/^0 °C/);
  });
});

describe('CHALLENGES', () => {
  it('none is met by the starting points', () => {
    for (const c of CHALLENGES) expect(c.check(START.a, START.b)).toBe(false);
  });

  it('each challenge has a solution on the line from −10 to 10', () => {
    for (const c of CHALLENGES) {
      let found = false;
      for (let a = -10; a <= 10 && !found; a++) {
        for (let b = -10; b <= 10 && !found; b++) found = c.check(a, b);
      }
      expect(found, c.text).toBe(true);
    }
  });

  it('accepts the intended answers only', () => {
    expect(CHALLENGES[1].check(-1, 0)).toBe(true);
    expect(CHALLENGES[1].check(-2, 0)).toBe(false);
    expect(CHALLENGES[2].check(-6, 0)).toBe(true);
    expect(CHALLENGES[2].check(-4, 0)).toBe(false);
    expect(CHALLENGES[3].check(-2, -5)).toBe(true);
    expect(CHALLENGES[3].check(-5, -2)).toBe(false);
    expect(CHALLENGES[5].check(-4, 4)).toBe(true);
    expect(CHALLENGES[5].check(4, -4)).toBe(false);
  });
});
