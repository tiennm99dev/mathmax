/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép nhân, phép chia trong phạm vi 100, 1 000: tính nhẩm, đặt tính, số dư, tìm thành phần chưa biết và giải bài toán.',
  intro:
    'Hai xe chở học sinh đi tham quan, mỗi xe chở 45 bạn. Có tất cả bao nhiêu bạn? Hôm nay em ôn lại phép nhân, phép chia. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Tính nhẩm với số tròn chục, số tròn trăm.',
    'Đặt tính rồi tính phép nhân, phép chia trong phạm vi 100, 1 000.',
    'Biết số dư luôn bé hơn số chia.',
    'Tìm thừa số, số bị chia, số chia.',
    'Giải bài toán có phép nhân, phép chia.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Tính nhẩm',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Số tròn chục',
          text: '40 × 2: em nhẩm 4 chục × 2 = 8 chục. Vậy 40 × 2 = 80.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Số tròn trăm',
          text: '800 : 4: em nhẩm 8 trăm : 4 = 2 trăm. Vậy 800 : 4 = 200.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'table',
          head: ['Phép tính', 'Em làm thế nào?'],
          rows: [
            ['Nhân', 'Nhân từ phải sang trái. Nhớ thêm số đã nhớ.'],
            ['Chia', 'Chia từ trái sang phải. Chia, nhân, trừ, hạ.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Số dư luôn bé hơn số chia. Ví dụ: 95 : 8 = 11 (dư 7), vì 7 bé hơn 8.',
        },
      ],
    },
    {
      heading: 'Tìm thành phần chưa biết',
      blocks: [
        {
          type: 'table',
          head: ['Muốn tìm', 'Em làm', 'Ví dụ'],
          rows: [
            ['Thừa số', 'Tích : thừa số kia', '? × 6 = 186, ? = 186 : 6 = 31'],
            ['Số bị chia', 'Thương × số chia', '? : 7 = 105, ? = 105 × 7 = 735'],
            ['Số chia', 'Số bị chia : thương', '72 : ? = 8, ? = 72 : 8 = 9'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Em chạm vào đáp án đúng. Sai lần đầu sẽ có gợi ý. Phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Bảng màu cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 107 × 9.',
      steps: [
        '9 nhân 7 bằng 63, viết 3, nhớ 6.',
        '9 nhân 0 bằng 0, thêm 6 bằng 6, viết 6.',
        '9 nhân 1 bằng 9, viết 9.',
      ],
      answer: '107 × 9 = 963.',
    },
    {
      problem: 'Trong thùng có 28 l nước mắm. Cần ít nhất bao nhiêu can loại 5 l để chứa hết?',
      steps: [
        'Em chia: 28 : 5 = 5 (dư 3).',
        '5 can chứa được 25 l, còn thừa 3 l.',
        '3 l đó cần thêm 1 can nữa: 5 + 1 = 6.',
      ],
      answer: 'Cần ít nhất 6 can.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính nhẩm: 30 × 3 = ?',
      answer: 90,
      hints: ['3 chục × 3 = mấy chục?'],
      solution: '3 chục × 3 = 9 chục. Vậy 30 × 3 = 90.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm: 100 : 5 = ?',
      answer: 20,
      hints: ['10 chục : 5 = mấy chục?'],
      solution: '10 chục : 5 = 2 chục. Vậy 100 : 5 = 20.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm: 400 × 2 = ?',
      answer: 800,
      hints: ['4 trăm × 2 = mấy trăm?'],
      solution: '4 trăm × 2 = 8 trăm. Vậy 400 × 2 = 800.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: ['34 × 2', '15 × 6', '23 × 4', '69 : 3'],
      right: ['68', '90', '92', '23', '12'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em đặt tính rồi tính từng phép tính.'],
      solution: '34 × 2 = 68. 15 × 6 = 90. 23 × 4 = 92. 69 : 3 = 23.',
    },
    {
      type: 'choice',
      prompt: '95 : 8 = ?',
      options: ['11 (dư 7)', '10 (dư 15)', '12', '11 (dư 5)'],
      answer: 0,
      hints: ['Số dư phải bé hơn 8.'],
      solution:
        '9 chia 8 được 1, dư 1. Hạ 5, được 15. 15 chia 8 được 1, dư 7. Vậy 95 : 8 = 11 (dư 7).',
    },
    {
      type: 'number',
      prompt: '107 × 9 = ?',
      answer: 963,
      hints: ['Em nhân từ hàng đơn vị. 9 nhân 7 bằng 63, viết 3, nhớ 6.'],
      solution:
        '9 nhân 7 bằng 63, viết 3, nhớ 6. 9 nhân 0 bằng 0, thêm 6 bằng 6, viết 6. 9 nhân 1 bằng 9, viết 9. Kết quả là 963.',
    },
    {
      type: 'choice',
      prompt: '906 : 3 = ?',
      options: ['32', '302', '320', '312'],
      answer: 1,
      hints: ['Mỗi lần hạ một chữ số, em viết một chữ số ở thương, có thể là 0.'],
      solution: '9 chia 3 được 3. Hạ 0, 0 chia 3 được 0. Hạ 6, 6 chia 3 được 2. Vậy 906 : 3 = 302.',
    },
    {
      type: 'number',
      prompt: 'Phép chia 628 : 8 có số dư là bao nhiêu?',
      answer: 4,
      hints: ['Em đặt tính rồi chia. Số dư phải bé hơn 8.'],
      solution: '628 : 8 = 78 (dư 4), vì 78 × 8 = 624 và 624 + 4 = 628. Số dư là 4.',
    },
    {
      type: 'number',
      prompt: 'Tìm số thích hợp: ? × 6 = 186. Số đó là bao nhiêu?',
      answer: 31,
      hints: ['Muốn tìm thừa số, em lấy tích chia cho thừa số kia.'],
      solution: '? = 186 : 6 = 31.',
    },
    {
      type: 'number',
      prompt: 'Tìm số thích hợp: ? : 7 = 105. Số đó là bao nhiêu?',
      answer: 735,
      hints: ['Muốn tìm số bị chia, em lấy thương nhân với số chia.'],
      solution: '? = 105 × 7 = 735.',
    },
    {
      type: 'number',
      prompt: 'Các bạn xếp 256 cái bánh vào các hộp, mỗi hộp 8 cái. Xếp được bao nhiêu hộp?',
      answer: 32,
      hints: ['Mỗi hộp có 8 cái: em làm phép chia.'],
      solution: '256 : 8 = 32. Xếp được 32 hộp.',
    },
    {
      type: 'number',
      prompt:
        'Mi hái được 25 bông hoa. Mai hái được số hoa gấp 3 lần Mi. Cả hai bạn hái được bao nhiêu bông hoa?',
      answer: 100,
      hints: ['Em tìm số hoa của Mai trước.', 'Rồi em cộng số hoa của hai bạn.'],
      solution: 'Mai hái được: 25 × 3 = 75 (bông). Cả hai hái được: 75 + 25 = 100 (bông).',
    },
  ],
  takeaways: [
    'Nhân từ phải sang trái, chia từ trái sang phải.',
    'Số dư luôn bé hơn số chia.',
    'Thừa số = tích : thừa số kia. Số bị chia = thương × số chia. Số chia = số bị chia : thương.',
  ],
};
