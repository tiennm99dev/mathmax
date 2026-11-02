/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập bảng nhân 2, bảng nhân 5, bảng chia 2, bảng chia 5 và mối liên hệ giữa phép nhân với phép chia, kèm bài toán thực tế.',
  intro:
    'Em còn nhớ bảng nhân 2 và bảng nhân 5 không? Em xếp các chấm thành hàng để thấy phép nhân, rồi khoanh từng hàng để ra phép chia nhé!',
  objectives: [
    'Thuộc bảng nhân 2, bảng nhân 5.',
    'Thuộc bảng chia 2, bảng chia 5.',
    'Từ một phép nhân, viết được hai phép chia.',
    'Giải bài toán có phép nhân, phép chia.',
  ],
  sections: [
    {
      heading: 'Bảng nhân 2, bảng nhân 5',
      blocks: [
        {
          type: 'p',
          text: 'Phép nhân 5 × 3 nghĩa là 5 được lấy 3 lần: 5 × 3 = 5 + 5 + 5 = 15.',
        },
        {
          type: 'table',
          head: ['Bảng nhân 2', 'Bảng nhân 5'],
          rows: [
            ['2 × 1 = 2', '5 × 1 = 5'],
            ['2 × 2 = 4', '5 × 2 = 10'],
            ['2 × 3 = 6', '5 × 3 = 15'],
            ['2 × 4 = 8', '5 × 4 = 20'],
            ['2 × 5 = 10', '5 × 5 = 25'],
            ['2 × 6 = 12', '5 × 6 = 30'],
            ['2 × 7 = 14', '5 × 7 = 35'],
            ['2 × 8 = 16', '5 × 8 = 40'],
            ['2 × 9 = 18', '5 × 9 = 45'],
            ['2 × 10 = 20', '5 × 10 = 50'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đếm thêm',
          text: 'Bảng nhân 2: đếm thêm 2. Bảng nhân 5: đếm thêm 5.',
        },
      ],
    },
    {
      heading: 'Bảng chia 2, bảng chia 5',
      blocks: [
        {
          type: 'table',
          head: ['Bảng chia 2', 'Bảng chia 5'],
          rows: [
            ['2 : 2 = 1', '5 : 5 = 1'],
            ['4 : 2 = 2', '10 : 5 = 2'],
            ['6 : 2 = 3', '15 : 5 = 3'],
            ['8 : 2 = 4', '20 : 5 = 4'],
            ['10 : 2 = 5', '25 : 5 = 5'],
            ['12 : 2 = 6', '30 : 5 = 6'],
            ['14 : 2 = 7', '35 : 5 = 7'],
            ['16 : 2 = 8', '40 : 5 = 8'],
            ['18 : 2 = 9', '45 : 5 = 9'],
            ['20 : 2 = 10', '50 : 5 = 10'],
          ],
        },
      ],
    },
    {
      heading: 'Liên hệ phép nhân và phép chia',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Từ một phép nhân, em viết được hai phép chia. Lấy tích chia cho thừa số này, được thừa số kia.',
        },
        {
          type: 'p',
          text: '5 × 3 = 15, nên 15 : 5 = 3 và 15 : 3 = 5.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lưới chấm hàng và cột',
    instruction:
      'Với "Phép nhân", em thêm hoặc bớt từng hàng chấm. Với "Phép chia", em khoanh từng hàng để biết có mấy hàng. Chọn "Đố em" để làm bài ôn tập.',
  },
  examples: [
    {
      problem: 'Mỗi lọ cắm 2 bông hoa. 6 lọ có bao nhiêu bông hoa?',
      steps: ['2 được lấy 6 lần.', '2 × 6 = 12.'],
      answer: '6 lọ có 12 bông hoa.',
    },
    {
      problem: 'Cắm 50 bông hoa vào các lọ, mỗi lọ 5 bông. Cắm được mấy lọ?',
      steps: ['Chia 50 bông thành các nhóm 5 bông.', '50 : 5 = 10.'],
      answer: 'Cắm được 10 lọ.',
    },
    {
      problem: 'Điền dấu: 5 × 3 ? 40 : 5.',
      steps: ['5 × 3 = 15.', '40 : 5 = 8.', '15 lớn hơn 8.'],
      answer: '5 × 3 > 40 : 5.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy cái bút chì? Em đếm thêm 2: 2, 4, 6, ...',
      picture: 'pencil',
      answer: 12,
      choices: [10, 11, 12, 13, 14],
      hints: ['Em đếm từng đôi: 2, 4, 6, 8, ...'],
      solution: '2, 4, 6, 8, 10, 12. Có 12 cái bút chì. 2 × 6 = 12.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['5 × 9', '15 : 5', '10 : 2', '5 × 7'],
      right: ['35', '3', '45', '5'],
      pairs: [
        [0, 2],
        [1, 1],
        [2, 3],
        [3, 0],
      ],
      hints: ['Em đọc lại bảng nhân 5, bảng chia 5, bảng chia 2.'],
      solution: '5 × 9 = 45. 15 : 5 = 3. 10 : 2 = 5. 5 × 7 = 35.',
    },
    {
      type: 'number',
      prompt: '2 × 7 = ?',
      answer: 14,
      hints: ['Em đếm thêm 2, đếm 7 lần.'],
      solution: '2 × 7 = 14.',
    },
    {
      type: 'number',
      prompt: '45 : 5 = ?',
      answer: 9,
      hints: ['5 nhân với mấy thì bằng 45?'],
      solution: 'Vì 5 × 9 = 45 nên 45 : 5 = 9.',
    },
    {
      type: 'number',
      prompt: '18 : 2 = ?',
      answer: 9,
      hints: ['2 nhân với mấy thì bằng 18?'],
      solution: 'Vì 2 × 9 = 18 nên 18 : 2 = 9.',
    },
    {
      type: 'multi',
      prompt: 'Biết 5 × 4 = 20. Những phép chia nào đúng?',
      options: ['20 : 5 = 4', '20 : 4 = 5', '20 : 5 = 5', '4 : 20 = 5'],
      answers: [0, 1],
      hints: ['Lấy tích chia cho một thừa số, được thừa số kia.'],
      solution: '5 × 4 = 20 nên 20 : 5 = 4 và 20 : 4 = 5.',
    },
    {
      type: 'choice',
      prompt: 'Điền dấu: 45 : 5 ? 2 × 6',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em tính kết quả từng bên, rồi so sánh.'],
      solution: '45 : 5 = 9 và 2 × 6 = 12. 9 bé hơn 12, nên 45 : 5 < 2 × 6.',
    },
    {
      type: 'choice',
      prompt: 'Điền dấu: 50 : 5 ? 5 × 2',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Em tính kết quả từng bên, rồi so sánh.'],
      solution: '50 : 5 = 10 và 5 × 2 = 10. Hai bên bằng nhau.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự đếm thêm 5.',
      items: ['25', '10', '20', '5', '15'],
      answer: [3, 1, 4, 2, 0],
      hints: ['Bắt đầu từ số bé nhất, mỗi lần thêm 5.'],
      solution: '5, 10, 15, 20, 25.',
    },
    {
      type: 'number',
      prompt: 'Mỗi túi có 5 quả cam. 8 túi có bao nhiêu quả cam?',
      answer: 40,
      unit: 'quả',
      hints: ['5 được lấy 8 lần.'],
      solution: '5 × 8 = 40 (quả).',
    },
    {
      type: 'number',
      prompt: 'Chia đều 16 cái bánh cho 2 bạn. Mỗi bạn được mấy cái bánh?',
      answer: 8,
      unit: 'cái',
      hints: ['Chia đều: em làm phép chia.'],
      solution: '16 : 2 = 8 (cái).',
    },
    {
      type: 'choice',
      prompt: 'Có 20 cái kẹo, chia vào các túi, mỗi túi 5 cái. Chia được mấy túi?',
      options: ['4 túi', '5 túi', '15 túi', '25 túi'],
      answer: 0,
      hints: ['Em tính 20 : 5.'],
      solution: '20 : 5 = 4 (túi).',
    },
  ],
  takeaways: [
    'Đọc lại bảng nhân 2, bảng nhân 5 thật thuộc.',
    'Muốn chia, em nghĩ đến phép nhân: 15 : 5 = 3 vì 5 × 3 = 15.',
    'Từ một phép nhân viết được hai phép chia.',
  ],
};
