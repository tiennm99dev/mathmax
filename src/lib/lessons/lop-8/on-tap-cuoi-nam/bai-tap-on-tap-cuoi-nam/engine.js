/**
 * Question generators for the grade 8 year-end review, one skill per chapter
 * of the book in book order: polynomials, special products, quadrilaterals,
 * Thalès, data and charts, rational expressions, linear equations, linear
 * functions, probability, similar triangles and pyramids. Answers are exact
 * values (see `#lib/core/adaptive.js`), so integers, fractions and decimals
 * are all checked exactly.
 */

import { int, pick } from '#lib/core/drill.js';
import { fmt, formatNumber, intText, operand } from '#lib/core/number-format.js';
import { fracText } from '#lib/core/fractions.js';
import { linText, sumText } from '#lib/core/algebra-text.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { fraction, simplify } from '#lib/fraction-engine/index.js';

/** @typedef {import('#lib/core/adaptive.js').ReviewSkill} ReviewSkill */
/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */

/** @param {number} n */
const whole = (n) => fraction(n, 1);

/** @param {Fraction} f */
const text = (f) => fracText(f.n, f.d);

/** A nonzero integer in [−max, −1] ∪ [1, max]. */
const nonzero = (/** @type {() => number} */ rand, /** @type {number} */ max) =>
  int(rand, 1, max) * pick(rand, [1, -1]);

/**
 * 'x + 3', 'x − 3' or 'x' for x + a.
 * @param {number} a
 * @param {string} [v]
 */
export function shift(a, v = 'x') {
  if (a === 0) return v;
  return a > 0 ? `${v} + ${a}` : `${v} − ${-a}`;
}

/** @type {ReviewSkill} */
export const daThuc = {
  id: 'da-thuc',
  label: 'Đa thức',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      /** @type {[number, number, number][]} */
      const terms = [
        [nonzero(rand, 5), 2, 1],
        [nonzero(rand, 6), 1, 1],
        [nonzero(rand, 9), 0, 0],
      ];
      const x = nonzero(rand, 3);
      const y = nonzero(rand, 3);
      const parts = terms.map(([c, ex, ey]) => c * x ** ex * y ** ey);
      const value = parts.reduce((s, p) => s + p, 0);
      const [[a], [b], [c]] = terms;
      return {
        prompt: `Tính giá trị của đa thức P = ${sumText(terms)} tại x = ${intText(x)}, y = ${intText(y)}.`,
        answer: whole(value),
        display: intText(value),
        hints: [
          'Thay x và y vào từng hạng tử; đặt số âm trong ngoặc.',
          'Tính lũy thừa trước, rồi nhân, cuối cùng cộng các kết quả.',
        ],
        steps: [
          `P = ${intText(a)} · ${operand(x)}² · ${operand(y)} + ${operand(b)} · ${operand(x)} · ${operand(y)} + ${operand(c)}.`,
          `P = ${intText(parts[0])} + ${operand(parts[1])} + ${operand(parts[2])}.`,
          `P = ${intText(value)}.`,
        ],
      };
    }
    if (v === 1) {
      /** @type {[number, number, number][]} */
      const terms = [];
      const used = new Set();
      while (terms.length < 3) {
        const ex = int(rand, 0, 4);
        const ey = int(rand, 0, 4);
        if (ex + ey === 0 || used.has(`${ex},${ey}`)) continue;
        used.add(`${ex},${ey}`);
        terms.push([nonzero(rand, 7), ex, ey]);
      }
      terms.push([nonzero(rand, 9), 0, 0]);
      const degs = terms.map(([, ex, ey]) => ex + ey);
      const deg = Math.max(...degs);
      return {
        prompt: `Tìm bậc của đa thức ${sumText(terms)}.`,
        answer: whole(deg),
        display: String(deg),
        hints: [
          'Bậc của một đơn thức là tổng số mũ của tất cả các biến trong đơn thức đó.',
          'Đa thức đã thu gọn: bậc của nó là bậc cao nhất trong các hạng tử.',
        ],
        steps: [
          `Bậc của các hạng tử lần lượt là ${degs.join('; ')}.`,
          `Bậc cao nhất là ${deg}, nên đa thức có bậc ${deg}.`,
        ],
      };
    }
    for (;;) {
      const a = nonzero(rand, 5);
      const b = nonzero(rand, 6);
      const k = int(rand, 2, 4);
      // (kx + a)(x + b) = kx² + (kb + a)x + ab
      const coef = k * b + a;
      if (coef === 0) continue;
      /** @type {[number, number, number][]} */
      const product = [
        [k, 2, 0],
        [coef, 1, 0],
        [a * b, 0, 0],
      ];
      return {
        prompt: `Thu gọn tích (${shift(a, `${k}x`)})(${shift(b)}) rồi tìm hệ số của x.`,
        answer: whole(coef),
        display: intText(coef),
        hints: [
          'Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia.',
          'Có hai tích chứa x bậc một; cộng hai hệ số của chúng.',
        ],
        steps: [
          `(${shift(a, `${k}x`)})(${shift(b)}) = ${k}x · x + ${k}x · ${operand(b)} + ${operand(a)} · x + ${operand(a)} · ${operand(b)}.`,
          `= ${sumText(product)}.`,
          `Hệ số của x là ${intText(coef)}.`,
        ],
      };
    }
  },
};

