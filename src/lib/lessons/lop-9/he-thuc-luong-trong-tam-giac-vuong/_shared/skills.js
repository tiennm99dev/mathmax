/**
 * Question generators for the chapter "Hệ thức lượng trong tam giác vuông",
 * for the drill board of the practice and review lessons. Answers are exact
 * fractions (a trigonometric ratio from integer sides), integers (degrees)
 * or decimals rounded to a given place. A rounded answer is built as an
 * integer over a power of ten, so it is the very same double that
 * `readNumber` gives for its digits; values that sit too close to a rounding
 * boundary are drawn again, so a calculator never disagrees with the key.
 * Prompts and steps are plain text with the book's decimal comma.
 */

import { int, pick } from '#lib/core/drill.js';
import { numberText } from '#lib/core/decimal.js';
import { formatFixed } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {ReturnType<Skill['make']>} Made */

const RAD = Math.PI / 180;
export const sinD = (/** @type {number} */ d) => Math.sin(d * RAD);
export const cosD = (/** @type {number} */ d) => Math.cos(d * RAD);
export const tanD = (/** @type {number} */ d) => Math.tan(d * RAD);
const deg = (/** @type {number} */ r) => r / RAD;

/** A number as the book writes it in plain text: '0,6', '12/13', '7'. */
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

/** A rounded length with its last place kept: (22, 1) → '22,0'. */
const fx = (/** @type {number} */ v, /** @type {number} */ places) => formatFixed(v, places);

/** A fraction as an operand: '(1/3)', '0,5', '3'. */
const op = (/** @type {number} */ v) => (t(v).includes('/') ? `(${t(v)})` : t(v));

/** A calculator value shown to four places: '0,7002'. */
const calc = (/** @type {number} */ v) => t(Math.round(v * 1e4) / 1e4);

/** How far to round, in words. */
const PLACE = ['đến độ', 'đến hàng phần mười', 'đến hàng phần trăm', 'đến hàng phần nghìn'];

/** Pythagorean triples (leg, leg, hypotenuse). */
export const TRIPLES = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [12, 16, 20],
];

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

/** @type {Skill} */
export const tiSo = {
  id: 'ti-so',
  label: 'Bài 11. Tỉ số lượng giác của góc nhọn',
  make(rand) {
    const [p, q, h] = pick(rand, TRIPLES);
    const [ab, ac] = rand() < 0.5 ? [p, q] : [q, p];
    const vertex = pick(rand, ['B', 'C']);
    const name = pick(rand, /** @type {const} */ (['sin', 'cos', 'tan', 'cot']));
    const opp = vertex === 'B' ? ac : ab;
    const adj = vertex === 'B' ? ab : ac;
    const oppName = vertex === 'B' ? 'AC' : 'AB';
    const adjName = vertex === 'B' ? 'AB' : 'AC';
    const given = int(rand, 0, 2); // 0: both legs, 1: AB and BC, 2: AC and BC
    const known =
      given === 0
        ? `AB = ${ab}, AC = ${ac}`
        : given === 1
          ? `AB = ${ab}, BC = ${h}`
          : `AC = ${ac}, BC = ${h}`;
    const third =
      given === 0
        ? `BC² = ${ab}² + ${ac}² = ${h * h}, nên BC = ${h}.`
        : given === 1
          ? `AC² = ${h}² − ${ab}² = ${ac * ac}, nên AC = ${ac}.`
          : `AB² = ${h}² − ${ac}² = ${ab * ab}, nên AB = ${ab}.`;
    const ratio = {
      sin: { text: `${oppName}/BC`, num: opp, den: h },
      cos: { text: `${adjName}/BC`, num: adj, den: h },
      tan: { text: `${oppName}/${adjName}`, num: opp, den: adj },
      cot: { text: `${adjName}/${oppName}`, num: adj, den: opp },
    }[name];
    const answer = ratio.num / ratio.den;
    return {
      prompt: `Tam giác ABC vuông tại A có ${known}. Tính ${name} ${vertex} (nhập phân số hoặc số thập phân).`,
      answer,
      steps: [
        `Theo định lí Pythagore: ${third}`,
        `Đối với góc ${vertex}: cạnh đối ${oppName}, cạnh kề ${adjName}, cạnh huyền BC.`,
        `${name} ${vertex} = ${ratio.text} = ${ratio.num}/${ratio.den}${t(answer) === `${ratio.num}/${ratio.den}` ? '' : ` = ${t(answer)}`}.`,
      ],
      hints: [
        'Tính cạnh còn lại bằng định lí Pythagore.',
        'sin = đối/huyền, cos = kề/huyền, tan = đối/kề, cot = kề/đối.',
      ],
    };
  },
};

