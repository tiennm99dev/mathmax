const SIGNS = ['>', '<', '='];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh hai số có hai chữ số: so sánh hàng chục trước, nếu hàng chục bằng nhau thì so sánh hàng đơn vị; dùng dấu >, <, =.',
  intro:
    'Lan có 25 que tính, Minh có 31 que tính. Bạn nào có nhiều que tính hơn? Hôm nay em học cách so sánh hai số có hai chữ số.',
  objectives: [
    'So sánh hai số có hai chữ số: xem hàng chục trước, rồi hàng đơn vị.',
    'Dùng đúng dấu >, <, =.',
    'Tìm số lớn nhất, số bé nhất và xếp các số theo thứ tự.',
  ],
  sections: [
    {
      heading: 'So sánh hàng chục trước',
      blocks: [
        {
          type: 'p',
          text: 'Số 42 có 4 chục. Số 25 có 2 chục. 4 chục nhiều hơn 2 chục.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ghi nhớ',
          text: 'Số nào có hàng chục lớn hơn thì số đó lớn hơn. Ví dụ: 42 > 25.',
        },
        {
          type: 'p',
          text: 'Không cần xem hàng đơn vị! 5 lớn hơn 2, nhưng 25 vẫn bé hơn 42.',
        },
      ],
    },
    {
      heading: 'Hàng chục bằng nhau thì so sánh hàng đơn vị',
      blocks: [
        {
          type: 'p',
          text: 'Số 16 và số 19 đều có 1 chục. Em so sánh hàng đơn vị: 6 bé hơn 9.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ghi nhớ',
          text: 'Hàng chục bằng nhau thì số nào có hàng đơn vị lớn hơn, số đó lớn hơn. Ví dụ: 16 < 19.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hai số bằng nhau',
          text: 'Hàng chục bằng nhau và hàng đơn vị cũng bằng nhau thì hai số bằng nhau: 37 = 37.',
        },
      ],
    },
    {
      heading: 'Các bước so sánh',
      blocks: [
        {
          type: 'table',
          head: ['Bước', 'Em làm', 'Ví dụ'],
          rows: [
            ['1', 'So sánh hàng chục', '58 và 63: 5 chục < 6 chục, nên 58 < 63'],
            ['2', 'Nếu hàng chục bằng nhau, so sánh hàng đơn vị', '74 và 71: 4 > 1, nên 74 > 71'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhớ dấu',
          text: 'Miệng dấu > và < luôn mở về phía số lớn hơn: 42 > 25, 16 < 19.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai cột que tính',
    instruction:
      'Chạm + và − để đổi số chục, số đơn vị của hai số. Dấu ở giữa tự hiện, hàng quyết định được tô màu. Chọn "Em chọn dấu" để tự so sánh rồi chạm dấu đúng.',
  },
  examples: [
    {
      problem: 'Điền dấu >, < hay =: 36 ... 52',
      steps: ['So sánh hàng chục: 3 chục và 5 chục.', '3 bé hơn 5, nên 36 bé hơn 52.'],
      answer: '36 < 52.',
    },
    {
      problem: 'Điền dấu >, < hay =: 87 ... 84',
      steps: [
        'Hàng chục bằng nhau: cùng 8 chục.',
        'So sánh hàng đơn vị: 7 lớn hơn 4.',
        'Vậy 87 lớn hơn 84.',
      ],
      answer: '87 > 84.',
    },
    {
      problem: 'Trong các số 45, 54, 41, số nào lớn nhất?',
      steps: ['So sánh hàng chục: 45 và 41 có 4 chục, 54 có 5 chục.', '5 chục là nhiều nhất.'],
      answer: 'Số 54 lớn nhất.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 16 ... 19',
      options: SIGNS,
      answer: 1,
      hints: ['Hai số đều có 1 chục.', 'So sánh hàng đơn vị: 6 và 9.'],
      solution: 'Cùng 1 chục, 6 < 9, nên 16 < 19.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 42 ... 25',
      options: SIGNS,
      answer: 0,
      hints: ['So sánh hàng chục trước.'],
      solution: '4 chục > 2 chục, nên 42 > 25.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 70 ... 70',
      options: SIGNS,
      answer: 2,
      hints: ['Hai số giống hệt nhau.'],
      solution: 'Hàng chục bằng nhau, hàng đơn vị bằng nhau, nên 70 = 70.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 29 ... 31',
      options: SIGNS,
      answer: 1,
      hints: ['Đừng nhìn 9 và 1 trước! Em so sánh hàng chục.'],
      solution: '2 chục < 3 chục, nên 29 < 31.',
    },
    {
      type: 'choice',
      prompt: 'Số nào lớn nhất?',
      options: ['38', '83', '58'],
      answer: 1,
      hints: ['Số nào có nhiều chục nhất?'],
      solution: '83 có 8 chục, nhiều nhất. Số 83 lớn nhất.',
    },
    {
      type: 'choice',
      prompt: 'Số nào bé nhất?',
      options: ['45', '54', '41'],
      answer: 2,
      hints: ['45 và 41 cùng có 4 chục.', 'So sánh hàng đơn vị của 45 và 41.'],
      solution: '54 có 5 chục nên lớn hơn. 45 và 41 cùng 4 chục, 1 < 5. Số 41 bé nhất.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số bé hơn 50.',
      options: ['48', '52', '39', '50', '15'],
      answers: [0, 2, 4],
      hints: ['Số có 4 chục, 3 chục hay 1 chục thì bé hơn 5 chục.', '50 bằng 50, không bé hơn.'],
      solution: '48, 39 và 15 bé hơn 50. 52 lớn hơn 50, còn 50 bằng 50.',
    },
    {
      type: 'choice',
      prompt: 'Lan có 25 viên bi. Minh có 31 viên bi. Ai có nhiều viên bi hơn?',
      options: ['Lan', 'Minh', 'Hai bạn bằng nhau'],
      answer: 1,
      hints: ['So sánh 25 và 31.'],
      solution: '2 chục < 3 chục, nên 25 < 31. Minh có nhiều viên bi hơn.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['67', '29', '76', '92'],
      answer: [1, 0, 2, 3],
      hints: ['So sánh hàng chục: 6, 2, 7, 9.'],
      solution: '29 < 67 < 76 < 92.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ lớn đến bé.',
      items: ['55', '15', '51', '50'],
      answer: [0, 2, 3, 1],
      hints: ['15 có ít chục nhất.', '55, 51, 50 cùng 5 chục: so sánh hàng đơn vị.'],
      solution: '55 > 51 > 50 > 15.',
    },
  ],
  takeaways: [
    'So sánh hàng chục trước: hàng chục lớn hơn thì số lớn hơn (42 > 25).',
    'Hàng chục bằng nhau thì so sánh hàng đơn vị (16 < 19).',
    'Cả hai hàng đều bằng nhau thì hai số bằng nhau (37 = 37).',
  ],
};