/** @type {ReviewSkill} */
export const hangDangThuc = {
  id: 'hang-dang-thuc',
  label: 'Hằng đẳng thức đáng nhớ',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const base = 10 * int(rand, 2, 10);
      const d = int(rand, 1, 3);
      const form = int(rand, 0, 2);
      if (form === 0) {
        const value = base * base - d * d;
        return {
          prompt: `Tính nhanh: ${base + d} · ${base - d}.`,
          answer: whole(value),
          display: fmt(value),
          hints: [
            `Viết ${base + d} = ${base} + ${d} và ${base - d} = ${base} − ${d}.`,
            'Dùng hằng đẳng thức hiệu hai bình phương: (a + b)(a − b) = a² − b².',
          ],
          steps: [
            `${base + d} · ${base - d} = (${base} + ${d})(${base} − ${d}) = ${base}² − ${d}².`,
            `= ${fmt(base * base)} − ${d * d} = ${fmt(value)}.`,
          ],
        };
      }
      const plus = form === 1;
      const n = plus ? base + d : base - d;
      const value = n * n;
      const sign = plus ? '+' : '−';
      return {
        prompt: `Tính nhanh: ${n}².`,
        answer: whole(value),
        display: fmt(value),
        hints: [
          `Viết ${n} = ${base} ${sign} ${d}.`,
          `Dùng hằng đẳng thức (a ${sign} b)² = a² ${sign} 2ab + b².`,
        ],
        steps: [
          `${n}² = (${base} ${sign} ${d})² = ${base}² ${sign} 2 · ${base} · ${d} + ${d}².`,
          `= ${fmt(base * base)} ${sign} ${2 * base * d} + ${d * d} = ${fmt(value)}.`,
        ],
      };
    }
    if (v === 1) {
      const a = int(rand, 1, 9);
      const t = a + nonzero(rand, 12);
      const minus = rand() < 0.5;
      const value = minus ? (t - a) ** 2 : (t + a) ** 2;
      const sign = minus ? '−' : '+';
      const inner = minus ? t - a : t + a;
      return {
        prompt: `Tính giá trị của biểu thức x² ${sign} ${2 * a}x + ${a * a} tại x = ${intText(t)}.`,
        answer: whole(value),
        display: fmt(value),
        hints: [
          `Biểu thức có dạng a² ${sign} 2ab + b², trong đó a là x, b là ${a}.`,
          `Viết gọn thành (x ${sign} ${a})² rồi mới thay số.`,
        ],
        steps: [
          `x² ${sign} ${2 * a}x + ${a * a} = (x ${sign} ${a})².`,
          `Tại x = ${intText(t)}: (${intText(t)} ${sign} ${a})² = ${operand(inner)}² = ${fmt(value)}.`,
        ],
      };
    }
    const a = int(rand, 1, 6);
    const x = nonzero(rand, 9);
    const c = 2 * a * x + a * a;
    return {
      prompt: `Tìm x, biết (x + ${a})² − x² = ${intText(c)}.`,
      answer: whole(x),
      display: intText(x),
      hints: [
        'Khai triển (x + a)² = x² + 2ax + a²; hai hạng tử x² triệt tiêu.',
        'Còn lại một phương trình bậc nhất ẩn x.',
      ],
      steps: [
        `(x + ${a})² − x² = x² + ${2 * a}x + ${a * a} − x² = ${2 * a}x + ${a * a}.`,
        `${2 * a}x + ${a * a} = ${intText(c)}, nên ${2 * a}x = ${intText(c - a * a)}.`,
        `x = ${intText(c - a * a)} : ${2 * a} = ${intText(x)}.`,
      ],
    };
  },
};

/** Pythagorean triples for right-angle questions. */
const TRIPLES = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20],
  [7, 24, 25],
];

