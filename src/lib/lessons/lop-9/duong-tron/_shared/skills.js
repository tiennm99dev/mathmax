/**
 * Question generators for the chapter "Đường tròn", for the drill board of
 * its practice and review lessons. Answers are whole numbers (degrees,
 * counts), exact decimals (a radius 6,5 cm) or values with π rounded to
 * hundredths. A rounded answer is built as an integer over 100, so it is the
 * very same double that `readNumber` gives for its digits; values that sit
 * too close to a rounding boundary are drawn again, so a calculator never
 * disagrees with the key. Prompts and steps are plain text with the book's
 * decimal comma.
 */

import { int, pick } from '#lib/core/drill.js';
import { numberText } from '#lib/core/decimal.js';
import { formatFixed } from '#lib/core/number-format.js';
import { piText } from './pi-text.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {ReturnType<Skill['make']>} Made */

/** A number as the book writes it in plain text: '6,5', '7'. */
const t = (/** @type {number} */ v) => numberText(v);

/**
 * `value` rounded to `places` decimals as an exact-as-typed double, or null
 * when it lies within 1 % of a unit of the last place from a rounding
 * boundary.
 * @param {number} value
 * @param {number} places
 */
export function rounded(value, places) {
  const scaled = value * 10 ** places;
  const frac = scaled - Math.floor(scaled);
  if (Math.abs(frac - 0.5) < 0.01) return null;
  return Math.round(scaled) / 10 ** places;
}

/** A value rounded to hundredths with both places shown: '37,70'. */
const hundredths = (/** @type {number} */ v) => formatFixed(v, 2);

/**
 * Retries `make` until it returns a question (it returns null on a value too
 * close to a rounding boundary).
 * @param {() => Made | null} make
 * @returns {Made}
 */
function retry(make) {
  for (;;) {
    const q = make();
    if (q) return q;
  }
}

/** Pythagorean triples (leg, leg, hypotenuse). */
export const TRIPLES = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20],
  [7, 24, 25],
];

const NAMES = ['A', 'B', 'C', 'D', 'E'];

/** How each position against a circle is said. */
const POSITION = /** @type {const} */ ({
  trong: 'nằm bên trong',
  tren: 'nằm trên',
  ngoai: 'nằm bên ngoài',
});

