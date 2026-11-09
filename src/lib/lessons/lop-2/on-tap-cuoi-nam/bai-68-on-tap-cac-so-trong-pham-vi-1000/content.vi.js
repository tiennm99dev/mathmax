/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập các số trong phạm vi 1000: đọc, viết số, đếm theo thứ tự, so sánh, sắp xếp, viết số thành tổng các trăm, chục, đơn vị và lập số từ thẻ số.',
  intro:
    'Cuối năm rồi! Em đã biết các số đến 1000. Hôm nay em đọc, viết, so sánh và sắp xếp các số đó. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Đọc, viết các số trong phạm vi 1000.',
    'Viết tiếp các số theo thứ tự.',
    'So sánh và sắp xếp các số có ba chữ số.',
    'Viết số thành tổng các trăm, chục, đơn vị.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Đọc và viết số',
      blocks: [
        {
          type: 'table',
          head: ['Viết số', 'Đọc số'],
          rows: [
            ['243', 'Hai trăm bốn mươi ba'],
            ['205', 'Hai trăm linh năm'],
            ['250', 'Hai trăm năm mươi'],
            ['1000', 'Một nghìn'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Hàng chục là 0 thì em đọc "linh": 205 là hai trăm linh năm. Hàng đơn vị là 0 thì đọc "mươi": 250 là hai trăm năm mươi.',
        },
      ],
    },
    {
      heading: 'So sánh số',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'So sánh hàng trăm trước.',
            'Hàng trăm bằng nhau thì so sánh hàng chục.',
            'Hàng chục cũng bằng nhau thì so sánh hàng đơn vị.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Số có ba chữ số và số có hai chữ số',
          text: 'Số có ba chữ số luôn lớn hơn số có hai chữ số: 104 > 98.',
        },
      ],
    },
    {
      heading: 'Viết số thành tổng',
      blocks: [
        {
          type: 'p',
          text: 'Số 372 gồm 3 trăm, 7 chục, 2 đơn vị. Em viết: 372 = 300 + 70 + 2.',
        },
        {
          type: 'p',
          text: 'Hàng nào là 0 thì em không cần viết: 208 = 200 + 8. 630 = 600 + 30.',
        },
      ],
    },
    {
      heading: 'Số theo thứ tự',
      blocks: [
        {
          type: 'p',
          text: 'Đếm thêm 1: 127, 128, 129, 130. Đếm thêm 10: 340, 350, 360. Đếm thêm 100: 500, 600, 700.',
        },
        {
          type: 'p',
          text: 'Số liền sau hơn số đó 1 đơn vị. Số liền trước kém số đó 1 đơn vị.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 12 câu. Đầu tiên em làm mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem: 'So sánh 356 và 365.',
      steps: [
        'Hàng trăm: cả hai số đều có 3 trăm.',
        'Hàng chục: 5 chục bé hơn 6 chục.',
        'Vậy 356 bé hơn 365.',
      ],
      answer: '356 < 365.',
    },
    {
      problem:
        'Có ba thẻ số 3, 7, 0. Em dùng cả ba thẻ để lập số có ba chữ số. Số lớn nhất và số bé nhất là số nào?',
      steps: [
        'Số lớn nhất: chữ số lớn nhất đứng ở hàng trăm, rồi đến chữ số lớn tiếp theo. Được 730.',
        'Số bé nhất: chữ số 0 không đứng đầu, nên chữ số 3 đứng ở hàng trăm. Được 307.',
      ],
      answer: 'Số lớn nhất là 730, số bé nhất là 307.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi số với cách đọc của nó.',
      left: ['306', '360', '603', '630'],
      right: [
        'Ba trăm linh sáu',
        'Ba trăm sáu mươi',
        'Sáu trăm linh ba',
        'Sáu trăm ba mươi',
        'Ba trăm sáu mươi sáu',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['"Linh" nghĩa là hàng chục là 0.'],
      solution:
        '306: Ba trăm linh sáu. 360: Ba trăm sáu mươi. 603: Sáu trăm linh ba. 630: Sáu trăm ba mươi.',
    },
    {
      type: 'number',
      prompt: 'Viết số: Bảy trăm linh năm.',
      answer: 705,
      hints: ['"Linh" cho biết hàng chục là 0.'],
      solution: 'Bảy trăm linh năm gồm 7 trăm, 0 chục, 5 đơn vị. Số đó là 705.',
    },
    {
      type: 'number',
      prompt: 'Số nào thay cho dấu hỏi? 994, 995, ?, 997, 998.',
      answer: 996,
      hints: ['Mỗi số hơn số ngay trước nó 1.'],
      solution: '995 + 1 = 996. Vậy số cần tìm là 996.',
    },
    {
      type: 'number',
      prompt: 'Số nào thay cho dấu hỏi? 596, 598, 600, ?, 604.',
      answer: 602,
      hints: ['Mỗi số hơn số ngay trước nó 2.'],
      solution: '600 + 2 = 602. Vậy số cần tìm là 602.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 438 ... 483',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Hàng trăm bằng nhau. Em so sánh hàng chục.'],
      solution: 'Hàng trăm đều là 4. Hàng chục: 3 bé hơn 8. Vậy 438 < 483.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 178 ... 99',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em đếm xem mỗi số có mấy chữ số.'],
      solution: '178 có ba chữ số, 99 có hai chữ số. Vậy 178 > 99.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['527', '435', '618', '490'],
      answer: [1, 3, 0, 2],
      hints: ['Em so sánh hàng trăm trước. Hai số có cùng hàng trăm thì so sánh hàng chục.'],
      solution: 'Từ bé đến lớn: 435, 490, 527, 618.',
    },
    {
      type: 'choice',
      prompt:
        'Trường Thành Công có 689 học sinh, Trường Chiến Thắng có 695 học sinh, Trường Hoà Bình có 820 học sinh, Trường Đoàn Kết có 853 học sinh. Trường nào có ít học sinh nhất?',
      options: ['Trường Thành Công', 'Trường Chiến Thắng', 'Trường Hoà Bình', 'Trường Đoàn Kết'],
      answer: 0,
      hints: ['Em tìm số bé nhất trong bốn số.'],
      solution: '689 là số bé nhất. Trường Thành Công có ít học sinh nhất.',
    },
    {
      type: 'choice',
      prompt: 'Số 525 viết thành tổng nào?',
      options: ['500 + 20 + 5', '500 + 2 + 5', '50 + 20 + 5'],
      answer: 0,
      hints: ['525 gồm mấy trăm, mấy chục, mấy đơn vị?'],
      solution: '525 gồm 5 trăm, 2 chục, 5 đơn vị. Vậy 525 = 500 + 20 + 5.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tổng với số của nó.',
      left: ['400 + 10 + 5', '300 + 60 + 1', '400 + 9', '300 + 50'],
      right: ['415', '361', '409', '350', '451'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hàng nào không có trong tổng thì viết chữ số 0.'],
      solution: '400 + 10 + 5 = 415. 300 + 60 + 1 = 361. 400 + 9 = 409. 300 + 50 = 350.',
    },
    {
      type: 'number',
      prompt: 'Số 2?9 bé hơn số 219. Chữ số ở dấu hỏi là mấy?',
      answer: 0,
      hints: ['Hàng trăm và hàng đơn vị giống nhau. Hàng chục phải bé hơn 1.'],
      solution: 'Chữ số hàng chục phải bé hơn 1, nên chữ số đó là 0. Số đó là 209.',
    },
    {
      type: 'choice',
      prompt: 'Từ ba thẻ số 4, 5, 0, số bé nhất có ba chữ số lập được là số nào?',
      options: ['405', '450', '504', '540'],
      answer: 0,
      hints: ['Chữ số 0 không đứng đầu. Em chọn chữ số bé nhất khác 0 cho hàng trăm.'],
      solution: 'Các số lập được là 405, 450, 504, 540. Số bé nhất là 405.',
    },
  ],
  takeaways: [
    'Đọc số từ trái sang phải. Hàng chục là 0 thì đọc "linh".',
    'So sánh hàng trăm trước, rồi đến hàng chục, hàng đơn vị.',
    'Số gồm các trăm, chục, đơn vị: 372 = 300 + 70 + 2.',
  ],
};
