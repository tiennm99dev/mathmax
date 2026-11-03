import { describe, expect, it } from 'vitest';
import {
  applyOp,
  leftToRightSlip,
  nextOp,
  parse,
  partsOf,
  ruleFor,
  textOf,
  valueOf,
  workLines,
  workText,
} from './expression.js';

describe('working an expression', () => {
  it('reads and writes it back', () => {
    expect(textOf(parse('8 × (11 − 6)'))).toBe('8 × (11 − 6)');
    expect(textOf(parse('(15 + 5) : 5'))).toBe('(15 + 5) : 5');
  });

  it('goes from left to right among operations of one kind', () => {
    expect(workLines('27 − 7 + 30')).toEqual(['27 − 7 + 30', '20 + 30', '50']);
    expect(workLines('30 : 5 × 2')).toEqual(['30 : 5 × 2', '6 × 2', '12']);
  });

  it('multiplies and divides before adding and subtracting', () => {
    expect(workText('24 + 5 × 6')).toBe('24 + 5 × 6 = 24 + 30 = 54');
    expect(valueOf('30 − 18 : 3')).toBe(24);
  });

  it('starts inside the brackets, wherever they stand', () => {
    expect(workText('45 : (5 + 4)')).toBe('45 : (5 + 4) = 45 : 9 = 5');
    expect(workText('(15 + 5) : 5')).toBe('(15 + 5) : 5 = 20 : 5 = 4');
    expect(valueOf('42 − (42 − 5)')).toBe(5);
  });

  it('names the rule a wrong tap broke', () => {
    const left = parse('27 − 7 + 30');
    expect(ruleFor(left, 3)).toContain('từ trái sang phải');
    const mixed = parse('24 + 5 × 6');
    expect(ruleFor(mixed, 1)).toContain('nhân, phép chia trước');
    const brackets = parse('8 × (11 − 6)');
    expect(ruleFor(brackets, 1)).toContain('trong ngoặc trước');
  });

  it('keeps the new number’s id and drops brackets around it', () => {
    const tokens = parse('8 × (11 − 6)');
    const i = nextOp(tokens);
    expect(partsOf(tokens, i).value).toBe(5);
    const after = applyOp(tokens, i, 9);
    expect(textOf(after)).toBe('8 × 5');
    expect(after[2]).toEqual({ k: 'num', id: 9, v: 5 });
    expect(nextOp(parse('54'))).toBe(-1);
  });

  it('knows the slip of ignoring the order', () => {
    expect(leftToRightSlip('24 + 5 × 6')).toBe(174);
    expect(leftToRightSlip('8 × (11 − 6)')).toBe(82);
  });
});
