import { describe, expect, it } from 'vitest';
import { GROUP } from '#lib/core/number-format.js';
import { optionText } from '#lib/core/kid/quiz.js';
import {
  CUP_PUZZLES,
  EMPTY_CUPS,
  KIND_LABELS,
  buildRound,
  cupsMessage,
  cupsSolved,
  fewestCupMoves,
  idleReason,
  moveCups,
} from './engine.js';

/** @param {string} text */
const plain = (text) => text.replaceAll(GROUP, '');

/** @param {string} text */
const firstNumber = (text) => parseInt(plain(text), 10);

/** @param {readonly { kg: number }[]} loads */
const grams = (loads) => loads.reduce((sum, l) => sum + l.kg, 0);

/** Every question of `rounds` rounds, with the text of its right option. */
function allQuestions(rounds = 60) {
  const out = [];
  for (let seed = 1; seed <= rounds; seed++) {
    for (const q of buildRound(seed)) out.push({ q, right: optionText(q.options[q.answer]) });
  }
  return out;
}

describe('the round', () => {
  it('has one question of each part', () => {
    const bad = [];
    for (let seed = 1; seed <= 20; seed++) {
      const kinds = buildRound(seed).map((q) => q.kind);
      if (kinds.toSorted().join() !== Object.keys(KIND_LABELS).toSorted().join()) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('offers distinct options, the right one among them and not in the hint', () => {
    const bad = allQuestions().filter(({ q, right }) => {
      const texts = q.options.map(optionText);
      return (
        q.answer < 0 ||
        texts.length < 3 ||
        new Set(texts).size !== texts.length ||
        q.hint.includes(right) ||
        !q.solution.includes(right.replace('Túi', 'túi'))
      );
    });
    expect(bad).toEqual([]);
  });

  it('stays within the numbers up to 1 000 this grade has met', () => {
    const bad = allQuestions().filter(({ q }) => {
      const text = plain([q.prompt, q.solution, ...q.options.map(optionText)].join(' '));
      const big = (text.match(/\d+/g) ?? []).some((v) => Number(v) > 1000);
      const threeDigitTimes = (text.match(/\d+ ×/g) ?? []).some((v) => parseInt(v, 10) > 99);
      return big || threeDigitTimes;
    });
    expect(bad).toEqual([]);
  });

  it('never offers a negative or empty measure', () => {
    const bad = allQuestions().filter(({ q }) =>
      q.options.map(optionText).some((o) => o.startsWith('0 ') || o.startsWith('-')),
    );
    expect(bad).toEqual([]);
  });

  it('stores the reading the tool shows', () => {
    const bad = allQuestions().filter(({ q, right }) => {
      const v = q.visual;
      const n = firstNumber(right);
      if (v?.type === 'ruler') return n !== v.mm || v.mm > 30;
      if (v?.type === 'dial') return n !== v.g || v.g > 1000;
      if (v?.type === 'cylinder') return n !== v.ml || v.ml > 1000;
      if (v?.type === 'thermometer') return n !== v.t || v.t > 50;
      return false;
    });
    expect(bad).toEqual([]);
  });

  it('keeps every wrong reading on the tool', () => {
    const max = { ruler: 30, dial: 1000, cylinder: 1000, thermometer: 50 };
    const bad = allQuestions().filter(({ q }) => {
      const type = q.visual?.type;
      if (type !== 'ruler' && type !== 'dial' && type !== 'cylinder' && type !== 'thermometer') {
        return false;
      }
      return q.options.some((o) => firstNumber(optionText(o)) > max[type]);
    });
    expect(bad).toEqual([]);
  });

  it('stores the results the calculations give', () => {
    const bad = allQuestions().filter(({ q, right }) => {
      const n = firstNumber(right);
      const prompt = plain(q.prompt);
      if (q.kind === 'tinh') {
        const m = /^(\d+) \S+ ([+−]) (\d+) \S+ = /.exec(prompt);
        if (!m) return true;
        return n !== (m[2] === '+' ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3]));
      }
      if (q.kind === 'tinh-ba') {
        const m = /^(\d+) \S+ ([+−]) (\d+) \S+ ([+−]) (\d+) \S+ = /.exec(prompt);
        if (!m) return true;
        const [a, b, c] = [Number(m[1]), Number(m[3]), Number(m[5])];
        const middle = m[2] === '+' ? a + b : a - b;
        return middle % 10 !== 0 || n !== (m[4] === '+' ? middle + c : middle - c) || n <= 0;
      }
      if (q.kind === 'doi') {
        const kg = /^1 (kg|l) − (\d+) /.exec(prompt);
        if (kg) return n !== 1000 - Number(kg[2]);
        const mix = /^(\d+) cm (\d+) mm/.exec(prompt);
        if (mix) return n !== Number(mix[1]) * 10 + Number(mix[2]);
        const cm = /^(\d+) cm = /.exec(prompt);
        return !cm || n !== Number(cm[1]) * 10;
      }
      return false;
    });
    expect(bad).toEqual([]);
  });

  it('walks a chain of multiplying and dividing without a remainder', () => {
    const bad = allQuestions().filter(({ q, right }) => {
      const v = q.visual;
      if (v?.type !== 'chain') return false;
      let value = firstNumber(v.start);
      for (const step of v.steps) {
        const by = Number(step.sign.slice(2));
        const next = step.sign.startsWith('×') ? value * by : value / by;
        if (!Number.isInteger(next) || next > 99 || firstNumber(step.value) !== next) return true;
        value = next;
      }
      return value !== firstNumber(right) || value === firstNumber(v.start);
    });
    expect(bad).toEqual([]);
  });

  it('keeps a balance level and asks for what the weights leave', () => {
    const bad = allQuestions().filter(({ q, right }) => {
      const v = q.visual;
      if (v?.type !== 'balance') return false;
      return (
        grams(v.left) !== grams(v.right) || v.left[0].kg !== firstNumber(right) || v.left[0].kg <= 0
      );
    });
    expect(bad).toEqual([]);
  });

  it('points at the one heaviest bag the three balances prove', () => {
    const bad = allQuestions().filter(({ q, right }) => {
      const v = q.visual;
      if (v?.type !== 'bags') return false;
      const [first, second, third] = v.scales;
      /** @param {string} name @param {readonly import('#lib/core/kid/mass.js').Load[]} loads */
      const bag = (name, loads) =>
        loads.find((l) => 'name' in l && l.name === name)?.kg ?? Number.NaN;
      const a = bag('Túi A', first.right);
      const b = bag('Túi B', second.right);
      const c = bag('Túi C', third.right);
      const masses = { 'Túi A': a, 'Túi B': b, 'Túi C': c };
      const most = Math.max(a, b, c);
      const heaviest = Object.entries(masses).filter(([, g]) => g === most);
      return (
        grams(first.left) !== a ||
        grams(second.left) !== grams(second.right) ||
        heaviest.length !== 1 ||
        heaviest[0][0] !== right ||
        grams(third.left) === grams(third.right)
      );
    });
    expect(bad).toEqual([]);
  });
});

describe('the two cups', () => {
  const puzzle = { big: 500, small: 200, target: 300, work: '500 − 200 = 300 (ml).' };

  it('solves the puzzle the way the book does', () => {
    const full = moveCups(puzzle, EMPTY_CUPS, 'fill', 'big');
    expect(full).toEqual({ big: 500, small: 0 });
    const poured = moveCups(puzzle, full, 'pour', 'big');
    expect(poured).toEqual({ big: 300, small: 200 });
    expect(cupsSolved(puzzle, poured)).toBe(true);
    expect(cupsMessage(puzzle, poured)).toContain('Cốc 500 ml có đúng 300 ml');
  });

  it('pours only what the other cup still takes', () => {
    expect(moveCups(puzzle, { big: 100, small: 200 }, 'pour', 'small')).toEqual({
      big: 300,
      small: 0,
    });
    expect(moveCups(puzzle, { big: 400, small: 200 }, 'pour', 'small')).toEqual({
      big: 500,
      small: 100,
    });
  });

  it('says why a move does nothing', () => {
    expect(idleReason(puzzle, { big: 500, small: 0 }, 'fill', 'big')).toContain('đã đầy');
    expect(idleReason(puzzle, EMPTY_CUPS, 'empty', 'small')).toContain('chưa có nước');
    expect(idleReason(puzzle, EMPTY_CUPS, 'pour', 'big')).toContain('chưa có nước');
    expect(idleReason(puzzle, { big: 500, small: 200 }, 'pour', 'big')).toContain('Cốc kia');
    expect(idleReason(puzzle, { big: 500, small: 0 }, 'pour', 'big')).toBeNull();
  });

  it('gives puzzles that take a few moves and start unsolved', () => {
    const moves = CUP_PUZZLES.map(fewestCupMoves);
    expect(moves.every((n) => n !== null && n >= 2)).toBe(true);
    expect(moves).toEqual([2, 2, 4, 2, 4, 4]);
  });
});
