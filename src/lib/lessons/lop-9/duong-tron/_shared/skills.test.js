import { describe, it, expect } from 'vitest';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { buildSet, hintsFor, rng } from '#lib/core/drill.js';
import { piText } from './pi-text.js';
import { CHAPTER_SKILLS, SKILLS_TRANG_108, SKILLS_TRANG_96, rounded } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 600) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

const num = (/** @type {string} */ s) => /** @type {number} */ (readNumber(s));

/** Reads 'kπ' text back as k: '7π/6' → 7/6, 'π' → 1, '2,4π' → 2,4. */
function piValue(/** @type {string} */ s) {
  const m = /^([\d,]*)π(?:\/(\d+))?$/.exec(s);
  if (!m) throw new Error(s);
  return (m[1] ? num(m[1]) : 1) / (m[2] ? Number(m[2]) : 1);
}

/**
 * Recomputes a question's answer from its prompt alone, independently of the
 * generators: the exact value and the rounding step (0 for exact answers).
 * @param {string} p
 * @returns {{ value: number, step: number }}
 */
function solve(p) {
  let m = /^Hình chữ nhật ABCD có AB = (\d+) cm, BC = (\d+) cm/.exec(p);
  if (m) return { value: Math.hypot(+m[1], +m[2]) / 2, step: 0 };
  m = /^Tam giác DEF vuông tại D có DE = (\d+) cm, DF = (\d+) cm/.exec(p);
  if (m) return { value: Math.hypot(+m[1], +m[2]) / 2, step: 0 };
  m =
    /^Cho đường tròn \(O; (\d+) cm\) và năm điểm A, B, C, D, E với (.+) \(cm\)\. Có bao nhiêu điểm (nằm bên trong|nằm trên|nằm bên ngoài)/.exec(
      p,
    );
  if (m) {
    const r = +m[1];
    const ds = [...m[2].matchAll(/O[A-E] = (\d+(?:,\d+)?)/g)].map((x) => num(x[1]));
    expect(ds).toHaveLength(5);
    const test = {
      'nằm bên trong': (/** @type {number} */ d) => d < r,
      'nằm trên': (/** @type {number} */ d) => d === r,
      'nằm bên ngoài': (/** @type {number} */ d) => d > r,
    }[m[3]];
    return { value: ds.filter((d) => test?.(d)).length, step: 0 };
  }
  m = /OA = (\d+) cm\. Đoạn thẳng OA cắt đường tròn tại B, AB = (\d+) cm/.exec(p);
  if (m) return { value: +m[1] - +m[2], step: 0 };
  m = /^Góc ở tâm AOB bằng (\d+)°\. Tính số đo cung lớn/.exec(p);
  if (m) return { value: 360 - +m[1], step: 0 };
  m = /^Cung lớn AB của đường tròn \(O\) có số đo (\d+)°/.exec(p);
  if (m) return { value: 360 - +m[1], step: 0 };
  m = /^Lúc (\d+) giờ đúng/.exec(p);
  if (m) {
    // the hour hand stands at h·30°, the minute hand at 0°
    expect(+m[1]).not.toBe(6);
    const a = (+m[1] * 30) % 360;
    return { value: Math.min(a, 360 - a), step: 0 };
  }
  m = /số đo cung AC là (\d+)°, số đo cung CB là (\d+)°/.exec(p);
  if (m) return { value: +m[1] + +m[2], step: 0 };
  m = /^Đường tròn \(O; (\d+) cm\) có dây AB = (\d+) cm\. Tính khoảng cách/.exec(p);
  if (m) return { value: Math.sqrt(Number(m[1]) ** 2 - (+m[2] / 2) ** 2), step: 0 };
  m = /^Đường tròn \(O; (\d+) cm\) có dây AB cách tâm O một khoảng (\d+) cm/.exec(p);
  if (m) return { value: 2 * Math.sqrt(Number(m[1]) ** 2 - Number(m[2]) ** 2), step: 0 };
  m = /^Tính độ dài cung (\d+)° của đường tròn bán kính (\d+) cm/.exec(p);
  if (m) return { value: (Math.PI * +m[2] * +m[1]) / 180, step: 0.01 };
  m = /^Một cung (\d+)° có độ dài (\S+) cm\. Tính bán kính/.exec(p);
  if (m) return { value: (piValue(m[2]) * 180) / +m[1], step: 0 };
  m = /^Trên đường tròn bán kính (\d+) cm, một cung có độ dài (\S+) cm/.exec(p);
  if (m) return { value: (piValue(m[2]) * 180) / +m[1], step: 0 };
  m = /^Tính diện tích hình quạt tròn bán kính (\d+) cm, cung (\d+)°/.exec(p);
  if (m) return { value: (Math.PI * Number(m[1]) ** 2 * +m[2]) / 360, step: 0.01 };
  m = /hai đường tròn đồng tâm bán kính (\d+) cm và (\d+) cm/.exec(p);
  if (m) return { value: Math.PI * (Number(m[1]) ** 2 - Number(m[2]) ** 2), step: 0.01 };
  m = /^Một hình quạt tròn bán kính (\d+) cm có độ dài cung (\d+) cm/.exec(p);
  if (m) return { value: (+m[1] * +m[2]) / 2, step: 0 };
  throw new Error(`unknown prompt: ${p}`);
}

