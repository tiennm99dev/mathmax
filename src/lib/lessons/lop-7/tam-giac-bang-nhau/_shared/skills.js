/**
 * Question generators for the chapter "Tam giác bằng nhau". Every answer is
 * a whole number (degrees, centimetres or metres), so a drill board reads
 * input with the default natural-number reader. Angles are written in plain
 * text with a circumflex on the vertex letter (Â, B̂, Ĉ) or as "góc ABC".
 */

import { int, pick } from '#lib/core/drill.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** @type {Skill} */
export const tongBaGoc = {
  id: 'tong-ba-goc',
  label: 'Bài 12. Tổng ba góc của tam giác',
  make(rand) {
    const kind = pick(rand, ['third', 'right', 'equal', 'ratio']);
    if (kind === 'third') {
      const a = int(rand, 20, 110);
      const b = int(rand, 15, 160 - a);
      const c = 180 - a - b;
      return {
        prompt: `Tam giác ABC có Â = ${a}°, B̂ = ${b}°. Tính Ĉ (độ).`,
        answer: c,
        hints: ['Tổng ba góc của một tam giác bằng 180°.', `Ĉ = 180° − ${a}° − ${b}°.`],
        steps: [
          'Â + B̂ + Ĉ = 180° (tổng ba góc của tam giác).',
          `Ĉ = 180° − ${a}° − ${b}° = ${c}°.`,
        ],
      };
    }
    if (kind === 'right') {
      const b = int(rand, 12, 78);
      return {
        prompt: `Tam giác ABC vuông tại A có B̂ = ${b}°. Tính Ĉ (độ).`,
        answer: 90 - b,
        hints: ['Trong tam giác vuông, hai góc nhọn phụ nhau.', 'B̂ + Ĉ = 90°.'],
        steps: [
          'B̂ + Ĉ = 90° (hai góc nhọn của tam giác vuông phụ nhau).',
          `Ĉ = 90° − ${b}° = ${90 - b}°.`,
        ],
      };
    }
    if (kind === 'equal') {
      const a = 2 * int(rand, 10, 75);
      const b = (180 - a) / 2;
      return {
        prompt: `Tam giác ABC có B̂ = Ĉ và Â = ${a}°. Tính B̂ (độ).`,
        answer: b,
        hints: [`B̂ + Ĉ = 180° − ${a}°.`, 'Hai góc bằng nhau nên mỗi góc bằng một nửa tổng.'],
        steps: [`B̂ + Ĉ = 180° − ${a}° = ${180 - a}°.`, `B̂ = Ĉ nên B̂ = ${180 - a}° : 2 = ${b}°.`],
      };
    }
    const ratios = pick(rand, [
      [1, 2, 3],
      [2, 3, 4],
      [1, 1, 2],
      [3, 4, 5],
      [1, 3, 5],
      [2, 3, 7],
      [1, 2, 6],
      [4, 5, 9],
    ]);
    const total = ratios[0] + ratios[1] + ratios[2];
    const unit = 180 / total;
    const which = int(rand, 0, 2);
    const names = ['Â', 'B̂', 'Ĉ'];
    const ans = ratios[which] * unit;
    return {
      prompt: `Ba góc Â, B̂, Ĉ của tam giác ABC tỉ lệ với ${ratios.join(', ')}. Tính ${names[which]} (độ).`,
      answer: ans,
      hints: [`Đặt Â = ${ratios[0]}k, B̂ = ${ratios[1]}k, Ĉ = ${ratios[2]}k.`, `${total}k = 180°.`],
      steps: [
        `Đặt Â = ${ratios[0]}k, B̂ = ${ratios[1]}k, Ĉ = ${ratios[2]}k. Tổng ba góc: ${total}k = 180°, nên k = ${unit}°.`,
        `${names[which]} = ${ratios[which]} · ${unit}° = ${ans}°.`,
      ],
    };
  },
};

