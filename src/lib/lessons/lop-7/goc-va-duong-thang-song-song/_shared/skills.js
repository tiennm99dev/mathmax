/**
 * Question generators for the chapter "Góc và đường thẳng song song". Every
 * answer is a whole number of degrees, so a drill board reads input with the
 * default natural-number reader. Angle names use the plain-text notation
 * xÔy; the angles a transversal c makes with lines a, b at A and B are
 * numbered as in Bài 9 (1 below the line and right of c, 2 above and right,
 * 3 above and left, 4 below and left).
 */

import { int, pick } from '#lib/core/drill.js';
import { sub } from './transversal.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A whole angle from lo to hi that is not a right angle.
 * @param {() => number} rand @param {number} lo @param {number} hi
 */
function angle(rand, lo, hi) {
  for (;;) {
    const a = int(rand, lo, hi);
    if (a !== 90) return a;
  }
}

/** @type {Skill} */
export const keBu = {
  id: 'ke-bu',
  label: 'Bài 8. Hai góc kề bù',
  make(rand) {
    const kind = pick(rand, ['one', 'times', 'diff']);
    if (kind === 'one') {
      const a = angle(rand, 15, 165);
      return {
        prompt: `Hai góc xÔy và yÔz kề bù, xÔy = ${a}°. Tính yÔz (độ).`,
        answer: 180 - a,
        hints: ['Hai góc kề bù có tổng số đo bằng 180°.', `yÔz = 180° − ${a}°.`],
        steps: [`xÔy + yÔz = 180° (hai góc kề bù).`, `yÔz = 180° − ${a}° = ${180 - a}°.`],
      };
    }
    if (kind === 'times') {
      const k = pick(rand, [2, 3, 4, 5, 8, 9]);
      const small = 180 / (k + 1);
      return {
        prompt: `Hai góc kề bù, góc lớn gấp ${k} lần góc nhỏ. Tính góc nhỏ (độ).`,
        answer: small,
        hints: [`Gọi góc nhỏ là x thì góc lớn là ${k}x, và x + ${k}x = 180°.`, `${k + 1}x = 180°.`],
        steps: [
          `Gọi góc nhỏ là x, góc lớn là ${k}x. Hai góc kề bù nên x + ${k}x = 180°.`,
          `${k + 1}x = 180°, x = 180° : ${k + 1} = ${small}°.`,
        ],
      };
    }
    const d = 10 * int(rand, 1, 10);
    const big = (180 + d) / 2;
    return {
      prompt: `Hai góc kề bù hơn kém nhau ${d}°. Tính góc lớn (độ).`,
      answer: big,
      hints: ['Tổng hai góc là 180°, hiệu hai góc đã biết.', 'Góc lớn = (tổng + hiệu) : 2.'],
      steps: [
        `Tổng hai góc kề bù là 180°, hiệu là ${d}°.`,
        `Góc lớn = (180° + ${d}°) : 2 = ${big}°.`,
      ],
    };
  },
};

/** @type {Skill} */
export const doiDinh = {
  id: 'doi-dinh',
  label: 'Bài 8. Hai góc đối đỉnh',
  make(rand) {
    const kind = pick(rand, ['vertical', 'adjacent', 'sum']);
    if (kind === 'sum') {
      const s = 2 * angle(rand, 10, 170);
      const other = (360 - s) / 2;
      return {
        prompt: `Hai đường thẳng cắt nhau tạo thành bốn góc. Tổng của hai góc đối đỉnh là ${s}°. Tính mỗi góc trong hai góc còn lại (độ).`,
        answer: other,
        hints: [
          `Hai góc đối đỉnh bằng nhau, nên mỗi góc bằng ${s}° : 2.`,
          'Mỗi góc còn lại kề bù với một trong hai góc đó.',
        ],
        steps: [
          `Mỗi góc trong hai góc đối đỉnh bằng ${s}° : 2 = ${s / 2}°.`,
          `Mỗi góc còn lại kề bù với góc ${s / 2}°, nên bằng 180° − ${s / 2}° = ${other}°.`,
        ],
      };
    }
    const a = angle(rand, 20, 160);
    if (kind === 'vertical') {
      return {
        prompt: `Hai đường thẳng mn và pq cắt nhau tại O, mÔp = ${a}°. Tính nÔq (độ).`,
        answer: a,
        hints: ['On là tia đối của Om, Oq là tia đối của Op. Hai góc mÔp và nÔq ở vị trí nào?'],
        steps: [`mÔp và nÔq là hai góc đối đỉnh nên nÔq = mÔp = ${a}°.`],
      };
    }
    return {
      prompt: `Hai đường thẳng mn và pq cắt nhau tại O, mÔp = ${a}°. Tính pÔn (độ).`,
      answer: 180 - a,
      hints: [
        'mÔp và pÔn có chung cạnh Op, hai cạnh Om, On là hai tia đối nhau.',
        'Hai góc kề bù có tổng 180°.',
      ],
      steps: [`mÔp và pÔn kề bù nên pÔn = 180° − ${a}° = ${180 - a}°.`],
    };
  },
};

