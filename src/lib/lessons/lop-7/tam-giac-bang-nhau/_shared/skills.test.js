import { describe, it, expect } from 'vitest';
import { buildSet } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, PAGE_68_SKILLS, PAGE_74_SKILLS, PAGE_85_SKILLS } from './skills.js';

/**
 * Recomputes a question's answer from its prompt alone.
 * @param {string} prompt
 * @returns {number}
 */
function recompute(prompt) {
  const n = (/** @type {string} */ s) => Number(s);
  let m;
  if ((m = /BC = (\d+) cm\. Tính HB/.exec(prompt))) return n(m[1]) / 2;
  if ((m = /góc xOy = (\d+)°, MA vuông góc.*Tính góc OMB/.exec(prompt))) return 90 - n(m[1]) / 2;
  if ((m = /BC = EF, B̂ = Ê = (\d+)°\. Tính F̂/.exec(prompt))) return 90 - n(m[1]);
  if ((m = /BC = EF = (\d+) cm, AB = DE\. Biết AC = (\d+) cm\. Tính DF/.exec(prompt))) {
    expect(n(m[2])).toBeLessThan(n(m[1]));
    return n(m[2]);
  }
  if ((m = /cân tại A có góc ở đỉnh Â = (\d+)°\. Tính góc ở đáy B̂/.exec(prompt)))
    return (180 - n(m[1])) / 2;
  if ((m = /cân tại A có góc ở đáy B̂ = (\d+)°\. Tính góc ở đỉnh Â/.exec(prompt)))
    return 180 - 2 * n(m[1]);
  if ((m = /cạnh bên AB = (\d+) cm và cạnh đáy BC = (\d+) cm\. Tính chu vi/.exec(prompt))) {
    expect(n(m[2])).toBeLessThan(2 * n(m[1]));
    return 2 * n(m[1]) + n(m[2]);
  }
  if ((m = /cân tại A có Â = 60° và BC = (\d+) cm\. Tính AB/.exec(prompt))) return n(m[1]);
  if ((m = /cân tại A có góc ngoài tại đỉnh A bằng (\d+)°\. Tính B̂/.exec(prompt)))
    return n(m[1]) / 2;
  if ((m = /trung trực của đoạn thẳng AB và MA = (\d+) cm\. Tính MB/.exec(prompt))) return n(m[1]);
  if ((m = /cắt AB tại O\. Biết OA = (\d+) cm\. Tính AB/.exec(prompt))) return 2 * n(m[1]);
  if ((m = /MA = (\d+) cm, AB = (\d+) cm\. Tính chu vi tam giác MAB/.exec(prompt))) {
    expect(n(m[2])).toBeLessThan(2 * n(m[1]));
    return 2 * n(m[1]) + n(m[2]);
  }
  if ((m = /góc MAB = (\d+)°\. Tính góc AMB/.exec(prompt))) return 180 - 2 * n(m[1]);
  if ((m = /Â = (\d+)°, B̂ = (\d+)°\. Tính Ĉ/.exec(prompt))) return 180 - n(m[1]) - n(m[2]);
  if ((m = /vuông tại A có B̂ = (\d+)°\. Tính Ĉ/.exec(prompt))) return 90 - n(m[1]);
  if ((m = /B̂ = Ĉ và Â = (\d+)°\. Tính B̂/.exec(prompt))) return (180 - n(m[1])) / 2;
  if ((m = /tỉ lệ với (\d+), (\d+), (\d+)\. Tính (Â|B̂|Ĉ)/.exec(prompt))) {
    const r = [n(m[1]), n(m[2]), n(m[3])];
    const i = ['Â', 'B̂', 'Ĉ'].indexOf(m[4]);
    return (180 * r[i]) / (r[0] + r[1] + r[2]);
  }
  if ((m = /Â = (\d+)°, B̂ = (\d+)°\. Tia Cx là tia đối/.exec(prompt))) return n(m[1]) + n(m[2]);
  if ((m = /góc ngoài tại đỉnh B bằng (\d+)° và Â = (\d+)°/.exec(prompt))) return n(m[1]) - n(m[2]);
  if ((m = /Góc ngoài tại đỉnh C của tam giác ABC bằng (\d+)°/.exec(prompt))) return 180 - n(m[1]);
  if ((m = /△ABC = △DEF, Â = (\d+)°, Ê = (\d+)°\. Tính Ĉ/.exec(prompt)))
    return 180 - n(m[1]) - n(m[2]);
  if ((m = /△MNP = △QRS và (QR|RS|SQ) = (\d+) cm\. Tính (MN|NP|PM)/.exec(prompt))) {
    const pairs = { QR: 'MN', RS: 'NP', SQ: 'PM' };
    expect(pairs[/** @type {'QR' | 'RS' | 'SQ'} */ (m[1])]).toBe(m[3]);
    return n(m[2]);
  }
  if ((m = /AB = (\d+) cm, BC = (\d+) cm, DF = (\d+) cm\. Tính chu vi/.exec(prompt)))
    return n(m[1]) + n(m[2]) + n(m[3]);
  if ((m = /góc BAC = (\d+)° và góc ABC = (\d+)°\. Tính góc ACD/.exec(prompt)))
    return 180 - n(m[1]) - n(m[2]);
  if ((m = /góc BAC = (\d+)°\. Tính góc BAD/.exec(prompt))) return 2 * n(m[1]);
  if ((m = /AC = (\d+) cm\. Tính BD/.exec(prompt))) return n(m[1]);
  if ((m = /góc BAC = góc DAC = (\d+)°\. Biết góc ABC = (\d+)°/.exec(prompt)))
    return 180 - n(m[1]) - n(m[2]);
  if ((m = /AB = DE, B̂ = Ê, BC = EF\. Biết Â = (\d+)°, Ê = (\d+)°\. Tính F̂/.exec(prompt)))
    return 180 - n(m[1]) - n(m[2]);
  if ((m = /BC = (\d+) cm\. Tính BD/.exec(prompt))) return n(m[1]);
  if ((m = /góc CAB = góc DAB = (\d+)°, góc CBA = góc DBA = (\d+)°\. Tính góc ADB/.exec(prompt)))
    return 180 - n(m[1]) - n(m[2]);
  if ((m = /Â = M̂ = (\d+)°, B̂ = N̂ = (\d+)°.*Tính Ĉ/.exec(prompt))) return 180 - n(m[1]) - n(m[2]);
  if ((m = /CD = (\d+) m\. Tính AB/.exec(prompt))) return n(m[1]);
  if ((m = /DE = (\d+) m\. Tính AB/.exec(prompt))) return n(m[1]);
  throw new Error(`unrecognised prompt: ${prompt}`);
}

