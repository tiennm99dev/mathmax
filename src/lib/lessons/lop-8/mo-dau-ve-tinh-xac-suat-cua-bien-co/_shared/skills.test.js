import { describe, it, expect } from 'vitest';
import { buildSet, readAnswer } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import {
  countOrProbabilityText as answerText,
  ratioText,
  readProbability,
} from '#lib/core/fractions.js';
import { isPrime } from '#lib/numtheory-engine/index.js';
import { CHAPTER_SKILLS, PRACTICE_SKILLS } from './skills.js';

/** @param {string} s */
const n = (s) => Number(s.replaceAll(GROUP, ''));

/**
 * Reads the condition phrase back into a test.
 * @param {string} phrase
 * @returns {(k: number) => boolean}
 */
function readCondition(phrase) {
  if (phrase === 'chẵn') return (k) => k % 2 === 0;
  if (phrase === 'lẻ') return (k) => k % 2 === 1;
  if (phrase === 'nguyên tố') return isPrime;
  let m = /^chia hết cho (\d+)$/.exec(phrase);
  if (m) {
    const d = Number(m[1]);
    return (k) => k % d === 0;
  }
  m = /^lớn hơn (\d+)$/.exec(phrase);
  if (m) {
    const t = Number(m[1]);
    return (k) => k > t;
  }
  throw new Error(`unknown condition: ${phrase}`);
}

/** @param {number} lo @param {number} hi @param {(k: number) => boolean} test */
const count = (lo, hi, test) => {
  let c = 0;
  for (let k = lo; k <= hi; k++) if (test(k)) c++;
  return c;
};

const COLOURS = ['đỏ', 'xanh', 'vàng'];
const NUM = `([\\d${GROUP}]+)`;

/**
 * The answer worked out again from the prompt alone.
 * @param {string} prompt
 * @returns {number}
 */
function recompute(prompt) {
  let m;
  if ((m = /từ (\d+) đến (\d+), mỗi thẻ.*Có bao nhiêu kết quả có thể\?$/.exec(prompt)))
    return n(m[2]) - n(m[1]) + 1;
  if (
    (m = /có (\d+) tấm thẻ ghi các số 1; 2; \.\.\.; \d+\. .*"Rút được thẻ ghi số (.+)"\?$/.exec(
      prompt,
    ))
  )
    return count(1, n(m[1]), readCondition(m[2]));
  if (
    (m = /có (\d+) học sinh, trong đó có (\d+) bạn nữ; có (\d+) bạn (nữ|nam) đeo kính/.exec(prompt))
  ) {
    const [total, girls, glasses] = [n(m[1]), n(m[2]), n(m[3])];
    return m[4] === 'nữ' ? girls - glasses : total - girls - glasses;
  }
  if ((m = /có (\d+) viên bi đỏ, (\d+) viên bi xanh và (\d+) viên bi vàng/.exec(prompt))) {
    const c = [n(m[1]), n(m[2]), n(m[3])];
    const sum = c[0] + c[1] + c[2];
    const not = /không phải màu (đỏ|xanh|vàng)"/.exec(prompt);
    if (not) return sum - c[COLOURS.indexOf(not[1])];
    const col = /"Lấy được viên bi màu (đỏ|xanh|vàng)"/.exec(prompt);
    if (!col) throw new Error(prompt);
    return c[COLOURS.indexOf(col[1])] / sum;
  }
  if (
    (m =
      /ghi các số (\d+); \d+; \.\.\.; (\d+), mỗi thẻ một số\..*"Rút được thẻ ghi số (.+)"\.$/.exec(
        prompt,
      ))
  ) {
    const [lo, hi] = [n(m[1]), n(m[2])];
    return count(lo, hi, readCondition(m[3])) / (hi - lo + 1);
  }
  if ((m = /^Gieo một con xúc xắc cân đối\. .*"Số chấm xuất hiện là số (.+)"\.$/.exec(prompt)))
    return count(1, 6, readCondition(m[1])) / 6;
  if ((m = /có (\d+) viên bi đỏ và một số viên bi xanh.*là 1\/(\d+)\./.exec(prompt)))
    return n(m[1]) * n(m[2]) - n(m[1]);
  if ((m = /xúc xắc (\d+) lần, mặt \d chấm xuất hiện (\d+) lần/.exec(prompt)))
    return n(m[2]) / n(m[1]);
  if ((m = /^Hỏi ngẫu nhiên (\d+) học sinh của một trường, có (\d+) bạn/.exec(prompt)))
    return n(m[2]) / n(m[1]);
  if (
    (m = new RegExp(
      `Kiểm tra ngẫu nhiên ${NUM} sản phẩm.*có ${NUM} sản phẩm bị lỗi.*lô ${NUM} sản phẩm`,
    ).exec(prompt))
  )
    return (n(m[3]) * n(m[2])) / n(m[1]);
  if ((m = /bắt (\d+) con cá.*bắt ngẫu nhiên (\d+) con thì thấy có (\d+) con/.exec(prompt)))
    return (n(m[1]) * n(m[2])) / n(m[3]);
  if ((m = /có (\d+) phiếu bốc thăm như nhau, trong đó có (\d+) phiếu/.exec(prompt)))
    return n(m[2]) / n(m[1]);
  if ((m = /có (\d+) viên bi đỏ và (\d+) viên bi xanh cùng kích thước\. Cần cho thêm/.exec(prompt)))
    return n(m[2]) - n(m[1]);
  if (
    (m = new RegExp(
      `Hỏi ngẫu nhiên ${NUM} người dân của một phường có ${NUM} người, có ${NUM} người`,
    ).exec(prompt))
  )
    return (n(m[2]) * n(m[3])) / n(m[1]);
  if ((m = /hai đồng xu cân đối\. Tính xác suất của biến cố "(.+)"\.$/.exec(prompt))) {
    const outcomes = ['SS', 'SN', 'NS', 'NN'];
    /** @type {Record<string, (o: string) => boolean>} */
    const tests = {
      'Hai đồng xu cùng xuất hiện mặt sấp': (o) => o === 'SS',
      'Hai đồng xu xuất hiện hai mặt giống nhau': (o) => o[0] === o[1],
      'Có ít nhất một đồng xu xuất hiện mặt ngửa': (o) => o.includes('N'),
      'Có đúng một đồng xu xuất hiện mặt ngửa': (o) => o[0] !== o[1],
    };
    return outcomes.filter(tests[m[1]]).length / 4;
  }
  throw new Error(`unrecognised prompt: ${prompt}`);
}

