/**
 * Data for the two widgets of the lesson: the deck of data cards to sort into
 * the three kinds of data, and a made-up school of 400 students whose
 * favourite sport is surveyed with different sampling plans, so a learner can
 * compare each sample with the whole school.
 */

import { rng, shuffle } from '#lib/core/drill.js';
import { percentages } from '#lib/stats-engine/frequency.js';

/** @type {import('#lib/core/card-sorter.js').SortBin[]} */
export const BINS = [
  { id: 'so-lieu', label: 'Số liệu' },
  { id: 'thu-tu', label: 'Không phải số, sắp thứ tự được' },
  { id: 'khong-thu-tu', label: 'Không phải số, không sắp thứ tự được' },
];

/** @type {import('#lib/core/card-sorter.js').SortCard[]} */
export const CARDS = [
  {
    id: 'chieu-cao',
    label: 'Chiều cao (cm) của các bạn trong tổ',
    bin: 'so-lieu',
    why: 'Chiều cao được đo và ghi bằng số.',
  },
  {
    id: 'gio-tivi',
    label: 'Số giờ xem ti vi mỗi ngày',
    bin: 'so-lieu',
    why: 'Thời gian được ghi bằng số giờ.',
  },
  {
    id: 'nhiet-do',
    label: 'Nhiệt độ cao nhất trong ngày (°C)',
    bin: 'so-lieu',
    why: 'Nhiệt độ là một số đo.',
  },
  {
    id: 'anh-chi-em',
    label: 'Số anh chị em ruột của mỗi bạn',
    bin: 'so-lieu',
    why: 'Đó là kết quả của phép đếm, nên là số.',
  },
  {
    id: 'muc-do-thich',
    label: 'Mức độ yêu thích môn Toán: rất thích, thích, bình thường, không thích',
    bin: 'thu-tu',
    why: 'Các mức này viết bằng chữ nhưng xếp được từ thích nhiều đến thích ít.',
  },
  {
    id: 'hoc-luc',
    label: 'Kết quả học tập: Tốt, Khá, Đạt, Chưa đạt',
    bin: 'thu-tu',
    why: 'Các mức xếp loại không phải là số nhưng có thứ tự từ cao xuống thấp.',
  },
  {
    id: 'dong-y',
    label: 'Ý kiến: rất đồng ý, đồng ý, không đồng ý, rất không đồng ý',
    bin: 'thu-tu',
    why: 'Các mức đồng ý xếp được theo thứ tự từ đồng ý nhiều nhất đến ít nhất.',
  },
  {
    id: 'co-ao',
    label: 'Cỡ áo đồng phục: S, M, L, XL',
    bin: 'thu-tu',
    why: 'Cỡ áo là chữ cái nhưng xếp được từ nhỏ đến lớn.',
  },
  {
    id: 'the-thao',
    label: 'Môn thể thao yêu thích',
    bin: 'khong-thu-tu',
    why: 'Tên các môn thể thao không phải là số và không có môn nào đứng trước môn nào.',
  },
  {
    id: 'que-quan',
    label: 'Tỉnh, thành phố nơi em sinh ra',
    bin: 'khong-thu-tu',
    why: 'Tên tỉnh, thành phố không phải là số và không sắp được theo thứ tự hơn kém.',
  },
  {
    id: 'mau-sac',
    label: 'Màu sắc yêu thích',
    bin: 'khong-thu-tu',
    why: 'Các màu không phải là số và không có thứ tự hơn kém.',
  },
  {
    id: 'ca-si',
    label: 'Ca sĩ Việt Nam em thích nhất',
    bin: 'khong-thu-tu',
    why: 'Tên ca sĩ là chữ và không sắp được theo thứ tự hơn kém.',
  },
];

/** The sports on the survey form, in display order. */
export const SPORTS = ['Bóng đá', 'Cầu lông', 'Bơi lội', 'Cờ vua'];

/** Every grade has four classes, A to D, of 25 students each. */
const CLASSES = ['A', 'B', 'C', 'D'];

/**
 * How many students of each grade like each sport, in `SPORTS` order. Each
 * row adds up to 100 = 4 classes of 25.
 */
const LIKES = {
  6: [40, 15, 30, 15],
  7: [30, 25, 30, 15],
  8: [20, 35, 25, 20],
  9: [14, 45, 15, 26],
};

/** Football club members per grade, and how many of them like football best. */
const CLUB_PER_GRADE = 8;
const CLUB_FOOTBALL_FANS = 7;

/**
 * @typedef {{ id: number, grade: number, cls: string, sport: number, club: boolean }} Student
 * `sport` indexes `SPORTS`; `cls` is the class name such as '7B'.
 */

