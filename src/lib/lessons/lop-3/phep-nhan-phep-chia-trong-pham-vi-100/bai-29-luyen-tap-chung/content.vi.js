/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Phép nhân, phép chia trong phạm vi 100: tính nhẩm, đặt tính, gấp lên và giảm đi một số lần, phép chia có dư và bài toán thực tế.',
  intro:
    'Rô-bốt làm thiệp, Việt trồng cây, cửa hàng bán gạo. Em dùng phép nhân và phép chia để giúp các bạn nhé!',
  objectives: [
    'Tính nhẩm với số tròn chục.',
    'Đặt tính rồi tính phép nhân, phép chia.',
    'Vận dụng gấp lên, giảm đi một số lần.',
    'Giải bài toán thực tế, có bài giải bằng hai bước tính.',
  ],
  sections: [
    {
      heading: 'Tính nhẩm số tròn chục',
      blocks: [
        { type: 'p', text: '40 × 2: 4 chục nhân 2 bằng 8 chục. Vậy 40 × 2 = 80.' },
        { type: 'p', text: '80 : 4: 8 chục chia 4 bằng 2 chục. Vậy 80 : 4 = 20.' },
      ],
    },
    {
      heading: 'Gấp lên, giảm đi, thêm, bớt',
      blocks: [
        {
          type: 'table',
          head: ['Cách nói', 'Phép tính'],
          rows: [
            ['Gấp lên một số lần', 'Nhân'],
            ['Giảm đi một số lần', 'Chia'],
            ['Thêm một số đơn vị', 'Cộng'],
            ['Bớt đi một số đơn vị', 'Trừ'],
          ],
        },
      ],
    },
    {
      heading: 'Phép chia có dư',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trong phép chia có dư, số dư luôn bé hơn số chia.',
        },
        { type: 'p', text: '35 : 3 = 11 (dư 2). Số dư 2 bé hơn số chia 3.' },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Em chạm vào đáp án đúng. Sai lần đầu, em được gợi ý và thử lại. Hết bộ, em xem phần nào cần ôn và làm bộ bài khác.',
  },
  examples: [
    {
      problem:
        'Mai làm được 27 tấm thiệp. Số tấm thiệp Rô-bốt làm được gấp 3 lần của Mai. Hỏi Rô-bốt làm được bao nhiêu tấm thiệp?',
      steps: [
        'Gấp 3 lần thì em làm phép nhân: 27 × 3.',
        '3 nhân 7 bằng 21, viết 1, nhớ 2.',
        '3 nhân 2 bằng 6, thêm 2 bằng 8, viết 8.',
        'Em được 27 × 3 = 81.',
      ],
      answer: 'Rô-bốt làm được 81 tấm thiệp.',
    },
    {
      problem:
        'Rô-bốt dùng 35 m vải để may quần áo công nhân. Mỗi bộ quần áo hết 3 m vải. Hỏi Rô-bốt may được nhiều nhất bao nhiêu bộ quần áo và còn thừa mấy mét vải?',
      steps: [
        'Em chia 35 cho 3.',
        '3 chia 3 được 1, viết 1. Hạ 5, được 5.',
        '5 chia 3 được 1, viết 1. 5 trừ 3 bằng 2.',
        'Vậy 35 : 3 = 11 (dư 2).',
        'Số dư 2 bé hơn 3, không may thêm được bộ nào.',
      ],
      answer: 'Rô-bốt may được nhiều nhất 11 bộ quần áo, còn thừa 2 m vải.',
    },
    {
      problem:
        'Việt trồng được 5 cây. Rô-bốt trồng được số cây gấp 3 lần của Việt. Hỏi cả hai bạn trồng được bao nhiêu cây?',
      steps: ['Rô-bốt trồng được: 5 × 3 = 15 (cây).', 'Cả hai bạn trồng được: 5 + 15 = 20 (cây).'],
      answer: 'Đáp số: 20 cây.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả đúng.',
      left: ['10 × 7', '20 × 4', '30 × 3', '60 : 2'],
      right: ['80', '30', '70', '90'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      hints: ['Em nhẩm theo chục, như 4 chục × 2 = 8 chục.'],
      solution: '10 × 7 = 70. 20 × 4 = 80. 30 × 3 = 90. 60 : 2 = 30.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả đúng.',
      left: ['90 : 3', '70 : 7', '40 : 2', '80 : 2'],
      right: ['20', '40', '10', '30'],
      pairs: [
        [0, 3],
        [1, 2],
        [2, 0],
        [3, 1],
      ],
      hints: ['Em nhẩm theo chục, như 8 chục : 4 = 2 chục.'],
      solution: '90 : 3 = 30. 70 : 7 = 10. 40 : 2 = 20. 80 : 2 = 40.',
    },
    {
      type: 'number',
      prompt:
        'Mai làm được 19 tấm thiệp. Số tấm thiệp Rô-bốt làm được gấp 4 lần của Mai. Rô-bốt làm được bao nhiêu tấm thiệp?',
      answer: 76,
      hints: ['Gấp 4 lần thì em làm phép nhân.', '4 nhân 9 bằng 36, viết 6, nhớ 3.'],
      solution: '19 × 4 = 76. Rô-bốt làm được 76 tấm thiệp.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 96 : 3 = ?',
      answer: 32,
      hints: ['Em chia từ hàng chục: 9 chia 3 được mấy?'],
      solution: '9 chia 3 được 3. Hạ 6, 6 chia 3 được 2. Vậy 96 : 3 = 32.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 72 : 4 = ?',
      answer: 18,
      hints: ['7 chia 4 được 1, còn dư 3.', 'Hạ 2, được 32. 32 chia 4 được mấy?'],
      solution:
        '7 chia 4 được 1, 7 trừ 4 bằng 3. Hạ 2, được 32; 32 chia 4 được 8. Vậy 72 : 4 = 18.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 58 : 5 = ?',
      options: ['11 (dư 3)', '10 (dư 8)', '12 (dư 3)', '11 (dư 2)'],
      answer: 0,
      hints: ['Số dư phải bé hơn số chia.', 'Em thử lại: thương nhân với 5, rồi cộng số dư.'],
      solution: '58 : 5 = 11 (dư 3). Thử lại: 11 × 5 + 3 = 58.',
    },
    {
      type: 'multi',
      prompt: 'Phép chia nào có dư?',
      options: ['45 : 5', '38 : 4', '27 : 3', '50 : 7'],
      answers: [1, 3],
      hints: ['Em tính từng phép chia. Phép chia nào chia hết?'],
      solution: '45 : 5 = 9 và 27 : 3 = 9 là chia hết. 38 : 4 = 9 (dư 2). 50 : 7 = 7 (dư 1).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cách nói với kết quả đúng.',
      left: ['32 giảm đi 2 lần', '27 gấp lên 3 lần', '24 giảm đi 2 lần', '24 bớt đi 2 đơn vị'],
      right: ['12', '22', '81', '16'],
      pairs: [
        [0, 3],
        [1, 2],
        [2, 0],
        [3, 1],
      ],
      hints: ['Giảm đi mấy lần là chia, gấp lên mấy lần là nhân.', 'Bớt đi mấy đơn vị là trừ.'],
      solution: '32 : 2 = 16. 27 × 3 = 81. 24 : 2 = 12. 24 − 2 = 22.',
    },
    {
      type: 'number',
      prompt: 'Từ số 40, em giảm đi 2 lần, rồi thêm 7 đơn vị. Em được số nào?',
      answer: 27,
      hints: ['Em làm lần lượt: chia trước, rồi cộng.'],
      solution: '40 : 2 = 20. 20 + 7 = 27.',
    },
    {
      type: 'number',
      prompt:
        'Buổi sáng cửa hàng bán được 30 kg gạo. Số gạo buổi chiều bán được bằng số gạo buổi sáng giảm đi 2 lần. Buổi chiều bán được bao nhiêu ki-lô-gam gạo?',
      answer: 15,
      hints: ['Giảm đi 2 lần thì em làm phép chia.'],
      solution: '30 : 2 = 15. Buổi chiều bán được 15 kg gạo.',
    },
    {
      type: 'choice',
      prompt:
        'Có 47 m vải. Mỗi bộ quần áo may hết 3 m vải. May được nhiều nhất bao nhiêu bộ và còn thừa mấy mét vải?',
      options: ['15 bộ, thừa 2 m', '14 bộ, thừa 5 m', '16 bộ, thừa 2 m', '15 bộ, thừa 1 m'],
      answer: 0,
      hints: ['Em tính 47 : 3.', 'Phần còn thừa phải bé hơn 3.'],
      solution: '47 : 3 = 15 (dư 2). May được 15 bộ, còn thừa 2 m vải.',
    },
    {
      type: 'number',
      prompt:
        'Việt trồng được 6 cây. Rô-bốt trồng được số cây gấp 4 lần của Việt. Cả hai bạn trồng được bao nhiêu cây?',
      answer: 30,
      hints: ['Bước 1: tìm số cây Rô-bốt trồng.', 'Bước 2: cộng số cây của hai bạn.'],
      solution: 'Rô-bốt: 6 × 4 = 24 (cây). Cả hai bạn: 6 + 24 = 30 (cây).',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['17 × 3', '13 × 4', '96 : 2', '25 × 2'],
      answer: [2, 3, 0, 1],
      hints: ['Em tính từng phép tính trước.'],
      solution: '96 : 2 = 48. 25 × 2 = 50. 17 × 3 = 51. 13 × 4 = 52.',
    },
  ],
  takeaways: [
    'Gấp lên mấy lần là nhân, giảm đi mấy lần là chia. Thêm là cộng, bớt là trừ.',
    'Số dư luôn bé hơn số chia.',
    'Bài toán hai bước: tìm số còn thiếu trước, rồi trả lời câu hỏi.',
  ],
};
