/**
 * Kid questions on a circle's centre, radius and diameter, each with its
 * picture. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions } from '#lib/core/kid/quiz.js';
import { nameAway, pointAt } from './scene.js';

/** @typedef {import('./scene.js').Scene} Scene */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Scene>} SceneQuestion */

const CENTRE = { x: 160, y: 125 };
const R = 90;

/**
 * A circle with its named centre, named points on it and segments between them.
 * Segment `[a, b]` names two points; `centre` counts as one.
 * @param {string} centre
 * @param {Record<string, number>} rim name → degrees
 * @param {[string, string][]} segments
 * @returns {Omit<Scene, 'label'> & { w: number, h: number }}
 */
function circleParts(centre, rim, segments) {
  /** @type {Record<string, import('./scene.js').Pt>} */
  const at = { [centre]: CENTRE };
  for (const [name, deg] of Object.entries(rim)) at[name] = pointAt(CENTRE, R, deg);
  return {
    w: 320,
    h: 250,
    circles: [{ c: CENTRE, r: R }],
    lines: segments.map(([a, b]) => ({ a: at[a], b: at[b] })),
    dots: [
      { at: CENTRE, name: centre, nameAt: { x: CENTRE.x + 14, y: CENTRE.y + 18 } },
      ...Object.keys(rim).map((name) => ({
        at: at[name],
        name,
        nameAt: nameAway(at[name], CENTRE),
      })),
    ],
  };
}

/** Five letters a picture can use, with the centre first. */
const LETTERS = /** @type {const} */ ([
  ['O', 'A', 'B', 'C', 'D', 'E'],
  ['I', 'M', 'N', 'P', 'Q', 'R'],
  ['K', 'G', 'H', 'L', 'S', 'T'],
]);

/**
 * A picture with one radius, one diameter and one segment that misses the
 * centre, the three things a child must tell apart.
 * @param {() => number} rand
 */
function threeSegments(rand) {
  const [centre, r, d1, d2, c1, c2] = pick(rand, LETTERS);
  const turn = int(rand, 0, 3) * 15;
  /** @type {Record<string, number>} */
  const rim = {
    [d1]: 180 + turn,
    [d2]: turn,
    [r]: 80 + turn,
    [c1]: 215 + turn,
    [c2]: 325 + turn,
  };
  /** @type {[string, string][]} */
  const segments = [
    [d1, d2],
    [centre, r],
    [c1, c2],
  ];
  return {
    centre,
    radius: `${centre}${r}`,
    diameter: `${d1}${d2}`,
    chord: `${c1}${c2}`,
    parts: circleParts(centre, rim, segments),
  };
}

/**
 * Which point is the centre.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function findCentre(rand) {
  const { centre, parts } = threeSegments(rand);
  const others = (parts.dots ?? []).map((d) => d.name ?? '').filter((n) => n !== centre);
  return {
    prompt: 'Điểm nào là tâm của hình tròn?',
    ...mixOptions(rand, centre, shuffle(rand, others).slice(0, 2)),
    hint: 'Tâm nằm ở chính giữa hình tròn, không nằm trên đường tròn.',
    solution: `${centre} nằm ở chính giữa, nên ${centre} là tâm của hình tròn.`,
    visual: {
      ...parts,
      label: `Một hình tròn, có điểm ${centre} ở chính giữa và các điểm trên đường tròn.`,
    },
  };
}

/**
 * Which segment is a radius, or a diameter.
 * @param {() => number} rand
 * @param {'ban-kinh' | 'duong-kinh'} target
 * @returns {SceneQuestion}
 */
export function findSegment(rand, target) {
  const { centre, radius, diameter, chord, parts } = threeSegments(rand);
  const isRadius = target === 'ban-kinh';
  const right = isRadius ? radius : diameter;
  return {
    prompt: isRadius
      ? 'Đoạn thẳng nào là bán kính của hình tròn?'
      : 'Đoạn thẳng nào là đường kính của hình tròn?',
    ...mixOptions(rand, right, isRadius ? [diameter, chord] : [radius, chord]),
    hint: isRadius
      ? 'Bán kính nối tâm với một điểm trên đường tròn.'
      : 'Đường kính đi qua tâm và nối hai điểm trên đường tròn.',
    solution: isRadius
      ? `${radius} nối tâm ${centre} với một điểm trên đường tròn, nên ${radius} là bán kính.`
      : `${diameter} đi qua tâm ${centre} và nối hai điểm trên đường tròn, nên ${diameter} là đường kính.`,
    visual: {
      ...parts,
      label: `Hình tròn tâm ${centre}. Đoạn ${radius} đi từ tâm ra đường tròn. Đoạn ${diameter} đi qua tâm. Đoạn ${chord} không đi qua tâm.`,
    },
  };
}

