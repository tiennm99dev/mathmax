/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết một phần hai, một phần ba, một phần tư đến một phần chín: chia hình thành các phần bằng nhau, tô màu một phần, biết viết, đọc và tìm một phần mấy của một nhóm đồ vật.',
  intro:
    'Mẹ cắt chiếc bánh thành 4 phần bằng nhau. Em ăn 1 phần. Em đã ăn một phần mấy chiếc bánh? Em cùng cắt bánh và tô màu để biết nhé!',
  objectives: [
    'Nhận biết các phần bằng nhau của một hình.',
    'Viết và đọc một phần hai, một phần ba, ..., một phần chín.',
    'Tìm một phần mấy của một nhóm đồ vật.',
  ],
  sections: [
    {
      heading: 'Một phần hai',
      blocks: [
        { type: 'p', text: 'Chia hình tròn thành 2 phần bằng nhau. Tô màu 1 phần.' },
        { type: 'p', text: 'Đã tô màu một phần hai hình tròn.' },
        { type: 'callout', tone: 'theorem', text: 'Một phần hai viết là $\\dfrac{1}{2}$.' },
      ],
    },
    {
      heading: 'Một phần ba, một phần tư, một phần năm',
      blocks: [
        { type: 'p', text: 'Chia hình thành 3 phần bằng nhau, tô màu 1 phần: đó là một phần ba.' },
        { type: 'p', text: 'Chia hình thành 4 phần bằng nhau, tô màu 1 phần: đó là một phần tư.' },
        { type: 'p', text: 'Chia hình thành 5 phần bằng nhau, tô màu 1 phần: đó là một phần năm.' },
        {
          type: 'table',
          head: ['Viết', 'Đọc'],
          rows: [
            ['$\\dfrac{1}{3}$', 'một phần ba'],
            ['$\\dfrac{1}{4}$', 'một phần tư'],
            ['$\\dfrac{1}{5}$', 'một phần năm'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Chia thành 4 phần, em đọc là một phần tư.',
        },
      ],
    },
    {
      heading: 'Một phần sáu đến một phần chín',
      blocks: [
        { type: 'p', text: 'Em làm tương tự khi chia hình thành 6, 7, 8 hay 9 phần bằng nhau.' },
        { type: 'widget', name: 'mot-phan' },
      ],
    },
    {
      heading: 'Các phần phải bằng nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các phần phải bằng nhau thì em mới đếm số phần để gọi một phần mấy.',
        },
        {
          type: 'p',
          text: 'Một hình có 3 phần, một phần to và hai phần nhỏ. Phần tô màu không phải là một phần ba.',
        },
      ],
    },
    {
      heading: 'Một phần mấy của một nhóm đồ vật',
      blocks: [
        { type: 'p', text: 'Có 15 quả táo. Em chia đều thành 3 phần. Mỗi phần có 5 quả táo.' },
        { type: 'p', text: 'Mỗi phần là $\\dfrac{1}{3}$ số quả táo.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm $\\dfrac{1}{3}$ số quả táo, em lấy số quả táo chia cho 3: 15 : 3 = 5.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cắt bánh và chia đều',
    instruction:
      'Cắt bánh: chọn số phần, rồi chạm vào 1 phần để tô màu. Chia đều: chọn số đĩa, chia từng lượt đến hết, rồi chạm vào 1 đĩa. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem:
        'Hình chữ nhật được chia thành 6 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy của hình?',
      steps: ['Em đếm: hình có 6 phần bằng nhau.', 'Có 1 phần được tô màu.'],
      answer: 'Đã tô màu $\\dfrac{1}{6}$ hình, đọc là một phần sáu.',
    },
    {
      problem: 'Có 16 cái kẹo. Chia thành 4 phần bằng nhau. Mỗi phần có mấy cái kẹo?',
      steps: ['Em làm phép chia: 16 : 4 = 4.', 'Mỗi phần là $\\dfrac{1}{4}$ số cái kẹo.'],
      answer: 'Mỗi phần có 4 cái kẹo.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Chiếc bánh được chia thành 4 phần bằng nhau. Em lấy 1 phần. Em lấy một phần mấy chiếc bánh?',
      options: ['$\\dfrac{1}{2}$', '$\\dfrac{1}{3}$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{5}$'],
      answer: 2,
      hints: ['Bánh được chia thành mấy phần bằng nhau?'],
      solution: 'Bánh có 4 phần bằng nhau, lấy 1 phần. Đó là $\\dfrac{1}{4}$ chiếc bánh.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cách viết với cách đọc đúng.',
      left: ['$\\dfrac{1}{2}$', '$\\dfrac{1}{3}$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{5}$'],
      right: ['một phần năm', 'một phần tư', 'một phần ba', 'một phần hai'],
      pairs: [
        [0, 3],
        [1, 2],
        [2, 1],
        [3, 0],
      ],
      hints: ['Số ở dưới cho biết hình được chia thành mấy phần bằng nhau.'],
      solution:
        '$\\dfrac{1}{2}$: một phần hai. $\\dfrac{1}{3}$: một phần ba. $\\dfrac{1}{4}$: một phần tư. $\\dfrac{1}{5}$: một phần năm.',
    },
    {
      type: 'choice',
      prompt: '$\\dfrac{1}{6}$ đọc thế nào?',
      options: ['Một phần sáu', 'Sáu phần một', 'Một phần năm', 'Một phần bảy'],
      answer: 0,
      hints: ['Em đọc "một phần" trước, rồi đọc số ở dưới.'],
      solution: '$\\dfrac{1}{6}$ đọc là một phần sáu.',
    },
    {
      type: 'choice',
      prompt:
        'Một hình được chia thành 3 phần: một phần to và hai phần nhỏ bằng nhau. Tô màu 1 phần. Đã tô màu $\\dfrac{1}{3}$ hình, đúng hay sai?',
      options: ['Đúng', 'Sai'],
      answer: 1,
      hints: ['Các phần có bằng nhau không?'],
      solution: 'Sai. Ba phần không bằng nhau, nên phần tô màu không phải là $\\dfrac{1}{3}$ hình.',
    },
    {
      type: 'choice',
      prompt:
        'Hình tròn được chia thành 8 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy của hình?',
      options: ['$\\dfrac{1}{7}$', '$\\dfrac{1}{8}$', '$\\dfrac{1}{9}$', '$\\dfrac{1}{6}$'],
      answer: 1,
      hints: ['Em đếm cả phần được tô màu và phần không tô màu.'],
      solution: 'Hình có 8 phần bằng nhau, tô màu 1 phần: $\\dfrac{1}{8}$ hình.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước để có một phần tư của một hình.',
      items: [
        'Viết $\\dfrac{1}{4}$, đọc là một phần tư',
        'Chia hình thành 4 phần bằng nhau',
        'Tô màu 1 phần',
      ],
      answer: [1, 2, 0],
      hints: ['Em phải chia hình trước khi tô màu.'],
      solution: 'Chia hình thành 4 phần bằng nhau, tô màu 1 phần, rồi viết $\\dfrac{1}{4}$.',
    },
    {
      type: 'number',
      prompt: 'Có 12 quả cam, chia thành 3 phần bằng nhau. Mỗi phần có mấy quả cam?',
      answer: 4,
      unit: 'quả',
      hints: ['Em làm phép chia.', 'Lấy 12 chia cho 3.'],
      solution: '12 : 3 = 4 (quả).',
    },
    {
      type: 'count',
      prompt:
        'Có 20 quả dâu tây, chia đều thành 5 phần. Dưới đây là 1 phần. Em đếm xem có mấy quả.',
      picture: 'strawberry',
      answer: 4,
      choices: [3, 4, 5, 6],
      hints: ['Em đếm từng quả.'],
      solution: '20 : 5 = 4. Vậy $\\dfrac{1}{5}$ số quả dâu tây là 4 quả.',
    },
    {
      type: 'choice',
      prompt:
        'Có 8 hạt dẻ, chia đều thành 4 phần. Em khoanh vào 1 phần. Em đã khoanh vào một phần mấy số hạt dẻ?',
      options: ['$\\dfrac{1}{2}$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{6}$', '$\\dfrac{1}{8}$'],
      answer: 1,
      hints: ['Em đếm số phần được chia, không đếm số hạt dẻ.'],
      solution:
        'Chia đều thành 4 phần, khoanh vào 1 phần: đó là $\\dfrac{1}{4}$ số hạt dẻ. Mỗi phần có 8 : 4 = 2 hạt.',
    },
    {
      type: 'number',
      prompt: 'Có 20 quả cam. $\\dfrac{1}{2}$ số quả cam là mấy quả?',
      answer: 10,
      unit: 'quả',
      hints: ['Chia đều 20 quả cam thành 2 phần.'],
      solution: '20 : 2 = 10 (quả).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi câu với số đúng.',
      left: [
        '$\\dfrac{1}{3}$ của 18 quả',
        '$\\dfrac{1}{5}$ của 15 quả',
        '$\\dfrac{1}{4}$ của 8 quả',
        '$\\dfrac{1}{2}$ của 14 quả',
      ],
      right: ['3 quả', '6 quả', '2 quả', '7 quả'],
      pairs: [
        [0, 1],
        [1, 0],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em lấy số quả chia cho số ở dưới.'],
      solution: '18 : 3 = 6. 15 : 5 = 3. 8 : 4 = 2. 14 : 2 = 7.',
    },
  ],
  takeaways: [
    'Chia hình thành các phần bằng nhau, tô màu 1 phần: đó là một phần mấy.',
    '$\\dfrac{1}{4}$ đọc là một phần tư, $\\dfrac{1}{5}$ đọc là một phần năm.',
    'Muốn tìm một phần mấy của một nhóm đồ vật, em chia đều nhóm đó.',
  ],
};
