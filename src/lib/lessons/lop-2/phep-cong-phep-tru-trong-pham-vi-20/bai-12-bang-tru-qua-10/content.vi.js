/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bảng trừ qua 10: các phép trừ từ 11 − 2 đến 18 − 9, cách dùng bảng cộng để nhớ kết quả, ví dụ 9 + 3 = 12 nên 12 − 3 = 9 và 12 − 9 = 3.',
  intro:
    'Em đã biết trừ qua 10. Hôm nay em lập bảng trừ (qua 10). Em sẽ thấy: thuộc bảng cộng là nhớ được bảng trừ!',
  objectives: [
    'Đọc và lập được bảng trừ (qua 10).',
    'Dùng bảng cộng để tìm kết quả phép trừ.',
    'Tính nhẩm phép trừ qua 10 trong phạm vi 20.',
  ],
  sections: [
    {
      heading: 'Bảng trừ (qua 10)',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi cột là một số trừ đi một số. Mỗi hàng có cùng một kết quả.',
        },
        {
          type: 'table',
          head: ['11 trừ đi một số', '12 trừ đi một số', '13 trừ đi một số', '14 trừ đi một số'],
          rows: [
            ['11 − 2 = 9', '12 − 3 = 9', '13 − 4 = 9', '14 − 5 = 9'],
            ['11 − 3 = 8', '12 − 4 = 8', '13 − 5 = 8', '14 − 6 = 8'],
            ['11 − 4 = 7', '12 − 5 = 7', '13 − 6 = 7', '14 − 7 = 7'],
            ['11 − 5 = 6', '12 − 6 = 6', '13 − 7 = 6', '14 − 8 = 6'],
            ['11 − 6 = 5', '12 − 7 = 5', '13 − 8 = 5', '14 − 9 = 5'],
            ['11 − 7 = 4', '12 − 8 = 4', '13 − 9 = 4', '—'],
            ['11 − 8 = 3', '12 − 9 = 3', '—', '—'],
            ['11 − 9 = 2', '—', '—', '—'],
          ],
        },
        {
          type: 'table',
          head: ['15 trừ đi một số', '16 trừ đi một số', '17 trừ đi một số', '18 trừ đi một số'],
          rows: [
            ['15 − 6 = 9', '16 − 7 = 9', '17 − 8 = 9', '18 − 9 = 9'],
            ['15 − 7 = 8', '16 − 8 = 8', '17 − 9 = 8', '—'],
            ['15 − 8 = 7', '16 − 9 = 7', '—', '—'],
            ['15 − 9 = 6', '—', '—', '—'],
          ],
        },
      ],
    },
    {
      heading: 'Bảng trừ và bảng cộng',
      blocks: [
        {
          type: 'p',
          text: 'Từ một phép cộng, em viết được hai phép trừ. 9 + 3 = 12, nên 12 − 3 = 9 và 12 − 9 = 3.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhớ bảng cộng để trừ',
          text: 'Muốn tính 13 − 5, em nghĩ: 5 cộng mấy bằng 13? 5 + 8 = 13, nên 13 − 5 = 8.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quên kết quả?',
          text: 'Em trừ về 10 rồi trừ tiếp: 13 − 5. Tách 5 = 3 + 2. 13 − 3 = 10. 10 − 2 = 8.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mở bảng trừ',
    instruction:
      'Chạm vào một phép trừ trong bảng. Em chọn kết quả đúng ở khung trên. Đúng rồi thì phép trừ được mở, cùng với phép trừ "anh em" của nó (tô vàng). Em xem chúng cùng từ phép cộng nào trong bảng cộng.',
  },
  examples: [
    {
      problem: 'Tính nhẩm: 15 − 8.',
      steps: ['Em nghĩ: 8 cộng mấy bằng 15?', 'Bảng cộng: 8 + 7 = 15.', 'Vậy 15 − 8 = 7.'],
      answer: '15 − 8 = 7.',
    },
    {
      problem: 'Tính nhẩm: 14 − 4 − 3 và 14 − 7.',
      steps: [
        'Tính từ trái sang phải: 14 − 4 = 10, 10 − 3 = 7.',
        'Bảng trừ: 14 − 7 = 7.',
        'Hai phép tính có cùng kết quả, vì 7 = 4 + 3.',
      ],
      answer: '14 − 4 − 3 = 7 và 14 − 7 = 7.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '13 − 8 = ?',
      options: ['4', '5', '6'],
      answer: 1,
      hints: ['Em nghĩ: 8 cộng mấy bằng 13?'],
      solution: '8 + 5 = 13, nên 13 − 8 = 5.',
    },
    {
      type: 'choice',
      prompt: 'Biết 8 + 6 = 14. Vậy 14 − 8 = ?',
      options: ['6', '7', '8'],
      answer: 0,
      hints: ['Phép cộng 8 + 6 = 14 cho em hai phép trừ.'],
      solution: '8 + 6 = 14, nên 14 − 8 = 6 và 14 − 6 = 8.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép trừ với kết quả của nó.',
      left: ['11 − 6', '15 − 7', '12 − 8', '16 − 9'],
      right: ['5', '8', '4', '7', '6'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em dùng bảng trừ, hoặc nhớ lại bảng cộng.', '16 − 9: 9 cộng mấy bằng 16?'],
      solution: '11 − 6 = 5. 15 − 7 = 8. 12 − 8 = 4. 16 − 9 = 7.',
    },
    {
      type: 'choice',
      prompt: 'Phép trừ nào có kết quả bé nhất?',
      options: ['13 − 4', '15 − 7', '12 − 8', '11 − 5'],
      answer: 2,
      hints: ['Em tính kết quả từng phép trừ rồi so sánh.'],
      solution:
        '13 − 4 = 9, 15 − 7 = 8, 12 − 8 = 4, 11 − 5 = 6. Số bé nhất là 4, nên 12 − 8 có kết quả bé nhất.',
    },
    {
      type: 'choice',
      prompt: 'Số nào? 12 − ? = 7',
      options: ['4', '5', '6'],
      answer: 1,
      hints: ['Em nghĩ: 7 cộng mấy bằng 12?'],
      solution: '7 + 5 = 12, nên 12 − 5 = 7. Số cần điền là 5.',
    },
    {
      type: 'choice',
      prompt: '14 − 4 − 3 = ?',
      options: ['6', '7', '8'],
      answer: 1,
      hints: ['Em tính từ trái sang phải: 14 − 4 trước.'],
      solution: '14 − 4 = 10. 10 − 3 = 7. Vậy 14 − 4 − 3 = 7, bằng 14 − 7.',
    },
    {
      type: 'count',
      prompt:
        'Có 12 quả bóng. 9 bạn, mỗi bạn lấy 1 quả bóng. Hình vẽ những quả bóng còn lại. Còn lại mấy quả bóng?',
      picture: 'ball',
      answer: 3,
      choices: [2, 3, 4],
      hints: ['9 bạn lấy đi 9 quả. Em tính 12 − 9.'],
      solution: '9 + 3 = 12, nên 12 − 9 = 3. Còn lại 3 quả bóng.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 16 − 8 ... 15 − 7',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Em tính kết quả hai phép trừ trước.'],
      solution: '16 − 8 = 8 và 15 − 7 = 8. Hai kết quả bằng nhau, nên 16 − 8 = 15 − 7.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép trừ theo kết quả từ bé đến lớn.',
      items: ['17 − 8', '11 − 7', '13 − 7', '15 − 8'],
      answer: [1, 2, 3, 0],
      hints: ['Em tính kết quả từng phép trừ trước.', 'Các kết quả là 9, 4, 6, 7.'],
      solution:
        '11 − 7 = 4, 13 − 7 = 6, 15 − 8 = 7, 17 − 8 = 9. Từ bé đến lớn: 11 − 7, 13 − 7, 15 − 8, 17 − 8.',
    },
  ],
  takeaways: [
    'Bảng trừ (qua 10) gồm các phép trừ từ 11 − 2 đến 18 − 9.',
    'Từ một phép cộng, em viết được hai phép trừ: 9 + 3 = 12, nên 12 − 3 = 9 và 12 − 9 = 3.',
    'Muốn trừ nhanh, em nghĩ đến bảng cộng.',
  ],
};
