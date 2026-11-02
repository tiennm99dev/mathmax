/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lập bảng nhân 6 bằng cách đếm thêm 6, suy ra bảng chia 6 từ bảng nhân 6 và vận dụng vào bài toán thực tế.',
  intro:
    'Mỗi con bọ rùa có 6 chấm trên cánh. 4 con bọ rùa có bao nhiêu chấm? Em thêm từng hàng 6 chấm để lập bảng nhân 6, rồi đọc ngược lại để có bảng chia 6 nhé!',
  objectives: [
    'Lập và thuộc bảng nhân 6.',
    'Từ bảng nhân 6, lập và thuộc bảng chia 6.',
    'Vận dụng bảng nhân 6, bảng chia 6 để giải bài toán.',
  ],
  sections: [
    {
      heading: 'Bảng nhân 6',
      blocks: [
        {
          type: 'p',
          text: '4 con bọ rùa, mỗi con 6 chấm. 6 được lấy 4 lần: 6 × 4 = 6 + 6 + 6 + 6 = 24.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đếm thêm',
          text: 'Mỗi dòng của bảng nhân 6 hơn dòng trên 6 đơn vị: 6, 12, 18, 24, 30, 36, 42, 48, 54, 60.',
        },
        {
          type: 'table',
          head: ['Bảng nhân 6'],
          rows: [
            ['6 × 1 = 6'],
            ['6 × 2 = 12'],
            ['6 × 3 = 18'],
            ['6 × 4 = 24'],
            ['6 × 5 = 30'],
            ['6 × 6 = 36'],
            ['6 × 7 = 42'],
            ['6 × 8 = 48'],
            ['6 × 9 = 54'],
            ['6 × 10 = 60'],
          ],
        },
      ],
    },
    {
      heading: 'Bảng chia 6',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi con bọ rùa có 6 chấm, 4 con có 24 chấm: 6 × 4 = 24. Có 24 chấm, mỗi con 6 chấm thì được 4 con: 24 : 6 = 4.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Từ bảng nhân 6, em có bảng chia 6. Vì 6 × 4 = 24 nên 24 : 6 = 4.',
        },
        {
          type: 'table',
          head: ['Bảng chia 6'],
          rows: [
            ['6 : 6 = 1'],
            ['12 : 6 = 2'],
            ['18 : 6 = 3'],
            ['24 : 6 = 4'],
            ['30 : 6 = 5'],
            ['36 : 6 = 6'],
            ['42 : 6 = 7'],
            ['48 : 6 = 8'],
            ['54 : 6 = 9'],
            ['60 : 6 = 10'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Mảng chấm mỗi hàng 6 chấm',
    instruction:
      'Chọn "Bảng nhân 6" và thêm từng hàng. Em đọc phép nhân, rồi đọc ngược lại thành phép chia. Chọn "Bảng chia 6" và khoanh từng hàng 6 chấm để tìm thương. Chọn "Đố em" để luyện tập.',
  },
  examples: [
    {
      problem: 'Mỗi hộp có 6 chiếc bút chì màu. 4 hộp như vậy có bao nhiêu chiếc bút chì màu?',
      steps: ['6 được lấy 4 lần.', '6 × 4 = 24.'],
      answer: '4 hộp có 24 chiếc bút chì màu.',
    },
    {
      problem:
        'Một thanh gỗ dài 60 cm được cưa thành 6 đoạn bằng nhau. Mỗi đoạn dài bao nhiêu xăng-ti-mét?',
      steps: ['Cưa thành các đoạn bằng nhau nên em làm phép chia.', '60 : 6 = 10.'],
      answer: 'Mỗi đoạn dài 10 cm.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy bông hoa? Em đếm thêm 6: 6, 12, ...',
      picture: 'flower',
      answer: 18,
      choices: [12, 16, 18, 20, 24],
      hints: ['Em đếm lần lượt từng bông. Cứ đủ 6 bông, em đọc một số: 6, 12, ...'],
      solution: '6, 12, 18. Có 18 bông hoa. 6 × 3 = 18.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với kết quả.',
      left: ['6 × 2', '6 × 6', '6 × 8', '6 × 10'],
      right: ['60', '12', '48', '36'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Em đọc lại bảng nhân 6.'],
      solution: '6 × 2 = 12. 6 × 6 = 36. 6 × 8 = 48. 6 × 10 = 60.',
    },
    {
      type: 'match',
      prompt: 'Nối hai phép tính có cùng kết quả.',
      left: ['6 × 1', '6 × 3', '12 : 6', '6 × 5'],
      right: ['6 : 3', '5 × 6', '36 : 6', '2 × 9'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Em tính kết quả của từng phép tính.'],
      solution:
        '6 × 1 = 6 và 36 : 6 = 6. 6 × 3 = 18 và 2 × 9 = 18. 12 : 6 = 2 và 6 : 3 = 2. 6 × 5 = 30 và 5 × 6 = 30.',
    },
    {
      type: 'number',
      prompt: '6 × 7 = ?',
      answer: 42,
      hints: ['6 × 6 = 36. Em cộng thêm 6.'],
      solution: '6 × 6 = 36, 36 + 6 = 42. Vậy 6 × 7 = 42.',
    },
    {
      type: 'number',
      prompt: '54 : 6 = ?',
      answer: 9,
      hints: ['6 nhân với mấy thì bằng 54?'],
      solution: 'Vì 6 × 9 = 54 nên 54 : 6 = 9.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự đếm thêm 6.',
      items: ['24', '12', '30', '6', '18'],
      answer: [3, 1, 4, 0, 2],
      hints: ['Bắt đầu từ số bé nhất, mỗi lần thêm 6.'],
      solution: '6, 12, 18, 24, 30.',
    },
    {
      type: 'number',
      prompt: 'Số còn thiếu trong dãy: 60, 54, 48, ?, 36.',
      answer: 42,
      hints: ['Mỗi số kém số trước 6 đơn vị.'],
      solution: '48 − 6 = 42. Dãy là 60, 54, 48, 42, 36.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bằng 30?',
      options: ['6 × 5', '5 × 6', '6 × 6', '36 : 6'],
      answers: [0, 1],
      hints: ['Em tính từng phép tính.'],
      solution: '6 × 5 = 30 và 5 × 6 = 30. Còn 6 × 6 = 36 và 36 : 6 = 6.',
    },
    {
      type: 'choice',
      prompt: 'Mỗi con bọ rùa có 6 chấm. 7 con bọ rùa có bao nhiêu chấm?',
      options: ['13 chấm', '36 chấm', '42 chấm', '48 chấm'],
      answer: 2,
      hints: ['6 được lấy 7 lần.'],
      solution: '6 × 7 = 42 (chấm).',
    },
    {
      type: 'number',
      prompt: 'Có 36 bạn chia đều thành 6 nhóm. Mỗi nhóm có mấy bạn?',
      answer: 6,
      unit: 'bạn',
      hints: ['Chia đều: em làm phép chia.'],
      solution: '36 : 6 = 6 (bạn).',
    },
  ],
  takeaways: [
    'Bảng nhân 6: đếm thêm 6, từ 6 đến 60.',
    'Bảng chia 6 suy ra từ bảng nhân 6.',
    'Vì 6 × 4 = 24 nên 24 : 6 = 4.',
  ],
};
