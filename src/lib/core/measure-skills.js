/**
 * Generated drill skills for measuring lessons on any site: unit conversions
 * for mass, time and temperature. Every answer is a natural number so the
 * drill board reads and checks it as typed. Use with `drill-board.svelte`,
 * for example `<DrillBoard skills={MASS_SKILLS} perSkill={3} />`.
 */

import { int, pick } from './drill.js';
import { fmt } from './number-format.js';

/** @typedef {import('./drill.js').Skill} Skill */

/** Kelvin offset used in lower secondary: T(K) = t(°C) + 273. */
export const KELVIN_OFFSET = 273;

/** @type {Skill} */
export const kgToGram = {
  id: 'kg-g',
  label: 'Đổi kg ra g',
  make(rand) {
    const kg = int(rand, 1, 9);
    const g = int(rand, 1, 19) * 50;
    const answer = kg * 1000 + g;
    return {
      prompt: `${kg} kg ${fmt(g)} g = ? g`,
      answer,
      hints: ['1 kg = 1 000 g.', `Đổi ${kg} kg ra gam rồi cộng thêm ${fmt(g)} g.`],
      steps: [
        `${kg} kg = ${kg} · 1 000 g = ${fmt(kg * 1000)} g.`,
        `${fmt(kg * 1000)} + ${fmt(g)} = ${fmt(answer)} g.`,
      ],
    };
  },
};

/** @type {Skill} */
export const bigMassToKg = {
  id: 'tan-ta-yen',
  label: 'Đổi tấn, tạ, yến ra kg',
  make(rand) {
    const unit = pick(rand, /** @type {const} */ (['tấn', 'tạ', 'yến']));
    const size = unit === 'tấn' ? 1000 : unit === 'tạ' ? 100 : 10;
    const n = int(rand, 2, 9);
    const extra = int(rand, 1, size === 10 ? 9 : 99);
    const answer = n * size + extra;
    return {
      prompt: `${n} ${unit} ${extra} kg = ? kg`,
      answer,
      hints: [
        `1 ${unit} = ${fmt(size)} kg.`,
        `Đổi ${n} ${unit} ra kilôgam rồi cộng thêm ${extra} kg.`,
      ],
      steps: [
        `${n} ${unit} = ${n} · ${fmt(size)} kg = ${fmt(n * size)} kg.`,
        `${fmt(n * size)} + ${extra} = ${fmt(answer)} kg.`,
      ],
    };
  },
};

/** @type {Skill} */
export const smallMass = {
  id: 'lang-g-mg',
  label: 'Đổi lạng, gam, miligam',
  make(rand) {
    if (rand() < 0.5) {
      const lang = int(rand, 2, 9);
      const answer = lang * 100;
      return {
        prompt: `${lang} lạng = ? g`,
        answer,
        hints: ['1 lạng (1 héctôgam) = 100 g.'],
        steps: [`${lang} lạng = ${lang} · 100 g.`, `= ${fmt(answer)} g.`],
      };
    }
    const g = int(rand, 2, 30);
    const answer = g * 1000;
    return {
      prompt: `${g} g = ? mg`,
      answer,
      hints: ['1 g = 1 000 mg.'],
      steps: [`${g} g = ${g} · 1 000 mg.`, `= ${fmt(answer)} mg.`],
    };
  },
};

/** @type {Skill} */
export const hourMinuteToMinute = {
  id: 'gio-phut',
  label: 'Đổi giờ ra phút',
  make(rand) {
    const h = int(rand, 1, 5);
    const m = int(rand, 1, 59);
    const answer = h * 60 + m;
    return {
      prompt: `${h} giờ ${m} phút = ? phút`,
      answer,
      hints: ['1 giờ = 60 phút.', `Đổi ${h} giờ ra phút rồi cộng thêm ${m} phút.`],
      steps: [`${h} giờ = ${h} · 60 = ${h * 60} phút.`, `${h * 60} + ${m} = ${answer} phút.`],
    };
  },
};

/** @type {Skill} */
export const minuteSecondToSecond = {
  id: 'phut-giay',
  label: 'Đổi phút ra giây',
  make(rand) {
    const m = int(rand, 1, 20);
    const s = int(rand, 1, 59);
    const answer = m * 60 + s;
    return {
      prompt: `${m} phút ${s} giây = ? giây`,
      answer,
      hints: ['1 phút = 60 giây.', `Đổi ${m} phút ra giây rồi cộng thêm ${s} giây.`],
      steps: [
        `${m} phút = ${m} · 60 = ${fmt(m * 60)} giây.`,
        `${fmt(m * 60)} + ${s} = ${fmt(answer)} giây.`,
      ],
    };
  },
};

/**
 * @param {number} minutes minutes after midnight
 */
function clock(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h} giờ ${String(m).padStart(2, '0')}`;
}

/** @type {Skill} */
export const timeSpan = {
  id: 'khoang-thoi-gian',
  label: 'Tính khoảng thời gian',
  make(rand) {
    const start = int(rand, 6 * 60, 15 * 60);
    const answer = int(rand, 25, 150);
    const end = start + answer;
    return {
      prompt: `Bắt đầu lúc ${clock(start)}, kết thúc lúc ${clock(end)} cùng ngày. Khoảng thời gian là bao nhiêu phút?`,
      answer,
      hints: [
        'Lấy thời điểm kết thúc trừ thời điểm bắt đầu.',
        'Đổi cả hai thời điểm ra số phút tính từ 0 giờ, rồi trừ.',
      ],
      steps: [
        `${clock(start)} = ${Math.floor(start / 60)} · 60 + ${start % 60} = ${fmt(start)} phút; ${clock(end)} = ${fmt(end)} phút (tính từ 0 giờ).`,
        `${fmt(end)} − ${fmt(start)} = ${answer} phút.`,
      ],
    };
  },
};

/** @type {Skill} */
export const celsiusToKelvin = {
  id: 'c-k',
  label: 'Đổi °C ra K',
  make(rand) {
    const t = int(rand, 1, 100);
    const answer = t + KELVIN_OFFSET;
    return {
      prompt: `${t} °C ứng với bao nhiêu kelvin?`,
      answer,
      hints: ['T (K) = t (°C) + 273.'],
      steps: [`T = ${t} + 273.`, `T = ${answer} K.`],
    };
  },
};

/** @type {Skill} */
export const kelvinToCelsius = {
  id: 'k-c',
  label: 'Đổi K ra °C',
  make(rand) {
    const answer = int(rand, 1, 100);
    const kelvin = answer + KELVIN_OFFSET;
    return {
      prompt: `${kelvin} K ứng với bao nhiêu độ C?`,
      answer,
      hints: ['t (°C) = T (K) − 273.'],
      steps: [`t = ${kelvin} − 273.`, `t = ${answer} °C.`],
    };
  },
};

export const MASS_SKILLS = [kgToGram, bigMassToKg, smallMass];
export const TIME_SKILLS = [hourMinuteToMinute, minuteSecondToSecond, timeSpan];
export const TEMPERATURE_SKILLS = [celsiusToKelvin, kelvinToCelsius];