/** @type {Skill} */
export const viTriDiem = {
  id: 'vi-tri-diem',
  label: 'Bài 13. Mở đầu về đường tròn',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      const [a, b, c] = pick(rand, TRIPLES);
      return {
        prompt: `Hình chữ nhật ABCD có AB = ${a} cm, BC = ${b} cm. Bốn đỉnh của nó cùng nằm trên một đường tròn. Tính bán kính của đường tròn đó (cm).`,
        answer: c / 2,
        unit: 'cm',
        steps: [
          'Gọi O là giao điểm hai đường chéo: OA = OB = OC = OD = AC/2, nên O là tâm và AC/2 là bán kính.',
          `AC² = AB² + BC² = ${a * a} + ${b * b} = ${c * c}, nên AC = ${c} cm.`,
          `Bán kính R = ${c} : 2 = ${t(c / 2)} cm.`,
        ],
        hints: [
          'Hai đường chéo của hình chữ nhật bằng nhau và cắt nhau tại trung điểm mỗi đường.',
          'Bán kính bằng nửa đường chéo; tính đường chéo bằng định lí Pythagore.',
        ],
      };
    }
    if (variant === 1) {
      const [a, b, c] = pick(rand, TRIPLES);
      return {
        prompt: `Tam giác DEF vuông tại D có DE = ${a} cm, DF = ${b} cm. Ba đỉnh D, E, F cùng nằm trên một đường tròn. Tính bán kính của đường tròn đó (cm).`,
        answer: c / 2,
        unit: 'cm',
        steps: [
          `EF² = DE² + DF² = ${a * a} + ${b * b} = ${c * c}, nên EF = ${c} cm.`,
          'Trung điểm I của cạnh huyền EF cách đều ba đỉnh (trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền).',
          `Bán kính R = EF/2 = ${t(c / 2)} cm.`,
        ],
        hints: [
          'Tâm đường tròn đi qua ba đỉnh của tam giác vuông là trung điểm cạnh huyền.',
          'Tính cạnh huyền EF rồi lấy một nửa.',
        ],
      };
    }
    if (variant === 2) {
      const r = int(rand, 3, 9);
      const shifts = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
      const dists = NAMES.map(() => r + pick(rand, shifts));
      const kind = pick(rand, /** @type {const} */ (['trong', 'tren', 'ngoai']));
      const of = (/** @type {number} */ d) => (d < r ? 'trong' : d > r ? 'ngoai' : 'tren');
      const count = dists.filter((d) => of(d) === kind).length;
      const listed = dists.map((d, i) => `O${NAMES[i]} = ${t(d)}`).join(', ');
      return {
        prompt: `Cho đường tròn (O; ${r} cm) và năm điểm A, B, C, D, E với ${listed} (cm). Có bao nhiêu điểm ${POSITION[kind]} đường tròn?`,
        answer: count,
        steps: [
          `So sánh từng khoảng cách với R = ${r}: nhỏ hơn R thì nằm trong, bằng R thì nằm trên, lớn hơn R thì nằm ngoài.`,
          dists
            .map((d, i) => `${NAMES[i]} ${POSITION[of(d)]}`)
            .join('; ')
            .concat('.'),
          `Vậy có ${count} điểm ${POSITION[kind]} đường tròn.`,
        ],
        hints: [
          `M nằm trên đường tròn khi OM = R, nằm trong khi OM < R, nằm ngoài khi OM > R; ở đây R = ${r} cm.`,
        ],
      };
    }
    const oa = int(rand, 8, 20);
    const ab = int(rand, 1, oa - 3);
    return {
      prompt: `Điểm A nằm ngoài đường tròn (O; R), OA = ${oa} cm. Đoạn thẳng OA cắt đường tròn tại B, AB = ${ab} cm. Tính R (cm).`,
      answer: oa - ab,
      unit: 'cm',
      steps: [
        'B thuộc đường tròn nên OB = R, và B nằm giữa O và A.',
        `R = OB = OA − AB = ${oa} − ${ab} = ${oa - ab} cm.`,
      ],
      hints: ['B nằm trên đường tròn nên OB = R; B nằm giữa O và A nên OB + BA = OA.'],
    };
  },
};