describe('chapter skills', () => {
  it('store answers that match their prompts', () => {
    for (let seed = 1; seed <= 300; seed++) {
      for (const q of buildSet(CHAPTER_SKILLS, 3, seed)) {
        expect(q.answer, q.prompt).toBe(recompute(q.prompt));
        expect(q.answer, q.prompt).toBeGreaterThan(0);
        expect(q.steps.length).toBeGreaterThan(0);
        expect(q.hints?.length).toBeGreaterThan(0);
        expect(q.prompt).not.toMatch(/undefined|NaN/);
        expect(q.steps.join(' ')).not.toMatch(/undefined|NaN/);
      }
    }
  });

  it('keep probabilities below 1 and counts whole', () => {
    for (let seed = 1; seed <= 200; seed++) {
      for (const q of buildSet(CHAPTER_SKILLS, 3, seed)) {
        if (!Number.isInteger(q.answer)) expect(q.answer).toBeLessThan(1);
      }
    }
  });

  it('accept the answer typed as the board writes it, or unsimplified', () => {
    for (let seed = 1; seed <= 100; seed++) {
      for (const q of buildSet(CHAPTER_SKILLS, 2, seed)) {
        expect(readAnswer(q, answerText(q.answer), readProbability), q.prompt).toBe(q.answer);
      }
    }
    expect(readProbability('6/20')).toBe(readProbability('3/10'));
  });

  it('read a count grouped with a dot or a space as a whole number', () => {
    for (let seed = 1; seed <= 200; seed++) {
      for (const q of buildSet(CHAPTER_SKILLS, 3, seed)) {
        if (!Number.isInteger(q.answer) || q.answer < 1000) continue;
        const dotted = String(q.answer).replace(/\B(?=(\d{3})+$)/g, '.');
        expect(readAnswer(q, dotted, readProbability), q.prompt).toBe(q.answer);
        expect(readAnswer(q, String(q.answer), readProbability), q.prompt).toBe(q.answer);
      }
    }
  });

  it('write ratios with their lowest terms', () => {
    expect(ratioText(6, 20)).toBe('6/20 = 3/10');
    expect(ratioText(7, 20)).toBe('7/20');
    expect(ratioText(4, 4)).toBe('4/4 = 1');
    expect(answerText(1500)).toBe(`1${GROUP}500`);
    expect(answerText(0.25)).toBe('1/4');
  });

  it('build sets without repeated prompts and cover every skill', () => {
    const set = buildSet(CHAPTER_SKILLS, 3, 1);
    expect(set).toHaveLength(12);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(set.length);
    expect(PRACTICE_SKILLS).toHaveLength(3);
  });
});
