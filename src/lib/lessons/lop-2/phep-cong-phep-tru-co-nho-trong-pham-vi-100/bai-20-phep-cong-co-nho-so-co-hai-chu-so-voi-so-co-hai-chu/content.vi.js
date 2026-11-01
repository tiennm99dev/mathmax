/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng có nhớ số có hai chữ số với số có hai chữ số: đặt tính dọc, cộng hàng đơn vị, đủ 10 thì nhớ 1 sang hàng chục, ví dụ 36 + 28 = 64.',
  intro:
    'Tính 36 + 28. Em đặt tính dọc, cộng hàng đơn vị trước. Được 10 hoặc hơn thì nhớ 1 sang hàng chục nhé!',
  objectives: [
    'Đặt tính dọc phép cộng hai số có hai chữ số, thẳng cột.',
    'Cộng có nhớ: nhớ 1 sang hàng chục.',
    'Giải bài toán có lời văn bằng phép cộng có nhớ.',
  ],
  sections: [
    {
      heading: 'Đặt tính dọc',
      blocks: [
        {
          type: 'p',
          text: 'Em viết 36, rồi viết 28 ở dưới: 8 thẳng cột với 6, 2 thẳng cột với 3.',
        },
        {
          type: 'p',
          text: 'Đơn vị thẳng cột với đơn vị. Chục thẳng cột với chục. Viết dấu +, kẻ gạch ngang.',
        },
      ],
    },
    {
      heading: 'Nhớ sang hàng chục',
      blocks: [
        {
          type: 'p',
          text: 'Em tính từ phải sang trái. Hàng đơn vị: 6 cộng 8 bằng 14. 14 là 1 chục và 4 đơn vị.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách tính 36 + 28',
          text: '6 cộng 8 bằng 14, viết 4, nhớ 1. 3 cộng 2 bằng 5, thêm 1 bằng 6, viết 6. Vậy 36 + 28 = 64.',
        },
        {
          type: 'table',
          head: ['Phép cộng', 'Hàng đơn vị', 'Hàng chục', 'Kết quả'],
          rows: [
            ['36 + 28', '6 + 8 = 14, viết 4, nhớ 1', '3 + 2 = 5, thêm 1 bằng 6', '64'],
            ['47 + 25', '7 + 5 = 12, viết 2, nhớ 1', '4 + 2 = 6, thêm 1 bằng 7', '72'],
            ['29 + 31', '9 + 1 = 10, viết 0, nhớ 1', '2 + 3 = 5, thêm 1 bằng 6', '60'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Nhớ 1 ở đâu?',
          text: 'Số 1 nhớ là 1 chục. Em cộng nó vào hàng chục, không cộng vào hàng đơn vị.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cộng dọc từng bước',
    instruction:
      'Chạm chữ số em viết ở hàng đơn vị, rồi ở hàng chục. Số nhớ nhỏ hiện ra khi em xong hàng đơn vị. Que tính bó lại 1 chục cho em xem.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 36 + 28.',
      steps: [
        'Viết 28 dưới 36, thẳng cột.',
        '6 cộng 8 bằng 14, viết 4, nhớ 1.',
        '3 cộng 2 bằng 5, thêm 1 bằng 6, viết 6.',
      ],
      answer: '36 + 28 = 64.',
    },
    {
      problem: 'Đặt tính rồi tính: 29 + 31.',
      steps: [
        'Viết 31 dưới 29, thẳng cột.',
        '9 cộng 1 bằng 10, viết 0, nhớ 1.',
        '2 cộng 3 bằng 5, thêm 1 bằng 6, viết 6.',
      ],
      answer: '29 + 31 = 60.',
    },
    {
      problem: 'Lớp 2A có 28 bạn. Lớp 2B có 27 bạn. Cả hai lớp có bao nhiêu bạn?',
      steps: [
        'Muốn biết cả hai lớp, em làm phép cộng: 28 + 27.',
        '8 cộng 7 bằng 15, viết 5, nhớ 1. 2 cộng 2 bằng 4, thêm 1 bằng 5, viết 5.',
        'Số bạn cả hai lớp là: 28 + 27 = 55 (bạn).',
      ],
      answer: 'Đáp số: 55 bạn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '36 + 28 = ?',
      options: ['54', '64', '514'],
      answer: 1,
      hints: ['6 + 8 = 14. Em viết 4, nhớ 1.', 'Hàng chục: 3 + 2, thêm 1 đã nhớ.'],
      solution:
        '6 cộng 8 bằng 14, viết 4, nhớ 1. 3 cộng 2 bằng 5, thêm 1 bằng 6, viết 6. Vậy 36 + 28 = 64.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép cộng với kết quả của nó.',
      left: ['19 + 25', '38 + 46', '57 + 35', '24 + 16'],
      right: ['44', '84', '92', '40', '34'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Cộng hàng đơn vị trước, nhớ 1 sang hàng chục.',
        '24 + 16: 4 + 6 = 10, viết 0, nhớ 1.',
      ],
      solution:
        '19 + 25 = 44. 38 + 46 = 84. 57 + 35 = 92. 24 + 16 = 40. Phép nào cũng nhớ 1 sang hàng chục.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 47 + 25 theo đúng thứ tự.',
      items: [
        '4 cộng 2 bằng 6, thêm 1 bằng 7, viết 7.',
        'Viết 25 dưới 47, thẳng cột.',
        '7 cộng 5 bằng 12, viết 2, nhớ 1.',
      ],
      answer: [1, 2, 0],
      hints: ['Đặt tính trước, rồi tính hàng đơn vị, sau cùng hàng chục.'],
      solution:
        'Viết 25 dưới 47, thẳng cột. 7 cộng 5 bằng 12, viết 2, nhớ 1. 4 cộng 2 bằng 6, thêm 1 bằng 7, viết 7. Vậy 47 + 25 = 72.',
    },
    {
      type: 'choice',
      prompt: 'Nam tính 45 + 37 = 72. Nam sai ở đâu?',
      options: ['Quên nhớ 1 sang hàng chục', 'Tính sai hàng đơn vị', 'Nam tính đúng'],
      answer: 0,
      hints: ['Em tự tính 45 + 37 rồi so với bài của Nam.', '5 + 7 = 12, viết 2, nhớ 1.'],
      solution:
        '5 cộng 7 bằng 12, viết 2, nhớ 1. 4 cộng 3 bằng 7, thêm 1 bằng 8. 45 + 37 = 82. Nam viết 7 ở hàng chục vì quên nhớ 1.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 28 + 34 ... 26 + 37',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Tính kết quả hai phép cộng trước, rồi so sánh.'],
      solution: '28 + 34 = 62. 26 + 37 = 63. 62 bé hơn 63, nên 28 + 34 < 26 + 37.',
    },
    {
      type: 'choice',
      prompt: 'Phép cộng nào có kết quả là 60?',
      options: ['35 + 25', '34 + 25', '36 + 25'],
      answer: 0,
      hints: ['Hàng đơn vị phải được 10 thì kết quả mới tròn chục.'],
      solution:
        '35 + 25: 5 + 5 = 10, viết 0, nhớ 1; 3 + 2 = 5, thêm 1 bằng 6. 35 + 25 = 60. Còn 34 + 25 = 59 và 36 + 25 = 61.',
    },
    {
      type: 'choice',
      prompt: 'Đàn gà có 36 con gà trống và 47 con gà mái. Đàn gà có tất cả bao nhiêu con?',
      options: ['73', '83', '713'],
      answer: 1,
      hints: ['Em làm phép cộng 36 + 47.', '6 + 7 = 13, viết 3, nhớ 1.'],
      solution: 'Số con gà có tất cả là: 36 + 47 = 83 (con). Đáp số: 83 con gà.',
    },
    {
      type: 'choice',
      prompt:
        'Mẹ hái được 39 quả cam. Bố hái được 45 quả cam. Cả hai người hái được bao nhiêu quả cam?',
      options: ['74', '84', '85'],
      answer: 1,
      hints: ['Cả hai người: em làm phép cộng 39 + 45.', '9 + 5 = 14, viết 4, nhớ 1.'],
      solution: 'Số quả cam cả hai người hái được là: 39 + 45 = 84 (quả). Đáp số: 84 quả cam.',
    },
  ],
  takeaways: [
    'Đặt tính dọc: đơn vị thẳng cột với đơn vị, chục thẳng cột với chục.',
    'Cộng hàng đơn vị trước. Được 10 hoặc hơn thì viết chữ số đơn vị, nhớ 1 sang hàng chục.',
    '36 + 28: 6 cộng 8 bằng 14, viết 4, nhớ 1; 3 cộng 2 bằng 5, thêm 1 bằng 6. Vậy 36 + 28 = 64.',
  ],
};
