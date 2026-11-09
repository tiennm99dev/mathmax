/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bảng chia 5 lớp 2: lập bảng chia 5 từ bảng nhân 5, tính nhẩm và giải bài toán chia thành các nhóm 5.',
  intro:
    'Cửa hàng có 40 bông hoa cúc, mỗi bó 5 bông. Bó được mấy bó? Em lập bảng chia 5 từ bảng nhân 5 để tính thật nhanh nhé!',
  objectives: [
    'Lập được bảng chia 5 từ bảng nhân 5.',
    'Tính nhẩm trong bảng chia 5.',
    'Dùng bảng chia 5 để giải bài toán.',
  ],
  sections: [
    {
      heading: 'Từ bảng nhân 5 đến bảng chia 5',
      blocks: [
        { type: 'p', text: 'Mỗi tấm bìa có 5 chấm tròn. 4 tấm bìa có 20 chấm tròn: 5 × 4 = 20.' },
        { type: 'p', text: 'Có 20 chấm tròn, mỗi tấm bìa 5 chấm. Có 4 tấm bìa: 20 : 5 = 4.' },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ghi nhớ',
          text: 'Từ 5 × 4 = 20, em có 20 : 5 = 4.',
        },
      ],
    },
    {
      heading: 'Bảng chia 5',
      blocks: [
        {
          type: 'table',
          caption: 'Bảng chia 5',
          head: ['Từ 1 đến 5', 'Từ 6 đến 10'],
          rows: [
            ['5 : 5 = 1', '30 : 5 = 6'],
            ['10 : 5 = 2', '35 : 5 = 7'],
            ['15 : 5 = 3', '40 : 5 = 8'],
            ['20 : 5 = 4', '45 : 5 = 9'],
            ['25 : 5 = 5', '50 : 5 = 10'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Em đếm thêm 5: 5, 10, 15, ... Đếm mấy lần thì tới số bị chia, thương là bấy nhiêu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lưới 5 cột',
    instruction:
      'Mỗi hàng có 5 bông hoa. Em chạm vào một hàng để chọn tổng số bông hoa, rồi đếm số hàng để đọc thương. Chọn "Đố em" để tự kiểm tra.',
  },
  examples: [
    {
      problem: 'Cửa hàng có 40 bông hoa cúc, bó thành các bó, mỗi bó 5 bông. Có mấy bó hoa?',
      steps: ['Mỗi bó có 5 bông.', 'Em viết phép chia 40 : 5.', 'Vì 5 × 8 = 40 nên 40 : 5 = 8.'],
      answer: 'Có 8 bó hoa cúc.',
    },
    {
      problem: 'Nam có 30 hình tròn. Mỗi đèn ông sao cần 5 hình. Nam làm được mấy đèn?',
      steps: ['Mỗi đèn cần 5 hình.', 'Em viết phép chia 30 : 5.', 'Vì 5 × 6 = 30 nên 30 : 5 = 6.'],
      answer: 'Nam làm được 6 đèn ông sao.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Em đếm số bông hoa trong hình. Mỗi bó có 5 bông.',
      picture: 'flower',
      answer: 15,
      groups: 3,
      choices: [10, 14, 15, 16, 20],
      hints: ['Em đếm thêm 5: 5, 10, ...', 'Mỗi 5 bông là một bó.'],
      solution: 'Có 15 bông hoa. 15 : 5 = 3, được 3 bó.',
    },
    {
      type: 'choice',
      prompt: '35 : 5 = ?',
      options: ['6', '7', '8', '30'],
      answer: 1,
      hints: ['5 nhân với số nào thì bằng 35?'],
      solution: '5 × 7 = 35, nên 35 : 5 = 7.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với thương của nó.',
      left: ['25 : 5', '40 : 5', '45 : 5'],
      right: ['5', '8', '9', '7'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em đếm thêm 5 tới số bị chia và nhớ số lần đếm.'],
      solution: '25 : 5 = 5. 40 : 5 = 8. 45 : 5 = 9.',
    },
    {
      type: 'number',
      prompt: '50 : 5 = ?',
      answer: 10,
      hints: ['5 nhân với số nào thì bằng 50?'],
      solution: '5 × 10 = 50, nên 50 : 5 = 10.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các phép chia theo thứ tự trong bảng chia 5.',
      items: ['15 : 5', '25 : 5', '5 : 5', '20 : 5', '10 : 5'],
      answer: [2, 4, 0, 3, 1],
      hints: ['Số bị chia tăng dần.', 'Em bắt đầu từ 5 : 5.'],
      solution: '5 : 5, 10 : 5, 15 : 5, 20 : 5, 25 : 5.',
    },
    {
      type: 'choice',
      prompt: 'Chia đều 20 bạn vào 5 nhóm. Mỗi nhóm có mấy bạn?',
      options: ['4', '5', '15', '25'],
      answer: 0,
      hints: ['Chia đều vào 5 nhóm thì em chia cho 5.'],
      solution: '20 : 5 = 4 (bạn).',
    },
    {
      type: 'choice',
      prompt: 'Có 10 bông hoa, cắm mỗi lọ 5 bông. Cắm được mấy lọ?',
      options: ['2', '5', '10', '15'],
      answer: 0,
      hints: ['Em lấy số bông hoa chia cho số bông mỗi lọ.'],
      solution: '10 : 5 = 2 (lọ).',
    },
    {
      type: 'number',
      prompt: 'Em tính 45 : 5, rồi cộng thêm 2. Em được số mấy?',
      answer: 11,
      hints: ['Em tính 45 : 5 trước.', 'Rồi lấy kết quả cộng thêm 2.'],
      solution: '45 : 5 = 9. 9 + 2 = 11.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bằng 6?',
      options: ['30 : 5', '12 : 2', '25 : 5', '20 : 5'],
      answers: [0, 1],
      hints: ['Em tính từng phép tính.', 'Có hai phép tính đúng.'],
      solution: '30 : 5 = 6 và 12 : 2 = 6. Còn 25 : 5 = 5, 20 : 5 = 4.',
    },
  ],
  takeaways: [
    'Bảng chia 5 lập từ bảng nhân 5: 5 × 4 = 20 cho 20 : 5 = 4.',
    'Số bị chia là 5, 10, 15, ... đến 50. Thương là 1, 2, 3, ... đến 10.',
    'Đếm thêm 5 mấy lần thì tới số bị chia, thương là bấy nhiêu.',
  ],
};
