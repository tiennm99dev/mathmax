/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh hai số có ba chữ số bắt đầu từ hàng trăm, rồi đến hàng chục, hàng đơn vị; sắp xếp các số theo thứ tự.',
  intro:
    'Đà điểu cao 213 cm, voi cao 396 cm. Con nào cao hơn? Em chỉ cần nhìn hàng trăm là biết ngay! Hôm nay em học cách so sánh và xếp các số có ba chữ số.',
  objectives: [
    'So sánh được hai số có ba chữ số, bắt đầu từ hàng trăm.',
    'Dùng đúng các dấu >, <, =.',
    'Xếp được các số theo thứ tự, tìm số lớn nhất và số bé nhất.',
  ],
  sections: [
    {
      heading: 'So sánh từ hàng trăm',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'So sánh hàng trăm trước. Hàng trăm bằng nhau thì so sánh hàng chục. Hàng chục cũng bằng nhau thì so sánh hàng đơn vị.',
        },
        {
          type: 'table',
          head: ['Hai số', 'Em nhìn', 'Kết quả'],
          rows: [
            ['847 và 747', '8 trăm lớn hơn 7 trăm', '847 > 747'],
            ['352 và 325', 'Cùng 3 trăm. 5 chục lớn hơn 2 chục', '352 > 325'],
            ['471 và 478', 'Cùng 4 trăm, 7 chục. 1 bé hơn 8', '471 < 478'],
            ['478 và 478', 'Mọi hàng đều giống nhau', '478 = 478'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Hàng trăm quyết định trước. 599 có nhiều chữ số 9, nhưng 5 trăm bé hơn 6 trăm, nên 599 < 601.',
        },
      ],
    },
    {
      heading: 'Sắp xếp thứ tự',
      blocks: [
        {
          type: 'p',
          text: 'Muốn xếp từ bé đến lớn, em tìm số bé nhất trước. Sau đó em tìm số bé nhất trong các số còn lại.',
        },
        {
          type: 'p',
          text: 'Từ bé đến lớn: 235 < 253 < 325 < 352. Số bé nhất là 235, số lớn nhất là 352.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thẻ số',
    instruction:
      'Em chạm các thẻ theo thứ tự từ bé đến lớn. Bảng hiện ra cho em thấy hai số khác nhau ở hàng nào.',
  },
  examples: [
    {
      problem: 'Điền dấu >, <, = vào chỗ trống: 352 ... 325.',
      steps: [
        'Hàng trăm: hai số đều có 3 trăm.',
        'Hàng chục: 5 chục lớn hơn 2 chục.',
        'Không cần nhìn hàng đơn vị nữa.',
      ],
      answer: '352 > 325.',
    },
    {
      problem: 'Điền dấu >, <, = vào chỗ trống: 790 ... 789.',
      steps: ['Hàng trăm: hai số đều có 7 trăm.', 'Hàng chục: 9 chục lớn hơn 8 chục.'],
      answer: '790 > 789.',
    },
    {
      problem: 'Xếp các số 601, 790, 599, 789 theo thứ tự từ bé đến lớn.',
      steps: [
        'Hàng trăm: 5 trăm bé nhất, nên 599 đứng đầu.',
        'Tiếp theo là 6 trăm: số 601.',
        '789 và 790 đều có 7 trăm. 8 chục bé hơn 9 chục, nên 789 đứng trước 790.',
      ],
      answer: '599 < 601 < 789 < 790.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 847 ... 747.',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['So sánh hàng trăm của hai số.'],
      solution: '8 trăm lớn hơn 7 trăm, nên 847 > 747.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 599 ... 601.',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em nhìn hàng trăm trước, chưa cần nhìn hàng chục.'],
      solution: '5 trăm bé hơn 6 trăm, nên 599 < 601.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 264 ... 269.',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Hàng trăm và hàng chục giống nhau. Em nhìn hàng đơn vị.'],
      solution: 'Hàng trăm, hàng chục bằng nhau. 4 đơn vị bé hơn 9 đơn vị, nên 264 < 269.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 478 ... 478.',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Em so sánh từng hàng của hai số.'],
      solution: 'Hai số giống nhau ở mọi hàng, nên 478 = 478.',
    },
    {
      type: 'choice',
      prompt: 'Câu nào đúng?',
      options: ['678 > 768', '599 < 601', '352 < 325'],
      answer: 1,
      hints: ['Với mỗi câu, em so sánh từ hàng trăm.'],
      solution:
        '678 < 768 vì 6 trăm bé hơn 7 trăm. 352 > 325 vì 5 chục lớn hơn 2 chục. Chỉ có 599 < 601 là đúng.',
    },
    {
      type: 'choice',
      prompt: 'Số nào bé nhất?',
      options: ['471', '417', '475'],
      answer: 1,
      hints: ['Cả ba số đều có 4 trăm. Em so sánh hàng chục.'],
      solution: '1 chục bé hơn 7 chục, nên 417 là số bé nhất.',
    },
    {
      type: 'order',
      prompt: 'Em xếp chiều cao các con vật từ thấp đến cao.',
      items: ['Đà điểu: 213 cm', 'Hươu cao cổ: 579 cm', 'Voi: 396 cm', 'Gấu nâu: 274 cm'],
      answer: [0, 3, 2, 1],
      hints: ['So sánh hàng trăm trước. 213 và 274 cùng có 2 trăm, em nhìn hàng chục.'],
      solution: '213 < 274 < 396 < 579. Thứ tự: đà điểu, gấu nâu, voi, hươu cao cổ.',
    },
    {
      type: 'choice',
      prompt: 'Đà điểu cao 213 cm, hươu cao cổ cao 579 cm, voi cao 396 cm. Con nào cao nhất?',
      options: ['Đà điểu', 'Hươu cao cổ', 'Voi'],
      answer: 1,
      hints: ['Tìm số có hàng trăm lớn nhất.'],
      solution: '5 trăm là lớn nhất, nên hươu cao cổ cao nhất.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số từ bé đến lớn.',
      items: ['814', '184', '841', '148'],
      answer: [3, 1, 0, 2],
      hints: ['Hai số có 1 trăm và hai số có 8 trăm. Em so sánh hàng chục trong mỗi cặp.'],
      solution: '148 < 184 < 814 < 841.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số từ lớn đến bé.',
      items: ['305', '530', '350', '503'],
      answer: [1, 3, 2, 0],
      hints: ['Tìm số lớn nhất trước. Hai số có 5 trăm, em so sánh hàng chục của chúng.'],
      solution: '530 > 503 > 350 > 305.',
    },
    {
      type: 'choice',
      prompt: 'Dùng cả ba thẻ 2, 3, 5, mỗi thẻ một lần. Số lớn nhất em lập được là số nào?',
      options: ['352', '523', '532', '235'],
      answer: 2,
      hints: [
        'Đặt thẻ lớn nhất ở hàng trăm.',
        'Sau đó đặt thẻ lớn hơn trong hai thẻ còn lại ở hàng chục.',
      ],
      solution: 'Hàng trăm là 5, hàng chục là 3, hàng đơn vị là 2. Số lớn nhất là 532.',
    },
  ],
  takeaways: [
    'So sánh hàng trăm trước, rồi đến hàng chục, cuối cùng là hàng đơn vị.',
    'Muốn xếp từ bé đến lớn, em tìm số bé nhất trước.',
  ],
};
