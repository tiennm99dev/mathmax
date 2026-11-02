/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bảng nhân 5 lớp 2: lập bảng từ phép cộng, đếm thêm 5 bằng các bàn tay và vận dụng vào bài toán thực tế.',
  intro:
    'Mỗi bàn tay có 5 ngón. Thêm một bàn tay là thêm 5 ngón. Em cùng xếp bàn tay để lập bảng nhân 5 nhé!',
  objectives: [
    'Lập được bảng nhân 5.',
    'Đếm thêm 5 từ 5 đến 50.',
    'Dùng bảng nhân 5 để tính nhẩm và giải bài toán.',
  ],
  sections: [
    {
      heading: 'Lập bảng nhân 5',
      blocks: [
        { type: 'p', text: '5 × 1 = 5.' },
        { type: 'p', text: '5 × 2 = 5 + 5 = 10.' },
        { type: 'p', text: '5 × 3 = 5 + 5 + 5 = 15.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em thấy gì?',
          text: 'Mỗi dòng sau, tích lớn hơn dòng trước 5 đơn vị.',
        },
        {
          type: 'table',
          caption: 'Bảng nhân 5',
          head: ['Từ 1 đến 5', 'Từ 6 đến 10'],
          rows: [
            ['5 × 1 = 5', '5 × 6 = 30'],
            ['5 × 2 = 10', '5 × 7 = 35'],
            ['5 × 3 = 15', '5 × 8 = 40'],
            ['5 × 4 = 20', '5 × 9 = 45'],
            ['5 × 5 = 25', '5 × 10 = 50'],
          ],
        },
      ],
    },
    {
      heading: 'Đếm thêm 5',
      blocks: [
        { type: 'p', text: 'Các tích trong bảng là: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Các tích của bảng nhân 5 đều có chữ số hàng đơn vị là 5 hoặc 0.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thêm bàn tay',
    instruction:
      'Em chạm "Thêm 1 bàn tay". Mỗi bàn tay thêm 5 ngón và thêm một dòng của bảng nhân 5. Chọn "Đố em" để tự kiểm tra.',
  },
  examples: [
    {
      problem: 'Mỗi bàn tay có 5 ngón. 4 bàn tay có mấy ngón?',
      steps: [
        'Số 5 được lấy 4 lần.',
        'Em viết phép nhân 5 × 4.',
        'Bảng nhân 5 cho biết 5 × 4 = 20.',
      ],
      answer: '4 bàn tay có 20 ngón.',
    },
    {
      problem: 'Biết 5 × 6 = 30. Em tính 5 × 7.',
      steps: ['5 × 7 là dòng ngay sau 5 × 6.', 'Em lấy 30 cộng thêm 5: 30 + 5 = 35.'],
      answer: '5 × 7 = 35.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có 3 khay, mỗi khay 5 quả cam. Cô đổ chung vào rổ như hình. Rổ có mấy quả cam?',
      picture: 'orange',
      answer: 15,
      choices: [10, 12, 15, 18, 20],
      hints: ['Em đếm thêm 5: 5, 10, ...'],
      solution: 'Đếm thêm 5 ba lần được 15. 5 × 3 = 15 (quả cam).',
    },
    {
      type: 'choice',
      prompt: '5 × 8 = ?',
      options: ['13', '35', '40', '45'],
      answer: 2,
      hints: ['Em đếm thêm 5, đếm 8 lần.', '5 × 7 = 35, em cộng thêm 5.'],
      solution: '5 × 8 = 35 + 5 = 40.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với tích của nó.',
      left: ['5 × 2', '5 × 6', '5 × 9'],
      right: ['10', '30', '45', '25'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em đọc lại bảng nhân 5.'],
      solution: '5 × 2 = 10. 5 × 6 = 30. 5 × 9 = 45.',
    },
    {
      type: 'order',
      prompt: 'Đếm thêm 5. Em xếp các số theo thứ tự từ bé đến lớn.',
      items: ['20', '5', '15', '25', '10'],
      answer: [1, 4, 2, 0, 3],
      hints: ['Em bắt đầu từ số 5.', 'Mỗi số sau lớn hơn số trước 5 đơn vị.'],
      solution: 'Đếm thêm 5: 5, 10, 15, 20, 25.',
    },
    {
      type: 'number',
      prompt: 'Đếm thêm 5: 30, 35, ... Số tiếp theo là số nào?',
      answer: 40,
      hints: ['Em lấy số cuối cùng cộng thêm 5.'],
      solution: '35 + 5 = 40.',
    },
    {
      type: 'choice',
      prompt: 'Mỗi bó có 5 cây bút chì. 7 bó có mấy cây bút chì?',
      options: ['12', '30', '35', '40'],
      answer: 2,
      hints: ['Số 5 được lấy 7 lần. Em viết phép nhân.'],
      solution: '5 × 7 = 35 (cây bút chì).',
    },
    {
      type: 'choice',
      prompt: 'Phép nhân nào có tích lớn nhất?',
      options: ['5 × 3', '5 × 4', '2 × 9', '2 × 6'],
      answer: 1,
      hints: ['Em tính tích của từng phép nhân rồi so sánh.'],
      solution: '5 × 3 = 15, 5 × 4 = 20, 2 × 9 = 18, 2 × 6 = 12. Lớn nhất là 20.',
    },
    {
      type: 'number',
      prompt: 'Em tính 5 × 9, rồi lấy kết quả trừ đi 5. Em được số mấy?',
      answer: 40,
      hints: ['Em tính 5 × 9 trước.', 'Rồi lấy kết quả đó trừ đi 5.'],
      solution: '5 × 9 = 45. 45 − 5 = 40.',
    },
    {
      type: 'choice',
      prompt: 'Số nào là một tích trong bảng nhân 5?',
      options: ['21', '32', '45', '48'],
      answer: 2,
      hints: ['Em đếm thêm 5 xem có gặp số đó không.', 'Các tích kết thúc bằng 5 hoặc 0.'],
      solution: '45 có trong bảng vì 5 × 9 = 45. Các số còn lại không kết thúc bằng 5 hoặc 0.',
    },
  ],
  takeaways: [
    'Bảng nhân 5 có các tích 5, 10, 15, ... đến 50.',
    'Mỗi dòng sau lớn hơn dòng trước 5 đơn vị: đó là đếm thêm 5.',
    'Mỗi tích của bảng nhân 5 đều có chữ số hàng đơn vị là 5 hoặc 0.',
  ],
};