/** Special-angle terms with their values times 12, so sums stay exact. */
export const SPECIAL_TERMS = [
  { text: 'sin 30°', v12: 6 },
  { text: 'cos 60°', v12: 6 },
  { text: 'tan 45°', v12: 12 },
  { text: 'cot 45°', v12: 12 },
  { text: 'sin²45°', v12: 6 },
  { text: 'cos²45°', v12: 6 },
  { text: 'sin²60°', v12: 9 },
  { text: 'cos²30°', v12: 9 },
  { text: 'sin²30°', v12: 3 },
  { text: 'cos²60°', v12: 3 },
  { text: 'tan²60°', v12: 36 },
  { text: 'cot²30°', v12: 36 },
  { text: 'tan²30°', v12: 4 },
  { text: 'cot²60°', v12: 4 },
];

/** Exact values used in the steps. */
const SPECIAL_VALUE = {
  'sin 30°': 'sin 30° = 1/2',
  'cos 60°': 'cos 60° = 1/2',
  'tan 45°': 'tan 45° = 1',
  'cot 45°': 'cot 45° = 1',
  'sin²45°': 'sin 45° = √2/2 nên sin²45° = 1/2',
  'cos²45°': 'cos 45° = √2/2 nên cos²45° = 1/2',
  'sin²60°': 'sin 60° = √3/2 nên sin²60° = 3/4',
  'cos²30°': 'cos 30° = √3/2 nên cos²30° = 3/4',
  'sin²30°': 'sin 30° = 1/2 nên sin²30° = 1/4',
  'cos²60°': 'cos 60° = 1/2 nên cos²60° = 1/4',
  'tan²60°': 'tan 60° = √3 nên tan²60° = 3',
  'cot²30°': 'cot 30° = √3 nên cot²30° = 3',
  'tan²30°': 'tan 30° = √3/3 nên tan²30° = 1/3',
  'cot²60°': 'cot 60° = √3/3 nên cot²60° = 1/3',
};

/** @type {Skill} */
export const dacBiet = {
  id: 'goc-dac-biet',
  label: 'Bài 11. Góc đặc biệt, hai góc phụ nhau',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const x = pick(rand, SPECIAL_TERMS);
      let y = pick(rand, SPECIAL_TERMS);
      while (y.text === x.text) y = pick(rand, SPECIAL_TERMS);
      const a = int(rand, 1, 4);
      const b = int(rand, 1, 4);
      const minus = rand() < 0.4;
      const coef = (/** @type {number} */ k) => (k === 1 ? '' : `${k}`);
      const answer = (a * x.v12 + (minus ? -b : b) * y.v12) / 12;
      const expr = `${coef(a)}${x.text} ${minus ? '−' : '+'} ${coef(b)}${y.text}`;
      return {
        prompt: `Tính ${expr} (nhập số nguyên, số thập phân hoặc phân số).`,
        answer,
        steps: [
          `${SPECIAL_VALUE[/** @type {keyof typeof SPECIAL_VALUE} */ (x.text)]}.`,
          `${SPECIAL_VALUE[/** @type {keyof typeof SPECIAL_VALUE} */ (y.text)]}.`,
          `${expr} = ${a}·${op(x.v12 / 12)} ${minus ? '−' : '+'} ${b}·${op(y.v12 / 12)} = ${t(answer)}.`,
        ],
        hints: ['Dùng bảng tỉ số lượng giác của các góc 30°, 45°, 60°.'],
      };
    }
    if (variant === 1) {
      // Find x with sin x = cos a (or tan x = cot a).
      const a = int(rand, 5, 85);
      if (a === 45) return dacBiet.make(rand);
      const [f, g] = pick(rand, [
        ['sin', 'cos'],
        ['cos', 'sin'],
        ['tan', 'cot'],
        ['cot', 'tan'],
      ]);
      return {
        prompt: `Tìm góc nhọn x (theo độ) biết ${f} x = ${g} ${a}°.`,
        answer: 90 - a,
        unit: '°',
        steps: [
          `Hai góc phụ nhau thì ${f} góc này bằng ${g} góc kia.`,
          `${g} ${a}° = ${f} (90° − ${a}°) = ${f} ${90 - a}°.`,
          `Vậy x = ${90 - a}°.`,
        ],
        hints: ['Tìm góc phụ với góc đã cho.'],
      };
    }
    // k·sin a / cos(90 − a) + m·tan b·tan(90 − b) = k + m.
    const a = int(rand, 10, 80);
    let b = int(rand, 10, 80);
    if (b === a) b = a === 80 ? 79 : a + 1;
    const k = int(rand, 1, 5);
    const m = int(rand, 1, 5);
    const ka = k === 1 ? '' : `${k}·`;
    const mb = m === 1 ? '' : `${m}·`;
    return {
      prompt: `Không dùng máy tính, tính ${ka}sin ${a}° / cos ${90 - a}° + ${mb}tan ${b}°·tan ${90 - b}°.`,
      answer: k + m,
      steps: [
        `${a}° và ${90 - a}° phụ nhau nên cos ${90 - a}° = sin ${a}°, do đó sin ${a}° / cos ${90 - a}° = 1.`,
        `${b}° và ${90 - b}° phụ nhau nên tan ${90 - b}° = cot ${b}°, do đó tan ${b}°·tan ${90 - b}° = tan ${b}°·cot ${b}° = 1.`,
        `Kết quả: ${k}·1 + ${m}·1 = ${k + m}.`,
      ],
      hints: ['Tìm các cặp góc phụ nhau trong biểu thức.', 'tan α · cot α = 1.'],
    };
  },
};

