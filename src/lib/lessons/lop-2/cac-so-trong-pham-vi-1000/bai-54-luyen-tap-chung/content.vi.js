/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về các số trong phạm vi 1000: đọc, viết số, trăm chục đơn vị, viết số thành tổng, số liền trước, số liền sau, tia số, so sánh và giải bài toán.',
  intro:
    'Em đã biết rất nhiều về các số đến 1000. Hôm nay em ôn lại tất cả: đọc số, viết số, tìm số trên tia số và so sánh. Em giúp cô đếm bút chì nữa nhé!',
  objectives: [
    'Đọc, viết được các số trong phạm vi 1000.',
    'Nhận ra trăm, chục, đơn vị và viết số thành tổng.',
    'Tìm được số liền trước, số liền sau, số trên tia số.',
    'So sánh, sắp xếp các số và giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Số', 'Đọc là', 'Viết thành tổng'],
          rows: [
            ['345', 'ba trăm bốn mươi lăm', '300 + 40 + 5'],
            ['408', 'bốn trăm linh tám', '400 + 8'],
            ['360', 'ba trăm sáu mươi', '300 + 60'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Số liền trước, số liền sau',
          text: 'Số liền sau lớn hơn số đó 1 đơn vị. Số liền trước bé hơn số đó 1 đơn vị. Số liền sau của 999 là 1000.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh',
          text: 'So sánh hàng trăm trước, rồi đến hàng chục, cuối cùng là hàng đơn vị.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Chữ số 0 vẫn giữ chỗ của hàng. 405 có 0 chục, còn 450 có 5 chục.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Em đọc câu hỏi rồi chạm vào đáp án. Sai lần đầu, em được gợi ý và làm lại. Hết bộ, em biết phần nào cần ôn và có thể làm bộ khác.',
  },
  examples: [
    {
      problem: 'Số 507 gồm mấy trăm, mấy chục, mấy đơn vị? Số đó đọc thế nào?',
      steps: [
        'Từ trái sang phải: 5 ở hàng trăm, 0 ở hàng chục, 7 ở hàng đơn vị.',
        'Hàng chục là 0, nên em đọc "linh".',
      ],
      answer: '507 gồm 5 trăm, 0 chục, 7 đơn vị, đọc là: năm trăm linh bảy.',
    },
    {
      problem:
        'Cô có 2 hộp bút chì, mỗi hộp 100 cái, 6 gói, mỗi gói 10 cái, và 3 cái lẻ. Cô có bao nhiêu cái bút chì?',
      steps: [
        '2 hộp là 2 trăm cái.',
        '6 gói là 6 chục cái.',
        '3 cái lẻ là 3 đơn vị.',
        '2 trăm, 6 chục, 3 đơn vị là số 263.',
      ],
      answer: 'Cô có 263 cái bút chì.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số "bốn trăm linh năm" viết là số nào?',
      options: ['405', '450', '45', '540'],
      answer: 0,
      hints: ['"Linh" cho biết hàng chục là 0.'],
      solution: 'Có 4 trăm, 0 chục, 5 đơn vị. Số đó là 405.',
    },
    {
      type: 'choice',
      prompt: 'Số 307 đọc là gì?',
      options: ['ba trăm linh bảy', 'ba trăm bảy mươi', 'ba mươi bảy'],
      answer: 0,
      hints: ['Hàng chục là 0, em đọc "linh".'],
      solution: '307 gồm 3 trăm, 0 chục, 7 đơn vị, đọc là: ba trăm linh bảy.',
    },
    {
      type: 'choice',
      prompt: 'Có 5 tấm trăm và 7 khối đơn vị. Đó là số nào?',
      options: ['57', '507', '570', '750'],
      answer: 1,
      hints: ['Không có thanh chục nào, nên hàng chục là 0.'],
      solution: '5 trăm, 0 chục, 7 đơn vị là số 507.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi số với tổng của nó.',
      left: ['352', '325', '235'],
      right: ['300 + 20 + 5', '300 + 50 + 2', '200 + 30 + 5'],
      pairs: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
      hints: ['Em nhìn chữ số hàng chục của mỗi số.'],
      solution: '352 = 300 + 50 + 2; 325 = 300 + 20 + 5; 235 = 200 + 30 + 5.',
    },
    {
      type: 'choice',
      prompt: 'Số liền sau của 999 là số nào?',
      options: ['998', '1000', '990'],
      answer: 1,
      hints: ['Số liền sau lớn hơn số đó 1 đơn vị.'],
      solution: '999 thêm 1 là 1000.',
    },
    {
      type: 'choice',
      prompt: 'Số liền trước của 680 là số nào?',
      options: ['681', '670', '679'],
      answer: 2,
      hints: ['Số liền trước bé hơn số đó 1 đơn vị.'],
      solution: '680 bớt 1 là 679.',
    },
    {
      type: 'choice',
      prompt: 'Trên tia số có các vạch 360, 361, 362, ?, 364. Số bị che là số nào?',
      options: ['363', '365', '373'],
      answer: 0,
      hints: ['Mỗi vạch hơn vạch trước 1 đơn vị.'],
      solution: '362 thêm 1 là 363.',
    },
    {
      type: 'multi',
      prompt: 'Em chọn tất cả quả táo ghi số lớn hơn 365.',
      options: ['250', '372', '365', '400', '356', '380'],
      answers: [1, 3, 5],
      hints: ['Em so sánh từng số với 365. Số bằng 365 thì không chọn.'],
      solution: '372, 400 và 380 lớn hơn 365. 250 và 356 bé hơn 365, còn 365 thì bằng 365.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 790 ... 709.',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Hàng trăm bằng nhau. Em nhìn hàng chục.'],
      solution: 'Hàng trăm bằng nhau. 9 chục lớn hơn 0 chục, nên 790 > 709.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số từ bé đến lớn.',
      items: ['572', '527', '275', '725'],
      answer: [2, 1, 0, 3],
      hints: ['So sánh hàng trăm trước. 527 và 572 cùng có 5 trăm, em nhìn hàng chục.'],
      solution: '275 < 527 < 572 < 725.',
    },
    {
      type: 'choice',
      prompt: 'Con bò nặng 420 kg. Con trâu nặng 402 kg. Con nào nặng hơn?',
      options: ['Con bò', 'Con trâu'],
      answer: 0,
      hints: ['So sánh 420 và 402, bắt đầu từ hàng trăm.'],
      solution: 'Hàng trăm bằng nhau. 2 chục lớn hơn 0 chục, nên 420 > 402. Con bò nặng hơn.',
    },
    {
      type: 'choice',
      prompt:
        'Cô có 3 hộp bút chì, mỗi hộp 100 cái, 4 gói, mỗi gói 10 cái, và 6 cái lẻ. Cô có bao nhiêu cái bút chì?',
      options: ['346', '364', '643', '340'],
      answer: 0,
      hints: ['Mỗi hộp là 1 trăm, mỗi gói là 1 chục, mỗi cái lẻ là 1 đơn vị.'],
      solution: '3 trăm, 4 chục, 6 đơn vị là số 346. Cô có 346 cái bút chì.',
    },
  ],
  takeaways: [
    'Mỗi chữ số cho biết có mấy trăm, mấy chục, mấy đơn vị.',
    'Số liền sau hơn 1 đơn vị, số liền trước kém 1 đơn vị.',
    'So sánh từ hàng trăm, rồi đến hàng chục, hàng đơn vị.',
  ],
};
