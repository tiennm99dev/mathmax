/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tính chất giao hoán (a + b = b + a) và tính chất kết hợp ((a + b) + c = a + (b + c)) của phép cộng, dùng để tính bằng cách thuận tiện.',
  intro:
    '98 + 46 + 2 + 54 bằng bao nhiêu? Em có thể đổi chỗ và nhóm các số hạng để được những số tròn trăm. Tính nhẩm sẽ rất nhanh!',
  objectives: [
    'Nhận biết tính chất giao hoán của phép cộng.',
    'Nhận biết tính chất kết hợp của phép cộng.',
    'Vận dụng hai tính chất để tính bằng cách thuận tiện.',
  ],
  sections: [
    {
      heading: 'Tính chất giao hoán',
      blocks: [
        { type: 'p', text: 'Em so sánh giá trị của a + b và b + a.' },
        {
          type: 'table',
          head: ['a', 'b', 'a + b', 'b + a'],
          rows: [
            ['20', '30', '50', '50'],
            ['350', '250', '600', '600'],
            ['1 208', '2 764', '3 972', '3 972'],
          ],
        },
        { type: 'p', text: 'Giá trị của a + b và b + a luôn bằng nhau: a + b = b + a.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi.',
        },
      ],
    },
    {
      heading: 'Tính chất kết hợp',
      blocks: [
        { type: 'p', text: 'Em so sánh giá trị của (a + b) + c và a + (b + c).' },
        {
          type: 'table',
          head: ['a', 'b', 'c', '(a + b) + c', 'a + (b + c)'],
          rows: [
            ['5', '4', '6', '9 + 6 = 15', '5 + 10 = 15'],
            ['35', '15', '20', '50 + 20 = 70', '35 + 35 = 70'],
            ['28', '49', '51', '77 + 51 = 128', '28 + 100 = 128'],
          ],
        },
        { type: 'p', text: 'Hai giá trị luôn bằng nhau: (a + b) + c = a + (b + c).' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của số thứ hai và số thứ ba.',
        },
      ],
    },
    {
      heading: 'Tính bằng cách thuận tiện',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          text: 'Em đổi chỗ và nhóm các số hạng có tổng tròn chục, tròn trăm, tròn nghìn để tính nhẩm cho nhanh.',
        },
        {
          type: 'p',
          text: '98 + 46 + 2 + 54 = (98 + 2) + (46 + 54) = 100 + 100 = 200.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đổi chỗ để được số tròn',
    instruction:
      'Em chạm một số, rồi chạm số khác để đổi chỗ hai số. Mỗi cặp trong ngoặc có tổng tròn chục, tròn trăm là em thắng. Tổng luôn giữ nguyên.',
  },
  examples: [
    {
      problem: 'Tính bằng cách thuận tiện: 2 023 + 3 541 + 1 977.',
      steps: [
        'Em thấy 2 023 + 1 977 = 4 000 là số tròn nghìn.',
        'Đổi chỗ: 2 023 + 3 541 + 1 977 = 2 023 + 1 977 + 3 541.',
        'Nhóm: (2 023 + 1 977) + 3 541 = 4 000 + 3 541 = 7 541.',
      ],
      answer: '2 023 + 3 541 + 1 977 = 7 541.',
    },
    {
      problem: 'Tính bằng cách thuận tiện: 125 + 99 + 375 + 1.',
      steps: [
        '125 + 375 = 500 và 99 + 1 = 100.',
        '125 + 99 + 375 + 1 = (125 + 375) + (99 + 1).',
        '= 500 + 100 = 600.',
      ],
      answer: '125 + 99 + 375 + 1 = 600.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Biết 4 268 + 3 917 = 8 185. Không cần tính, 3 917 + 4 268 = ?',
      answer: 8185,
      hints: ['Hai tổng có cùng các số hạng, chỉ đổi chỗ.'],
      solution: 'Khi đổi chỗ các số hạng thì tổng không thay đổi: 3 917 + 4 268 = 8 185.',
    },
    {
      type: 'text',
      prompt: 'Điền chữ thích hợp: a + b = b + ?',
      accept: ['a'],
      hints: ['Đây là tính chất giao hoán: đổi chỗ hai số hạng.'],
      solution: 'a + b = b + a.',
    },
    {
      type: 'number',
      prompt: '(45 + 18) + 82 = 45 + (18 + ?). Số cần điền là số nào?',
      answer: 82,
      hints: ['Tính chất kết hợp: (a + b) + c = a + (b + c).'],
      solution: '(45 + 18) + 82 = 45 + (18 + 82). Số cần điền là 82.',
    },
    {
      type: 'match',
      prompt: 'Nối hai số có tổng là số tròn trăm.',
      left: ['37', '125', '480', '299'],
      right: ['63', '75', '20', '1', '50'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhìn chữ số hàng đơn vị trước: 7 cần thêm 3 để tròn chục.'],
      solution: '37 + 63 = 100; 125 + 75 = 200; 480 + 20 = 500; 299 + 1 = 300.',
    },
    {
      type: 'choice',
      prompt: 'Cách nào tính 47 + 85 + 53 thuận tiện nhất?',
      options: ['(47 + 53) + 85', '(47 + 85) + 53', '47 + (85 + 53)'],
      answer: 0,
      hints: ['Em tìm hai số hạng có tổng tròn trăm.'],
      solution: '47 + 53 = 100, nên (47 + 53) + 85 = 100 + 85 = 185.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 67 + 21 + 33 + 79 = ?',
      answer: 200,
      hints: ['Em nhóm 67 với 33, nhóm 21 với 79.'],
      solution: '67 + 21 + 33 + 79 = (67 + 33) + (21 + 79) = 100 + 100 = 200.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 1 250 + 3 487 + 750 = ?',
      answer: 5487,
      hints: ['Số nào cộng với 1 250 được số tròn nghìn?'],
      solution: '1 250 + 3 487 + 750 = (1 250 + 750) + 3 487 = 2 000 + 3 487 = 5 487.',
    },
    {
      type: 'number',
      prompt:
        'Ba ngày cửa hàng bán được 1 235 kg, 2 680 kg và 765 kg gạo. Hỏi cả ba ngày cửa hàng bán được bao nhiêu ki-lô-gam gạo?',
      answer: 4680,
      unit: 'kg',
      hints: ['Em cộng ba số. Số nào cộng với 1 235 được số tròn nghìn?'],
      solution: '1 235 + 2 680 + 765 = (1 235 + 765) + 2 680 = 2 000 + 2 680 = 4 680 (kg).',
    },
  ],
  takeaways: [
    'Tính chất giao hoán: a + b = b + a.',
    'Tính chất kết hợp: (a + b) + c = a + (b + c).',
    'Nhóm các số hạng có tổng tròn chục, tròn trăm, tròn nghìn để tính nhanh.',
  ],
};
