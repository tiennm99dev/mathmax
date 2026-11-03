import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { KIND_LABELS, SCENES, buildRound, degWords, sceneMessage } from './engine.js';

const fever = /** @type {import('./engine.js').Scene} */ (SCENES.find((s) => s.id === 'fever'));

describe('the thermometer and its situations', () => {
  it('tells which way to drag the column', () => {
    expect(sceneMessage(fever, 30)).toContain('thấp hơn 39 °C');
    expect(sceneMessage(fever, 45)).toContain('cao hơn 39 °C');
    expect(sceneMessage(fever, 39)).toContain('Đúng rồi!');
  });

  it('keeps every situation on the scale', () => {
    expect(SCENES.filter((s) => s.t < 0 || s.t > 50)).toEqual([]);
  });

  it('keeps a place name capitalised in the solution', () => {
    const sapa = /** @type {import('./engine.js').Scene} */ (SCENES.find((s) => s.id === 'sapa'));
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildRound(seed)) {
        if (q.solution.includes(sapa.name.toLowerCase())) bad.push(q);
      }
    }
    expect(bad).toEqual([]);
  });

  it('says a reading the way the book does', () => {
    expect(degWords(25)).toBe('Hai mươi lăm độ C');
    expect(degWords(41)).toBe('Bốn mươi mốt độ C');
  });
});

describe('the practice round', () => {
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
        const right = optionText(q.options[q.answer]);
        if (q.kind === 'read' && right !== `${q.visual?.t} °C`) bad.push(q);
        if (q.kind === 'fever' && parseInt(right.split(': ')[1], 10) <= 37) bad.push(q);
        if (q.kind === 'scene') {
          const s = SCENES.find((c) => c.name === right);
          if (s?.t !== q.visual?.t) bad.push(q);
        }
        if (q.kind === 'compare') {
          const m = /^(.+): (\d+) °C\. (.+): (\d+) °C\. Nơi nào (nóng|lạnh)/.exec(q.prompt);
          if (!m) {
            bad.push(q);
            continue;
          }
          const hotter = Number(m[2]) > Number(m[4]) ? m[1] : m[3];
          const colder = hotter === m[1] ? m[3] : m[1];
          if (right !== (m[5] === 'nóng' ? hotter : colder)) bad.push(q);
        }
        if (q.kind === 'day') {
          const temps = [...q.prompt.matchAll(/(buổi \S+) (\d+) °C/g)].map((m) => ({
            name: m[1],
            t: Number(m[2]),
          }));
          const sorted = [...temps].sort((a, b) => a.t - b.t);
          const want = q.prompt.includes('cao nhất') ? sorted[2] : sorted[0];
          if (right.toLowerCase() !== want.name) bad.push(q);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