/** @type {Skill} */
export const gocNgoai = {
  id: 'goc-ngoai',
  label: 'Bài 12. Góc ngoài của tam giác',
  make(rand) {
    const kind = pick(rand, ['sum', 'back', 'adjacent']);
    const a = int(rand, 25, 95);
    const b = int(rand, 20, 150 - a);
    if (kind === 'sum') {
      return {
        prompt: `Tam giác ABC có Â = ${a}°, B̂ = ${b}°. Tia Cx là tia đối của tia CB. Tính góc ACx (độ).`,
        answer: a + b,
        hints: ['Góc ngoài của tam giác bằng tổng hai góc trong không kề với nó.'],
        steps: [
          'Góc ACx là góc ngoài tại đỉnh C, không kề với Â và B̂.',
          `Góc ACx = Â + B̂ = ${a}° + ${b}° = ${a + b}°.`,
        ],
      };
    }
    if (kind === 'back') {
      return {
        prompt: `Tam giác ABC có góc ngoài tại đỉnh B bằng ${a + b}° và Â = ${a}°. Tính Ĉ (độ).`,
        answer: b,
        hints: ['Góc ngoài tại B bằng tổng hai góc trong không kề với nó: Â + Ĉ.'],
        steps: [`Góc ngoài tại B = Â + Ĉ = ${a + b}°.`, `Ĉ = ${a + b}° − ${a}° = ${b}°.`],
      };
    }
    const ext = a + b;
    return {
      prompt: `Góc ngoài tại đỉnh C của tam giác ABC bằng ${ext}°. Tính góc ACB (độ).`,
      answer: 180 - ext,
      hints: ['Góc ngoài tại C và góc ACB là hai góc kề bù.'],
      steps: ['Góc ngoài tại C kề bù với góc ACB.', `Góc ACB = 180° − ${ext}° = ${180 - ext}°.`],
    };
  },
};

/** @type {Skill} */
export const tuongUng = {
  id: 'tuong-ung',
  label: 'Bài 13. Cạnh, góc tương ứng',
  make(rand) {
    const kind = pick(rand, ['angle', 'side', 'perimeter']);
    if (kind === 'angle') {
      const a = int(rand, 30, 100);
      const e = int(rand, 20, 150 - a);
      return {
        prompt: `Cho △ABC = △DEF, Â = ${a}°, Ê = ${e}°. Tính Ĉ (độ).`,
        answer: 180 - a - e,
        hints: ['Ghép đỉnh theo thứ tự: A ứng với D, B ứng với E, C ứng với F.', 'B̂ = Ê.'],
        steps: [
          `B̂ = Ê = ${e}° (hai góc tương ứng).`,
          `Ĉ = 180° − ${a}° − ${e}° = ${180 - a - e}°.`,
        ],
      };
    }
    if (kind === 'side') {
      const s = int(rand, 3, 15);
      // △MNP = △QRS: MN ↔ QR, NP ↔ RS, PM ↔ SQ.
      const [given, asked] = pick(rand, [
        ['QR', 'MN'],
        ['RS', 'NP'],
        ['SQ', 'PM'],
      ]);
      return {
        prompt: `Cho △MNP = △QRS và ${given} = ${s} cm. Tính ${asked} (cm).`,
        answer: s,
        hints: ['Ghép đỉnh theo thứ tự: M ứng với Q, N ứng với R, P ứng với S.'],
        steps: [`${asked} và ${given} là hai cạnh tương ứng, nên ${asked} = ${given} = ${s} cm.`],
      };
    }
    const x = int(rand, 3, 9);
    const y = int(rand, 3, 9);
    const z = int(rand, Math.abs(x - y) + 1, x + y - 1);
    return {
      prompt: `Cho △ABC = △DEF, AB = ${x} cm, BC = ${y} cm, DF = ${z} cm. Tính chu vi tam giác DEF (cm).`,
      answer: x + y + z,
      hints: ['DE = AB, EF = BC (các cạnh tương ứng).'],
      steps: [
        `DE = AB = ${x} cm, EF = BC = ${y} cm.`,
        `Chu vi △DEF = ${x} + ${y} + ${z} = ${x + y + z} (cm).`,
      ],
    };
  },
};

