/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh hai số tròn trăm theo số trăm; so sánh hai số tròn chục theo hàng trăm rồi đến hàng chục.',
  intro:
    'Bên này 3 tấm trăm, bên kia 5 tấm trăm. Bên nào nhiều hơn? Em đặt hai bên cạnh nhau là thấy ngay! Hôm nay em học cách so sánh như thế.',
  objectives: [
    'So sánh được hai số tròn trăm.',
    'So sánh được hai số tròn chục.',
    'Dùng đúng các dấu >, <, = và tìm số lớn nhất, số bé nhất.',
  ],
  sections: [
    {
      heading: 'So sánh các số tròn trăm',
      blocks: [
        {
          type: 'p',
          text: '700 có 7 trăm. 900 có 9 trăm. 7 trăm bé hơn 9 trăm, nên 700 < 900 và 900 > 700.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số tròn trăm nào có chữ số hàng trăm lớn hơn thì số đó lớn hơn.',
        },
      ],
    },
    {
      heading: 'So sánh các số tròn chục',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'So sánh hàng trăm trước. Nếu hàng trăm bằng nhau thì so sánh hàng chục.',
        },
        {
          type: 'p',
          text: '520 có 5 trăm, 250 có 2 trăm. 5 trăm lớn hơn 2 trăm, nên 520 > 250.',
        },
        {
          type: 'p',
          text: '120 và 150 đều có 1 trăm. 2 chục bé hơn 5 chục, nên 120 < 150.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Luôn nhìn hàng trăm trước. 520 và 250 có cùng các chữ số 5, 2 và 0, nhưng 520 lớn hơn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt hai số cạnh nhau',
    instruction:
      'Em nhìn các tấm trăm và thanh chục ở hai bên rồi chạm dấu đúng. Em có thể chạm − và + để đổi số.',
  },
  examples: [
    {
      problem: 'Điền dấu >, <, = vào chỗ trống: 800 ... 600.',
      steps: ['800 có 8 trăm, 600 có 6 trăm.', '8 trăm lớn hơn 6 trăm.'],
      answer: '800 > 600.',
    },
    {
      problem:
        'Các số 950, 930, 990, 960 là số trên thẻ của bốn bạn. Số nào lớn nhất, số nào bé nhất?',
      steps: [
        'Cả bốn số đều có 9 trăm.',
        'Em so sánh hàng chục: 3 chục bé nhất, 9 chục lớn nhất.',
        'Xếp từ bé đến lớn: 930 < 950 < 960 < 990.',
      ],
      answer: 'Số lớn nhất là 990, số bé nhất là 930.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 300 ... 500.',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['So sánh 3 trăm và 5 trăm.'],
      solution: '3 trăm bé hơn 5 trăm, nên 300 < 500.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 800 ... 200.',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['So sánh 8 trăm và 2 trăm.'],
      solution: '8 trăm lớn hơn 2 trăm, nên 800 > 200.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 400 ... 400.',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Hai số có giống nhau không?'],
      solution: 'Hai số giống nhau, nên 400 = 400.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 160 ... 190.',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Hai số đều có 1 trăm. Em so sánh hàng chục.'],
      solution: 'Hàng trăm bằng nhau. 6 chục bé hơn 9 chục, nên 160 < 190.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 340 ... 430.',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em nhìn hàng trăm trước.'],
      solution: '3 trăm bé hơn 4 trăm, nên 340 < 430.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số từ bé đến lớn.',
      items: ['300', '900', '100', '600'],
      answer: [2, 0, 3, 1],
      hints: ['So sánh số trăm của mỗi số.'],
      solution: '100 < 300 < 600 < 900.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số từ lớn đến bé.',
      items: ['250', '520', '130', '310'],
      answer: [1, 3, 0, 2],
      hints: ['Tìm số có chữ số hàng trăm lớn nhất trước.'],
      solution: '520 > 310 > 250 > 130.',
    },
    {
      type: 'choice',
      prompt: 'Số nào lớn nhất?',
      options: ['930', '950', '990', '960'],
      answer: 2,
      hints: ['Cả bốn số đều có 9 trăm. Em so sánh hàng chục.'],
      solution: '9 chục là lớn nhất, nên 990 là số lớn nhất.',
    },
    {
      type: 'choice',
      prompt: 'Số nào bé nhất?',
      options: ['470', '740', '410'],
      answer: 2,
      hints: ['Hai số có 4 trăm. Em so sánh hàng chục của hai số đó.'],
      solution:
        '470 và 410 đều có 4 trăm, 740 có 7 trăm. 1 chục bé hơn 7 chục, nên 410 là số bé nhất.',
    },
    {
      type: 'choice',
      prompt: 'Gấu nâu nặng 540 kg. Gấu đen nặng 450 kg. Con nào nặng hơn?',
      options: ['Gấu nâu', 'Gấu đen'],
      answer: 0,
      hints: ['So sánh 540 và 450, bắt đầu từ hàng trăm.'],
      solution: '5 trăm lớn hơn 4 trăm, nên 540 > 450. Gấu nâu nặng hơn.',
    },
  ],
  takeaways: [
    'Số tròn trăm: so sánh chữ số hàng trăm.',
    'Số tròn chục: so sánh hàng trăm trước, bằng nhau thì so sánh hàng chục.',
  ],
};
