import { describe, it, expect } from 'vitest';
import { rng, buildSet } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import {
  CHAPTER_SKILLS,
  DATA_POOL,
  PRACTICE_SKILLS,
  bieuDien,
  phanTich,
  thuThap,
} from './skills.js';

const RUNS = 500;

/** @param {import('#lib/core/drill.js').Skill} skill */
function* questions(skill, seed = 3) {
  const rand = rng(seed);
  for (let k = 0; k < RUNS; k++) yield skill.make(rand);
}

describe('chapter skills', () => {
  it('make natural-number answers that the last step states', () => {
    for (const skill of CHAPTER_SKILLS) {
      for (const q of questions(skill)) {
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(q.answer).toBeGreaterThan(0);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.steps.at(-1)).toContain(fmt(q.answer));
        expect(q.prompt).not.toMatch(/\d\.\d/);
        expect(q.prompt).not.toContain('undefined');
        expect(q.steps.join(' ')).not.toContain('NaN');
      }
    }
  });

  it('build sets without repeated prompts', () => {
    const set = buildSet(CHAPTER_SKILLS, 3, 1);
    expect(set).toHaveLength(12);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(set.length);
    expect(PRACTICE_SKILLS).toHaveLength(3);
  });
});

describe('answers recomputed from the prompts', () => {
  it('counts the data sets of the asked kind', () => {
    const asks = {
      'rời rạc?': 'roi-rac',
      'liên tục?': 'lien-tuc',
      'không sắp thứ tự được?': 'khong',
      'định tính sắp thứ tự được?': 'thu-tu',
    };
    let seen = 0;
    for (const q of questions(thuThap)) {
      if (!q.prompt.startsWith('Cho các dãy')) continue;
      seen++;
      const kind = Object.entries(asks).find(([end]) => q.prompt.endsWith(end))?.[1];
      const n = DATA_POOL.filter((d) => d.kind === kind && q.prompt.includes(`) ${d.text}`)).length;
      expect(q.answer).toBe(n);
    }
    expect(seen).toBeGreaterThan(50);
  });

  it('finds the one weight that cannot be right', () => {
    for (const q of questions(thuThap)) {
      const m = /theo thứ tự: ([\d; ]+)\./.exec(q.prompt);
      if (!m) continue;
      const values = m[1].split('; ').map(Number);
      const bad = values.flatMap((v, i) => (v < 30 || v > 70 ? [i + 1] : []));
      expect(bad).toEqual([q.answer]);
    }
  });

  it('closes percentages and class lists at their totals', () => {
    for (const q of questions(thuThap)) {
      const pct = [...q.prompt.matchAll(/(\d+)%/g)].map((m) => Number(m[1]));
      if (pct.length === 3) expect(pct.reduce((a, b) => a + b, 0) + q.answer).toBe(100);
      const club = /có (\d+) học sinh.*?: (\d+) bạn .*?, (\d+) bạn/.exec(q.prompt);
      if (club) expect(Number(club[2]) + Number(club[3]) + q.answer).toBe(Number(club[1]));
    }
  });

  it('converts between tables, percentages and picture charts', () => {
    for (const q of questions(bieuDien)) {
      const share = /Khảo sát (\d+) học sinh, có (\d+) bạn/.exec(q.prompt);
      if (share) expect(q.answer).toBe((Number(share[2]) * 100) / Number(share[1]));
      const icons = /ứng với (\d+) học sinh\. .* có (\d+) biểu tượng và nửa/.exec(q.prompt);
      if (icons)
        expect(q.answer).toBe(Number(icons[2]) * Number(icons[1]) * 1 + Number(icons[1]) / 2);
      const pie = /của (\d+) học sinh cho biết phần "Xe đạp" chiếm (\d+)%/.exec(q.prompt);
      if (pie) expect(q.answer).toBe((Number(pie[1]) * Number(pie[2])) / 100);
      const draw = /ứng với (\d+) cây, lớp trồng được (\d+) cây/.exec(q.prompt);
      if (draw) expect(q.answer).toBe(Number(draw[2]) / Number(draw[1]));
    }
  });

  it('reads cut axes and changes the way the chart shows them', () => {
    for (const q of questions(phanTich)) {
      const cut =
        /bắt đầu từ ([\d\u202f]+)\. Cột A biểu diễn ([\d\u202f]+), cột B biểu diễn ([\d\u202f]+)/.exec(
          q.prompt,
        );
      if (cut) {
        const [base, a, b] = cut.slice(1).map((t) => Number(t.replace(/\u202f/g, '')));
        expect(q.answer).toBe((b - base) / (a - base));
      }
      const growth = /từ (\d+) bạn \(năm trước\) lên (\d+) bạn/.exec(q.prompt);
      if (growth) {
        const [a, b] = growth.slice(1).map(Number);
        expect(q.answer).toBe(((b - a) / a) * 100);
      }
    }
  });
});
