/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Quan hệ giữa đơn vị, chục, trăm và nghìn: 10 đơn vị là 1 chục, 10 chục là 1 trăm, 10 trăm là 1 nghìn.',
  intro:
    'Mười khối nhỏ ghép lại thành một thanh. Mười thanh ghép thành một tấm. Mười tấm ghép thành một khối thật to! Em cùng ghép thử nhé.',
  objectives: [
    'Biết 10 đơn vị là 1 chục, 10 chục là 1 trăm, 10 trăm là 1 nghìn.',
    'Đếm theo chục và theo trăm.',
    'Đọc và viết số 1000.',
  ],
  sections: [
    {
      heading: 'Đơn vị, chục, trăm',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi khối nhỏ là 1 đơn vị. Mỗi thanh gồm 10 khối nhỏ, là 1 chục. Mỗi tấm gồm 10 thanh, là 1 trăm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '10 đơn vị = 1 chục. 10 chục = 1 trăm.',
        },
        {
          type: 'table',
          head: ['Có', 'Đọc là', 'Viết số'],
          rows: [
            ['1 đơn vị', 'một', '1'],
            ['1 chục', 'mười', '10'],
            ['1 trăm', 'một trăm', '100'],
          ],
        },
      ],
    },
    {
      heading: 'Một nghìn',
      blocks: [
        {
          type: 'p',
          text: 'Mười tấm trăm ghép lại được một khối to. Khối đó là 1 nghìn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '10 trăm = 1 nghìn. 1 nghìn viết là 1000, đọc là một nghìn.',
        },
      ],
    },
    {
      heading: 'Đếm theo chục, theo trăm',
      blocks: [
        {
          type: 'p',
          text: 'Đếm theo chục: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.',
        },
        {
          type: 'p',
          text: 'Đếm theo trăm: 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Để ý',
          text: 'Mỗi lần ghép đều cần đủ 10. Ghép xong, số khối ít đi nhưng giá trị vẫn như cũ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép khối',
    instruction:
      'Em thêm từng khối. Đủ 10 khối thì chạm "Ghép" để được một khối của hàng lớn hơn. Cứ thế ghép đến 1 nghìn nhé!',
  },
  examples: [
    {
      problem: 'Mỗi lọ có 100 viên kẹo. Có 4 lọ kẹo. Có tất cả bao nhiêu viên kẹo?',
      steps: ['Mỗi lọ là 1 trăm viên.', 'Em đếm theo trăm: 100, 200, 300, 400.'],
      answer: 'Có tất cả 400 viên kẹo.',
    },
    {
      problem: 'Mỗi hộp nhỏ có 10 chiếc bánh. Có 8 hộp nhỏ. Có tất cả bao nhiêu chiếc bánh?',
      steps: ['Mỗi hộp là 1 chục chiếc bánh.', 'Em đếm theo chục: 10, 20, 30, 40, 50, 60, 70, 80.'],
      answer: 'Có tất cả 80 chiếc bánh.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Em đếm các khối vuông nhé. Có mấy khối?',
      picture: 'block',
      answer: 10,
      choices: [8, 9, 10, 11],
      hints: ['Chạm vào từng khối và đếm.'],
      solution: 'Có 10 khối. 10 đơn vị = 1 chục.',
    },
    {
      type: 'choice',
      prompt: '10 chục bằng bao nhiêu?',
      options: ['1 chục', '1 trăm', '1 nghìn'],
      answer: 1,
      hints: ['Mười thanh chục ghép thành một tấm.'],
      solution: '10 chục = 1 trăm.',
    },
    {
      type: 'choice',
      prompt: '1 nghìn bằng mấy trăm?',
      options: ['1 trăm', '10 trăm', '100 trăm'],
      answer: 1,
      hints: ['Em đếm theo trăm từ 100 đến 1000: có mấy lần đếm?'],
      solution: '1 nghìn = 10 trăm.',
    },
    {
      type: 'match',
      prompt: 'Em nối cho bằng nhau.',
      left: ['10 đơn vị', '10 chục', '10 trăm'],
      right: ['1 chục', '1 trăm', '1 nghìn'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Cứ 10 khối của một hàng ghép thành 1 khối của hàng lớn hơn liền sau.'],
      solution: '10 đơn vị = 1 chục, 10 chục = 1 trăm, 10 trăm = 1 nghìn.',
    },
    {
      type: 'order',
      prompt: 'Em xếp từ bé đến lớn.',
      items: ['1 trăm', '1 đơn vị', '1 nghìn', '1 chục'],
      answer: [1, 3, 0, 2],
      hints: ['Bắt đầu từ khối nhỏ nhất.'],
      solution: '1 đơn vị, 1 chục, 1 trăm, 1 nghìn: tức là 1, 10, 100, 1000.',
    },
    {
      type: 'choice',
      prompt: '7 chục là số nào?',
      options: ['7', '70', '700'],
      answer: 1,
      hints: ['Em đếm theo chục 7 lần: 10, 20, ...'],
      solution: '7 chục là 70.',
    },
    {
      type: 'choice',
      prompt: '5 trăm là số nào?',
      options: ['5', '50', '500'],
      answer: 2,
      hints: ['Em đếm theo trăm 5 lần: 100, 200, ...'],
      solution: '5 trăm là 500.',
    },
    {
      type: 'number',
      prompt: 'Mỗi lọ có 100 viên kẹo. Có 7 lọ. Có tất cả bao nhiêu viên kẹo?',
      answer: 700,
      hints: ['Mỗi lọ là 1 trăm viên.', 'Em đếm theo trăm: 100, 200, 300, ...'],
      solution: '7 trăm là 700. Có tất cả 700 viên kẹo.',
    },
    {
      type: 'number',
      prompt: 'Mỗi hộp nhỏ có 10 chiếc bánh. Có 5 hộp. Có tất cả bao nhiêu chiếc bánh?',
      answer: 50,
      hints: ['Mỗi hộp là 1 chục chiếc bánh.', 'Em đếm theo chục: 10, 20, ...'],
      solution: '5 chục là 50. Có tất cả 50 chiếc bánh.',
    },
    {
      type: 'number',
      prompt: 'Em đếm theo trăm rồi điền số còn thiếu: 300, 400, ?, 600.',
      answer: 500,
      hints: ['Mỗi lần thêm 1 trăm.'],
      solution: '300, 400, 500, 600. Số còn thiếu là 500.',
    },
  ],
  takeaways: [
    '10 đơn vị = 1 chục.',
    '10 chục = 1 trăm.',
    '10 trăm = 1 nghìn. 1 nghìn viết là 1000.',
  ],
};
