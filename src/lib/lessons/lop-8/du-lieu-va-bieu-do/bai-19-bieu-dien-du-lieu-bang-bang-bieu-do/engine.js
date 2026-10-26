/**
 * Data and checks for the lesson's widgets: data sets that each come with a
 * purpose, a verdict on how well each kind of chart serves that purpose,
 * the icon rows of a picture chart, and the comparisons used when the
 * learner draws a chart from a table.
 */

/** @typedef {'tranh' | 'cot' | 'quat' | 'doan'} ChartKind */
/** @typedef {'best' | 'ok' | 'bad'} Fit */

/** @type {Array<{ value: ChartKind, label: string }>} */
export const CHART_KINDS = [
  { value: 'tranh', label: 'Tranh' },
  { value: 'cot', label: 'Cột' },
  { value: 'quat', label: 'Quạt tròn' },
  { value: 'doan', label: 'Đoạn thẳng' },
];

/**
 * @typedef {object} ChartData
 * @property {string} id
 * @property {string} short label of the switch
 * @property {string} title what the numbers are
 * @property {string} purpose what the chart has to show
 * @property {string} unit axis title
 * @property {string[]} labels categories
 * @property {number[]} values
 * @property {number} icon how much one icon stands for in the picture chart
 * @property {string} iconUnit what one icon counts, such as 'cây'
 * @property {Record<ChartKind, { fit: Fit, why: string }>} verdict
 */

/** @type {ChartData[]} */
export const DATA_SETS = [
  {
    id: 'the-thao',
    short: 'Thể thao',
    title: 'Môn thể thao yêu thích của 30 học sinh lớp 8A (mỗi bạn chọn một môn)',
    purpose: 'Cho biết mỗi môn chiếm bao nhiêu phần trăm số học sinh cả lớp.',
    unit: 'Số học sinh',
    labels: ['Bóng đá', 'Cầu lông', 'Bơi', 'Cờ vua'],
    values: [12, 9, 6, 3],
    icon: 3,
    iconUnit: 'học sinh',
    verdict: {
      quat: {
        fit: 'best',
        why: 'Bốn môn là bốn phần của cả lớp, nên biểu đồ hình quạt tròn cho thấy ngay tỉ lệ của từng phần so với toàn thể: 40%, 30%, 20%, 10%.',
      },
      cot: {
        fit: 'ok',
        why: 'Biểu đồ cột so sánh được số bạn chọn mỗi môn, nhưng muốn biết tỉ lệ so với cả lớp còn phải tự tính.',
      },
      tranh: {
        fit: 'ok',
        why: 'Biểu đồ tranh dễ nhìn vì số liệu nhỏ, nhưng cũng không cho thấy ngay tỉ lệ phần trăm.',
      },
      doan: {
        fit: 'bad',
        why: 'Các môn thể thao không phải các thời điểm; nối các điểm bằng đoạn thẳng không có ý nghĩa gì.',
      },
    },
  },
  {
    id: 'nhiet-do',
    short: 'Nhiệt độ',
    title: 'Nhiệt độ trung bình (°C, làm tròn) các tháng trong năm ở một thành phố',
    purpose: 'Cho thấy nhiệt độ thay đổi thế nào theo thời gian trong năm.',
    unit: '°C',
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    values: [17, 18, 20, 24, 27, 29, 29, 29, 28, 25, 22, 18],
    icon: 5,
    iconUnit: '°C',
    verdict: {
      doan: {
        fit: 'best',
        why: 'Đây là một đại lượng thay đổi theo thời gian, lại có nhiều thời điểm: biểu đồ đoạn thẳng cho thấy rõ lúc tăng, lúc giảm.',
      },
      cot: {
        fit: 'ok',
        why: 'Vẽ được, nhưng phải vẽ tới 12 cột, khó thấy xu hướng tăng giảm bằng biểu đồ đoạn thẳng.',
      },
      quat: {
        fit: 'bad',
        why: 'Nhiệt độ các tháng không phải các phần của một toàn thể; "tổng nhiệt độ cả năm" không có ý nghĩa, nên không dùng biểu đồ hình quạt tròn.',
      },
      tranh: {
        fit: 'bad',
        why: 'Nhiệt độ là số đo, không đếm từng biểu tượng được; lại có quá nhiều thời điểm.',
      },
    },
  },
  {
    id: 'cay',
    short: 'Trồng cây',
    title: 'Số cây xanh trồng được của bốn lớp khối 8',
    purpose: 'Treo trên bảng tin để các bạn nhỏ cũng so sánh được lớp nào trồng nhiều cây.',
    unit: 'Số cây',
    labels: ['8A', '8B', '8C', '8D'],
    values: [40, 35, 50, 45],
    icon: 10,
    iconUnit: 'cây',
    verdict: {
      tranh: {
        fit: 'best',
        why: 'Số cây là số đếm, đều là bội của 5: mỗi biểu tượng ứng với 10 cây, nửa biểu tượng ứng với 5 cây. Biểu đồ tranh sinh động, ai cũng đọc được.',
      },
      cot: {
        fit: 'ok',
        why: 'Biểu đồ cột so sánh tốt, chỉ kém sinh động hơn biểu đồ tranh cho bảng tin.',
      },
      quat: {
        fit: 'ok',
        why: 'Vẽ được (số cây của bốn lớp là các phần của số cây cả khối), nhưng mục đích là so sánh các lớp chứ không phải tỉ lệ.',
      },
      doan: {
        fit: 'bad',
        why: 'Các lớp không phải các thời điểm, nên không dùng biểu đồ đoạn thẳng.',
      },
    },
  },
  {
    id: 'giay',
    short: 'Giấy vụn',
    title: 'Khối lượng giấy vụn (kg) thu gom được của bốn lớp khối 8',
    purpose: 'So sánh khối lượng giấy vụn các lớp thu gom được.',
    unit: 'kg',
    labels: ['8A', '8B', '8C', '8D'],
    values: [36, 42, 28, 50],
    icon: 10,
    iconUnit: 'kg',
    verdict: {
      cot: {
        fit: 'best',
        why: 'So sánh các đại lượng cùng loại của những đối tượng khác nhau: biểu đồ cột là lựa chọn phù hợp nhất.',
      },
      tranh: {
        fit: 'bad',
        why: 'Khối lượng là số đo và không chia hết cho một số tròn; phải vẽ những phần biểu tượng rất lẻ, khó đọc.',
      },
      quat: {
        fit: 'ok',
        why: 'Vẽ được, nhưng mục đích là so sánh khối lượng của các lớp chứ không phải tỉ lệ so với cả khối.',
      },
      doan: {
        fit: 'bad',
        why: 'Các lớp không phải các thời điểm, nên không dùng biểu đồ đoạn thẳng.',
      },
    },
  },
];

