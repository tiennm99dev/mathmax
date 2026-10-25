/**
 * Question generators for the chapter "Tập hợp các số tự nhiên", one skill
 * per lesson. Every question has a natural-number answer and a worked
 * solution; the review lessons draw their generated sets from these.
 */

import { int, pick } from './drill.js';
import { fmt, powText } from './format.js';
import { romanParts, romanValue, toRoman } from '../bai-2-cach-ghi-so-tu-nhien/engine.js';
import { expansion, power } from '../bai-6-luy-thua-voi-so-mu-tu-nhien/engine.js';
import { solve } from '../bai-7-thu-tu-thuc-hien-cac-phep-tinh/engine.js';

/** @typedef {import('./drill.js').Skill} Skill */
/** @typedef {Omit<import('./drill.js').Question, 'skill'>} Draft */

const PLACES = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn', 'triệu'];

const WORDS = ['TOAN HOC', 'HA LONG', 'DA NANG', 'NGHE AN', 'SAPA', 'HUE', 'CAN THO'];

/** @type {Skill} */
export const tapHop = {
  id: 'tap-hop',
  label: 'Bài 1. Tập hợp',
  make(rand) {
    if (rand() < 0.75) {
      const lo = int(rand, 0, 15);
      const count = int(rand, 3, 8);
      const loStrict = rand() < 0.5;
      const hiStrict = rand() < 0.5;
      const first = lo + (loStrict ? 1 : 0);
      const last = first + count - 1;
      const hi = last + (hiStrict ? 1 : 0);
      const elements = Array.from({ length: count }, (_, i) => first + i);
      return {
        prompt: `Cho tập hợp A = {x ∈ ℕ | ${lo} ${loStrict ? '<' : '≤'} x ${hiStrict ? '<' : '≤'} ${hi}}. Tập hợp A có bao nhiêu phần tử?`,
        answer: count,
        steps: [
          `Các số tự nhiên x thỏa mãn điều kiện là ${elements.join(', ')}.`,
          `Viết theo cách liệt kê: A = {${elements.join('; ')}}.`,
          `Vậy A có ${count} phần tử.`,
        ],
      };
    }
    const word = pick(rand, WORDS);
    const letters = [...new Set(word.replace(/\s/g, ''))];
    return {
      prompt: `Gọi M là tập hợp các chữ cái trong cụm từ "${word}". Tập hợp M có bao nhiêu phần tử?`,
      answer: letters.length,
      steps: [
        'Mỗi phần tử chỉ được liệt kê một lần, chữ cái lặp lại chỉ viết một lần.',
        `M = {${letters.join('; ')}}.`,
        `Vậy M có ${letters.length} phần tử.`,
      ],
    };
  },
};

