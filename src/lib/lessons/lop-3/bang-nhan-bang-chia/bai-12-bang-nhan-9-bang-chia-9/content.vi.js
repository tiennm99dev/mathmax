/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lập bảng nhân 9 bằng cách đếm thêm 9, nhận ra quy luật tổng hai chữ số bằng 9, suy ra bảng chia 9 và vận dụng vào bài toán thực tế.',
  intro:
    'Hai đội múa rồng, mỗi đội có 9 người. Hai đội có bao nhiêu người? Em lập bảng nhân 9 và tô màu các chữ số. Em sẽ thấy một quy luật rất thú vị!',
  objectives: [
    'Lập và thuộc bảng nhân 9.',
    'Nhận ra quy luật của các kết quả trong bảng nhân 9.',
    'Từ bảng nhân 9, lập và thuộc bảng chia 9.',
    'Vận dụng bảng nhân 9, bảng chia 9 để giải bài toán.',
  ],
  sections: [
    {
      heading: 'Bảng nhân 9',
      blocks: [
        {
          type: 'p',
          text: 'Hai đội múa rồng, mỗi đội 9 người. 9 được lấy 2 lần: 9 × 2 = 9 + 9 = 18.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đếm thêm',
          text: 'Mỗi dòng của bảng nhân 9 hơn dòng trên 9 đơn vị: 9, 18, 27, 36, 45, 54, 63, 72, 81, 90.',
        },
        {
          type: 'table',
          head: ['Bảng nhân 9'],
          rows: [
            ['9 × 1 = 9'],
            ['9 × 2 = 18'],
            ['9 × 3 = 27'],
            ['9 × 4 = 36'],
            ['9 × 5 = 45'],
            ['9 × 6 = 54'],
            ['9 × 7 = 63'],
            ['9 × 8 = 72'],
            ['9 × 9 = 81'],
            ['9 × 10 = 90'],
          ],
        },
      ],
    },
    {
      heading: 'Quy luật của bảng nhân 9',
      blocks: [
        {
          type: 'p',
          text: 'Đi xuống từng dòng, chữ số hàng chục thêm 1, chữ số hàng đơn vị bớt 1: 18, 27, 36, 45.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em quan sát',
          text: 'Cộng hai chữ số của mỗi kết quả, em luôn được 9. Ví dụ: 2 + 7 = 9, 3 + 6 = 9, 8 + 1 = 9. Với số 9, em coi là 0 + 9 = 9.',
        },
      ],
    },
    {
      heading: 'Bảng chia 9',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi đội có 9 người, 2 đội có 18 người: 9 × 2 = 18. Có 18 người, mỗi đội 9 người thì được 2 đội: 18 : 9 = 2.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Từ bảng nhân 9, em có bảng chia 9. Vì 9 × 2 = 18 nên 18 : 9 = 2.',
        },
        {
          type: 'table',
          head: ['Bảng chia 9'],
          rows: [
            ['9 : 9 = 1'],
            ['18 : 9 = 2'],
            ['27 : 9 = 3'],
            ['36 : 9 = 4'],
            ['45 : 9 = 5'],
            ['54 : 9 = 6'],
            ['63 : 9 = 7'],
            ['72 : 9 = 8'],
            ['81 : 9 = 9'],
            ['90 : 9 = 10'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Tô màu chữ số của bảng 9',
    instruction:
      'Chọn "Bảng nhân 9" và thêm từng dòng. Chữ số hàng chục tô xanh, chữ số hàng đơn vị tô cam, và thanh màu luôn đủ 9 ô. Chạm một dòng để đọc. Chọn "Bảng chia 9" để khoanh từng hàng 9 chấm. Chọn "Đố em" để luyện tập.',
  },
  examples: [
    {
      problem: 'Mỗi thuyền có 9 người. 5 thuyền có bao nhiêu người?',
      steps: ['9 được lấy 5 lần.', '9 × 5 = 45.'],
      answer: '5 thuyền có 45 người.',
    },
    {
      problem: 'Chia đều 45 lít nước mắm vào 9 can. Mỗi can có bao nhiêu lít nước mắm?',
      steps: ['Chia đều nên em làm phép chia.', '45 : 9 = 5.'],
      answer: 'Mỗi can có 5 lít nước mắm.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy quả cam? Em đếm thêm 9: 9, 18, ...',
      picture: 'orange',
      answer: 27,
      groups: 3,
      choices: [18, 24, 27, 30, 36],
      hints: ['Em đếm lần lượt từng quả. Cứ đủ 9 quả, em đọc một số: 9, 18, ...'],
      solution: '9, 18, 27. Có 27 quả cam. 9 × 3 = 27.',
    },
    {
      type: 'match',
      prompt: 'Nối hai phép tính có cùng kết quả.',
      left: ['9 × 2', '45 : 9', '9 × 1', '54 : 9'],
      right: ['18 : 2', '2 × 3', '3 × 6', '20 : 4'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Em tính kết quả của từng phép tính.'],
      solution:
        '9 × 2 = 18 và 3 × 6 = 18. 45 : 9 = 5 và 20 : 4 = 5. 9 × 1 = 9 và 18 : 2 = 9. 54 : 9 = 6 và 2 × 3 = 6.',
    },
    {
      type: 'number',
      prompt: '9 × 7 = ?',
      answer: 63,
      hints: ['9 × 6 = 54. Em cộng thêm 9.'],
      solution: '9 × 6 = 54, 54 + 9 = 63. Vậy 9 × 7 = 63.',
    },
    {
      type: 'number',
      prompt: '72 : 9 = ?',
      answer: 8,
      hints: ['9 nhân với mấy thì bằng 72?'],
      solution: 'Vì 9 × 8 = 72 nên 72 : 9 = 8.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự đếm thêm 9.',
      items: ['36', '18', '45', '9', '27'],
      answer: [3, 1, 4, 0, 2],
      hints: ['Bắt đầu từ số bé nhất, mỗi lần thêm 9.'],
      solution: '9, 18, 27, 36, 45.',
    },
    {
      type: 'number',
      prompt: 'Số còn thiếu trong dãy: 90, 81, 72, ?, 54.',
      answer: 63,
      hints: ['Mỗi số kém số trước 9 đơn vị.'],
      solution: '72 − 9 = 63. Dãy là 90, 81, 72, 63, 54.',
    },
    {
      type: 'choice',
      prompt: 'Số nào có trong bảng nhân 9?',
      options: ['46', '54', '55', '64'],
      answer: 1,
      hints: ['Em cộng hai chữ số của mỗi số. Tổng phải bằng 9.'],
      solution: '5 + 4 = 9 và 9 × 6 = 54.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả lớn hơn 10?',
      options: ['54 : 9', '9 × 5', '9 × 2', '45 : 9', '90 : 9'],
      answers: [1, 2],
      hints: ['Em tính từng phép tính. 10 không lớn hơn 10.'],
      solution:
        '9 × 5 = 45 và 9 × 2 = 18 đều lớn hơn 10. Còn 54 : 9 = 6, 45 : 9 = 5 và 90 : 9 = 10.',
    },
    {
      type: 'number',
      prompt: 'Có 4 túi cam, mỗi túi có 9 quả. Có tất cả bao nhiêu quả cam?',
      answer: 36,
      unit: 'quả',
      hints: ['9 được lấy 4 lần.'],
      solution: '9 × 4 = 36 (quả).',
    },
    {
      type: 'number',
      prompt: 'Chia đều 63 lít nước mắm vào 9 can. Mỗi can có mấy lít?',
      answer: 7,
      unit: 'lít',
      hints: ['Chia đều: em làm phép chia.'],
      solution: '63 : 9 = 7 (lít).',
    },
  ],
  takeaways: [
    'Bảng nhân 9: đếm thêm 9, từ 9 đến 90.',
    'Hai chữ số của mỗi kết quả cộng lại bằng 9.',
    'Vì 9 × 2 = 18 nên 18 : 9 = 2.',
  ],
};
