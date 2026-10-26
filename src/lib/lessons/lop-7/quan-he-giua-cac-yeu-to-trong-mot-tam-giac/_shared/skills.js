/**
 * Question generators for the chapter "Quan hệ giữa các yếu tố trong một tam
 * giác". Every answer is a whole number (degrees, centimetres or a count),
 * so a drill board reads input with the default natural-number reader.
 * Angles are written in plain text with a circumflex on the vertex letter
 * (Â, B̂, Ĉ) or as "góc ABC".
 */

import { int, pick, shuffle } from '#lib/core/drill.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * Two angles of a triangle whose three angles are all different.
 * @param {() => number} rand
 */
function scalene(rand) {
  for (;;) {
    const a = int(rand, 25, 110);
    const b = int(rand, 20, 150 - a);
    const c = 180 - a - b;
    if (a !== b && b !== c && a !== c && c >= 20) return [a, b, c];
  }
}

/** @type {Skill} */
export const gocCanhDoiDien = {
  id: 'goc-canh-doi-dien',
  label: 'Bài 31. Góc và cạnh đối diện',
  make(rand) {
    const kind = pick(rand, ['largest', 'smallest', 'isosceles']);
    if (kind === 'isosceles') {
      const x = pick(rand, [25, 30, 35, 40, 45, 50, 55, 65, 70, 75, 80]);
      const apex = 180 - 2 * x;
      const answer = Math.max(apex, x);
      return {
        prompt: `Tam giác ABC cân tại A có B̂ = ${x}°. Góc đối diện với cạnh lớn nhất của tam giác có số đo bao nhiêu độ?`,
        answer,
        unit: '°',
        hints: [
          'Tính đủ ba góc: hai góc ở đáy bằng nhau.',
          'Cạnh lớn nhất đối diện với góc lớn nhất, nên chỉ cần tìm góc lớn nhất.',
        ],
        steps: [
          `Tam giác cân tại A nên Ĉ = B̂ = ${x}°, và Â = 180° − 2 · ${x}° = ${apex}°.`,
          apex > x
            ? `Â = ${apex}° là góc lớn nhất; nó đối diện với cạnh lớn nhất BC.`
            : `B̂ = Ĉ = ${x}° là hai góc lớn nhất; chúng đối diện với hai cạnh lớn nhất CA = AB.`,
          `Góc cần tìm bằng ${answer}°.`,
        ],
      };
    }
    const [a, b, c] = scalene(rand);
    const big = kind === 'largest';
    const answer = big ? Math.max(a, b, c) : Math.min(a, b, c);
    const word = big ? 'lớn nhất' : 'nhỏ nhất';
    return {
      prompt: `Tam giác ABC có Â = ${a}°, B̂ = ${b}°. Góc đối diện với cạnh ${word} có số đo bao nhiêu độ?`,
      answer,
      unit: '°',
      hints: ['Tính Ĉ bằng định lí tổng ba góc.', `Cạnh ${word} đối diện với góc ${word}.`],
      steps: [
        `Ĉ = 180° − ${a}° − ${b}° = ${c}°.`,
        `Trong ba góc ${a}°, ${b}°, ${c}°, góc ${word} là ${answer}°.`,
        `Cạnh ${word} đối diện với góc ${word}, nên góc cần tìm bằng ${answer}°.`,
      ],
    };
  },
};

/** @type {Skill} */
export const duongVuongGoc = {
  id: 'duong-vuong-goc',
  label: 'Bài 32. Đường vuông góc và đường xiên',
  make(rand) {
    const kind = pick(rand, ['distance', 'oblique', 'rectangle']);
    if (kind === 'distance') {
      const h = int(rand, 3, 9);
      const others = shuffle(rand, [h + 1, h + 2, h + 3, h + 4, h + 5, h + 6]).slice(0, 3);
      const lens = shuffle(rand, [h, ...others]);
      return {
        prompt: `Từ điểm A nằm ngoài đường thẳng d kẻ bốn đoạn thẳng AB, AC, AD, AE đến d (B, C, D, E thuộc d) có độ dài lần lượt ${lens.join(' cm, ')} cm, trong đó có một đoạn vuông góc với d. Khoảng cách từ A đến d bằng bao nhiêu xăng-ti-mét?`,
        answer: h,
        unit: 'cm',
        hints: [
          'Khoảng cách từ A đến d là độ dài đường vuông góc.',
          'Đường vuông góc ngắn hơn mọi đường xiên.',
        ],
        steps: [
          'Đường vuông góc ngắn hơn mọi đường xiên kẻ từ A đến d, nên đoạn vuông góc là đoạn ngắn nhất.',
          `Đoạn ngắn nhất dài ${h} cm, vậy khoảng cách từ A đến d bằng ${h} cm.`,
        ],
      };
    }
    if (kind === 'oblique') {
      const h = int(rand, 2, 12);
      return {
        prompt: `Khoảng cách từ điểm A đến đường thẳng d bằng ${h} cm. AM là một đường xiên kẻ từ A đến d và độ dài AM là một số nguyên (xăng-ti-mét). Độ dài AM nhỏ nhất có thể là bao nhiêu xăng-ti-mét?`,
        answer: h + 1,
        unit: 'cm',
        hints: [
          'Đường xiên so với đường vuông góc dài hơn hay ngắn hơn?',
          `AM > ${h} cm và AM là số nguyên.`,
        ],
        steps: [
          `Đường vuông góc AH = ${h} cm ngắn hơn mọi đường xiên, nên AM > ${h} cm.`,
          `Số nguyên nhỏ nhất lớn hơn ${h} là ${h + 1}, vậy AM nhỏ nhất bằng ${h + 1} cm.`,
        ],
      };
    }
    const p = int(rand, 5, 15);
    const q = int(rand, 2, p - 1);
    const fromD = pick(rand, [true, false]);
    return fromD
      ? {
          prompt: `Hình chữ nhật ABCD có AB = ${p} cm, BC = ${q} cm. Khoảng cách từ điểm D đến đường thẳng BC bằng bao nhiêu xăng-ti-mét?`,
          answer: p,
          unit: 'cm',
          hints: ['Từ D, đoạn nào vuông góc với đường thẳng BC?'],
          steps: [
            'Trong hình chữ nhật, DC ⊥ BC tại C, nên DC là đường vuông góc kẻ từ D đến BC.',
            `Khoảng cách bằng DC = AB = ${p} cm.`,
          ],
        }
      : {
          prompt: `Hình chữ nhật ABCD có AB = ${p} cm, BC = ${q} cm. Khoảng cách từ điểm C đến đường thẳng AB bằng bao nhiêu xăng-ti-mét?`,
          answer: q,
          unit: 'cm',
          hints: ['Từ C, đoạn nào vuông góc với đường thẳng AB?'],
          steps: [
            'Trong hình chữ nhật, CB ⊥ AB tại B, nên CB là đường vuông góc kẻ từ C đến AB.',
            `Khoảng cách bằng CB = ${q} cm.`,
          ],
        };
  },
};

