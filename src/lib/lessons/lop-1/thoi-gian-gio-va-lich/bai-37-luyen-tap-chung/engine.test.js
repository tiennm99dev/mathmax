import { describe, expect, it } from 'vitest';
import { WEEKDAYS } from '../_shared/time.js';
import { KINDS, buildRound, weakKinds } from './engine.js';

const TITLES = WEEKDAYS.map((d) => d.charAt(0).toUpperCase() + d.slice(1));

/** Routine words and the hour each happens at, written out by hand. */
const ROUTINE_TIMES = {
  'thức dậy': '6 giờ sáng',
  'vào lớp học': '7 giờ sáng',
  'ăn trưa': '11 giờ trưa',
  'đi học về': '5 giờ chiều',
  'ăn tối': '7 giờ tối',
  'đi ngủ': '9 giờ tối',
};

const FACT_ANSWERS = {
  'Một tuần có mấy ngày?': '7 ngày',
  'Kim dài của đồng hồ là kim gì?': 'Kim phút',
  'Ngày nào đứng ngay sau Chủ nhật?': 'Thứ Hai',
  'Giờ đúng thì kim dài chỉ số mấy?': 'Số 12',
};

/**
 * The right option worked out from the question's picture and words,
 * independently of the maker.
 * @param {import('./engine.js').Question} q
 * @returns {string | undefined}
 */
function expected(q) {
  const s = q.scene;
  if (q.kind === 'read' && s?.type === 'clock') return `${s.hour} giờ`;
  if (q.kind === 'hands') {
    const m = /^Lúc (\d+) giờ, kim (dài|ngắn)/.exec(q.prompt);
    if (!m) return undefined;
    return m[2] === 'dài' ? 'Số 12' : `Số ${m[1]}`;
  }
  if (q.kind === 'week') {
    const m = /^Hôm nay là (.+)\. (Ngày mai|Hôm qua) là/.exec(q.prompt);
    if (!m) return undefined;
    const i = WEEKDAYS.indexOf(/** @type {(typeof WEEKDAYS)[number]} */ (m[1]));
    return TITLES[(i + (m[2] === 'Ngày mai' ? 1 : 6)) % 7];
  }
  if (q.kind === 'sheet' && s?.type === 'sheet') {
    return q.prompt.includes('thứ mấy') ? TITLES[s.weekday] : `Ngày ${s.date + 1}`;
  }
  if (q.kind === 'routine') {
    const m = /^Nam (.+)\. Đồng hồ/.exec(q.prompt);
    return m ? ROUTINE_TIMES[/** @type {keyof typeof ROUTINE_TIMES} */ (m[1])] : undefined;
  }
  return FACT_ANSWERS[/** @type {keyof typeof FACT_ANSWERS} */ (q.prompt)];
}

describe('chapter practice round', () => {
  it('asks every kind twice', () => {
    const round = buildRound(1);
    expect(round).toHaveLength(KINDS.length * 2);
    for (const k of KINDS) expect(round.filter((q) => q.kind === k)).toHaveLength(2);
  });

  it('marks the right option and offers distinct options, over many seeds', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const right = q.options[q.answer];
        const want = expected(q);
        if (right !== want) bad.push({ seed, prompt: q.prompt, right, want });
        if (new Set(q.options).size !== q.options.length || q.options.length < 2)
          bad.push({ seed, prompt: q.prompt, options: q.options });
      }
    }
    expect(bad).toEqual([]);
  });

  it('shows a clock whose hour hand matches the routine', () => {
    const bad = [];
    for (let seed = 1; seed <= 20; seed++) {
      for (const q of buildRound(seed)) {
        if (q.kind !== 'routine') continue;
        const s = q.scene;
        const said = Number(/^(\d+)/.exec(q.options[q.answer])?.[1]);
        if (s?.type !== 'clock' || (s.hour % 12 || 12) !== said) bad.push({ seed, q });
      }
    }
    expect(bad).toEqual([]);
  });

  it('is the same for the same seed and lists the missed kinds', () => {
    expect(buildRound(3)).toEqual(buildRound(3));
    const round = buildRound(2);
    const firstTry = round.map((_, i) => i !== 0);
    expect(weakKinds(round, firstTry)).toHaveLength(1);
  });
});
