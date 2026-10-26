import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, fracText, probabilityText, ratioText, readProbability } from './skills.js';

/** @param {string} s */
const n = (s) => Number(s);

/** @param {number} k */
const prime = (k) => {
  if (k < 2) return false;
  for (let d = 2; d < k; d++) if (k % d === 0) return false;
  return true;
};

/**
 * Re-reads a condition phrase without the generator's code.
 * @param {string} phrase
 * @returns {(k: number) => boolean}
 */
function readCondition(phrase) {
  /** @type {RegExpExecArray | null} */
  let m;
  if (phrase === 'là số chẵn') return (k) => k % 2 === 0;
  if (phrase === 'là số lẻ') return (k) => k % 2 !== 0;
  if (phrase === 'là số nguyên tố') return prime;
  if ((m = /^chia hết cho (\d+)$/.exec(phrase))) {
    const d = n(m[1]);
    return (k) => k % d === 0;
  }
  if ((m = /^nhỏ hơn (\d+)$/.exec(phrase))) {
    const t = n(m[1]);
    return (k) => k < t;
  }
  if ((m = /^lớn hơn (\d+)$/.exec(phrase))) {
    const t = n(m[1]);
    return (k) => k > t;
  }
  throw new Error(`unknown condition: ${phrase}`);
}

/**
 * The possible outcomes named in a prompt.
 * @param {string} prompt
 */
function outcomes(prompt) {
  if (prompt.startsWith('Gieo một con xúc xắc')) return [1, 2, 3, 4, 5, 6];
  const m = /tấm thẻ ghi các số ([\d; ]+)\. Rút/.exec(prompt);
  if (!m) throw new Error(`no outcomes in: ${prompt}`);
  return m[1].split('; ').map(n);
}

/**
 * Recomputes a question's answer from its prompt alone.
 * @param {string} prompt
 * @returns {number}
 */
function recompute(prompt) {
  /** @type {RegExpExecArray | null} */
  let m;
  if (
    (m =
      /Có bao nhiêu kết quả có thể làm cho biến cố "(?:Số chấm xuất hiện|Số ghi trên thẻ) (.+)" xảy ra\?$/.exec(
        prompt,
      ))
  )
    return outcomes(prompt).filter(readCondition(m[1])).length;
  if (
    (m =
      /Xét các biến cố (.*)\. Có bao nhiêu biến cố (chắc chắn|không thể|ngẫu nhiên) trong bốn/.exec(
        prompt,
      ))
  ) {
    const values = outcomes(prompt);
    const target = m[2];
    const events = m[1].split('; ').filter((x) => /^[A-D]: /.test(x));
    expect(events).toHaveLength(4);
    return events
      .map((e) => {
        const phrase = /"(?:Số chấm xuất hiện|Số ghi trên thẻ) (.+)"$/.exec(e);
        if (!phrase) throw new Error(e);
        const hit = values.filter(readCondition(phrase[1])).length;
        return hit === values.length ? 'chắc chắn' : hit === 0 ? 'không thể' : 'ngẫu nhiên';
      })
      .filter((k) => k === target).length;
  }
  if (
    (m = /có (\d+) viên bi đỏ, (\d+) viên bi xanh và (\d+) viên bi vàng.*màu (đỏ|xanh|vàng)"/.exec(
      prompt,
    ))
  ) {
    const c = [n(m[1]), n(m[2]), n(m[3])];
    return c[['đỏ', 'xanh', 'vàng'].indexOf(m[4])] / (c[0] + c[1] + c[2]);
  }
  if ((m = /chia thành (\d+) ô bằng nhau.*số lớn hơn (\d+)"/.exec(prompt)))
    return (n(m[1]) - n(m[2])) / n(m[1]);
  if (
    (m = /Tính xác suất của biến cố "(?:Số chấm xuất hiện|Số ghi trên thẻ) (.+)" \(/.exec(prompt))
  ) {
    const values = outcomes(prompt);
    return values.filter(readCondition(m[1])).length / values.length;
  }
  throw new Error(`unrecognised prompt: ${prompt}`);
}

describe('chapter skills', () => {
  it('store answers that match their prompts', () => {
    for (let seed = 1; seed <= 300; seed++) {
      for (const q of buildSet(CHAPTER_SKILLS, 3, seed)) {
        expect(q.answer, q.prompt).toBe(recompute(q.prompt));
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.hints?.length).toBeGreaterThan(0);
      }
    }
  });

  it('keep probabilities between 0 and 1', () => {
    for (let seed = 1; seed <= 100; seed++) {
      for (const q of buildSet([CHAPTER_SKILLS[1]], 5, seed)) {
        expect(q.answer).toBeLessThanOrEqual(1);
      }
    }
  });

  it('never print a hint that states the answer of a count question', () => {
    const rand = rng(7);
    for (let k = 0; k < 200; k++) {
      const q = CHAPTER_SKILLS[0].make(rand);
      for (const h of q.hints ?? []) expect(h).not.toMatch(/^Có \d+ kết quả\.$/);
    }
  });

  it('use every outcome kind across many questions', () => {
    const seen = new Set();
    for (let seed = 1; seed <= 200; seed++)
      for (const q of buildSet([CHAPTER_SKILLS[1]], 4, seed))
        seen.add(q.answer === 0 ? 0 : q.answer === 1 ? 1 : 'p');
    expect(seen).toEqual(new Set([0, 1, 'p']));
  });
});

describe('probability text', () => {
  it('writes fractions in lowest terms', () => {
    expect(fracText(2, 6)).toBe('1/3');
    expect(fracText(0, 5)).toBe('0');
    expect(fracText(6, 6)).toBe('1');
    expect(ratioText(2, 6)).toBe('2/6 = 1/3');
    expect(ratioText(3, 8)).toBe('3/8');
    expect(probabilityText(2 / 6)).toBe('1/3');
    expect(probabilityText(7 / 19)).toBe('7/19');
  });

  it('reads fractions, whole numbers and decimals', () => {
    expect(readProbability('2/6')).toBe(1 / 3);
    expect(readProbability(' 1 / 3 ')).toBe(1 / 3);
    expect(readProbability('0,4')).toBe(2 / 5);
    expect(readProbability('0.25')).toBe(1 / 4);
    expect(readProbability('1')).toBe(1);
    expect(readProbability('0')).toBe(0);
    expect(readProbability('1/0')).toBeNull();
    expect(readProbability('một nửa')).toBeNull();
    expect(readProbability('')).toBeNull();
  });
});
