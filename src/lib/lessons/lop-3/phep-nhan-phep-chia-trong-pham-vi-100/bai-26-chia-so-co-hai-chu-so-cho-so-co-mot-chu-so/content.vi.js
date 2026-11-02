/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính và chia số có hai chữ số cho số có một chữ số, chia từ hàng chục: chia hết và chia có dư; chia nhẩm số tròn chục.',
  intro:
    'Có 48 quả cà chua xếp đều vào 2 khay. Mỗi khay có bao nhiêu quả? Em đặt tính và chia từ hàng chục nhé!',
  objectives: [
    'Đặt tính rồi chia số có hai chữ số cho số có một chữ số.',
    'Chia từ hàng chục, rồi đến hàng đơn vị.',
    'Tìm được thương và số dư, giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Chia từng lượt hết',
      blocks: [
        { type: 'p', text: 'Có 48 quả cà chua xếp đều vào 2 khay. Em tính 48 : 2.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '4 chia 2 được 2, viết 2. 2 nhân 2 bằng 4; 4 trừ 4 bằng 0.',
            'Hạ 8. 8 chia 2 được 4, viết 4. 4 nhân 2 bằng 8; 8 trừ 8 bằng 0.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kết quả',
          text: '48 : 2 = 24. Mỗi khay có 24 quả.',
        },
      ],
    },
    {
      heading: 'Hàng chục còn thừa',
      blocks: [
        { type: 'p', text: 'Có 75 quả trứng chia đều vào 3 rổ. Em tính 75 : 3.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '7 chia 3 được 2, viết 2. 2 nhân 3 bằng 6; 7 trừ 6 bằng 1.',
            'Hạ 5, được 15. 15 chia 3 được 5, viết 5. 5 nhân 3 bằng 15; 15 trừ 15 bằng 0.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '75 : 3 = 25. Mỗi rổ có 25 quả.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chia từ hàng chục. Mỗi lượt em làm: chia, nhân, trừ, rồi hạ chữ số tiếp theo.',
        },
      ],
    },
    {
      heading: 'Phép chia có dư',
      blocks: [
        { type: 'p', text: 'Em tính 29 : 2.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '2 chia 2 được 1, viết 1. 1 nhân 2 bằng 2; 2 trừ 2 bằng 0.',
            'Hạ 9. 9 chia 2 được 4, viết 4. 4 nhân 2 bằng 8; 9 trừ 8 bằng 1.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '29 : 2 = 14 (dư 1).' },
      ],
    },
    {
      heading: 'Chia nhẩm',
      blocks: [
        { type: 'p', text: 'Em nhẩm 60 : 2: 6 chục chia 2 được 3 chục.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '60 : 2 = 30.' },
      ],
    },
  ],
  explore: {
    title: 'Chia từng bước với khối chục và đơn vị',
    instruction:
      'Em chạm vào chữ số để trả lời từng câu hỏi. Thanh dài là 1 chục, khối nhỏ là 1 đơn vị. Xem các khối được chia đều và phép tính được viết dần ra. Chọn "Chia có dư" để thử phép chia còn thừa.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 96 : 4.',
      steps: [
        '9 chia 4 được 2, viết 2. 2 nhân 4 bằng 8; 9 trừ 8 bằng 1.',
        'Hạ 6, được 16. 16 chia 4 được 4, viết 4. 4 nhân 4 bằng 16; 16 trừ 16 bằng 0.',
      ],
      answer: '96 : 4 = 24.',
    },
    {
      problem: 'Lớp có 29 bạn, mỗi bàn ngồi 2 bạn. Lớp cần ít nhất bao nhiêu cái bàn?',
      steps: [
        'Em tính 29 : 2 = 14 (dư 1).',
        '14 bàn thì đủ chỗ cho 28 bạn. Còn 1 bạn nữa cũng cần một bàn.',
        '14 + 1 = 15.',
      ],
      answer: 'Lớp cần ít nhất 15 cái bàn.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: 92 : 4 = ?',
      answer: 23,
      hints: ['9 chia 4 được 2, 9 trừ 8 còn 1.', 'Hạ 2, được 12. Em chia tiếp cho 4.'],
      solution:
        '9 chia 4 được 2; 2 nhân 4 bằng 8; 9 trừ 8 bằng 1. Hạ 2, được 12; 12 chia 4 được 3. Vậy 92 : 4 = 23.',
    },
    {
      type: 'number',
      prompt: 'Có 45 viên bi chia đều vào 3 hộp. Mỗi hộp có bao nhiêu viên bi?',
      answer: 15,
      hints: ['Em tính 45 : 3.', '4 chia 3 được 1, còn dư 1. Hạ 5, được 15.'],
      solution:
        '4 chia 3 được 1; 4 trừ 3 bằng 1. Hạ 5, được 15; 15 chia 3 được 5. Vậy 45 : 3 = 15. Mỗi hộp có 15 viên bi.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 80 : 4 = ?',
      options: ['20', '2', '40', '76'],
      answer: 0,
      hints: ['80 là 8 chục.', '8 chục chia 4 được mấy chục?'],
      solution: '8 chục chia 4 được 2 chục. Vậy 80 : 4 = 20.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với kết quả của nó.',
      left: ['74 : 3', '53 : 5', '65 : 5', '72 : 4'],
      right: ['24 (dư 2)', '10 (dư 3)', '13', '18'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em đặt tính từng phép chia ra giấy nháp.'],
      solution: '74 : 3 = 24 (dư 2). 53 : 5 = 10 (dư 3). 65 : 5 = 13. 72 : 4 = 18.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 75 : 3 theo đúng thứ tự.',
      items: [
        '15 chia 3 được 5, viết 5',
        '7 chia 3 được 2, viết 2',
        'Hạ 5, được 15',
        '2 nhân 3 bằng 6; 7 trừ 6 bằng 1',
      ],
      answer: [1, 3, 2, 0],
      hints: ['Em chia từ hàng chục trước.', 'Chia, nhân, trừ, rồi mới hạ.'],
      solution:
        '7 chia 3 được 2. 2 nhân 3 bằng 6; 7 trừ 6 bằng 1. Hạ 5, được 15. 15 chia 3 được 5. Vậy 75 : 3 = 25.',
    },
    {
      type: 'choice',
      prompt: 'Em tính 65 : 5. Lượt đầu em chia số nào cho 5?',
      options: ['6', '5', '65', '1'],
      answer: 0,
      hints: ['Em chia từ hàng chục.'],
      solution: 'Hàng chục của 65 là 6. Em chia 6 cho 5 được 1, còn dư 1, rồi hạ 5 được 15.',
    },
    {
      type: 'number',
      prompt: '? : 3 = 28. Số cần tìm là số nào?',
      answer: 84,
      hints: ['Muốn tìm số bị chia, ta lấy thương nhân với số chia.'],
      solution: '28 × 3 = 84. Thử lại: 84 : 3 = 28.',
    },
    {
      type: 'number',
      prompt:
        '4 con chó nặng bằng nhau, cả 4 con nặng 72 kg. Mỗi con chó nặng bao nhiêu ki-lô-gam?',
      answer: 18,
      hints: ['Em tính 72 : 4.', '7 chia 4 được 1, còn dư 3. Hạ 2, được 32.'],
      solution:
        '7 chia 4 được 1, còn dư 3. Hạ 2, được 32; 32 chia 4 được 8. Vậy 72 : 4 = 18. Mỗi con chó nặng 18 kg.',
    },
  ],
  takeaways: [
    'Chia từ hàng chục rồi đến hàng đơn vị.',
    'Mỗi lượt: chia, nhân, trừ, rồi hạ.',
    'Số dư luôn bé hơn số chia.',
  ],
};