describe('drill of the practice lesson on page 96', () => {
  for (const skill of SKILLS_TRANG_96) {
    it(`${skill.id}: every answer matches a fresh computation from the prompt`, () => {
      for (const q of sample(skill)) {
        const { value, step } = solve(q.prompt);
        if (step === 0) expect(q.answer).toBeCloseTo(value, 9);
        else expect(Math.abs(q.answer - value)).toBeLessThanOrEqual(step / 2 + 1e-9);
      }
    });

    it(`${skill.id}: the written answer reads back as the key`, () => {
      for (const q of sample(skill)) {
        expect(Number.isFinite(q.answer)).toBe(true);
        expect(num(numberText(q.answer))).toBe(q.answer);
      }
    });

    it(`${skill.id}: every question has hints and its last step gives the answer`, () => {
      for (const q of sample(skill, 200)) {
        const hints = hintsFor({ ...q, skill: skill.id });
        expect(hints.length).toBeGreaterThan(0);
        const last = q.steps.at(-1) ?? '';
        expect(last.replace(/\s/g, '')).toContain(
          numberText(q.answer).replace(/\s/g, '').split(',')[0],
        );
      }
    });
  }

  it('covers every variant of each skill', () => {
    const shapes = (/** @type {import('#lib/core/drill.js').Skill} */ skill) =>
      new Set(sample(skill).map((q) => q.prompt.slice(0, 40)));
    expect(shapes(SKILLS_TRANG_96[0]).size).toBeGreaterThanOrEqual(4);
    expect(shapes(SKILLS_TRANG_96[1]).size).toBeGreaterThanOrEqual(5);
    expect(shapes(SKILLS_TRANG_96[2]).size).toBeGreaterThanOrEqual(3);
    expect(shapes(SKILLS_TRANG_96[3]).size).toBeGreaterThanOrEqual(3);
  });

  it('builds a set with two questions per skill', () => {
    const set = buildSet(SKILLS_TRANG_96, 2, 1);
    expect(set).toHaveLength(8);
  });

  it('refuses values next to a rounding boundary', () => {
    expect(rounded(1.005, 2)).toBeNull();
    expect(rounded(6.2832, 2)).toBe(6.28);
  });

  it('writes multiples of π the way the book does', () => {
    expect(piText(2)).toBe('2π');
    expect(piText(1)).toBe('π');
    expect(piText(0.5)).toBe('0,5π');
    expect(piText(7 / 6)).toBe('7π/6');
    expect(piText(1 / 3)).toBe('π/3');
  });
});

/**
 * Recomputes a question on lines, tangents and two circles from its prompt
 * alone.
 * @param {string} p
 */
