/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng có nhớ trong phạm vi 1000: hàng nào đủ 10 thì viết chữ số đơn vị và nhớ 1 sang hàng liền trên, sang hàng chục hoặc hàng trăm.',
  intro:
    'Rô-bốt vẽ bản đồ bằng 709 chấm xanh và 289 chấm đỏ. Có tất cả bao nhiêu chấm màu? Khi đủ 10 khối, em đổi lấy 1 khối của hàng trên nhé!',
  objectives: [
    'Cộng có nhớ sang hàng chục: đủ 10 đơn vị đổi thành 1 chục.',
    'Cộng có nhớ sang hàng trăm: đủ 10 chục đổi thành 1 trăm.',
    'Đặt tính rồi tính và giải bài toán có phép cộng.',
  ],
  sections: [
    {
      heading: 'Đủ 10 đơn vị, nhớ sang hàng chục',
      blocks: [
        { type: 'p', text: 'Tính 427 + 246. Hàng đơn vị: 7 khối và 6 khối là 13 khối.' },
        {
          type: 'p',
          text: 'Đủ 10 khối đơn vị rồi! Em đổi 10 khối thành 1 thanh chục, còn lại 3 khối.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tính 427 + 246',
          text: '7 cộng 6 bằng 13, viết 3, nhớ 1. 2 cộng 4 bằng 6, thêm 1 bằng 7, viết 7. 4 cộng 2 bằng 6, viết 6. Vậy 427 + 246 = 673.',
        },
      ],
    },
    {
      heading: 'Đủ 10 chục, nhớ sang hàng trăm',
      blocks: [
        { type: 'p', text: 'Tính 381 + 342. Hàng chục: 8 thanh và 4 thanh là 12 thanh.' },
        { type: 'p', text: '10 thanh chục đổi thành 1 tấm trăm, còn lại 2 thanh.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tính 381 + 342',
          text: '1 cộng 2 bằng 3, viết 3. 8 cộng 4 bằng 12, viết 2, nhớ 1. 3 cộng 3 bằng 6, thêm 1 bằng 7, viết 7. Vậy 381 + 342 = 723.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '10 đơn vị = 1 chục. 10 chục = 1 trăm. Hàng nào đủ 10 thì nhớ 1 sang hàng liền bên trái.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng quên nhớ',
          text: 'Đã nhớ 1 thì phải thêm 1 ở hàng tiếp theo. Quên thêm là kết quả sai ngay.',
        },
      ],
    },
    {
      heading: 'Tính nhẩm số tròn trăm',
      blocks: [
        { type: 'p', text: 'Em cộng số trăm: 4 trăm + 2 trăm = 6 trăm. Vậy 400 + 200 = 600.' },
        { type: 'p', text: '3 trăm + 7 trăm = 10 trăm. Vậy 300 + 700 = 1000.' },
      ],
    },
  ],
  explore: {
    title: 'Đổi 10 lấy 1',
    instruction:
      'Em gộp khối từng hàng. Đủ 10 khối thì đổi thành 1 khối của hàng trên, rồi đếm các khối để viết kết quả.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 729 + 32.',
      steps: [
        'Viết 2 thẳng cột với 9, viết 3 thẳng cột với 2.',
        '9 cộng 2 bằng 11, viết 1, nhớ 1.',
        '2 cộng 3 bằng 5, thêm 1 bằng 6, viết 6.',
        'Hạ 7, viết 7.',
      ],
      answer: '729 + 32 = 761.',
    },
    {
      problem: 'Đặt tính rồi tính: 546 + 172.',
      steps: [
        '6 cộng 2 bằng 8, viết 8.',
        '4 cộng 7 bằng 11, viết 1, nhớ 1.',
        '5 cộng 1 bằng 6, thêm 1 bằng 7, viết 7.',
      ],
      answer: '546 + 172 = 718.',
    },
    {
      problem: 'Rô-bốt vẽ 709 chấm xanh và 289 chấm đỏ. Rô-bốt vẽ tất cả bao nhiêu chấm màu?',
      steps: [
        'Tìm tất cả nên em làm phép cộng: 709 + 289.',
        '9 cộng 9 bằng 18, viết 8, nhớ 1.',
        '0 cộng 8 bằng 8, thêm 1 bằng 9, viết 9.',
        '7 cộng 2 bằng 9, viết 9.',
      ],
      answer: '709 + 289 = 998. Rô-bốt vẽ tất cả 998 chấm màu.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '427 + 246 = ?',
      options: ['673', '663', '683', '773'],
      answer: 0,
      hints: [
        '7 cộng 6 được hơn 10. Em viết chữ số đơn vị và nhớ 1.',
        'Đừng quên thêm 1 ở hàng chục.',
      ],
      solution:
        '7 cộng 6 bằng 13, viết 3, nhớ 1. 2 cộng 4 bằng 6, thêm 1 bằng 7, viết 7. 4 cộng 2 bằng 6, viết 6.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 326 + 29 = ?',
      answer: 355,
      hints: ['Hàng đơn vị: 6 + 9. Nhớ 1 sang hàng chục.', 'Hàng trăm có một chữ số, em hạ xuống.'],
      solution:
        '6 cộng 9 bằng 15, viết 5, nhớ 1. 2 cộng 2 bằng 4, thêm 1 bằng 5, viết 5. Hạ 3. Vậy 326 + 29 = 355.',
    },
    {
      type: 'choice',
      prompt: '457 + 452 = ?',
      options: ['909', '809', '899', '919'],
      answer: 0,
      hints: ['Hàng chục: 5 + 5 đủ 10 chục. Em viết 0, nhớ 1.'],
      solution:
        '7 cộng 2 bằng 9, viết 9. 5 cộng 5 bằng 10, viết 0, nhớ 1. 4 cộng 4 bằng 8, thêm 1 bằng 9, viết 9.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 762 + 184 = ?',
      answer: 946,
      hints: ['Hàng chục: 6 + 8 được hơn 10.', 'Nhớ 1 sang hàng trăm: 7 + 1 thêm 1.'],
      solution:
        '2 cộng 4 bằng 6, viết 6. 6 cộng 8 bằng 14, viết 4, nhớ 1. 7 cộng 1 bằng 8, thêm 1 bằng 9, viết 9.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép cộng với kết quả đúng.',
      left: ['548 + 312', '592 + 234', '690 + 89', '427 + 125'],
      right: ['860', '826', '779', '552'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tính từng hàng, nhớ khi đủ 10.'],
      solution: '548 + 312 = 860. 592 + 234 = 826. 690 + 89 = 779. 427 + 125 = 552.',
    },
    {
      type: 'multi',
      prompt: 'Tính nhẩm: phép tính nào có kết quả bằng 1000? Em chọn tất cả.',
      options: ['400 + 600', '200 + 600', '100 + 900', '500 + 400'],
      answers: [0, 2],
      hints: ['Em cộng số trăm. 10 trăm là 1000.'],
      solution: '400 + 600 = 1000 và 100 + 900 = 1000. 200 + 600 = 800, còn 500 + 400 = 900.',
    },
    {
      type: 'number',
      prompt:
        'Ngày thứ nhất, đàn sếu bay được 248 km. Ngày thứ hai, đàn sếu bay được nhiều hơn ngày thứ nhất 70 km. Ngày thứ hai đàn sếu bay được bao nhiêu ki-lô-mét?',
      answer: 318,
      unit: 'km',
      hints: [
        '"Nhiều hơn" nên em làm phép cộng.',
        'Em tính 248 + 70. Hàng chục đủ 10 thì nhớ 1 sang hàng trăm.',
      ],
      solution: 'Ngày thứ hai đàn sếu bay được: 248 + 70 = 318 (km). Đáp số: 318 km.',
    },
    {
      type: 'number',
      prompt:
        'Toà nhà A cao 336 m. Toà nhà B cao hơn toà nhà A 129 m. Toà nhà B cao bao nhiêu mét?',
      answer: 465,
      unit: 'm',
      hints: ['"Cao hơn" nên em làm phép cộng.', 'Em tính 336 + 129.'],
      solution: 'Toà nhà B cao: 336 + 129 = 465 (m). Đáp số: 465 m.',
    },
    {
      type: 'choice',
      prompt:
        'Bóng đèn sáng khi phép tính có kết quả là "sáu trăm linh ba". Phép tính nào làm đèn sáng?',
      options: ['264 + 375', '153 + 450', '246 + 347'],
      answer: 1,
      hints: ['"Sáu trăm linh ba" viết là số gì?', 'Em tính kết quả của từng phép cộng.'],
      solution:
        '"Sáu trăm linh ba" viết là 603. 264 + 375 = 639. 153 + 450 = 603. 246 + 347 = 593. Vậy 153 + 450 làm đèn sáng.',
    },
  ],
  takeaways: [
    'Hàng nào đủ 10 thì viết chữ số đơn vị, nhớ 1 sang hàng bên trái.',
    '10 đơn vị đổi được 1 chục, 10 chục đổi được 1 trăm.',
    'Đã nhớ 1 thì phải thêm 1 ở hàng tiếp theo.',
  ],
};
