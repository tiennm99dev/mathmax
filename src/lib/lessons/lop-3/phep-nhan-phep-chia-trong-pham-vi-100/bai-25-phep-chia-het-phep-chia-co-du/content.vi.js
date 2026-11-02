/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết phép chia hết và phép chia có dư; số dư luôn bé hơn số chia; viết phép chia có dư như 9 : 2 = 4 (dư 1).',
  intro:
    'Chia 8 cái kẹo vào các túi, mỗi túi 2 cái thì hết kẹo. Nếu có 9 cái thì sao? Em chia thử để xem nhé!',
  objectives: [
    'Nhận biết phép chia hết và phép chia có dư.',
    'Biết số dư bé hơn số chia.',
    'Tính và viết kết quả phép chia có dư.',
  ],
  sections: [
    {
      heading: 'Phép chia hết',
      blocks: [
        {
          type: 'p',
          text: 'Có 8 cái kẹo. Mỗi túi 2 cái. Em được 4 túi và không còn thừa cái nào.',
        },
        { type: 'p', text: 'Em viết: 8 : 2 = 4.' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép chia hết',
          text: '8 : 2 = 4 là phép chia hết. Phép chia hết có số dư bằng 0.',
        },
      ],
    },
    {
      heading: 'Phép chia có dư',
      blocks: [
        { type: 'p', text: 'Có 9 cái kẹo. Mỗi túi 2 cái. Em được 4 túi và còn thừa 1 cái.' },
        { type: 'p', text: 'Em viết: 9 : 2 = 4 (dư 1). Em đọc: chín chia hai bằng bốn, dư một.' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép chia có dư',
          text: '9 : 2 = 4 (dư 1) là phép chia có dư. Số 1 là số dư.',
        },
      ],
    },
    {
      heading: 'Số dư bé hơn số chia',
      blocks: [
        { type: 'p', text: 'Nếu còn thừa 2 cái kẹo, em vẫn đóng được một túi nữa.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trong phép chia có dư, số dư bé hơn số chia.',
        },
        {
          type: 'table',
          head: ['Phép chia', 'Thương', 'Số dư'],
          caption: 'Chia cho 3, số dư chỉ có thể là 0, 1 hoặc 2.',
          rows: [
            ['12 : 3', '4', '0'],
            ['13 : 3', '4', '1'],
            ['14 : 3', '4', '2'],
            ['15 : 3', '5', '0'],
          ],
        },
      ],
    },
    {
      heading: 'Đặt tính',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết 9, kẻ vạch, viết 2 bên phải.',
            '9 chia 2 được 4, viết 4 dưới số 2.',
            '4 nhân 2 bằng 8. Viết 8 dưới số 9.',
            '9 trừ 8 bằng 1. Số 1 là số dư.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Chia kẹo vào túi',
    instruction:
      'Em bấm "Đóng một túi" để cho kẹo vào túi. Khi nghĩ đã xong, em bấm "Xong". Phần kẹo thừa là số dư. Em thử dừng sớm xem sao nhé!',
  },
  examples: [
    {
      problem: 'Tính: 17 : 2.',
      steps: [
        'Em nhẩm: 2 × 8 = 16, gần 17 nhất và không quá 17.',
        '17 − 16 = 1. Số dư là 1, bé hơn 2.',
      ],
      answer: '17 : 2 = 8 (dư 1).',
    },
    {
      problem: 'Rô-bốt chia 56 con cá vào các rổ, mỗi rổ 8 con. Rô-bốt chia được bao nhiêu rổ?',
      steps: ['Em tính 56 : 8.', 'Vì 8 × 7 = 56 nên 56 : 8 = 7. Không còn thừa con nào.'],
      answer: 'Rô-bốt chia được 7 rổ cá. Đây là phép chia hết.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính 19 : 5. Số dư là bao nhiêu?',
      answer: 4,
      hints: ['Em nhẩm: 5 nhân mấy thì gần 19 nhất mà không quá 19?', 'Lấy 19 trừ đi tích đó.'],
      solution: '5 × 3 = 15. 19 − 15 = 4. Vậy 19 : 5 = 3 (dư 4).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với số dư của nó.',
      left: ['41 : 6', '16 : 6', '17 : 2', '14 : 4'],
      right: ['Dư 5', 'Dư 4', 'Dư 1', 'Dư 2'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tìm tích gần nhất mà không quá số bị chia, rồi trừ.'],
      solution: '41 : 6 = 6 (dư 5). 16 : 6 = 2 (dư 4). 17 : 2 = 8 (dư 1). 14 : 4 = 3 (dư 2).',
    },
    {
      type: 'choice',
      prompt: 'Phép chia nào là phép chia hết?',
      options: ['18 : 3', '17 : 3', '20 : 3', '16 : 3'],
      answer: 0,
      hints: ['Phép chia hết không có số dư.', 'Em nhớ lại bảng chia 3.'],
      solution: '18 : 3 = 6, không dư. Các phép chia còn lại đều có dư.',
    },
    {
      type: 'choice',
      prompt: 'Trong phép chia cho 5, số dư có thể là số nào?',
      options: ['4', '5', '6', '7'],
      answer: 0,
      hints: ['Số dư phải bé hơn số chia.'],
      solution: 'Số chia là 5, số dư phải bé hơn 5. Trong các số đã cho chỉ có 4 bé hơn 5.',
    },
    {
      type: 'choice',
      prompt: 'Tí viết: 20 : 3 = 5 (dư 5). Tí viết đúng hay sai?',
      options: ['Sai, vì số dư phải bé hơn 3', 'Đúng rồi', 'Sai, vì 20 : 3 là phép chia hết'],
      answer: 0,
      hints: ['Em so sánh số dư với số chia.'],
      solution: 'Số dư 5 lớn hơn số chia 3, nên Tí sai. Đúng là 20 : 3 = 6 (dư 2).',
    },
    {
      type: 'choice',
      prompt: 'Chia 17 cái kẹo vào các túi, mỗi túi 5 cái. Kết quả thế nào?',
      options: [
        '3 túi, thừa 2 cái kẹo',
        '3 túi, thừa 5 cái kẹo',
        '2 túi, thừa 7 cái kẹo',
        '4 túi, thừa 3 cái kẹo',
      ],
      answer: 0,
      hints: ['Em tính 17 : 5.', 'Số kẹo thừa phải bé hơn 5.'],
      solution: '5 × 3 = 15. 17 − 15 = 2. Vậy 17 : 5 = 3 (dư 2): được 3 túi, thừa 2 cái kẹo.',
    },
    {
      type: 'number',
      prompt: 'Tính: 34 : 6. Thương là bao nhiêu?',
      answer: 5,
      hints: ['6 nhân mấy thì gần 34 nhất mà không quá 34?'],
      solution: '6 × 5 = 30. 34 − 30 = 4. Vậy 34 : 6 = 5 (dư 4), thương là 5.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 19 : 7 theo đúng thứ tự.',
      items: [
        '19 trừ 14 bằng 5, số dư là 5',
        '19 chia 7 được 2, viết 2',
        '2 nhân 7 bằng 14, viết 14',
      ],
      answer: [1, 2, 0],
      hints: ['Em chia trước, rồi nhân, cuối cùng trừ.'],
      solution: '19 chia 7 được 2. 2 nhân 7 bằng 14. 19 trừ 14 bằng 5. Vậy 19 : 7 = 2 (dư 5).',
    },
  ],
  takeaways: [
    'Phép chia hết có số dư bằng 0. Phép chia có dư còn thừa ra số dư.',
    'Số dư luôn bé hơn số chia.',
  ],
};
