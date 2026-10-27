/**
 * Question generators for the chapter "Tam giác đồng dạng", one skill per
 * lesson. Lengths are in cm or m and may be decimals with at most two digits
 * after the comma, so the boards read answers with `readNumber` and write them
 * with `answerText`. Prompts and steps are plain text: a ratio is written
 * "AM/AB", a decimal with a comma, "∽" for "đồng dạng với".
 */

import { int, pick } from '#lib/core/drill.js';
import { numberText } from '#lib/core/decimal.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** Rounds away binary noise from products of short decimals. @param {number} n */
export const tidy = (n) => Math.round(n * 1e6) / 1e6;

/** A number with a decimal comma. @param {number} n */
const t = (n) => numberText(tidy(n));

/** Scale factors other than 1, with at most one decimal digit. */
const RATIOS = [0.5, 1.5, 2, 2.5, 3, 4];

/** Pythagorean triples (leg, leg, hypotenuse). */
const TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
];

/**
 * Three whole sides of a real, scalene-or-not triangle, each 3 to 12.
 * @param {() => number} rand
 */
function sides(rand) {
  const a = int(rand, 3, 10);
  const b = int(rand, 3, 10);
  const c = int(rand, Math.abs(a - b) + 1, Math.min(12, a + b - 1));
  return { a, b, c };
}

/** @type {Skill} */
export const dongDang = {
  id: 'dong-dang',
  label: 'Bài 33. Hai tam giác đồng dạng',
  make(rand) {
    const v = int(rand, 0, 3);
    const k = pick(rand, RATIOS);
    if (v === 0) {
      const { a, b } = sides(rand);
      return {
        prompt: `Cho △A′B′C′ ∽ △ABC với AB = ${a} cm, BC = ${b} cm và A′B′ = ${t(k * a)} cm. Tính B′C′.`,
        answer: tidy(k * b),
        unit: 'cm',
        hints: ['Tìm tỉ số đồng dạng k = A′B′/AB trước.', 'B′C′ ứng với BC nên B′C′ = k · BC.'],
        steps: [
          `Tỉ số đồng dạng k = A′B′/AB = ${t(k * a)} : ${a} = ${t(k)}.`,
          `B′C′ = k · BC = ${t(k)} · ${b} = ${t(k * b)} cm.`,
        ],
      };
    }
    if (v === 1) {
      // AM : AB = p : (p + q); BC = (p + q)·s so MN = p·s stays short.
      const p = int(rand, 1, 4);
      const q = int(rand, 1, 4);
      const s = int(rand, 2, 6) / 2;
      const am = p;
      const ab = p + q;
      const bc = tidy((p + q) * s);
      return {
        prompt: `Tam giác ABC có M thuộc AB, N thuộc AC, MN ∥ BC, AM = ${am} cm, AB = ${ab} cm, BC = ${t(bc)} cm. Tính MN.`,
        answer: tidy(p * s),
        unit: 'cm',
        hints: ['MN ∥ BC nên △AMN ∽ △ABC.', 'MN/BC = AM/AB.'],
        steps: [
          'Vì MN ∥ BC nên △AMN ∽ △ABC, suy ra MN/BC = AM/AB.',
          `MN = ${t(bc)} · ${am} : ${ab} = ${t(p * s)} cm.`,
        ],
      };
    }
    if (v === 2) {
      const { a, b, c } = sides(rand);
      const per = a + b + c;
      return {
        prompt: `△A′B′C′ ∽ △ABC theo tỉ số k = ${t(k)}. △ABC có ba cạnh ${a} cm, ${b} cm, ${c} cm. Tính chu vi △A′B′C′.`,
        answer: tidy(k * per),
        unit: 'cm',
        hints: ['Mỗi cạnh của △A′B′C′ bằng k lần cạnh tương ứng.', 'Chu vi cũng nhân với k.'],
        steps: [
          `Chu vi △ABC = ${a} + ${b} + ${c} = ${per} cm.`,
          `Chu vi △A′B′C′ = ${t(k)} · ${per} = ${t(k * per)} cm.`,
        ],
      };
    }
    const A = 5 * int(rand, 6, 16);
    const B = 5 * int(rand, 6, 30 - A / 5);
    return {
      prompt: `△DEF ∽ △ABC, góc A = ${A}°, góc B = ${B}°. Tính góc F.`,
      answer: 180 - A - B,
      unit: '°',
      hints: ['F ứng với C.', 'Tính góc C từ tổng ba góc của tam giác.'],
      steps: [
        'Vì △DEF ∽ △ABC nên góc F = góc C.',
        `Góc C = 180° − ${A}° − ${B}° = ${180 - A - B}°, nên góc F = ${180 - A - B}°.`,
      ],
    };
  },
};

