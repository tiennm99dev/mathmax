/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập các số đến 1 000: đọc, viết số, viết số thành tổng các trăm, chục, đơn vị, số liền trước, số liền sau và so sánh, sắp xếp các số.',
  intro:
    'Lên lớp 3 rồi, em còn nhớ các số đến 1 000 không? Hôm nay em dựng số bằng các khối, đọc số, viết số và so sánh xem số nào lớn hơn nhé!',
  objectives: [
    'Đọc, viết các số có ba chữ số.',
    'Biết số gồm mấy trăm, mấy chục, mấy đơn vị và viết số thành tổng.',
    'Tìm số liền trước, số liền sau.',
    'So sánh và sắp xếp các số đến 1 000.',
  ],
  sections: [
    {
      heading: 'Đọc và viết số',
      blocks: [
        {
          type: 'table',
          head: ['Viết số', 'Đọc số'],
          rows: [
            ['243', 'hai trăm bốn mươi ba'],
            ['205', 'hai trăm linh năm'],
            ['310', 'ba trăm mười'],
            ['515', 'năm trăm mười lăm'],
            ['1 000', 'một nghìn'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Hàng chục là 0 thì đọc "linh": 205 đọc là hai trăm linh năm. Số 250 đọc là hai trăm năm mươi.',
        },
      ],
    },
    {
      heading: 'Trăm, chục, đơn vị',
      blocks: [
        {
          type: 'p',
          text: 'Số 385 gồm 3 trăm, 8 chục và 5 đơn vị.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Viết số thành tổng các trăm, chục, đơn vị: 385 = 300 + 80 + 5.',
        },
        {
          type: 'p',
          text: 'Hàng nào là 0 thì không cần viết: 307 = 300 + 7 và 640 = 600 + 40.',
        },
      ],
    },
    {
      heading: 'Số liền trước, số liền sau',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Số liền trước: lấy số đó trừ 1. Số liền sau: lấy số đó cộng 1.',
        },
        {
          type: 'p',
          text: 'Số liền trước của 210 là 209. Số liền sau của 210 là 211.',
        },
      ],
    },
    {
      heading: 'So sánh số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'So sánh hàng trăm trước. Hàng trăm bằng nhau thì so sánh hàng chục. Hàng chục cũng bằng nhau thì so sánh hàng đơn vị.',
        },
        {
          type: 'p',
          text: '399 < 401, vì 3 trăm bé hơn 4 trăm. 505 < 550, vì hàng trăm bằng nhau và 0 chục bé hơn 5 chục.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Số có ba chữ số luôn lớn hơn số có hai chữ số: 100 > 99.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng trăm, chục, đơn vị',
    instruction:
      'Chạm + và − để thêm, bớt khối ở từng hàng và dựng số. Chọn "So sánh" để dựng hai số rồi chạm dấu đúng. Chọn "Đố em" để làm bài ôn tập.',
  },
  examples: [
    {
      problem: 'Viết số 538 thành tổng các trăm, chục, đơn vị.',
      steps: ['538 gồm 5 trăm, 3 chục, 8 đơn vị.', '5 trăm là 500, 3 chục là 30, 8 đơn vị là 8.'],
      answer: '538 = 500 + 30 + 8.',
    },
    {
      problem: 'Sắp xếp các số 531, 513, 315, 351 theo thứ tự từ bé đến lớn.',
      steps: [
        'So sánh hàng trăm: 315 và 351 có 3 trăm, 531 và 513 có 5 trăm.',
        'So sánh hàng chục: 315 < 351 và 513 < 531.',
      ],
      answer: 'Từ bé đến lớn: 315; 351; 513; 531.',
    },
    {
      problem:
        'Lợn trắng nặng 110 kg, lợn đen nặng 99 kg, lợn khoang nặng 101 kg. Con nào nặng nhất?',
      steps: [
        '99 có hai chữ số nên bé nhất.',
        '110 và 101 có cùng hàng trăm. 1 chục lớn hơn 0 chục, nên 110 > 101.',
      ],
      answer: 'Lợn trắng nặng nhất.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi số với cách đọc.',
      left: ['405', '450', '415', '504'],
      right: ['bốn trăm năm mươi', 'năm trăm linh tư', 'bốn trăm linh năm', 'bốn trăm mười lăm'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      hints: ['Hàng chục là 0 thì đọc "linh".'],
      solution:
        '405: bốn trăm linh năm. 450: bốn trăm năm mươi. 415: bốn trăm mười lăm. 504: năm trăm linh tư.',
    },
    {
      type: 'number',
      prompt: 'Viết số: bảy trăm linh hai.',
      answer: 702,
      hints: ['"Linh" nghĩa là hàng chục là 0.'],
      solution: 'Bảy trăm linh hai gồm 7 trăm, 0 chục, 2 đơn vị. Viết là 702.',
    },
    {
      type: 'choice',
      prompt: 'Số 444 viết thành tổng các trăm, chục, đơn vị là:',
      options: ['400 + 40 + 4', '4 + 4 + 4', '400 + 4 + 4', '40 + 40 + 4'],
      answer: 0,
      hints: ['Mỗi chữ số 4 ở một hàng khác nhau.'],
      solution: '444 gồm 4 trăm, 4 chục, 4 đơn vị. 444 = 400 + 40 + 4.',
    },
    {
      type: 'number',
      prompt: '600 + 8 = ?',
      answer: 608,
      hints: ['Có 6 trăm, không có chục, 8 đơn vị.'],
      solution: '6 trăm, 0 chục, 8 đơn vị là 608.',
    },
    {
      type: 'number',
      prompt: 'Số liền trước của 800 là số nào?',
      answer: 799,
      hints: ['Em lấy 800 trừ đi 1.'],
      solution: '800 − 1 = 799.',
    },
    {
      type: 'number',
      prompt: 'Số liền sau của 999 là số nào?',
      answer: 1000,
      hints: ['Em lấy 999 cộng thêm 1.'],
      solution: '999 + 1 = 1 000.',
    },
    {
      type: 'choice',
      prompt: 'Điền dấu: 738 ? 700 + 30 + 7',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em viết tổng thành một số trước.'],
      solution:
        '700 + 30 + 7 = 737. Hàng trăm, hàng chục bằng nhau, 8 đơn vị lớn hơn 7 đơn vị. Vậy 738 > 737.',
    },
    {
      type: 'choice',
      prompt: 'Điền dấu: 400 + 70 + 5 ? 475',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Em viết tổng thành một số trước.'],
      solution: '400 + 70 + 5 = 475. Vậy hai số bằng nhau.',
    },
    {
      type: 'choice',
      prompt: 'Số nào lớn nhất?',
      options: ['389', '398', '401', '99'],
      answer: 2,
      hints: ['Em so sánh hàng trăm trước.'],
      solution: '401 có 4 trăm, các số kia có không quá 3 trăm. Số lớn nhất là 401.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số từ bé đến lớn.',
      items: ['620', '206', '260', '602'],
      answer: [1, 2, 3, 0],
      hints: ['So sánh hàng trăm trước, rồi hàng chục.'],
      solution: '206 < 260 < 602 < 620.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số từ lớn đến bé.',
      items: ['147', '714', '174', '741'],
      answer: [3, 1, 2, 0],
      hints: ['Số lớn nhất đứng đầu tiên.'],
      solution: '741 > 714 > 174 > 147.',
    },
    {
      type: 'number',
      prompt: 'Số còn thiếu trong dãy: 210, 211, ?, 213.',
      answer: 212,
      hints: ['Mỗi số hơn số trước 1 đơn vị.'],
      solution: '211 + 1 = 212. Dãy là 210, 211, 212, 213.',
    },
  ],
  takeaways: [
    'Hàng chục là 0 thì đọc "linh": 205 là hai trăm linh năm.',
    'Viết số thành tổng: 385 = 300 + 80 + 5.',
    'Số liền trước: trừ 1. Số liền sau: cộng 1.',
    'So sánh số: hàng trăm trước, rồi hàng chục, rồi hàng đơn vị.',
  ],
};