/** @type {Skill} */
export const cachGhiSo = {
  id: 'cach-ghi-so',
  label: 'Bài 2. Cách ghi số tự nhiên',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const digits = [int(rand, 1, 9), ...Array.from({ length: 6 }, () => int(rand, 0, 9))];
      const k = int(rand, 1, 6);
      const pos = 6 - k;
      if (digits[pos] === 0) digits[pos] = int(rand, 1, 9);
      const n = Number(digits.join(''));
      const d = digits[pos];
      const value = d * 10 ** k;
      return {
        prompt: `Trong số ${fmt(n)}, chữ số hàng ${PLACES[k]} có giá trị bằng bao nhiêu?`,
        answer: value,
        steps: [
          `Chữ số hàng ${PLACES[k]} của ${fmt(n)} là ${d}.`,
          `Giá trị của nó là ${d} · ${fmt(10 ** k)} = ${fmt(value)}.`,
        ],
      };
    }
    if (v === 1) {
      const n = int(rand, 4, 30);
      const parts = romanParts(n);
      return {
        prompt: `Số La Mã ${toRoman(n)} có giá trị bằng bao nhiêu?`,
        answer: n,
        steps:
          parts.length === 1
            ? [`${parts[0]} là một thành phần có giá trị ${n}.`]
            : [
                `Tách thành các thành phần: ${parts.join(' | ')}.`,
                `Cộng giá trị các thành phần: ${parts.map(romanValue).join(' + ')} = ${n}.`,
              ],
      };
    }
    const places = [6, int(rand, 3, 5), int(rand, 0, 2)];
    const ds = places.map(() => int(rand, 1, 9));
    const n = places.reduce((s, p, i) => s + ds[i] * 10 ** p, 0);
    const words = places.map((p, i) => `${ds[i]} ${PLACES[p]}`);
    return {
      prompt: `Viết số tự nhiên gồm ${words.slice(0, -1).join(', ')} và ${words.at(-1)}.`,
      answer: n,
      steps: [
        `Số đó bằng ${places.map((p, i) => `${ds[i]} · ${fmt(10 ** p)}`).join(' + ')}.`,
        `= ${places.map((p, i) => fmt(ds[i] * 10 ** p)).join(' + ')} = ${fmt(n)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const thuTu = {
  id: 'thu-tu',
  label: 'Bài 3. Thứ tự trong tập hợp số tự nhiên',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const k = int(rand, 2, 4);
      const lo = 10 ** (k - 1);
      const hi = 10 ** k - 1;
      return {
        prompt: `Có bao nhiêu số tự nhiên có đúng ${k} chữ số?`,
        answer: hi - lo + 1,
        steps: [
          `Số nhỏ nhất có ${k} chữ số là ${fmt(lo)}, số lớn nhất là ${fmt(hi)}.`,
          `Các số đó là ${fmt(lo)}, ${fmt(lo + 1)}, …, ${fmt(hi)}: có ${fmt(hi)} − ${fmt(lo)} + 1 = ${fmt(hi - lo + 1)} số.`,
        ],
      };
    }
    if (v === 1) {
      const n = int(rand, 10, 999);
      return {
        prompt: `Tính tổng của số liền trước và số liền sau của số ${n}.`,
        answer: 2 * n,
        steps: [
          `Số liền trước của ${n} là ${n - 1}, số liền sau của ${n} là ${n + 1}.`,
          `Tổng: ${n - 1} + ${n + 1} = ${fmt(2 * n)}.`,
        ],
      };
    }
    const k = int(rand, 2, 6);
    const lo = 10 ** (k - 1);
    return {
      prompt: `Tìm số liền trước của số nhỏ nhất có ${k} chữ số.`,
      answer: lo - 1,
      steps: [
        `Số nhỏ nhất có ${k} chữ số là ${fmt(lo)}.`,
        `Số liền trước của nó là ${fmt(lo)} − 1 = ${fmt(lo - 1)} (số lớn nhất có ${k - 1} chữ số).`,
      ],
    };
  },
};

/** @type {Skill} */
export const congTru = {
  id: 'cong-tru',
  label: 'Bài 4. Phép cộng và phép trừ',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = int(rand, 100, 999);
      const b = a + int(rand, 50, 999);
      return {
        prompt: `Tìm số tự nhiên x, biết x + ${fmt(a)} = ${fmt(b)}.`,
        answer: b - a,
        steps: [
          'x là số hạng chưa biết: lấy tổng trừ đi số hạng đã biết.',
          `x = ${fmt(b)} − ${fmt(a)} = ${fmt(b - a)}.`,
        ],
      };
    }
    if (v === 1) {
      const a = int(rand, 100, 999);
      const b = int(rand, 100, 999);
      return {
        prompt: `Tìm số tự nhiên x, biết x − ${fmt(a)} = ${fmt(b)}.`,
        answer: a + b,
        steps: [
          'x là số bị trừ: lấy hiệu cộng với số trừ.',
          `x = ${fmt(b)} + ${fmt(a)} = ${fmt(a + b)}.`,
        ],
      };
    }
    if (v === 2) {
      const a = int(rand, 300, 999);
      const b = int(rand, 10, a - 10);
      return {
        prompt: `Tìm số tự nhiên x, biết ${fmt(a)} − x = ${fmt(b)}.`,
        answer: a - b,
        steps: [
          'x là số trừ: lấy số bị trừ trừ đi hiệu.',
          `x = ${fmt(a)} − ${fmt(b)} = ${fmt(a - b)}.`,
        ],
      };
    }
    const p = int(rand, 101, 489);
    const r = 100 * (Math.floor(p / 100) + int(rand, 1, 4)) - p;
    const q = int(rand, 100, 999);
    return {
      prompt: `Tính một cách hợp lí: ${p} + ${q} + ${r}.`,
      answer: p + q + r,
      steps: [
        `Dùng tính chất giao hoán và kết hợp để nhóm ${p} với ${r}.`,
        `${p} + ${q} + ${r} = (${p} + ${r}) + ${q} = ${p + r} + ${q} = ${fmt(p + q + r)}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const nhanChia = {
  id: 'nhan-chia',
  label: 'Bài 5. Phép nhân và phép chia',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = int(rand, 100, 999);
      const b = int(rand, 6, 25);
      const q = Math.floor(a / b);
      const r = a % b;
      return {
        prompt: `Tìm số dư khi chia ${a} cho ${b}.`,
        answer: r,
        steps: [`Thực hiện phép chia: ${a} = ${b} · ${q} + ${r}.`, `Số dư là ${r} (${r} < ${b}).`],
      };
    }
    if (v === 1) {
      const b = int(rand, 5, 20);
      const q = int(rand, 5, 40);
      const r = int(rand, 1, b - 1);
      return {
        prompt: `Trong một phép chia, số chia là ${b}, thương là ${q} và số dư là ${r}. Tìm số bị chia.`,
        answer: b * q + r,
        steps: ['Dùng a = b · q + r.', `a = ${b} · ${q} + ${r} = ${b * q} + ${r} = ${b * q + r}.`],
      };
    }
    if (v === 2) {
      const k = int(rand, 12, 99);
      const a = int(rand, 11, 89);
      const b = 100 - a;
      return {
        prompt: `Tính một cách hợp lí: ${k} · ${a} + ${k} · ${b}.`,
        answer: 100 * k,
        steps: [
          `Hai tích có chung thừa số ${k}: dùng tính chất phân phối.`,
          `${k} · ${a} + ${k} · ${b} = ${k} · (${a} + ${b}) = ${k} · 100 = ${fmt(100 * k)}.`,
        ],
      };
    }
    const a = int(rand, 3, 25);
    const x = int(rand, 3, 60);
    return {
      prompt: `Tìm số tự nhiên x, biết ${a} · x = ${a * x}.`,
      answer: x,
      steps: [
        'x là thừa số chưa biết: lấy tích chia cho thừa số đã biết.',
        `x = ${a * x} : ${a} = ${x}.`,
      ],
    };
  },
};

