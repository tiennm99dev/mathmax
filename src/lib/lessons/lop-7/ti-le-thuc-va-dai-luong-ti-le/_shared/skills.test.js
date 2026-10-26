import { describe, it, expect } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import {
  CHAPTER_SKILLS,
  PAGE_10_SKILLS,
  PAGE_19_SKILLS,
  dayTiSo,
  tiLeNghich,
  tiLeThuan,
  tiLeThuc,
  vanDung,
} from './skills.js';
import { intText, readInteger } from './numbers.js';

/**
 * Recomputes an answer from the prompt alone, by trying every integer: the
 * generators never share code with this check.
 * @param {string} prompt
 */
function recompute(prompt) {
  const p = prompt.replace(/−/g, '-');
  /** @type {RegExpExecArray | null} */
  let m;
  if ((m = /^Tìm x, biết (\S+)\/(\S+) = (\S+)\/(\S+)\.$/.exec(p))) {
    const terms = m.slice(1, 5);
    const at = terms.indexOf('x');
    if (at >= 0) {
      const t = terms.map(Number);
      return solveFor((x) => {
        const v = [...t];
        v[at] = x;
        return v[0] * v[3] === v[1] * v[2] && v[1] !== 0 && v[3] !== 0;
      });
    }
  }
  if ((m = /^Tìm x, biết \(x ([+-]) (\d+)\)\/(\d+) = (-?\d+)\/(\d+)\.$/.exec(p))) {
    const e = (m[1] === '+' ? 1 : -1) * Number(m[2]);
    const [b, c, d] = [Number(m[3]), Number(m[4]), Number(m[5])];
    return solveFor((x) => (x + e) * d === b * c);
  }
  if (p.startsWith('Có bao nhiêu cặp tỉ số')) {
    const pairs = [...p.matchAll(/(\d+) : (\d+) và (\d+) : (\d+)/g)];
    return pairs.filter((q) => Number(q[1]) * Number(q[4]) === Number(q[2]) * Number(q[3])).length;
  }
  if ((m = /^Cho x\/(\d+) = y\/(\d+) và x ([+-]) y = (-?\d+)\. Tính ([xy])\.$/.exec(p))) {
    const [a, b, k] = [Number(m[1]), Number(m[2]), Number(m[4])];
    const sign = m[3] === '+' ? 1 : -1;
    // x = a·t and y = b·t for the common value t.
    const t = solveFor((t) => a * t + sign * b * t === k);
    return m[5] === 'x' ? a * t : b * t;
  }
  if (
    (m = /^Cho x\/(\d+) = y\/(\d+) = z\/(\d+) và x \+ y - z = (-?\d+)\. Tính ([xyz])\.$/.exec(p))
  ) {
    const [a, b, c, k] = m.slice(1, 5).map(Number);
    const t = solveFor((t) => a * t + b * t - c * t === k);
    return { x: a, y: b, z: c }[/** @type {'x' | 'y' | 'z'} */ (m[5])] * t;
  }
  m = /(\d+) (?:quyển sách|cây|cm), .*tỉ lệ với (\d+); (\d+); (\d+)\. (.*)$/.exec(p);
  if (m) {
    const n = Number(m[1]);
    const r = [Number(m[2]), Number(m[3]), Number(m[4])];
    const ask = m[5];
    const i = /7A|Tổ 1|số thứ nhất/.test(ask) ? 0 : /7B|Tổ 2|số thứ hai/.test(ask) ? 1 : 2;
    const t = solveFor((t) => (r[0] + r[1] + r[2]) * t === n);
    return r[i] * t;
  }
  if (
    (m = /^Cho biết y tỉ lệ (thuận|nghịch) với x và khi x = (-?\d+) thì y = (-?\d+)\. (.*)$/.exec(
      p,
    ))
  ) {
    const [x1, y1] = [Number(m[2]), Number(m[3])];
    const direct = m[1] === 'thuận';
    if (m[4].startsWith('Tìm hệ số')) {
      return direct ? solveFor((k) => k * x1 === y1) : solveFor((a) => a === x1 * y1, 5000);
    }
    const x2 = Number(/x = (-?\d+)\.$/.exec(m[4])?.[1]);
    return direct ? solveFor((y) => y * x1 === y1 * x2) : solveFor((y) => y * x2 === x1 * y1);
  }
  if ((m = /^Mua (\d+) quyển vở hết (\d+) nghìn đồng\. Hỏi mua (\d+) /.exec(p))) {
    const [a1, b1, a2] = m.slice(1, 4).map(Number);
    return solveFor((y) => y * a1 === b1 * a2, 5000);
  }
  if ((m = /in được (\d+) trang trong (\d+) phút\. Hỏi trong (\d+) phút/.exec(p))) {
    const [b1, a1, a2] = m.slice(1, 4).map(Number);
    return solveFor((y) => y * a1 === b1 * a2, 5000);
  }
  if ((m = /làm được (\d+) sản phẩm trong (\d+) giờ\. .*trong (\d+) giờ/.exec(p))) {
    const [b1, a1, a2] = m.slice(1, 4).map(Number);
    return solveFor((y) => y * a1 === b1 * a2, 5000);
  }
  if (
    (m =
      /thể tích (\d+) cm³ và (\d+) cm³\. .*hơn thanh thứ nhất (\d+) g\. Hỏi thanh thứ (nhất|hai)/.exec(
        p,
      ))
  ) {
    const [a, b, d] = m.slice(1, 4).map(Number);
    const k = solveFor((k) => (b - a) * k === d);
    return (m[4] === 'nhất' ? a : b) * k;
  }
  if ((m = /^(\d+) công nhân xây xong .* trong (\d+) ngày\. Hỏi (\d+) công nhân/.exec(p))) {
    const [n1, d1, n2] = m.slice(1, 4).map(Number);
    return solveFor((y) => n2 * y === n1 * d1);
  }
  if ((m = /vận tốc (\d+) km\/h thì hết (\d+) giờ\. Hỏi nếu đi với vận tốc (\d+) km\/h/.exec(p))) {
    const [v1, t1, v2] = m.slice(1, 4).map(Number);
    return solveFor((t) => v2 * t === v1 * t1);
  }
  m =
    /trong (\d+) ngày, đội thứ hai trong (\d+) ngày, đội thứ ba trong (\d+) ngày\. Ba đội có tất cả (\d+) máy.*đội thứ (nhất|hai|ba)/.exec(
      p,
    ) ??
    /^Chia số (\d+) thành ba phần tỉ lệ nghịch với (\d+); (\d+); (\d+)\. Tìm phần thứ (nhất|hai|ba)\.$/.exec(
      p,
    );
  if (m) {
    const nums = m.slice(1, 5).map(Number);
    const [d, n] = p.startsWith('Chia') ? [nums.slice(1), nums[0]] : [nums.slice(0, 3), nums[3]];
    const i = ['nhất', 'hai', 'ba'].indexOf(m[5]);
    // Brute force: the parts x, y, z with d0·x = d1·y = d2·z and x + y + z = n.
    for (let x = 1; x <= n; x++) {
      const c = d[0] * x;
      if (c % d[1] || c % d[2]) continue;
      if (x + c / d[1] + c / d[2] === n) return [x, c / d[1], c / d[2]][i];
    }
    throw new Error(`no split for ${prompt}`);
  }
  if (
    (m =
      /bánh thứ nhất có (\d+) răng, bánh thứ hai có (\d+) răng\. Khi bánh thứ nhất quay được (\d+) vòng/.exec(
        p,
      ))
  ) {
    const [z1, z2, r1] = m.slice(1, 4).map(Number);
    return solveFor((r) => z2 * r === z1 * r1);
  }
  if ((m = /^Để làm (\d+) chiếc bánh cần (\d+) g bột\. Hỏi làm (\d+) chiếc/.exec(p))) {
    const [n1, g1, n2] = m.slice(1, 4).map(Number);
    return solveFor((g) => g * n1 === g1 * n2, 5000);
  }
  if (
    (m =
      /mua được (\d+) m vải loại I hoặc (\d+) m vải loại II\. Giá 1 m vải loại I là (\d+) nghìn/.exec(
        p,
      ))
  ) {
    const [m1, m2, p1] = m.slice(1, 4).map(Number);
    return solveFor((q) => m2 * q === m1 * p1, 5000);
  }
  if (
    (m = /^Một đội (\d+) người làm xong một công việc trong (\d+) ngày\. .*sớm hơn (\d+) ngày/.exec(
      p,
    ))
  ) {
    const [n1, d1, e] = m.slice(1, 4).map(Number);
    return solveFor((extra) => (n1 + extra) * (d1 - e) === n1 * d1);
  }
  if (
    (m =
      /An góp (\d+) triệu đồng, bạn Bình góp (\d+) triệu đồng\. Tiền lãi (\d+) triệu .* bạn (An|Bình)/.exec(
        p,
      ))
  ) {
    const [a, b, l] = m.slice(1, 4).map(Number);
    const x = solveFor((x) => x * (a + b) === l * a);
    return m[4] === 'An' ? x : l - x;
  }
  throw new Error(`no recompute rule for: ${prompt}`);
}

