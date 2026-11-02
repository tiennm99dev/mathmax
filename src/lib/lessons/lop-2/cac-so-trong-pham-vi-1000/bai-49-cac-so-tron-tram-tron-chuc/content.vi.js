/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các số tròn trăm từ 100 đến 1000 và các số tròn chục: đếm theo trăm, đếm theo chục, đọc và viết các số đó.',
  intro:
    'Rô-bốt xếp mỗi hộp 100 cái bút chì. Đếm số bút rất nhanh: 100, 200, 300! Đó là các số tròn trăm. Em cùng tìm chúng trên tia số nhé.',
  objectives: [
    'Nhận biết các số tròn trăm, đọc và viết được các số đó.',
    'Nhận biết các số tròn chục, đọc và viết được các số đó.',
    'Đếm thêm 1 trăm, đếm thêm 1 chục.',
  ],
  sections: [
    {
      heading: 'Các số tròn trăm',
      blocks: [
        {
          type: 'p',
          text: 'Đếm theo trăm, em có: 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Các số 100, 200, ..., 900, 1000 là các số tròn trăm. Số tròn trăm có hai chữ số cuối đều là 0.',
        },
        {
          type: 'table',
          head: ['Viết số', 'Đọc số'],
          rows: [
            ['100', 'một trăm'],
            ['500', 'năm trăm'],
            ['900', 'chín trăm'],
            ['1000', 'một nghìn'],
          ],
        },
      ],
    },
    {
      heading: 'Các số tròn chục',
      blocks: [
        {
          type: 'p',
          text: 'Đếm theo chục, em có: 10, 20, 30, ..., 100, 110, 120, 130, ...',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Các số 10, 20, ..., 100, 110, 120, ... là các số tròn chục. Số tròn chục có chữ số cuối là 0.',
        },
        {
          type: 'p',
          text: '2 trăm và 4 chục là 240, đọc là hai trăm bốn mươi. Chữ số cuối là 0 nên 240 là số tròn chục.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Để ý',
          text: 'Số tròn trăm cũng có chữ số cuối là 0, nên số tròn trăm cũng là số tròn chục.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tia số phóng to',
    instruction:
      'Em kéo điểm đỏ hoặc chạm "Tiến", "Lùi" để tìm số. Muốn thấy các mốc tròn chục, em chạm "Phóng to" nhé.',
  },
  examples: [
    {
      problem:
        'Mỗi hộp có 100 cái bút chì. Rô-bốt xếp được 3 hộp. Rô-bốt xếp được bao nhiêu cái bút?',
      steps: ['Mỗi hộp là 1 trăm cái bút.', 'Em đếm theo trăm: 100, 200, 300.'],
      answer: 'Rô-bốt xếp được 300 cái bút chì.',
    },
    {
      problem: 'Em đếm theo chục rồi điền số còn thiếu: 110, 120, ?, 140.',
      steps: ['Mỗi lần đếm, số thêm 1 chục.', 'Sau 120 là 130.'],
      answer: 'Số còn thiếu là 130.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số nào là số tròn trăm?',
      options: ['750', '700', '705'],
      answer: 1,
      hints: ['Số tròn trăm có hai chữ số cuối đều là 0.'],
      solution: '700 có hai chữ số cuối đều là 0, nên 700 là số tròn trăm.',
    },
    {
      type: 'choice',
      prompt: 'Số nào là số tròn chục?',
      options: ['345', '304', '340'],
      answer: 2,
      hints: ['Em nhìn chữ số cuối của mỗi số.'],
      solution: '340 có chữ số cuối là 0, nên 340 là số tròn chục.',
    },
    {
      type: 'multi',
      prompt: 'Em chọn tất cả các số tròn trăm.',
      options: ['400', '450', '900', '1000', '109'],
      answers: [0, 2, 3],
      hints: ['Hai chữ số cuối của số tròn trăm đều là 0.'],
      solution: 'Các số tròn trăm là 400, 900 và 1000.',
    },
    {
      type: 'number',
      prompt: 'Em đếm theo trăm rồi điền số còn thiếu: 200, 300, ?, 500.',
      answer: 400,
      hints: ['Mỗi lần thêm 1 trăm.'],
      solution: '200, 300, 400, 500. Số còn thiếu là 400.',
    },
    {
      type: 'number',
      prompt: 'Em đếm lùi theo trăm rồi điền số còn thiếu: 900, 800, ?, 600.',
      answer: 700,
      hints: ['Mỗi lần bớt 1 trăm.'],
      solution: '900, 800, 700, 600. Số còn thiếu là 700.',
    },
    {
      type: 'number',
      prompt: 'Em đếm theo chục rồi điền số còn thiếu: 610, 620, ?, 640.',
      answer: 630,
      hints: ['Mỗi lần thêm 1 chục.'],
      solution: '610, 620, 630, 640. Số còn thiếu là 630.',
    },
    {
      type: 'number',
      prompt: '5 trăm và 3 chục là số nào?',
      answer: 530,
      hints: ['5 trăm là 500. Em đếm thêm 3 chục: 510, ...'],
      solution: '5 trăm và 3 chục là 530.',
    },
    {
      type: 'match',
      prompt: 'Em nối số với cách đọc.',
      left: ['100', '500', '1000', '350'],
      right: ['năm trăm', 'một nghìn', 'ba trăm năm mươi', 'một trăm', 'năm mươi'],
      pairs: [
        [0, 3],
        [1, 0],
        [2, 1],
        [3, 2],
      ],
      hints: ['Em đọc số từ hàng lớn nhất.'],
      solution: '100: một trăm. 500: năm trăm. 1000: một nghìn. 350: ba trăm năm mươi.',
    },
    {
      type: 'number',
      prompt: 'Mỗi hộp có 100 cái bút chì. Có 8 hộp. Có tất cả bao nhiêu cái bút chì?',
      answer: 800,
      hints: ['Mỗi hộp là 1 trăm cái bút.', 'Em đếm theo trăm 8 lần.'],
      solution: '8 trăm là 800. Có tất cả 800 cái bút chì.',
    },
  ],
  takeaways: [
    'Số tròn trăm: 100, 200, ..., 900, 1000. Hai chữ số cuối đều là 0.',
    'Số tròn chục có chữ số cuối là 0.',
  ],
};
