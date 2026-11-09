/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hàng nghìn; đọc, viết số có bốn chữ số; viết số thành tổng các nghìn, trăm, chục, đơn vị; số 10 000.',
  intro:
    '10 tấm trăm ghép lại được 1 khối nghìn. Có 2 khối nghìn, 9 tấm trăm, 4 thanh chục và 5 khối nhỏ thì là số nào? Hôm nay em học số có bốn chữ số nhé!',
  objectives: [
    'Biết hàng nghìn: 10 trăm bằng 1 nghìn.',
    'Đọc, viết được số có bốn chữ số và số 10 000.',
    'Viết được số có bốn chữ số thành tổng các nghìn, trăm, chục, đơn vị.',
  ],
  sections: [
    {
      heading: 'Hàng nghìn',
      blocks: [
        {
          type: 'p',
          text: '10 đơn vị là 1 chục. 10 chục là 1 trăm. 10 trăm là 1 nghìn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Số có bốn chữ số có bốn hàng: hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.',
        },
        {
          type: 'p',
          text: 'Số 2 945 gồm 2 nghìn, 9 trăm, 4 chục và 5 đơn vị.',
        },
      ],
    },
    {
      heading: 'Đọc, viết số có bốn chữ số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Viết số và đọc số từ trái sang phải: hàng nghìn, hàng trăm, hàng chục, rồi hàng đơn vị.',
        },
        {
          type: 'table',
          head: ['Nghìn', 'Trăm', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
          rows: [
            ['3', '6', '7', '4', '3 674', 'ba nghìn sáu trăm bảy mươi tư'],
            ['8', '6', '4', '0', '8 640', 'tám nghìn sáu trăm bốn mươi'],
            ['6', '3', '0', '2', '6 302', 'sáu nghìn ba trăm linh hai'],
            ['3', '0', '6', '7', '3 067', 'ba nghìn không trăm sáu mươi bảy'],
            ['4', '0', '0', '7', '4 007', 'bốn nghìn không trăm linh bảy'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chữ số 0 ở hàng trăm',
          text: 'Hàng trăm là 0 thì đọc "không trăm": 3 067 đọc là ba nghìn không trăm sáu mươi bảy.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chữ số 0 ở hàng chục',
          text: 'Hàng chục là 0, hàng đơn vị khác 0 thì đọc "linh": 6 302 đọc là sáu nghìn ba trăm linh hai.',
        },
      ],
    },
    {
      heading: 'Viết số thành tổng',
      blocks: [
        {
          type: 'p',
          text: 'Em tách số theo từng hàng: 3 892 = 3 000 + 800 + 90 + 2.',
        },
        {
          type: 'p',
          text: 'Hàng nào là 0 thì không viết: 5 701 = 5 000 + 700 + 1.',
        },
      ],
    },
    {
      heading: 'Số 10 000',
      blocks: [
        {
          type: 'p',
          text: '1 000, 2 000, 3 000, ..., 9 000 là các số tròn nghìn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: '10 nghìn là 10 000. Số 10 000 đọc là mười nghìn.',
        },
        {
          type: 'p',
          text: 'Số 9 999 là số lớn nhất có bốn chữ số. Số liền sau 9 999 là 10 000.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp khối thành số',
    instruction:
      'Em bấm + và − để thêm, bớt khối ở mỗi cột. Đủ 10 khối thì em ghép lại thành 1 khối của hàng bên trái.',
  },
  examples: [
    {
      problem: 'Viết và đọc số gồm 5 nghìn, 0 trăm, 7 chục, 2 đơn vị.',
      steps: [
        'Viết lần lượt: chữ số 5, chữ số 0, chữ số 7, chữ số 2.',
        'Số đó là 5 072.',
        'Hàng trăm là 0 nên đọc "không trăm": năm nghìn không trăm bảy mươi hai.',
      ],
      answer: '5 072, đọc là năm nghìn không trăm bảy mươi hai.',
    },
    {
      problem: 'Viết số 2 046 thành tổng các nghìn, trăm, chục, đơn vị.',
      steps: [
        '2 046 gồm 2 nghìn, 0 trăm, 4 chục, 6 đơn vị.',
        'Hàng trăm là 0 nên không viết.',
        'Ta có: 2 046 = 2 000 + 40 + 6.',
      ],
      answer: '2 046 = 2 000 + 40 + 6.',
    },
    {
      problem: 'Tìm số liền trước và số liền sau của 8 999.',
      steps: [
        'Số liền trước kém 8 999 một đơn vị: 8 998.',
        'Số liền sau hơn 8 999 một đơn vị: 9 000.',
      ],
      answer: 'Số liền trước là 8 998, số liền sau là 9 000.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Em nối cách đọc với số.',
      left: [
        'Ba nghìn sáu trăm bảy mươi tư',
        'Ba nghìn không trăm sáu mươi bảy',
        'Bốn nghìn không trăm linh bảy',
        'Tám nghìn sáu trăm bốn mươi',
      ],
      right: ['3 674', '3 067', '4 007', '8 640', '4 070'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['"Không trăm" cho biết hàng trăm là 0.', '"Linh" cho biết hàng chục là 0.'],
      solution:
        'Ba nghìn sáu trăm bảy mươi tư: 3 674. Ba nghìn không trăm sáu mươi bảy: 3 067. Bốn nghìn không trăm linh bảy: 4 007. Tám nghìn sáu trăm bốn mươi: 8 640.',
    },
    {
      type: 'number',
      prompt: 'Em viết số gồm 6 nghìn, 3 trăm, 0 chục, 2 đơn vị.',
      answer: 6302,
      hints: ['Viết chữ số hàng nghìn trước, rồi hàng trăm, hàng chục, hàng đơn vị.'],
      solution: 'Số đó là 6 302, đọc là sáu nghìn ba trăm linh hai.',
    },
    {
      type: 'number',
      prompt: 'Em viết số: tám nghìn không trăm sáu mươi.',
      answer: 8060,
      hints: ['"Không trăm" là chữ số 0 ở hàng trăm.', 'Sáu mươi là 6 chục, 0 đơn vị.'],
      solution:
        'Tám nghìn không trăm sáu mươi gồm 8 nghìn, 0 trăm, 6 chục, 0 đơn vị. Viết là 8 060.',
    },
    {
      type: 'choice',
      prompt: 'Số 6 509 đọc là gì?',
      options: [
        'sáu nghìn năm trăm linh chín',
        'sáu nghìn năm trăm chín mươi',
        'sáu nghìn không trăm năm mươi chín',
      ],
      answer: 0,
      hints: ['Chữ số hàng chục của 6 509 là 0.'],
      solution: '6 509 gồm 6 nghìn, 5 trăm, 0 chục, 9 đơn vị. Đọc là sáu nghìn năm trăm linh chín.',
    },
    {
      type: 'choice',
      prompt: 'Số nào có chữ số hàng trăm là 7?',
      options: ['8 275', '7 285', '5 782'],
      answer: 2,
      hints: ['Hàng trăm là chữ số thứ hai, tính từ trái sang.'],
      solution:
        '5 782 gồm 5 nghìn, 7 trăm, 8 chục, 2 đơn vị. Chữ số hàng trăm là 7. Số 8 275 có 7 ở hàng chục, số 7 285 có 7 ở hàng nghìn.',
    },
    {
      type: 'number',
      prompt: '5 701 = 5 000 + ? + 1. Số còn thiếu là số nào?',
      answer: 700,
      hints: ['5 701 gồm 5 nghìn, 7 trăm, 0 chục, 1 đơn vị.'],
      solution: '5 701 = 5 000 + 700 + 1. Số còn thiếu là 700.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số theo thứ tự đếm thêm 1: từ số đứng trước đến số đứng sau.',
      items: ['5 000', '4 998', '5 001', '4 999'],
      answer: [1, 3, 0, 2],
      hints: ['Sau 4 999 là số tròn nghìn.'],
      solution: '4 998, 4 999, 5 000, 5 001.',
    },
    {
      type: 'number',
      prompt: 'Số liền trước của 10 000 là số nào?',
      answer: 9999,
      hints: ['Số liền trước kém số đó 1 đơn vị.'],
      solution: '10 000 − 1 = 9 999. Số liền trước của 10 000 là 9 999.',
    },
    {
      type: 'choice',
      prompt: 'Số 10 000 đọc là gì?',
      options: ['mười nghìn', 'một nghìn', 'một trăm nghìn'],
      answer: 0,
      hints: ['10 000 là 10 nghìn.'],
      solution: '10 nghìn là 10 000, đọc là mười nghìn.',
    },
  ],
  takeaways: [
    '10 trăm = 1 nghìn; 10 nghìn = 10 000, đọc là mười nghìn.',
    'Đọc, viết số có bốn chữ số từ hàng nghìn đến hàng đơn vị.',
    'Hàng trăm là 0 đọc "không trăm"; hàng chục là 0 đọc "linh".',
  ],
};
