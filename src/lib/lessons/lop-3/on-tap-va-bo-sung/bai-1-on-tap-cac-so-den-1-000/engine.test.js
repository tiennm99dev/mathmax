import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { readTo1000, valueOf } from '#lib/core/kid/place-value.js';
import { SKILLS, buildMessage, nextPair, nextTarget } from './engine.js';

const SEEDS = Array.from({ length: 200 }, (_, i) => i + 1);

/** @param {string} id */
const skill = (id) => /** @type {(typeof SKILLS)[number]} */ (SKILLS.find((s) => s.id === id));

/** @param {string} text */
const sum = (text) =>
  text
    .split(' + ')
    .map(Number)
    .reduce((s, v) => s + v, 0);

describe('building with blocks', () => {
  it('points at the first place to fix', () => {
    expect(buildMessage(203, 205)).toEqual({
      solved: false,
      text: 'Em đang có số 203. Hàng đơn vị còn thiếu 2 khối đơn vị.',
    });
    expect(buildMessage(305, 205).text).toBe('Em đang có số 305. Hàng trăm thừa 1 tấm trăm.');
  });

  it('writes the number out once it is right', () => {
    expect(buildMessage(205, 205)).toEqual({
      solved: true,
      text: 'Đúng rồi! Số 205 đọc là hai trăm linh năm. 205 = 200 + 5.',
    });
  });

  it('draws three-digit targets and pairs', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const rand = rng(seed);
      const t = nextTarget(rand, 100);
      if (t < 100 || t > 999 || t === 100) bad.push(['target', t]);
      const [a, b] = nextPair(rand);
      if (a < 100 || a > 999 || b < 100 || b > 999) bad.push(['pair', a, b]);
    }
    expect(bad).toEqual([]);
  });
});

describe('review questions', () => {
  it('always has the right answer among distinct options', () => {
    const bad = [];
    for (const s of SKILLS) {
      for (const seed of SEEDS) {
        const q = s.make(rng(seed));
        const texts = q.options.map(optionText);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([s.id, seed, 'answer']);
        if (new Set(texts).size !== texts.length) bad.push([s.id, seed, texts]);
        if (texts.length < 2) bad.push([s.id, seed, 'few']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('reads and writes numbers correctly', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('doc-viet').make(rng(seed));
      const n = Number(q.prompt.match(/\d+/)?.[0]);
      const right = optionText(q.options[q.answer]);
      if (n) {
        if (right.toLowerCase() !== readTo1000(n)) bad.push([q.prompt, right]);
      } else if (!q.prompt.includes(readTo1000(Number(right)))) bad.push([q.prompt, right]);
    }
    expect(bad).toEqual([]);
  });

  it('reads the number the blocks show', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('khoi').make(rng(seed));
      const v = q.visual;
      if (v?.type !== 'blocks' || valueOf(v) !== Number(q.options[q.answer])) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('writes numbers as sums of places', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('cau-tao').make(rng(seed));
      const right = optionText(q.options[q.answer]);
      const asked = q.prompt.match(/^(\d+) viết/)?.[1];
      if (asked) {
        if (sum(right) !== Number(asked)) bad.push(q.prompt);
        const wrong = q.options.map(optionText).filter((o) => o !== right);
        if (wrong.some((o) => sum(o) === Number(asked))) bad.push([q.prompt, wrong]);
      } else if (sum(q.prompt.replace(' = ?', '')) !== Number(right)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('offers at least two wrong sums, each made of real places', () => {
    const bad = [];
    for (const seed of [...SEEDS, 777, 111, 999]) {
      for (let tries = 0; tries < 20; tries++) {
        const q = skill('cau-tao').make(rng(seed * 31 + tries));
        if (!/viết thành tổng/.test(q.prompt)) continue;
        const texts = q.options.map(optionText);
        if (texts.length < 3 || texts.some((t) => t.includes('1000'))) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('writes one thousand with its space in every option', () => {
    const bad = [];
    for (const s of SKILLS) {
      for (let seed = 1; seed <= 2000; seed++) {
        const q = s.make(rng(seed));
        if (q.options.map(optionText).some((o) => /\d{4}/.test(o))) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('finds neighbours and missing numbers', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('lien-truoc-sau').make(rng(seed));
      const n = Number(q.prompt.match(/\d+/)?.[0]);
      const right = q.prompt.includes('trước') ? n - 1 : n + 1;
      if (Number(q.options[q.answer]) !== right) bad.push(q.prompt);

      const s = skill('day-so').make(rng(seed));
      const v = s.visual;
      if (v?.type !== 'sequence' || Number(s.options[s.answer]) !== v.items[v.blank])
        bad.push(seed);
      else if (v.items.some((x) => x < 1 || x > 1000)) bad.push(v.items);
    }
    expect(bad).toEqual([]);
  });

  it('compares with the right sign', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('so-sanh').make(rng(seed));
      const [left, right] = q.prompt.replace('Điền dấu: ', '').split(' ? ');
      if (q.options[q.answer] !== compareSign(sum(left), Number(right))) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('orders numbers correctly', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = skill('sap-xep').make(rng(seed));
      const right = optionText(q.options[q.answer]);
      if (q.prompt.startsWith('Dãy')) {
        const list = right.split('; ').map(Number);
        if (list.some((v, i) => i > 0 && list[i - 1] >= v)) bad.push(right);
      } else {
        const list = (q.prompt.match(/\d+/g) ?? []).map(Number);
        const want = q.prompt.includes('lớn nhất') ? Math.max(...list) : Math.min(...list);
        if (Number(right) !== want) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
