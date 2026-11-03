/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chung học kì 1: nhân, chia trong phạm vi 1 000, biểu thức số, góc vuông, trung điểm, đường gấp khúc, cân theo gam và bài toán hai bước tính.',
  intro:
    'Sắp hết học kì 1 rồi! Hôm nay em ôn lại tất cả: phép tính, biểu thức, hình học và đo lường. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Đặt tính rồi tính phép nhân, phép chia trong phạm vi 1 000.',
    'Tính đúng giá trị của biểu thức số.',
    'Nhận ra góc vuông, trung điểm của đoạn thẳng.',
    'Tính độ dài đường gấp khúc, cân nặng theo gam.',
    'Giải bài toán hai bước tính.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Phép tính và biểu thức',
      blocks: [
        {
          type: 'table',
          head: ['Việc cần làm', 'Em nhớ'],
          rows: [
            ['Nhân', 'Từ phải sang trái, nhớ thêm số đã nhớ.'],
            ['Chia', 'Từ trái sang phải, số dư bé hơn số chia.'],
            ['Biểu thức', 'Trong ngoặc trước; nhân, chia trước; cộng, trừ sau.'],
          ],
        },
      ],
    },
    {
      heading: 'Hình học và đo lường',
      blocks: [
        {
          type: 'list',
          items: [
            'Trung điểm chia đoạn thẳng thành hai phần bằng nhau.',
            'Hình chữ nhật có 4 góc vuông.',
            'Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng của nó.',
            'Cân thăng bằng thì hai đĩa nặng bằng nhau.',
          ],
        },
      ],
    },
    {
      heading: 'Bài toán hai bước tính',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Em làm từng bước',
          text: 'Bước 1: tìm số chưa biết mà đề bài cần. Bước 2: dùng số đó để trả lời câu hỏi.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Bài trộn đủ các phần của học kì 1. Sai lần đầu sẽ có gợi ý. Phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Bảng màu cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem: 'Tính giá trị của biểu thức: 12 × (12 − 9).',
      steps: ['Có dấu ngoặc: em tính trong ngoặc trước. 12 − 9 = 3.', 'Rồi em nhân: 12 × 3 = 36.'],
      answer: '12 × (12 − 9) = 12 × 3 = 36.',
    },
    {
      problem:
        'Tuần trước trường em góp được 20 thùng đồ dùng học tập. Tuần sau góp được số thùng gấp 3 lần tuần trước. Cả hai tuần góp được bao nhiêu thùng?',
      steps: [
        'Tuần sau góp được: 20 × 3 = 60 (thùng).',
        'Cả hai tuần góp được: 20 + 60 = 80 (thùng).',
      ],
      answer: 'Cả hai tuần góp được 80 thùng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 72 × 3 = ?',
      answer: 216,
      hints: ['Em nhân từ hàng đơn vị. 3 nhân 2 bằng 6.'],
      solution: '3 nhân 2 bằng 6, viết 6. 3 nhân 7 bằng 21, viết 21. Kết quả là 216.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 116 × 6 = ?',
      answer: 696,
      hints: ['6 nhân 6 bằng 36, viết 6, nhớ 3.'],
      solution:
        '6 nhân 6 bằng 36, viết 6, nhớ 3. 6 nhân 1 bằng 6, thêm 3 bằng 9, viết 9. 6 nhân 1 bằng 6, viết 6. Kết quả là 696.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 106 × 8 = ?',
      answer: 848,
      hints: ['8 nhân 6 bằng 48, viết 8, nhớ 4.'],
      solution:
        '8 nhân 6 bằng 48, viết 8, nhớ 4. 8 nhân 0 bằng 0, thêm 4 bằng 4, viết 4. 8 nhân 1 bằng 8, viết 8. Kết quả là 848.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 847 : 7 = ?',
      answer: 121,
      hints: ['Em chia từ trái sang phải. 8 chia 7 được 1, dư 1.'],
      solution:
        '8 chia 7 được 1, dư 1. Hạ 4, được 14. 14 chia 7 được 2, dư 0. Hạ 7, 7 chia 7 được 1. Kết quả là 121.',
    },
    {
      type: 'choice',
      prompt: '95 : 4 = ?',
      options: ['23 (dư 3)', '22 (dư 7)', '24', '23 (dư 1)'],
      answer: 0,
      hints: ['Số dư phải bé hơn 4.'],
      solution:
        '9 chia 4 được 2, dư 1. Hạ 5, được 15. 15 chia 4 được 3, dư 3. Vậy 95 : 4 = 23 (dư 3).',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 175 + 42 − 75.',
      answer: 142,
      hints: ['Chỉ có cộng, trừ: em tính từ trái sang phải.'],
      solution: '175 + 42 − 75 = 217 − 75 = 142.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 96 : 3 × 5.',
      answer: 160,
      hints: ['Chỉ có nhân, chia: em tính từ trái sang phải.'],
      solution: '96 : 3 × 5 = 32 × 5 = 160.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 60 : (2 × 3).',
      answer: 10,
      hints: ['Em tính trong ngoặc trước.'],
      solution: '60 : (2 × 3) = 60 : 6 = 10.',
    },
    {
      type: 'choice',
      prompt: 'M là trung điểm của đoạn thẳng BC. Câu nào đúng?',
      options: ['BM = MC', 'BM lớn hơn MC', 'BC = BM'],
      answer: 0,
      hints: ['Trung điểm chia đoạn thẳng thành hai phần bằng nhau.'],
      solution: 'M là trung điểm của BC nên BM = MC.',
    },
    {
      type: 'number',
      prompt: 'Hình chữ nhật BCDE có mấy góc vuông?',
      answer: 4,
      hints: ['Em đặt ê ke vào từng góc.'],
      solution: 'Hình chữ nhật có 4 góc vuông, tại các đỉnh B, C, D, E.',
    },
    {
      type: 'number',
      prompt:
        'Đường gấp khúc ABCD có AB = 30 mm, BC = 42 mm, CD = 28 mm. Đường gấp khúc dài bao nhiêu mi-li-mét?',
      answer: 100,
      unit: 'mm',
      hints: ['Em cộng độ dài ba đoạn thẳng.'],
      solution: '30 + 42 + 28 = 100 (mm).',
    },
    {
      type: 'number',
      prompt:
        'Túi muối ở đĩa bên trái. Đĩa bên phải có quả cân 200 g, 200 g và 100 g. Cân thăng bằng. Túi muối nặng bao nhiêu gam?',
      answer: 500,
      unit: 'g',
      hints: ['Hai đĩa nặng bằng nhau. Em cộng các quả cân.'],
      solution: '200 + 200 + 100 = 500 (g).',
    },
    {
      type: 'number',
      prompt:
        'Cửa hàng có 1 thùng 100 l nước mắm và 5 can, mỗi can 10 l. Cửa hàng có tất cả bao nhiêu lít nước mắm?',
      answer: 150,
      unit: 'l',
      hints: ['Em tính số lít ở 5 can trước.'],
      solution: '5 × 10 = 50 (l). 100 + 50 = 150 (l).',
    },
    {
      type: 'number',
      prompt:
        'Tuần trước trường em góp được 30 thùng đồ dùng học tập. Tuần sau góp được số thùng gấp 2 lần tuần trước. Cả hai tuần góp được bao nhiêu thùng?',
      answer: 90,
      hints: ['Em tìm số thùng của tuần sau trước.'],
      solution: '30 × 2 = 60 (thùng). 30 + 60 = 90 (thùng).',
    },
  ],
  takeaways: [
    'Nhân từ phải sang trái, chia từ trái sang phải, số dư bé hơn số chia.',
    'Trong ngoặc trước; nhân, chia trước; cộng, trừ sau.',
    'Bài toán hai bước: tìm số còn thiếu trước, rồi trả lời câu hỏi.',
  ],
};
