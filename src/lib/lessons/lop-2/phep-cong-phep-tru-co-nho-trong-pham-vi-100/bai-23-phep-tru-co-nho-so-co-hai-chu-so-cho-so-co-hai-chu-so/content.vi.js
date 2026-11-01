/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép trừ có nhớ số có hai chữ số cho số có hai chữ số: đặt tính dọc, hàng đơn vị không trừ được thì mượn 1 chục, rồi nhớ 1 vào hàng chục của số trừ, ví dụ 62 − 37 = 25.',
  intro:
    'Tính 62 − 37. Hàng đơn vị: 2 không trừ được 7. Em mượn 1 chục, rồi nhớ trả lại ở hàng chục nhé!',
  objectives: [
    'Đặt tính dọc phép trừ hai số có hai chữ số, thẳng cột.',
    'Trừ có nhớ: mượn 1 chục ở hàng đơn vị, nhớ 1 ở hàng chục.',
    'Giải bài toán có lời văn bằng phép trừ có nhớ.',
  ],
  sections: [
    {
      heading: 'Mượn 1 chục',
      blocks: [
        {
          type: 'p',
          text: 'Em viết 37 dưới 62: 7 thẳng cột với 2, 3 thẳng cột với 6.',
        },
        {
          type: 'p',
          text: 'Hàng đơn vị: 2 không trừ được 7. Em mượn 1 chục: 2 thành 12. 12 trừ 7 bằng 5.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách tính 62 − 37',
          text: '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2. Vậy 62 − 37 = 25.',
        },
      ],
    },
    {
      heading: 'Nhớ 1 ở hàng chục',
      blocks: [
        {
          type: 'p',
          text: 'Đã mượn 1 chục thì ở hàng chục em thêm 1 vào số trừ, rồi mới trừ.',
        },
        {
          type: 'table',
          head: ['Phép trừ', 'Hàng đơn vị', 'Hàng chục', 'Kết quả'],
          rows: [
            ['62 − 37', '12 − 7 = 5, viết 5, nhớ 1', '3 thêm 1 bằng 4, 6 − 4 = 2', '25'],
            ['50 − 18', '10 − 8 = 2, viết 2, nhớ 1', '1 thêm 1 bằng 2, 5 − 2 = 3', '32'],
            ['45 − 17', '15 − 7 = 8, viết 8, nhớ 1', '1 thêm 1 bằng 2, 4 − 2 = 2', '28'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng quên nhớ 1',
          text: 'Nếu quên nhớ 1, em sẽ viết sai 62 − 37 = 35. Hãy thêm 1 vào hàng chục của số trừ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trừ dọc từng bước',
    instruction:
      'Chạm "Tháo 1 bó chục" để mượn 1 chục. Rồi chạm chữ số em viết ở hàng đơn vị, sau đó ở hàng chục. Que tính bị gạch theo từng bước.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 62 − 37.',
      steps: [
        'Viết 37 dưới 62, thẳng cột.',
        '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1.',
        '3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2.',
      ],
      answer: '62 − 37 = 25.',
    },
    {
      problem: 'Đặt tính rồi tính: 50 − 18.',
      steps: [
        'Viết 18 dưới 50, thẳng cột.',
        '0 không trừ được 8, lấy 10 trừ 8 bằng 2, viết 2, nhớ 1.',
        '1 thêm 1 bằng 2, 5 trừ 2 bằng 3, viết 3.',
      ],
      answer: '50 − 18 = 32.',
    },
    {
      problem: 'Trên đĩa có 45 cái bánh. Cả nhà đã ăn 17 cái. Trên đĩa còn lại bao nhiêu cái bánh?',
      steps: [
        'Ăn bớt đi thì em làm phép trừ: 45 − 17.',
        '5 không trừ được 7, lấy 15 trừ 7 bằng 8, viết 8, nhớ 1. 1 thêm 1 bằng 2, 4 trừ 2 bằng 2, viết 2.',
        'Số cái bánh còn lại là: 45 − 17 = 28 (cái).',
      ],
      answer: 'Đáp số: 28 cái bánh.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '62 − 37 = ?',
      options: ['35', '25', '24'],
      answer: 1,
      hints: ['2 không trừ được 7. Em lấy 12 trừ 7.', 'Hàng chục: 3 thêm 1 bằng 4. 6 trừ 4.'],
      solution:
        '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2. Vậy 62 − 37 = 25.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép trừ với kết quả của nó.',
      left: ['54 − 28', '71 − 36', '80 − 46', '93 − 57'],
      right: ['26', '35', '34', '36', '46'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hàng đơn vị không trừ được thì mượn 1 chục.', 'Ở hàng chục, nhớ thêm 1 vào số trừ.'],
      solution:
        '54 − 28 = 26 (14 − 8 = 6; 5 − 3 = 2). 71 − 36 = 35 (11 − 6 = 5; 7 − 4 = 3). 80 − 46 = 34 (10 − 6 = 4; 8 − 5 = 3). 93 − 57 = 36 (13 − 7 = 6; 9 − 6 = 3).',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 45 − 17 theo đúng thứ tự.',
      items: [
        '1 thêm 1 bằng 2, 4 trừ 2 bằng 2, viết 2.',
        'Viết 17 dưới 45, thẳng cột.',
        '5 không trừ được 7, lấy 15 trừ 7 bằng 8, viết 8, nhớ 1.',
      ],
      answer: [1, 2, 0],
      hints: ['Đặt tính trước, rồi tính hàng đơn vị, sau cùng hàng chục.'],
      solution:
        'Viết 17 dưới 45, thẳng cột. 5 không trừ được 7, lấy 15 trừ 7 bằng 8, viết 8, nhớ 1. 1 thêm 1 bằng 2, 4 trừ 2 bằng 2, viết 2. Vậy 45 − 17 = 28.',
    },
    {
      type: 'choice',
      prompt: 'Mai tính 73 − 28 = 55. Mai sai ở đâu?',
      options: ['Quên nhớ 1 ở hàng chục', 'Tính sai hàng đơn vị', 'Mai tính đúng'],
      answer: 0,
      hints: ['Em tự tính 73 − 28 rồi so với bài của Mai.', 'Hàng chục: 2 thêm 1 bằng 3.'],
      solution:
        '3 không trừ được 8, lấy 13 trừ 8 bằng 5, viết 5, nhớ 1. 2 thêm 1 bằng 3, 7 trừ 3 bằng 4, viết 4. 73 − 28 = 45. Mai viết 5 ở hàng chục vì quên nhớ 1.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 82 − 47 ... 35',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Tính 82 − 47 trước, rồi so sánh với 35.'],
      solution:
        '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 4 thêm 1 bằng 5, 8 trừ 5 bằng 3. 82 − 47 = 35. Hai số bằng nhau, nên chọn dấu =.',
    },
    {
      type: 'choice',
      prompt: 'Phép trừ nào có kết quả là 18?',
      options: ['45 − 27', '45 − 28', '46 − 27'],
      answer: 0,
      hints: ['Em tính từng phép trừ, nhớ mượn 1 chục.'],
      solution: '45 − 27 = 18 (15 − 7 = 8; 4 − 3 = 1). Còn 45 − 28 = 17 và 46 − 27 = 19.',
    },
    {
      type: 'choice',
      prompt: 'Bến xe có 64 ô tô. Có 28 ô tô rời bến. Bến xe còn lại bao nhiêu ô tô?',
      options: ['46', '36', '34'],
      answer: 1,
      hints: ['Rời đi thì em làm phép trừ: 64 − 28.', '4 không trừ được 8, lấy 14 trừ 8.'],
      solution: 'Số ô tô còn lại là: 64 − 28 = 36 (ô tô). Đáp số: 36 ô tô.',
    },
    {
      type: 'choice',
      prompt: 'Cây cam có 90 quả. Bà đã hái 35 quả. Trên cây còn lại bao nhiêu quả cam?',
      options: ['65', '55', '45'],
      answer: 1,
      hints: ['Em làm phép trừ: 90 − 35.', '0 không trừ được 5, lấy 10 trừ 5.'],
      solution:
        '0 không trừ được 5, lấy 10 trừ 5 bằng 5, viết 5, nhớ 1. 3 thêm 1 bằng 4, 9 trừ 4 bằng 5, viết 5. Số quả cam còn lại là: 90 − 35 = 55 (quả). Đáp số: 55 quả cam.',
    },
  ],
  takeaways: [
    'Đặt tính dọc, tính từ hàng đơn vị. Không trừ được thì mượn 1 chục, viết kết quả, nhớ 1.',
    'Ở hàng chục, thêm 1 đã nhớ vào số trừ rồi mới trừ.',
    '62 − 37: lấy 12 trừ 7 bằng 5, nhớ 1; 3 thêm 1 bằng 4, 6 trừ 4 bằng 2. Vậy 62 − 37 = 25.',
  ],
};
