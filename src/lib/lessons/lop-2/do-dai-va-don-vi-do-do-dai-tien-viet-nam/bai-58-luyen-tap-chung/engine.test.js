import { describe, expect, it } from 'vitest';
import { optionText, questionKey, weakLabels } from '#lib/core/kid/quiz.js';
import { sumNotes } from '../_shared/money.js';
import {
  FIT_UNITS,
  KINDS,
  KIND_LABELS,
  TAPE_LABELS,
  TAPE_MAX,
  buildRound,
  moneyQuestion,
} from './engine.js';
import { rng } from '#lib/core/drill.js';

/**
 * The right option worked out again from the prompt and the picture alone.
 * @param {import('./engine.js').Question} q
 * @returns {string}
 */
function recompute(q) {
  const p = q.prompt;
  const nums = (p.match(/\d+/g) ?? []).map(Number);
  const v = q.visual;
  if (v?.type === 'tape') return `${v.at} dm`;
  if (v?.type === 'notes') return `${sumNotes(v.notes)} đồng`;
  if (v?.type === 'zigzag') return `${v.sides[0] + v.sides[1] + v.sides[2]} m`;
  if (p === '1 km = ? m') return '1000 m';
  /** @type {RegExpMatchArray | null} */
  let m;
  if ((m = p.match(/^(\d+) m = \? dm$/))) return `${Number(m[1]) * 10} dm`;
  if ((m = p.match(/^(\d+) dm = \? cm$/))) return `${Number(m[1]) * 10} cm`;
  if ((m = p.match(/^(\d+) m = \? cm$/))) return `${Number(m[1]) * 100} cm`;
  if ((m = p.match(/^(\d+) cm = \? dm$/))) return `${Number(m[1]) / 10} dm`;
  if ((m = p.match(/^(\d+) (dm|m|km) \+ \d+ \2 = \?$/))) return `${nums[0] + nums[1]} ${m[2]}`;
  if ((m = p.match(/^(\d+) (dm|m|km) − \d+ \2 = \?$/))) return `${nums[0] - nums[1]} ${m[2]}`;
  if (p.includes('Đơn vị nào')) {
    return FIT_UNITS.find((f) => p.startsWith(f.text))?.unit ?? '';
  }
  if (p.includes('đổi được')) return `${nums[1] / nums[2]} tờ`;
  if (p.includes('trả đúng giá')) return `Tờ ${nums[0]} đồng`;
  if (p.includes('Nơi tham quan')) return `${nums[0] - nums[1]} km`;
  if (p.includes('Cả hai đoạn')) return `${nums[0] + nums[1]} km`;
  if (p.includes('Sợi dây')) return `${nums[0] - nums[1]} dm`;
  return '';
}

describe('the mixed practice round', () => {
  it('asks each kind twice and every answer checks out', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const round = buildRound(seed);
      if (round.length !== 2 * KINDS.length) bad.push([seed, 'length']);
      for (const k of KINDS) {
        if (round.filter((q) => q.kind === k).length !== 2) bad.push([seed, 'kind', k]);
      }
      if (new Set(round.map(questionKey)).size !== round.length) bad.push([seed, 'repeat']);
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (texts[q.answer] !== recompute(q)) bad.push([seed, q.prompt, texts[q.answer]]);
        if (new Set(texts).size !== texts.length) bad.push([seed, 'options', q.prompt]);
        if (texts.length < 3) bad.push([seed, 'few options', q.prompt]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('never gives the answer in a hint, and solves stories fully', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      for (const q of buildRound(seed)) {
        const right = optionText(q.options[q.answer]);
        const inHint =
          q.kind === 'chon-don-vi'
            ? q.hint.split(/[\s.,]+/).includes(right)
            : q.hint.includes(right);
        if (inHint) bad.push([seed, q.hint]);
        if (q.kind === 'bai-toan' && !q.solution.includes('Đáp số:')) bad.push(q.solution);
      }
    }
    expect(bad).toEqual([]);
  });

  it('puts a wrong count on each side of the right one when swapping notes', () => {
    const bad = [];
    const rand = rng(7);
    for (let i = 0; i < 200; i++) {
      const q = moneyQuestion(rand);
      if (!q.prompt.includes('đổi được')) continue;
      const counts = q.options.map((o) => parseInt(optionText(o), 10));
      const right = counts[q.answer];
      if (Math.min(...counts) === right || Math.max(...counts) === right) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('keeps the tape and the notes drawable', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      for (const q of buildRound(seed)) {
        const v = q.visual;
        if (v?.type === 'tape') {
          if (v.at < 1 || v.at > TAPE_MAX) bad.push(['tape range', v.at]);
          if (/** @type {readonly number[]} */ (TAPE_LABELS).includes(v.at)) {
            bad.push(['tape label', v.at]);
          }
        }
        if (v?.type === 'notes' && (sumNotes(v.notes) > 1000 || v.notes.length > 3)) {
          bad.push(['notes', v.notes]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('builds the same first round on server and browser, and names weak parts', () => {
    const round = buildRound(1);
    expect(buildRound(1)).toEqual(round);
    const firstTry = round.map((q) => q.kind !== 'tien');
    expect(weakLabels(round, firstTry, KIND_LABELS)).toEqual(['Tiền Việt Nam']);
  });
});