/** @type {ReviewSkill} */
export const tuGiac = {
  id: 'tu-giac',
  label: 'Tứ giác',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      for (;;) {
        const a = int(rand, 50, 130);
        const b = int(rand, 50, 130);
        const c = int(rand, 50, 130);
        const d = 360 - a - b - c;
        if (d < 40 || d > 160) continue;
        return {
          prompt: `Tứ giác ABCD có góc A = ${a}°, góc B = ${b}°, góc C = ${c}°. Tính số đo (theo độ) góc D.`,
          answer: whole(d),
          display: String(d),
          hints: ['Tổng các góc của một tứ giác bằng 360°.'],
          steps: [
            `Góc D = 360° − (${a}° + ${b}° + ${c}°) = 360° − ${a + b + c}°.`,
            `Góc D = ${d}°.`,
          ],
        };
      }
    }
    if (v === 1) {
      const a = int(rand, 35, 145);
      const askB = rand() < 0.5;
      const value = askB ? 180 - a : a;
      return {
        prompt: `Hình bình hành ABCD có góc A = ${a}°. Tính số đo (theo độ) góc ${askB ? 'B' : 'C'}.`,
        answer: whole(value),
        display: String(value),
        hints: [
          'Trong hình bình hành, các góc đối bằng nhau.',
          'Hai góc kề một cạnh của hình bình hành là hai góc trong cùng phía, có tổng 180°.',
        ],
        steps: askB
          ? [
              'AD ∥ BC nên góc A và góc B là hai góc trong cùng phía: góc A + góc B = 180°.',
              `Góc B = 180° − ${a}° = ${value}°.`,
            ]
          : [
              'Góc C đối diện góc A, mà các góc đối của hình bình hành bằng nhau.',
              `Góc C = ${value}°.`,
            ],
      };
    }
    if (v === 2) {
      const [p, q, r] = pick(rand, TRIPLES);
      const rhombus = rand() < 0.5;
      if (rhombus) {
        return {
          prompt: `Hình thoi ABCD có hai đường chéo AC = ${2 * p} cm và BD = ${2 * q} cm. Tính độ dài cạnh của hình thoi (theo cm).`,
          answer: whole(r),
          display: String(r),
          hints: [
            'Hai đường chéo của hình thoi vuông góc với nhau tại trung điểm O của mỗi đường.',
            'Cạnh AB là cạnh huyền của tam giác vuông OAB; dùng định lí Pythagore.',
          ],
          steps: [
            `OA = ${2 * p} : 2 = ${p} (cm), OB = ${2 * q} : 2 = ${q} (cm), tam giác OAB vuông tại O.`,
            `AB² = ${p}² + ${q}² = ${p * p + q * q}.`,
            `AB = ${r} cm.`,
          ],
        };
      }
      return {
        prompt: `Hình chữ nhật ABCD có AB = ${q} cm, BC = ${p} cm. Tính độ dài đường chéo AC (theo cm).`,
        answer: whole(r),
        display: String(r),
        hints: [
          'Hình chữ nhật có bốn góc vuông, nên tam giác ABC vuông tại B.',
          'Dùng định lí Pythagore: AC² = AB² + BC².',
        ],
        steps: [`AC² = ${q}² + ${p}² = ${p * p + q * q}.`, `AC = ${r} cm.`],
      };
    }
    const d = int(rand, 50, 85);
    return {
      prompt: `Hình thang cân ABCD (AB ∥ CD) có góc D = ${d}°. Tính số đo (theo độ) góc A.`,
      answer: whole(180 - d),
      display: String(180 - d),
      hints: [
        'AB ∥ CD nên góc A và góc D là hai góc trong cùng phía.',
        'Hai góc trong cùng phía tạo bởi hai đường thẳng song song có tổng 180°.',
      ],
      steps: [`Góc A + góc D = 180°.`, `Góc A = 180° − ${d}° = ${180 - d}°.`],
    };
  },
};

/** @type {ReviewSkill} */
export const thales = {
  id: 'thales',
  label: 'Định lí Thalès',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const mn = int(rand, 3, 25);
      const askMN = rand() < 0.5;
      const value = askMN ? mn : 2 * mn;
      return {
        prompt: askMN
          ? `Tam giác ABC có M, N lần lượt là trung điểm của AB, AC và BC = ${2 * mn} cm. Tính MN (theo cm).`
          : `Tam giác ABC có M, N lần lượt là trung điểm của AB, AC và MN = ${mn} cm. Tính BC (theo cm).`,
        answer: whole(value),
        display: String(value),
        hints: [
          'MN là đường trung bình của tam giác ABC.',
          'Đường trung bình song song với cạnh thứ ba và bằng nửa cạnh ấy.',
        ],
        steps: askMN
          ? [`MN là đường trung bình nên MN = BC : 2 = ${2 * mn} : 2.`, `MN = ${mn} cm.`]
          : [`MN là đường trung bình nên BC = 2 · MN = 2 · ${mn}.`, `BC = ${2 * mn} cm.`],
      };
    }
    if (v === 1) {
      for (;;) {
        const am = int(rand, 2, 12);
        const mb = int(rand, 2, 12);
        const t = int(rand, 1, 6);
        const g = gcd(am, mb);
        // AN and NC are multiples of AM/g and MB/g, so NC = AN · MB / AM is whole.
        const an = (am / g) * t;
        const nc = (mb / g) * t;
        if (am === mb || an > 30 || nc > 30) continue;
        return {
          prompt: `Tam giác ABC có M thuộc cạnh AB, N thuộc cạnh AC và MN ∥ BC. Biết AM = ${am} cm, MB = ${mb} cm, AN = ${an} cm. Tính NC (theo cm).`,
          answer: whole(nc),
          display: String(nc),
          hints: [
            'Định lí Thalès: một đường thẳng song song với một cạnh của tam giác định ra trên hai cạnh kia những đoạn thẳng tương ứng tỉ lệ.',
            'AM/MB = AN/NC.',
          ],
          steps: [
            `MN ∥ BC nên AM/MB = AN/NC, tức là ${am}/${mb} = ${an}/NC.`,
            `NC = ${an} · ${mb} : ${am} = ${nc} (cm).`,
            `NC = ${nc} cm.`,
          ],
        };
      }
    }
    for (;;) {
      const p = int(rand, 2, 6);
      const q = int(rand, 2, 6);
      if (p === q || gcd(p, q) !== 1) continue;
      const t = int(rand, 2, 4);
      const s = int(rand, 1, t * 2);
      // AB = p·t, AC = q·t, DB = p·s, DC = q·s; BC = (p + q)s.
      const ab = p * t;
      const ac = q * t;
      const bc = (p + q) * s;
      if (!(bc < ab + ac && bc > Math.abs(ab - ac))) continue;
      const db = p * s;
      const dc = q * s;
      return {
        prompt: `Tam giác ABC có AB = ${ab} cm, AC = ${ac} cm; đường phân giác của góc A cắt BC tại D. Biết DC = ${dc} cm, tính DB (theo cm).`,
        answer: whole(db),
        display: String(db),
        hints: [
          'Đường phân giác của một góc trong tam giác chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề hai đoạn ấy.',
          'DB/DC = AB/AC.',
        ],
        steps: [
          `AD là phân giác nên DB/DC = AB/AC, tức là DB/${dc} = ${ab}/${ac}.`,
          `DB = ${dc} · ${ab} : ${ac} = ${db} (cm).`,
          `DB = ${db} cm.`,
        ],
      };
    }
  },
};

