import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { countOrProbabilityText, readProbability } from '#lib/core/fractions.js';
import { readNatural } from '#lib/core/number-format.js';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, PRACTICE_SKILLS, coinWords, pairs, pairsText } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 600) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

const FACES = [1, 2, 3, 4, 5, 6];

/**
 * Two dice events, recognised from the prompt wording alone.
 * @param {string} phrase
 * @returns {(i: number, j: number) => boolean}
 */
function diceTest(phrase) {
  let m = /^"Tổng số chấm xuất hiện bằng \$(\d+)\$"$/.exec(phrase);
  if (m) return (i, j) => i + j === Number(m?.[1]);
  m = /^"Tổng số chấm xuất hiện lớn hơn \$(\d+)\$"$/.exec(phrase);
  if (m) return (i, j) => i + j > Number(m?.[1]);
  m = /^"Hai số chấm xuất hiện hơn kém nhau \$(\d+)\$"$/.exec(phrase);
  if (m) return (i, j) => Math.abs(i - j) === Number(m?.[1]);
  m = /^"Cả hai con xúc xắc đều xuất hiện số chấm lớn hơn \$(\d+)\$"$/.exec(phrase);
  if (m) return (i, j) => Math.min(i, j) > Number(m?.[1]);
  if (phrase === '"Hai con xúc xắc xuất hiện số chấm bằng nhau"') return (i, j) => i === j;
  if (phrase === '"Tích hai số chấm là số lẻ"') return (i, j) => i % 2 === 1 && j % 2 === 1;
  if (phrase === '"Có ít nhất một con xúc xắc xuất hiện mặt $1$ chấm"')
    return (i, j) => i === 1 || j === 1;
  throw new Error(`unknown dice event: ${phrase}`);
}

/** @param {(i: number, j: number) => boolean} test */
const diceCount = (test) => FACES.flatMap((i) => FACES.filter((j) => test(i, j))).length;

/**
 * Recomputes the answer from the prompt alone, by brute force.
 * @param {string} p
 */
function solve(p) {
  let m = /^Tung một đồng xu \$(\d)\$ lần liên tiếp\. Không gian mẫu/.exec(p);
  if (m) return 2 ** Number(m[1]);
  m =
    /^Hộp có \$(\d)\$ tấm thẻ ghi các số từ \$1\$ đến \$\d\$\. Rút ngẫu nhiên lần lượt hai tấm thẻ, thẻ rút ra lần đầu (được trả lại|không trả lại) hộp\. (.+)$/.exec(
      p,
    );
  if (m) {
    const k = Number(m[1]);
    const back = m[2] === 'được trả lại';
    const all = [];
    for (let a = 1; a <= k; a++) for (let b = 1; b <= k; b++) if (back || a !== b) all.push([a, b]);
    const ask = m[3];
    if (ask === 'Không gian mẫu có bao nhiêu phần tử?') return all.length;
    expect(back).toBe(false);
    let e = /^Tính xác suất của biến cố "Tổng hai số ghi trên hai thẻ là số (chẵn|lẻ)"\.$/.exec(
      ask,
    );
    /** @type {(a: number, b: number) => boolean} */
    let test;
    if (e) {
      const want = e[1] === 'chẵn' ? 0 : 1;
      test = (a, b) => (a + b) % 2 === want;
    } else if (ask.includes('"Số ghi trên thẻ thứ nhất lớn hơn số ghi trên thẻ thứ hai"')) {
      test = (a, b) => a > b;
    } else if ((e = /"Có một thẻ ghi số \$(\d)\$"/.exec(ask))) {
      const c = Number(e[1]);
      test = (a, b) => a === c || b === c;
    } else if ((e = /"Tổng hai số ghi trên hai thẻ bằng \$(\d+)\$"/.exec(ask))) {
      const t = Number(e[1]);
      test = (a, b) => a + b === t;
    } else throw new Error(`unknown card event: ${ask}`);
    return all.filter(([a, b]) => test(a, b)).length / all.length;
  }
  m = /^Tổ có \$(\d+)\$ bạn\. .+ Không gian mẫu có bao nhiêu phần tử\?$/.exec(p);
  if (m) return Number(m[1]) * (Number(m[1]) - 1);
  m = /^Hộp thứ nhất có \$(\d)\$ viên bi, hộp thứ hai có \$(\d)\$ viên bi/.exec(p);
  if (m) return Number(m[1]) * Number(m[2]);
  m = /^Gieo đồng thời hai con xúc xắc\. Có bao nhiêu kết quả thuận lợi cho biến cố (.+)\?$/.exec(
    p,
  );
  if (m) return diceCount(diceTest(m[1]));
  m = /^Gieo đồng thời hai con xúc xắc cân đối\. Tính xác suất của biến cố (.+)\.$/.exec(p);
  if (m) return diceCount(diceTest(m[1])) / 36;
  m = /^Tung một đồng xu cân đối \$(\d)\$ lần liên tiếp\. Tính xác suất của biến cố "(.+)"\.$/.exec(
    p,
  );
  if (m) {
    const k = Number(m[1]);
    const ask = m[2];
    /** @type {string[]} */
    let words = [''];
    for (let t = 0; t < k; t++) words = words.flatMap((w) => [`${w}S`, `${w}N`]);
    const e = /^Có đúng \$(\d)\$ lần xuất hiện mặt sấp$/.exec(ask);
    /** @type {(w: string) => boolean} */
    let test;
    if (e) test = (w) => w.split('S').length - 1 === Number(e[1]);
    else if (ask === 'Có ít nhất một lần xuất hiện mặt ngửa') test = (w) => w.includes('N');
    else if (ask === 'Lần tung đầu tiên và lần tung cuối cùng xuất hiện cùng một mặt')
      test = (w) => w.at(0) === w.at(-1);
    else throw new Error(`unknown coin event: ${ask}`);
    return words.filter(test).length / words.length;
  }
  m =
    /^Gieo một con xúc xắc và tung một đồng xu, cả hai đều cân đối\. Tính xác suất của biến cố "Xúc xắc có (.+) và đồng xu xuất hiện mặt (sấp|ngửa)"\.$/.exec(
      p,
    );
  if (m) {
    const ask = m[1];
    /** @type {(d: number) => boolean} */
    let test;
    const gt = /^số chấm lớn hơn \$(\d)\$$/.exec(ask);
    if (ask === 'số chấm là số chẵn') test = (d) => d % 2 === 0;
    else if (ask === 'số chấm là số lẻ') test = (d) => d % 2 === 1;
    else if (ask === 'số chấm là số nguyên tố') test = (d) => [2, 3, 5].includes(d);
    else if (gt) test = (d) => d > Number(gt[1]);
    else throw new Error(`unknown die event: ${ask}`);
    // One face of the coin out of two, for each favourable face of the die.
    return FACES.filter(test).length / 12;
  }
  m =
    /^Tổ có \$(\d)\$ bạn: (.+)\. Chọn ngẫu nhiên một bạn làm tổ trưởng, rồi chọn ngẫu nhiên một bạn khác làm tổ phó\. Tính xác suất của biến cố "(.+)"\.$/.exec(
      p,
    );
  if (m) {
    const team = m[2].split(', ');
    expect(team).toHaveLength(Number(m[1]));
    const all = team.flatMap((a) => team.filter((b) => b !== a).map((b) => [a, b]));
    const ask = m[3];
    let e = /^(\S+) được chọn$/.exec(ask);
    if (e) return all.filter((x) => x.includes(e?.[1] ?? '')).length / all.length;
    e = /^(\S+) làm tổ trưởng$/.exec(ask);
    if (e) return all.filter((x) => x[0] === e?.[1]).length / all.length;
    e = /^Cả (\S+) và (\S+) đều được chọn$/.exec(ask);
    if (e) {
      const [, a, b] = e;
      expect(a).not.toBe(b);
      return all.filter((x) => x.includes(a) && x.includes(b)).length / all.length;
    }
    throw new Error(`unknown team event: ${ask}`);
  }
  throw new Error(`unknown prompt: ${p}`);
}

