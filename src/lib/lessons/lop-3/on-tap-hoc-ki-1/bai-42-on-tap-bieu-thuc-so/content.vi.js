/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập biểu thức số: tính từ trái sang phải, nhân chia trước cộng trừ sau, tính trong ngoặc trước và giải bài toán.',
  intro:
    'Cùng các số và dấu ấy, nhưng tính sai thứ tự thì ra kết quả sai. Hôm nay em ôn lại cách tính giá trị của biểu thức số. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Nhớ ba quy tắc tính giá trị của biểu thức số.',
    'Tính đúng giá trị của biểu thức có và không có dấu ngoặc.',
    'So sánh giá trị của các biểu thức.',
    'Giải bài toán bằng cách tính biểu thức.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Ba quy tắc',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Chỉ có cộng, trừ, hoặc chỉ có nhân, chia: em tính từ trái sang phải.',
            'Có cả cộng, trừ và nhân, chia: em làm nhân, chia trước; cộng, trừ sau.',
            'Có dấu ngoặc: em tính trong ngoặc trước.',
          ],
        },
      ],
    },
    {
      heading: 'Từng trường hợp',
      blocks: [
        {
          type: 'table',
          head: ['Biểu thức', 'Em tính'],
          rows: [
            ['47 + 36 − 50', '= 83 − 50 = 33'],
            ['85 : 5 × 4', '= 17 × 4 = 68'],
            ['14 × 6 − 29', '= 84 − 29 = 55'],
            ['348 + 84 : 6', '= 348 + 14 = 362'],
            ['182 − (96 − 54)', '= 182 − 42 = 140'],
            ['64 : (4 × 2)', '= 64 : 8 = 8'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: '52 + 24 × 2 bằng 100, không phải 152. Em phải nhân trước: 24 × 2 = 48, rồi 52 + 48 = 100.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Em chạm vào đáp án đúng. Hết câu, em xem cách tính từng dòng, phần tô vàng là phép tính làm trước. Phần nào em còn sai, bài sẽ hỏi lại nhiều hơn.',
  },
  examples: [
    {
      problem: 'Tính giá trị của biểu thức: 192 − 23 × 4.',
      steps: ['Có trừ và nhân: em nhân trước. 23 × 4 = 92.', 'Rồi em trừ: 192 − 92 = 100.'],
      answer: '192 − 23 × 4 = 192 − 92 = 100.',
    },
    {
      problem:
        'Có 288 bánh xe ô tô đóng vào các hộp, mỗi hộp 4 bánh xe. Các hộp đóng vào các thùng, mỗi thùng 8 hộp. Cần bao nhiêu thùng?',
      steps: ['Em tìm số hộp: 288 : 4 = 72 (hộp).', 'Em tìm số thùng: 72 : 8 = 9 (thùng).'],
      answer: 'Cần 9 thùng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 47 + 36 − 50.',
      answer: 33,
      hints: ['Chỉ có cộng, trừ: em tính từ trái sang phải.'],
      solution: '47 + 36 − 50 = 83 − 50 = 33.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 63 × 2 : 7.',
      answer: 18,
      hints: ['Chỉ có nhân, chia: em tính từ trái sang phải.'],
      solution: '63 × 2 : 7 = 126 : 7 = 18.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 14 × 6 − 29.',
      answer: 55,
      hints: ['Em nhân trước, trừ sau.'],
      solution: '14 × 6 − 29 = 84 − 29 = 55.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 348 + 84 : 6.',
      answer: 362,
      hints: ['Em chia trước, cộng sau.'],
      solution: '348 + 84 : 6 = 348 + 14 = 362.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 182 − (96 − 54).',
      answer: 140,
      hints: ['Em tính trong ngoặc trước.'],
      solution: '182 − (96 − 54) = 182 − 42 = 140.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 64 : (4 × 2).',
      answer: 8,
      hints: ['Em tính trong ngoặc trước.'],
      solution: '64 : (4 × 2) = 64 : 8 = 8.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu thức với giá trị của nó.',
      left: ['4 × (54 − 44)', '(33 + 67) : 2', '52 + 24 × 2', '(25 + 45) × 3'],
      right: ['40', '50', '100', '210'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Có ngoặc: tính trong ngoặc trước. Không có ngoặc: nhân, chia trước.'],
      solution:
        '4 × (54 − 44) = 4 × 10 = 40. (33 + 67) : 2 = 100 : 2 = 50. 52 + 24 × 2 = 52 + 48 = 100. (25 + 45) × 3 = 70 × 3 = 210.',
    },
    {
      type: 'multi',
      prompt: 'Những biểu thức nào có giá trị lớn hơn 80?',
      options: ['60 + 40 : 2', '50 + 100 : 2', '30 + 20 × 2', '40 + 40 × 2'],
      answers: [1, 3],
      hints: ['Em tính giá trị của từng biểu thức. Nhân, chia trước.'],
      solution:
        '60 + 40 : 2 = 80. 50 + 100 : 2 = 100. 30 + 20 × 2 = 70. 40 + 40 × 2 = 120. Chỉ 100 và 120 lớn hơn 80.',
    },
    {
      type: 'order',
      prompt: 'Xếp các dòng theo thứ tự tính biểu thức 7 × (48 : 6).',
      items: ['7 × 8', '56', '7 × (48 : 6)'],
      answer: [2, 0, 1],
      hints: ['Dòng đầu là biểu thức. Dòng cuối là giá trị.'],
      solution: '7 × (48 : 6) = 7 × 8 = 56.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thay cho dấu ? để biểu thức 6 × (6 ? 6) có giá trị bé nhất.',
      options: ['+', '−', '×', ':'],
      answer: 1,
      hints: ['Em thử từng dấu, tính trong ngoặc trước.'],
      solution:
        '6 × (6 + 6) = 72. 6 × (6 − 6) = 0. 6 × (6 × 6) = 216. 6 × (6 : 6) = 6. Bé nhất là 0, với dấu trừ.',
    },
    {
      type: 'number',
      prompt:
        'Một bao gạo cân nặng 30 kg, một bao ngô cân nặng 45 kg. Hỏi 3 bao gạo và 1 bao ngô cân nặng bao nhiêu ki-lô-gam?',
      answer: 135,
      unit: 'kg',
      hints: ['Em tính cân nặng 3 bao gạo trước.'],
      solution: '30 × 3 + 45 = 90 + 45 = 135 (kg).',
    },
    {
      type: 'number',
      prompt:
        'Có 288 bánh xe đóng vào các hộp, mỗi hộp 4 bánh xe. Các hộp đóng vào các thùng, mỗi thùng 8 hộp. Cần bao nhiêu thùng?',
      answer: 9,
      hints: ['Em tìm số hộp trước, rồi tìm số thùng.'],
      solution: '288 : 4 : 8 = 72 : 8 = 9 (thùng).',
    },
  ],
  takeaways: [
    'Chỉ có cộng, trừ, hoặc chỉ có nhân, chia: tính từ trái sang phải.',
    'Có cả bốn phép tính: nhân, chia trước; cộng, trừ sau.',
    'Có dấu ngoặc: tính trong ngoặc trước.',
  ],
};
