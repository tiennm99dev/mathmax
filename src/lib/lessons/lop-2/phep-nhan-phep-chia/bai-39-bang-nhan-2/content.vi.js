/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bảng nhân 2 lớp 2: lập bảng từ phép cộng, đếm thêm 2 trên tia số và vận dụng vào bài toán thực tế.',
  intro:
    'Mỗi đôi đũa có 2 chiếc. Nhiều đôi đũa thì có mấy chiếc? Em lập bảng nhân 2 bằng cách đếm thêm 2 để tính thật nhanh nhé!',
  objectives: [
    'Lập được bảng nhân 2.',
    'Đếm thêm 2 từ 2 đến 20.',
    'Dùng bảng nhân 2 để tính nhẩm và giải bài toán.',
  ],
  sections: [
    {
      heading: 'Lập bảng nhân 2',
      blocks: [
        { type: 'p', text: '2 × 1 = 2.' },
        { type: 'p', text: '2 × 2 = 2 + 2 = 4.' },
        { type: 'p', text: '2 × 3 = 2 + 2 + 2 = 6.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em thấy gì?',
          text: 'Mỗi dòng sau, tích lớn hơn dòng trước 2 đơn vị.',
        },
        {
          type: 'table',
          caption: 'Bảng nhân 2',
          head: ['Từ 1 đến 5', 'Từ 6 đến 10'],
          rows: [
            ['2 × 1 = 2', '2 × 6 = 12'],
            ['2 × 2 = 4', '2 × 7 = 14'],
            ['2 × 3 = 6', '2 × 8 = 16'],
            ['2 × 4 = 8', '2 × 9 = 18'],
            ['2 × 5 = 10', '2 × 10 = 20'],
          ],
        },
      ],
    },
    {
      heading: 'Đếm thêm 2',
      blocks: [
        { type: 'p', text: 'Các tích trong bảng là: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Quên một dòng? Em lấy tích của dòng trước rồi cộng thêm 2.',
        },
      ],
    },
  ],
  explore: {
    title: 'Nhảy trên tia số',
    instruction:
      'Em chạm "Nhảy thêm 2". Mỗi bước nhảy thêm một dòng của bảng nhân 2. Chọn "Đố em" để tự kiểm tra.',
  },
  examples: [
    {
      problem: 'Mỗi đôi đũa có 2 chiếc. 4 đôi đũa có mấy chiếc?',
      steps: [
        'Số 2 được lấy 4 lần.',
        'Em viết phép nhân 2 × 4.',
        'Bảng nhân 2 cho biết 2 × 4 = 8.',
      ],
      answer: '4 đôi đũa có 8 chiếc.',
    },
    {
      problem: 'Biết 2 × 5 = 10. Em tính 2 × 6.',
      steps: ['2 × 6 là dòng ngay sau 2 × 5.', 'Em lấy 10 cộng thêm 2: 10 + 2 = 12.'],
      answer: '2 × 6 = 12.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có 6 tổ, mỗi tổ 2 con gà con. Các chú gà chạy ra sân như hình. Trên sân có mấy con?',
      picture: 'chick',
      answer: 12,
      choices: [10, 11, 12, 13, 14],
      hints: ['Em đếm thêm 2: 2, 4, 6, ...', 'Em đếm 6 lần.'],
      solution: 'Đếm thêm 2 sáu lần được 12. 2 × 6 = 12 (con).',
    },
    {
      type: 'choice',
      prompt: '2 × 7 = ?',
      options: ['9', '12', '14', '16'],
      answer: 2,
      hints: ['Em đếm thêm 2, đếm 7 lần.', '2 × 6 = 12, em cộng thêm 2.'],
      solution: '2 × 7 = 12 + 2 = 14.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với tích của nó.',
      left: ['2 × 3', '2 × 8', '2 × 9'],
      right: ['6', '16', '18', '11'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em đọc lại bảng nhân 2.'],
      solution: '2 × 3 = 6. 2 × 8 = 16. 2 × 9 = 18.',
    },
    {
      type: 'order',
      prompt: 'Đếm thêm 2. Em xếp các số theo thứ tự từ bé đến lớn.',
      items: ['8', '4', '10', '6', '2'],
      answer: [4, 1, 3, 0, 2],
      hints: ['Em bắt đầu từ số 2.', 'Mỗi số sau lớn hơn số trước 2 đơn vị.'],
      solution: 'Đếm thêm 2: 2, 4, 6, 8, 10.',
    },
    {
      type: 'number',
      prompt: 'Đếm thêm 2: 12, 14, ... Số tiếp theo là số nào?',
      answer: 16,
      hints: ['Em lấy số cuối cùng cộng thêm 2.'],
      solution: '14 + 2 = 16.',
    },
    {
      type: 'choice',
      prompt: 'Mỗi con cua có 2 cái càng. 9 con cua có mấy cái càng?',
      options: ['11', '16', '18', '20'],
      answer: 2,
      hints: ['Số 2 được lấy 9 lần. Em viết phép nhân.'],
      solution: '2 × 9 = 18 (cái càng).',
    },
    {
      type: 'choice',
      prompt: 'Phép nhân nào có tích bằng 16?',
      options: ['2 × 6', '2 × 7', '2 × 8', '2 × 9'],
      answer: 2,
      hints: ['Em đếm thêm 2 cho tới khi gặp số 16, vừa đếm vừa nhớ số lần.'],
      solution: '2, 4, 6, 8, 10, 12, 14, 16: đếm 8 lần. Vậy 2 × 8 = 16.',
    },
    {
      type: 'number',
      prompt: 'Em tính 2 × 8, rồi lấy kết quả trừ đi 6. Em được số mấy?',
      answer: 10,
      hints: ['Em tính 2 × 8 trước.', 'Rồi lấy kết quả đó trừ đi 6.'],
      solution: '2 × 8 = 16. 16 − 6 = 10.',
    },
  ],
  takeaways: [
    'Bảng nhân 2 có các tích 2, 4, 6, ... đến 20.',
    'Mỗi dòng sau lớn hơn dòng trước 2 đơn vị: đó là đếm thêm 2.',
    'Số 2 đứng trước dấu nhân, số lần lấy đứng sau.',
  ],
};
