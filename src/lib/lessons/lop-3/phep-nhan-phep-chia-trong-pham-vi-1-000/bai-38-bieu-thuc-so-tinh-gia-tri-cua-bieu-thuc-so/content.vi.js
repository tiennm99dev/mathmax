/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Làm quen với biểu thức số và giá trị của biểu thức số; thứ tự thực hiện phép tính: từ trái sang phải, nhân chia trước cộng trừ sau, trong ngoặc trước.',
  intro:
    'Trong 24 + 5 × 6 có hai phép tính. Em làm phép tính nào trước? Bài này giúp em biết tính đúng thứ tự nhé!',
  objectives: [
    'Nhận biết biểu thức số và giá trị của biểu thức số.',
    'Tính biểu thức chỉ có cộng, trừ hoặc chỉ có nhân, chia.',
    'Tính biểu thức có cả cộng, trừ, nhân, chia.',
    'Tính biểu thức có dấu ngoặc.',
  ],
  sections: [
    {
      heading: 'Biểu thức số',
      blocks: [
        { type: 'p', text: '9 × 4, 18 + 3 và 27 − 7 + 30 là các biểu thức số.' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biểu thức số',
          text: 'Biểu thức số là các số nối với nhau bằng dấu phép tính.',
        },
        { type: 'p', text: '9 × 4 = 36. Em nói: giá trị của biểu thức 9 × 4 là 36.' },
      ],
    },
    {
      heading: 'Chỉ có cộng, trừ hoặc chỉ có nhân, chia',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nếu biểu thức chỉ có phép cộng, phép trừ hoặc chỉ có phép nhân, phép chia thì em tính từ trái sang phải.',
        },
        { type: 'p', text: '60 + 50 − 20 = 110 − 20 = 90.' },
        { type: 'p', text: '30 : 5 × 2 = 6 × 2 = 12.' },
      ],
    },
    {
      heading: 'Có cả cộng, trừ, nhân, chia',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nếu biểu thức có cả phép cộng, trừ, nhân, chia thì em làm phép nhân, phép chia trước; phép cộng, phép trừ sau.',
        },
        { type: 'p', text: '24 + 5 × 6 = 24 + 30 = 54.' },
        { type: 'p', text: '30 − 18 : 3 = 30 − 6 = 24.' },
      ],
    },
    {
      heading: 'Có dấu ngoặc',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nếu biểu thức có dấu ngoặc thì em tính trong ngoặc trước.',
        },
        { type: 'p', text: '8 × (11 − 6) = 8 × 5 = 40.' },
        { type: 'p', text: '(15 + 5) : 5 = 20 : 5 = 4.' },
        {
          type: 'table',
          caption: 'Cùng các số, có ngoặc hay không làm giá trị khác đi.',
          head: ['Biểu thức', 'Giá trị'],
          rows: [
            ['5 × 6 − 2', '28'],
            ['5 × (6 − 2)', '20'],
          ],
        },
      ],
    },
    {
      heading: 'Tính cho thuận tiện',
      blocks: [
        {
          type: 'p',
          text: 'Chỉ có phép cộng thì em được nhóm hai số có tổng tròn chục, tròn trăm vào ngoặc để tính trước.',
        },
        { type: 'p', text: '123 + 80 + 20 = 123 + (80 + 20) = 123 + 100 = 223.' },
      ],
    },
  ],
  explore: {
    title: 'Cây tính',
    instruction:
      'Em chạm vào dấu của phép tính cần làm trước, rồi chọn kết quả. Mỗi phép tính đúng làm cây mọc thêm một số. Số trên ngọn là giá trị của biểu thức.',
  },
  examples: [
    {
      problem: 'Tính giá trị của biểu thức: 27 − 7 + 30.',
      steps: [
        'Chỉ có phép trừ và phép cộng, em tính từ trái sang phải.',
        '27 − 7 = 20.',
        '20 + 30 = 50.',
      ],
      answer: '27 − 7 + 30 = 20 + 30 = 50.',
    },
    {
      problem: 'Tính giá trị của biểu thức: 56 − 2 × 5.',
      steps: ['Có phép trừ và phép nhân, em làm phép nhân trước.', '2 × 5 = 10.', '56 − 10 = 46.'],
      answer: '56 − 2 × 5 = 56 − 10 = 46.',
    },
    {
      problem: 'Tính giá trị của biểu thức: 45 : (5 + 4).',
      steps: ['Có dấu ngoặc, em tính trong ngoặc trước.', '5 + 4 = 9.', '45 : 9 = 5.'],
      answer: '45 : (5 + 4) = 45 : 9 = 5.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 35 + 15 − 20.',
      answer: 30,
      hints: ['Chỉ có cộng và trừ, em tính từ trái sang phải.', 'Em tính 35 + 15 trước.'],
      solution: '35 + 15 − 20 = 50 − 20 = 30.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 48 : 4 × 2.',
      answer: 24,
      hints: ['Chỉ có chia và nhân, em tính từ trái sang phải.', 'Em tính 48 : 4 trước.'],
      solution: '48 : 4 × 2 = 12 × 2 = 24.',
    },
    {
      type: 'choice',
      prompt: 'Giá trị của biểu thức 40 − 12 : 3 là bao nhiêu?',
      options: ['36', '32', '44', '28'],
      answer: 0,
      hints: ['Em làm phép chia trước.', 'Lấy 40 trừ đi kết quả của 12 : 3.'],
      solution: '40 − 12 : 3 = 40 − 4 = 36.',
    },
    {
      type: 'choice',
      prompt: 'Trong biểu thức 30 − 6 × 2, em làm phép tính nào trước?',
      options: ['6 × 2', '30 − 6'],
      answer: 0,
      hints: ['Nhân, chia làm trước; cộng, trừ làm sau.'],
      solution: 'Em làm phép nhân trước: 30 − 6 × 2 = 30 − 12 = 18.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 7 × (13 − 8).',
      answer: 35,
      hints: ['Có dấu ngoặc, em tính trong ngoặc trước.', 'Em tính 13 − 8, rồi nhân với 7.'],
      solution: '7 × (13 − 8) = 7 × 5 = 35.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu thức với giá trị của nó.',
      left: ['(10 + 6) : 2', '10 + 6 : 2', '3 × (9 − 4)', '3 × 9 − 4'],
      right: ['8', '13', '15', '23'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Biểu thức nào có ngoặc thì tính trong ngoặc trước.',
        'Không có ngoặc thì nhân, chia trước.',
      ],
      solution:
        '(10 + 6) : 2 = 16 : 2 = 8. 10 + 6 : 2 = 10 + 3 = 13. 3 × (9 − 4) = 3 × 5 = 15. 3 × 9 − 4 = 27 − 4 = 23.',
    },
    {
      type: 'order',
      prompt: 'Xếp các dòng tính 18 + 7 × 3 theo đúng thứ tự.',
      items: ['18 + 21', '18 + 7 × 3', '39'],
      answer: [1, 0, 2],
      hints: ['Dòng đầu là biểu thức đã cho.', 'Em làm phép nhân trước.'],
      solution: '18 + 7 × 3 = 18 + 21 = 39.',
    },
    {
      type: 'choice',
      prompt: 'Biểu thức nào có giá trị lớn nhất?',
      options: ['6 × 5 − 1', '6 × (5 − 1)', '(20 + 12) : 4', '20 + 12 : 4'],
      answer: 0,
      hints: [
        'Em tính giá trị của từng biểu thức.',
        'Nhớ thứ tự: trong ngoặc trước, rồi nhân, chia.',
      ],
      solution:
        '6 × 5 − 1 = 29. 6 × (5 − 1) = 24. (20 + 12) : 4 = 8. 20 + 12 : 4 = 23. Lớn nhất là 29.',
    },
    {
      type: 'number',
      prompt:
        'Lan có 6 túi kẹo, cho bạn 2 túi. Mỗi túi có 5 cái kẹo. Lan còn lại bao nhiêu cái kẹo?',
      answer: 20,
      hints: ['Em tìm số túi còn lại trước.', 'Biểu thức: (6 − 2) × 5.'],
      solution: '(6 − 2) × 5 = 4 × 5 = 20. Lan còn lại 20 cái kẹo.',
    },
    {
      type: 'number',
      prompt: 'Tính cho thuận tiện: 156 + 60 + 40.',
      answer: 256,
      hints: ['Hai số nào cộng lại được số tròn trăm?', 'Em nhóm 60 + 40 vào ngoặc.'],
      solution: '156 + 60 + 40 = 156 + (60 + 40) = 156 + 100 = 256.',
    },
  ],
  takeaways: [
    'Giá trị của biểu thức là kết quả khi em tính xong.',
    'Chỉ có cộng, trừ hoặc chỉ có nhân, chia: tính từ trái sang phải.',
    'Có cả cộng, trừ, nhân, chia: nhân, chia trước; cộng, trừ sau.',
    'Có dấu ngoặc: tính trong ngoặc trước.',
  ],
};