/** @type {Skill} */
export const ccc = {
  id: 'ccc',
  label: 'Bài 13. Trường hợp c.c.c',
  make(rand) {
    const kind = pick(rand, ['angle', 'double']);
    const x = int(rand, 25, 75);
    if (kind === 'angle') {
      const y = int(rand, 30, 150 - x);
      return {
        prompt: `Tứ giác ABCD có AB = AD, CB = CD, góc BAC = ${x}° và góc ABC = ${y}°. Tính góc ACD (độ).`,
        answer: 180 - x - y,
        hints: [
          'Chứng minh △ABC = △ADC (c.c.c): cạnh nào là cạnh chung?',
          'Góc ACD tương ứng với góc ACB.',
        ],
        steps: [
          'AB = AD, CB = CD, AC chung nên △ABC = △ADC (c.c.c).',
          `Góc ACB = 180° − ${x}° − ${y}° = ${180 - x - y}°.`,
          `Góc ACD = góc ACB = ${180 - x - y}° (hai góc tương ứng).`,
        ],
      };
    }
    return {
      prompt: `Tứ giác ABCD có AB = AD, CB = CD (B và D nằm khác phía đối với AC). Biết góc BAC = ${x}°. Tính góc BAD (độ).`,
      answer: 2 * x,
      hints: ['Chứng minh △ABC = △ADC (c.c.c), suy ra góc DAC = góc BAC.'],
      steps: [
        'AB = AD, CB = CD, AC chung nên △ABC = △ADC (c.c.c).',
        `Góc DAC = góc BAC = ${x}° (hai góc tương ứng).`,
        `Góc BAD = góc BAC + góc CAD = ${x}° + ${x}° = ${2 * x}°.`,
      ],
    };
  },
};

/** @type {Skill} */
export const cgc = {
  id: 'cgc',
  label: 'Bài 14. Trường hợp c.g.c',
  make(rand) {
    const kind = pick(rand, ['midpoint', 'angle', 'third']);
    if (kind === 'midpoint') {
      const s = int(rand, 3, 20);
      return {
        prompt: `Hai đoạn thẳng AB và CD cắt nhau tại O, O là trung điểm của mỗi đoạn. Biết AC = ${s} cm. Tính BD (cm).`,
        answer: s,
        hints: ['Xét △OAC và △OBD; hai góc AOC và BOD ở vị trí nào?'],
        steps: [
          'OA = OB, góc AOC = góc BOD (đối đỉnh), OC = OD nên △OAC = △OBD (c.g.c).',
          `BD = AC = ${s} cm (hai cạnh tương ứng).`,
        ],
      };
    }
    const a = int(rand, 20, 70);
    const b = int(rand, 30, 150 - a);
    if (kind === 'angle') {
      return {
        prompt: `Hai điểm B, D nằm khác phía đối với AC, AB = AD và góc BAC = góc DAC = ${a}°. Biết góc ABC = ${b}°. Tính góc ACD (độ).`,
        answer: 180 - a - b,
        hints: [
          'AB = AD, góc BAC = góc DAC, AC chung: △ABC = △ADC (c.g.c).',
          'Góc ACD tương ứng với góc ACB.',
        ],
        steps: [
          '△ABC = △ADC (c.g.c) vì AB = AD, góc BAC = góc DAC, AC chung.',
          `Góc ACB = 180° − ${a}° − ${b}° = ${180 - a - b}°.`,
          `Góc ACD = góc ACB = ${180 - a - b}°.`,
        ],
      };
    }
    return {
      prompt: `△ABC và △DEF có AB = DE, B̂ = Ê, BC = EF. Biết Â = ${a}°, Ê = ${b}°. Tính F̂ (độ).`,
      answer: 180 - a - b,
      hints: ['△ABC = △DEF (c.g.c), nên D̂ = Â.', 'Dùng tổng ba góc của tam giác DEF.'],
      steps: [
        '△ABC = △DEF (c.g.c), nên D̂ = Â.',
        `F̂ = 180° − D̂ − Ê = 180° − ${a}° − ${b}° = ${180 - a - b}°.`,
      ],
    };
  },
};

