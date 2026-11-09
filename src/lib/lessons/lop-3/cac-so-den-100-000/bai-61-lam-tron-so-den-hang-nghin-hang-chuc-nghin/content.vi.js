/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Làm tròn số đến hàng nghìn (nhìn chữ số hàng trăm) và đến hàng chục nghìn (nhìn chữ số hàng nghìn): bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên.',
  intro:
    'Sân vận động có 42 316 chỗ ngồi. Bạn Mai nói: "Sân có khoảng 42 000 chỗ ngồi." Mai đã làm tròn số đến hàng nghìn. Em cùng học nhé!',
  objectives: [
    'Biết quy tắc làm tròn số đến hàng nghìn, hàng chục nghìn.',
    'Làm tròn được số đến hàng nghìn, hàng chục nghìn.',
  ],
  sections: [
    {
      heading: 'Làm tròn số đến hàng nghìn',
      blocks: [
        {
          type: 'p',
          text: 'Số 65 341 nằm giữa hai số tròn nghìn 65 000 và 66 000. Số 65 341 gần 65 000 hơn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi làm tròn số đến hàng nghìn, ta so sánh chữ số hàng trăm với 5. Nếu chữ số hàng trăm bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên.',
        },
        {
          type: 'table',
          head: ['Số', 'Chữ số hàng trăm', 'Làm tròn đến hàng nghìn'],
          rows: [
            ['65 341', '3 < 5: tròn xuống', '65 000'],
            ['10 501', '5: tròn lên', '11 000'],
            ['9 805', '8 > 5: tròn lên', '10 000'],
          ],
        },
      ],
    },
    {
      heading: 'Làm tròn số đến hàng chục nghìn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi làm tròn số đến hàng chục nghìn, ta so sánh chữ số hàng nghìn với 5. Nếu chữ số hàng nghìn bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên.',
        },
        {
          type: 'table',
          head: ['Số', 'Chữ số hàng nghìn', 'Làm tròn đến hàng chục nghìn'],
          rows: [
            ['82 134', '2 < 5: tròn xuống', '80 000'],
            ['55 712', '5: tròn lên', '60 000'],
            ['46 000', '6 > 5: tròn lên', '50 000'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Làm tròn xuống: giữ chữ số hàng nghìn (hoặc hàng chục nghìn), các chữ số bên phải thành 0. Làm tròn lên: chữ số đó thêm 1, các chữ số bên phải thành 0.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tia số có mốc tròn nghìn',
    instruction:
      'Em kéo số trên tia số, hoặc bấm − và +. Mũi tên chỉ mốc mà số được làm tròn về. Từ điểm giữa trở đi, số làm tròn lên mốc lớn hơn.',
  },
  examples: [
    {
      problem: 'Làm tròn số 10 501 đến hàng nghìn.',
      steps: [
        'Chữ số hàng trăm của 10 501 là 5.',
        '5 không bé hơn 5 nên làm tròn lên.',
        'Chữ số hàng nghìn 0 thêm 1 thành 1, các chữ số bên phải thành 0.',
      ],
      answer: 'Làm tròn 10 501 đến hàng nghìn được 11 000.',
    },
    {
      problem: 'Làm tròn số 82 134 đến hàng chục nghìn.',
      steps: [
        'Chữ số hàng nghìn của 82 134 là 2.',
        '2 < 5 nên làm tròn xuống.',
        'Giữ chữ số hàng chục nghìn là 8, các chữ số bên phải thành 0.',
      ],
      answer: 'Làm tròn 82 134 đến hàng chục nghìn được 80 000.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Làm tròn số 80 304 đến hàng nghìn.',
      answer: 80000,
      hints: ['Làm tròn đến hàng nghìn thì nhìn chữ số hàng trăm.'],
      solution: 'Chữ số hàng trăm là 3, 3 < 5 nên làm tròn xuống. Được 80 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 61 500 đến hàng nghìn.',
      answer: 62000,
      hints: ['Chữ số hàng trăm là 5. Bằng 5 thì làm tròn lên hay xuống?'],
      solution: 'Chữ số hàng trăm là 5, không bé hơn 5 nên làm tròn lên. Được 62 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 54 215 đến hàng chục nghìn.',
      answer: 50000,
      hints: ['Làm tròn đến hàng chục nghìn thì nhìn chữ số hàng nghìn.'],
      solution: 'Chữ số hàng nghìn là 4, 4 < 5 nên làm tròn xuống. Được 50 000.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn số 78 302 đến hàng chục nghìn được số nào?',
      options: ['70 000', '80 000', '78 000'],
      answer: 1,
      hints: ['Chữ số hàng nghìn của 78 302 là 8.'],
      solution:
        'Chữ số hàng nghìn là 8, 8 > 5 nên làm tròn lên. Được 80 000. Số 78 000 là làm tròn đến hàng nghìn.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi số với số làm tròn đến hàng nghìn của nó.',
      left: ['12 300', '12 700', '13 600', '15 499'],
      right: ['12 000', '13 000', '14 000', '15 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hàng trăm là 0, 1, 2, 3, 4 thì tròn xuống; 5, 6, 7, 8, 9 thì tròn lên.'],
      solution: '12 300 → 12 000. 12 700 → 13 000. 13 600 → 14 000. 15 499 → 15 000.',
    },
    {
      type: 'choice',
      prompt: 'Số nào khi làm tròn đến hàng chục nghìn được 30 000?',
      options: ['34 999', '35 000', '24 999', '38 100'],
      answer: 0,
      hints: ['Em làm tròn từng số đến hàng chục nghìn: nhìn chữ số hàng nghìn.'],
      solution:
        '34 999: hàng nghìn 4 < 5, tròn xuống được 30 000. 35 000 → 40 000, 24 999 → 20 000, 38 100 → 40 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 95 000 đến hàng chục nghìn.',
      answer: 100000,
      hints: [
        'Chữ số hàng nghìn là 5 nên làm tròn lên.',
        'Số tròn chục nghìn ngay sau 90 000 là số nào?',
      ],
      solution:
        'Chữ số hàng nghìn là 5 nên làm tròn lên: 95 000 nằm giữa 90 000 và 100 000. Được 100 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 73 105 đến hàng chục nghìn.',
      answer: 70000,
      hints: ['Chữ số hàng nghìn của 73 105 là 3.'],
      solution: 'Chữ số hàng nghìn là 3, 3 < 5 nên làm tròn xuống. Được 70 000.',
    },
    {
      type: 'choice',
      prompt:
        'Sân vận động có 42 316 chỗ ngồi. Làm tròn đến hàng nghìn, sân có khoảng bao nhiêu chỗ ngồi?',
      options: ['42 000', '43 000', '40 000'],
      answer: 0,
      hints: ['Làm tròn đến hàng nghìn thì nhìn chữ số hàng trăm.'],
      solution:
        'Chữ số hàng trăm của 42 316 là 3, 3 < 5 nên làm tròn xuống. Sân có khoảng 42 000 chỗ ngồi.',
    },
  ],
  takeaways: [
    'Làm tròn đến hàng nghìn: nhìn chữ số hàng trăm.',
    'Làm tròn đến hàng chục nghìn: nhìn chữ số hàng nghìn.',
    'Bé hơn 5 thì làm tròn xuống, còn lại (5, 6, 7, 8, 9) thì làm tròn lên.',
  ],
};
