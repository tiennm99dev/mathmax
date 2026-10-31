/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số có hai chữ số: bó 10 que tính thành 1 chục, biết số gồm mấy chục và mấy đơn vị, đọc và viết các số từ 11 đến 99.',
  intro:
    'Có rất nhiều que tính, đếm từng que thì lâu lắm! Em bó 10 que thành 1 chục để đếm nhanh hơn. Trong bài này, em học số có hai chữ số.',
  objectives: [
    'Biết 10 đơn vị là 1 chục.',
    'Biết số có hai chữ số gồm mấy chục và mấy đơn vị.',
    'Đọc và viết các số có hai chữ số.',
  ],
  sections: [
    {
      heading: 'Chục và đơn vị',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi que tính rời là 1 đơn vị. Em đếm đủ 10 que rồi bó lại thành 1 bó.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ghi nhớ',
          text: '10 đơn vị là 1 chục. 1 chục là 10.',
        },
        {
          type: 'p',
          text: '2 bó là 2 chục, tức là 20 que tính. 3 bó là 3 chục, tức là 30 que tính.',
        },
      ],
    },
    {
      heading: 'Các số từ 11 đến 20',
      blocks: [
        {
          type: 'p',
          text: '1 bó chục và thêm vài que rời cho ta các số từ 11 đến 19. 2 bó chục là 20.',
        },
        {
          type: 'table',
          head: ['Số', 'Gồm', 'Đọc là'],
          rows: [
            ['11', '1 chục và 1 đơn vị', 'mười một'],
            ['12', '1 chục và 2 đơn vị', 'mười hai'],
            ['14', '1 chục và 4 đơn vị', 'mười bốn'],
            ['15', '1 chục và 5 đơn vị', 'mười lăm'],
            ['19', '1 chục và 9 đơn vị', 'mười chín'],
            ['20', '2 chục', 'hai mươi'],
          ],
        },
      ],
    },
    {
      heading: 'Đọc, viết số có hai chữ số',
      blocks: [
        {
          type: 'p',
          text: 'Số có hai chữ số: chữ số bên trái chỉ số chục, chữ số bên phải chỉ số đơn vị.',
        },
        {
          type: 'table',
          head: ['Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
          rows: [
            ['2', '5', '25', 'hai mươi lăm'],
            ['4', '1', '41', 'bốn mươi mốt'],
            ['6', '4', '64', 'sáu mươi tư'],
            ['7', '0', '70', 'bảy mươi'],
            ['9', '9', '99', 'chín mươi chín'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý khi đọc',
          text: 'Số 1 ở cuối đọc là "mốt": 21 là hai mươi mốt. Nhưng 11 đọc là mười một. Số 5 ở cuối đọc là "lăm": 15 là mười lăm, 35 là ba mươi lăm. Số 4 sau "mươi" thường đọc là "tư": 54 là năm mươi tư.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Số 24 và số 42 khác nhau! 24 là 2 chục và 4 đơn vị. 42 là 4 chục và 2 đơn vị.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bó que tính',
    instruction:
      'Chạm + và − để thêm, bớt bó chục hoặc que rời, rồi xem số em ghép được. Đủ 10 que rời, em chạm "Bó thành 1 chục". Chọn "Ghép theo số" để ghép đúng số cho trước.',
  },
  examples: [
    {
      problem: 'Có 3 bó que tính, mỗi bó 1 chục, và 6 que rời. Đó là số nào?',
      steps: [
        '3 bó là 3 chục: em viết 3 ở hàng chục.',
        '6 que rời là 6 đơn vị: em viết 6 ở hàng đơn vị.',
        'Số đó là 36, đọc là ba mươi sáu.',
      ],
      answer: 'Số 36 (ba mươi sáu).',
    },
    {
      problem: 'Số 51 gồm mấy chục và mấy đơn vị? Đọc số 51.',
      steps: [
        'Chữ số bên trái là 5: có 5 chục.',
        'Chữ số bên phải là 1: có 1 đơn vị.',
        'Số 1 ở cuối đọc là "mốt".',
      ],
      answer: '51 gồm 5 chục và 1 đơn vị, đọc là năm mươi mốt.',
    },
    {
      problem: 'Viết số: bảy mươi lăm.',
      steps: ['"Bảy mươi" là 7 chục: viết 7.', '"Lăm" là 5 đơn vị: viết 5.'],
      answer: 'Số 75.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có bao nhiêu cây bút chì?',
      picture: 'pencil',
      answer: 12,
      hints: ['Đếm 10 cây trước: đó là 1 chục.', 'Rồi đếm tiếp: mười một, mười hai, ...'],
      solution: '10 cây là 1 chục, thêm 2 cây nữa. Có 12 cây bút chì.',
    },
    {
      type: 'count',
      prompt: 'Có bao nhiêu ngôi sao?',
      picture: 'star',
      answer: 15,
      hints: ['Đếm đủ 10 ngôi sao trước.', 'Đếm tiếp từ mười: mười một, mười hai, ...'],
      solution: '1 chục ngôi sao và 5 ngôi sao nữa. Có 15 ngôi sao, đọc là mười lăm.',
    },
    {
      type: 'choice',
      prompt: 'Số 35 gồm mấy chục và mấy đơn vị?',
      options: ['3 chục và 5 đơn vị', '5 chục và 3 đơn vị', '35 chục'],
      answer: 0,
      hints: ['Chữ số bên trái chỉ số chục.'],
      solution: 'Chữ số 3 ở hàng chục, chữ số 5 ở hàng đơn vị. 35 gồm 3 chục và 5 đơn vị.',
    },
    {
      type: 'choice',
      prompt: '4 chục và 7 đơn vị là số nào?',
      options: ['74', '47', '11'],
      answer: 1,
      hints: ['Số chục viết bên trái, số đơn vị viết bên phải.'],
      solution: 'Viết 4 ở hàng chục, 7 ở hàng đơn vị: số 47.',
    },
    {
      type: 'choice',
      prompt: 'Có 2 bó que tính, mỗi bó 1 chục, và 8 que rời. Có tất cả bao nhiêu que tính?',
      options: ['10', '28', '82'],
      answer: 1,
      hints: ['2 bó là 2 chục.', '8 que rời là 8 đơn vị.'],
      solution: '2 chục và 8 đơn vị là 28. Có 28 que tính.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với cách đọc.',
      left: ['21', '15', '54', '70'],
      right: ['năm mươi tư', 'bảy mươi', 'hai mươi mốt', 'mười lăm'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Số 1 ở cuối đọc là "mốt", số 5 ở cuối đọc là "lăm".'],
      solution: '21 là hai mươi mốt, 15 là mười lăm, 54 là năm mươi tư, 70 là bảy mươi.',
    },
    {
      type: 'choice',
      prompt: 'Số nào đọc là "sáu mươi mốt"?',
      options: ['16', '61', '601'],
      answer: 1,
      hints: ['"Sáu mươi" là 6 chục.', '"Mốt" là 1 đơn vị.'],
      solution: '6 chục và 1 đơn vị là số 61.',
    },
    {
      type: 'choice',
      prompt: '10 que tính rời bó lại thành mấy chục?',
      options: ['1 chục', '10 chục', '0 chục'],
      answer: 0,
      hints: ['Mỗi bó có 10 que.'],
      solution: '10 đơn vị là 1 chục.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự đếm, từ bé đến lớn.',
      items: ['30', '10', '50', '20', '40'],
      answer: [1, 3, 0, 4, 2],
      hints: ['Số nào có ít chục nhất?', '1 chục, 2 chục, 3 chục, ...'],
      solution: '10, 20, 30, 40, 50.',
    },
  ],
  takeaways: [
    '10 đơn vị là 1 chục.',
    'Số có hai chữ số: chữ số bên trái chỉ số chục, chữ số bên phải chỉ số đơn vị.',
    '25 gồm 2 chục và 5 đơn vị, đọc là hai mươi lăm.',
    'Chú ý đọc: 21 là hai mươi mốt, 15 là mười lăm, 54 là năm mươi tư.',
  ],
};
