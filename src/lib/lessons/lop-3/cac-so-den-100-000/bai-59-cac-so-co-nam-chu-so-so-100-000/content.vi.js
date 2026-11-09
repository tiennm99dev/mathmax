/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hàng chục nghìn; đọc, viết số có năm chữ số; viết số thành tổng các chục nghìn, nghìn, trăm, chục, đơn vị; số tròn nghìn, tròn chục nghìn; số 100 000.',
  intro:
    'Sân vận động có 42 316 chỗ ngồi. Số này có năm chữ số! Em đọc số này thế nào? Hôm nay em học hàng chục nghìn nhé.',
  objectives: [
    'Biết hàng chục nghìn: 10 nghìn bằng 1 chục nghìn.',
    'Đọc, viết được số có năm chữ số và số 100 000.',
    'Viết được số có năm chữ số thành tổng các chục nghìn, nghìn, trăm, chục, đơn vị.',
  ],
  sections: [
    {
      heading: 'Hàng chục nghìn',
      blocks: [
        {
          type: 'p',
          text: '10 trăm là 1 nghìn. 10 nghìn là 1 chục nghìn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: '10 nghìn = 1 chục nghìn. Viết là 10 000, đọc là mười nghìn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Số có năm chữ số có năm hàng: hàng chục nghìn, hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.',
        },
        {
          type: 'p',
          text: 'Số 42 316 gồm 4 chục nghìn, 2 nghìn, 3 trăm, 1 chục và 6 đơn vị.',
        },
      ],
    },
    {
      heading: 'Đọc, viết số có năm chữ số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Viết số và đọc số từ trái sang phải: hàng chục nghìn, hàng nghìn, hàng trăm, hàng chục, rồi hàng đơn vị.',
        },
        {
          type: 'p',
          text: 'Em đọc hai chữ số đầu như số có hai chữ số, rồi thêm chữ "nghìn". Sau đó em đọc ba chữ số cuối.',
        },
        {
          type: 'table',
          head: ['Viết số', 'Đọc số'],
          rows: [
            ['42 316', 'bốn mươi hai nghìn ba trăm mười sáu'],
            ['24 105', 'hai mươi tư nghìn một trăm linh năm'],
            ['70 040', 'bảy mươi nghìn không trăm bốn mươi'],
            ['31 005', 'ba mươi mốt nghìn không trăm linh năm'],
            ['15 000', 'mười lăm nghìn'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chữ số 0',
          text: 'Hàng trăm là 0 thì đọc "không trăm". Hàng chục là 0, hàng đơn vị khác 0 thì đọc "linh".',
        },
      ],
    },
    {
      heading: 'Viết số thành tổng',
      blocks: [
        {
          type: 'p',
          text: 'Em tách số theo từng hàng: 45 321 = 40 000 + 5 000 + 300 + 20 + 1.',
        },
        {
          type: 'p',
          text: 'Hàng nào là 0 thì không viết: 60 508 = 60 000 + 500 + 8.',
        },
      ],
    },
    {
      heading: 'Số tròn nghìn, tròn chục nghìn. Số 100 000',
      blocks: [
        {
          type: 'p',
          text: '11 000, 12 000, 13 000 là các số tròn nghìn. Ba chữ số cuối của chúng đều là 0.',
        },
        {
          type: 'p',
          text: '10 000, 20 000, 30 000, ..., 90 000 là các số tròn chục nghìn. Bốn chữ số cuối của chúng đều là 0.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: '10 chục nghìn là 100 000. Số 100 000 đọc là một trăm nghìn.',
        },
        {
          type: 'p',
          text: 'Số 99 999 là số lớn nhất có năm chữ số. Số liền sau 99 999 là 100 000.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thẻ vào bảng các hàng',
    instruction:
      'Em đọc tên số. Em kéo thẻ chữ số vào từng cột, hoặc chạm thẻ rồi chạm cột. Bảng sẽ viết số và đọc số cho em.',
  },
  examples: [
    {
      problem: 'Viết và đọc số gồm 3 chục nghìn, 1 nghìn, 0 trăm, 0 chục, 5 đơn vị.',
      steps: [
        'Viết lần lượt từ trái sang phải: 3, 1, 0, 0, 5.',
        'Số đó là 31 005.',
        'Đọc hai chữ số đầu: ba mươi mốt nghìn.',
        'Hàng trăm là 0 đọc "không trăm", hàng chục là 0 đọc "linh": không trăm linh năm.',
      ],
      answer: '31 005, đọc là ba mươi mốt nghìn không trăm linh năm.',
    },
    {
      problem: 'Viết số 70 040 thành tổng các chục nghìn, nghìn, trăm, chục, đơn vị.',
      steps: [
        '70 040 gồm 7 chục nghìn, 0 nghìn, 0 trăm, 4 chục, 0 đơn vị.',
        'Các hàng là 0 thì không viết.',
        'Ta có: 70 040 = 70 000 + 40.',
      ],
      answer: '70 040 = 70 000 + 40.',
    },
    {
      problem: 'Tìm số liền trước và số liền sau của 99 999.',
      steps: [
        'Số liền trước kém 99 999 một đơn vị: 99 998.',
        'Số liền sau hơn 99 999 một đơn vị: 100 000.',
      ],
      answer: 'Số liền trước là 99 998, số liền sau là 100 000.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Em nối cách đọc với số.',
      left: [
        'Bốn mươi hai nghìn ba trăm mười sáu',
        'Hai mươi tư nghìn một trăm linh năm',
        'Bảy mươi nghìn không trăm bốn mươi',
        'Mười lăm nghìn',
      ],
      right: ['42 316', '24 105', '70 040', '15 000', '24 150'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['"Linh" cho biết hàng chục là 0.', '"Không trăm" cho biết hàng trăm là 0.'],
      solution:
        'Bốn mươi hai nghìn ba trăm mười sáu: 42 316. Hai mươi tư nghìn một trăm linh năm: 24 105. Bảy mươi nghìn không trăm bốn mươi: 70 040. Mười lăm nghìn: 15 000.',
    },
    {
      type: 'number',
      prompt: 'Em viết số gồm 8 chục nghìn, 9 nghìn, 2 trăm, 0 chục, 7 đơn vị.',
      answer: 89207,
      hints: ['Viết chữ số hàng chục nghìn trước, rồi lần lượt đến hàng đơn vị.'],
      solution: 'Số đó là 89 207, đọc là tám mươi chín nghìn hai trăm linh bảy.',
    },
    {
      type: 'number',
      prompt: 'Em viết số: sáu mươi nghìn năm trăm linh tám.',
      answer: 60508,
      hints: ['Sáu mươi nghìn là 6 chục nghìn, 0 nghìn.', '"Linh" là chữ số 0 ở hàng chục.'],
      solution:
        'Sáu mươi nghìn năm trăm linh tám gồm 6 chục nghìn, 0 nghìn, 5 trăm, 0 chục, 8 đơn vị. Viết là 60 508.',
    },
    {
      type: 'choice',
      prompt: 'Số 53 090 đọc là gì?',
      options: [
        'năm mươi ba nghìn không trăm chín mươi',
        'năm mươi ba nghìn chín trăm',
        'năm mươi ba nghìn không trăm linh chín',
      ],
      answer: 0,
      hints: ['53 090 gồm 5 chục nghìn, 3 nghìn, 0 trăm, 9 chục, 0 đơn vị.'],
      solution:
        'Hai chữ số đầu đọc là năm mươi ba nghìn. Hàng trăm là 0 đọc "không trăm", 9 chục là chín mươi. Đọc là năm mươi ba nghìn không trăm chín mươi.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 37 482, chữ số 3 ở hàng nào?',
      options: ['Hàng chục nghìn', 'Hàng nghìn', 'Hàng trăm'],
      answer: 0,
      hints: ['Từ trái sang phải: hàng chục nghìn, hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.'],
      solution:
        '37 482 gồm 3 chục nghìn, 7 nghìn, 4 trăm, 8 chục, 2 đơn vị. Chữ số 3 ở hàng chục nghìn.',
    },
    {
      type: 'number',
      prompt: '45 321 = 40 000 + ? + 300 + 20 + 1. Số còn thiếu là số nào?',
      answer: 5000,
      hints: ['45 321 có 5 nghìn.'],
      solution:
        '45 321 gồm 4 chục nghìn, 5 nghìn, 3 trăm, 2 chục, 1 đơn vị. Số còn thiếu là 5 000.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số tròn nghìn theo thứ tự đếm thêm 1 000.',
      items: ['30 000', '28 000', '31 000', '29 000'],
      answer: [1, 3, 0, 2],
      hints: ['Sau 29 000 là một số tròn chục nghìn.'],
      solution: '28 000, 29 000, 30 000, 31 000.',
    },
    {
      type: 'number',
      prompt: 'Số liền sau của 99 999 là số nào?',
      answer: 100000,
      hints: ['Số liền sau hơn số đó 1 đơn vị.'],
      solution: '99 999 + 1 = 100 000. Số liền sau của 99 999 là 100 000.',
    },
    {
      type: 'choice',
      prompt: 'Số 100 000 đọc là gì?',
      options: ['một trăm nghìn', 'mười nghìn', 'một nghìn'],
      answer: 0,
      hints: ['100 000 là 10 chục nghìn.'],
      solution: '10 chục nghìn là 100 000, đọc là một trăm nghìn.',
    },
  ],
  takeaways: [
    '10 nghìn = 1 chục nghìn; 10 chục nghìn = 100 000, đọc là một trăm nghìn.',
    'Đọc, viết số có năm chữ số từ hàng chục nghìn đến hàng đơn vị.',
    'Hàng trăm là 0 đọc "không trăm"; hàng chục là 0 đọc "linh".',
  ],
};
