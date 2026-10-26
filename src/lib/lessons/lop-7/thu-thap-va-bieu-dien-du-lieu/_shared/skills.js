/**
 * Question generators for the chapter "Thu thập và biểu diễn dữ liệu". Every
 * answer is a natural number (a count, a percentage, an angle in degrees or
 * a month number), so a drill board reads input with the default reader.
 */

import { int, pick, shuffle } from '#lib/core/drill.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * @typedef {'so' | 'thu-tu' | 'khong'} DataKind
 * 'so': số liệu; 'thu-tu': không phải số, sắp thứ tự được; 'khong': không
 * phải số, không sắp thứ tự được.
 */

/** @type {ReadonlyArray<{ text: string, kind: DataKind }>} */
export const DATA_POOL = [
  { text: 'chiều cao (cm) của các bạn trong lớp', kind: 'so' },
  { text: 'số anh chị em ruột của mỗi bạn', kind: 'so' },
  { text: 'nhiệt độ (°C) lúc 7 giờ sáng mỗi ngày', kind: 'so' },
  { text: 'thời gian (phút) đi từ nhà đến trường', kind: 'so' },
  { text: 'số bàn thắng của mỗi đội bóng', kind: 'so' },
  { text: 'cân nặng (kg) của các bạn trong tổ', kind: 'so' },
  { text: 'mức độ yêu thích môn Toán: rất thích, thích, không thích', kind: 'thu-tu' },
  { text: 'kết quả học tập: Tốt, Khá, Đạt, Chưa đạt', kind: 'thu-tu' },
  { text: 'cỡ áo: S, M, L, XL', kind: 'thu-tu' },
  { text: 'ý kiến: đồng ý, phân vân, không đồng ý', kind: 'thu-tu' },
  { text: 'môn thể thao yêu thích', kind: 'khong' },
  { text: 'tỉnh, thành phố nơi sinh', kind: 'khong' },
  { text: 'màu sắc yêu thích', kind: 'khong' },
  { text: 'phương tiện đến trường', kind: 'khong' },
  { text: 'tên loài hoa em thích', kind: 'khong' },
];

/** What each classification question asks for, by kind of data counted. */
const ASK = {
  so: 'Có bao nhiêu dãy là số liệu?',
  'thu-tu': 'Có bao nhiêu dãy là dữ liệu không phải số nhưng sắp thứ tự được?',
  khong: 'Có bao nhiêu dãy là dữ liệu không phải số và không sắp thứ tự được?',
};

/** @type {Skill} */
export const phanLoaiDuLieu = {
  id: 'phan-loai-du-lieu',
  label: 'Bài 17. Thu thập và phân loại dữ liệu',
  make(rand) {
    const kind = pick(rand, ['dem', 'dem', 'mau']);
    if (kind === 'mau') {
      const grades = int(rand, 3, 4);
      const per = int(rand, 5, 10);
      const pick1 = int(rand, 3, 8);
      const classes = grades * per;
      const ans = classes * pick1;
      return {
        prompt: `Một trường có ${grades} khối, mỗi khối có ${per} lớp. Để dữ liệu có tính đại diện cho cả trường, mỗi lớp chọn ngẫu nhiên ${pick1} học sinh để khảo sát. Có bao nhiêu học sinh được khảo sát?`,
        answer: ans,
        hints: ['Trước hết tính số lớp của cả trường.', `Số lớp: ${grades} · ${per}.`],
        steps: [
          `Số lớp của trường: ${grades} · ${per} = ${classes} (lớp).`,
          `Số học sinh được khảo sát: ${classes} · ${pick1} = ${ans}.`,
        ],
      };
    }
    const items = shuffle(rand, DATA_POOL).slice(0, 5);
    const target = /** @type {DataKind} */ (pick(rand, ['so', 'so', 'thu-tu', 'khong']));
    const hits = items.filter((x) => x.kind === target);
    const name = { so: 'số liệu', 'thu-tu': 'sắp thứ tự được', khong: 'không sắp thứ tự được' };
    return {
      prompt: `Bạn An thu thập năm dãy dữ liệu: ${items.map((x, i) => `(${i + 1}) ${x.text}`).join('; ')}. ${ASK[target]}`,
      answer: hits.length,
      hints: [
        'Số liệu là dữ liệu ghi bằng số đo hoặc số đếm.',
        'Với dữ liệu ghi bằng chữ, xem các giá trị có xếp được từ thấp đến cao hay không.',
      ],
      steps: [
        ...items.map(
          (x, i) =>
            `(${i + 1}) ${x.text}: ${x.kind === 'so' ? 'số liệu' : x.kind === 'thu-tu' ? 'không phải số, sắp thứ tự được' : 'không phải số, không sắp thứ tự được'}.`,
        ),
        `Số dãy ${name[target]}: ${hits.length}.`,
      ],
    };
  },
};