/** @type {Skill} */
export const gcg = {
  id: 'gcg',
  label: 'Bài 14. Trường hợp g.c.g',
  make(rand) {
    const kind = pick(rand, ['side', 'angle', 'nonadjacent']);
    const a = int(rand, 25, 80);
    const b = int(rand, 25, 150 - a);
    if (kind === 'side') {
      const s = int(rand, 3, 15);
      return {
        prompt: `Hai điểm C, D nằm khác phía đối với AB, góc CAB = góc DAB và góc CBA = góc DBA. Biết BC = ${s} cm. Tính BD (cm).`,
        answer: s,
        hints: ['Cạnh AB chung, hai góc kề nó bằng nhau: g.c.g.'],
        steps: [
          '△ABC = △ABD (g.c.g) vì góc CAB = góc DAB, AB chung, góc CBA = góc DBA.',
          `BD = BC = ${s} cm (hai cạnh tương ứng).`,
        ],
      };
    }
    if (kind === 'angle') {
      return {
        prompt: `Hai điểm C, D nằm khác phía đối với AB, góc CAB = góc DAB = ${a}°, góc CBA = góc DBA = ${b}°. Tính góc ADB (độ).`,
        answer: 180 - a - b,
        hints: ['△ABC = △ABD (g.c.g), nên góc ADB = góc ACB.', 'Tính góc ACB bằng tổng ba góc.'],
        steps: [
          '△ABC = △ABD (g.c.g), nên góc ADB = góc ACB.',
          `Góc ADB = 180° − ${a}° − ${b}° = ${180 - a - b}°.`,
        ],
      };
    }
    const s = int(rand, 3, 15);
    return {
      prompt: `△ABC và △MNP có Â = M̂ = ${a}°, B̂ = N̂ = ${b}°, AC = MP = ${s} cm. Hai góc kề cạnh AC là Â và Ĉ. Tính Ĉ (độ).`,
      answer: 180 - a - b,
      hints: ['Cạnh AC kề với hai góc nào? Góc thứ hai cần tính từ tổng ba góc.'],
      steps: [
        `Ĉ = 180° − ${a}° − ${b}° = ${180 - a - b}°, tương tự P̂ = ${180 - a - b}°.`,
        `Â = M̂, AC = MP, Ĉ = P̂ = ${180 - a - b}° nên △ABC = △MNP (g.c.g).`,
      ],
    };
  },
};

/** @type {Skill} */
export const thucTe = {
  id: 'thuc-te',
  label: 'Vận dụng: đo khoảng cách',
  make(rand) {
    const kind = pick(rand, ['pond', 'river']);
    const d = int(rand, 12, 95);
    if (kind === 'pond') {
      return {
        prompt: `Để đo khoảng cách AB qua một cái ao, người ta chọn điểm O rồi lấy C, D sao cho O là trung điểm của AC và của BD. Đo được CD = ${d} m. Tính AB (m).`,
        answer: d,
        hints: ['Xét △OAB và △OCD: hai cặp cạnh bằng nhau và một cặp góc đối đỉnh.'],
        steps: [
          'OA = OC, góc AOB = góc COD (đối đỉnh), OB = OD nên △OAB = △OCD (c.g.c).',
          `AB = CD = ${d} m (hai cạnh tương ứng).`,
        ],
      };
    }
    return {
      prompt: `Để đo chiều rộng AB của một con sông (A ở bờ bên kia), từ B kẻ đường thẳng vuông góc với AB, trên đó lấy C, D sao cho C là trung điểm của BD. Từ D kẻ đường vuông góc với BD, cắt đường thẳng AC tại E. Đo được DE = ${d} m. Tính AB (m).`,
      answer: d,
      hints: [
        'Xét △ABC và △EDC: góc nào vuông, cạnh nào bằng nhau, góc nào đối đỉnh?',
        'Cạnh BC kề với góc B và góc ACB; cạnh DC kề với góc D và góc ECD.',
      ],
      steps: [
        'Góc ABC = góc EDC = 90°, BC = DC, góc ACB = góc ECD (đối đỉnh), nên △ABC = △EDC (g.c.g).',
        `AB = ED = ${d} m (hai cạnh tương ứng).`,
      ],
    };
  },
};

