/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thừa số và tích lớp 2: gọi tên các số trong phép nhân, tính tích khi biết hai thừa số và thấy đổi chỗ thừa số thì tích không đổi.',
  intro:
    'Trong phép nhân, mỗi số đều có tên riêng. Em cùng tìm xem số nào là thừa số, số nào là tích nhé!',
  objectives: [
    'Gọi đúng tên thừa số và tích trong phép nhân.',
    'Tính tích khi biết hai thừa số.',
    'Thấy rằng đổi chỗ hai thừa số thì tích không đổi.',
  ],
  sections: [
    {
      heading: 'Thừa số và tích',
      blocks: [
        { type: 'p', text: 'Em nhìn phép nhân 2 × 5 = 10.' },
        { type: 'p', text: 'Số 2 và số 5 là thừa số. Số 10 là tích.' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tên gọi',
          text: 'Các số đem nhân với nhau gọi là thừa số. Kết quả của phép nhân gọi là tích.',
        },
        {
          type: 'table',
          head: ['Phép nhân', 'Thừa số', 'Thừa số', 'Tích'],
          rows: [
            ['2 × 5 = 10', '2', '5', '10'],
            ['3 × 2 = 6', '3', '2', '6'],
            ['4 × 4 = 16', '4', '4', '16'],
          ],
        },
      ],
    },
    {
      heading: 'Tính tích khi biết hai thừa số',
      blocks: [
        { type: 'p', text: 'Hai thừa số là 3 và 2. Em viết phép nhân 3 × 2.' },
        { type: 'p', text: 'Em tính: 3 + 3 = 6. Vậy tích là 6.' },
      ],
    },
    {
      heading: 'Đổi chỗ hai thừa số',
      blocks: [
        { type: 'p', text: '2 hàng, mỗi hàng 3 chấm: 3 × 2 = 6.' },
        { type: 'p', text: '3 hàng, mỗi hàng 2 chấm: 2 × 3 = 6.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em thấy gì?',
          text: 'Khi đổi chỗ hai thừa số, tích không thay đổi: 3 × 2 = 2 × 3.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lưới chấm hàng và cột',
    instruction:
      'Em chạm dấu + và dấu − để đổi số chấm mỗi hàng và số hàng, rồi xem tên thừa số và tích thay đổi. Chọn "Đố em" để chạm đúng số là tích hay thừa số.',
  },
  examples: [
    {
      problem: 'Trong phép nhân 4 × 2 = 8, số nào là thừa số, số nào là tích?',
      steps: ['Hai số đứng hai bên dấu nhân là 4 và 2.', 'Kết quả đứng sau dấu bằng là 8.'],
      answer: '4 và 2 là thừa số. 8 là tích.',
    },
    {
      problem: 'Hai thừa số là 5 và 2. Tính tích.',
      steps: ['Em viết phép nhân: 5 × 2.', 'Em cộng: 5 + 5 = 10.'],
      answer: '5 × 2 = 10. Tích là 10.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong phép nhân 5 × 4 = 20, số nào là tích?',
      options: ['5', '4', '20'],
      answer: 2,
      hints: ['Tích là kết quả của phép nhân.'],
      solution: '20 là kết quả nên 20 là tích. Số 5 và số 4 là thừa số.',
    },
    {
      type: 'choice',
      prompt: 'Trong phép nhân 3 × 6 = 18, hai thừa số là hai số nào?',
      options: ['3 và 6', '6 và 18', '3 và 18'],
      answer: 0,
      hints: ['Thừa số là các số đem nhân với nhau, đứng hai bên dấu nhân.'],
      solution: 'Hai thừa số là 3 và 6. Số 18 là tích.',
    },
    {
      type: 'match',
      prompt: 'Nối hai thừa số với tích của chúng.',
      left: ['2 và 6', '3 và 3', '5 và 3'],
      right: ['8', '9', '12', '15'],
      pairs: [
        [0, 2],
        [1, 1],
        [2, 3],
      ],
      hints: ['Em viết phép nhân từ hai thừa số rồi tính.', 'Ví dụ 2 và 6 thì tính 2 × 6.'],
      solution: '2 × 6 = 12. 3 × 3 = 9. 5 × 3 = 15.',
    },
    {
      type: 'number',
      prompt: 'Hai thừa số là 4 và 5. Tích bằng bao nhiêu?',
      answer: 20,
      hints: ['Em viết phép nhân 4 × 5.', 'Em cộng 4 + 4 + 4 + 4 + 4.'],
      solution: '4 × 5 = 4 + 4 + 4 + 4 + 4 = 20.',
    },
    {
      type: 'choice',
      prompt: 'Có 2 hàng ghế, mỗi hàng 4 chiếc. Phép nhân nào đúng?',
      options: ['4 × 2 = 8, tích là 8', '4 × 2 = 6, tích là 6', '2 × 2 = 4, tích là 4'],
      answer: 0,
      hints: ['Số 4 được lấy mấy lần?', 'Em cộng 4 + 4.'],
      solution: 'Số 4 được lấy 2 lần: 4 × 2 = 8. Tích là 8.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 4 × 5 ... 5 × 4',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Hai phép nhân này có thừa số giống nhau, chỉ đổi chỗ.'],
      solution: 'Đổi chỗ hai thừa số thì tích không đổi. Cả hai phép nhân đều bằng 20.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 2 × 4 ... 7',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em tính tích của 2 × 4 trước.', 'Rồi so sánh tích đó với 7.'],
      solution: '2 × 4 = 8. Vì 8 > 7 nên 2 × 4 > 7.',
    },
    {
      type: 'count',
      prompt: 'Có 4 lọ hoa, mỗi lọ 2 bông. Cô gộp hết như hình. Tích của 2 × 4 là mấy?',
      picture: 'flower',
      answer: 8,
      choices: [6, 7, 8, 9, 10],
      hints: ['Em đếm tất cả số bông hoa trong hình.'],
      solution: 'Đếm được 8 bông hoa. 2 × 4 = 8, nên tích là 8.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép nhân theo tích từ bé đến lớn.',
      items: ['5 × 3', '2 × 4', '3 × 4'],
      answer: [1, 2, 0],
      hints: ['Em tính tích của từng phép nhân trước.'],
      solution: '2 × 4 = 8, 3 × 4 = 12, 5 × 3 = 15. Thứ tự: 2 × 4, 3 × 4, 5 × 3.',
    },
  ],
  takeaways: [
    'Các số đem nhân với nhau gọi là thừa số.',
    'Kết quả của phép nhân gọi là tích.',
    'Đổi chỗ hai thừa số thì tích không đổi.',
  ],
};
