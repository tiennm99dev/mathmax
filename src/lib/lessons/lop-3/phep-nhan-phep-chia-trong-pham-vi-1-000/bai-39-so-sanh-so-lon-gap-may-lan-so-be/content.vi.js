/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh số lớn gấp mấy lần số bé: lấy số lớn chia cho số bé; phân biệt với số lớn hơn số bé bao nhiêu đơn vị.',
  intro:
    'Đoạn thẳng AB dài 6 cm. Đoạn thẳng CD dài 2 cm. AB dài gấp mấy lần CD? Em đặt đoạn ngắn dọc theo đoạn dài rồi đếm nhé!',
  objectives: [
    'Biết cách so sánh số lớn gấp mấy lần số bé.',
    'Phân biệt "gấp mấy lần" với "hơn bao nhiêu".',
    'Giải bài toán có so sánh số lớn gấp mấy lần số bé.',
  ],
  sections: [
    {
      heading: 'Đặt đoạn ngắn dọc theo đoạn dài',
      blocks: [
        { type: 'p', text: 'Đoạn thẳng AB dài 6 cm. Đoạn thẳng CD dài 2 cm.' },
        { type: 'p', text: 'Em đặt đoạn CD dọc theo đoạn AB. Đặt được 3 lần thì vừa khít.' },
        { type: 'p', text: 'Em tính: 6 : 2 = 3. Vậy đoạn thẳng AB dài gấp 3 lần đoạn thẳng CD.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn so sánh số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé.',
        },
      ],
    },
    {
      heading: '"Gấp mấy lần" khác "hơn bao nhiêu"',
      blocks: [
        { type: 'p', text: 'Có hai cách so sánh số lớn với số bé.' },
        {
          type: 'table',
          head: ['Câu hỏi', 'Phép tính', 'Với 6 và 2'],
          rows: [
            ['Số lớn gấp mấy lần số bé?', 'Phép chia', '6 : 2 = 3 (lần)'],
            ['Số lớn hơn số bé bao nhiêu?', 'Phép trừ', '6 − 2 = 4'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi so sánh độ dài, em dùng cùng một đơn vị đo cho cả hai số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt thanh ngắn dọc theo thanh dài',
    instruction:
      'Em chạm nút để đặt thêm thanh ngắn. Đếm số lần cho đến khi vừa khít thanh dài, rồi chọn câu trả lời.',
  },
  examples: [
    {
      problem: 'Bút chì dài 10 cm. Bút sáp dài 5 cm. Bút chì dài gấp mấy lần bút sáp?',
      steps: ['Em lấy số lớn chia cho số bé.', '10 : 5 = 2.'],
      answer: 'Bút chì dài gấp 2 lần bút sáp.',
    },
    {
      problem:
        'Thuyền lớn chở 24 khách du lịch. Thuyền nhỏ chở 6 khách du lịch. a) Thuyền lớn chở nhiều hơn thuyền nhỏ bao nhiêu khách? b) Số khách của thuyền lớn gấp mấy lần số khách của thuyền nhỏ?',
      steps: [
        'a) "Nhiều hơn" thì em làm phép trừ: 24 − 6 = 18.',
        'b) "Gấp mấy lần" thì em làm phép chia: 24 : 6 = 4.',
      ],
      answer: 'a) 18 khách du lịch. b) 4 lần.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Số lớn là 20, số bé là 4. Số lớn gấp mấy lần số bé?',
      answer: 5,
      unit: 'lần',
      hints: ['Em lấy số lớn chia cho số bé.', 'Em tính 20 : 4.'],
      solution: '20 : 4 = 5. Số lớn gấp 5 lần số bé.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cặp số với số lần số lớn gấp số bé.',
      left: ['8 và 2', '14 và 7', '30 và 3', '36 và 6'],
      right: ['4 lần', '2 lần', '10 lần', '6 lần'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Mỗi cặp, em lấy số lớn chia cho số bé.'],
      solution: '8 : 2 = 4. 14 : 7 = 2. 30 : 3 = 10. 36 : 6 = 6.',
    },
    {
      type: 'choice',
      prompt: 'Muốn biết 35 gấp mấy lần 5, em làm phép tính nào?',
      options: ['35 : 5', '35 − 5', '35 × 5', '35 + 5'],
      answer: 0,
      hints: ['"Gấp mấy lần" là so sánh bằng phép chia.'],
      solution: 'Em lấy số lớn chia cho số bé: 35 : 5 = 7.',
    },
    {
      type: 'choice',
      prompt: 'Sợi dây đỏ dài 18 m, sợi dây xanh dài 3 m. Sợi dây đỏ dài gấp mấy lần sợi dây xanh?',
      options: ['6 lần', '15 lần', '21 lần', '5 lần'],
      answer: 0,
      hints: ['15 là kết quả của phép trừ, đó là "dài hơn".', 'Em tính 18 : 3.'],
      solution: '18 : 3 = 6. Sợi dây đỏ dài gấp 6 lần sợi dây xanh.',
    },
    {
      type: 'match',
      prompt: 'Có 16 con gà và 4 con vịt. Nối câu hỏi với đáp số.',
      left: ['Gà nhiều hơn vịt mấy con?', 'Số gà gấp mấy lần số vịt?'],
      right: ['12 con', '4 lần', '20 con'],
      pairs: [
        [0, 0],
        [1, 1],
      ],
      hints: ['"Nhiều hơn" là phép trừ.', '"Gấp mấy lần" là phép chia.'],
      solution: 'Nhiều hơn: 16 − 4 = 12 (con). Gấp: 16 : 4 = 4 (lần).',
    },
    {
      type: 'number',
      prompt:
        'Có 32 quả bóng xếp thành hàng và cột: mỗi hàng 8 quả, mỗi cột 4 quả. Số bóng một hàng gấp mấy lần số bóng một cột?',
      answer: 2,
      unit: 'lần',
      hints: ['Em chỉ cần so sánh 8 và 4.', 'Em tính 8 : 4.'],
      solution: '8 : 4 = 2. Số bóng một hàng gấp 2 lần số bóng một cột.',
    },
    {
      type: 'choice',
      prompt: 'Mai nói: "9 gấp 6 lần 3, vì 9 − 3 = 6." Mai nói đúng hay sai?',
      options: ['Sai, phải tính 9 : 3', 'Đúng rồi', 'Sai, phải tính 9 + 3'],
      answer: 0,
      hints: ['"Gấp mấy lần" thì dùng phép gì?', 'Phép trừ cho biết "hơn bao nhiêu".'],
      solution:
        '9 − 3 = 6 chỉ cho biết 9 hơn 3 là 6 đơn vị. So sánh gấp mấy lần phải tính 9 : 3 = 3. Vậy 9 gấp 3 lần 3.',
    },
    {
      type: 'number',
      prompt: 'Một đoạn dây dài 56 m. Một đoạn dây khác dài 7 m. Đoạn dài gấp mấy lần đoạn ngắn?',
      answer: 8,
      unit: 'lần',
      hints: ['Em lấy số lớn chia cho số bé.', 'Nhớ lại bảng chia 7.'],
      solution: '56 : 7 = 8. Đoạn dài gấp 8 lần đoạn ngắn.',
    },
  ],
  takeaways: [
    'Muốn so sánh số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé.',
    'Hỏi "hơn bao nhiêu" thì làm phép trừ.',
  ],
};