/**
 * The icons of one row of a picture chart: whole icons and the fraction of
 * one more icon.
 * @param {number} value
 * @param {number} icon how much one icon stands for
 * @returns {{ whole: number, part: number }}
 */
export function iconRow(value, icon) {
  const whole = Math.floor(value / icon);
  const part = Math.round(((value - whole * icon) / icon) * 100) / 100;
  return { whole, part };
}

/**
 * Whole-number percentages of a total, for data whose parts are exact.
 * @param {number[]} values
 * @returns {number[]}
 */
export function exactPercents(values) {
  const total = values.reduce((a, b) => a + b, 0);
  return values.map((v) => Math.round((v * 10000) / total) / 100);
}

/** Paper collected by four classes, drawn as a bar chart from the table. */
export const BAR_TASK = {
  labels: ['8A', '8B', '8C', '8D'],
  values: [36, 42, 28, 50],
  step: 2,
  max: 60,
};

/** Favourite sports of 40 students, drawn as a pie chart from the table. */
export const PIE_TASK = {
  labels: ['Bóng đá', 'Cầu lông', 'Bơi', 'Đá cầu'],
  values: [14, 10, 6, 10],
};

/**
 * The positions where the drawn values differ from the table.
 * @param {number[]} target
 * @param {number[]} drawn
 * @param {number} [tolerance]
 * @returns {number[]}
 */
export function mismatches(target, drawn, tolerance = 1e-9) {
  return target.flatMap((v, i) => (Math.abs((drawn[i] ?? NaN) - v) <= tolerance ? [] : [i]));
}
