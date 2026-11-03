/**
 * Temperature on a thermometer: dragging the red column to the temperature of
 * a hot or cold situation, and a practice round of readings, the way a reading
 * is said aloud, comparisons and fevers. Pure and DOM-free.
 */
import { capitalReading } from '#lib/core/kid/numbers.js';
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { HOT_END, degText, sortedOptions } from '../_shared/measure.js';

/** The temperature of a healthy person's body, as the book gives it. */
export const NORMAL_BODY = 37;

/**
 * A hot or cold situation and its temperature on the thermometer.
 * @typedef {{ id: string, name: string, icon: string, t: number, note: string }} Scene
 */

/** @type {readonly Scene[]} */
export const SCENES = [
  { id: 'ice', name: 'Cốc nước đá', icon: '🧊', t: 0, note: 'Nước đá rất lạnh.' },
  { id: 'sapa', name: 'Sa Pa ngày rét', icon: '🧣', t: 10, note: 'Trời rét, em mặc áo ấm.' },
  { id: 'cool', name: 'Buổi sáng mát mẻ', icon: '🌤️', t: 25, note: 'Trời mát, thật dễ chịu.' },
  { id: 'noon', name: 'Trưa hè nắng nóng', icon: '☀️', t: 36, note: 'Trời nóng, em nhớ đội mũ.' },
  {
    id: 'well',
    name: 'Người khoẻ mạnh',
    icon: '🙂',
    t: 37,
    note: 'Đây là nhiệt độ cơ thể bình thường.',
  },
  {
    id: 'fever',
    name: 'Bạn nhỏ bị sốt',
    icon: '🤒',
    t: 39,
    note: 'Cao hơn 37 °C: bạn cần báo người lớn.',
  },
];

/**
 * The live sentence beside the thermometer.
 * @param {Scene} scene
 * @param {number} t the reading now
 */
export function sceneMessage(scene, t) {
  if (t === scene.t) return `Đúng rồi! ${scene.name}: nhiệt kế chỉ ${degText(t)}. ${scene.note}`;
  return t < scene.t
    ? `Nhiệt kế chỉ ${degText(t)}, thấp hơn ${degText(scene.t)}. Em kéo cột đỏ lên.`
    : `Nhiệt kế chỉ ${degText(t)}, cao hơn ${degText(scene.t)}. Em kéo cột đỏ xuống.`;
}

/**
 * How a temperature in °C is said aloud.
 * @param {number} t
 */
export function degWords(t) {
  return `${capitalReading(t)} độ C`;
}

/** What each part of a round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  read: 'Đọc nhiệt kế',
  say: 'Đọc và viết nhiệt độ',
  compare: 'So sánh nhiệt độ',
  day: 'Nhiệt độ trong ngày',
  fever: 'Nhiệt độ cơ thể',
  scene: 'Chọn tình huống',
});

const PLACES = ['Hà Nội', 'Lào Cai', 'Sa Pa', 'Đà Lạt', 'Huế', 'Cần Thơ'];
const FRIENDS = ['Minh', 'Nam', 'Tú', 'Lan', 'Việt'];

/**
 * @typedef {import('#lib/core/kid/quiz.js').KidQuestion<{ t: number }>} RoundQuestion
 */

