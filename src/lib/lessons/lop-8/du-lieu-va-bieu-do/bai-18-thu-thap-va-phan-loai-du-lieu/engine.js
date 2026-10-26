/**
 * Data for the two widgets of the lesson: decks of cards to sort by how the
 * data is collected and by kind of data, and small data sets with a few
 * values that cannot be right, for the learner to find.
 */

/** @type {import('#lib/core/card-sorter.js').SortBin[]} */
export const METHOD_BINS = [
  { id: 'truc-tiep', label: 'Thu thập trực tiếp' },
  { id: 'gian-tiep', label: 'Thu thập gián tiếp' },
];

/** @type {import('#lib/core/card-sorter.js').SortCard[]} */
export const METHOD_CARDS = [
  {
    id: 'bam-gio',
    label: 'Thầy giáo dùng đồng hồ bấm giờ đo thời gian chạy 100 m của từng bạn',
    bin: 'truc-tiep',
    why: 'Thầy tự quan sát và đo từng bạn, nên dữ liệu được thu thập trực tiếp.',
  },
  {
    id: 'phieu-hoi',
    label: 'Lớp trưởng phát phiếu hỏi các bạn về môn học yêu thích',
    bin: 'truc-tiep',
    why: 'Lập bảng hỏi là một cách thu thập trực tiếp.',
  },
  {
    id: 'dem-xe',
    label: 'Đếm số xe đạp đi qua cổng trường từ 6 giờ 30 đến 7 giờ',
    bin: 'truc-tiep',
    why: 'Quan sát và đếm tại chỗ là thu thập trực tiếp.',
  },
  {
    id: 'gieo-hat',
    label: 'Gieo 50 hạt đậu rồi đếm số hạt nảy mầm sau ba ngày',
    bin: 'truc-tiep',
    why: 'Đây là làm thí nghiệm, một cách thu thập trực tiếp.',
  },
  {
    id: 'phong-van',
    label: 'Phỏng vấn bác bảo vệ về số giờ làm việc mỗi ngày',
    bin: 'truc-tiep',
    why: 'Phỏng vấn là thu thập trực tiếp từ người được hỏi.',
  },
  {
    id: 'trang-web',
    label: 'Lấy số dân của các tỉnh từ trang web của Tổng cục Thống kê',
    bin: 'gian-tiep',
    why: 'Dữ liệu đã có sẵn trên trang web, ta chỉ lấy lại: thu thập gián tiếp.',
  },
  {
    id: 'bao',
    label: 'Ghi lại kết quả các trận bóng đá từ báo Thể thao',
    bin: 'gian-tiep',
    why: 'Báo là nguồn có sẵn, nên đây là thu thập gián tiếp.',
  },
  {
    id: 'sach',
    label: 'Chép độ cao của các ngọn núi từ sách Địa lí',
    bin: 'gian-tiep',
    why: 'Sách là nguồn có sẵn: thu thập gián tiếp.',
  },
];

/** @type {import('#lib/core/card-sorter.js').SortBin[]} */
export const KIND_BINS = [
  { id: 'roi-rac', label: 'Số liệu rời rạc' },
  { id: 'lien-tuc', label: 'Số liệu liên tục' },
  { id: 'thu-tu', label: 'Định tính, sắp thứ tự được' },
  { id: 'khong', label: 'Định tính, không sắp thứ tự được' },
];

/** @type {import('#lib/core/card-sorter.js').SortCard[]} */
export const KIND_CARDS = [
  {
    id: 'so-mon',
    label: 'Số môn thể thao mỗi bạn biết chơi',
    bin: 'roi-rac',
    why: 'Là kết quả của phép đếm, chỉ nhận các số tự nhiên 0, 1, 2, …',
  },
  {
    id: 'so-chu',
    label: 'Số chữ cái trong tên của mỗi bạn',
    bin: 'roi-rac',
    why: 'Đếm số chữ cái được một số tự nhiên; không có tên nào có 3,5 chữ cái.',
  },
  {
    id: 'ban-thang',
    label: 'Số bàn thắng của mỗi đội trong một trận',
    bin: 'roi-rac',
    why: 'Số bàn thắng là số đếm nên là số liệu rời rạc.',
  },
  {
    id: 'chieu-cao',
    label: 'Chiều cao (cm) của các bạn trong lớp',
    bin: 'lien-tuc',
    why: 'Chiều cao là số đo, có thể nhận mọi giá trị trong một khoảng, chẳng hạn từ 140 cm đến 170 cm.',
  },
  {
    id: 'thoi-gian',
    label: 'Thời gian (giây) chạy 100 m của mỗi bạn',
    bin: 'lien-tuc',
    why: 'Thời gian là số đo, có thể là 14,2 giây, 14,25 giây, …',
  },
  {
    id: 'can-nang',
    label: 'Cân nặng (kg) của các bạn trong tổ',
    bin: 'lien-tuc',
    why: 'Cân nặng đo bằng cân, nhận giá trị tuỳ ý trong một khoảng.',
  },
  {
    id: 'hai-long',
    label: 'Mức độ hài lòng: rất hài lòng, hài lòng, không hài lòng',
    bin: 'thu-tu',
    why: 'Không phải là số nhưng xếp được từ hài lòng nhiều đến ít.',
  },
  {
    id: 'co-ao',
    label: 'Cỡ áo đồng phục: S, M, L, XL',
    bin: 'thu-tu',
    why: 'Cỡ áo ghi bằng chữ nhưng xếp được từ nhỏ đến lớn.',
  },
  {
    id: 'mang',
    label: 'Mạng điện thoại di động đang dùng',
    bin: 'khong',
    why: 'Tên các nhà mạng không phải là số và không có nhà mạng nào đứng trước nhà mạng nào.',
  },
  {
    id: 'mau',
    label: 'Màu sắc yêu thích',
    bin: 'khong',
    why: 'Tên màu không phải là số và không sắp được thứ tự.',
  },
];

