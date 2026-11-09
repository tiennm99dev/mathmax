/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép cộng, phép trừ trong phạm vi 100: tính nhẩm số tròn chục, đặt tính có nhớ, tính từ trái sang phải, so sánh kết quả và giải bài toán.',
  intro:
    'Em đã biết cộng, trừ trong phạm vi 100. Hôm nay em tính nhẩm, đặt tính và giải bài toán. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Tính nhẩm các số tròn chục.',
    'Đặt tính rồi tính phép cộng, phép trừ có nhớ trong phạm vi 100.',
    'Tính phép tính có hai dấu từ trái sang phải.',
    'Giải bài toán về nhiều hơn, ít hơn.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Tính nhẩm số tròn chục',
      blocks: [
        {
          type: 'p',
          text: 'Em tính theo số chục. 40 + 30 = 70, vì 4 chục + 3 chục = 7 chục.',
        },
        {
          type: 'p',
          text: '100 − 40 = 60, vì 10 chục − 4 chục = 6 chục.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết các chữ số cùng hàng thẳng cột với nhau.',
            'Tính từ phải sang trái: hàng đơn vị trước, hàng chục sau.',
            'Đừng quên nhớ 1 sang hàng chục.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phép trừ có nhớ',
          text: '71 − 26: 1 không trừ được 6, lấy 11 trừ 6 bằng 5, viết 5, nhớ 1. 2 thêm 1 bằng 3, 7 trừ 3 bằng 4, viết 4. Vậy 71 − 26 = 45.',
        },
      ],
    },
    {
      heading: 'Phép tính có hai dấu',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Phép tính có hai dấu cộng, trừ: em tính từ trái sang phải.',
        },
        {
          type: 'p',
          text: '35 + 18 − 6: 35 + 18 = 53, rồi 53 − 6 = 47. Vậy 35 + 18 − 6 = 47.',
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        {
          type: 'table',
          head: ['Bài toán hỏi', 'Em làm'],
          rows: [
            ['Có tất cả, nhiều hơn', 'Phép cộng'],
            ['Còn lại, ít hơn', 'Phép trừ'],
            ['Hơn nhau bao nhiêu', 'Lấy số lớn trừ số bé'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 12 câu. Đầu tiên em làm mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 57 + 28.',
      steps: [
        'Viết 57, viết 28 bên dưới. Đơn vị thẳng đơn vị, chục thẳng chục.',
        'Hàng đơn vị: 7 cộng 8 bằng 15, viết 5, nhớ 1.',
        'Hàng chục: 5 cộng 2 bằng 7, thêm 1 bằng 8, viết 8.',
      ],
      answer: '57 + 28 = 85.',
    },
    {
      problem:
        'Từ Hà Nội đến Nam Định dài 90 km. Từ Hà Nội đến Hoà Bình dài 76 km. Quãng đường từ Hà Nội đến Nam Định dài hơn quãng đường từ Hà Nội đến Hoà Bình bao nhiêu ki-lô-mét?',
      steps: [
        'Muốn biết dài hơn bao nhiêu, em lấy số lớn trừ số bé: 90 − 76.',
        'Bài giải: Quãng đường dài hơn số ki-lô-mét là: 90 − 76 = 14 (km).',
      ],
      answer: 'Đáp số: 14 km.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: ['30 + 40', '70 − 50', '100 − 60', '50 + 50'],
      right: ['70', '20', '40', '100', '90'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tính theo số chục.'],
      solution: '30 + 40 = 70. 70 − 50 = 20. 100 − 60 = 40. 50 + 50 = 100.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 24 + 67 = ?',
      answer: 91,
      hints: ['Hàng đơn vị: 4 cộng 7 được hơn 10. Em nhớ 1 sang hàng chục.'],
      solution:
        '4 cộng 7 bằng 11, viết 1, nhớ 1. 2 cộng 6 bằng 8, thêm 1 bằng 9, viết 9. Vậy 24 + 67 = 91.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 83 − 19 = ?',
      answer: 64,
      hints: ['3 không trừ được 9. Em lấy 13 trừ 9, rồi nhớ 1.'],
      solution:
        '3 không trừ được 9, lấy 13 trừ 9 bằng 4, viết 4, nhớ 1. 1 thêm 1 bằng 2, 8 trừ 2 bằng 6, viết 6. Vậy 83 − 19 = 64.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bé hơn 45?',
      options: ['20 + 19', '60 + 8', '94 − 50', '75 − 5'],
      answers: [0, 2],
      hints: ['Em tính từng phép tính, rồi so sánh với 45.'],
      solution: '20 + 19 = 39. 60 + 8 = 68. 94 − 50 = 44. 75 − 5 = 70. Bé hơn 45 là 39 và 44.',
    },
    {
      type: 'choice',
      prompt: 'Phép tính nào có kết quả lớn nhất?',
      options: ['37 + 40', '88 − 18', '70 + 5', '100 − 20'],
      answer: 3,
      hints: ['Em tính từng phép tính, rồi so sánh các kết quả.'],
      solution: '37 + 40 = 77. 88 − 18 = 70. 70 + 5 = 75. 100 − 20 = 80. Lớn nhất là 80.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Nam tính 46 + 39 = 75. Bạn ấy làm đúng hay sai?',
      options: ['Đúng', 'Sai'],
      answer: 1,
      hints: ['Hàng đơn vị: 6 cộng 9 được hơn 10. Bạn ấy có nhớ 1 không?'],
      solution:
        '6 cộng 9 bằng 15, viết 5, nhớ 1. 4 cộng 3 bằng 7, thêm 1 bằng 8, viết 8. 46 + 39 = 85. Bạn Nam quên nhớ 1.',
    },
    {
      type: 'number',
      prompt: 'Năm nay bà 58 tuổi. Ông hơn bà 5 tuổi. Hỏi năm nay ông bao nhiêu tuổi?',
      answer: 63,
      unit: 'tuổi',
      hints: ['Ông hơn bà, nên em làm phép cộng.'],
      solution: 'Năm nay ông có số tuổi là: 58 + 5 = 63 (tuổi). Đáp số: 63 tuổi.',
    },
    {
      type: 'choice',
      prompt:
        'Mỗi ngày, con bò nhà bác An cho 20 l sữa. Con bò nhà bác Bình cho ít hơn con bò nhà bác An 5 l. Hỏi con bò nhà bác Bình cho bao nhiêu lít sữa mỗi ngày?',
      options: ['15 l', '25 l', '5 l'],
      answer: 0,
      hints: ['Ít hơn thì em làm phép trừ.'],
      solution: 'Con bò nhà bác Bình cho số lít sữa là: 20 − 5 = 15 (l). Đáp số: 15 l.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 54 + 29 − 8 = ?',
      answer: 75,
      hints: ['Em tính từ trái sang phải: 54 + 29 trước.'],
      solution: '54 + 29 = 83. 83 − 8 = 75.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 85 − 68 ... 20',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em tính 85 − 68 trước, rồi so sánh với 20.'],
      solution: '85 − 68 = 17. 17 < 20, nên 85 − 68 < 20.',
    },
    {
      type: 'number',
      prompt: 'Em tính theo chiều mũi tên: 74 → trừ 69 → cộng 48 → trừ 30. Ô cuối cùng là số nào?',
      answer: 23,
      hints: ['Kết quả của phép trước là số đầu của phép sau.'],
      solution: '74 − 69 = 5. 5 + 48 = 53. 53 − 30 = 23. Ô cuối cùng là 23.',
    },
    {
      type: 'number',
      prompt: 'Chữ số nào thay được dấu hỏi? 4? + 25 = 72',
      answer: 7,
      hints: ['Em xem hàng đơn vị: chữ số đó cộng 5 phải có chữ số đơn vị là 2.'],
      solution:
        '7 cộng 5 bằng 12, viết 2, nhớ 1. 4 cộng 2 bằng 6, thêm 1 bằng 7. Vậy 47 + 25 = 72.',
    },
  ],
  takeaways: [
    'Số tròn chục: em tính theo số chục.',
    'Đặt tính: thẳng cột, tính từ phải sang trái, nhớ 1 khi cần.',
    'Phép tính có hai dấu: tính từ trái sang phải.',
    'Hơn nhau bao nhiêu: lấy số lớn trừ số bé.',
  ],
};
