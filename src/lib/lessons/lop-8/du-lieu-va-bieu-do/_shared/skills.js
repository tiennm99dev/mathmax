/**
 * Question generators for the chapter "Dữ liệu và biểu đồ", one skill per
 * lesson plus one for real-life problems. Every answer is a natural number
 * (a count, a position, a percentage or a ratio), so the drill boards read
 * input with the default reader. Prompts and steps are plain text.
 */

import { int, pick, shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * @typedef {'roi-rac' | 'lien-tuc' | 'thu-tu' | 'khong'} DataKind
 * 'roi-rac': số liệu rời rạc; 'lien-tuc': số liệu liên tục; 'thu-tu': định
 * tính sắp thứ tự được; 'khong': định tính không sắp thứ tự được.
 */

/** @type {ReadonlyArray<{ text: string, kind: DataKind }>} */
export const DATA_POOL = [
  { text: 'số học sinh của mỗi lớp', kind: 'roi-rac' },
  { text: 'số anh chị em ruột của mỗi bạn', kind: 'roi-rac' },
  { text: 'số bàn thắng của mỗi đội trong một trận', kind: 'roi-rac' },
  { text: 'số chữ cái trong tên của mỗi bạn', kind: 'roi-rac' },
  { text: 'số cuốn sách mỗi bạn đọc trong tháng', kind: 'roi-rac' },
  { text: 'chiều cao (cm) của các bạn trong lớp', kind: 'lien-tuc' },
  { text: 'cân nặng (kg) của các bạn trong tổ', kind: 'lien-tuc' },
  { text: 'thời gian (giây) chạy 100 m của mỗi bạn', kind: 'lien-tuc' },
  { text: 'nhiệt độ (°C) lúc 7 giờ sáng mỗi ngày', kind: 'lien-tuc' },
  { text: 'lượng mưa (mm) mỗi tháng', kind: 'lien-tuc' },
  { text: 'mức độ hài lòng: rất hài lòng, hài lòng, không hài lòng', kind: 'thu-tu' },
  { text: 'kết quả học tập: Tốt, Khá, Đạt, Chưa đạt', kind: 'thu-tu' },
  { text: 'cỡ áo: S, M, L, XL', kind: 'thu-tu' },
  { text: 'mức độ yêu thích môn Toán: rất thích, thích, không thích', kind: 'thu-tu' },
  { text: 'môn thể thao yêu thích', kind: 'khong' },
  { text: 'màu sắc yêu thích', kind: 'khong' },
  { text: 'tỉnh, thành phố nơi sinh', kind: 'khong' },
  { text: 'mạng điện thoại di động đang dùng', kind: 'khong' },
  { text: 'phương tiện đến trường', kind: 'khong' },
];

/** The question and the name of each kind, for counting questions. */
const KIND_TEXT = {
  'roi-rac': { ask: 'Có bao nhiêu dãy là số liệu rời rạc?', name: 'số liệu rời rạc (số đếm)' },
  'lien-tuc': { ask: 'Có bao nhiêu dãy là số liệu liên tục?', name: 'số liệu liên tục (số đo)' },
  'thu-tu': {
    ask: 'Có bao nhiêu dãy là dữ liệu định tính sắp thứ tự được?',
    name: 'định tính sắp thứ tự được',
  },
  khong: {
    ask: 'Có bao nhiêu dãy là dữ liệu định tính không sắp thứ tự được?',
    name: 'định tính không sắp thứ tự được',
  },
};

/** @type {Skill} */
export const thuThap = {
  id: 'thu-thap',
  label: 'Bài 18. Thu thập và phân loại dữ liệu',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const items = shuffle(rand, DATA_POOL).slice(0, 5);
      const kind = pick(rand, items).kind;
      const hits = items.filter((d) => d.kind === kind);
      return {
        prompt: `Cho các dãy dữ liệu: ${items.map((d, i) => `(${i + 1}) ${d.text}`).join('; ')}. ${KIND_TEXT[kind].ask}`,
        answer: hits.length,
        hints: [
          'Hỏi trước: dữ liệu có phải là số không? Số đếm là rời rạc, số đo là liên tục.',
          'Với dữ liệu không phải số: các giá trị có xếp được thứ tự không?',
        ],
        steps: [
          ...items.map((d, i) => `(${i + 1}) ${d.text}: ${KIND_TEXT[d.kind].name}.`),
          `Vậy có ${hits.length} dãy là ${KIND_TEXT[kind].name}.`,
        ],
      };
    }
    if (v === 1) {
      const n = 6;
      const values = Array.from({ length: n }, () => int(rand, 40, 58));
      const pos = int(rand, 0, n - 1);
      const bad = pick(rand, [145, 150, 160, 250, 4]);
      values[pos] = bad;
      return {
        prompt: `Bạn Lan ghi cân nặng (kg) của 6 bạn lớp 8 theo thứ tự: ${values.join('; ')}. Giá trị không hợp lí là giá trị thứ mấy trong dãy?`,
        answer: pos + 1,
        hints: ['Học sinh lớp 8 thường nặng khoảng từ 30 kg đến 70 kg.'],
        steps: [
          `Học sinh lớp 8 không thể nặng ${bad} kg, nên giá trị ${bad} không hợp lí.`,
          `Giá trị ${bad} đứng ở vị trí thứ ${pos + 1} trong dãy.`,
        ],
      };
    }
    if (v === 2) {
      const a = 5 * int(rand, 4, 8);
      const b = 5 * int(rand, 2, 5);
      const c = 5 * int(rand, 1, 4);
      const d = 100 - a - b - c;
      const [x, y, z, w] = shuffle(rand, ['bánh mì', 'xôi', 'phở', 'bún']);
      return {
        prompt: `Khảo sát món ăn sáng yêu thích (mỗi bạn chọn một món): ${x} ${a}%, ${y} ${b}%, ${z} ${c}%, còn lại là ${w}. Để dữ liệu hợp lí, tỉ lệ chọn ${w} là bao nhiêu phần trăm?`,
        answer: d,
        unit: '%',
        hints: ['Bốn món là bốn phần của toàn bộ các bạn được hỏi, tổng các tỉ lệ bằng 100%.'],
        steps: [
          `Tổng ba tỉ lệ đã biết: ${a}% + ${b}% + ${c}% = ${a + b + c}%.`,
          `Tỉ lệ chọn ${w}: 100% − ${a + b + c}% = ${d}%.`,
        ],
      };
    }
    const total = int(rand, 32, 45);
    const a = int(rand, 10, 16);
    const b = int(rand, 6, 12);
    const c = total - a - b;
    return {
      prompt: `Lớp 8A có ${total} học sinh, mỗi bạn chọn đúng một câu lạc bộ: ${a} bạn chọn bóng đá, ${b} bạn chọn cờ vua, số còn lại chọn mĩ thuật. Để dữ liệu hợp lí, có bao nhiêu bạn chọn mĩ thuật?`,
      answer: c,
      hints: ['Tổng số bạn ở ba câu lạc bộ phải bằng sĩ số lớp.'],
      steps: [`${a} + ${b} = ${a + b} (bạn).`, `Số bạn chọn mĩ thuật: ${total} − ${a + b} = ${c}.`],
    };
  },
};

