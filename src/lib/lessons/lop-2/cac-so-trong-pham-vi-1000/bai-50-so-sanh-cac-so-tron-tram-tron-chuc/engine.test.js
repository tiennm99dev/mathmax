import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { FIRST_PAIR, freshPair, signNote, valueOf } from './engine.js';

describe('the numbers on each side', () => {
  it('reads a number from its flats and rods', () => {
    expect(valueOf({ hundreds: 3, tens: 0 })).toBe(300);
    expect(valueOf({ hundreds: 1, tens: 5 })).toBe(150);
    expect(valueOf(FIRST_PAIR.tram.left)).toBe(300);
    expect(valueOf(FIRST_PAIR.chuc.right)).toBe(150);
  });
});

describe('new pairs', () => {
  it('makes two different round hundreds', () => {
    const rand = rng(7);
    const bad = [];
    let pair = FIRST_PAIR.tram;
    for (let i = 0; i < 100; i++) {
      pair = freshPair('tram', pair, rand);
      if (valueOf(pair.left) === valueOf(pair.right)) bad.push(pair);
      if (pair.left.tens !== 0 || pair.right.tens !== 0) bad.push(pair);
    }
    expect(bad).toEqual([]);
  });

  it('makes round tens inside the steppers, with some sharing their hundreds', () => {
    const rand = rng(11);
    const bad = [];
    let shared = 0;
    let pair = FIRST_PAIR.chuc;
    for (let i = 0; i < 100; i++) {
      pair = freshPair('chuc', pair, rand);
      if (valueOf(pair.left) === valueOf(pair.right)) bad.push(pair);
      if (pair.left.hundreds < 1 || pair.right.hundreds > 9) bad.push(pair);
      if (pair.left.hundreds === pair.right.hundreds) shared += 1;
    }
    expect(bad).toEqual([]);
    expect(shared).toBeGreaterThan(10);
  });
});

describe('judging the sign', () => {
  const pair = { left: { hundreds: 7, tens: 0 }, right: { hundreds: 9, tens: 0 } };

  it('waits for a sign', () => {
    expect(signNote(pair, null).tone).toBe('info');
  });

  it('gives the reason for the right sign', () => {
    expect(signNote(pair, '<')).toEqual({
      tone: 'ok',
      text: 'Đúng rồi! 7 trăm bé hơn 9 trăm. Vậy 700 < 900.',
    });
  });

  it('points to the deciding place without giving the sign', () => {
    expect(signNote(pair, '>').text).toContain('số tấm trăm');
    const sameHundreds = { left: { hundreds: 2, tens: 3 }, right: { hundreds: 2, tens: 6 } };
    expect(signNote(sameHundreds, '=').text).toContain('số thanh chục');
    expect(signNote(sameHundreds, '<').text).toContain('6 chục');
  });

  it('accepts equal numbers', () => {
    const same = { left: { hundreds: 4, tens: 0 }, right: { hundreds: 4, tens: 0 } };
    expect(signNote(same, '=').tone).toBe('ok');
    const wrong = signNote(same, '>');
    expect(wrong.tone).toBe('warn');
    expect(wrong.text).not.toContain('thanh chục');
  });
});
