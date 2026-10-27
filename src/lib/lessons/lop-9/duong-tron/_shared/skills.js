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

/** @type {Skill} */
export const duongThang = {
  id: 'duong-thang',
  label: 'Bài 16. Đường thẳng và đường tròn',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const r = int(rand, 3, 12);
      const d = r + pick(rand, [-2, -1.5, -1, -0.5, 0, 0, 0.5, 1, 1.5, 2]);
      const count = d < r ? 2 : d === r ? 1 : 0;
      const verdict =
        d < r
          ? 'd < R nên a cắt đường tròn'
          : d === r
            ? 'd = R nên a tiếp xúc với đường tròn'
            : 'd > R nên a và đường tròn không giao nhau';
      return {
        prompt: `Đường thẳng a cách tâm O của đường tròn (O; ${r} cm) một khoảng d = ${t(d)} cm. Đường thẳng a và đường tròn có bao nhiêu điểm chung?`,
        answer: count,
        steps: [
          `So sánh d = ${t(d)} cm với R = ${r} cm: ${verdict}.`,
          `Vậy chúng có ${count} điểm chung.`,
        ],
        hints: [
          'd < R: cắt nhau (2 điểm chung); d = R: tiếp xúc (1 điểm); d > R: không giao nhau.',
        ],
      };
    }
    const [p, q, c] = pick(rand, TRIPLES);
    const [d, half] = rand() < 0.5 ? [p, q] : [q, p];
    if (variant === 1) {
      return {
        prompt: `Đường thẳng a cách tâm O của đường tròn (O; ${c} cm) một khoảng ${d} cm và cắt đường tròn tại hai điểm A, B. Tính độ dài AB (cm).`,
        answer: 2 * half,
        unit: 'cm',
        steps: [
          'Gọi H là chân đường vuông góc từ O đến a; tam giác OAB cân tại O nên H là trung điểm của AB.',
          `AH² = OA² − OH² = ${c * c} − ${d * d} = ${half * half}, nên AH = ${half} cm.`,
          `AB = 2 · AH = ${2 * half} cm.`,
        ],
        hints: [
          'Đường vuông góc OH chia đôi dây AB.',
          'Tính AH trong tam giác vuông OHA rồi nhân đôi.',
        ],
      };
    }
    return {
      prompt: `Cho đường tròn (O; ${d} cm), điểm A thuộc đường tròn và đường thẳng a vuông góc với OA tại A. Lấy điểm M trên a với MA = ${half} cm. Tính OM (cm).`,
      answer: c,
      unit: 'cm',
      steps: [
        'a đi qua A thuộc đường tròn và vuông góc với bán kính OA nên a là tiếp tuyến tại A; tam giác OAM vuông tại A.',
        `OM² = OA² + MA² = ${d * d} + ${half * half} = ${c * c}, nên OM = ${c} cm.`,
      ],
      hints: [
        'Tiếp tuyến vuông góc với bán kính tại tiếp điểm: dùng định lí Pythagore trong tam giác OAM.',
      ],
    };
  },
};

