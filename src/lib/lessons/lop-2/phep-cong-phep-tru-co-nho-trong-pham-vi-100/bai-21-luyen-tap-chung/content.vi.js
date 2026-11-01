/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: phép cộng có nhớ số có hai chữ số với số có một chữ số và với số có hai chữ số, cộng ba số, so sánh và giải bài toán có lời văn.',
  intro:
    'Em đã biết cộng có nhớ trong phạm vi 100. Hôm nay em luyện tập: đặt tính, nhớ 1 sang hàng chục và giải bài toán nhé!',
  objectives: [
    'Đặt tính rồi tính phép cộng có nhớ trong phạm vi 100.',
    'Cộng ba số theo thứ tự từ trái sang phải.',
    'So sánh kết quả các phép cộng.',
    'Giải và trình bày bài toán có lời văn bằng phép cộng có nhớ.',
  ],
  sections: [
    {
      heading: 'Nhớ lại cách cộng có nhớ',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Với số có một chữ số',
          text: '47 + 8: 7 cộng 8 bằng 15, viết 5, nhớ 1. 4 thêm 1 bằng 5, viết 5. Vậy 47 + 8 = 55.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Với số có hai chữ số',
          text: '38 + 45: 8 cộng 5 bằng 13, viết 3, nhớ 1. 3 cộng 4 bằng 7, thêm 1 bằng 8, viết 8. Vậy 38 + 45 = 83.',
        },
        {
          type: 'p',
          text: 'Nhớ nhé: đặt tính thẳng cột, tính hàng đơn vị trước, được 10 hoặc hơn thì nhớ 1 sang hàng chục.',
        },
      ],
    },
    {
      heading: 'Cộng ba số và giải toán',
      blocks: [
        {
          type: 'p',
          text: 'Cộng ba số, em tính từ trái sang phải: 26 + 4 + 9. Em tính 26 + 4 = 30, rồi 30 + 9 = 39.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trình bày bài giải',
          text: 'Bài giải có câu lời giải, phép tính kèm đơn vị trong ngoặc, và đáp số. Ví dụ: Số quả cam có tất cả là: 16 + 7 = 23 (quả). Đáp số: 23 quả cam.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi lượt có 12 câu. Em chạm vào đáp án đúng. Sai lần đầu, em được xem gợi ý và chọn lại. Cuối lượt, em xem phần nào cần ôn và chạm "Làm bộ bài khác".',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 47 + 8.',
      steps: [
        'Viết 8 thẳng cột với 7.',
        '7 cộng 8 bằng 15, viết 5, nhớ 1.',
        '4 thêm 1 bằng 5, viết 5.',
      ],
      answer: '47 + 8 = 55.',
    },
    {
      problem: 'Tính: 26 + 4 + 9.',
      steps: [
        'Em tính từ trái sang phải.',
        '26 + 4 = 30 (6 + 4 = 10, viết 0, nhớ 1).',
        '30 + 9 = 39.',
      ],
      answer: '26 + 4 + 9 = 39.',
    },
    {
      problem:
        'Bao gạo thứ nhất nặng 35 kg. Bao gạo thứ hai nặng 28 kg. Cả hai bao gạo nặng bao nhiêu ki-lô-gam?',
      steps: [
        'Cả hai bao: em làm phép cộng 35 + 28.',
        '5 cộng 8 bằng 13, viết 3, nhớ 1. 3 cộng 2 bằng 5, thêm 1 bằng 6, viết 6.',
        'Cả hai bao gạo nặng là: 35 + 28 = 63 (kg).',
      ],
      answer: 'Đáp số: 63 kg.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '47 + 8 = ?',
      options: ['45', '55', '56'],
      answer: 1,
      hints: ['7 + 8 = 15. Viết 5, nhớ 1.'],
      solution: '7 cộng 8 bằng 15, viết 5, nhớ 1. 4 thêm 1 bằng 5, viết 5. Vậy 47 + 8 = 55.',
    },
    {
      type: 'choice',
      prompt: '38 + 45 = ?',
      options: ['73', '83', '84'],
      answer: 1,
      hints: ['8 + 5 = 13. Viết 3, nhớ 1.', 'Hàng chục: 3 + 4, thêm 1 đã nhớ.'],
      solution:
        '8 cộng 5 bằng 13, viết 3, nhớ 1. 3 cộng 4 bằng 7, thêm 1 bằng 8, viết 8. Vậy 38 + 45 = 83.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép cộng với kết quả của nó.',
      left: ['26 + 4', '59 + 7', '18 + 23', '65 + 27'],
      right: ['30', '66', '41', '92', '82'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Mỗi phép cộng đều có nhớ 1 sang hàng chục.'],
      solution: '26 + 4 = 30. 59 + 7 = 66. 18 + 23 = 41. 65 + 27 = 92.',
    },
    {
      type: 'choice',
      prompt: '26 + 4 + 9 = ?',
      options: ['39', '29', '40'],
      answer: 0,
      hints: ['Em tính từ trái sang phải: 26 + 4 trước.'],
      solution: '26 + 4 = 30. 30 + 9 = 39. Vậy 26 + 4 + 9 = 39.',
    },
    {
      type: 'count',
      prompt: 'Có 16 quả cam. Mẹ mua thêm 7 quả. Có tất cả mấy quả cam?',
      picture: 'orange',
      answer: 23,
      choices: [13, 22, 23, 24],
      hints: ['Em tính 16 + 7.', '6 + 7 = 13, viết 3, nhớ 1.'],
      solution:
        '6 cộng 7 bằng 13, viết 3, nhớ 1. 1 thêm 1 bằng 2, viết 2. 16 + 7 = 23. Có 23 quả cam.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 37 + 25 ... 52',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Tính 37 + 25 trước. Đừng quên nhớ 1.'],
      solution:
        '7 cộng 5 bằng 12, viết 2, nhớ 1. 3 cộng 2 bằng 5, thêm 1 bằng 6. 37 + 25 = 62. 62 lớn hơn 52, nên 37 + 25 > 52.',
    },
    {
      type: 'choice',
      prompt: 'Phép cộng nào có kết quả lớn nhất?',
      options: ['29 + 6', '27 + 9', '24 + 8'],
      answer: 1,
      hints: ['Em tính kết quả từng phép cộng rồi so sánh.'],
      solution:
        '29 + 6 = 35. 27 + 9 = 36. 24 + 8 = 32. Số lớn nhất là 36, nên 27 + 9 có kết quả lớn nhất.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép cộng theo kết quả từ bé đến lớn.',
      items: ['45 + 8', '36 + 9', '19 + 19'],
      answer: [2, 1, 0],
      hints: ['Tính kết quả từng phép cộng trước.', '19 + 19: 9 + 9 = 18, viết 8, nhớ 1.'],
      solution: '19 + 19 = 38. 36 + 9 = 45. 45 + 8 = 53. Từ bé đến lớn: 19 + 19, 36 + 9, 45 + 8.',
    },
    {
      type: 'choice',
      prompt: 'Hùng tính 54 + 9 = 53. Hùng sai ở đâu?',
      options: ['Quên nhớ 1 sang hàng chục', 'Viết sai chữ số hàng đơn vị', 'Hùng tính đúng'],
      answer: 0,
      hints: ['Em tự tính 54 + 9 rồi so với bài của Hùng.'],
      solution:
        '4 cộng 9 bằng 13, viết 3, nhớ 1. 5 thêm 1 bằng 6. 54 + 9 = 63. Hùng viết 5 ở hàng chục vì quên nhớ 1.',
    },
    {
      type: 'choice',
      prompt: 'Vườn có 46 cây chuối và 37 cây bưởi. Vườn có tất cả bao nhiêu cây?',
      options: ['73', '83', '84'],
      answer: 1,
      hints: ['Tìm tất cả thì em làm phép cộng: 46 + 37.', '6 + 7 = 13, viết 3, nhớ 1.'],
      solution: 'Số cây có tất cả là: 46 + 37 = 83 (cây). Đáp số: 83 cây.',
    },
  ],
  takeaways: [
    'Cộng có nhớ: tính hàng đơn vị trước, được 10 hoặc hơn thì viết chữ số đơn vị và nhớ 1 sang hàng chục.',
    'Cộng ba số: tính từ trái sang phải.',
    'Bài giải có câu lời giải, phép tính kèm đơn vị và đáp số.',
  ],
};
