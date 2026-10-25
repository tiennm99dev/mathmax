/**
 * The answers of a class survey (phiếu hỏi) of lớp 6A, each to be sorted as a
 * reasonable number (số liệu), a reasonable answer that is not a number, or
 * an unreasonable answer to drop. The criteria are the book's: the right
 * format and a value inside the expected range.
 */

/** @typedef {import('#lib/core/card-sorter.js').SortCard} SortCard */

/** @type {import('#lib/core/card-sorter.js').SortBin[]} */
export const BINS = [
  { id: 'so-lieu', label: 'Số liệu (hợp lí)' },
  { id: 'khong-so', label: 'Không phải số (hợp lí)' },
  { id: 'loai', label: 'Không hợp lí, loại bỏ' },
];

/** The survey questions, so the widget can show what was asked. */
export const QUESTIONS = [
  'Chiều cao của em (cm)?',
  'Em có bao nhiêu anh chị em ruột?',
  'Môn học em yêu thích nhất?',
  'Em đến trường bằng phương tiện gì?',
  'Em đi từ nhà đến trường mất bao nhiêu phút?',
  'Điểm kiểm tra Toán gần nhất (thang điểm 10)?',
];

/** @type {SortCard[]} */
export const CARDS = [
  {
    id: 'cao-148',
    label: 'Chiều cao: 148 cm',
    bin: 'so-lieu',
    why: 'Là số, và 148 cm là chiều cao bình thường của học sinh lớp 6.',
  },
  {
    id: 'cao-1480',
    label: 'Chiều cao: 1\u202f480 cm',
    bin: 'loai',
    why: '1\u202f480 cm là gần 15 m, nằm ngoài phạm vi chiều cao của một người.',
  },
  {
    id: 'anh-chi-2',
    label: 'Số anh chị em ruột: 2',
    bin: 'so-lieu',
    why: 'Là số tự nhiên, đúng định dạng của câu hỏi.',
  },
  {
    id: 'anh-chi-1-5',
    label: 'Số anh chị em ruột: 1,5',
    bin: 'loai',
    why: 'Số người phải là số tự nhiên, nên 1,5 sai định dạng.',
  },
  {
    id: 'mon-toan',
    label: 'Môn học yêu thích: Toán',
    bin: 'khong-so',
    why: 'Tên một môn học là dữ liệu không phải số, và đúng với câu hỏi.',
  },
  {
    id: 'mon-van',
    label: 'Môn học yêu thích: Ngữ văn',
    bin: 'khong-so',
    why: 'Tên môn học là dữ liệu không phải số.',
  },
  {
    id: 'mon-bong-da',
    label: 'Môn học yêu thích: Bóng đá',
    bin: 'loai',
    why: 'Bóng đá là một môn thể thao, không phải tên một môn học ở trường.',
  },
  {
    id: 'xe-dap',
    label: 'Phương tiện: Xe đạp',
    bin: 'khong-so',
    why: 'Tên phương tiện là dữ liệu không phải số, và rất hợp lí.',
  },
  {
    id: 'may-bay',
    label: 'Phương tiện: Máy bay',
    bin: 'loai',
    why: 'Không ai đi máy bay từ nhà đến trường mỗi ngày: câu trả lời không hợp lí.',
  },
  {
    id: 'phut-15',
    label: 'Thời gian đến trường: 15 phút',
    bin: 'so-lieu',
    why: 'Là số và nằm trong phạm vi hợp lí.',
  },
  {
    id: 'phut-am',
    label: 'Thời gian đến trường: −10 phút',
    bin: 'loai',
    why: 'Thời gian không thể là số âm.',
  },
  {
    id: 'diem-8',
    label: 'Điểm Toán: 8',
    bin: 'so-lieu',
    why: 'Là số và nằm trong thang điểm từ 0 đến 10.',
  },
  {
    id: 'diem-12',
    label: 'Điểm Toán: 12',
    bin: 'loai',
    why: 'Thang điểm 10 không có điểm 12.',
  },
];