for (const [name, skills] of /** @type {const} */ ([
  ['page 68', PAGE_68_SKILLS],
  ['page 74', PAGE_74_SKILLS],
  ['page 85', PAGE_85_SKILLS],
  ['chapter', CHAPTER_SKILLS],
])) {
  describe(`${name} skills`, () => {
    it('stores answers that match a recomputation, over many sets', () => {
      for (let seed = 1; seed <= 80; seed++) {
        for (const q of buildSet(skills, 4, seed)) {
          expect(q.answer, q.prompt).toBe(recompute(q.prompt));
          expect(Number.isInteger(q.answer) && q.answer > 0, q.prompt).toBe(true);
          expect(q.steps.at(-1), q.prompt).toContain(String(q.answer));
          for (const h of q.hints ?? []) {
            expect(h, q.prompt).not.toMatch(new RegExp(`= ${q.answer}(°| cm| m)?\\.?$`));
          }
        }
      }
    });

    it('draws every skill', () => {
      const set = buildSet(skills, 4, 3);
      expect(new Set(set.map((q) => q.skill)).size).toBe(skills.length);
      expect(set).toHaveLength(4 * skills.length);
    });
  });
}

describe('every kind of question is reachable', () => {
  it('covers each generator branch over many seeds', () => {
    const prompts = new Set();
    for (let seed = 1; seed <= 200; seed++) {
      for (const q of buildSet([...PAGE_68_SKILLS, ...PAGE_74_SKILLS], 2, seed)) {
        prompts.add(q.prompt.replace(/\d+/g, '#'));
      }
    }
    // 4 + 3 + 3 + 2 kinds on page 68, 3 + 3 + 2 on page 74; the side kind has three wordings.
    expect(prompts.size).toBeGreaterThanOrEqual(22);
  });
});

describe('the chapter review', () => {
  it('draws every skill of the chapter once per family, in book order', () => {
    expect(CHAPTER_SKILLS).toEqual([...PAGE_68_SKILLS, ...PAGE_74_SKILLS, ...PAGE_85_SKILLS]);
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(CHAPTER_SKILLS.length);
  });

  it('reaches every page 85 question kind', () => {
    const prompts = new Set();
    for (let seed = 1; seed <= 200; seed++) {
      for (const q of buildSet(PAGE_85_SKILLS, 3, seed)) prompts.add(q.prompt.replace(/\d+/g, '#'));
    }
    // 4 kinds of right-triangle question, 5 isosceles, 4 perpendicular bisector.
    expect(prompts.size).toBe(13);
  });
});
