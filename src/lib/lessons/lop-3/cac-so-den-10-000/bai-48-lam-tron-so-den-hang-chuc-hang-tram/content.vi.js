/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Làm tròn số đến hàng chục (nhìn chữ số hàng đơn vị) và đến hàng trăm (nhìn chữ số hàng chục): bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên.',
  intro:
    'Thư viện có 5 247 cuốn sách. Bạn Bình nói: "Thư viện có khoảng 5 200 cuốn sách." Bình đã làm tròn số. Em cùng học cách làm tròn nhé!',
  objectives: [
    'Biết quy tắc làm tròn số đến hàng chục, hàng trăm.',
    'Làm tròn được số đến hàng chục, hàng trăm.',
  ],
  sections: [
    {
      heading: 'Làm tròn số đến hàng chục',
      blocks: [
        {
          type: 'p',
          text: 'Số 43 nằm giữa hai số tròn chục 40 và 50. Số 43 gần 40 hơn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi làm tròn số đến hàng chục, ta so sánh chữ số hàng đơn vị với 5. Nếu chữ số hàng đơn vị bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên.',
        },
        {
          type: 'table',
          head: ['Số', 'Chữ số hàng đơn vị', 'Làm tròn đến hàng chục'],
          rows: [
            ['2 823', '3 < 5: tròn xuống', '2 820'],
            ['2 826', '6 > 5: tròn lên', '2 830'],
            ['1 255', '5: tròn lên', '1 260'],
          ],
        },
      ],
    },
    {
      heading: 'Làm tròn số đến hàng trăm',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi làm tròn số đến hàng trăm, ta so sánh chữ số hàng chục với 5. Nếu chữ số hàng chục bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên.',
        },
        {
          type: 'table',
          head: ['Số', 'Chữ số hàng chục', 'Làm tròn đến hàng trăm'],
          rows: [
            ['3 524', '2 < 5: tròn xuống', '3 500'],
            ['3 064', '6 > 5: tròn lên', '3 100'],
            ['3 256', '5: tròn lên', '3 300'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Làm tròn xuống: giữ chữ số hàng chục (hoặc hàng trăm), các chữ số bên phải thành 0. Làm tròn lên: chữ số đó thêm 1, các chữ số bên phải thành 0.',
        },
      ],
    },
  ],
  explore: {
    title: 'Viên bi lăn về mốc tròn',
    instruction:
      'Viên bi nằm trên con dốc giữa hai mốc tròn chục (hoặc tròn trăm). Em đoán bi lăn về mốc nào rồi bấm. Ở đúng đỉnh dốc, bi lăn về mốc lớn hơn.',
  },
  examples: [
    {
      problem: 'Làm tròn số 3 064 đến hàng chục.',
      steps: [
        'Chữ số hàng đơn vị của 3 064 là 4.',
        '4 < 5 nên làm tròn xuống.',
        'Chữ số hàng đơn vị thành 0.',
      ],
      answer: 'Làm tròn 3 064 đến hàng chục được 3 060.',
    },
    {
      problem:
        'Thư viện có 5 247 cuốn sách. Bình nói "khoảng 5 200 cuốn". Bình làm tròn đến hàng nào?',
      steps: [
        'Làm tròn 5 247 đến hàng chục: chữ số hàng đơn vị là 7, tròn lên, được 5 250.',
        'Làm tròn 5 247 đến hàng trăm: chữ số hàng chục là 4, tròn xuống, được 5 200.',
        'Bình nói 5 200.',
      ],
      answer: 'Bình làm tròn số đến hàng trăm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Làm tròn số 2 826 đến hàng chục.',
      answer: 2830,
      hints: ['Em nhìn chữ số hàng đơn vị và so sánh với 5.'],
      solution: 'Chữ số hàng đơn vị là 6, 6 > 5 nên làm tròn lên. Được 2 830.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 3 524 đến hàng trăm.',
      answer: 3500,
      hints: ['Làm tròn đến hàng trăm thì nhìn chữ số hàng chục.'],
      solution: 'Chữ số hàng chục là 2, 2 < 5 nên làm tròn xuống. Được 3 500.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn số 75 đến hàng chục được số nào?',
      options: ['70', '80', '75'],
      answer: 1,
      hints: ['Chữ số hàng đơn vị là 5. Bằng 5 thì làm tròn lên hay xuống?'],
      solution: 'Chữ số hàng đơn vị là 5, không bé hơn 5 nên làm tròn lên. Được 80.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn số 850 đến hàng trăm được số nào?',
      options: ['800', '900', '850'],
      answer: 1,
      hints: ['Chữ số hàng chục là 5.'],
      solution: 'Chữ số hàng chục là 5, không bé hơn 5 nên làm tròn lên. Được 900.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi số với số làm tròn đến hàng chục của nó.',
      left: ['1 234', '1 238', '1 245', '1 256'],
      right: ['1 230', '1 240', '1 250', '1 260'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hàng đơn vị là 1, 2, 3, 4 thì tròn xuống; 5, 6, 7, 8, 9 thì tròn lên.'],
      solution: '1 234 → 1 230. 1 238 → 1 240. 1 245 → 1 250. 1 256 → 1 260.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 9 950 đến hàng trăm.',
      answer: 10000,
      hints: ['Chữ số hàng chục là 5 nên làm tròn lên.', 'Số tròn trăm ngay sau 9 900 là số nào?'],
      solution:
        'Chữ số hàng chục là 5 nên làm tròn lên: 9 950 nằm giữa 9 900 và 10 000. Được 10 000.',
    },
    {
      type: 'choice',
      prompt: 'Số nào khi làm tròn đến hàng trăm được 4 700?',
      options: ['4 718', '4 642', '4 750', '4 639'],
      answer: 0,
      hints: ['Em làm tròn từng số đến hàng trăm.'],
      solution:
        '4 718: hàng chục 1 < 5, tròn xuống được 4 700. 4 642 → 4 600, 4 750 → 4 800, 4 639 → 4 600.',
    },
  ],
  takeaways: [
    'Làm tròn đến hàng chục: nhìn chữ số hàng đơn vị.',
    'Làm tròn đến hàng trăm: nhìn chữ số hàng chục.',
    'Bé hơn 5 thì làm tròn xuống, còn lại (5, 6, 7, 8, 9) thì làm tròn lên.',
  ],
};