/** @type {Skill} */
export const tiepTuyen = {
  id: 'tiep-tuyen',
  label: 'Bài 16. Hai tiếp tuyến cắt nhau',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      const [p, q, c] = pick(rand, TRIPLES);
      const [r, m] = rand() < 0.5 ? [p, q] : [q, p];
      return {
        prompt: `Từ điểm M nằm ngoài đường tròn (O; ${r} cm) với OM = ${c} cm, kẻ hai tiếp tuyến MA, MB (A, B là tiếp điểm). Tính MA (cm).`,
        answer: m,
        unit: 'cm',
        steps: [
          'MA là tiếp tuyến tại A nên MA ⊥ OA: tam giác OAM vuông tại A.',
          `MA² = OM² − OA² = ${c * c} − ${r * r} = ${m * m}, nên MA = ${m} cm (và MB = MA).`,
        ],
        hints: ['Tiếp tuyến vuông góc với bán kính đi qua tiếp điểm.', 'MA² = OM² − R².'],
      };
    }
    if (variant === 1) {
      const x = 2 * int(rand, 10, 80);
      return {
        prompt: `Từ điểm M nằm ngoài đường tròn (O), kẻ hai tiếp tuyến MA, MB (A, B là tiếp điểm) với góc AMB = ${x}°. Tính số đo góc AOB (độ).`,
        answer: 180 - x,
        unit: '°',
        steps: [
          'Tứ giác OAMB có góc OAM = góc OBM = 90° (tiếp tuyến vuông góc với bán kính).',
          `Góc AOB = 360° − 90° − 90° − ${x}° = ${180 - x}°.`,
        ],
        hints: ['Tổng bốn góc của tứ giác OAMB bằng 360°, trong đó có hai góc vuông.'],
      };
    }
    if (variant === 2) {
      const y = 2 * int(rand, 10, 80);
      return {
        prompt: `Từ điểm M nằm ngoài đường tròn (O), kẻ hai tiếp tuyến MA, MB (A, B là tiếp điểm) với góc AOB = ${y}°. Tính số đo góc AMO (độ).`,
        answer: (180 - y) / 2,
        unit: '°',
        steps: [
          `Tứ giác OAMB có hai góc vuông tại A, B nên góc AMB = 180° − ${y}° = ${180 - y}°.`,
          `MO là tia phân giác của góc AMB, nên góc AMO = ${180 - y}° : 2 = ${(180 - y) / 2}°.`,
        ],
        hints: [
          'Góc AMB và góc AOB có tổng 180°.',
          'Tia MO là tia phân giác của góc tạo bởi hai tiếp tuyến.',
        ],
      };
    }
    const r = int(rand, 2, 15);
    return {
      prompt: `Từ điểm M nằm ngoài đường tròn (O; ${r} cm), kẻ hai tiếp tuyến MA, MB (A, B là tiếp điểm) với góc AMB = 60°. Tính OM (cm).`,
      answer: 2 * r,
      unit: 'cm',
      steps: [
        'MO là tia phân giác của góc AMB nên góc AMO = 30°.',
        `Tam giác OAM vuông tại A có góc AMO = 30° nên OA = OM/2, tức OM = 2 · ${r} = ${2 * r} cm.`,
      ],
      hints: [
        'MO chia đôi góc AMB.',
        'Trong tam giác vuông, cạnh đối diện góc 30° bằng nửa cạnh huyền.',
      ],
    };
  },
};

/** How two circles lie, the way the book says it, by number of common points. */
const TWO_CIRCLES = /** @type {const} */ ({
  cat: ['R − r < d < R + r', 'hai đường tròn cắt nhau', 2],
  ngoai: ['d = R + r', 'hai đường tròn tiếp xúc ngoài', 1],
  trong: ['d = R − r', 'hai đường tròn tiếp xúc trong', 1],
  xa: ['d > R + r', 'hai đường tròn ở ngoài nhau', 0],
  dung: ['d < R − r', '(O) đựng (O′)', 0],
});

