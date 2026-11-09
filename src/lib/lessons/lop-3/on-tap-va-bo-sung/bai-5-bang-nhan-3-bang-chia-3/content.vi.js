/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lập bảng nhân 3 bằng cách đếm thêm 3, suy ra bảng chia 3 từ bảng nhân 3 và vận dụng vào bài toán thực tế.',
  intro:
    'Mỗi xe xích lô có 3 bánh. 4 xe xích lô có bao nhiêu bánh xe? Em nhảy từng bước 3 trên tia số để lập bảng nhân 3, rồi lùi lại để có bảng chia 3 nhé!',
  objectives: [
    'Lập và thuộc bảng nhân 3.',
    'Từ bảng nhân 3, lập và thuộc bảng chia 3.',
    'Vận dụng bảng nhân 3, bảng chia 3 để giải bài toán.',
  ],
  sections: [
    {
      heading: 'Bảng nhân 3',
      blocks: [
        {
          type: 'p',
          text: '4 xe xích lô, mỗi xe 3 bánh. 3 được lấy 4 lần: 3 × 4 = 3 + 3 + 3 + 3 = 12.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đếm thêm',
          text: 'Mỗi dòng của bảng nhân 3 hơn dòng trên 3 đơn vị: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30.',
        },
        {
          type: 'table',
          head: ['Bảng nhân 3'],
          rows: [
            ['3 × 1 = 3'],
            ['3 × 2 = 6'],
            ['3 × 3 = 9'],
            ['3 × 4 = 12'],
            ['3 × 5 = 15'],
            ['3 × 6 = 18'],
            ['3 × 7 = 21'],
            ['3 × 8 = 24'],
            ['3 × 9 = 27'],
            ['3 × 10 = 30'],
          ],
        },
      ],
    },
    {
      heading: 'Bảng chia 3',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi ô có 3 chấm tròn, 4 ô có 12 chấm: 3 × 4 = 12. Có 12 chấm, mỗi ô 3 chấm thì được 4 ô: 12 : 3 = 4.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Từ bảng nhân 3, em có bảng chia 3. Vì 3 × 4 = 12 nên 12 : 3 = 4.',
        },
        {
          type: 'table',
          head: ['Bảng chia 3'],
          rows: [
            ['3 : 3 = 1'],
            ['6 : 3 = 2'],
            ['9 : 3 = 3'],
            ['12 : 3 = 4'],
            ['15 : 3 = 5'],
            ['18 : 3 = 6'],
            ['21 : 3 = 7'],
            ['24 : 3 = 8'],
            ['27 : 3 = 9'],
            ['30 : 3 = 10'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Nhảy bước 3 trên tia số',
    instruction:
      'Chọn "Bảng nhân 3" và nhảy thêm 3 để lập từng dòng. Chọn "Bảng chia 3" và lùi 3 cho đến số 0 để tìm kết quả. Chọn "Đố em" để luyện tập.',
  },
  examples: [
    {
      problem: 'Mỗi bàn đấu cờ vua có 3 người. 6 bàn như vậy có bao nhiêu người?',
      steps: ['3 được lấy 6 lần.', '3 × 6 = 18.'],
      answer: '6 bàn có 18 người.',
    },
    {
      problem: 'Chia đều 30 que tính thành 3 bó. Mỗi bó có bao nhiêu que tính?',
      steps: ['Chia đều nên em làm phép chia.', '30 : 3 = 10.'],
      answer: 'Mỗi bó có 10 que tính.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy quả táo? Em đếm thêm 3: 3, 6, 9, ...',
      picture: 'apple',
      answer: 15,
      groups: 5,
      choices: [12, 14, 15, 16, 18],
      hints: ['Em khoanh từng nhóm 3 quả rồi đếm thêm 3.'],
      solution: '3, 6, 9, 12, 15. Có 15 quả táo. 3 × 5 = 15.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với kết quả.',
      left: ['3 × 2', '3 × 7', '3 × 9', '3 × 10'],
      right: ['30', '6', '27', '21'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Em đọc lại bảng nhân 3.'],
      solution: '3 × 2 = 6. 3 × 7 = 21. 3 × 9 = 27. 3 × 10 = 30.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với kết quả.',
      left: ['3 : 3', '27 : 3', '12 : 3', '21 : 3'],
      right: ['4', '7', '1', '9'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['3 nhân với mấy thì bằng số bị chia?'],
      solution: '3 : 3 = 1. 27 : 3 = 9. 12 : 3 = 4. 21 : 3 = 7.',
    },
    {
      type: 'number',
      prompt: '3 × 8 = ?',
      answer: 24,
      hints: ['3 × 7 = 21. Em cộng thêm 3.'],
      solution: '3 × 7 = 21, 21 + 3 = 24. Vậy 3 × 8 = 24.',
    },
    {
      type: 'number',
      prompt: '18 : 3 = ?',
      answer: 6,
      hints: ['3 nhân với mấy thì bằng 18?'],
      solution: 'Vì 3 × 6 = 18 nên 18 : 3 = 6.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự đếm thêm 3.',
      items: ['12', '6', '15', '3', '9'],
      answer: [3, 1, 4, 0, 2],
      hints: ['Bắt đầu từ số bé nhất, mỗi lần thêm 3.'],
      solution: '3, 6, 9, 12, 15.',
    },
    {
      type: 'number',
      prompt: 'Số còn thiếu trong dãy: 30, 27, 24, ?, 18.',
      answer: 21,
      hints: ['Mỗi số kém số trước 3 đơn vị.'],
      solution: '24 − 3 = 21. Dãy là 30, 27, 24, 21, 18.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bằng 15?',
      options: ['5 × 3', '3 × 5', '3 × 6', '18 : 3'],
      answers: [0, 1],
      hints: ['Em tính từng phép tính.'],
      solution: '5 × 3 = 15 và 3 × 5 = 15. Còn 3 × 6 = 18 và 18 : 3 = 6.',
    },
    {
      type: 'choice',
      prompt: 'Mỗi xe xích lô có 3 bánh. 7 xe xích lô có bao nhiêu bánh xe?',
      options: ['10 bánh xe', '21 bánh xe', '24 bánh xe', '18 bánh xe'],
      answer: 1,
      hints: ['3 được lấy 7 lần.'],
      solution: '3 × 7 = 21 (bánh xe).',
    },
    {
      type: 'number',
      prompt: 'Có 24 quả cam, xếp đều vào 3 đĩa. Mỗi đĩa có mấy quả cam?',
      answer: 8,
      unit: 'quả',
      hints: ['Chia đều: em làm phép chia.'],
      solution: '24 : 3 = 8 (quả).',
    },
  ],
  takeaways: [
    'Bảng nhân 3: đếm thêm 3, từ 3 đến 30.',
    'Bảng chia 3 suy ra từ bảng nhân 3.',
    'Vì 3 × 4 = 12 nên 12 : 3 = 4.',
  ],
};
