/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đo góc bằng thước đo góc: đặt tâm thước trùng đỉnh góc, một cạnh đi qua vạch 0, đọc số ở vạch cạnh kia đi qua. Đơn vị đo góc là độ, kí hiệu °; góc vuông bằng 90°.',
  intro:
    'Một chiếc kéo mở rộng, một chiếc kéo mở hẹp. Làm sao biết góc nào lớn hơn, lớn hơn bao nhiêu? Hôm nay em làm quen với thước đo góc và đơn vị đo góc là độ nhé!',
  objectives: [
    'Nhận biết thước đo góc và đơn vị đo góc là độ (°).',
    'Dùng thước đo góc để đo và đọc số đo của một góc.',
    'Biết góc vuông có số đo 90°.',
  ],
  sections: [
    {
      heading: 'Thước đo góc và đơn vị độ',
      blocks: [
        {
          type: 'p',
          text: 'Để đo góc, người ta dùng thước đo góc. Thước có dạng nửa hình tròn.',
        },
        {
          type: 'p',
          text: 'Trên thước có các vạch chia từ 0 đến 180. Thước có hai vòng số: vòng trong và vòng ngoài. Hai vòng số đếm theo hai chiều ngược nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Đơn vị đo góc là độ. Độ viết tắt là °. Ví dụ: 60° đọc là sáu mươi độ.',
        },
        {
          type: 'p',
          text: 'Góc đỉnh O; cạnh OA, OB có số đo là 60°. Em viết: góc đỉnh O; cạnh OA, OB bằng 60°.',
        },
      ],
    },
    {
      heading: 'Cách đo góc',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt thước đo góc sao cho tâm của thước trùng với đỉnh O của góc.',
            'Xoay thước để cạnh OA đi qua vạch 0 của thước.',
            'Cạnh OB đi qua vạch nào trên vòng số có vạch 0 ở cạnh OA, thì số ở vạch đó là số đo của góc.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Em đọc trên vòng số có vạch 0 nằm trên cạnh OA. Nếu đọc nhầm vòng số kia, em sẽ được số sai.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Góc vuông có số đo 90°.',
        },
      ],
    },
    {
      heading: 'Góc giữa hai kim đồng hồ',
      blocks: [
        {
          type: 'p',
          text: 'Em đặt tâm thước ở tâm đồng hồ, cạnh thước có vạch 0 nằm theo kim phút. Kim giờ đi qua vạch nào thì đó là số đo góc.',
        },
        {
          type: 'table',
          head: ['Đồng hồ chỉ', 'Góc giữa hai kim'],
          rows: [
            ['2 giờ', '60°'],
            ['3 giờ', '90°'],
            ['4 giờ', '120°'],
            ['6 giờ', '180°'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Thước đo góc ảo',
    instruction:
      'Em kéo đầu cạnh OB (hoặc bấm phím mũi tên) để xoay. Em đọc số trên vòng số tô đỏ, có vạch 0 nằm trên cạnh OA. Xoay cho đến khi được số đo cần tìm. Sau đó em chọn "Đọc thước đo góc" để tự đọc số đo.',
  },
  examples: [
    {
      problem:
        'Thước đo góc đặt lên góc đỉnh N; cạnh NM, NH. Cạnh NM đi qua vạch 0 của vòng số trong. Cạnh NH đi qua vạch 60 ở vòng trong và vạch 120 ở vòng ngoài. Góc này bằng bao nhiêu độ?',
      steps: [
        'Tâm thước trùng với đỉnh N.',
        'Vạch 0 của vòng số trong nằm trên cạnh NM, nên em đọc vòng số trong.',
        'Cạnh NH đi qua vạch 60 của vòng số trong.',
      ],
      answer: 'Góc đỉnh N; cạnh NM, NH bằng 60°.',
    },
    {
      problem: 'Đồng hồ chỉ 4 giờ. Hai kim đồng hồ tạo thành góc bằng bao nhiêu độ?',
      steps: [
        'Em đặt tâm thước ở tâm đồng hồ, vạch 0 nằm theo kim phút (chỉ số 12).',
        'Kim giờ chỉ số 4 và đi qua vạch 120 của vòng số đó.',
      ],
      answer: 'Hai kim đồng hồ tạo thành góc bằng 120°.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đơn vị đo góc là gì?',
      options: ['Độ', 'Xăng-ti-mét', 'Ki-lô-gam', 'Lít'],
      answer: 0,
      hints: ['Xăng-ti-mét đo độ dài, ki-lô-gam đo cân nặng, lít đo dung tích.'],
      solution: 'Đơn vị đo góc là độ, kí hiệu là °.',
    },
    {
      type: 'choice',
      prompt: 'Một trăm hai mươi độ viết là:',
      options: ['120°', '120 cm', '12°', '102°'],
      answer: 0,
      hints: ['Kí hiệu độ là một vòng tròn nhỏ viết ở trên, bên phải số.'],
      solution: 'Một trăm hai mươi độ viết là 120°.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các bước đo góc đỉnh O; cạnh OA, OB theo đúng thứ tự.',
      items: [
        'Đọc số ở vạch mà cạnh OB đi qua.',
        'Đặt tâm thước trùng với đỉnh O.',
        'Xoay thước để cạnh OA đi qua vạch 0.',
      ],
      answer: [1, 2, 0],
      hints: ['Việc đầu tiên là đặt tâm thước vào đỉnh của góc.'],
      solution:
        'Đặt tâm thước trùng với đỉnh O, xoay thước để cạnh OA đi qua vạch 0, rồi đọc số ở vạch mà cạnh OB đi qua.',
    },
    {
      type: 'choice',
      prompt:
        'Cạnh OA đi qua vạch 0 của vòng số trong. Cạnh OB đi qua vạch 35 ở vòng trong và vạch 145 ở vòng ngoài. Góc đỉnh O; cạnh OA, OB bằng bao nhiêu độ?',
      options: ['35°', '145°', '45°', '180°'],
      answer: 0,
      hints: ['Em đọc trên vòng số có vạch 0 nằm trên cạnh OA.'],
      solution: 'Vạch 0 của vòng trong nằm trên cạnh OA, nên em đọc vòng trong: góc bằng 35°.',
    },
    {
      type: 'number',
      prompt:
        'Cạnh OA đi qua vạch 0 của vòng số ngoài. Cạnh OB đi qua vạch 45 ở vòng ngoài và vạch 135 ở vòng trong. Góc đỉnh O; cạnh OA, OB bằng bao nhiêu độ? (Em viết số.)',
      answer: 45,
      unit: '°',
      hints: ['Vạch 0 nằm trên cạnh OA thuộc vòng số nào?'],
      solution: 'Vạch 0 của vòng ngoài nằm trên cạnh OA, nên em đọc vòng ngoài: góc bằng 45°.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi đồng hồ với góc tạo bởi hai kim.',
      left: ['3 giờ', '6 giờ', '2 giờ', '4 giờ'],
      right: ['90°', '180°', '60°', '120°', '30°'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Lúc 3 giờ hai kim tạo thành góc vuông. Từ một số đến số liền sau trên mặt đồng hồ là 30°.',
      ],
      solution: '3 giờ: 90°. 6 giờ: 180°. 2 giờ: 2 × 30° = 60°. 4 giờ: 4 × 30° = 120°.',
    },
    {
      type: 'choice',
      prompt: 'Góc vuông có số đo bao nhiêu độ?',
      options: ['90°', '60°', '100°', '180°'],
      answer: 0,
      hints: ['Lúc 3 giờ, hai kim đồng hồ tạo thành một góc vuông.'],
      solution: 'Góc vuông có số đo 90°.',
    },
    {
      type: 'multi',
      prompt:
        'Hình tứ giác ABCD có: góc đỉnh A bằng 90°, góc đỉnh B bằng 60°, góc đỉnh C bằng 90°, góc đỉnh D bằng 120°. Em chọn các góc vuông.',
      options: ['Góc đỉnh A', 'Góc đỉnh B', 'Góc đỉnh C', 'Góc đỉnh D'],
      answers: [0, 2],
      hints: ['Góc vuông có số đo 90°.'],
      solution: 'Góc đỉnh A và góc đỉnh C đều bằng 90°, nên là góc vuông.',
    },
    {
      type: 'choice',
      prompt:
        'Góc đỉnh N bằng 60°, góc đỉnh H bằng 90°, góc đỉnh C bằng 35°, góc đỉnh D bằng 45°. Góc nào bé nhất?',
      options: ['Góc đỉnh C', 'Góc đỉnh N', 'Góc đỉnh H', 'Góc đỉnh D'],
      answer: 0,
      hints: ['Em so sánh các số đo: 60, 90, 35, 45.'],
      solution: '35° < 45° < 60° < 90°. Góc đỉnh C bằng 35° là góc bé nhất.',
    },
  ],
  takeaways: [
    'Để đo góc, em dùng thước đo góc.',
    'Đơn vị đo góc là độ, kí hiệu °.',
    'Đặt tâm thước ở đỉnh góc, một cạnh qua vạch 0, đọc số ở vạch cạnh kia đi qua.',
    'Góc vuông có số đo 90°.',
  ],
};