/**
 * @typedef {object} DataSet
 * @property {string} id
 * @property {string} title what was measured or counted
 * @property {string} context who collected it and how
 * @property {Array<{ text: string, bad?: string }>} values each value as
 *   printed; `bad` explains why a value cannot be right
 */

/** @type {DataSet[]} */
export const DATA_SETS = [
  {
    id: 'can-nang',
    title: 'Cân nặng (kg) của 8 bạn lớp 8A',
    context: 'Bạn Lan cân từng bạn trong tổ và ghi lại.',
    values: [
      { text: '45' },
      { text: '52' },
      { text: '48' },
      { text: '4,8', bad: 'Học sinh lớp 8 không thể chỉ nặng 4,8 kg; có lẽ Lan ghi nhầm 48.' },
      { text: '50' },
      { text: '47' },
      { text: '145', bad: '145 kg quá nặng so với học sinh lớp 8; giá trị này không hợp lí.' },
      { text: '51' },
    ],
  },
  {
    id: 'so-con',
    title: 'Số con của 8 gia đình trong một tổ dân phố',
    context: 'Tổ trưởng hỏi từng gia đình và ghi lại.',
    values: [
      { text: '2' },
      { text: '1' },
      { text: '3' },
      { text: '2,5', bad: 'Số con là số đếm nên phải là số tự nhiên, không thể là 2,5.' },
      { text: '2' },
      { text: '0' },
      { text: '−1', bad: 'Số con không thể là số âm.' },
      { text: '2' },
    ],
  },
  {
    id: 'diem',
    title: 'Điểm kiểm tra môn Toán (thang điểm 10) của 8 bạn',
    context: 'Bạn Minh chép điểm từ sổ điểm của tổ.',
    values: [
      { text: '8' },
      { text: '9,5' },
      { text: '7' },
      { text: '11', bad: 'Thang điểm 10 nên không có điểm 11.' },
      { text: '6,5' },
      { text: '10' },
      { text: '85', bad: 'Điểm không thể vượt quá 10; có lẽ đây là 8,5 bị ghi thiếu dấu phẩy.' },
      { text: '9' },
    ],
  },
  {
    id: 'nhiet-do',
    title: 'Nhiệt độ cao nhất (°C) trong 7 ngày đầu tháng Sáu ở Hà Nội',
    context: 'Bạn Hà ghi từ bản tin thời tiết mỗi tối.',
    values: [
      { text: '34' },
      { text: '35' },
      { text: '33' },
      { text: '36' },
      {
        text: '350',
        bad: 'Không có nơi nào trên Trái Đất nóng 350 °C; có lẽ Hà ghi thừa chữ số 0.',
      },
      { text: '34' },
      { text: '32' },
    ],
  },
];

/**
 * Compares the values the learner flagged with the values that cannot be
 * right.
 * @param {DataSet} set
 * @param {Iterable<number>} flagged indices of the values flagged as wrong
 * @returns {{ found: number[], missed: number[], extra: number[], total: number, done: boolean }}
 */
export function checkFlags(set, flagged) {
  const picked = new Set(flagged);
  /** @type {number[]} */
  const found = [];
  /** @type {number[]} */
  const missed = [];
  /** @type {number[]} */
  const extra = [];
  set.values.forEach((v, i) => {
    if (v.bad && picked.has(i)) found.push(i);
    else if (v.bad) missed.push(i);
    else if (picked.has(i)) extra.push(i);
  });
  const total = found.length + missed.length;
  return { found, missed, extra, total, done: missed.length === 0 && extra.length === 0 };
}