/** @type {Skill} */
export const phanGiac = {
  id: 'phan-giac',
  label: 'Bài 8. Tia phân giác',
  make(rand) {
    const kind = pick(rand, ['half', 'double', 'outside']);
    const h = int(rand, 12, 85);
    if (kind === 'half') {
      return {
        prompt: `Ot là tia phân giác của xÔy, xÔy = ${2 * h}°. Tính xÔt (độ).`,
        answer: h,
        hints: ['Tia phân giác chia góc thành hai góc bằng nhau.'],
        steps: [`xÔt = tÔy = xÔy : 2 = ${2 * h}° : 2 = ${h}°.`],
      };
    }
    if (kind === 'double') {
      return {
        prompt: `Ot là tia phân giác của xÔy, xÔt = ${h}°. Tính xÔy (độ).`,
        answer: 2 * h,
        hints: ['Hai góc xÔt và tÔy bằng nhau và cộng lại thành xÔy.'],
        steps: [`tÔy = xÔt = ${h}°, nên xÔy = 2 · ${h}° = ${2 * h}°.`],
      };
    }
    const a = 2 * h;
    return {
      prompt: `Cho xÔy = ${a}°, Ox' là tia đối của tia Ox, Om là tia phân giác của xÔy. Tính mÔx' (độ).`,
      answer: 180 - h,
      hints: [`Om là tia phân giác nên xÔm = ${a}° : 2.`, "xÔm và mÔx' là hai góc kề bù."],
      steps: [
        `xÔm = ${a}° : 2 = ${h}° (Om là tia phân giác).`,
        `xÔm và mÔx' kề bù nên mÔx' = 180° − ${h}° = ${180 - h}°.`,
      ],
    };
  },
};

/** @type {Skill} */
export const songSong = {
  id: 'song-song',
  label: 'Bài 9. Dấu hiệu nhận biết song song',
  make(rand) {
    const i = pick(rand, [1, 2, 3, 4]);
    const k = pick(
      rand,
      [1, 2, 3, 4].filter((n) => n !== i),
    );
    const a = angle(rand, 25, 155);
    const same = i % 2 === k % 2;
    const answer = same ? a : 180 - a;
    const at = `Â${sub(i)}`;
    const bt = `B̂${sub(k)}`;
    const bi = `B̂${sub(i)}`;
    /** @type {string[]} */
    const steps = [
      `Để a // b, chỉ cần một cặp góc đồng vị bằng nhau: ${bi} = ${at} = ${a}°.`,
      same
        ? `${bt} và ${bi} là hai góc đối đỉnh nên ${bt} = ${a}°.`
        : `${bt} và ${bi} là hai góc kề bù nên ${bt} = 180° − ${a}° = ${180 - a}°.`,
    ];
    return {
      prompt: `Đường thẳng c cắt hai đường thẳng a, b tại A, B (đánh số góc như Bài 9). Biết ${at} = ${a}°. Để a // b thì ${bt} phải bằng bao nhiêu độ?`,
      answer,
      hints: [
        `Khi a // b, góc ${bi} đồng vị với ${at} phải bằng ${a}°.`,
        `Tìm ${bt} từ ${bi}: hai góc ở cùng đỉnh B là đối đỉnh (bằng nhau) hoặc kề bù (tổng 180°).`,
      ],
      steps,
    };
  },
};

/** Skills of the practice on page 50: Bài 8 and Bài 9. */
export const PAGE_50_SKILLS = [keBu, doiDinh, phanGiac, songSong];
