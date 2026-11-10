/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cộng, trừ, nhân, chia trong phạm vi 100 000: tính nhẩm số tròn nghìn, đặt tính rồi tính, tính giá trị biểu thức và giải bài toán có lời văn.',
  intro:
    'Hộp bút giá 16 500 đồng. Cặp sách đắt hơn hộp bút 62 500 đồng. Cặp sách giá bao nhiêu tiền? Cùng ôn lại bốn phép tính nhé!',
  objectives: [
    'Tính nhẩm được với các số tròn nghìn, tròn chục nghìn.',
    'Đặt tính rồi tính được phép cộng, trừ, nhân, chia trong phạm vi 100 000.',
    'Tính được giá trị biểu thức và giải được bài toán có lời văn.',
  ],
  sections: [
    {
      heading: 'Tính nhẩm',
      blocks: [
        {
          type: 'p',
          text: 'Với số tròn nghìn, em nhẩm theo số nghìn: 30 000 + 50 000 = ? Nhẩm: 3 chục nghìn + 5 chục nghìn = 8 chục nghìn.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Nhẩm', 'Kết quả'],
          rows: [
            ['30 000 + 50 000', '3 chục nghìn + 5 chục nghìn', '80 000'],
            ['80 000 − 20 000', '8 chục nghìn − 2 chục nghìn', '60 000'],
            ['4 000 × 2', '4 nghìn × 2', '8 000'],
            ['60 000 : 3', '6 chục nghìn : 3', '20 000'],
          ],
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cộng, trừ, nhân: viết các chữ số cùng hàng thẳng cột, rồi tính từ phải sang trái, bắt đầu từ hàng đơn vị.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chia: tính từ trái sang phải. Mỗi lần chia đều có ba bước: chia, nhân, trừ. Rồi hạ chữ số tiếp theo.',
        },
        {
          type: 'p',
          text: 'Ví dụ: 45 637 + 28 485 = 74 122. 85 362 − 47 281 = 38 081.',
        },
        {
          type: 'p',
          text: 'Ví dụ: 12 345 × 4 = 49 380. 47 819 : 6 = 7 969 (dư 5).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thử lại',
          text: 'Phép chia có dư: số dư phải bé hơn số chia. Thử lại: 7 969 × 6 + 5 = 47 819.',
        },
      ],
    },
    {
      heading: 'Tính giá trị biểu thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Biểu thức có nhân, chia và cộng, trừ: em làm nhân, chia trước, cộng, trừ sau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Biểu thức có dấu ngoặc: em làm trong ngoặc trước.',
        },
        {
          type: 'p',
          text: '20 000 + 3 000 × 2 = 20 000 + 6 000 = 26 000. (20 000 + 3 000) × 2 = 23 000 × 2 = 46 000.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt tính từng bước',
    instruction:
      'Em chọn phép tính. Em chạm chữ số đúng để viết từng chữ số của kết quả. Mỗi bước làm xong sẽ được đọc lại như trong sách.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 60 524 − 25 318.',
      steps: [
        'Viết 25 318 dưới 60 524 sao cho các chữ số cùng hàng thẳng cột.',
        '4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6, nhớ 1.',
        '1 thêm 1 bằng 2; 2 trừ 2 bằng 0, viết 0.',
        '5 trừ 3 bằng 2, viết 2.',
        '0 không trừ được 5, lấy 10 trừ 5 bằng 5, viết 5, nhớ 1.',
        '2 thêm 1 bằng 3; 6 trừ 3 bằng 3, viết 3.',
      ],
      answer: '60 524 − 25 318 = 35 206.',
    },
    {
      problem: 'Đặt tính rồi tính: 25 632 : 4.',
      steps: [
        '25 chia 4 được 6, viết 6; 6 nhân 4 bằng 24; 25 trừ 24 bằng 1.',
        'Hạ 6, được 16. 16 chia 4 được 4, viết 4; 4 nhân 4 bằng 16; 16 trừ 16 bằng 0.',
        'Hạ 3, được 3. 3 chia 4 được 0, viết 0; 0 nhân 4 bằng 0; 3 trừ 0 bằng 3.',
        'Hạ 2, được 32. 32 chia 4 được 8, viết 8; 8 nhân 4 bằng 32; 32 trừ 32 bằng 0.',
      ],
      answer: '25 632 : 4 = 6 408.',
    },
    {
      problem:
        'Hộp bút giá 16 500 đồng. Cặp sách đắt hơn hộp bút 62 500 đồng. Hỏi cặp sách giá bao nhiêu tiền?',
      steps: ['Cặp sách đắt hơn, nên em làm phép cộng.', '16 500 + 62 500 = 79 000 (đồng).'],
      answer: 'Cặp sách giá 79 000 đồng.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Em tính nhẩm rồi nối phép tính với kết quả.',
      left: ['30 000 + 50 000', '80 000 − 20 000', '4 000 × 2', '60 000 : 3'],
      right: ['80 000', '60 000', '8 000', '20 000', '2 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhẩm theo số nghìn hoặc số chục nghìn: 6 chục nghìn : 3 = 2 chục nghìn.'],
      solution:
        '30 000 + 50 000 = 80 000; 80 000 − 20 000 = 60 000; 4 000 × 2 = 8 000; 60 000 : 3 = 20 000.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 23 415 + 51 362 = ?',
      answer: 74777,
      hints: ['Cộng từ hàng đơn vị: 5 cộng 2 bằng 7.', 'Phép cộng này không có nhớ.'],
      solution:
        '5 + 2 = 7; 1 + 6 = 7; 4 + 3 = 7; 3 + 1 = 4; 2 + 5 = 7. Vậy 23 415 + 51 362 = 74 777.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 85 362 − 47 281 = ?',
      answer: 38081,
      hints: ['Ở hàng chục: 6 không trừ được 8, em lấy 16 trừ 8 rồi nhớ 1.'],
      solution:
        '2 trừ 1 bằng 1. 6 không trừ được 8, lấy 16 trừ 8 bằng 8, nhớ 1. 2 thêm 1 bằng 3; 3 trừ 3 bằng 0. 5 không trừ được 7, lấy 15 trừ 7 bằng 8, nhớ 1. 4 thêm 1 bằng 5; 8 trừ 5 bằng 3. Vậy 85 362 − 47 281 = 38 081.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 21 306 × 3 = ?',
      answer: 63918,
      hints: ['Nhân từ hàng đơn vị: 3 nhân 6 bằng 18, viết 8, nhớ 1.'],
      solution:
        '3 nhân 6 bằng 18, viết 8, nhớ 1. 3 nhân 0 bằng 0, thêm 1 bằng 1. 3 nhân 3 bằng 9. 3 nhân 1 bằng 3. 3 nhân 2 bằng 6. Vậy 21 306 × 3 = 63 918.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 9 648 : 3 = ?',
      answer: 3216,
      hints: ['Chia từ trái sang phải: 9 chia 3 được 3.'],
      solution:
        '9 chia 3 được 3. Hạ 6, 6 chia 3 được 2. Hạ 4, 4 chia 3 được 1, dư 1. Hạ 8 được 18, 18 chia 3 được 6. Vậy 9 648 : 3 = 3 216.',
    },
    {
      type: 'choice',
      prompt: '47 819 : 6 = 7 969 (dư ?). Số dư là bao nhiêu?',
      options: ['5', '1', '6', '0'],
      answer: 0,
      hints: ['Em tính 7 969 × 6, rồi lấy 47 819 trừ đi.', 'Số dư phải bé hơn 6.'],
      solution: '7 969 × 6 = 47 814. 47 819 − 47 814 = 5. Số dư là 5.',
    },
    {
      type: 'choice',
      prompt: 'Giá trị của biểu thức 20 000 + 3 000 × 2 là bao nhiêu?',
      options: ['26 000', '46 000', '25 000'],
      answer: 0,
      hints: ['Em làm phép nhân trước.'],
      solution: '20 000 + 3 000 × 2 = 20 000 + 6 000 = 26 000.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: (45 000 − 15 000) : 5 = ?',
      answer: 6000,
      hints: ['Em làm trong ngoặc trước.'],
      solution: '(45 000 − 15 000) : 5 = 30 000 : 5 = 6 000.',
    },
    {
      type: 'number',
      prompt: '? + 25 000 = 68 000. Số cần điền là số nào?',
      answer: 43000,
      hints: ['Muốn tìm số hạng chưa biết, em lấy tổng trừ đi số hạng đã biết.'],
      solution: '68 000 − 25 000 = 43 000.',
    },
    {
      type: 'number',
      prompt: '? × 4 = 36 000. Số cần điền là số nào?',
      answer: 9000,
      hints: ['Muốn tìm thừa số chưa biết, em lấy tích chia cho thừa số đã biết.'],
      solution: '36 000 : 4 = 9 000.',
    },
    {
      type: 'number',
      prompt:
        'Một nhà máy làm được 12 500 chai nước mỗi ngày. Hỏi trong 4 ngày nhà máy làm được bao nhiêu chai nước?',
      answer: 50000,
      unit: 'chai',
      hints: ['4 ngày, mỗi ngày 12 500 chai: em làm phép nhân.'],
      solution: '12 500 × 4 = 50 000 (chai). Nhà máy làm được 50 000 chai nước.',
    },
    {
      type: 'number',
      prompt:
        'Kho có 35 600 kg gạo. Người ta chia đều số gạo vào 8 xe. Hỏi mỗi xe chở bao nhiêu ki-lô-gam gạo?',
      answer: 4450,
      unit: 'kg',
      hints: ['Chia đều vào 8 xe: em làm phép chia cho 8.'],
      solution: '35 600 : 8 = 4 450 (kg). Mỗi xe chở 4 450 kg gạo.',
    },
  ],
  takeaways: [
    'Cộng, trừ, nhân: đặt các chữ số cùng hàng thẳng cột, tính từ hàng đơn vị.',
    'Chia: tính từ trái sang phải, mỗi lần chia, nhân, trừ rồi hạ.',
    'Nhân, chia trước; cộng, trừ sau. Có ngoặc thì làm trong ngoặc trước.',
  ],
};
