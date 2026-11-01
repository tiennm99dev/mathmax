/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng có nhớ số có hai chữ số với số có một chữ số: cộng hàng đơn vị, đủ 10 đơn vị thì đổi thành 1 chục và nhớ 1 sang hàng chục, ví dụ 35 + 7 = 42.',
  intro:
    'Có 35 que tính, thêm 7 que nữa. Có tất cả bao nhiêu que? Em thêm từng que, đủ 10 que rời thì bó thành 1 chục nhé!',
  objectives: [
    'Cộng có nhớ số có hai chữ số với số có một chữ số.',
    'Biết đổi 10 đơn vị thành 1 chục và nhớ 1 sang hàng chục.',
    'Đặt tính rồi tính đúng, thẳng cột.',
  ],
  sections: [
    {
      heading: 'Đủ 10 que rời thì bó thành 1 chục',
      blocks: [
        {
          type: 'p',
          text: 'Tính 35 + 7. Số 35 gồm 3 bó chục và 5 que rời. Em thêm 7 que rời.',
        },
        {
          type: 'p',
          text: '5 que rời và 7 que rời là 12 que rời. 10 que rời em bó thành 1 chục, còn 2 que rời.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đổi 10 đơn vị thành 1 chục',
          text: '10 đơn vị = 1 chục. Bây giờ có 4 chục và 2 que rời. Vậy 35 + 7 = 42.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'p',
          text: 'Em viết 35, rồi viết 7 thẳng cột với 5 (hàng đơn vị). Viết dấu +, kẻ gạch ngang.',
        },
        {
          type: 'p',
          text: 'Em tính từ phải sang trái: hàng đơn vị trước, hàng chục sau.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tính 35 + 7',
          text: '5 cộng 7 bằng 12, viết 2, nhớ 1. 3 thêm 1 bằng 4, viết 4. Vậy 35 + 7 = 42.',
        },
        {
          type: 'table',
          head: ['Phép cộng', 'Hàng đơn vị', 'Hàng chục', 'Kết quả'],
          rows: [
            ['35 + 7', '5 + 7 = 12, viết 2, nhớ 1', '3 thêm 1 bằng 4', '42'],
            ['46 + 4', '6 + 4 = 10, viết 0, nhớ 1', '4 thêm 1 bằng 5', '50'],
            ['28 + 5', '8 + 5 = 13, viết 3, nhớ 1', '2 thêm 1 bằng 3', '33'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng quên nhớ 1',
          text: 'Nếu quên nhớ 1, em sẽ viết sai 35 + 7 = 32. Hàng chục phải thêm 1.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bó que tính',
    instruction:
      'Chạm "Thêm 1 que" để thêm từng que tính. Đủ 10 que rời, các que tự bó thành 1 chục. Rồi em chọn kết quả của phép cộng.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 35 + 7.',
      steps: [
        'Viết 7 thẳng cột với 5.',
        '5 cộng 7 bằng 12, viết 2, nhớ 1.',
        '3 thêm 1 bằng 4, viết 4.',
      ],
      answer: '35 + 7 = 42.',
    },
    {
      problem: 'Đặt tính rồi tính: 46 + 4.',
      steps: [
        'Viết 4 thẳng cột với 6.',
        '6 cộng 4 bằng 10, viết 0, nhớ 1.',
        '4 thêm 1 bằng 5, viết 5.',
      ],
      answer: '46 + 4 = 50.',
    },
    {
      problem: 'Có 28 quả bóng, thêm 5 quả nữa. Có tất cả bao nhiêu quả bóng?',
      steps: ['Em tính 28 + 5.', '8 cộng 5 bằng 13, viết 3, nhớ 1.', '2 thêm 1 bằng 3, viết 3.'],
      answer: 'Có tất cả 33 quả bóng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '35 + 7 = ?',
      options: ['32', '42', '41'],
      answer: 1,
      hints: ['5 + 7 = 12. Em viết 2 và nhớ 1.', 'Hàng chục: 3 thêm 1.'],
      solution: '5 cộng 7 bằng 12, viết 2, nhớ 1. 3 thêm 1 bằng 4, viết 4. Vậy 35 + 7 = 42.',
    },
    {
      type: 'count',
      prompt: 'Có 18 quả táo. Mẹ mua thêm 4 quả. Có tất cả mấy quả táo?',
      picture: 'apple',
      answer: 22,
      choices: [12, 21, 22, 23],
      hints: ['Em tính 18 + 4.', '8 + 4 = 12, viết 2, nhớ 1.'],
      solution:
        '8 cộng 4 bằng 12, viết 2, nhớ 1. 1 thêm 1 bằng 2, viết 2. 18 + 4 = 22. Có 22 quả táo.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép cộng với kết quả của nó.',
      left: ['76 + 5', '87 + 4', '39 + 9', '25 + 7'],
      right: ['81', '91', '48', '32', '42'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Cộng hàng đơn vị trước. Đủ 10 thì nhớ 1.', '39 + 9: 9 + 9 = 18, viết 8, nhớ 1.'],
      solution:
        '76 + 5 = 81 (6 + 5 = 11). 87 + 4 = 91 (7 + 4 = 11). 39 + 9 = 48 (9 + 9 = 18). 25 + 7 = 32 (5 + 7 = 12).',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 58 + 6 theo đúng thứ tự.',
      items: [
        '5 thêm 1 bằng 6, viết 6.',
        'Viết 6 thẳng cột với 8.',
        '8 cộng 6 bằng 14, viết 4, nhớ 1.',
      ],
      answer: [1, 2, 0],
      hints: ['Đầu tiên em đặt tính cho thẳng cột.', 'Tính hàng đơn vị trước hàng chục.'],
      solution:
        'Viết 6 thẳng cột với 8. 8 cộng 6 bằng 14, viết 4, nhớ 1. 5 thêm 1 bằng 6, viết 6. Vậy 58 + 6 = 64.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính 63 + 7. Em viết số 7 thẳng cột với chữ số nào?',
      options: ['Thẳng cột với 6 (hàng chục)', 'Thẳng cột với 3 (hàng đơn vị)'],
      answer: 1,
      hints: ['7 là số có một chữ số: 7 đơn vị.'],
      solution: '7 là 7 đơn vị, nên viết thẳng cột với 3 ở hàng đơn vị. 63 + 7 = 70.',
    },
    {
      type: 'choice',
      prompt: 'Phép cộng nào có nhớ?',
      options: ['34 + 5', '36 + 8', '52 + 7'],
      answer: 1,
      hints: ['Em cộng hai chữ số ở hàng đơn vị. Được 10 hoặc hơn thì có nhớ.'],
      solution: '4 + 5 = 9 và 2 + 7 = 9: không nhớ. 6 + 8 = 14: có nhớ. 36 + 8 = 44.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 29 + 3 ... 31',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Tính 29 + 3 trước, rồi so sánh với 31.'],
      solution:
        '9 + 3 = 12, viết 2, nhớ 1. 2 thêm 1 bằng 3. 29 + 3 = 32. 32 lớn hơn 31, nên 29 + 3 > 31.',
    },
    {
      type: 'choice',
      prompt:
        'Thư viện có 45 quyển truyện. Cô mua thêm 8 quyển. Thư viện có tất cả bao nhiêu quyển truyện?',
      options: ['43', '53', '52'],
      answer: 1,
      hints: ['Có thêm thì em làm phép cộng: 45 + 8.', '5 + 8 = 13, viết 3, nhớ 1.'],
      solution: 'Số quyển truyện có tất cả là: 45 + 8 = 53 (quyển). Đáp số: 53 quyển truyện.',
    },
  ],
  takeaways: [
    'Cộng hàng đơn vị trước. Đủ 10 đơn vị thì đổi thành 1 chục, nhớ 1 sang hàng chục.',
    '35 + 7: 5 cộng 7 bằng 12, viết 2, nhớ 1; 3 thêm 1 bằng 4. Vậy 35 + 7 = 42.',
  ],
};
