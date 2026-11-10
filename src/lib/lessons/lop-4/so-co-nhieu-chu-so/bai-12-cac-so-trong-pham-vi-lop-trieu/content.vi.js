/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lớp triệu gồm hàng triệu, hàng chục triệu, hàng trăm triệu. Đọc, viết số đến lớp triệu bằng cách tách số thành từng lớp và đọc từ trái sang phải.',
  intro:
    'Năm 2020, Việt Nam có 97 338 579 người. Số này rất lớn! Em tách số thành từng lớp để đọc cho dễ nhé.',
  objectives: [
    'Biết lớp triệu gồm hàng triệu, hàng chục triệu, hàng trăm triệu.',
    'Đọc, viết được các số trong phạm vi lớp triệu.',
    'Nêu được hàng, lớp và giá trị của chữ số trong số lớn.',
  ],
  sections: [
    {
      heading: 'Hàng triệu, chục triệu, trăm triệu',
      blocks: [
        {
          type: 'table',
          head: ['Đếm', 'Viết số', 'Đọc số'],
          rows: [
            ['10 trăm nghìn', '1 000 000', 'một triệu'],
            ['10 triệu', '10 000 000', 'mười triệu (một chục triệu)'],
            ['10 chục triệu', '100 000 000', 'một trăm triệu'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hàng triệu, hàng chục triệu, hàng trăm triệu hợp thành lớp triệu.',
        },
        {
          type: 'table',
          head: ['Lớp triệu', 'Lớp nghìn', 'Lớp đơn vị'],
          rows: [
            [
              'trăm triệu, chục triệu, triệu',
              'trăm nghìn, chục nghìn, nghìn',
              'trăm, chục, đơn vị',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Đọc, viết số lớn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn đọc số, em tách số thành từng lớp. Em đọc từ trái sang phải: đọc mỗi lớp như số có ba chữ số rồi thêm tên lớp.',
        },
        {
          type: 'p',
          text: '342 157 413 tách thành 342 | 157 | 413. Đọc là: ba trăm bốn mươi hai triệu một trăm năm mươi bảy nghìn bốn trăm mười ba.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Lớp có ba chữ số 0 thì không đọc: 2 000 001 đọc là hai triệu không trăm linh một.',
        },
        {
          type: 'p',
          text: 'Em viết số từ lớp triệu đến lớp đơn vị. Giữa hai lớp để một khoảng trống: 304 028 102.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đọc số theo từng lớp',
    instruction:
      'Em chạm vào từng lớp, từ trái sang phải. Mỗi lần chạm, em đọc thêm một phần của số. Đọc xong, bấm "Số khác".',
  },
  examples: [
    {
      problem: 'Đọc số 126 476 461 (số dân Nhật Bản năm 2020).',
      steps: [
        'Tách thành các lớp: 126 | 476 | 461.',
        'Lớp triệu: một trăm hai mươi sáu triệu.',
        'Lớp nghìn: bốn trăm bảy mươi sáu nghìn.',
        'Lớp đơn vị: bốn trăm sáu mươi mốt.',
      ],
      answer: 'Một trăm hai mươi sáu triệu bốn trăm bảy mươi sáu nghìn bốn trăm sáu mươi mốt.',
    },
    {
      problem: 'Viết số 109 140 903 thành tổng các hàng.',
      steps: [
        'Số gồm 1 trăm triệu, 0 chục triệu, 9 triệu, 1 trăm nghìn, 4 chục nghìn, 0 nghìn, 9 trăm, 0 chục, 3 đơn vị.',
        'Hàng nào là 0 thì không viết.',
      ],
      answer: '109 140 903 = 100 000 000 + 9 000 000 + 100 000 + 40 000 + 900 + 3.',
    },
    {
      problem: 'Trong số 839 000 038, chữ số 3 đầu tiên ở hàng nào, lớp nào?',
      steps: [
        'Tách lớp: 839 | 000 | 038.',
        'Chữ số 3 đầu tiên ở lớp triệu, đứng thứ hai trong lớp: hàng chục triệu.',
      ],
      answer: 'Hàng chục triệu, lớp triệu.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Em nối số với cách đọc.',
      left: ['97 338 579', '3 045 302', '2 000 001', '304 028 102'],
      right: [
        'Chín mươi bảy triệu ba trăm ba mươi tám nghìn năm trăm bảy mươi chín',
        'Ba triệu không trăm bốn mươi lăm nghìn ba trăm linh hai',
        'Hai triệu không trăm linh một',
        'Ba trăm linh bốn triệu không trăm hai mươi tám nghìn một trăm linh hai',
        'Hai triệu không trăm mười',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tách mỗi số thành từng lớp rồi đọc từ trái sang phải.'],
      solution:
        '97 338 579: chín mươi bảy triệu ba trăm ba mươi tám nghìn năm trăm bảy mươi chín. 3 045 302: ba triệu không trăm bốn mươi lăm nghìn ba trăm linh hai. 2 000 001: hai triệu không trăm linh một. 304 028 102: ba trăm linh bốn triệu không trăm hai mươi tám nghìn một trăm linh hai.',
    },
    {
      type: 'number',
      prompt:
        'Em viết số: hai trăm bảy mươi ba triệu năm trăm hai mươi ba nghìn sáu trăm mười lăm.',
      answer: 273523615,
      hints: ['Lớp triệu là 273, lớp nghìn là 523.', 'Lớp đơn vị là sáu trăm mười lăm: 615.'],
      solution: 'Viết lần lượt ba lớp: 273 | 523 | 615. Số đó là 273 523 615.',
    },
    {
      type: 'number',
      prompt: 'Em viết số gồm 3 triệu, 4 chục nghìn, 5 nghìn, 3 trăm và 2 đơn vị.',
      answer: 3045302,
      hints: ['Hàng trăm nghìn và hàng chục là 0.'],
      solution:
        '3 triệu, 0 trăm nghìn, 4 chục nghìn, 5 nghìn, 3 trăm, 0 chục, 2 đơn vị: viết là 3 045 302.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 63 782 910, chữ số 8 ở hàng nào?',
      options: ['Hàng chục nghìn', 'Hàng trăm nghìn', 'Hàng nghìn', 'Hàng triệu'],
      answer: 0,
      hints: ['Tách lớp: 63 | 782 | 910. Chữ số 8 ở lớp nghìn.'],
      solution: 'Lớp nghìn là 782: 7 hàng trăm nghìn, 8 hàng chục nghìn, 2 hàng nghìn.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 239 111 003, chữ số 2 thuộc lớp nào?',
      options: ['Lớp triệu', 'Lớp nghìn', 'Lớp đơn vị'],
      answer: 0,
      hints: ['Tách lớp: 239 | 111 | 003.'],
      solution: 'Chữ số 2 ở hàng trăm triệu, thuộc lớp triệu.',
    },
    {
      type: 'number',
      prompt: 'Giá trị của chữ số 5 trong số 52 804 246 là bao nhiêu?',
      answer: 50000000,
      hints: ['Chữ số 5 ở hàng chục triệu.', 'Giữ chữ số 5, các chữ số bên phải đổi thành 0.'],
      solution: 'Chữ số 5 ở hàng chục triệu, giá trị là 50 000 000.',
    },
    {
      type: 'number',
      prompt: 'Mười chục triệu là bao nhiêu? Em viết số.',
      answer: 100000000,
      hints: ['10 chục triệu là 1 trăm triệu.'],
      solution: '10 chục triệu = 1 trăm triệu = 100 000 000.',
    },
    {
      type: 'choice',
      prompt: 'Số 304 028 102 có lớp nghìn gồm những chữ số nào?',
      options: ['0, 2, 8', '3, 0, 4', '1, 0, 2', '4, 0, 2'],
      answer: 0,
      hints: ['Tách lớp từ phải sang trái, mỗi lớp ba chữ số.'],
      solution: 'Tách lớp: 304 | 028 | 102. Lớp nghìn là 028: các chữ số 0, 2, 8.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các hàng của lớp triệu từ trái sang phải, như khi viết số.',
      items: ['Hàng triệu', 'Hàng trăm triệu', 'Hàng chục triệu'],
      answer: [1, 2, 0],
      hints: ['Hàng lớn hơn đứng bên trái.'],
      solution: 'Hàng trăm triệu, hàng chục triệu, hàng triệu.',
    },
  ],
  takeaways: [
    '10 trăm nghìn là 1 triệu, 10 triệu là 1 chục triệu, 10 chục triệu là 1 trăm triệu.',
    'Lớp triệu gồm hàng triệu, hàng chục triệu, hàng trăm triệu.',
    'Đọc số lớn: tách lớp, đọc từ trái sang phải, đọc mỗi lớp kèm tên lớp.',
  ],
};