/** @type {Skill} */
export const bieuDoHinhQuat = {
  id: 'bieu-do-hinh-quat',
  label: 'Bài 18. Biểu đồ hình quạt tròn',
  make(rand) {
    const kind = pick(rand, ['so-luong', 'phan-tram', 'con-lai', 'goc', 'tu-goc', 'chenh']);
    if (kind === 'so-luong') {
      const n = pick(rand, [20, 40, 60, 80, 120, 200, 300, 400, 500]);
      const ps = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].filter((p) => (n * p) % 100 === 0);
      const p = pick(rand, ps);
      const ans = (n * p) / 100;
      return {
        prompt: `Một khối có ${n} học sinh. Trên biểu đồ hình quạt, hình quạt "Thích đọc truyện" biểu diễn ${p}%. Có bao nhiêu học sinh thích đọc truyện?`,
        answer: ans,
        hints: ['Số lượng = tổng số · tỉ lệ phần trăm.', `Tính ${n} · ${p} : 100.`],
        steps: [`Số học sinh thích đọc truyện: ${n} · ${p} : 100 = ${ans}.`],
      };
    }
    if (kind === 'phan-tram') {
      const n = pick(rand, [20, 25, 40, 50]);
      const ks = [];
      for (let k = 1; k < n; k++) if ((k * 100) % n === 0) ks.push(k);
      const k = pick(rand, ks);
      const ans = (k * 100) / n;
      return {
        prompt: `Lớp 7D có ${n} học sinh, trong đó ${k} bạn đi xe đạp đến trường. Trên biểu đồ hình quạt, hình quạt "Xe đạp" biểu diễn bao nhiêu phần trăm?`,
        answer: ans,
        hints: ['Tỉ lệ = số lượng : tổng số · 100%.'],
        steps: [`Tỉ lệ: ${k} : ${n} · 100% = ${ans}%.`],
      };
    }
    if (kind === 'con-lai') {
      const a = 5 * int(rand, 2, 8);
      const b = 5 * int(rand, 1, 6);
      const c = 5 * int(rand, 1, Math.min(6, (95 - a - b) / 5));
      const ans = 100 - a - b - c;
      return {
        prompt: `Một biểu đồ hình quạt có bốn hình quạt. Ba hình quạt biểu diễn ${a}%, ${b}% và ${c}%. Hình quạt thứ tư biểu diễn bao nhiêu phần trăm?`,
        answer: ans,
        hints: ['Cả hình tròn biểu diễn 100%.'],
        steps: [
          `${a}% + ${b}% + ${c}% = ${a + b + c}%.`,
          `Hình quạt thứ tư: 100% − ${a + b + c}% = ${ans}%.`,
        ],
      };
    }
    if (kind === 'goc') {
      const p = 5 * int(rand, 1, 18);
      const ans = (p * 18) / 5;
      return {
        prompt: `Hình quạt biểu diễn ${p}% có góc ở tâm bằng bao nhiêu độ?`,
        answer: ans,
        hints: ['Cả hình tròn 360° ứng với 100%, nên 1% ứng với 3,6°.'],
        steps: ['1% ứng với 360° : 100 = 3,6°.', `Góc ở tâm: ${p} · 3,6° = ${ans}°.`],
      };
    }
    if (kind === 'tu-goc') {
      const angle = 18 * int(rand, 1, 18);
      const ans = (angle * 100) / 360;
      return {
        prompt: `Một hình quạt có góc ở tâm ${angle}°. Hình quạt đó biểu diễn bao nhiêu phần trăm của toàn thể?`,
        answer: ans,
        hints: ['360° ứng với 100%.', `Tính ${angle} : 360 · 100%.`],
        steps: [`Tỉ lệ: ${angle} : 360 · 100% = ${ans}%.`],
      };
    }
    const n = pick(rand, [40, 60, 80, 200]);
    const ps = [5, 10, 15, 20, 25, 30, 35, 40, 45].filter((p) => (n * p) % 100 === 0);
    let p1 = pick(rand, ps);
    let p2 = pick(rand, ps);
    while (p2 === p1) p2 = pick(rand, ps);
    if (p2 > p1) [p1, p2] = [p2, p1];
    const ans = (n * (p1 - p2)) / 100;
    return {
      prompt: `Lớp có ${n} học sinh. Biểu đồ hình quạt cho biết ${p1}% số bạn thích bóng đá và ${p2}% số bạn thích cầu lông. Số bạn thích bóng đá nhiều hơn số bạn thích cầu lông bao nhiêu bạn?`,
      answer: ans,
      hints: [
        'Tính số bạn của mỗi nhóm, hoặc tính phần trăm chênh lệch trước.',
        `Chênh lệch: ${p1}% − ${p2}% = ${p1 - p2}%.`,
      ],
      steps: [
        `Bóng đá: ${n} · ${p1} : 100 = ${(n * p1) / 100} bạn; cầu lông: ${n} · ${p2} : 100 = ${(n * p2) / 100} bạn.`,
        `Chênh lệch: ${(n * p1) / 100} − ${(n * p2) / 100} = ${ans} bạn.`,
      ],
    };
  },
};

