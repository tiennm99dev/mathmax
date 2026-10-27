import { describe, it, expect } from 'vitest';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { buildSet, rng } from '#lib/core/drill.js';
import { SKILLS_TRANG_78, SKILLS_TRANG_90 } from './skills.js';

const ALL = [...SKILLS_TRANG_78, ...SKILLS_TRANG_90];

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 500) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * Recomputes a question's answer from its prompt alone, independently of the
 * generators.
 * @param {string} p
 * @returns {number}
 */
function solve(p) {
  /** @type {RegExpExecArray | null} */
  let m = /chắn cung AB có số đo (\d+)°/.exec(p);
  if (m) return +m[1] / 2;
  m = /có \$\\widehat\{BAC\}\$ = (\d+)°\. Tính góc ở tâm BOC/.exec(p);
  if (m) return 2 * +m[1];
  m = /Cung nhỏ AB của đường tròn \(O\) có số đo (\d+)°\. Điểm M nằm trên cung nhỏ/.exec(p);
  if (m) return (360 - +m[1]) / 2;
  m = /AC = (\d+) cm, BC = (\d+) cm\. Tính bán kính của đường tròn/.exec(p);
  if (m) return Math.hypot(+m[1], +m[2]) / 2;
  m = /vuông tại A có AB = (\d+) cm, AC = (\d+) cm\. Tính bán kính đường tròn ngoại tiếp/.exec(p);
  if (m) return Math.hypot(+m[1], +m[2]) / 2;
  m = /Tam giác đều ABC có cạnh (\d+)√3 cm\. Tính bán kính đường tròn (ngoại|nội) tiếp/.exec(p);
  if (m) {
    const a = +m[1] * Math.sqrt(3);
    return m[2] === 'ngoại' ? (a * Math.sqrt(3)) / 3 : (a * Math.sqrt(3)) / 6;
  }
  m = /r = (\d+) cm\. Tính R/.exec(p);
  if (m) return 2 * +m[1];
  m = /AB = (\d+) cm, AC = (\d+) cm, BC = (\d+) cm\. Tính bán kính đường tròn nội tiếp/.exec(p);
  if (m) {
    const [a, b, c] = [+m[1], +m[2], +m[3]];
    expect(a * a + b * b).toBe(c * c);
    return (a + b - c) / 2;
  }
  m = /\$\\widehat\{BAC\}\$ = (\d+)°, I là tâm đường tròn nội tiếp/.exec(p);
  if (m) return 90 + +m[1] / 2;
  m =
    /ABCD nội tiếp đường tròn có \$\\widehat\{([ABCD])\}\$ = (\d+)°\. Tính \$\\widehat\{([ABCD])\}\$/.exec(
      p,
    );
  if (m) {
    const opposite = { A: 'C', B: 'D', C: 'A', D: 'B' }[m[1]];
    expect(m[3]).toBe(opposite);
    return 180 - +m[2];
  }
  m = /\$\\widehat\{A\}\$ : \$\\widehat\{C\}\$ = (\d+) : (\d+)\. Tính \$\\widehat\{C\}\$/.exec(p);
  if (m) return (180 * +m[2]) / (+m[1] + +m[2]);
  m = /Hình chữ nhật ABCD có AB = (\d+) cm, BC = (\d+) cm/.exec(p);
  if (m) return Math.hypot(+m[1], +m[2]) / 2;
  m = /Hình vuông ABCD có cạnh (\d+)√2 cm/.exec(p);
  if (m) return (+m[1] * Math.sqrt(2) * Math.sqrt(2)) / 2;
  m = /có (\d+) đỉnh .*Tính góc ở tâm/.exec(p);
  if (m) return 360 / +m[1];
  m = /Tính số đo mỗi góc của (.+?)(?: \((\d+) cạnh\))? \(độ\)/.exec(p);
  if (m) {
    const names = {
      'tam giác đều': 3,
      'hình vuông': 4,
      'ngũ giác đều': 5,
      'lục giác đều': 6,
      'bát giác đều': 8,
    };
    const n = m[2]
      ? +m[2]
      : (names[/** @type {keyof typeof names} */ (m[1])] ?? +(/(\d+) cạnh/.exec(m[1])?.[1] ?? NaN));
    return ((n - 2) * 180) / n;
  }
  m = /Mỗi góc của một đa giác đều bằng (\d+)°/.exec(p);
  if (m) return 360 / (180 - +m[1]);
  m = /có (\d+) đỉnh .*Phép quay thuận chiều (\d+)° tâm O biến \$A_1\$ thành \$A_m\$/.exec(p);
  if (m) return ((+m[2] / (360 / +m[1])) % +m[1]) + 1;
  m = /Lục giác đều ABCDEF nội tiếp đường tròn bán kính (\d+) cm/.exec(p);
  if (m) return 6 * +m[1];
  throw new Error(`unknown prompt: ${p}`);
}

describe('chapter drill skills', () => {
  for (const skill of ALL) {
    it(`${skill.id}: every answer matches a recomputation from its prompt`, () => {
      for (const q of sample(skill)) {
        expect(q.answer).toBeCloseTo(solve(q.prompt), 9);
      }
    });

    it(`${skill.id}: answers are typed exactly and come with steps and hints`, () => {
      for (const q of sample(skill, 200)) {
        expect(q.answer).toBeGreaterThan(0);
        expect(readNumber(numberText(q.answer))).toBe(q.answer);
        expect(Math.round(q.answer * 2)).toBe(q.answer * 2);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.hints?.length ?? 0).toBeGreaterThan(0);
        expect(q.steps.join(' ')).toContain(numberText(q.answer));
      }
    });
  }

  it('builds a set with two questions per skill', () => {
    expect(buildSet(SKILLS_TRANG_78, 2, 7)).toHaveLength(6);
    expect(buildSet(SKILLS_TRANG_90, 2, 7)).toHaveLength(4);
  });
});
