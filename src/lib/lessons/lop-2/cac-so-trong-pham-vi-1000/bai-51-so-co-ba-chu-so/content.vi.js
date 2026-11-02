/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary: 'Đọc và viết số có ba chữ số; biết chữ số hàng trăm, hàng chục, hàng đơn vị của một số.',
  intro:
    '2 tấm trăm, 4 thanh chục và 3 khối nhỏ. Đó là số nào nhỉ? Em xếp chúng vào bảng là đọc được ngay: hai trăm bốn mươi ba!',
  objectives: [
    'Đọc và viết được số có ba chữ số.',
    'Biết chữ số hàng trăm, hàng chục, hàng đơn vị của số đó.',
  ],
  sections: [
    {
      heading: 'Đọc, viết số có ba chữ số',
      blocks: [
        {
          type: 'p',
          text: 'Số 243 gồm 2 trăm, 4 chục và 3 đơn vị. Em đọc là hai trăm bốn mươi ba.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Viết số và đọc số từ trái sang phải: hàng trăm, hàng chục, rồi hàng đơn vị.',
        },
        {
          type: 'table',
          head: ['Trăm', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
          rows: [
            ['2', '4', '3', '243', 'hai trăm bốn mươi ba'],
            ['2', '3', '5', '235', 'hai trăm ba mươi lăm'],
            ['3', '1', '0', '310', 'ba trăm mười'],
            ['4', '1', '1', '411', 'bốn trăm mười một'],
            ['2', '0', '5', '205', 'hai trăm linh năm'],
          ],
        },
      ],
    },
    {
      heading: 'Khi đọc số, em chú ý',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Chữ số 0 ở hàng chục',
          text: 'Hàng chục là 0 thì đọc "linh": 205 đọc là hai trăm linh năm, 803 đọc là tám trăm linh ba.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chữ số 0 ở hàng đơn vị',
          text: 'Hàng đơn vị là 0 thì không đọc: 560 đọc là năm trăm sáu mươi.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chữ số cuối',
          text: 'Số 251 đọc là hai trăm năm mươi mốt. Số 235 đọc là hai trăm ba mươi lăm. Số 724 đọc là bảy trăm hai mươi tư.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng các hàng',
    instruction:
      'Em kéo từng khối vào đúng cột, hoặc chạm vào khối. Tấm trăm vào cột Trăm, thanh chục vào cột Chục, khối đơn vị vào cột Đơn vị.',
  },
  examples: [
    {
      problem: 'Viết và đọc số gồm 7 trăm, 4 chục, 9 đơn vị.',
      steps: [
        'Viết lần lượt: chữ số 7, chữ số 4, chữ số 9.',
        'Số đó là 749.',
        'Đọc từ hàng trăm: bảy trăm bốn mươi chín.',
      ],
      answer: '749, đọc là bảy trăm bốn mươi chín.',
    },
    {
      problem: 'Viết và đọc số gồm 8 trăm, 0 chục, 3 đơn vị.',
      steps: [
        'Viết lần lượt: chữ số 8, chữ số 0, chữ số 3.',
        'Số đó là 803.',
        'Hàng chục là 0 nên em đọc "linh": tám trăm linh ba.',
      ],
      answer: '803, đọc là tám trăm linh ba.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Em viết số: bảy trăm hai mươi tư.',
      answer: 724,
      hints: ['Bảy trăm là chữ số 7 ở hàng trăm.', 'Hai mươi tư là 2 chục và 4 đơn vị.'],
      solution: 'Bảy trăm hai mươi tư viết là 724.',
    },
    {
      type: 'number',
      prompt: 'Em viết số: một trăm linh bảy.',
      answer: 107,
      hints: ['"Linh" cho biết hàng chục là chữ số 0.'],
      solution: 'Một trăm linh bảy gồm 1 trăm, 0 chục, 7 đơn vị. Viết là 107.',
    },
    {
      type: 'number',
      prompt: 'Số gồm 1 trăm, 1 chục, 4 đơn vị là số nào?',
      answer: 114,
      hints: ['Viết chữ số hàng trăm trước, rồi đến hàng chục, hàng đơn vị.'],
      solution: 'Số đó là 114, đọc là một trăm mười bốn.',
    },
    {
      type: 'number',
      prompt: 'Số gồm 5 trăm, 6 chục, 0 đơn vị là số nào?',
      answer: 560,
      hints: ['Hàng đơn vị có 0 đơn vị, em viết chữ số 0 ở cuối.'],
      solution: 'Số đó là 560, đọc là năm trăm sáu mươi.',
    },
    {
      type: 'match',
      prompt: 'Em nối số với cách đọc.',
      left: ['247', '472', '724'],
      right: ['bảy trăm hai mươi tư', 'hai trăm bốn mươi bảy', 'bốn trăm bảy mươi hai'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Em nhìn chữ số hàng trăm trước.'],
      solution:
        '247: hai trăm bốn mươi bảy. 472: bốn trăm bảy mươi hai. 724: bảy trăm hai mươi tư.',
    },
    {
      type: 'choice',
      prompt: 'Số 170 đọc là gì?',
      options: ['một trăm bảy mươi', 'một trăm linh bảy', 'bảy trăm mười'],
      answer: 0,
      hints: ['Chữ số 0 ở hàng đơn vị thì không đọc.'],
      solution: '170 gồm 1 trăm, 7 chục, 0 đơn vị. Đọc là một trăm bảy mươi.',
    },
    {
      type: 'choice',
      prompt: 'Số 411 đọc là gì?',
      options: ['bốn trăm mười một', 'bốn trăm mười mốt', 'bốn trăm linh một'],
      answer: 0,
      hints: ['Sau "mười", chữ số 1 đọc là "một".'],
      solution: '411 gồm 4 trăm, 1 chục, 1 đơn vị. Đọc là bốn trăm mười một.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 635, chữ số 3 ở hàng nào?',
      options: ['Hàng trăm', 'Hàng chục', 'Hàng đơn vị'],
      answer: 1,
      hints: ['Đếm từ phải sang trái: hàng đơn vị, hàng chục, hàng trăm.'],
      solution: '635 gồm 6 trăm, 3 chục, 5 đơn vị. Chữ số 3 ở hàng chục.',
    },
    {
      type: 'choice',
      prompt: 'Số 905 có chữ số hàng chục là chữ số nào?',
      options: ['9', '0', '5'],
      answer: 1,
      hints: ['Hàng chục nằm ở giữa.'],
      solution: '905 gồm 9 trăm, 0 chục, 5 đơn vị. Chữ số hàng chục là 0.',
    },
    {
      type: 'number',
      prompt: 'Em đếm thêm rồi điền số còn thiếu: 348, 349, ?, 351.',
      answer: 350,
      hints: ['Mỗi số hơn số đứng trước 1 đơn vị.'],
      solution: '348, 349, 350, 351. Số còn thiếu là 350.',
    },
  ],
  takeaways: [
    'Viết và đọc số từ hàng trăm, đến hàng chục, rồi hàng đơn vị.',
    'Hàng chục là 0 thì đọc "linh": 205 là hai trăm linh năm.',
  ],
};