/** @type {ReviewSkill} */
export const thongKe = {
  id: 'thong-ke',
  label: 'Dữ liệu và biểu đồ',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const total = pick(rand, [20, 25, 40, 50, 80]);
      const step = 100 / gcd(total, 100);
      const percent = step * int(rand, 1, Math.floor(60 / step));
      const count = (total * percent) / 100;
      const fruit = pick(rand, ['cam', 'xoài', 'dưa hấu', 'chuối', 'nho']);
      return {
        prompt: `Biểu đồ hình quạt tròn cho biết loại quả yêu thích của ${total} học sinh lớp 8A, trong đó ${percent}% số học sinh thích ${fruit}. Có bao nhiêu học sinh thích ${fruit}?`,
        answer: whole(count),
        display: String(count),
        hints: [
          'Mỗi hình quạt biểu diễn tỉ lệ phần trăm của một phần so với toàn thể.',
          `Tính ${percent}% của ${total}.`,
        ],
        steps: [`${total} · ${percent} : 100 = ${count}.`, `Có ${count} học sinh thích ${fruit}.`],
      };
    }
    if (v === 1) {
      const classes = ['8A', '8B', '8C'];
      const boys = classes.map(() => int(rand, 14, 24));
      const girls = classes.map(() => int(rand, 14, 24));
      const askBoys = rand() < 0.5;
      const series = askBoys ? boys : girls;
      const total = series.reduce((s, x) => s + x, 0);
      const list = classes.map((c, i) => `${c}: ${boys[i]} nam, ${girls[i]} nữ`).join('; ');
      const who = askBoys ? 'nam' : 'nữ';
      return {
        prompt: `Biểu đồ cột kép cho số học sinh nam và nữ của ba lớp (${list}). Ba lớp có tất cả bao nhiêu học sinh ${who}?`,
        answer: whole(total),
        display: String(total),
        hints: [
          'Mỗi lớp có hai cột: một cột cho học sinh nam, một cột cho học sinh nữ.',
          `Chỉ cộng các cột của học sinh ${who}.`,
        ],
        steps: [`${series.join(' + ')} = ${total}.`, `Ba lớp có ${total} học sinh ${who}.`],
      };
    }
    const before = pick(rand, [20, 25, 40, 50, 80]);
    const step = 100 / gcd(before, 100);
    const percent = step * int(rand, 1, Math.floor(50 / step));
    const after = before + (before * percent) / 100;
    return {
      prompt: `Biểu đồ đoạn thẳng cho biết số cây xanh trường trồng được năm 2023 là ${before} cây, năm 2024 là ${after} cây. Số cây năm 2024 tăng bao nhiêu phần trăm so với năm 2023?`,
      answer: whole(percent),
      display: String(percent),
      hints: [
        'Tìm số cây tăng thêm trước.',
        'Tỉ lệ phần trăm tăng bằng số tăng thêm chia cho số ban đầu, nhân 100.',
      ],
      steps: [
        `Số cây tăng thêm: ${after} − ${before} = ${after - before}.`,
        `${after - before} : ${before} · 100 = ${percent}.`,
        `Tăng ${percent}%.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const phanThuc = {
  id: 'phan-thuc',
  label: 'Phân thức đại số',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = int(rand, 1, 9);
      let t = nonzero(rand, 12);
      if (t === a) t = a + 1;
      const value = t + a;
      return {
        prompt: `Rút gọn phân thức (x² − ${a * a})/(x − ${a}) rồi tính giá trị của nó tại x = ${intText(t)}.`,
        answer: whole(value),
        display: intText(value),
        hints: [
          `Phân tích tử thức bằng hằng đẳng thức hiệu hai bình phương: x² − ${a * a} = x² − ${a}².`,
          `Chia cả tử và mẫu cho nhân tử chung x − ${a}.`,
        ],
        steps: [
          `(x² − ${a * a})/(x − ${a}) = (x − ${a})(x + ${a})/(x − ${a}) = x + ${a} (với x ≠ ${a}).`,
          `Tại x = ${intText(t)}: ${intText(t)} + ${a} = ${intText(value)}.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 1, 5);
      const m = nonzero(rand, 12);
      const answer = simplify(fraction(m, k));
      const den = linText(k, -m);
      const num = linText(int(rand, 1, 4), int(rand, 1, 9));
      return {
        prompt: `Phân thức (${num})/(${den}) không xác định tại giá trị nào của x?`,
        answer,
        display: text(answer),
        hints: [
          'Một phân thức xác định khi mẫu thức khác 0.',
          `Phân thức không xác định khi ${den} = 0.`,
        ],
        steps: [
          `${den} = 0 khi ${k === 1 ? 'x' : `${k}x`} = ${intText(m)}.`,
          `x = ${text(answer)}.`,
        ],
      };
    }
    const a = int(rand, 1, 5);
    let t = int(rand, a + 1, a + 6);
    if (rand() < 0.5) t = -t;
    const answer = simplify(fraction(2 * a, t * t - a * a));
    return {
      prompt: `Thực hiện phép tính A = 1/(x − ${a}) − 1/(x + ${a}) rồi tính giá trị của A tại x = ${intText(t)}. Viết kết quả dưới dạng phân số tối giản.`,
      answer,
      display: text(answer),
      simplest: true,
      hints: [
        `Mẫu thức chung là (x − ${a})(x + ${a}) = x² − ${a * a}.`,
        'Quy đồng rồi trừ các tử thức; sau đó thay giá trị của x.',
      ],
      steps: [
        `A = (x + ${a} − x + ${a})/((x − ${a})(x + ${a})) = ${2 * a}/(x² − ${a * a}).`,
        `Tại x = ${intText(t)}: A = ${2 * a}/(${t * t} − ${a * a}) = ${2 * a}/${t * t - a * a}.`,
        `A = ${text(answer)}.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const phuongTrinh = {
  id: 'phuong-trinh',
  label: 'Phương trình bậc nhất một ẩn',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      for (;;) {
        const a = nonzero(rand, 9);
        const c = nonzero(rand, 9);
        if (a === c) continue;
        const x = nonzero(rand, 9);
        const b = int(rand, -15, 15);
        const d = (a - c) * x + b;
        if (Math.abs(d) > 60) continue;
        const left = a - c;
        const right = d - b;
        return {
          prompt: `Giải phương trình ${linText(a, b)} = ${linText(c, d)}.`,
          answer: whole(x),
          display: intText(x),
          hints: [
            'Chuyển các hạng tử chứa x sang một vế, các hằng số sang vế kia (nhớ đổi dấu).',
            'Thu gọn về dạng ax = b rồi chia hai vế cho a.',
          ],
          steps: [
            `${linText(a, 0)} ${c < 0 ? '+' : '−'} ${linText(Math.abs(c), 0)} = ${b === 0 ? intText(d) : `${intText(d)} ${b < 0 ? '+' : '−'} ${Math.abs(b)}`}.`,
            `${linText(left, 0)} = ${intText(right)}.`,
            `x = ${intText(right)} : ${operand(left)} = ${intText(x)}.`,
          ],
        };
      }
    }
    if (v === 1) {
      const w = int(rand, 4, 30);
      const d = int(rand, 2, 15);
      const l = w + d;
      const p = 2 * (w + l);
      return {
        prompt: `Một mảnh vườn hình chữ nhật có chu vi ${p} m, chiều dài hơn chiều rộng ${d} m. Tính chiều rộng của mảnh vườn (theo m).`,
        answer: whole(w),
        display: String(w),
        hints: [
          `Gọi chiều rộng là x (m, x > 0) thì chiều dài là x + ${d} (m).`,
          `Nửa chu vi bằng tổng chiều dài và chiều rộng: x + (x + ${d}) = ${p / 2}.`,
        ],
        steps: [
          `Gọi chiều rộng là x (m), x > 0; chiều dài là x + ${d} (m).`,
          `2(x + x + ${d}) = ${p}, tức là 2x + ${d} = ${p / 2}, nên 2x = ${p / 2 - d}.`,
          `x = ${w} (thỏa mãn). Chiều rộng là ${w} m.`,
        ],
      };
    }
    for (;;) {
      const m = int(rand, 2, 6);
      const n = int(rand, 2, 6);
      if (m === n) continue;
      const l = (m * n) / gcd(m, n);
      if (l > 30) continue;
      const x = l * nonzero(rand, 4);
      const c = x / m + x / n;
      return {
        prompt: `Giải phương trình x/${m} + x/${n} = ${intText(c)}.`,
        answer: whole(x),
        display: intText(x),
        hints: [
          `Quy đồng mẫu hai vế với mẫu chung ${l}, rồi khử mẫu.`,
          'Thu gọn vế trái về dạng ax rồi chia hai vế cho a.',
        ],
        steps: [
          `${linText(l / m, 0)}/${l} + ${linText(l / n, 0)}/${l} = ${intText(c * l)}/${l}, nên ${linText(l / m, 0)} + ${linText(l / n, 0)} = ${intText(c * l)}.`,
          `${l / m + l / n}x = ${intText(c * l)}.`,
          `x = ${intText(c * l)} : ${l / m + l / n} = ${intText(x)}.`,
        ],
      };
    }
  },
};

/** @type {ReviewSkill} */
export const hamSo = {
  id: 'ham-so',
  label: 'Hàm số bậc nhất',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const b = nonzero(rand, 9);
      const x0 = int(rand, 2, 5) * pick(rand, [1, -1]);
      const a = nonzero(rand, 5);
      const y0 = a * x0 + b;
      return {
        prompt: `Đồ thị của hàm số y = ax ${b < 0 ? '−' : '+'} ${Math.abs(b)} đi qua điểm M(${intText(x0)}; ${intText(y0)}). Tìm hệ số a.`,
        answer: whole(a),
        display: intText(a),
        hints: [
          'Điểm M thuộc đồ thị khi tọa độ của M thỏa mãn công thức của hàm số.',
          'Thay x và y bằng tọa độ của M, rồi giải phương trình ẩn a.',
        ],
        steps: [
          `${intText(y0)} = a · ${operand(x0)} ${b < 0 ? '−' : '+'} ${Math.abs(b)}, nên ${linText(x0, 0, 'a')} = ${intText(y0 - b)}.`,
          `a = ${intText(y0 - b)} : ${operand(x0)} = ${intText(a)}.`,
        ],
      };
    }
    if (v === 1) {
      const k = nonzero(rand, 5);
      const c = int(rand, -6, 6);
      const x0 = nonzero(rand, 4);
      let y0 = int(rand, -12, 12);
      if (y0 === k * x0 + c) y0 += 1;
      const b = y0 - k * x0;
      return {
        prompt: `Đường thẳng y = ax + b song song với đường thẳng y = ${linText(k, c)} và đi qua điểm A(${intText(x0)}; ${intText(y0)}). Tìm b.`,
        answer: whole(b),
        display: intText(b),
        hints: [
          "Hai đường thẳng y = ax + b và y = a'x + b' song song khi a = a' và b ≠ b'.",
          `Vậy a = ${intText(k)}; thay tọa độ của A để tìm b.`,
        ],
        steps: [
          `Song song nên a = ${intText(k)} (và b ≠ ${intText(c)}).`,
          `${intText(y0)} = ${intText(k)} · ${operand(x0)} + b, nên b = ${intText(y0)} − ${operand(k * x0)} = ${intText(b)}.`,
          `b = ${intText(b)}.`,
        ],
      };
    }
    const a = nonzero(rand, 5);
    const b = nonzero(rand, 12);
    const answer = simplify(fraction(-b, a));
    return {
      prompt: `Đồ thị của hàm số y = ${linText(a, b)} cắt trục hoành tại điểm có hoành độ bằng bao nhiêu?`,
      answer,
      display: text(answer),
      hints: [
        'Điểm nằm trên trục hoành có tung độ bằng 0.',
        `Giải phương trình ${linText(a, b)} = 0.`,
      ],
      steps: [
        `${linText(a, b)} = 0 nên ${linText(a, 0)} = ${intText(-b)}.`,
        `x = ${intText(-b)} : ${operand(a)} = ${text(answer)}.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const xacSuat = {
  id: 'xac-suat',
  label: 'Xác suất của biến cố',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const red = int(rand, 2, 9);
      const blue = int(rand, 2, 9);
      const white = int(rand, 1, 8);
      const total = red + blue + white;
      const which = int(rand, 0, 2);
      const fav = [total - red, red + blue, blue][which];
      const event = ['không phải màu đỏ', 'không phải màu trắng', 'màu xanh'][which];
      const answer = simplify(fraction(fav, total));
      return {
        prompt: `Một túi có ${red} viên bi đỏ, ${blue} viên bi xanh và ${white} viên bi trắng có cùng kích thước. Lấy ngẫu nhiên một viên bi. Tính xác suất để viên bi lấy ra ${event}.`,
        answer,
        display: text(answer),
        hints: [
          `Có ${total} kết quả có thể, đồng khả năng vì các viên bi giống nhau về kích thước.`,
          'Đếm số kết quả thuận lợi rồi lấy tỉ số với số kết quả có thể.',
        ],
        steps: [
          `Số kết quả có thể: ${red} + ${blue} + ${white} = ${total}.`,
          `Số kết quả thuận lợi: ${fav}.`,
          fav === answer.n
            ? `Xác suất là ${text(answer)}.`
            : `Xác suất là ${fav}/${total} = ${text(answer)}.`,
        ],
      };
    }
    if (v === 1) {
      const n = pick(rand, [100, 200, 250, 500]);
      const lot = pick(rand, [1000, 2000, 5000, 10000]);
      const k = int(rand, 1, Math.floor(n * 0.08));
      return defectQuestion(n, k, lot, (lot / n) * k);
    }
    const total = int(rand, 12, 30);
    const k = int(rand, 3, 6);
    const fav = Math.floor(total / k);
    const answer = simplify(fraction(fav, total));
    const multiples =
      fav <= 3
        ? Array.from({ length: fav }, (_, i) => (i + 1) * k).join(', ')
        : `${k}, ${2 * k}, ..., ${fav * k}`;
    return {
      prompt: `Một hộp có ${total} tấm thẻ cùng loại, ghi các số 1, 2, ..., ${total}. Rút ngẫu nhiên một thẻ. Tính xác suất để số ghi trên thẻ chia hết cho ${k}.`,
      answer,
      display: text(answer),
      hints: [
        `Có ${total} kết quả đồng khả năng; đếm các số từ 1 đến ${total} chia hết cho ${k}.`,
        'Xác suất bằng số kết quả thuận lợi chia cho số kết quả có thể.',
      ],
      steps: [
        `Các số chia hết cho ${k} là ${multiples}, gồm ${fav} số.`,
        fav === answer.n
          ? `Xác suất là ${text(answer)}.`
          : `Xác suất là ${fav}/${total} = ${text(answer)}.`,
      ],
    };
  },
};

