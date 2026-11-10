/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hàng trăm nghìn và số có sáu chữ số: đọc, viết, viết thành tổng các hàng; 10 trăm nghìn là 1 triệu, viết 1 000 000.',
  intro:
    'Năm 1900, trên thế giới có khoảng 500 000 con tê giác sống hoang dã. Số này có sáu chữ số. Em đọc số này thế nào? Cùng làm quen với hàng trăm nghìn và số một triệu nhé!',
  objectives: [
    'Biết hàng trăm nghìn: 10 chục nghìn là 1 trăm nghìn.',
    'Đọc, viết được số có sáu chữ số và viết số thành tổng các hàng.',
    'Biết 10 trăm nghìn là 1 triệu, viết là 1 000 000.',
  ],
  sections: [
    {
      heading: 'Hàng trăm nghìn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: '10 chục nghìn là 1 trăm nghìn. Viết là 100 000.',
        },
        {
          type: 'p',
          text: 'Số có sáu chữ số có thêm hàng trăm nghìn, đứng trước hàng chục nghìn.',
        },
        {
          type: 'table',
          head: ['Trăm nghìn', 'Chục nghìn', 'Nghìn', 'Trăm', 'Chục', 'Đơn vị'],
          rows: [['4', '3', '2', '5', '1', '6']],
          caption: 'Số 432 516',
        },
        {
          type: 'p',
          text: 'Số 432 516 gồm 4 trăm nghìn, 3 chục nghìn, 2 nghìn, 5 trăm, 1 chục và 6 đơn vị.',
        },
      ],
    },
    {
      heading: 'Đọc, viết số có sáu chữ số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em viết và đọc số từ trái sang phải: từ hàng trăm nghìn đến hàng đơn vị.',
        },
        {
          type: 'table',
          head: ['Viết số', 'Đọc số'],
          rows: [
            ['432 516', 'bốn trăm ba mươi hai nghìn năm trăm mười sáu'],
            ['106 100', 'một trăm linh sáu nghìn một trăm'],
            ['100 001', 'một trăm nghìn không trăm linh một'],
            ['750 000', 'bảy trăm năm mươi nghìn'],
          ],
        },
        {
          type: 'p',
          text: 'Em viết số thành tổng các hàng. Hàng nào là 0 thì không viết: 882 936 = 800 000 + 80 000 + 2 000 + 900 + 30 + 6.',
        },
      ],
    },
    {
      heading: 'Số 1 000 000',
      blocks: [
        {
          type: 'p',
          text: 'Em đếm thêm 100 000: 100 000, 200 000, 300 000, ..., 800 000, 900 000.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '10 trăm nghìn là 1 triệu. Viết là 1 000 000, đọc là một triệu.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Số 1 000 000 có bảy chữ số: chữ số 1 và sáu chữ số 0.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thẻ vào bảng sáu hàng',
    instruction:
      'Em đọc tên số. Em chạm thẻ chữ số rồi chạm cột để xếp số. Sau đó em đếm thêm 100 000 đến một triệu.',
  },
  examples: [
    {
      problem: 'Viết và đọc số gồm 4 trăm nghìn, 1 chục nghìn, 1 nghìn, 1 trăm.',
      steps: [
        'Số có 4 trăm nghìn, 1 chục nghìn, 1 nghìn, 1 trăm, 0 chục, 0 đơn vị.',
        'Viết lần lượt từ trái sang phải: 4, 1, 1, 1, 0, 0. Số đó là 411 100.',
        'Đọc phần nghìn trước: bốn trăm mười một nghìn. Rồi đọc phần còn lại: một trăm.',
      ],
      answer: '411 100, đọc là bốn trăm mười một nghìn một trăm.',
    },
    {
      problem: 'Viết số 101 101 thành tổng các hàng.',
      steps: [
        'Số 101 101 gồm 1 trăm nghìn, 0 chục nghìn, 1 nghìn, 1 trăm, 0 chục, 1 đơn vị.',
        'Hàng chục nghìn và hàng chục là 0, em không viết.',
      ],
      answer: '101 101 = 100 000 + 1 000 + 100 + 1.',
    },
    {
      problem: 'Số liền sau của 999 999 là số nào?',
      steps: [
        'Số liền sau hơn số đã cho 1 đơn vị: 999 999 + 1.',
        '9 trăm nghìn thêm 1 trăm nghìn được 10 trăm nghìn, tức là 1 triệu.',
      ],
      answer: '1 000 000 (một triệu).',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Em nối cách đọc với số.',
      left: [
        'Bốn trăm ba mươi hai nghìn năm trăm mười sáu',
        'Một trăm linh sáu nghìn một trăm',
        'Bảy trăm năm mươi nghìn',
        'Một triệu',
      ],
      right: ['432 516', '106 100', '750 000', '1 000 000', '100 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['"Một triệu" là 10 trăm nghìn.', '"Linh sáu nghìn" cho biết hàng chục nghìn là 0.'],
      solution:
        'Bốn trăm ba mươi hai nghìn năm trăm mười sáu: 432 516. Một trăm linh sáu nghìn một trăm: 106 100. Bảy trăm năm mươi nghìn: 750 000. Một triệu: 1 000 000.',
    },
    {
      type: 'count',
      picture: 'banknote',
      prompt:
        'Mỗi tờ tiền là 100 000 đồng. Cần mấy tờ như thế để có 1 000 000 đồng? Em đếm các tờ tiền.',
      answer: 10,
      choices: [9, 10, 11],
      hints: ['10 trăm nghìn là 1 triệu.'],
      solution: '10 tờ 100 000 đồng là 1 000 000 đồng.',
    },
    {
      type: 'number',
      prompt:
        'Mai có 4 tờ 100 000 đồng, 1 tờ 10 000 đồng, 1 tờ 1 000 đồng và 1 tờ 100 đồng. Mai có tất cả bao nhiêu tiền? (đồng)',
      answer: 411100,
      unit: 'đồng',
      hints: ['4 tờ 100 000 đồng là 400 000 đồng.', 'Em cộng: 400 000 + 10 000 + 1 000 + 100.'],
      solution: '400 000 + 10 000 + 1 000 + 100 = 411 100. Mai có 411 100 đồng.',
    },
    {
      type: 'number',
      prompt: 'Em viết số gồm 1 trăm nghìn, 6 nghìn, 1 trăm.',
      answer: 106100,
      hints: ['Số này không có chục nghìn, chục và đơn vị: các hàng đó là 0.'],
      solution:
        'Số gồm 1 trăm nghìn, 0 chục nghìn, 6 nghìn, 1 trăm, 0 chục, 0 đơn vị. Viết là 106 100.',
    },
    {
      type: 'number',
      prompt: '882 936 = 800 000 + ? + 2 000 + 900 + 30 + 6. Số còn thiếu là số nào?',
      answer: 80000,
      hints: ['Chữ số hàng chục nghìn của 882 936 là 8.'],
      solution: '882 936 có 8 chục nghìn. Số còn thiếu là 80 000.',
    },
    {
      type: 'choice',
      prompt: 'Số nào viết đúng thành tổng 700 000 + 50 000?',
      options: ['750 000', '705 000', '75 000'],
      answer: 0,
      hints: ['700 000 là 7 trăm nghìn, 50 000 là 5 chục nghìn.'],
      solution: '7 trăm nghìn và 5 chục nghìn: 700 000 + 50 000 = 750 000.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 365 214, chữ số 3 ở hàng nào?',
      options: ['Hàng trăm nghìn', 'Hàng chục nghìn', 'Hàng nghìn', 'Hàng trăm'],
      answer: 0,
      hints: ['Số có sáu chữ số: chữ số đầu tiên bên trái ở hàng trăm nghìn.'],
      solution: '365 214 có sáu chữ số. Chữ số 3 đứng đầu, ở hàng trăm nghìn.',
    },
    {
      type: 'order',
      prompt: 'Em đếm thêm 100 000. Em xếp các số theo thứ tự đếm.',
      items: ['700 000', '1 000 000', '800 000', '900 000'],
      answer: [0, 2, 3, 1],
      hints: ['Mỗi lần đếm, hàng trăm nghìn tăng thêm 1.', 'Sau 900 000 là 10 trăm nghìn.'],
      solution: '700 000, 800 000, 900 000, 1 000 000.',
    },
    {
      type: 'choice',
      prompt: 'Số nào là số có sáu chữ số?',
      options: ['300 754', '30 754', '3 754', '3 000 754'],
      answer: 0,
      hints: ['Em đếm các chữ số của từng số.'],
      solution:
        '300 754 có sáu chữ số. 30 754 có năm chữ số, 3 754 có bốn chữ số, 3 000 754 có bảy chữ số.',
    },
    {
      type: 'number',
      prompt: 'Số liền trước của 1 000 000 là số nào?',
      answer: 999999,
      hints: ['Số liền trước kém số đã cho 1 đơn vị.'],
      solution: '1 000 000 − 1 = 999 999.',
    },
  ],
  takeaways: [
    '10 chục nghìn là 1 trăm nghìn (100 000).',
    'Đọc, viết số có sáu chữ số từ hàng trăm nghìn đến hàng đơn vị.',
    '10 trăm nghìn là 1 triệu, viết là 1 000 000.',
  ],
};
