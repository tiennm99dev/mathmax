/**
 * Strings for the shared lesson and hub components. Subject-specific chrome
 * (site name, grade, strand and kind labels) lives in `#lib/i18n/site.vi.js`.
 */

export const nav = {
  home: 'Trang chủ',
  skip: 'Bỏ qua đến nội dung',
  breadcrumbs: 'Đường dẫn',
  main: 'Điều hướng chính',
  prevNext: 'Bài trước và bài sau',
  prev: 'Bài trước',
  next: 'Bài sau',
  source: 'Mã nguồn',
};

export const lesson = {
  objectives: 'Em sẽ học được',
  explore: 'Khám phá',
  examples: 'Ví dụ',
  example: 'Ví dụ',
  practice: 'Luyện tập',
  takeaways: 'Ghi nhớ',
  project: 'Dự án',
};

export const callout = {
  definition: 'Định nghĩa',
  theorem: 'Định lí',
  note: 'Ghi chú',
  warning: 'Lưu ý',
};

export const steps = {
  problem: 'Đề bài',
  step: 'Bước',
  answer: 'Đáp số',
  prev: 'Bước trước',
  next: 'Bước tiếp',
  all: 'Hiện tất cả',
  restart: 'Làm lại',
  /** @param {number} shown @param {number} total */
  progress: (shown, total) => `Đã hiện ${shown}/${total} bước`,
};

export const hints = {
  /** @param {number} next @param {number} total */
  show: (next, total) => `Gợi ý ${next}/${total}`,
  title: 'Gợi ý',
  solution: 'Xem lời giải',
  solutionTitle: 'Lời giải',
};

export const practice = {
  check: 'Kiểm tra',
  retry: 'Làm lại',
  /** @param {number} done @param {number} total */
  progress: (done, total) => `Đã làm ${done}/${total} bài`,
  done: 'Đã làm',
  /** @param {number} n */
  exercise: (n) => `Bài ${n}`,
  numberPlaceholder: 'Nhập số',
  fractionPlaceholder: 'Ví dụ: 3/4',
  textPlaceholder: 'Nhập câu trả lời',
  unit: 'Đơn vị',
  moveUp: 'Đưa lên',
  moveDown: 'Đưa xuống',
  /** @param {number} n */
  position: (n) => `Vị trí ${n}`,
  matchLeft: 'Chọn một mục bên trái, rồi chọn mục ghép với nó bên phải.',
  /** @param {number} n */
  pairLabel: (n) => `Cặp ${n}`,
  unpair: 'Bỏ ghép',
  /** @param {number} n @param {string} noun */
  countLabel: (n, noun) => `${n} ${noun}`,
  countCards: 'Chọn số',
  feedback: {
    correct: 'Đúng rồi!',
    wrong: 'Chưa đúng, thử lại nhé.',
    empty: 'Em hãy trả lời trước khi kiểm tra.',
    incomplete: 'Em chưa trả lời hết các phần.',
    invalid: 'Chưa đọc được câu trả lời. Kiểm tra lại cách viết nhé.',
    unit: 'Giá trị đúng nhưng đơn vị chưa đúng.',
    'not-simplest': 'Bằng đáp số, nhưng em hãy rút gọn phân số.',
  },
};

export const readAloud = {
  listen: 'Nghe',
  stop: 'Dừng',
  /** @param {string} what */
  label: (what) => `Nghe đọc: ${what}`,
  /** One card of a section that spans several cards, so each button has its own name. @param {string} what @param {number} n @param {number} total */
  part: (what, n, total) => `${what}, phần ${n}/${total}`,
};

export const hub = {
  comingSoon: 'Sắp ra mắt',
  live: 'Đã có',
  /** @param {number} live @param {number} total */
  lessonCount: (live, total) => `${live}/${total} bài đã có`,
  chapters: 'Các chương',
  lessons: 'Các bài',
  willHave: 'Bài này sẽ có',
  preview: 'Phần tương tác dự kiến',
  stubNote: 'Bài này đang được soạn. Em có thể xem các bài khác trong chương.',
  backToChapter: 'Về chương',
};

export const moved = {
  title: 'Bài học đã chuyển',
  body: 'Bài này nay nằm trong chương trình theo lớp. Nếu trang không tự chuyển, hãy bấm vào liên kết dưới đây.',
  link: 'Đến bài học',
};