/** @type {Skill} */
export const mayTinh = {
  id: 'may-tinh',
  label: 'Bài 11. Dùng máy tính cầm tay',
  make(rand) {
    return retry(() => {
      if (rand() < 0.5) {
        const a = int(rand, 5, 85);
        const name = pick(rand, /** @type {const} */ (['sin', 'cos', 'tan', 'cot']));
        const value = { sin: sinD(a), cos: cosD(a), tan: tanD(a), cot: 1 / tanD(a) }[name];
        const answer = rounded(value, 3);
        if (answer === null) return null;
        return {
          prompt: `Dùng máy tính cầm tay, tính ${name} ${a}° (làm tròn ${PLACE[3]}).`,
          answer,
          steps: [
            name === 'cot'
              ? `Máy không có phím cot: cot ${a}° = 1 / tan ${a}°.`
              : `Để máy ở chế độ độ (D), bấm ${name} ${a} =.`,
            `Máy cho ${name} ${a}° ≈ ${calc(value)}, làm tròn được ${fx(answer, 3)}.`,
          ],
          hints: ['Kiểm tra máy đang ở chế độ độ (chữ D trên màn hình).'],
        };
      }
      const name = pick(rand, ['sin', 'cos', 'tan']);
      const r = name === 'tan' ? int(rand, 10, 300) / 100 : int(rand, 5, 95) / 100;
      const angle =
        name === 'sin' ? deg(Math.asin(r)) : name === 'cos' ? deg(Math.acos(r)) : deg(Math.atan(r));
      const answer = rounded(angle, 0);
      if (answer === null) return null;
      return {
        prompt: `Tìm góc nhọn α (làm tròn ${PLACE[0]}) biết ${name} α = ${t(r)}.`,
        answer,
        unit: '°',
        steps: [
          `Bấm SHIFT ${name} ${t(r)} = để dùng ${name}⁻¹.`,
          `Máy cho α ≈ ${calc(angle)}°, làm tròn được ${answer}°.`,
        ],
        hints: [`Dùng phím ${name}⁻¹ (SHIFT ${name}) ở chế độ độ.`],
      };
    });
  },
};

