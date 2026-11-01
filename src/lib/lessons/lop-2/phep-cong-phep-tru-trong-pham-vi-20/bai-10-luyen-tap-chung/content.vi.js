/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: cộng qua 10 trong phạm vi 20, bảng cộng, tìm số còn thiếu, so sánh, cộng ba số và giải bài toán về thêm, bớt một số đơn vị.',
  intro:
    'Em đã biết cộng qua 10, thuộc bảng cộng và giải bài toán thêm, bớt. Hôm nay em luyện tập tất cả cùng nhau nhé!',
  objectives: [
    'Tính nhẩm phép cộng qua 10 trong phạm vi 20.',
    'Tìm số còn thiếu, so sánh các phép cộng.',
    'Cộng ba số, trong đó có hai số cộng lại bằng 10.',
    'Giải và trình bày bài toán về thêm, bớt một số đơn vị.',
  ],
  sections: [
    {
      heading: 'Nhớ lại cách cộng qua 10',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Làm tròn 10',
          text: '8 + 5: tách 5 = 2 + 3. 8 + 2 = 10. 10 + 3 = 13.',
        },
        {
          type: 'p',
          text: 'Đổi chỗ hai số, kết quả không thay đổi: 5 + 8 = 8 + 5 = 13.',
        },
        {
          type: 'p',
          text: 'Cộng ba số, em cộng từ trái sang phải: 7 + 3 + 6 = 10 + 6 = 16.',
        },
      ],
    },
    {
      heading: 'Nhớ lại bài toán thêm, bớt',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Thêm thì cộng, bớt thì trừ',
          text: 'Thêm vào thì số lượng nhiều lên: em làm phép cộng. Bớt đi thì số lượng ít đi: em làm phép trừ.',
        },
        {
          type: 'p',
          text: 'Bài giải gồm câu lời giải, phép tính và đáp số. Ví dụ: Số quả táo có tất cả là: 9 + 4 = 13 (quả). Đáp số: 13 quả táo.',
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
      problem: 'Tính 7 + 3 + 6.',
      steps: ['Cộng từ trái sang phải: 7 + 3 = 10.', '10 + 6 = 16.'],
      answer: '7 + 3 + 6 = 16.',
    },
    {
      problem: 'Số nào? 7 + ? = 12.',
      steps: [
        '7 cần thêm 3 là đủ 10.',
        'Từ 10 đến 12 còn thêm 2 nữa.',
        '3 + 2 = 5, nên 7 + 5 = 12.',
      ],
      answer: 'Số cần điền là 5.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '9 + 7 = ?',
      options: ['15', '16', '17'],
      answer: 1,
      hints: ['9 cần thêm 1 là đủ 10. Tách 7 = 1 + 6.'],
      solution: '9 + 1 = 10. 10 + 6 = 16. Vậy 9 + 7 = 16.',
    },
    {
      type: 'choice',
      prompt: '6 + 6 = ?',
      options: ['11', '12', '13'],
      answer: 1,
      hints: ['6 cần thêm 4 là đủ 10. Tách 6 = 4 + 2.'],
      solution: '6 + 4 = 10. 10 + 2 = 12. Vậy 6 + 6 = 12.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép cộng với kết quả của nó.',
      left: ['8 + 3', '7 + 8', '9 + 9', '5 + 8'],
      right: ['11', '15', '18', '13', '14'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em dùng bảng cộng, hoặc làm tròn 10.', '5 + 8 = 8 + 5.'],
      solution: '8 + 3 = 11. 7 + 8 = 15. 9 + 9 = 18. 5 + 8 = 13.',
    },
    {
      type: 'choice',
      prompt: '7 + ? = 12',
      options: ['4', '5', '6'],
      answer: 1,
      hints: ['7 cần thêm 3 là đủ 10. Từ 10 đến 12 còn mấy nữa?'],
      solution: '7 + 3 = 10, 10 + 2 = 12. 3 + 2 = 5, nên 7 + 5 = 12.',
    },
    {
      type: 'choice',
      prompt: '8 + 4 = 8 + 2 + ?',
      options: ['1', '2', '3'],
      answer: 1,
      hints: ['Tách 4 thành 2 và mấy?'],
      solution: '4 = 2 + 2. 8 + 2 = 10, 10 + 2 = 12. Vậy 8 + 4 = 8 + 2 + 2.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 7 + 5 ... 6 + 5',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Tính kết quả hai phép cộng trước.'],
      solution: '7 + 5 = 12, 6 + 5 = 11. 12 lớn hơn 11, nên 7 + 5 > 6 + 5.',
    },
    {
      type: 'choice',
      prompt: '9 + 1 + 6 = ?',
      options: ['15', '16', '17'],
      answer: 1,
      hints: ['Cộng từ trái sang phải: 9 + 1 trước.'],
      solution: '9 + 1 = 10. 10 + 6 = 16.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép cộng theo kết quả từ bé đến lớn.',
      items: ['8 + 8', '9 + 3', '6 + 8'],
      answer: [1, 2, 0],
      hints: ['Tính kết quả từng phép cộng trước.'],
      solution: '9 + 3 = 12, 6 + 8 = 14, 8 + 8 = 16. Từ bé đến lớn: 9 + 3, 6 + 8, 8 + 8.',
    },
    {
      type: 'choice',
      prompt: 'Số nào cộng với 9 được 14?',
      options: ['4', '5', '6'],
      answer: 1,
      hints: ['9 cần thêm 1 là đủ 10. Từ 10 đến 14 còn mấy nữa?'],
      solution: '9 + 1 = 10, 10 + 4 = 14. 1 + 4 = 5, nên 9 + 5 = 14.',
    },
    {
      type: 'count',
      prompt:
        'Trong vườn có 9 con bướm. Có thêm 3 con bướm bay đến. Hình vẽ tất cả số bướm. Trong vườn có tất cả mấy con bướm?',
      picture: 'butterfly',
      answer: 12,
      choices: [11, 12, 13],
      hints: ['Thêm vào thì em làm phép cộng: 9 + 3.'],
      solution: 'Số con bướm có tất cả là: 9 + 3 = 12 (con). Đáp số: 12 con bướm.',
    },
    {
      type: 'choice',
      prompt:
        'Lan có 13 quả bóng bay. 2 quả bị gió thổi bay mất. Hỏi Lan còn lại bao nhiêu quả bóng bay?',
      options: ['11 quả', '15 quả', '12 quả'],
      answer: 0,
      hints: ['Bay mất là bớt đi. Em làm phép trừ.'],
      solution: 'Số quả bóng bay Lan còn lại là: 13 − 2 = 11 (quả). Đáp số: 11 quả bóng bay.',
    },
    {
      type: 'choice',
      prompt: 'Mai có 8 bông hoa. Mai hái thêm 5 bông hoa. Bài giải nào đúng?',
      options: [
        'Số bông hoa Mai có tất cả là: 8 + 5 = 13 (bông)',
        'Số bông hoa Mai có tất cả là: 8 − 5 = 3 (bông)',
        'Số bông hoa Mai có tất cả là: 8 + 5 = 12 (bông)',
      ],
      answer: 0,
      hints: ['Hái thêm thì em làm phép cộng.', 'Tính lại 8 + 5 cho cẩn thận.'],
      solution:
        'Hái thêm thì cộng: 8 + 5 = 13. Số bông hoa Mai có tất cả là: 8 + 5 = 13 (bông). Đáp số: 13 bông hoa.',
    },
  ],
  takeaways: [
    'Cộng qua 10: tách số để làm tròn 10 rồi cộng tiếp.',
    'Thêm vào thì làm phép cộng, bớt đi thì làm phép trừ.',
  ],
};
