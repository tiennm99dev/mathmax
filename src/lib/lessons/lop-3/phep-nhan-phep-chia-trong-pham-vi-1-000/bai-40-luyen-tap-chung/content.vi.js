/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Phép nhân, phép chia trong phạm vi 1 000: đặt tính, tính nhẩm, biểu thức số, so sánh số lớn gấp mấy lần số bé và bài toán thực tế.',
  intro:
    'Em đã biết nhân, chia số có ba chữ số và tính biểu thức số. Giờ em luyện tập để nhớ thật chắc và giải các bài toán nhé!',
  objectives: [
    'Đặt tính rồi tính phép nhân, phép chia trong phạm vi 1 000.',
    'Tính giá trị của biểu thức số đúng thứ tự.',
    'So sánh số lớn gấp mấy lần số bé.',
    'Giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhân và chia theo cột',
      blocks: [
        {
          type: 'table',
          head: ['Phép tính', 'Em làm từ đâu?'],
          rows: [
            ['Nhân', 'Từ hàng đơn vị, sang trái. Nhớ thêm số đã nhớ.'],
            ['Chia', 'Từ hàng trăm, sang phải. Chia, viết, nhân, trừ, hạ.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi chia, mỗi lần hạ một chữ số thì viết một chữ số ở thương, có thể là 0.',
        },
      ],
    },
    {
      heading: 'Thứ tự tính trong biểu thức',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Có dấu ngoặc: tính trong ngoặc trước.',
            'Có cả cộng, trừ, nhân, chia: nhân, chia trước; cộng, trừ sau.',
            'Chỉ có cộng, trừ hoặc chỉ có nhân, chia: từ trái sang phải.',
          ],
        },
      ],
    },
    {
      heading: 'Gấp mấy lần, hơn bao nhiêu',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn so sánh số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé.',
        },
        { type: 'p', text: 'Câu hỏi "hơn bao nhiêu" thì làm phép trừ.' },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Mỗi câu luyện một phần của chủ đề. Chọn sai lần đầu, em được gợi ý và thử lại. Hết bộ, em xem phần cần ôn và làm bộ khác.',
  },
  examples: [
    {
      problem: 'Tính giá trị của biểu thức: 5 × (20 − 12).',
      steps: ['Có dấu ngoặc, em tính trong ngoặc trước: 20 − 12 = 8.', 'Rồi em tính 5 × 8 = 40.'],
      answer: '5 × (20 − 12) = 5 × 8 = 40.',
    },
    {
      problem:
        'Có 3 thùng dầu, mỗi thùng 125 l. Người ta bán 200 l. Hỏi còn lại bao nhiêu lít dầu?',
      steps: [
        'Em tìm số dầu ở 3 thùng: 125 × 3 = 375 (l).',
        'Em tìm số dầu còn lại: 375 − 200 = 175 (l).',
      ],
      answer: 'Còn lại 175 l dầu.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 217 × 4 = ?',
      answer: 868,
      hints: ['4 nhân 7 bằng 28. Em viết 8, nhớ 2.', 'Hàng chục: 4 nhân 1, rồi thêm 2 đã nhớ.'],
      solution:
        '4 nhân 7 bằng 28, viết 8, nhớ 2. 4 nhân 1 bằng 4, thêm 2 bằng 6, viết 6. 4 nhân 2 bằng 8, viết 8. Vậy 217 × 4 = 868.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 128 × 7 = ?',
      answer: 896,
      hints: ['Phép nhân này có nhớ hai lần.', '7 nhân 8 bằng 56. Em viết 6, nhớ 5.'],
      solution:
        '7 nhân 8 bằng 56, viết 6, nhớ 5. 7 nhân 2 bằng 14, thêm 5 bằng 19, viết 9, nhớ 1. 7 nhân 1 bằng 7, thêm 1 bằng 8, viết 8. Vậy 128 × 7 = 896.',
    },
    {
      type: 'choice',
      prompt: '936 : 3 bằng bao nhiêu?',
      options: ['312', '321', '213', '412'],
      answer: 0,
      hints: ['Em chia từ hàng trăm: 9 chia 3.', 'Thử lại bằng phép nhân với 3.'],
      solution: '9 chia 3 được 3. 3 chia 3 được 1. 6 chia 3 được 2. Vậy 936 : 3 = 312.',
    },
    {
      type: 'choice',
      prompt: '725 : 6 bằng bao nhiêu?',
      options: ['120 (dư 5)', '12 (dư 5)', '121 (dư 5)', '120 (dư 7)'],
      answer: 0,
      hints: ['Số dư phải bé hơn 6.', 'Hạ 5, được 5. 5 bé hơn 6 thì em viết gì ở thương?'],
      solution:
        '7 chia 6 được 1, dư 1. Hạ 2, được 12. 12 chia 6 được 2, dư 0. Hạ 5: 5 chia 6 được 0, dư 5. Vậy 725 : 6 = 120 (dư 5).',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 315 : 7 = ?',
      answer: 45,
      hints: ['3 bé hơn 7, em lấy 31 để chia.', '31 chia 7 được 4, dư 3. Hạ 5 để chia tiếp.'],
      solution: '31 chia 7 được 4, dư 3. Hạ 5, được 35. 35 chia 7 được 5. Vậy 315 : 7 = 45.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu thức với giá trị của nó.',
      left: ['50 − 5 × 6', '(50 − 5) : 5', '50 + 40 : 8', '7 × (8 − 5)'],
      right: ['20', '9', '55', '21'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Có ngoặc thì tính trong ngoặc trước.', 'Không có ngoặc thì nhân, chia trước.'],
      solution:
        '50 − 5 × 6 = 50 − 30 = 20. (50 − 5) : 5 = 45 : 5 = 9. 50 + 40 : 8 = 50 + 5 = 55. 7 × (8 − 5) = 7 × 3 = 21.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 60 : 3 × 4.',
      answer: 80,
      hints: ['Chỉ có chia và nhân, em tính từ trái sang phải.', 'Em tính 60 : 3 trước.'],
      solution: '60 : 3 × 4 = 20 × 4 = 80.',
    },
    {
      type: 'order',
      prompt: 'Xếp các dòng tính 35 + 63 : 7 theo đúng thứ tự.',
      items: ['44', '35 + 63 : 7', '35 + 9'],
      answer: [1, 2, 0],
      hints: ['Dòng đầu là biểu thức đã cho.', 'Em làm phép chia trước.'],
      solution: '35 + 63 : 7 = 35 + 9 = 44.',
    },
    {
      type: 'number',
      prompt:
        'Sợi dây đỏ dài 42 cm. Sợi dây xanh dài 7 cm. Sợi dây đỏ dài gấp mấy lần sợi dây xanh?',
      answer: 6,
      unit: 'lần',
      hints: ['Em lấy số lớn chia cho số bé.'],
      solution: '42 : 7 = 6. Sợi dây đỏ dài gấp 6 lần sợi dây xanh.',
    },
    {
      type: 'match',
      prompt: 'Thùng to có 63 l nước. Thùng bé có 9 l nước. Nối câu hỏi với đáp số.',
      left: ['Thùng to hơn thùng bé mấy lít?', 'Thùng to gấp thùng bé mấy lần?'],
      right: ['54 l', '7 lần', '72 l'],
      pairs: [
        [0, 0],
        [1, 1],
      ],
      hints: ['"Hơn bao nhiêu" là phép trừ.', '"Gấp mấy lần" là phép chia.'],
      solution: 'Hơn: 63 − 9 = 54 (l). Gấp: 63 : 9 = 7 (lần).',
    },
    {
      type: 'choice',
      prompt:
        'Nam tính 804 : 4 như sau: 8 chia 4 được 2, viết 2. Hạ 0, 0 chia 4 được 0, nhưng Nam không viết. Hạ 4, 4 chia 4 được 1, viết 1. Nam được 21. Nam làm đúng hay sai?',
      options: ['Sai, Nam quên viết 0 ở thương', 'Đúng rồi', 'Sai, phép chia này có dư'],
      answer: 0,
      hints: ['Có mấy lần hạ chữ số, thương phải có mấy chữ số?'],
      solution:
        'Phải viết 0 ở thương: 8 chia 4 được 2, 0 chia 4 được 0, 4 chia 4 được 1. Vậy 804 : 4 = 201.',
    },
    {
      type: 'number',
      prompt:
        'Có 3 thùng táo, mỗi thùng 160 quả. Người ta chia đều số táo vào 8 túi. Mỗi túi có bao nhiêu quả táo?',
      answer: 60,
      hints: ['Trước hết em tìm số táo ở 3 thùng.', 'Rồi em chia số táo đó cho 8.'],
      solution: 'Số táo ở 3 thùng: 160 × 3 = 480 (quả). Mỗi túi có: 480 : 8 = 60 (quả).',
    },
  ],
  takeaways: [
    'Nhân từ hàng đơn vị; chia từ hàng trăm.',
    'Khi chia, đừng quên chữ số 0 ở thương.',
    'Trong biểu thức: trong ngoặc trước, rồi nhân, chia, sau cùng cộng, trừ.',
    'Gấp mấy lần là phép chia; hơn bao nhiêu là phép trừ.',
  ],
};
