/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Góc nhọn, góc tù, góc bẹt: so sánh với góc vuông (90°). Góc nhọn bé hơn góc vuông, góc tù lớn hơn góc vuông và bé hơn góc bẹt, góc bẹt bằng hai góc vuông (180°).',
  intro:
    'Hai lưỡi kéo mở hẹp hay mở rộng tạo thành những góc khác nhau. Hôm nay em học góc nhọn, góc tù và góc bẹt, và so sánh chúng với góc vuông nhé!',
  objectives: [
    'Nhận biết góc nhọn, góc vuông, góc tù, góc bẹt.',
    'So sánh số đo của một góc với 90° để biết đó là góc gì.',
    'Dùng ê ke hoặc thước đo góc để kiểm tra.',
  ],
  sections: [
    {
      heading: 'Góc nhọn, góc tù',
      blocks: [
        {
          type: 'p',
          text: 'Góc vuông có số đo 90°. Em lấy góc vuông làm mốc để so sánh.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc nhọn',
          text: 'Góc nhọn bé hơn góc vuông. Số đo góc nhọn bé hơn 90°.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc tù',
          text: 'Góc tù lớn hơn góc vuông. Số đo góc tù lớn hơn 90° và bé hơn 180°.',
        },
        {
          type: 'p',
          text: 'Ví dụ: góc 56° là góc nhọn vì 56° < 90°. Góc 127° là góc tù vì 127° > 90°.',
        },
      ],
    },
    {
      heading: 'Góc bẹt',
      blocks: [
        {
          type: 'p',
          text: 'Khi hai cạnh OC và OD nằm trên cùng một đường thẳng, về hai phía của đỉnh O, ta có góc bẹt.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc bẹt',
          text: 'Góc bẹt bằng hai góc vuông. Số đo góc bẹt là 180°.',
        },
        {
          type: 'table',
          head: ['Góc', 'So với góc vuông', 'Số đo'],
          rows: [
            ['Góc nhọn', 'bé hơn góc vuông', 'bé hơn 90°'],
            ['Góc vuông', 'bằng góc vuông', '90°'],
            ['Góc tù', 'lớn hơn góc vuông', 'lớn hơn 90°, bé hơn 180°'],
            ['Góc bẹt', 'bằng hai góc vuông', '180°'],
          ],
        },
      ],
    },
    {
      heading: 'Kiểm tra bằng ê ke',
      blocks: [
        {
          type: 'p',
          text: 'Em đặt góc vuông của ê ke trùng với đỉnh góc, một cạnh ê ke nằm trên một cạnh của góc.',
        },
        {
          type: 'list',
          items: [
            'Cạnh kia của góc nằm trong góc vuông của ê ke: đó là góc nhọn.',
            'Cạnh kia của góc nằm trùng cạnh ê ke: đó là góc vuông.',
            'Cạnh kia của góc nằm ngoài góc vuông của ê ke: đó là góc tù hoặc góc bẹt.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay cạnh, đổi tên góc',
    instruction:
      'Em kéo đầu cạnh OB (hoặc bấm phím mũi tên) để xoay. Nét đứt màu xanh chỉ góc vuông. Xem tên góc đổi khi cạnh OB đi qua nét đứt. Sau đó em chọn "Xếp góc vào nhóm" để xếp các góc.',
  },
  examples: [
    {
      problem: 'Góc đỉnh O; cạnh OM, ON có số đo 127°. Đó là góc gì?',
      steps: ['Em so sánh 127° với 90°: 127° > 90°.', '127° cũng bé hơn 180°.'],
      answer: 'Góc đỉnh O; cạnh OM, ON là góc tù.',
    },
    {
      problem: 'Đồng hồ chỉ 2 giờ, 3 giờ, 6 giờ. Hai kim đồng hồ tạo thành góc gì?',
      steps: [
        'Lúc 2 giờ, hai kim tạo thành góc 60°. 60° < 90° nên đó là góc nhọn.',
        'Lúc 3 giờ, hai kim tạo thành góc 90°: góc vuông.',
        'Lúc 6 giờ, hai kim nằm trên một đường thẳng, tạo thành góc 180°: góc bẹt.',
      ],
      answer: '2 giờ: góc nhọn. 3 giờ: góc vuông. 6 giờ: góc bẹt.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Góc có số đo 56° là góc gì?',
      options: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      answer: 0,
      hints: ['Em so sánh 56° với 90°.'],
      solution: '56° < 90°, nên đó là góc nhọn.',
    },
    {
      type: 'choice',
      prompt: 'Góc có số đo 127° là góc gì?',
      options: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      answer: 2,
      hints: ['Em so sánh 127° với 90° và với 180°.'],
      solution: '127° > 90° và 127° < 180°, nên đó là góc tù.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi số đo với tên góc.',
      left: ['30°', '90°', '150°', '180°'],
      right: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Góc nhọn bé hơn 90°, góc tù lớn hơn 90°, góc bẹt bằng 180°.'],
      solution: '30° < 90°: góc nhọn. 90°: góc vuông. 150° > 90°: góc tù. 180°: góc bẹt.',
    },
    {
      type: 'multi',
      prompt: 'Em chọn tất cả các góc tù.',
      options: ['95°', '60°', '175°', '90°', '120°', '180°'],
      answers: [0, 2, 4],
      hints: ['Góc tù lớn hơn 90° nhưng bé hơn 180°.'],
      solution:
        '95°, 175°, 120° lớn hơn 90° và bé hơn 180°: đều là góc tù. 60° là góc nhọn, 90° là góc vuông, 180° là góc bẹt.',
    },
    {
      type: 'choice',
      prompt: 'Góc bẹt bằng mấy góc vuông?',
      options: ['Hai góc vuông', 'Một góc vuông', 'Ba góc vuông', 'Bốn góc vuông'],
      answer: 0,
      hints: ['Góc vuông là 90°, góc bẹt là 180°.'],
      solution: '90° + 90° = 180°. Góc bẹt bằng hai góc vuông.',
    },
    {
      type: 'choice',
      prompt: 'Đồng hồ chỉ 5 giờ. Hai kim đồng hồ tạo thành góc gì?',
      options: ['Góc tù', 'Góc nhọn', 'Góc vuông', 'Góc bẹt'],
      answer: 0,
      hints: [
        'Lúc 3 giờ hai kim tạo thành góc vuông, lúc 6 giờ hai kim tạo thành góc bẹt. 5 giờ nằm giữa hai lúc đó.',
      ],
      solution:
        'Lúc 5 giờ, hai kim tạo thành góc 150°. 150° > 90° và 150° < 180°, nên đó là góc tù.',
    },
    {
      type: 'choice',
      prompt: 'Đồng hồ chỉ 1 giờ. Hai kim đồng hồ tạo thành góc gì?',
      options: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      answer: 0,
      hints: ['Lúc 3 giờ hai kim tạo thành góc vuông. Lúc 1 giờ hai kim gần nhau hơn.'],
      solution: 'Lúc 1 giờ, hai kim tạo thành góc 30°. 30° < 90°, nên đó là góc nhọn.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các góc theo thứ tự từ bé đến lớn.',
      items: ['Góc bẹt', 'Góc nhọn 40°', 'Góc vuông', 'Góc tù 130°'],
      answer: [1, 2, 3, 0],
      hints: ['Góc vuông là 90°, góc bẹt là 180°.'],
      solution: '40° < 90° < 130° < 180°: góc nhọn 40°, góc vuông, góc tù 130°, góc bẹt.',
    },
    {
      type: 'number',
      prompt: 'Góc bẹt có số đo bao nhiêu độ? (Em viết số.)',
      answer: 180,
      unit: '°',
      hints: ['Góc bẹt bằng hai góc vuông, mỗi góc vuông 90°.'],
      solution: 'Góc bẹt bằng hai góc vuông: 90° + 90° = 180°.',
    },
  ],
  takeaways: [
    'Góc nhọn bé hơn góc vuông: bé hơn 90°.',
    'Góc tù lớn hơn góc vuông: lớn hơn 90° và bé hơn 180°.',
    'Góc bẹt bằng hai góc vuông: 180°.',
  ],
};