/** @type {Skill} */
export const baCanh = {
  id: 'ba-canh',
  label: 'Bài 33. Bất đẳng thức tam giác',
  make(rand) {
    const kind = pick(rand, ['isosceles', 'count', 'perimeter', 'max']);
    if (kind === 'isosceles') {
      const s = int(rand, 1, 5);
      const L = int(rand, 2 * s, 2 * s + 8);
      return {
        prompt: `Tam giác ABC cân có AB = ${s} cm, AC = ${L} cm và độ dài BC là một số nguyên (xăng-ti-mét). Tính BC (cm).`,
        answer: L,
        unit: 'cm',
        hints: [
          `Tìm khoảng chứa BC: ${L} − ${s} < BC < ${L} + ${s}.`,
          'Tam giác cân nên BC bằng AB hoặc AC.',
        ],
        steps: [
          `Bất đẳng thức tam giác: ${L} − ${s} < BC < ${L} + ${s}, tức ${L - s} < BC < ${L + s}.`,
          `Tam giác cân nên BC = ${s} hoặc BC = ${L}; chỉ ${L} nằm trong khoảng trên.`,
          `Vậy BC = ${L} cm.`,
        ],
      };
    }
    if (kind === 'count') {
      const p = int(rand, 2, 9);
      const q = int(rand, p, p + 8);
      const n = 2 * p - 1;
      return {
        prompt: `Tam giác ABC có AB = ${p} cm, AC = ${q} cm. Có bao nhiêu giá trị nguyên (xăng-ti-mét) của độ dài BC?`,
        answer: n,
        hints: [`${q} − ${p} < BC < ${q} + ${p}.`, 'Đếm các số nguyên nằm giữa hai số đó.'],
        steps: [
          `Bất đẳng thức tam giác: ${q - p} < BC < ${q + p}.`,
          `Các số nguyên từ ${q - p + 1} đến ${q + p - 1}: có ${q + p - 1} − ${q - p + 1} + 1 = ${n} giá trị.`,
        ],
      };
    }
    if (kind === 'perimeter') {
      const x = int(rand, 2, 6);
      const y = int(rand, 2 * x, 2 * x + 6);
      const order = pick(rand, [true, false]);
      const [u, v] = order ? [x, y] : [y, x];
      return {
        prompt: `Một tam giác cân có hai cạnh dài ${u} cm và ${v} cm. Tính chu vi của tam giác đó (cm).`,
        answer: 2 * y + x,
        unit: 'cm',
        hints: [
          `Thử cạnh bên dài ${x} cm: bộ ${x}, ${x}, ${y} có thỏa mãn bất đẳng thức tam giác không?`,
        ],
        steps: [
          `Nếu cạnh bên dài ${x} cm thì ${y} ≥ ${x} + ${x} = ${2 * x}: không thỏa mãn bất đẳng thức tam giác.`,
          `Vậy ba cạnh là ${y}, ${y}, ${x} (${y} < ${y} + ${x}).`,
          `Chu vi bằng ${y} + ${y} + ${x} = ${2 * y + x} cm.`,
        ],
      };
    }
    const p = int(rand, 2, 12);
    const q = int(rand, 2, 12);
    return {
      prompt: `Tam giác ABC có AB = ${p} cm, AC = ${q} cm và độ dài BC là một số nguyên (xăng-ti-mét). BC lớn nhất có thể bằng bao nhiêu xăng-ti-mét?`,
      answer: p + q - 1,
      unit: 'cm',
      hints: ['BC < AB + AC.', 'BC là số nguyên nhỏ hơn tổng đó.'],
      steps: [
        `Bất đẳng thức tam giác: BC < AB + AC = ${p + q} cm.`,
        `BC là số nguyên nên BC lớn nhất bằng ${p + q - 1} cm (và ${p + q - 1} > ${Math.abs(p - q)}, thỏa mãn cả hệ quả).`,
      ],
    };
  },
};

/** Skills of the mixed practice after Bài 31-33. */
export const PAGE_70_SKILLS = [gocCanhDoiDien, duongVuongGoc, baCanh];
