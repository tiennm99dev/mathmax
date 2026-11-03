/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép chia số có ba chữ số cho số có một chữ số: chia từng hàng từ trái sang phải, chia có dư, chữ số 0 ở thương và trường hợp hàng trăm bé hơn số chia.',
  intro:
    'Có 396 quyển vở chia đều cho 3 lớp. Mỗi lớp được bao nhiêu quyển? Em đặt tính rồi chia từng hàng, bắt đầu từ hàng trăm nhé!',
  objectives: [
    'Đặt tính và chia số có ba chữ số cho số có một chữ số.',
    'Chia từng hàng từ trái sang phải, biết hạ chữ số tiếp theo.',
    'Viết đúng chữ số 0 ở thương.',
    'Chia nhẩm số tròn trăm.',
  ],
  sections: [
    {
      heading: 'Chia từng hàng',
      blocks: [
        {
          type: 'p',
          text: 'Em tính 396 : 3. Em viết số bị chia bên trái, số chia bên phải, thương viết dưới số chia.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '3 chia 3 được 1, viết 1. 1 nhân 3 bằng 3. 3 trừ 3 bằng 0.',
            'Hạ 9. 9 chia 3 được 3, viết 3. 3 nhân 3 bằng 9. 9 trừ 9 bằng 0.',
            'Hạ 6. 6 chia 3 được 2, viết 2. 2 nhân 3 bằng 6. 6 trừ 6 bằng 0.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '396 : 3 = 132.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em chia từ trái sang phải. Mỗi lượt: chia, viết, nhân, trừ, rồi hạ chữ số tiếp theo.',
        },
      ],
    },
    {
      heading: 'Phép chia có dư',
      blocks: [
        { type: 'p', text: 'Em tính 538 : 4.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '5 chia 4 được 1, viết 1. 1 nhân 4 bằng 4. 5 trừ 4 bằng 1.',
            'Hạ 3, được 13. 13 chia 4 được 3, viết 3. 3 nhân 4 bằng 12. 13 trừ 12 bằng 1.',
            'Hạ 8, được 18. 18 chia 4 được 4, viết 4. 4 nhân 4 bằng 16. 18 trừ 16 bằng 2.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '538 : 4 = 134 (dư 2).' },
        { type: 'callout', tone: 'warning', text: 'Số dư luôn bé hơn số chia.' },
      ],
    },
    {
      heading: 'Chữ số 0 ở thương',
      blocks: [
        { type: 'p', text: 'Em tính 518 : 5.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '5 chia 5 được 1, viết 1. 5 trừ 5 bằng 0.',
            'Hạ 1. 1 bé hơn 5, nên 1 chia 5 được 0, viết 0. 1 trừ 0 bằng 1.',
            'Hạ 8, được 18. 18 chia 5 được 3, viết 3. 3 nhân 5 bằng 15. 18 trừ 15 bằng 3.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '518 : 5 = 103 (dư 3).' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Mỗi lần hạ một chữ số, em phải viết một chữ số ở thương. Chữ số 0 không được bỏ quên.',
        },
      ],
    },
    {
      heading: 'Hàng trăm bé hơn số chia',
      blocks: [
        { type: 'p', text: 'Em tính 354 : 6. Vì 3 bé hơn 6, em lấy 35 để chia.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '35 chia 6 được 5, viết 5. 5 nhân 6 bằng 30. 35 trừ 30 bằng 5.',
            'Hạ 4, được 54. 54 chia 6 được 9, viết 9. 9 nhân 6 bằng 54. 54 trừ 54 bằng 0.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kết quả',
          text: '354 : 6 = 59. Thương có hai chữ số.',
        },
      ],
    },
    {
      heading: 'Chia nhẩm',
      blocks: [
        { type: 'p', text: 'Em nhẩm 600 : 3: 6 trăm : 3 = 2 trăm.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '600 : 3 = 200.' },
      ],
    },
  ],
  explore: {
    title: 'Chia và hạ từng chữ số',
    instruction:
      'Em chọn chữ số cho từng bước. Đến lượt hạ, em chạm nút để chữ số đi xuống. Chọn "Có dư", "Thương có số 0" hoặc "Lấy hai chữ số" để thử các trường hợp khác.',
  },
  examples: [
    {
      problem:
        'Cửa hàng nướng 460 cái bánh, xếp vào các hộp, mỗi hộp 4 cái. Cửa hàng xếp được bao nhiêu hộp bánh?',
      steps: [
        'Em tính 460 : 4.',
        '4 chia 4 được 1, viết 1. 4 trừ 4 bằng 0.',
        'Hạ 6. 6 chia 4 được 1, viết 1. 6 trừ 4 bằng 2.',
        'Hạ 0, được 20. 20 chia 4 được 5, viết 5. 20 trừ 20 bằng 0.',
      ],
      answer: '460 : 4 = 115. Cửa hàng xếp được 115 hộp bánh.',
    },
    {
      problem: 'Đặt tính rồi tính: 844 : 8.',
      steps: [
        '8 chia 8 được 1, viết 1. 8 trừ 8 bằng 0.',
        'Hạ 4. 4 bé hơn 8, nên 4 chia 8 được 0, viết 0. 4 trừ 0 bằng 4.',
        'Hạ 4, được 44. 44 chia 8 được 5, viết 5. 5 nhân 8 bằng 40. 44 trừ 40 bằng 4.',
      ],
      answer: '844 : 8 = 105 (dư 4).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: 684 : 2 = ?',
      answer: 342,
      hints: ['Em chia từ hàng trăm: 6 chia 2.', 'Rồi hạ 8, hạ 4 và chia tiếp.'],
      solution: '6 chia 2 được 3. 8 chia 2 được 4. 4 chia 2 được 2. Vậy 684 : 2 = 342.',
    },
    {
      type: 'choice',
      prompt: '403 : 3 bằng bao nhiêu?',
      options: ['134 (dư 1)', '134 (dư 2)', '133 (dư 4)', '144 (dư 1)'],
      answer: 0,
      hints: ['Số dư phải bé hơn 3.', 'Thử lại: thương nhân 3, rồi cộng số dư, phải được 403.'],
      solution:
        '4 chia 3 được 1, dư 1. Hạ 0, được 10. 10 chia 3 được 3, dư 1. Hạ 3, được 13. 13 chia 3 được 4, dư 1. Vậy 403 : 3 = 134 (dư 1).',
    },
    {
      type: 'choice',
      prompt: '612 : 6 bằng bao nhiêu?',
      options: ['102', '12', '120', '112'],
      answer: 0,
      hints: ['Hạ 1 xuống. 1 bé hơn 6, em viết gì ở thương?', 'Thương có ba chữ số.'],
      solution:
        '6 chia 6 được 1. Hạ 1: 1 chia 6 được 0, viết 0. Hạ 2, được 12. 12 chia 6 được 2. Vậy 612 : 6 = 102.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với thương của nó.',
      left: ['124 : 4', '702 : 9', '384 : 6', '343 : 7'],
      right: ['31', '78', '64', '49'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Hàng trăm bé hơn số chia, em lấy hai chữ số đầu để chia.',
        'Thử lại bằng phép nhân.',
      ],
      solution: '124 : 4 = 31. 702 : 9 = 78. 384 : 6 = 64. 343 : 7 = 49.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 248 : 2 theo đúng thứ tự.',
      items: [
        'Hạ 8. 8 chia 2 được 4, viết 4',
        '2 chia 2 được 1, viết 1',
        'Hạ 4. 4 chia 2 được 2, viết 2',
      ],
      answer: [1, 2, 0],
      hints: ['Em chia từ hàng trăm trước.', 'Hạ lần lượt từng chữ số, từ trái sang phải.'],
      solution: '2 chia 2 được 1. Hạ 4: 4 chia 2 được 2. Hạ 8: 8 chia 2 được 4. Vậy 248 : 2 = 124.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 800 : 2 = ?',
      options: ['400', '40', '200', '600'],
      answer: 0,
      hints: ['800 là 8 trăm.', '8 trăm chia 2 bằng mấy trăm?'],
      solution: '8 trăm : 2 = 4 trăm. Vậy 800 : 2 = 400.',
    },
    {
      type: 'choice',
      prompt:
        'Nam tính 624 : 3 như sau: 6 chia 3 được 2, viết 2. Hạ 2, 2 bé hơn 3 nên Nam hạ luôn 4, được 24. 24 chia 3 được 8, viết 8. Nam được 28. Nam làm đúng hay sai?',
      options: ['Sai, Nam quên viết 0 ở thương', 'Đúng rồi', 'Sai, số dư phải là 2'],
      answer: 0,
      hints: ['Em đếm: có mấy lần hạ chữ số, thương có mấy chữ số?'],
      solution:
        'Hạ 2: 2 chia 3 được 0, phải viết 0. Hạ 4, được 24. 24 chia 3 được 8. Vậy 624 : 3 = 208, không phải 28.',
    },
    {
      type: 'number',
      prompt: 'Có 252 quả táo, đóng vào các hộp, mỗi hộp 6 quả. Đóng được bao nhiêu hộp táo?',
      answer: 42,
      hints: ['Em tính 252 : 6.', '2 bé hơn 6, em lấy 25 để chia trước.'],
      solution:
        '25 chia 6 được 4. 4 nhân 6 bằng 24. 25 trừ 24 bằng 1. Hạ 2, được 12. 12 chia 6 được 2. Vậy 252 : 6 = 42. Đóng được 42 hộp táo.',
    },
    {
      type: 'choice',
      prompt:
        'Có 130 quả trứng, xếp vào các khay, mỗi khay 6 quả. Xếp được nhiều nhất bao nhiêu khay và còn thừa mấy quả?',
      options: [
        '21 khay, thừa 4 quả',
        '20 khay, thừa 10 quả',
        '22 khay, thừa 2 quả',
        '21 khay, thừa 2 quả',
      ],
      answer: 0,
      hints: ['Em tính 130 : 6.', 'Số quả thừa phải bé hơn 6.'],
      solution:
        '13 chia 6 được 2, dư 1. Hạ 0, được 10. 10 chia 6 được 1, dư 4. Vậy 130 : 6 = 21 (dư 4). Xếp được 21 khay, thừa 4 quả.',
    },
    {
      type: 'number',
      prompt:
        'Rô-bốt cân nặng 600 g, bằng 4 khối ru-bích giống nhau. Mỗi khối ru-bích nặng bao nhiêu gam?',
      answer: 150,
      unit: 'g',
      hints: ['Chia đều 600 g thành 4 phần.', '6 chia 4 được 1, dư 2.'],
      solution:
        '6 chia 4 được 1, dư 2. Hạ 0, được 20. 20 chia 4 được 5. Hạ 0: 0 chia 4 được 0. Vậy 600 : 4 = 150. Mỗi khối nặng 150 g.',
    },
  ],
  takeaways: [
    'Chia từ trái sang phải: chia, viết, nhân, trừ, rồi hạ.',
    'Mỗi lần hạ một chữ số, em viết một chữ số ở thương, có thể là 0.',
    'Hàng trăm bé hơn số chia thì lấy hai chữ số đầu để chia.',
    'Số dư luôn bé hơn số chia.',
  ],
};
