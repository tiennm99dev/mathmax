export const site = {
  title: 'MathMax',
  repo: 'https://github.com/tiennm99dev/mathmax',
  tagline: 'Toán tương tác cho học sinh THCS',
  description:
    'MathMax giúp học sinh THCS lớp 6-9 học toán qua tương tác — Số học, Đại số, Hình học bằng cách kéo, thử nghiệm, và minh hoạ trực quan.',
};

export const hub = {
  scopeLabel: 'Phạm vi',
  topicsTitle: 'Chủ đề',
};

export const status = {
  comingSoon: 'Sắp ra mắt',
  live: 'Khám phá',
};

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

export const topics = {
  'so-hoc': {
    title: 'Số học',
    blurb: 'Phép tính, ước-bội, phân số, số nguyên. Trực quan hoá thuật toán và quy luật.',
    status: 'live',
    href: 'so-hoc/',
  },
  'dai-so': {
    title: 'Đại số',
    blurb: 'Biểu thức, phương trình, hàm số. Thao tác kéo-thả các đối tượng đại số.',
    status: 'live',
    href: 'dai-so/',
  },
  'hinh-hoc': {
    title: 'Hình học',
    blurb: 'Tam giác, tứ giác, đường tròn. Kéo điểm, định lý sống động.',
    status: 'live',
    href: 'hinh-hoc/',
  },
};

export const lessonChrome = {
  backToTopic: '← Về danh sách bài',
  backToHub: '← Về trang chủ',
  theoremTitle: 'Định lý',
  exampleTitle: 'Ví dụ',
  instructionAria: 'Dùng phím mũi tên hoặc kéo điểm bằng chuột/cảm ứng',
};
