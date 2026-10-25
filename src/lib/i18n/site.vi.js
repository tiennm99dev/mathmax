export const site = {
  title: 'MathMax',
  repo: 'https://github.com/tiennm99dev/mathmax',
  tagline: 'Toán tương tác cho học sinh lớp 1-12',
  description:
    'MathMax giúp học sinh lớp 1-12 học toán theo sách Kết nối tri thức với cuộc sống qua tương tác: kéo, thử nghiệm và minh hoạ trực quan.',
};

export const home = {
  gradesTitle: 'Chọn lớp',
  strandsTitle: 'Học theo mạch kiến thức',
  /** @param {number} chapters @param {number} lessons */
  gradeSummary: (chapters, lessons) => `${chapters} chương · ${lessons} bài`,
};

/** School levels on the home page, each with its grade range. */
export const levels = [
  { title: 'Tiểu học', from: 1, to: 5 },
  { title: 'Trung học cơ sở', from: 6, to: 9 },
  { title: 'Trung học phổ thông', from: 10, to: 12 },
];

/** @type {Record<string, string>} */
export const grades = Object.fromEntries(
  Array.from({ length: 12 }, (_, i) => [`lop-${i + 1}`, `Lớp ${i + 1}`]),
);

/** @type {Record<import('#lib/curriculum/index.js').LessonKind, string>} */
export const kinds = {
  theory: 'Lý thuyết',
  practice: 'Luyện tập',
  review: 'Ôn tập',
  activity: 'Hoạt động',
  'chuyen-de': 'Chuyên đề',
};

/**
 * Strand hubs across grades, keyed by the curriculum `strand` slug.
 * @type {Record<string, { title: string, blurb: string }>}
 */
export const strands = {
  'so-hoc': {
    title: 'Số học',
    blurb: 'Số tự nhiên, phân số, số thập phân, số nguyên và phép tính.',
  },
  'dai-so': { title: 'Đại số', blurb: 'Biểu thức, phương trình, bất phương trình và hàm số.' },
  'hinh-hoc': { title: 'Hình học', blurb: 'Hình phẳng, hình khối, tam giác, đường tròn và vectơ.' },
  'do-luong': { title: 'Đo lường', blurb: 'Độ dài, khối lượng, thời gian, tiền và diện tích.' },
  'thong-ke-xac-suat': {
    title: 'Thống kê và xác suất',
    blurb: 'Thu thập, biểu diễn dữ liệu và tính khả năng xảy ra.',
  },
  'giai-tich': { title: 'Giải tích', blurb: 'Dãy số, giới hạn, đạo hàm và tích phân.' },
  'roi-rac': { title: 'Toán rời rạc', blurb: 'Đếm, tổ hợp và đồ thị.' },
  'tai-chinh': {
    title: 'Toán tài chính',
    blurb: 'Lãi suất, tiết kiệm và tính toán trong đời sống.',
  },
  'on-tap': { title: 'Ôn tập', blurb: 'Các chương ôn tập tổng hợp theo từng lớp.' },
  'hoat-dong': {
    title: 'Hoạt động trải nghiệm',
    blurb: 'Hoạt động thực hành và trải nghiệm toán học.',
  },
};
