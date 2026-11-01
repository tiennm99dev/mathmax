/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: đọc cân đĩa, nặng hơn, nhẹ hơn, đếm số lít bằng ca 1 l, cộng trừ với kg và l, giải bài toán về khối lượng và dung tích.',
  intro:
    'Em đã biết ki-lô-gam và lít. Hôm nay em luyện đọc cân, đếm số lít, tính với kg, l và giải bài toán nhé!',
  objectives: [
    'Đọc cân đĩa: nặng hơn, nhẹ hơn, cân nặng bao nhiêu ki-lô-gam.',
    'Đếm số ca 1 l để biết đồ vật chứa được mấy lít.',
    'Cộng, trừ với số đo kg và l.',
    'Giải và trình bày bài toán có số đo kg, l.',
  ],
  sections: [
    {
      heading: 'Nhớ lại ki-lô-gam',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Cân đĩa',
          text: 'Đĩa cân thấp hơn thì vật trên đó nặng hơn. Cân thăng bằng thì vật nặng bằng các quả cân ở đĩa kia.',
        },
        {
          type: 'p',
          text: 'Ki-lô-gam viết tắt là kg. Ví dụ: quả cân 5 kg và quả cân 1 kg cân bằng con ngỗng, vậy con ngỗng nặng 5 + 1 = 6 (kg).',
        },
      ],
    },
    {
      heading: 'Nhớ lại lít',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Ca 1 l',
          text: 'Rót hết nước ra những ca 1 l. Có bao nhiêu ca đầy thì đồ vật chứa được bấy nhiêu lít.',
        },
        {
          type: 'p',
          text: 'Lít viết tắt là l. Tính với số đo: 6 l + 4 l = 10 l, 12 l − 5 l = 7 l.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi lượt có 12 câu. Em nhìn hình, chạm vào đáp án đúng. Sai lần đầu, em được xem gợi ý và chọn lại. Cuối lượt, em xem phần nào cần ôn và chạm "Làm bộ bài khác".',
  },
  examples: [
    {
      problem:
        'Con vịt ở một đĩa cân. Đĩa kia có quả cân 2 kg và quả cân 1 kg. Cân thăng bằng. Con vịt nặng mấy ki-lô-gam?',
      steps: ['Cân thăng bằng: con vịt nặng bằng hai quả cân cộng lại.', '2 + 1 = 3 (kg).'],
      answer: 'Con vịt cân nặng 3 kg.',
    },
    {
      problem:
        'Thùng thứ nhất có 9 l nước. Thùng thứ hai có nhiều hơn thùng thứ nhất 5 l nước. Hỏi thùng thứ hai có bao nhiêu lít nước?',
      steps: [
        'Tóm tắt: Thùng thứ nhất: 9 l. Thùng thứ hai nhiều hơn: 5 l. Thùng thứ hai: ... l?',
        'Nhiều hơn thì em làm phép cộng: 9 + 5.',
        '9 + 1 = 10, 10 + 4 = 14. Vậy 9 + 5 = 14.',
        'Bài giải: Thùng thứ hai có số lít nước là: 9 + 5 = 14 (l).',
      ],
      answer: 'Đáp số: 14 l nước.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trên cân đĩa, đĩa có túi đường cao hơn đĩa có quả bí ngô. Vật nào nhẹ hơn?',
      options: ['Túi đường', 'Quả bí ngô'],
      answer: 0,
      hints: ['Đĩa cao hơn thì vật trên đó nặng hơn hay nhẹ hơn?'],
      solution: 'Đĩa có túi đường cao hơn, nên túi đường nhẹ hơn quả bí ngô.',
    },
    {
      type: 'choice',
      prompt:
        'Bao gạo ở một đĩa cân. Đĩa kia có quả cân 5 kg và quả cân 2 kg. Cân thăng bằng. Bao gạo nặng mấy ki-lô-gam?',
      options: ['5 kg', '7 kg', '3 kg'],
      answer: 1,
      hints: ['Cân thăng bằng: bao gạo nặng bằng cả hai quả cân.'],
      solution: '5 + 2 = 7. Bao gạo cân nặng 7 kg.',
    },
    {
      type: 'choice',
      prompt: 'Rót hết nước trong xô ra, được đầy 9 ca 1 l. Xô chứa được mấy lít nước?',
      options: ['8 l', '9 l', '10 l'],
      answer: 1,
      hints: ['Mỗi ca đầy là 1 l.'],
      solution: 'Có 9 ca đầy, mỗi ca 1 l. Xô chứa được 9 l nước.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả đúng.',
      left: ['7 kg + 8 kg', '16 kg − 9 kg', '6 l + 5 l', '13 l − 4 l'],
      right: ['15 kg', '7 kg', '11 l', '9 l', '15 l'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tính như với các số, rồi giữ đúng đơn vị: kg đi với kg, l đi với l.'],
      solution:
        '7 + 8 = 15, nên 15 kg. 16 − 9 = 7, nên 7 kg. 6 + 5 = 11, nên 11 l. 13 − 4 = 9, nên 9 l.',
    },
    {
      type: 'choice',
      prompt: '40 kg + 20 kg = ?',
      options: ['60 kg', '20 kg', '50 kg'],
      answer: 0,
      hints: ['4 chục cộng 2 chục bằng mấy chục?'],
      solution: '40 + 20 = 60, nên 40 kg + 20 kg = 60 kg.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 8 kg ... 5 kg + 2 kg',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em tính 5 kg + 2 kg trước.'],
      solution: '5 kg + 2 kg = 7 kg. 8 kg lớn hơn 7 kg, nên 8 kg > 5 kg + 2 kg.',
    },
    {
      type: 'choice',
      prompt: 'Đồ vật nào thường chứa được khoảng 1 l nước?',
      options: ['Cái thìa', 'Chai nước to', 'Bể bơi'],
      answer: 1,
      hints: ['Ca 1 l to bằng chai nước to.'],
      solution: 'Chai nước to chứa được khoảng 1 l. Thìa chứa rất ít, bể bơi chứa rất nhiều.',
    },
    {
      type: 'order',
      prompt: 'Xếp các con vật từ nhẹ nhất đến nặng nhất.',
      items: ['Con ngỗng 5 kg', 'Con gà 2 kg', 'Con dê 20 kg', 'Con chó 8 kg'],
      answer: [1, 0, 3, 2],
      hints: ['So sánh các số 5, 2, 20 và 8.'],
      solution: '2 kg < 5 kg < 8 kg < 20 kg: con gà, con ngỗng, con chó, con dê.',
    },
    {
      type: 'choice',
      prompt:
        'Con ngỗng nặng 5 kg. Con dê nặng hơn con ngỗng 15 kg. Hỏi con dê nặng bao nhiêu ki-lô-gam?',
      options: ['10 kg', '20 kg', '15 kg'],
      answer: 1,
      hints: ['Nặng hơn thì em làm phép cộng.'],
      solution: 'Con dê nặng là: 5 + 15 = 20 (kg). Đáp số: 20 kg.',
    },
    {
      type: 'choice',
      prompt:
        'Can to đựng 15 l dầu. Can bé đựng ít hơn can to 7 l dầu. Hỏi can bé đựng bao nhiêu lít dầu?',
      options: ['8 l', '22 l', '9 l'],
      answer: 0,
      hints: ['Ít hơn thì em làm phép trừ.', '15 − 5 = 10, rồi trừ tiếp 2.'],
      solution: 'Can bé đựng số lít dầu là: 15 − 7 = 8 (l). Đáp số: 8 l dầu.',
    },
    {
      type: 'order',
      prompt:
        'Mẹ mua 10 kg gạo và 5 kg ngô. Mẹ mua tất cả bao nhiêu ki-lô-gam? Xếp các dòng của bài giải theo đúng thứ tự.',
      items: ['Đáp số: 15 kg.', 'Mẹ mua tất cả số ki-lô-gam là:', '10 + 5 = 15 (kg)'],
      answer: [1, 2, 0],
      hints: ['Câu lời giải viết trước, đáp số viết cuối cùng.'],
      solution: 'Mẹ mua tất cả số ki-lô-gam là: 10 + 5 = 15 (kg). Đáp số: 15 kg.',
    },
  ],
  takeaways: [
    'Đọc cân đĩa: đĩa thấp hơn thì nặng hơn; cân thăng bằng thì vật nặng bằng các quả cân.',
    'Đếm số ca 1 l đầy để biết số lít.',
    'Tính với kg, l như với các số, rồi viết đơn vị sau kết quả.',
  ],
};
