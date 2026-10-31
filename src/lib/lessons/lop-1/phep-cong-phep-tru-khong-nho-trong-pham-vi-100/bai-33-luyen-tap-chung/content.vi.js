/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn lại chủ đề phép cộng, phép trừ (không nhớ) trong phạm vi 100: đặt tính rồi tính, tính nhẩm số tròn chục, so sánh kết quả và giải bài toán thực tế.',
  intro:
    'Em đã học cộng, trừ các số có hai chữ số. Hôm nay em luyện tập lại và giải các bài toán nhỏ trong cuộc sống nhé!',
  objectives: [
    'Đặt tính rồi tính phép cộng, phép trừ không nhớ trong phạm vi 100.',
    'Tính nhẩm với các số tròn chục.',
    'So sánh kết quả phép tính với một số.',
    'Chọn phép tính đúng để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Đặt tính',
          text: 'Viết chục thẳng chục, đơn vị thẳng đơn vị. Viết dấu ở bên trái, kẻ vạch ngang.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính',
          text: 'Tính từ phải sang trái: hàng đơn vị trước, hàng chục sau.',
        },
        {
          type: 'tex',
          tex: '\\begin{array}{ccc} & 4 & 7 \\\\ + & 2 & 0 \\\\ \\hline & 6 & 7 \\end{array} \\qquad \\begin{array}{ccc} & 6 & 7 \\\\ - & 2 & 0 \\\\ \\hline & 4 & 7 \\end{array}',
        },
      ],
    },
    {
      heading: 'Phép cộng và phép trừ',
      blocks: [
        {
          type: 'p',
          text: 'Từ một phép cộng, em viết được hai phép trừ.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ví dụ',
          text: '47 + 20 = 67. Vậy 67 − 20 = 47 và 67 − 47 = 20.',
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        {
          type: 'p',
          text: 'Em đọc kĩ bài toán. Có thêm vào hay gộp lại không? Hay bớt đi?',
        },
        {
          type: 'table',
          head: ['Bài toán nói', 'Em làm'],
          rows: [
            ['gộp lại, thêm, có tất cả', 'phép cộng'],
            ['bớt đi, cho bạn, còn lại', 'phép trừ'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi bộ có 10 câu trộn từ cả chủ đề. Chạm vào đáp án. Sai lần đầu, em được gợi ý và thử lại. Làm xong, em xem mình cần ôn phần nào và chọn "Làm bộ bài khác".',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 56 + 41 và 97 − 56.',
      steps: [
        '56 + 41: 6 cộng 1 bằng 7, viết 7. 5 cộng 4 bằng 9, viết 9.',
        '97 − 56: 7 trừ 6 bằng 1, viết 1. 9 trừ 5 bằng 4, viết 4.',
      ],
      answer: '56 + 41 = 97 và 97 − 56 = 41.',
    },
    {
      problem: 'Bình có 45 viên bi. Bình cho bạn 12 viên bi. Bình còn lại bao nhiêu viên bi?',
      steps: [
        'Cho bạn là bớt đi: em làm phép trừ 45 − 12.',
        '5 trừ 2 bằng 3, viết 3.',
        '4 trừ 1 bằng 3, viết 3.',
      ],
      answer: '45 − 12 = 33. Bình còn lại 33 viên bi.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['47 + 20', '67 − 20', '67 − 47', '56 + 41'],
      right: ['67', '47', '20', '97'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tính hàng đơn vị trước, rồi đến hàng chục.'],
      solution: '47 + 20 = 67, 67 − 20 = 47, 67 − 47 = 20, 56 + 41 = 97.',
    },
    {
      type: 'choice',
      prompt: '97 − 41 = ?',
      options: ['46', '56', '66'],
      answer: 1,
      hints: ['Hàng đơn vị: 7 trừ 1.', 'Hàng chục: 9 trừ 4.'],
      solution: '7 trừ 1 bằng 6, viết 6. 9 trừ 4 bằng 5, viết 5. 97 − 41 = 56.',
    },
    {
      type: 'choice',
      prompt: 'Tấm thẻ nào có kết quả lớn nhất?',
      options: ['65 − 41', '89 − 60', '58 − 30', '67 − 36'],
      answer: 3,
      hints: ['Tính kết quả từng tấm thẻ rồi so sánh.'],
      solution: '65 − 41 = 24, 89 − 60 = 29, 58 − 30 = 28, 67 − 36 = 31. Lớn nhất là 31.',
    },
    {
      type: 'choice',
      prompt: 'Bạn A cao 87 cm, bạn B cao 97 cm, bạn C cao 91 cm. Bạn nào cao nhất?',
      options: ['Bạn A', 'Bạn B', 'Bạn C'],
      answer: 1,
      hints: ['So sánh 87, 97 và 91: số nào có nhiều chục nhất?'],
      solution: '97 có 9 chục và 7 đơn vị, lớn hơn 91 và 87. Bạn B cao nhất.',
    },
    {
      type: 'choice',
      prompt: 'Biết 47 + 20 = 67. Phép trừ nào đúng?',
      options: ['67 − 20 = 47', '67 − 47 = 27', '47 − 20 = 67'],
      answer: 0,
      hints: ['Lấy kết quả 67 bớt đi một số hạng thì được số hạng kia.'],
      solution: '67 − 20 = 47 và 67 − 47 = 20.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 43 + 25 ... 70',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Tính 43 + 25 trước, rồi so sánh với 70.'],
      solution: '43 + 25 = 68. 68 bé hơn 70, nên 43 + 25 < 70.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 89 − 40 ... 49',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Tính 89 − 40 trước, rồi so sánh với 49.'],
      solution: '89 − 40 = 49. Vậy 89 − 40 = 49.',
    },
    {
      type: 'choice',
      prompt: 'Lan có 32 bông hoa. Mai có 25 bông hoa. Cả hai bạn có bao nhiêu bông hoa?',
      options: ['7', '47', '57'],
      answer: 2,
      hints: ['Gộp lại thì em làm phép cộng.', 'Tính 32 + 25.'],
      solution: '32 + 25 = 57. Cả hai bạn có 57 bông hoa.',
    },
    {
      type: 'choice',
      prompt: 'Bình có 45 viên bi. Bình cho bạn 12 viên bi. Bình còn lại bao nhiêu viên bi?',
      options: ['23', '33', '57'],
      answer: 1,
      hints: ['Cho bạn là bớt đi: em làm phép trừ.', 'Tính 45 − 12.'],
      solution: '45 − 12 = 33. Bình còn lại 33 viên bi.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả phép tính có kết quả là 50.',
      options: ['20 + 30', '75 − 25', '90 − 40', '40 + 20'],
      answers: [0, 1, 2],
      hints: ['Tính từng phép tính rồi so với 50.'],
      solution: '20 + 30 = 50, 75 − 25 = 50, 90 − 40 = 50. Còn 40 + 20 = 60.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['98 − 35', '30 + 6', '54 + 45', '70 − 30'],
      answer: [1, 3, 0, 2],
      hints: ['Tính kết quả từng phép tính trước.'],
      solution:
        '30 + 6 = 36, 70 − 30 = 40, 98 − 35 = 63, 54 + 45 = 99. Thứ tự: 30 + 6, 70 − 30, 98 − 35, 54 + 45.',
    },
    {
      type: 'choice',
      prompt: 'Số nào điền vào chỗ trống? ... + 23 = 68',
      options: ['35', '45', '91'],
      answer: 1,
      hints: ['Hàng đơn vị: mấy cộng 3 bằng 8?', 'Hàng chục: mấy cộng 2 bằng 6?'],
      solution: '5 cộng 3 bằng 8, 4 cộng 2 bằng 6. Vậy 45 + 23 = 68. Số cần điền là 45.',
    },
  ],
  takeaways: [
    'Đặt tính thẳng cột, tính từ phải sang trái.',
    'Từ 47 + 20 = 67 ta có 67 − 20 = 47 và 67 − 47 = 20.',
    'Thêm, gộp lại thì cộng; bớt đi, còn lại thì trừ.',
  ],
};
