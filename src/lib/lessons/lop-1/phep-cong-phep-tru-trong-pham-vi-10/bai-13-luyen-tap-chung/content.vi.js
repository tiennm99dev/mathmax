const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn lại chủ đề phép cộng, phép trừ trong phạm vi 10: tính, tìm số còn thiếu, so sánh, nhìn hình viết phép tính và giải bài toán.',
  intro:
    'Em đã học phép cộng, phép trừ và bảng cộng, bảng trừ. Hôm nay em luyện tập lại và giải vài bài toán nhỏ trong cuộc sống nhé!',
  objectives: [
    'Tính nhẩm phép cộng, phép trừ trong phạm vi 10.',
    'Tìm số còn thiếu trong phép tính.',
    'So sánh kết quả phép tính với một số.',
    'Chọn phép tính đúng cho bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Phép cộng',
          text: 'Gộp lại hay thêm vào thì làm phép cộng: 4 + 3 = 7.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phép trừ',
          text: 'Tách ra hay bớt đi thì làm phép trừ: 7 − 3 = 4.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng và trừ',
          text: 'Từ 4 + 3 = 7 ta có 7 − 3 = 4 và 7 − 4 = 3.',
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
            ['bớt đi, bay đi, ăn mất, còn lại', 'phép trừ'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi bộ có 12 câu trộn từ cả chủ đề. Chạm vào đáp án. Sai lần đầu, em được gợi ý và thử lại. Làm xong, em xem mình cần ôn phần nào và chọn "Làm bộ bài khác".',
  },
  examples: [
    {
      problem: 'Có 6 con vịt dưới ao. 3 con lên bờ. Dưới ao còn lại mấy con vịt?',
      steps: [
        '3 con lên bờ là bớt đi 3 con: em làm phép trừ.',
        'Em nghĩ: 3 cộng mấy bằng 6? 3 + 3 = 6.',
        'Vậy 6 − 3 = 3.',
      ],
      answer: 'Dưới ao còn lại 3 con vịt.',
    },
    {
      problem: 'Chọn dấu đúng: 5 + 4 ... 8',
      steps: ['Tính trước: 5 + 4 = 9.', 'So sánh: 9 lớn hơn 8.'],
      answer: '5 + 4 > 8.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có 3 con gà con đang ăn. Thêm 4 con chạy đến. Có tất cả mấy con gà con?',
      picture: 'chick',
      answer: 7,
      choices: ZERO_TO_TEN,
      hints: ['Đếm hết các con gà con trong hình.'],
      solution: '3 + 4 = 7. Có tất cả 7 con gà con.',
    },
    {
      type: 'count',
      prompt:
        'Có 10 quả dâu tây. Em ăn 2 quả. Hình vẽ những quả dâu còn lại. Còn lại mấy quả dâu tây?',
      picture: 'strawberry',
      answer: 8,
      choices: ZERO_TO_TEN,
      hints: ['Đếm các quả dâu tây trong hình.', 'Kiểm tra lại: 10 bớt 2 còn mấy?'],
      solution: '10 − 2 = 8. Còn lại 8 quả dâu tây.',
    },
    {
      type: 'choice',
      prompt: '5 + 4 = ?',
      options: ['8', '9', '10'],
      answer: 1,
      hints: ['Từ 5 đếm thêm 4.'],
      solution: 'Từ 5 đếm thêm 4: sáu, bảy, tám, chín. Vậy 5 + 4 = 9.',
    },
    {
      type: 'choice',
      prompt: '10 − 4 = ?',
      options: ['5', '6', '7'],
      answer: 1,
      hints: ['Em nghĩ: 4 cộng mấy thì bằng 10?'],
      solution: '4 + 6 = 10, nên 10 − 4 = 6.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['2 + 2', '9 − 3', '1 + 7', '10 − 10'],
      right: ['4', '6', '8', '0', '2'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tính từng phép tính.', 'Một số trừ đi chính nó thì bằng mấy?'],
      solution: '2 + 2 = 4. 9 − 3 = 6. 1 + 7 = 8. 10 − 10 = 0.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 6 + 2 ... 9',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Tính 6 + 2 trước, rồi so sánh với 9.'],
      solution: '6 + 2 = 8. 8 bé hơn 9, nên 6 + 2 < 9.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 8 − 3 ... 4',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Tính 8 − 3 trước, rồi so sánh với 4.'],
      solution: '8 − 3 = 5. 5 lớn hơn 4, nên 8 − 3 > 4.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phép tính có kết quả bằng 6.',
      options: ['3 + 3', '10 − 4', '2 + 5', '7 − 1', '9 − 2'],
      answers: [0, 1, 3],
      hints: ['Tính từng phép tính rồi so với 6.'],
      solution: '3 + 3 = 6, 10 − 4 = 6, 7 − 1 = 6. Còn 2 + 5 = 7 và 9 − 2 = 7.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['4 + 5', '6 − 6', '3 + 0', '10 − 5'],
      answer: [1, 2, 3, 0],
      hints: ['Tính kết quả của từng phép tính trước.', 'Rồi tìm kết quả bé nhất.'],
      solution: '6 − 6 = 0, 3 + 0 = 3, 10 − 5 = 5, 4 + 5 = 9. Thứ tự: 6 − 6, 3 + 0, 10 − 5, 4 + 5.',
    },
    {
      type: 'choice',
      prompt:
        'Trong vườn có 8 cây hoa hồng. Bà trồng thêm 2 cây. Phép tính nào cho biết trong vườn có tất cả mấy cây?',
      options: ['8 + 2 = 10', '8 − 2 = 6', '8 + 1 = 9'],
      answer: 0,
      hints: ['Trồng thêm là thêm vào.', 'Thêm vào thì làm phép cộng. Thêm mấy cây?'],
      solution: 'Có 8 cây, trồng thêm 2 cây: 8 + 2 = 10. Trong vườn có tất cả 10 cây hoa hồng.',
    },
    {
      type: 'choice',
      prompt: 'Trên bàn có 7 cái cốc. Em cất đi 3 cái cốc. Trên bàn còn lại mấy cái cốc?',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['Cất đi là bớt đi: em làm phép trừ.', 'Đếm lùi 3 bước từ 7.'],
      solution: '7 − 3 = 4. Trên bàn còn lại 4 cái cốc.',
    },
    {
      type: 'choice',
      prompt: 'Số nào điền vào ô trống? ? − 3 = 5',
      options: ['7', '8', '9'],
      answer: 1,
      hints: ['Mấy bớt đi 3 thì còn 5?', 'Thử từng số: lấy số đó trừ đi 3.'],
      solution: '5 + 3 = 8, nên 8 − 3 = 5. Số cần điền là 8.',
    },
    {
      type: 'choice',
      prompt: 'Với ba số 3, 6 và 9, phép tính nào đúng?',
      options: ['9 − 6 = 3', '6 − 3 = 9', '3 + 9 = 6'],
      answer: 0,
      hints: ['Số lớn nhất là kết quả của phép cộng: 3 + 6 = 9.'],
      solution: 'Từ 3 + 6 = 9 ta có 9 − 6 = 3 và 9 − 3 = 6. Phép tính đúng là 9 − 6 = 3.',
    },
  ],
  takeaways: [
    'Gộp lại, thêm vào: làm phép cộng. Tách ra, bớt đi: làm phép trừ.',
    'Muốn so sánh một phép tính với một số, em tính kết quả trước.',
    'Từ một phép cộng, em viết được hai phép trừ.',
  ],
};
