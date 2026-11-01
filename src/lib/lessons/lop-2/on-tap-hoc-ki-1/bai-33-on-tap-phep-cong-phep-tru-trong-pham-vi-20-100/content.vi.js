/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép cộng, phép trừ trong phạm vi 20 và 100: tính nhẩm qua 10, số tròn chục, đặt tính có nhớ, tính theo mũi tên, tháp số và giải bài toán.',
  intro:
    'Em đã học cộng, trừ trong phạm vi 20 và phạm vi 100. Hôm nay em ôn lại tất cả. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Tính nhẩm phép cộng, phép trừ qua 10 trong phạm vi 20.',
    'Tính nhẩm với số tròn chục.',
    'Đặt tính rồi tính phép cộng, phép trừ có nhớ trong phạm vi 100.',
    'Giải bài toán về thêm, bớt, nhiều hơn, ít hơn.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Trong phạm vi 20',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng qua 10',
          text: '8 + 5: em tách 5 thành 2 và 3. 8 + 2 = 10, 10 + 3 = 13. Vậy 8 + 5 = 13.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trừ qua 10',
          text: '14 − 5: em tách 5 thành 4 và 1. 14 − 4 = 10, 10 − 1 = 9. Vậy 14 − 5 = 9.',
        },
      ],
    },
    {
      heading: 'Số tròn chục',
      blocks: [
        {
          type: 'p',
          text: 'Em tính theo số chục. 50 + 10 = 60, vì 5 chục + 1 chục = 6 chục.',
        },
        {
          type: 'p',
          text: '70 − 20 = 50, vì 7 chục − 2 chục = 5 chục.',
        },
      ],
    },
    {
      heading: 'Đặt tính có nhớ',
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
          title: 'Phép cộng',
          text: '36 + 7: 6 cộng 7 bằng 13, viết 3, nhớ 1. 3 thêm 1 bằng 4, viết 4. Vậy 36 + 7 = 43.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phép trừ',
          text: '82 − 57: 2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1. 5 thêm 1 bằng 6, 8 trừ 6 bằng 2, viết 2. Vậy 82 − 57 = 25.',
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
      problem: 'Đặt tính rồi tính: 28 + 35.',
      steps: [
        'Viết 28, viết 35 bên dưới. Đơn vị thẳng đơn vị, chục thẳng chục.',
        'Hàng đơn vị: 8 cộng 5 bằng 13, viết 3, nhớ 1.',
        'Hàng chục: 2 cộng 3 bằng 5, thêm 1 bằng 6, viết 6.',
      ],
      answer: '28 + 35 = 63.',
    },
    {
      problem:
        'Buổi sáng, cửa hàng bán được 11 máy tính. Buổi chiều bán ít hơn buổi sáng 3 máy tính. Hỏi buổi chiều bán được bao nhiêu máy tính?',
      steps: [
        'Ít hơn thì em làm phép trừ: 11 − 3.',
        'Bài giải: Buổi chiều bán được số máy tính là: 11 − 3 = 8 (máy tính).',
      ],
      answer: 'Đáp số: 8 máy tính.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: ['12 − 5', '14 − 9', '8 + 3', '9 + 4'],
      right: ['7', '5', '11', '13', '9'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tính nhẩm từng phép tính. Với phép trừ, em bớt để được 10 trước.'],
      solution: '12 − 5 = 7. 14 − 9 = 5. 8 + 3 = 11. 9 + 4 = 13.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 8 + 7 ... 6 + 8',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em tính kết quả hai bên, rồi so sánh.'],
      solution: '8 + 7 = 15, 6 + 8 = 14. 15 > 14, nên 8 + 7 > 6 + 8.',
    },
    {
      type: 'choice',
      prompt:
        'Lớp 2A có 8 bạn học hát. Số bạn học võ nhiều hơn số bạn học hát 5 bạn. Hỏi lớp 2A có bao nhiêu bạn học võ?',
      options: ['3 bạn', '12 bạn', '13 bạn'],
      answer: 2,
      hints: ['Nhiều hơn thì em làm phép cộng.'],
      solution: 'Số bạn học võ là: 8 + 5 = 13 (bạn). Đáp số: 13 bạn.',
    },
    {
      type: 'choice',
      prompt:
        'Đĩa bên trái có túi gạo 3 kg và túi gạo 9 kg. Em lấy hai túi nào đặt lên đĩa bên phải để cân thăng bằng?',
      options: ['Túi 5 kg và túi 6 kg', 'Túi 5 kg và túi 7 kg', 'Túi 6 kg và túi 7 kg'],
      answer: 1,
      hints: ['Em tính đĩa bên trái trước. Hai túi kia phải nặng bằng chừng đó.'],
      solution: '3 + 9 = 12 (kg). 5 + 7 = 12 (kg). Em chọn túi 5 kg và túi 7 kg.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bé hơn 60?',
      options: ['50 + 10', '60 − 30', '70 − 20', '60 + 40'],
      answers: [1, 2],
      hints: ['Em tính từng phép tính theo số chục, rồi so sánh với 60.'],
      solution: '50 + 10 = 60, 60 − 30 = 30, 70 − 20 = 50, 60 + 40 = 100. Bé hơn 60 là 30 và 50.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 63 − 28 = ?',
      answer: 35,
      hints: ['3 không trừ được 8. Em lấy 13 trừ 8, rồi nhớ 1.'],
      solution:
        '3 không trừ được 8, lấy 13 trừ 8 bằng 5, viết 5, nhớ 1. 2 thêm 1 bằng 3, 6 trừ 3 bằng 3, viết 3. Vậy 63 − 28 = 35.',
    },
    {
      type: 'match',
      prompt: 'Mỗi ô tô đỗ ở chỗ ghi kết quả phép tính trên xe. Em nối ô tô với chỗ đỗ.',
      left: ['14 + 16', '72 − 45', '65 − 12', '34 + 16'],
      right: ['30', '27', '53', '50', '40'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tính hàng đơn vị trước, nhớ 1 khi cần.'],
      solution: '14 + 16 = 30. 72 − 45 = 27. 65 − 12 = 53. 34 + 16 = 50.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['42 + 49', '91 − 42', '91 − 49', '28 + 35'],
      answer: [2, 1, 3, 0],
      hints: ['Em tính kết quả từng phép tính trước.'],
      solution: '91 − 49 = 42, 91 − 42 = 49, 28 + 35 = 63, 42 + 49 = 91.',
    },
    {
      type: 'choice',
      prompt: 'Em tính theo chiều mũi tên: 18 → cộng 17 → trừ 9. Ô cuối cùng là số nào?',
      options: ['25', '26', '36'],
      answer: 1,
      hints: ['Kết quả của phép trước là số đầu của phép sau.'],
      solution: '18 + 17 = 35. 35 − 9 = 26. Ô cuối cùng là 26.',
    },
    {
      type: 'number',
      prompt:
        'Trong tháp số, số ở trên bằng tổng hai số ngay dưới nó. Hàng dưới cùng là 3, 4, 4. Số ở đỉnh tháp là bao nhiêu?',
      answer: 15,
      hints: ['Hàng giữa có hai số: 3 + 4 và 4 + 4.'],
      solution: '3 + 4 = 7. 4 + 4 = 8. 7 + 8 = 15. Đỉnh tháp là 15.',
    },
    {
      type: 'number',
      prompt:
        'Đội đồng diễn có 56 người mặc áo đỏ và 28 người mặc áo vàng. Hỏi đội có tất cả bao nhiêu người?',
      answer: 84,
      hints: ['Có tất cả thì em làm phép cộng. Hàng đơn vị: 6 + 8 có nhớ.'],
      solution: 'Đội có tất cả số người là: 56 + 28 = 84 (người). Đáp số: 84 người.',
    },
    {
      type: 'choice',
      prompt: 'Thanh gỗ dài 92 cm. Bác thợ mộc cưa đi 27 cm. Hỏi thanh gỗ còn lại dài bao nhiêu?',
      options: ['65 cm', '75 cm', '119 cm'],
      answer: 0,
      hints: ['Cưa đi là bớt đi. Em tính 92 − 27 và đừng quên nhớ 1.'],
      solution: 'Thanh gỗ còn lại dài là: 92 − 27 = 65 (cm). Đáp số: 65 cm.',
    },
  ],
  takeaways: [
    'Cộng, trừ qua 10: em làm cho tròn 10 trước.',
    'Đặt tính: thẳng cột, tính từ phải sang trái, nhớ 1 khi cần.',
    'Nhiều hơn, thêm, có tất cả thì cộng. Ít hơn, bớt đi, còn lại thì trừ.',
  ],
};
