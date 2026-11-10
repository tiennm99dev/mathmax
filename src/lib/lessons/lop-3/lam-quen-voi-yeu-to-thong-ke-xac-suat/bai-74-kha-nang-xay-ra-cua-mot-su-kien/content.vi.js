/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dùng các từ chắc chắn, có thể, không thể để nói về khả năng xảy ra của một sự kiện, và kể ra các sự kiện có thể xảy ra khi tung đồng xu, gieo xúc xắc, lấy bóng.',
  intro:
    'Rô-bốt tung một đồng xu. Mặt trên sẽ là hình gì? Em không biết trước, nhưng em biết những gì có thể xảy ra. Hôm nay em học cách nói chắc chắn, có thể, không thể nhé!',
  objectives: [
    'Dùng đúng các từ chắc chắn, có thể, không thể.',
    'Kể ra các sự kiện có thể xảy ra khi tung đồng xu, gieo xúc xắc, lấy đồ vật.',
    'Giải thích vì sao một sự kiện chắc chắn, có thể hay không thể xảy ra.',
  ],
  sections: [
    {
      heading: 'Chắc chắn, có thể, không thể',
      blocks: [
        {
          type: 'p',
          text: 'Trong hộp có 3 quả bóng đỏ và 2 quả bóng xanh. Mai nhắm mắt, lấy ra 1 quả bóng.',
        },
        {
          type: 'list',
          items: [
            'Mai có thể lấy được bóng đỏ.',
            'Mai có thể lấy được bóng xanh.',
            'Mai không thể lấy được bóng vàng, vì trong hộp không có bóng vàng.',
          ],
        },
        {
          type: 'p',
          text: 'Nếu trong hộp chỉ có bóng đỏ thì Mai chắc chắn lấy được bóng đỏ.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Chắc chắn: lần nào cũng xảy ra. Có thể: có lúc xảy ra, có lúc không. Không thể: không bao giờ xảy ra.',
        },
      ],
    },
    {
      heading: 'Các sự kiện có thể xảy ra',
      blocks: [
        {
          type: 'p',
          text: 'Đồng xu của Rô-bốt có một mặt hình chiếc lá, một mặt hình ngôi sao. Khi tung đồng xu, mặt trên có thể là hình chiếc lá hoặc hình ngôi sao.',
        },
        {
          type: 'p',
          text: 'Con xúc xắc có 6 mặt: 1, 2, 3, 4, 5, 6 chấm. Khi gieo xúc xắc, mặt trên có thể là một trong 6 mặt đó.',
        },
        {
          type: 'table',
          head: ['Gieo xúc xắc một lần', 'Khả năng'],
          rows: [
            ['Mặt trên có 4 chấm', 'Có thể'],
            ['Mặt trên có 8 chấm', 'Không thể'],
            ['Mặt trên có từ 1 đến 6 chấm', 'Chắc chắn'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn biết một sự kiện có thể xảy ra không, em xem trong hộp, trên đồng xu, trên xúc xắc có những gì.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vòng quay may mắn',
    instruction:
      'Chạm vào các ô để đổi màu, bấm − hoặc + để đổi số ô. Chọn một màu, đoán kim dừng ở ô màu đó là chắc chắn, có thể hay không thể. Rồi bấm Quay hoặc Quay 10 lần để kiểm tra.',
  },
  examples: [
    {
      problem:
        'Rô-bốt bày trên khay 3 bánh táo và 1 bánh dâu. Mi nhắm mắt lấy 2 chiếc bánh. Những sự kiện nào có thể xảy ra?',
      steps: [
        'Khay có nhiều bánh táo, nên Mi có thể lấy được 2 bánh táo.',
        'Mi cũng có thể lấy được 1 bánh táo và 1 bánh dâu.',
        'Khay chỉ có 1 bánh dâu, nên Mi không thể lấy được 2 bánh dâu.',
      ],
      answer:
        'Có thể xảy ra: lấy được 2 bánh táo, hoặc 1 bánh táo và 1 bánh dâu. Không thể lấy được 2 bánh dâu.',
    },
    {
      problem:
        'Vòng quay có 4 ô: 3 ô đỏ và 1 ô xanh. Quay một lần. Kim dừng ở ô đỏ, ô xanh, ô vàng là chắc chắn, có thể hay không thể?',
      steps: [
        'Có ô đỏ và cả ô xanh, nên kim có thể dừng ở ô đỏ, cũng có thể dừng ở ô xanh.',
        'Vòng quay không có ô vàng nào.',
      ],
      answer: 'Kim có thể dừng ở ô đỏ, có thể dừng ở ô xanh, không thể dừng ở ô vàng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hộp có 5 quả bóng, quả nào cũng màu đỏ. Lấy ra 1 quả. Lấy được bóng đỏ là:',
      options: ['Chắc chắn', 'Có thể', 'Không thể'],
      answer: 0,
      hints: ['Trong hộp có bóng màu nào khác không?'],
      solution: 'Hộp chỉ có bóng đỏ, nên chắc chắn lấy được bóng đỏ.',
    },
    {
      type: 'choice',
      prompt: 'Hộp có 3 quả bóng đỏ và 2 quả bóng xanh. Lấy ra 1 quả. Lấy được bóng xanh là:',
      options: ['Có thể', 'Chắc chắn', 'Không thể'],
      answer: 0,
      hints: ['Trong hộp có bóng xanh không? Có bóng màu khác không?'],
      solution:
        'Hộp có bóng xanh và cả bóng đỏ. Em có thể lấy được bóng xanh, cũng có thể lấy được bóng đỏ.',
    },
    {
      type: 'choice',
      prompt: 'Hộp có 3 quả bóng đỏ và 2 quả bóng xanh. Lấy ra 1 quả. Lấy được bóng vàng là:',
      options: ['Không thể', 'Có thể', 'Chắc chắn'],
      answer: 0,
      hints: ['Trong hộp có quả bóng vàng nào không?'],
      solution: 'Hộp không có bóng vàng, nên không thể lấy được bóng vàng.',
    },
    {
      type: 'multi',
      prompt:
        'Đồng xu có một mặt hình chiếc lá, một mặt hình ngôi sao. Tung đồng xu, mặt trên có thể là hình gì? Chọn tất cả các ý đúng.',
      options: ['Hình chiếc lá', 'Hình ngôi sao', 'Hình bông hoa'],
      answers: [0, 1],
      hints: ['Đồng xu có những hình nào trên hai mặt?'],
      solution:
        'Mặt trên có thể là hình chiếc lá hoặc hình ngôi sao. Không thể là hình bông hoa, vì đồng xu không có hình đó.',
    },
    {
      type: 'choice',
      prompt:
        'Khay có 3 bánh táo và 1 bánh dâu. Mi nhắm mắt lấy 2 chiếc bánh. "Mi chắc chắn lấy được 2 bánh táo." Đúng hay sai?',
      options: ['Sai', 'Đúng'],
      answer: 0,
      hints: ['Mi có thể lấy được bánh dâu không?'],
      solution:
        'Sai. Mi có thể lấy được 1 bánh táo và 1 bánh dâu, nên không chắc chắn lấy được 2 bánh táo.',
    },
    {
      type: 'choice',
      prompt:
        'Khay có 3 bánh táo và 1 bánh dâu. Mi nhắm mắt lấy 2 chiếc bánh. "Mi không thể lấy được 2 bánh dâu." Đúng hay sai?',
      options: ['Đúng', 'Sai'],
      answer: 0,
      hints: ['Trên khay có mấy bánh dâu?'],
      solution: 'Đúng. Khay chỉ có 1 bánh dâu, nên Mi không thể lấy được 2 bánh dâu.',
    },
    {
      type: 'match',
      prompt: 'Gieo một con xúc xắc 6 mặt (1 đến 6 chấm). Nối mỗi sự kiện với khả năng xảy ra.',
      left: ['Mặt trên có 3 chấm', 'Mặt trên có 7 chấm', 'Mặt trên có ít hơn 7 chấm'],
      right: ['Chắc chắn', 'Có thể', 'Không thể'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Xúc xắc có những mặt nào? Mặt nhiều chấm nhất có mấy chấm?'],
      solution:
        'Có mặt 3 chấm nhưng còn các mặt khác: có thể. Không có mặt 7 chấm: không thể. Mặt nào cũng có ít hơn 7 chấm: chắc chắn.',
    },
    {
      type: 'choice',
      prompt: 'Vòng quay có 4 ô: 2 ô đỏ và 2 ô vàng. Quay một lần. Kim dừng ở ô xanh là:',
      options: ['Không thể', 'Có thể', 'Chắc chắn'],
      answer: 0,
      hints: ['Vòng quay có ô xanh nào không?'],
      solution: 'Vòng quay chỉ có ô đỏ và ô vàng, nên kim không thể dừng ở ô xanh.',
    },
    {
      type: 'choice',
      prompt:
        'Mũ của ảo thuật gia có 2 con thỏ trắng và 1 con thỏ nâu. Ông lấy ra cùng lúc 2 con. Sự kiện nào không thể xảy ra?',
      options: [
        'Lấy được 2 con thỏ nâu',
        'Lấy được 2 con thỏ trắng',
        'Lấy được 1 thỏ trắng và 1 thỏ nâu',
      ],
      answer: 0,
      hints: ['Trong mũ có mấy con thỏ nâu?'],
      solution:
        'Trong mũ chỉ có 1 con thỏ nâu, nên không thể lấy được 2 con thỏ nâu. Hai sự kiện kia đều có thể xảy ra.',
    },
  ],
  takeaways: [
    'Chắc chắn: lần nào cũng xảy ra.',
    'Có thể: có lúc xảy ra, có lúc không.',
    'Không thể: không bao giờ xảy ra.',
    'Muốn biết, em xem trong hộp, trên đồng xu, trên xúc xắc có những gì.',
  ],
};