/** @type {Skill} */
export const truongHop = {
  id: 'truong-hop',
  label: 'Bài 34. Ba trường hợp đồng dạng',
  make(rand) {
    const v = int(rand, 0, 3);
    const k = pick(rand, RATIOS);
    if (v === 0) {
      const { a, b, c } = sides(rand);
      return {
        prompt: `△ABC có AB = ${a} cm, BC = ${b} cm, CA = ${c} cm. △MNP có MN = ${t(k * a)} cm, NP = ${t(k * b)} cm. Tính PM để △MNP ∽ △ABC.`,
        answer: tidy(k * c),
        unit: 'cm',
        hints: ['Theo trường hợp c.c.c, ba tỉ số MN/AB, NP/BC, PM/CA phải bằng nhau.'],
        steps: [
          `MN/AB = NP/BC = ${t(k)}.`,
          `Cần PM/CA = ${t(k)}, nên PM = ${t(k)} · ${c} = ${t(k * c)} cm.`,
        ],
      };
    }
    if (v === 1) {
      const { a, b, c } = sides(rand);
      return {
        prompt: `△ABC có AB = ${a} cm, AC = ${b} cm, BC = ${c} cm. △A′B′C′ có A′B′ = ${t(k * a)} cm, A′C′ = ${t(k * b)} cm và góc A′ = góc A. Tính B′C′.`,
        answer: tidy(k * c),
        unit: 'cm',
        hints: [
          'So sánh A′B′/AB với A′C′/AC.',
          'Hai cạnh tỉ lệ, góc xen giữa bằng nhau: trường hợp c.g.c.',
        ],
        steps: [
          `A′B′/AB = A′C′/AC = ${t(k)} và góc A′ = góc A, nên △A′B′C′ ∽ △ABC (c.g.c).`,
          `B′C′ = ${t(k)} · ${c} = ${t(k * c)} cm.`,
        ],
      };
    }
    if (v === 2) {
      // AB² = AD · AC with AD = d, AC = d·m², AB = d·m.
      const d = int(rand, 1, 5);
      const m = int(rand, 2, 3);
      const ad = d;
      const ac = d * m * m;
      const ab = d * m;
      const given = `Tam giác ABC có điểm D trên cạnh AC sao cho góc ABD = góc ACB`;
      if (rand() < 0.5) {
        return {
          prompt: `${given}, AB = ${ab} cm, AC = ${ac} cm. Tính AD.`,
          answer: ad,
          unit: 'cm',
          hints: ['△ABD và △ACB có chung góc A.', 'Từ △ABD ∽ △ACB suy ra AB/AC = AD/AB.'],
          steps: [
            '△ABD ∽ △ACB (g.g) nên AB/AC = AD/AB, tức AB² = AD · AC.',
            `AD = ${ab}² : ${ac} = ${ab * ab} : ${ac} = ${ad} cm.`,
          ],
        };
      }
      return {
        prompt: `${given}, AD = ${ad} cm, AC = ${ac} cm. Tính AB.`,
        answer: ab,
        unit: 'cm',
        hints: ['△ABD ∽ △ACB (g.g).', 'Suy ra AB² = AD · AC.'],
        steps: [
          '△ABD ∽ △ACB (g.g) nên AB/AC = AD/AB, tức AB² = AD · AC.',
          `AB² = ${ad} · ${ac} = ${ab * ab}, nên AB = ${ab} cm.`,
        ],
      };
    }
    const A = 5 * int(rand, 8, 18);
    const B = 5 * int(rand, 6, 28 - A / 5);
    const C = 180 - A - B;
    const ab = int(rand, 3, 10);
    return {
      prompt: `△ABC có góc A = ${A}°, góc B = ${B}°, AB = ${ab} cm. △DEF có góc D = ${A}°, góc F = ${C}°, DE = ${t(k * ab)} cm. Tính tỉ số EF/BC.`,
      answer: k,
      hints: ['Tính góc C để ghép đỉnh tương ứng.', 'Hai tam giác đồng dạng theo trường hợp g.g.'],
      steps: [
        `Góc C = 180° − ${A}° − ${B}° = ${C}° = góc F, và góc D = góc A, nên △DEF ∽ △ABC (g.g).`,
        `EF/BC = DE/AB = ${t(k * ab)} : ${ab} = ${t(k)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const pythagore = {
  id: 'pythagore',
  label: 'Bài 35. Định lí Pythagore',
  make(rand) {
    const v = int(rand, 0, 3);
    const [p, q, r] = pick(rand, TRIPLES);
    const s = r > 20 ? 1 : int(rand, 1, 3);
    const a = p * s;
    const b = q * s;
    const c = r * s;
    if (v === 0) {
      return {
        prompt: `Tam giác ABC vuông tại A có AB = ${a} cm, AC = ${b} cm. Tính BC.`,
        answer: c,
        unit: 'cm',
        hints: ['BC là cạnh huyền.', 'BC² = AB² + AC².'],
        steps: [`BC² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}.`, `BC = ${c} cm.`],
      };
    }
    if (v === 1) {
      return {
        prompt: `Tam giác ABC vuông tại A có BC = ${c} cm, AB = ${a} cm. Tính AC.`,
        answer: b,
        unit: 'cm',
        hints: ['AC² = BC² − AB².'],
        steps: [`AC² = ${c}² − ${a}² = ${c * c} − ${a * a} = ${b * b}.`, `AC = ${b} cm.`],
      };
    }
    if (v === 2) {
      // A ladder 2,5 m to 13 m long from a 3-4-5 or 5-12-13 triangle, in
      // half metres; the ladder is the hypotenuse, the wall the longer leg.
      const [lp, lq, lr] = pick(rand, TRIPLES.slice(0, 2));
      const ls = int(rand, 1, 2);
      const lad = (lr * ls) / 2;
      const foot = (lp * ls) / 2;
      const top = (lq * ls) / 2;
      return {
        prompt: `Một chiếc thang dài ${t(lad)} m dựa vào tường, chân thang cách chân tường ${t(foot)} m. Đỉnh thang cao bao nhiêu mét?`,
        answer: top,
        unit: 'm',
        hints: [
          'Thang là cạnh huyền của tam giác vuông.',
          'h² = thang² − (khoảng cách chân thang)².',
        ],
        steps: [
          `h² = ${t(lad)}² − ${t(foot)}² = ${t(lad * lad)} − ${t(foot * foot)} = ${t(top * top)}.`,
          `h = ${t(top)} m.`,
        ],
      };
    }
    return {
      prompt: `Một hình chữ nhật có hai cạnh ${a} cm và ${b} cm. Tính độ dài đường chéo.`,
      answer: c,
      unit: 'cm',
      hints: ['Đường chéo chia hình chữ nhật thành hai tam giác vuông.'],
      steps: [`d² = ${a}² + ${b}² = ${a * a + b * b}.`, `d = ${c} cm.`],
    };
  },
};

/** @type {Skill} */
export const tamGiacVuong = {
  id: 'tam-giac-vuong',
  label: 'Bài 36. Đồng dạng của tam giác vuông',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      // HB = s·u², HC = s·w², AH = s·u·w.
      const u = int(rand, 1, 3);
      let w = int(rand, 1, 4);
      if (w === u) w = u + 1;
      const s = int(rand, 1, 3);
      const hb = s * u * u;
      const hc = s * w * w;
      return {
        prompt: `Tam giác ABC vuông tại A, đường cao AH, HB = ${hb} cm, HC = ${hc} cm. Tính AH.`,
        answer: s * u * w,
        unit: 'cm',
        hints: ['△HBA ∽ △HAC (cùng đồng dạng với △ABC).', 'Suy ra AH² = HB · HC.'],
        steps: [
          '△HBA ∽ △HAC nên HB/HA = HA/HC, tức AH² = HB · HC.',
          `AH² = ${hb} · ${hc} = ${hb * hc}, nên AH = ${s * u * w} cm.`,
        ],
      };
    }
    if (v === 1) {
      // A 3-4-5 triangle scaled by s: BH = AB²/BC.
      const s = int(rand, 1, 4);
      const leg = pick(rand, [3, 4]) * s;
      const bc = 5 * s;
      const bh = tidy((leg * leg) / bc);
      return {
        prompt: `Tam giác ABC vuông tại A, đường cao AH, BH = ${t(bh)} cm, BC = ${bc} cm. Tính AB.`,
        answer: leg,
        unit: 'cm',
        hints: ['△HBA ∽ △ABC (chung góc B).', 'Suy ra AB² = BH · BC.'],
        steps: [
          '△HBA ∽ △ABC nên HB/AB = AB/BC, tức AB² = BH · BC.',
          `AB² = ${t(bh)} · ${bc} = ${leg * leg}, nên AB = ${leg} cm.`,
        ],
      };
    }
    if (v === 2) {
      const h = pick(rand, [1, 1.2, 1.5, 1.6, 2]);
      const shadow = pick(rand, [0.5, 0.8, 1, 1.2, 1.5, 2]);
      const r = pick(rand, [3, 4, 5, 6, 8]);
      const big = tidy(shadow * r);
      return {
        prompt: `Cùng lúc, một chiếc cọc cao ${t(h)} m dựng thẳng đứng có bóng dài ${t(shadow)} m, còn một cột cờ có bóng dài ${t(big)} m. Cột cờ cao bao nhiêu mét?`,
        answer: tidy(h * r),
        unit: 'm',
        hints: [
          'Hai tam giác vuông (vật – bóng) có góc nhọn bằng nhau nên đồng dạng.',
          'Chiều cao tỉ lệ với độ dài bóng.',
        ],
        steps: [
          `Chiều cao cột cờ / ${t(h)} = ${t(big)} / ${t(shadow)} = ${r}.`,
          `Chiều cao cột cờ = ${t(h)} · ${r} = ${t(h * r)} m.`,
        ],
      };
    }
    const [p, q, r] = pick(rand, TRIPLES.slice(0, 2));
    const k = pick(rand, [1.5, 2, 2.5, 3]);
    return {
      prompt: `△ABC vuông tại A có BC = ${r} cm, AB = ${p} cm. △DEF vuông tại D có EF = ${t(k * r)} cm, DE = ${t(k * p)} cm. Tính DF.`,
      answer: tidy(k * q),
      unit: 'cm',
      hints: [
        'Cạnh huyền và một cạnh góc vuông tỉ lệ nên hai tam giác vuông đồng dạng.',
        'Tính AC bằng định lí Pythagore rồi nhân với tỉ số đồng dạng.',
      ],
      steps: [
        `EF/BC = DE/AB = ${t(k)} nên △DEF ∽ △ABC.`,
        `AC² = ${r}² − ${p}² = ${q * q}, AC = ${q} cm.`,
        `DF = ${t(k)} · ${q} = ${t(k * q)} cm.`,
      ],
    };
  },
};

/** @type {Skill} */
export const hinhDongDang = {
  id: 'hinh-dong-dang',
  label: 'Bài 37. Hình đồng dạng',
  make(rand) {
    const v = int(rand, 0, 3);
    const k = pick(rand, RATIOS);
    if (v === 0) {
      const oa = int(rand, 2, 12) / 2;
      return {
        prompt: `Hình H′ đồng dạng phối cảnh với hình H, tâm O, tỉ số k = ${t(k)}. Điểm A thuộc H có OA = ${t(oa)} cm. Tính OA′ của điểm tương ứng A′.`,
        answer: tidy(k * oa),
        unit: 'cm',
        hints: ['A′ nằm trên tia OA và OA′ = k · OA.'],
        steps: [`OA′ = k · OA = ${t(k)} · ${t(oa)} = ${t(k * oa)} cm.`],
      };
    }
    if (v === 1) {
      const oa = int(rand, 2, 8);
      return {
        prompt: `Hình H′ đồng dạng phối cảnh với hình H, tâm O; A′ là điểm tương ứng của A, OA = ${oa} cm, OA′ = ${t(k * oa)} cm. Tính tỉ số đồng dạng k.`,
        answer: k,
        hints: ['k = OA′/OA.'],
        steps: [`k = OA′/OA = ${t(k * oa)} : ${oa} = ${t(k)}.`],
      };
    }
    if (v === 2) {
      const { a, b, c } = sides(rand);
      const per = a + b + c;
      return {
        prompt: `Tam giác ABC có ba cạnh ${a} cm, ${b} cm, ${c} cm. Tam giác A′B′C′ đồng dạng phối cảnh với nó, tỉ số k = ${t(k)}. Tính chu vi tam giác A′B′C′.`,
        answer: tidy(k * per),
        unit: 'cm',
        hints: ['Mọi đoạn thẳng đều được nhân với k.'],
        steps: [
          `Chu vi △ABC = ${per} cm.`,
          `Chu vi △A′B′C′ = ${t(k)} · ${per} = ${t(k * per)} cm.`,
        ],
      };
    }
    const n = pick(rand, [50000, 100000, 200000, 500000]);
    const d = int(rand, 2, 24) / 2;
    const km = tidy((d * n) / 100000);
    return {
      prompt: `Trên bản đồ tỉ lệ 1 : ${fmt(n)}, hai điểm cách nhau ${t(d)} cm. Khoảng cách thật là bao nhiêu ki-lô-mét?`,
      answer: km,
      unit: 'km',
      hints: [`Độ dài thật gấp ${fmt(n)} lần độ dài trên bản đồ.`, '1 km = 100 000 cm.'],
      steps: [
        `Khoảng cách thật = ${t(d)} · ${fmt(n)} = ${fmt(tidy(d * n))} cm.`,
        `${fmt(tidy(d * n))} cm = ${t(km)} km.`,
      ],
    };
  },
};

/** @type {Skill} */
export const thucTe = {
  id: 'thuc-te',
  label: 'Vận dụng thực tế',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      // Width of a river: AB ⊥ BE, DE ⊥ BE, A, C, D collinear, so
      // △ABC ∽ △DEC (g.g) and AB = DE · BC / CE with BC = m · CE.
      const ce = int(rand, 4, 12);
      const m = int(rand, 2, 5);
      const de = int(rand, 5, 15);
      const bc = ce * m;
      return {
        prompt: `Để đo khoảng cách AB qua một con sông, người ta đứng ở bờ có điểm B, kẻ BE vuông góc với AB, lấy C trên BE rồi dựng ED vuông góc với BE sao cho A, C, D thẳng hàng (D, A ở hai phía của BE). Đo được BC = ${bc} m, CE = ${ce} m, DE = ${de} m. Tính AB (mét).`,
        answer: de * m,
        unit: 'm',
        hints: [
          'Hai tam giác vuông ABC và DEC có hai góc ở C đối đỉnh.',
          '△ABC ∽ △DEC nên AB/DE = BC/EC.',
        ],
        steps: [
          '△ABC và △DEC vuông tại B, E và có góc ACB = góc DCE (đối đỉnh), nên △ABC ∽ △DEC.',
          `AB/DE = BC/EC = ${bc} : ${ce} = ${m}.`,
          `AB = ${m} · ${de} = ${de * m} m.`,
        ],
      };
    }
    if (v === 1) {
      // A mirror on the ground: equal angles at the mirror give similar
      // right triangles, tree = eye · (tree to mirror) / (person to mirror).
      const eye = pick(rand, [1.5, 1.6]);
      const a = pick(rand, [1, 1.5, 2]);
      const m = int(rand, 4, 10);
      const b = tidy(a * m);
      return {
        prompt: `Bạn Minh đặt một chiếc gương phẳng nằm trên mặt đất, lùi lại đến khi nhìn thấy ngọn cây trong gương. Khi đó Minh đứng cách gương ${t(a)} m, gốc cây cách gương ${t(b)} m, mắt Minh cách mặt đất ${t(eye)} m. Cây cao bao nhiêu mét?`,
        answer: tidy(eye * m),
        unit: 'm',
        hints: [
          'Góc tới bằng góc phản xạ nên hai tam giác vuông (người – gương, cây – gương) có một góc nhọn bằng nhau.',
          'Chiều cao cây / chiều cao mắt = khoảng cách cây – gương / khoảng cách người – gương.',
        ],
        steps: [
          'Hai tam giác vuông có góc nhọn ở gương bằng nhau nên đồng dạng.',
          `Chiều cao cây / ${t(eye)} = ${t(b)} : ${t(a)} = ${m}.`,
          `Chiều cao cây = ${t(eye)} · ${m} = ${t(eye * m)} m.`,
        ],
      };
    }
    if (v === 2) {
      // Looking through a window: eye d metres from a window w metres
      // tall sees a strip of the opposite wall w · (d + D) / d tall.
      const d = pick(rand, [1, 2]);
      const w = pick(rand, [0.6, 0.8, 1, 1.2]);
      const m = int(rand, 10, 30);
      const far = d * (m - 1);
      return {
        prompt: `Bạn Lan đứng cách cửa sổ ${d} m, nhìn qua cửa sổ cao ${t(w)} m sang bức tường của toà nhà đối diện cách cửa sổ ${far} m. Mép trên và mép dưới cửa sổ giới hạn tầm nhìn. Lan nhìn thấy được một phần bức tường cao bao nhiêu mét?`,
        answer: tidy(w * m),
        unit: 'm',
        hints: [
          'Tia nhìn qua hai mép cửa sổ tạo thành hai tam giác chung đỉnh ở mắt Lan, có cạnh đối diện song song.',
          'Chiều cao phần tường / chiều cao cửa sổ = khoảng cách từ mắt đến tường / khoảng cách từ mắt đến cửa sổ.',
        ],
        steps: [
          `Khoảng cách từ mắt đến tường là ${d} + ${far} = ${d + far} m.`,
          `Hai tam giác đồng dạng theo tỉ số ${d + far} : ${d} = ${m}.`,
          `Phần tường nhìn thấy cao ${t(w)} · ${m} = ${t(w * m)} m.`,
        ],
      };
    }
    // Height of a pyramid from the shadow of a stake.
    const stake = pick(rand, [1, 1.2, 2]);
    const shadow = pick(rand, [1.5, 2, 2.5]);
    const m = int(rand, 50, 80);
    const big = tidy(shadow * m);
    return {
      prompt: `Cùng một thời điểm, một cây cọc cao ${t(stake)} m cắm vuông góc với mặt đất có bóng dài ${t(shadow)} m, còn bóng của một kim tự tháp (tính từ tâm đáy) dài ${t(big)} m. Tính chiều cao kim tự tháp (mét).`,
      answer: tidy(stake * m),
      unit: 'm',
      hints: [
        'Tia nắng song song nên hai tam giác vuông (vật – bóng) có góc nhọn bằng nhau.',
        'Chiều cao tỉ lệ với độ dài bóng.',
      ],
      steps: [
        `Tỉ số đồng dạng: ${t(big)} : ${t(shadow)} = ${m}.`,
        `Chiều cao kim tự tháp = ${t(stake)} · ${m} = ${t(stake * m)} m.`,
      ],
    };
  },
};

/** Bài 33 and 34, practised on "Luyện tập chung trang 91". */
export const PRACTICE_91 = [dongDang, truongHop];

/** Bài 35, 36 and 37, practised on "Luyện tập chung trang 108". */
export const PRACTICE_108 = [pythagore, tamGiacVuong, hinhDongDang];

/** The whole chapter and its applied problems, for the end-of-chapter test. */
export const CHAPTER_SKILLS = [dongDang, truongHop, pythagore, tamGiacVuong, hinhDongDang, thucTe];