/** @type {Skill} */
export const cungDay = {
  id: 'cung-day',
  label: 'Bài 14. Cung và dây của một đường tròn',
  make(rand) {
    const variant = int(rand, 0, 4);
    if (variant === 0) {
      const a = int(rand, 20, 170);
      return {
        prompt: `Góc ở tâm AOB bằng ${a}°. Tính số đo cung lớn AB (độ).`,
        answer: 360 - a,
        unit: '°',
        steps: [
          `Cung nhỏ AB bị chắn bởi góc ở tâm AOB nên có số đo ${a}°.`,
          `Số đo cung lớn AB = 360° − ${a}° = ${360 - a}°.`,
        ],
        hints: [
          'Cung nhỏ có số đo bằng góc ở tâm chắn nó; cung lớn và cung nhỏ chung hai mút có tổng 360°.',
        ],
      };
    }
    if (variant === 1) {
      const b = int(rand, 190, 340);
      return {
        prompt: `Cung lớn AB của đường tròn (O) có số đo ${b}°. Tính số đo góc AOB (độ).`,
        answer: 360 - b,
        unit: '°',
        steps: [
          `Cung nhỏ AB có số đo 360° − ${b}° = ${360 - b}°.`,
          `Góc ở tâm AOB chắn cung nhỏ AB nên AOB = ${360 - b}°.`,
        ],
        hints: ['Góc ở tâm AOB chắn cung nhỏ AB, không phải cung lớn.'],
      };
    }
    if (variant === 2) {
      // At 6 o'clock the hands split the dial into two half circles, so
      // there is no minor arc to ask about.
      const h = pick(rand, [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]);
      const parts = Math.min(h, 12 - h);
      return {
        prompt: `Lúc ${h} giờ đúng, tính số đo cung nhỏ có hai mút là hai đầu kim đồng hồ (coi hai kim dài bằng nhau, đơn vị độ).`,
        answer: parts * 30,
        unit: '°',
        steps: [
          'Mặt đồng hồ chia thành 12 phần bằng nhau, mỗi phần ứng với cung 360° : 12 = 30°.',
          `Kim phút chỉ số 12, kim giờ chỉ số ${h}: hai kim cách nhau ${parts} phần (theo phía gần hơn).`,
          `Cung nhỏ có số đo ${parts} · 30° = ${parts * 30}°.`,
        ],
        hints: ['Hai số liền nhau trên mặt đồng hồ ứng với cung 30°.'],
      };
    }
    if (variant === 3) {
      const x = int(rand, 15, 80);
      const y = int(rand, 15, 90);
      return {
        prompt: `Điểm C nằm trên cung nhỏ AB của đường tròn (O), số đo cung AC là ${x}°, số đo cung CB là ${y}°. Tính số đo góc AOB (độ).`,
        answer: x + y,
        unit: '°',
        steps: [
          `C nằm trên cung AB nên sđ cung AB = sđ cung AC + sđ cung CB = ${x}° + ${y}° = ${x + y}°.`,
          `Đây là cung nhỏ AB nên góc AOB = ${x + y}°.`,
        ],
        hints: ['C nằm trên cung AB thì số đo cung AB bằng tổng số đo hai cung AC và CB.'],
      };
    }
    const [p, q, c] = pick(rand, TRIPLES);
    const [halfChord, dist] = rand() < 0.5 ? [p, q] : [q, p];
    if (rand() < 0.5) {
      return {
        prompt: `Đường tròn (O; ${c} cm) có dây AB = ${2 * halfChord} cm. Tính khoảng cách từ tâm O đến dây AB (cm).`,
        answer: dist,
        unit: 'cm',
        steps: [
          'Gọi H là trung điểm của AB. Tam giác OAB cân tại O nên OH ⊥ AB, và OH là khoảng cách cần tìm.',
          `AH = ${2 * halfChord} : 2 = ${halfChord} cm.`,
          `OH² = OA² − AH² = ${c * c} − ${halfChord * halfChord} = ${dist * dist}, nên OH = ${dist} cm.`,
        ],
        hints: [
          'Trung tuyến OH của tam giác cân OAB cũng là đường cao.',
          'Dùng định lí Pythagore trong tam giác vuông OHA.',
        ],
      };
    }
    return {
      prompt: `Đường tròn (O; ${c} cm) có dây AB cách tâm O một khoảng ${dist} cm. Tính độ dài dây AB (cm).`,
      answer: 2 * halfChord,
      unit: 'cm',
      steps: [
        'Gọi H là chân đường vuông góc từ O đến AB. Tam giác OAB cân tại O nên H là trung điểm của AB.',
        `AH² = OA² − OH² = ${c * c} − ${dist * dist} = ${halfChord * halfChord}, nên AH = ${halfChord} cm.`,
        `AB = 2 · AH = ${2 * halfChord} cm.`,
      ],
      hints: [
        'Đường cao OH của tam giác cân OAB cũng là trung tuyến.',
        'Tính AH bằng định lí Pythagore rồi nhân đôi.',
      ],
    };
  },
};

/** Arc measures whose length πRn/180 stays a tidy multiple of π. */
const NICE_DEGREES = [30, 36, 45, 60, 72, 90, 120, 135, 150, 180, 240, 270];

