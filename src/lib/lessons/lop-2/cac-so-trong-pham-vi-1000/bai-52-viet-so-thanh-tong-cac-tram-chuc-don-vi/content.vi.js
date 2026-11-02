/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phân tích số có ba chữ số theo các hàng và viết số thành tổng các trăm, chục, đơn vị, ví dụ 345 = 300 + 40 + 5.',
  intro:
    'Sóc có 3 giỏ hạt, mỗi giỏ 100 hạt, thêm 4 túi, mỗi túi 10 hạt, và 5 hạt lẻ. Sóc có 345 hạt! Em tách số 345 thành các phần như vậy nhé.',
  objectives: [
    'Phân tích số có ba chữ số theo hàng trăm, hàng chục, hàng đơn vị.',
    'Viết số có ba chữ số thành tổng các trăm, chục, đơn vị.',
  ],
  sections: [
    {
      heading: 'Tách số theo các hàng',
      blocks: [
        {
          type: 'p',
          text: 'Số 345 gồm 3 trăm, 4 chục và 5 đơn vị. 3 trăm là 300, 4 chục là 40, 5 đơn vị là 5.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '345 = 300 + 40 + 5. Em viết số thành tổng các trăm, chục, đơn vị.',
        },
      ],
    },
    {
      heading: 'Khi số có chữ số 0',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Chữ số 0',
          text: 'Chữ số 0 cho biết hàng đó không có gì, nên em không viết vào tổng.',
        },
        {
          type: 'table',
          head: ['Số', 'Viết thành tổng'],
          rows: [
            ['814', '800 + 10 + 4'],
            ['840', '800 + 40'],
            ['408', '400 + 8'],
            ['481', '400 + 80 + 1'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Tách số',
    instruction:
      'Em chạm vào từng chữ số. Chữ số đó tách ra thành một phần của tổng. Chữ số 0 thì sao nhỉ? Em thử chạm xem!',
  },
  examples: [
    {
      problem: 'Viết số 765 thành tổng các trăm, chục, đơn vị.',
      steps: ['765 gồm 7 trăm, 6 chục, 5 đơn vị.', '7 trăm là 700, 6 chục là 60, 5 đơn vị là 5.'],
      answer: '765 = 700 + 60 + 5.',
    },
    {
      problem: 'Viết số 607 thành tổng các trăm, chục, đơn vị.',
      steps: ['607 gồm 6 trăm, 0 chục, 7 đơn vị.', 'Hàng chục là 0, em không viết vào tổng.'],
      answer: '607 = 600 + 7.',
    },
    {
      problem:
        'Sóc xếp đủ 100 hạt vào 1 giỏ, đủ 10 hạt vào 1 túi. Sóc có 1 giỏ, 3 túi và 2 hạt lẻ. Sóc có bao nhiêu hạt?',
      steps: ['1 giỏ là 100 hạt, 3 túi là 30 hạt, còn 2 hạt.', '100 + 30 + 2 = 132.'],
      answer: 'Sóc có 132 hạt.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Viết số 139 thành tổng.',
      options: ['100 + 30 + 9', '100 + 39 + 9', '1 + 3 + 9'],
      answer: 0,
      hints: ['139 gồm 1 trăm, 3 chục, 9 đơn vị.'],
      solution: '139 = 100 + 30 + 9.',
    },
    {
      type: 'choice',
      prompt: 'Viết số 408 thành tổng.',
      options: ['400 + 80', '40 + 8', '400 + 8'],
      answer: 2,
      hints: ['408 có 0 chục.'],
      solution: '408 gồm 4 trăm, 0 chục, 8 đơn vị, nên 408 = 400 + 8.',
    },
    {
      type: 'choice',
      prompt: 'Viết số 360 thành tổng.',
      options: ['300 + 60', '300 + 6', '30 + 60'],
      answer: 0,
      hints: ['360 có 0 đơn vị.'],
      solution: '360 gồm 3 trăm, 6 chục, 0 đơn vị, nên 360 = 300 + 60.',
    },
    {
      type: 'match',
      prompt: 'Em nối số với tổng của số đó.',
      left: ['481', '408', '480'],
      right: ['400 + 80', '400 + 80 + 1', '400 + 8'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Em nhìn chữ số hàng chục và hàng đơn vị của mỗi số.'],
      solution: '481 = 400 + 80 + 1. 408 = 400 + 8. 480 = 400 + 80.',
    },
    {
      type: 'number',
      prompt: '500 + 20 + 7 bằng bao nhiêu?',
      answer: 527,
      hints: ['Đó là 5 trăm, 2 chục và 7 đơn vị.'],
      solution: '500 + 20 + 7 = 527.',
    },
    {
      type: 'number',
      prompt: '600 + 7 bằng bao nhiêu?',
      answer: 607,
      hints: ['Đó là 6 trăm, 0 chục và 7 đơn vị.'],
      solution: '600 + 7 = 607.',
    },
    {
      type: 'choice',
      prompt: 'Số nào bằng 900 + 90 + 2?',
      options: ['992', '929', '912'],
      answer: 0,
      hints: ['900 là 9 trăm, 90 là 9 chục.'],
      solution: '900 + 90 + 2 = 992.',
    },
    {
      type: 'number',
      prompt:
        'Sóc có 2 giỏ, 1 túi và 3 hạt lẻ. Mỗi giỏ 100 hạt, mỗi túi 10 hạt. Sóc có bao nhiêu hạt?',
      answer: 213,
      hints: ['2 giỏ là 200 hạt, 1 túi là 10 hạt.', 'Em cộng: 200 + 10 + 3.'],
      solution: '200 + 10 + 3 = 213. Sóc có 213 hạt.',
    },
    {
      type: 'number',
      prompt:
        'Sóc có 310 hạt. Mỗi giỏ đựng 100 hạt, mỗi túi đựng 10 hạt. Sóc xếp được bao nhiêu giỏ đầy?',
      answer: 3,
      hints: ['310 = 300 + 10.', '300 là mấy trăm?'],
      solution: '310 = 300 + 10. 300 hạt xếp được 3 giỏ đầy, 10 hạt xếp vào 1 túi.',
    },
  ],
  takeaways: [
    'Viết số thành tổng: 345 = 300 + 40 + 5.',
    'Chữ số 0 thì không viết vào tổng: 408 = 400 + 8.',
  ],
};