/** @type {Skill} */
export const bieuDien = {
  id: 'bieu-dien',
  label: 'Bài 19. Biểu diễn dữ liệu bằng bảng, biểu đồ',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const total = pick(rand, [20, 25, 40, 50]);
      let c = int(rand, 2, total - 4);
      // Keep the share a whole percentage.
      while ((c * 100) % total !== 0) c += 1;
      const pct = (c * 100) / total;
      return {
        prompt: `Khảo sát ${total} học sinh, có ${c} bạn thích đọc truyện tranh. Khi vẽ biểu đồ hình quạt tròn, phần "Truyện tranh" chiếm bao nhiêu phần trăm?`,
        answer: pct,
        unit: '%',
        hints: ['Tỉ lệ phần trăm = số bạn : tổng số bạn · 100%.'],
        steps: [`Tỉ lệ: ${c} : ${total} · 100% = ${pct}%.`],
      };
    }
    if (v === 1) {
      const k = pick(rand, [2, 4, 6, 10]);
      const n = int(rand, 2, 8);
      const value = n * k + k / 2;
      return {
        prompt: `Trong một biểu đồ tranh, mỗi biểu tượng ứng với ${k} học sinh. Hàng "Cầu lông" có ${n} biểu tượng và nửa biểu tượng. Có bao nhiêu học sinh chọn cầu lông?`,
        answer: value,
        hints: [`Nửa biểu tượng ứng với ${k} : 2 = ${k / 2} học sinh.`],
        steps: [`${n} · ${k} + ${k / 2} = ${value} (học sinh).`],
      };
    }
    if (v === 2) {
      const total = pick(rand, [40, 80, 200, 400, 500]);
      const pct = 5 * int(rand, 1, 12);
      const count = (total * pct) / 100;
      return {
        prompt: `Biểu đồ hình quạt tròn về phương tiện đến trường của ${total} học sinh cho biết phần "Xe đạp" chiếm ${pct}%. Có bao nhiêu học sinh đi xe đạp?`,
        answer: count,
        hints: [`Số học sinh = ${total} · ${pct} : 100.`],
        steps: [`${total} · ${pct} : 100 = ${fmt(count)} (học sinh).`],
      };
    }
    const k = pick(rand, [5, 10, 20]);
    const n = int(rand, 3, 9);
    const value = n * k;
    return {
      prompt: `Muốn vẽ biểu đồ tranh với mỗi biểu tượng ứng với ${k} cây, lớp trồng được ${value} cây cần vẽ bao nhiêu biểu tượng?`,
      answer: n,
      hints: ['Chia số cây cho số cây ứng với một biểu tượng.'],
      steps: [`${value} : ${k} = ${n} (biểu tượng).`],
    };
  },
};