/** @type {Skill} */
export const doDaiCung = {
  id: 'do-dai-cung',
  label: 'Bài 15. Độ dài cung tròn',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      return retry(() => {
        const r = int(rand, 2, 15);
        const n = 5 * int(rand, 2, 70);
        const value = (Math.PI * r * n) / 180;
        const answer = rounded(value, 2);
        if (answer === null) return null;
        return {
          prompt: `Tính độ dài cung ${n}° của đường tròn bán kính ${r} cm (làm tròn đến hàng phần trăm).`,
          answer,
          unit: 'cm',
          steps: [
            'Độ dài cung n° của đường tròn bán kính R là l = πRn/180.',
            `l = π · ${r} · ${n}/180 = ${piText((r * n) / 180)} ≈ ${hundredths(answer)} cm.`,
          ],
          hints: ['Dùng l = πRn/180; giữ π đến bước cuối rồi mới làm tròn.'],
        };
      });
    }
    const n = pick(rand, NICE_DEGREES);
    const r = int(rand, 2, 12);
    const k = (r * n) / 180;
    if (variant === 1) {
      return {
        prompt: `Một cung ${n}° có độ dài ${piText(k)} cm. Tính bán kính của đường tròn (cm).`,
        answer: r,
        unit: 'cm',
        steps: [
          `l = πR · ${n}/180 = ${piText(n / 180)} · R.`,
          `Từ ${piText(n / 180)} · R = ${piText(k)} suy ra R = ${t(k)} : ${t(n / 180)} = ${r} cm.`,
        ],
        hints: [`Thay n = ${n} vào l = πRn/180 rồi giải tìm R.`],
      };
    }
    return {
      prompt: `Trên đường tròn bán kính ${r} cm, một cung có độ dài ${piText(k)} cm. Tính số đo của cung đó (độ).`,
      answer: n,
      unit: '°',
      steps: [
        `l = π · ${r} · n/180, nên π · ${r} · n/180 = ${piText(k)}.`,
        `n = ${t(k)} · 180 : ${r} = ${n}. Cung có số đo ${n}°.`,
      ],
      hints: ['Viết l = πRn/180 với R đã biết, rồi giải tìm n.'],
    };
  },
};

/** @type {Skill} */
export const dienTich = {
  id: 'dien-tich',
  label: 'Bài 15. Hình quạt tròn và hình vành khuyên',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      return retry(() => {
        const r = int(rand, 2, 12);
        const n = 5 * int(rand, 2, 70);
        const value = (Math.PI * r * r * n) / 360;
        const answer = rounded(value, 2);
        if (answer === null) return null;
        return {
          prompt: `Tính diện tích hình quạt tròn bán kính ${r} cm, cung ${n}° (làm tròn đến hàng phần trăm, đơn vị cm²).`,
          answer,
          unit: 'cm²',
          steps: [
            'Diện tích hình quạt tròn bán kính R, cung n° là S = πR²n/360.',
            `S = π · ${r}² · ${n}/360 = ${piText((r * r * n) / 360)} ≈ ${hundredths(answer)} cm².`,
          ],
          hints: ['Dùng S = πR²n/360; nhớ bình phương bán kính.'],
        };
      });
    }
    if (variant === 1) {
      return retry(() => {
        const big = int(rand, 3, 12);
        const small = int(rand, 1, big - 1);
        const k = big * big - small * small;
        const answer = rounded(Math.PI * k, 2);
        if (answer === null) return null;
        return {
          prompt: `Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính ${big} cm và ${small} cm (làm tròn đến hàng phần trăm, đơn vị cm²).`,
          answer,
          unit: 'cm²',
          steps: [
            'Diện tích hình vành khuyên là S = π(R² − r²), với R là bán kính lớn.',
            `S = π(${big * big} − ${small * small}) = ${piText(k)} ≈ ${hundredths(answer)} cm².`,
          ],
          hints: ['Lấy diện tích hình tròn lớn trừ diện tích hình tròn nhỏ: S = π(R² − r²).'],
        };
      });
    }
    const l = int(rand, 2, 20);
    const r = int(rand, 2, 15);
    return {
      prompt: `Một hình quạt tròn bán kính ${r} cm có độ dài cung ${l} cm. Tính diện tích hình quạt (cm²).`,
      answer: (l * r) / 2,
      unit: 'cm²',
      steps: [
        'Diện tích hình quạt bằng nửa tích độ dài cung với bán kính: S = lR/2.',
        `S = ${l} · ${r} : 2 = ${t((l * r) / 2)} cm².`,
      ],
      hints: ['Không cần tìm số đo cung: dùng S = lR/2.'],
    };
  },
};

/** The drill of "Luyện tập chung trang 96". */
export const SKILLS_TRANG_96 = [viTriDiem, cungDay, doDaiCung, dienTich];
