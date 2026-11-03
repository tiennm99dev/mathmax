import { describe, expect, it } from 'vitest';
import {
  ITEMS,
  ROUNDS,
  TOOLS,
  gameSummary,
  makeGame,
  readOptions,
  slipMessage,
  stepMessage,
  toolOf,
} from './engine.js';

describe('the measuring room', () => {
  it('gives every game one item for each tool', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const game = makeGame(seed);
      const tools = new Set(game.map((item) => item.tool));
      if (game.length !== ROUNDS || tools.size !== TOOLS.length) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('keeps every item on the marks of its tool', () => {
    const bad = ITEMS.filter(({ tool, value }) => {
      if (tool === 'ruler') return value < 1 || value > 30;
      if (tool === 'thermometer') return value < 0 || value > 50;
      return value % 50 !== 0 || value > 1000;
    });
    expect(bad).toEqual([]);
  });

  it('offers readings that hold the right one once', () => {
    const bad = ITEMS.filter((item) => {
      const { options, answer } = readOptions(item);
      return (
        options[answer] !== toolOf(item.tool).write(item.value) ||
        new Set(options).size !== options.length ||
        options.length < 3
      );
    });
    expect(bad).toEqual([]);
  });

  it('explains each step', () => {
    const item = ITEMS[0];
    expect(slipMessage('tool', item)).toContain('chiều dài chiếc kẹp giấy');
    expect(slipMessage('unit', item)).toContain('Thước kẻ đo độ dài');
    expect(slipMessage('read', item)).toContain('vạch');
    expect(stepMessage('tool', item)).toContain('chọn đơn vị');
    expect(stepMessage('unit', item)).toContain('mi-li-mét, viết là mm');
    expect(stepMessage('read', item)).toBe('Đúng rồi! Chiều dài chiếc kẹp giấy là 28 mm.');
  });

  it('sums up the stars', () => {
    expect(gameSummary(12)).toContain('cả 12 sao');
    expect(gameSummary(7)).toContain('7 trong 12 sao');
  });
});
