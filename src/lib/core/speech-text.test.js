import { describe, expect, it } from 'vitest';
import { spokenMath } from './speech-text.js';

describe('spokenMath', () => {
  it('reads times and division signs as words', () => {
    expect(spokenMath('6 × 3 = 18')).toBe('6 nhân 3 = 18');
    expect(spokenMath('18 : 3 = 6')).toBe('18 chia 3 = 6');
    expect(spokenMath('12 ÷ 4')).toBe('12 chia 4');
  });

  it('keeps a colon that is not a division', () => {
    expect(spokenMath('Ghi nhớ: 2 + 3 = 5')).toBe('Ghi nhớ: 2 + 3 = 5');
  });

  it('reads a grouped number whole', () => {
    expect(spokenMath('1\u202f000 g và 12 345 678')).toBe('1000 g và 12345678');
    expect(spokenMath('Có 3 000 đồng')).toBe('Có 3000 đồng');
  });

  it('tidies the separators added between table cells', () => {
    expect(spokenMath('Đơn vị\u2063Dụng cụ\u2063\u2064 2,5 kg\u2063Cân\u2063\u2064')).toBe(
      'Đơn vị, Dụng cụ. 2,5 kg, Cân',
    );
  });
});
