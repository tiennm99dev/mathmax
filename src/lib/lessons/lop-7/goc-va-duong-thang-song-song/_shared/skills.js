/**
 * Question generators for the chapter "Góc và đường thẳng song song". Every
 * answer is a whole number of degrees, so a drill board reads input with the
 * default natural-number reader. Angle names use the plain-text notation
 * xÔy; the angles a transversal c makes with lines a, b at A and B are
 * numbered as in Bài 9 (1 below the line and right of c, 2 above and right,
 * 3 above and left, 4 below and left).
 */

import { int, pick } from '#lib/core/drill.js';
import { PAIRS, sub } from './transversal.js';

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

/** @param {number} n */
const pairsOf = (n) => (n * (n - 1)) / 2;

/** @type {Skill} */
export const tinhChat = {
  id: 'tinh-chat',
  label: 'Bài 10. Tính chất hai đường thẳng song song',
  make(rand) {
    const lead =
      'Đường thẳng c cắt hai đường thẳng song song a, b tại A, B (đánh số góc như Bài 9).';
    if (pick(rand, ['pair', 'pair', 'ratio']) === 'ratio') {
      const i = pick(rand, [1, 2, 3, 4]);
      const j = (i % 4) + 1;
      const k = pick(rand, [2, 3, 4, 5, 8, 9]);
      const small = 180 / (k + 1);
      const big = k * small;
      const t = pick(rand, [1, 2, 3, 4]);
      const value = t % 2 === i % 2 ? big : small;
      const at = `Â${sub(t)}`;
      const known = t === i || t === j;
      const from = t % 2 === i % 2 ? i : j;
      return {
        prompt: `${lead} Biết Â${sub(i)} gấp ${k} lần Â${sub(j)}. Tính B̂${sub(t)} (độ).`,
        answer: value,
        hints: [
          `Â${sub(i)} và Â${sub(j)} là hai góc kề bù, nên tổng của chúng bằng 180°.`,
          `Từ góc ở đỉnh A, dùng cặp góc đồng vị Â${sub(t)} và B̂${sub(t)}.`,
        ],
        steps: [
          `Â${sub(i)} + Â${sub(j)} = 180° (kề bù) nên ${k + 1} · Â${sub(j)} = 180°, Â${sub(j)} = ${small}°, Â${sub(i)} = ${big}°.`,
          `${known ? '' : `${at} đối đỉnh với Â${sub(from)} nên ${at} = ${value}°. `}a // b nên B̂${sub(t)} = ${at} = ${value}° (hai góc đồng vị).`,
        ],
      };
    }
    const i = pick(rand, [1, 2, 3, 4]);
    const k = pick(rand, [1, 2, 3, 4]);
    const a = angle(rand, 25, 155);
    const same = i % 2 === k % 2;
    const answer = same ? a : 180 - a;
    const at = `Â${sub(i)}`;
    const bt = `B̂${sub(k)}`;
    const bi = `B̂${sub(i)}`;
    const name = (/** @type {keyof typeof PAIRS} */ kind) =>
      PAIRS[kind].some(([p, q]) => p === i && q === k);
    /** @type {string[]} */
    let steps;
    if (name('so-le-trong')) {
      steps = [`${at} và ${bt} là hai góc so le trong, a // b nên ${bt} = ${at} = ${a}°.`];
    } else if (name('trong-cung-phia')) {
      steps = [
        `${at} và ${bt} là hai góc trong cùng phía, a // b nên ${at} + ${bt} = 180°.`,
        `${bt} = 180° − ${a}° = ${answer}°.`,
      ];
    } else {
      steps = [`a // b nên ${bi} = ${at} = ${a}° (hai góc đồng vị).`];
      if (k !== i) {
        steps.push(
          same
            ? `${bt} và ${bi} là hai góc đối đỉnh nên ${bt} = ${a}°.`
            : `${bt} và ${bi} là hai góc kề bù nên ${bt} = 180° − ${a}° = ${answer}°.`,
        );
      }
    }
    return {
      prompt: `${lead} Biết ${at} = ${a}°. Tính ${bt} (độ).`,
      answer,
      hints: [
        `${at} ở đỉnh A, ${bt} ở đỉnh B: hai góc đó ở vị trí nào đối với nhau?`,
        'Hai đường thẳng song song: góc so le trong, góc đồng vị bằng nhau; góc trong cùng phía bù nhau.',
      ],
      steps,
    };
  },
};