/** @type {Skill} */
export const haiDuongTron = {
  id: 'hai-duong-tron',
  label: 'Bài 17. Vị trí tương đối của hai đường tròn',
  make(rand) {
    const variant = int(rand, 0, 4);
    if (variant === 0) {
      const big = int(rand, 4, 10);
      const small = int(rand, 1, big - 2);
      const kind = pick(rand, /** @type {const} */ (['cat', 'ngoai', 'trong', 'xa', 'dung']));
      const d = {
        cat: int(rand, big - small + 1, big + small - 1),
        ngoai: big + small,
        trong: big - small,
        xa: big + small + pick(rand, [0.5, 1, 1.5, 2, 3]),
        dung: (big - small) / 2,
      }[kind];
      const [rule, name, count] = TWO_CIRCLES[kind];
      return {
        prompt: `Cho hai đường tròn (O; ${big} cm) và (O′; ${small} cm) với OO′ = ${t(d)} cm. Hai đường tròn có bao nhiêu điểm chung?`,
        answer: count,
        steps: [
          `R + r = ${big + small} cm, R − r = ${big - small} cm, d = OO′ = ${t(d)} cm.`,
          `${rule}, nên ${name}: có ${count} điểm chung.`,
        ],
        hints: [
          'So sánh d = OO′ với cả R + r và R − r.',
          'Dấu "=" ứng với tiếp xúc (1 điểm chung); nằm giữa hai số là cắt nhau.',
        ],
      };
    }
    if (variant === 1) {
      const big = int(rand, 3, 12);
      const small = int(rand, 1, 20) / 2;
      const d = big + small;
      return {
        prompt: `Đường tròn (O; ${big} cm) tiếp xúc ngoài với đường tròn (O′; r) và OO′ = ${t(d)} cm. Tính r (cm).`,
        answer: small,
        unit: 'cm',
        steps: [
          'Hai đường tròn tiếp xúc ngoài nên OO′ = R + r.',
          `r = OO′ − R = ${t(d)} − ${big} = ${t(small)} cm.`,
        ],
        hints: ['Tiếp điểm nằm giữa hai tâm: OO′ = R + r.'],
      };
    }
    if (variant === 2) {
      const big = int(rand, 4, 15);
      const d = int(rand, 1, big - 1);
      return {
        prompt: `Đường tròn (O; ${big} cm) tiếp xúc trong với đường tròn (O′; r), r < ${big} cm, và OO′ = ${d} cm. Tính r (cm).`,
        answer: big - d,
        unit: 'cm',
        steps: [
          'Hai đường tròn tiếp xúc trong (R > r) nên OO′ = R − r.',
          `r = R − OO′ = ${big} − ${d} = ${big - d} cm.`,
        ],
        hints: ['Tiếp xúc trong: OO′ = R − r.'],
      };
    }
    if (variant === 3) {
      const a = int(rand, 1, 5);
      const b = int(rand, 1, 6);
      const c = int(rand, 1, 7);
      return {
        prompt: `Ba đường tròn (A; ${a} cm), (B; ${b} cm), (C; ${c} cm) đôi một tiếp xúc ngoài với nhau. Tính chu vi tam giác ABC (cm).`,
        answer: 2 * (a + b + c),
        unit: 'cm',
        steps: [
          `Hai đường tròn tiếp xúc ngoài thì đoạn nối tâm bằng tổng hai bán kính: AB = ${a + b}, BC = ${b + c}, CA = ${c + a} (cm).`,
          `Chu vi tam giác ABC = ${a + b} + ${b + c} + ${c + a} = ${2 * (a + b + c)} cm.`,
        ],
        hints: ['Mỗi cạnh của tam giác là một đoạn nối tâm của hai đường tròn tiếp xúc ngoài.'],
      };
    }
    const [p, q, c] = pick(rand, TRIPLES);
    const [half, chord] = rand() < 0.5 ? [p, q] : [q, p];
    return {
      prompt: `Hai đường tròn (O; ${c} cm) và (O′; ${c} cm) cắt nhau tại A và B, OO′ = ${2 * half} cm. Tính độ dài dây chung AB (cm).`,
      answer: 2 * chord,
      unit: 'cm',
      steps: [
        'OO′ là đường trung trực của AB; gọi H là giao điểm của OO′ và AB. Vì OA = O′A nên H là trung điểm của OO′.',
        `OH = ${2 * half} : 2 = ${half} cm, AH² = OA² − OH² = ${c * c} − ${half * half} = ${chord * chord}, nên AH = ${chord} cm.`,
        `AB = 2 · AH = ${2 * chord} cm.`,
      ],
      hints: [
        'Đường nối tâm là đường trung trực của dây chung.',
        'Hai bán kính bằng nhau nên AB cũng chia đôi OO′; dùng định lí Pythagore trong tam giác AHO.',
      ],
    };
  },
};

/** The drill of "Luyện tập chung trang 108". */
export const SKILLS_TRANG_108 = [duongThang, tiepTuyen, haiDuongTron];

/** The drill of the chapter review, one skill per idea of each lesson. */
export const CHAPTER_SKILLS = [
  viTriDiem,
  cungDay,
  doDaiCung,
  dienTich,
  duongThang,
  tiepTuyen,
  haiDuongTron,
];
