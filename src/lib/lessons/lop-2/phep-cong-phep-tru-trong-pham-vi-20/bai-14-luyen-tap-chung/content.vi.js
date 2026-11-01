/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: trừ qua 10 trong phạm vi 20, bảng trừ, tìm số còn thiếu, so sánh và giải bài toán về nhiều hơn, ít hơn một số đơn vị.',
  intro:
    'Em đã biết trừ qua 10, thuộc bảng trừ và giải bài toán nhiều hơn, ít hơn. Hôm nay em luyện tập tất cả cùng nhau nhé!',
  objectives: [
    'Tính nhẩm phép trừ qua 10 trong phạm vi 20.',
    'Dùng bảng cộng để tìm kết quả phép trừ, tìm số còn thiếu.',
    'So sánh kết quả các phép trừ.',
    'Giải và trình bày bài toán về nhiều hơn, ít hơn một số đơn vị.',
  ],
  sections: [
    {
      heading: 'Nhớ lại cách trừ qua 10',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Trừ về 10',
          text: '13 − 5: tách 5 = 3 + 2. 13 − 3 = 10. 10 − 2 = 8.',
        },
        {
          type: 'p',
          text: 'Nhớ bảng cộng để trừ nhanh: 5 + 8 = 13, nên 13 − 5 = 8 và 13 − 8 = 5.',
        },
      ],
    },
    {
      heading: 'Nhớ lại bài toán nhiều hơn, ít hơn',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhiều hơn thì cộng, ít hơn thì trừ',
          text: 'Nhiều hơn một số đơn vị: em làm phép cộng. Ít hơn một số đơn vị: em làm phép trừ.',
        },
        {
          type: 'p',
          text: 'Ví dụ: Mai có 6 bông hoa, Việt nhiều hơn Mai 2 bông hoa. Số bông hoa của Việt là: 6 + 2 = 8 (bông). Đáp số: 8 bông hoa.',
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
      problem: 'Tính nhẩm: 14 − 8.',
      steps: [
        'Em nghĩ: 8 cộng mấy bằng 14?',
        'Bảng cộng: 8 + 6 = 14.',
        'Vậy 14 − 8 = 6. Hoặc: 14 − 4 = 10, 10 − 4 = 6.',
      ],
      answer: '14 − 8 = 6.',
    },
    {
      problem:
        'Lan gấp được 15 ngôi sao. Nam gấp được ít hơn Lan 7 ngôi sao. Hỏi Nam gấp được bao nhiêu ngôi sao?',
      steps: [
        'Tóm tắt: Lan: 15 ngôi sao. Nam ít hơn Lan: 7 ngôi sao. Nam: ... ngôi sao?',
        'Ít hơn thì em làm phép trừ: 15 − 7.',
        'Tách 7 = 5 + 2. 15 − 5 = 10. 10 − 2 = 8.',
        'Số ngôi sao Nam gấp được là: 15 − 7 = 8 (ngôi sao).',
      ],
      answer: 'Đáp số: 8 ngôi sao.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '11 − 4 = ?',
      options: ['6', '7', '8'],
      answer: 1,
      hints: ['11 bớt 1 thì còn 10. Tách 4 = 1 + 3.'],
      solution: '11 − 1 = 10. 10 − 3 = 7. Vậy 11 − 4 = 7.',
    },
    {
      type: 'choice',
      prompt: '16 − 7 = 16 − 6 − ?',
      options: ['1', '2', '3'],
      answer: 0,
      hints: ['Tách 7 thành 6 và mấy?'],
      solution: '7 = 6 + 1. 16 − 6 = 10, 10 − 1 = 9. Vậy 16 − 7 = 16 − 6 − 1.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép trừ với kết quả của nó.',
      left: ['13 − 6', '17 − 8', '12 − 7', '15 − 9'],
      right: ['7', '9', '5', '6', '8'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em dùng bảng trừ, hoặc trừ về 10 trước.', '15 − 9: 9 cộng mấy bằng 15?'],
      solution: '13 − 6 = 7. 17 − 8 = 9. 12 − 7 = 5. 15 − 9 = 6.',
    },
    {
      type: 'choice',
      prompt: 'Biết 7 + 6 = 13. Vậy 13 − 7 = ?',
      options: ['5', '6', '7'],
      answer: 1,
      hints: ['Từ một phép cộng, em viết được hai phép trừ.'],
      solution: '7 + 6 = 13, nên 13 − 7 = 6 và 13 − 6 = 7.',
    },
    {
      type: 'choice',
      prompt: 'Số nào? 15 − ? = 8',
      options: ['6', '7', '8'],
      answer: 1,
      hints: ['Em nghĩ: 8 cộng mấy bằng 15?'],
      solution: '8 + 7 = 15, nên 15 − 7 = 8. Số cần điền là 7.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 11 − 3 ... 9',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em tính 11 − 3 trước, rồi so sánh với 9.'],
      solution: '11 − 3 = 8. 8 bé hơn 9, nên 11 − 3 < 9.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 14 − 6 ... 17 − 9',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Em tính kết quả hai phép trừ trước.'],
      solution: '14 − 6 = 8 và 17 − 9 = 8. Hai kết quả bằng nhau, nên 14 − 6 = 17 − 9.',
    },
    {
      type: 'choice',
      prompt: 'Phép trừ nào có kết quả bằng 7?',
      options: ['12 − 4', '15 − 8', '11 − 3'],
      answer: 1,
      hints: ['Em tính kết quả từng phép trừ.'],
      solution: '12 − 4 = 8. 15 − 8 = 7. 11 − 3 = 8. Phép trừ có kết quả bằng 7 là 15 − 8.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép trừ theo kết quả từ bé đến lớn.',
      items: ['12 − 3', '16 − 8', '11 − 6', '13 − 6'],
      answer: [2, 3, 1, 0],
      hints: ['Em tính kết quả từng phép trừ trước.', 'Các kết quả là 9, 8, 5, 7.'],
      solution:
        '11 − 6 = 5, 13 − 6 = 7, 16 − 8 = 8, 12 − 3 = 9. Từ bé đến lớn: 11 − 6, 13 − 6, 16 − 8, 12 − 3.',
    },
    {
      type: 'count',
      prompt:
        'Trên sân có 13 con gà con. 5 con gà con chạy vào chuồng. Hình vẽ những con gà con còn lại. Trên sân còn lại mấy con gà con?',
      picture: 'chick',
      answer: 8,
      choices: [7, 8, 9],
      hints: ['Em tính 13 − 5: bớt 3 con trước cho còn 10 con.'],
      solution: 'Số con gà con còn lại là: 13 − 5 = 8 (con). Đáp số: 8 con gà con.',
    },
    {
      type: 'choice',
      prompt:
        'Bình có 9 cái bút chì. An có nhiều hơn Bình 3 cái bút chì. Hỏi An có bao nhiêu cái bút chì?',
      options: ['12 cái', '6 cái', '11 cái'],
      answer: 0,
      hints: ['Nhiều hơn thì em làm phép cộng.', '9 cần thêm 1 là đủ 10.'],
      solution: 'Số bút chì An có là: 9 + 3 = 12 (cái). Đáp số: 12 cái bút chì.',
    },
    {
      type: 'count',
      prompt:
        'Hoa có 11 quả bóng bay. Hà có ít hơn Hoa 3 quả bóng bay. Hình vẽ số bóng bay của Hà. Hà có mấy quả bóng bay?',
      picture: 'balloon',
      answer: 8,
      choices: [7, 8, 9],
      hints: ['Ít hơn thì em làm phép trừ: 11 − 3.', '11 − 1 = 10, rồi trừ tiếp 2.'],
      solution: 'Số quả bóng bay của Hà là: 11 − 3 = 8 (quả). Đáp số: 8 quả bóng bay.',
    },
  ],
  takeaways: [
    'Trừ qua 10: trừ về 10 rồi trừ tiếp, hoặc nhớ bảng cộng.',
    'Nhiều hơn thì làm phép cộng, ít hơn thì làm phép trừ.',
  ],
};