/** @type {Skill} */
export const keThem = {
  id: 'ke-them',
  label: 'Bài 10. Kẻ thêm đường thẳng song song',
  make(rand) {
    const kind = pick(rand, ['sum', 'part', 'trapezoid']);
    if (kind === 'trapezoid') {
      const k = pick(rand, [2, 3, 4, 5]);
      const c = 180 / (k + 1);
      const b = k * c;
      const askB = rand() < 0.5;
      /** @type {string[]} */
      const steps = [
        'AB // CD, đường thẳng BC cắt hai đường thẳng đó, nên ABC + BCD = 180° (hai góc trong cùng phía).',
      ];
      if (askB) steps.push(`${k + 1} · BCD = 180°, BCD = ${c}°, nên ABC = ${k} · ${c}° = ${b}°.`);
      else steps.push(`ABC = ${k} · BCD nên ${k + 1} · BCD = 180°, BCD = 180° : ${k + 1} = ${c}°.`);
      return {
        prompt: `Tứ giác ABCD có AB // CD, AD vuông góc với cả AB và CD, góc ABC gấp ${k} lần góc BCD. Tính góc ${askB ? 'ABC' : 'BCD'} (độ).`,
        answer: askB ? b : c,
        hints: [
          'Hai góc ABC và BCD nằm ở vị trí nào đối với hai đường thẳng song song AB, CD và đường thẳng BC?',
          'Hai góc trong cùng phía tạo bởi một đường thẳng cắt hai đường thẳng song song có tổng 180°.',
        ],
        steps,
      };
    }
    const p = int(rand, 20, 80);
    const q = int(rand, 20, 80);
    const s = p + q;
    const lead =
      'Hai tia Ax, By song song, cùng hướng; điểm M nằm giữa hai đường thẳng chứa chúng, về phía hai tia đó.';
    const draw = "Qua M kẻ đường thẳng zz' // Ax, tia Mz' ngược hướng với Ax; khi đó zz' // By.";
    if (kind === 'sum') {
      return {
        prompt: `${lead} Biết xÂM = ${p}°, yB̂M = ${q}°. Tính AM̂B (độ).`,
        answer: s,
        hints: [
          'Qua M kẻ một đường thẳng song song với Ax.',
          'Đường thẳng đó cũng song song với By; dùng hai cặp góc so le trong.',
        ],
        steps: [
          draw,
          `AM̂z' = xÂM = ${p}° và z'M̂B = yB̂M = ${q}° (các cặp góc so le trong).`,
          `AM̂B = AM̂z' + z'M̂B = ${p}° + ${q}° = ${s}°.`,
        ],
      };
    }
    return {
      prompt: `${lead} Biết AM̂B = ${s}°, xÂM = ${p}°. Tính yB̂M (độ).`,
      answer: q,
      hints: [
        'Qua M kẻ một đường thẳng song song với Ax.',
        'AM̂B bằng tổng của hai góc so le trong với xÂM và yB̂M.',
      ],
      steps: [
        draw,
        `AM̂z' = xÂM = ${p}° (so le trong), nên z'M̂B = ${s}° − ${p}° = ${q}°.`,
        `yB̂M = z'M̂B = ${q}° (so le trong).`,
      ],
    };
  },
};

/** @type {Skill} */
export const suyLuan = {
  id: 'suy-luan',
  label: 'Bài 11. Suy luận từ định lí',
  make(rand) {
    const k = int(rand, 2, 4);
    const m = int(rand, 2, 3);
    const lead = `Có ${k} đường thẳng phân biệt đôi một song song và ${m} đường thẳng phân biệt khác, mỗi đường vuông góc với một trong ${k} đường thẳng đó.`;
    if (rand() < 0.5) {
      return {
        prompt: `${lead} Có tất cả bao nhiêu cặp đường thẳng vuông góc với nhau?`,
        answer: k * m,
        hints: [
          'Một đường thẳng vuông góc với một trong hai đường thẳng song song thì sao với đường kia?',
          `Mỗi đường trong ${m} đường vuông góc với bao nhiêu đường song song?`,
        ],
        steps: [
          `Đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường kia, nên mỗi đường trong ${m} đường vuông góc với cả ${k} đường song song.`,
          `Các đường cùng nhóm không vuông góc với nhau (chúng song song). Số cặp vuông góc: ${k} · ${m} = ${k * m}.`,
        ],
      };
    }
    const pk = pairsOf(k);
    const pm = pairsOf(m);
    return {
      prompt: `${lead} Có tất cả bao nhiêu cặp đường thẳng song song với nhau?`,
      answer: pk + pm,
      hints: [
        `Các đường trong ${m} đường kia cùng vuông góc với mọi đường song song; hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thì sao?`,
        'Đếm số cặp trong từng nhóm đường thẳng song song rồi cộng lại.',
      ],
      steps: [
        `${k} đường song song tạo thành ${pk} cặp song song.`,
        `${m} đường còn lại cùng vuông góc với một đường thẳng nên đôi một song song, tạo thành ${pm} cặp.`,
        `Hai đường ở hai nhóm khác nhau thì vuông góc, không song song. Tổng: ${pk} + ${pm} = ${pk + pm}.`,
      ],
    };
  },
};

/** Skills of the practice on page 58: Bài 10 and Bài 11. */
export const PAGE_58_SKILLS = [tinhChat, keThem, suyLuan];

/** Every skill of the chapter, for the end-of-chapter review. */
export const CHAPTER_SKILLS = [...PAGE_50_SKILLS, ...PAGE_58_SKILLS];
