/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hàng và lớp: lớp đơn vị gồm hàng đơn vị, hàng chục, hàng trăm; lớp nghìn gồm hàng nghìn, hàng chục nghìn, hàng trăm nghìn. Giá trị của chữ số phụ thuộc vào hàng của nó.',
  intro:
    'Trong số 653 720, chữ số 5 có giá trị là 5 hay 50 000? Muốn biết, em cần biết chữ số đó ở hàng nào, lớp nào.',
  objectives: [
    'Biết lớp đơn vị và lớp nghìn gồm những hàng nào.',
    'Nêu được hàng, lớp của một chữ số trong số.',
    'Nêu được giá trị của chữ số theo vị trí của nó.',
  ],
  sections: [
    {
      heading: 'Lớp đơn vị và lớp nghìn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hàng đơn vị, hàng chục, hàng trăm hợp thành lớp đơn vị.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hàng nghìn, hàng chục nghìn, hàng trăm nghìn hợp thành lớp nghìn.',
        },
        {
          type: 'table',
          head: ['Trăm nghìn', 'Chục nghìn', 'Nghìn', 'Trăm', 'Chục', 'Đơn vị'],
          rows: [
            ['6', '5', '3', '7', '2', '0'],
            ['Lớp nghìn', 'Lớp nghìn', 'Lớp nghìn', 'Lớp đơn vị', 'Lớp đơn vị', 'Lớp đơn vị'],
          ],
          caption: 'Số 653 720',
        },
        {
          type: 'p',
          text: 'Khi viết số, em để một khoảng trống giữa hai lớp: 653 720. Ba chữ số bên phải là lớp đơn vị.',
        },
      ],
    },
    {
      heading: 'Giá trị của chữ số',
      blocks: [
        {
          type: 'p',
          text: 'Cùng một chữ số, đứng ở hàng khác nhau thì có giá trị khác nhau.',
        },
        {
          type: 'table',
          head: ['Số', 'Chữ số 5 ở hàng', 'Giá trị'],
          rows: [
            ['653 720', 'chục nghìn', '50 000'],
            ['325 104', 'nghìn', '5 000'],
            ['120 458', 'chục', '50'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Giá trị của chữ số: em giữ chữ số đó, các chữ số bên phải nó đổi thành 0.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chạm chữ số, tìm hàng và lớp',
    instruction:
      'Em đọc câu hỏi rồi chạm vào một chữ số. Em sẽ biết chữ số đó ở hàng nào, lớp nào và có giá trị bao nhiêu. Bấm "Tách lớp" để tô màu hai lớp.',
  },
  examples: [
    {
      problem: 'Trong số 653 720, chữ số 5 ở hàng nào, lớp nào? Giá trị là bao nhiêu?',
      steps: [
        'Đếm hàng từ phải sang trái: 0 hàng đơn vị, 2 hàng chục, 7 hàng trăm, 3 hàng nghìn, 5 hàng chục nghìn.',
        'Hàng chục nghìn thuộc lớp nghìn.',
        'Giữ chữ số 5, các chữ số bên phải đổi thành 0: 50 000.',
      ],
      answer: 'Chữ số 5 ở hàng chục nghìn, lớp nghìn; giá trị là 50 000.',
    },
    {
      problem: 'Viết các chữ số thuộc lớp nghìn và lớp đơn vị của số 470 169.',
      steps: [
        'Tách số thành hai lớp, mỗi lớp ba chữ số, tính từ phải sang: 470 | 169.',
        'Ba chữ số bên trái thuộc lớp nghìn, ba chữ số bên phải thuộc lớp đơn vị.',
      ],
      answer: 'Lớp nghìn: 4, 7, 0. Lớp đơn vị: 1, 6, 9.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Lớp nghìn gồm những hàng nào?',
      options: [
        'Hàng nghìn, hàng chục nghìn, hàng trăm nghìn',
        'Hàng đơn vị, hàng chục, hàng trăm',
        'Hàng trăm, hàng nghìn, hàng chục nghìn',
      ],
      answer: 0,
      hints: ['Mỗi lớp có ba hàng. Tên của lớp nghìn có trong tên mỗi hàng của nó.'],
      solution: 'Hàng nghìn, hàng chục nghìn, hàng trăm nghìn hợp thành lớp nghìn.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 912 375, chữ số 2 ở hàng nào?',
      options: ['Hàng nghìn', 'Hàng chục nghìn', 'Hàng trăm', 'Hàng chục'],
      answer: 0,
      hints: ['Em đếm hàng từ phải sang trái: đơn vị, chục, trăm, nghìn...'],
      solution: '5 hàng đơn vị, 7 hàng chục, 3 hàng trăm, 2 hàng nghìn. Chữ số 2 ở hàng nghìn.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 805 246, chữ số 8 thuộc lớp nào?',
      options: ['Lớp nghìn', 'Lớp đơn vị'],
      answer: 0,
      hints: ['Lớp đơn vị là ba chữ số bên phải: 246.'],
      solution: 'Chữ số 8 ở hàng trăm nghìn, thuộc lớp nghìn.',
    },
    {
      type: 'number',
      prompt: 'Giá trị của chữ số 3 trong số 321 458 là bao nhiêu?',
      answer: 300000,
      hints: ['Chữ số 3 ở hàng trăm nghìn.', 'Giữ chữ số 3, các chữ số bên phải đổi thành 0.'],
      solution: 'Chữ số 3 ở hàng trăm nghìn, giá trị là 300 000.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi số với giá trị của chữ số 7 trong số đó.',
      left: ['570 214', '157 302', '210 873', '409 127'],
      right: ['70 000', '7 000', '700', '7', '70'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tìm hàng của chữ số 7 trong từng số.'],
      solution:
        '570 214: hàng chục nghìn, 70 000. 157 302: hàng nghìn, 7 000. 210 873: hàng trăm, 700. 409 127: hàng đơn vị, 7.',
    },
    {
      type: 'multi',
      prompt: 'Trong số 538 602, những chữ số nào thuộc lớp đơn vị?',
      options: ['6', '0', '2', '5', '3', '8'],
      answers: [0, 1, 2],
      hints: ['Lớp đơn vị gồm hàng trăm, hàng chục, hàng đơn vị: ba chữ số bên phải.'],
      solution: '538 602: lớp nghìn là 5, 3, 8; lớp đơn vị là 6, 0, 2.',
    },
    {
      type: 'number',
      prompt: 'Em viết số có lớp nghìn là 204 và lớp đơn vị là 517.',
      answer: 204517,
      hints: ['Lớp nghìn viết trước, lớp đơn vị viết sau.'],
      solution: 'Viết 204 rồi 517: số đó là 204 517.',
    },
    {
      type: 'choice',
      prompt: 'Trong số nào, chữ số 5 có giá trị là 500?',
      options: ['120 548', '125 048', '120 485', '512 048'],
      answer: 0,
      hints: ['500 là 5 trăm: chữ số 5 phải ở hàng trăm.'],
      solution:
        '120 548: chữ số 5 ở hàng trăm, giá trị 500. Các số còn lại: 125 048 (5 000), 120 485 (5), 512 048 (500 000).',
    },
  ],
  takeaways: [
    'Lớp đơn vị: hàng đơn vị, hàng chục, hàng trăm.',
    'Lớp nghìn: hàng nghìn, hàng chục nghìn, hàng trăm nghìn.',
    'Giá trị của chữ số phụ thuộc vào hàng của nó: chữ số 5 ở hàng chục nghìn có giá trị 50 000.',
  ],
};