/** Largest exponent per base so that the power stays small enough to work by hand. */
const MAX_EXP = /** @type {Record<number, number>} */ ({ 2: 10, 3: 6, 4: 5, 5: 4, 10: 6 });

/** @type {Skill} */
export const luyThua = {
  id: 'luy-thua',
  label: 'Bài 6. Lũy thừa',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const a = pick(rand, [2, 3, 4, 5, 10]);
      const n = int(rand, 2, MAX_EXP[a]);
      return {
        prompt: `Tính ${powText(a, n)}.`,
        answer: power(a, n),
        steps: [`${powText(a, n)} = ${expansion(a, n)} = ${fmt(power(a, n))}.`],
      };
    }
    if (v === 1) {
      const a = int(rand, 2, 9);
      const m = int(rand, 2, 9);
      const n = int(rand, 2, 9);
      return {
        prompt: `Viết ${powText(a, m)} · ${powText(a, n)} dưới dạng một lũy thừa của ${a}. Số mũ của lũy thừa đó là bao nhiêu?`,
        answer: m + n,
        steps: [
          'Nhân hai lũy thừa cùng cơ số: giữ nguyên cơ số, cộng các số mũ.',
          `${powText(a, m)} · ${powText(a, n)} = ${a}^(${m} + ${n}) = ${powText(a, m + n)}.`,
        ],
      };
    }
    if (v === 2) {
      const a = int(rand, 2, 9);
      const m = int(rand, 5, 12);
      const n = int(rand, 2, m - 1);
      return {
        prompt: `Viết ${powText(a, m)} : ${powText(a, n)} dưới dạng một lũy thừa của ${a}. Số mũ của lũy thừa đó là bao nhiêu?`,
        answer: m - n,
        steps: [
          'Chia hai lũy thừa cùng cơ số: giữ nguyên cơ số, trừ các số mũ.',
          `${powText(a, m)} : ${powText(a, n)} = ${a}^(${m} − ${n}) = ${powText(a, m - n)}.`,
        ],
      };
    }
    if (v === 3) {
      const a = pick(rand, [2, 3, 5, 10]);
      const n = int(rand, 2, MAX_EXP[a]);
      return {
        prompt: `Tìm số tự nhiên n, biết ${a}ⁿ = ${fmt(power(a, n))}.`,
        answer: n,
        steps: [
          `Viết ${fmt(power(a, n))} thành tích các thừa số ${a}: ${fmt(power(a, n))} = ${expansion(a, n)} = ${powText(a, n)}.`,
          `Vậy n = ${n}.`,
        ],
      };
    }
    const k = int(rand, 11, 25);
    return {
      prompt: `Số chính phương ${fmt(k * k)} là bình phương của số tự nhiên nào?`,
      answer: k,
      steps: [`Thử: ${k} · ${k} = ${fmt(k * k)}.`, `Vậy ${fmt(k * k)} = ${powText(k, 2)}.`],
    };
  },
};