/** @type {Skill} */
export const heThuc = {
  id: 'he-thuc',
  label: 'Bài 12. Hệ thức giữa cạnh và góc',
  make(rand) {
    return retry(() => {
      const B = int(rand, 20, 70);
      const C = 90 - B;
      const s = int(rand, 5, 30);
      const variant = int(rand, 0, 5);
      /** @type {{ given: string, ask: string, value: number, steps: string[] }} */
      let task;
      if (variant === 0) {
        task = {
          given: `BC = ${s} cm, góc B = ${B}°`,
          ask: 'AC',
          value: s * sinD(B),
          steps: ['AC là cạnh đối của góc B, BC là cạnh huyền.', `AC = BC·sin B = ${s}·sin ${B}°`],
        };
      } else if (variant === 1) {
        task = {
          given: `BC = ${s} cm, góc B = ${B}°`,
          ask: 'AB',
          value: s * cosD(B),
          steps: ['AB là cạnh kề của góc B, BC là cạnh huyền.', `AB = BC·cos B = ${s}·cos ${B}°`],
        };
      } else if (variant === 2) {
        task = {
          given: `AB = ${s} cm, góc B = ${B}°`,
          ask: 'AC',
          value: s * tanD(B),
          steps: ['AC đối với góc B, AB kề với góc B.', `AC = AB·tan B = ${s}·tan ${B}°`],
        };
      } else if (variant === 3) {
        task = {
          given: `AC = ${s} cm, góc C = ${C}°`,
          ask: 'AB',
          value: s * tanD(C),
          steps: ['AB đối với góc C, AC kề với góc C.', `AB = AC·tan C = ${s}·tan ${C}°`],
        };
      } else if (variant === 4) {
        task = {
          given: `AC = ${s} cm, góc B = ${B}°`,
          ask: 'AB',
          value: s / tanD(B),
          steps: ['AB kề với góc B, AC đối với góc B.', `AB = AC·cot B = ${s}/tan ${B}°`],
        };
      } else {
        task = {
          given: `AC = ${s} cm, góc B = ${B}°`,
          ask: 'BC',
          value: s / sinD(B),
          steps: ['AC = BC·sin B, nên BC = AC/sin B.', `BC = ${s}/sin ${B}°`],
        };
      }
      const answer = rounded(task.value, 1);
      if (answer === null) return null;
      return {
        prompt: `Tam giác ABC vuông tại A có ${task.given}. Tính ${task.ask} (cm, làm tròn ${PLACE[1]}).`,
        answer,
        unit: 'cm',
        steps: [task.steps[0], `${task.steps[1]} ≈ ${calc(task.value)} ≈ ${fx(answer, 1)} cm.`],
        hints: [
          'Xác định cạnh cần tìm là cạnh đối hay cạnh kề của góc đã biết.',
          'Cạnh góc vuông = huyền·sin góc đối = huyền·cos góc kề = cạnh góc vuông kia·tan góc đối.',
        ],
      };
    });
  },
};

/** @type {Skill} */
export const giaiTamGiac = {
  id: 'giai-tam-giac',
  label: 'Bài 12. Giải tam giác vuông',
  make(rand) {
    return retry(() => {
      const variant = int(rand, 0, 2);
      const ask = pick(rand, ['B', 'C']);
      if (variant === 0) {
        const ab = int(rand, 3, 20);
        const ac = int(rand, 3, 20);
        if (ab === ac) return null;
        const B = deg(Math.atan(ac / ab));
        const value = ask === 'B' ? B : 90 - B;
        const answer = rounded(value, 0);
        if (answer === null) return null;
        const ratio = ask === 'B' ? `tan B = AC/AB = ${ac}/${ab}` : `tan C = AB/AC = ${ab}/${ac}`;
        return {
          prompt: `Tam giác ABC vuông tại A có AB = ${ab} cm, AC = ${ac} cm. Tính góc ${ask} (làm tròn ${PLACE[0]}).`,
          answer,
          unit: '°',
          steps: [
            `${ratio}.`,
            `Máy tính cho góc ${ask} ≈ ${calc(value)}°, làm tròn được ${answer}°.`,
          ],
          hints: ['Biết hai cạnh góc vuông thì dùng tang.'],
        };
      }
      const h = int(rand, 10, 30);
      const leg = int(rand, 2, h - 1);
      const legName = variant === 1 ? 'AB' : 'AC';
      // angle opposite to the given leg uses sin, adjacent uses cos
      const oppVertex = legName === 'AC' ? 'B' : 'C';
      const theta = deg(Math.asin(leg / h)); // angle opposite the leg
      const value = ask === oppVertex ? theta : 90 - theta;
      const answer = rounded(value, 0);
      if (answer === null) return null;
      const fn = ask === oppVertex ? 'sin' : 'cos';
      return {
        prompt: `Tam giác ABC vuông tại A có BC = ${h} cm, ${legName} = ${leg} cm. Tính góc ${ask} (làm tròn ${PLACE[0]}).`,
        answer,
        unit: '°',
        steps: [
          `${legName} là cạnh ${fn === 'sin' ? 'đối' : 'kề'} của góc ${ask}, BC là cạnh huyền.`,
          `${fn} ${ask} = ${legName}/BC = ${leg}/${h}.`,
          `Máy tính cho góc ${ask} ≈ ${calc(value)}°, làm tròn được ${answer}°.`,
        ],
        hints: ['Biết một cạnh góc vuông và cạnh huyền thì dùng sin hoặc côsin.'],
      };
    });
  },
};

