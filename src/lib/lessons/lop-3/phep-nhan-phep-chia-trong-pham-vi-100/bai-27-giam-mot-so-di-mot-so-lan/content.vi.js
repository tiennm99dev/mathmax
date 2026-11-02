/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần; phân biệt giảm đi một số lần với bớt đi một số đơn vị.',
  intro:
    'Nam có 42 nhãn vở. Sau khi cho bạn, số nhãn vở giảm đi 3 lần. Nam còn bao nhiêu nhãn vở? Em dùng băng giấy để xem nhé!',
  objectives: [
    'Biết cách giảm một số đi một số lần.',
    'Phân biệt giảm đi một số lần và bớt đi một số đơn vị.',
    'Giải bài toán có giảm đi một số lần.',
  ],
  sections: [
    {
      heading: 'Giảm một số đi một số lần',
      blocks: [
        {
          type: 'p',
          text: 'Băng giấy dài 18 cm. Em cắt băng thành 3 phần bằng nhau, giữ lại 1 phần.',
        },
        { type: 'p', text: 'Phần giữ lại dài: 18 : 3 = 6 (cm).' },
        { type: 'p', text: 'Ta nói: 18 giảm đi 3 lần được 6.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần.',
        },
      ],
    },
    {
      heading: 'Giảm đi và bớt đi',
      blocks: [
        { type: 'p', text: 'Hai cách nói này khác nhau. Em đừng nhầm nhé.' },
        {
          type: 'table',
          head: ['Cách nói', 'Phép tính', 'Kết quả'],
          rows: [
            ['18 giảm đi 3 lần', '18 : 3', '6'],
            ['18 bớt đi 3 đơn vị', '18 − 3', '15'],
          ],
        },
      ],
    },
    {
      heading: 'Gấp lên và giảm đi',
      blocks: [
        { type: 'p', text: 'Gấp lên một số lần thì em nhân. Giảm đi một số lần thì em chia.' },
        { type: 'p', text: '6 gấp lên 3 lần được 18. 18 giảm đi 3 lần lại được 6.' },
      ],
    },
  ],
  explore: {
    title: 'Cắt băng giấy',
    instruction:
      'Em bấm "Cắt thêm một phần" cho đủ số phần bằng nhau. Khi đúng, chỉ 1 phần được giữ lại, đó là kết quả. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem:
        'Nam có 42 nhãn vở. Sau khi cho bạn, số nhãn vở giảm đi 3 lần. Hỏi Nam còn bao nhiêu nhãn vở?',
      steps: ['Số nhãn vở còn lại là 42 giảm đi 3 lần.', 'Em làm phép chia: 42 : 3 = 14.'],
      answer: 'Nam còn 14 nhãn vở.',
    },
    {
      problem:
        'Rô-bốt có 30 đồng vàng. Số đồng vàng giảm đi 3 lần, rồi lại gấp lên 4 lần. Rô-bốt có bao nhiêu đồng vàng?',
      steps: ['Giảm đi 3 lần: 30 : 3 = 10.', 'Gấp lên 4 lần: 10 × 4 = 40.'],
      answer: 'Rô-bốt có 40 đồng vàng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Giảm 56 đi 7 lần được mấy?',
      answer: 8,
      hints: ['Giảm đi một số lần thì em làm phép chia.'],
      solution: '56 : 7 = 8.',
    },
    {
      type: 'number',
      prompt: 'Giảm 32 đi 2 lần được mấy?',
      answer: 16,
      hints: ['Em tính 32 : 2.', '3 chia 2 được 1, còn dư 1. Hạ 2, được 12.'],
      solution:
        '3 chia 2 được 1; 3 trừ 2 bằng 1. Hạ 2, được 12; 12 chia 2 được 6. Vậy 32 : 2 = 16.',
    },
    {
      type: 'choice',
      prompt: 'Bớt 24 đi 2 đơn vị được mấy?',
      options: ['22', '12', '26', '48'],
      answer: 0,
      hints: ['Bớt đi một số đơn vị thì em làm phép trừ.'],
      solution: '24 − 2 = 22.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cách nói với kết quả đúng.',
      left: ['30 giảm đi 3 lần', '30 bớt đi 3 đơn vị', '30 gấp lên 3 lần', '30 thêm 3 đơn vị'],
      right: ['10', '27', '90', '33'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Giảm là chia, bớt là trừ.', 'Gấp là nhân, thêm là cộng.'],
      solution: '30 : 3 = 10. 30 − 3 = 27. 30 × 3 = 90. 30 + 3 = 33.',
    },
    {
      type: 'choice',
      prompt: 'Giảm 36 đi 9 lần. Em làm phép tính nào?',
      options: ['36 : 9', '36 − 9', '36 × 9', '36 + 9'],
      answer: 0,
      hints: ['Giảm đi một số lần là phép gì?'],
      solution: 'Muốn giảm 36 đi 9 lần, em lấy 36 chia cho 9: 36 : 9 = 4.',
    },
    {
      type: 'number',
      prompt:
        'Mai có 28 cái bút màu. Sau khoá học, số bút giảm đi 4 lần. Mai còn bao nhiêu cái bút màu?',
      answer: 7,
      hints: ['Số bút còn lại là 28 giảm đi 4 lần.'],
      solution: '28 : 4 = 7. Mai còn 7 cái bút màu.',
    },
    {
      type: 'choice',
      prompt: 'Rô-bốt có 30 đồng vàng. Đường nào giúp Rô-bốt có đúng 40 đồng vàng?',
      options: [
        'Giảm đi 3 lần, rồi gấp lên 4 lần',
        'Gấp lên 2 lần, rồi gấp lên 4 lần',
        'Giảm đi 5 lần, rồi gấp lên 4 lần',
      ],
      answer: 0,
      hints: ['Em tính thử từng đường, làm lần lượt từng bước.'],
      solution: '30 : 3 = 10, 10 × 4 = 40. Hai đường kia được 240 và 24 đồng vàng.',
    },
    {
      type: 'number',
      prompt:
        'Một băng giấy dài 54 cm. Em giảm độ dài băng đi 6 lần. Băng còn dài bao nhiêu xăng-ti-mét?',
      answer: 9,
      hints: ['Em cắt băng thành 6 phần bằng nhau, giữ lại 1 phần.'],
      solution: '54 : 6 = 9. Băng còn dài 9 cm.',
    },
  ],
  takeaways: [
    'Giảm một số đi một số lần: lấy số đó chia cho số lần.',
    'Bớt đi một số đơn vị: lấy số đó trừ đi số đơn vị.',
  ],
};
