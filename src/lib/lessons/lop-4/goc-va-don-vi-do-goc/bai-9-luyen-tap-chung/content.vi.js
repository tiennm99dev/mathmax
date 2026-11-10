/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Góc và đơn vị đo góc: đo góc bằng thước đo góc, đơn vị độ, nhận biết góc nhọn, góc vuông, góc tù, góc bẹt, tìm các góc bằng nhau và tính số đo của hai góc ghép lại.',
  intro:
    'Em đã biết đo góc bằng thước đo góc và gọi tên góc nhọn, góc vuông, góc tù, góc bẹt. Giờ em luyện tập tất cả nhé!',
  objectives: [
    'Đo và đọc số đo góc bằng thước đo góc.',
    'Gọi đúng tên góc nhọn, góc vuông, góc tù, góc bẹt.',
    'Tìm các góc bằng nhau, tính số đo của hai góc ghép lại.',
  ],
  sections: [
    {
      heading: 'Nhắc lại cách đo góc',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt tâm thước đo góc trùng với đỉnh của góc.',
            'Xoay thước để một cạnh của góc đi qua vạch 0.',
            'Đọc số ở vạch mà cạnh kia đi qua, trên vòng số có vạch 0 ở cạnh thứ nhất.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đơn vị đo góc là độ (°). Hai góc có cùng số đo là hai góc bằng nhau.',
        },
      ],
    },
    {
      heading: 'Nhắc lại tên các góc',
      blocks: [
        {
          type: 'table',
          head: ['Góc', 'Số đo'],
          rows: [
            ['Góc nhọn', 'bé hơn 90°'],
            ['Góc vuông', '90°'],
            ['Góc tù', 'lớn hơn 90°, bé hơn 180°'],
            ['Góc bẹt', '180°'],
          ],
        },
        {
          type: 'p',
          text: 'Hai góc chung một cạnh, nằm cạnh nhau, ghép lại thành một góc lớn. Số đo góc lớn bằng tổng số đo hai góc: 60° + 90° = 150°.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Em đọc câu hỏi, nhìn hình rồi bấm vào đáp án. Nếu chưa đúng, em xem gợi ý và thử lại. Làm xong, em bấm "Làm bộ bài khác" để luyện thêm.',
  },
  examples: [
    {
      problem:
        'Rô-bốt vẽ góc đỉnh O; cạnh OM, ON bằng 60° và góc đỉnh O; cạnh ON, OP bằng 90°, hai góc chung cạnh ON. Góc đỉnh O; cạnh OM, OP bằng bao nhiêu độ? Đó là góc gì?',
      steps: [
        'Góc đỉnh O; cạnh OM, OP gồm hai góc ghép lại.',
        'Số đo của nó là 60° + 90° = 150°.',
        '150° > 90° và 150° < 180°.',
      ],
      answer: 'Góc đỉnh O; cạnh OM, OP bằng 150°, đó là góc tù.',
    },
    {
      problem:
        'Đo được: góc đỉnh S bằng 90°, góc đỉnh D bằng 90°, góc đỉnh G bằng 120°, góc đỉnh L bằng 120°. Tìm các cặp góc bằng nhau.',
      steps: [
        'Góc đỉnh S và góc đỉnh D cùng bằng 90°.',
        'Góc đỉnh G và góc đỉnh L cùng bằng 120°.',
      ],
      answer:
        'Góc đỉnh S bằng góc đỉnh D (hai góc vuông). Góc đỉnh G bằng góc đỉnh L (hai góc tù).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Cạnh OA đi qua vạch 0 của vòng số trong. Cạnh OB đi qua vạch 120 ở vòng trong và vạch 60 ở vòng ngoài. Góc đỉnh O; cạnh OA, OB là:',
      options: ['120°, góc tù', '60°, góc nhọn', '120°, góc nhọn', '60°, góc tù'],
      answer: 0,
      hints: ['Em đọc trên vòng số có vạch 0 ở cạnh OA, rồi so sánh số đo với 90°.'],
      solution: 'Đọc vòng trong: góc bằng 120°. 120° > 90° và 120° < 180°, nên đó là góc tù.',
    },
    {
      type: 'match',
      prompt: 'Em nối hai góc bằng nhau.',
      left: ['Góc đỉnh S: 90°', 'Góc đỉnh G: 120°'],
      right: ['Góc đỉnh D: 90°', 'Góc đỉnh L: 120°', 'Góc đỉnh T: 60°'],
      pairs: [
        [0, 0],
        [1, 1],
      ],
      hints: ['Hai góc bằng nhau có cùng số đo.'],
      solution: 'Góc đỉnh S và góc đỉnh D cùng bằng 90°. Góc đỉnh G và góc đỉnh L cùng bằng 120°.',
    },
    {
      type: 'number',
      prompt:
        'Góc đỉnh O; cạnh OM, ON bằng 60°. Góc đỉnh O; cạnh ON, OP bằng 90°. Hai góc chung cạnh ON. Góc đỉnh O; cạnh OM, OP bằng bao nhiêu độ? (Em viết số.)',
      answer: 150,
      hints: ['Góc lớn gồm hai góc nhỏ ghép lại.'],
      solution: '60° + 90° = 150°.',
    },
    {
      type: 'number',
      prompt:
        'Góc đỉnh O; cạnh OM, ON bằng 40°. Góc đỉnh O; cạnh ON, OP bằng 50°. Hai góc chung cạnh ON. Góc đỉnh O; cạnh OM, OP bằng bao nhiêu độ? (Em viết số.)',
      answer: 90,
      hints: ['Em cộng số đo hai góc nhỏ.'],
      solution: '40° + 50° = 90°. Góc đỉnh O; cạnh OM, OP là góc vuông.',
    },
    {
      type: 'choice',
      prompt: 'Đồng hồ chỉ 9 giờ. Hai kim đồng hồ tạo thành góc gì?',
      options: ['Góc vuông', 'Góc nhọn', 'Góc tù', 'Góc bẹt'],
      answer: 0,
      hints: ['Kim phút chỉ số 12, kim giờ chỉ số 9. Lúc 3 giờ hai kim tạo thành góc gì?'],
      solution: 'Lúc 9 giờ, hai kim tạo thành góc 90°, đó là góc vuông.',
    },
    {
      type: 'multi',
      prompt: 'Em chọn tất cả các góc nhọn.',
      options: ['45°', '100°', '89°', '90°', '15°', '170°'],
      answers: [0, 2, 4],
      hints: ['Góc nhọn bé hơn 90°.'],
      solution:
        '45°, 89°, 15° bé hơn 90°: đều là góc nhọn. 90° là góc vuông, 100° và 170° là góc tù.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các góc theo thứ tự từ lớn đến bé.',
      items: ['90°', '180°', '45°', '175°'],
      answer: [1, 3, 0, 2],
      hints: ['Góc bẹt là góc lớn nhất trong các góc này.'],
      solution: '180° > 175° > 90° > 45°.',
    },
    {
      type: 'choice',
      prompt: 'Góc lớn hơn góc vuông và bé hơn góc bẹt là góc gì?',
      options: ['Góc tù', 'Góc nhọn', 'Góc vuông', 'Góc bẹt'],
      answer: 0,
      hints: ['Góc vuông là 90°, góc bẹt là 180°.'],
      solution: 'Góc lớn hơn 90° và bé hơn 180° là góc tù.',
    },
    {
      type: 'number',
      prompt: 'Lúc 6 giờ, hai kim đồng hồ tạo thành góc bao nhiêu độ? (Em viết số.)',
      answer: 180,
      hints: ['Lúc 6 giờ, hai kim nằm trên một đường thẳng.'],
      solution: 'Hai kim nằm trên một đường thẳng, tạo thành góc bẹt: 180°.',
    },
    {
      type: 'choice',
      prompt: 'Cánh cửa mở hé, tạo với khung cửa một góc 30°. Đó là góc gì?',
      options: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      answer: 0,
      hints: ['Em so sánh 30° với 90°.'],
      solution: '30° < 90°, nên đó là góc nhọn.',
    },
    {
      type: 'text',
      prompt: 'Góc bẹt bằng mấy góc vuông? (Em viết số hoặc chữ.)',
      accept: ['2', 'hai', 'hai góc vuông', '2 góc vuông'],
      hints: ['Góc vuông là 90°, góc bẹt là 180°.'],
      solution: '90° + 90° = 180°. Góc bẹt bằng hai góc vuông.',
    },
    {
      type: 'choice',
      prompt:
        'Hai góc vuông chung một cạnh, nằm hai bên cạnh chung, ghép lại thành một góc. Góc đó là góc gì?',
      options: ['Góc bẹt', 'Góc tù', 'Góc vuông', 'Góc nhọn'],
      answer: 0,
      hints: ['Em cộng số đo hai góc vuông.'],
      solution: '90° + 90° = 180°. Hai góc vuông ghép lại thành góc bẹt.',
    },
  ],
  takeaways: [
    'Đo góc: tâm thước ở đỉnh góc, một cạnh qua vạch 0, đọc số ở vạch cạnh kia đi qua.',
    'Góc nhọn bé hơn 90°, góc vuông 90°, góc tù lớn hơn 90° và bé hơn 180°, góc bẹt 180°.',
    'Hai góc ghép lại có số đo bằng tổng số đo hai góc.',
  ],
};