/**
 * A circle with one length written along a segment.
 * @param {string} written
 * @param {'ban-kinh' | 'duong-kinh'} shows
 * @param {string} label
 * @returns {Scene}
 */
function lengthScene(written, shows, label) {
  const isRadius = shows === 'ban-kinh';
  /** @type {Record<string, number>} */
  const rim = isRadius ? { A: 0 } : { A: 180, B: 0 };
  /** @type {[string, string][]} */
  const segments = isRadius ? [['O', 'A']] : [['A', 'B']];
  return {
    ...circleParts('O', rim, segments),
    label,
    texts: [{ x: isRadius ? CENTRE.x + R / 2 : CENTRE.x, y: CENTRE.y - 18, text: written }],
  };
}

/**
 * The diameter from the radius.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function diameterFrom(rand) {
  const r = int(rand, 2, 9);
  const d = r * 2;
  return {
    prompt: `Hình tròn có bán kính ${r} cm. Đường kính dài mấy xăng-ti-mét?`,
    ...numberOptions(rand, d, r, d + 3),
    hint: 'Đường kính gấp mấy lần bán kính?',
    solution: `Đường kính gấp 2 lần bán kính: ${r} × 2 = ${d}. Đường kính dài ${d} cm.`,
    visual: lengthScene(
      `${r} cm`,
      'ban-kinh',
      `Hình tròn tâm O, bán kính OA dài ${r} xăng-ti-mét.`,
    ),
  };
}

/**
 * The radius from the diameter.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function radiusFrom(rand) {
  const r = int(rand, 2, 9);
  const d = r * 2;
  return {
    prompt: `Hình tròn có đường kính ${d} cm. Bán kính dài mấy xăng-ti-mét?`,
    ...numberOptions(rand, r, 1, d),
    hint: 'Đường kính gấp 2 lần bán kính. Vậy bán kính bằng một nửa đường kính.',
    solution: `${d} : 2 = ${r}. Bán kính dài ${r} cm.`,
    visual: lengthScene(
      `${d} cm`,
      'duong-kinh',
      `Hình tròn tâm O, đường kính AB dài ${d} xăng-ti-mét.`,
    ),
  };
}

/**
 * Another radius of the same circle.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function otherRadius(rand) {
  const r = int(rand, 2, 9);
  const parts = circleParts('O', { A: 330, B: 110 }, [
    ['O', 'A'],
    ['O', 'B'],
  ]);
  return {
    prompt: `OA và OB là hai bán kính của hình tròn tâm O. OA dài ${r} cm. OB dài mấy xăng-ti-mét?`,
    ...numberOptions(rand, r, 1, r * 2),
    hint: 'Các bán kính của một hình tròn có độ dài như thế nào?',
    solution: `Các bán kính của một hình tròn dài bằng nhau, nên OB = OA = ${r} cm.`,
    visual: {
      ...parts,
      label: `Hình tròn tâm O, hai bán kính OA và OB. OA dài ${r} xăng-ti-mét.`,
      texts: [{ x: 190, y: 88, text: `${r} cm` }],
    },
  };
}

/**
 * Two circles side by side and the line through both.
 * @param {() => number} rand
 * @returns {SceneQuestion}
 */
export function twoCircles(rand) {
  const r = int(rand, 2, 8);
  const radius = 72;
  const y = 90;
  const left = { x: 88, y };
  const right = { x: 232, y };
  const a = { x: 16, y };
  const b = { x: 304, y };
  const total = r * 4;
  return {
    prompt: `Hai hình tròn nằm cạnh nhau, mỗi hình có bán kính ${r} cm. Đoạn thẳng AB dài mấy xăng-ti-mét?`,
    ...numberOptions(rand, total, r, total + 3),
    hint: 'AB gồm hai đường kính. Em tính một đường kính trước.',
    solution: `Một đường kính dài ${r} × 2 = ${r * 2} (cm). AB dài ${r * 2} + ${r * 2} = ${total} (cm).`,
    visual: {
      w: 320,
      h: 190,
      label: `Hai hình tròn cạnh nhau, bán kính ${r} xăng-ti-mét. Đoạn thẳng AB đi qua tâm của cả hai hình tròn.`,
      circles: [
        { c: left, r: radius },
        { c: right, r: radius },
      ],
      lines: [{ a, b }],
      dots: [
        { at: a, name: 'A', nameAt: { x: a.x, y: y - 20 } },
        { at: left },
        { at: right },
        { at: b, name: 'B', nameAt: { x: b.x, y: y - 20 } },
      ],
    },
  };
}