const MONTHS = ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6'];

/** @type {Skill} */
export const phanTich = {
  id: 'phan-tich',
  label: 'Bài 20. Phân tích số liệu dựa vào biểu đồ',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const values = Array.from({ length: 6 }, () => 5 * int(rand, 20, 40));
      const i = int(rand, 0, 4);
      const j = int(rand, i + 1, 5);
      if (values[j] === values[i]) values[j] += 15;
      const diff = Math.abs(values[j] - values[i]);
      const up = values[j] > values[i];
      return {
        prompt: `Biểu đồ đoạn thẳng cho doanh thu (triệu đồng) của một cửa hàng từ tháng 1 đến tháng 6: ${values.join('; ')}. Doanh thu ${MONTHS[j]} ${up ? 'tăng' : 'giảm'} bao nhiêu triệu đồng so với ${MONTHS[i]}?`,
        answer: diff,
        hints: [`Đọc doanh thu ${MONTHS[i]} và ${MONTHS[j]} rồi tính hiệu.`],
        steps: [
          `Doanh thu ${MONTHS[i]}: ${values[i]}; doanh thu ${MONTHS[j]}: ${values[j]}.`,
          `Mức ${up ? 'tăng' : 'giảm'}: ${Math.max(values[i], values[j])} − ${Math.min(values[i], values[j])} = ${diff} (triệu đồng).`,
        ],
      };
    }
    if (v === 1) {
      const a = pick(rand, [80, 120, 200, 250, 400]);
      let p = pick(rand, [5, 10, 20, 25, 50]);
      // 250 · 5% is not a whole number of students.
      if ((a * p) % 100 !== 0) p = 10;
      const b = a + (a * p) / 100;
      return {
        prompt: `Số học sinh tham gia câu lạc bộ đọc sách tăng từ ${a} bạn (năm trước) lên ${b} bạn (năm nay). Số bạn tham gia tăng bao nhiêu phần trăm so với năm trước?`,
        answer: p,
        unit: '%',
        hints: ['Mức tăng phần trăm = (năm nay − năm trước) : năm trước · 100%.'],
        steps: [`Mức tăng: ${b} − ${a} = ${b - a} (bạn).`, `${b - a} : ${a} · 100% = ${p}%.`],
      };
    }
    if (v === 2) {
      const base = pick(rand, [50, 80, 90, 100, 900]);
      const x = pick(rand, [2, 4, 5, 10]);
      const k = int(rand, 2, 5);
      const a = base + x;
      const b = base + k * x;
      return {
        prompt: `Một biểu đồ cột có trục đứng bắt đầu từ ${fmt(base)}. Cột A biểu diễn ${fmt(a)}, cột B biểu diễn ${fmt(b)}. Trên hình, cột B cao gấp mấy lần cột A?`,
        answer: k,
        hints: [`Phần cột nhìn thấy bắt đầu từ ${fmt(base)}, không phải từ 0.`],
        steps: [
          `Phần cột nhìn thấy: A cao ${fmt(a)} − ${fmt(base)} = ${x}, B cao ${fmt(b)} − ${fmt(base)} = ${k * x}.`,
          `Trên hình cột B cao gấp ${k * x} : ${x} = ${k} lần cột A (dù thực tế chênh lệch nhỏ hơn nhiều).`,
        ],
      };
    }
    const values = Array.from({ length: 4 }, () => int(rand, 20, 60));
    const sum = values.reduce((s, x) => s + x, 0);
    values[3] += (4 - (sum % 4)) % 4;
    const total = values.reduce((s, x) => s + x, 0);
    const avg = total / 4;
    return {
      prompt: `Biểu đồ cột cho số cây trồng được của bốn lớp 8A, 8B, 8C, 8D: ${values.join('; ')}. Trung bình mỗi lớp trồng được bao nhiêu cây?`,
      answer: avg,
      hints: ['Cộng số cây của bốn lớp rồi chia cho 4.'],
      steps: [
        `Tổng: ${values.join(' + ')} = ${total} (cây).`,
        `Trung bình: ${total} : 4 = ${avg} (cây).`,
      ],
    };
  },
};

