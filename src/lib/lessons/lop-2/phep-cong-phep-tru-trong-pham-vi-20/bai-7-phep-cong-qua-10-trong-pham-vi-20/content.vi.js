/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng qua 10 trong phạm vi 20: tách số thứ hai để làm tròn 10 rồi cộng tiếp, ví dụ 9 + 5 = 9 + 1 + 4 = 14.',
  intro:
    'Có 9 chấm đỏ và 5 chấm xanh. Có tất cả bao nhiêu chấm? Em chuyển bớt chấm xanh sang cho đủ 10 chấm, rồi đếm tiếp nhé!',
  objectives: [
    'Cộng hai số có tổng lớn hơn 10, trong phạm vi 20.',
    'Biết tách số để làm tròn 10 rồi cộng tiếp.',
  ],
  sections: [
    {
      heading: 'Làm tròn 10',
      blocks: [
        {
          type: 'p',
          text: 'Tính 9 + 5. Khung thứ nhất có 9 chấm, còn thiếu 1 chấm là đủ 10.',
        },
        {
          type: 'p',
          text: 'Em lấy 1 chấm trong 5 chấm, chuyển sang khung thứ nhất. Khung thứ hai còn 4 chấm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách tính',
          text: 'Tách 5 = 1 + 4. 9 + 1 = 10. 10 + 4 = 14. Vậy 9 + 5 = 14.',
        },
      ],
    },
    {
      heading: 'Cộng qua 10',
      blocks: [
        {
          type: 'p',
          text: 'Muốn cộng qua 10, em tách số thứ hai thành hai phần: một phần làm tròn 10, phần kia cộng tiếp.',
        },
        {
          type: 'table',
          head: ['Phép cộng', 'Tách', 'Làm tròn 10', 'Cộng tiếp'],
          rows: [
            ['9 + 5', '5 = 1 + 4', '9 + 1 = 10', '10 + 4 = 14'],
            ['8 + 5', '5 = 2 + 3', '8 + 2 = 10', '10 + 3 = 13'],
            ['7 + 6', '6 = 3 + 3', '7 + 3 = 10', '10 + 3 = 13'],
            ['6 + 8', '8 = 4 + 4', '6 + 4 = 10', '10 + 4 = 14'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhớ',
          text: '9 cần thêm 1 là đủ 10. 8 cần thêm 2. 7 cần thêm 3. 6 cần thêm 4.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai khung mười ô',
    instruction:
      'Chạm vào chấm xanh ở khung thứ hai (hoặc nút "Chuyển 1 chấm xanh") để chuyển sang khung thứ nhất cho đủ 10. Rồi chọn kết quả của phép cộng.',
  },
  examples: [
    {
      problem: 'Tính 9 + 5.',
      steps: ['9 cần thêm 1 là đủ 10. Tách 5 = 1 + 4.', '9 + 1 = 10.', '10 + 4 = 14.'],
      answer: '9 + 5 = 14.',
    },
    {
      problem: 'Tính 8 + 5.',
      steps: ['8 cần thêm 2 là đủ 10. Tách 5 = 2 + 3.', '8 + 2 = 10.', '10 + 3 = 13.'],
      answer: '8 + 5 = 13.',
    },
    {
      problem: 'Tính 7 + 4.',
      steps: ['7 cần thêm 3 là đủ 10. Tách 4 = 3 + 1.', '7 + 3 = 10.', '10 + 1 = 11.'],
      answer: '7 + 4 = 11.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có 9 quả táo đỏ và 4 quả táo nữa. Hình vẽ tất cả số táo. Có tất cả mấy quả táo?',
      picture: 'apple',
      answer: 13,
      choices: [11, 12, 13, 14],
      hints: ['Đếm 10 quả trước, rồi đếm tiếp.', '9 + 1 = 10, còn 3 quả nữa.'],
      solution: 'Tách 4 = 1 + 3. 9 + 1 = 10. 10 + 3 = 13. Có tất cả 13 quả táo.',
    },
    {
      type: 'choice',
      prompt: '9 + 5 = 9 + 1 + ?',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['Tách 5 thành 1 và mấy?'],
      solution: '5 = 1 + 4, nên 9 + 5 = 9 + 1 + 4 = 10 + 4 = 14.',
    },
    {
      type: 'choice',
      prompt: 'Để tính 7 + 5, em tách 5 thành hai số nào?',
      options: ['3 và 2', '1 và 4', '4 và 1'],
      answer: 0,
      hints: ['7 cần thêm mấy là đủ 10?'],
      solution: '7 cần thêm 3 là đủ 10. Tách 5 = 3 + 2. 7 + 3 = 10. 10 + 2 = 12.',
    },
    {
      type: 'choice',
      prompt: '8 + 6 = ?',
      options: ['13', '14', '15'],
      answer: 1,
      hints: ['8 cần thêm 2 là đủ 10. Tách 6 = 2 + 4.'],
      solution: '8 + 2 = 10. 10 + 4 = 14. Vậy 8 + 6 = 14.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép cộng với kết quả của nó.',
      left: ['9 + 2', '8 + 5', '7 + 7', '6 + 9'],
      right: ['11', '13', '14', '15', '12'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Với mỗi phép cộng, em làm tròn 10 trước.', '7 + 7: tách 7 = 3 + 4.'],
      solution: '9 + 2 = 11. 8 + 5 = 13. 7 + 7 = 14. 6 + 9 = 15.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 8 + 6 theo đúng thứ tự.',
      items: ['10 + 4 = 14', 'Tách 6 = 2 + 4', '8 + 2 = 10'],
      answer: [1, 2, 0],
      hints: ['Bước đầu tiên là tách số.'],
      solution: 'Tách 6 = 2 + 4. Rồi 8 + 2 = 10. Cuối cùng 10 + 4 = 14.',
    },
    {
      type: 'count',
      prompt: 'Trên sân có 7 con gà con. Có thêm 6 con nữa chạy tới. Có tất cả mấy con gà con?',
      picture: 'chick',
      answer: 13,
      choices: [12, 13, 14],
      hints: ['Em tính 7 + 6.', '7 + 3 = 10, còn 3 con nữa.'],
      solution: 'Tách 6 = 3 + 3. 7 + 3 = 10. 10 + 3 = 13. Có tất cả 13 con gà con.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 9 + 4 ... 12',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Tính 9 + 4 trước, rồi so sánh với 12.'],
      solution: '9 + 4 = 13. 13 lớn hơn 12, nên 9 + 4 > 12.',
    },
  ],
  takeaways: [
    'Cộng qua 10: tách số thứ hai để làm tròn 10, rồi cộng tiếp.',
    '9 + 5: tách 5 = 1 + 4; 9 + 1 = 10; 10 + 4 = 14.',
  ],
};
