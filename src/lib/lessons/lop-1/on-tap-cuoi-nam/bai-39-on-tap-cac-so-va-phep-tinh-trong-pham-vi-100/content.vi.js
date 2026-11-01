/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm các số và phép tính trong phạm vi 100: đọc, viết số có hai chữ số, chục và đơn vị, so sánh, xếp thứ tự, cộng, trừ không nhớ và giải bài toán.',
  intro:
    'Em đã biết các số đến 100 và phép cộng, phép trừ không nhớ. Hôm nay em ôn lại cách đọc số, so sánh số và đặt tính rồi tính. Em làm bài ôn tập để biết phần nào cần luyện thêm nhé!',
  objectives: [
    'Đọc, viết số có hai chữ số; nêu số chục và số đơn vị.',
    'So sánh và xếp thứ tự các số trong phạm vi 100.',
    'Cộng, trừ (không nhớ) các số trong phạm vi 100.',
    'Giải bài toán có một phép cộng hoặc một phép trừ.',
  ],
  sections: [
    {
      heading: 'Số có hai chữ số',
      blocks: [
        {
          type: 'p',
          text: 'Số 47 gồm 4 chục và 7 đơn vị. Số 47 đọc là "bốn mươi bảy".',
        },
        {
          type: 'table',
          head: ['Số', 'Chục', 'Đơn vị', 'Đọc là'],
          rows: [
            ['35', '3', '5', 'ba mươi lăm'],
            ['61', '6', '1', 'sáu mươi mốt'],
            ['84', '8', '4', 'tám mươi tư'],
            ['90', '9', '0', 'chín mươi'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh',
          text: 'Em so sánh hàng chục trước: 52 > 38 vì 5 chục lớn hơn 3 chục. Hàng chục bằng nhau thì so sánh hàng đơn vị: 64 < 67.',
        },
      ],
    },
    {
      heading: 'Cộng, trừ không nhớ',
      blocks: [
        {
          type: 'p',
          text: 'Em đặt tính thẳng cột: đơn vị thẳng đơn vị, chục thẳng chục. Em tính từ phải sang trái.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phép cộng',
          text: '32 + 15: 2 + 5 = 7, viết 7. 3 + 1 = 4, viết 4. Vậy 32 + 15 = 47.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phép trừ',
          text: '68 − 24: 8 − 4 = 4, viết 4. 6 − 2 = 4, viết 4. Vậy 68 − 24 = 44.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Số tròn chục',
          text: '30 + 20 = 50, vì 3 chục + 2 chục = 5 chục.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 10 câu. Đầu tiên em làm thử mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem: 'Chọn dấu đúng: 73 ... 37',
      steps: [
        'Em so sánh hàng chục: 7 chục và 3 chục.',
        '7 chục lớn hơn 3 chục.',
        'Vậy 73 lớn hơn 37.',
      ],
      answer: '73 > 37.',
    },
    {
      problem: 'Lớp 1A có 24 bạn. Có thêm 3 bạn mới chuyển đến. Lớp 1A có tất cả bao nhiêu bạn?',
      steps: [
        'Có thêm là thêm vào: em làm phép cộng 24 + 3.',
        'Hàng đơn vị: 4 + 3 = 7. Hàng chục: hạ 2.',
        '24 + 3 = 27.',
      ],
      answer: 'Lớp 1A có tất cả 27 bạn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số 58 đọc là gì?',
      options: ['năm mươi tám', 'tám mươi lăm', 'năm tám'],
      answer: 0,
      hints: ['Em đọc chữ số hàng chục trước, rồi thêm "mươi".'],
      solution: 'Số 58 gồm 5 chục và 8 đơn vị, đọc là "năm mươi tám".',
    },
    {
      type: 'choice',
      prompt: 'Số "bảy mươi mốt" viết là gì?',
      options: ['17', '71', '701'],
      answer: 1,
      hints: ['"Bảy mươi" là 7 chục. "Mốt" là 1 đơn vị.'],
      solution: 'Bảy mươi mốt gồm 7 chục và 1 đơn vị, viết là 71.',
    },
    {
      type: 'choice',
      prompt: 'Số 36 gồm mấy chục và mấy đơn vị?',
      options: ['6 chục và 3 đơn vị', '3 chục và 6 đơn vị', '3 chục và 0 đơn vị'],
      answer: 1,
      hints: ['Chữ số bên trái chỉ số chục.'],
      solution: 'Số 36 gồm 3 chục và 6 đơn vị.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 45 ... 49',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Hai số cùng 4 chục. Em so sánh hàng đơn vị.'],
      solution: 'Hàng chục bằng nhau (4 chục). Hàng đơn vị: 5 bé hơn 9. Vậy 45 < 49.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['62', '26', '60', '100'],
      answer: [1, 2, 0, 3],
      hints: ['So sánh hàng chục trước.', 'Số 100 là số lớn nhất em đã học.'],
      solution: 'Từ bé đến lớn: 26, 60, 62, 100.',
    },
    {
      type: 'choice',
      prompt: 'Số nào thay cho dấu hỏi? 40, 50, ?, 70',
      options: ['55', '60', '80'],
      answer: 1,
      hints: ['Mỗi số hơn số đứng trước 1 chục.'],
      solution: 'Đếm thêm 1 chục: 40, 50, 60, 70. Số cần điền là 60.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['20 + 50', '43 + 25', '79 − 6', '96 − 34'],
      right: ['70', '68', '73', '62', '78'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Cộng, trừ đơn vị với đơn vị, rồi chục với chục.',
        '2 chục cộng 5 chục bằng mấy chục?',
      ],
      solution: '20 + 50 = 70. 43 + 25 = 68. 79 − 6 = 73. 96 − 34 = 62.',
    },
    {
      type: 'choice',
      prompt: '54 + 32 = ?',
      options: ['76', '86', '87'],
      answer: 1,
      hints: ['Hàng đơn vị: 4 + 2. Hàng chục: 5 + 3.'],
      solution: '4 + 2 = 6, viết 6. 5 + 3 = 8, viết 8. Vậy 54 + 32 = 86.',
    },
    {
      type: 'choice',
      prompt: '87 − 45 = ?',
      options: ['32', '42', '43'],
      answer: 1,
      hints: ['Hàng đơn vị: 7 − 5. Hàng chục: 8 − 4.'],
      solution: '7 − 5 = 2, viết 2. 8 − 4 = 4, viết 4. Vậy 87 − 45 = 42.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 30 + 6 ... 63',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Tính 30 + 6 trước, rồi so sánh với 63.'],
      solution: '30 + 6 = 36. 36 bé hơn 63, nên 30 + 6 < 63.',
    },
    {
      type: 'choice',
      prompt:
        'Thư viện có 65 quyển truyện. Các bạn mượn 23 quyển. Thư viện còn lại bao nhiêu quyển truyện?',
      options: ['42', '88', '43'],
      answer: 0,
      hints: ['Mượn đi là bớt đi: em làm phép trừ.', 'Tính 65 − 23.'],
      solution: '65 − 23 = 42. Thư viện còn lại 42 quyển truyện.',
    },
    {
      type: 'choice',
      prompt: 'Bà có 30 quả trứng gà và 20 quả trứng vịt. Bà có tất cả bao nhiêu quả trứng?',
      options: ['10', '50', '60'],
      answer: 1,
      hints: ['Có tất cả là gộp lại: em làm phép cộng.'],
      solution: '30 + 20 = 50. Bà có tất cả 50 quả trứng.',
    },
  ],
  takeaways: [
    'Số có hai chữ số gồm số chục và số đơn vị: 47 gồm 4 chục và 7 đơn vị.',
    'So sánh hàng chục trước, hàng chục bằng nhau thì so sánh hàng đơn vị.',
    'Cộng, trừ không nhớ: đặt tính thẳng cột, tính đơn vị rồi tính chục.',
  ],
};
