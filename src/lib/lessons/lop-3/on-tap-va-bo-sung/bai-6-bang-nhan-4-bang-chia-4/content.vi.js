/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lập bảng nhân 4 bằng cách đếm thêm 4, suy ra bảng chia 4 từ bảng nhân 4 và vận dụng vào bài toán thực tế.',
  intro:
    'Mỗi ô tô có 4 bánh xe. 3 ô tô có bao nhiêu bánh xe? Em xếp các chấm thành từng hàng 4 chấm để lập bảng nhân 4, rồi khoanh từng hàng để có bảng chia 4 nhé!',
  objectives: [
    'Lập và thuộc bảng nhân 4.',
    'Từ bảng nhân 4, lập và thuộc bảng chia 4.',
    'Vận dụng bảng nhân 4, bảng chia 4 để giải bài toán.',
  ],
  sections: [
    {
      heading: 'Bảng nhân 4',
      blocks: [
        {
          type: 'p',
          text: '3 ô tô, mỗi ô tô 4 bánh xe. 4 được lấy 3 lần: 4 × 3 = 4 + 4 + 4 = 12.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đếm thêm',
          text: 'Mỗi dòng của bảng nhân 4 hơn dòng trên 4 đơn vị: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40.',
        },
        {
          type: 'table',
          head: ['Bảng nhân 4'],
          rows: [
            ['4 × 1 = 4'],
            ['4 × 2 = 8'],
            ['4 × 3 = 12'],
            ['4 × 4 = 16'],
            ['4 × 5 = 20'],
            ['4 × 6 = 24'],
            ['4 × 7 = 28'],
            ['4 × 8 = 32'],
            ['4 × 9 = 36'],
            ['4 × 10 = 40'],
          ],
        },
      ],
    },
    {
      heading: 'Bảng chia 4',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi hàng có 4 chấm, 3 hàng có 12 chấm: 4 × 3 = 12. Có 12 chấm, mỗi hàng 4 chấm thì được 3 hàng: 12 : 4 = 3.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Từ bảng nhân 4, em có bảng chia 4. Vì 4 × 3 = 12 nên 12 : 4 = 3.',
        },
        {
          type: 'table',
          head: ['Bảng chia 4'],
          rows: [
            ['4 : 4 = 1'],
            ['8 : 4 = 2'],
            ['12 : 4 = 3'],
            ['16 : 4 = 4'],
            ['20 : 4 = 5'],
            ['24 : 4 = 6'],
            ['28 : 4 = 7'],
            ['32 : 4 = 8'],
            ['36 : 4 = 9'],
            ['40 : 4 = 10'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Lưới chấm mỗi hàng 4 chấm',
    instruction:
      'Chọn "Bảng nhân 4" và thêm từng hàng để đọc tích ở cuối hàng. Chọn "Bảng chia 4" và khoanh từng hàng 4 chấm để đọc thương. Chọn "Đố em" để luyện tập.',
  },
  examples: [
    {
      problem: 'Mỗi ô tô có 4 bánh xe. 8 ô tô như vậy có bao nhiêu bánh xe?',
      steps: ['4 được lấy 8 lần.', '4 × 8 = 32.'],
      answer: '8 ô tô có 32 bánh xe.',
    },
    {
      problem: 'Xếp đều 28 chiếc bánh vào 4 hộp. Mỗi hộp có mấy chiếc bánh?',
      steps: ['Xếp đều nên em làm phép chia.', '28 : 4 = 7.'],
      answer: 'Mỗi hộp có 7 chiếc bánh.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy quả táo? Em đếm thêm 4: 4, 8, 12, ...',
      picture: 'apple',
      answer: 20,
      choices: [16, 18, 20, 22, 24],
      hints: ['Em khoanh từng nhóm 4 quả rồi đếm thêm 4.'],
      solution: '4, 8, 12, 16, 20. Có 20 quả táo. 4 × 5 = 20.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với kết quả.',
      left: ['4 × 3', '4 × 7', '4 × 9', '4 × 10'],
      right: ['40', '12', '36', '28'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Em đọc lại bảng nhân 4.'],
      solution: '4 × 3 = 12. 4 × 7 = 28. 4 × 9 = 36. 4 × 10 = 40.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với kết quả.',
      left: ['4 : 4', '32 : 4', '16 : 4', '28 : 4'],
      right: ['4', '7', '1', '8'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['4 nhân với mấy thì bằng số bị chia?'],
      solution: '4 : 4 = 1. 32 : 4 = 8. 16 : 4 = 4. 28 : 4 = 7.',
    },
    {
      type: 'number',
      prompt: '4 × 6 = ?',
      answer: 24,
      hints: ['4 × 5 = 20. Em cộng thêm 4.'],
      solution: '4 × 5 = 20, 20 + 4 = 24. Vậy 4 × 6 = 24.',
    },
    {
      type: 'number',
      prompt: '36 : 4 = ?',
      answer: 9,
      hints: ['4 nhân với mấy thì bằng 36?'],
      solution: 'Vì 4 × 9 = 36 nên 36 : 4 = 9.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự đếm thêm 4.',
      items: ['16', '8', '20', '4', '12'],
      answer: [3, 1, 4, 0, 2],
      hints: ['Bắt đầu từ số bé nhất, mỗi lần thêm 4.'],
      solution: '4, 8, 12, 16, 20.',
    },
    {
      type: 'number',
      prompt: 'Số còn thiếu trong dãy: 40, 36, 32, ?, 24.',
      answer: 28,
      hints: ['Mỗi số kém số trước 4 đơn vị.'],
      solution: '32 − 4 = 28. Dãy là 40, 36, 32, 28, 24.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bằng 20?',
      options: ['4 × 5', '5 × 4', '4 × 6', '24 : 4'],
      answers: [0, 1],
      hints: ['Em tính từng phép tính.'],
      solution: '4 × 5 = 20 và 5 × 4 = 20. Còn 4 × 6 = 24 và 24 : 4 = 6.',
    },
    {
      type: 'choice',
      prompt: 'Mỗi ô tô có 4 bánh xe. 7 ô tô như vậy có bao nhiêu bánh xe?',
      options: ['11 bánh xe', '24 bánh xe', '28 bánh xe', '32 bánh xe'],
      answer: 2,
      hints: ['4 được lấy 7 lần.'],
      solution: '4 × 7 = 28 (bánh xe).',
    },
    {
      type: 'number',
      prompt: 'Có 12 chiếc kẹo, chia đều cho 4 bạn. Mỗi bạn được mấy chiếc kẹo?',
      answer: 3,
      unit: 'chiếc',
      hints: ['Chia đều: em làm phép chia.'],
      solution: '12 : 4 = 3 (chiếc).',
    },
  ],
  takeaways: [
    'Bảng nhân 4: đếm thêm 4, từ 4 đến 40.',
    'Bảng chia 4 suy ra từ bảng nhân 4.',
    'Vì 4 × 3 = 12 nên 12 : 4 = 3.',
  ],
};
