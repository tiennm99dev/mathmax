/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh hai số trong phạm vi 10 và viết kết quả bằng dấu lớn hơn (>), dấu bé hơn (<) hoặc dấu bằng (=).',
  intro:
    'Chú cá sấu tham ăn luôn há miệng về phía số lớn hơn! Trong bài này, em học dấu >, dấu < và dấu = để so sánh hai số.',
  objectives: ['Nhận biết và đọc đúng dấu >, dấu <, dấu =.', 'So sánh hai số trong phạm vi 10.'],
  sections: [
    {
      heading: 'Lớn hơn, dấu >',
      blocks: [
        {
          type: 'p',
          text: 'Có 5 quả cam và 3 quả cam. Ghép đôi, nhóm 5 quả còn thừa 2 quả.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dấu >',
          text: '5 lớn hơn 3. Ta viết: 5 > 3. Dấu > đọc là "lớn hơn".',
        },
      ],
    },
    {
      heading: 'Bé hơn, dấu <',
      blocks: [
        {
          type: 'p',
          text: 'Có 2 con cá và 4 con cá. Nhóm 2 con cá ít hơn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dấu <',
          text: '2 bé hơn 4. Ta viết: 2 < 4. Dấu < đọc là "bé hơn".',
        },
      ],
    },
    {
      heading: 'Bằng nhau, dấu =',
      blocks: [
        {
          type: 'p',
          text: 'Có 4 quả táo và 4 quả lê. Ghép đôi vừa hết.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dấu =',
          text: '4 bằng 4. Ta viết: 4 = 4. Dấu = đọc là "bằng".',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhớ',
          text: 'Đầu nhọn của dấu > và dấu < luôn chỉ vào số bé hơn. Miệng mở về phía số lớn hơn.',
        },
        {
          type: 'p',
          text: 'Khi đếm, số đứng sau lớn hơn số đứng trước: 7 > 6, 6 < 7.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cá sấu so sánh',
    instruction:
      'Bấm − và + để đổi hai số. Miệng cá sấu há về phía số lớn hơn và tạo thành dấu > hoặc <; hai số bằng nhau thì cá sấu ngậm miệng thành dấu =. Chọn "Đố em" để tự chọn dấu.',
  },
  examples: [
    {
      problem: 'Điền dấu >, < hoặc = : 8 ... 6',
      steps: ['Đếm: 6 đứng trước 8, nên 8 lớn hơn 6.', 'Miệng mở về phía số 8.'],
      answer: '8 > 6.',
    },
    {
      problem: 'Điền dấu >, < hoặc = : 3 ... 9',
      steps: ['Đếm: 3 đứng trước 9, nên 3 bé hơn 9.', 'Đầu nhọn chỉ vào số 3.'],
      answer: '3 < 9.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 7 ... 4',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Số nào lớn hơn, 7 hay 4?', 'Miệng mở về phía số lớn hơn.'],
      solution: '7 lớn hơn 4, nên 7 > 4.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 2 ... 5',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Khi đếm, 2 đứng trước hay sau 5?'],
      solution: '2 bé hơn 5, nên 2 < 5.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 6 ... 6',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Hai số giống nhau.'],
      solution: 'Hai số bằng nhau, nên 6 = 6.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 0 ... 10',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Số 0 là không có gì.'],
      solution: '0 bé hơn 10, nên 0 < 10.',
    },
    {
      type: 'choice',
      prompt: 'Số nào lớn hơn 8?',
      options: ['6', '8', '9'],
      answer: 2,
      hints: ['Đếm tiếp sau 8.'],
      solution: 'Sau 8 là 9, nên 9 > 8.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép so sánh với cách đọc.',
      left: ['9 > 1', '1 < 9', '5 = 5'],
      right: ['Một bé hơn chín.', 'Năm bằng năm.', 'Chín lớn hơn một.'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      hints: ['Dấu > đọc là "lớn hơn", dấu < đọc là "bé hơn", dấu = đọc là "bằng".'],
      solution: '9 > 1: chín lớn hơn một. 1 < 9: một bé hơn chín. 5 = 5: năm bằng năm.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số từ bé đến lớn.',
      items: ['7', '2', '10', '5'],
      answer: [1, 3, 0, 2],
      hints: ['Tìm số bé nhất trước.', 'Số nào đứng trước khi đếm thì bé hơn.'],
      solution: '2 < 5 < 7 < 10. Thứ tự từ bé đến lớn: 2, 5, 7, 10.',
    },
    {
      type: 'choice',
      prompt: 'Lan có 4 cái kẹo, Hà có 7 cái kẹo. Ai có nhiều kẹo hơn?',
      options: ['Lan', 'Hà', 'Hai bạn bằng nhau'],
      answer: 1,
      hints: ['So sánh 4 và 7.'],
      solution: '7 > 4, nên Hà có nhiều kẹo hơn.',
    },
  ],
  takeaways: [
    'Dấu > đọc là "lớn hơn": 5 > 3.',
    'Dấu < đọc là "bé hơn": 2 < 4.',
    'Dấu = đọc là "bằng": 4 = 4.',
    'Đầu nhọn của dấu chỉ vào số bé hơn.',
  ],
};
