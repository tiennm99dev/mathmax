/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Phép cộng và phép trừ: đặt tính cộng, trừ có nhớ, tính nhẩm, tính chất giao hoán và kết hợp, tìm hai số biết tổng và hiệu, giải bài toán thực tế.',
  intro:
    'Em đã biết cộng, trừ các số có nhiều chữ số, tính thuận tiện và tìm hai số biết tổng và hiệu. Cùng luyện tập để nhớ thật chắc nhé!',
  objectives: [
    'Củng cố đặt tính rồi tính phép cộng, phép trừ có nhớ.',
    'Vận dụng tính chất giao hoán, kết hợp để tính thuận tiện.',
    'Giải bài toán thực tế, trong đó có bài toán tổng và hiệu.',
  ],
  sections: [
    {
      heading: 'Em nhớ lại',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cộng, trừ: đặt các chữ số cùng hàng thẳng cột, tính từ hàng đơn vị. Có nhớ thì đừng quên số nhớ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'a + b = b + a và (a + b) + c = a + (b + c).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số bé = (Tổng − Hiệu) : 2. Số lớn = (Tổng + Hiệu) : 2.',
        },
        {
          type: 'p',
          text: 'Thử lại phép trừ: lấy hiệu cộng số trừ, phải được số bị trừ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Mỗi bộ có một câu cho từng phần của chủ đề. Em chạm đáp án đúng. Sai lần đầu thì em xem gợi ý và thử lại. Cuối bộ, em biết phần nào cần ôn.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 305 148 + 267 395.',
      steps: [
        '8 cộng 5 bằng 13, viết 3, nhớ 1.',
        '4 cộng 9 bằng 13, thêm 1 bằng 14, viết 4, nhớ 1.',
        '1 cộng 3 bằng 4, thêm 1 bằng 5, viết 5.',
        '5 cộng 7 bằng 12, viết 2, nhớ 1.',
        '0 cộng 6 bằng 6, thêm 1 bằng 7, viết 7.',
        '3 cộng 2 bằng 5, viết 5.',
      ],
      answer: '305 148 + 267 395 = 572 543.',
    },
    {
      problem:
        'Hai thùng có 1 500 l nước. Thùng thứ nhất có nhiều hơn thùng thứ hai 300 l. Hỏi mỗi thùng có bao nhiêu lít nước?',
      steps: [
        'Tổng là 1 500, hiệu là 300.',
        'Thùng thứ hai có: (1 500 − 300) : 2 = 600 (l).',
        'Thùng thứ nhất có: 600 + 300 = 900 (l).',
      ],
      answer: 'Thùng thứ nhất có 900 l, thùng thứ hai có 600 l.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '305 148 + 267 395 = ?',
      options: ['572 543', '562 433', '572 533', '573 543'],
      answer: 0,
      hints: ['Cộng từ hàng đơn vị: 8 cộng 5 bằng 13, viết 3, nhớ 1.'],
      solution: '305 148 + 267 395 = 572 543. Số 562 433 là kết quả khi quên số nhớ.',
    },
    {
      type: 'choice',
      prompt: '724 016 − 358 429 = ?',
      options: ['365 587', '476 697', '366 587', '365 597'],
      answer: 0,
      hints: ['6 không trừ được 9: lấy 16 trừ 9, nhớ 1.', 'Phép trừ này có nhớ ở năm hàng.'],
      solution: '724 016 − 358 429 = 365 587. Thử lại: 365 587 + 358 429 = 724 016.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 81 652 + 9 738 = ?',
      answer: 91390,
      hints: ['Viết 9 738 thẳng cột từ hàng đơn vị.', '2 cộng 8 bằng 10, viết 0, nhớ 1.'],
      solution:
        '2 + 8 = 10, viết 0, nhớ 1; 5 + 3 = 8, thêm 1 bằng 9; 6 + 7 = 13, viết 3, nhớ 1; 1 + 9 = 10, thêm 1 bằng 11, viết 1, nhớ 1; 8 thêm 1 bằng 9. Vậy 81 652 + 9 738 = 91 390.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 600 000 − 245 700 = ?',
      answer: 354300,
      hints: ['Hàng trăm: 0 không trừ được 7, lấy 10 trừ 7, nhớ 1.'],
      solution:
        '0 − 0 = 0; 0 − 0 = 0; 10 − 7 = 3, nhớ 1; 10 − 6 = 4, nhớ 1; 10 − 5 = 5, nhớ 1; 6 − 3 = 3. Vậy 600 000 − 245 700 = 354 300.',
    },
    {
      type: 'match',
      prompt: 'Em tính nhẩm rồi nối phép tính với kết quả.',
      left: ['500 000 + 400 000', '900 000 − 600 000', '250 000 + 750 000', '1 000 000 − 1 000'],
      right: ['900 000', '300 000', '1 000 000', '999 000', '990 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Em nhẩm theo trăm nghìn: 5 trăm nghìn + 4 trăm nghìn = 9 trăm nghìn. Còn 1 000 000 − 1 000 là 1 000 nghìn − 1 nghìn.',
      ],
      solution:
        '500 000 + 400 000 = 900 000; 900 000 − 600 000 = 300 000; 250 000 + 750 000 = 1 000 000; 1 000 000 − 1 000 = 999 000.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 4 750 + 3 260 + 1 250 = ?',
      answer: 9260,
      hints: ['Số nào cộng với 4 750 được số tròn nghìn?'],
      solution: '4 750 + 3 260 + 1 250 = (4 750 + 1 250) + 3 260 = 6 000 + 3 260 = 9 260.',
    },
    {
      type: 'choice',
      prompt: 'Biết 3 654 + 2 546 = 6 200. Biểu thức nào cũng có giá trị 6 200?',
      options: ['2 546 + 3 654', '3 654 − 2 546', '6 200 + 2 546'],
      answer: 0,
      hints: ['Đổi chỗ các số hạng thì tổng thế nào?'],
      solution: 'Khi đổi chỗ các số hạng thì tổng không thay đổi: 2 546 + 3 654 = 6 200.',
    },
    {
      type: 'number',
      prompt: '? + 48 390 = 205 110. Số cần điền là số nào?',
      answer: 156720,
      hints: ['Muốn tìm số hạng chưa biết, em lấy tổng trừ đi số hạng đã biết.'],
      solution: '205 110 − 48 390 = 156 720. Thử lại: 156 720 + 48 390 = 205 110.',
    },
    {
      type: 'number',
      prompt:
        'Hai thùng có 1 500 l nước. Thùng thứ nhất có nhiều hơn thùng thứ hai 300 l. Hỏi thùng thứ nhất có bao nhiêu lít nước?',
      answer: 900,
      unit: 'l',
      hints: ['Thùng thứ nhất nhiều hơn, là số lớn.', 'Số lớn = (Tổng + Hiệu) : 2.'],
      solution: 'Thùng thứ nhất có: (1 500 + 300) : 2 = 900 (l).',
    },
    {
      type: 'choice',
      prompt: 'Tổng hai số là 96, hiệu hai số là 18. Số bé là số nào?',
      options: ['39', '57', '48', '78'],
      answer: 0,
      hints: ['Số bé = (Tổng − Hiệu) : 2.'],
      solution: 'Số bé là (96 − 18) : 2 = 39. Số lớn là 39 + 18 = 57.',
    },
    {
      type: 'number',
      prompt:
        'Năm ngoái một huyện trồng được 156 720 cây. Năm nay huyện trồng được nhiều hơn năm ngoái 48 390 cây. Hỏi năm nay huyện trồng được bao nhiêu cây?',
      answer: 205110,
      unit: 'cây',
      hints: ['Nhiều hơn thì em làm phép cộng.'],
      solution: '156 720 + 48 390 = 205 110 (cây). Năm nay huyện trồng được 205 110 cây.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các kết quả từ bé đến lớn.',
      items: ['125 000 − 25 000', '60 000 + 50 000', '200 000 − 80 000'],
      answer: [0, 1, 2],
      hints: ['Em tính từng phép tính trước, rồi so sánh.'],
      solution:
        '125 000 − 25 000 = 100 000; 60 000 + 50 000 = 110 000; 200 000 − 80 000 = 120 000.',
    },
  ],
  takeaways: [
    'Cộng, trừ có nhớ: tính từ hàng đơn vị, không quên số nhớ.',
    'Đổi chỗ, nhóm các số hạng để tính thuận tiện.',
    'Tổng và hiệu: số bé = (tổng − hiệu) : 2, số lớn = (tổng + hiệu) : 2.',
  ],
};
