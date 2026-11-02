/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lập bảng nhân 8 bằng cách đếm thêm 8, suy ra bảng chia 8 từ bảng nhân 8, luyện nhớ bằng thẻ ghi nhớ và vận dụng vào bài toán thực tế.',
  intro:
    'Mỗi con bạch tuộc có 8 cái vòi. 2 con bạch tuộc có bao nhiêu cái vòi? Em lập bảng nhân 8, bảng chia 8, rồi luyện bằng thẻ ghi nhớ nhé. Thẻ em chưa nhớ sẽ quay lại nhiều hơn!',
  objectives: [
    'Lập và thuộc bảng nhân 8.',
    'Từ bảng nhân 8, lập và thuộc bảng chia 8.',
    'Vận dụng bảng nhân 8, bảng chia 8 để giải bài toán.',
  ],
  sections: [
    {
      heading: 'Bảng nhân 8',
      blocks: [
        {
          type: 'p',
          text: '2 con bạch tuộc, mỗi con 8 cái vòi. 8 được lấy 2 lần: 8 × 2 = 8 + 8 = 16.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đếm thêm',
          text: 'Mỗi dòng của bảng nhân 8 hơn dòng trên 8 đơn vị: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80.',
        },
        {
          type: 'table',
          head: ['Bảng nhân 8'],
          rows: [
            ['8 × 1 = 8'],
            ['8 × 2 = 16'],
            ['8 × 3 = 24'],
            ['8 × 4 = 32'],
            ['8 × 5 = 40'],
            ['8 × 6 = 48'],
            ['8 × 7 = 56'],
            ['8 × 8 = 64'],
            ['8 × 9 = 72'],
            ['8 × 10 = 80'],
          ],
        },
      ],
    },
    {
      heading: 'Bảng chia 8',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi con có 8 cái vòi, 2 con có 16 cái vòi: 8 × 2 = 16. Có 16 cái vòi, mỗi con 8 cái thì có 2 con: 16 : 8 = 2.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Từ bảng nhân 8, em có bảng chia 8. Vì 8 × 2 = 16 nên 16 : 8 = 2.',
        },
        {
          type: 'table',
          head: ['Bảng chia 8'],
          rows: [
            ['8 : 8 = 1'],
            ['16 : 8 = 2'],
            ['24 : 8 = 3'],
            ['32 : 8 = 4'],
            ['40 : 8 = 5'],
            ['48 : 8 = 6'],
            ['56 : 8 = 7'],
            ['64 : 8 = 8'],
            ['72 : 8 = 9'],
            ['80 : 8 = 10'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bạch tuộc và thẻ ghi nhớ',
    instruction:
      'Chọn "Lập bảng" và thêm từng con bạch tuộc. Chọn "Thẻ nhân 8" hoặc "Thẻ chia 8" để luyện. Trả lời đúng 2 lần thì thẻ vào hộp "Đã thuộc". Thẻ em làm sai sẽ sớm quay lại.',
  },
  examples: [
    {
      problem: 'Mỗi con cua có 8 cái chân. 3 con cua có bao nhiêu cái chân?',
      steps: ['8 được lấy 3 lần.', '8 × 3 = 24.'],
      answer: '3 con cua có 24 cái chân.',
    },
    {
      problem: 'Xếp đều 40 chiếc bút chì màu vào 8 hộp. Mỗi hộp có mấy chiếc bút?',
      steps: ['Xếp đều nên em làm phép chia.', '40 : 8 = 5.'],
      answer: 'Mỗi hộp có 5 chiếc bút chì màu.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy con cá? Em đếm thêm 8: 8, 16, ...',
      picture: 'fish',
      answer: 24,
      choices: [16, 20, 24, 28, 32],
      hints: ['Em đếm lần lượt từng con. Cứ đủ 8 con, em đọc một số: 8, 16, ...'],
      solution: '8, 16, 24. Có 24 con cá. 8 × 3 = 24.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['64 : 8', '8 × 2', '8 × 5', '40 : 8', '8 × 7'],
      right: ['56', '8', '40', '16', '5'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 4],
        [4, 0],
      ],
      hints: ['Em đọc lại bảng nhân 8 và bảng chia 8.'],
      solution: '64 : 8 = 8. 8 × 2 = 16. 8 × 5 = 40. 40 : 8 = 5. 8 × 7 = 56.',
    },
    {
      type: 'number',
      prompt: '8 × 6 = ?',
      answer: 48,
      hints: ['8 × 5 = 40. Em cộng thêm 8.'],
      solution: '8 × 5 = 40, 40 + 8 = 48. Vậy 8 × 6 = 48.',
    },
    {
      type: 'number',
      prompt: '72 : 8 = ?',
      answer: 9,
      hints: ['8 nhân với mấy thì bằng 72?'],
      solution: 'Vì 8 × 9 = 72 nên 72 : 8 = 9.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự đếm thêm 8.',
      items: ['32', '16', '40', '8', '24'],
      answer: [3, 1, 4, 0, 2],
      hints: ['Bắt đầu từ số bé nhất, mỗi lần thêm 8.'],
      solution: '8, 16, 24, 32, 40.',
    },
    {
      type: 'number',
      prompt: 'Số còn thiếu trong dãy: 80, 72, 64, ?, 48.',
      answer: 56,
      hints: ['Mỗi số kém số trước 8 đơn vị.'],
      solution: '64 − 8 = 56. Dãy là 80, 72, 64, 56, 48.',
    },
    {
      type: 'number',
      prompt: 'Em lấy 8 × 3, rồi cộng thêm 16. Em được số nào?',
      answer: 40,
      hints: ['Em tính 8 × 3 trước.'],
      solution: '8 × 3 = 24. 24 + 16 = 40.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bằng 40?',
      options: ['8 × 5', '5 × 8', '8 × 6', '48 : 8'],
      answers: [0, 1],
      hints: ['Em tính từng phép tính.'],
      solution: '8 × 5 = 40 và 5 × 8 = 40. Còn 8 × 6 = 48 và 48 : 8 = 6.',
    },
    {
      type: 'choice',
      prompt: 'Mỗi con bạch tuộc có 8 cái vòi. 7 con bạch tuộc có bao nhiêu cái vòi?',
      options: ['15 cái vòi', '48 cái vòi', '56 cái vòi', '64 cái vòi'],
      answer: 2,
      hints: ['8 được lấy 7 lần.'],
      solution: '8 × 7 = 56 (cái vòi).',
    },
    {
      type: 'number',
      prompt: 'Mỗi con cua có 2 cái càng. 6 con cua có bao nhiêu cái càng?',
      answer: 12,
      unit: 'cái',
      hints: ['2 được lấy 6 lần.'],
      solution: '2 × 6 = 12 (cái càng).',
    },
  ],
  takeaways: [
    'Bảng nhân 8: đếm thêm 8, từ 8 đến 80.',
    'Bảng chia 8 suy ra từ bảng nhân 8.',
    'Vì 8 × 2 = 16 nên 16 : 8 = 2.',
  ],
};
