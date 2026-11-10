/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng các số có nhiều chữ số: đặt tính sao cho các chữ số cùng hàng thẳng cột, cộng từ phải sang trái, được 10 trở lên thì viết chữ số hàng đơn vị và nhớ 1 sang hàng bên trái.',
  intro:
    'Tuần đầu nhà máy làm được 367 859 chai nước. Tuần sau làm được 541 728 chai. Cả hai tuần làm được bao nhiêu chai? Em cùng đặt tính để cộng nhé!',
  objectives: [
    'Đặt tính rồi tính được phép cộng các số có nhiều chữ số.',
    'Cộng có nhớ đúng, không quên số nhớ.',
    'Giải được bài toán có lời văn bằng phép cộng.',
  ],
  sections: [
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        { type: 'p', text: 'Em tính 367 859 + 541 728.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đặt tính: viết số hạng này dưới số hạng kia sao cho các chữ số cùng hàng thẳng cột. Viết dấu +, kẻ vạch ngang.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tính: cộng từ phải sang trái, bắt đầu từ hàng đơn vị.',
        },
        {
          type: 'table',
          head: ['Hàng', 'Em làm'],
          rows: [
            ['Đơn vị', '9 cộng 8 bằng 17, viết 7, nhớ 1.'],
            ['Chục', '5 cộng 2 bằng 7, thêm 1 bằng 8, viết 8.'],
            ['Trăm', '8 cộng 7 bằng 15, viết 5, nhớ 1.'],
            ['Nghìn', '7 cộng 1 bằng 8, thêm 1 bằng 9, viết 9.'],
            ['Chục nghìn', '6 cộng 4 bằng 10, viết 0, nhớ 1.'],
            ['Trăm nghìn', '3 cộng 5 bằng 8, thêm 1 bằng 9, viết 9.'],
          ],
        },
        { type: 'p', text: 'Vậy 367 859 + 541 728 = 909 587.' },
      ],
    },
    {
      heading: 'Cộng có nhớ',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hai chữ số cùng hàng cộng lại được 10 trở lên: em viết chữ số hàng đơn vị, nhớ 1 sang hàng bên trái.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Ở hàng bên trái, em nhớ cộng thêm 1. Quên số nhớ là kết quả sai.',
        },
        {
          type: 'p',
          text: 'Số hạng có ít chữ số hơn vẫn viết thẳng cột từ hàng đơn vị: 47 282 + 2 514 = 49 796.',
        },
      ],
    },
    {
      heading: 'Cộng nhẩm số tròn',
      blocks: [
        {
          type: 'p',
          text: '300 000 + 200 000 = ? Em nhẩm: 3 trăm nghìn + 2 trăm nghìn = 5 trăm nghìn.',
        },
        { type: 'p', text: 'Vậy 300 000 + 200 000 = 500 000.' },
      ],
    },
  ],
  explore: {
    title: 'Cộng từng hàng',
    instruction:
      'Em chạm chữ số đúng để viết kết quả từng hàng, bắt đầu từ hàng đơn vị. Khi có nhớ, số 1 hiện lên ở cột bên trái.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 139 820 + 240 134.',
      steps: [
        'Viết 240 134 dưới 139 820, các chữ số cùng hàng thẳng cột.',
        '0 cộng 4 bằng 4, viết 4.',
        '2 cộng 3 bằng 5, viết 5.',
        '8 cộng 1 bằng 9, viết 9.',
        '9 cộng 0 bằng 9, viết 9.',
        '3 cộng 4 bằng 7, viết 7.',
        '1 cộng 2 bằng 3, viết 3.',
      ],
      answer: '139 820 + 240 134 = 379 954.',
    },
    {
      problem: 'Đặt tính rồi tính: 482 824 + 420 546.',
      steps: [
        '4 cộng 6 bằng 10, viết 0, nhớ 1.',
        '2 cộng 4 bằng 6, thêm 1 bằng 7, viết 7.',
        '8 cộng 5 bằng 13, viết 3, nhớ 1.',
        '2 cộng 0 bằng 2, thêm 1 bằng 3, viết 3.',
        '8 cộng 2 bằng 10, viết 0, nhớ 1.',
        '4 cộng 4 bằng 8, thêm 1 bằng 9, viết 9.',
      ],
      answer: '482 824 + 420 546 = 903 370.',
    },
    {
      problem:
        'Trong 1 phút, vệ tinh màu xanh bay được 474 000 m. Vệ tinh màu đỏ bay được xa hơn vệ tinh màu xanh 201 km. Hỏi trong 1 phút, vệ tinh màu đỏ bay được bao nhiêu mét?',
      steps: [
        'Đổi: 201 km = 201 000 m.',
        'Vệ tinh đỏ bay xa hơn, em làm phép cộng.',
        '474 000 + 201 000 = 675 000 (m).',
      ],
      answer: 'Vệ tinh màu đỏ bay được 675 000 m.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 3 246 + 4 721 = ?',
      answer: 7967,
      hints: ['Cộng từ hàng đơn vị: 6 cộng 1 bằng 7.', 'Phép cộng này không có nhớ.'],
      solution: '6 + 1 = 7; 4 + 2 = 6; 2 + 7 = 9; 3 + 4 = 7. Vậy 3 246 + 4 721 = 7 967.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 47 282 + 2 514 = ?',
      answer: 49796,
      hints: [
        'Viết 2 514 thẳng cột từ hàng đơn vị, dưới 47 282.',
        'Ở hàng chục nghìn chỉ có chữ số 4, em hạ 4.',
      ],
      solution: '2 + 4 = 6; 8 + 1 = 9; 2 + 5 = 7; 7 + 2 = 9; hạ 4. Vậy 47 282 + 2 514 = 49 796.',
    },
    {
      type: 'choice',
      prompt: '215 382 + 235 595 = ?',
      options: ['450 977', '440 877', '450 987', '451 977'],
      answer: 0,
      hints: [
        'Hàng chục: 8 cộng 9 bằng 17, viết 7, nhớ 1.',
        'Hàng nghìn: 5 cộng 5 bằng 10, viết 0, nhớ 1.',
      ],
      solution:
        '2 + 5 = 7; 8 + 9 = 17, viết 7, nhớ 1; 3 + 5 = 8, thêm 1 bằng 9; 5 + 5 = 10, viết 0, nhớ 1; 1 + 3 = 4, thêm 1 bằng 5; 2 + 2 = 4. Vậy 215 382 + 235 595 = 450 977. Số 440 877 là kết quả khi quên số nhớ.',
    },
    {
      type: 'match',
      prompt: 'Em tính nhẩm rồi nối phép cộng với kết quả.',
      left: ['300 000 + 200 000', '150 000 + 50 000', '400 000 + 600 000', '70 000 + 30 000'],
      right: ['500 000', '200 000', '1 000 000', '100 000', '600 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Em nhẩm theo trăm nghìn hoặc chục nghìn: 4 trăm nghìn + 6 trăm nghìn = 10 trăm nghìn.',
      ],
      solution:
        '300 000 + 200 000 = 500 000; 150 000 + 50 000 = 200 000; 400 000 + 600 000 = 1 000 000; 70 000 + 30 000 = 100 000.',
    },
    {
      type: 'choice',
      prompt:
        'Ba xô sữa: xô A có 9 260 + 4 740 ml, xô B có 7 405 + 7 405 ml, xô C có 6 834 + 6 818 ml. Xô nào chứa nhiều sữa nhất?',
      options: ['Xô B', 'Xô A', 'Xô C'],
      answer: 0,
      hints: ['Em tính số sữa trong từng xô, rồi so sánh.'],
      solution:
        'Xô A: 9 260 + 4 740 = 14 000 ml. Xô B: 7 405 + 7 405 = 14 810 ml. Xô C: 6 834 + 6 818 = 13 652 ml. Xô B chứa nhiều sữa nhất, xô C chứa ít nhất.',
    },
    {
      type: 'choice',
      prompt: 'Phép cộng nào có nhớ ở hàng đơn vị?',
      options: ['52 318 + 4 627', '3 246 + 4 721', '12 340 + 5 105'],
      answer: 0,
      hints: ['Em cộng hai chữ số hàng đơn vị của từng phép tính. Được 10 trở lên là có nhớ.'],
      solution: 'Hàng đơn vị: 8 + 7 = 15, có nhớ. Còn 6 + 1 = 7 và 0 + 5 = 5 không có nhớ.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các tổng từ bé đến lớn.',
      items: ['99 999 + 1', '120 000 + 5 000', '100 000 + 30 000'],
      answer: [0, 1, 2],
      hints: ['Em tính từng tổng trước, rồi so sánh.'],
      solution:
        '99 999 + 1 = 100 000; 120 000 + 5 000 = 125 000; 100 000 + 30 000 = 130 000. Vậy 100 000 < 125 000 < 130 000.',
    },
    {
      type: 'number',
      prompt:
        'Trang trại thứ nhất nuôi 125 460 con gà. Trang trại thứ hai nuôi nhiều hơn trang trại thứ nhất 28 750 con gà. Hỏi trang trại thứ hai nuôi bao nhiêu con gà?',
      answer: 154210,
      unit: 'con',
      hints: [
        'Nhiều hơn thì em làm phép cộng.',
        'Đặt tính 125 460 + 28 750. Phép cộng có nhớ ở hàng chục, hàng trăm và hàng nghìn.',
      ],
      solution: '125 460 + 28 750 = 154 210 (con). Trang trại thứ hai nuôi 154 210 con gà.',
    },
  ],
  takeaways: [
    'Đặt tính: các chữ số cùng hàng thẳng cột.',
    'Cộng từ phải sang trái, bắt đầu từ hàng đơn vị.',
    'Được 10 trở lên: viết chữ số hàng đơn vị, nhớ 1 sang hàng bên trái.',
  ],
};
