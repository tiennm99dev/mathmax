/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép trừ không nhớ trong phạm vi 1000: đặt tính thẳng cột, trừ từ phải sang trái, hàng đơn vị, hàng chục rồi hàng trăm.',
  intro:
    'Một trường có 465 học sinh, trong đó có 240 học sinh nữ. Trường có bao nhiêu học sinh nam? Em trừ từng hàng, từ hàng đơn vị nhé!',
  objectives: [
    'Đặt tính trừ số có ba chữ số, các chữ số cùng hàng thẳng cột.',
    'Trừ từng hàng, từ phải sang trái.',
    'Tính nhẩm số tròn trăm và giải bài toán có phép trừ.',
  ],
  sections: [
    {
      heading: 'Trừ từng hàng',
      blocks: [
        { type: 'p', text: 'Tính 619 − 207. Em bớt đi các khối ở từng hàng.' },
        {
          type: 'table',
          head: ['Hàng', 'Bớt đi', 'Còn'],
          rows: [
            ['Đơn vị', '9 − 7', '2 đơn vị'],
            ['Chục', '1 − 0', '1 chục'],
            ['Trăm', '6 − 2', '4 trăm'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em lấy chữ số ở trên trừ chữ số ở dưới, cùng một hàng. Em làm từ phải sang trái.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tính 619 − 207',
          text: '9 trừ 7 bằng 2, viết 2. 1 trừ 0 bằng 1, viết 1. 6 trừ 2 bằng 4, viết 4. Vậy 619 − 207 = 412.',
        },
        {
          type: 'table',
          head: ['Phép trừ', 'Đơn vị', 'Chục', 'Trăm', 'Kết quả'],
          rows: [
            ['543 − 403', '3 − 3 = 0', '4 − 0 = 4', '5 − 4 = 1', '140'],
            ['347 − 120', '7 − 0 = 7', '4 − 2 = 2', '3 − 1 = 2', '227'],
            ['835 − 30', '5 − 0 = 5', '3 − 3 = 0', 'Hạ 8', '805'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Số 0 ở đầu',
          text: '758 − 727: hàng trăm 7 trừ 7 bằng 0. Em không viết chữ số 0 ở đầu. Kết quả là 31.',
        },
      ],
    },
    {
      heading: 'Tính nhẩm số tròn trăm',
      blocks: [
        { type: 'p', text: 'Em trừ số trăm: 7 trăm − 3 trăm = 4 trăm. Vậy 700 − 300 = 400.' },
      ],
    },
  ],
  explore: {
    title: 'Bớt khối từng hàng',
    instruction:
      'Hàng đang tính được tô sáng. Em bớt khối ở hàng đó, đếm số khối còn lại rồi chạm chữ số để viết.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 543 − 403.',
      steps: ['3 trừ 3 bằng 0, viết 0.', '4 trừ 0 bằng 4, viết 4.', '5 trừ 4 bằng 1, viết 1.'],
      answer: '543 − 403 = 140.',
    },
    {
      problem: 'Đặt tính rồi tính: 758 − 727.',
      steps: [
        '8 trừ 7 bằng 1, viết 1.',
        '5 trừ 2 bằng 3, viết 3.',
        '7 trừ 7 bằng 0, không cần viết.',
      ],
      answer: '758 − 727 = 31.',
    },
    {
      problem:
        'Bác Sơn thu hoạch được 580 kg thóc nếp. Bác Hùng thu hoạch được ít hơn bác Sơn 40 kg. Bác Hùng thu hoạch được bao nhiêu ki-lô-gam thóc nếp?',
      steps: ['"Ít hơn" nên em làm phép trừ: 580 − 40.', '0 trừ 0 bằng 0. 8 trừ 4 bằng 4. Hạ 5.'],
      answer: '580 − 40 = 540. Bác Hùng thu hoạch được 540 kg thóc nếp.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '347 − 120 = ?',
      options: ['227', '237', '217', '127'],
      answer: 0,
      hints: ['Hàng đơn vị: 7 − 0.', 'Hàng chục: 4 − 2. Hàng trăm: 3 − 1.'],
      solution: '7 trừ 0 bằng 7. 4 trừ 2 bằng 2. 3 trừ 1 bằng 2. Vậy 347 − 120 = 227.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 482 − 70 = ?',
      answer: 412,
      hints: ['Viết 7 thẳng cột với 8.', 'Chữ số 4 ở hàng trăm được hạ xuống.'],
      solution: '2 trừ 0 bằng 2. 8 trừ 7 bằng 1. Hạ 4. Vậy 482 − 70 = 412.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 758 − 727 = ?',
      answer: 31,
      hints: ['Em trừ từng hàng từ phải sang trái.', 'Hàng trăm được 0 thì không viết số 0 ở đầu.'],
      solution: '8 trừ 7 bằng 1. 5 trừ 2 bằng 3. 7 trừ 7 bằng 0. Vậy 758 − 727 = 31.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép trừ với kết quả đúng.',
      left: ['362 − 150', '729 − 407', '835 − 30'],
      right: ['212', '322', '805'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em tính từng hàng cho mỗi phép trừ.'],
      solution: '362 − 150 = 212. 729 − 407 = 322. 835 − 30 = 805.',
    },
    {
      type: 'multi',
      prompt: 'Tính nhẩm: phép tính nào có kết quả bằng 200? Em chọn tất cả.',
      options: ['600 − 400', '700 − 300', '900 − 700', '800 − 500'],
      answers: [0, 2],
      hints: ['Em trừ số trăm: 6 trăm − 4 trăm.'],
      solution: '600 − 400 = 200 và 900 − 700 = 200. 700 − 300 = 400, còn 800 − 500 = 300.',
    },
    {
      type: 'choice',
      prompt: 'Trâu ăn bó cỏ ghi phép tính có kết quả lớn nhất. Trâu ăn bó cỏ nào?',
      options: ['520 − 210', '983 − 680', '368 − 167'],
      answer: 0,
      hints: ['Em tính kết quả của từng bó cỏ rồi so sánh.'],
      solution:
        '520 − 210 = 310. 983 − 680 = 303. 368 − 167 = 201. Vì 310 > 303 > 201, trâu ăn bó cỏ 520 − 210.',
    },
    {
      type: 'choice',
      prompt: 'Hai bông hoa nào ghi hai phép tính có kết quả bằng nhau?',
      options: ['678 − 367 và 859 − 548', '678 − 367 và 482 − 70', '859 − 548 và 482 − 70'],
      answer: 0,
      hints: ['Em tính 678 − 367, 859 − 548 và 482 − 70.'],
      solution:
        '678 − 367 = 311. 859 − 548 = 311. 482 − 70 = 412. Hai phép tính 678 − 367 và 859 − 548 có kết quả bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Một trường tiểu học có 465 học sinh, trong đó có 240 học sinh nữ. Trường có bao nhiêu học sinh nam?',
      answer: 225,
      unit: 'học sinh',
      hints: ['Cả trường bớt đi học sinh nữ thì còn học sinh nam.', 'Em tính 465 − 240.'],
      solution: 'Trường có số học sinh nam là: 465 − 240 = 225 (học sinh). Đáp số: 225 học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Cầu Bãi Cháy dài 903 m. Cầu Trường Tiền dài 403 m. Cầu Bãi Cháy dài hơn cầu Trường Tiền bao nhiêu mét?',
      answer: 500,
      unit: 'm',
      hints: ['Em lấy số lớn trừ số bé.', 'Em tính 903 − 403.'],
      solution: 'Cầu Bãi Cháy dài hơn cầu Trường Tiền: 903 − 403 = 500 (m). Đáp số: 500 m.',
    },
  ],
  takeaways: [
    'Đặt tính: các chữ số cùng hàng thẳng cột.',
    'Trừ từ phải sang trái: đơn vị, chục, rồi trăm.',
    'Hàng trăm trừ ra 0 thì không viết chữ số 0 ở đầu.',
  ],
};