/**
 * A round of eight questions. A reading and a situation carry a thermometer.
 * @param {number} seed
 * @returns {RoundQuestion[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  /** @type {(keyof typeof KIND_LABELS)[]} */
  const kinds = ['read', 'say', 'compare', 'read', 'day', 'fever', 'scene', 'say'];
  let saidAloud = false;
  return kinds.map((kind) => {
    if (kind === 'read') {
      const t = int(rand, 5, HOT_END - 5);
      const { options, answer } = sortedOptions(degText, t, [t + 1, t - 1, t + 10, t - 10]);
      return {
        kind,
        visual: { t },
        prompt: 'Nhiệt kế chỉ bao nhiêu độ C?',
        options,
        answer,
        optionLabels: options.map((o) => o.replace('°C', 'độ C')),
        hint: 'Số ghi cách nhau 10 độ. Mỗi vạch nhỏ là 1 độ. Em nhìn đỉnh cột đỏ.',
        solution: `Đỉnh cột đỏ ở vạch ${t}. Nhiệt kế chỉ ${degText(t)}.`,
      };
    }
    if (kind === 'say') {
      const t = int(rand, 11, 45);
      saidAloud = !saidAloud;
      if (saidAloud) {
        const { options, answer } = sortedOptions(degText, t, [t + 1, t - 1, t + 10]);
        return {
          kind,
          prompt: `"${degWords(t)}" viết là gì?`,
          options,
          answer,
          optionLabels: options.map((o) => o.replace('°C', 'độ C')),
          hint: 'Em viết số trước, rồi viết °C.',
          solution: `${degWords(t)} viết là ${degText(t)}.`,
        };
      }
      const wrong = [t + 1, t + 10].map(degWords);
      const options = shuffle(rand, [degWords(t), ...wrong]);
      return {
        kind,
        prompt: `${degText(t)} đọc là gì?`,
        options,
        answer: options.indexOf(degWords(t)),
        hint: 'Em đọc số trước, rồi đọc "độ C".',
        solution: `${degText(t)} đọc là ${degWords(t).toLowerCase().replace('độ c', 'độ C')}.`,
      };
    }
    if (kind === 'compare') {
      const [a, b] = shuffle(rand, PLACES);
      const ta = int(rand, 10, 25);
      const tb = ta + int(rand, 3, 12);
      const asksHot = rand() < 0.5;
      const options = [a, b];
      return {
        kind,
        prompt: `${a}: ${degText(ta)}. ${b}: ${degText(tb)}. Nơi nào ${asksHot ? 'nóng' : 'lạnh'} hơn?`,
        options,
        answer: asksHot ? 1 : 0,
        hint: 'Số độ càng lớn thì càng nóng. Số độ càng bé thì càng lạnh.',
        solution: `${ta} < ${tb}. Vậy ${asksHot ? b : a} ${asksHot ? 'nóng' : 'lạnh'} hơn.`,
      };
    }
    if (kind === 'day') {
      const parts = [
        { name: 'Buổi sáng', t: int(rand, 22, 28) },
        { name: 'Buổi trưa', t: int(rand, 31, 38) },
        { name: 'Buổi đêm', t: int(rand, 14, 20) },
      ];
      const asksHigh = rand() < 0.5;
      const pickedPart = asksHigh ? parts[1] : parts[2];
      const options = parts.map((p) => p.name);
      const list = parts.map((p) => `${p.name.toLowerCase()} ${degText(p.t)}`).join(', ');
      return {
        kind,
        prompt: `Hôm nay, ${list}. Lúc nào nhiệt độ ${asksHigh ? 'cao' : 'thấp'} nhất?`,
        options,
        answer: options.indexOf(pickedPart.name),
        hint: `Em tìm số độ ${asksHigh ? 'lớn' : 'bé'} nhất trong ba số.`,
        solution: `${degText(pickedPart.t)} là nhiệt độ ${asksHigh ? 'cao' : 'thấp'} nhất, vào ${pickedPart.name.toLowerCase()}.`,
      };
    }
    if (kind === 'fever') {
      const [sick, well1, well2] = shuffle(rand, FRIENDS);
      const t = pick(rand, [38, 39, 40]);
      const right = `${sick}: ${degText(t)}`;
      const options = shuffle(rand, [
        right,
        `${well1}: ${degText(NORMAL_BODY)}`,
        `${well2}: ${degText(NORMAL_BODY)}`,
      ]);
      return {
        kind,
        prompt: `Nhiệt độ cơ thể bình thường là ${degText(NORMAL_BODY)}. Bạn nào bị sốt?`,
        options,
        answer: options.indexOf(right),
        optionLabels: options.map((o) => o.replace('°C', 'độ C')),
        hint: 'Bị sốt thì nhiệt độ cơ thể cao hơn bình thường.',
        solution: `${degText(t)} cao hơn ${degText(NORMAL_BODY)}, nên bạn ${sick} bị sốt.`,
      };
    }
    const pool = shuffle(rand, SCENES);
    const right = pool[0];
    const wrong = pool.filter((s) => Math.abs(s.t - right.t) > 5).slice(0, 2);
    const options = shuffle(
      rand,
      [right, ...wrong].map((s) => s.name),
    );
    return {
      kind,
      visual: { t: right.t },
      prompt: 'Nhiệt kế này hợp với tình huống nào?',
      options,
      answer: options.indexOf(right.name),
      hint: 'Em đọc nhiệt kế, rồi nghĩ xem nóng hay lạnh.',
      solution: `${right.name}: nhiệt kế chỉ ${degText(right.t)}. ${right.note}`,
    };
  });
}
