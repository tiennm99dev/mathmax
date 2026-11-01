/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép trừ có nhớ số có hai chữ số cho số có một chữ số: hàng đơn vị không trừ được thì đổi 1 chục thành 10 đơn vị rồi trừ, ví dụ 42 − 7 = 35.',
  intro:
    'Có 42 que tính, bớt đi 7 que. Chỉ có 2 que rời thì bớt sao được 7 que? Em tháo 1 bó chục thành 10 que rời nhé!',
  objectives: [
    'Trừ có nhớ số có hai chữ số cho số có một chữ số.',
    'Biết đổi 1 chục thành 10 đơn vị khi hàng đơn vị không trừ được.',
    'Đặt tính rồi tính đúng, thẳng cột.',
  ],
  sections: [
    {
      heading: 'Tháo 1 bó chục',
      blocks: [
        {
          type: 'p',
          text: 'Tính 42 − 7. Số 42 gồm 4 bó chục và 2 que rời. 2 que rời không đủ để bớt 7 que.',
        },
        {
          type: 'p',
          text: 'Em tháo 1 bó chục thành 10 que rời. Bây giờ có 3 bó chục và 12 que rời.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đổi 1 chục thành 10 đơn vị',
          text: '1 chục = 10 đơn vị. 12 que rời bớt 7 que còn 5 que. Còn 3 chục và 5 que rời. Vậy 42 − 7 = 35.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'p',
          text: 'Em viết 42, rồi viết 7 thẳng cột với 2 (hàng đơn vị). Viết dấu −, kẻ gạch ngang.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tính 42 − 7',
          text: '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 4 trừ 1 bằng 3, viết 3. Vậy 42 − 7 = 35.',
        },
        {
          type: 'table',
          head: ['Phép trừ', 'Hàng đơn vị', 'Hàng chục', 'Kết quả'],
          rows: [
            ['42 − 7', '12 − 7 = 5, viết 5, nhớ 1', '4 trừ 1 bằng 3', '35'],
            ['30 − 4', '10 − 4 = 6, viết 6, nhớ 1', '3 trừ 1 bằng 2', '26'],
            ['51 − 6', '11 − 6 = 5, viết 5, nhớ 1', '5 trừ 1 bằng 4', '45'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Không lấy số dưới trừ số trên',
          text: '42 − 7: không được lấy 7 − 2. Hàng đơn vị luôn lấy số trên trừ số dưới. Không đủ thì mượn 1 chục.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tháo bó que tính',
    instruction:
      'Chạm "Bớt 1 que" để bớt từng que rời. Hết que rời, em chạm "Tháo 1 bó chục" để có thêm 10 que rời, rồi bớt tiếp. Cuối cùng em chọn kết quả.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 42 − 7.',
      steps: [
        'Viết 7 thẳng cột với 2.',
        '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1.',
        '4 trừ 1 bằng 3, viết 3.',
      ],
      answer: '42 − 7 = 35.',
    },
    {
      problem: 'Đặt tính rồi tính: 30 − 4.',
      steps: [
        'Viết 4 thẳng cột với 0.',
        '0 không trừ được 4, lấy 10 trừ 4 bằng 6, viết 6, nhớ 1.',
        '3 trừ 1 bằng 2, viết 2.',
      ],
      answer: '30 − 4 = 26.',
    },
    {
      problem: 'Cửa hàng có 51 quả trứng, đã bán 6 quả. Cửa hàng còn lại bao nhiêu quả trứng?',
      steps: [
        'Bán đi thì em làm phép trừ: 51 − 6.',
        '1 không trừ được 6, lấy 11 trừ 6 bằng 5, viết 5, nhớ 1. 5 trừ 1 bằng 4, viết 4.',
        'Số quả trứng còn lại là: 51 − 6 = 45 (quả).',
      ],
      answer: 'Đáp số: 45 quả trứng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '42 − 7 = ?',
      options: ['45', '35', '36'],
      answer: 1,
      hints: ['2 không trừ được 7. Em lấy 12 trừ 7.', 'Đã mượn 1 chục, nên hàng chục còn 4 trừ 1.'],
      solution:
        '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 4 trừ 1 bằng 3, viết 3. Vậy 42 − 7 = 35.',
    },
    {
      type: 'count',
      prompt: 'Có 22 con bướm. 5 con bay đi. Hình vẽ những con bướm còn lại. Còn lại mấy con bướm?',
      picture: 'butterfly',
      answer: 17,
      choices: [16, 17, 18, 27],
      hints: ['Em tính 22 − 5.', '2 không trừ được 5, lấy 12 trừ 5.'],
      solution:
        '2 không trừ được 5, lấy 12 trừ 5 bằng 7, viết 7, nhớ 1. 2 trừ 1 bằng 1, viết 1. 22 − 5 = 17. Còn 17 con bướm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép trừ với kết quả của nó.',
      left: ['31 − 5', '64 − 8', '50 − 3', '83 − 9'],
      right: ['26', '56', '47', '74', '36'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hàng đơn vị không trừ được thì mượn 1 chục.', '50 − 3: lấy 10 trừ 3, rồi 5 trừ 1.'],
      solution:
        '31 − 5 = 26 (11 − 5 = 6). 64 − 8 = 56 (14 − 8 = 6). 50 − 3 = 47 (10 − 3 = 7). 83 − 9 = 74 (13 − 9 = 4).',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 53 − 8 theo đúng thứ tự.',
      items: [
        '5 trừ 1 bằng 4, viết 4.',
        'Viết 8 thẳng cột với 3.',
        '3 không trừ được 8, lấy 13 trừ 8 bằng 5, viết 5, nhớ 1.',
      ],
      answer: [1, 2, 0],
      hints: ['Đặt tính trước, rồi tính hàng đơn vị, sau cùng hàng chục.'],
      solution:
        'Viết 8 thẳng cột với 3. 3 không trừ được 8, lấy 13 trừ 8 bằng 5, viết 5, nhớ 1. 5 trừ 1 bằng 4, viết 4. Vậy 53 − 8 = 45.',
    },
    {
      type: 'choice',
      prompt: '1 chục bằng bao nhiêu đơn vị?',
      options: ['1 đơn vị', '10 đơn vị', '100 đơn vị'],
      answer: 1,
      hints: ['Một bó chục có mấy que tính rời?'],
      solution: 'Tháo 1 bó chục được 10 que rời. 1 chục = 10 đơn vị.',
    },
    {
      type: 'choice',
      prompt: 'Phép trừ nào có nhớ?',
      options: ['47 − 5', '62 − 9', '38 − 6'],
      answer: 1,
      hints: ['Xem hàng đơn vị: chữ số trên có bé hơn chữ số dưới không?'],
      solution: '7 trừ được 5, 8 trừ được 6: không nhớ. 2 không trừ được 9: có nhớ. 62 − 9 = 53.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 61 − 5 ... 57',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Tính 61 − 5 trước, rồi so sánh với 57.'],
      solution:
        '1 không trừ được 5, lấy 11 trừ 5 bằng 6, viết 6, nhớ 1. 6 trừ 1 bằng 5. 61 − 5 = 56. 56 bé hơn 57, nên 61 − 5 < 57.',
    },
    {
      type: 'choice',
      prompt: 'Lớp 2B có 33 bạn. 7 bạn đi tập văn nghệ. Trong lớp còn lại bao nhiêu bạn?',
      options: ['36', '26', '27'],
      answer: 1,
      hints: ['Bớt đi thì em làm phép trừ: 33 − 7.', '3 không trừ được 7, lấy 13 trừ 7.'],
      solution: 'Số bạn còn lại trong lớp là: 33 − 7 = 26 (bạn). Đáp số: 26 bạn.',
    },
  ],
  takeaways: [
    'Hàng đơn vị không trừ được thì đổi 1 chục thành 10 đơn vị, rồi trừ.',
    '42 − 7: 2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1; 4 trừ 1 bằng 3. Vậy 42 − 7 = 35.',
  ],
};
