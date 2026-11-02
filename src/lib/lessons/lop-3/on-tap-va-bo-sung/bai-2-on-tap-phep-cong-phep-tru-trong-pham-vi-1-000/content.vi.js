/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép cộng, phép trừ trong phạm vi 1 000: tính nhẩm số tròn chục, tròn trăm, đặt tính có nhớ và giải bài toán nhiều hơn, ít hơn.',
  intro:
    'Em đã biết cộng, trừ các số đến 1 000. Hôm nay em tính nhẩm, đặt tính từng bước với số nhớ và giải bài toán về xe chở gạo, về học sinh nhé!',
  objectives: [
    'Tính nhẩm các số tròn chục, tròn trăm.',
    'Đặt tính rồi tính phép cộng, phép trừ có nhớ trong phạm vi 1 000.',
    'Gọi đúng số hạng, tổng, số bị trừ, số trừ, hiệu.',
    'Giải bài toán nhiều hơn, ít hơn.',
  ],
  sections: [
    {
      heading: 'Tính nhẩm',
      blocks: [
        {
          type: 'p',
          text: 'Em tính theo số chục: 50 + 40 = 90, vì 5 chục + 4 chục = 9 chục.',
        },
        {
          type: 'p',
          text: 'Em tính theo số trăm: 900 − 500 = 400, vì 9 trăm − 5 trăm = 4 trăm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Một phép cộng, hai phép trừ',
          text: '300 + 700 = 1 000, nên 1 000 − 700 = 300 và 1 000 − 300 = 700.',
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
            'Tính từ phải sang trái: đơn vị, rồi chục, rồi trăm.',
            'Cộng được số có hai chữ số: viết chữ số đơn vị, nhớ 1 sang hàng bên trái.',
          ],
        },
        {
          type: 'p',
          text: 'Phép trừ: chữ số trên bé hơn chữ số dưới thì lấy thêm 10 rồi trừ. Sau đó nhớ 1, cộng vào chữ số dưới ở hàng bên trái.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ quên',
          text: 'Đừng quên số nhớ! 146 + 29 = 175, không phải 165.',
        },
      ],
    },
    {
      heading: 'Tên gọi của các số',
      blocks: [
        {
          type: 'table',
          head: ['Phép tính', 'Tên gọi'],
          rows: [
            ['30 + 16 = 46', '30 và 16 là số hạng, 46 là tổng'],
            ['563 − 137 = 426', '563 là số bị trừ, 137 là số trừ, 426 là hiệu'],
          ],
        },
      ],
    },
    {
      heading: 'Bài toán nhiều hơn, ít hơn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhiều hơn: em làm phép cộng. Ít hơn: em làm phép trừ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt tính từng bước',
    instruction:
      'Bảng tô sáng hàng đang tính. Em chạm chữ số cần viết, số nhớ hiện màu đỏ ở hàng bên trái. Chọn "Đố em" để làm bài ôn tập.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 146 + 29.',
      steps: [
        '6 cộng 9 bằng 15, viết 5, nhớ 1.',
        '4 cộng 2 bằng 6, thêm 1 bằng 7, viết 7.',
        'Hạ 1, viết 1.',
      ],
      answer: '146 + 29 = 175.',
    },
    {
      problem: 'Đặt tính rồi tính: 394 − 158.',
      steps: [
        '4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6, nhớ 1.',
        '5 thêm 1 bằng 6, 9 trừ 6 bằng 3, viết 3.',
        '3 trừ 1 bằng 2, viết 2.',
      ],
      answer: '394 − 158 = 236.',
    },
    {
      problem:
        'Khối lớp Ba có 142 học sinh. Khối lớp Hai ít hơn khối lớp Ba 18 học sinh. Khối lớp Hai có bao nhiêu học sinh?',
      steps: ['Ít hơn nên em làm phép trừ.', '142 − 18 = 124.'],
      answer: 'Khối lớp Hai có 124 học sinh.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['50 + 40', '100 − 80', '500 + 400', '1 000 − 300'],
      right: ['700', '90', '900', '20'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Em tính theo số chục hoặc số trăm.'],
      solution: '50 + 40 = 90. 100 − 80 = 20. 500 + 400 = 900. 1 000 − 300 = 700.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 35 + 48.',
      answer: 83,
      hints: ['5 cộng 8 bằng 13, em viết 3 và nhớ 1.'],
      solution:
        '5 cộng 8 bằng 13, viết 3, nhớ 1. 3 cộng 4 bằng 7, thêm 1 bằng 8, viết 8. Vậy 35 + 48 = 83.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 77 − 59.',
      answer: 18,
      hints: ['7 không trừ được 9, em lấy 17 trừ 9.', 'Nhớ 1 vào chữ số 5.'],
      solution:
        '7 không trừ được 9, lấy 17 trừ 9 bằng 8, viết 8, nhớ 1. 5 thêm 1 bằng 6, 7 trừ 6 bằng 1, viết 1. Vậy 77 − 59 = 18.',
    },
    {
      type: 'choice',
      prompt: '135 + 48 = ?',
      options: ['173', '183', '184', '193'],
      answer: 1,
      hints: ['5 cộng 8 bằng 13. Nhớ 1 sang hàng chục.'],
      solution:
        '5 cộng 8 bằng 13, viết 3, nhớ 1. 3 cộng 4 bằng 7, thêm 1 bằng 8, viết 8. Hạ 1, viết 1. Vậy 135 + 48 = 183.',
    },
    {
      type: 'number',
      prompt: 'Số bị trừ là 563, số trừ là 137. Hiệu là bao nhiêu?',
      answer: 426,
      hints: ['Hiệu: em lấy số bị trừ trừ đi số trừ.', '3 không trừ được 7, em lấy 13 trừ 7.'],
      solution:
        '3 không trừ được 7, lấy 13 trừ 7 bằng 6, viết 6, nhớ 1. 3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2. 5 trừ 1 bằng 4, viết 4. Vậy hiệu là 426.',
    },
    {
      type: 'number',
      prompt: 'Hai số hạng là 130 và 80. Tổng là bao nhiêu?',
      answer: 210,
      hints: ['13 chục cộng 8 chục bằng mấy chục?'],
      solution: '130 + 80 = 210.',
    },
    {
      type: 'choice',
      prompt: 'Phép tính nào có kết quả lớn nhất?',
      options: ['135 + 48', '80 + 27', '537 − 361', '25 + 125'],
      answer: 0,
      hints: ['Em tính kết quả của từng phép tính, rồi so sánh.'],
      solution: '135 + 48 = 183; 80 + 27 = 107; 537 − 361 = 176; 25 + 125 = 150. Lớn nhất là 183.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bằng 107?',
      options: ['80 + 27', '216 − 109', '537 − 361', '25 + 125'],
      answers: [0, 1],
      hints: ['Em tính từng phép tính.'],
      solution: '80 + 27 = 107 và 216 − 109 = 107. Còn 537 − 361 = 176 và 25 + 125 = 150.',
    },
    {
      type: 'number',
      prompt:
        'Xe thứ nhất chở 650 kg gạo. Xe thứ hai chở nhiều hơn xe thứ nhất 150 kg. Xe thứ hai chở bao nhiêu ki-lô-gam gạo?',
      answer: 800,
      unit: 'kg',
      hints: ['Nhiều hơn: em làm phép cộng.'],
      solution: '650 + 150 = 800 (kg).',
    },
    {
      type: 'number',
      prompt: 'Bể có 650 l nước. Đã dùng hết 150 l. Bể còn lại bao nhiêu lít nước?',
      answer: 500,
      unit: 'l',
      hints: ['Dùng đi thì nước bớt đi: em làm phép trừ.'],
      solution: '650 − 150 = 500 (l).',
    },
    {
      type: 'order',
      prompt: 'Xếp các kết quả từ bé đến lớn.',
      items: ['210 − 60', '100 − 26', '216 − 132', '1 000 − 200'],
      answer: [1, 2, 0, 3],
      hints: ['Em tính từng phép tính, rồi so sánh.'],
      solution: '100 − 26 = 74; 216 − 132 = 84; 210 − 60 = 150; 1 000 − 200 = 800.',
    },
    {
      type: 'number',
      prompt:
        'Khối lớp Ba có 142 học sinh, khối lớp Hai có 124 học sinh. Cả hai khối có bao nhiêu học sinh?',
      answer: 266,
      unit: 'học sinh',
      hints: ['"Cả hai" nghĩa là gộp lại: em làm phép cộng.'],
      solution: '142 + 124 = 266 (học sinh).',
    },
  ],
  takeaways: [
    'Tính nhẩm số tròn trăm: 900 − 500 = 400, vì 9 trăm − 5 trăm = 4 trăm.',
    'Đặt tính thẳng cột, tính từ phải sang trái.',
    'Đừng quên số nhớ.',
    'Nhiều hơn: cộng. Ít hơn: trừ.',
  ],
};