/**
 * Expressions with a natural value at every step.
 * @type {Array<(rand: () => number) => string>}
 */
const TEMPLATES = [
  (r) => `${int(r, 10, 99)} + ${int(r, 2, 9)} · ${int(r, 2, 12)}`,
  (r) => {
    const [b, c] = [int(r, 2, 9), int(r, 2, 12)];
    return `${b * c + int(r, 1, 60)} - ${b} · ${c}`;
  },
  (r) => `(${int(r, 2, 30)} + ${int(r, 2, 30)}) · ${int(r, 2, 9)}`,
  (r) => {
    const [b, q] = [int(r, 2, 9), int(r, 2, 20)];
    return `${b * q} : ${b} · ${int(r, 2, 9)}`;
  },
  (r) => {
    const [a, b] = [int(r, 2, 9), int(r, 2, 6)];
    return `${a} · ${b}^2 - ${int(r, 1, a * b * b)}`;
  },
  (r) => {
    const e = int(r, 2, 9);
    const s = e * int(r, 2, 12);
    const b = int(r, 1, s - 1);
    return `${s / e + int(r, 0, 50)} - (${b} + ${s - b}) : ${e}`;
  },
  (r) => {
    const [b, e] = [int(r, 2, 9), int(r, 2, 9)];
    const t = Math.ceil((b * b + 1) / e) + int(r, 0, 5);
    return `[${e * t - b * b} + ${b}^2] : ${e}`;
  },
];

/** @type {Skill} */
export const thuTuPhepTinh = {
  id: 'thu-tu-phep-tinh',
  label: 'Bài 7. Thứ tự thực hiện các phép tính',
  make(rand) {
    const { lines, steps, value } = solve(pick(rand, TEMPLATES)(rand));
    return {
      prompt: `Tính giá trị của biểu thức ${lines[0]}.`,
      answer: value,
      steps: lines.slice(1).map((line, i) => `= ${line}   (${steps[i]})`),
    };
  },
};

/** Every skill of the chapter, in book order. */
export const CHAPTER_SKILLS = [tapHop, cachGhiSo, thuTu, congTru, nhanChia, luyThua, thuTuPhepTinh];