/** Every `$...$` span of a rich text. @param {string} text */
const texSpans = (text) => [...text.matchAll(/\$([^$]+)\$/g)].map((x) => x[1]);

describe('chapter skills', () => {
  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id}: answers match a brute-force solution of the prompt`, () => {
      for (const q of sample(skill)) {
        expect(Math.abs(q.answer - solve(q.prompt)), q.prompt).toBeLessThan(1e-12);
      }
    });

    it(`${skill.id}: answers survive being typed back`, () => {
      for (const q of sample(skill, 300)) {
        const typed = countOrProbabilityText(q.answer);
        const read = q.read ?? readProbability;
        expect(read(typed), `${q.prompt} → ${typed}`).toBe(q.answer);
        expect(q.answer).toBeGreaterThan(0);
        if (!Number.isInteger(q.answer)) expect(q.answer).toBeLessThan(1);
      }
    });

    it(`${skill.id}: TeX parses in strict mode`, () => {
      for (const q of sample(skill, 200)) {
        for (const text of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
          expect(text.split('$').length % 2, text).toBe(1);
          for (const tex of texSpans(text)) {
            expect(
              () => katex.renderToString(tex, { strict: 'error', throwOnError: true }),
              tex,
            ).not.toThrow();
          }
        }
      }
    });
  }

  it('reads counts as natural numbers and probabilities as fractions', () => {
    const r = rng(5);
    const count = CHAPTER_SKILLS[0].make(r);
    expect(count.read).toBe(readNatural);
    expect(readProbability('2/6')).toBe(1 / 3);
  });

  it('has distinct skill ids and builds the review from the practice set', () => {
    expect(CHAPTER_SKILLS.slice(0, PRACTICE_SKILLS.length)).toEqual(PRACTICE_SKILLS);
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(CHAPTER_SKILLS.length);
  });

  it('lists outcomes the book way', () => {
    expect(pairs(3, true)).toHaveLength(6);
    expect(pairs(3, false)).toHaveLength(9);
    expect(coinWords(2)).toEqual(['SS', 'SN', 'NS', 'NN']);
    expect(
      pairsText([
        [1, 6],
        [2, 'S'],
      ]),
    ).toBe('(1, 6); (2, S)');
  });
});
