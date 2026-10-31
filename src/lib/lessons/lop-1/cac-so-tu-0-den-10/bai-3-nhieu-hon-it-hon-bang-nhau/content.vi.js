/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh số lượng hai nhóm đồ vật bằng cách ghép đôi từng cái: nhóm còn thừa thì nhiều hơn, nhóm kia ít hơn, không thừa thì bằng nhau.',
  intro:
    'Mỗi chú mèo muốn ăn một con cá. Có đủ cá cho các chú mèo không? Em hãy ghép đôi mèo với cá để biết nhóm nào nhiều hơn, nhóm nào ít hơn nhé!',
  objectives: [
    'So sánh số lượng hai nhóm đồ vật bằng cách ghép đôi.',
    'Dùng đúng các từ: nhiều hơn, ít hơn, bằng nhau.',
  ],
  sections: [
    {
      heading: 'Ghép đôi để so sánh',
      blocks: [
        {
          type: 'p',
          text: 'Em nối mỗi đồ vật ở nhóm này với một đồ vật ở nhóm kia.',
        },
        {
          type: 'p',
          text: 'Mỗi đồ vật chỉ được nối một lần.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Nối xong, em nhìn xem nhóm nào còn đồ vật chưa được nối.',
        },
      ],
    },
    {
      heading: 'Nhiều hơn, ít hơn',
      blocks: [
        {
          type: 'p',
          text: 'Có 4 cái cốc và 3 cái thìa. Ghép mỗi cốc với một thìa, còn thừa 1 cái cốc.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nhiều hơn, ít hơn',
          text: 'Nhóm còn thừa có nhiều hơn. Số cốc nhiều hơn số thìa. Số thìa ít hơn số cốc.',
        },
      ],
    },
    {
      heading: 'Bằng nhau',
      blocks: [
        {
          type: 'p',
          text: 'Có 3 bạn và 3 cái mũ. Mỗi bạn đội một cái mũ, không thừa bạn nào, không thừa mũ nào.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bằng nhau',
          text: 'Ghép đôi vừa hết, không nhóm nào thừa: số bạn bằng số mũ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Nối từng cặp',
    instruction:
      'Chạm vào một đồ vật ở hàng trên, rồi chạm vào một đồ vật ở hàng dưới để nối dây. Nối hết các cặp, em xem nhóm nào còn thừa. Chọn "Bài khác" để chơi với nhóm mới.',
  },
  examples: [
    {
      problem:
        'Có 5 con thỏ 🐰🐰🐰🐰🐰 và 3 củ cà rốt 🥕🥕🥕. Số thỏ và số cà rốt, bên nào nhiều hơn?',
      steps: [
        'Ghép mỗi con thỏ với một củ cà rốt.',
        'Ghép được 3 cặp, còn thừa 2 con thỏ.',
        'Nhóm thỏ còn thừa nên nhiều hơn.',
      ],
      answer: 'Số thỏ nhiều hơn số cà rốt. Số cà rốt ít hơn số thỏ.',
    },
    {
      problem: 'Có 4 cái bát và 4 đôi đũa. Số bát so với số đôi đũa thế nào?',
      steps: ['Đặt mỗi đôi đũa cạnh một cái bát.', 'Vừa hết, không thừa bát, không thừa đũa.'],
      answer: 'Số bát bằng số đôi đũa.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '🐱🐱🐱🐱 và 🐟🐟🐟. Mỗi con mèo ăn một con cá. Số mèo so với số cá thế nào?',
      options: ['Số mèo nhiều hơn số cá.', 'Số mèo ít hơn số cá.', 'Số mèo bằng số cá.'],
      answer: 0,
      hints: ['Nối mỗi con mèo với một con cá.', 'Nhóm nào còn thừa?'],
      solution: 'Nối được 3 cặp, còn thừa 1 con mèo. Số mèo nhiều hơn số cá.',
    },
    {
      type: 'choice',
      prompt: '🦋🦋 và 🌸🌸🌸🌸. Mỗi con bướm đậu một bông hoa. Số bướm so với số hoa thế nào?',
      options: ['Số bướm nhiều hơn số hoa.', 'Số bướm ít hơn số hoa.', 'Số bướm bằng số hoa.'],
      answer: 1,
      hints: ['Ghép mỗi con bướm với một bông hoa.', 'Còn thừa hoa hay thừa bướm?'],
      solution: 'Ghép được 2 cặp, còn thừa 2 bông hoa. Số bướm ít hơn số hoa.',
    },
    {
      type: 'choice',
      prompt: '🍎🍎🍎🍎🍎 và 🍐🍐🍐🍐🍐. Số táo so với số lê thế nào?',
      options: ['Số táo nhiều hơn số lê.', 'Số táo ít hơn số lê.', 'Số táo bằng số lê.'],
      answer: 2,
      hints: ['Ghép mỗi quả táo với một quả lê.', 'Có nhóm nào còn thừa không?'],
      solution: 'Ghép được 5 cặp, vừa hết, không thừa quả nào. Số táo bằng số lê.',
    },
    {
      type: 'choice',
      prompt: 'Có 3 bạn và 5 cái ghế. Mỗi bạn ngồi một ghế. Còn thừa gì?',
      options: ['Thừa 2 bạn.', 'Thừa 2 cái ghế.', 'Không thừa gì.'],
      answer: 1,
      hints: ['Mỗi bạn ngồi một ghế, vậy dùng mấy cái ghế?'],
      solution: '3 bạn ngồi 3 ghế, còn thừa 2 cái ghế. Số ghế nhiều hơn số bạn.',
    },
    {
      type: 'choice',
      prompt: 'Có 6 cái cốc và 4 cái thìa. Câu nào đúng?',
      options: ['Số thìa nhiều hơn số cốc.', 'Số thìa ít hơn số cốc.', 'Số thìa bằng số cốc.'],
      answer: 1,
      hints: ['Ghép mỗi thìa với một cốc.', 'Còn thừa cốc, vậy nhóm nào ít hơn?'],
      solution: 'Ghép 4 cặp, còn thừa 2 cái cốc. Số cốc nhiều hơn, nên số thìa ít hơn số cốc.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cặp nhóm với câu đúng.',
      left: ['3 con gà và 3 hạt thóc', '4 con gà và 2 hạt thóc', '1 con gà và 5 hạt thóc'],
      right: ['Số gà bằng số thóc.', 'Số gà nhiều hơn số thóc.', 'Số gà ít hơn số thóc.'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Ghép mỗi con gà với một hạt thóc, xem nhóm nào thừa.'],
      solution:
        '3 gà, 3 thóc: vừa hết, bằng nhau. 4 gà, 2 thóc: thừa gà, số gà nhiều hơn. 1 gà, 5 thóc: thừa thóc, số gà ít hơn.',
    },
    {
      type: 'choice',
      prompt: 'Có 4 bông hoa. Cần mấy cái lọ để mỗi lọ cắm một bông, vừa đủ, không thừa?',
      options: ['3 cái lọ', '4 cái lọ', '5 cái lọ'],
      answer: 1,
      hints: ['Vừa đủ nghĩa là số lọ bằng số hoa.'],
      solution: 'Số lọ phải bằng số hoa, nên cần 4 cái lọ.',
    },
  ],
  takeaways: [
    'Muốn so sánh hai nhóm, em ghép đôi từng đồ vật.',
    'Nhóm còn thừa có nhiều hơn, nhóm kia có ít hơn.',
    'Ghép vừa hết, không thừa: hai nhóm bằng nhau.',
  ],
};
