/**
 * Question generators for the chapter "Những hình hình học cơ bản", one skill
 * per lesson. Every answer is a natural number (a count, a length in whole
 * centimetres or a measure in whole degrees), so the drill board reads and
 * writes it with its defaults.
 */

import { int, pick } from '#lib/core/drill.js';
import { KIND_NAME, clockAngle, kindOf } from './angle.js';

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

const RAYS = ['a', 'b', 'c', 'd', 'm', 'n', 't', 'z'];

/** @type {Skill} */
export const goc = {
  id: 'goc',
  label: 'Bài 36. Góc',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const n = int(rand, 3, 8);
      return {
        prompt: `Vẽ ${n} tia chung gốc O phân biệt. Có bao nhiêu góc có đỉnh O và hai cạnh là hai trong ${n} tia đó?`,
        answer: pairs(n),
        hints: [
          'Mỗi góc ứng với một cặp tia chung gốc.',
          `Mỗi tia ghép được với ${n - 1} tia còn lại, nhưng mỗi góc bị đếm hai lần.`,
        ],
        steps: [
          `Mỗi tia ghép với ${n - 1} tia còn lại: ${n} · ${n - 1} = ${n * (n - 1)} lần ghép.`,
          `Mỗi góc được đếm hai lần, nên có ${n * (n - 1)} : 2 = ${pairs(n)} góc.`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 1, 5);
      const names = RAYS.slice(0, k).map((r) => 'O' + r);
      const n = k + 2;
      return {
        prompt: `Điểm O nằm trên đường thẳng xy. Vẽ thêm ${k} tia ${names.join(', ')} phân biệt, không nằm trên xy. Có bao nhiêu góc đỉnh O (kể cả góc bẹt) có hai cạnh là hai trong các tia Ox, Oy, ${names.join(', ')}?`,
        answer: pairs(n),
        hints: [
          `Có tất cả ${n} tia chung gốc O; mỗi cặp tia cho một góc.`,
          'Hai tia đối nhau Ox, Oy cũng tạo thành một góc: góc bẹt xOy.',
        ],
        steps: [
          `Có ${k} + 2 = ${n} tia chung gốc O.`,
          `Số cặp tia: ${n} · ${n - 1} : 2 = ${pairs(n)}, nên có ${pairs(n)} góc (trong đó có góc bẹt xOy).`,
        ],
      };
    }
    const n = int(rand, 3, 9);
    return {
      prompt: `Vẽ ${n} tia chung gốc O phân biệt, trong đó có tia Ox. Có bao nhiêu góc có một cạnh là tia Ox và cạnh kia là một trong các tia còn lại?`,
      answer: n - 1,
      hints: ['Tia Ox ghép với mỗi tia còn lại cho đúng một góc.'],
      steps: [
        `Ngoài Ox còn ${n} − 1 = ${n - 1} tia.`,
        `Mỗi tia đó cùng Ox tạo một góc, nên có ${n - 1} góc.`,
      ],
    };
  },
};

/** Vietnamese name of an angle kind, by its measure. @param {number} m */
const kindName = (m) => KIND_NAME[kindOf(m)];

/** @type {Skill} */
export const soDoGoc = {
  id: 'so-do-goc',
  label: 'Bài 37. Số đo góc',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const h = int(rand, 1, 11);
      const gaps = Math.min(h, 12 - h);
      const answer = clockAngle(h);
      return {
        prompt: `Lúc ${h} giờ đúng, kim giờ và kim phút tạo thành góc có số đo bao nhiêu độ?`,
        answer,
        hints: [
          'Mười hai số chia mặt đồng hồ thành 12 khoảng bằng nhau; mỗi khoảng ứng với 360° : 12.',
          `Đếm số khoảng giờ ít nhất giữa số ${h} và số 12.`,
        ],
        steps: [
          'Lúc đúng giờ, kim phút chỉ số 12; mỗi khoảng giờ ứng với 30°.',
          `Giữa số ${h} và số 12 có ít nhất ${gaps} khoảng, nên góc bằng ${gaps} · 30° = ${answer}° (${kindName(answer)}).`,
        ],
      };
    }
    if (v === 1) {
      const lo = 10 * int(rand, 1, 8);
      const m = int(rand, 15, 180 - lo);
      const hi = lo + m;
      return {
        prompt: `Đặt thước đo góc có tâm trùng đỉnh O. Cạnh Ox đi qua vạch ${lo}, cạnh Oy đi qua vạch ${hi} của cùng một hàng số. Góc xOy có số đo bao nhiêu độ?`,
        answer: m,
        hints: [
          'Cạnh Ox không nằm ở vạch 0, nên không đọc thẳng số ở cạnh Oy.',
          'Số đo bằng hiệu hai số đọc được trên cùng hàng số.',
        ],
        steps: [
          'Số đo góc bằng hiệu hai số đọc được ở hai cạnh trên cùng một hàng số.',
          `Góc xOy = ${hi}° − ${lo}° = ${m}°.`,
        ],
      };
    }
    const kinds = /** @type {const} */ (['nhon', 'tu']);
    const want = pick(rand, [...kinds]);
    /** @type {number[]} */
    let list = [];
    let answer = 0;
    // Keep at least one angle of the asked kind and one of another kind.
    while (answer === 0 || answer === 6) {
      list = [];
      while (list.length < 6) {
        const d = 5 * int(rand, 1, 36);
        if (!list.includes(d)) list.push(d);
      }
      answer = list.filter((d) => kindOf(d) === want).length;
    }
    const name = KIND_NAME[want];
    return {
      prompt: `Cho sáu góc có số đo ${list.map((d) => d + '°').join('; ')}. Có bao nhiêu ${name} trong sáu góc đó?`,
      answer,
      hints: [
        want === 'nhon'
          ? 'Góc nhọn có số đo lớn hơn 0° và nhỏ hơn 90°; góc 90° là góc vuông.'
          : 'Góc tù có số đo lớn hơn 90° và nhỏ hơn 180°; góc 180° là góc bẹt.',
      ],
      steps: [...list.map((d) => `${d}°: ${kindName(d)}.`), `Có ${answer} ${name}.`],
    };
  },
};

/** The drill of "Luyện tập chung" page 57: the four lessons before it. */
export const PAGE_57_SKILLS = [diemDuongThang, tia, doanThang, trungDiem];

/** The drill of "Luyện tập chung" page 65: the lessons on angles. */
export const PAGE_65_SKILLS = [goc, soDoGoc];

/** The end-of-chapter test: every lesson of the chapter. */
export const CHAPTER_SKILLS = [diemDuongThang, tia, doanThang, trungDiem, goc, soDoGoc];