/** @type {Skill} */
export const tamGiacVuong = {
  id: 'tam-giac-vuong',
  label: 'Bài 15. Tam giác vuông bằng nhau',
  make(rand) {
    const kind = pick(rand, ['altitude', 'bisector', 'hyp-angle', 'hyp-leg']);
    if (kind === 'altitude') {
      const h = int(rand, 2, 15);
      return {
        prompt: `Tam giác ABC có AB = AC, kẻ AH vuông góc với BC (H thuộc BC). Biết BC = ${2 * h} cm. Tính HB (cm).`,
        answer: h,
        hints: [
          'Xét hai tam giác vuông AHB và AHC: cạnh huyền nào bằng nhau, cạnh góc vuông nào chung?',
          'Hai tam giác bằng nhau cho HB = HC.',
        ],
        steps: [
          'Hai tam giác vuông AHB, AHC có cạnh huyền AB = AC, cạnh góc vuông AH chung, nên △AHB = △AHC (cạnh huyền - cạnh góc vuông).',
          `Suy ra HB = HC, nên HB = BC : 2 = ${2 * h} : 2 = ${h} (cm).`,
        ],
      };
    }
    if (kind === 'bisector') {
      const a = int(rand, 10, 40);
      return {
        prompt: `M nằm trên tia phân giác của góc xOy = ${2 * a}°, MA vuông góc với Ox (A thuộc Ox), MB vuông góc với Oy (B thuộc Oy). Tính góc OMB (độ).`,
        answer: 90 - a,
        hints: [
          'Góc BOM bằng một nửa góc xOy.',
          'Trong tam giác OBM vuông tại B, hai góc nhọn phụ nhau.',
        ],
        steps: [
          `Góc BOM = ${2 * a}° : 2 = ${a}° (Ot là tia phân giác).`,
          `Tam giác OBM vuông tại B nên góc OMB = 90° − ${a}° = ${90 - a}°.`,
        ],
      };
    }
    if (kind === 'hyp-angle') {
      const b = int(rand, 15, 75);
      return {
        prompt: `△ABC vuông tại A và △DEF vuông tại D có BC = EF, B̂ = Ê = ${b}°. Tính F̂ (độ).`,
        answer: 90 - b,
        hints: [
          'Hai tam giác vuông bằng nhau theo trường hợp cạnh huyền - góc nhọn.',
          'Trong tam giác DEF vuông tại D, Ê + F̂ = 90°.',
        ],
        steps: [
          '△ABC = △DEF (cạnh huyền - góc nhọn), nên F̂ = Ĉ.',
          `Trong tam giác DEF vuông tại D: F̂ = 90° − ${b}° = ${90 - b}°.`,
        ],
      };
    }
    const c = int(rand, 5, 20);
    const s = int(rand, 2, c - 1);
    return {
      prompt: `△ABC vuông tại A và △DEF vuông tại D có BC = EF = ${c} cm, AB = DE. Biết AC = ${s} cm. Tính DF (cm).`,
      answer: s,
      hints: [
        'BC, EF là hai cạnh huyền; AB, DE là hai cạnh góc vuông.',
        'Dùng trường hợp cạnh huyền - cạnh góc vuông, rồi tìm cạnh tương ứng với AC.',
      ],
      steps: [
        '△ABC = △DEF (cạnh huyền BC = EF, cạnh góc vuông AB = DE).',
        `DF và AC là hai cạnh tương ứng, nên DF = AC = ${s} cm.`,
      ],
    };
  },
};

/** @type {Skill} */
export const tamGiacCan = {
  id: 'tam-giac-can',
  label: 'Bài 16. Tam giác cân, tam giác đều',
  make(rand) {
    const kind = pick(rand, ['base', 'apex', 'perimeter', 'sixty', 'exterior']);
    if (kind === 'base') {
      const a = 2 * int(rand, 10, 80);
      const b = (180 - a) / 2;
      return {
        prompt: `Tam giác ABC cân tại A có góc ở đỉnh Â = ${a}°. Tính góc ở đáy B̂ (độ).`,
        answer: b,
        hints: ['Trong tam giác cân, hai góc ở đáy bằng nhau.', `B̂ + Ĉ = 180° − ${a}°.`],
        steps: [`B̂ + Ĉ = 180° − ${a}° = ${180 - a}° và B̂ = Ĉ.`, `B̂ = ${180 - a}° : 2 = ${b}°.`],
      };
    }
    if (kind === 'apex') {
      const b = int(rand, 20, 85);
      return {
        prompt: `Tam giác ABC cân tại A có góc ở đáy B̂ = ${b}°. Tính góc ở đỉnh Â (độ).`,
        answer: 180 - 2 * b,
        hints: ['Góc Ĉ bằng góc nào?', 'Dùng tổng ba góc của tam giác.'],
        steps: [`Ĉ = B̂ = ${b}° (hai góc ở đáy).`, `Â = 180° − ${b}° − ${b}° = ${180 - 2 * b}°.`],
      };
    }
    if (kind === 'perimeter') {
      const s = int(rand, 3, 15);
      const t = int(rand, 2, 2 * s - 1);
      return {
        prompt: `Tam giác ABC cân tại A có cạnh bên AB = ${s} cm và cạnh đáy BC = ${t} cm. Tính chu vi tam giác ABC (cm).`,
        answer: 2 * s + t,
        hints: ['Cạnh bên AC bằng cạnh nào?'],
        steps: [`AC = AB = ${s} cm.`, `Chu vi = ${s} + ${s} + ${t} = ${2 * s + t} (cm).`],
      };
    }
    if (kind === 'sixty') {
      const s = int(rand, 3, 20);
      return {
        prompt: `Tam giác ABC cân tại A có Â = 60° và BC = ${s} cm. Tính AB (cm).`,
        answer: s,
        hints: ['Tính hai góc ở đáy B̂ và Ĉ.', 'Tam giác có ba góc bằng nhau là tam giác gì?'],
        steps: [
          'B̂ = Ĉ = (180° − 60°) : 2 = 60°, nên ba góc bằng nhau.',
          `Tam giác ABC đều, nên AB = BC = ${s} cm.`,
        ],
      };
    }
    const e = 2 * int(rand, 20, 85);
    return {
      prompt: `Tam giác ABC cân tại A có góc ngoài tại đỉnh A bằng ${e}°. Tính B̂ (độ).`,
      answer: e / 2,
      hints: ['Góc ngoài tại A bằng tổng hai góc trong không kề với nó: B̂ + Ĉ.', 'B̂ = Ĉ.'],
      steps: [`B̂ + Ĉ = ${e}° (góc ngoài tại A) và B̂ = Ĉ.`, `B̂ = ${e}° : 2 = ${e / 2}°.`],
    };
  },
};

