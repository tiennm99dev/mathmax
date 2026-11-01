const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm các số và phép tính trong phạm vi 10: đếm, so sánh, xếp thứ tự, mấy và mấy, cộng, trừ, tìm số còn thiếu và giải bài toán.',
  intro:
    'Năm học sắp kết thúc! Em cùng ôn lại các số từ 0 đến 10 và phép cộng, phép trừ trong phạm vi 10. Em làm bài ôn tập để biết phần nào đã vững nhé!',
  objectives: [
    'Đếm, đọc, viết, so sánh và xếp thứ tự các số từ 0 đến 10.',
    'Tách một số thành hai phần.',
    'Tính nhẩm phép cộng, phép trừ trong phạm vi 10.',
    'Nhìn hình hoặc đọc bài toán, chọn phép tính đúng.',
  ],
  sections: [
    {
      heading: 'Các số từ 0 đến 10',
      blocks: [
        {
          type: 'p',
          text: 'Em đếm: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Số nào đếm sau thì lớn hơn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh',
          text: 'Dấu > đọc là "lớn hơn", dấu < đọc là "bé hơn", dấu = đọc là "bằng": 9 > 4, 4 < 9, 7 = 7.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mấy và mấy',
          text: '8 gồm 5 và 3. 8 cũng gồm 3 và 5.',
        },
      ],
    },
    {
      heading: 'Phép cộng, phép trừ',
      blocks: [
        {
          type: 'p',
          text: 'Gộp lại, thêm vào: em làm phép cộng. Bớt đi, tách ra: em làm phép trừ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Số 0',
          text: '6 + 0 = 6. 6 − 0 = 6. 6 − 6 = 0.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng và trừ',
          text: 'Từ 5 + 3 = 8 ta có 8 − 3 = 5 và 8 − 5 = 3.',
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        {
          type: 'table',
          head: ['Bài toán nói', 'Em làm'],
          rows: [
            ['gộp lại, thêm, có tất cả', 'phép cộng'],
            ['bớt đi, bay đi, cho đi, còn lại', 'phép trừ'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 10 câu. Đầu tiên em làm thử mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem: 'Xếp các số 6, 2, 9, 0 theo thứ tự từ bé đến lớn.',
      steps: ['Số bé nhất là 0.', 'Tiếp theo là 2, rồi đến 6.', 'Số lớn nhất là 9.'],
      answer: 'Từ bé đến lớn: 0, 2, 6, 9.',
    },
    {
      problem: 'Có 10 quả bóng bay. 3 quả bay mất. Còn lại mấy quả bóng bay?',
      steps: [
        'Bay mất là bớt đi: em làm phép trừ.',
        'Em nghĩ: 3 cộng mấy bằng 10? 3 + 7 = 10.',
        'Vậy 10 − 3 = 7.',
      ],
      answer: 'Còn lại 7 quả bóng bay.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy con bướm?',
      picture: 'butterfly',
      answer: 7,
      choices: ZERO_TO_TEN,
      hints: ['Chạm vào từng con bướm và đếm to.'],
      solution: 'Đếm từ một đến bảy. Có 7 con bướm.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 6 ... 9',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Khi đếm, số nào được đếm trước thì bé hơn.'],
      solution: '6 được đếm trước 9, nên 6 bé hơn 9: 6 < 9.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ lớn đến bé.',
      items: ['4', '10', '1', '8'],
      answer: [1, 3, 0, 2],
      hints: ['Số nào lớn nhất? Em xếp nó đầu tiên.'],
      solution: 'Từ lớn đến bé: 10, 8, 4, 1.',
    },
    {
      type: 'choice',
      prompt: '9 gồm 4 và mấy?',
      options: ['4', '5', '6'],
      answer: 1,
      hints: ['Em nghĩ: 4 cộng mấy thì bằng 9?'],
      solution: '4 + 5 = 9, nên 9 gồm 4 và 5.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['5 + 4', '3 + 0', '10 − 6', '7 − 7'],
      right: ['9', '3', '4', '0', '6'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tính từng phép tính.', 'Một số trừ đi chính nó thì bằng mấy?'],
      solution: '5 + 4 = 9. 3 + 0 = 3. 10 − 6 = 4. 7 − 7 = 0.',
    },
    {
      type: 'choice',
      prompt: 'Số nào thay cho dấu hỏi? 2 + ? = 10',
      options: ['7', '8', '9'],
      answer: 1,
      hints: ['2 cộng mấy thì bằng 10?', 'Em đếm tiếp từ 2 cho đến 10.'],
      solution: '2 + 8 = 10. Số cần điền là 8.',
    },
    {
      type: 'choice',
      prompt: 'Số nào thay cho dấu hỏi? 7 − ? = 3',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['7 bớt đi mấy thì còn 3?'],
      solution: '7 − 4 = 3. Số cần điền là 4.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 5 + 3 ... 10 − 2',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Tính kết quả hai bên trước, rồi so sánh.'],
      solution: '5 + 3 = 8 và 10 − 2 = 8. Hai kết quả bằng nhau, nên 5 + 3 = 10 − 2.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phép tính có kết quả bằng 6.',
      options: ['4 + 2', '9 − 3', '6 − 6', '1 + 5', '8 − 1'],
      answers: [0, 1, 3],
      hints: ['Tính từng phép tính rồi so với 6.'],
      solution: '4 + 2 = 6, 9 − 3 = 6, 1 + 5 = 6. Còn 6 − 6 = 0 và 8 − 1 = 7.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['3 + 6', '8 − 5', '0 + 5', '10 − 10'],
      answer: [3, 1, 2, 0],
      hints: ['Tính kết quả từng phép tính trước.'],
      solution:
        '10 − 10 = 0, 8 − 5 = 3, 0 + 5 = 5, 3 + 6 = 9. Thứ tự: 10 − 10, 8 − 5, 0 + 5, 3 + 6.',
    },
    {
      type: 'choice',
      prompt: 'Trong vườn có 6 cây cam và 4 cây bưởi. Phép tính nào cho biết có tất cả mấy cây?',
      options: ['6 + 4 = 10', '6 − 4 = 2', '6 + 3 = 9'],
      answer: 0,
      hints: ['Có tất cả là gộp lại.', 'Gộp lại thì làm phép cộng.'],
      solution: 'Gộp 6 cây cam và 4 cây bưởi: 6 + 4 = 10. Có tất cả 10 cây.',
    },
    {
      type: 'choice',
      prompt: 'Mai có 8 cái kẹo. Mai cho em 3 cái. Mai còn lại mấy cái kẹo?',
      options: ['4', '5', '11'],
      answer: 1,
      hints: ['Cho em là bớt đi: em làm phép trừ.', 'Đếm lùi 3 bước từ 8.'],
      solution: '8 − 3 = 5. Mai còn lại 5 cái kẹo.',
    },
  ],
  takeaways: [
    'Em đếm, so sánh và xếp thứ tự được các số từ 0 đến 10.',
    'Gộp lại, thêm vào thì cộng. Bớt đi, tách ra thì trừ.',
    'Từ một phép cộng, em viết được hai phép trừ.',
  ],
};
