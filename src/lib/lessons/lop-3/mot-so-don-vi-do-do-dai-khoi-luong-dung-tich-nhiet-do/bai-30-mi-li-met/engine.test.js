import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import { optionText } from '#lib/core/kid/quiz.js';
import {
  FIRST_TASK,
  KIND_LABELS,
  buildRound,
  makeTask,
  readingText,
  stretchMessage,
  taskText,
} from './engine.js';

describe('the strip on the zoomed ruler', () => {
  it('asks for a length and says how far off the strip is', () => {
    expect(taskText(FIRST_TASK)).toBe('Kéo băng màu dài đúng 1 cm');
    expect(taskText({ mm: 25, asCm: false })).toBe('Kéo băng màu dài đúng 25 mm');
    expect(stretchMessage(FIRST_TASK, 10)).toBe('Đúng rồi! 1 cm = 10 mm.');
    expect(stretchMessage(FIRST_TASK, 7)).toContain('Băng dài 7 mm. Còn ngắn hơn 1 cm');
    expect(stretchMessage(FIRST_TASK, 12)).toContain('Dài hơn 1 cm');
    expect(stretchMessage({ mm: 20, asCm: false }, 20)).toContain('tức là 2 cm');
    expect(stretchMessage({ mm: 25, asCm: false }, 25)).toBe('Đúng rồi! Băng dài 25 mm.');
  });

  it('makes tasks the ruler can show, different from the one on screen', () => {
    const rand = rng(30);
    const bad = [];
    for (let i = 0; i < 100; i++) {
      const t = makeTask(rand, FIRST_TASK);
      const off = t.mm < 3 || t.mm > 30 || (t.asCm && t.mm % 10 !== 0);
      if (off || (t.mm === FIRST_TASK.mm && t.asCm === FIRST_TASK.asCm)) bad.push(t);
    }
    expect(bad).toEqual([]);
  });
});

describe('the practice round', () => {
  it('explains a reading from the marks', () => {
    expect(readingText(7)).toBe('Băng đi qua 7 khoảng nhỏ, tức là 7 mm.');
    expect(readingText(20)).toBe('Băng đến vạch số 2. 2 cm = 20 mm.');
    expect(readingText(25)).toBe('Vạch số 2 là 20 mm, thêm 5 khoảng nhỏ nữa là 25 mm.');
  });

  it('holds eight sound questions on every seed', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const round = buildRound(seed);
      if (round.length !== 8) bad.push(seed);
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (
          !q.kind ||
          !(q.kind in KIND_LABELS) ||
          q.answer < 0 ||
          new Set(texts).size !== texts.length ||
          texts.length < 2 ||
          q.hint.includes(texts[q.answer])
        ) {
          bad.push({ seed, q });
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps every stored answer right', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]).replaceAll(GROUP, '');
        const n = parseInt(right, 10);
        if (q.visual && n !== q.visual.mm) bad.push(q);
        const toMm = /^(\d) cm bằng/.exec(q.prompt);
        if (toMm && n !== Number(toMm[1]) * 10) bad.push(q);
        const toCm = /^(\d+) mm bằng/.exec(q.prompt);
        if (toCm && n !== Number(toCm[1]) / 10) bad.push(q);
        const sum = /^(\d+) mm ([+−]) (\d+) mm/.exec(q.prompt);
        if (sum) {
          const [a, b] = [Number(sum[1]), Number(sum[3])];
          if (n !== (sum[2] === '+' ? a + b : a - b)) bad.push(q);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