/** @returns {Student[]} */
function buildSchool() {
  /** @type {Student[]} */
  const out = [];
  for (const [g, likes] of Object.entries(LIKES)) {
    const grade = Number(g);
    // Students sorted by sport, dealt to the four classes in turn, so every
    // class shares its grade's tastes.
    const order = likes.flatMap((n, sport) => Array.from({ length: n }, () => sport));
    let fans = 0;
    let others = 0;
    order.forEach((sport, k) => {
      let club = false;
      if (sport === 0 && fans < CLUB_FOOTBALL_FANS) {
        club = true;
        fans += 1;
      } else if (sport === 1 && others < CLUB_PER_GRADE - CLUB_FOOTBALL_FANS) {
        club = true;
        others += 1;
      }
      out.push({
        id: out.length,
        grade,
        cls: `${grade}${CLASSES[k % CLASSES.length]}`,
        sport,
        club,
      });
    });
  }
  return out;
}

/** The whole school: 400 students in grades 6 to 9. */
export const SCHOOL = buildSchool();

/**
 * @typedef {object} Plan
 * @property {string} id
 * @property {string} label short button text
 * @property {string} detail what the plan does
 * @property {boolean} random whether a new survey gives a new sample
 * @property {boolean} representative
 * @property {string} why the verdict shown after the survey
 */

/** @type {Plan[]} */
export const PLANS = [
  {
    id: 'clb',
    label: 'Hỏi câu lạc bộ bóng đá',
    detail: 'Hỏi tất cả 32 thành viên câu lạc bộ bóng đá của trường.',
    random: false,
    representative: false,
    why: 'Không đại diện: các bạn trong câu lạc bộ bóng đá phần lớn đều mê bóng đá, nên tỉ lệ thích bóng đá cao hơn hẳn toàn trường.',
  },
  {
    id: 'lop',
    label: 'Hỏi lớp 9A',
    detail: 'Hỏi cả 25 bạn của lớp 9A.',
    random: false,
    representative: false,
    why: 'Không đại diện: chỉ hỏi một lớp của khối 9, trong khi sở thích của các khối khác nhau.',
  },
  {
    id: 'it-ban',
    label: 'Hỏi 6 bạn bất kì',
    detail: 'Hỏi 6 bạn gặp ngẫu nhiên ở sân trường.',
    random: true,
    representative: false,
    why: 'Không đại diện: số bạn được hỏi quá ít, mỗi lần khảo sát lại cho kết quả khác hẳn.',
  },
  {
    id: 'moi-lop',
    label: 'Mỗi lớp chọn 4 bạn',
    detail: 'Mỗi lớp trong 16 lớp chọn ngẫu nhiên 4 bạn, tất cả 64 bạn.',
    random: true,
    representative: true,
    why: 'Có tính đại diện: mọi lớp, mọi khối đều có bạn được hỏi, các bạn được chọn ngẫu nhiên và đủ nhiều, nên tỉ lệ gần với toàn trường.',
  },
];

/**
 * The students a plan surveys. Random plans depend on `seed`.
 * @param {string} planId
 * @param {number} seed
 * @returns {Student[]}
 */
export function surveyed(planId, seed) {
  const rand = rng(seed);
  if (planId === 'clb') return SCHOOL.filter((s) => s.club);
  if (planId === 'lop') return SCHOOL.filter((s) => s.cls === '9A');
  if (planId === 'it-ban') return shuffle(rand, SCHOOL).slice(0, 6);
  if (planId === 'moi-lop') {
    const names = [...new Set(SCHOOL.map((s) => s.cls))];
    return names.flatMap((c) =>
      shuffle(
        rand,
        SCHOOL.filter((s) => s.cls === c),
      ).slice(0, 4),
    );
  }
  throw new Error(`unknown plan ${planId}`);
}

/**
 * How many students choose each sport, in `SPORTS` order.
 * @param {readonly Student[]} students
 * @returns {number[]}
 */
export function tally(students) {
  const counts = SPORTS.map(() => 0);
  for (const s of students) counts[s.sport] += 1;
  return counts;
}

/** Whole-school percentages per sport (they add up to 100). */
export const SCHOOL_PERCENT = percentages(tally(SCHOOL));

/**
 * Percentages of a sample, with the largest gap (in percentage points) from
 * the whole school.
 * @param {readonly Student[]} students
 */
export function compare(students) {
  const percent = percentages(tally(students));
  const gap = Math.max(...percent.map((p, i) => Math.abs(p - SCHOOL_PERCENT[i])));
  return { percent, gap };
}