/** @type {Skill} */
export const thucTe = {
  id: 'thuc-te',
  label: 'Vận dụng thực tế',
  make(rand) {
    const v = int(rand, 0, 1);
    if (v === 0) {
      const total = pick(rand, [200, 300, 400, 500]);
      const p1 = 5 * int(rand, 4, 8);
      const p2 = 5 * int(rand, 2, 5);
      const count = (total * (p1 + p2)) / 100;
      return {
        prompt: `Một khu dân cư có ${total} hộ gia đình. Biểu đồ hình quạt tròn về nguồn nước sinh hoạt cho biết: nước máy ${p1}%, giếng khoan ${p2}%, còn lại là nguồn khác. Có bao nhiêu hộ dùng nước máy hoặc giếng khoan?`,
        answer: count,
        hints: ['Cộng hai tỉ lệ trước, rồi tính số hộ.'],
        steps: [
          `Nước máy hoặc giếng khoan chiếm ${p1}% + ${p2}% = ${p1 + p2}%.`,
          `Số hộ: ${total} · ${p1 + p2} : 100 = ${fmt(count)} (hộ).`,
        ],
      };
    }
    const price = pick(rand, [5, 8, 10, 12]);
    const kgs = Array.from({ length: 3 }, () => 2 * int(rand, 10, 30));
    const total = kgs.reduce((s, x) => s + x, 0);
    const money = total * price;
    return {
      prompt: `Biểu đồ cột cho khối lượng giấy vụn (kg) ba lớp thu gom được: 8A ${kgs[0]} kg, 8B ${kgs[1]} kg, 8C ${kgs[2]} kg. Nếu bán giấy vụn với giá ${price} nghìn đồng mỗi ki-lô-gam thì ba lớp thu được bao nhiêu nghìn đồng?`,
      answer: money,
      hints: ['Tính tổng khối lượng giấy trước.'],
      steps: [
        `Tổng khối lượng: ${kgs.join(' + ')} = ${total} (kg).`,
        `Số tiền: ${total} · ${price} = ${fmt(money)} (nghìn đồng).`,
      ],
    };
  },
};

/** The three lessons of the chapter, for the practice lesson. */
export const PRACTICE_SKILLS = [thuThap, bieuDien, phanTich];

/** The chapter review: every lesson plus real-life problems. */
export const CHAPTER_SKILLS = [thuThap, bieuDien, phanTich, thucTe];