/**
 * The single integer from −range to range that satisfies `ok`.
 * @param {(x: number) => boolean} ok
 * @param {number} [range]
 */
function solveFor(ok, range = 500) {
  const found = [];
  for (let x = -range; x <= range; x++) if (ok(x)) found.push(x);
  if (found.length !== 1) throw new Error(`expected one solution, got ${found.length}`);
  return found[0];
}

describe('chapter skills', () => {
  for (const skill of [tiLeThuc, dayTiSo, tiLeThuan, tiLeNghich, vanDung]) {
    it(`${skill.id}: every answer matches a fresh computation from the prompt`, () => {
      const rand = rng(2026);
      for (let i = 0; i < 400; i++) {
        const q = skill.make(rand);
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(recompute(q.prompt), q.prompt).toBe(q.answer);
        expect(q.steps.join(' '), q.prompt).toContain(intText(q.answer));
        expect(readInteger(intText(q.answer))).toBe(q.answer);
        for (const h of q.hints ?? []) expect(h).not.toMatch(/\bundefined\b|NaN/);
        expect(q.prompt).not.toMatch(/\bundefined\b|NaN|--|\+ -/);
      }
    });
  }

  it('builds a page set with no repeated prompt', () => {
    for (let seed = 1; seed < 30; seed++) {
      const set = buildSet(PAGE_10_SKILLS, 5, seed);
      expect(set).toHaveLength(10);
      expect(new Set(set.map((q) => q.prompt)).size).toBe(10);
      const page19 = buildSet(PAGE_19_SKILLS, 5, seed);
      expect(new Set(page19.map((q) => q.prompt)).size).toBe(10);
      const review = buildSet(CHAPTER_SKILLS, 2, seed);
      expect(new Set(review.map((q) => q.prompt)).size).toBe(10);
    }
  });
});