/**
 * Estimating defective items in a lot from an experimental probability.
 * @param {number} n items checked
 * @param {number} k defective among them
 * @param {number} lot size of the whole lot
 * @param {number} estimate lot · k / n, a whole number
 */
function defectQuestion(n, k, lot, estimate) {
  return {
    prompt: `Kiểm tra ngẫu nhiên ${n} sản phẩm của một nhà máy thấy có ${k} phế phẩm. Hãy ước lượng số phế phẩm trong một lô ${fmt(lot)} sản phẩm của nhà máy đó.`,
    answer: whole(estimate),
    display: fmt(estimate),
    hints: [
      `Xác suất thực nghiệm của biến cố "sản phẩm là phế phẩm" là ${k}/${n}.`,
      'Số phế phẩm trong lô xấp xỉ bằng số sản phẩm của lô nhân với xác suất thực nghiệm đó.',
    ],
    steps: [
      `Xác suất thực nghiệm: ${k}/${n}.`,
      `${fmt(lot)} · ${k}/${n} = ${fmt(estimate)}.`,
      `Lô hàng có khoảng ${fmt(estimate)} phế phẩm.`,
    ],
  };
}

/** @type {ReviewSkill} */
export const dongDang = {
  id: 'dong-dang',
  label: 'Tam giác đồng dạng, định lí Pythagore',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      for (;;) {
        const m = int(rand, 1, 5);
        const n = int(rand, 1, 5);
        if (m === n || gcd(m, n) !== 1) continue;
        const t = int(rand, 1, 4);
        const u = int(rand, 2, 6);
        const ab = n * t;
        const de = m * t;
        const bc = n * u;
        const ef = m * u;
        if (ab === bc) continue;
        return {
          prompt: `Cho tam giác ABC đồng dạng với tam giác DEF, AB = ${ab} cm, BC = ${bc} cm, DE = ${de} cm. Tính EF (theo cm).`,
          answer: whole(ef),
          display: String(ef),
          hints: ['Hai tam giác đồng dạng có các cặp cạnh tương ứng tỉ lệ.', 'AB/DE = BC/EF.'],
          steps: [
            `ΔABC ∽ ΔDEF nên AB/DE = BC/EF, tức là ${ab}/${de} = ${bc}/EF.`,
            `EF = ${bc} · ${de} : ${ab} = ${ef} (cm).`,
            `EF = ${ef} cm.`,
          ],
        };
      }
    }
    if (v === 1) {
      const [p, q, r] = pick(rand, TRIPLES);
      const askLeg = rand() < 0.5;
      if (askLeg) {
        return {
          prompt: `Tam giác ABC vuông tại A có cạnh huyền BC = ${r} cm và AB = ${p} cm. Tính AC (theo cm).`,
          answer: whole(q),
          display: String(q),
          hints: ['Định lí Pythagore: BC² = AB² + AC².', 'AC² = BC² − AB².'],
          steps: [`AC² = ${r}² − ${p}² = ${r * r} − ${p * p} = ${q * q}.`, `AC = ${q} cm.`],
        };
      }
      return {
        prompt: `Tam giác ABC vuông tại A có AB = ${p} cm, AC = ${q} cm. Tính BC (theo cm).`,
        answer: whole(r),
        display: String(r),
        hints: ['BC là cạnh huyền.', 'Định lí Pythagore: BC² = AB² + AC².'],
        steps: [`BC² = ${p}² + ${q}² = ${p * p} + ${q * q} = ${r * r}.`, `BC = ${r} cm.`],
      };
    }
    for (;;) {
      const pole = pick(rand, [1, 2, 3]);
      const shadow = pick(rand, [2, 3, 4, 5]);
      const treeShadow = int(rand, 4, 30);
      const height = (pole * treeShadow) / shadow;
      if (!Number.isInteger(height) || pole === shadow) continue;
      return {
        prompt: `Cùng một thời điểm, một cọc cao ${pole} m dựng thẳng đứng có bóng trên mặt đất dài ${shadow} m, còn bóng của một cây là ${treeShadow} m. Tính chiều cao của cây (theo m).`,
        answer: whole(height),
        display: String(height),
        hints: [
          'Tia nắng cùng lúc thì song song, cọc và cây đều vuông góc với mặt đất, nên hai tam giác tạo bởi vật, bóng và tia nắng đồng dạng.',
          'Chiều cao tỉ lệ với độ dài bóng: h/' + treeShadow + ` = ${pole}/${shadow}.`,
        ],
        steps: [
          'Hai tam giác vuông có góc nhọn tạo bởi tia nắng với mặt đất bằng nhau nên đồng dạng.',
          `h/${treeShadow} = ${pole}/${shadow}, nên h = ${treeShadow} · ${pole} : ${shadow}.`,
          `h = ${height} m.`,
        ],
      };
    }
  },
};

