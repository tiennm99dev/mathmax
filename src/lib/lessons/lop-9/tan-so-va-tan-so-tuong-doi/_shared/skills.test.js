import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, SKILLS_BAI_24, SKILLS_TRANG_43, sampleText } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 600) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** A TeX number such as '37{,}5' as a JS number. @param {string} s */
const num = (s) => Number(s.replace('{,}', '.'));

/** The items of a list such as '3; 5; 4' or '6, m, 9'. @param {string} s */
const list = (s) => s.split(/; |, /);

/** Classes '$[10; 15)$: $4$; ...' of a grouped table, as [a, b, m]. @param {string} s */
const groups = (s) =>
  [...s.matchAll(/\$\[(\d+); (\d+)\)\$: \$(\d+)\$/g)].map((m) => m.slice(1).map(Number));

/**
 * Recomputes the answer from the prompt alone.
 * @param {string} prompt
 */
function solve(prompt) {
  let m = /^Cho mẫu dữ liệu: ([\d; ]+)\. Tìm tần số của giá trị \$(\d+)\$\.$/.exec(prompt);
  if (m) return list(m[1]).filter((v) => v === m?.[2]).length;
  m =
    /^Bảng tần số của một mẫu dữ liệu: giá trị \$.+\$ có tần số lần lượt là \$(.+)\$\. Tính cỡ mẫu \$n\$\.$/.exec(
      prompt,
    );
  if (m) return list(m[1]).reduce((s, v) => s + Number(v), 0);
  m =
    /^Một mẫu dữ liệu có cỡ mẫu \$n = (\d+)\$ và bảng tần số: giá trị \$.+\$ có tần số lần lượt là \$(.+)\$\. Tìm \$m\$\.$/.exec(
      prompt,
    );
  if (m) {
    const known = list(m[2]).filter((v) => v !== 'm');
    expect(known).toHaveLength(3);
    return Number(m[1]) - known.reduce((s, v) => s + Number(v), 0);
  }
  m =
    /^Một mẫu có \$(\d+)\$ dữ liệu, trong đó giá trị \$x\$ xuất hiện \$(\d+)\$ lần\. Tính tần số tương đối/.exec(
      prompt,
    );
  if (m) return (Number(m[2]) / Number(m[1])) * 100;
  m =
    /^Một mẫu có \$(\d+)\$ dữ liệu, giá trị \$x\$ có tần số tương đối \$(.+)\\%\$\. Tìm tần số của \$x\$\.$/.exec(
      prompt,
    );
  if (m) return (num(m[2]) * Number(m[1])) / 100;
  m = /giá trị \$x\$ có tần số tương đối \$(\d+)\\%\$\. Tính góc ở tâm/.exec(prompt);
  if (m) return (Number(m[1]) / 100) * 360;
  m =
    /một mẫu gồm \$(\d+)\$ dữ liệu\. Hình quạt ứng với giá trị \$x\$ có góc ở tâm \$(\d+)\^\\circ\$/.exec(
      prompt,
    );
  if (m) return (Number(m[2]) / 360) * Number(m[1]);
  m = /^Một mẫu có \$(\d+)\$ dữ liệu, giá trị \$x\$ có tần số \$(\d+)\$\. Tính góc ở tâm/.exec(
    prompt,
  );
  if (m) return (Number(m[2]) / Number(m[1])) * 360;
  m = /^Cho mẫu số liệu: ([\d; ]+)\. Tìm tần số của nhóm \$\[(\d+); (\d+)\)\$\.$/.exec(prompt);
  if (m) {
    const [a, b] = [Number(m[2]), Number(m[3])];
    return list(m[1])
      .map(Number)
      .filter((v) => v >= a && v < b).length;
  }
  m = /^Tìm giá trị đại diện của nhóm \$\[(\d+); (\d+)\)\$\.$/.exec(prompt);
  if (m) return (Number(m[1]) + Number(m[2])) / 2;
  m =
    /^Số liệu nằm trong khoảng từ \$(\d+)\$ đến dưới \$(\d+)\$ được ghép thành các nhóm cùng độ dài \$(\d+)\$/.exec(
      prompt,
    );
  if (m) return (Number(m[2]) - Number(m[1])) / Number(m[3]);
  m = /^Bảng tần số ghép nhóm của một mẫu cỡ \$(\d+)\$: (.+)\. (.+)$/.exec(prompt);
  if (m) {
    const n = Number(m[1]);
    const rows = groups(m[2]);
    expect(rows).toHaveLength(4);
    expect(rows.reduce((s, r) => s + r[2], 0)).toBe(n);
    for (let i = 1; i < 4; i++) expect(rows[i][0]).toBe(rows[i - 1][1]);
    const q = m[3];
    let k = /^Tính tần số tương đối của nhóm \$\[(\d+); (\d+)\)\$/.exec(q);
    if (k) {
      const row = rows.find((r) => r[0] === Number(k?.[1]));
      return ((row?.[2] ?? NaN) / n) * 100;
    }
    k = /^Có bao nhiêu phần trăm dữ liệu nhỏ hơn \$(\d+)\$\?$/.exec(q);
    if (k) {
      const cut = Number(k[1]);
      return (rows.filter((r) => r[1] <= cut).reduce((s, r) => s + r[2], 0) / n) * 100;
    }
  }
  throw new Error(`unknown prompt: ${prompt}`);
}

/** Every `$...$` span of a rich text. @param {string} text */
const texSpans = (text) => [...text.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);

describe('chapter skills', () => {
  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id}: answers match a fresh solution of the prompt`, () => {
      for (const q of sample(skill)) {
        const expected = solve(q.prompt);
        expect(Math.abs(q.answer - expected), q.prompt).toBeLessThan(1e-9);
      }
    });

    it(`${skill.id}: answers are short and survive being typed back`, () => {
      for (const q of sample(skill, 300)) {
        expect(Math.round(q.answer * 10) / 10, q.prompt).toBe(q.answer);
        expect(readNumber(numberText(q.answer)), q.prompt).toBe(q.answer);
      }
    });

    it(`${skill.id}: TeX parses in strict mode`, () => {
      for (const q of sample(skill, 200)) {
        for (const text of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
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

  it('asks about a value that is in the sample', () => {
    for (const q of sample(SKILLS_TRANG_43[0])) expect(q.answer).toBeGreaterThan(0);
  });

  it('builds the practice sets from the chapter skills', () => {
    expect(CHAPTER_SKILLS).toEqual([...SKILLS_TRANG_43, ...SKILLS_BAI_24]);
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(CHAPTER_SKILLS.length);
  });

  it('writes samples the book way', () => {
    expect(sampleText([3, 5, 4])).toBe('3; 5; 4');
  });
});