function solveLater(p) {
  let m = /cách tâm O của đường tròn \(O; (\d+) cm\) một khoảng d = (\d+(?:,\d+)?) cm/.exec(p);
  if (m) {
    const r = +m[1];
    const d = num(m[2]);
    return d < r ? 2 : d === r ? 1 : 0;
  }
  m = /cách tâm O của đường tròn \(O; (\d+) cm\) một khoảng (\d+) cm và cắt/.exec(p);
  if (m) return 2 * Math.sqrt(Number(m[1]) ** 2 - Number(m[2]) ** 2);
  m = /^Cho đường tròn \(O; (\d+) cm\), điểm A .* MA = (\d+) cm/.exec(p);
  if (m) return Math.hypot(+m[1], +m[2]);
  m = /\(O; (\d+) cm\) với OM = (\d+) cm/.exec(p);
  if (m) return Math.sqrt(Number(m[2]) ** 2 - Number(m[1]) ** 2);
  m = /góc AMB = (\d+)°\. Tính số đo góc AOB/.exec(p);
  if (m) return 180 - +m[1];
  m = /góc AOB = (\d+)°\. Tính số đo góc AMO/.exec(p);
  if (m) return (180 - +m[1]) / 2;
  m =
    /\(O; (\d+) cm\), kẻ hai tiếp tuyến MA, MB \(A, B là tiếp điểm\) với góc AMB = 60°\. Tính OM/.exec(
      p,
    );
  if (m) return +m[1] / Math.sin(Math.PI / 6);
  m = /^Cho hai đường tròn \(O; (\d+) cm\) và \(O′; (\d+) cm\) với OO′ = (\d+(?:,\d+)?) cm/.exec(p);
  if (m) {
    const [big, small, d] = [+m[1], +m[2], num(m[3])];
    if (d > big + small || d < big - small) return 0;
    if (d === big + small || d === big - small) return 1;
    return 2;
  }
  m =
    /^Đường tròn \(O; (\d+) cm\) tiếp xúc ngoài với đường tròn \(O′; r\) và OO′ = (\d+(?:,\d+)?) cm/.exec(
      p,
    );
  if (m) return num(m[2]) - +m[1];
  m = /^Đường tròn \(O; (\d+) cm\) tiếp xúc trong .* OO′ = (\d+) cm/.exec(p);
  if (m) return +m[1] - +m[2];
  m = /^Ba đường tròn \(A; (\d+) cm\), \(B; (\d+) cm\), \(C; (\d+) cm\)/.exec(p);
  if (m) return +m[1] + +m[2] + (+m[2] + +m[3]) + (+m[3] + +m[1]);
  m =
    /^Hai đường tròn \(O; (\d+) cm\) và \(O′; (\d+) cm\) cắt nhau tại A và B, OO′ = (\d+) cm/.exec(
      p,
    );
  if (m) {
    expect(m[1]).toBe(m[2]);
    return 2 * Math.sqrt(Number(m[1]) ** 2 - (+m[3] / 2) ** 2);
  }
  throw new Error(`unknown prompt: ${p}`);
}

describe('drill on lines, tangents and two circles', () => {
  for (const skill of SKILLS_TRANG_108) {
    it(`${skill.id}: every answer matches a fresh computation from the prompt`, () => {
      for (const q of sample(skill)) expect(q.answer).toBeCloseTo(solveLater(q.prompt), 9);
    });

    it(`${skill.id}: the answer reads back and the last step gives it`, () => {
      for (const q of sample(skill, 200)) {
        expect(num(numberText(q.answer))).toBe(q.answer);
        expect(hintsFor({ ...q, skill: skill.id }).length).toBeGreaterThan(0);
        expect((q.steps.at(-1) ?? '').replace(/\s/g, '')).toContain(
          numberText(q.answer).replace(/\s/g, ''),
        );
      }
    });
  }

  it('covers every variant and every relation of two circles', () => {
    const shapes = (/** @type {import('#lib/core/drill.js').Skill} */ skill) =>
      new Set(sample(skill).map((q) => q.prompt.slice(0, 40)));
    expect(shapes(SKILLS_TRANG_108[0]).size).toBeGreaterThanOrEqual(3);
    expect(shapes(SKILLS_TRANG_108[1]).size).toBeGreaterThanOrEqual(3);
    expect(shapes(SKILLS_TRANG_108[2]).size).toBeGreaterThanOrEqual(5);
    const counts = new Set(
      sample(SKILLS_TRANG_108[2])
        .filter((q) => q.prompt.startsWith('Cho hai đường tròn'))
        .map((q) => q.answer),
    );
    expect([...counts].sort()).toEqual([0, 1, 2]);
  });

  it('builds the chapter review with one skill per lesson idea', () => {
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(7);
    expect(buildSet(CHAPTER_SKILLS, 2, 5)).toHaveLength(14);
  });
});
