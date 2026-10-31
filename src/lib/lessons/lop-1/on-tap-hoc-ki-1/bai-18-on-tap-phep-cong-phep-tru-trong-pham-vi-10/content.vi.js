const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép cộng, phép trừ trong phạm vi 10: tính nhẩm, cộng và trừ với số 0, tìm số còn thiếu, so sánh, nhìn hình chọn phép tính và giải bài toán.',
  intro:
    'Em đã học phép cộng, phép trừ trong phạm vi 10. Hôm nay em ôn lại cách tính, nhìn hình chọn phép tính và giải bài toán nhỏ. Em làm bài ôn tập để biết phần nào cần luyện thêm nhé!',
  objectives: [
    'Tính nhẩm phép cộng, phép trừ trong phạm vi 10.',
    'Cộng, trừ với số 0.',
    'Tìm số còn thiếu và so sánh kết quả phép tính với một số.',
    'Nhìn hình hoặc đọc bài toán, chọn phép tính đúng.',
  ],
  sections: [
    {
      heading: 'Phép cộng',
      blocks: [
        {
          type: 'p',
          text: 'Gộp lại hay thêm vào thì làm phép cộng. Có 4 con gà, thêm 2 con: 4 + 2 = 6.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đổi chỗ',
          text: 'Đổi chỗ hai số thì kết quả không đổi: 4 + 2 = 2 + 4 = 6.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng với 0',
          text: 'Một số cộng với 0 thì bằng chính số đó: 7 + 0 = 7.',
        },
      ],
    },
    {
      heading: 'Phép trừ',
      blocks: [
        {
          type: 'p',
          text: 'Tách ra hay bớt đi thì làm phép trừ. Có 6 quả cam, ăn 2 quả: 6 − 2 = 4.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trừ với 0',
          text: 'Một số trừ đi 0 thì bằng chính số đó: 5 − 0 = 5. Một số trừ đi chính nó thì bằng 0: 5 − 5 = 0.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng và trừ',
          text: 'Từ 4 + 2 = 6 ta có 6 − 2 = 4 và 6 − 4 = 2.',
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        {
          type: 'p',
          text: 'Em đọc kĩ bài toán. Có thêm vào không? Hay bớt đi?',
        },
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
      problem: 'Số nào thay cho dấu hỏi? 3 + ? = 8',
      steps: [
        'Em nghĩ: 3 cộng mấy thì bằng 8?',
        'Em đếm tiếp từ 3: bốn, năm, sáu, bảy, tám. Em đếm thêm 5 số.',
        'Thử lại: 3 + 5 = 8.',
      ],
      answer: 'Số cần điền là 5.',
    },
    {
      problem: 'Trên cành có 9 con chim. 4 con bay đi. Trên cành còn lại mấy con chim?',
      steps: [
        'Bay đi là bớt đi: em làm phép trừ.',
        'Em nghĩ: 4 cộng mấy bằng 9? 4 + 5 = 9.',
        'Vậy 9 − 4 = 5.',
      ],
      answer: 'Trên cành còn lại 5 con chim.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt:
        'Có 5 bông hoa. Thêm 3 bông hoa nữa. Hình vẽ tất cả các bông hoa. Có tất cả mấy bông hoa?',
      picture: 'flower',
      answer: 8,
      choices: ZERO_TO_TEN,
      hints: ['Đếm hết các bông hoa trong hình.'],
      solution: '5 + 3 = 8. Có tất cả 8 bông hoa.',
    },
    {
      type: 'choice',
      prompt: '6 + 3 = ?',
      options: ['8', '9', '10'],
      answer: 1,
      hints: ['Từ 6 em đếm thêm 3.'],
      solution: 'Từ 6 đếm thêm 3: bảy, tám, chín. Vậy 6 + 3 = 9.',
    },
    {
      type: 'choice',
      prompt: '10 − 3 = ?',
      options: ['6', '7', '8'],
      answer: 1,
      hints: ['Em nghĩ: 3 cộng mấy thì bằng 10?'],
      solution: '3 + 7 = 10, nên 10 − 3 = 7.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['4 + 0', '8 − 8', '2 + 7', '6 − 0'],
      right: ['4', '0', '9', '6', '8'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Cộng hay trừ với 0 thì kết quả là chính số đó.',
        'Một số trừ đi chính nó thì bằng mấy?',
      ],
      solution: '4 + 0 = 4. 8 − 8 = 0. 2 + 7 = 9. 6 − 0 = 6.',
    },
    {
      type: 'choice',
      prompt: 'Số nào thay cho dấu hỏi? ? − 2 = 7',
      options: ['5', '8', '9'],
      answer: 2,
      hints: ['Mấy bớt đi 2 thì còn 7?', 'Em thử từng số: lấy số đó trừ đi 2.'],
      solution: '7 + 2 = 9, nên 9 − 2 = 7. Số cần điền là 9.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 3 + 4 ... 8',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Tính 3 + 4 trước, rồi so sánh với 8.'],
      solution: '3 + 4 = 7. 7 bé hơn 8, nên 3 + 4 < 8.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 9 − 3 ... 6',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Tính 9 − 3 trước, rồi so sánh với 6.'],
      solution: '9 − 3 = 6. 6 bằng 6, nên 9 − 3 = 6.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phép tính có kết quả bằng 5.',
      options: ['2 + 3', '9 − 4', '1 + 5', '5 − 0', '8 − 2'],
      answers: [0, 1, 3],
      hints: ['Tính từng phép tính rồi so với 5.'],
      solution: '2 + 3 = 5, 9 − 4 = 5, 5 − 0 = 5. Còn 1 + 5 = 6 và 8 − 2 = 6.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['5 + 5', '7 − 6', '2 + 2', '10 − 3'],
      answer: [1, 2, 3, 0],
      hints: ['Tính kết quả từng phép tính trước.', 'Rồi tìm kết quả bé nhất.'],
      solution:
        '7 − 6 = 1, 2 + 2 = 4, 10 − 3 = 7, 5 + 5 = 10. Thứ tự: 7 − 6, 2 + 2, 10 − 3, 5 + 5.',
    },
    {
      type: 'choice',
      prompt:
        'Lan có 4 quả bóng bay. Mẹ mua thêm cho Lan 3 quả. Phép tính nào cho biết Lan có tất cả mấy quả?',
      options: ['4 + 3 = 7', '4 − 3 = 1', '4 + 4 = 8'],
      answer: 0,
      hints: ['Mua thêm là thêm vào.', 'Thêm vào thì làm phép cộng. Thêm mấy quả?'],
      solution: 'Có 4 quả, thêm 3 quả: 4 + 3 = 7. Lan có tất cả 7 quả bóng bay.',
    },
    {
      type: 'choice',
      prompt: 'Trong chuồng có 8 con thỏ. 2 con chạy ra ngoài. Trong chuồng còn lại mấy con thỏ?',
      options: ['5', '6', '10'],
      answer: 1,
      hints: ['Chạy ra ngoài là bớt đi: em làm phép trừ.', 'Đếm lùi 2 bước từ 8.'],
      solution: '8 − 2 = 6. Trong chuồng còn lại 6 con thỏ.',
    },
    {
      type: 'choice',
      prompt: 'Với ba số 2, 8 và 10, phép tính nào đúng?',
      options: ['10 − 8 = 2', '8 − 2 = 10', '2 + 10 = 8'],
      answer: 0,
      hints: ['Số lớn nhất là kết quả của phép cộng: 2 + 8 = 10.'],
      solution: 'Từ 2 + 8 = 10 ta có 10 − 8 = 2 và 10 − 2 = 8. Phép tính đúng là 10 − 8 = 2.',
    },
  ],
  takeaways: [
    'Gộp lại, thêm vào: làm phép cộng. Tách ra, bớt đi: làm phép trừ.',
    'Cộng hay trừ một số với 0 thì được chính số đó. Một số trừ đi chính nó thì bằng 0.',
    'Từ một phép cộng, em viết được hai phép trừ.',
  ],
};
