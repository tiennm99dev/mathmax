/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lập bảng nhân 7 bằng cách đếm thêm 7 theo từng tuần, suy ra bảng chia 7 từ bảng nhân 7 và vận dụng vào bài toán thực tế.',
  intro:
    'Một tuần có 7 ngày. Bố của Mai đi công tác 4 tuần thì hết bao nhiêu ngày? Em thêm từng tuần trên tờ lịch để lập bảng nhân 7, rồi khoanh từng tuần để có bảng chia 7 nhé!',
  objectives: [
    'Lập và thuộc bảng nhân 7.',
    'Từ bảng nhân 7, lập và thuộc bảng chia 7.',
    'Vận dụng bảng nhân 7, bảng chia 7 để giải bài toán.',
  ],
  sections: [
    {
      heading: 'Bảng nhân 7',
      blocks: [
        {
          type: 'p',
          text: 'Hai đội chơi kéo co, mỗi đội 7 bạn. 7 được lấy 2 lần: 7 × 2 = 7 + 7 = 14.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đếm thêm',
          text: 'Mỗi dòng của bảng nhân 7 hơn dòng trên 7 đơn vị: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70.',
        },
        {
          type: 'table',
          head: ['Bảng nhân 7'],
          rows: [
            ['7 × 1 = 7'],
            ['7 × 2 = 14'],
            ['7 × 3 = 21'],
            ['7 × 4 = 28'],
            ['7 × 5 = 35'],
            ['7 × 6 = 42'],
            ['7 × 7 = 49'],
            ['7 × 8 = 56'],
            ['7 × 9 = 63'],
            ['7 × 10 = 70'],
          ],
        },
      ],
    },
    {
      heading: 'Bảng chia 7',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi đội có 7 bạn, 2 đội có 14 bạn: 7 × 2 = 14. Có 14 bạn, mỗi đội 7 bạn thì được 2 đội: 14 : 7 = 2.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Từ bảng nhân 7, em có bảng chia 7. Vì 7 × 3 = 21 nên 21 : 7 = 3.',
        },
        {
          type: 'table',
          head: ['Bảng chia 7'],
          rows: [
            ['7 : 7 = 1'],
            ['14 : 7 = 2'],
            ['21 : 7 = 3'],
            ['28 : 7 = 4'],
            ['35 : 7 = 5'],
            ['42 : 7 = 6'],
            ['49 : 7 = 7'],
            ['56 : 7 = 8'],
            ['63 : 7 = 9'],
            ['70 : 7 = 10'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Đếm theo tuần trên tờ lịch',
    instruction:
      'Chọn "Bảng nhân 7" và thêm từng tuần. Ngày Chủ nhật của mỗi tuần là một kết quả của bảng nhân 7. Chọn "Bảng chia 7" và khoanh từng tuần để tìm thương. Chọn "Đố em" để luyện tập.',
  },
  examples: [
    {
      problem: 'Một tuần có 7 ngày. Bố của Mai đi công tác 4 tuần. Bố đi công tác bao nhiêu ngày?',
      steps: ['7 được lấy 4 lần.', '7 × 4 = 28.'],
      answer: 'Bố đi công tác 28 ngày.',
    },
    {
      problem: 'Có 42 cái cốc xếp đều vào 7 hộp. Mỗi hộp có mấy cái cốc?',
      steps: ['Xếp đều nên em làm phép chia.', '42 : 7 = 6.'],
      answer: 'Mỗi hộp có 6 cái cốc.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy ngôi sao? Em đếm thêm 7: 7, 14, ...',
      picture: 'star',
      answer: 21,
      choices: [14, 18, 21, 24, 28],
      hints: ['Em khoanh từng nhóm 7 ngôi sao rồi đếm thêm 7.'],
      solution: '7, 14, 21. Có 21 ngôi sao. 7 × 3 = 21.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với kết quả.',
      left: ['7 × 3', '7 × 6', '7 × 8', '7 × 9'],
      right: ['63', '21', '56', '42'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Em đọc lại bảng nhân 7.'],
      solution: '7 × 3 = 21. 7 × 6 = 42. 7 × 8 = 56. 7 × 9 = 63.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với kết quả.',
      left: ['7 : 7', '35 : 7', '49 : 7', '70 : 7'],
      right: ['7', '10', '1', '5'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['7 nhân với mấy thì bằng số bị chia?'],
      solution: '7 : 7 = 1. 35 : 7 = 5. 49 : 7 = 7. 70 : 7 = 10.',
    },
    {
      type: 'number',
      prompt: '7 × 7 = ?',
      answer: 49,
      hints: ['7 × 6 = 42. Em cộng thêm 7.'],
      solution: '7 × 6 = 42, 42 + 7 = 49. Vậy 7 × 7 = 49.',
    },
    {
      type: 'number',
      prompt: '56 : 7 = ?',
      answer: 8,
      hints: ['7 nhân với mấy thì bằng 56?'],
      solution: 'Vì 7 × 8 = 56 nên 56 : 7 = 8.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự đếm thêm 7.',
      items: ['28', '14', '35', '7', '21'],
      answer: [3, 1, 4, 0, 2],
      hints: ['Bắt đầu từ số bé nhất, mỗi lần thêm 7.'],
      solution: '7, 14, 21, 28, 35.',
    },
    {
      type: 'number',
      prompt: 'Số còn thiếu trong dãy: 70, 63, 56, ?, 42.',
      answer: 49,
      hints: ['Mỗi số kém số trước 7 đơn vị.'],
      solution: '56 − 7 = 49. Dãy là 70, 63, 56, 49, 42.',
    },
    {
      type: 'choice',
      prompt: 'Dấu nào đúng: 42 : 7 ... 42 : 6?',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Em tính kết quả của từng phép chia rồi so sánh.'],
      solution: '42 : 7 = 6 và 42 : 6 = 7. Vì 6 < 7 nên 42 : 7 < 42 : 6.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bé hơn 28?',
      options: ['7 × 3', '7 × 4', '7 × 6', '35 : 7', '7 × 1'],
      answers: [0, 3, 4],
      hints: ['Em tính từng phép tính. 28 không bé hơn 28.'],
      solution: '7 × 3 = 21, 35 : 7 = 5 và 7 × 1 = 7 đều bé hơn 28. Còn 7 × 4 = 28 và 7 × 6 = 42.',
    },
    {
      type: 'number',
      prompt: 'Một tuần có 7 ngày. 35 ngày là mấy tuần?',
      answer: 5,
      unit: 'tuần',
      hints: ['Mỗi tuần 7 ngày: em làm phép chia.'],
      solution: '35 : 7 = 5 (tuần).',
    },
  ],
  takeaways: [
    'Bảng nhân 7: đếm thêm 7, từ 7 đến 70.',
    'Bảng chia 7 suy ra từ bảng nhân 7.',
    'Vì 7 × 3 = 21 nên 21 : 7 = 3.',
  ],
};