/** @type {Skill} */
export const trungTruc = {
  id: 'trung-truc',
  label: 'Bài 16. Đường trung trực',
  make(rand) {
    const kind = pick(rand, ['distance', 'segment', 'perimeter', 'angle']);
    const s = int(rand, 3, 15);
    if (kind === 'distance') {
      return {
        prompt: `Điểm M nằm trên đường trung trực của đoạn thẳng AB và MA = ${s} cm. Tính MB (cm).`,
        answer: s,
        hints: ['Điểm nằm trên đường trung trực của một đoạn thẳng thì cách đều hai mút.'],
        steps: [`M cách đều A và B, nên MB = MA = ${s} cm.`],
      };
    }
    if (kind === 'segment') {
      return {
        prompt: `Đường thẳng d là đường trung trực của đoạn thẳng AB, cắt AB tại O. Biết OA = ${s} cm. Tính AB (cm).`,
        answer: 2 * s,
        hints: ['Đường trung trực đi qua trung điểm của đoạn thẳng.'],
        steps: [`O là trung điểm của AB nên OB = OA = ${s} cm.`, `AB = 2 · ${s} = ${2 * s} (cm).`],
      };
    }
    if (kind === 'perimeter') {
      const t = int(rand, 2, 2 * s - 1);
      return {
        prompt: `Điểm M nằm trên đường trung trực của đoạn thẳng AB (M không thuộc AB), MA = ${s} cm, AB = ${t} cm. Tính chu vi tam giác MAB (cm).`,
        answer: 2 * s + t,
        hints: ['M cách đều A và B: MB bằng bao nhiêu?'],
        steps: [`MB = MA = ${s} cm.`, `Chu vi = ${s} + ${s} + ${t} = ${2 * s + t} (cm).`],
      };
    }
    const b = int(rand, 20, 85);
    return {
      prompt: `Điểm M nằm trên đường trung trực của đoạn thẳng AB (M không thuộc AB) và góc MAB = ${b}°. Tính góc AMB (độ).`,
      answer: 180 - 2 * b,
      hints: [
        'MA = MB nên tam giác MAB cân tại M.',
        'Trong tam giác cân, hai góc ở đáy bằng nhau.',
      ],
      steps: [
        `MA = MB nên tam giác MAB cân tại M, góc MBA = góc MAB = ${b}°.`,
        `Góc AMB = 180° − ${b}° − ${b}° = ${180 - 2 * b}°.`,
      ],
    };
  },
};

export const PAGE_68_SKILLS = [tongBaGoc, gocNgoai, tuongUng, ccc];
export const PAGE_74_SKILLS = [cgc, gcg, thucTe];
export const PAGE_85_SKILLS = [tamGiacVuong, tamGiacCan, trungTruc];
/** One skill per question family of the chapter, in book order. */
export const CHAPTER_SKILLS = [
  tongBaGoc,
  gocNgoai,
  tuongUng,
  ccc,
  cgc,
  gcg,
  thucTe,
  tamGiacVuong,
  tamGiacCan,
  trungTruc,
];
