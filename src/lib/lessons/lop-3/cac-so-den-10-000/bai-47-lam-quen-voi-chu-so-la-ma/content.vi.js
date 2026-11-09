/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ba chữ số La Mã I, V, X; đọc và viết các số từ 1 đến 20 bằng chữ số La Mã; xem đồng hồ ghi số La Mã.',
  intro:
    'Có những chiếc đồng hồ không ghi 1, 2, 3 mà ghi I, II, III. Đó là chữ số La Mã. Em cùng xếp que diêm thành chữ số La Mã nhé!',
  objectives: [
    'Biết ba chữ số La Mã I, V, X.',
    'Đọc, viết được các số từ 1 đến 20 bằng chữ số La Mã.',
    'Xem được giờ trên đồng hồ ghi số La Mã.',
  ],
  sections: [
    {
      heading: 'Ba chữ số La Mã',
      blocks: [
        {
          type: 'table',
          head: ['Chữ số La Mã', 'I', 'V', 'X'],
          rows: [['Giá trị', '1', '5', '10']],
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'I là một, V là năm, X là mười.',
        },
        {
          type: 'p',
          text: 'Ghép các chữ I, V, X ta viết được nhiều số khác.',
        },
      ],
    },
    {
      heading: 'Cách ghép chữ số La Mã',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chữ I đứng bên phải V hoặc X thì cộng thêm 1. Chữ I đứng bên trái V hoặc X thì bớt đi 1.',
        },
        {
          type: 'p',
          text: 'VI = 5 + 1 = 6. IV = 5 − 1 = 4.',
        },
        {
          type: 'p',
          text: 'XI = 10 + 1 = 11. IX = 10 − 1 = 9.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không viết một chữ bốn lần liền nhau. Số 4 viết là IV, không viết IIII.',
        },
      ],
    },
    {
      heading: 'Các số từ 1 đến 20',
      blocks: [
        {
          type: 'table',
          head: ['Số', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          rows: [['La Mã', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']],
        },
        {
          type: 'table',
          head: ['Số', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
          rows: [['La Mã', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX']],
        },
        {
          type: 'p',
          text: 'Số từ 11 đến 19: viết X trước, rồi viết số đơn vị. 13 = 10 + 3 nên viết XIII.',
        },
      ],
    },
    {
      heading: 'Đồng hồ số La Mã',
      blocks: [
        {
          type: 'p',
          text: 'Trên đồng hồ, kim dài chỉ XII và kim ngắn chỉ III thì đồng hồ chỉ 3 giờ.',
        },
        {
          type: 'p',
          text: 'Kim dài chỉ XII và kim ngắn chỉ IX thì đồng hồ chỉ 9 giờ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Que diêm La Mã',
    instruction:
      'Em nhìn đồng hồ, rồi bấm I, V, X để xếp que diêm thành số kim ngắn chỉ. Chữ I cần 1 que, chữ V và chữ X cần 2 que.',
  },
  examples: [
    {
      problem: 'Viết số 14 bằng chữ số La Mã.',
      steps: ['14 = 10 + 4.', '10 viết là X, 4 viết là IV.', 'Viết X trước, rồi viết IV.'],
      answer: '14 viết là XIV.',
    },
    {
      problem: 'Đọc số XIX.',
      steps: ['XIX gồm X và IX.', 'X là 10, IX là 10 − 1 = 9.', '10 + 9 = 19.'],
      answer: 'XIX là mười chín.',
    },
    {
      problem: 'Dùng 5 que diêm xếp số 8 bằng chữ số La Mã.',
      steps: ['8 = 5 + 3, viết là VIII.', 'Chữ V cần 2 que, ba chữ I cần 3 que.', '2 + 3 = 5 que.'],
      answer: 'Xếp VIII.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Em nối chữ số La Mã với giá trị của nó.',
      left: ['I', 'V', 'X'],
      right: ['1', '5', '10', '50'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['V là năm.'],
      solution: 'I là 1, V là 5, X là 10.',
    },
    {
      type: 'choice',
      prompt: 'Số 4 viết bằng chữ số La Mã là gì?',
      options: ['IV', 'VI', 'IIII'],
      answer: 0,
      hints: ['4 = 5 − 1. Chữ I bên trái V thì bớt đi 1.'],
      solution: 'IV = 5 − 1 = 4. Không viết IIII. VI là 6.',
    },
    {
      type: 'number',
      prompt: 'Số XVII là số nào?',
      answer: 17,
      hints: ['XVII gồm X, V, I, I.'],
      solution: 'XVII = 10 + 5 + 1 + 1 = 17.',
    },
    {
      type: 'choice',
      prompt: 'Số 13 viết bằng chữ số La Mã là gì?',
      options: ['XIII', 'XIIV', 'IIIX'],
      answer: 0,
      hints: ['13 = 10 + 3. Viết X trước.'],
      solution: '13 = 10 + 3: viết X, rồi III. Số 13 là XIII.',
    },
    {
      type: 'choice',
      prompt: 'Kim dài chỉ XII, kim ngắn chỉ VII. Đồng hồ chỉ mấy giờ?',
      options: ['7 giờ', '12 giờ', '6 giờ', '8 giờ'],
      answer: 0,
      hints: ['Kim ngắn chỉ giờ. VII = 5 + 1 + 1.'],
      solution: 'VII là 7. Kim ngắn chỉ VII, kim dài chỉ XII: đồng hồ chỉ 7 giờ.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số theo thứ tự từ bé đến lớn.',
      items: ['XIII', 'XIX', 'VIII', 'IV'],
      answer: [3, 2, 0, 1],
      hints: ['Em đổi từng số ra số thường: IV là 4.'],
      solution: 'IV = 4, VIII = 8, XIII = 13, XIX = 19. Thứ tự: IV, VIII, XIII, XIX.',
    },
    {
      type: 'match',
      prompt: 'Em nối số La Mã với số.',
      left: ['IX', 'XI', 'XX', 'XV'],
      right: ['9', '11', '20', '15', '19'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Chữ I bên trái X thì bớt 1, bên phải X thì thêm 1.'],
      solution: 'IX = 10 − 1 = 9. XI = 10 + 1 = 11. XX = 10 + 10 = 20. XV = 10 + 5 = 15.',
    },
    {
      type: 'choice',
      prompt: 'Với 5 que diêm, em xếp được số nào dưới đây?',
      options: ['XIII', 'XVIII', 'IX', 'XX'],
      answer: 0,
      hints: ['Chữ I cần 1 que, chữ V và chữ X cần 2 que.'],
      solution: 'XIII cần 2 + 1 + 1 + 1 = 5 que. XVIII cần 7 que, IX cần 3 que, XX cần 4 que.',
    },
  ],
  takeaways: [
    'I là 1, V là 5, X là 10.',
    'Chữ I bên phải V, X thì thêm 1; bên trái thì bớt 1: VI = 6, IV = 4.',
    'Từ 11 đến 20: XI, XII, ..., XIX, XX.',
  ],
};