/** @type {ReviewSkill} */
export const hinhChop = {
  id: 'hinh-chop',
  label: 'Hình chóp đều',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = int(rand, 2, 12);
      let h = int(rand, 2, 15);
      if ((a * a * h) % 3 !== 0) h = 3 * int(rand, 1, 5);
      const vol = (a * a * h) / 3;
      return {
        prompt: `Một hình chóp tứ giác đều có cạnh đáy ${a} cm và chiều cao ${h} cm. Tính thể tích của nó (theo cm³).`,
        answer: whole(vol),
        display: fmt(vol),
        hints: [
          'Thể tích hình chóp đều bằng một phần ba diện tích đáy nhân với chiều cao.',
          'Đáy là hình vuông.',
        ],
        steps: [`S đáy = ${a}² = ${a * a} (cm²).`, `V = 1/3 · ${a * a} · ${h} = ${fmt(vol)} cm³.`],
      };
    }
    if (v === 1) {
      const a = int(rand, 2, 15);
      // The slant height of a square pyramid is longer than half the base side.
      const d = int(rand, Math.max(3, Math.floor(a / 2) + 1), 15 + Math.floor(a / 2));
      const sxq = 2 * a * d;
      return {
        prompt: `Một hình chóp tứ giác đều có cạnh đáy ${a} cm và trung đoạn ${d} cm. Tính diện tích xung quanh của nó (theo cm²).`,
        answer: whole(sxq),
        display: fmt(sxq),
        hints: [
          'Diện tích xung quanh của hình chóp đều bằng nửa chu vi đáy nhân với trung đoạn: S xq = p · d.',
          `Nửa chu vi đáy: 4 · ${a} : 2.`,
        ],
        steps: [`p = 4 · ${a} : 2 = ${2 * a} (cm).`, `S xq = ${2 * a} · ${d} = ${fmt(sxq)} cm².`],
      };
    }
    const a = int(rand, 2, 14);
    // The slant height of a triangular pyramid is longer than the inradius a/(2√3) of the base.
    const d = int(rand, Math.max(3, Math.ceil(a / (2 * Math.sqrt(3)) + 0.01)), 14);
    const sxq = (3 * a * d) / 2;
    return {
      prompt: `Một hình chóp tam giác đều có cạnh đáy ${a} cm và trung đoạn ${d} cm. Tính diện tích xung quanh của nó (theo cm²).`,
      answer: simplify(fraction(3 * a * d, 2)),
      display: formatNumber(sxq, 1),
      hints: [
        'Diện tích xung quanh của hình chóp đều bằng nửa chu vi đáy nhân với trung đoạn: S xq = p · d.',
        'Đáy là tam giác đều có ba cạnh bằng nhau.',
      ],
      steps: [
        `p = 3 · ${a} : 2 = ${formatNumber((3 * a) / 2, 1)} (cm).`,
        `S xq = ${formatNumber((3 * a) / 2, 1)} · ${d} = ${formatNumber(sxq, 1)} cm².`,
      ],
    };
  },
};

/** Every chapter of the year-end review, in book order. */
export const REVIEW_SKILLS = [
  daThuc,
  hangDangThuc,
  tuGiac,
  thales,
  thongKe,
  phanThuc,
  phuongTrinh,
  hamSo,
  xacSuat,
  dongDang,
  hinhChop,
];
