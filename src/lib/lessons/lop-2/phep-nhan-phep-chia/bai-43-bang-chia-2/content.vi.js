/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bảng chia 2 lớp 2: lập bảng chia 2 từ bảng nhân 2, tính nhẩm và giải bài toán chia đều, chia nhóm.',
  intro:
    'Mỗi đôi đũa có 2 chiếc. Có 12 chiếc đũa thì được mấy đôi? Em lập bảng chia 2 từ bảng nhân 2 để tính thật nhanh nhé!',
  objectives: [
    'Lập được bảng chia 2 từ bảng nhân 2.',
    'Tính nhẩm trong bảng chia 2.',
    'Dùng bảng chia 2 để giải bài toán.',
  ],
  sections: [
    {
      heading: 'Từ bảng nhân 2 đến bảng chia 2',
      blocks: [
        { type: 'p', text: 'Mỗi tấm bìa có 2 chấm tròn. 4 tấm bìa có 8 chấm tròn: 2 × 4 = 8.' },
        { type: 'p', text: 'Có 8 chấm tròn, mỗi tấm bìa 2 chấm. Có 4 tấm bìa: 8 : 2 = 4.' },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ghi nhớ',
          text: 'Từ 2 × 4 = 8, em có 8 : 2 = 4.',
        },
      ],
    },
    {
      heading: 'Bảng chia 2',
      blocks: [
        {
          type: 'table',
          caption: 'Bảng chia 2',
          head: ['Từ 1 đến 5', 'Từ 6 đến 10'],
          rows: [
            ['2 : 2 = 1', '12 : 2 = 6'],
            ['4 : 2 = 2', '14 : 2 = 7'],
            ['6 : 2 = 3', '16 : 2 = 8'],
            ['8 : 2 = 4', '18 : 2 = 9'],
            ['10 : 2 = 5', '20 : 2 = 10'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Quên một dòng? Em nhớ lại bảng nhân 2: 2 nhân với số nào thì bằng số bị chia?',
        },
      ],
    },
  ],
  explore: {
    title: 'Lật thẻ bảng nhân 2',
    instruction:
      'Em chạm vào một thẻ của bảng nhân 2. Mặt sau là phép chia đi cùng phép nhân đó. Chọn "Đố em" để tự kiểm tra.',
  },
  examples: [
    {
      problem: 'Đàn gà có 20 cái chân. Đàn gà có mấy con?',
      steps: [
        'Mỗi con gà có 2 chân.',
        'Em viết phép chia 20 : 2.',
        'Vì 2 × 10 = 20 nên 20 : 2 = 10.',
      ],
      answer: 'Đàn gà có 10 con.',
    },
    {
      problem: 'Mai xếp 12 chiếc đũa thành từng đôi, mỗi người một đôi. Đủ cho mấy người?',
      steps: ['Mỗi đôi có 2 chiếc.', 'Em viết phép chia 12 : 2.', 'Vì 2 × 6 = 12 nên 12 : 2 = 6.'],
      answer: 'Đủ cho 6 người.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Em đếm số quả cam trong hình để chia đều cho 2 bạn.',
      picture: 'orange',
      answer: 8,
      choices: [6, 7, 8, 9, 10],
      hints: ['Em đếm từng quả, đếm một lần thôi.', 'Hoặc em đếm thêm 2.'],
      solution: 'Có 8 quả cam. 8 : 2 = 4, mỗi bạn được 4 quả.',
    },
    {
      type: 'choice',
      prompt: '14 : 2 = ?',
      options: ['6', '7', '12', '16'],
      answer: 1,
      hints: ['2 nhân với số nào thì bằng 14?'],
      solution: '2 × 7 = 14, nên 14 : 2 = 7.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với phép chia đi cùng nó.',
      left: ['2 × 3 = 6', '2 × 8 = 16', '2 × 5 = 10'],
      right: ['6 : 2 = 3', '16 : 2 = 8', '10 : 2 = 5', '8 : 2 = 4'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Tích của phép nhân là số bị chia của phép chia.'],
      solution:
        '2 × 3 = 6 đi cùng 6 : 2 = 3. 2 × 8 = 16 đi cùng 16 : 2 = 8. 2 × 5 = 10 đi cùng 10 : 2 = 5.',
    },
    {
      type: 'number',
      prompt: '18 : 2 = ?',
      answer: 9,
      hints: ['Em nhớ lại bảng nhân 2.', '2 nhân với số nào thì bằng 18?'],
      solution: '2 × 9 = 18, nên 18 : 2 = 9.',
    },
    {
      type: 'number',
      prompt: 'Em tính 16 : 2, rồi lấy kết quả chia tiếp cho 2. Em được số mấy?',
      answer: 4,
      hints: ['Em tính 16 : 2 trước.', 'Rồi lấy kết quả đó chia cho 2.'],
      solution: '16 : 2 = 8. 8 : 2 = 4.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các phép chia theo thứ tự trong bảng chia 2.',
      items: ['6 : 2', '10 : 2', '2 : 2', '8 : 2', '4 : 2'],
      answer: [2, 4, 0, 3, 1],
      hints: ['Số bị chia tăng dần.', 'Em bắt đầu từ 2 : 2.'],
      solution: '2 : 2, 4 : 2, 6 : 2, 8 : 2, 10 : 2.',
    },
    {
      type: 'choice',
      prompt: 'Đàn gà có 16 cái chân. Đàn gà có mấy con?',
      options: ['8', '14', '18', '32'],
      answer: 0,
      hints: ['Mỗi con gà có 2 chân. Em viết phép chia.'],
      solution: '16 : 2 = 8 (con).',
    },
    {
      type: 'choice',
      prompt: 'Có 20 quả vải, bà chia đều cho 2 cháu. Mỗi cháu được mấy quả?',
      options: ['10', '18', '22', '40'],
      answer: 0,
      hints: ['Chia đều cho 2 cháu thì em chia cho 2.'],
      solution: '20 : 2 = 10 (quả).',
    },
    {
      type: 'choice',
      prompt: 'Phép chia nào có thương bằng 5?',
      options: ['10 : 2', '12 : 2', '4 : 2', '8 : 2'],
      answer: 0,
      hints: ['Em tính từng phép chia.', '2 nhân với 5 bằng bao nhiêu?'],
      solution: '10 : 2 = 5. Còn 12 : 2 = 6, 4 : 2 = 2, 8 : 2 = 4.',
    },
  ],
  takeaways: [
    'Bảng chia 2 lập từ bảng nhân 2: 2 × 4 = 8 cho 8 : 2 = 4.',
    'Số bị chia là 2, 4, 6, ... đến 20. Thương là 1, 2, 3, ... đến 10.',
    'Chia đều cho 2 hay chia thành từng nhóm 2 đều dùng bảng chia 2.',
  ],
};