/** @type {Skill} */
export const thucTe = {
  id: 'thuc-te',
  label: 'Bài 12. Ứng dụng thực tế',
  make(rand) {
    return retry(() => {
      const variant = int(rand, 0, 4);
      if (variant === 0) {
        const eye = pick(rand, [1.5, 1.6, 1.2]);
        const d = int(rand, 10, 60);
        const a = int(rand, 20, 60);
        const value = eye + d * tanD(a);
        const answer = rounded(value, 1);
        if (answer === null) return null;
        return {
          prompt: `Giác kế cao ${t(eye)} m đặt cách chân toà nhà ${d} m, góc nâng ngắm đỉnh toà nhà là ${a}°. Tính chiều cao toà nhà (m, làm tròn ${PLACE[1]}).`,
          answer,
          unit: 'm',
          steps: [
            `Phần cao hơn mắt ngắm: ${d}·tan ${a}° ≈ ${calc(d * tanD(a))} m.`,
            `Chiều cao: h = ${t(eye)} + ${d}·tan ${a}° ≈ ${calc(value)} ≈ ${fx(answer, 1)} m.`,
          ],
          hints: ['Khoảng cách là cạnh kề của góc nâng.', 'Đừng quên cộng chiều cao giác kế.'],
        };
      }
      if (variant === 1) {
        const l = int(rand, 3, 8);
        const a = int(rand, 60, 75);
        const value = l * sinD(a);
        const answer = rounded(value, 1);
        if (answer === null) return null;
        return {
          prompt: `Thang dài ${l} m dựa vào tường, tạo với mặt đất góc ${a}°. Đầu thang cao bao nhiêu mét (làm tròn ${PLACE[1]})?`,
          answer,
          unit: 'm',
          steps: [
            'Thang là cạnh huyền, độ cao đầu thang là cạnh đối của góc tạo với mặt đất.',
            `Độ cao = ${l}·sin ${a}° ≈ ${calc(value)} ≈ ${fx(answer, 1)} m.`,
          ],
          hints: ['Cạnh góc vuông = cạnh huyền·sin góc đối.'],
        };
      }
      if (variant === 2) {
        const s = int(rand, 5, 30);
        const a = int(rand, 25, 65);
        const value = s * tanD(a);
        const answer = rounded(value, 1);
        if (answer === null) return null;
        return {
          prompt: `Bóng một cột điện trên mặt đất dài ${s} m, tia nắng tạo với mặt đất góc ${a}°. Cột điện cao bao nhiêu mét (làm tròn ${PLACE[1]})?`,
          answer,
          unit: 'm',
          steps: [
            'Bóng là cạnh kề, cột điện là cạnh đối của góc tạo bởi tia nắng và mặt đất.',
            `Chiều cao = ${s}·tan ${a}° ≈ ${calc(value)} ≈ ${fx(answer, 1)} m.`,
          ],
          hints: ['Cạnh góc vuông = cạnh góc vuông kia·tan góc đối.'],
        };
      }
      if (variant === 3) {
        const h = int(rand, 20, 80);
        const b = int(rand, 10, 40);
        const value = h / tanD(b);
        const answer = rounded(value, 0);
        if (answer === null) return null;
        return {
          prompt: `Từ đỉnh ngọn hải đăng cao ${h} m, nhìn một con thuyền với góc hạ ${b}°. Thuyền cách chân hải đăng bao nhiêu mét (làm tròn đến mét)?`,
          answer,
          unit: 'm',
          steps: [
            `Góc giữa tia nhìn và mặt nước bằng góc hạ ${b}° (so le trong).`,
            `Khoảng cách d = ${h}·cot ${b}° = ${h}/tan ${b}° ≈ ${calc(value)} ≈ ${answer} m.`,
          ],
          hints: ['Độ cao hải đăng là cạnh đối, khoảng cách là cạnh kề của góc tại thuyền.'],
        };
      }
      const len = int(rand, 20, 120);
      const rise = int(rand, 2, Math.max(3, Math.floor(len / 4)));
      const value = deg(Math.asin(rise / len));
      const answer = rounded(value, 0);
      if (answer === null || answer < 1) return null;
      return {
        prompt: `Một con dốc dài ${len} m, đỉnh dốc cao hơn chân dốc ${rise} m. Tính góc dốc so với phương nằm ngang (làm tròn ${PLACE[0]}).`,
        answer,
        unit: '°',
        steps: [
          'Mặt dốc là cạnh huyền, độ cao là cạnh đối của góc dốc.',
          `sin α = ${rise}/${len}, máy tính cho α ≈ ${calc(value)}°, làm tròn được ${answer}°.`,
        ],
        hints: ['Dùng sin α = độ cao / chiều dài dốc.'],
      };
    });
  },
};

/** The drill of "Luyện tập chung trang 79". */
export const SKILLS_TRANG_79 = [tiSo, dacBiet, mayTinh, heThuc, giaiTamGiac];

/** The drill of the chapter review, one skill per idea of each lesson. */
export const CHAPTER_SKILLS = [tiSo, dacBiet, mayTinh, heThuc, giaiTamGiac, thucTe];
