/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Làm tròn số đến hàng trăm nghìn: so sánh chữ số hàng chục nghìn với 5; bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  intro:
    'Một chiếc xe đạp giá 2 125 000 đồng. Mẹ nói: "Xe giá khoảng 2 100 000 đồng." Mẹ đã làm tròn số đến hàng trăm nghìn. Em cùng học cách làm nhé!',
  objectives: [
    'Biết cách làm tròn số đến hàng trăm nghìn.',
    'Làm tròn được số đến hàng trăm nghìn, hàng chục nghìn.',
    'Dùng số làm tròn để nói khoảng bao nhiêu.',
  ],
  sections: [
    {
      heading: 'Làm tròn số đến hàng trăm nghìn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi làm tròn số đến hàng trăm nghìn, ta so sánh chữ số hàng chục nghìn với 5. Bé hơn 5 thì làm tròn xuống. Từ 5 trở lên thì làm tròn lên.',
        },
        {
          type: 'p',
          text: '2 125 000 có chữ số hàng chục nghìn là 2. Vì 2 < 5 nên làm tròn xuống: được 2 100 000.',
        },
        {
          type: 'p',
          text: '2 890 000 có chữ số hàng chục nghìn là 9. Vì 9 > 5 nên làm tròn lên: được 2 900 000.',
        },
        {
          type: 'p',
          text: 'Trên tia số, số làm tròn là mốc trăm nghìn gần số đó hơn.',
        },
      ],
    },
    {
      heading: 'Làm tròn số đến hàng chục nghìn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Làm tròn số đến hàng chục nghìn: em nhìn chữ số hàng nghìn và làm giống như trên.',
        },
        {
          type: 'p',
          text: '189 835 388 có chữ số hàng nghìn là 5. Vì 5 = 5 nên làm tròn lên: được 189 840 000.',
        },
        {
          type: 'table',
          head: ['Số', 'Đến hàng chục nghìn', 'Đến hàng trăm nghìn'],
          rows: [
            ['5 122 381', '5 120 000', '5 100 000'],
            ['18 490 000', '18 490 000', '18 500 000'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo số trên tia số',
    instruction:
      'Em kéo số trên tia số, hoặc dùng phím mũi tên. Mũi tên xanh chỉ mốc mà số được làm tròn đến. Chọn "Đố em" để tự làm tròn.',
  },
  examples: [
    {
      problem: 'Làm tròn số 3 272 353 đến hàng trăm nghìn.',
      steps: [
        'Chữ số hàng chục nghìn của 3 272 353 là 7.',
        'Vì 7 > 5 nên làm tròn lên: chữ số hàng trăm nghìn 2 thành 3.',
        'Các chữ số bên phải hàng trăm nghìn đổi thành 0.',
      ],
      answer: '3 300 000.',
    },
    {
      problem: 'Năm 2020, tỉnh Hải Dương có 1 916 800 người. Làm tròn số dân đến hàng trăm nghìn.',
      steps: [
        'Chữ số hàng chục nghìn của 1 916 800 là 1.',
        'Vì 1 < 5 nên làm tròn xuống: giữ chữ số hàng trăm nghìn là 9.',
        'Các chữ số bên phải đổi thành 0.',
      ],
      answer: 'Khoảng 1 900 000 người.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Làm tròn số 3 121 023 đến hàng trăm nghìn ta được số nào?',
      options: ['3 100 000', '3 200 000', '3 000 000', '3 120 000'],
      answer: 0,
      hints: ['Em nhìn chữ số hàng chục nghìn.'],
      solution: 'Chữ số hàng chục nghìn là 2. Vì 2 < 5 nên làm tròn xuống: được 3 100 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 3 386 097 đến hàng trăm nghìn.',
      answer: 3400000,
      hints: ['Chữ số hàng chục nghìn là 8.'],
      solution: 'Chữ số hàng chục nghìn là 8. Vì 8 > 5 nên làm tròn lên: được 3 400 000.',
    },
    {
      type: 'number',
      prompt: 'Một chiếc xe máy giá 18 490 000 đồng. Làm tròn giá tiền đến hàng trăm nghìn.',
      answer: 18500000,
      unit: 'đồng',
      hints: ['Chữ số hàng trăm nghìn là 4, chữ số hàng chục nghìn là 9.'],
      solution:
        'Chữ số hàng chục nghìn là 9. Vì 9 > 5 nên làm tròn lên: 4 trăm nghìn thành 5 trăm nghìn. Được 18 500 000 đồng.',
    },
    {
      type: 'choice',
      prompt: 'Số nào làm tròn đến hàng trăm nghìn thì được 200 000?',
      options: ['190 001', '149 000', '250 001', '284 910'],
      answer: 0,
      hints: ['Em làm tròn từng số rồi so sánh với 200 000.'],
      solution:
        '190 001 làm tròn lên được 200 000. 149 000 được 100 000; 250 001 và 284 910 được 300 000.',
    },
    {
      type: 'match',
      prompt: 'Em nối số dân năm 2020 với số làm tròn đến hàng trăm nghìn.',
      left: ['1 167 900', '1 916 800', '3 365 200'],
      right: ['1 200 000', '1 900 000', '3 400 000', '1 100 000', '3 300 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em nhìn chữ số hàng chục nghìn của từng số.'],
      solution:
        '1 167 900: chữ số 6 > 5, được 1 200 000. 1 916 800: chữ số 1 < 5, được 1 900 000. 3 365 200: chữ số 6 > 5, được 3 400 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 5 122 381 đến hàng chục nghìn.',
      answer: 5120000,
      hints: ['Làm tròn đến hàng chục nghìn thì em nhìn chữ số hàng nghìn.'],
      solution: 'Chữ số hàng nghìn là 2. Vì 2 < 5 nên làm tròn xuống: được 5 120 000.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn số 2 250 000 đến hàng trăm nghìn ta được số nào?',
      options: ['2 300 000', '2 200 000', '2 250 000'],
      answer: 0,
      hints: ['Chữ số hàng chục nghìn là 5.', 'Từ 5 trở lên thì làm tròn lên.'],
      solution: 'Chữ số hàng chục nghìn là 5. Vì 5 = 5 nên làm tròn lên: được 2 300 000.',
    },
    {
      type: 'order',
      prompt:
        'Số xe máy bán được: năm 2016 là 3 121 023, năm 2018 là 3 386 097, năm 2019 là 3 254 964. Em làm tròn đến hàng trăm nghìn rồi xếp các năm từ ít đến nhiều.',
      items: ['Năm 2016', 'Năm 2018', 'Năm 2019'],
      answer: [0, 2, 1],
      hints: ['Làm tròn được: 3 100 000; 3 400 000; 3 300 000.'],
      solution:
        'Năm 2016: 3 100 000, năm 2019: 3 300 000, năm 2018: 3 400 000. Từ ít đến nhiều: 2016, 2019, 2018.',
    },
  ],
  takeaways: [
    'Làm tròn đến hàng trăm nghìn: nhìn chữ số hàng chục nghìn.',
    'Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
    'Các chữ số bên phải hàng được làm tròn đổi thành 0.',
  ],
};