/**
 * Six monthly values, multiples of 5 from 40 to 120, with a single highest
 * and a single lowest value and at least one rise and one fall.
 * @param {() => number} rand
 * @returns {number[]}
 */
export function monthlySeries(rand) {
  for (;;) {
    const v = Array.from({ length: 6 }, () => 5 * int(rand, 8, 24));
    const hi = Math.max(...v);
    const lo = Math.min(...v);
    const d = v.slice(1).map((x, i) => x - v[i]);
    if (
      v.filter((x) => x === hi).length === 1 &&
      v.filter((x) => x === lo).length === 1 &&
      d.some((x) => x > 0) &&
      d.some((x) => x < 0)
    )
      return v;
  }
}

/** @param {readonly number[]} v */
const listMonths = (v) => v.map((x, i) => `tháng ${i + 1}: ${x}`).join('; ');

/** @type {Skill} */
export const bieuDoDoanThang = {
  id: 'bieu-do-doan-thang',
  label: 'Bài 19. Biểu đồ đoạn thẳng',
  make(rand) {
    const v = monthlySeries(rand);
    const d = v.slice(1).map((x, i) => x - v[i]);
    const intro = `Biểu đồ đoạn thẳng biểu diễn số sách thư viện cho mượn (cuốn) trong sáu tháng: ${listMonths(v)}.`;
    const kind = pick(rand, [
      'chenh',
      'cao-nhat',
      'thap-nhat',
      'khoang',
      'tang-manh',
      'so-lan-giam',
    ]);
    if (kind === 'chenh') {
      const i = int(rand, 0, 4);
      const ans = Math.abs(d[i]);
      const word = d[i] > 0 ? 'tăng' : d[i] < 0 ? 'giảm' : 'không đổi';
      return {
        prompt: `${intro} Từ tháng ${i + 1} đến tháng ${i + 2}, số sách cho mượn thay đổi bao nhiêu cuốn (tính độ chênh lệch)?`,
        answer: ans,
        hints: [`Đọc giá trị của tháng ${i + 1} và tháng ${i + 2}.`],
        steps: [
          `Tháng ${i + 1}: ${v[i]} cuốn; tháng ${i + 2}: ${v[i + 1]} cuốn.`,
          `Chênh lệch: ${Math.max(v[i], v[i + 1])} − ${Math.min(v[i], v[i + 1])} = ${ans} cuốn (${word}).`,
        ],
      };
    }
    if (kind === 'cao-nhat' || kind === 'thap-nhat') {
      const high = kind === 'cao-nhat';
      const target = high ? Math.max(...v) : Math.min(...v);
      const m = v.indexOf(target) + 1;
      return {
        prompt: `${intro} Tháng nào thư viện cho mượn ${high ? 'nhiều' : 'ít'} sách nhất? Nhập số của tháng đó.`,
        answer: m,
        hints: [
          `Tìm điểm ${high ? 'cao' : 'thấp'} nhất trên biểu đồ, tức giá trị ${high ? 'lớn' : 'nhỏ'} nhất.`,
        ],
        steps: [`Giá trị ${high ? 'lớn' : 'nhỏ'} nhất là ${target} cuốn, ở tháng ${m}.`],
      };
    }
    if (kind === 'khoang') {
      const hi = Math.max(...v);
      const lo = Math.min(...v);
      return {
        prompt: `${intro} Tháng cho mượn nhiều nhất hơn tháng cho mượn ít nhất bao nhiêu cuốn?`,
        answer: hi - lo,
        hints: ['Tìm giá trị lớn nhất và giá trị nhỏ nhất.'],
        steps: [
          `Lớn nhất: ${hi} cuốn; nhỏ nhất: ${lo} cuốn.`,
          `Chênh lệch: ${hi} − ${lo} = ${hi - lo} cuốn.`,
        ],
      };
    }
    if (kind === 'tang-manh') {
      const up = Math.max(...d);
      const i = d.indexOf(up);
      return {
        prompt: `${intro} Giữa hai tháng liên tiếp, số sách cho mượn tăng nhiều nhất là bao nhiêu cuốn?`,
        answer: up,
        hints: [
          'Tính mức thay đổi giữa từng cặp tháng liên tiếp.',
          'Đoạn thẳng đi lên dốc nhất ứng với mức tăng lớn nhất.',
        ],
        steps: [
          `Các mức thay đổi: ${d.map((x) => (x > 0 ? `+${x}` : x < 0 ? `−${-x}` : '0')).join('; ')}.`,
          `Tăng nhiều nhất: từ tháng ${i + 1} đến tháng ${i + 2}, tăng ${up} cuốn.`,
        ],
      };
    }
    const falls = d.filter((x) => x < 0).length;
    return {
      prompt: `${intro} Trên biểu đồ có bao nhiêu đoạn thẳng đi xuống (số sách giảm so với tháng trước)?`,
      answer: falls,
      hints: ['Đoạn thẳng đi xuống khi giá trị tháng sau nhỏ hơn tháng trước.'],
      steps: [
        `Các mức thay đổi: ${d.map((x) => (x > 0 ? `+${x}` : x < 0 ? `−${-x}` : '0')).join('; ')}.`,
        `Số đoạn đi xuống (mức thay đổi âm): ${falls}.`,
      ],
    };
  },
};

/** The three lessons of the chapter, in book order. */
export const CHAPTER_SKILLS = [phanLoaiDuLieu, bieuDoHinhQuat, bieuDoDoanThang];
