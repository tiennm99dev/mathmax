import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { readNumber } from '#lib/core/decimal.js';
import {
  SKILLS_TRANG_56,
  SKILLS_TRANG_62,
  answerText,
  binhHanhThucTe,
  hinhBinhHanh,
  hinhThangCan,
  tuGiac,
} from './skills.js';

const ALL = [tuGiac, hinhThangCan, hinhBinhHanh, binhHanhThucTe];

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 500) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * Every number in a prompt, read the Vietnamese way (decimal comma, digits
 * grouped by spaces).
 * @param {string} text
 */
function numbers(text) {
  return [...text.matchAll(/\d+(?:[\s\u202f]\d{3})*(?:,\d+)?/g)].map(
    (m) => /** @type {number} */ (readNumber(m[0])),
  );
}

describe('every skill of the chapter', () => {
  for (const skill of ALL) {
    it(`${skill.id} gives well-formed questions`, () => {
      for (const q of sample(skill)) {
        expect(Number.isFinite(q.answer)).toBe(true);
        expect(q.answer).toBeGreaterThan(0);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.hints?.length).toBeGreaterThan(0);
        // No decimal point: the book writes a decimal comma.
        expect(q.prompt).not.toMatch(/\d\.\d/);
        expect(q.steps.join(' ')).not.toMatch(/\d\.\d/);
        expect(q.steps.at(-1)).toContain(answerText(q.answer));
        if (q.unit === '°') {
          expect(Number.isInteger(q.answer)).toBe(true);
          expect(q.answer).toBeLessThan(180);
        }
        // The hints never state the answer outright.
        const said = new RegExp(`= ${answerText(q.answer)}(?:°| cm| dm| đồng|\\.|$)`);
        for (const h of q.hints ?? []) expect(h).not.toMatch(said);
      }
    });
  }
});

describe('stored answers match an independent computation', () => {
  it('angles of a quadrilateral', () => {
    for (const q of sample(tuGiac)) {
      const n = numbers(q.prompt);
      let want;
      if (/tỉ lệ/.test(q.prompt)) {
        const ratio = n.slice(0, 4);
        const k = 360 / ratio.reduce((s, r) => s + r, 0);
        const asked = 'ABCD'.indexOf(/Tính góc ([ABCD])/.exec(q.prompt)?.[1] ?? '');
        want = ratio[asked] * k;
      } else if (/góc ngoài/.test(q.prompt)) {
        want = 180 - (360 - n[0] - n[1] - n[2]);
      } else if (/góc A = góc B/.test(q.prompt)) {
        want = (360 - n[0] - n[1]) / 2;
      } else if (/góc A \+ góc B/.test(q.prompt)) {
        want = (360 - n[0] + n[1]) / 2;
      } else {
        want = 360 - n[0] - n[1] - n[2];
      }
      expect(q.answer, q.prompt).toBe(want);
    }
  });

  it('isosceles trapezoids', () => {
    for (const q of sample(hinhThangCan)) {
      const n = numbers(q.prompt);
      let want;
      if (/góc A − góc D/.test(q.prompt)) {
        want = (180 - n[0]) / 2;
      } else if (/góc D = \d+°\. Tính góc ([ABC])/.test(q.prompt)) {
        const name = /Tính góc ([ABC])/.exec(q.prompt)?.[1];
        want = name === 'C' ? n[0] : 180 - n[0];
      } else if (/lần góc D/.test(q.prompt)) {
        want = 180 / (n[0] + 1);
      } else if (/chu vi/.test(q.prompt)) {
        want = n[0] + n[1] + 2 * n[2];
      } else {
        want = 180 - (180 - n[0]) / 2;
      }
      expect(q.answer, q.prompt).toBeCloseTo(want, 9);
    }
  });

  it('parallelograms', () => {
    for (const q of sample(hinhBinhHanh)) {
      const n = numbers(q.prompt);
      let want;
      if (/có góc A = \d+°\. Tính góc ([BCD])/.test(q.prompt)) {
        want = /Tính góc C/.test(q.prompt) ? n[0] : 180 - n[0];
      } else if (/góc A − góc B/.test(q.prompt)) {
        want = (180 + n[0]) / 2;
      } else if (/lần góc B/.test(q.prompt)) {
        want = 180 / (n[0] + 1);
      } else if (/Tính chu vi/.test(q.prompt)) {
        want = 2 * (n[0] + n[1]);
      } else if (/Tính BC/.test(q.prompt)) {
        want = n[0] / 2 - n[1];
      } else if (/Tính BD/.test(q.prompt)) {
        want = 2 * n[0];
      } else {
        want = n[0] / 2;
      }
      expect(q.answer, q.prompt).toBeCloseTo(want, 9);
    }
  });

  it('real-life parallelograms', () => {
    for (const q of sample(binhHanhThucTe)) {
      const n = numbers(q.prompt);
      let want;
      if (/hàng rào/.test(q.prompt)) want = 2 * (n[0] + n[1]) * n[2];
      else if (/cổng xếp/.test(q.prompt)) want = 180 - n[0];
      else {
        // The side given must close a triangle with the two half sticks.
        const [a, b, side] = n;
        expect(side).toBeLessThan(a / 2 + b / 2);
        expect(side).toBeGreaterThan(Math.abs(a / 2 - b / 2));
        want = side;
      }
      expect(q.answer, q.prompt).toBe(want);
    }
  });
});

describe('practice sets', () => {
  it('build ten distinct questions for each practice lesson', () => {
    for (const skills of [SKILLS_TRANG_56, SKILLS_TRANG_62]) {
      for (const seed of [1, 7, 99]) {
        const set = buildSet(skills, 5, seed);
        expect(set).toHaveLength(10);
        expect(new Set(set.map((q) => q.prompt)).size).toBe(10);
      }
    }
  });
});
