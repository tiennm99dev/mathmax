/**
 * Question generators for the chapter "Những hình hình học cơ bản", one skill
 * per lesson. Every answer is a natural number (a count or a length in whole
 * centimetres), so the drill board reads and writes it with its defaults.
 */

import { int, pick } from '#lib/core/drill.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** @param {number} n */
const pairs = (n) => (n * (n - 1)) / 2;

/** @type {Skill} */
export const diemDuongThang = {
  id: 'diem-duong-thang',
  label: 'Bài 32. Điểm và đường thẳng',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const n = int(rand, 4, 8);
      return {
        prompt: `Cho ${n} điểm, trong đó không có ba điểm nào thẳng hàng. Kẻ các đường thẳng đi qua từng cặp điểm. Có bao nhiêu đường thẳng?`,
        answer: pairs(n),
        hints: [
          'Qua hai điểm phân biệt có đúng một đường thẳng; không có ba điểm thẳng hàng nên mỗi cặp điểm cho một đường thẳng khác nhau.',
          `Mỗi điểm ghép được với ${n - 1} điểm còn lại, nhưng mỗi đường thẳng bị đếm hai lần.`,
        ],
        steps: [
          `Mỗi điểm ghép với ${n - 1} điểm còn lại: ${n} · ${n - 1} = ${n * (n - 1)} cặp.`,
          `Mỗi đường thẳng được đếm hai lần, nên có ${n * (n - 1)} : 2 = ${pairs(n)} đường thẳng.`,
        ],
      };
    }
    if (v === 1) {
      const n = int(rand, 5, 8);
      const k = int(rand, 3, n - 1);
      const answer = pairs(n) - pairs(k) + 1;
      return {
        prompt: `Cho ${n} điểm, trong đó có đúng ${k} điểm thẳng hàng và ngoài ra không có ba điểm nào khác thẳng hàng. Kẻ các đường thẳng đi qua từng cặp điểm. Có bao nhiêu đường thẳng?`,
        answer,
        hints: [
          `Nếu không có ba điểm nào thẳng hàng thì có ${pairs(n)} đường thẳng.`,
          `Các cặp điểm lấy trong ${k} điểm thẳng hàng đều cho cùng một đường thẳng.`,
        ],
        steps: [
          `Nếu không có ba điểm nào thẳng hàng: ${n} · ${n - 1} : 2 = ${pairs(n)} đường thẳng.`,
          `${k} điểm thẳng hàng tạo ${k} · ${k - 1} : 2 = ${pairs(k)} cặp nhưng chỉ cho 1 đường thẳng.`,
          `Số đường thẳng: ${pairs(n)} − ${pairs(k)} + 1 = ${answer}.`,
        ],
      };
    }
    const n = int(rand, 3, 7);
    return {
      prompt: `Vẽ ${n} đường thẳng phân biệt, đôi một cắt nhau và không có ba đường thẳng nào cùng đi qua một điểm. Có bao nhiêu giao điểm?`,
      answer: pairs(n),
      hints: [
        'Hai đường thẳng cắt nhau có đúng một giao điểm.',
        'Đếm số cặp đường thẳng; mỗi cặp bị đếm hai lần nếu ghép từng đường với các đường còn lại.',
      ],
      steps: [
        `Mỗi đường thẳng cắt ${n - 1} đường còn lại: ${n} · ${n - 1} = ${n * (n - 1)} lần cắt.`,
        `Mỗi giao điểm được đếm hai lần, nên có ${n * (n - 1)} : 2 = ${pairs(n)} giao điểm.`,
      ],
    };
  },
};

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/** @type {Skill} */
export const tia = {
  id: 'tia',
  label: 'Bài 33. Điểm nằm giữa hai điểm. Tia',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const n = int(rand, 3, 9);
      return {
        prompt: `Trên đường thẳng xy lấy ${n} điểm phân biệt. Có bao nhiêu tia phân biệt nằm trên xy có gốc là một trong ${n} điểm đó?`,
        answer: 2 * n,
        hints: [
          'Mỗi điểm trên đường thẳng xy là gốc của đúng hai tia: một tia về phía x, một tia về phía y.',
        ],
        steps: [
          'Mỗi điểm là gốc của hai tia nằm trên xy; tia có gốc khác nhau thì khác nhau.',
          `Số tia: ${n} · 2 = ${2 * n}.`,
        ],
      };
    }
    if (v === 1) {
      const n = int(rand, 3, 9);
      return {
        prompt: `Trên một đường thẳng lấy ${n} điểm phân biệt. Có bao nhiêu cặp tia đối nhau có gốc là một trong ${n} điểm đó?`,
        answer: n,
        hints: ['Mỗi điểm chia đường thẳng thành hai tia đối nhau.'],
        steps: [
          'Mỗi điểm chia đường thẳng thành hai tia đối nhau, tức là đúng một cặp.',
          `Số cặp tia đối nhau bằng số điểm: ${n}.`,
        ],
      };
    }
    const k = int(rand, 5, 8);
    const names = LETTERS.slice(0, k);
    const i = int(rand, 0, k - 3);
    const j = int(rand, i + 2, k - 1);
    const inner = names.slice(i + 1, j);
    return {
      prompt: `Trên một đường thẳng có ${k} điểm ${names.join(', ')} nằm theo đúng thứ tự đó. Có bao nhiêu điểm trong số đó nằm giữa hai điểm ${names[i]} và ${names[j]}?`,
      answer: j - i - 1,
      hints: [
        `Điểm nằm giữa ${names[i]} và ${names[j]} là điểm đứng sau ${names[i]} và trước ${names[j]} trong dãy.`,
      ],
      steps: [
        `Theo thứ tự trên đường thẳng, các điểm đứng giữa ${names[i]} và ${names[j]} là ${inner.join(', ')}.`,
        `Có ${j - i - 1} điểm nằm giữa ${names[i]} và ${names[j]}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const doanThang = {
  id: 'doan-thang',
  label: 'Bài 34. Đoạn thẳng. Độ dài đoạn thẳng',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = int(rand, 2, 15);
      const b = int(rand, 2, 15);
      return {
        prompt: `Điểm M nằm giữa hai điểm A và B, AM = ${a} cm, MB = ${b} cm. Tính độ dài đoạn thẳng AB (cm).`,
        answer: a + b,
        hints: ['M nằm giữa A và B thì AM + MB = AB.'],
        steps: ['M nằm giữa A và B nên AM + MB = AB.', `AB = ${a} + ${b} = ${a + b} (cm).`],
      };
    }
    if (v === 1) {
      const c = int(rand, 6, 25);
      const a = int(rand, 1, c - 1);
      const [first, second] = pick(rand, [
        ['AM', 'MB'],
        ['MB', 'AM'],
      ]);
      return {
        prompt: `Điểm M nằm giữa hai điểm A và B, AB = ${c} cm, ${first} = ${a} cm. Tính ${second} (cm).`,
        answer: c - a,
        hints: ['M nằm giữa A và B thì AM + MB = AB.', `Suy ra ${second} = AB − ${first}.`],
        steps: [
          'M nằm giữa A và B nên AM + MB = AB.',
          `${second} = AB − ${first} = ${c} − ${a} = ${c - a} (cm).`,
        ],
      };
    }
    if (v === 2) {
      const n = int(rand, 3, 8);
      return {
        prompt: `Trên một đường thẳng lấy ${n} điểm phân biệt. Có bao nhiêu đoạn thẳng có hai đầu mút là hai trong ${n} điểm đó?`,
        answer: pairs(n),
        hints: [
          'Mỗi cặp điểm cho một đoạn thẳng; đoạn AB và đoạn BA là một.',
          `Mỗi điểm ghép được với ${n - 1} điểm còn lại.`,
        ],
        steps: [
          `Mỗi điểm ghép với ${n - 1} điểm còn lại: ${n} · ${n - 1} = ${n * (n - 1)} cặp.`,
          `Mỗi đoạn thẳng được đếm hai lần, nên có ${n * (n - 1)} : 2 = ${pairs(n)} đoạn thẳng.`,
        ],
      };
    }
    const a = int(rand, 1, 8);
    const b = int(rand, a + 2, 20);
    return {
      prompt: `Đặt thước dọc theo đoạn thẳng AB thì điểm A trùng với vạch ${a} cm và điểm B trùng với vạch ${b} cm. Đoạn thẳng AB dài bao nhiêu xăng-ti-mét?`,
      answer: b - a,
      hints: ['Vạch 0 không trùng với A: lấy số chỉ ở B trừ số chỉ ở A.'],
      steps: ['Độ dài AB bằng hiệu hai số chỉ trên thước.', `AB = ${b} − ${a} = ${b - a} (cm).`],
    };
  },
};

/** @type {Skill} */
export const trungDiem = {
  id: 'trung-diem',
  label: 'Bài 35. Trung điểm của đoạn thẳng',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const k = int(rand, 2, 20);
      return {
        prompt: `M là trung điểm của đoạn thẳng AB, AB = ${2 * k} cm. Tính MA (cm).`,
        answer: k,
        hints: ['M là trung điểm của AB thì MA = MB = AB : 2.'],
        steps: ['M là trung điểm của AB nên MA = AB : 2.', `MA = ${2 * k} : 2 = ${k} (cm).`],
      };
    }
    if (v === 1) {
      const k = int(rand, 2, 20);
      return {
        prompt: `I là trung điểm của đoạn thẳng CD, IC = ${k} cm. Tính độ dài CD (cm).`,
        answer: 2 * k,
        hints: ['I là trung điểm của CD thì IC = ID và CD = IC + ID.'],
        steps: [
          'I là trung điểm của CD nên ID = IC và CD = IC + ID = 2 · IC.',
          `CD = 2 · ${k} = ${2 * k} (cm).`,
        ],
      };
    }
    if (v === 2) {
      const k = int(rand, 1, 6);
      const pq = 4 * k;
      return {
        prompt: `Cho đoạn thẳng PQ = ${pq} cm. E là trung điểm của PQ, F là trung điểm của PE. Tính EF (cm).`,
        answer: k,
        hints: ['Tính PE trước: PE = PQ : 2.', 'F là trung điểm của PE nên EF = PE : 2.'],
        steps: [
          `E là trung điểm của PQ nên PE = ${pq} : 2 = ${2 * k} (cm).`,
          `F là trung điểm của PE nên EF = ${2 * k} : 2 = ${k} (cm).`,
        ],
      };
    }
    const a = int(rand, 1, 8);
    const half = int(rand, 1, 6);
    const b = a + 2 * half;
    return {
      prompt: `Trên tia Ox lấy hai điểm A, B với OA = ${a} cm, OB = ${b} cm. Gọi I là trung điểm của AB. Tính OI (cm).`,
      answer: a + half,
      hints: [
        'OA < OB nên A nằm giữa O và B; tính AB = OB − OA.',
        'Sau đó OI = OA + AI, với AI = AB : 2.',
      ],
      steps: [
        `A nằm giữa O và B nên AB = ${b} − ${a} = ${2 * half} (cm).`,
        `I là trung điểm của AB nên AI = ${2 * half} : 2 = ${half} (cm).`,
        `OI = OA + AI = ${a} + ${half} = ${a + half} (cm).`,
      ],
    };
  },
};

/** The drill of "Luyện tập chung" page 57: the four lessons before it. */
export const PAGE_57_SKILLS = [diemDuongThang, tia, doanThang, trungDiem];
